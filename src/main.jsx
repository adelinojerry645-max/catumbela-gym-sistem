import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PaginaPublicaOpiniao, PaginaPublicaGinasio } from "./extras.jsx";
import PaginaTreino from "./PaginaTreino.jsx";
import "./index.css";
import { supabase } from "./lib/supabaseClient";
import { instalarRegistoDeErros, registarErro } from "./lib/registoErros";

instalarRegistoDeErros();

// Se um ecrã "rebentar", em vez de ficar tudo em branco mostra uma mensagem
// simples e regista o erro para ser corrigido.
class CapturaErros extends React.Component {
  constructor(props) { super(props); this.state = { falhou: false }; }
  static getDerivedStateFromError() { return { falhou: true }; }
  componentDidCatch(erro) { registarErro("ecra", erro); }
  render() {
    if (!this.state.falhou) return this.props.children;
    return (
      <div style={{ padding: 24, fontFamily: "sans-serif", textAlign: "center" }}>
        <h2>Ocorreu um erro neste ecrã</h2>
        <p>O erro foi registado. Toca no botão para recarregar o site.</p>
        <button onClick={() => window.location.reload()} style={{ padding: "10px 20px", fontSize: 16 }}>Recarregar</button>
      </div>
    );
  }
}

// Conta cada visita às páginas públicas (1 vez por separador), só números — sem nomes.
try {
  const qv = new URLSearchParams(window.location.search);
  const pag = qv.get("ginasio") === "1" ? "ginasio" : qv.get("opiniao") === "1" ? "opiniao" : qv.get("treino") === "1" ? "treino" : qv.get("inscricao") === "1" ? "inscricao" : null;
  if (pag && !window.sessionStorage.getItem("visita-" + pag)) {
    window.sessionStorage.setItem("visita-" + pag, "1");
    Promise.resolve(supabase.rpc("registar_visita", { p_pagina: pag })).catch(() => {});
  }
} catch (e) { /* contar visitas nunca pode estragar a página */ }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CapturaErros>
      {(() => {
        const q = new URLSearchParams(window.location.search);
        if (q.get("opiniao") === "1") return <PaginaPublicaOpiniao />;
        if (q.get("ginasio") === "1") return <PaginaPublicaGinasio />;
        if (q.get("treino") === "1") return <PaginaTreino />;
        return <App />;
      })()}
    </CapturaErros>
  </React.StrictMode>
);

// Regista o service worker — sem isto o site não pode ser "instalado" como
// app no telemóvel/computador. Falha em silêncio se o navegador não suportar.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
