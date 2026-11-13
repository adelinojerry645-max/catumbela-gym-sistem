import React, { useState, useRef, useEffect } from "react";

// Caixa de perguntas rápidas (só para o administrador). Não usa IA nem serviços
// externos: procura palavras-chave na pergunta (aceita erros de escrita, sinónimos
// e várias formas de perguntar) e responde com os números que já estão no sistema.

const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const dmy = (s) => String(s).split("-").reverse().join("/");
const kz = (n) => `${Math.round(Number(n) || 0).toLocaleString("pt-PT")} Kz`;
const sem = (t) => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const ROTULO = { dinheiro: "Dinheiro (caixa)", tpa: "TPA", express: "Express", transferencia: "Transferência", referencia: "Referência" };
const ORDEM = ["dinheiro", "tpa", "express", "transferencia", "referencia"];
const IGNORAR = new Set(["quanto", "quantos", "quantas", "quantidade", "vendi", "vendeu", "vendemos", "vendido", "vendidos", "vendidas", "vendas", "venda", "vender", "ate", "agora", "hoje", "ontem", "anteontem", "semana", "passada", "passado", "anterior", "mes", "este", "esta", "neste", "nesta", "total", "relatorio", "resumo", "dia", "dias", "do", "da", "de", "dos", "das", "foi", "foram", "tem", "para", "pelo", "pela", "entrou", "entrar", "dinheiro", "caixa", "produto", "produtos", "que", "qual", "quais", "mostra", "mostrar", "fala", "diz", "dizer", "ver", "quero", "preciso", "podes", "pode", "favor", "por", "com", "sem", "uma", "uns", "umas", "nos", "nas", "teve", "tivemos", "temos", "houve", "fizemos", "fez", "fiz", "ultimos", "ultimas", "desde", "todo", "toda", "todos", "todas", "tudo", "sempre", "tpa", "express", "transferencia", "referencia", "atletas", "membros", "alunos", "mensalidade", "mensalidades", "subscricao", "subscricoes", "inscricao", "inscricoes"]);

// Distância de edição (para aceitar erros de escrita, ex.: "relatorrio", "vitamina").
function distancia(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 9;
  const m = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) m[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return m[a.length][b.length];
}
// A pergunta "tem" uma destas palavras? (igual, começa por ela, ou parecida)
function tem(tokens, lista) {
  return tokens.some((w) => lista.some((k) => {
    if (w === k) return true;
    if (k.length >= 4 && w.length >= 4 && (w.startsWith(k) || k.startsWith(w))) return true;
    if (k.length >= 5 && distancia(w, k) <= (k.length >= 9 ? 2 : 1)) return true;
    return false;
  }));
}

function periodoDaPergunta(t, tokens) {
  const hoje = new Date();
  const dia = (d) => ({ ini: iso(d), fim: iso(d) });
  const semanaDe = (d) => {
    const a = new Date(d); a.setDate(a.getDate() - ((a.getDay() + 6) % 7));
    const b = new Date(a); b.setDate(b.getDate() + 6);
    return { ini: iso(a), fim: iso(b) };
  };
  const m = t.match(/(\d{1,2})[\/\-.](\d{1,2})(?:[\/\-.](\d{2,4}))?/);
  if (m && Number(m[1]) <= 31 && Number(m[2]) <= 12) {
    const ano = m[3] ? (m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3])) : hoje.getFullYear();
    const d = new Date(ano, Number(m[2]) - 1, Number(m[1]), 12);
    if (!isNaN(d)) return { ...dia(d), rotulo: `dia ${dmy(iso(d))}` };
  }
  const ult = t.match(/(?:ultimos?|ultimas?|nos)\s+(\d{1,3})\s+dias?/);
  if (ult) {
    const n = Math.min(365, Math.max(1, Number(ult[1])));
    const a = new Date(hoje); a.setDate(a.getDate() - (n - 1));
    return { ini: iso(a), fim: iso(hoje), rotulo: `últimos ${n} dias (${dmy(iso(a))} a ${dmy(iso(hoje))})` };
  }
  const passado = tem(tokens, ["passada", "passado", "anterior"]);
  if (tem(tokens, ["semana"]) && passado) {
    const d = new Date(hoje); d.setDate(d.getDate() - 7);
    const s = semanaDe(d); return { ...s, rotulo: `semana passada (${dmy(s.ini)} a ${dmy(s.fim)})` };
  }
  if (tem(tokens, ["semana", "semanal"])) { const s = semanaDe(hoje); return { ...s, rotulo: `esta semana (${dmy(s.ini)} a ${dmy(s.fim)})` }; }
  if (tem(tokens, ["mes", "mensal"]) && passado) {
    const a = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1, 12), b = new Date(hoje.getFullYear(), hoje.getMonth(), 0, 12);
    return { ini: iso(a), fim: iso(b), rotulo: `mês passado (${dmy(iso(a))} a ${dmy(iso(b))})` };
  }
  if (tokens.includes("mes") || tem(tokens, ["mensal"]) && !tem(tokens, ["mensalidade", "mensalidades"])) {
    const a = new Date(hoje.getFullYear(), hoje.getMonth(), 1, 12);
    return { ini: iso(a), fim: iso(hoje), rotulo: `este mês (desde ${dmy(iso(a))})` };
  }
  if (tem(tokens, ["anteontem"])) { const d = new Date(hoje); d.setDate(d.getDate() - 2); return { ...dia(d), rotulo: `anteontem (${dmy(iso(d))})` }; }
  if (tem(tokens, ["ontem"]) || (tem(tokens, ["anterior"]) && tokens.includes("dia"))) { const d = new Date(hoje); d.setDate(d.getDate() - 1); return { ...dia(d), rotulo: `ontem (${dmy(iso(d))})` }; }
  if (tem(tokens, ["hoje", "hj", "diario", "diaria"])) return { ...dia(hoje), rotulo: `hoje (${dmy(iso(hoje))})` };
  if (tem(tokens, ["tudo", "sempre", "total"]) && tem(tokens, ["sempre", "tudo", "inicio", "agora"])) return { ini: "0000-00-00", fim: "9999-99-99", rotulo: "desde o início", tudo: true };
  if (tokens.includes("agora") && tokens.includes("ate")) return { ini: "0000-00-00", fim: "9999-99-99", rotulo: "até agora", tudo: true };
  return null;
}

