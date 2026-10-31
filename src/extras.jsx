import React, { useState, useMemo, useEffect } from "react";
import { supabase } from "./lib/supabaseClient";
import { QRCodeSVG } from "./lib/QRCodeSVG.jsx";

// Ecrãs novos: opiniões públicas, alertas, ponto de equilíbrio, comissões e
// desafios. Ficam num ficheiro à parte para não crescer ainda mais o App.jsx.

const kz = (n) => (Number(n) || 0).toLocaleString("pt-PT") + " Kz";

function Cartao({ title, action, children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-700 p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_6px_16px_-8px_rgba(15,23,42,0.10)] ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-4 gap-2">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 tracking-tight">{title}</h3>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tema-400";
const btnCls = "bg-tema-500 hover:bg-tema-600 text-white text-sm font-semibold px-4 py-2 rounded-lg";
const btnSuave =
  "text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600";

// ---------- datas ----------
function parseBR(texto) {
  // "31/10/2026" ou "31/10/2026 09:37" -> Date
  if (!texto) return null;
  const m = String(texto).match(/^(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}))?/);
  if (!m) return null;
  return new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0));
}
function parseISO(texto) {
  if (!texto) return null;
  const m = String(texto).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  return new Date(+m[1], +m[2] - 1, +m[3]);
}
const hojeStrISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const mesAtual = () => hojeStrISO().slice(0, 7);
const minutos = (hhmm) => {
  const m = String(hhmm || "").match(/^(\d{1,2}):(\d{2})/);
  return m ? +m[1] * 60 + +m[2] : null;
};

// =====================================================================
// 1) PÁGINA PÚBLICA (sem login) — avaliação / reclamação / sugestão
// =====================================================================
const TIPOS_OPINIAO = [
  { id: "avaliacao", rotulo: "Avaliação" },
  { id: "reclamacao", rotulo: "Reclamação" },
  { id: "sugestao", rotulo: "Sugestão" },
  { id: "elogio", rotulo: "Elogio" },
];

export function PaginaPublicaOpiniao() {
  const [tipo, setTipo] = useState("avaliacao");
  const [estrelas, setEstrelas] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [nome, setNome] = useState("");
  const [contacto, setContacto] = useState("");
  const [estado, setEstado] = useState("a-escrever"); // a-escrever | a-enviar | enviado | erro
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    document.title = "Catumbela Gym — A tua opinião";
  }, []);

  const enviar = async (e) => {
    e.preventDefault();
    setAviso("");
    if (tipo === "avaliacao" && !estrelas) return setAviso("Escolhe de 1 a 5 estrelas.");
    if (tipo !== "avaliacao" && mensagem.trim().length < 5) return setAviso("Escreve a tua mensagem.");
    try {
      const ultimo = Number(localStorage.getItem("catumbela_opiniao_ts") || 0);
      if (Date.now() - ultimo < 60000) return setAviso("Espera um minuto antes de enviar outra.");
    } catch {}
    setEstado("a-enviar");
    const { error } = await supabase.from("opinioes").insert({
      tipo,
      estrelas: estrelas || null,
      mensagem: mensagem.trim().slice(0, 1200) || null,
      nome: nome.trim().slice(0, 80) || null,
      contacto: contacto.trim().slice(0, 60) || null,
    });
    if (error) {
      setEstado("a-escrever");
      return setAviso("Não foi possível enviar agora. Tenta outra vez daqui a pouco.");
    }
    try { localStorage.setItem("catumbela_opiniao_ts", String(Date.now())); } catch {}
    setEstado("enviado");
  };

  return (
    <div className="min-h-screen fundo-vidro bg-slate-50 font-sans text-slate-800 flex items-start sm:items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-4 px-1">
          <img src="/icons/icon-192.png" alt="Catumbela Gym" className="w-12 h-12 rounded-xl bg-white" />
          <div>
            <p className="font-extrabold text-tema-700 leading-tight">CATUMBELA GYM</p>
            <p className="text-xs text-slate-500">A tua opinião ajuda-nos a melhorar</p>
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur rounded-3xl ring-1 ring-white shadow-xl p-5">
          {estado === "enviado" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-tema-100 text-tema-600 flex items-center justify-center text-3xl mx-auto mb-4">✓</div>
              <h1 className="text-xl font-bold text-slate-900">Obrigado!</h1>
              <p className="text-slate-500 mt-2 text-sm">A tua mensagem chegou à direção do ginásio.</p>
              <button
                onClick={() => { setEstado("a-escrever"); setMensagem(""); setEstrelas(0); }}
                className="mt-6 text-sm font-semibold text-tema-600 underline"
              >
                Enviar outra
              </button>
            </div>
          ) : (
            <form onSubmit={enviar} className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {TIPOS_OPINIAO.map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setTipo(t.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold ring-1 ${tipo === t.id ? "bg-tema-500 text-white ring-tema-500" : "bg-white text-slate-600 ring-slate-200"}`}
                  >
                    {t.rotulo}
                  </button>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-1">Que nota dás ao ginásio?</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button type="button" key={n} onClick={() => setEstrelas(n)} aria-label={`${n} estrelas`} className="text-4xl leading-none">
                      <span className={n <= estrelas ? "text-amber-400" : "text-slate-300"}>★</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-1">
                  {tipo === "reclamacao" ? "O que aconteceu?" : tipo === "sugestao" ? "A tua sugestão" : "Queres dizer mais alguma coisa?"}
                </p>
                <textarea
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  rows={4}
                  maxLength={1200}
                  className={inputCls}
                  placeholder="Escreve aqui…"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input value={nome} onChange={(e) => setNome(e.target.value)} maxLength={80} className={inputCls} placeholder="Nome (opcional)" />
                <input value={contacto} onChange={(e) => setContacto(e.target.value)} maxLength={60} className={inputCls} placeholder="Telefone (opcional)" />
              </div>
              <p className="text-[11px] text-slate-400">Podes enviar sem nome. Só a direção do ginásio vê a mensagem.</p>
              {aviso && <p className="text-sm text-red-600 font-medium">{aviso}</p>}
              <button disabled={estado === "a-enviar"} className="w-full bg-tema-500 text-white font-bold py-3 rounded-xl disabled:opacity-60">
                {estado === "a-enviar" ? "A enviar…" : "Enviar"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// 2) ECRÃ DO ADMIN — ler as opiniões
// =====================================================================
export function OpinioesAdmin({ siteUrl }) {
  const [lista, setLista] = useState(null);
  const [filtro, setFiltro] = useState("novas");
  const [erro, setErro] = useState("");
  const origem = (siteUrl && siteUrl.trim()) || (typeof window !== "undefined" ? window.location.origin : "");
  const link = `${origem.replace(/\/$/, "")}/?opiniao=1`;
  const [copiado, setCopiado] = useState(false);

  const carregar = async () => {
    const { data, error } = await supabase.from("opinioes").select("*").order("criado_em", { ascending: false }).limit(300);
    if (error) return setErro("Não foi possível carregar as mensagens.");
    setErro("");
    setLista(data || []);
  };
  useEffect(() => { carregar(); }, []);

  const marcarLida = async (o, lida) => {
    setLista((l) => l.map((x) => (x.id === o.id ? { ...x, lida } : x)));
    await supabase.from("opinioes").update({ lida }).eq("id", o.id);
  };
  const guardarNota = async (o, resposta) => {
    await supabase.from("opinioes").update({ resposta, lida: true }).eq("id", o.id);
    setLista((l) => l.map((x) => (x.id === o.id ? { ...x, resposta, lida: true } : x)));
  };
  const apagar = async (o) => {
    if (!window.confirm("Apagar esta mensagem?")) return;
    setLista((l) => l.filter((x) => x.id !== o.id));
    await supabase.from("opinioes").delete().eq("id", o.id);
  };

  const stats = useMemo(() => {
    const l = lista || [];
    const comNota = l.filter((o) => o.estrelas);
    const media = comNota.length ? comNota.reduce((t, o) => t + o.estrelas, 0) / comNota.length : 0;
    return { total: l.length, novas: l.filter((o) => !o.lida).length, media, reclamacoes: l.filter((o) => o.tipo === "reclamacao").length };
  }, [lista]);

  const visiveis = (lista || []).filter((o) => (filtro === "novas" ? !o.lida : filtro === "reclamacoes" ? o.tipo === "reclamacao" : true));

  return (
    <div className="space-y-5">
      <Cartao title="Link público para os atletas">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
          Qualquer pessoa abre este link (ou lê o QR code) e envia uma avaliação ou reclamação, sem entrar no sistema.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="bg-white p-2 rounded-xl ring-1 ring-slate-200 shrink-0">
            <QRCodeSVG valor={link} tamanho={140} />
          </div>
          <div className="flex-1 min-w-0 w-full">
            <input readOnly value={link} className={inputCls} onFocus={(e) => e.target.select()} />
            <div className="flex gap-2 mt-2">
              <button
                className={btnCls}
                onClick={() => { navigator.clipboard?.writeText(link).then(() => { setCopiado(true); setTimeout(() => setCopiado(false), 1500); }).catch(() => {}); }}
              >
                {copiado ? "Copiado!" : "Copiar link"}
              </button>
              <button className={btnSuave} onClick={() => window.print()}>Imprimir QR</button>
            </div>
          </div>
        </div>
      </Cartao>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          ["Nota média", stats.media ? stats.media.toFixed(1) + " ★" : "—"],
          ["Mensagens", stats.total],
          ["Por ler", stats.novas],
          ["Reclamações", stats.reclamacoes],
        ].map(([t, v]) => (
          <div key={t} className="bg-white dark:bg-slate-800 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-700 p-4">
            <p className="text-xs text-slate-400">{t}</p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{v}</p>
          </div>
        ))}
      </div>

      <Cartao
        title="Mensagens recebidas"
        action={
          <div className="flex gap-1">
            {[["novas", "Por ler"], ["reclamacoes", "Reclamações"], ["todas", "Todas"]].map(([id, r]) => (
              <button key={id} onClick={() => setFiltro(id)} className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${filtro === id ? "bg-tema-500 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200"}`}>{r}</button>
            ))}
          </div>
        }
      >
        {erro && <p className="text-sm text-red-600">{erro}</p>}
        {lista === null && !erro && <p className="text-sm text-slate-400">A carregar…</p>}
        {lista && visiveis.length === 0 && <p className="text-sm text-slate-400">Nada por aqui.</p>}
        <div className="space-y-3">
          {visiveis.map((o) => (
            <CartaoOpiniao key={o.id} o={o} onLida={marcarLida} onNota={guardarNota} onApagar={apagar} />
          ))}
        </div>
      </Cartao>
    </div>
  );
}

