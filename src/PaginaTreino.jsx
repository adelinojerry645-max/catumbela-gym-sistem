import React, { useState } from "react";

// Página pública (sem entrar no sistema): treino do dia para quando o personal não vem.
// Abre com /?treino=1 — o link vai para o grupo do WhatsApp.
// Plano masculino: Seg Peito+Ombro+Tríceps, Ter Perna completo, Qua Costas+Trapézio+Bíceps,
// Qui Peito+Ombro+Tríceps, Sex Perna completo, Sáb/Dom Descanso. Plano feminino mais abaixo.
// Usa SÓ os equipamentos que o Catumbela Gym tem.

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
const TREINOS_M = {
  1: {
    titulo: "Peito + Ombro + Tríceps",
    icone: "💪",
    cor: "from-tema-700 to-tema-500",
    minutos: 60,
    exercicios: [
      { nome: "Supino na cama para peito", eq: "Cama para peito", series: "4 × 10", essencial: true, dica: "Pés bem apoiados no chão. Desce a barra até à altura do peito e empurra para cima a expirar.", alt: "Se estiver ocupada: supino com halteres." },
      { nome: "Supino com halteres", eq: "Halteres + cama para peito", series: "3 × 10", dica: "Desce até o peito esticar um pouco e sobe sem bater os halteres. Escolhe um peso com que consigas fazer as 10 repetições bem." },
      { nome: "Cross over (cabos)", eq: "Cross over", series: "3 × 12", essencial: true, dica: "Cotovelos ligeiramente dobrados. Junta as mãos à frente do peito, como quem abraça, e aperta o peito 1 segundo." },
      { nome: "Desenvolvimento de ombros", eq: "Cadeira para ombro", series: "4 × 10", essencial: true, dica: "Costas encostadas. Empurra para cima sem arquear as costas e desce devagar." },
      { nome: "Elevação lateral", eq: "Halteres leves", series: "3 × 12", dica: "Sobe os braços até à altura dos ombros, cotovelos ligeiramente dobrados. Sem balançar." },
      { nome: "Tríceps na corda", eq: "Multifuncional ou cross over (corda de tríceps)", series: "3 × 12", essencial: true, dica: "Cotovelos presos ao corpo. Estica os braços para baixo e abre a corda no fim.", alt: "Alternativa: tríceps com um halter por trás da cabeça." },
      { nome: "Mergulho nas paralelas", eq: "Paralela", series: "3 × 8 a 10", dica: "Desce devagar até os cotovelos fazerem 90° e sobe a esticar. Se for difícil, faz menos repetições." },
    ],
  },
  2: {
    titulo: "Perna completo",
    icone: "🦵",
    cor: "from-violet-700 to-fuchsia-500",
    minutos: 65,
    exercicios: [
      { nome: "Agachamento", eq: "Smith ou squat rack", series: "4 × 10", essencial: true, dica: "Pés na largura dos ombros, costas direitas. Desce até as coxas ficarem paralelas ao chão e sobe a empurrar o chão.", alt: "Se estiver ocupado: agachamento com halter (goblet)." },
      { nome: "Leg press", eq: "Leg press", series: "4 × 12", essencial: true, dica: "Não estiques os joelhos por completo no fim. Desce devagar." },
      { nome: "Hack", eq: "Hack fixa ou hack móvel", series: "3 × 10", dica: "Costas bem encostadas. Desce até aos 90° e sobe sem bloquear os joelhos." },
      { nome: "Cadeira extensora", eq: "Chute (cadeira extensora)", series: "3 × 12", dica: "Sobe as pernas devagar até esticar, pára 1 segundo em cima e desce a controlar. Sem balançar o corpo." },
      { nome: "Mesa flexora (deitado)", eq: "Cama flexora", series: "3 × 12", essencial: true, dica: "Puxa os calcanhares até ao rabo sem levantar a anca da cama." },
      { nome: "Stiff com halteres", eq: "Halteres", series: "3 × 10", dica: "Joelhos ligeiramente dobrados, costas direitas. Leva a anca para trás e desce os halteres junto às pernas." },
      { nome: "Adutora", eq: "Adutora", series: "3 × 15", dica: "Fecha as pernas devagar e aperta 1 segundo no fim." },
      { nome: "Elevação de gémeos (panturrilha)", eq: "Máquina de panturrilha", series: "4 × 15", essencial: true, dica: "Sobe o mais alto que conseguires, pára 1 segundo e desce devagar." },
    ],
  },
  3: {
    titulo: "Costas + Trapézio + Bíceps",
    icone: "🔙",
    cor: "from-sky-700 to-sky-500",
    minutos: 60,
    exercicios: [
      { nome: "Puxada alta", eq: "Multifuncional (cabo em cima)", series: "4 × 10", essencial: true, dica: "Puxa a barra até ao peito, juntando as omoplatas. Sem balançar o corpo.", alt: "Se estiver ocupada: remada com halter." },
      { nome: "Remada baixa no cabo", eq: "Multifuncional (cabo em baixo)", series: "3 × 12", dica: "Peito para fora, costas direitas. Puxa os cotovelos para trás e aperta as costas." },
      { nome: "Remada com halter (um braço)", eq: "Halter + cama para peito", series: "3 × 10 cada braço", essencial: true, dica: "Apoia uma mão e um joelho. Puxa o halter até à anca, sem rodar o tronco." },
      { nome: "Extensão lombar", eq: "Banco romano", series: "3 × 12", dica: "Desce devagar e sobe até o corpo ficar em linha reta. Não passes da linha reta." },
      { nome: "Encolhimento de ombros (trapézio)", eq: "Halteres", series: "4 × 15", essencial: true, dica: "Sobe os ombros em direção às orelhas, pára 1 segundo e desce. Sem rodar os ombros." },
      { nome: "Remada alta", eq: "Halteres", series: "3 × 12", dica: "Puxa os halteres junto ao corpo até à altura do peito, com os cotovelos a subir acima das mãos." },
      { nome: "Rosca direta", eq: "Halteres", series: "3 × 12", essencial: true, dica: "Cotovelos colados ao corpo. Sobe sem balançar as costas e desce devagar." },
      { nome: "Rosca martelo", eq: "Halteres", series: "3 × 12", dica: "Palmas das mãos viradas uma para a outra, como a segurar um martelo.", alt: "Alternativa: rosca no cabo com a corda de bíceps." },
    ],
  },
  4: {
    titulo: "Peito + Ombro + Tríceps",
    icone: "💪",
    cor: "from-tema-700 to-tema-500",
    minutos: 60,
    exercicios: [
      { nome: "Supino no Smith", eq: "Smith + cama para peito", series: "4 × 10", essencial: true, dica: "Pés bem apoiados. Desce a barra até à altura do peito e empurra para cima, sem bloquear os cotovelos." },
      { nome: "Flexões", eq: "Suporte de flexões", series: "3 × até ao limite", dica: "Corpo em linha reta. Se estiver pesado, apoia os joelhos no tapete." },
      { nome: "Abertura com halteres", eq: "Halteres + cama para peito", series: "3 × 12", essencial: true, dica: "Cotovelos ligeiramente dobrados. Abre até sentires o peito esticar e fecha como quem abraça." },
      { nome: "Desenvolvimento com halteres", eq: "Halteres", series: "3 × 10", essencial: true, dica: "Sentado, empurra os halteres por cima da cabeça sem arquear as costas." },
      { nome: "Elevação frontal", eq: "Halteres leves", series: "3 × 12", dica: "Sobe um halter de cada vez até à altura dos olhos e desce devagar." },
      { nome: "Tríceps francês", eq: "Um halter", series: "3 × 12", essencial: true, dica: "Segura um halter com as duas mãos por trás da cabeça. Estica os braços para cima, com os cotovelos fixos." },
      { nome: "Tríceps coice", eq: "Halter", series: "3 × 12 cada braço", dica: "Tronco inclinado, cotovelo colado ao corpo. Estica o braço para trás e volta devagar." },
    ],
  },
  5: {
    titulo: "Perna completo",
    icone: "🦵",
    cor: "from-violet-700 to-fuchsia-500",
    minutos: 65,
    exercicios: [
      { nome: "Leg press (pés baixos)", eq: "Leg press", series: "4 × 12", essencial: true, dica: "Pés mais baixos na plataforma para trabalhar a frente da coxa. Não estiques os joelhos por completo." },
      { nome: "Hack", eq: "Hack fixa ou hack móvel", series: "4 × 10", essencial: true, dica: "Costas bem encostadas. Desce até aos 90° e sobe sem bloquear os joelhos." },
      { nome: "Afundo com halteres", eq: "Halteres", series: "3 × 10 cada perna", essencial: true, dica: "Passo grande à frente, desce até o joelho de trás quase tocar no chão. Tronco direito." },
      { nome: "Stiff no Smith", eq: "Smith ou halteres", series: "3 × 10", dica: "Joelhos ligeiramente dobrados, costas direitas. Leva a anca para trás e desce a barra junto às pernas." },
      { nome: "Mesa flexora (deitado)", eq: "Cama flexora", series: "3 × 12", essencial: true, dica: "Puxa os calcanhares até ao rabo sem levantar a anca da cama." },
      { nome: "Cadeira extensora", eq: "Chute (cadeira extensora)", series: "3 × 12", dica: "Sobe as pernas devagar até esticar, pára 1 segundo em cima e desce a controlar." },
      { nome: "Glúteo na máquina", eq: "Máquina para glúteo", series: "3 × 12", dica: "Empurra com o calcanhar e aperta o rabo no fim do movimento." },
      { nome: "Elevação de gémeos (panturrilha)", eq: "Máquina de panturrilha", series: "4 × 15", essencial: true, dica: "Sobe o mais alto que conseguires, pára 1 segundo e desce devagar." },
    ],
  },
  6: {
    titulo: "Costas + Trapézio + Bíceps",
    icone: "🔙",
    cor: "from-sky-700 to-sky-500",
    minutos: 60,
    exercicios: [
      { nome: "Remada curvada com halteres", eq: "Halteres", series: "4 × 10", essencial: true, dica: "Tronco inclinado, costas direitas. Puxa os halteres até à anca, juntando as omoplatas." },
      { nome: "Puxada alta (pegada fechada)", eq: "Multifuncional (cabo em cima)", series: "3 × 12", essencial: true, dica: "Pegada estreita, mãos viradas uma para a outra. Puxa até ao peito, sem balançar o corpo." },
      { nome: "Remada baixa no cabo", eq: "Multifuncional (cabo em baixo)", series: "3 × 12", dica: "Peito para fora, costas direitas. Puxa os cotovelos para trás e aperta as costas." },
      { nome: "Pullover com halter", eq: "Halter + cama para peito", series: "3 × 12", dica: "Deitado na cama para peito, leva o halter por trás da cabeça com os braços quase esticados e volta devagar." },
      { nome: "Encolhimento de ombros (trapézio)", eq: "Halteres", series: "4 × 15", essencial: true, dica: "Sobe os ombros em direção às orelhas, pára 1 segundo e desce. Sem rodar os ombros." },
      { nome: "Rosca martelo", eq: "Halteres", series: "3 × 12", essencial: true, dica: "Palmas das mãos viradas uma para a outra, como a segurar um martelo." },
      { nome: "Rosca no cabo com corda", eq: "Multifuncional (corda de bíceps)", series: "3 × 12", dica: "Cotovelos colados ao corpo. Puxa a corda até ao peito e desce devagar." },
      { nome: "Rosca concentrada", eq: "Halter", series: "3 × 12 cada braço", essencial: true, dica: "Sentado, cotovelo apoiado na coxa. Sobe o halter devagar e aperta o bíceps em cima." },
    ],
  },
  0: { descanso: true, titulo: "Descanso", icone: "😴" },
};

