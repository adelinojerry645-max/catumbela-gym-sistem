// Regista os erros que acontecem no site (em qualquer aparelho) na coleção
// "errosSite" do Supabase, para o administrador/suporte os poder ler depois.
// Nunca pode, ele próprio, causar erros: tudo está dentro de try/catch.
import { adicionarItemAtomico } from "./estadoApp";

// O ecrã/utilizador atuais são preenchidos pela aplicação principal.
export const contextoErro = { tela: "", utilizador: "", versao: "" };

const jaEnviados = new Set();
let enviadosNestaSessao = 0;
const MAX_POR_SESSAO = 10;
const IGNORAR = [/ResizeObserver loop/i, /^Script error\.?$/i, /Load failed/i, /Failed to fetch/i, /NetworkError/i];

export function registarErro(origem, erro) {
  try {
    const mensagem = String((erro && erro.message) || erro || "Erro desconhecido").slice(0, 300);
    if (IGNORAR.some((r) => r.test(mensagem))) return;
    const chave = origem + "|" + mensagem;
    if (jaEnviados.has(chave) || enviadosNestaSessao >= MAX_POR_SESSAO) return;
    jaEnviados.add(chave);
    enviadosNestaSessao += 1;
    const item = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      data: new Date().toISOString(),
      origem,
      mensagem,
      pilha: String((erro && erro.stack) || "").slice(0, 700),
      ecra: contextoErro.tela,
      utilizador: contextoErro.utilizador,
      versao: contextoErro.versao,
      aparelho: (navigator.userAgent || "").slice(0, 140),
    };
    adicionarItemAtomico("errosSite", item).catch(() => {});
  } catch {
    /* nunca falhar por causa do registo */
  }
}

let instalado = false;
export function instalarRegistoDeErros() {
  if (instalado) return;
  instalado = true;
  window.addEventListener("error", (e) => registarErro("janela", e.error || e.message));
  window.addEventListener("unhandledrejection", (e) => registarErro("promessa", e.reason));
}
