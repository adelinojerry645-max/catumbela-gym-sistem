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

export async function gravarColecao(chave, valor) {
  const { error } = await supabase
    .from("estado_app")
    .upsert({ chave, valor, atualizado_em: new Date().toISOString() }, { onConflict: "chave" });
  if (error) throw error;
}

// Sincronização em tempo real — fica "à escuta" de alterações a uma coleção
// específica feitas por QUALQUER dispositivo, e chama "aoAlterar" assim que
// alguém grava, sem precisares de recarregar a página. Usa o Realtime do
// Supabase (Postgres Changes) — precisa de estar ativado na tabela (ver
// supabase-estado-app.sql).
export function subscreverColecao(chave, aoAlterar) {
  const canal = supabase
    .channel(`estado_app_${chave}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "estado_app", filter: `chave=eq.${chave}` },
      (payload) => {
        const novoRegisto = payload.new;
        if (novoRegisto && "valor" in novoRegisto) {
          aoAlterar(novoRegisto.valor);
        }
      }
    )
    .subscribe();
  return canal;
}

export function desligarCanal(canal) {
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