function responder(pergunta, { pagamentosFeitos, faturas, acessos, membros, reconstruir }) {
  const t = sem(pergunta);
  if (!t.trim()) return "Escreva uma pergunta, por exemplo: relatório do dia.";
  const tokens = t.replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
  const periodoDito = periodoDaPergunta(t, tokens);
  const hojeISO = iso(new Date());
  const padrao = { ini: hojeISO, fim: hojeISO, rotulo: `hoje (${dmy(hojeISO)})` };
  const periodo = periodoDito || padrao;
  const dentro = (s) => s >= periodo.ini && s <= periodo.fim;
  const recibos = (faturas || []).filter((f) => f.tipo === "RECIBO");
  const dataIso = (f) => { const [d, m, a] = String(f.data || "").split("/"); return d && m && a ? `${a}-${m.padStart(2, "0")}-${d.padStart(2, "0")}` : ""; };

  const metodoPedido = tem(tokens, ["tpa", "multicaixa", "cartao"]) ? "tpa"
    : tem(tokens, ["express"]) ? "express"
    : tem(tokens, ["caixa", "dinheiro", "cash", "numerario", "notas"]) ? "dinheiro"
    : tem(tokens, ["transferencia", "transferencias", "transf"]) ? "transferencia"
    : tem(tokens, ["referencia"]) ? "referencia" : null;

  const pagamentos = () => {
    const rec = reconstruir ? reconstruir(faturas, pagamentosFeitos, dentro) : [];
    return [
      ...(pagamentosFeitos || []).filter((p) => dentro(p.data)),
      ...rec.flatMap((r) => r.partes.map((x) => ({ metodo: x.metodo, valor: Number(x.valor), tipo: r.tipo, data: r.dataISO }))),
    ];
  };
  const soma = (arr) => arr.reduce((s, p) => s + (Number(p.valor) || 0), 0);

  // 1) Quantos atletas (ativos, vencidos...)
  if (tem(tokens, ["atletas", "atleta", "membros", "membro", "alunos", "clientes"]) && tem(tokens, ["quantos", "quantas", "ativos", "ativo", "vencidos", "vencido", "inscritos", "total", "temos", "numero"]) && !tem(tokens, ["vendemos", "vendi", "pagaram", "entraram", "treinaram", "vieram", "inscreveram"])) {
    const ms = membros || [];
    const conta = (e) => ms.filter((m) => m.estado === e).length;
    const ativos = conta("ativo"), vencidos = conta("vencido");
    return `Atletas no sistema: ${ms.length}\n• Ativos: ${ativos}\n• Vencidos: ${vencidos}\n• Sem subscrição: ${conta("sem-subscricao")}\n• Outros (suspensos, pausados...): ${ms.length - ativos - vencidos - conta("sem-subscricao")}`;
  }

  // 2) Entradas / acessos ao ginásio
  if (tem(tokens, ["entradas", "entraram", "acessos", "treinaram", "vieram", "frequencia", "presencas", "passaram", "gente", "pessoas", "treino"]) && !metodoPedido) {
    const lista = (acessos || []).filter((a) => dentro(a.data));
    const unicos = new Set(lista.map((a) => a.numero || a.membro)).size;
    return `Acessos — ${periodo.rotulo}\n• Entradas registadas: ${lista.length}\n• Atletas diferentes: ${unicos}`;
  }

  // 3) Dinheiro por forma de pagamento (ex.: "quanto entrou no TPA hoje")
  if (metodoPedido && !tem(tokens, ["vendemos", "vendi", "vendidas", "vendidos"]) ) {
    const lista = pagamentos().filter((p) => p.metodo === metodoPedido);
    const por = (f) => soma(lista.filter(f));
    let txt = `${ROTULO[metodoPedido]} — ${periodo.rotulo}\n\nTOTAL: ${kz(soma(lista))} (${lista.length} pagamento${lista.length === 1 ? "" : "s"})\n• Vendas POS: ${kz(por((p) => p.tipo === "venda"))}\n• Subscrições e inscrições: ${kz(por((p) => p.tipo === "mensalidade" || p.tipo === "inscricao"))}`;
    const outros = por((p) => !["venda", "mensalidade", "inscricao"].includes(p.tipo));
    if (outros > 0) txt += `\n• Outros: ${kz(outros)}`;
    return txt;
  }

  // 4) Produto vendido (ex.: "quantas vitaminas vendemos")
  const palavras = tokens.filter((w) => w.length >= 4 && !IGNORAR.has(w) && !/^\d+$/.test(w));
  const querProduto = tem(tokens, ["vendemos", "vendi", "vendeu", "vendidos", "vendidas", "vendas", "venda", "quantos", "quantas", "quantidade", "saiu", "sairam"]);
  const achaProduto = () => {
    const periodoProduto = periodoDito || { ini: "0000-00-00", fim: "9999-99-99", rotulo: "até agora" };
    const raizes = palavras.map((w) => w.replace(/(es|s)$/, ""));
    const achados = {};
    recibos.filter((f) => { const s = dataIso(f); return s >= periodoProduto.ini && s <= periodoProduto.fim; }).forEach((f) => (f.itens || []).forEach((i) => {
      if (String(i.referencia || "").startsWith("PLANO-")) return;
      const d = sem(i.descricao);
      if (raizes.some((r) => d.includes(r) || distancia(d, r) <= 1)) {
        const k = i.descricao;
        achados[k] = achados[k] || { qtd: 0, total: 0 };
        achados[k].qtd += Number(i.qtd) || 0; achados[k].total += Number(i.total) || 0;
      }
    }));
    const nomes = Object.keys(achados);
    if (nomes.length === 0) return null;
    const q = nomes.reduce((s, n) => s + achados[n].qtd, 0), v = nomes.reduce((s, n) => s + achados[n].total, 0);
    return `Vendas ${periodoProduto.rotulo}:\n` + nomes.map((n) => `• ${n}: ${achados[n].qtd} (${kz(achados[n].total)})`).join("\n") + (nomes.length > 1 ? `\nTotal: ${q} — ${kz(v)}` : "") + "\n(só conta vendas com recibo)";
  };
  if (palavras.length > 0 && querProduto) {
    const r = achaProduto();
    if (r) return r;
    return `Não encontrei vendas de "${palavras.join(" ")}" (${periodoDito ? periodoDito.rotulo : "até agora"}).`;
  }

  // 5) Mensalidades / subscrições / inscrições / vendas de hoje
  const so = tem(tokens, ["mensalidade", "mensalidades", "subscricao", "subscricoes", "inscricao", "inscricoes", "planos"]) ? "subs" : tem(tokens, ["vendas", "venda", "pos", "produtos", "loja", "bar"]) ? "vendas" : null;
  if (so) {
    const lista = pagamentos().filter((p) => (so === "subs" ? p.tipo === "mensalidade" || p.tipo === "inscricao" : p.tipo === "venda"));
    const por = ORDEM.filter((m) => lista.some((p) => p.metodo === m)).map((m) => `• ${ROTULO[m]}: ${kz(soma(lista.filter((p) => p.metodo === m)))}`);
    return `${so === "subs" ? "Subscrições e inscrições" : "Vendas POS"} — ${periodo.rotulo}\n\nTOTAL: ${kz(soma(lista))} (${lista.length} pagamento${lista.length === 1 ? "" : "s"})` + (por.length ? "\n\n" + por.join("\n") : "");
  }

  // 6) Relatório geral (dia, semana, mês...)
  const querRelatorio = periodoDito || tem(tokens, ["relatorio", "resumo", "total", "entrou", "faturei", "faturamos", "receita", "ganhamos", "ganhei", "fizemos", "balanco", "fecho", "dinheiro", "caixa", "movimento", "movimentos", "contas"]);
  if (querRelatorio) {
    const lista = pagamentos();
    const total = soma(lista);
    const porMetodo = ORDEM.filter((m, i) => i < 3 || lista.some((p) => p.metodo === m))
      .map((m) => `• ${ROTULO[m]}: ${kz(soma(lista.filter((p) => p.metodo === m)))}`);
    Array.from(new Set(lista.map((p) => p.metodo || "outro"))).filter((m) => !ORDEM.includes(m))
      .forEach((m) => porMetodo.push(`• ${m}: ${kz(soma(lista.filter((p) => (p.metodo || "outro") === m)))}`));
    const vendas = soma(lista.filter((p) => p.tipo === "venda"));
    const subs = soma(lista.filter((p) => p.tipo === "mensalidade" || p.tipo === "inscricao"));
    const outros = total - vendas - subs;
    const nAcessos = (acessos || []).filter((a) => dentro(a.data)).length;
    let txt = `Relatório — ${periodo.rotulo}\n\nTOTAL: ${kz(total)}\n\nPor forma de pagamento:\n${porMetodo.join("\n")}\n\nVendas POS: ${kz(vendas)}\nSubscrições e inscrições: ${kz(subs)}`;
    if (outros > 0) txt += `\nOutros: ${kz(outros)}`;
    txt += `\nAcessos ao ginásio: ${nAcessos}`;
    if (periodo.ini !== periodo.fim && !periodo.tudo) {
      const dias = {};
      lista.forEach((p) => { dias[p.data] = (dias[p.data] || 0) + (Number(p.valor) || 0); });
      txt += "\n\nDia a dia:\n" + Object.keys(dias).sort().map((d) => `• ${dmy(d)}: ${kz(dias[d])}`).join("\n");
    }
    return txt;
  }

  // 7) Última tentativa: uma palavra solta que seja o nome de um produto
  if (palavras.length > 0) {
    const r = achaProduto();
    if (r) return r;
  }

  return "Não percebi essa. Experimente, por exemplo:\n• relatório do dia\n• quanto entrou no TPA hoje\n• quanto temos no caixa ontem\n• vendas da semana\n• quantas vitaminas vendemos\n• quantos atletas ativos\n• quantas entradas hoje";
}