// Plano feminino do ginásio. "Livre" = exercícios com peso do corpo, halteres, kettlebell e banda;
// "Carga" = com máquinas e peso mais pesado.
const TREINOS_F = {
  1: {
    titulo: "Pernas e quadríceps (livre)",
    icone: "🦵",
    cor: "from-pink-600 to-rose-400",
    minutos: 55,
    exercicios: [
      { nome: "Agachamento com kettlebell (goblet)", eq: "Kettlebell", series: "4 × 12", essencial: true, dica: "Segura o kettlebell junto ao peito, pés na largura dos ombros. Desce com as costas direitas e os joelhos na direção dos pés, e sobe a empurrar o chão." },
      { nome: "Afundo com halteres", eq: "Halteres", series: "3 × 10 cada perna", essencial: true, dica: "Passo grande à frente, desce até o joelho de trás quase tocar no chão. Tronco direito." },
      { nome: "Agachamento búlgaro", eq: "Halteres + cama para peito", series: "3 × 10 cada perna", essencial: true, dica: "Pé de trás apoiado na cama para peito. Desce com o tronco direito para trabalhar mais a frente da coxa (quadríceps)." },
      { nome: "Subida ao step", eq: "Step + halteres", series: "3 × 12 cada perna", dica: "Sobe com o pé todo apoiado no step, sem impulso da perna de trás, e desce a controlar." },
      { nome: "Agachamento isométrico na parede", eq: "Parede", series: "3 × 30 a 45 segundos", dica: "Costas na parede, coxas paralelas ao chão e joelhos a 90°. Aguenta a posição a respirar." },
      { nome: "Afundo lateral", eq: "Halter ou kettlebell", series: "3 × 10 cada lado", dica: "Dá um passo grande para o lado e dobra só essa perna, com a outra esticada. Volta empurrando o chão." },
      { nome: "Elevação de anca (ponte de glúteos)", eq: "Tapete + disco ou halter", series: "3 × 15", dica: "Deitada de costas, pés no chão. Sobe a anca e aperta o rabo 1 segundo em cima." },
    ],
  },
  2: {
    titulo: "Glúteos e posterior (carga)",
    icone: "🔥",
    cor: "from-rose-600 to-orange-500",
    minutos: 60,
    exercicios: [
      { nome: "Stiff", eq: "Halteres ou Smith", series: "4 × 10", essencial: true, dica: "Joelhos ligeiramente dobrados, costas direitas. Leva a anca para trás e desce o peso junto às pernas até sentires a parte de trás da coxa esticar." },
      { nome: "Elevação de anca com carga", eq: "Smith ou disco, mais a cama para peito", series: "4 × 10", essencial: true, dica: "Costas apoiadas na cama para peito, peso sobre a anca. Sobe até o corpo ficar reto e aperta o rabo 1 segundo." },
      { nome: "Mesa flexora (deitada)", eq: "Cama flexora", series: "4 × 12", essencial: true, dica: "Puxa os calcanhares até ao rabo sem levantar a anca da cama. Desce devagar." },
      { nome: "Glúteo na máquina", eq: "Máquina para glúteo", series: "4 × 12", dica: "Empurra com o calcanhar e aperta o rabo no fim do movimento." },
      { nome: "Leg press (pés altos e afastados)", eq: "Leg press", series: "3 × 12", dica: "Pés no alto da plataforma e um pouco abertos para puxar mais o glúteo e o posterior. Não estiques os joelhos por completo." },
      { nome: "Agachamento sumô", eq: "Smith ou kettlebell pesado", series: "3 × 12", dica: "Pernas abertas, pontas dos pés para fora. Desce com as costas direitas." },
    ],
  },
  3: {
    titulo: "Superior",
    icone: "💪",
    cor: "from-tema-700 to-tema-500",
    minutos: 50,
    exercicios: [
      { nome: "Puxada alta", eq: "Multifuncional (cabo em cima)", series: "3 × 12", essencial: true, dica: "Puxa a barra até ao peito, juntando as omoplatas. Sem balançar o corpo." },
      { nome: "Supino na cama para peito", eq: "Cama para peito", series: "3 × 12", essencial: true, dica: "Pés bem apoiados. Desce até à altura do peito e empurra para cima a expirar. Escolhe um peso leve a moderado." },
      { nome: "Desenvolvimento de ombros", eq: "Cadeira para ombro", series: "3 × 12", essencial: true, dica: "Costas encostadas. Empurra para cima sem arquear as costas e desce devagar." },
      { nome: "Remada baixa no cabo", eq: "Multifuncional (cabo em baixo)", series: "3 × 12", dica: "Peito para fora, costas direitas. Puxa os cotovelos para trás e aperta as costas." },
      { nome: "Elevação lateral", eq: "Halteres leves", series: "3 × 15", dica: "Sobe os braços até à altura dos ombros, cotovelos ligeiramente dobrados. Sem balançar." },
      { nome: "Rosca direta", eq: "Halteres", series: "3 × 12", dica: "Cotovelos colados ao corpo. Sobe sem balançar as costas e desce devagar." },
      { nome: "Tríceps na corda", eq: "Multifuncional ou cross over (corda de tríceps)", series: "3 × 12", dica: "Cotovelos presos ao corpo. Estica os braços para baixo e abre a corda no fim." },
    ],
  },
  4: {
    titulo: "Quadríceps e panturrilha (carga)",
    icone: "🦵",
    cor: "from-violet-700 to-fuchsia-500",
    minutos: 60,
    exercicios: [
      { nome: "Agachamento", eq: "Smith ou squat rack", series: "4 × 10", essencial: true, dica: "Pés na largura dos ombros, costas direitas. Desce até as coxas ficarem paralelas ao chão e sobe a empurrar o chão." },
      { nome: "Leg press", eq: "Leg press", series: "4 × 12", essencial: true, dica: "Pés ao meio da plataforma, à largura dos ombros. Não estiques os joelhos por completo no fim." },
      { nome: "Hack", eq: "Hack fixa ou hack móvel", series: "3 × 10", dica: "Costas bem encostadas. Desce até aos 90° e sobe sem bloquear os joelhos." },
      { nome: "Cadeira extensora", eq: "Chute (cadeira extensora)", series: "3 × 12", essencial: true, dica: "Sobe as pernas devagar até esticar, pára 1 segundo em cima e desce a controlar." },
      { nome: "Elevação de gémeos (panturrilha)", eq: "Máquina de panturrilha", series: "4 × 15", essencial: true, dica: "Sobe o mais alto que conseguires, pára 1 segundo e desce devagar." },
      { nome: "Gémeos em pé no step", eq: "Step + halteres", series: "3 × 20", dica: "Pontas dos pés no step, calcanhares no ar. Sobe e desce devagar, com um halter em cada mão." },
    ],
  },
  5: {
    titulo: "Glúteos",
    icone: "🍑",
    cor: "from-pink-600 to-rose-400",
    minutos: 50,
    exercicios: [
      { nome: "Elevação de anca (hip thrust)", eq: "Cama para peito + disco ou Smith", series: "4 × 12", essencial: true, dica: "Costas apoiadas na cama para peito, peso sobre a anca. Sobe até o corpo ficar reto e aperta o rabo 1 segundo." },
      { nome: "Glúteo na máquina", eq: "Máquina para glúteo", series: "4 × 15", essencial: true, dica: "Empurra com o calcanhar e aperta o rabo no fim do movimento." },
      { nome: "Agachamento sumô com kettlebell", eq: "Kettlebell", series: "3 × 12", dica: "Pernas bem abertas, pontas dos pés para fora. Desce com as costas direitas e aperta o rabo ao subir." },
      { nome: "Abdução com banda elástica", eq: "Banda elástica", series: "3 × 20", essencial: true, dica: "Banda acima dos joelhos. Abre as pernas contra a banda, devagar, sem mexer o tronco." },
      { nome: "Chute para trás com carneleira", eq: "Carneleiras (pesos para os pés)", series: "3 × 15 cada perna", dica: "De quatro apoios, sobe a perna dobrada em direção ao teto e aperta o rabo. Sem arquear as costas." },
      { nome: "Ponte de glúteos com uma perna", eq: "Tapete", series: "3 × 12 cada perna", dica: "Deitada, uma perna esticada no ar. Sobe a anca só com a outra e aperta o rabo." },
    ],
  },
  6: {
    titulo: "Alongamento (yoga)",
    icone: "🧘",
    cor: "from-teal-600 to-emerald-400",
    minutos: 40,
    exercicios: [
      { nome: "Respiração profunda", eq: "Tapete", series: "2 minutos", essencial: true, dica: "Sentada ou deitada. Inspira pelo nariz contando até 4 e expira devagar pela boca contando até 6." },
      { nome: "Gato e vaca", eq: "Tapete", series: "10 repetições lentas", dica: "De quatro apoios, arredonda as costas a expirar e abre o peito a inspirar." },
      { nome: "Cão a olhar para baixo", eq: "Tapete", series: "3 × 30 segundos", essencial: true, dica: "Anca para o teto, costas esticadas. Podes dobrar os joelhos se a parte de trás da coxa puxar muito." },
      { nome: "Postura da criança", eq: "Tapete", series: "1 minuto", dica: "Senta-te sobre os calcanhares e estica os braços à frente, com a testa no chão." },
      { nome: "Postura do pombo", eq: "Tapete", series: "45 segundos cada lado", essencial: true, dica: "Alonga o glúteo. Perna da frente dobrada, a de trás esticada. Desce o tronco devagar." },
      { nome: "Borboleta", eq: "Tapete", series: "1 minuto", dica: "Sentada, plantas dos pés juntas e joelhos abertos. Inclina o tronco para a frente, sem forçar." },
      { nome: "Alongamento da coxa (posterior)", eq: "Tapete", series: "45 segundos cada perna", dica: "Sentada com uma perna esticada. Inclina o tronco em direção ao pé, com as costas direitas." },
      { nome: "Torção deitada", eq: "Tapete", series: "45 segundos cada lado", dica: "Deitada de costas, leva os joelhos dobrados para um lado e olha para o lado contrário." },
      { nome: "Relaxamento final", eq: "Tapete ou bola de yoga", series: "3 minutos", essencial: true, dica: "Deitada de costas, braços ao lado do corpo, olhos fechados. Respira devagar e solta o corpo todo." },
    ],
  },
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
  // Plano masculino ou feminino (lembra a escolha; o link também aceita ?plano=f)
  const [sexo, setSexo] = useState(() => {
    try {
      const q = new URLSearchParams(window.location.search).get("plano");
      if (q === "f" || q === "m") return q;
      return localStorage.getItem("catumbela_treino_sexo") === "f" ? "f" : "m";
    } catch { return "m"; }
  });
  const escolherSexo = (v) => {
    setSexo(v);
    setAberto(null);
    try { localStorage.setItem("catumbela_treino_sexo", v); } catch {}
  };
  const TREINOS = sexo === "f" ? TREINOS_F : TREINOS_M;
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
        <div className="bg-white rounded-2xl shadow-md p-1.5 flex gap-1.5 mb-2">
          {[["m", "Plano masculino"], ["f", "Plano feminino"]].map(([id, nome]) => (
            <button key={id} onClick={() => escolherSexo(id)}
              className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition ${sexo === id ? "bg-tema-600 text-white shadow" : "text-slate-500"}`}>
              {nome}
            </button>
          ))}
        </div>
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
