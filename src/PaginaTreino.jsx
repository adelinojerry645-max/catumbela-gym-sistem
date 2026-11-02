import React, { useState } from "react";

// Página pública (sem entrar no sistema): treinos e exercícios para os dias em que
// o personal não vem. Abre com /?treino=1 — o link vai para o grupo do WhatsApp.

const GRUPOS = [
  { id: "todos", nome: "Todos", icone: "🏋️" },
  { id: "pernas", nome: "Pernas", icone: "🦵" },
  { id: "peito", nome: "Peito", icone: "💪" },
  { id: "costas", nome: "Costas", icone: "🔙" },
  { id: "ombros", nome: "Ombros", icone: "🤷" },
  { id: "bracos", nome: "Braços", icone: "💪" },
  { id: "abdomen", nome: "Abdómen", icone: "🔥" },
  { id: "cardio", nome: "Cardio", icone: "🏃" },
];

const EXERCICIOS = [
  // PERNAS
  { id: "agachamento", grupo: "pernas", nome: "Agachamento livre", eq: "Sem peso ou com halter", series: "3 × 12", dica: "Pés na largura dos ombros, costas direitas, desce como se fosses sentar numa cadeira e sobe a empurrar o chão." },
  { id: "leg-press", grupo: "pernas", nome: "Leg press", eq: "Máquina", series: "3 × 12", dica: "Não estiques os joelhos totalmente no fim. Pés à largura dos ombros e descida devagar." },
  { id: "afundo", grupo: "pernas", nome: "Afundo (passada)", eq: "Sem peso ou halteres", series: "3 × 10 cada perna", dica: "Dá um passo grande à frente e desce até o joelho de trás quase tocar no chão. Tronco direito." },
  { id: "cadeira-ext", grupo: "pernas", nome: "Cadeira extensora", eq: "Máquina", series: "3 × 12", dica: "Sobe devagar, pára 1 segundo em cima e desce a controlar." },
  { id: "mesa-flex", grupo: "pernas", nome: "Mesa flexora", eq: "Máquina", series: "3 × 12", dica: "Puxa os calcanhares até ao rabo sem levantar a anca da máquina." },
  { id: "elevacao-gemeos", grupo: "pernas", nome: "Elevação de gémeos", eq: "Em pé, no degrau ou máquina", series: "3 × 15", dica: "Sobe na ponta dos pés o mais alto que conseguires e desce devagar." },
  { id: "ponte-gluteo", grupo: "pernas", nome: "Ponte de glúteos", eq: "Sem peso", series: "3 × 15", dica: "Deitado de costas, joelhos dobrados: sobe a anca e aperta o rabo 1 segundo em cima." },
  // PEITO
  { id: "supino-halteres", grupo: "peito", nome: "Supino com halteres", eq: "Banco e halteres", series: "3 × 10", dica: "Desce até à altura do peito e empurra para cima sem bater os halteres. Pés bem apoiados no chão." },
  { id: "supino-maquina", grupo: "peito", nome: "Supino na máquina", eq: "Máquina", series: "3 × 12", dica: "Regula o banco para as pegas ficarem à altura do peito. Empurra a expirar." },
  { id: "flexoes", grupo: "peito", nome: "Flexões", eq: "Sem peso", series: "3 × 8–12", dica: "Corpo em linha reta. Se for difícil, apoia os joelhos no chão ou usa as mãos num banco." },
  { id: "abertura", grupo: "peito", nome: "Abertura com halteres", eq: "Banco e halteres leves", series: "3 × 12", dica: "Cotovelos ligeiramente dobrados. Abre até sentires o peito esticar e fecha como quem abraça." },
  { id: "peck-deck", grupo: "peito", nome: "Peck deck (voador)", eq: "Máquina", series: "3 × 12", dica: "Costas encostadas ao banco. Junta os braços à frente e aperta o peito." },
  // COSTAS
  { id: "puxada-frente", grupo: "costas", nome: "Puxada à frente (pulley)", eq: "Máquina", series: "3 × 12", dica: "Puxa a barra até ao peito, juntando as omoplatas. Não balances o corpo." },
  { id: "remada-sentado", grupo: "costas", nome: "Remada sentado", eq: "Máquina ou cabo", series: "3 × 12", dica: "Peito para fora, costas direitas. Puxa os cotovelos para trás e aperta as costas." },
  { id: "remada-halter", grupo: "costas", nome: "Remada com halter (um braço)", eq: "Banco e halter", series: "3 × 10 cada braço", dica: "Apoia uma mão e um joelho no banco. Puxa o halter até à anca, como quem liga um motor." },
  { id: "superman", grupo: "costas", nome: "Superman (extensão lombar)", eq: "Sem peso", series: "3 × 12", dica: "Deitado de barriga para baixo, levanta braços e pernas ao mesmo tempo e pára 2 segundos." },
  // OMBROS
  { id: "desenv-halteres", grupo: "ombros", nome: "Desenvolvimento com halteres", eq: "Banco e halteres", series: "3 × 10", dica: "Sentado, empurra os halteres por cima da cabeça sem arquear as costas." },
  { id: "elev-lateral", grupo: "ombros", nome: "Elevação lateral", eq: "Halteres leves", series: "3 × 12", dica: "Sobe os braços até à altura dos ombros, cotovelos ligeiramente dobrados. Sem balançar." },
  { id: "elev-frontal", grupo: "ombros", nome: "Elevação frontal", eq: "Halteres leves", series: "3 × 12", dica: "Sobe um halter de cada vez à frente até à altura dos olhos e desce devagar." },
  // BRAÇOS
  { id: "rosca-direta", grupo: "bracos", nome: "Rosca direta (bíceps)", eq: "Halteres ou barra", series: "3 × 12", dica: "Cotovelos colados ao corpo. Sobe sem balançar as costas." },
  { id: "rosca-martelo", grupo: "bracos", nome: "Rosca martelo", eq: "Halteres", series: "3 × 12", dica: "Pega com as palmas viradas uma para a outra, como a segurar um martelo." },
  { id: "triceps-corda", grupo: "bracos", nome: "Tríceps na corda (pulley)", eq: "Cabo", series: "3 × 12", dica: "Cotovelos presos ao corpo. Estica os braços para baixo e abre a corda no fim." },
  { id: "triceps-banco", grupo: "bracos", nome: "Mergulho no banco", eq: "Banco", series: "3 × 10", dica: "Mãos no banco atrás de ti. Desce dobrando os cotovelos e sobe a esticar." },
  // ABDÓMEN
  { id: "prancha", grupo: "abdomen", nome: "Prancha", eq: "Sem peso", series: "3 × 30 segundos", dica: "Corpo em linha reta, barriga contraída. Não deixes a anca cair nem subir." },
  { id: "abdominal", grupo: "abdomen", nome: "Abdominal clássico", eq: "Sem peso", series: "3 × 15", dica: "Sobe só os ombros do chão, sem puxar o pescoço. Pára 1 segundo em cima." },
  { id: "elev-pernas", grupo: "abdomen", nome: "Elevação de pernas", eq: "Sem peso", series: "3 × 12", dica: "Deitado, sobe as pernas juntas até ficarem na vertical e desce devagar sem tocar no chão." },
  { id: "bicicleta", grupo: "abdomen", nome: "Abdominal bicicleta", eq: "Sem peso", series: "3 × 20 (10 de cada lado)", dica: "Leva o cotovelo ao joelho contrário, alternando de lado, a pedalar devagar." },
  { id: "russo", grupo: "abdomen", nome: "Rotação russa", eq: "Sem peso ou com peso leve", series: "3 × 20", dica: "Sentado, tronco inclinado para trás, roda o tronco de um lado para o outro." },
  // CARDIO
  { id: "passadeira", grupo: "cardio", nome: "Passadeira (caminhada rápida)", eq: "Máquina", series: "15 a 20 minutos", dica: "Começa devagar 3 minutos e vai subindo a velocidade. Deves conseguir falar sem ficar sem ar." },
  { id: "bicicleta-est", grupo: "cardio", nome: "Bicicleta estática", eq: "Máquina", series: "15 a 20 minutos", dica: "Banco à altura da anca. Ritmo constante, sem deixar o joelho bloquear." },
  { id: "polichinelos", grupo: "cardio", nome: "Polichinelos", eq: "Sem peso", series: "3 × 30 segundos", dica: "Salta abrindo pernas e braços ao mesmo tempo. Aterra suave, sobre a ponta dos pés." },
  { id: "corda", grupo: "cardio", nome: "Corda de saltar", eq: "Corda", series: "5 × 1 minuto", dica: "Saltos pequenos, cotovelos junto ao corpo. Descansa 30 segundos entre cada minuto." },
  { id: "burpee", grupo: "cardio", nome: "Burpee", eq: "Sem peso", series: "3 × 8", dica: "Agacha, leva os pés atrás, faz uma flexão, volta e salta. Vai ao teu ritmo." },
];

