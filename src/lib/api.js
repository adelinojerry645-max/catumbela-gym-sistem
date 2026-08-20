// Camada de acesso a dados — liga o frontend às tabelas criadas pelo schema.sql
// Substitui os dados mock (MEMBROS_INICIAIS, PLANOS_INICIAIS, etc. em App.jsx)
// por chamadas a estas funções, dentro de useEffect().
import { supabase } from "./supabaseClient";

// --- MEMBROS ---
export async function listarMembros() {
  const { data, error } = await supabase
    .from("membros")
    .select("*, planos(nome, preco_kz)")
    .order("criado_em", { ascending: false });
  if (error) throw error;
  return data;
}

export async function criarMembro(membro) {
  const { data, error } = await supabase.from("membros").insert(membro).select().single();
  if (error) throw error;
  return data;
}

// --- PLANOS ---
export async function listarPlanos() {
  const { data, error } = await supabase.from("planos").select("*").eq("ativo", true);
  if (error) throw error;
  return data;
}

export async function criarPlano(plano) {
  const { data, error } = await supabase.from("planos").insert(plano).select().single();
  if (error) throw error;
  return data;
}

export async function atualizarPrecoPlano(planoId, precoNovo, alteradoPor) {
  // 1. lê o preço atual para guardar no histórico
  const { data: atual, error: erroLeitura } = await supabase
    .from("planos")
    .select("preco_kz")
    .eq("id", planoId)
    .single();
  if (erroLeitura) throw erroLeitura;

  // 2. atualiza o plano
  const { error: erroUpdate } = await supabase
    .from("planos")
    .update({ preco_kz: precoNovo, atualizado_em: new Date().toISOString() })
    .eq("id", planoId);
  if (erroUpdate) throw erroUpdate;

  // 3. regista no histórico de preços
  const { error: erroHistorico } = await supabase.from("planos_historico_precos").insert({
    plano_id: planoId,
    preco_anterior: atual.preco_kz,
    preco_novo: precoNovo,
    alterado_por: alteradoPor,
  });
  if (erroHistorico) throw erroHistorico;
}

// --- PAGAMENTOS ---
export async function registarPagamento(pagamento) {
  const { data, error } = await supabase.from("pagamentos").insert(pagamento).select().single();
  if (error) throw error;
  return data;
}

// --- STOCK / PRODUTOS ---
export async function listarProdutos() {
  const { data, error } = await supabase.from("produtos").select("*").eq("ativo", true);
  if (error) throw error;
  return data;
}

// --- ACESSOS ---
export async function registarEntrada(membroId, registadoPor) {
  const { data, error } = await supabase
    .from("acessos")
    .insert({ membro_id: membroId, entrada_em: new Date().toISOString(), registado_por: registadoPor })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function registarSaida(acessoId) {
  const { error } = await supabase
    .from("acessos")
    .update({ saida_em: new Date().toISOString() })
    .eq("id", acessoId);
  if (error) throw error;
}

// --- AUTENTICAÇÃO (Supabase Auth) ---
export async function entrar(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function sair() {
  await supabase.auth.signOut();
}
