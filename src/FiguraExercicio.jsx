import React, { useEffect, useRef, useState } from "react";

// Desenhos animados dos exercícios (boneco simples, 2 posições: início e fim).
// Cada "tipo" tem a posição A (início) e B (fim). O boneco é calculado a partir de
// pontos (anca, pés, mãos) e os joelhos/cotovelos são encontrados por cinemática inversa.

const CHAO = 139;
const rad = (d) => (d * Math.PI) / 180;
const polar = (o, ang, len) => [o[0] + Math.cos(rad(ang)) * len, o[1] + Math.sin(rad(ang)) * len];
const lerp = (a, b, k) => a + (b - a) * k;

function ik(raiz, alvo, l1, l2, sinal) {
  let dx = alvo[0] - raiz[0];
  let dy = alvo[1] - raiz[1];
  let d = Math.hypot(dx, dy) || 0.001;
  const max = l1 + l2 - 0.01;
  let t = alvo;
  if (d > max) {
    t = [raiz[0] + (dx * max) / d, raiz[1] + (dy * max) / d];
    dx = t[0] - raiz[0];
    dy = t[1] - raiz[1];
    d = max;
  }
  const x = (l1 * l1 - l2 * l2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(l1 * l1 - x * x, 0));
  const ux = dx / d;
  const uy = dy / d;
  return [[raiz[0] + ux * x - uy * h * sinal, raiz[1] + uy * x + ux * h * sinal], t];
}

function resolver(p) {
  const hip = p.hip;
  const t = p.t ?? 270;
  const sh0 = polar(hip, t, 40);
  const sh = [sh0[0], sh0[1] + (p.shy || 0)];
  const cabeca = polar(sh, t + (p.hd || 0), 15);
  const frente = !!p.front;
  const ancas = frente ? [[hip[0] + 7, hip[1]], [hip[0] - 7, hip[1]]] : [hip, hip];
  const ombros = frente ? [[sh[0] + 12, sh[1]], [sh[0] - 12, sh[1]]] : [sh, sh];
  const ks = p.ks || [-1, -1];
  const es = p.es || [1, 1];
  const pernas = [0, 1].map((i) => {
    const pe = p.f[i] || p.f[0];
    if (p.k && (p.k[i] || p.k[0])) return { joelho: p.k[i] || p.k[0], tornozelo: pe };
    const [joelho, tornozelo] = ik(ancas[i], pe, 34, 34, ks[i] ?? ks[0]);
    return { joelho, tornozelo };
  });
  let bracos = [];
  if (p.h || p.hr) {
    const n = (p.h || p.hr).length;
    bracos = [...Array(n).keys()].map((i) => {
      const alvo = p.h ? p.h[i] : [sh[0] + p.hr[i][0], sh[1] + p.hr[i][1]];
      const [cotovelo, mao] = ik(ombros[i], alvo, 25, 25, es[i] ?? es[0]);
      return { cotovelo, mao };
    });
  }
  return {
    hip, sh, cabeca, ancas, ombros, pernas, bracos,
    bow: p.bow || 0, t, front: frente, ropeY: p.ropeY ?? 0,
  };
}

function misturar(a, b, k) {
  if (typeof a === "number") return lerp(a, b, k);
  if (Array.isArray(a)) return a.map((v, i) => misturar(v, b[i] ?? v, k));
  if (a && typeof a === "object") {
    const o = {};
    Object.keys(a).forEach((key) => { o[key] = misturar(a[key], b?.[key] ?? a[key], k); });
    return o;
  }
  return a;
}

const ST = (x = 110, hy = 66) => ({ hip: [x, hy], t: 270, f: [[x, 133]] });
const BRACOS_BAIXO = { hr: [[3, 46]] };
const FRENTE_PARADO = { front: true, hip: [110, 66], t: 270, f: [[117, 133], [103, 133]] };
const CAMA_SUPINO = [
  { t: "l", x1: 58, y1: 108, x2: 164, y2: 108, w: 7 },
  { t: "l", x1: 68, y1: 108, x2: 68, y2: CHAO, w: 4 },
  { t: "l", x1: 154, y1: 108, x2: 154, y2: CHAO, w: 4 },
];
const SUPINO_BASE = { hip: [140, 98], t: 180, f: [[150, 133]] };
const PLANK_PE = [[170, 132]];

