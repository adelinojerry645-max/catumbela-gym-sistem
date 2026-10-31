// Gera, no próprio telemóvel/computador, o cartaz (PNG) e o vídeo da corrida
// do Melhor Atleta. Usa as cores do tema escolhido no sistema.

const W = 1080;
const H = 1920;
const NSHOW = 10;
const ROW_Y0 = 440;
const ROW_H = 132;
const BAR_X0 = 180;
const BAR_MAXW = 690;
const FONTE = '"Inter", "Helvetica Neue", Arial, sans-serif';

const ease = (x) => { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); };

function corTema(n, alfa = 1) {
  let v = "63 143 135";
  try { v = getComputedStyle(document.documentElement).getPropertyValue(`--tema-${n}`).trim() || v; } catch {}
  const [r, g, b] = v.split(/\s+/).map(Number);
  return `rgba(${r},${g},${b},${alfa})`;
}
function corVar(nome, padrao) {
  try { const v = getComputedStyle(document.documentElement).getPropertyValue(nome).trim(); if (v) return v.split(/\s+/).map(Number); } catch {}
  return padrao;
}
const rgb = (arr, a = 1) => `rgba(${arr[0]},${arr[1]},${arr[2]},${a})`;

function caixa(ctx, x, y, w, h, r, fill, sombra = true) {
  ctx.save();
  if (sombra) { ctx.shadowColor = "rgba(15,23,42,0.16)"; ctx.shadowBlur = 24; ctx.shadowOffsetY = 8; }
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.restore();
}
function texto(ctx, s, x, y, tam, cor, peso = 700, alinh = "left", base = "alphabetic") {
  ctx.font = `${peso} ${tam}px ${FONTE}`;
  ctx.fillStyle = cor;
  ctx.textAlign = alinh;
  ctx.textBaseline = base;
  ctx.fillText(s, x, y);
}
function cortar(ctx, s, larguraMax, tam, peso) {
  ctx.font = `${peso} ${tam}px ${FONTE}`;
  if (ctx.measureText(s).width <= larguraMax) return s;
  while (s.length > 3 && ctx.measureText(s + "…").width > larguraMax) s = s.slice(0, -1);
  return s + "…";
}
function titulo(s) {
  return s.toLowerCase().replace(/(^|\s)(\S)/g, (m, a, b) => a + b.toUpperCase()).replace(/\b(Da|De|Do|Dos|Das)\b/g, (m) => m.toLowerCase());
}

function fundo(ctx) {
  ctx.fillStyle = corTema(100);
  ctx.fillRect(0, 0, W, H);
  const g1 = ctx.createRadialGradient(W * 0.9, 0, 0, W * 0.9, 0, 900);
  g1.addColorStop(0, corTema(500, 0.45)); g1.addColorStop(1, corTema(500, 0));
  ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);
  const acento = corVar("--acento", [230, 144, 25]);
  const g2 = ctx.createRadialGradient(0, H * 0.55, 0, 0, H * 0.55, 700);
  g2.addColorStop(0, rgb(acento, 0.22)); g2.addColorStop(1, rgb(acento, 0));
  ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
  const g3 = ctx.createRadialGradient(W, H, 0, W, H, 900);
  g3.addColorStop(0, corTema(300, 0.4)); g3.addColorStop(1, corTema(300, 0));
  ctx.fillStyle = g3; ctx.fillRect(0, 0, W, H);
}

export function carregarLogo(src) {
  return new Promise((res) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = () => res(null);
    img.src = src || "/icons/icon-192.png";
  });
}

function desenharLogo(ctx, logo, x, y, tam) {
  if (!logo) return;
  ctx.save();
  ctx.beginPath(); ctx.roundRect(x, y, tam, tam, tam / 4); ctx.clip();
  ctx.fillStyle = "#fff"; ctx.fillRect(x, y, tam, tam);
  const esc = Math.min(tam / logo.width, tam / logo.height) * 0.9;
  ctx.drawImage(logo, x + (tam - logo.width * esc) / 2, y + (tam - logo.height * esc) / 2, logo.width * esc, logo.height * esc);
  ctx.restore();
}

