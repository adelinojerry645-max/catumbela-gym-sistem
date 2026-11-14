// Proveitos por competência (regra contabilística: o proveito de um plano
// reconhece-se ao longo do período em que o serviço é prestado, e não no dia em
// que o dinheiro entra). O caixa e o banco continuam a mostrar o dinheiro no dia
// em que entrou; isto só calcula o que, desse dinheiro, ainda NÃO é proveito do
// período (adiantamentos) e o que veio de recibos anteriores e JÁ é proveito.

const diaMs = 86400000;
const paraDia = (iso) => Date.UTC(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10)));
const recibo_iso = (data) => {
  const [d, m, a] = String(data || "").split("/");
  return d && m && a ? `${a}-${m.padStart(2, "0")}-${d.padStart(2, "0")}` : "";
};

// Período de serviço de um item de plano de um recibo, ou null se não der para saber.
export function periodoDoItemPlano(recibo, item) {
  if (!item || !String(item.referencia || "").startsWith("PLANO-")) return null;
  const m = String(item.descricao || "").match(/in[ií]cio (\d{4}-\d{2}-\d{2})/);
  const venc = recibo.vencimentoSubscricao;
  if (!m || !venc || !/^\d{4}-\d{2}-\d{2}$/.test(String(venc))) return null;
  const n = Math.round((paraDia(venc) - paraDia(m[1])) / diaMs);
  if (!(n > 0 && n <= 400)) return null;
  return { inicio: m[1], vencimento: venc, dias: n };
}

// Ajustes para passar de "dinheiro recebido" a "proveitos" no intervalo [ini, fim] (datas ISO).
export function ajustesCompetencia(faturas, ini, fim) {
  let adiantado = 0; // recebido no intervalo, mas serviço ainda por prestar
  let libertado = 0; // recebido antes do intervalo, serviço prestado dentro dele
  let nAdiantados = 0;
  (faturas || []).forEach((f) => {
    if (f.tipo !== "RECIBO") return;
    const dataRec = recibo_iso(f.data);
    if (!dataRec || dataRec > fim) return;
    (f.itens || []).forEach((it) => {
      const per = periodoDoItemPlano(f, it);
      if (!per) return;
      const total = Number(it.total) || 0;
      const a = Math.max(paraDia(per.inicio), paraDia(ini));
      const b = Math.min(paraDia(per.vencimento) - diaMs, paraDia(fim));
      const diasNoPeriodo = b >= a ? Math.round((b - a) / diaMs) + 1 : 0;
      const proveito = (total * diasNoPeriodo) / per.dias;
      if (dataRec >= ini) { adiantado += total - proveito; if (total - proveito > 0.5) nAdiantados++; }
      else libertado += proveito;
    });
  });
  return { adiantado: Math.round(adiantado), libertado: Math.round(libertado), nAdiantados };
}