const TIPOS = {
  squat: {
    A: { ...ST(110, 66), hr: [[16, 10]] },
    B: { hip: [84, 101], t: 285, f: [[110, 133]], hr: [[16, 8]] },
  },
  goblet: {
    w: "kb",
    A: { ...ST(110, 66), hr: [[16, 12]] },
    B: { hip: [84, 101], t: 285, f: [[110, 133]], hr: [[16, 10]] },
  },
  sumo: {
    w: "kb",
    A: { front: true, hip: [110, 70], t: 270, f: [[134, 133], [86, 133]], ks: [-1, 1], hr: [[8, 34], [-8, 34]] },
    B: { front: true, hip: [110, 104], t: 270, f: [[134, 133], [86, 133]], ks: [-1, 1], hr: [[8, 34], [-8, 34]] },
  },
  wallsit: {
    cena: [{ t: "l", x1: 62, y1: 14, x2: 62, y2: CHAO, w: 4 }],
    A: { hip: [84, 98], t: 270, f: [[118, 133]], hr: [[26, 40]] },
    B: { hip: [84, 102], t: 270, f: [[118, 133]], hr: [[26, 40]] },
  },
  lunge: {
    w: "db",
    A: { hip: [110, 67], t: 270, f: [[112, 133], [108, 133]], ...BRACOS_BAIXO },
    B: { hip: [104, 103], t: 270, f: [[134, 133], [76, 128]], ...BRACOS_BAIXO },
  },
  latlunge: {
    w: "kb",
    A: { front: true, hip: [110, 66], t: 270, f: [[117, 133], [103, 133]], hr: [[6, 26], [-6, 26]] },
    B: { front: true, hip: [138, 88], t: 270, f: [[152, 133], [86, 133]], ks: [-1, 1], hr: [[6, 26], [-6, 26]] },
  },
  bulgaro: {
    w: "db",
    cena: [{ t: "l", x1: 48, y1: 108, x2: 82, y2: 108, w: 7 }, { t: "l", x1: 54, y1: 108, x2: 54, y2: CHAO, w: 4 }],
    A: { hip: [108, 68], t: 270, f: [[128, 133], [66, 102]], ...BRACOS_BAIXO },
    B: { hip: [108, 98], t: 270, f: [[128, 133], [66, 102]], ...BRACOS_BAIXO },
  },
  stepup: {
    w: "db",
    cena: [{ t: "r", x: 124, y: 106, w: 44, h: 33 }],
    A: { hip: [122, 66], t: 280, f: [[138, 101], [104, 133]], ...BRACOS_BAIXO },
    B: { hip: [140, 36], t: 270, f: [[140, 101], [152, 78]], ...BRACOS_BAIXO },
  },
  hinge: {
    w: "db",
    A: { ...ST(110, 67), ...BRACOS_BAIXO },
    B: { hip: [84, 71], t: 330, f: [[110, 133]], hr: [[2, 46]] },
  },
  hingerow: {
    w: "db",
    A: { hip: [84, 72], t: 330, f: [[110, 133]], hr: [[2, 46]] },
    B: { hip: [84, 72], t: 330, f: [[110, 133]], hr: [[-20, 22]] },
  },
  press: {
    w: "db",
    A: { ...ST(110, 66), hr: [[12, -4]] },
    B: { ...ST(110, 66), hr: [[3, -48]] },
  },
  latraise: {
    w: "db",
    A: { ...FRENTE_PARADO, hr: [[14, 48], [-14, 48]] },
    B: { ...FRENTE_PARADO, hr: [[60, 4], [-60, 4]] },
  },
  armcircles: {
    A: { ...FRENTE_PARADO, hr: [[62, -2], [-62, -2]] },
    B: { ...FRENTE_PARADO, hr: [[26, -48], [-26, -48]] },
  },
  frontraise: {
    w: "db",
    A: { ...ST(110, 66), hr: [[4, 46]] },
    B: { ...ST(110, 66), hr: [[48, 0]] },
  },
  shrug: {
    w: "db",
    A: { ...FRENTE_PARADO, hr: [[16, 48], [-16, 48]] },
    B: { ...FRENTE_PARADO, shy: -8, hr: [[16, 48], [-16, 48]] },
  },
  bench: {
    w: "db",
    cena: CAMA_SUPINO,
    A: { ...SUPINO_BASE, hr: [[12, -14]] },
    B: { ...SUPINO_BASE, hr: [[4, -50]] },
  },
  fly: {
    w: "db",
    cena: CAMA_SUPINO,
    A: { ...SUPINO_BASE, hr: [[4, -50]] },
    B: { ...SUPINO_BASE, hr: [[-34, -24]] },
  },
  pullover: {
    w: "db",
    cena: CAMA_SUPINO,
    A: { ...SUPINO_BASE, hr: [[4, -50]] },
    B: { ...SUPINO_BASE, hr: [[-48, 14]] },
  },
  pushup: {
    A: { hip: [110, 101], t: 207, f: PLANK_PE, h: [[74, 134]], es: [-1] },
    B: { hip: [104, 117], t: 193, f: PLANK_PE, h: [[74, 134]], es: [-1] },
  },
  dip: {
    cena: [
      { t: "l", x1: 98, y1: 80, x2: 128, y2: 80, w: 5 },
      { t: "l", x1: 98, y1: 80, x2: 98, y2: CHAO, w: 4 },
    ],
    A: { hip: [110, 66], t: 270, f: [[100, 126]], ks: [1, 1], h: [[112, 76]] },
    B: { hip: [110, 86], t: 270, f: [[96, 128]], ks: [1, 1], h: [[112, 76]] },
  },
  crossover: {
    cabo: [70, 8],
    A: { ...ST(110, 66), t: 272, hr: [[-30, -6]] },
    B: { ...ST(110, 66), t: 272, hr: [[30, 34]] },
  },
  pulldown: {
    cabo: [150, 8],
    cena: [{ t: "l", x1: 84, y1: 108, x2: 118, y2: 108, w: 6 }, { t: "l", x1: 101, y1: 108, x2: 101, y2: CHAO, w: 4 }],
    A: { hip: [100, 100], t: 272, f: [[134, 133]], hr: [[8, -46]] },
    B: { hip: [100, 100], t: 272, f: [[134, 133]], hr: [[12, 12]] },
  },
  seatedrow: {
    cabo: [208, 104],
    cena: [{ t: "l", x1: 58, y1: 108, x2: 92, y2: 108, w: 6 }, { t: "l", x1: 150, y1: 90, x2: 150, y2: 120, w: 5 }],
    A: { hip: [76, 100], t: 270, f: [[140, 104]], hr: [[48, 10]] },
    B: { hip: [76, 100], t: 270, f: [[140, 104]], hr: [[8, 30]] },
  },
  curl: {
    w: "db",
    A: { ...ST(110, 66), hr: [[3, 46]] },
    B: { ...ST(110, 66), hr: [[16, 8]] },
  },
  pushdown: {
    cabo: [128, 8],
    A: { ...ST(110, 66), hr: [[16, 8]] },
    B: { ...ST(110, 66), hr: [[8, 46]] },
  },
  tricepsover: {
    w: "db",
    A: { ...ST(110, 66), hr: [[-12, -4]] },
    B: { ...ST(110, 66), hr: [[4, -48]] },
  },
  kickback: {
    w: "db",
    A: { hip: [86, 72], t: 330, f: [[110, 133]], hr: [[-6, 26]] },
    B: { hip: [86, 72], t: 330, f: [[110, 133]], hr: [[-46, 4]] },
  },
  uprightrow: {
    w: "db",
    A: { ...ST(110, 66), hr: [[4, 46]] },
    B: { ...ST(110, 66), hr: [[10, 6]], es: [-1] },
  },
  legpress: {
    placa: true,
    cena: [{ t: "l", x1: 80, y1: 112, x2: 46, y2: 78, w: 7 }, { t: "l", x1: 70, y1: 118, x2: 100, y2: 118, w: 6 }],
    A: { hip: [80, 110], t: 225, f: [[118, 88]], hr: [[16, 12]] },
    B: { hip: [80, 110], t: 225, f: [[137, 77]], hr: [[16, 12]] },
  },
  legext: {
    cena: [{ t: "l", x1: 84, y1: 98, x2: 114, y2: 98, w: 6 }, { t: "l", x1: 92, y1: 98, x2: 96, y2: 48, w: 6 }, { t: "l", x1: 98, y1: 98, x2: 98, y2: CHAO, w: 4 }],
    A: { hip: [100, 92], t: 275, f: [[136, 126]], hr: [[8, 28]] },
    B: { hip: [100, 92], t: 275, f: [[168, 90]], hr: [[8, 28]] },
  },
  legcurl: {
    cena: [{ t: "l", x1: 66, y1: 131, x2: 172, y2: 131, w: 6 }, { t: "l", x1: 76, y1: 131, x2: 76, y2: CHAO, w: 4 }, { t: "l", x1: 162, y1: 131, x2: 162, y2: CHAO, w: 4 }],
    A: { hip: [130, 124], t: 180, f: [[196, 122]], ks: [1, 1] },
    B: { hip: [130, 124], t: 180, f: [[152, 92]], ks: [1, 1] },
  },
  calf: {
    w: "db",
    A: { ...ST(110, 66), toeFloor: true, ...BRACOS_BAIXO },
    B: { hip: [110, 57], t: 270, f: [[110, 124]], toeFloor: true, ...BRACOS_BAIXO },
  },
  kbswing: {
    w: "kb",
    A: { hip: [92, 72], t: 330, f: [[110, 133]], hr: [[-14, 48]] },
    B: { ...ST(110, 66), hr: [[46, 2]] },
  },
  jumpjack: {
    A: { ...FRENTE_PARADO, hr: [[14, 46], [-14, 46]] },
    B: { front: true, hip: [110, 70], t: 270, f: [[140, 133], [80, 133]], hr: [[44, -32], [-44, -32]] },
  },
  abduct: {
    banda: true,
    A: { ...FRENTE_PARADO, hr: [[20, 24], [-20, 24]] },
    B: { ...FRENTE_PARADO, f: [[152, 118], [103, 133]], hr: [[20, 24], [-20, 24]] },
  },
  adduct: {
    cena: [{ t: "l", x1: 86, y1: 108, x2: 134, y2: 108, w: 6 }],
    A: { front: true, hip: [110, 100], t: 270, f: [[142, 133], [78, 133]], ks: [-1, 1], hr: [[22, 28], [-22, 28]] },
    B: { front: true, hip: [110, 100], t: 270, f: [[122, 133], [98, 133]], ks: [-1, 1], hr: [[22, 28], [-22, 28]] },
  },
  kickq: {
    ocupado: true,
    A: { hip: [130, 96], t: 188, k: [[130, 130], [130, 130]], f: [[164, 134], [164, 134]], h: [[92, 138]], es: [-1] },
    B: { hip: [130, 96], t: 188, k: [[130, 130], [186, 100]], f: [[164, 134], [208, 86]], h: [[92, 138]], es: [-1], ks: [-1, 1] },
  },
  bridge: {
    A: { hip: [128, 128], t: 180, f: [[162, 133]], hr: [[30, 8]] },
    B: { hip: [128, 112], t: 160, f: [[162, 133]], hr: [[26, 8]] },
  },
  hipthrust: {
    w: "hip",
    cena: [{ t: "l", x1: 52, y1: 120, x2: 102, y2: 120, w: 8 }, { t: "l", x1: 62, y1: 120, x2: 62, y2: CHAO, w: 4 }, { t: "l", x1: 92, y1: 120, x2: 92, y2: CHAO, w: 4 }],
    A: { hip: [128, 128], t: 160, f: [[162, 133]], hr: [[24, 4]] },
    B: { hip: [128, 106], t: 166, f: [[162, 133]], hr: [[24, 4]] },
  },
  plank: {
    A: { hip: [106, 109], t: 199.5, f: PLANK_PE, h: [[93, 121]] },
    B: { hip: [106, 107], t: 199.5, f: PLANK_PE, h: [[93, 121]] },
  },
  crunch: {
    A: { hip: [128, 128], t: 180, f: [[158, 133]], hr: [[-10, -6]] },
    B: { hip: [128, 128], t: 212, f: [[158, 133]], hr: [[-8, -10]] },
  },
  legraise: {
    A: { hip: [100, 128], t: 180, f: [[168, 126]], hr: [[10, 6]] },
    B: { hip: [100, 128], t: 180, f: [[104, 64]], hr: [[10, 6]] },
  },
  bicycle: {
    A: { hip: [120, 126], t: 208, f: [[152, 102], [186, 124]], hr: [[-8, -12]] },
    B: { hip: [120, 126], t: 208, f: [[186, 124], [152, 102]], hr: [[-8, -12]] },
  },
  russian: {
    A: { hip: [112, 124], t: 238, f: [[150, 98]], hr: [[4, 32]] },
    B: { hip: [112, 124], t: 238, f: [[150, 98]], hr: [[36, 28]] },
  },
  abwheel: {
    roda: true,
    A: { hip: [104, 102], t: 300, k: [[100, 134]], f: [[66, 134]], hr: [[4, 56]] },
    B: { hip: [124, 110], t: 340, k: [[100, 134]], f: [[66, 134]], hr: [[16, 32]] },
  },
  superman: {
    A: { hip: [130, 128], t: 180, f: [[198, 127]], hr: [[-48, 2]] },
    B: { hip: [130, 124], t: 178, f: [[198, 108]], hr: [[-48, -16]], bow: 6 },
  },
  backext: {
    cena: [{ t: "l", x1: 104, y1: 66, x2: 128, y2: 92, w: 8 }, { t: "l", x1: 80, y1: 122, x2: 96, y2: 138, w: 6 }],
    A: { hip: [118, 76], t: 60, f: [[86, 134]], hr: [[-4, -8]] },
    B: { hip: [118, 76], t: 299, f: [[86, 134]], hr: [[-4, -8]] },
  },
  run: {
    A: { ...ST(110, 66), t: 276, f: [[128, 118], [90, 133]], hr: [[-16, 28], [22, 12]] },
    B: { ...ST(110, 66), t: 276, f: [[92, 133], [128, 118]], hr: [[22, 12], [-16, 28]] },
  },
  treadmill: {
    cena: [{ t: "l", x1: 56, y1: 139, x2: 176, y2: 139, w: 5 }, { t: "l", x1: 178, y1: 139, x2: 182, y2: 52, w: 4 }, { t: "l", x1: 164, y1: 52, x2: 190, y2: 52, w: 5 }],
    A: { ...ST(110, 66), t: 276, f: [[128, 118], [90, 133]], hr: [[-16, 28], [22, 12]] },
    B: { ...ST(110, 66), t: 276, f: [[92, 133], [128, 118]], hr: [[22, 12], [-16, 28]] },
  },
  bike: {
    cena: [
      { t: "c", x: 112, y: 118, r: 14, w: 3 },
      { t: "l", x1: 112, y1: 118, x2: 98, y2: 94, w: 4 },
      { t: "l", x1: 112, y1: 118, x2: 134, y2: 82, w: 4 },
      { t: "l", x1: 134, y1: 82, x2: 140, y2: 74, w: 4 },
      { t: "l", x1: 88, y1: 93, x2: 108, y2: 93, w: 6 },
      { t: "l", x1: 134, y1: 82, x2: 134, y2: CHAO, w: 4 },
      { t: "l", x1: 98, y1: 94, x2: 98, y2: CHAO, w: 4 },
    ],
    A: { hip: [98, 90], t: 288, f: [[119, 130], [105, 106]], ks: [-1, -1], h: [[138, 76]] },
    B: { hip: [98, 90], t: 288, f: [[105, 106], [119, 130]], ks: [-1, -1], h: [[138, 76]] },
  },
  burpee: {
    A: { ...ST(110, 66), ...BRACOS_BAIXO },
    B: { hip: [110, 101], t: 207, f: PLANK_PE, h: [[74, 134]], es: [-1] },
  },
  jumprope: {
    corda: true,
    A: { front: true, hip: [110, 66], t: 270, f: [[116, 133], [104, 133]], hr: [[24, 18], [-24, 18]], ropeY: 150 },
    B: { front: true, hip: [110, 56], t: 270, f: [[116, 123], [104, 123]], hr: [[24, 18], [-24, 18]], ropeY: -25 },
  },
  catcow: {
    A: { hip: [130, 96], t: 188, k: [[130, 130]], f: [[164, 134]], h: [[92, 138]], es: [-1], bow: -9 },
    B: { hip: [130, 96], t: 188, k: [[130, 130]], f: [[164, 134]], h: [[92, 138]], es: [-1], bow: 13 },
  },
  downdog: {
    A: { hip: [104.6, 74], t: 150, f: [[140, 132]], h: [[62, 134]], es: [-1] },
    B: { hip: [106, 71], t: 150, f: [[142, 132]], h: [[62, 134]], es: [-1] },
  },
  child: {
    A: { hip: [148, 120], t: 190, k: [[112, 134]], f: [[146, 134]], h: [[60, 134]], es: [-1] },
    B: { hip: [148, 117], t: 190, k: [[112, 134]], f: [[146, 134]], h: [[60, 134]], es: [-1] },
  },
  pigeon: {
    A: { hip: [116, 122], t: 272, f: [[80, 130], [180, 132]], ks: [1, -1], h: [[96, 134]] },
    B: { hip: [116, 122], t: 300, f: [[80, 130], [180, 132]], ks: [1, -1], h: [[84, 136]] },
  },
  butterfly: {
    A: { front: true, hip: [110, 118], t: 272, f: [[118, 132], [102, 132]], ks: [-1, 1], h: [[118, 130], [102, 130]] },
    B: { front: true, hip: [110, 122], t: 262, f: [[118, 132], [102, 132]], ks: [-1, 1], h: [[118, 130], [102, 130]] },
  },
  hamstring: {
    A: { hip: [90, 124], t: 270, f: [[154, 124]], hr: [[28, 22]] },
    B: { hip: [90, 124], t: 300, f: [[154, 124]], h: [[148, 121]] },
  },
  twist: {
    A: { hip: [128, 128], t: 180, f: [[152, 133]], hr: [[0, 8]] },
    B: { hip: [128, 128], t: 180, f: [[176, 130]], hr: [[0, 8]] },
  },
  relax: {
    A: { hip: [130, 128], t: 180, f: [[196, 128]], hr: [[10, 6]], bow: 1 },
    B: { hip: [130, 128], t: 180, f: [[196, 128]], hr: [[10, 6]], bow: -1 },
  },
  breath: {
    A: { front: true, hip: [110, 118], t: 270, f: [[118, 132], [102, 132]], ks: [-1, 1], hr: [[16, 38], [-16, 38]] },
    B: { front: true, hip: [110, 118], t: 270, shy: -3, f: [[118, 132], [102, 132]], ks: [-1, 1], hr: [[16, 38], [-16, 38]] },
  },
};

