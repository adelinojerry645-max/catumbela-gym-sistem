import React, { useState } from "react";

// Página pública (sem entrar no sistema): treino do dia para quando o personal não vem.
// Abre com /?treino=1 — o link vai para o grupo do WhatsApp.
// Segue a divisão do plano do ginásio (Seg: Peito+Tríceps, Ter: Costas+Bíceps, Qua: Pernas,
// Qui: Ombros+Abdómen, Sex: Complementar, Sáb/Dom: Descanso) e usa SÓ os equipamentos
// que o Catumbela Gym tem.

const DIAS = [
  { id: 1, curto: "Seg", nome: "Segunda" },
  { id: 2, curto: "Ter", nome: "Terça" },
  { id: 3, curto: "Qua", nome: "Quarta" },
  { id: 4, curto: "Qui", nome: "Quinta" },
  { id: 5, curto: "Sex", nome: "Sexta" },
  { id: 6, curto: "Sáb", nome: "Sábado" },
  { id: 0, curto: "Dom", nome: "Domingo" },
];

// essencial = fica no treino curto de 30 minutos
const TREINOS = {
  1: {
    titulo: "Peito + Tríceps",
    icone: "💪",
    cor: "from-tema-700 to-tema-500",
    minutos: 55,
    exercicios: [
      { nome: "Supino na cama para peito", eq: "Cama para peito", series: "4 × 10", essencial: true, dica: "Pés bem apoiados no chão. Desce a barra até à altura do peito e empurra para cima a expirar.", alt: "Se estiver ocupada: supino com halteres." },
      { nome: "Supino com halteres", eq: "Halteres + cama para peito", series: "3 × 10", dica: "Desce até o peito esticar um pouco e sobe sem bater os halteres. Escolhe um peso com que consigas fazer as 10 repetições bem." },
      { nome: "Cross over (cabos)", eq: "Cross over", series: "3 × 12", essencial: true, dica: "Cotovelos ligeiramente dobrados. Junta as mãos à frente do peito, como quem abraça, e aperta o peito 1 segundo." },
      { nome: "Flexões", eq: "Suporte de flexões", series: "3 × até ao limite", dica: "Corpo em linha reta. Se estiver pesado, apoia os joelhos no tapete." },
      { nome: "Tríceps na corda", eq: "Multifuncional ou cross over (corda de tríceps)", series: "3 × 12", essencial: true, dica: "Cotovelos presos ao corpo. Estica os braços para baixo e abre a corda no fim.", alt: "Alternativa: tríceps com um halter por trás da cabeça." },
      { nome: "Mergulho nas paralelas", eq: "Paralela", series: "3 × 8 a 10", dica: "Desce devagar até os cotovelos fazerem 90° e sobe a esticar. Se for difícil, faz menos repetições." },
    ],
  },
  2: {
    titulo: "Costas + Bíceps",
    icone: "🔙",
    cor: "from-sky-700 to-sky-500",
    minutos: 55,
    exercicios: [
      { nome: "Puxada alta", eq: "Multifuncional (cabo em cima)", series: "4 × 10", essencial: true, dica: "Puxa a barra até ao peito, juntando as omoplatas. Sem balançar o corpo.", alt: "Se estiver ocupada: remada com halter." },
      { nome: "Remada baixa no cabo", eq: "Multifuncional (cabo em baixo)", series: "3 × 12", dica: "Peito para fora, costas direitas. Puxa os cotovelos para trás e aperta as costas." },
      { nome: "Remada com halter (um braço)", eq: "Halter + cama para peito", series: "3 × 10 cada braço", essencial: true, dica: "Apoia uma mão e um joelho. Puxa o halter até à anca, sem rodar o tronco." },
      { nome: "Extensão lombar", eq: "Banco romano", series: "3 × 12", dica: "Desce devagar e sobe até o corpo ficar em linha reta. Não passes da linha reta." },
      { nome: "Rosca direta", eq: "Halteres", series: "3 × 12", essencial: true, dica: "Cotovelos colados ao corpo. Sobe sem balançar as costas e desce devagar." },
      { nome: "Rosca martelo", eq: "Halteres", series: "3 × 12", dica: "Palmas das mãos viradas uma para a outra, como a segurar um martelo.", alt: "Alternativa: rosca no cabo com a corda de bíceps." },
    ],
  },
  3: {
    titulo: "Pernas",
    icone: "🦵",
    cor: "from-violet-700 to-fuchsia-500",
    minutos: 60,
    exercicios: [
      { nome: "Agachamento", eq: "Smith ou squat rack", series: "4 × 10", essencial: true, dica: "Pés na largura dos ombros, costas direitas. Desce até as coxas ficarem paralelas ao chão e sobe a empurrar o chão.", alt: "Se estiver ocupado: agachamento com halter (goblet)." },
      { nome: "Leg press", eq: "Leg press", series: "4 × 12", essencial: true, dica: "Não estiques os joelhos por completo no fim. Desce devagar." },
      { nome: "Hack", eq: "Hack fixa ou hack móvel", series: "3 × 10", dica: "Costas bem encostadas. Desce até aos 90° e sobe sem bloquear os joelhos." },
      { nome: "Cadeira extensora", eq: "Chute (cadeira extensora)", series: "3 × 12", dica: "Sobe as pernas devagar até esticar, pára 1 segundo em cima e desce a controlar. Sem balançar o corpo." },
      { nome: "Mesa flexora (deitado)", eq: "Cama flexora", series: "3 × 12", essencial: true, dica: "Puxa os calcanhares até ao rabo sem levantar a anca da cama." },
      { nome: "Adutora", eq: "Adutora", series: "3 × 15", dica: "Fecha as pernas devagar e aperta 1 segundo no fim." },
      { nome: "Glúteo na máquina", eq: "Máquina para glúteo", series: "3 × 12", dica: "Empurra com o calcanhar e aperta o rabo no fim do movimento." },
      { nome: "Elevação de gémeos (panturrilha)", eq: "Máquina de panturrilha", series: "4 × 15", dica: "Sobe o mais alto que conseguires, pára 1 segundo e desce devagar." },
    ],
  },
  4: {
    titulo: "Ombros + Abdómen",
    icone: "🔥",
    cor: "from-orange-600 to-amber-500",
    minutos: 55,
    exercicios: [
      { nome: "Desenvolvimento de ombros", eq: "Cadeira para ombro", series: "4 × 10", essencial: true, dica: "Costas encostadas. Empurra para cima sem arquear as costas e desce devagar." },
      { nome: "Elevação lateral", eq: "Halteres leves", series: "3 × 12", essencial: true, dica: "Sobe os braços até à altura dos ombros, cotovelos ligeiramente dobrados. Sem balançar." },
      { nome: "Elevação frontal", eq: "Halteres leves", series: "3 × 12", dica: "Sobe um halter de cada vez até à altura dos olhos e desce devagar." },
      { nome: "Encolhimento de ombros", eq: "Halteres", series: "3 × 15", dica: "Sobe os ombros em direção às orelhas, pára 1 segundo e desce. Sem rodar os ombros." },
      { nome: "Abdominal", eq: "Cama de abdómen", series: "3 × 15", essencial: true, dica: "Sobe só o tronco, sem puxar o pescoço. Pára 1 segundo em cima." },
      { nome: "Roda de abdómen", eq: "Roda de abdómen", series: "3 × 10", dica: "De joelhos, rola para a frente só até onde conseguires manter a barriga contraída. Se for difícil, faz menos distância." },
      { nome: "Prancha", eq: "Tapete", series: "3 × 30 a 45 segundos", dica: "Corpo em linha reta, barriga contraída. Não deixes a anca cair nem subir." },
    ],
  },
  5: {
    titulo: "Complementar (corpo inteiro + cardio)",
    icone: "⚡",
    cor: "from-rose-600 to-orange-500",
    minutos: 50,
    exercicios: [
      { nome: "Aquecimento: bike ou passadeira", eq: "Bike ou passadeira", series: "5 minutos", dica: "Ritmo leve para subir a temperatura do corpo." },
      { nome: "Kettlebell swing", eq: "Kettlebell", series: "4 × 15", essencial: true, dica: "Anca para trás, costas direitas. O impulso vem das pernas e da anca, não dos braços." },
      { nome: "Agachamento com kettlebell (goblet)", eq: "Kettlebell", series: "3 × 12", dica: "Segura o kettlebell junto ao peito. Desce com as costas direitas." },
      { nome: "Afundo com halteres", eq: "Halteres", series: "3 × 10 cada perna", essencial: true, dica: "Passo grande à frente, desce até o joelho de trás quase tocar no chão. Tronco direito." },
      { nome: "Subida ao step", eq: "Step", series: "3 × 12 cada perna", dica: "Sobe com o pé todo apoiado no step e desce a controlar." },
      { nome: "Corda de saltar", eq: "Corda de saltar", series: "5 × 1 minuto", essencial: true, dica: "Saltos pequenos, cotovelos junto ao corpo. Descansa 30 segundos entre cada minuto." },
      { nome: "Finalização: passadeira ou bike", eq: "Passadeira ou bike", series: "10 minutos", essencial: true, dica: "Ritmo constante e depois baixa devagar nos últimos 2 minutos." },
    ],
  },
  6: { descanso: true, titulo: "Descanso", icone: "😴" },
  0: { descanso: true, titulo: "Descanso", icone: "😴" },
};

