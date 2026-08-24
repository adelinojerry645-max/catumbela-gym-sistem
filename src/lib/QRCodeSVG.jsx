import React from "react";
import QRCode from "./qrcode-gerador/index.js";
import QRErrorCorrectLevel from "./qrcode-gerador/QRErrorCorrectLevel.js";

// Gera um QR code real (verdadeiramente legível por uma câmara), a partir de
// qualquer texto — usado no cartão do membro, no QR fixo de check-in, etc.
export function QRCodeSVG({ valor, tamanho = 128, corFundo = "#FFFFFF", corCodigo = "#0F172A" }) {
  if (!valor) return null;
  const qr = new QRCode(-1, QRErrorCorrectLevel.M);
  qr.addData(String(valor));
  qr.make();
  const n = qr.getModuleCount();
  const quadrados = [];
  for (let linha = 0; linha < n; linha++) {
    for (let coluna = 0; coluna < n; coluna++) {
      if (qr.isDark(linha, coluna)) {
        quadrados.push(`M${coluna},${linha}h1v1h-1z`);
      }
    }
  }
  return (
    <svg viewBox={`0 0 ${n} ${n}`} width={tamanho} height={tamanho} shapeRendering="crispEdges">
      <rect width={n} height={n} fill={corFundo} />
      <path d={quadrados.join("")} fill={corCodigo} />
    </svg>
  );
}