// Nome do exercício → tipo de desenho (a ordem importa).
const REGRAS = [
  [/sumô/i, "sumo"],
  [/búlgaro/i, "bulgaro"],
  [/isométrico/i, "wallsit"],
  [/goblet/i, "goblet"],
  [/leg press/i, "legpress"],
  [/afundo lateral/i, "latlunge"],
  [/afundo/i, "lunge"],
  [/gémeos|panturrilha/i, "calf"],
  [/subida ao step/i, "stepup"],
  [/agachamento|hack/i, "squat"],
  [/extensora/i, "legext"],
  [/mesa flexora/i, "legcurl"],
  [/stiff/i, "hinge"],
  [/adutora/i, "adduct"],
  [/abdução/i, "abduct"],
  [/glúteo na máquina|chute/i, "kickq"],
  [/hip thrust|com carga/i, "hipthrust"],
  [/ponte|elevação de anca/i, "bridge"],
  [/pullover/i, "pullover"],
  [/abertura/i, "fly"],
  [/supino/i, "bench"],
  [/cross over/i, "crossover"],
  [/flexões/i, "pushup"],
  [/mergulho/i, "dip"],
  [/desenvolvimento/i, "press"],
  [/elevação lateral/i, "latraise"],
  [/elevação frontal/i, "frontraise"],
  [/encolhimento/i, "shrug"],
  [/tríceps na corda/i, "pushdown"],
  [/tríceps francês|por trás da cabeça/i, "tricepsover"],
  [/coice/i, "kickback"],
  [/rosca/i, "curl"],
  [/puxada/i, "pulldown"],
  [/remada baixa/i, "seatedrow"],
  [/remada alta/i, "uprightrow"],
  [/remada/i, "hingerow"],
  [/extensão lombar/i, "backext"],
  [/superman/i, "superman"],
  [/roda de abdómen/i, "abwheel"],
  [/prancha/i, "plank"],
  [/elevação de pernas/i, "legraise"],
  [/bicicleta.*abdominal|abdominal.*bicicleta/i, "bicycle"],
  [/rotação russa/i, "russian"],
  [/abdominal/i, "crunch"],
  [/kettlebell swing/i, "kbswing"],
  [/corda de saltar/i, "jumprope"],
  [/polichinelos/i, "jumpjack"],
  [/burpee/i, "burpee"],
  [/rotação de braços/i, "armcircles"],
  [/corrida|joelhos altos/i, "run"],
  [/passadeira/i, "treadmill"],
  [/bike|bicicleta/i, "bike"],
  [/respiração/i, "breath"],
  [/gato/i, "catcow"],
  [/cão/i, "downdog"],
  [/criança/i, "child"],
  [/pombo/i, "pigeon"],
  [/borboleta/i, "butterfly"],
  [/posterior|alongamento da coxa/i, "hamstring"],
  [/torção/i, "twist"],
  [/relaxamento/i, "relax"],
];