function CartaoOpiniao({ o, onLida, onNota, onApagar }) {
  const [nota, setNota] = useState(o.resposta || "");
  const rot = TIPOS_OPINIAO.find((t) => t.id === o.tipo)?.rotulo || o.tipo;
  const cor = o.tipo === "reclamacao" ? "bg-red-100 text-red-700" : o.tipo === "elogio" ? "bg-emerald-100 text-emerald-700" : "bg-tema-100 text-tema-700";
  return (
    <div className={`rounded-xl p-4 ring-1 ${o.lida ? "ring-slate-100 dark:ring-slate-700" : "ring-tema-300 bg-tema-100/40 dark:bg-slate-900/40"}`}>
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${cor}`}>{rot}</span>
        {o.estrelas && <span className="text-amber-400 text-sm">{"★".repeat(o.estrelas)}<span className="text-slate-300">{"★".repeat(5 - o.estrelas)}</span></span>}
        <span className="text-xs text-slate-400 ml-auto">{new Date(o.criado_em).toLocaleString("pt-PT", { dateStyle: "short", timeStyle: "short" })}</span>
      </div>
      {o.mensagem && <p className="text-sm text-slate-800 dark:text-slate-100 mt-2 whitespace-pre-wrap">{o.mensagem}</p>}
      <p className="text-xs text-slate-400 mt-2">
        {o.nome || "Anónimo"}
        {o.contacto ? ` · ${o.contacto}` : ""}
      </p>
      <div className="mt-3 flex gap-2 items-center">
        <input value={nota} onChange={(e) => setNota(e.target.value)} className={inputCls} placeholder="Nota interna (o que foi feito)…" />
        <button className={btnSuave} onClick={() => onNota(o, nota)}>Guardar</button>
      </div>
      <div className="mt-2 flex gap-2">
        <button className={btnSuave} onClick={() => onLida(o, !o.lida)}>{o.lida ? "Marcar por ler" : "Marcar como lida"}</button>
        <button className="text-xs font-semibold px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => onApagar(o)}>Apagar</button>
      </div>
    </div>
  );
}

// =====================================================================
// 3) ALERTAS DE COISAS ESTRANHAS
// =====================================================================
export function AlertasEstranhos({ auditLog, movimentosCaixa, pagamentosFeitos }) {
  const [dias, setDias] = useState(7);
  const limite = useMemo(() => Date.now() - dias * 86400000, [dias]);

  const alertas = useMemo(() => {
    const out = [];
    // a) documentos eliminados
    const elim = (auditLog || []).filter((a) => /^Eliminou/i.test(a.acao || "")).filter((a) => {
      const d = parseBR(a.data); return d && d.getTime() >= limite;
    });
    const porUser = {};
    elim.forEach((a) => { porUser[a.utilizador || "—"] = (porUser[a.utilizador || "—"] || 0) + 1; });
    Object.entries(porUser).forEach(([u, n]) => {
      out.push({ nivel: n >= 3 ? "alto" : "medio", titulo: `${u} eliminou ${n} documento${n > 1 ? "s" : ""}`, detalhe: elim.filter((a) => (a.utilizador || "—") === u).slice(0, 5).map((a) => `${a.data} ${a.hora || ""} — ${a.detalhe}`) });
    });
    // b) ajustes de caixa
    const ajustes = (movimentosCaixa || []).filter((m) => /ajuste/i.test(`${m.subtipo || ""} ${m.descricao || ""}`)).filter((m) => {
      const d = parseBR(m.data); return d && d.getTime() >= limite;
    });
    ajustes.forEach((m) => out.push({ nivel: "alto", titulo: `Ajuste de caixa de ${kz(m.valor)} (${m.direcao || ""})`, detalhe: [`${m.data} — ${m.registadoPor || "sem nome"} — ${m.descricao || ""}`] }));
    // c) pagamentos sem nome de quem recebeu
    const semNome = (pagamentosFeitos || []).filter((p) => (!p.registadoPor || p.registadoPor === "—")).filter((p) => {
      const d = parseISO(p.data); return d && d.getTime() >= limite;
    });
    if (semNome.length) out.push({ nivel: "medio", titulo: `${semNome.length} pagamento${semNome.length > 1 ? "s" : ""} sem nome de quem recebeu (${kz(semNome.reduce((t, p) => t + (+p.valor || 0), 0))})`, detalhe: semNome.slice(0, 6).map((p) => `${p.data} — ${p.planoNome || p.tipo} — ${kz(p.valor)}`) });
    // d) valores muito altos
    const altos = (movimentosCaixa || []).filter((m) => m.direcao === "entrada" && +m.valor >= 20000 && !/ajuste/i.test(`${m.subtipo || ""} ${m.descricao || ""}`)).filter((m) => {
      const d = parseBR(m.data); return d && d.getTime() >= limite;
    });
    altos.forEach((m) => out.push({ nivel: "baixo", titulo: `Entrada grande: ${kz(m.valor)}`, detalhe: [`${m.data} — ${m.registadoPor || "sem nome"} — ${m.descricao || ""}`] }));
    // e) movimentos fora de horas
    const fora = (movimentosCaixa || []).filter((m) => {
      const d = parseBR(m.data); if (!d || d.getTime() < limite) return false;
      const h = d.getHours(); return /\d{2}:\d{2}/.test(m.data) && (h < 6 || h >= 22);
    });
    if (fora.length) out.push({ nivel: "medio", titulo: `${fora.length} movimento${fora.length > 1 ? "s" : ""} de caixa fora de horas (antes das 6h ou depois das 22h)`, detalhe: fora.slice(0, 6).map((m) => `${m.data} — ${m.registadoPor || "—"} — ${kz(m.valor)}`) });
    // f) mesmo valor repetido várias vezes pelo mesmo funcionário no mesmo dia
    const grupos = {};
    (movimentosCaixa || []).forEach((m) => {
      const d = parseBR(m.data); if (!d || d.getTime() < limite || m.direcao !== "entrada") return;
      const k = `${m.data.slice(0, 10)}|${m.registadoPor}|${m.valor}`;
      (grupos[k] = grupos[k] || []).push(m);
    });
    Object.values(grupos).filter((g) => g.length >= 5 && g[0].valor >= 1000).forEach((g) => out.push({ nivel: "baixo", titulo: `${g.length}× ${kz(g[0].valor)} no mesmo dia por ${g[0].registadoPor || "—"}`, detalhe: [`${g[0].data.slice(0, 10)} — confirma se são vendas diferentes`] }));
    const ordem = { alto: 0, medio: 1, baixo: 2 };
    return out.sort((a, b) => ordem[a.nivel] - ordem[b.nivel]);
  }, [auditLog, movimentosCaixa, pagamentosFeitos, limite]);

  const cores = { alto: "bg-red-100 text-red-700", medio: "bg-amber-100 text-amber-700", baixo: "bg-slate-100 text-slate-600" };
  const rot = { alto: "Importante", medio: "Verificar", baixo: "Só para saberes" };

  return (
    <Cartao
      title="Alertas de coisas estranhas"
      action={
        <div className="flex gap-1">
          {[7, 30].map((n) => (
            <button key={n} onClick={() => setDias(n)} className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${dias === n ? "bg-tema-500 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200"}`}>{n} dias</button>
          ))}
        </div>
      }
    >
      {alertas.length === 0 ? (
        <p className="text-sm text-emerald-600 font-medium">Tudo normal nos últimos {dias} dias. ✓</p>
      ) : (
        <div className="space-y-3">
          {alertas.map((a, i) => (
            <div key={i} className="rounded-xl ring-1 ring-slate-100 dark:ring-slate-700 p-3">
              <div className="flex items-start gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${cores[a.nivel]}`}>{rot[a.nivel]}</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{a.titulo}</p>
              </div>
              <ul className="mt-2 space-y-0.5">
                {a.detalhe.map((d, j) => <li key={j} className="text-xs text-slate-500 dark:text-slate-400">{d}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Cartao>
  );
}

// =====================================================================
// 4) PONTO DE EQUILÍBRIO
// =====================================================================
export function PontoEquilibrio({ membros, planos, despesasFixas, setDespesasFixas, custos, pagamentosFeitos }) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const hoje = hojeStrISO();

  const calc = useMemo(() => {
    const ativos = (membros || []).filter((m) => m.vencimento && m.vencimento >= hoje && !["suspenso", "pausada", "cancelado"].includes(m.estado));
    const mensalDoPlano = (nomePlano) => {
      const p = (planos || []).find((x) => x.nome === nomePlano);
      if (!p || p.entradas) return null;
      return (p.preco * 30) / Math.max(1, p.duracaoDias || 30);
    };
    const valores = ativos.map((m) => mensalDoPlano(m.plano)).filter((v) => v != null);
    const ticket = valores.length ? valores.reduce((t, v) => t + v, 0) / valores.length : 0;
    const fixas = (despesasFixas || []).reduce((t, d) => t + (+d.valor || 0), 0);
    const equilibrio = ticket ? Math.ceil(fixas / ticket) : 0;
    const receitaEstimada = ticket * ativos.length;
    const mes = mesAtual();
    const recMes = (pagamentosFeitos || []).filter((p) => String(p.data).startsWith(mes)).reduce((t, p) => t + (+p.valor || 0), 0);
    const custMes = (custos || []).filter((c) => String(c.data).startsWith(mes)).reduce((t, c) => t + (+c.valor || 0), 0);
    return { ativos: ativos.length, ticket, fixas, equilibrio, receitaEstimada, recMes, custMes };
  }, [membros, planos, despesasFixas, custos, pagamentosFeitos, hoje]);

  const pct = calc.equilibrio ? Math.min(100, Math.round((calc.ativos / calc.equilibrio) * 100)) : 0;
  const falta = Math.max(0, calc.equilibrio - calc.ativos);

  const adicionar = (e) => {
    e.preventDefault();
    if (!nome.trim() || !(+valor > 0)) return;
    setDespesasFixas((l) => [...l, { id: `${Date.now()}`, nome: nome.trim(), valor: +valor }]);
    setNome(""); setValor("");
  };

  return (
    <div className="space-y-5">
      <Cartao title="Ponto de equilíbrio">
        {calc.equilibrio === 0 ? (
          <p className="text-sm text-slate-500">Adiciona abaixo as tuas despesas fixas do mês (renda, luz, salários…) para ver quantos membros precisas.</p>
        ) : (
          <>
            <p className="text-sm text-slate-500 dark:text-slate-400">Para pagar as despesas fixas precisas de</p>
            <p className="text-4xl font-extrabold text-tema-600">{calc.equilibrio} <span className="text-lg font-bold text-slate-500">membros ativos</span></p>
            <div className="mt-4 h-4 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
              <div className={`h-full rounded-full ${calc.ativos >= calc.equilibrio ? "bg-emerald-500" : "bg-tema-500"}`} style={{ width: `${pct}%` }} />
            </div>
            <p className="text-sm mt-2 text-slate-600 dark:text-slate-300">
              Tens <b>{calc.ativos}</b> ativos ({pct}%).{" "}
              {falta > 0 ? <>Faltam <b>{falta}</b> para cobrir as despesas.</> : <span className="text-emerald-600 font-semibold">Já cobres as despesas fixas. 🎉</span>}
            </p>
          </>
        )}
      </Cartao>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          ["Despesas fixas/mês", kz(calc.fixas)],
          ["Média por membro/mês", kz(Math.round(calc.ticket))],
          ["Receita estimada/mês", kz(Math.round(calc.receitaEstimada))],
          ["Sobra estimada", kz(Math.round(calc.receitaEstimada - calc.fixas))],
        ].map(([t, v]) => (
          <div key={t} className="bg-white dark:bg-slate-800 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-700 p-4">
            <p className="text-xs text-slate-400">{t}</p>
            <p className={`text-lg font-extrabold ${t === "Sobra estimada" && calc.receitaEstimada - calc.fixas < 0 ? "text-red-600" : "text-slate-900 dark:text-slate-100"}`}>{v}</p>
          </div>
        ))}
      </div>

      <Cartao title="Despesas fixas do mês">
        <div className="space-y-2">
          {(despesasFixas || []).map((d) => (
            <div key={d.id} className="flex items-center gap-2 text-sm">
              <span className="flex-1 text-slate-700 dark:text-slate-200">{d.nome}</span>
              <span className="font-semibold">{kz(d.valor)}</span>
              <button className="text-red-500 text-xs font-semibold px-2" onClick={() => setDespesasFixas((l) => l.filter((x) => x.id !== d.id))}>Tirar</button>
            </div>
          ))}
          {(despesasFixas || []).length === 0 && <p className="text-sm text-slate-400">Ainda sem despesas fixas.</p>}
        </div>
        <form onSubmit={adicionar} className="mt-4 flex gap-2">
          <input className={inputCls} value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: Renda, Luz, Salários" />
          <input className={inputCls + " max-w-[130px]"} type="number" inputMode="numeric" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Kz/mês" />
          <button className={btnCls}>+</button>
        </form>
        <p className="text-xs text-slate-400 mt-3">
          Este mês até agora: entraram {kz(calc.recMes)} em pagamentos e saíram {kz(calc.custMes)} em custos registados.
        </p>
      </Cartao>
    </div>
  );
}

// =====================================================================
// 5) COMISSÃO DO PERSONAL
// =====================================================================
export function ComissoesPersonal({ trainers, membros, faturas, comissoes, setComissoes }) {
  const [mes, setMes] = useState(mesAtual());
  const pctDe = (id) => { const c = (comissoes || []).find((x) => x.id === id); return c ? +c.pct : 30; };

  const linhas = useMemo(() => {
    const [a, m] = mes.split("-").map(Number);
    return (trainers || []).map((t) => {
      const alunos = (membros || []).filter((x) => x.trainerId === t.id);
      const ids = new Set(alunos.map((x) => x.id));
      let receita = 0;
      let pagantes = new Set();
      (faturas || []).forEach((f) => {
        if (!f || !f.membro || !ids.has(f.membro.id)) return;
        if (f.estado && /anulad|elimin/i.test(f.estado)) return;
        const d = parseBR(f.data);
        if (!d || d.getFullYear() !== a || d.getMonth() + 1 !== m) return;
        const itens = Array.isArray(f.itens) ? f.itens : [];
        const v = itens.length
          ? itens.filter((i) => i.referencia !== "TAXA-SESSAO-LONGA").reduce((s, i) => s + (+i.total || 0), 0)
          : +f.valor || 0;
        if (v > 0) { receita += v; pagantes.add(f.membro.id); }
      });
      const pct = pctDe(t.id);
      return { t, alunos: alunos.length, pagantes: pagantes.size, receita, pct, comissao: Math.round((receita * pct) / 100) };
    });
  }, [trainers, membros, faturas, mes, comissoes]);

  const total = linhas.reduce((s, l) => s + l.comissao, 0);

  return (
    <Cartao
      title="Comissão dos Personal Trainers"
      action={<input type="month" value={mes} onChange={(e) => setMes(e.target.value)} className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm" />}
    >
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        A comissão é uma percentagem do que os alunos de cada personal pagaram no mês (as taxas de sessão longa não contam).
        Para um aluno contar, atribui-o ao personal em “Personal Trainers”.
      </p>
      <div className="space-y-3">
        {linhas.map((l) => (
          <div key={l.t.id} className="rounded-xl ring-1 ring-slate-100 dark:ring-slate-700 p-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">{l.t.nome}</p>
                <p className="text-xs text-slate-400">{l.alunos} aluno{l.alunos !== 1 ? "s" : ""} · {l.pagantes} pagaram neste mês</p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-500">Comissão</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={l.pct}
                  onChange={(e) => { const v = Math.max(0, Math.min(100, +e.target.value || 0)); setComissoes((c) => [...(c || []).filter((x) => x.id !== l.t.id), { id: l.t.id, pct: v }]); }}
                  className={inputCls + " w-20"}
                />
                <span className="text-sm text-slate-500">%</span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-xs text-slate-400">Os alunos pagaram</p><p className="font-bold">{kz(l.receita)}</p></div>
              <div><p className="text-xs text-slate-400">Comissão a pagar</p><p className="font-extrabold text-tema-600">{kz(l.comissao)}</p></div>
            </div>
          </div>
        ))}
        {linhas.length === 0 && <p className="text-sm text-slate-400">Ainda não há personal trainers registados.</p>}
      </div>
      {linhas.length > 0 && <p className="mt-4 text-right text-sm text-slate-600 dark:text-slate-300">Total de comissões: <b>{kz(total)}</b></p>}
    </Cartao>
  );
}

// =====================================================================
// 6) DESAFIOS DO MÊS
// =====================================================================
function progressoDesafio(d, membros, acessos) {
  const ini = d.inicio, fim = d.fim;
  const por = {};
  (acessos || []).forEach((a) => {
    const dia = String(a.data || "").slice(0, 10);
    if (dia < ini || dia > fim) return;
    const o = (por[a.numero] = por[a.numero] || { dias: new Set(), horas: 0 });
    o.dias.add(dia);
    const e = minutos(a.entrada), s = minutos(a.saida);
    if (e != null && s != null && s > e) o.horas += Math.min(120, s - e) / 60;
  });
  return (membros || [])
    .filter((m) => d.sexo === "todos" || !d.sexo || m.sexo === d.sexo)
    .map((m) => {
      const p = por[m.numero];
      const valor = p ? (d.tipo === "horas" ? p.horas : p.dias.size) : 0;
      return { m, valor, pct: d.meta ? Math.min(100, Math.round((valor / d.meta) * 100)) : 0 };
    })
    .filter((x) => x.valor > 0)
    .sort((a, b) => b.valor - a.valor);
}

export function DesafiosMes({ desafios, setDesafios, membros, acessos }) {
  const hoje = hojeStrISO();
  const [form, setForm] = useState({ titulo: "", tipo: "dias", meta: 20, sexo: "todos", premio: "" });
  const ultimoDia = () => {
    const d = new Date(); return `${hoje.slice(0, 8)}${String(new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()).padStart(2, "0")}`;
  };
  const criar = (e) => {
    e.preventDefault();
    if (!form.titulo.trim() || !(+form.meta > 0)) return;
    setDesafios((l) => [{ id: `${Date.now()}`, titulo: form.titulo.trim(), tipo: form.tipo, meta: +form.meta, sexo: form.sexo, premio: form.premio.trim(), inicio: `${hoje.slice(0, 8)}01`, fim: ultimoDia() }, ...(l || [])]);
    setForm({ titulo: "", tipo: "dias", meta: 20, sexo: "todos", premio: "" });
  };
  const sugestoes = [
    { titulo: "20 treinos este mês", tipo: "dias", meta: 20 },
    { titulo: "Maratona: 30 horas de treino", tipo: "horas", meta: 30 },
    { titulo: "Frequência de ferro: 12 dias", tipo: "dias", meta: 12 },
  ];

  return (
    <div className="space-y-5">
      <Cartao title="Novo desafio do mês">
        <div className="flex flex-wrap gap-2 mb-3">
          {sugestoes.map((s) => (
            <button key={s.titulo} type="button" className={btnSuave} onClick={() => setForm((f) => ({ ...f, ...s }))}>{s.titulo}</button>
          ))}
        </div>
        <form onSubmit={criar} className="grid grid-cols-2 gap-2">
          <input className={inputCls + " col-span-2"} placeholder="Nome do desafio" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
          <select className={inputCls} value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
            <option value="dias">Dias treinados</option>
            <option value="horas">Horas de treino</option>
          </select>
          <input className={inputCls} type="number" min="1" value={form.meta} onChange={(e) => setForm({ ...form, meta: e.target.value })} placeholder="Meta" />
          <select className={inputCls} value={form.sexo} onChange={(e) => setForm({ ...form, sexo: e.target.value })}>
            <option value="todos">Homens e mulheres</option>
            <option value="M">Só homens</option>
            <option value="F">Só mulheres</option>
          </select>
          <input className={inputCls} placeholder="Prémio (opcional)" value={form.premio} onChange={(e) => setForm({ ...form, premio: e.target.value })} />
          <button className={btnCls + " col-span-2"}>Criar desafio deste mês</button>
        </form>
      </Cartao>

      {(desafios || []).length === 0 && <p className="text-sm text-slate-400 px-1">Ainda não há desafios. Cria o primeiro acima.</p>}
      {(desafios || []).map((d) => {
        const rank = progressoDesafio(d, membros, acessos);
        const concluidos = rank.filter((r) => r.valor >= d.meta).length;
        const ativo = hoje >= d.inicio && hoje <= d.fim;
        return (
          <Cartao
            key={d.id}
            title={d.titulo}
            action={<button className="text-xs font-semibold text-red-500" onClick={() => window.confirm("Apagar este desafio?") && setDesafios((l) => l.filter((x) => x.id !== d.id))}>Apagar</button>}
          >
            <p className="text-xs text-slate-400 mb-3">
              Meta: {d.meta} {d.tipo === "horas" ? "horas" : "dias"} · {d.inicio.split("-").reverse().join("/")} a {d.fim.split("-").reverse().join("/")} · {ativo ? "a decorrer" : "terminado"}
              {d.sexo && d.sexo !== "todos" ? ` · ${d.sexo === "M" ? "homens" : "mulheres"}` : ""}
              {d.premio ? ` · prémio: ${d.premio}` : ""}
            </p>
            <p className="text-sm mb-3"><b className="text-tema-600">{concluidos}</b> já cumpriram a meta</p>
            <div className="space-y-2">
              {rank.slice(0, 10).map((r, i) => (
                <div key={r.m.id}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-800 dark:text-slate-100">{i + 1}. {r.m.nome}</span>
                    <span className={r.valor >= d.meta ? "text-emerald-600 font-bold" : "text-slate-500"}>
                      {d.tipo === "horas" ? r.valor.toFixed(1) : r.valor}/{d.meta}{r.valor >= d.meta ? " ✓" : ""}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden mt-1">
                    <div className={`h-full rounded-full ${r.valor >= d.meta ? "bg-emerald-500" : "bg-tema-500"}`} style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
              {rank.length === 0 && <p className="text-sm text-slate-400">Ainda ninguém treinou neste período.</p>}
            </div>
          </Cartao>
        );
      })}
    </div>
  );
}

// =====================================================================
// 7) CONTAS A PAGAR
// =====================================================================
const dataISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
function diasAte(iso) {
  const a = parseISO(iso); const h = parseISO(hojeStrISO());
  return a && h ? Math.round((a - h) / 86400000) : 0;
}
export function maisUmMes(iso) {
  const d = parseISO(iso) || new Date();
  const dia = d.getDate();
  const r = new Date(d.getFullYear(), d.getMonth() + 1, 1);
  const ultimo = new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate();
  r.setDate(Math.min(dia, ultimo));
  return dataISO(r);
}
export function contasUrgentes(contas) {
  return (contas || []).filter((c) => c.estado !== "paga" && diasAte(c.vencimento) <= 3).length;
}

export function ContasAPagar({ contas, setContas, categorias, contasBancarias, onPagar }) {
  const vazio = () => ({ fornecedor: "", descricao: "", valor: "", vencimento: hojeStrISO(), categoria: categorias[0] || "Outros", repete: false });
  const [form, setForm] = useState(vazio);
  const [aPagar, setAPagar] = useState(null); // id
  const [pagoDe, setPagoDe] = useState("caixa");
  const [contaBanco, setContaBanco] = useState(contasBancarias[0]?.id || "");
  const [aviso, setAviso] = useState("");

  const pendentes = (contas || []).filter((c) => c.estado !== "paga").sort((a, b) => a.vencimento.localeCompare(b.vencimento));
  const pagas = (contas || []).filter((c) => c.estado === "paga").sort((a, b) => (b.dataPagamento || "").localeCompare(a.dataPagamento || "")).slice(0, 10);
  const soma = (l) => l.reduce((t, c) => t + (+c.valor || 0), 0);
  const atrasadas = pendentes.filter((c) => diasAte(c.vencimento) < 0);
  const semana = pendentes.filter((c) => { const d = diasAte(c.vencimento); return d >= 0 && d <= 7; });
  const mes = pendentes.filter((c) => c.vencimento.startsWith(mesAtual()));

  const adicionar = (e) => {
    e.preventDefault();
    if (!form.fornecedor.trim() || !(+form.valor > 0) || !form.vencimento) return;
    setContas((l) => [...(l || []), { id: `${Date.now()}`, fornecedor: form.fornecedor.trim(), descricao: form.descricao.trim(), valor: +form.valor, vencimento: form.vencimento, categoria: form.categoria, repete: form.repete, estado: "pendente" }]);
    setForm(vazio());
  };

  const confirmarPagamento = (c) => {
    setAviso("");
    const ok = onPagar(c, pagoDe, contaBanco);
    if (ok === false) return setAviso("Não foi possível pagar: o saldo não chega. Confirma o Caixa ou o Banco.");
    setContas((l) => {
      const nova = (l || []).map((x) => (x.id === c.id ? { ...x, estado: "paga", dataPagamento: hojeStrISO(), pagoDe } : x));
      if (c.repete) nova.push({ ...c, id: `${Date.now()}-r`, vencimento: maisUmMes(c.vencimento), estado: "pendente", dataPagamento: undefined, pagoDe: undefined });
      return nova;
    });
    setAPagar(null);
  };

  const chip = (c) => {
    const d = diasAte(c.vencimento);
    if (d < 0) return ["bg-red-100 text-red-700", `Atrasada ${-d} dia${d === -1 ? "" : "s"}`];
    if (d === 0) return ["bg-amber-100 text-amber-700", "Vence hoje"];
    if (d === 1) return ["bg-amber-100 text-amber-700", "Vence amanhã"];
    if (d <= 3) return ["bg-amber-100 text-amber-700", `Vence em ${d} dias`];
    return ["bg-slate-100 text-slate-600", `Em ${d} dias`];
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        {[
          ["Em atraso", atrasadas.length ? `${atrasadas.length} · ${kz(soma(atrasadas))}` : "Nenhuma", atrasadas.length ? "text-red-600" : "text-emerald-600"],
          ["Próximos 7 dias", kz(soma(semana)), "text-slate-900 dark:text-slate-100"],
          ["A pagar este mês", kz(soma(mes)), "text-slate-900 dark:text-slate-100"],
        ].map(([t, v, c]) => (
          <div key={t} className="bg-white dark:bg-slate-800 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-700 p-3">
            <p className="text-[11px] text-slate-400">{t}</p>
            <p className={`text-sm sm:text-lg font-extrabold ${c}`}>{v}</p>
          </div>
        ))}
      </div>

      <Cartao title="Nova conta a pagar">
        <form onSubmit={adicionar} className="grid grid-cols-2 gap-2">
          <input className={inputCls} placeholder="Quem recebe (fornecedor)" value={form.fornecedor} onChange={(e) => setForm({ ...form, fornecedor: e.target.value })} />
          <input className={inputCls} placeholder="Para quê (opcional)" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
          <input className={inputCls} type="number" inputMode="numeric" placeholder="Valor (Kz)" value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} />
          <input className={inputCls} type="date" value={form.vencimento} onChange={(e) => setForm({ ...form, vencimento: e.target.value })} />
          <select className={inputCls} value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
            {categorias.map((c) => <option key={c}>{c}</option>)}
          </select>
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input type="checkbox" checked={form.repete} onChange={(e) => setForm({ ...form, repete: e.target.checked })} /> Repete todos os meses
          </label>
          <button className={btnCls + " col-span-2"}>Guardar conta</button>
        </form>
      </Cartao>

      <Cartao title={`A pagar (${pendentes.length})`}>
        {aviso && <p className="text-sm text-red-600 mb-3">{aviso}</p>}
        {pendentes.length === 0 && <p className="text-sm text-slate-400">Não tens contas por pagar. 🎉</p>}
        <div className="space-y-3">
          {pendentes.map((c) => {
            const [cor, txt] = chip(c);
            return (
              <div key={c.id} className="rounded-xl ring-1 ring-slate-100 dark:ring-slate-700 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-slate-100 truncate">{c.fornecedor}</p>
                    <p className="text-xs text-slate-400 truncate">{c.categoria}{c.descricao ? ` · ${c.descricao}` : ""}{c.repete ? " · mensal" : ""}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-extrabold">{kz(c.valor)}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cor}`}>{txt}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-1">Vence a {c.vencimento.split("-").reverse().join("/")}</p>
                {aPagar === c.id ? (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <select className={inputCls + " w-auto"} value={pagoDe} onChange={(e) => setPagoDe(e.target.value)}>
                      <option value="caixa">Pagar do Caixa</option>
                      <option value="banco">Pagar do Banco</option>
                    </select>
                    {pagoDe === "banco" && contasBancarias.length > 0 && (
                      <select className={inputCls + " w-auto"} value={contaBanco} onChange={(e) => setContaBanco(e.target.value)}>
                        {contasBancarias.map((b) => <option key={b.id} value={b.id}>{b.banco}</option>)}
                      </select>
                    )}
                    <button className={btnCls} onClick={() => confirmarPagamento(c)}>Confirmar</button>
                    <button className={btnSuave} onClick={() => setAPagar(null)}>Cancelar</button>
                  </div>
                ) : (
                  <div className="mt-3 flex gap-2">
                    <button className={btnCls} onClick={() => { setAPagar(c.id); setAviso(""); }}>Pagar</button>
                    <button className="text-xs font-semibold px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => window.confirm("Apagar esta conta?") && setContas((l) => l.filter((x) => x.id !== c.id))}>Apagar</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Cartao>

      {pagas.length > 0 && (
        <Cartao title="Pagas recentemente">
          <div className="space-y-2">
            {pagas.map((c) => (
              <div key={c.id} className="flex justify-between text-sm">
                <span className="text-slate-700 dark:text-slate-200">{c.fornecedor} <span className="text-xs text-slate-400">· {String(c.dataPagamento || "").split("-").reverse().join("/")}</span></span>
                <span className="font-semibold">{kz(c.valor)}</span>
              </div>
            ))}
          </div>
        </Cartao>
      )}
    </div>
  );
}

// =====================================================================
// 8) PÁGINA PÚBLICA DO GINÁSIO (sem login)
// =====================================================================
const HORARIO_PADRAO = "Segunda a sábado\n7h às 10h\n17h às 20h";

function textoPlano(p) {
  if (p.entradas) return `${p.entradas} entradas`;
  const d = p.duracaoDias;
  if (d === 7) return "1 semana";
  if (d === 15) return "2 semanas";
  if (d === 30) return "1 mês";
  return `${d} dias`;
}

export function PaginaPublicaGinasio() {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(false);
  useEffect(() => {
    document.title = "Catumbela Gym";
    supabase.rpc("pagina_publica").then(({ data, error }) => {
      if (error || !data) setErro(true); else setDados(data);
    });
  }, []);

  const g = dados?.ginasio || {};
  const cfg = dados?.config || {};
  const planos = (dados?.planos || []).filter((p) => !(cfg.planosOcultos || []).includes(p.id));
  const tel = String(cfg.whatsapp || g.telefone || "").replace(/\D/g, "");
  const wa = tel ? `https://wa.me/${tel.length <= 9 ? "244" + tel : tel}?text=${encodeURIComponent("Olá! Gostava de saber mais sobre o Catumbela Gym.")}` : null;
  const morada = [g.morada, g.cidade, "Angola"].filter(Boolean).join(", ");
  const base = typeof window !== "undefined" ? window.location.origin : "";

  const Bloco = ({ titulo: t, children }) => (
    <div className="bg-white/90 backdrop-blur rounded-3xl ring-1 ring-white shadow-lg p-5">
      <h2 className="font-extrabold text-slate-900 mb-3">{t}</h2>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen fundo-vidro bg-slate-50 font-sans text-slate-800 p-4">
      <div className="max-w-md mx-auto space-y-4">
        <div className="text-center pt-4">
          <img src="/icons/icon-192.png" alt="Catumbela Gym" className="w-24 h-24 rounded-3xl bg-white mx-auto shadow-lg" />
          <h1 className="text-2xl font-extrabold text-tema-700 mt-3">CATUMBELA GYM</h1>
          <p className="text-slate-500 text-sm">{cfg.descricao || "Força, foco e resultados."}</p>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <a href={`${base}/?inscricao=1`} className="bg-tema-500 text-white font-bold py-3.5 rounded-2xl text-center shadow-lg">Quero inscrever-me</a>
          {wa && <a href={wa} target="_blank" rel="noreferrer" className="bg-white text-tema-700 font-bold py-3.5 rounded-2xl text-center ring-1 ring-tema-300">Falar no WhatsApp</a>}
        </div>

        {erro && <p className="text-center text-sm text-slate-500">Não foi possível carregar os dados agora. Tenta daqui a pouco.</p>}

        <Bloco titulo="Horário">
          <p className="whitespace-pre-line text-slate-700">{cfg.horario || HORARIO_PADRAO}</p>
        </Bloco>

        {planos.length > 0 && (
          <Bloco titulo="Planos">
            <div className="divide-y divide-slate-100">
              {planos.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-2.5 gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 text-sm">{p.nome}</p>
                    <p className="text-xs text-slate-400">{textoPlano(p)}</p>
                  </div>
                  {cfg.mostrarPrecos !== false && <p className="font-extrabold text-tema-600 shrink-0">{kz(p.preco)}</p>}
                </div>
              ))}
            </div>
          </Bloco>
        )}

        <Bloco titulo="Onde estamos">
          <p className="text-slate-700 text-sm">{g.morada}{g.cidade ? `, ${g.cidade}` : ""}</p>
          {g.telefone && <p className="text-slate-500 text-sm mt-1">Tel.: {g.telefone}</p>}
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(morada)}`} target="_blank" rel="noreferrer" className="inline-block mt-3 text-sm font-bold text-tema-600 underline">Abrir no mapa</a>
        </Bloco>

        <div className="text-center pb-6">
          <a href={`${base}/?opiniao=1`} className="text-sm text-slate-500 underline">Deixar a tua opinião ou reclamação</a>
        </div>
      </div>
    </div>
  );
}

// Admin: configurar o que aparece na página pública
export function ConfigPaginaPublica({ planos, config, setConfig, siteUrl }) {
  const c = (config && config[0]) || {};
  const origem = (siteUrl && siteUrl.trim()) || (typeof window !== "undefined" ? window.location.origin : "");
  const link = `${origem.replace(/\/$/, "")}/?ginasio=1`;
  const [copiado, setCopiado] = useState(false);
  const atualizar = (parte) => setConfig([{ ...c, ...parte }]);
  const ocultos = c.planosOcultos || [];

  return (
    <div className="space-y-5">
      <Cartao title="Link da página pública">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Põe este link no Instagram, no WhatsApp ou imprime o QR. Mostra o horário, os planos e como chegar, e tem botão para se inscrever.</p>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="bg-white p-2 rounded-xl ring-1 ring-slate-200 shrink-0"><QRCodeSVG valor={link} tamanho={140} /></div>
          <div className="flex-1 min-w-0 w-full">
            <input readOnly value={link} className={inputCls} onFocus={(e) => e.target.select()} />
            <div className="flex gap-2 mt-2">
              <button className={btnCls} onClick={() => navigator.clipboard?.writeText(link).then(() => { setCopiado(true); setTimeout(() => setCopiado(false), 1500); }).catch(() => {})}>{copiado ? "Copiado!" : "Copiar link"}</button>
              <a href={link} target="_blank" rel="noreferrer" className={btnSuave + " inline-flex items-center"}>Ver página</a>
            </div>
          </div>
        </div>
      </Cartao>

      <Cartao title="O que aparece">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-500">Frase curta</label>
            <input className={inputCls} value={c.descricao || ""} onChange={(e) => atualizar({ descricao: e.target.value })} placeholder="Força, foco e resultados." />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Horário (uma linha por linha)</label>
            <textarea rows={4} className={inputCls} value={c.horario ?? HORARIO_PADRAO} onChange={(e) => atualizar({ horario: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">WhatsApp (se for diferente do telefone do ginásio)</label>
            <input className={inputCls} value={c.whatsapp || ""} onChange={(e) => atualizar({ whatsapp: e.target.value })} placeholder="9xx xxx xxx" />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
            <input type="checkbox" checked={c.mostrarPrecos !== false} onChange={(e) => atualizar({ mostrarPrecos: e.target.checked })} /> Mostrar os preços
          </label>
        </div>
      </Cartao>

      <Cartao title="Planos visíveis">
        <div className="space-y-2">
          {(planos || []).map((p) => (
            <label key={p.id} className="flex items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <input type="checkbox" checked={!ocultos.includes(p.id)} onChange={(e) => atualizar({ planosOcultos: e.target.checked ? ocultos.filter((x) => x !== p.id) : [...ocultos, p.id] })} />
                {p.nome}
              </span>
              <span className="font-semibold text-slate-500">{kz(p.preco)}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-3">Não aparecem na página: contas bancárias, NIF nem dados dos atletas.</p>
      </Cartao>
    </div>
  );
}

// =====================================================================
// 9) PAINEL DO DONO: retenção, previsão de renovações, ranking de vendas
// =====================================================================
const somaDias = (iso, n) => { const d = parseISO(iso); d.setDate(d.getDate() + n); return dataISO(d); };
const segundaDe = (iso) => { const d = parseISO(iso); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return dataISO(d); };
const ddmm = (iso) => iso.split("-").reverse().slice(0, 2).join("/");

function calcularRetencao(historico) {
  const ACOES = ["renovacao", "subscricao", "ajuste-dias"];
  const regs = (historico || []).filter((h) => ACOES.includes(h.acao) && h.vencimentoNovo && h.data && h.membroId != null);
  if (regs.length === 0) return { semanas: [], media: null };
  const porMembro = {};
  regs.forEach((h) => { (porMembro[h.membroId] = porMembro[h.membroId] || []).push({ ini: String(h.data).slice(0, 10), fim: String(h.vencimentoNovo).slice(0, 10) }); });
  const primeiro = {};
  Object.entries(porMembro).forEach(([id, l]) => { primeiro[id] = l.reduce((m, x) => (x.ini < m ? x.ini : m), "9999"); });
  const dadosDesde = regs.reduce((m, h) => (String(h.data).slice(0, 10) < m ? String(h.data).slice(0, 10) : m), "9999");
  const seg0 = segundaDe(hojeStrISO());
  const semanas = [];
  for (let i = 9; i >= 0; i--) {
    const seg = somaDias(seg0, -7 * i), dom = somaDias(seg, 6);
    if (seg < somaDias(segundaDe(dadosDesde), 7)) continue; // semanas com histórico incompleto
    const ativos = new Set(Object.keys(porMembro).filter((id) => porMembro[id].some((x) => x.ini <= dom && x.fim >= seg)));
    semanas.push({ seg, dom, ativos });
  }
  const linhas = semanas.map((s, i) => {
    const ant = i > 0 ? semanas[i - 1].ativos : null;
    const novos = [...s.ativos].filter((id) => primeiro[id] >= s.seg && primeiro[id] <= s.dom).length;
    let perderam = 0, ficaram = 0;
    if (ant) ant.forEach((id) => { if (s.ativos.has(id)) ficaram++; else perderam++; });
    const retencao = ant && ant.size ? Math.round((ficaram / ant.size) * 100) : null;
    const ehAtual = hojeStrISO() >= s.seg && hojeStrISO() <= s.dom;
    return { seg: s.seg, dom: s.dom, ativos: s.ativos.size, novos, perderam, retencao, ehAtual };
  });
  const comRet = linhas.filter((l) => l.retencao != null && !l.ehAtual);
  const media = comRet.length ? Math.round(comRet.reduce((t, l) => t + l.retencao, 0) / comRet.length) : null;
  return { semanas: linhas, media };
}

export function PainelDono({ membros, planos, historicoSubscricoes, faturas }) {
  const hoje = hojeStrISO();
  const ret = useMemo(() => calcularRetencao(historicoSubscricoes), [historicoSubscricoes]);

  // ---- previsão de renovações ----
  const prev = useMemo(() => {
    const precoDe = (nome) => (planos || []).find((p) => p.nome === nome)?.preco || 0;
    const ok = (m) => m.vencimento && !["suspenso", "pausada", "cancelado"].includes(m.estado);
    const dias = [];
    for (let i = 0; i < 7; i++) {
      const dia = somaDias(hoje, i);
      const lista = (membros || []).filter((m) => ok(m) && m.vencimento === dia);
      dias.push({ dia, n: lista.length, valor: lista.reduce((t, m) => t + precoDe(m.plano), 0) });
    }
    const total = dias.reduce((t, d) => t + d.valor, 0);
    const nTotal = dias.reduce((t, d) => t + d.n, 0);
    const atrasados = (membros || []).filter((m) => ok(m) && m.vencimento < hoje && m.vencimento >= somaDias(hoje, -14));
    const valorAtras = atrasados.reduce((t, m) => t + precoDe(m.plano), 0);
    return { dias, total, nTotal, atrasados: atrasados.length, valorAtras };
  }, [membros, planos, hoje]);
  const esperado = ret.media != null ? Math.round((prev.total * ret.media) / 100) : null;

  // ---- ranking de vendas dos funcionários ----
  const [mes, setMes] = useState(mesAtual());
  const ranking = useMemo(() => {
    const [a, m] = mes.split("-").map(Number);
    const por = {};
    (faturas || []).forEach((f) => {
      if (!f || f.tipo !== "RECIBO") return;
      if (f.estado && /anulad|elimin/i.test(f.estado)) return;
      const d = parseBR(f.data);
      if (!d || d.getFullYear() !== a || d.getMonth() + 1 !== m) return;
      const nome = !f.registadoPor || f.registadoPor === "—" ? "Sem nome" : f.registadoPor;
      const o = (por[nome] = por[nome] || { nome, vendas: 0, subs: 0, outros: 0, recibos: 0 });
      const v = +f.valor || 0;
      if (f.tipoReceita === "venda") o.vendas += v;
      else if (f.tipoReceita === "mensalidade" || f.tipoReceita === "inscricao") o.subs += v;
      else o.outros += v;
      o.recibos += 1;
    });
    return Object.values(por).map((o) => ({ ...o, total: o.vendas + o.subs + o.outros })).sort((x, y) => y.total - x.total);
  }, [faturas, mes]);
  const maior = ranking[0]?.total || 1;

  return (
    <div className="space-y-5">
      <Cartao title="Retenção: quem fica e quem sai">
        {ret.semanas.length === 0 ? (
          <p className="text-sm text-slate-400">Ainda não há histórico suficiente.</p>
        ) : (
          <>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              Por semana: quantos atletas tinham subscrição, quantos são novos e quantos da semana anterior não renovaram.
              {ret.media != null && <> Em média, <b className="text-tema-600">{ret.media}%</b> dos atletas ficam de uma semana para a outra.</>}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-400 text-left">
                    <th className="py-1 pr-2 font-semibold">Semana</th><th className="px-2 font-semibold">Ativos</th><th className="px-2 font-semibold">Novos</th><th className="px-2 font-semibold">Saíram</th><th className="px-2 font-semibold">Ficam</th>
                  </tr>
                </thead>
                <tbody>
                  {[...ret.semanas].reverse().map((l) => (
                    <tr key={l.seg} className="border-t border-slate-100 dark:border-slate-700">
                      <td className="py-2 pr-2 text-slate-700 dark:text-slate-200 whitespace-nowrap">{ddmm(l.seg)}–{ddmm(l.dom)}{l.ehAtual ? " ·atual" : ""}</td>
                      <td className="px-2 font-semibold">{l.ativos}</td>
                      <td className="px-2 text-emerald-600 font-semibold">+{l.novos}</td>
                      <td className="px-2 text-red-600 font-semibold">{l.perderam ? `−${l.perderam}` : "0"}</td>
                      <td className="px-2">{l.retencao != null && !l.ehAtual ? `${l.retencao}%` : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-3">A semana atual ainda não acabou, por isso “Saíram” pode baixar quando houver mais renovações.</p>
          </>
        )}
      </Cartao>

      <Cartao title="Previsão de renovações (próximos 7 dias)">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div><p className="text-xs text-slate-400">Vão vencer</p><p className="text-2xl font-extrabold">{prev.nTotal} <span className="text-sm font-semibold text-slate-400">atletas</span></p></div>
          <div><p className="text-xs text-slate-400">Se todos renovarem</p><p className="text-2xl font-extrabold text-tema-600">{kz(prev.total)}</p></div>
        </div>
        {esperado != null && <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">Com a retenção média ({ret.media}%), conta com cerca de <b>{kz(esperado)}</b>.</p>}
        <div className="space-y-1.5">
          {prev.dias.map((d) => (
            <div key={d.dia} className="flex items-center gap-2 text-sm">
              <span className="w-20 text-slate-500">{d.dia === hoje ? "Hoje" : ddmm(d.dia)}</span>
              <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden"><div className="h-full bg-tema-500 rounded-full" style={{ width: `${prev.total ? (d.valor / Math.max(...prev.dias.map((x) => x.valor), 1)) * 100 : 0}%` }} /></div>
              <span className="w-28 text-right text-slate-700 dark:text-slate-200">{d.n} · {kz(d.valor)}</span>
            </div>
          ))}
        </div>
        {prev.atrasados > 0 && (
          <p className="text-sm mt-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 px-3 py-2">
            Há <b>{prev.atrasados}</b> atletas que venceram nos últimos 14 dias e ainda não renovaram: pode haver até <b>{kz(prev.valorAtras)}</b> para recuperar.
          </p>
        )}
      </Cartao>

      <Cartao
        title="Vendas por funcionário"
        action={<input type="month" value={mes} onChange={(e) => setMes(e.target.value)} className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm" />}
      >
        {ranking.length === 0 && <p className="text-sm text-slate-400">Sem recibos neste mês.</p>}
        <div className="space-y-4">
          {ranking.map((r, i) => (
            <div key={r.nome}>
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-slate-900 dark:text-slate-100">{i === 0 ? "🏆 " : `${i + 1}. `}{r.nome}</p>
                <p className="font-extrabold">{kz(r.total)}</p>
              </div>
              <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden mt-1.5">
                <div className={`h-full rounded-full ${i === 0 ? "bg-amber-500" : "bg-tema-500"}`} style={{ width: `${(r.total / maior) * 100}%` }} />
              </div>
              <p className="text-xs text-slate-400 mt-1">Produtos {kz(r.vendas)} · Mensalidades e inscrições {kz(r.subs)} · Outros {kz(r.outros)} · {r.recibos} recibos</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-4">Conta o valor dos recibos passados por cada funcionário.</p>
      </Cartao>
    </div>
  );
}
