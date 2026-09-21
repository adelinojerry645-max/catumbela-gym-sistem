-- =====================================================================
-- ESTADO_APP — tabela simples para sincronizar os dados do Catumbela Gym
-- entre dispositivos (computador, telemóvel, etc.) via Supabase.
--
-- Em vez de uma tabela por cada tipo de dado (membros, pagamentos, etc.),
-- usamos uma única tabela genérica que guarda cada "coleção" como um
-- bloco JSON. É uma abordagem simples e robusta — evita erros de
-- incompatibilidade entre o nome das colunas e o que a aplicação espera,
-- e é fácil de verificar/corrigir diretamente no Supabase se for preciso.
--
-- Corre este ficheiro no SQL Editor do teu projeto Supabase.
--
-- >>> JÁ CORRESTE ESTE FICHEIRO NUMA VERSÃO ANTERIOR? <<<
-- Corre-o OUTRA VEZ na íntegra — é seguro, nada é apagado (a tabela e as
-- funções antigas usam "IF NOT EXISTS" / "OR REPLACE", por isso só são
-- atualizadas, nunca recriadas do zero). A parte nova, mais abaixo
-- ("NUMERAÇÃO DE DOCUMENTOS"), é o que corrige os recibos/faturas a
-- duplicarem-se — sem correr este ficheiro de novo, essa correção fica
-- só no código da aplicação, sem efeito nenhum no Supabase.
-- =====================================================================

CREATE TABLE IF NOT EXISTS estado_app (
    chave           TEXT PRIMARY KEY,       -- ex.: "membros", "planos", "contas"
    valor           JSONB NOT NULL DEFAULT '[]'::jsonb,
    atualizado_em   TIMESTAMP DEFAULT NOW()
);

-- Ativa Row Level Security (obrigatório no Supabase para tabelas acedidas
-- pelo frontend com a chave "anon"). A política abaixo permite leitura e
-- escrita a qualquer pedido feito com a chave anon do projeto — como o
-- sistema já controla o acesso através do login (contas com palavra-passe)
-- dentro da própria aplicação, isto é suficiente para começar.
ALTER TABLE estado_app ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "permitir tudo com chave anon" ON estado_app;
CREATE POLICY "permitir tudo com chave anon"
  ON estado_app
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- =====================================================================
-- SINCRONIZAÇÃO EM TEMPO REAL — sem isto, os dispositivos só veem as
-- alterações uns dos outros quando recarregam a página. Com isto ativo,
-- atualizam-se sozinhos, na hora — importante quando vários atletas ou
-- funcionários usam o sistema ao mesmo tempo.
-- (O bloco DO evita erro se já tiveres corrido isto antes.)
-- =====================================================================
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE estado_app;
EXCEPTION WHEN duplicate_object THEN
  NULL;
END $$;

-- =====================================================================
-- ADIÇÃO ATÓMICA — para coleções onde VÁRIAS PESSOAS DIFERENTES podem
-- adicionar um item novo ao mesmo tempo (ex.: vários atletas a submeter
-- comprovativo de pagamento, ou a fazer check-in, quase no mesmo segundo).
--
-- A gravação normal (usada no resto do sistema) funciona bem quando é
-- sempre a MESMA pessoa a mexer numa coleção de cada vez — ela lê a lista,
-- muda-a, e grava a lista toda de volta. Mas se DUAS pessoas diferentes
-- fizerem isso ao mesmo tempo, cada uma só vê a sua própria cópia, e quem
-- grava por último apaga sem querer o que o outro tinha acabado de somar.
--
-- Esta função evita isso: o "somar o item novo à lista" acontece dentro
-- do próprio Postgres, numa única operação — nunca há uma versão
-- desatualizada a sobrepor-se a outra.
-- =====================================================================
CREATE OR REPLACE FUNCTION adicionar_item_colecao(p_chave TEXT, p_item JSONB)
RETURNS void AS $$
BEGIN
  INSERT INTO estado_app (chave, valor, atualizado_em)
  VALUES (p_chave, jsonb_build_array(p_item), now())
  ON CONFLICT (chave) DO UPDATE
  SET valor = estado_app.valor || p_item, atualizado_em = now();
END;
$$ LANGUAGE plpgsql;