export function tipoDe(nome) {
  const r = REGRAS.find(([re]) => re.test(nome || ""));
  return r ? r[1] : null;
}

export const TIPOS_FIGURA = Object.keys(TIPOS);

const COR = "rgb(var(--tema-600))";
const COR_FUNDO = "rgb(var(--tema-300))";
const COR_BRACO = "rgb(var(--tema-450))";
const CINZA = "#94a3b8";
const CINZA_ESCURO = "#475569";

function Desenho({ tipo, j }) {
  const def = TIPOS[tipo];
  const f = j.front;
  const el = [];
  // chão
  el.push(<line key="chao" x1="10" y1={CHAO + 2} x2="230" y2={CHAO + 2} stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />);
  (def.cena || []).forEach((c, i) => {
    if (c.t === "l") el.push(<line key={`c${i}`} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke="#cbd5e1" strokeWidth={c.w || 4} strokeLinecap="round" />);
    if (c.t === "r") el.push(<rect key={`c${i}`} x={c.x} y={c.y} width={c.w} height={c.h} rx="3" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />);
    if (c.t === "c") el.push(<circle key={`c${i}`} cx={c.x} cy={c.y} r={c.r} fill="none" stroke="#cbd5e1" strokeWidth={c.w || 3} />);
  });
  const pe = (i) => {
    const { joelho, tornozelo } = j.pernas[i];
    let toe;
    if (f) toe = [tornozelo[0] + (i === 0 ? 8 : -8), tornozelo[1] + 2];
    else if (def.A.toeFloor || def.B.toeFloor) toe = [tornozelo[0] + 11, CHAO - 2];
    else {
      const ang = (Math.atan2(tornozelo[1] - joelho[1], tornozelo[0] - joelho[0]) * 180) / Math.PI - 90;
      toe = polar(tornozelo, ang, 11);
    }
    return toe;
  };
  const perna = (i, cor, w) => {
    const { joelho, tornozelo } = j.pernas[i];
    const toe = pe(i);
    return (
      <g key={`p${i}`} strokeLinecap="round" strokeLinejoin="round" fill="none">
        <polyline stroke="#fff" strokeWidth={w + 3} points={`${j.ancas[i][0]},${j.ancas[i][1]} ${joelho[0]},${joelho[1]} ${tornozelo[0]},${tornozelo[1]} ${toe[0]},${toe[1]}`} />
        <polyline stroke={cor} strokeWidth={w} points={`${j.ancas[i][0]},${j.ancas[i][1]} ${joelho[0]},${joelho[1]} ${tornozelo[0]},${tornozelo[1]} ${toe[0]},${toe[1]}`} />
      </g>
    );
  };
  const braco = (i, cor, w) => {
    const b = j.bracos[i];
    if (!b) return null;
    return (
      <g key={`b${i}`} strokeLinecap="round" strokeLinejoin="round" fill="none">
        <polyline stroke="#fff" strokeWidth={w + 4} points={`${j.ombros[i][0]},${j.ombros[i][1]} ${b.cotovelo[0]},${b.cotovelo[1]} ${b.mao[0]},${b.mao[1]}`} />
        <polyline stroke={cor} strokeWidth={w} points={`${j.ombros[i][0]},${j.ombros[i][1]} ${b.cotovelo[0]},${b.cotovelo[1]} ${b.mao[0]},${b.mao[1]}`} />
        <circle cx={b.mao[0]} cy={b.mao[1]} r={w * 0.62} fill={cor} stroke="none" />
      </g>
    );
  };
  // membros de trás (mais claros)
  el.push(perna(1, COR_FUNDO, 7));
  if (j.bracos[1]) el.push(braco(1, COR_FUNDO, 6));
  // tronco (com curvatura opcional)
  const d = [Math.cos(rad(j.t)), Math.sin(rad(j.t))];
  let n = [d[1], -d[0]];
  if (n[1] > 0) n = [-n[0], -n[1]];
  const m = [(j.hip[0] + j.sh[0]) / 2 + n[0] * j.bow * 2, (j.hip[1] + j.sh[1]) / 2 + n[1] * j.bow * 2];
  el.push(<path key="tronco" d={`M${j.hip[0]},${j.hip[1]} Q${m[0]},${m[1]} ${j.sh[0]},${j.sh[1]}`} stroke={COR} strokeWidth="12" strokeLinecap="round" fill="none" />);
  if (f) {
    el.push(<line key="ombros" x1={j.ombros[0][0]} y1={j.ombros[0][1]} x2={j.ombros[1][0]} y2={j.ombros[1][1]} stroke={COR} strokeWidth="8" strokeLinecap="round" />);
    el.push(<line key="ancas" x1={j.ancas[0][0]} y1={j.ancas[0][1]} x2={j.ancas[1][0]} y2={j.ancas[1][1]} stroke={COR} strokeWidth="8" strokeLinecap="round" />);
  }
  el.push(perna(0, COR, 8));
  el.push(braco(0, COR_BRACO, 7));
  // cabeça
  el.push(<circle key="cab" cx={j.cabeca[0]} cy={j.cabeca[1]} r="9" fill="#fff" stroke={COR} strokeWidth="4" />);
  // pesos / material
  const mao0 = j.bracos[0]?.mao;
  const maoMeio = j.bracos[1] ? [(j.bracos[0].mao[0] + j.bracos[1].mao[0]) / 2, (j.bracos[0].mao[1] + j.bracos[1].mao[1]) / 2] : mao0;
  if (def.w === "db" && mao0) {
    (f && j.bracos[1] ? [j.bracos[0].mao, j.bracos[1].mao] : [mao0]).forEach((p, i) => {
      el.push(<circle key={`w${i}`} cx={p[0]} cy={p[1]} r="6.5" fill={CINZA_ESCURO} stroke="#1e293b" strokeWidth="1.5" />);
    });
  }
  if (def.w === "kb" && maoMeio) {
    el.push(<circle key="kb" cx={maoMeio[0]} cy={maoMeio[1] + 5} r="8.5" fill={CINZA_ESCURO} stroke="#1e293b" strokeWidth="1.5" />);
    el.push(<path key="kbh" d={`M${maoMeio[0] - 5},${maoMeio[1] - 1} q5,-9 10,0`} fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />);
  }
  if (def.w === "hip") {
    el.push(<rect key="wh" x={j.hip[0] - 8} y={j.hip[1] - 16} width="16" height="9" rx="3" fill={CINZA_ESCURO} />);
  }
  if (def.roda && mao0) el.push(<circle key="roda" cx={mao0[0]} cy={mao0[1] + 6} r="8" fill="#fff" stroke={CINZA_ESCURO} strokeWidth="3" />);
  if (def.cabo && mao0) {
    el.push(<line key="cabo" x1={mao0[0]} y1={mao0[1]} x2={def.cabo[0]} y2={def.cabo[1]} stroke="#94a3b8" strokeWidth="2" />);
    el.push(<circle key="cabo2" cx={def.cabo[0]} cy={def.cabo[1]} r="4" fill="#94a3b8" />);
  }
  if (def.banda) {
    const a = j.pernas[0].tornozelo;
    const b = j.pernas[1].tornozelo;
    el.push(<line key="banda" x1={a[0]} y1={a[1] - 3} x2={b[0]} y2={b[1] - 3} stroke="#f97316" strokeWidth="3.5" strokeLinecap="round" />);
  }
  if (def.placa) {
    const a = j.pernas[0].tornozelo;
    const dd = [a[0] - j.hip[0], a[1] - j.hip[1]];
    const L = Math.hypot(dd[0], dd[1]) || 1;
    const u = [dd[0] / L, dd[1] / L];
    const c = [a[0] + u[0] * 7, a[1] + u[1] * 7];
    const nn = [-u[1], u[0]];
    el.push(<line key="placa" x1={c[0] - nn[0] * 20} y1={c[1] - nn[1] * 20} x2={c[0] + nn[0] * 20} y2={c[1] + nn[1] * 20} stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />);
  }
  if (def.corda && j.bracos[1]) {
    const a = j.bracos[0].mao;
    const b = j.bracos[1].mao;
    el.push(<path key="corda" d={`M${a[0]},${a[1]} Q${(a[0] + b[0]) / 2},${j.ropeY} ${b[0]},${b[1]}`} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />);
  }
  return <>{el}</>;
}

function juntas(tipo, k) {
  const def = TIPOS[tipo];
  const A = resolver(def.A);
  const B = resolver(def.B);
  return misturar(A, B, k);
}

// quadro: 0 = início, 1 = fim; animar = true faz o movimento a repetir
export default function FiguraExercicio({ tipo, animar = false, quadro = 0, className = "" }) {
  const [k, setK] = useState(quadro);
  const raf = useRef(0);
  useEffect(() => {
    if (!animar) { setK(quadro); return undefined; }
    const inicio = performance.now();
    const passo = (agora) => {
      const t = ((agora - inicio) % 2600) / 2600;
      // pausa curta em cada ponta
      const e = 0.5 - 0.5 * Math.cos(t * 2 * Math.PI);
      setK(Math.min(1, Math.max(0, (e - 0.06) / 0.88)));
      raf.current = requestAnimationFrame(passo);
    };
    raf.current = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf.current);
  }, [animar, quadro, tipo]);
  if (!TIPOS[tipo]) return null;
  const j = juntas(tipo, k);
  return (
    <svg viewBox="0 -36 240 186" className={className} role="img" aria-label="Desenho do exercício" style={{ display: "block" }}>
      <Desenho tipo={tipo} j={j} />
    </svg>
  );
}