const TREINOS = [
  {
    id: "a",
    nome: "Treino A — Corpo inteiro",
    para: "Ideal para quem está a começar ou para o dia sem personal",
    tempo: "45 a 50 min",
    cor: "from-tema-600 to-tema-500",
    exercicios: ["agachamento", "supino-maquina", "remada-sentado", "desenv-halteres", "prancha"],
  },
  {
    id: "b",
    nome: "Treino B — Parte de cima",
    para: "Peito, costas, ombros e braços",
    tempo: "50 min",
    cor: "from-sky-700 to-sky-500",
    exercicios: ["supino-halteres", "puxada-frente", "elev-lateral", "rosca-direta", "triceps-corda"],
  },
  {
    id: "c",
    nome: "Treino C — Pernas e abdómen",
    para: "Pernas fortes e barriga firme",
    tempo: "50 min",
    cor: "from-violet-700 to-fuchsia-500",
    exercicios: ["leg-press", "afundo", "mesa-flex", "ponte-gluteo", "elevacao-gemeos", "abdominal"],
  },
  {
    id: "d",
    nome: "Treino D — Cardio e queima",
    para: "Para suar e queimar gordura",
    tempo: "35 a 40 min",
    cor: "from-orange-600 to-amber-500",
    exercicios: ["polichinelos", "passadeira", "burpee", "bicicleta", "corda"],
  },
];

