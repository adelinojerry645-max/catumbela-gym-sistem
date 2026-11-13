import React, { useState, useRef, useEffect } from "react";

// Caixa de perguntas rápidas (só para o administrador). Não usa IA nem serviços
// externos: lê as palavras da pergunta ("relatório do dia", "semana", "ontem",
// "vitaminas"...) e responde com os números que já estão no sistema.

const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const dmy = (s) => String(s).split("-").reverse().join("/");
const kz = (n) => `${Math.round(Number(n) || 0).toLocaleString("pt-PT")} Kz`;
const sem = (t) => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const ROTULO = { dinheiro: "Dinheiro (caixa)", tpa: "TPA", express: "Express", transferencia: "Transferência", referencia: "Referência" };
const ORDEM = ["dinheiro", "tpa", "express", "transferencia", "referencia"];
const IGNORAR = new Set(["quanto", "quantos", "quantas", "vendi", "vendeu", "vendemos", "vendido", "vendidos", "vendidas", "vendas", "venda", "ate", "agora", "hoje", "ontem", "semana", "passada", "mes", "este", "esta", "neste", "nesta", "total", "relatorio", "dia", "do", "da", "de", "dos", "das", "foi", "foram", "tem", "para", "pelo", "pela", "entrou", "dinheiro", "caixa", "produto", "produtos", "que", "qual", "quais", "mostra", "mostrar", "fala", "diz"]);

function periodoDaPergunta(t) {
  const hoje = new Date();
  const dia = (d) => ({ ini: iso(d), fim: iso(d) });
  const semanaDe = (d) => {
    const a = new Date(d); a.setDate(a.getDate() - ((a.getDay() + 6) % 7));
    const b = new Date(a); b.setDate(b.getDate() + 6);
    return { ini: iso(a), fim: iso(b) };
  };
  const m = t.match(/(\d{1,2})[\/-](\d{1,2})(?:[\/-](\d{2,4}))?/);
  if (m) {
    const ano = m[3] ? (m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3])) : hoje.getFullYear();
    const d = new Date(ano, Number(m[2]) - 1, Number(m[1]), 12);
    if (!isNaN(d)) return { ...dia(d), rotulo: `dia ${dmy(iso(d))}` };
  }
  if (/semana passada|semana anterior/.test(t)) {
    const d = new Date(hoje); d.setDate(d.getDate() - 7);
    const s = semanaDe(d); return { ...s, rotulo: `semana passada (${dmy(s.ini)} a ${dmy(s.fim)})` };
  }
  if (/semana/.test(t)) { const s = semanaDe(hoje); return { ...s, rotulo: `esta semana (${dmy(s.ini)} a ${dmy(s.fim)})` }; }
  if (/mes passado|mes anterior/.test(t)) {
    const a = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1, 12), b = new Date(hoje.getFullYear(), hoje.getMonth(), 0, 12);
    return { ini: iso(a), fim: iso(b), rotulo: `mês passado (${dmy(iso(a))} a ${dmy(iso(b))})` };
  }
  if (/\bmes\b/.test(t)) {
    const a = new Date(hoje.getFullYear(), hoje.getMonth(), 1, 12);
    return { ini: iso(a), fim: iso(hoje), rotulo: `este mês (desde ${dmy(iso(a))})` };
  }
  if (/anteontem/.test(t)) { const d = new Date(hoje); d.setDate(d.getDate() - 2); return { ...dia(d), rotulo: `anteontem (${dmy(iso(d))})` }; }
  if (/ontem/.test(t)) { const d = new Date(hoje); d.setDate(d.getDate() - 1); return { ...dia(d), rotulo: `ontem (${dmy(iso(d))})` }; }
  if (/hoje|\bdia\b|relatorio/.test(t)) return { ...dia(hoje), rotulo: `hoje (${dmy(iso(hoje))})` };
  return null;
}

