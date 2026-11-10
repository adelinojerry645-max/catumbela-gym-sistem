import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Página temporária (?migrar=1) para copiar os dados do projecto Supabase
// ANTIGO para um projecto NOVO, directamente a partir do browser.
// Pode ser repetida as vezes que for preciso: só copia o que mudou.

const ORIGEM_URL = "https://yhbqopxqudjinsvcjhpx.supabase.co";
const ORIGEM_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloYnFvcHhxdWRqaW5zdmNqaHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyMDg1ODcsImV4cCI6MjEwMjc4NDU4N30.GlhLrOmfy_8PsPoqBMwDBFMFfI0ggnk-CZPXq_k8M8M";

// Ordena as chaves para comparar duas listas independentemente da ordem dos campos.
const canonico = (v) => {
  if (Array.isArray(v)) return "[" + v.map(canonico).join(",") + "]";
  if (v && typeof v === "object")
    return "{" + Object.keys(v).sort().map((k) => JSON.stringify(k) + ":" + canonico(v[k])).join(",") + "}";
  return JSON.stringify(v);
};
const itens = (v) => (Array.isArray(v) ? v.length : "—");
const kb = (v) => Math.round(JSON.stringify(v).length / 1024) + " KB";

export default function Migrar() {
  const [url, setUrl] = useState("");
  const [chave, setChave] = useState("");
  const [log, setLog] = useState([]);
  const [linhas, setLinhas] = useState(null);
  const [aCorrer, setACorrer] = useState(false);
  const escrever = (t) => setLog((l) => [...l, t]);

  const clientes = () => {
    const u = url.trim().replace(/\/+$/, "");
    const k = chave.trim();
    if (!u.startsWith("https://") || k.length < 20) throw new Error("Preenche o endereço (URL) e a chave do projecto NOVO.");
    if (u.includes("yhbqopxqudjinsvcjhpx")) throw new Error("Esse é o projecto ANTIGO. Cola o endereço do projecto NOVO.");
    return {
      origem: createClient(ORIGEM_URL, ORIGEM_KEY),
      destino: createClient(u, k),
    };
  };

  const testar = async () => {
    setACorrer(true); setLog([]); setLinhas(null);
    try {
      const { destino } = clientes();
      const a = await destino.from("estado_app").select("chave", { count: "exact", head: true });
      if (a.error) throw new Error("Não consegui ler a tabela estado_app no projecto novo: " + a.error.message + " — já correste o ficheiro SQL?");
      escrever(`✔ Projecto novo responde. Tem ${a.count} listas (deve estar vazio antes da cópia).`);
      const p = await destino.rpc("pagina_publica");
      if (p.error) throw new Error("A função pagina_publica não existe no projecto novo: " + p.error.message);
      const g = await destino.rpc("gravar_colecao_se_atual", { p_chave: "__teste_migracao", p_valor: [], p_esperado: null, p_agora: new Date().toISOString() });
      if (g.error) throw new Error("A função gravar_colecao_se_atual falhou: " + g.error.message);
      await destino.from("estado_app").delete().eq("chave", "__teste_migracao");
      escrever("✔ As funções do sistema existem e funcionam no projecto novo.");
      escrever("Tudo pronto. Podes carregar em «Copiar dados».");
    } catch (e) { escrever("✘ " + e.message); }
    setACorrer(false);
  };

  const copiar = async () => {
    setACorrer(true); setLog([]); setLinhas(null);
    try {
      const { origem, destino } = clientes();
      escrever("A ler o projecto antigo…");
      const o = await origem.from("estado_app").select("chave,valor,atualizado_em").order("chave");
      if (o.error) throw new Error("Projecto antigo: " + o.error.message);
      const d = await destino.from("estado_app").select("chave,valor,atualizado_em").order("chave");
      if (d.error) throw new Error("Projecto novo: " + d.error.message);
      const mapaD = new Map(d.data.map((r) => [r.chave, r]));
      let copiadas = 0;
      const erros = [];
      for (const r of o.data) {
        const existente = mapaD.get(r.chave);
        const igual = existente && existente.atualizado_em === r.atualizado_em && canonico(existente.valor) === canonico(r.valor);
        if (igual) continue;
        const res = await destino.from("estado_app").upsert(
          { chave: r.chave, valor: r.valor, atualizado_em: r.atualizado_em },
          { onConflict: "chave" }
        );
        if (res.error) erros.push(`${r.chave}: ${res.error.message}`);
        else copiadas++;
        escrever(`… ${r.chave} (${itens(r.valor)} itens)`);
      }
      escrever(`Copiadas/actualizadas: ${copiadas} listas.`);
      if (erros.length) escrever("✘ Erros:\n" + erros.join("\n"));

      // Verificação final: lê outra vez o destino e compara tudo com a origem.
      const d2 = await destino.from("estado_app").select("chave,valor,atualizado_em").order("chave");
      if (d2.error) throw new Error("Verificação: " + d2.error.message);
      const mapa2 = new Map(d2.data.map((r) => [r.chave, r]));
      const tabela = o.data.map((r) => {
        const x = mapa2.get(r.chave);
        const ok = !!x && canonico(x.valor) === canonico(r.valor);
        return { chave: r.chave, antigo: itens(r.valor), novo: x ? itens(x.valor) : "falta", tam: kb(r.valor), ok };
      });
      setLinhas(tabela);
      const falhas = tabela.filter((t) => !t.ok).length;
      escrever(falhas === 0
        ? `✔✔ TUDO IGUAL: ${tabela.length} listas conferidas, nenhuma diferença.`
        : `✘ ${falhas} lista(s) diferentes — ver a tabela. Carrega outra vez em «Copiar dados».`);
    } catch (e) { escrever("✘ " + e.message); }
    setACorrer(false);
  };

  const campo = "w-full border rounded-lg px-3 py-2 text-sm font-mono";
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>Copiar dados para o projecto novo</h1>
      <p style={{ fontSize: 14, color: "#555", margin: "8px 0 16px" }}>
        Origem: projecto antigo do ginásio (já preenchido). Cola abaixo o endereço e a chave <b>anon/publishable</b> do projecto NOVO.
        Podes repetir a cópia quantas vezes quiseres — só copia o que mudou.
      </p>
      <label style={{ fontSize: 13 }}>Endereço (URL) do projecto novo</label>
      <input className={campo} placeholder="https://xxxxxxxx.supabase.co" value={url} onChange={(e) => setUrl(e.target.value)} />
      <label style={{ fontSize: 13, display: "block", marginTop: 10 }}>Chave anon / publishable do projecto novo</label>
      <input className={campo} placeholder="eyJ… ou sb_publishable_…" value={chave} onChange={(e) => setChave(e.target.value)} />
      <div style={{ display: "flex", gap: 10, margin: "14px 0" }}>
        <button disabled={aCorrer} onClick={testar} style={{ padding: "10px 16px", borderRadius: 10, border: "1px solid #999" }}>1. Testar projecto novo</button>
        <button disabled={aCorrer} onClick={copiar} style={{ padding: "10px 16px", borderRadius: 10, background: "#0f766e", color: "#fff", fontWeight: 700 }}>2. Copiar dados</button>
      </div>
      <pre style={{ background: "#f4f4f5", padding: 12, borderRadius: 10, fontSize: 13, whiteSpace: "pre-wrap", minHeight: 60 }}>
        {log.length ? log.join("\n") : "À espera…"}
      </pre>
      {linhas && (
        <table style={{ width: "100%", fontSize: 13, marginTop: 12, borderCollapse: "collapse" }}>
          <thead><tr style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}><th>Lista</th><th>Antigo</th><th>Novo</th><th>Tamanho</th><th></th></tr></thead>
          <tbody>
            {linhas.map((t) => (
              <tr key={t.chave} style={{ borderBottom: "1px solid #eee" }}>
                <td>{t.chave}</td><td>{t.antigo}</td><td>{t.novo}</td><td>{t.tam}</td>
                <td style={{ color: t.ok ? "#15803d" : "#b91c1c", fontWeight: 700 }}>{t.ok ? "✔" : "✘"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