const EQUIPAMENTOS = [
  { grupo: "Máquinas", itens: ["Leg press", "Hack fixa e hack móvel", "Chute (cadeira extensora)", "Smith", "Squat rack", "Cross over", "Multifuncional", "Cama flexora", "Adutora", "Máquina de glúteo", "Máquina de panturrilha", "Cadeira para ombro", "Camas para peito", "Paralela", "Banco romano"] },
  { grupo: "Pesos livres", itens: ["Halteres de 1 a 20 kg", "Halteres de discos", "Discos de 1 a 25 kg", "Kettlebells", "Carneleiras (pesos para os pés)", "Cordas de bíceps e tríceps", "Puxadores"] },
  { grupo: "Cardio", itens: ["Passadeiras", "Bikes", "Cordas de saltar", "Corda naval", "Steps"] },
  { grupo: "Abdómen e chão", itens: ["Cama de abdómen", "Rodas de abdómen", "Suporte de flexões", "Bola de yoga", "Banda elástica", "Tapetes", "Cones"] },
];

function CartaoExercicio({ e, numero, aberto, aoAlternar }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <button onClick={aoAlternar} className="w-full flex items-center gap-3 p-3.5 text-left">
        <span className="w-8 h-8 shrink-0 rounded-full bg-tema-600 text-white text-sm font-bold flex items-center justify-center">{numero}</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 leading-tight">{e.nome}</p>
          <p className="text-xs text-slate-500 mt-0.5">🛠 {e.eq}</p>
        </div>
        <span className="shrink-0 text-xs font-bold text-tema-700 bg-tema-100 rounded-full px-2.5 py-1 text-right">{e.series}</span>
      </button>
      {aberto && (
        <div className="px-4 pb-4 -mt-1 space-y-2">
          <div className="rounded-xl bg-tema-100/70 p-3 text-sm text-slate-700 leading-relaxed">
            <span className="font-semibold text-tema-700">Como fazer: </span>{e.dica}
          </div>
          {e.alt && <p className="text-xs text-slate-500">↪ {e.alt}</p>}
        </div>
      )}
    </div>
  );
}