const porId = (id) => EXERCICIOS.find((e) => e.id === id);

function CartaoExercicio({ e, aberto, aoAlternar, numero }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <button onClick={aoAlternar} className="w-full flex items-center gap-3 p-3.5 text-left">
        {numero ? (
          <span className="w-8 h-8 shrink-0 rounded-full bg-tema-600 text-white text-sm font-bold flex items-center justify-center">{numero}</span>
        ) : (
          <span className="w-8 h-8 shrink-0 rounded-full bg-tema-100 text-lg flex items-center justify-center">{GRUPOS.find((g) => g.id === e.grupo)?.icone}</span>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 leading-tight">{e.nome}</p>
          <p className="text-xs text-slate-500 mt-0.5">{e.eq}</p>
        </div>
        <span className="shrink-0 text-xs font-bold text-tema-700 bg-tema-100 rounded-full px-2.5 py-1">{e.series}</span>
      </button>
      {aberto && (
        <div className="px-4 pb-4 -mt-1">
          <div className="rounded-xl bg-tema-100/70 p-3 text-sm text-slate-700 leading-relaxed">
            <span className="font-semibold text-tema-700">Como fazer: </span>
            {e.dica}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PaginaTreino() {
  const [aba, setAba] = useState("treinos"); // "treinos" | "exercicios"
  const [grupo, setGrupo] = useState("todos");
  const [aberto, setAberto] = useState(null);
  const [treinoAberto, setTreinoAberto] = useState("a");
  const [copiado, setCopiado] = useState(false);

  const link = typeof window !== "undefined" ? `${window.location.origin}/?treino=1` : "";
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      window.prompt("Copia o link:", link);
    }
  };
  const partilharWhatsApp = () => {
    const texto = `🏋️ Treino do dia — Catumbela Gym\nTreinos prontos e exercícios explicados para hoje:\n${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
  };

  const lista = EXERCICIOS.filter((e) => grupo === "todos" || e.grupo === grupo);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="relative overflow-hidden bg-gradient-to-br from-tema-700 to-tema-500 text-white px-5 pt-8 pb-10">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -left-6 bottom-0 w-24 h-24 rounded-full bg-white/10" />
        <div className="relative max-w-xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-white/80">CATUMBELA GYM</p>
          <h1 className="text-3xl font-extrabold mt-1 leading-tight">Treino do dia</h1>
          <p className="text-white/90 text-sm mt-2">O personal não veio? Sem problema. Escolhe um treino pronto e segue os exercícios.</p>
          <div className="flex gap-2 mt-4">
            <button onClick={partilharWhatsApp} className="flex-1 bg-white text-tema-700 font-bold text-sm rounded-xl py-2.5 shadow">Enviar no WhatsApp</button>
            <button onClick={copiar} className="flex-1 bg-white/20 text-white font-semibold text-sm rounded-xl py-2.5 border border-white/40">{copiado ? "Link copiado ✓" : "Copiar link"}</button>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 -mt-5 pb-16">
        <div className="bg-white rounded-2xl shadow-md p-1.5 flex gap-1.5 mb-4">
          {[["treinos", "Treinos prontos"], ["exercicios", "Exercícios"]].map(([id, nome]) => (
            <button key={id} onClick={() => setAba(id)}
              className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition ${aba === id ? "bg-tema-600 text-white shadow" : "text-slate-500"}`}>
              {nome}
            </button>
          ))}
        </div>

        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3.5 text-sm text-amber-900 mb-4">
          <p className="font-bold mb-1">Antes de começar</p>
          <ul className="list-disc pl-5 space-y-0.5">
            <li>Faz 5 minutos de aquecimento (caminhada leve ou bicicleta).</li>
            <li>Descansa 1 minuto entre as séries e bebe água.</li>
            <li>Se sentires dor, pára e fala com a receção.</li>
          </ul>
        </div>

        {aba === "treinos" && (
          <div className="space-y-4">
            {TREINOS.map((t) => {
              const aberta = treinoAberto === t.id;
              return (
                <section key={t.id} className="rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-100">
                  <button onClick={() => setTreinoAberto(aberta ? null : t.id)} className={`w-full text-left bg-gradient-to-br ${t.cor} text-white p-4`}>
                    <p className="font-extrabold text-lg leading-tight">{t.nome}</p>
                    <p className="text-white/90 text-sm mt-0.5">{t.para}</p>
                    <p className="text-xs font-semibold mt-2 bg-white/20 inline-block rounded-full px-2.5 py-1">⏱ {t.tempo} · {t.exercicios.length} exercícios</p>
                  </button>
                  {aberta && (
                    <div className="p-3 space-y-2.5">
                      {t.exercicios.map((id, i) => {
                        const e = porId(id);
                        const chave = `${t.id}-${id}`;
                        return <CartaoExercicio key={chave} e={e} numero={i + 1} aberto={aberto === chave} aoAlternar={() => setAberto(aberto === chave ? null : chave)} />;
                      })}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}

        {aba === "exercicios" && (
          <div>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
              {GRUPOS.map((g) => (
                <button key={g.id} onClick={() => setGrupo(g.id)}
                  className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-semibold border transition ${grupo === g.id ? "bg-tema-600 text-white border-tema-600" : "bg-white text-slate-600 border-slate-200"}`}>
                  {g.icone} {g.nome}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-2 mb-3">Toca num exercício para ver como se faz.</p>
            <div className="space-y-2.5">
              {lista.map((e) => (
                <CartaoExercicio key={e.id} e={e} aberto={aberto === e.id} aoAlternar={() => setAberto(aberto === e.id ? null : e.id)} />
              ))}
            </div>
          </div>
        )}

        <p className="text-center text-xs text-slate-400 mt-10">Catumbela Gym · Força, foco e resultados 💪</p>
      </main>
    </div>
  );
}