-- =====================================================================
-- RESERVA DE ATIVIDADES COM LIMITE DE VAGAS — mais forte do que a adição
-- atómica simples: aqui, a PRÓPRIA VERIFICAÇÃO de "ainda há vaga?" acontece
-- dentro do Postgres, com a linha bloqueada (FOR UPDATE) enquanto isso é
-- verificado. Sem isto, dois atletas podiam os DOIS passar no "ainda há
-- vaga" ao mesmo tempo (cada um a olhar para uma cópia ligeiramente
-- desatualizada) e ficar reservada mais gente do que a capacidade máxima.
-- =====================================================================
CREATE OR REPLACE FUNCTION reservar_atividade_atomico(p_chave TEXT, p_atividade_id BIGINT, p_capacidade INT, p_item JSONB)
RETURNS JSONB AS $$
DECLARE
  lista_atual JSONB;
  num_reservas INT;
BEGIN
  -- Bloqueia a linha até ao fim desta operação — qualquer outra chamada
  -- concorrente a esta mesma função espera aqui a sua vez, em vez de ler
  -- uma contagem desatualizada.
  SELECT valor INTO lista_atual FROM estado_app WHERE chave = p_chave FOR UPDATE;
  IF lista_atual IS NULL THEN
    lista_atual := '[]'::jsonb;
    INSERT INTO estado_app (chave, valor) VALUES (p_chave, lista_atual) ON CONFLICT (chave) DO NOTHING;
  END IF;

  SELECT count(*) INTO num_reservas
  FROM jsonb_array_elements(lista_atual) elem
  WHERE (elem->>'atividadeId')::bigint = p_atividade_id;

  IF p_capacidade IS NOT NULL AND num_reservas >= p_capacidade THEN
    RETURN jsonb_build_object('ok', false, 'motivo', 'Esta atividade já está com a capacidade máxima cheia.');
  END IF;

  UPDATE estado_app SET valor = lista_atual || p_item, atualizado_em = now() WHERE chave = p_chave;
  RETURN jsonb_build_object('ok', true);
END;
$$ LANGUAGE plpgsql;

-- =====================================================================
-- NUMERAÇÃO DE DOCUMENTOS (RECIBOS/FATURAS) — a causa mais persistente
-- de duplicação nesta aplicação: o número de cada documento era
-- calculado no PRÓPRIO DISPOSITIVO, a partir do maior número que esse
-- dispositivo já conhecia. Se dois dispositivos gerassem um documento
-- quase ao mesmo tempo (ou até o MESMO dispositivo, com um duplo
-- clique), os dois podiam calcular o MESMO "próximo número" — cada um
-- sem saber do outro. Esta função resolve isso da mesma forma que a
-- reserva de atividades acima: bloqueia a linha (FOR UPDATE), calcula o
-- número, e insere o documento — tudo numa única operação indivisível
-- dentro do Postgres. Duas chamadas concorrentes são sempre postas em
-- fila pelo próprio banco de dados; nunca correm ao mesmo tempo.
-- =====================================================================
CREATE OR REPLACE FUNCTION gerar_documento_atomico(p_chave TEXT, p_prefixo TEXT, p_ano TEXT, p_documento_sem_numero JSONB)
RETURNS JSONB AS $$
DECLARE
  lista_atual JSONB;
  maior_numero INT := 0;
  numero_gerado TEXT;
  documento_completo JSONB;
  elem JSONB;
  sufixo TEXT;
  n INT;
BEGIN
  -- Bloqueia até ao fim desta operação — qualquer outra chamada
  -- concorrente (de outro dispositivo, ou de um duplo clique no mesmo)
  -- espera aqui a sua vez, nunca lê um valor desatualizado.
  SELECT valor INTO lista_atual FROM estado_app WHERE chave = p_chave FOR UPDATE;
  IF lista_atual IS NULL THEN
    lista_atual := '[]'::jsonb;
    INSERT INTO estado_app (chave, valor) VALUES (p_chave, lista_atual) ON CONFLICT (chave) DO NOTHING;
  END IF;

  FOR elem IN SELECT * FROM jsonb_array_elements(lista_atual)
  LOOP
    IF (elem->>'tipo') = (p_documento_sem_numero->>'tipo')
       AND (elem->>'numero') LIKE (p_prefixo || '-' || p_ano || '-%') THEN
      sufixo := substring(elem->>'numero' FROM '[0-9]+$');
      IF sufixo IS NOT NULL THEN
        n := sufixo::INT;
        IF n > maior_numero THEN maior_numero := n; END IF;
      END IF;
    END IF;
  END LOOP;

  numero_gerado := p_prefixo || '-' || p_ano || '-' || lpad((maior_numero + 1)::TEXT, 6, '0');
  documento_completo := p_documento_sem_numero || jsonb_build_object('numero', numero_gerado);

  UPDATE estado_app SET valor = lista_atual || documento_completo, atualizado_em = now() WHERE chave = p_chave;
  RETURN documento_completo;
END;
$$ LANGUAGE plpgsql;