export default function PaginaTreino() {
  const hoje = new Date().getDay();
  const [dia, setDia] = useState(hoje);
  const [curto, setCurto] = useState(false); // false = 60 min, true = só 30 min
  const [aberto, setAberto] = useState(null);
  const [mostrarEquip, setMostrarEquip] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const t = TREINOS[dia];
  const diaInfo = DIAS.find((d) => d.id === dia);
  const ehHoje = dia === hoje;
  const lista = t.descanso ? [] : t.exercicios.filter((e) => !curto || e.essencial);
  const minutos = t.descanso ? 0 : curto ? 30 : t.minutos;

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
    const texto = `🏋️ Treino de hoje — Catumbela Gym\nVê o treino do dia, com os aparelhos do ginásio:\n${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="relative overflow-hidden bg-gradient-to-br from-tema-700 to-tema-500 text-white px-5 pt-8 pb-10">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -left-6 bottom-0 w-24 h-24 rounded-full bg-white/10" />
        <div className="relative max-w-xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-white/80">CATUMBELA GYM</p>
          <h1 className="text-3xl font-extrabold mt-1 leading-tight">Treino de hoje</h1>
          <p className="text-white/90 text-sm mt-2">O personal não veio? Segue o treino do dia, feito com os aparelhos do nosso ginásio.</p>
          <div className="flex gap-2 mt-4">
            <button onClick={partilharWhatsApp} className="flex-1 bg-white text-tema-700 font-bold text-sm rounded-xl py-2.5 shadow">Enviar no WhatsApp</button>
            <button onClick={copiar} className="flex-1 bg-white/20 text-white font-semibold text-sm rounded-xl py-2.5 border border-white/40">{copiado ? "Link copiado ✓" : "Copiar link"}</button>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 -mt-5 pb-16">
        <div className="bg-white rounded-2xl shadow-md p-1.5 flex gap-1 mb-4">
          {DIAS.map((d) => (
            <button key={d.id} onClick={() => { setDia(d.id); setAberto(null); }}
              className={`flex-1 rounded-xl py-2 text-xs font-bold transition relative ${dia === d.id ? "bg-tema-600 text-white shadow" : "text-slate-500"}`}>
              {d.curto}
              {d.id === hoje && <span className={`block mx-auto mt-0.5 w-1.5 h-1.5 rounded-full ${dia === d.id ? "bg-white" : "bg-tema-500"}`} />}
            </button>
          ))}
        </div>

        {t.descanso ? (
          <section className="rounded-3xl bg-white border border-slate-100 shadow-sm p-6 text-center">
            <p className="text-5xl">😴</p>
            <h2 className="text-xl font-extrabold mt-2">{diaInfo.nome}: dia de descanso</h2>
            <p className="text-sm text-slate-500 mt-2">O músculo cresce quando descansa. Se quiseres mexer-te, faz uma caminhada leve ou 20 minutos de bike, mais alongamentos.</p>
            <p className="text-xs text-slate-400 mt-4">Toca nos dias de cima para ver os outros treinos.</p>
          </section>
        ) : (
          <>
            <section className={`rounded-3xl bg-gradient-to-br ${t.cor} text-white p-5 shadow-sm`}>
              <p className="text-xs font-bold tracking-widest text-white/80">{ehHoje ? "TREINO DE HOJE" : diaInfo.nome.toUpperCase()}</p>
              <h2 className="text-2xl font-extrabold mt-1 leading-tight">{t.icone} {t.titulo}</h2>
              <p className="text-sm font-semibold mt-3 bg-white/20 inline-block rounded-full px-3 py-1">⏱ {minutos} min · 🔥 {lista.length} exercícios</p>
            </section>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-1.5 flex gap-1.5 mt-3">
              <button onClick={() => setCurto(false)} className={`flex-1 rounded-xl py-2 text-sm font-bold transition ${!curto ? "bg-tema-600 text-white shadow" : "text-slate-500"}`}>Tenho tempo ({t.minutos} min)</button>
              <button onClick={() => setCurto(true)} className={`flex-1 rounded-xl py-2 text-sm font-bold transition ${curto ? "bg-tema-600 text-white shadow" : "text-slate-500"}`}>Só tenho 30 min</button>
            </div>

            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3.5 text-sm text-amber-900 mt-3">
              <p className="font-bold mb-1">Antes de começar</p>
              <ul className="list-disc pl-5 space-y-0.5">
                <li>Aquece 5 minutos (bike ou passadeira leve).</li>
                <li>Descansa 1 minuto entre as séries e bebe água.</li>
                <li>Se o aparelho estiver ocupado, passa ao seguinte e volta depois.</li>
                <li>Se sentires dor, pára e fala com a receção.</li>
              </ul>
            </div>

            <p className="text-xs text-slate-400 mt-4 mb-2">Toca num exercício para ver como se faz.</p>
            <div className="space-y-2.5">
              {lista.map((e, i) => {
                const chave = `${dia}-${i}-${curto}`;
                return <CartaoExercicio key={chave} e={e} numero={i + 1} aberto={aberto === chave} aoAlternar={() => setAberto(aberto === chave ? null : chave)} />;
              })}
            </div>
          </>
        )}

        <section className="mt-6 rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
          <button onClick={() => setMostrarEquip(!mostrarEquip)} className="w-full flex items-center justify-between p-4 text-left">
            <span className="font-bold text-slate-900">🛠 Equipamentos do ginásio</span>
            <span className="text-slate-400 text-sm">{mostrarEquip ? "Fechar" : "Ver"}</span>
          </button>
          {mostrarEquip && (
            <div className="px-4 pb-4 space-y-3">
              {EQUIPAMENTOS.map((g) => (
                <div key={g.grupo}>
                  <p className="text-xs font-bold text-tema-700 uppercase tracking-wide mb-1">{g.grupo}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {g.itens.map((i) => <span key={i} className="text-xs bg-slate-100 text-slate-600 rounded-full px-2.5 py-1">{i}</span>)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <p className="text-center text-xs text-slate-400 mt-10">Catumbela Gym · Força, foco e resultados 💪</p>
      </main>
    </div>
  );
}