// ---------------------------------------------------------------------
// Preparação: pontos acumulados dia a dia + posição de cada atleta
// atletas: [{ nome, sessoes: [{ dia: "YYYY-MM-DD", horas }], taxaDias: ["YYYY-MM-DD"], extra }]
// dias: ["YYYY-MM-DD", ...]
// ---------------------------------------------------------------------
export function prepararCorrida(atletas, dias) {
  const n = dias.length;
  const lista = atletas.map((a) => {
    const pts = new Array(n + 1).fill(0);
    const taxa = new Array(n + 1).fill(0);
    let dd = 0, hh = 0, tx = 0;
    const porDia = {};
    a.sessoes.forEach((s) => { const o = (porDia[s.dia] = porDia[s.dia] || { horas: 0 }); o.horas += s.horas; });
    const taxaSet = new Set(a.taxaDias || []);
    for (let i = 1; i <= n; i++) {
      const dia = dias[i - 1];
      if (porDia[dia]) { dd += 1; hh += porDia[dia].horas; }
      if (taxaSet.has(dia)) tx = 1;
      pts[i] = dd * 50 + hh * 5 + (a.extra || 0);
      taxa[i] = tx;
    }
    return { nome: a.nome, pts, taxa, rank: new Array(n + 1).fill(0) };
  });
  for (let d = 0; d <= n; d++) {
    const ordem = lista.map((_, i) => i).sort((x, y) => (lista[x].taxa[d] - lista[y].taxa[d]) || (lista[y].pts[d] - lista[x].pts[d]) || lista[x].nome.localeCompare(lista[y].nome));
    ordem.forEach((i, pos) => { lista[i].rank[d] = pos; });
  }
  const maxPts = Math.max(100, ...lista.map((a) => a.pts[n]));
  const escala = Math.ceil(maxPts / 100) * 100;
  return { lista, n, escala, dias };
}

// ---------------------------------------------------------------------
// Quadros do vídeo
// ---------------------------------------------------------------------
function quadroIntro(ctx, meta, logo) {
  fundo(ctx);
  desenharLogo(ctx, logo, W / 2 - 90, 380, 180);
  texto(ctx, (meta.nomeGinasio || "CATUMBELA GYM").toUpperCase(), W / 2, 650, 48, corTema(700), 800, "center");
  caixa(ctx, 90, 740, W - 180, 520, 44, "#fff");
  texto(ctx, "Melhor Atleta", W / 2, 855, 92, "#0f172a", 800, "center");
  texto(ctx, meta.doPeriodo || "do Mês", W / 2, 960, 68, corTema(500), 800, "center");
  caixa(ctx, W / 2 - 170, 1050, 340, 80, 40, corTema(500), false);
  texto(ctx, meta.categoria.toUpperCase(), W / 2, 1092, 44, "#fff", 800, "center", "middle");
  texto(ctx, meta.periodo, W / 2, 1210, 38, "#64748b", 500, "center");
}