export function responder(pergunta, { pagamentosFeitos, faturas, acessos, reconstruir }) {
  const t = sem(pergunta);
  if (!t.trim()) return "Escreva uma pergunta, por exemplo: relatório do dia.";
  const periodo = periodoDaPergunta(t);
  const recibos = (faturas || []).filter((f) => f.tipo === "RECIBO");
  const dataIso = (f) => { const [d, m, a] = String(f.data || "").split("/"); return d && m && a ? `${a}-${m.padStart(2, "0")}-${d.padStart(2, "0")}` : ""; };
  const dentro = (s) => (periodo ? s >= periodo.ini && s <= periodo.fim : true);

  // 1) Quanto se vendeu de um produto (ex.: "quantas vitaminas vendemos")
  const palavras = t.replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w.length >= 4 && !IGNORAR.has(w) && !/^\d+$/.test(w));
  if (/vend|quant/.test(t) && palavras.length > 0) {
    const raizes = palavras.map((w) => w.replace(/(es|s)$/, ""));
    const achados = {};
    recibos.filter((f) => dentro(dataIso(f))).forEach((f) => (f.itens || []).forEach((i) => {
      const d = sem(i.descricao);
      if (String(i.referencia || "").startsWith("PLANO-")) return;
      if (raizes.some((r) => d.includes(r))) {
        const k = i.descricao;
        achados[k] = achados[k] || { qtd: 0, total: 0 };
        achados[k].qtd += Number(i.qtd) || 0; achados[k].total += Number(i.total) || 0;
      }
    }));
    const nomes = Object.keys(achados);
    const quando = periodo ? periodo.rotulo : "até agora";
    if (nomes.length === 0) return `Não encontrei vendas de "${palavras.join(" ")}" (${quando}).`;
    const q = nomes.reduce((s, n) => s + achados[n].qtd, 0), v = nomes.reduce((s, n) => s + achados[n].total, 0);
    return `Vendas ${quando}:\n` + nomes.map((n) => `• ${n}: ${achados[n].qtd} (${kz(achados[n].total)})`).join("\n") + (nomes.length > 1 ? `\nTotal: ${q} — ${kz(v)}` : "") + "\n(só conta vendas com recibo)";
  }

  // 2) Relatório de dinheiro por período
  if (periodo) {
    const reconstruidos = reconstruir ? reconstruir(faturas, pagamentosFeitos, dentro) : [];
    const lista = [
      ...(pagamentosFeitos || []).filter((p) => dentro(p.data)),
      ...reconstruidos.flatMap((r) => r.partes.map((x) => ({ metodo: x.metodo, valor: Number(x.valor), tipo: r.tipo, data: r.dataISO }))),
    ];
    const soma = (arr) => arr.reduce((s, p) => s + (Number(p.valor) || 0), 0);
    const total = soma(lista);
    const porMetodo = ORDEM.filter((m, i) => i < 3 || lista.some((p) => p.metodo === m))
      .map((m) => `• ${ROTULO[m]}: ${kz(soma(lista.filter((p) => p.metodo === m)))}`);
    const outrosMetodos = Array.from(new Set(lista.map((p) => p.metodo || "outro"))).filter((m) => !ORDEM.includes(m));
    outrosMetodos.forEach((m) => porMetodo.push(`• ${m}: ${kz(soma(lista.filter((p) => (p.metodo || "outro") === m)))}`));
    const vendas = soma(lista.filter((p) => p.tipo === "venda"));
    const subs = soma(lista.filter((p) => p.tipo === "mensalidade" || p.tipo === "inscricao"));
    const outros = total - vendas - subs;
    const nAcessos = (acessos || []).filter((a) => dentro(a.data)).length;
    let txt = `Relatório — ${periodo.rotulo}\n\nTOTAL: ${kz(total)}\n\nPor forma de pagamento:\n${porMetodo.join("\n")}\n\nVendas POS: ${kz(vendas)}\nSubscrições e inscrições: ${kz(subs)}`;
    if (outros > 0) txt += `\nOutros: ${kz(outros)}`;
    txt += `\nAcessos ao ginásio: ${nAcessos}`;
    if (periodo.ini !== periodo.fim) {
      const dias = {};
      lista.forEach((p) => { dias[p.data] = (dias[p.data] || 0) + (Number(p.valor) || 0); });
      txt += "\n\nDia a dia:\n" + Object.keys(dias).sort().map((d) => `• ${dmy(d)}: ${kz(dias[d])}`).join("\n");
    }
    return txt;
  }

  return "Não percebi. Experimente:\n• relatório do dia\n• ontem\n• semana\n• mês\n• relatório do dia 10/11\n• quantas vitaminas vendemos";
}

export default function CaixaPerguntas({ pagamentosFeitos, faturas, acessos, reconstruir }) {
  const [aberta, setAberta] = useState(false);
  const [texto, setTexto] = useState("");
  const [msgs, setMsgs] = useState([{ de: "sistema", texto: "Olá! Pergunte, por exemplo: relatório do dia, ontem, semana, mês ou quantas vitaminas vendemos." }]);
  const fim = useRef(null);
  useEffect(() => { if (aberta && fim.current) fim.current.scrollIntoView({ block: "end" }); }, [msgs, aberta]);

  const enviar = (pergunta) => {
    const p = String(pergunta ?? texto).trim();
    if (!p) return;
    let r;
    try { r = responder(p, { pagamentosFeitos, faturas, acessos, reconstruir }); }
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
            {["Relatório do dia", "Ontem", "Semana", "Mês"].map((s) => (
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
