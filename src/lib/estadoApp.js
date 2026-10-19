// Sincroniza "coleções" de dados (membros, planos, contas, etc.) com a
// tabela genérica `estado_app` no Supabase, guardando cada uma como um
// bloco JSON. Ver supabase-estado-app.sql para criar a tabela.
import { supabase } from "./supabaseClient";

export async function lerColecao(chave) {
  const { data, error } = await supabase
    .from("estado_app")
    .select("valor")
    .eq("chave", chave)
    .maybeSingle();
  if (error) throw error;
  return data ? data.valor : null;
}

// Versão que devolve também a data da última alteração — serve para, antes
// de gravar, perguntar só "mudou desde a última vez?" (um pedido minúsculo)
// em vez de descarregar a coleção inteira todas as vezes (poupa muito
// tráfego do Supabase, que tem limite no plano grátis).
export async function lerColecaoComData(chave) {
  const { data, error } = await supabase
    .from("estado_app")
    .select("valor, atualizado_em")
    .eq("chave", chave)
    .maybeSingle();
  if (error) throw error;
  return data ? { valor: data.valor, atualizado_em: data.atualizado_em } : null;
}

export async function lerDataColecao(chave) {
  const { data, error } = await supabase
    .from("estado_app")
    .select("atualizado_em")
    .eq("chave", chave)
    .maybeSingle();
  if (error) throw error;
  return data ? data.atualizado_em : null;
}

export async function gravarColecao(chave, valor) {
  const agora = new Date().toISOString();
  const { error } = await supabase
    .from("estado_app")
    .upsert({ chave, valor, atualizado_em: agora }, { onConflict: "chave" });
  if (error) throw error;
  ultimaGravacaoPropria[chave] = agora;
  return agora;
}

// Sincronização em tempo real — fica "à escuta" de alterações a uma coleção
// específica feitas por QUALQUER dispositivo, e chama "aoAlterar" assim que
// alguém grava, sem precisares de recarregar a página. Usa o Realtime do
// Supabase (Postgres Changes) — precisa de estar ativado na tabela (ver
// supabase-estado-app.sql).
// Grava a coleção SÓ se ninguém a alterou desde a versão que lemos (compara a
// data). Devolve { ok, atualizado_em }. Se a função ainda não existir no
// Supabase, volta ao método normal. Ver "gravar_colecao_se_atual" em
// supabase-estado-app.sql.
export async function gravarColecaoSeAtual(chave, valor, dataEsperada) {
  const agora = new Date().toISOString();
  const { data, error } = await supabase.rpc("gravar_colecao_se_atual", {
    p_chave: chave,
    p_valor: valor,
    p_esperado: dataEsperada ? new Date(dataEsperada).toISOString() : null,
    p_agora: agora,
  });
  if (error) {
    const texto = `${error.code || ""} ${error.message || ""}`;
    if (/PGRST202|42883|does not exist|Could not find/i.test(texto)) {
      const d = await gravarColecao(chave, valor);
      return { ok: true, atualizado_em: d };
    }
    throw error;
  }
  if (data && data.ok) ultimaGravacaoPropria[chave] = data.atualizado_em;
  return { ok: !!(data && data.ok), atualizado_em: data ? data.atualizado_em : null };
}

// Para poupar tráfego, o Supabase passa a avisar só "esta coleção mudou" (sem
// enviar a lista inteira a cada aparelho — via websocket isso era enviado sem
// compressão, centenas de KB por alteração). Quando o aviso chega, o aparelho
// vai buscar a lista UMA vez (pedido comprimido), e várias alterações seguidas
// juntam-se num só pedido.
const ultimaGravacaoPropria = {};
const ATRASO_BUSCA_MS = 1200;

export function subscreverColecao(chave, aoAlterar) {
  let temporizador = null;
  let ultimaDataVista = null;
  let desligado = false;
  const buscar = async () => {
    temporizador = null;
    if (desligado) return;
    try {
      const res = await lerColecaoComData(chave);
      if (desligado || !res) return;
      if (res.atualizado_em && Date.parse(res.atualizado_em) === ultimaDataVista) return;
      ultimaDataVista = res.atualizado_em ? Date.parse(res.atualizado_em) : ultimaDataVista;
      aoAlterar(res.valor, res.atualizado_em);
    } catch { /* sem rede: o próximo aviso tenta outra vez */ }
  };
  const canal = supabase
    .channel(`estado_app_${chave}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "estado_app", filter: `chave=eq.${chave}` },
      (payload) => {
        const novoRegisto = payload.new;
        if (!novoRegisto) return;
        if ("valor" in novoRegisto) {
          // Formato antigo (com a lista inteira): continua a funcionar.
          aoAlterar(novoRegisto.valor, novoRegisto.atualizado_em);
          return;
        }
        // Eco da nossa própria gravação: já sabemos o que lá está.
        if (novoRegisto.atualizado_em && ultimaGravacaoPropria[chave] === novoRegisto.atualizado_em) return;
        if (temporizador) return; // já há uma busca marcada: junta-se
        temporizador = setTimeout(buscar, ATRASO_BUSCA_MS);
      }
    )
    .subscribe();
  canal.__parar = () => { desligado = true; if (temporizador) clearTimeout(temporizador); };
  return canal;
}

export function desligarCanal(canal) {
  if (canal && canal.__parar) canal.__parar();
  if (canal) supabase.removeChannel(canal);
}

// Adiciona um item a uma coleção de forma ATÓMICA (segura mesmo que várias
// pessoas diferentes façam isto ao mesmo tempo, ex.: vários atletas a
// submeter pagamento ou a fazer check-in quase ao mesmo segundo). Usa uma
// função do próprio Postgres (ver supabase-estado-app.sql) em vez de
// ler-mudar-gravar a lista inteira no browser.
export async function adicionarItemAtomico(chave, item) {
  const { error } = await supabase.rpc("adicionar_item_colecao", { p_chave: chave, p_item: item });
  if (error) throw error;
}

// Reserva de atividade com verificação de vagas dentro do próprio Postgres
// — mais forte do que só somar o item, porque garante que o limite de
// capacidade nunca é ultrapassado mesmo com vários atletas a reservar ao
// mesmo tempo.
export async function reservarAtividadeAtomico(chave, atividadeId, capacidade, item) {
  const { data, error } = await supabase.rpc("reservar_atividade_atomico", {
    p_chave: chave,
    p_atividade_id: atividadeId,
    p_capacidade: capacidade,
    p_item: item,
  });
  if (error) throw error;
  return data; // { ok: true } ou { ok: false, motivo: "..." }
}

// Gera o número de uma fatura/recibo/proforma E grava o documento, tudo
// numa única operação atómica dentro do Postgres — elimina por completo a
// janela em que dois dispositivos podiam calcular o MESMO próximo número
// ao mesmo tempo. Ver "gerar_documento_atomico" em supabase-estado-app.sql.
export async function gerarDocumentoAtomico(chave, prefixo, ano, documentoSemNumero) {
  const { data, error } = await supabase.rpc("gerar_documento_atomico", {
    p_chave: chave,
    p_prefixo: prefixo,
    p_ano: String(ano),
    p_documento_sem_numero: documentoSemNumero,
  });
  if (error) throw error;
  return data; // documento completo, já com "numero" e "id"
}