function quadroCorrida(ctx, prep, diaF, meta, logo, fracFinal, tTrans) {
  const { lista, n, escala } = prep;
  let d0 = Math.floor(diaF);
  let d1 = Math.min(n, d0 + 1);
  let frac = diaF - d0;
  if (d0 >= n) { d0 = d1 = n; frac = 0; }
  const k = frac < tTrans ? ease(frac / tTrans) : 1;

  fundo(ctx);
  desenharLogo(ctx, logo, 60, 56, 96);
  texto(ctx, (meta.nomeGinasio || "CATUMBELA GYM").toUpperCase(), 180, 98, 34, corTema(700), 800);
  texto(ctx, `Melhor Atleta ${meta.doPeriodo || "do Mês"}`, 180, 146, 34, "#0f172a", 700);
  caixa(ctx, 60, 200, meta.categoria === "Mulheres" ? 290 : 250, 56, 28, corTema(500), false);
  texto(ctx, meta.categoria.toUpperCase(), 60 + (meta.categoria === "Mulheres" ? 145 : 125), 228, 30, "#fff", 800, "center", "middle");

  const diaMostrado = k > 0.5 ? d1 : d0;
  const dataTxt = diaMostrado === 0 ? "Início" : meta.rotuloDia(prep.dias[diaMostrado - 1]);
  ctx.font = `800 110px ${FONTE}`;
  texto(ctx, dataTxt, 60, 380, 110, "#0f172a", 800);
  // aviso de taxado
  lista.forEach((a) => {
    for (let dd = 1; dd <= n; dd++) {
      if (a.taxa[dd] && !a.taxa[dd - 1] && a.rank[dd - 1] < NSHOW && dd - 1 + 0.15 <= diaF && diaF < dd + 0.55) {
        caixa(ctx, 600, 296, W - 660, 100, 24, "#ef4444", false);
        texto(ctx, "TAXADO: " + cortar(ctx, a.nome, 340, 22, 800), 600 + (W - 660) / 2, 326, 22, "#fff", 800, "center", "middle");
        texto(ctx, "desce no ranking", 600 + (W - 660) / 2, 366, 28, "#fff", 500, "center", "middle");
      }
    }
  });
  // barra de progresso
  caixa(ctx, 60, 414, W - 120, 12, 6, corTema(200), false);
  const prog = (d0 + (d1 - d0) * k) / n;
  caixa(ctx, 60, 414, Math.max(12, (W - 120) * prog), 12, 6, corTema(500), false);

  const itens = lista.map((a) => ({
    a,
    pts: a.pts[d0] + (a.pts[d1] - a.pts[d0]) * k,
    pos: a.rank[d0] + (a.rank[d1] - a.rank[d0]) * k,
    taxa: k > 0.5 ? a.taxa[d1] : a.taxa[d0],
  })).sort((x, y) => y.pos - x.pos);

  itens.forEach(({ a, pts, pos, taxa }) => {
    if (pos > NSHOW - 0.15) return;
    const y = ROW_Y0 + pos * ROW_H;
    const lider = a.rank[k > 0.5 ? d1 : d0] === 0 && pts > 0 && !taxa;
    const cor = taxa ? "#ef4444" : lider ? "#f59e0b" : corTema(400);
    caixa(ctx, 50, y, W - 100, 118, 28, "#fff");
    ctx.beginPath(); ctx.arc(116, y + 59, 36, 0, Math.PI * 2);
    ctx.fillStyle = lider ? "#f59e0b" : corTema(100); ctx.fill();
    texto(ctx, String(Math.round(pos) + 1), 116, y + 60, 36, lider ? "#fff" : corTema(700), 700, "center", "middle");
    texto(ctx, cortar(ctx, titulo(a.nome), taxa ? 520 : 700, 34, 700), 180, y + 40, 34, "#0f172a", 700);
    if (taxa) {
      caixa(ctx, W - 80 - 140, y + 12, 140, 34, 17, "#ef4444", false);
      texto(ctx, meta.categoria === "Mulheres" ? "TAXADA" : "TAXADO", W - 80 - 70, y + 29, 20, "#fff", 800, "center", "middle");
    }
    const bx = 180, bmax = W - 80 - bx - 170;
    caixa(ctx, bx, y + 74, bmax + 40, 26, 13, corTema(100), false);
    const bw = Math.max(26, (bmax * pts) / escala);
    caixa(ctx, bx, y + 74, bw, 26, 13, cor, false);
    texto(ctx, `${Math.round(pts)} pts`, W - 80, y + 86, 32, "#0f172a", 700, "right", "middle");
  });

  texto(ctx, "50 pontos por cada dia que veio treinar + 5 por hora (máx. 2 h por visita).", W / 2, 1810, 25, "#64748b", 500, "center");
  texto(ctx, "Quem pagou taxa de sessão longa fica sempre atrás de quem não pagou.", W / 2, 1848, 25, "#64748b", 500, "center");

  if (fracFinal > 0) {
    ctx.save();
    ctx.globalAlpha = fracFinal;
    ctx.fillStyle = corTema(100); ctx.fillRect(0, 1760, W, H - 1760);
    caixa(ctx, 40, 1765, W - 80, 130, 34, "#f59e0b");
    texto(ctx, meta.rotuloVencedor, W / 2, 1790, 30, "#fff", 800, "center", "top");
    texto(ctx, cortar(ctx, titulo(meta.vencedor), W - 140, 52, 800), W / 2, 1832, 52, "#fff", 800, "center", "top");
    ctx.restore();
  }
}

function escolherFormato() {
  const candidatos = ["video/mp4;codecs=avc1", "video/mp4", "video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"];
  if (typeof MediaRecorder === "undefined") return null;
  return candidatos.find((c) => { try { return MediaRecorder.isTypeSupported(c); } catch { return false; } }) || null;
}

export function videoSuportado() {
  return typeof MediaRecorder !== "undefined" && typeof HTMLCanvasElement !== "undefined" && !!HTMLCanvasElement.prototype.captureStream;
}

