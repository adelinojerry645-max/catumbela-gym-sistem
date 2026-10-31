import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PaginaPublicaOpiniao } from "./extras.jsx";
import "./index.css";
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CapturaErros>
      {new URLSearchParams(window.location.search).get("opiniao") === "1" ? <PaginaPublicaOpiniao /> : <App />}
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