export { responder };

export default function CaixaPerguntas({ pagamentosFeitos, faturas, acessos, membros, reconstruir }) {
  const [aberta, setAberta] = useState(false);
  const [texto, setTexto] = useState("");
  const [msgs, setMsgs] = useState([{ de: "sistema", texto: "Olá! Pode perguntar à vontade, por exemplo:\n• relatório do dia\n• quanto entrou no TPA hoje\n• quantas vitaminas vendemos\n• quantos atletas ativos" }]);
  const fim = useRef(null);
  useEffect(() => { if (aberta && fim.current) fim.current.scrollIntoView({ block: "end" }); }, [msgs, aberta]);

  const enviar = (pergunta) => {
    const p = String(pergunta ?? texto).trim();
    if (!p) return;
    let r;
    try { r = responder(p, { pagamentosFeitos, faturas, acessos, membros, reconstruir }); }
    catch { r = "Não consegui calcular isso agora."; }
    setMsgs((m) => [...m, { de: "eu", texto: p }, { de: "sistema", texto: r }]);
    setTexto("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 print:hidden">
      {aberta ? (
        <div className="w-[min(92vw,380px)] max-h-[75vh] flex flex-col rounded-2xl bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700">
            <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">Perguntas rápidas</p>
            <button onClick={() => setAberta(false)} aria-label="Fechar" className="text-slate-400 hover:text-slate-600 text-lg leading-none px-1">×</button>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
            {msgs.map((m, i) => (
              <div key={i} className={m.de === "eu" ? "flex justify-end" : "flex justify-start"}>
                <div className={`max-w-[90%] whitespace-pre-line rounded-xl px-3 py-2 text-sm ${m.de === "eu" ? "bg-slate-800 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100"}`}>{m.texto}</div>
              </div>
            ))}
            <div ref={fim} />
          </div>
          <div className="px-3 pt-1 flex flex-wrap gap-1.5">
            {["Relatório do dia", "Ontem", "Semana", "Mês", "TPA hoje", "Caixa hoje", "Atletas ativos"].map((s) => (
              <button key={s} onClick={() => enviar(s)} className="text-xs rounded-full px-2.5 py-1 ring-1 ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300">{s}</button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); enviar(); }} className="p-3 flex gap-2">
            <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Escreva a sua pergunta…"
              className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-tema-200" />
            <button type="submit" className="bg-slate-800 text-white text-sm font-semibold px-3 py-2 rounded-lg">Enviar</button>
          </form>
        </div>
      ) : (
        <button onClick={() => setAberta(true)} className="rounded-full bg-slate-800 text-white shadow-lg px-4 py-3 text-sm font-semibold">Perguntar</button>
      )}
    </div>
  );
}