// Grava o vídeo em tempo real (≥ 45 s). onProgresso(0..1)
export async function gerarVideo({ prep, meta, logoSrc, onProgresso }) {
  const formato = escolherFormato();
  if (!formato) throw new Error("Este navegador não consegue gravar vídeo.");
  const logo = await carregarLogo(logoSrc);
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  const stream = canvas.captureStream(30);
  const rec = new MediaRecorder(stream, { mimeType: formato, videoBitsPerSecond: 5_000_000 });
  const partes = [];
  rec.ondataavailable = (e) => { if (e.data && e.data.size) partes.push(e.data); };
  const terminado = new Promise((res) => { rec.onstop = res; });

  const TINTRO = 3, TFINAL = 6;
  const porDia = Math.min(4, Math.max(1.5, 45 / Math.max(1, prep.n)));
  const tTrans = 1.0 / porDia; // transição dura ~1 s
  const total = TINTRO + prep.n * porDia + TFINAL;

  quadroIntro(ctx, meta, logo);
  rec.start(500);
  const t0 = performance.now();
  await new Promise((resolver) => {
    const passo = () => {
      const t = (performance.now() - t0) / 1000;
      if (t >= total) return resolver();
      if (t < TINTRO) {
        // cartão de abertura e depois funde para a corrida no dia 0
        if (t < TINTRO - 0.6) quadroIntro(ctx, meta, logo);
        else {
          quadroCorrida(ctx, prep, 0, meta, logo, 0, tTrans);
          ctx.save(); ctx.globalAlpha = Math.max(0, 1 - (t - (TINTRO - 0.6)) / 0.6);
          const tmp = document.createElement("canvas"); tmp.width = W; tmp.height = H;
          quadroIntro(tmp.getContext("2d"), meta, logo);
          ctx.drawImage(tmp, 0, 0); ctx.restore();
        }
      } else if (t < TINTRO + prep.n * porDia) {
        quadroCorrida(ctx, prep, (t - TINTRO) / porDia, meta, logo, 0, tTrans);
      } else {
        const f = ease((t - TINTRO - prep.n * porDia) / 0.8);
        quadroCorrida(ctx, prep, prep.n, meta, logo, f, tTrans);
      }
      onProgresso && onProgresso(Math.min(1, t / total));
      requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  });
  rec.stop();
  await terminado;
  const ext = formato.startsWith("video/mp4") ? "mp4" : "webm";
  return { blob: new Blob(partes, { type: formato.split(";")[0] }), ext };
}

// ---------------------------------------------------------------------
// Cartaz (PNG 1080x1350) do vencedor
// ---------------------------------------------------------------------
export async function gerarCartaz({ meta, top, logoSrc }) {
  const logo = await carregarLogo(logoSrc);
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  ctx.save();
  // fundo (reutiliza o desenho de 1920 de altura, cortado)
  fundo(ctx);
  ctx.restore();
  desenharLogo(ctx, logo, W / 2 - 80, 60, 160);
  texto(ctx, (meta.nomeGinasio || "CATUMBELA GYM").toUpperCase(), W / 2, 280, 40, corTema(700), 800, "center");
  texto(ctx, "MELHOR ATLETA", W / 2, 380, 96, "#0f172a", 800, "center");
  caixa(ctx, W / 2 - 190, 410, 380, 66, 33, corTema(500), false);
  texto(ctx, meta.categoria.toUpperCase(), W / 2, 444, 36, "#fff", 800, "center", "middle");
  texto(ctx, `${meta.doPeriodo || "do Mês"} de ${(meta.periodo.match(/\d{4}/) || [""])[0]}`.trim(), W / 2, 530, 36, "#475569", 600, "center");

  caixa(ctx, 70, 580, W - 140, 330, 44, "#f59e0b");
  texto(ctx, "★", W / 2, 690, 90, "#fff", 800, "center");
  const nome = top[0] ? titulo(top[0].nome) : "—";
  texto(ctx, cortar(ctx, nome, W - 220, 78, 800), W / 2, 800, 78, "#fff", 800, "center");
  if (top[0]) texto(ctx, `${top[0].pts} pontos · ${top[0].dias} dias de treino`, W / 2, 870, 36, "rgba(255,255,255,0.95)", 600, "center");

  top.slice(1, 3).forEach((t, i) => {
    const y = 950 + i * 110;
    caixa(ctx, 70, y, W - 140, 92, 28, "#fff");
    ctx.beginPath(); ctx.arc(130, y + 46, 30, 0, Math.PI * 2); ctx.fillStyle = corTema(100); ctx.fill();
    texto(ctx, String(i + 2), 130, y + 47, 32, corTema(700), 800, "center", "middle");
    texto(ctx, cortar(ctx, titulo(t.nome), 560, 34, 700), 185, y + 56, 34, "#0f172a", 700);
    texto(ctx, `${t.pts} pts`, W - 110, y + 47, 32, "#0f172a", 700, "right", "middle");
  });
  texto(ctx, meta.rodape || "Parabéns! Continua a dar tudo.", W / 2, 1230, 34, "#475569", 600, "center");
  texto(ctx, "Pontos: 50 por dia de treino + 5 por hora", W / 2, 1290, 26, "#64748b", 500, "center");
  return new Promise((res) => canvas.toBlob((b) => res(b), "image/png"));
}

export async function entregarFicheiro(blob, nome) {
  try {
    const f = new File([blob], nome, { type: blob.type });
    if (navigator.canShare && navigator.canShare({ files: [f] })) {
      await navigator.share({ files: [f], title: nome });
      return;
    }
  } catch (e) {
    if (e && e.name === "AbortError") return;
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = nome;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
