import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  LayoutDashboard, Users, ClipboardList, CreditCard, Wallet, Package,
  ShoppingCart, DoorOpen, UserCog, BarChart3, Settings, Search, Bell,
  Plus, QrCode, CheckCircle2, XCircle, TrendingUp, AlertTriangle, X,
  Pencil, LogOut, ChevronLeft, Receipt, User as UserIcon, History,
  Sun, Moon, MessageCircle, Phone, Trash2, Camera, FileText, Dumbbell,
  ShieldCheck, KeyRound, Menu, Save, LogIn, DoorClosed, Wallet as WalletIcon,
  Building2, Landmark, Smartphone, ImagePlus, RefreshCw, ToggleLeft, ToggleRight, RotateCcw,
  PlayCircle, PauseCircle, MessageSquare, Send, ChevronRight, ScanLine
} from "lucide-react";
async function lerColecao() { throw new Error("sem supabase na demo"); }
async function gravarColecao() { return Promise.resolve(); }
function subscreverColecao() { return null; }
function desligarCanal() {}
async function adicionarItemAtomico() { throw new Error("sem supabase na demo"); }
async function reservarAtividadeAtomico() { throw new Error("sem supabase na demo"); }
import { QRCodeSVG } from "./lib/QRCodeSVG.jsx";
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const LOGO_BASE64 = "data:image/png;base64,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";

// ---------------------------------------------------------------------
// DADOS DE EXEMPLO (mock — substituir por chamadas à API/BD)
// ---------------------------------------------------------------------
// Dados de arranque: vazios de propósito — o administrador cria tudo (planos, membros,
// funcionários, personal trainers, produtos) através do próprio sistema depois do primeiro login.
const PLANOS_INICIAIS = [];

const HISTORICO_PAGAMENTOS_MEMBRO = [];

const MEMBROS_INICIAIS = [];

const PRODUTOS_INICIAIS = [];

const ACESSOS_INICIAIS = [];

const FUNCIONARIOS = [];

const PERSONAL_TRAINERS_INICIAIS = [];

// Contas de acesso ao sistema. Vem vazia de propósito: a primeira conta a ser criada,
// obrigatoriamente, é a do Administrador (feito na própria tela inicial). Só depois de
// existir um administrador é que ele pode criar contas de Recepcionista, Personal Trainer
// e Membro a partir do sistema.
const CONTAS_INICIAIS = [];

const kz = (n) => n.toLocaleString("pt-PT") + " Kz";

// Formata uma data LOCAL como "AAAA-MM-DD" sem passar por toISOString() —
// toISOString() converte para UTC, o que em fusos horários à frente de UTC
// (como Angola, UTC+1) fazia "perder" sempre 1 dia em qualquer conta feita
// com .setDate(), podendo até fazer um vencimento DIMINUIR em vez de
// aumentar ao recalcular. Usa sempre esta função depois de .setDate().
const dataLocalISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// Devolve a lista de contas bancárias/Express do ginásio a mostrar aos membros
// e nos recibos — usa as contas novas (várias) se existirem, senão cai para
// os campos antigos (uma só conta), para quem já tinha configurado antes.
function obterContasBancarias(dadosGinasio) {
  if (dadosGinasio.contasBancarias && dadosGinasio.contasBancarias.length > 0) {
    return dadosGinasio.contasBancarias;
  }
  const contas = [];
  if (dadosGinasio.iban) {
    contas.push({ id: "legado-iban", tipo: "iban", banco: dadosGinasio.banco, titular: dadosGinasio.titular || dadosGinasio.nome, iban: dadosGinasio.iban, moeda: dadosGinasio.moeda || "AOA" });
  }
  if (dadosGinasio.telefonePix) {
    contas.push({ id: "legado-express", tipo: "express", banco: "MULTICAIXA Express", titular: dadosGinasio.titular || dadosGinasio.nome, telefone: dadosGinasio.telefonePix });
  }
  return contas;
}

// Tipos de movimento com DIREÇÃO FIXA — impossível marcar "Levantamento"
// como entrada ou "Depósito" como saída por engano. Usado tanto no Caixa
// como no Banco, como pedido.
// Tipos de movimento com direção FIXA — mas atenção: Depósito e Levantamento
// representam o MESMO dinheiro a mudar de sítio, por isso têm direção OPOSTA
// consoante estejam a ser registados no Caixa ou no Banco:
// - Depósito: sai do Caixa (o dinheiro físico vai para o banco) → entra no Banco
// - Levantamento: sai do Banco → entra no Caixa (o dinheiro físico chega às mãos)
// Os outros tipos (pagamento, empréstimo, etc.) têm a mesma direção em ambos.
// "disponivel" controla em que ledger cada tipo pode ser usado — nem tudo faz
// sentido nos dois sítios: um TPA nunca gera dinheiro físico (só Banco), e
// "Transferência" é sempre uma operação bancária (nunca envolve o Caixa).
const TIPOS_MOVIMENTO = [
  { id: "saldo_inicial", rotulo: "Saldo inicial", direcaoCaixa: "entrada", direcaoBanco: "entrada", disponivel: ["caixa", "banco"] },
  { id: "entrada_dinheiro", rotulo: "Entrada de dinheiro", direcaoCaixa: "entrada", direcaoBanco: "entrada", disponivel: ["caixa"] },
  { id: "deposito", rotulo: "Depósito", direcaoCaixa: "saida", direcaoBanco: "entrada", disponivel: ["caixa", "banco"] },
  { id: "levantamento", rotulo: "Levantamento", direcaoCaixa: "entrada", direcaoBanco: "saida", disponivel: ["caixa", "banco"] },
  { id: "pagamento", rotulo: "Pagamento / Despesa", direcaoCaixa: "saida", direcaoBanco: "saida", disponivel: ["caixa", "banco"] },
  { id: "transferencia_recebida", rotulo: "Transferência recebida", direcaoCaixa: "entrada", direcaoBanco: "entrada", disponivel: ["banco"] },
  { id: "transferencia_enviada", rotulo: "Transferência enviada", direcaoCaixa: "saida", direcaoBanco: "saida", disponivel: ["banco"] },
  { id: "emprestimo_recebido", rotulo: "Empréstimo recebido", direcaoCaixa: "entrada", direcaoBanco: "entrada", disponivel: ["caixa", "banco"] },
  { id: "emprestimo_pago", rotulo: "Empréstimo pago/devolvido", direcaoCaixa: "saida", direcaoBanco: "saida", disponivel: ["caixa", "banco"] },
  { id: "fecho_tpa", rotulo: "Fecho TPA", direcaoCaixa: "entrada", direcaoBanco: "entrada", disponivel: ["banco"] },
];

// Converte um número em Kwanzas para texto por extenso (português), ex.: 2300176 → "Dois milhões e trezentos mil e cento e setenta e seis"
function numeroPorExtenso(valor) {
  const UNIDADES = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
  const DEZ_A_DEZANOVE = ["dez", "onze", "doze", "treze", "catorze", "quinze", "dezasseis", "dezassete", "dezoito", "dezanove"];
  const DEZENAS = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  const CENTENAS = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

  const trescentos = (n) => {
    if (n === 0) return "";
    if (n === 100) return "cem";
    let partes = [];
    const c = Math.floor(n / 100), resto1 = n % 100;
    if (c > 0) partes.push(CENTENAS[c]);
    if (resto1 > 0) {
      if (resto1 < 10) partes.push(UNIDADES[resto1]);
      else if (resto1 < 20) partes.push(DEZ_A_DEZANOVE[resto1 - 10]);
      else {
        const d = Math.floor(resto1 / 10), u = resto1 % 10;
        partes.push(DEZENAS[d] + (u > 0 ? " e " + UNIDADES[u] : ""));
      }
    }
    return partes.join(" e ");
  };

  const inteiro = Math.floor(valor);
  if (inteiro === 0) return "zero";

  const milhoes = Math.floor(inteiro / 1000000);
  const milhares = Math.floor((inteiro % 1000000) / 1000);
  const centenas = inteiro % 1000;

  let blocos = [];
  if (milhoes > 0) blocos.push(trescentos(milhoes) + (milhoes === 1 ? " milhão" : " milhões"));
  if (milhares > 0) blocos.push((milhares === 1 ? "mil" : trescentos(milhares) + " mil"));
  if (centenas > 0) blocos.push(trescentos(centenas));

  if (blocos.length === 0) return "zero";
  if (blocos.length === 1) return blocos[0];
  return blocos.slice(0, -1).join(", ") + " e " + blocos[blocos.length - 1];
}

// ---------------------------------------------------------------------
// DOCUMENTO FINANCEIRO (recibo / fatura / proforma) — segue o formato
// de fatura-recibo angolana de referência, ligado aos dados do ginásio
// ---------------------------------------------------------------------
function DocumentoFinanceiro({ docRef, tipo, numero, data, hora, cliente, itens, metodo, dadosGinasio }) {
  const total = itens.reduce((s, i) => s + i.total, 0);
  const rotuloMetodo = { dinheiro: "Numerário", tpa: "TPA", express: "MULTICAIXA Express", referencia: "Referência", transferencia: "Transferência Bancária" };

  return (
    <div ref={docRef} className="bg-white text-slate-800 p-6 text-xs" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Cabeçalho: dados do ginásio + identificação do documento */}
      <div className="flex items-start justify-between border-b-2 border-slate-800 pb-3 mb-3">
        <div className="flex items-start gap-3">
          <img
            src={dadosGinasio.logo || LOGO_BASE64}
            alt={dadosGinasio.nome}
            className="object-contain"
            style={{ height: "56px", width: "auto", maxWidth: "140px", objectFit: "contain" }}
          />
          <div>
            <p className="font-bold text-sm">{dadosGinasio.nome}</p>
            {dadosGinasio.morada && <p>{dadosGinasio.morada}{dadosGinasio.cidade ? `, ${dadosGinasio.cidade}` : ""}</p>}
            {dadosGinasio.nif && <p>Nº Contribuinte: {dadosGinasio.nif}</p>}
            {dadosGinasio.telefone && <p>Telefone: {dadosGinasio.telefone}</p>}
            {dadosGinasio.email && <p>Email: {dadosGinasio.email}</p>}
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold">{tipo} Nº: {numero}</p>
          <p>Data emissão: {data}{hora ? ` às ${hora}` : ""}</p>
        </div>
      </div>

      {/* Cliente */}
      <div className="mb-3">
        <p className="font-semibold">Exmo(s) Senhor(es)</p>
        <p className="font-bold">{cliente.nome}</p>
        <p>Nº de membro: {cliente.numero}</p>
      </div>

      {/* Tabela de itens */}
      <table className="w-full border-collapse mb-3">
        <thead>
          <tr className="border-b border-t border-slate-800">
            <th className="text-left py-1.5 pr-2">Referência</th>
            <th className="text-left py-1.5 pr-2">Descrição</th>
            <th className="text-right py-1.5 pr-2">Qtd.</th>
            <th className="text-right py-1.5 pr-2">P. Unit.</th>
            <th className="text-right py-1.5">Total</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((i, idx) => (
            <tr key={idx} className="border-b border-slate-200">
              <td className="py-1.5 pr-2">{i.referencia}</td>
              <td className="py-1.5 pr-2">{i.descricao}</td>
              <td className="py-1.5 pr-2 text-right">{i.qtd}</td>
              <td className="py-1.5 pr-2 text-right">{kz(i.precoUnit)}</td>
              <td className="py-1.5 text-right">{kz(i.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Resumo */}
      <div className="flex justify-end mb-3">
        <div className="w-56">
          <div className="flex justify-between py-1"><span>Mercadoria / Serviços</span><span>{kz(total)}</span></div>
          <div className="flex justify-between py-1"><span>Desconto</span><span>0,00 Kz</span></div>
          <div className="flex justify-between py-1 font-bold border-t border-slate-800 mt-1 pt-1">
            <span>TOTAL</span><span>{kz(total)}</span>
          </div>
        </div>
      </div>

      <p className="mb-3">
        <span className="font-semibold">Extenso: </span>
        {numeroPorExtenso(total)} kwanzas
      </p>

      {metodo && (
        <p className="mb-3"><span className="font-semibold">Método de pagamento:</span> {rotuloMetodo[metodo] || metodo}</p>
      )}

      {/* Coordenadas bancárias */}
      <div className="border-t border-slate-300 pt-2 mt-2">
        <p className="font-semibold mb-1">Coordenadas bancárias</p>
        <p>Banco: {dadosGinasio.banco}</p>
        <p>IBAN: {dadosGinasio.iban}</p>
        <p>MULTICAIXA Express: {dadosGinasio.telefonePix}</p>
      </div>

      <p className="text-center text-[10px] text-slate-400 mt-4">{dadosGinasio.nome} — Documento processado por computador</p>
    </div>
  );
}

// ---------------------------------------------------------------------
// PERSISTÊNCIA — guarda o estado localmente (localStorage, para carregar
// instantaneamente e funcionar mesmo sem rede) E sincroniza com o
// Supabase em segundo plano (para os dados serem os mesmos em qualquer
// dispositivo). Se o Supabase ainda não estiver configurado/ligado, a
// app continua a funcionar apenas com o guardado local, sem quebrar.
// ---------------------------------------------------------------------
const CHAVE_ARMAZENAMENTO = "catumbela-gym:v1";
// Chave separada, NUNCA trocada consoante o modo — controla se estamos ou não
// em modo de teste. Guardada à parte para sobreviver mesmo quando o resto dos
// dados muda de "gaveta".
const CHAVE_MODO_TESTE = "catumbela-gym:modo-teste";

function estaEmModoTeste() {
  try {
    return window.localStorage.getItem(CHAVE_MODO_TESTE) === "true";
  } catch {
    return false;
  }
}

// Quando o modo de teste está ativo, TODOS os dados (localStorage e Supabase)
// vão para uma "gaveta" completamente separada dos dados reais do ginásio —
// nunca se misturam, e sair do modo de teste devolve tudo ao normal na hora.
const MODO_TESTE_ATIVO = estaEmModoTeste();
const CHAVE_ARMAZENAMENTO_ATUAL = MODO_TESTE_ATIVO ? "catumbela-gym:v1:teste" : CHAVE_ARMAZENAMENTO;
const PREFIXO_COLECAO_TESTE = MODO_TESTE_ATIVO ? "teste_" : "";

function alternarModoTeste(ativar) {
  try {
    window.localStorage.setItem(CHAVE_MODO_TESTE, ativar ? "true" : "false");
  } catch {
    // se não conseguir gravar a preferência, ainda assim tenta recarregar
  }
  window.location.reload();
}

function carregarEstadoGuardado() {
  try {
    const bruto = window.localStorage.getItem(CHAVE_ARMAZENAMENTO_ATUAL);
    return bruto ? JSON.parse(bruto) : {};
  } catch {
    return {};
  }
}

// Reduz o tamanho de qualquer imagem carregada (foto de membro, comprovativo,
// logótipo) antes de a guardar — uma foto de telemóvel pode ter vários MB, o
// que rapidamente enche o espaço disponível no navegador e faz com que
// gravações seguintes falhem silenciosamente. Reduz para no máximo 900px de
// largura/altura e comprime como JPEG, o que normalmente poupa 80-95% do
// tamanho sem perda visível de qualidade num ecrã.
function comprimirImagem(ficheiro, larguraMax = 900, qualidade = 0.75) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onerror = () => reject(new Error("Não foi possível ler o ficheiro"));
    leitor.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Não foi possível processar a imagem"));
      img.onload = () => {
        let { width, height } = img;
        if (width > larguraMax || height > larguraMax) {
          const escala = larguraMax / Math.max(width, height);
          width = Math.round(width * escala);
          height = Math.round(height * escala);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", qualidade));
      };
      img.src = leitor.result;
    };
    leitor.readAsDataURL(ficheiro);
  });
}

// Guarda só localmente — usado para estado de sessão (login, tema, ecrã
// atual) que não faz sentido partilhar entre dispositivos diferentes.
function useLocalOnly(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    const guardado = carregarEstadoGuardado();
    return chave in guardado ? guardado[chave] : valorInicial;
  });

  useEffect(() => {
    try {
      const atual = carregarEstadoGuardado();
      atual[chave] = valor;
      window.localStorage.setItem(CHAVE_ARMAZENAMENTO_ATUAL, JSON.stringify(atual));
    } catch (e) {
      console.warn("Não foi possível guardar os dados localmente:", e);
      window.dispatchEvent(new CustomEvent("catumbela:erro-armazenamento", { detail: e }));
    }
  }, [chave, valor]);

  return [valor, setValor];
}

// Guarda localmente E sincroniza com a tabela `estado_app` no Supabase —
// usado para os dados reais do ginásio (membros, planos, pagamentos, etc.)
function usePersistente(chave, valorInicial, setStatusSync) {
  const [valor, setValor] = useState(() => {
    const guardado = carregarEstadoGuardado();
    return chave in guardado ? guardado[chave] : valorInicial;
  });
  const primeiraVez = useRef(true);
  const ignorarProximoEnvio = useRef(false);
  const mudouLocalmente = useRef(false); // true assim que a pessoa altera algo (só protege a busca inicial)
  const gravacaoPendente = useRef(false); // true só enquanto há uma gravação nossa a caminho do Supabase
  const ultimoRemotoConhecido = useRef(null); // último valor que sabemos que está no Supabase
  const timeoutRef = useRef(null);

  // Ao carregar o ecrã: busca a versão mais recente guardada no Supabase.
  // Só aplica essa versão se a pessoa ainda não tiver feito nenhuma alteração
  // entretanto — caso contrário, uma busca lenta podia chegar depois de uma
  // gravação recente e apagá-la (ex.: guardar o logótipo e ele "desaparecer").
  useEffect(() => {
    let cancelado = false;
    lerColecao(PREFIXO_COLECAO_TESTE + chave)
      .then((dados) => {
        if (!cancelado && dados !== null) {
          ultimoRemotoConhecido.current = JSON.stringify(dados);
          if (!mudouLocalmente.current) {
            ignorarProximoEnvio.current = true;
            setValor(dados);
          }
        }
        if (!cancelado) setStatusSync?.("ligado");
      })
      .catch(() => {
        // sem rede, tabela ainda não criada, ou Supabase por configurar —
        // a app continua a funcionar com os dados guardados localmente
        if (!cancelado) setStatusSync?.("offline");
      });
    return () => {
      cancelado = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sincronização em TEMPO REAL — fica à escuta de alterações feitas por
  // OUTROS dispositivos a esta mesma coleção, e aplica-as assim que chegam,
  // sem precisares de recarregar a página. Se tu próprio tiveres uma
  // gravação tua ainda a caminho (gravacaoPendente), ignora a atualização
  // recebida — a tua vai substituir na mesma daqui a pouco, e assim evitamos
  // that a tua alteração seja "engolida" por chegar quase ao mesmo tempo.
  useEffect(() => {
    const canal = subscreverColecao(PREFIXO_COLECAO_TESTE + chave, (novoValor) => {
      const novoTexto = JSON.stringify(novoValor);
      if (novoTexto === ultimoRemotoConhecido.current) return; // é o eco da nossa própria gravação
      if (gravacaoPendente.current) return; // temos uma gravação nossa a caminho — não sobrepor agora
      ultimoRemotoConhecido.current = novoTexto;
      ignorarProximoEnvio.current = true;
      setValor(novoValor);
      window.dispatchEvent(new CustomEvent("catumbela:atualizado-tempo-real", { detail: { chave } }));
    });
    return () => desligarCanal(canal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chave]);

  // Sempre que os dados mudam: guarda logo localmente, e envia para o
  // Supabase pouco depois (com um pequeno atraso, para não sobrecarregar
  // com pedidos a cada letra escrita num formulário)
  useEffect(() => {
    try {
      const atual = carregarEstadoGuardado();
      atual[chave] = valor;
      window.localStorage.setItem(CHAVE_ARMAZENAMENTO_ATUAL, JSON.stringify(atual));
    } catch (e) {
      console.warn("Não foi possível guardar os dados localmente:", e);
      window.dispatchEvent(new CustomEvent("catumbela:erro-armazenamento", { detail: e }));
    }

    if (primeiraVez.current) {
      primeiraVez.current = false;
      return;
    }
    if (ignorarProximoEnvio.current) {
      ignorarProximoEnvio.current = false;
      return;
    }
    mudouLocalmente.current = true;
    gravacaoPendente.current = true;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const valorTexto = JSON.stringify(valor);
      // Antes de gravar, confirma que ninguém mais (noutro dispositivo) mudou
      // esta mesma coleção entretanto — se mudou, avisa (não sabemos fundir os
      // dois automaticamente, mas pelo menos a pessoa fica a saber que pode
      // valer a pena confirmar os dados noutro dispositivo).
      lerColecao(PREFIXO_COLECAO_TESTE + chave)
        .then((remoto) => {
          const remotoTexto = remoto !== null ? JSON.stringify(remoto) : null;
          if (
            remotoTexto !== null &&
            ultimoRemotoConhecido.current !== null &&
            remotoTexto !== ultimoRemotoConhecido.current &&
            remotoTexto !== valorTexto
          ) {
            window.dispatchEvent(new CustomEvent("catumbela:conflito-sincronizacao", { detail: { chave } }));
          }
        })
        .catch(() => {})
        .finally(() => {
          gravarColecao(PREFIXO_COLECAO_TESTE + chave, valor)
            .then(() => {
              ultimoRemotoConhecido.current = valorTexto;
              setStatusSync?.("ligado");
            })
            .catch((e) => {
              console.warn(`Não foi possível sincronizar "${chave}" com o Supabase:`, e);
              setStatusSync?.("offline");
            })
            .finally(() => {
              gravacaoPendente.current = false;
            });
        });
    }, 800);

    return () => clearTimeout(timeoutRef.current);
  }, [chave, valor]);

  // Adiciona um item de forma segura, mesmo que várias pessoas diferentes o
  // façam ao mesmo tempo (ex.: vários atletas a submeter pagamento no mesmo
  // segundo). Tenta a gravação atómica no Postgres primeiro; se não for
  // possível (offline, ou a função ainda não existe no teu Supabase), usa a
  // gravação normal como recurso — continua a funcionar, só sem a garantia
  // extra nesse caso raro.
  const adicionarItemSeguro = async (item) => {
    try {
      await adicionarItemAtomico(PREFIXO_COLECAO_TESTE + chave, item);
      ultimoRemotoConhecido.current = null; // força a próxima leitura remota a ser aceite
      ignorarProximoEnvio.current = true; // não reenviar isto de volta — já está gravado
      setValor((atual) => [item, ...atual]);
    } catch (e) {
      console.warn(`Gravação atómica de "${chave}" indisponível, a usar o método normal:`, e);
      setValor((atual) => [item, ...atual]);
    }
  };

  // Atualiza o estado local SEM voltar a enviar para o Supabase — para
  // quando outra função já gravou os dados por outra via (ex.: uma função
  // atómica dedicada, como a de reservar atividades) e só falta refletir
  // isso no ecrã.
  const definirSemGravar = (atualizador) => {
    ignorarProximoEnvio.current = true;
    setValor(atualizador);
  };

  return [valor, setValor, adicionarItemSeguro, definirSemGravar];
}

// Abre uma janela de impressão com o conteúdo de um elemento — o utilizador escolhe
// "Guardar como PDF" ou imprimir diretamente, sem precisar de bibliotecas extra.
const imprimirElemento = (titulo, elemento) => {
  if (!elemento) return;
  const janela = window.open("", "_blank", "width=800,height=900");
  if (!janela) {
    alert("O navegador bloqueou a janela de impressão. Permite pop-ups para este site.");
    return;
  }

  // Copia todas as folhas de estilo da página atual (incluindo o CSS
  // compilado do Tailwind) para a nova janela. Sem isto, elementos com
  // classes do Tailwind (como o tamanho do logótipo) ficavam sem qualquer
  // formatação — o logótipo aparecia no tamanho "natural" da imagem em
  // vez do tamanho definido, estragando o layout de faturas/recibos.
  const folhasDeEstilo = Array.from(document.styleSheets)
    .map((folha) => {
      try {
        if (folha.href) return `<link rel="stylesheet" href="${folha.href}">`;
        const regras = Array.from(folha.cssRules).map((r) => r.cssText).join("\n");
        return `<style>${regras}</style>`;
      } catch {
        return folha.href ? `<link rel="stylesheet" href="${folha.href}">` : "";
      }
    })
    .join("\n");

  janela.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>${titulo}</title>
        <meta charset="utf-8" />
        ${folhasDeEstilo}
        <style>
          * { box-sizing: border-box; }
          html, body { margin: 0; }
          body { font-family: Arial, Helvetica, sans-serif; padding: 24px; color: #1e293b; }
          table { width: 100%; border-collapse: collapse; }
          /* Trava o formato A4 na impressão/PDF — não deixa o navegador
             escolher outro tamanho de papel nem reescalar o conteúdo. */
          @page { size: A4; margin: 15mm; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>${elemento.outerHTML}</body>
    </html>
  `);
  janela.document.close();
  janela.focus();
  // Espera um pouco mais para as folhas de estilo ligadas por URL
  // terminarem de carregar antes de imprimir.
  setTimeout(() => janela.print(), 500);
};

// Prefixo Angola (+244) — ajusta se o ginásio operar noutro país
const numeroInternacional = (telefone) => "244" + (telefone || "").replace(/\D/g, "");
const linkWhatsApp = (telefone, mensagem) =>
  `https://wa.me/${numeroInternacional(telefone)}?text=${encodeURIComponent(mensagem)}`;
const linkSMS = (telefone, mensagem) =>
  `sms:${(telefone || "").replace(/\D/g, "")}?body=${encodeURIComponent(mensagem)}`;

// ---------------------------------------------------------------------
// COMPONENTES DE APOIO
// ---------------------------------------------------------------------
function Pill({ estado }) {
  const styles = {
    ativo: "bg-gradient-to-b from-emerald-50 to-emerald-100 text-emerald-700 ring-emerald-200 shadow-[0_1px_2px_rgba(16,185,129,0.15)]",
    vencido: "bg-gradient-to-b from-red-50 to-red-100 text-red-700 ring-red-200 shadow-[0_1px_2px_rgba(239,68,68,0.15)]",
    suspenso: "bg-gradient-to-b from-amber-50 to-amber-100 text-amber-700 ring-amber-200 shadow-[0_1px_2px_rgba(245,158,11,0.15)]",
    pausada: "bg-gradient-to-b from-blue-50 to-blue-100 text-blue-700 ring-blue-200 shadow-[0_1px_2px_rgba(59,130,246,0.15)]",
    "sem-subscricao": "bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 text-slate-500 dark:text-slate-400 ring-slate-200 dark:ring-slate-600",
    cancelado: "bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-slate-400 dark:text-slate-500 ring-slate-300 dark:ring-slate-700",
  };
  const label = { ativo: "Ativo", vencido: "Vencido", suspenso: "Suspenso", pausada: "Pausada", "sem-subscricao": "Sem subscrição", cancelado: "Cancelado" }[estado] || estado;
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ${styles[estado] || ""}`}>
      {label}
    </span>
  );
}

// Cartão grande do Dashboard — título, subtítulo, ícone destacado à direita, número grande por baixo
function CartaoDashboard({ icon: Icon, tone, titulo, subtitulo, valor }) {
  const tones = {
    red: "bg-gradient-to-br from-red-50 to-red-100 text-red-500",
    amber: "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600",
    emerald: "bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600",
    blue: "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600",
    violet: "bg-gradient-to-br from-violet-50 to-violet-100 text-violet-600",
  };
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 ring-1 ring-slate-100 dark:ring-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_20px_-8px_rgba(15,23,42,0.12)] hover:shadow-[0_1px_2px_rgba(15,23,42,0.06),0_14px_28px_-10px_rgba(15,23,42,0.18)] hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="font-semibold text-slate-800 dark:text-slate-100 truncate">{titulo}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{subtitulo}</p>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${tones[tone]}`}>
          <Icon size={20} strokeWidth={2.2} />
        </div>
      </div>
      <p className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-4">{valor}</p>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, tone }) {
  const tones = {
    red: "bg-gradient-to-br from-[#EAF5F4] to-[#D6EEEC] text-[#2E6E68] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_2px_4px_rgba(63,143,135,0.25)]",
    amber: "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_2px_4px_rgba(245,158,11,0.25)]",
    emerald: "bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_2px_4px_rgba(16,185,129,0.25)]",
    blue: "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_2px_4px_rgba(59,130,246,0.25)]",
    violet: "bg-gradient-to-br from-violet-50 to-violet-100 text-violet-600 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_2px_4px_rgba(139,92,246,0.25)]",
  };
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 ring-1 ring-slate-100 dark:ring-slate-700 flex-1 min-w-[180px] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_20px_-8px_rgba(15,23,42,0.12)] hover:shadow-[0_1px_2px_rgba(15,23,42,0.06),0_14px_28px_-10px_rgba(15,23,42,0.18)] hover:-translate-y-0.5 transition-all duration-200">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${tones[tone]}`}>
        <Icon size={21} strokeWidth={2.2} />
      </div>
      <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">{value}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-emerald-600 font-medium mt-2">{sub}</p>}
    </div>
  );
}

function Card({ title, action, children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-700 p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_6px_16px_-8px_rgba(15,23,42,0.10)] ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 tracking-tight">{title}</h3>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------
// TELAS
// ---------------------------------------------------------------------
function Dashboard({ membros, produtos, pagamentosFeitos, acessos, custos, perfil, dadosGinasio, movimentosCaixa, movimentosBancarios }) {
  const total = membros.length;
  const ativos = membros.filter((m) => m.estado === "ativo").length;
  const vencidos = membros.filter((m) => m.estado === "vencido").length;
  const stockBaixo = produtos.filter((p) => p.stock <= p.minimo).length;

  const receitaMensalidades = pagamentosFeitos.filter((p) => p.tipo === "mensalidade").reduce((s, p) => s + p.valor, 0);
  const receitaVendas = pagamentosFeitos.filter((p) => p.tipo === "venda").reduce((s, p) => s + p.valor, 0);
  const receitaAvulsos = pagamentosFeitos.filter((p) => p.tipo === "avulso").reduce((s, p) => s + p.valor, 0);
  // "Saldo inicial" é dinheiro que o ginásio já tinha ANTES de começar a
  // usar o sistema — conta como lucro/receita já feita, não só como um
  // número no Caixa/Banco.
  const saldoInicialTotal = [...movimentosCaixa, ...movimentosBancarios]
    .filter((m) => m.subtipo === "Saldo inicial")
    .reduce((s, m) => s + m.valor, 0);
  const receitaTotal = pagamentosFeitos.reduce((s, p) => s + p.valor, 0) + saldoInicialTotal; // soma tudo, incluindo avulsos e saldo inicial
  const custosTotal = custos.reduce((s, c) => s + c.valor, 0);
  const lucro = receitaTotal - custosTotal;

  const hojeStr = new Date().toISOString().slice(0, 10);
  const checkinsHoje = acessos.filter((a) => a.data === hojeStr);

  // Aniversários nos próximos 7 dias (incluindo hoje) — compara só mês/dia,
  // não o ano, e ordena pela proximidade.
  const aniversariosProximos = useMemo(() => {
    const hoje = new Date();
    return membros
      .filter((m) => m.dataNascimento)
      .map((m) => {
        const [, mes, dia] = m.dataNascimento.split("-").map(Number);
        let proximo = new Date(hoje.getFullYear(), mes - 1, dia);
        if (proximo < new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())) {
          proximo = new Date(hoje.getFullYear() + 1, mes - 1, dia);
        }
        const dias = Math.round((proximo - new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())) / (1000 * 60 * 60 * 24));
        return { membro: m, dias };
      })
      .filter((x) => x.dias <= 7)
      .sort((a, b) => a.dias - b.dias);
  }, [membros]);

  // Risco de desistência — membros com mensalidade EM DIA mas que não
  // aparecem no ginásio há mais de 14 dias (pode estar prestes a desistir,
  // mesmo sem ainda ter vencido).
  const membrosEmRisco = useMemo(() => {
    const hoje = new Date();
    return membros
      .filter((m) => m.estado === "ativo")
      .map((m) => {
        const acessosDoMembro = acessos.filter((a) => a.numero === m.numero);
        if (acessosDoMembro.length === 0) return null; // nunca veio — não é "risco", é caso à parte
        const ultimaData = acessosDoMembro.reduce((max, a) => (a.data > max ? a.data : max), acessosDoMembro[0].data);
        const dias = Math.round((hoje - new Date(ultimaData + "T00:00:00")) / (1000 * 60 * 60 * 24));
        return dias > 14 ? { membro: m, dias, ultimaData } : null;
      })
      .filter(Boolean)
      .sort((a, b) => b.dias - a.dias);
  }, [membros, acessos]);

  // Crescimento de membros — acumulado por mês, últimos 6 meses (baseado na data de inscrição real)
  const crescimento = useMemo(() => {
    const hoje = new Date();
    const meses = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
      meses.push({ chave: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, label: d.toLocaleDateString("pt-PT", { month: "short" }) });
    }
    return meses.map((m) => {
      const fimDoMes = new Date(m.chave + "-28");
      fimDoMes.setDate(fimDoMes.getDate() + 7); // garante que passa para o mês seguinte
      const total = membros.filter((mb) => mb.dataInscricao && mb.dataInscricao <= `${m.chave}-31`).length;
      return { mes: m.label, total };
    });
  }, [membros]);

  const estadoDados = [
    { name: "Ativos", value: ativos, color: "#3F8F87" },
    { name: "Expirados", value: vencidos, color: "#BFE4E1" },
  ];

  const membrosRecentes = useMemo(() => {
    return [...membros]
      .sort((a, b) => (b.dataInscricao || "").localeCompare(a.dataInscricao || "") || b.id - a.id)
      .slice(0, 5);
  }, [membros]);

  return (
    <div className="space-y-5">
      {/* Cartões principais — estilo grande, empilhado */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${perfil === "administrador" ? "xl:grid-cols-5" : "xl:grid-cols-4"}`}>
        <CartaoDashboard icon={Users} tone="violet" titulo="Total de Membros" subtitulo="Total de membros cadastrados" valor={total} />
        <CartaoDashboard icon={UserCog} tone="emerald" titulo="Membros Ativos" subtitulo="Total de membros com assinatura ativa" valor={ativos} />
        <CartaoDashboard icon={AlertTriangle} tone="red" titulo="Membros Expirados" subtitulo="Total de membros com assinatura expirada" valor={vencidos} />
        <CartaoDashboard icon={CheckCircle2} tone="amber" titulo="Check-ins Hoje" subtitulo="Total de check-ins registados hoje" valor={checkinsHoje.length} />
        {perfil === "administrador" && (
          <CartaoDashboard icon={TrendingUp} tone={lucro >= 0 ? "emerald" : "red"} titulo="Lucro Líquido" subtitulo="Receitas menos custos registados" valor={kz(lucro)} />
        )}
      </div>

      {/* Crescimento de membros */}
      <Card title="Crescimento de membros" action={<span className="text-xs text-slate-400 dark:text-slate-500">Últimos 6 meses</span>}>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={crescimento} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="corCrescimento" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3F8F87" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#3F8F87" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 12 }} />
              <Area type="monotone" dataKey="total" stroke="#3F8F87" strokeWidth={2.5} fill="url(#corCrescimento)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {aniversariosProximos.length > 0 && (
        <Card title="🎂 Aniversários próximos">
          <div className="divide-y divide-slate-50 dark:divide-slate-700">
            {aniversariosProximos.map(({ membro, dias }) => (
              <div key={membro.id} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{membro.nome}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {dias === 0 ? "Hoje! 🎉" : dias === 1 ? "Amanhã" : `Daqui a ${dias} dias`}
                  </p>
                </div>
                <a
                  href={linkWhatsApp(membro.telefone, `Parabéns, ${membro.nome.split(" ")[0]}! 🎉🎂 A equipa da ${dadosGinasio?.nome || "Catumbela Gym"} deseja-te um feliz aniversário!`)}
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  <MessageCircle size={14} /> Parabenizar
                </a>
              </div>
            ))}
          </div>
        </Card>
      )}
      {membrosEmRisco.length > 0 && (
        <Card title="⚠️ Risco de desistência" action={<span className="text-xs text-slate-400 dark:text-slate-500">Ativos, mas sem vir há mais de 14 dias</span>}>
          <div className="divide-y divide-slate-50 dark:divide-slate-700">
            {membrosEmRisco.map(({ membro, dias }) => (
              <div key={membro.id} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{membro.nome}</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400">Não vem há {dias} dias</p>
                </div>
                <a
                  href={linkWhatsApp(membro.telefone, `Olá ${membro.nome.split(" ")[0]}, sentimos a tua falta no ginásio! Está tudo bem? Passa por cá quando puderes 💪`)}
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  <MessageCircle size={14} /> Contactar
                </a>
              </div>
            ))}
          </div>
        </Card>
      )}


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Estado dos membros — rosca */}
        <Card title="Estado dos membros" action={<span className="text-xs text-slate-400 dark:text-slate-500">Proporção atual</span>}>
          <div className="h-52 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={estadoDados} innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={2}>
                  {estadoDados.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-xs text-slate-400 dark:text-slate-500">Status</p>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">Membros</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-5 mt-2">
            <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300"><span className="w-2.5 h-2.5 rounded-full bg-[#3F8F87]" /> Ativos</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300"><span className="w-2.5 h-2.5 rounded-full bg-[#BFE4E1]" /> Expirados</span>
          </div>
        </Card>

        {/* Membros com mensalidade vencida */}
        <Card title="Membros com mensalidade vencida" className="lg:col-span-2">
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {membros.filter((m) => m.estado === "vencido").map((m) => (
              <div key={m.id} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{m.nome}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{m.numero} · venceu em {m.vencimento}</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={linkWhatsApp(m.telefone, `Olá ${m.nome.split(" ")[0]}, a sua mensalidade da Catumbela Gym está vencida desde ${m.vencimento}. Pode regularizar quando puder 💪`)}
                    target="_blank" rel="noreferrer"
                    title="Cobrar por WhatsApp"
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    <MessageCircle size={16} />
                  </a>
                  <a
                    href={linkSMS(m.telefone, `Catumbela Gym: a sua mensalidade venceu em ${m.vencimento}. Por favor regularize o pagamento.`)}
                    title="Cobrar por SMS"
                    className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  >
                    <Phone size={16} />
                  </a>
                </div>
              </div>
            ))}
            {membros.filter((m) => m.estado === "vencido").length === 0 && (
              <p className="text-sm text-slate-400 dark:text-slate-500 py-3">Nenhuma mensalidade vencida 🎉</p>
            )}
          </div>
        </Card>
      </div>

      {/* Membros recentes */}
      <Card title="Membros recentes">
        {membrosRecentes.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">Ainda não há membros inscritos.</p>
        ) : (
          <div className="space-y-2">
            {membrosRecentes.map((m) => (
              <div key={m.id} className="flex items-center justify-between p-2.5 rounded-xl ring-1 ring-slate-100 dark:ring-slate-700">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                    {m.foto ? <img src={m.foto} alt={m.nome} className="w-full h-full object-cover" /> : <UserIcon size={18} className="text-slate-400" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{m.nome}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{m.email || "Sem e-mail"}</p>
                  </div>
                </div>
                <Pill estado={m.estado} />
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Check-ins de hoje */}
      <Card title="Check-ins de hoje" action={<span className="text-xs text-slate-400 dark:text-slate-500">Registos realizados hoje</span>}>
        {checkinsHoje.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">Sem check-ins hoje.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700">
                  <th className="pb-2 font-medium">Foto</th>
                  <th className="pb-2 font-medium">Membro</th>
                  <th className="pb-2 font-medium">Entrada</th>
                  <th className="pb-2 font-medium">Saída</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                {checkinsHoje.map((a) => (
                  <tr key={a.id}>
                    <td className="py-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                        {a.foto ? <img src={a.foto} alt={a.membro} className="w-full h-full object-cover" /> : <UserIcon size={14} className="text-slate-400" />}
                      </div>
                    </td>
                    <td className="py-2 font-medium text-slate-900 dark:text-slate-100">{a.membro}</td>
                    <td className="py-2 text-slate-600 dark:text-slate-300">{a.entrada}</td>
                    <td className="py-2">
                      {a.saida ? (
                        <span className="text-slate-600 dark:text-slate-300">{a.saida}</span>
                      ) : (
                        <span className="text-amber-600 dark:text-amber-400 text-xs font-medium">No ginásio</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {stockBaixo > 0 && (
        <Card title={`⚠️ Stock baixo (${stockBaixo} produto${stockBaixo > 1 ? "s" : ""})`}>
          <div className="flex flex-wrap gap-3">
            {produtos.filter((p) => p.stock <= p.minimo).map((p) => (
              <span key={p.id} className="px-3 py-1.5 rounded-lg bg-[#EAF5F4] text-[#2E6E68] text-sm font-medium ring-1 ring-[#D6EEEC]">
                {p.nome} — {p.stock} un.
              </span>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// ADVERTÊNCIAS — registo de avisos a atletas que não cumprem as regras
// ---------------------------------------------------------------------
function ModalAdvertencias({ membro, advertencias, onAdicionar, onRemover, podeRemover, onFechar, dadosGinasio }) {
  const [motivo, setMotivo] = useState("");

  const submeter = (e) => {
    e.preventDefault();
    if (!motivo.trim()) return;
    onAdicionar(motivo.trim());
    setMotivo("");
  };

  const mensagemAviso = (a) =>
    `Olá ${membro.nome.split(" ")[0]}, aviso de ${dadosGinasio?.nome || "Catumbela Gym"}: recebeste uma advertência — "${a.motivo}" (${a.data}). Por favor, cumpre as regras do ginásio.`;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md relative max-h-[85vh] overflow-y-auto">
        <button onClick={onFechar} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
          <X size={18} />
        </button>
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-2">
          <AlertTriangle size={16} className="text-amber-500" /> Advertências — {membro.nome}
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
          Regista aqui incumprimentos das regras do ginásio (comportamento, uso indevido de equipamento, etc.). Nem
          todos os membros entram na sua conta — por isso podes também avisar diretamente por WhatsApp ou SMS.
        </p>

        {advertencias.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-4">Sem advertências registadas. 🎉</p>
        ) : (
          <div className="space-y-2 mb-4">
            {advertencias.map((a) => (
              <div key={a.id} className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 ring-1 ring-amber-200 dark:ring-amber-800">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm text-slate-700 dark:text-slate-200">{a.motivo}</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{a.data} · {a.registadoPor}</p>
                  </div>
                  {podeRemover && (
                    <button onClick={() => onRemover(a.id)} title="Remover advertência" className="text-slate-400 hover:text-red-500 shrink-0">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                {membro.telefone && (
                  <div className="flex gap-2 mt-2">
                    <a
                      href={linkWhatsApp(membro.telefone, mensagemAviso(a))}
                      target="_blank" rel="noreferrer"
                      className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-800 ring-1 ring-emerald-200 dark:ring-emerald-800 px-2 py-1 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                    >
                      <MessageCircle size={11} /> WhatsApp
                    </a>
                    <a
                      href={linkSMS(membro.telefone, mensagemAviso(a))}
                      className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-600 px-2 py-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <Phone size={11} /> SMS
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <form onSubmit={submeter} className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700">
          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Nova advertência</label>
            <textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Ex.: Não cumpriu as regras de utilização dos equipamentos"
              rows={2}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]"
            />
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 rounded-lg text-sm">
            <AlertTriangle size={16} /> Registar advertência
          </button>
        </form>
      </div>
    </div>
  );
}

function Membros({ membros, planos, contas, advertencias, onAdd, onUpdate, onRemove, onCancelar, onReativar, onAdicionarAdvertencia, onRemoverAdvertencia, perfil, dadosGinasio }) {
  const [q, setQ] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [aEliminar, setAEliminar] = useState(null);
  const [aCancelar, setACancelar] = useState(null);
  const [advertindoMembro, setAdvertindoMembro] = useState(null);
  const vazio = { nome: "", telefone: "", plano: planos[0]?.nome || "", foto: null, email: "", senha: "", dataInscricao: "", vencimento: "", taxaInscricao: "", metodoTaxaInscricao: "dinheiro", dataNascimento: "" };
  const [novo, setNovo] = useState(vazio);

  const filtrados = membros.filter(
    (m) => m.nome.toLowerCase().includes(q.toLowerCase()) || m.numero.includes(q)
  );

  const carregarFoto = (e) => {
    const ficheiro = e.target.files?.[0];
    if (!ficheiro) return;
    comprimirImagem(ficheiro, 500, 0.75) // fotos de perfil não precisam de ser grandes
      .then((dataUrl) => setNovo((n) => ({ ...n, foto: dataUrl })))
      .catch(() => alert("Não foi possível processar esta imagem. Tenta outra."));
  };

  const calcularVencimento = (dataBase, nomePlano) => {
    const plano = planos.find((p) => p.nome === nomePlano);
    const d = new Date((dataBase || new Date().toISOString().slice(0, 10)) + "T00:00:00");
    d.setDate(d.getDate() + (plano ? plano.duracaoDias : 30));
    return dataLocalISO(d);
  };

  const abrirNovo = () => {
    setEditandoId(null);
    const hoje = new Date().toISOString().slice(0, 10);
    // Vencimento e plano ficam vazios por defeito — um atleta novo só
    // escolhe o plano e ativa depois de subscrever e pagar, em Subscrições.
    // Só preenches o vencimento aqui se for um membro que já existia antes
    // deste sistema (já tinha pago).
    setNovo({ ...vazio, plano: "", dataInscricao: hoje, vencimento: "" });
    setShowForm(true);
  };

  const abrirEdicao = (m) => {
    const contaLigada = contas.find((c) => c.perfil === "membro" && c.membroId === m.id);
    setEditandoId(m.id);
    setNovo({
      nome: m.nome, telefone: m.telefone, plano: m.plano, foto: m.foto || null,
      email: contaLigada?.email || "", senha: "",
      dataInscricao: m.dataInscricao || "", vencimento: m.vencimento || "",
      dataNascimento: m.dataNascimento || "",
    });
    setShowForm(true);
  };

  const [ultimoReciboInscricao, setUltimoReciboInscricao] = useState(null);

  const submeter = (e) => {
    e.preventDefault();
    if (!novo.nome) return;
    if (editandoId) {
      onUpdate(editandoId, novo);
      setUltimoReciboInscricao(null);
    } else {
      const recibo = onAdd(novo);
      setUltimoReciboInscricao(recibo);
    }
    setNovo(vazio);
    setShowForm(false);
    setEditandoId(null);
  };

  return (
    <div className="space-y-4">
      {ultimoReciboInscricao && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 ring-1 ring-emerald-200 dark:ring-emerald-800 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <p className="text-sm text-emerald-700 dark:text-emerald-400 flex-1">
            Recibo de inscrição <strong>{ultimoReciboInscricao.numero}</strong> gerado — {kz(ultimoReciboInscricao.valor)}.
            Lembra-te: o plano ainda não foi pago — vai a <strong>Subscrições</strong> para o membro subscrever e pagar o plano.
          </p>
          <button onClick={() => setUltimoReciboInscricao(null)} className="text-emerald-400 hover:text-emerald-600 shrink-0">
            <X size={16} />
          </button>
        </div>
      )}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Pesquisar por nome ou número..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1] focus:border-[#5AAFA8]"
          />
        </div>
        <button
          onClick={abrirNovo}
          className="flex items-center gap-1.5 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} /> Novo membro
        </button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 dark:text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-700">
                <th className="pb-2 font-medium">Nº</th>
                <th className="pb-2 font-medium">Nome</th>
                <th className="pb-2 font-medium">Telefone</th>
                <th className="pb-2 font-medium">Plano</th>
                <th className="pb-2 font-medium">Vencimento</th>
                <th className="pb-2 font-medium">Estado</th>
                <th className="pb-2 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
              {filtrados.map((m) => {
                const minhasAdvertencias = advertencias.filter((a) => a.membroId === m.id);
                return (
                <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="py-2.5 text-slate-500 dark:text-slate-400 dark:text-slate-500">{m.numero}</td>
                  <td className="py-2.5 font-medium text-slate-900 dark:text-slate-100">
                    <span className="flex items-center gap-1.5">
                      {m.nome}
                      {minhasAdvertencias.length > 0 && (
                        <span title={`${minhasAdvertencias.length} advertência(s)`} className="flex items-center gap-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 rounded-full">
                          <AlertTriangle size={10} /> {minhasAdvertencias.length}
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-300">{m.telefone}</td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-300">{m.plano}</td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-300">{m.vencimento || <span className="text-slate-400 dark:text-slate-500 italic text-xs">—</span>}</td>
                  <td className="py-2.5"><Pill estado={m.estado} /></td>
                  <td className="py-2.5">
                    <div className="flex items-center justify-end gap-3">
                      {m.estado === "vencido" && (
                        <a
                          href={linkWhatsApp(m.telefone, `Olá ${m.nome.split(" ")[0]}, a sua mensalidade da Catumbela Gym está vencida desde ${m.vencimento}.`)}
                          target="_blank" rel="noreferrer" title="Cobrar por WhatsApp"
                          className="text-emerald-600 hover:text-emerald-700"
                        >
                          <MessageCircle size={16} />
                        </a>
                      )}
                      <button onClick={() => setAdvertindoMembro(m)} title="Advertências" className="text-slate-400 hover:text-amber-600">
                        <AlertTriangle size={15} />
                      </button>
                      <button onClick={() => abrirEdicao(m)} title="Editar" className="text-slate-400 hover:text-[#3F8F87]">
                        <Pencil size={15} />
                      </button>
                      {m.estado === "cancelado" ? (
                        <button onClick={() => onReativar(m.id)} title="Reativar membro" className="text-blue-500 hover:text-blue-700">
                          <PlayCircle size={15} />
                        </button>
                      ) : (
                        <button onClick={() => setACancelar(m)} title="Cancelar (mantém o registo/histórico)" className="text-slate-400 hover:text-amber-600">
                          <PauseCircle size={15} />
                        </button>
                      )}
                      {perfil === "administrador" && (
                        <button onClick={() => setAEliminar(m)} title="Eliminar tudo (irreversível)" className="text-slate-400 hover:text-red-500">
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                );
              })}
              {filtrados.length === 0 && (
                <tr><td colSpan={7} className="py-6 text-center text-slate-400 dark:text-slate-500">Nenhum membro encontrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowForm(false)} className="absolute right-4 top-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-300">
              <X size={18} />
            </button>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">{editandoId ? "Editar membro" : "Novo membro"}</h3>
            <form onSubmit={submeter} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-700 ring-1 ring-slate-200 dark:ring-slate-600 flex items-center justify-center overflow-hidden shrink-0">
                  {novo.foto ? (
                    <img src={novo.foto} alt="Pré-visualização" className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon size={22} className="text-slate-400" />
                  )}
                </div>
                <label className="text-xs font-semibold text-[#3F8F87] cursor-pointer">
                  Carregar fotografia
                  <input type="file" accept="image/*" onChange={carregarFoto} className="hidden" />
                </label>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500">Nome completo</label>
                <input value={novo.nome} onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500">Telefone</label>
                <input value={novo.telefone} onChange={(e) => setNovo({ ...novo, telefone: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500">Data de nascimento (opcional)</label>
                <input type="date" value={novo.dataNascimento} onChange={(e) => setNovo({ ...novo, dataNascimento: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              {editandoId ? (
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Plano atual</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{novo.plano || "Sem subscrição"}</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                    Para mudar o plano ou renovar, usa <strong>Subscrições</strong> — não é editável aqui.
                  </p>
                </div>
              ) : (
                <div className="bg-[#EAF5F4] dark:bg-slate-900 rounded-lg p-3">
                  <p className="text-xs font-semibold text-[#2E6E68] dark:text-[#5AAFA8] flex items-center gap-1.5">
                    <AlertTriangle size={13} /> Este atleta fica "Sem subscrição" até pagar um plano
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    O plano escolhe-se depois, em <strong>Subscrições</strong> — é lá que se gera o recibo e o atleta
                    fica "Ativo". Só preenche o vencimento abaixo se este for um membro que já existia antes deste
                    sistema (já tinha uma subscrição paga).
                  </p>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2">
                  Data de inscrição real (se te esqueceste de registar no dia certo) e, se aplicável, o vencimento de
                  quem já vinha com uma subscrição paga de antes.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Data de inscrição</label>
                    <input
                      type="date"
                      value={novo.dataInscricao}
                      onChange={(e) => setNovo((n) => ({ ...n, dataInscricao: e.target.value, vencimento: n.vencimento ? calcularVencimento(e.target.value, n.plano) : n.vencimento }))}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Vencimento (opcional)</label>
                    <input type="date" value={novo.vencimento} onChange={(e) => setNovo({ ...novo, vencimento: e.target.value })}
                      placeholder="Deixa em branco"
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                  </div>
                </div>
              </div>

              {!editandoId && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Taxa de inscrição (matrícula)</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2">
                    Separada do plano — o plano só se paga depois, em Subscrições. Se cobrares a inscrição agora,
                    gera-se logo o recibo.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Valor (Kz)</label>
                      <input type="number" min={0} value={novo.taxaInscricao} onChange={(e) => setNovo({ ...novo, taxaInscricao: e.target.value })}
                        placeholder="0"
                        className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Método</label>
                      <select value={novo.metodoTaxaInscricao} onChange={(e) => setNovo({ ...novo, metodoTaxaInscricao: e.target.value })}
                        className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                        <option value="dinheiro">Dinheiro</option>
                        <option value="tpa">TPA</option>
                        <option value="express">MULTICAIXA Express</option>
                        <option value="referencia">Referência</option>
                        <option value="transferencia">Transferência</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">Acesso à área do membro (opcional)</p>
                <div className="space-y-2">
                  <input type="email" placeholder="E-mail de acesso" value={novo.email} onChange={(e) => setNovo({ ...novo, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                  <input type="password" placeholder={editandoId ? "Nova palavra-passe (deixa em branco para manter)" : "Palavra-passe"}
                    value={novo.senha} onChange={(e) => setNovo({ ...novo, senha: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">
                  {editandoId
                    ? "Para remover o acesso deste membro, apaga o e-mail e guarda."
                    : "Se preenchido, o membro pode entrar na tela inicial com este e-mail e ver o seu cartão, pagamentos e compras."}
                </p>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg mt-2">
                <Save size={16} /> {editandoId ? "Guardar alterações" : "Guardar membro"}
              </button>
            </form>
          </div>
        </div>
      )}

      {advertindoMembro && (
        <ModalAdvertencias
          membro={advertindoMembro}
          advertencias={advertencias.filter((a) => a.membroId === advertindoMembro.id)}
          onAdicionar={(motivo) => onAdicionarAdvertencia(advertindoMembro.id, motivo)}
          onRemover={onRemoverAdvertencia}
          podeRemover={perfil === "administrador"}
          onFechar={() => setAdvertindoMembro(null)}
          dadosGinasio={dadosGinasio}
        />
      )}

      {aEliminar && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={() => setAEliminar(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <AlertTriangle className="text-red-500 mb-3" size={28} />
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Eliminar {aEliminar.nome}?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Isto elimina o membro <strong>e absolutamente tudo</strong>: conta de acesso, histórico de compras,
              entradas registadas, e também as suas faturas/recibos, pagamentos e movimentos no Caixa/Banco — para
              nunca ficar dinheiro a contar no lucro de alguém que já não existe no sistema. <strong>Esta ação não
              pode ser desfeita.</strong> Se só queres marcar como inativo mantendo o histórico, usa "Cancelar" em
              vez disto.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setAEliminar(null)} className="flex-1 ring-1 ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300 font-semibold py-2.5 rounded-lg text-sm">
                Voltar
              </button>
              <button
                onClick={() => { onRemove(aEliminar.id); setAEliminar(null); }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg text-sm"
              >
                Eliminar tudo
              </button>
            </div>
          </div>
        </div>
      )}

      {aCancelar && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={() => setACancelar(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <PauseCircle className="text-amber-500 mb-3" size={28} />
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Cancelar {aCancelar.nome}?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Marca o membro como <strong>Cancelado</strong>, sem apagar nada — conta, compras, faturas e todo o
              histórico ficam exatamente como estão. Podes reativar a qualquer momento.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setACancelar(null)} className="flex-1 ring-1 ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300 font-semibold py-2.5 rounded-lg text-sm">
                Voltar
              </button>
              <button
                onClick={() => { onCancelar(aCancelar.id); setACancelar(null); }}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 rounded-lg text-sm"
              >
                Confirmar cancelamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Planos({ planos, onSave }) {
  const [editando, setEditando] = useState(null); // objeto do plano, ou {} para novo
  const [form, setForm] = useState({ nome: "", duracaoDias: 30, preco: 0 });
  const [historicoPreco, setHistoricoPreco] = useState({}); // { planoId: [{de, para, data}] }

  const abrirNovo = () => {
    setForm({ nome: "", duracaoDias: 30, preco: 0 });
    setEditando({});
  };

  const abrirEdicao = (p) => {
    setForm({ nome: p.nome, duracaoDias: p.duracaoDias, preco: p.preco });
    setEditando(p);
  };

  const submeter = (e) => {
    e.preventDefault();
    const precoAntigo = editando?.id ? planos.find((p) => p.id === editando.id)?.preco : null;
    onSave({ ...editando, ...form, preco: Number(form.preco), duracaoDias: Number(form.duracaoDias) });

    if (editando?.id && precoAntigo !== null && precoAntigo !== Number(form.preco)) {
      setHistoricoPreco((h) => ({
        ...h,
        [editando.id]: [
          { de: precoAntigo, para: Number(form.preco), data: new Date().toLocaleDateString("pt-PT") },
          ...(h[editando.id] || []),
        ],
      }));
    }
    setEditando(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button
          onClick={abrirNovo}
          className="flex items-center gap-1.5 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} /> Novo plano
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {planos.map((p) => (
          <Card key={p.id}>
            <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500">{p.duracaoDias} dias</p>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">{p.nome}</h3>
            <p className="text-2xl font-extrabold text-[#3F8F87] mt-3">{kz(p.preco)}</p>

            {historicoPreco[p.id]?.length > 0 && (
              <div className="mt-3 space-y-1">
                {historicoPreco[p.id].slice(0, 2).map((h, i) => (
                  <p key={i} className="text-[11px] text-slate-400 dark:text-slate-500">
                    {h.data}: {kz(h.de)} → {kz(h.para)}
                  </p>
                ))}
              </div>
            )}

            <button
              onClick={() => abrirEdicao(p)}
              className="mt-4 w-full flex items-center justify-center gap-1.5 text-sm font-semibold border border-slate-200 dark:border-slate-600 rounded-lg py-2 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <Pencil size={14} /> Editar plano
            </button>
          </Card>
        ))}
      </div>

      {editando && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={() => setEditando(null)} className="absolute right-4 top-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-300">
              <X size={18} />
            </button>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">{editando.id ? "Editar plano" : "Novo plano"}</h3>
            <form onSubmit={submeter} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500">Nome do plano</label>
                <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500">Duração (dias)</label>
                <input required type="number" min={1} value={form.duracaoDias}
                  onChange={(e) => setForm({ ...form, duracaoDias: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500">Preço (Kz)</label>
                <input required type="number" min={0} value={form.preco}
                  onChange={(e) => setForm({ ...form, preco: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                {editando.id && (
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                    Alterar o preço não afeta membros já inscritos até à próxima renovação.
                  </p>
                )}
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg mt-2">
                <Save size={16} /> Guardar plano
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const DADOS_BANCARIOS_GYM = {
  banco: "Banco BAI",
  iban: "AO06 0040 0000 1234 5678 9012 3",
  telefone: "923 456 789",
  titular: "Catumbela Gym, Lda.",
};

// ---------------------------------------------------------------------
// PAGAMENTOS AVULSOS — para atletas SEM inscrição (dia avulso, entrada
// pontual, aula experimental). Pagamentos de membros inscritos passam
// todos a fazer-se em "Faturação / Recibos".
// ---------------------------------------------------------------------
function Pagamentos({ dadosGinasio, onRegistarAvulso }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [descricao, setDescricao] = useState("Entrada avulsa");
  const [valor, setValor] = useState("");
  const [metodo, setMetodo] = useState("dinheiro");
  const [comprovativo, setComprovativo] = useState(null);
  const [recibo, setRecibo] = useState(null);
  const docRef = useRef(null);

  const metodos = [
    { id: "dinheiro", label: "Dinheiro" },
    { id: "tpa", label: "TPA" },
    { id: "express", label: "MULTICAIXA Express" },
    { id: "referencia", label: "Referência" },
    { id: "transferencia", label: "Transferência Bancária" },
  ];

  const carregarComprovativo = (e) => {
    const ficheiro = e.target.files?.[0];
    if (!ficheiro) return;
    comprimirImagem(ficheiro, 1000, 0.75)
      .then((dataUrl) => setComprovativo(dataUrl))
      .catch(() => alert("Não foi possível processar esta imagem. Tenta outra."));
  };

  const confirmar = () => {
    if (!nome || !valor || Number(valor) <= 0) return;
    const documento = onRegistarAvulso({
      nome,
      telefone,
      descricao: descricao || "Entrada avulsa",
      valor: Number(valor),
      metodo,
      comprovativo,
    });
    setRecibo(documento);
  };

  const reiniciar = () => {
    setNome("");
    setTelefone("");
    setDescricao("Entrada avulsa");
    setValor("");
    setMetodo("dinheiro");
    setComprovativo(null);
    setRecibo(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card title={recibo ? "Recibo" : "Registar pagamento avulso"}>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
          Para pessoas que <strong>não são membros inscritos</strong> — ex.: uma entrada avulsa ou aula experimental.
          Pagamentos de membros com plano fazem-se em <strong>Faturação / Recibos</strong>.
        </p>
        {!recibo ? (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Nome</label>
              <input value={nome} onChange={(e) => setNome(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Telefone (opcional)</label>
              <input value={telefone} onChange={(e) => setTelefone(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Descrição</label>
              <input value={descricao} onChange={(e) => setDescricao(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Valor (Kz)</label>
              <input type="number" min={0} value={valor} onChange={(e) => setValor(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Método de pagamento</p>
              <div className="grid grid-cols-2 gap-2">
                {metodos.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { setMetodo(m.id); setComprovativo(null); }}
                    className={`text-sm font-medium py-2 rounded-lg ring-1 transition-colors ${
                      metodo === m.id ? "bg-[#3F8F87] text-white ring-[#3F8F87]" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {metodo === "transferencia" && (
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block">Comprovativo (opcional)</label>
                {comprovativo ? (
                  <div className="relative">
                    <img src={comprovativo} alt="Comprovativo" className="w-full max-h-40 object-cover rounded-lg ring-1 ring-slate-200 dark:ring-slate-600" />
                    <button onClick={() => setComprovativo(null)} className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full p-1">
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center gap-1.5 py-6 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-600 text-slate-400 dark:text-slate-500 hover:border-[#8FC9C3] hover:text-[#3F8F87] cursor-pointer text-xs">
                    <FileText size={20} />
                    Carregar print/foto do comprovativo
                    <input type="file" accept="image/*" onChange={carregarComprovativo} className="hidden" />
                  </label>
                )}
              </div>
            )}

            <button
              onClick={confirmar}
              disabled={!nome || !valor}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:text-slate-400 dark:disabled:text-slate-500 text-white font-semibold py-2.5 rounded-lg"
            >
              <CheckCircle2 size={16} /> Confirmar pagamento
            </button>
          </div>
        ) : (
          <div>
            <div className="ring-1 ring-slate-200 rounded-xl overflow-hidden">
              <DocumentoFinanceiro
                docRef={docRef}
                tipo="RECIBO"
                numero={recibo.numero}
                data={recibo.data}
                hora={recibo.hora}
                cliente={recibo.membro}
                metodo={recibo.metodo}
                dadosGinasio={dadosGinasio}
                itens={recibo.itens}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => imprimirElemento(`Recibo ${recibo.numero}`, docRef.current)}
                className="flex-1 border border-slate-200 dark:border-slate-600 rounded-lg py-2 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                PDF / Imprimir
              </button>
              {recibo.membro.telefone && (
                <a
                  href={linkWhatsApp(recibo.membro.telefone, `Recibo ${recibo.numero} — ${kz(recibo.valor)} recebido. Obrigado! ${dadosGinasio.nome} 💪`)}
                  target="_blank" rel="noreferrer"
                  className="flex-1 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white rounded-lg py-2 text-sm font-semibold text-center"
                >
                  Enviar por WhatsApp
                </a>
              )}
            </div>
            <button onClick={reiniciar} className="mt-4 text-sm font-semibold text-[#3F8F87] hover:underline">
              Registar outro pagamento
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------
// VENDAS / POS
// ---------------------------------------------------------------------
function VendasPOS({ produtos, membros, dadosGinasio, onFinalizar }) {
  const [carrinho, setCarrinho] = useState([]); // [{produtoId, quantidade}]
  const [membroId, setMembroId] = useState("");
  const [metodo, setMetodo] = useState("dinheiro");
  const [contaBancariaId, setContaBancariaId] = useState("");
  const [concluida, setConcluida] = useState(null);
  const [leitorAberto, setLeitorAberto] = useState(false);
  const [erroLeitor, setErroLeitor] = useState("");
  const [naoEncontrado, setNaoEncontrado] = useState("");
  const docRef = useRef(null);
  const videoRef = useRef(null);
  const controlsRef = useRef(null);

  const metodos = [
    { id: "dinheiro", label: "Dinheiro" },
    { id: "tpa", label: "TPA" },
    { id: "express", label: "Express" },
    { id: "referencia", label: "Referência" },
    { id: "transferencia", label: "Transferência" },
  ];

  const adicionar = (produto) => {
    setConcluida(null);
    setCarrinho((atual) => {
      const existente = atual.find((i) => i.produtoId === produto.id);
      const noStock = produto.stock;
      const qtdAtual = existente?.quantidade || 0;
      if (qtdAtual >= noStock) return atual; // não deixa vender mais do que há em stock
      if (existente) {
        return atual.map((i) => (i.produtoId === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i));
      }
      return [...atual, { produtoId: produto.id, quantidade: 1 }];
    });
  };

  // Regista o código lido pela câmara — compara com o "código" de cada
  // produto (o mesmo campo usado ao criar o produto em Stock).
  const processarCodigoLido = (codigo) => {
    const produto = produtos.find((p) => p.codigo.toLowerCase() === codigo.trim().toLowerCase());
    if (produto) {
      adicionar(produto);
      setNaoEncontrado("");
      pararLeitor();
    } else {
      setNaoEncontrado(codigo);
    }
  };

  const pararLeitor = () => {
    if (controlsRef.current) {
      controlsRef.current.stop();
      controlsRef.current = null;
    }
    setLeitorAberto(false);
  };

  const abrirLeitor = async () => {
    setErroLeitor("");
    setNaoEncontrado("");
    setLeitorAberto(true);
    try {
      const { BrowserMultiFormatReader } = await import("@zxing/library");
      const leitor = new BrowserMultiFormatReader();
      const controls = await leitor.decodeFromVideoDevice(undefined, videoRef.current, (resultado) => {
        if (resultado) processarCodigoLido(resultado.getText());
      });
      controlsRef.current = controls;
    } catch (err) {
      // biblioteca "@zxing/library" não disponível nesta pré-visualização, ou
      // câmara sem permissão — no projeto instalado (após "npm install")
      // funciona normalmente com uma câmara real.
      setErroLeitor('Leitura por câmara indisponível nesta pré-visualização (ou sem permissão de câmara). Funciona normalmente no projeto real, depois do "npm install".');
    }
  };

  useEffect(() => () => pararLeitor(), []);

  const remover = (produtoId) => {
    setCarrinho((atual) => atual.filter((i) => i.produtoId !== produtoId));
  };

  const alterarQtd = (produtoId, delta) => {
    setCarrinho((atual) =>
      atual
        .map((i) => (i.produtoId === produtoId ? { ...i, quantidade: i.quantidade + delta } : i))
        .filter((i) => i.quantidade > 0)
    );
  };

  const itensCarrinho = carrinho.map((i) => {
    const produto = produtos.find((p) => p.id === i.produtoId);
    return { ...i, produto, subtotal: produto.preco * i.quantidade };
  });
  const total = itensCarrinho.reduce((s, i) => s + i.subtotal, 0);

  const finalizar = () => {
    if (itensCarrinho.length === 0) return;
    const membro = membros.find((m) => m.id === Number(membroId)) || null;
    const documento = onFinalizar({ itens: itensCarrinho, total, metodo, membro, contaBancariaId });
    setConcluida(documento);
    setCarrinho([]);
    setMembroId("");
    setContaBancariaId("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Produtos */}
      <div className="lg:col-span-2">
        <div className="flex justify-end mb-3">
          <button onClick={abrirLeitor} className="flex items-center gap-1.5 text-sm font-semibold text-[#3F8F87] ring-1 ring-[#8FC9C3] rounded-lg px-3 py-2 hover:bg-[#EAF5F4] dark:hover:bg-slate-700">
            <ScanLine size={16} /> Ler código de barras
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {produtos.map((p) => (
            <button
              key={p.id}
              onClick={() => adicionar(p)}
              disabled={p.stock === 0}
              className="bg-white dark:bg-slate-800 rounded-xl ring-1 ring-slate-100 dark:ring-slate-700 p-4 text-left hover:ring-[#5AAFA8] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{p.nome}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{p.categoria}</p>
              <p className="text-[#3F8F87] font-bold mt-2">{kz(p.preco)}</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">{p.stock} em stock</p>
            </button>
          ))}
        </div>
      </div>

      {/* Carrinho */}
      <Card title="Carrinho">
        {itensCarrinho.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">Seleciona produtos ao lado.</p>
        ) : (
          <div className="space-y-3">
            <div className="divide-y divide-slate-50 dark:divide-slate-700">
              {itensCarrinho.map((i) => (
                <div key={i.produtoId} className="py-2.5">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{i.produto.nome}</p>
                    <button onClick={() => remover(i.produtoId)} className="text-slate-300 hover:text-red-500">
                      <X size={14} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2">
                      <button onClick={() => alterarQtd(i.produtoId, -1)} className="w-6 h-6 rounded-md ring-1 ring-slate-200 dark:ring-slate-600 text-slate-500 dark:text-slate-300">−</button>
                      <span className="text-sm w-5 text-center">{i.quantidade}</span>
                      <button onClick={() => alterarQtd(i.produtoId, 1)} className="w-6 h-6 rounded-md ring-1 ring-slate-200 dark:ring-slate-600 text-slate-500 dark:text-slate-300">+</button>
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{kz(i.subtotal)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Membro (opcional)</label>
              <select value={membroId} onChange={(e) => setMembroId(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                <option value="">Cliente sem cadastro</option>
                {membros.map((m) => <option key={m.id} value={m.id}>{m.nome} — {m.numero}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block">Método de pagamento</label>
              <div className="grid grid-cols-2 gap-2">
                {metodos.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { setMetodo(m.id); setContaBancariaId(""); }}
                    className={`text-xs font-medium py-2 rounded-lg ring-1 transition-colors ${
                      metodo === m.id ? "bg-[#3F8F87] text-white ring-[#3F8F87]" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {(metodo === "transferencia" || metodo === "express") && (
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Qual {metodo === "express" ? "número Express" : "conta bancária"} recebeu?
                </label>
                <select value={contaBancariaId} onChange={(e) => setContaBancariaId(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                  <option value="">Selecionar...</option>
                  {obterContasBancarias(dadosGinasio)
                    .filter((c) => (metodo === "express" ? c.tipo === "express" : c.tipo === "iban"))
                    .map((c) => <option key={c.id} value={c.id}>{c.banco}</option>)}
                </select>
              </div>
            )}

            {metodo === "tpa" && <MostrarQRTPA dadosGinasio={dadosGinasio} />}

            <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-700">
              <span className="text-sm text-slate-500 dark:text-slate-400">Total</span>
              <span className="text-xl font-extrabold text-[#3F8F87]">{kz(total)}</span>
            </div>

            <button onClick={finalizar} className="w-full bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg text-sm">
              Concluir venda
            </button>
          </div>
        )}

        {concluida && (
          <div className="mt-4">
            <div className="bg-[#EAF5F4] dark:bg-slate-700 ring-1 ring-[#BFE4E1] dark:ring-slate-600 rounded-lg p-3 text-center mb-3">
              <CheckCircle2 className="mx-auto text-[#3F8F87] mb-1" size={22} />
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Venda concluída — {kz(concluida.valor)}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {concluida.numero} · Stock atualizado{concluida.membro?.numero !== "AVULSO" ? `, guardado na conta de ${concluida.membro.nome}` : ""}.
              </p>
            </div>

            <div className="hidden">
              {/* renderizado fora de ecrã só para gerar o PDF/impressão */}
              <DocumentoFinanceiro
                docRef={docRef}
                tipo="RECIBO"
                numero={concluida.numero}
                data={concluida.data}
                hora={concluida.hora}
                cliente={concluida.membro}
                metodo={concluida.metodo}
                dadosGinasio={dadosGinasio}
                itens={concluida.itens}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => imprimirElemento(`Recibo ${concluida.numero}`, docRef.current)}
                className="flex-1 border border-slate-200 dark:border-slate-600 rounded-lg py-2 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Recibo — PDF / Imprimir
              </button>
              {concluida.membro?.telefone && (
                <a
                  href={linkWhatsApp(concluida.membro.telefone, `Recibo ${concluida.numero} — ${kz(concluida.valor)}. Obrigado pela compra! ${dadosGinasio.nome} 💪`)}
                  target="_blank" rel="noreferrer"
                  className="flex-1 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white rounded-lg py-2 text-sm font-semibold text-center"
                >
                  Enviar
                </a>
              )}
            </div>
          </div>
        )}
      </Card>

      {leitorAberto && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={pararLeitor} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-1.5">
              <ScanLine size={16} className="text-[#3F8F87]" /> Ler código de barras
            </h3>
            <div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 aspect-video mb-3">
              <video ref={videoRef} muted playsInline className="w-full h-full object-cover" />
              <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-14 border-2 border-[#5AAFA8]/70 rounded-lg pointer-events-none" />
            </div>
            {erroLeitor && <p className="text-xs text-red-500 mb-2">{erroLeitor}</p>}
            {naoEncontrado && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mb-2">
                Código "{naoEncontrado}" lido, mas nenhum produto tem esse código. Confirma o campo "Código" em Stock.
              </p>
            )}
            <p className="text-xs text-slate-400 dark:text-slate-500">Aponta a câmara para o código de barras do produto.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Stock({ produtos, vendasProdutos, onAdd, onUpdate, onRemove, onEntrada, dadosGinasio }) {
  const [showForm, setShowForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [novo, setNovo] = useState({ codigo: "", nome: "", categoria: "", stock: 0, minimo: 5, precoCusto: 0, preco: 0 });
  const [entradaId, setEntradaId] = useState(null);
  const [quantidadeEntrada, setQuantidadeEntrada] = useState("");
  const [novoPrecoCustoEntrada, setNovoPrecoCustoEntrada] = useState("");
  const [novoPrecoEntrada, setNovoPrecoEntrada] = useState("");
  const [pagoDeEntrada, setPagoDeEntrada] = useState("caixa");
  const [contaBancariaEntrada, setContaBancariaEntrada] = useState("");
  const contasBancarias = obterContasBancarias(dadosGinasio);

  const vendidoPorProduto = useMemo(() => {
    const mapa = {};
    vendasProdutos.forEach((v) => {
      if (!mapa[v.produtoId]) mapa[v.produtoId] = { quantidade: 0, valor: 0 };
      mapa[v.produtoId].quantidade += v.quantidade;
      mapa[v.produtoId].valor += v.subtotal;
    });
    return mapa;
  }, [vendasProdutos]);

  const abrirNovo = () => {
    setEditandoId(null);
    setNovo({ codigo: "", nome: "", categoria: "", stock: 0, minimo: 5, precoCusto: 0, preco: 0 });
    setShowForm(true);
  };

  const abrirEdicao = (p) => {
    setEditandoId(p.id);
    setNovo({ precoCusto: 0, ...p });
    setShowForm(true);
  };

  const submeter = (e) => {
    e.preventDefault();
    if (!novo.nome || !novo.codigo) return;
    const dados = { ...novo, stock: Number(novo.stock), minimo: Number(novo.minimo), precoCusto: Number(novo.precoCusto) || 0, preco: Number(novo.preco) };
    if (editandoId) {
      onUpdate(editandoId, dados);
    } else {
      onAdd(dados);
    }
    setNovo({ codigo: "", nome: "", categoria: "", stock: 0, minimo: 5, precoCusto: 0, preco: 0 });
    setEditandoId(null);
    setShowForm(false);
  };

  const submeterEntrada = (e) => {
    e.preventDefault();
    const qtd = Number(quantidadeEntrada);
    if (!qtd || qtd <= 0) return;
    onEntrada(
      entradaId, qtd,
      novoPrecoCustoEntrada ? Number(novoPrecoCustoEntrada) : null,
      novoPrecoEntrada ? Number(novoPrecoEntrada) : null,
      pagoDeEntrada, contaBancariaEntrada
    );
    setEntradaId(null);
    setQuantidadeEntrada("");
    setNovoPrecoCustoEntrada("");
    setNovoPrecoEntrada("");
    setPagoDeEntrada("caixa");
    setContaBancariaEntrada("");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={abrirNovo}
          className="flex items-center gap-1.5 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white text-sm font-semibold px-4 py-2 rounded-lg"
        >
          <Plus size={16} /> Novo produto
        </button>
      </div>

      <Card title="Stock de produtos">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 dark:text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-700">
                <th className="pb-2 font-medium">Código</th>
                <th className="pb-2 font-medium">Produto</th>
                <th className="pb-2 font-medium">Categoria</th>
                <th className="pb-2 font-medium">Stock</th>
                <th className="pb-2 font-medium">Custo</th>
                <th className="pb-2 font-medium">Venda</th>
                <th className="pb-2 font-medium">Margem</th>
                <th className="pb-2 font-medium">Vendido</th>
                <th className="pb-2 font-medium">Estado</th>
                <th className="pb-2 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
              {produtos.map((p) => {
                const margem = p.precoCusto ? p.preco - p.precoCusto : null;
                return (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="py-2.5 text-slate-500 dark:text-slate-400 dark:text-slate-500">{p.codigo}</td>
                  <td className="py-2.5 font-medium text-slate-900 dark:text-slate-100">{p.nome}</td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-300">{p.categoria}</td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-300">{p.stock} un.</td>
                  <td className="py-2.5 text-slate-500 dark:text-slate-400">{p.precoCusto ? kz(p.precoCusto) : <span className="text-slate-300 dark:text-slate-600">—</span>}</td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-300">{kz(p.preco)}</td>
                  <td className="py-2.5">
                    {margem !== null ? (
                      <span className={`font-semibold ${margem >= 0 ? "text-emerald-600" : "text-red-500"}`}>{margem >= 0 ? "+" : ""}{kz(margem)}</span>
                    ) : (
                      <span className="text-slate-300 dark:text-slate-600">—</span>
                    )}
                  </td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-300">
                    {vendidoPorProduto[p.id] ? (
                      <span>{vendidoPorProduto[p.id].quantidade} un. · {kz(vendidoPorProduto[p.id].valor)}</span>
                    ) : (
                      <span className="text-slate-300 dark:text-slate-600">—</span>
                    )}
                  </td>
                  <td className="py-2.5">
                    {p.stock <= p.minimo ? (
                      <span className="text-xs font-semibold text-[#3F8F87] flex items-center gap-1">
                        <AlertTriangle size={13} /> Stock baixo
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-600">OK</span>
                    )}
                  </td>
                  <td className="py-2.5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => { setEntradaId(p.id); setQuantidadeEntrada(""); setNovoPrecoCustoEntrada(""); setNovoPrecoEntrada(""); }} title="Aumentar quantidade em stock" className="text-slate-400 hover:text-[#3F8F87]">
                        <Plus size={15} />
                      </button>
                      <button onClick={() => abrirEdicao(p)} title="Editar produto" className="text-slate-400 hover:text-[#3F8F87]">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => onRemove(p.id)} title="Remover produto" className="text-slate-400 hover:text-red-500">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>


      {entradaId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={() => setEntradaId(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Aumentar quantidade</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
              {produtos.find((p) => p.id === entradaId)?.nome} — stock atual: {produtos.find((p) => p.id === entradaId)?.stock} un.
              <br />Custo atual: {kz(produtos.find((p) => p.id === entradaId)?.precoCusto || 0)}/un. · Venda atual: {kz(produtos.find((p) => p.id === entradaId)?.preco || 0)}
            </p>
            <form onSubmit={submeterEntrada} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Quantidade a adicionar</label>
                <input type="number" min={1} value={quantidadeEntrada} onChange={(e) => setQuantidadeEntrada(e.target.value)} autoFocus
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
                <label className="text-xs font-medium text-amber-700 dark:text-amber-400">Quanto pagaste por unidade desta mercadoria nova? (opcional)</label>
                <input type="number" min={0} value={novoPrecoCustoEntrada} onChange={(e) => setNovoPrecoCustoEntrada(e.target.value)}
                  placeholder="Preço de custo — gera despesa em Custos"
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                <p className="text-[11px] text-amber-600 dark:text-amber-500 mt-1">
                  Isto NUNCA muda o preço de venda — só regista quanto gastaste a comprar, como despesa real.
                </p>
                {novoPrecoCustoEntrada && (
                  <div className="mt-2">
                    <label className="text-xs font-medium text-amber-700 dark:text-amber-400">Pago de</label>
                    <div className="flex gap-2 mt-1">
                      <select value={pagoDeEntrada} onChange={(e) => setPagoDeEntrada(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm">
                        <option value="caixa">Caixa (dinheiro)</option>
                        <option value="banco">Banco</option>
                      </select>
                      {pagoDeEntrada === "banco" && contasBancarias.length > 0 && (
                        <select value={contaBancariaEntrada} onChange={(e) => setContaBancariaEntrada(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm">
                          <option value="">Conta...</option>
                          {contasBancarias.map((c) => <option key={c.id} value={c.id}>{c.banco}</option>)}
                        </select>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Novo preço de VENDA (Kz) — opcional, só se quiseres mudar o que cobras</label>
                <input type="number" min={0} value={novoPrecoEntrada} onChange={(e) => setNovoPrecoEntrada(e.target.value)}
                  placeholder={`Mantém ${produtos.find((p) => p.id === entradaId)?.preco || 0} Kz`}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg">
                <Plus size={16} /> Adicionar ao stock
              </button>
            </form>
          </div>
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={() => setShowForm(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">{editandoId ? "Editar produto" : "Novo produto"}</h3>
            <form onSubmit={submeter} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Código</label>
                  <input value={novo.codigo} onChange={(e) => setNovo({ ...novo, codigo: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Categoria</label>
                  <input value={novo.categoria} onChange={(e) => setNovo({ ...novo, categoria: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Nome do produto</label>
                <input value={novo.nome} onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{editandoId ? "Stock" : "Stock inicial"}</label>
                  <input type="number" min={0} value={novo.stock} onChange={(e) => setNovo({ ...novo, stock: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Mínimo</label>
                  <input type="number" min={0} value={novo.minimo} onChange={(e) => setNovo({ ...novo, minimo: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Preço de venda (Kz)</label>
                  <input type="number" min={0} value={novo.preco} onChange={(e) => setNovo({ ...novo, preco: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Preço de custo (Kz) — opcional, o que pagaste por unidade</label>
                <input type="number" min={0} value={novo.precoCusto} onChange={(e) => setNovo({ ...novo, precoCusto: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                  Ao criar aqui, não gera despesa (é só o registo inicial) — despesas de compras futuras registam-se em "Aumentar quantidade".
                </p>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg mt-2">
                <Save size={16} /> {editandoId ? "Guardar alterações" : "Guardar produto"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ControloAcessos({ membros, acessos, onRegistarEntrada, onRegistarSaida }) {
  const [query, setQuery] = useState("");
  const [encontrado, setEncontrado] = useState(null);
  const [camaraAtiva, setCamaraAtiva] = useState(false);
  const [erroCamara, setErroCamara] = useState("");
  const videoRef = React.useRef(null);
  const streamRef = React.useRef(null);
  const rafRef = React.useRef(null);

  const localizar = (texto) => {
    const alvo = texto.trim().toLowerCase();
    // aceita "CG-000001", "000001", ou apenas "1" — compara também pelo número sem zeros à esquerda
    const alvoNumerico = parseInt(alvo.replace(/\D/g, ""), 10);
    const m = membros.find((m) => {
      const numeroMembro = m.numero.toLowerCase();
      const numeroMembroInt = parseInt(numeroMembro.replace(/\D/g, ""), 10);
      return (
        numeroMembro === alvo ||
        (!isNaN(alvoNumerico) && numeroMembroInt === alvoNumerico) ||
        m.nome.toLowerCase().includes(alvo)
      );
    });
    setEncontrado(m || "nao-encontrado");
  };

  const pesquisar = (e) => {
    e.preventDefault();
    localizar(query);
  };

  const pararCamara = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    setCamaraAtiva(false);
  };

  const iniciarCamara = async () => {
    setErroCamara("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCamaraAtiva(true);
      ler();
    } catch (err) {
      setErroCamara("Não foi possível aceder à câmara. Verifica as permissões do navegador.");
    }
  };

  // Lê frames do vídeo e tenta descodificar um QR Code (usa a biblioteca "jsqr")
  const ler = () => {
    const video = videoRef.current;
    if (!video || video.readyState !== video.HAVE_ENOUGH_DATA) {
      rafRef.current = requestAnimationFrame(ler);
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    import("jsqr")
      .then(({ default: jsQR }) => {
        const codigo = jsQR(imageData.data, imageData.width, imageData.height);
        if (codigo && codigo.data) {
          setQuery(codigo.data.trim()); // preenche o campo "Member ID" visivelmente, como pedido
          localizar(codigo.data.trim());
          pararCamara();
        } else {
          rafRef.current = requestAnimationFrame(ler);
        }
      })
      .catch(() => {
        // biblioteca "jsqr" não disponível neste ambiente de pré-visualização —
        // no projeto instalado localmente (com npm install) funciona normalmente.
        setErroCamara('Leitura por câmara indisponível nesta pré-visualização. Funciona normalmente depois do "npm install" no projeto real.');
        pararCamara();
      });
  };

  useEffect(() => () => pararCamara(), []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card title={<span className="flex items-center gap-2"><QrCode size={16} className="text-[#3F8F87]" /> Leitura de QR</span>}>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
          Utilize a câmara para preencher automaticamente o número do membro.
        </p>

        <div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 aspect-square mb-3">
          {camaraAtiva ? (
            <>
              <video ref={videoRef} muted playsInline className="w-full h-full object-cover" />
              <div className="absolute inset-0 border-2 border-[#5AAFA8]/70 m-10 rounded-lg pointer-events-none" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Camera size={36} className="text-slate-300 dark:text-slate-600" />
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={iniciarCamara}
            disabled={camaraAtiva}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all disabled:opacity-40 text-white font-semibold py-2.5 rounded-lg text-sm"
          >
            <Camera size={16} /> Ativar câmara
          </button>
          <button
            onClick={pararCamara}
            disabled={!camaraAtiva}
            className="flex-1 flex items-center justify-center gap-2 ring-1 ring-slate-200 dark:ring-slate-600 text-slate-500 dark:text-slate-400 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold py-2.5 rounded-lg text-sm"
          >
            <X size={16} /> Parar câmara
          </button>
        </div>

        {erroCamara && <p className="text-xs text-red-500 mt-2">{erroCamara}</p>}
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
          Aponta a câmara ao QR Code do cartão do membro (ver "Meu cartão" na área do membro).
        </p>
      </Card>

      <div className="space-y-5">
        <Card title="Validação de acesso">
          <form onSubmit={pesquisar} className="space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Número do membro, nome ou telefone</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex.: 1"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]"
              />
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white text-sm font-semibold py-2.5 rounded-lg">
              <CheckCircle2 size={16} /> Validar
            </button>
          </form>
        </Card>

        <Card title="Resultado">
        {!encontrado && <p className="text-sm text-slate-400 dark:text-slate-500">Aguardando pesquisa...</p>}
        {encontrado === "nao-encontrado" && (
          <div className="text-center py-6">
            <XCircle className="mx-auto text-[#3F8F87] mb-2" size={36} />
            <p className="font-medium text-slate-900 dark:text-slate-100">Membro não encontrado</p>
          </div>
        )}
        {encontrado && encontrado !== "nao-encontrado" && (() => {
          const hojeStr = new Date().toISOString().slice(0, 10);
          const entradaAberta = acessos.find((a) => a.numero === encontrado.numero && a.data === hojeStr && !a.saida);
          return (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500">
                  {encontrado.nome.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{encontrado.nome}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">{encontrado.numero}</p>
                </div>
                <div className="ml-auto"><Pill estado={encontrado.estado} /></div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-1">Validade: {encontrado.vencimento}</p>
              {entradaAberta && (
                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-3">
                  Já está no ginásio desde as {entradaAberta.entrada} — ainda não saiu.
                </p>
              )}

              {entradaAberta ? (
                <button
                  onClick={() => {
                    onRegistarSaida(encontrado);
                    setEncontrado(null);
                    setQuery("");
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 transition-all text-white font-semibold py-2.5 rounded-lg mt-2"
                >
                  <DoorClosed size={16} /> Registar saída
                </button>
              ) : (
                <button
                  disabled={encontrado.estado !== "ativo"}
                  onClick={() => {
                    onRegistarEntrada(encontrado);
                    setEncontrado(null);
                    setQuery("");
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all disabled:bg-slate-200 dark:bg-slate-600 disabled:text-slate-400 dark:text-slate-500 text-white font-semibold py-2.5 rounded-lg mt-2"
                >
                  <DoorOpen size={16} /> {encontrado.estado === "ativo" ? "Registar entrada" : "Plano inativo — regularizar pagamento"}
                </button>
              )}
            </div>
          );
        })()}
        </Card>
      </div>

      <Card title="Últimas entradas" className="lg:col-span-2">
        <div className="divide-y divide-slate-50 dark:divide-slate-700">
          {acessos.map((a) => (
            <div key={a.id} className="flex items-center justify-between py-2.5 text-sm">
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">{a.membro}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">{a.numero}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-600 dark:text-slate-300">Entrada {a.entrada}</p>
                {a.saida ? (
                  <p className="text-xs text-slate-400 dark:text-slate-500">Saída {a.saida}</p>
                ) : (
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Ainda no ginásio</p>
                )}
              </div>
            </div>
          ))}
          {acessos.length === 0 && (
            <p className="text-sm text-slate-400 dark:text-slate-500 py-3">Ainda não há entradas registadas.</p>
          )}
        </div>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------
// OS MEUS ALUNOS (vista do próprio Personal Trainer)
// ---------------------------------------------------------------------
function ModalAlunoDetalhe({ membro, avaliacoes, planoTreino, onAdicionarAvaliacao, onRemoverAvaliacao, onSalvarPlano, onFechar }) {
  const [aba, setAba] = useState("avaliacao");
  const vazioAvaliacao = { peso: "", altura: "", gordura: "", peito: "", cintura: "", quadril: "", braco: "", coxa: "", notas: "" };
  const [novaAvaliacao, setNovaAvaliacao] = useState(vazioAvaliacao);

  const [nomePlano, setNomePlano] = useState(planoTreino?.nome || "Treino do mês");
  const [exercicios, setExercicios] = useState(planoTreino?.exercicios || []);
  const [novoExercicio, setNovoExercicio] = useState({ nome: "", series: "", repeticoes: "", notas: "" });

  const submeterAvaliacao = (e) => {
    e.preventDefault();
    if (!novaAvaliacao.peso) return;
    onAdicionarAvaliacao(membro.id, {
      peso: Number(novaAvaliacao.peso), altura: novaAvaliacao.altura ? Number(novaAvaliacao.altura) : null,
      gordura: novaAvaliacao.gordura ? Number(novaAvaliacao.gordura) : null,
      medidas: { peito: novaAvaliacao.peito, cintura: novaAvaliacao.cintura, quadril: novaAvaliacao.quadril, braco: novaAvaliacao.braco, coxa: novaAvaliacao.coxa },
      notas: novaAvaliacao.notas,
    });
    setNovaAvaliacao(vazioAvaliacao);
  };

  const adicionarLinhaExercicio = () => {
    if (!novoExercicio.nome) return;
    setExercicios((atual) => [...atual, { ...novoExercicio, id: Date.now() }]);
    setNovoExercicio({ nome: "", series: "", repeticoes: "", notas: "" });
  };

  const removerLinhaExercicio = (id) => setExercicios((atual) => atual.filter((e) => e.id !== id));

  const guardarPlano = () => {
    onSalvarPlano(membro.id, { nome: nomePlano, exercicios });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-lg relative max-h-[85vh] overflow-y-auto">
        <button onClick={onFechar} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
          <X size={18} />
        </button>
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{membro.nome}</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">{membro.numero} · {membro.plano}</p>

        <div className="flex gap-2 mb-4">
          <button onClick={() => setAba("avaliacao")} className={`text-sm font-semibold px-3 py-1.5 rounded-lg ring-1 ${aba === "avaliacao" ? "bg-[#3F8F87] text-white ring-[#3F8F87]" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300"}`}>
            Avaliação física
          </button>
          <button onClick={() => setAba("treino")} className={`text-sm font-semibold px-3 py-1.5 rounded-lg ring-1 ${aba === "treino" ? "bg-[#3F8F87] text-white ring-[#3F8F87]" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300"}`}>
            Plano de treino
          </button>
        </div>

        {aba === "avaliacao" && (
          <div className="space-y-4">
            {avaliacoes.length > 0 && (
              <div className="space-y-2">
                {avaliacoes.map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-2.5 rounded-lg ring-1 ring-slate-100 dark:ring-slate-700 text-sm">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">{a.peso} kg{a.gordura ? ` · ${a.gordura}% gordura` : ""}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{a.data}</p>
                    </div>
                    <button onClick={() => onRemoverAvaliacao(a.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            )}
            <form onSubmit={submeterAvaliacao} className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Nova avaliação</p>
              <div className="grid grid-cols-3 gap-2">
                <input type="number" step="0.1" placeholder="Peso (kg)" value={novaAvaliacao.peso} onChange={(e) => setNovaAvaliacao({ ...novaAvaliacao, peso: e.target.value })}
                  className="px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-xs" />
                <input type="number" placeholder="Altura (cm)" value={novaAvaliacao.altura} onChange={(e) => setNovaAvaliacao({ ...novaAvaliacao, altura: e.target.value })}
                  className="px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-xs" />
                <input type="number" step="0.1" placeholder="% Gordura" value={novaAvaliacao.gordura} onChange={(e) => setNovaAvaliacao({ ...novaAvaliacao, gordura: e.target.value })}
                  className="px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-xs" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input placeholder="Peito (cm)" value={novaAvaliacao.peito} onChange={(e) => setNovaAvaliacao({ ...novaAvaliacao, peito: e.target.value })}
                  className="px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-xs" />
                <input placeholder="Cintura (cm)" value={novaAvaliacao.cintura} onChange={(e) => setNovaAvaliacao({ ...novaAvaliacao, cintura: e.target.value })}
                  className="px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-xs" />
                <input placeholder="Quadril (cm)" value={novaAvaliacao.quadril} onChange={(e) => setNovaAvaliacao({ ...novaAvaliacao, quadril: e.target.value })}
                  className="px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input placeholder="Braço (cm)" value={novaAvaliacao.braco} onChange={(e) => setNovaAvaliacao({ ...novaAvaliacao, braco: e.target.value })}
                  className="px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-xs" />
                <input placeholder="Coxa (cm)" value={novaAvaliacao.coxa} onChange={(e) => setNovaAvaliacao({ ...novaAvaliacao, coxa: e.target.value })}
                  className="px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-xs" />
              </div>
              <input placeholder="Notas (opcional)" value={novaAvaliacao.notas} onChange={(e) => setNovaAvaliacao({ ...novaAvaliacao, notas: e.target.value })}
                className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-xs" />
              <button className="w-full bg-[#3F8F87] hover:bg-[#357A73] text-white text-sm font-semibold py-2 rounded-lg">Registar avaliação</button>
            </form>
          </div>
        )}

        {aba === "treino" && (
          <div className="space-y-3">
            <input value={nomePlano} onChange={(e) => setNomePlano(e.target.value)} placeholder="Nome do plano (ex.: Treino A)"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm font-semibold" />
            <div className="space-y-2">
              {exercicios.map((ex) => (
                <div key={ex.id} className="flex items-center justify-between p-2.5 rounded-lg ring-1 ring-slate-100 dark:ring-slate-700 text-sm">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">{ex.nome}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{ex.series} séries × {ex.repeticoes} reps{ex.notas ? ` · ${ex.notas}` : ""}</p>
                  </div>
                  <button onClick={() => removerLinhaExercicio(ex.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
              ))}
              {exercicios.length === 0 && <p className="text-xs text-slate-400 dark:text-slate-500">Ainda sem exercícios neste plano.</p>}
            </div>
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
              <input placeholder="Exercício" value={novoExercicio.nome} onChange={(e) => setNovoExercicio({ ...novoExercicio, nome: e.target.value })}
                className="col-span-2 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-xs" />
              <input placeholder="Séries" value={novoExercicio.series} onChange={(e) => setNovoExercicio({ ...novoExercicio, series: e.target.value })}
                className="px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-xs" />
              <input placeholder="Reps" value={novoExercicio.repeticoes} onChange={(e) => setNovoExercicio({ ...novoExercicio, repeticoes: e.target.value })}
                className="px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-xs" />
            </div>
            <button type="button" onClick={adicionarLinhaExercicio} className="w-full text-xs font-semibold text-[#3F8F87] ring-1 ring-[#8FC9C3] rounded-lg py-1.5">
              + Adicionar exercício
            </button>
            <button onClick={guardarPlano} className="w-full bg-[#3F8F87] hover:bg-[#357A73] text-white text-sm font-semibold py-2 rounded-lg mt-2">
              Guardar plano de treino
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MeusAlunos({ trainer, membros, avaliacoesFisicas, planosTreino, onAdicionarAvaliacao, onRemoverAvaliacao, onSalvarPlano }) {
  const alunos = trainer ? membros.filter((m) => m.trainerId === trainer.id) : [];
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  if (!trainer) {
    return (
      <Card title="Os meus alunos">
        <p className="text-sm text-slate-400 dark:text-slate-500">
          A tua conta ainda não está associada a um perfil de treinador. Pede ao administrador para te associar em
          Personal Trainers.
        </p>
      </Card>
    );
  }

  return (
    <>
      <Card title={`Os meus alunos (${alunos.length})`}>
        {alunos.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">Ainda não tens alunos atribuídos.</p>
        ) : (
          <div className="divide-y divide-slate-50 dark:divide-slate-700">
            {alunos.map((m) => (
              <button key={m.id} onClick={() => setAlunoSelecionado(m)} className="w-full flex items-center justify-between py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg px-1 -mx-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                    {m.foto ? <img src={m.foto} alt={m.nome} className="w-full h-full object-cover" /> : <UserIcon size={16} className="text-slate-400" />}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">{m.nome}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{m.numero} · {m.plano}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Pill estado={m.estado} />
                  <ChevronRight size={16} className="text-slate-300" />
                </div>
              </button>
            ))}
          </div>
        )}
      </Card>

      {alunoSelecionado && (
        <ModalAlunoDetalhe
          membro={alunoSelecionado}
          avaliacoes={avaliacoesFisicas.filter((a) => a.membroId === alunoSelecionado.id)}
          planoTreino={planosTreino.find((p) => p.membroId === alunoSelecionado.id)}
          onAdicionarAvaliacao={onAdicionarAvaliacao}
          onRemoverAvaliacao={onRemoverAvaliacao}
          onSalvarPlano={onSalvarPlano}
          onFechar={() => setAlunoSelecionado(null)}
        />
      )}
    </>
  );
}

function Funcionarios({ contas }) {
  const funcionarios = contas.filter((c) => c.perfil === "recepcionista" || c.perfil === "personal_trainer");
  return (
    <Card title="Funcionários inscritos">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 dark:text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-700">
              <th className="pb-2 font-medium">Nome</th>
              <th className="pb-2 font-medium">E-mail</th>
              <th className="pb-2 font-medium">Cargo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
            {funcionarios.map((f) => (
              <tr key={f.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                <td className="py-2.5 font-medium text-slate-900 dark:text-slate-100">{f.nome}</td>
                <td className="py-2.5 text-slate-600 dark:text-slate-300">{f.email}</td>
                <td className="py-2.5 text-slate-600 dark:text-slate-300">{ROTULO_PERFIL[f.perfil]}</td>
              </tr>
            ))}
            {funcionarios.length === 0 && (
              <tr><td colSpan={3} className="py-6 text-center text-slate-400 dark:text-slate-500">Ainda não há funcionários inscritos. Cria contas em Configurações → Utilizadores.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3">
        O registo de ponto (horas, atrasos, faltas) fica disponível assim que o sistema estiver ligado à base de dados — cada funcionário terá de marcar entrada/saída no próprio dispositivo.
      </p>
    </Card>
  );
}

// ---------------------------------------------------------------------
// PERSONAL TRAINERS
// ---------------------------------------------------------------------
function PersonalTrainers({ trainers, membros, onAdd, onAtribuirAluno, podeGerir }) {
  const [showForm, setShowForm] = useState(false);
  const [novo, setNovo] = useState({ nome: "", telefone: "", especialidade: "" });
  const [gerirAlunosDe, setGerirAlunosDe] = useState(null); // trainer selecionado para gerir alunos

  const submeter = (e) => {
    e.preventDefault();
    if (!novo.nome) return;
    onAdd(novo);
    setNovo({ nome: "", telefone: "", especialidade: "" });
    setShowForm(false);
  };

  const alunosDe = (trainerId) => membros.filter((m) => m.trainerId === trainerId);

  return (
    <div className="space-y-4">
      {podeGerir && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white text-sm font-semibold px-4 py-2 rounded-lg"
          >
            <Plus size={16} /> Novo personal trainer
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {trainers.map((t) => {
          const meusAlunos = alunosDe(t.id);
          return (
            <Card key={t.id}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center font-bold text-slate-500 dark:text-slate-300">
                  <Dumbbell size={20} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{t.nome}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.telefone}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">{t.especialidade}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{meusAlunos.length} alunos ativos</p>
              {meusAlunos.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {meusAlunos.map((m) => (
                    <span key={m.id} className="text-[11px] bg-[#EAF5F4] dark:bg-slate-700 text-[#3F8F87] dark:text-[#8FC9C3] px-2 py-1 rounded-full">
                      {m.nome}
                    </span>
                  ))}
                </div>
              )}
              <button
                onClick={() => setGerirAlunosDe(t)}
                className="mt-3 w-full text-sm font-semibold border border-slate-200 dark:border-slate-600 rounded-lg py-2 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Gerir alunos
              </button>
            </Card>
          );
        })}
      </div>

      {!podeGerir && (
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Apenas o administrador pode inscrever novos personal trainers.
        </p>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={() => setShowForm(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Novo personal trainer</h3>
            <form onSubmit={submeter} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Nome completo</label>
                <input value={novo.nome} onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Telefone</label>
                <input value={novo.telefone} onChange={(e) => setNovo({ ...novo, telefone: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Especialidade</label>
                <input value={novo.especialidade} onChange={(e) => setNovo({ ...novo, especialidade: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg mt-2">
                <Save size={16} /> Guardar
              </button>
            </form>
          </div>
        </div>
      )}

      {gerirAlunosDe && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative max-h-[80vh] overflow-y-auto">
            <button onClick={() => setGerirAlunosDe(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Alunos de {gerirAlunosDe.nome}</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">Marca os membros que treinam com este personal trainer.</p>
            <div className="space-y-1">
              {membros.map((m) => {
                const marcado = m.trainerId === gerirAlunosDe.id;
                return (
                  <label key={m.id} className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marcado}
                      onChange={() => onAtribuirAluno(m.id, marcado ? null : gerirAlunosDe.id)}
                      className="w-4 h-4 accent-[#3F8F87]"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-200">{m.nome}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 ml-auto">{m.numero}</span>
                  </label>
                );
              })}
              {membros.length === 0 && <p className="text-sm text-slate-400 dark:text-slate-500 py-3">Ainda não há membros inscritos.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// UTILIZADORES / CONTAS (apenas administrador)
// ---------------------------------------------------------------------
const ROTULO_PERFIL = {
  administrador: "Administrador",
  recepcionista: "Recepcionista",
  personal_trainer: "Personal Trainer",
  membro: "Membro",
};

const ROTULO_METODO_PAGAMENTO = {
  dinheiro: "Dinheiro",
  tpa: "TPA",
  express: "MULTICAIXA Express",
  referencia: "Referência",
  transferencia: "Transferência",
};

const ROTULO_COLECAO = {
  membros: "Membros", planos: "Planos", produtos: "Produtos/Stock", trainers: "Personal Trainers",
  dadosGinasio: "Dados do ginásio", contas: "Utilizadores", acessos: "Controlo de Acessos",
  pagamentosFeitos: "Pagamentos", movimentosBancarios: "Movimentação Bancária", movimentosCaixa: "Movimentação de Caixa",
  comprasMembros: "Compras dos membros", vendasProdutos: "Vendas", auditLog: "Auditoria",
  pagamentosPendentes: "Aprovação de Pagamentos", custos: "Centro de Custos", faturas: "Faturação/Recibos",
  advertencias: "Advertências",
};

function Utilizadores({ contas, trainers, onAdd, onRemove, onCancelar, onReativar, onReporSenha }) {
  const [showForm, setShowForm] = useState(false);
  const [novo, setNovo] = useState({ nome: "", email: "", senha: "", perfil: "recepcionista", trainerId: "" });
  const [repondoId, setRepondoId] = useState(null);
  const [senhaNova, setSenhaNova] = useState("");

  const submeter = (e) => {
    e.preventDefault();
    if (!novo.nome || !novo.email || !novo.senha) return;
    onAdd({ ...novo, trainerId: novo.perfil === "personal_trainer" && novo.trainerId ? Number(novo.trainerId) : null });
    setNovo({ nome: "", email: "", senha: "", perfil: "recepcionista", trainerId: "" });
    setShowForm(false);
  };

  const submeterReporSenha = (e) => {
    e.preventDefault();
    if (senhaNova.length < 6) return;
    onReporSenha(repondoId, senhaNova);
    setRepondoId(null);
    setSenhaNova("");
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#EAF5F4] dark:bg-slate-800 ring-1 ring-[#BFE4E1] dark:ring-slate-700 rounded-xl p-4 flex items-start gap-3">
        <ShieldCheck size={18} className="text-[#3F8F87] mt-0.5 shrink-0" />
        <p className="text-sm text-slate-600 dark:text-slate-300">
          A conta do <strong>Administrador</strong> é única e independente. Só o administrador pode criar
          contas de <strong>Recepcionista</strong> e <strong>Personal Trainer</strong>. Contas de <strong>Membro</strong>
          são criadas automaticamente ao inscrever um novo membro. Por segurança, ninguém — nem o administrador —
          consegue ver a palavra-passe de outra pessoa; só pode <strong>repor</strong> uma nova, para contas de staff.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white text-sm font-semibold px-4 py-2 rounded-lg"
        >
          <KeyRound size={16} /> Nova conta
        </button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700">
                <th className="pb-2 font-medium">Nome</th>
                <th className="pb-2 font-medium">E-mail</th>
                <th className="pb-2 font-medium">Perfil</th>
                <th className="pb-2 font-medium">Estado</th>
                <th className="pb-2 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
              {contas.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="py-2.5 font-medium text-slate-900 dark:text-slate-100">{c.nome}</td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-300">{c.email}</td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-300">{ROTULO_PERFIL[c.perfil]}</td>
                  <td className="py-2.5">
                    {c.desativada ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">CANCELADA</span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">ATIVA</span>
                    )}
                  </td>
                  <td className="py-2.5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {c.perfil !== "administrador" && c.perfil !== "membro" && (
                        <button onClick={() => { setRepondoId(c.id); setSenhaNova(""); }} title="Repor palavra-passe" className="text-slate-400 hover:text-[#3F8F87]">
                          <KeyRound size={15} />
                        </button>
                      )}
                      {c.perfil !== "administrador" && (
                        c.desativada ? (
                          <button onClick={() => onReativar(c.id)} title="Reativar conta" className="text-blue-500 hover:text-blue-700">
                            <PlayCircle size={15} />
                          </button>
                        ) : (
                          <button onClick={() => onCancelar(c.id)} title="Cancelar (mantém o registo, desativa o acesso)" className="text-slate-400 hover:text-amber-600">
                            <PauseCircle size={15} />
                          </button>
                        )
                      )}
                      {c.perfil !== "administrador" && (
                        <button onClick={() => onRemove(c.id)} title="Eliminar conta (irreversível)" className="text-slate-400 hover:text-red-500">
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {repondoId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={() => setRepondoId(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Repor palavra-passe</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
              Define uma nova palavra-passe temporária para {contas.find((c) => c.id === repondoId)?.nome}. Recomenda-se
              que a pessoa a mude assim que entrar (em Meu Perfil).
            </p>
            <form onSubmit={submeterReporSenha} className="space-y-3">
              <input type="password" placeholder="Nova palavra-passe" value={senhaNova} onChange={(e) => setSenhaNova(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg text-sm">
                <KeyRound size={16} /> Repor palavra-passe
              </button>
            </form>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={() => setShowForm(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Nova conta de acesso</h3>
            <form onSubmit={submeter} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Nome completo</label>
                <input value={novo.nome} onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">E-mail</label>
                <input type="email" value={novo.email} onChange={(e) => setNovo({ ...novo, email: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Palavra-passe</label>
                <input type="password" value={novo.senha} onChange={(e) => setNovo({ ...novo, senha: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Perfil</label>
                <select value={novo.perfil} onChange={(e) => setNovo({ ...novo, perfil: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                  <option value="recepcionista">Recepcionista</option>
                  <option value="personal_trainer">Personal Trainer</option>
                </select>
              </div>
              {novo.perfil === "personal_trainer" && (
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Qual treinador é esta conta?</label>
                  <select value={novo.trainerId} onChange={(e) => setNovo({ ...novo, trainerId: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                    <option value="">Selecionar...</option>
                    {trainers.map((t) => <option key={t.id} value={t.id}>{t.nome}</option>)}
                  </select>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                    Precisa de existir primeiro em "Personal Trainers" — assim a conta vê só os alunos dele.
                  </p>
                </div>
              )}
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                A pessoa entra com este e-mail e palavra-passe na tela inicial do sistema.
              </p>
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg mt-2">
                <KeyRound size={16} /> Criar conta
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// FATURAÇÃO (documento fiscal — distinto do recibo simples)
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// SUBSCRIÇÕES (gestão das assinaturas/planos de cada membro)
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// CENTRO DE CUSTOS (despesas do ginásio — renda, salários, manutenção, etc.)
// ---------------------------------------------------------------------
const CATEGORIAS_CUSTO = ["Renda", "Salários", "Eletricidade / Água", "Manutenção", "Equipamento", "Marketing", "Impostos", "Outros"];

// ---------------------------------------------------------------------
// ORÇAMENTO — plano de compras de coisas novas para o ginásio (equipamento,
// material, etc.). Quando algo é marcado como "comprado", gera logo o custo
// real (ligado ao Caixa/Banco), para nunca ficar desligado da parte financeira.
// ---------------------------------------------------------------------
const PRIORIDADES_ORCAMENTO = { alta: { rotulo: "Alta", cor: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400" }, media: { rotulo: "Média", cor: "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" }, baixa: { rotulo: "Baixa", cor: "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400" } };

function Orcamento({ itens, onAdicionar, onRemover, onMarcarComprado, onRegistarPagamento, dadosGinasio }) {
  const [showForm, setShowForm] = useState(false);
  const [comprando, setComprando] = useState(null);
  const [pagando, setPagando] = useState(null);
  const vazio = { nome: "", categoria: "Equipamento", valorEstimado: "", prioridade: "media", notas: "" };
  const [novo, setNovo] = useState(vazio);
  const contasBancarias = obterContasBancarias(dadosGinasio);
  const [compra, setCompra] = useState({ valorReal: "", pagoDe: "caixa", contaBancariaId: contasBancarias[0]?.id || "" });
  const [pagamento, setPagamento] = useState({ valor: "", pagoDe: "caixa", contaBancariaId: contasBancarias[0]?.id || "" });

  const submeter = (e) => {
    e.preventDefault();
    if (!novo.nome) return;
    onAdicionar({ ...novo, valorEstimado: Number(novo.valorEstimado) || 0 });
    setNovo(vazio);
    setShowForm(false);
  };

  const abrirComprar = (item) => {
    setComprando(item);
    setCompra({ valorReal: (item.valorEstimado || 0) - (item.valorPago || 0), pagoDe: "caixa", contaBancariaId: contasBancarias[0]?.id || "" });
  };

  const confirmarCompra = (e) => {
    e.preventDefault();
    if (!compra.valorReal) return;
    onMarcarComprado(comprando.id, { ...compra, valorReal: Number(compra.valorReal) });
    setComprando(null);
  };

  const abrirPagamento = (item) => {
    setPagando(item);
    setPagamento({ valor: "", pagoDe: "caixa", contaBancariaId: contasBancarias[0]?.id || "" });
  };

  const confirmarPagamento = (e) => {
    e.preventDefault();
    if (!pagamento.valor) return;
    onRegistarPagamento(pagando.id, { ...pagamento, valor: Number(pagamento.valor) });
    setPagando(null);
  };

  const pendentes = [...itens.filter((i) => i.estado !== "comprado")].sort((a, b) => {
    const ordem = { alta: 0, media: 1, baixa: 2 };
    return ordem[a.prioridade] - ordem[b.prioridade];
  });
  const comprados = itens.filter((i) => i.estado === "comprado");
  const totalEstimado = pendentes.reduce((s, i) => s + Math.max(0, (i.valorEstimado || 0) - (i.valorPago || 0)), 0);
  const totalGasto = comprados.reduce((s, i) => s + (i.valorReal || 0), 0) + pendentes.reduce((s, i) => s + (i.valorPago || 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setShowForm(true)} className="flex items-center gap-1.5 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white text-sm font-semibold px-4 py-2 rounded-lg">
          <Plus size={16} /> Novo item no orçamento
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard icon={ClipboardList} label="Falta pagar (planeado)" value={kz(totalEstimado)} tone="blue" />
        <StatCard icon={CheckCircle2} label="Já gasto (pago + comprado)" value={kz(totalGasto)} tone="emerald" />
      </div>

      <Card title={`Plano de compras (${pendentes.length}) — por prioridade`}>
        {pendentes.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">Sem itens planeados por comprar.</p>
        ) : (
          <div className="divide-y divide-slate-50 dark:divide-slate-700">
            {pendentes.map((item) => {
              const pago = item.valorPago || 0;
              const falta = Math.max(0, (item.valorEstimado || 0) - pago);
              return (
                <div key={item.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-slate-900 dark:text-slate-100">{item.nome}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${PRIORIDADES_ORCAMENTO[item.prioridade]?.cor}`}>
                          {PRIORIDADES_ORCAMENTO[item.prioridade]?.rotulo}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{item.categoria}{item.notas ? ` · ${item.notas}` : ""}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{kz(item.valorEstimado)}</span>
                      <button onClick={() => abrirPagamento(item)} title="Registar pagamento (pode ser parcial)" className="text-blue-500 hover:text-blue-700">
                        <CreditCard size={15} />
                      </button>
                      <button onClick={() => abrirComprar(item)} title="Marcar como totalmente pago/comprado" className="text-emerald-600 hover:text-emerald-700">
                        <CheckCircle2 size={16} />
                      </button>
                      <button onClick={() => onRemover(item.id)} title="Remover" className="text-slate-400 hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  {pago > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                        <span>Pago: {kz(pago)}</span>
                        <span>Falta: {kz(falta)}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-[#3F8F87]" style={{ width: `${Math.min(100, (pago / (item.valorEstimado || 1)) * 100)}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {comprados.length > 0 && (
        <Card title={`Já comprado (${comprados.length})`}>
          <div className="divide-y divide-slate-50 dark:divide-slate-700">
            {comprados.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-slate-600 dark:text-slate-300">{item.nome}</span>
                <span className="font-medium text-emerald-600">{kz(item.valorReal)}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={() => setShowForm(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Novo item no orçamento</h3>
            <form onSubmit={submeter} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">O que é?</label>
                <input value={novo.nome} onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
                  placeholder="Ex.: Passadeira nova"
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Categoria</label>
                <select value={novo.categoria} onChange={(e) => setNovo({ ...novo, categoria: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                  {CATEGORIAS_CUSTO.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Valor estimado (Kz)</label>
                <input type="number" min={0} value={novo.valorEstimado} onChange={(e) => setNovo({ ...novo, valorEstimado: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block">Prioridade</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(PRIORIDADES_ORCAMENTO).map(([chave, p]) => (
                    <button type="button" key={chave} onClick={() => setNovo({ ...novo, prioridade: chave })}
                      className={`text-xs font-semibold py-2 rounded-lg ring-1 ${novo.prioridade === chave ? "bg-[#3F8F87] text-white ring-[#3F8F87]" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300"}`}>
                      {p.rotulo}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Notas (opcional)</label>
                <input value={novo.notas} onChange={(e) => setNovo({ ...novo, notas: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg mt-2">
                <Save size={16} /> Guardar no orçamento
              </button>
            </form>
          </div>
        </div>
      )}

      {comprando && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={() => setComprando(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Marcar "{comprando.nome}" como comprado</h3>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-4">
              Isto cria logo um custo real no Centro de Custos, ligado ao Caixa/Banco.
            </p>
            <form onSubmit={confirmarCompra} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Valor pago (Kz)</label>
                <input type="number" min={0} value={compra.valorReal} onChange={(e) => setCompra({ ...compra, valorReal: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block">Pago de onde?</label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setCompra({ ...compra, pagoDe: "caixa" })}
                    className={`text-sm font-semibold py-2 rounded-lg ring-1 ${compra.pagoDe === "caixa" ? "bg-[#3F8F87] text-white ring-[#3F8F87]" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300"}`}>
                    Caixa (dinheiro)
                  </button>
                  <button type="button" onClick={() => setCompra({ ...compra, pagoDe: "banco" })}
                    className={`text-sm font-semibold py-2 rounded-lg ring-1 ${compra.pagoDe === "banco" ? "bg-[#3F8F87] text-white ring-[#3F8F87]" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300"}`}>
                    Banco
                  </button>
                </div>
              </div>
              {compra.pagoDe === "banco" && contasBancarias.length > 0 && (
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Conta bancária</label>
                  <select value={compra.contaBancariaId} onChange={(e) => setCompra({ ...compra, contaBancariaId: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                    {contasBancarias.map((c) => <option key={c.id} value={c.id}>{c.banco}</option>)}
                  </select>
                </div>
              )}
              <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-lg text-sm">
                <CheckCircle2 size={16} /> Confirmar compra
              </button>
            </form>
          </div>
        </div>
      )}

      {pagando && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={() => setPagando(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Registar pagamento — "{pagando.nome}"</h3>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-4">
              Já pago: {kz(pagando.valorPago || 0)} de {kz(pagando.valorEstimado)}. Podes pagar em várias vezes —
              cada pagamento gera logo um custo real, ligado ao Caixa/Banco.
            </p>
            <form onSubmit={confirmarPagamento} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Valor deste pagamento (Kz)</label>
                <input type="number" min={0} value={pagamento.valor} onChange={(e) => setPagamento({ ...pagamento, valor: e.target.value })} autoFocus
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block">Pago de onde?</label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setPagamento({ ...pagamento, pagoDe: "caixa" })}
                    className={`text-sm font-semibold py-2 rounded-lg ring-1 ${pagamento.pagoDe === "caixa" ? "bg-[#3F8F87] text-white ring-[#3F8F87]" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300"}`}>
                    Caixa (dinheiro)
                  </button>
                  <button type="button" onClick={() => setPagamento({ ...pagamento, pagoDe: "banco" })}
                    className={`text-sm font-semibold py-2 rounded-lg ring-1 ${pagamento.pagoDe === "banco" ? "bg-[#3F8F87] text-white ring-[#3F8F87]" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300"}`}>
                    Banco
                  </button>
                </div>
              </div>
              {pagamento.pagoDe === "banco" && contasBancarias.length > 0 && (
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Conta bancária</label>
                  <select value={pagamento.contaBancariaId} onChange={(e) => setPagamento({ ...pagamento, contaBancariaId: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                    {contasBancarias.map((c) => <option key={c.id} value={c.id}>{c.banco}</option>)}
                  </select>
                </div>
              )}
              <button className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg text-sm">
                <CreditCard size={16} /> Registar pagamento
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// PLANO DE ATIVIDADES — aulas/horários do ginásio (Zumba, Crossfit, Yoga,
// etc.), com dia, hora e instrutor (personal trainer, se aplicável).
// ---------------------------------------------------------------------
const DIAS_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

function PlanoAtividades({ atividades, trainers, reservasAtividades, onAdicionar, onAtualizar, onRemover }) {
  const [showForm, setShowForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const vazio = { nome: "", diaSemana: "Segunda", horaInicio: "08:00", horaFim: "09:00", trainerId: "", capacidadeMax: "", descricao: "" };
  const [novo, setNovo] = useState(vazio);

  const abrirNovo = () => {
    setEditandoId(null);
    setNovo(vazio);
    setShowForm(true);
  };

  const abrirEdicao = (a) => {
    setEditandoId(a.id);
    setNovo(a);
    setShowForm(true);
  };

  const submeter = (e) => {
    e.preventDefault();
    if (!novo.nome) return;
    const dados = { ...novo, trainerId: novo.trainerId ? Number(novo.trainerId) : null, capacidadeMax: novo.capacidadeMax ? Number(novo.capacidadeMax) : null };
    if (editandoId) onAtualizar(editandoId, dados);
    else onAdicionar(dados);
    setNovo(vazio);
    setShowForm(false);
    setEditandoId(null);
  };

  const porDia = useMemo(() => {
    const mapa = {};
    DIAS_SEMANA.forEach((d) => { mapa[d] = []; });
    atividades.forEach((a) => { if (mapa[a.diaSemana]) mapa[a.diaSemana].push(a); });
    Object.values(mapa).forEach((lista) => lista.sort((a, b) => a.horaInicio.localeCompare(b.horaInicio)));
    return mapa;
  }, [atividades]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={abrirNovo} className="flex items-center gap-1.5 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white text-sm font-semibold px-4 py-2 rounded-lg">
          <Plus size={16} /> Nova atividade
        </button>
      </div>

      {atividades.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-400 dark:text-slate-500">Ainda não há aulas/atividades no horário.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIAS_SEMANA.filter((d) => porDia[d].length > 0).map((dia) => (
            <Card key={dia} title={dia}>
              <div className="space-y-2">
                {porDia[dia].map((a) => {
                  const trainer = trainers.find((t) => t.id === a.trainerId);
                  return (
                    <div key={a.id} className="p-2.5 rounded-lg ring-1 ring-slate-100 dark:ring-slate-700">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{a.nome}</p>
                        <div className="flex items-center gap-2">
                          <button onClick={() => abrirEdicao(a)} className="text-slate-400 hover:text-[#3F8F87]"><Pencil size={13} /></button>
                          <button onClick={() => onRemover(a.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={13} /></button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{a.horaInicio} – {a.horaFim}{trainer ? ` · ${trainer.nome}` : ""}</p>
                      {a.capacidadeMax && (
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                          {reservasAtividades.filter((r) => r.atividadeId === a.id).length} / {a.capacidadeMax} vagas reservadas
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={() => setShowForm(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">{editandoId ? "Editar atividade" : "Nova atividade"}</h3>
            <form onSubmit={submeter} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Nome da atividade</label>
                <input value={novo.nome} onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
                  placeholder="Ex.: Zumba"
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Dia da semana</label>
                <select value={novo.diaSemana} onChange={(e) => setNovo({ ...novo, diaSemana: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                  {DIAS_SEMANA.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Início</label>
                  <input type="time" value={novo.horaInicio} onChange={(e) => setNovo({ ...novo, horaInicio: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Fim</label>
                  <input type="time" value={novo.horaFim} onChange={(e) => setNovo({ ...novo, horaFim: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Instrutor / Personal Trainer (opcional)</label>
                <select value={novo.trainerId || ""} onChange={(e) => setNovo({ ...novo, trainerId: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                  <option value="">Sem instrutor definido</option>
                  {trainers.map((t) => <option key={t.id} value={t.id}>{t.nome}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Capacidade máxima (opcional)</label>
                <input type="number" min={0} value={novo.capacidadeMax} onChange={(e) => setNovo({ ...novo, capacidadeMax: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg mt-2">
                <Save size={16} /> {editandoId ? "Guardar alterações" : "Adicionar ao horário"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CentroCustos({ custos, onAdicionar, onRemover, dadosGinasio }) {
  const [showForm, setShowForm] = useState(false);
  const contasBancarias = obterContasBancarias(dadosGinasio);
  const [novo, setNovo] = useState({ categoria: "Renda", descricao: "", valor: "", pagoDe: "caixa", contaBancariaId: contasBancarias[0]?.id || "" });

  const submeter = (e) => {
    e.preventDefault();
    if (!novo.valor) return;
    onAdicionar({ ...novo, valor: Number(novo.valor) });
    setNovo({ categoria: "Renda", descricao: "", valor: "", pagoDe: "caixa", contaBancariaId: contasBancarias[0]?.id || "" });
    setShowForm(false);
  };

  const totalGeral = custos.reduce((s, c) => s + c.valor, 0);
  const porCategoria = useMemo(() => {
    const mapa = {};
    custos.forEach((c) => { mapa[c.categoria] = (mapa[c.categoria] || 0) + c.valor; });
    return Object.entries(mapa).sort((a, b) => b[1] - a[1]);
  }, [custos]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white text-sm font-semibold px-4 py-2 rounded-lg"
        >
          <Plus size={16} /> Novo custo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard icon={TrendingUp} label="Total de custos registados" value={kz(totalGeral)} tone="red" />
        <Card title="Por categoria" className="sm:col-span-1">
          {porCategoria.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-slate-500">Ainda não há custos registados.</p>
          ) : (
            <div className="space-y-2">
              {porCategoria.map(([cat, valor]) => (
                <div key={cat} className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">{cat}</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{kz(valor)}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card title="Todos os custos">
        {custos.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">Ainda não há custos registados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700">
                  <th className="pb-2 font-medium">Data</th>
                  <th className="pb-2 font-medium">Categoria</th>
                  <th className="pb-2 font-medium">Descrição</th>
                  <th className="pb-2 font-medium">Valor</th>
                  <th className="pb-2 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                {custos.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                    <td className="py-2 text-slate-500 dark:text-slate-400">{c.data}</td>
                    <td className="py-2">
                      <span className="text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-medium">{c.categoria}</span>
                    </td>
                    <td className="py-2 text-slate-700 dark:text-slate-200">{c.descricao || "—"}</td>
                    <td className="py-2 font-semibold text-slate-900 dark:text-slate-100">{kz(c.valor)}</td>
                    <td className="py-2 text-right">
                      <button onClick={() => onRemover(c.id)} className="text-slate-300 dark:text-slate-600 hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={() => setShowForm(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Novo custo</h3>
            <form onSubmit={submeter} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Categoria</label>
                <select value={novo.categoria} onChange={(e) => setNovo({ ...novo, categoria: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                  {CATEGORIAS_CUSTO.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Descrição (opcional)</label>
                <input value={novo.descricao} onChange={(e) => setNovo({ ...novo, descricao: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Valor (Kz)</label>
                <input type="number" min={0} value={novo.valor} onChange={(e) => setNovo({ ...novo, valor: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block">Pago de onde?</label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setNovo({ ...novo, pagoDe: "caixa" })}
                    className={`text-sm font-semibold py-2 rounded-lg ring-1 ${novo.pagoDe === "caixa" ? "bg-[#3F8F87] text-white ring-[#3F8F87]" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300"}`}>
                    Caixa (dinheiro)
                  </button>
                  <button type="button" onClick={() => setNovo({ ...novo, pagoDe: "banco" })}
                    className={`text-sm font-semibold py-2 rounded-lg ring-1 ${novo.pagoDe === "banco" ? "bg-[#3F8F87] text-white ring-[#3F8F87]" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300"}`}>
                    Banco
                  </button>
                </div>
              </div>
              {novo.pagoDe === "banco" && contasBancarias.length > 0 && (
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Conta bancária</label>
                  <select value={novo.contaBancariaId} onChange={(e) => setNovo({ ...novo, contaBancariaId: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                    {contasBancarias.map((c) => <option key={c.id} value={c.id}>{c.banco}</option>)}
                  </select>
                </div>
              )}
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg mt-2">
                <Save size={16} /> Guardar custo
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Subscricoes({ membros, planos, onAtualizarSubscricao, onCancelarRenovacao, onPausar, onRetomar, onCancelarPausa, perfil }) {
  const [editandoId, setEditandoId] = useState(null);
  const [novoPlano, setNovoPlano] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("dinheiro");
  const [semPagamentoAgora, setSemPagamentoAgora] = useState(false);
  const [ultimoRecibo, setUltimoRecibo] = useState(null);
  const [ultimoPlanoConfirmado, setUltimoPlanoConfirmado] = useState("");

  const abrirEdicao = (membro) => {
    setEditandoId(membro.id);
    // Se o membro ainda não tem plano nenhum (primeira subscrição), começa
    // já com um plano real selecionado — senão o seletor mostrava
    // visualmente a primeira opção, mas por baixo ficava "vazio" até a
    // pessoa mexer manualmente, e confirmar sem mexer não gerava nada.
    setNovoPlano(membro.plano || planos[0]?.nome || "");
    setDataInicio(new Date().toISOString().slice(0, 10));
    setMetodoPagamento("dinheiro");
    setSemPagamentoAgora(false);
    setUltimoRecibo(null);
  };

  const confirmarMudanca = (membro) => {
    const documento = onAtualizarSubscricao(membro.id, novoPlano, dataInicio, semPagamentoAgora ? null : metodoPagamento);
    setUltimoRecibo(documento);
    setUltimoPlanoConfirmado(novoPlano);
    setEditandoId(null);
  };

  const diasRestantes = (vencimento) => {
    if (!vencimento) return null;
    const agora = new Date();
    const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
    const [ano, mes, dia] = vencimento.split("-").map(Number);
    const venc = new Date(ano, mes - 1, dia);
    return Math.round((venc - hoje) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-4">
      <Card title={<span className="flex items-center gap-2"><ClipboardList size={16} className="text-[#3F8F87]" /> Subscrições ativas</span>}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700">
                <th className="pb-2 font-medium">Membro</th>
                <th className="pb-2 font-medium">Plano</th>
                <th className="pb-2 font-medium">Preço</th>
                <th className="pb-2 font-medium">Vencimento</th>
                <th className="pb-2 font-medium">Estado</th>
                <th className="pb-2 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
              {membros.map((m) => {
                const plano = planos.find((p) => p.nome === m.plano);
                const dias = diasRestantes(m.vencimento);
                const aEditar = editandoId === m.id;
                return (
                  <React.Fragment key={m.id}>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700">
                      <td className="py-2.5 font-medium text-slate-900 dark:text-slate-100">{m.nome}</td>
                      <td className="py-2.5">
                        {aEditar ? (
                          <select value={novoPlano} onChange={(e) => setNovoPlano(e.target.value)}
                            className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                            {planos.map((p) => <option key={p.id}>{p.nome}</option>)}
                          </select>
                        ) : (
                          <span className="text-slate-600 dark:text-slate-300">{m.plano}</span>
                        )}
                      </td>
                      <td className="py-2.5 text-slate-600 dark:text-slate-300">{kz(plano?.preco || 0)}</td>
                      <td className="py-2.5 text-slate-600 dark:text-slate-300">
                        {m.vencimento || <span className="text-slate-400 dark:text-slate-500 italic">Sem subscrição</span>} {dias !== null && dias >= 0 && dias <= 5 && <span className="text-amber-500 text-xs ml-1">({dias}d)</span>}
                      </td>
                      <td className="py-2.5"><Pill estado={m.estado} /></td>
                      <td className="py-2.5 text-right">
                        {aEditar ? (
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => confirmarMudanca(m)} className="text-emerald-600 hover:text-emerald-700"><CheckCircle2 size={16} /></button>
                            <button onClick={() => setEditandoId(null)} className="text-slate-400 hover:text-red-500"><X size={16} /></button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-3">
                            {m.vencimentoAnterior && (
                              <button onClick={() => onCancelarRenovacao(m.id)} title={`Cancelar última alteração (voltar a ${m.vencimentoAnterior})`} className="text-red-400 hover:text-red-600">
                                <RotateCcw size={15} />
                              </button>
                            )}
                            {perfil === "administrador" && (
                              m.estado === "pausada" ? (
                                <>
                                  <button onClick={() => onCancelarPausa(m.id)} title="Desfazer pausa (foi engano — não conta dias)" className="text-amber-500 hover:text-amber-700">
                                    <RotateCcw size={15} />
                                  </button>
                                  <button onClick={() => onRetomar(m.id)} title={`Retomar (pausada desde ${m.dataPausa}) — soma os dias pausados ao vencimento`} className="text-blue-500 hover:text-blue-700">
                                    <PlayCircle size={15} />
                                  </button>
                                </>
                              ) : (
                                <button onClick={() => onPausar(m.id)} title="Pausar subscrição (ex.: atleta a trabalhar, viagem) sem perder os dias" className="text-slate-400 hover:text-blue-600">
                                  <PauseCircle size={15} />
                                </button>
                              )
                            )}
                            <button onClick={() => abrirEdicao(m)} title={m.vencimento ? "Renovar ou mudar de plano" : "Nova subscrição"} className="text-[#3F8F87] hover:text-[#2E6C66]" disabled={m.estado === "pausada"}>
                              {m.vencimento ? <RefreshCw size={15} className={m.estado === "pausada" ? "opacity-30" : ""} /> : <Plus size={15} />}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                    {aEditar && (
                      <tr className="bg-[#EAF5F4] dark:bg-slate-900">
                        <td colSpan={6} className="py-3 px-2">
                          <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
                            <label className="text-slate-500 dark:text-slate-400 font-medium">Data de início do novo período:</label>
                            <input
                              type="date"
                              value={dataInicio}
                              onChange={(e) => setDataInicio(e.target.value)}
                              className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]"
                            />
                            <span className="text-slate-400 dark:text-slate-500">
                              Se pagou hoje mas o plano só começa noutro dia, muda esta data.
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <label className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                              <input type="checkbox" checked={semPagamentoAgora} onChange={(e) => setSemPagamentoAgora(e.target.checked)} />
                              Não gerar recibo agora (já foi pago fora do sistema)
                            </label>
                            {!semPagamentoAgora && (
                              <select value={metodoPagamento} onChange={(e) => setMetodoPagamento(e.target.value)}
                                className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                                <option value="dinheiro">Dinheiro</option>
                                <option value="tpa">TPA</option>
                                <option value="express">MULTICAIXA Express</option>
                                <option value="referencia">Referência</option>
                                <option value="transferencia">Transferência</option>
                              </select>
                            )}
                          </div>
                          {!semPagamentoAgora && (
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">
                              Ao confirmar, gera-se logo o recibo correspondente — a subscrição fica sempre ligada à
                              parte financeira, e a receita conta nos relatórios.
                            </p>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              {membros.length === 0 && (
                <tr><td colSpan={6} className="py-6 text-center text-slate-400 dark:text-slate-500">Ainda não há membros inscritos.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {ultimoRecibo && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 ring-1 ring-emerald-200 dark:ring-emerald-800 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <p className="text-sm text-emerald-700 dark:text-emerald-400 flex-1">
            Recibo <strong>{ultimoRecibo.numero}</strong> gerado com sucesso — Plano <strong>{ultimoPlanoConfirmado}</strong>, {kz(ultimoRecibo.valor)}. Vê em
            Faturação / Recibos → Histórico completo.
          </p>
          <button onClick={() => setUltimoRecibo(null)} className="text-emerald-400 hover:text-emerald-600 shrink-0">
            <X size={16} />
          </button>
        </div>
      )}

      <p className="text-[11px] text-slate-400 dark:text-slate-500">
        Usa <RefreshCw size={11} className="inline mx-0.5" /> para renovar ou mudar de plano (com a data de início real) e <RotateCcw size={11} className="inline mx-0.5" /> para desfazer a última alteração feita.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------
// HISTÓRICO DE FATURAS E RECIBOS — todos os documentos já emitidos,
// pesquisável, para veres o que já se tirou e reimprimir (2ª via).
// ---------------------------------------------------------------------
function HistoricoFaturas({ faturas, onVer, onEliminar, perfil }) {
  const [pesquisa, setPesquisa] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("TODOS");
  const [aEliminar, setAEliminar] = useState(null);

  const filtrados = faturas.filter((f) => {
    const bateTipo = filtroTipo === "TODOS" || f.tipo === filtroTipo;
    const q = pesquisa.trim().toLowerCase();
    const bateTexto = !q || f.membro.nome.toLowerCase().includes(q) || f.numero.toLowerCase().includes(q);
    return bateTipo && bateTexto;
  });

  return (
    <Card title={`Histórico de documentos (${faturas.length})`}>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          placeholder="Pesquisar por nome ou número..."
          className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]"
        />
        <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
          <option value="TODOS">Todos os tipos</option>
          <option value="FATURA">Faturas</option>
          <option value="PROFORMA">Proformas</option>
          <option value="RECIBO">Recibos</option>
        </select>
      </div>

      {filtrados.length === 0 ? (
        <p className="text-sm text-slate-400 dark:text-slate-500">
          {faturas.length === 0 ? "Ainda não emitiste nenhum documento." : "Nenhum documento corresponde à pesquisa."}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700">
                <th className="pb-2 font-medium">Número</th>
                <th className="pb-2 font-medium">Tipo</th>
                <th className="pb-2 font-medium">Cliente</th>
                <th className="pb-2 font-medium">Data</th>
                <th className="pb-2 font-medium">Valor</th>
                <th className="pb-2 font-medium">Estado</th>
                <th className="pb-2 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
              {filtrados.map((f) => (
                <tr key={f.numero} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="py-2.5 font-medium text-slate-900 dark:text-slate-100">{f.numero}</td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-300">
                    {f.tipo === "FATURA" ? "Fatura" : f.tipo === "PROFORMA" ? "Proforma" : "Recibo"}
                  </td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-300">{f.membro.nome}</td>
                  <td className="py-2.5 text-slate-500 dark:text-slate-400">{f.data}</td>
                  <td className="py-2.5 font-medium text-slate-900 dark:text-slate-100">{kz(f.valor)}</td>
                  <td className="py-2.5">
                    {f.tipo === "FATURA" ? (
                      f.estado === "paga" ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">PAGA</span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">POR PAGAR</span>
                      )
                    ) : (
                      <span className="text-slate-300 dark:text-slate-600">—</span>
                    )}
                  </td>
                  <td className="py-2.5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => onVer(f)} title="Ver / reimprimir (2ª via)" className="text-slate-400 hover:text-[#3F8F87]">
                        <FileText size={15} />
                      </button>
                      {perfil === "administrador" && (
                        <button onClick={() => setAEliminar(f)} title="Eliminar documento" className="text-slate-400 hover:text-red-500">
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {aEliminar && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={() => setAEliminar(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <AlertTriangle className="text-red-500 mb-3" size={28} />
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Eliminar documento?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Vais eliminar <strong>{aEliminar.numero}</strong> ({aEliminar.membro.nome}, {kz(aEliminar.valor)}) do histórico.
              Esta ação não pode ser desfeita. O documento em papel/PDF já entregue não é afetado.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setAEliminar(null)} className="flex-1 ring-1 ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300 font-semibold py-2.5 rounded-lg text-sm">
                Cancelar
              </button>
              <button
                onClick={() => { onEliminar(aEliminar.numero); setAEliminar(null); }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg text-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

// Mostra o QR do TPA (se já foi carregado em Pagamentos Online) sempre que
// o método de pagamento "TPA" for escolhido — para o cliente escanear.
function MostrarQRTPA({ dadosGinasio }) {
  if (!dadosGinasio.qrTPA) {
    return (
      <p className="text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
        Ainda não carregaste o QR do teu terminal TPA (Configurações → Pagamentos Online).
      </p>
    );
  }
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 flex items-center gap-3">
      <img src={dadosGinasio.qrTPA} alt="QR do TPA" className="w-20 h-20 object-contain rounded-lg ring-1 ring-slate-200 dark:ring-slate-700 bg-white" />
      <p className="text-xs text-slate-500 dark:text-slate-400">Mostra este código ao cliente para pagar pelo TPA.</p>
    </div>
  );
}

function Faturacao({ membros, planos, produtos, dadosGinasio, faturas, onGerarFatura, onEliminarFatura, onEstenderSubscricao, perfil }) {
  const [aba, setAba] = useState("emitir"); // "emitir" | "historico"
  const [tipo, setTipo] = useState("FATURA"); // FATURA | PROFORMA | RECIBO
  const [membroId, setMembroId] = useState("");
  const [itensSelecionados, setItensSelecionados] = useState([]); // {referencia, descricao, qtd, precoUnit}
  const [metodoPagamento, setMetodoPagamento] = useState("dinheiro");
  const [contaBancariaId, setContaBancariaId] = useState("");
  const [faturaOrigemNumero, setFaturaOrigemNumero] = useState(null); // se este recibo quita uma fatura pendente
  const [gerada, setGerada] = useState(null);
  const docRef = useRef(null);

  const membro = membros.find((m) => m.id === Number(membroId));
  const plano = membro ? planos.find((p) => p.nome === membro.plano) : null;

  const adicionarMensalidade = () => {
    if (!membro || !plano) return;
    if (itensSelecionados.some((i) => i.referencia === `PLANO-${plano.nome.toUpperCase()}`)) return;
    setItensSelecionados((atual) => [
      ...atual,
      { referencia: `PLANO-${plano.nome.toUpperCase()}`, descricao: `Plano ${plano.nome} (${plano.duracaoDias} dias)`, qtd: 1, precoUnit: plano.preco },
    ]);
  };

  const alterarQtd = (idx, delta) => {
    setItensSelecionados((atual) =>
      atual.map((i, ix) => (ix === idx ? { ...i, qtd: Math.max(1, i.qtd + delta) } : i))
    );
  };

  const removerItem = (idx) => {
    setItensSelecionados((atual) => atual.filter((_, ix) => ix !== idx));
  };

  const total = itensSelecionados.reduce((s, i) => s + i.qtd * i.precoUnit, 0);

  const gerar = () => {
    if (!membro || itensSelecionados.length === 0) return;
    if (tipo === "RECIBO" && !metodoPagamento) return;
    const documento = {
      tipo,
      membro,
      itens: itensSelecionados.map((i) => ({ ...i, total: i.qtd * i.precoUnit })),
      valor: total,
      metodo: tipo === "RECIBO" ? metodoPagamento : undefined,
      contaBancariaId: tipo === "RECIBO" && (metodoPagamento === "transferencia" || metodoPagamento === "express") ? contaBancariaId : undefined,
      faturaOrigemNumero: tipo === "RECIBO" ? faturaOrigemNumero : undefined,
    };
    const gravado = onGerarFatura(documento); // devolve o documento já com número e data reais
    // Se o recibo inclui o item do plano do membro, a subscrição tem de ser
    // estendida — senão o dinheiro fica registado mas o vencimento nunca avança.
    console.log("DEBUG gerar(): tipo=" + tipo + " plano=" + JSON.stringify(plano) + " itensSelecionados=" + JSON.stringify(itensSelecionados));
    if (tipo === "RECIBO" && plano && itensSelecionados.some((i) => i.referencia === `PLANO-${plano.nome.toUpperCase()}`)) {
      console.log("DEBUG: condicao passou, a chamar onEstenderSubscricao");
      onEstenderSubscricao(membro.id, plano.nome, gravado?.numero);
    } else {
      console.log("DEBUG: condicao FALHOU");
    }
    setGerada(gravado);
  };

  const novoDocumento = () => {
    setGerada(null);
    setItensSelecionados([]);
    setMembroId("");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setAba("emitir")}
          className={`text-sm font-semibold px-4 py-2 rounded-lg ring-1 ${aba === "emitir" ? "bg-[#3F8F87] text-white ring-[#3F8F87]" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300"}`}
        >
          Emitir documento
        </button>
        <button
          onClick={() => setAba("historico")}
          className={`text-sm font-semibold px-4 py-2 rounded-lg ring-1 ${aba === "historico" ? "bg-[#3F8F87] text-white ring-[#3F8F87]" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300"}`}
        >
          Histórico completo ({faturas.length})
        </button>
      </div>

      {aba === "historico" && (
        <HistoricoFaturas
          faturas={faturas}
          perfil={perfil}
          onEliminar={onEliminarFatura}
          onVer={(f) => {
            setGerada(f);
            setAba("emitir");
          }}
        />
      )}

      {aba === "emitir" && (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card title="Gerar documento">
        {!gerada ? (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block">Tipo de documento</label>
              <div className="grid grid-cols-3 gap-2">
                {["FATURA", "PROFORMA", "RECIBO"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTipo(t)}
                    className={`text-xs font-semibold py-2 rounded-lg ring-1 ${
                      tipo === t ? "bg-[#3F8F87] text-white ring-[#3F8F87]" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {t === "FATURA" ? "Fatura" : t === "PROFORMA" ? "Proforma" : "Recibo"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Membro / Cliente</label>
              <select value={membroId} onChange={(e) => { setMembroId(e.target.value); setItensSelecionados([]); }}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                <option value="">Selecionar membro...</option>
                {membros.map((m) => <option key={m.id} value={m.id}>{m.nome} — {m.numero}</option>)}
              </select>
            </div>

            {membro && (
              <>
                {plano ? (
                  <button
                    onClick={adicionarMensalidade}
                    className="w-full text-sm font-semibold border border-[#8FC9C3] text-[#3F8F87] rounded-lg py-2 hover:bg-[#EAF5F4] dark:hover:bg-slate-700"
                  >
                    + Adicionar plano do membro ({membro.plano} — {kz(plano.preco)})
                  </button>
                ) : (
                  <div className="text-sm bg-amber-50 dark:bg-amber-900/20 ring-1 ring-amber-200 dark:ring-amber-800 rounded-lg p-3">
                    <p className="text-amber-700 dark:text-amber-400 font-medium">
                      Este membro não tem um plano válido associado
                      {membro.plano ? ` ("${membro.plano}" já não existe na lista de Planos)` : " (ainda não subscreveu nenhum plano)"}.
                    </p>
                    <p className="text-amber-600 dark:text-amber-500 text-xs mt-1">
                      Vai a <strong>Subscrições</strong> e escolhe/confirma o plano dele — isso já gera o recibo
                      diretamente, sem precisares de vir aqui.
                    </p>
                  </div>
                )}
                <p className="text-[11px] text-slate-400 dark:text-slate-500 -mt-1">
                  Venda de produtos do stock faz-se em "Vendas (POS)" — aqui é só para o plano/mensalidade do membro.
                </p>

                {itensSelecionados.length > 0 && (
                  <div className="divide-y divide-slate-50 dark:divide-slate-700 border-t border-slate-100 dark:border-slate-700 pt-2">
                    {itensSelecionados.map((item, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between text-sm">
                        <div>
                          <p className="text-slate-700 dark:text-slate-200">{item.descricao}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <button onClick={() => alterarQtd(idx, -1)} className="w-5 h-5 rounded ring-1 ring-slate-200 dark:ring-slate-600 text-xs">−</button>
                            <span className="text-xs w-4 text-center">{item.qtd}</span>
                            <button onClick={() => alterarQtd(idx, 1)} className="w-5 h-5 rounded ring-1 ring-slate-200 dark:ring-slate-600 text-xs">+</button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900 dark:text-slate-100">{kz(item.qtd * item.precoUnit)}</span>
                          <button onClick={() => removerItem(idx)} className="text-slate-300 hover:text-red-500"><X size={14} /></button>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between pt-2 text-sm font-bold">
                      <span>Total</span>
                      <span className="text-[#3F8F87]">{kz(total)}</span>
                    </div>
                  </div>
                )}

                {tipo === "RECIBO" && (
                  <div>
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Onde foi feito o pagamento?</label>
                    <select value={metodoPagamento} onChange={(e) => { setMetodoPagamento(e.target.value); setContaBancariaId(""); }}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                      <option value="dinheiro">Dinheiro</option>
                      <option value="tpa">TPA</option>
                      <option value="express">MULTICAIXA Express</option>
                      <option value="referencia">Referência</option>
                      <option value="transferencia">Transferência bancária</option>
                    </select>
                  </div>
                )}

                {tipo === "RECIBO" && (metodoPagamento === "transferencia" || metodoPagamento === "express") && (
                  <div>
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Qual {metodoPagamento === "express" ? "número Express" : "conta bancária"} recebeu?
                    </label>
                    <select value={contaBancariaId} onChange={(e) => setContaBancariaId(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                      <option value="">Selecionar...</option>
                      {obterContasBancarias(dadosGinasio)
                        .filter((c) => (metodoPagamento === "express" ? c.tipo === "express" : c.tipo === "iban"))
                        .map((c) => <option key={c.id} value={c.id}>{c.banco}</option>)}
                    </select>
                  </div>
                )}

                {tipo === "RECIBO" && metodoPagamento === "tpa" && <MostrarQRTPA dadosGinasio={dadosGinasio} />}

                <button
                  onClick={gerar}
                  disabled={itensSelecionados.length === 0}
                  className="w-full bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:text-slate-400 text-white font-semibold py-2.5 rounded-lg text-sm"
                >
                  Gerar {tipo === "FATURA" ? "fatura" : tipo === "PROFORMA" ? "proforma" : "recibo"}
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <CheckCircle2 className="mx-auto text-emerald-500 mb-3" size={36} />
            <p className="font-semibold text-slate-900 dark:text-slate-100">Documento gerado — {gerada.numero}</p>
            <button onClick={novoDocumento} className="mt-4 text-sm font-semibold text-[#3F8F87] hover:underline">
              Gerar outro documento
            </button>
          </div>
        )}

        {faturas.length > 0 && (
          <div className="mt-5">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Documentos emitidos recentemente</p>
            <div className="divide-y divide-slate-50 dark:divide-slate-700">
              {faturas.slice(0, 6).map((f) => (
                <div key={f.numero} className="flex items-center justify-between py-2 text-sm">
                  <div>
                    <span className="text-slate-600 dark:text-slate-300">{f.numero} · {f.membro.nome}</span>
                    {f.tipo === "FATURA" && f.estado !== "paga" && (
                      <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">
                        POR PAGAR
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900 dark:text-slate-100">{kz(f.valor)}</span>
                    <button onClick={() => setGerada(f)} title="Ver / reimprimir (2ª via)" className="text-slate-400 hover:text-[#3F8F87]">
                      <FileText size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card title="Faturas por pagar (por cliente)">
        {(() => {
          const pendentes = faturas.filter((f) => f.tipo === "FATURA" && f.estado !== "paga");
          if (pendentes.length === 0) {
            return <p className="text-sm text-slate-400 dark:text-slate-500">Sem faturas pendentes de pagamento.</p>;
          }
          return (
            <div className="divide-y divide-slate-50 dark:divide-slate-700">
              {pendentes.map((f) => (
                <div key={f.numero} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">{f.membro.nome}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{f.numero} · {f.data}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#3F8F87]">{kz(f.valor)}</span>
                    <button
                      onClick={() => {
                        setTipo("RECIBO");
                        setMembroId(String(f.membro.id));
                        setItensSelecionados(f.itens.map(({ referencia, descricao, qtd, precoUnit }) => ({ referencia, descricao, qtd, precoUnit })));
                        setFaturaOrigemNumero(f.numero);
                        setGerada(null);
                      }}
                      className="text-xs font-semibold text-white bg-gradient-to-b from-[#4FA69D] to-[#357A73] px-3 py-1.5 rounded-lg"
                    >
                      Gerar recibo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </Card>

      <Card title="Pré-visualização">
        {!gerada ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">Gera um documento para veres a pré-visualização.</p>
        ) : (
          <div>
            <div className="ring-1 ring-slate-200 rounded-xl overflow-hidden">
              <DocumentoFinanceiro
                docRef={docRef}
                tipo={gerada.tipo === "FATURA" ? "FATURA" : gerada.tipo === "PROFORMA" ? "FATURA PROFORMA" : "RECIBO"}
                numero={gerada.numero}
                data={gerada.data}
                hora={gerada.hora}
                cliente={gerada.membro}
                itens={gerada.itens}
                dadosGinasio={dadosGinasio}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => imprimirElemento(`${gerada.numero}`, docRef.current)}
                className="flex-1 border border-slate-200 dark:border-slate-600 rounded-lg py-2 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                PDF / Imprimir
              </button>
              <a
                href={linkWhatsApp(
                  gerada.membro.telefone,
                  `Olá ${gerada.membro.nome.split(" ")[0]}, segue o resumo do seu documento ${gerada.numero} (${dadosGinasio.nome}):\n\n` +
                    gerada.itens.map((i) => `• ${i.descricao} x${i.qtd} — ${kz(i.total)}`).join("\n") +
                    `\n\nTotal: ${kz(gerada.valor)}\nObrigado pela preferência!`
                )}
                target="_blank" rel="noreferrer"
                className="flex-1 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white rounded-lg py-2 text-sm font-semibold text-center"
              >
                Enviar por WhatsApp
              </a>
            </div>
          </div>
        )}
      </Card>
    </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// NOTIFICAÇÕES AUTOMÁTICAS
// ---------------------------------------------------------------------
// O prazo de aviso depende da duração do plano — um plano mensal avisa com
// mais antecedência (5 dias) do que um semanal (3 dias) ou diário (1 dia),
// porque faz pouco sentido avisar alguém com plano de 1 dia com 5 dias de
// antecedência.
function diasDeAvisoParaPlano(plano) {
  const duracao = plano?.duracaoDias ?? 30;
  if (duracao >= 20) return 5; // mensal ou mais longo
  if (duracao >= 5) return 3; // semanal
  return 1; // diário / muito curto
}

function calcularNotificacoes(membros, planos) {
  // Compara só as DATAS (sem hora), para o resultado não variar consoante a
  // hora do dia em que alguém abre o site — antes disto, "vencer daqui a 5
  // dias" podia contar como 4 dias se já fosse tarde no dia de hoje.
  const agora = new Date();
  const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  return membros
    .filter((m) => m.vencimento) // ignora membros sem subscrição ativa — não têm vencimento para avisar
    .map((m) => {
      const [ano, mes, dia] = m.vencimento.split("-").map(Number);
      const venc = new Date(ano, mes - 1, dia);
      const dias = Math.round((venc - hoje) / (1000 * 60 * 60 * 24));
      const plano = planos.find((p) => p.nome === m.plano);
      const diasAviso = diasDeAvisoParaPlano(plano);
      let tipo = null;
      let mensagem = "";
      if (dias === diasAviso) {
        tipo = "aviso";
        mensagem = `Olá ${m.nome.split(" ")[0]}, a sua mensalidade da Catumbela Gym vence em ${diasAviso} dia${diasAviso > 1 ? "s" : ""} (${m.vencimento}).`;
      } else if (dias === 0) {
        tipo = "hoje";
        mensagem = `Olá ${m.nome.split(" ")[0]}, a sua mensalidade vence hoje. Regularize para continuar ativo.`;
      } else if (dias < 0) {
        tipo = "vencido";
        mensagem = `Olá ${m.nome.split(" ")[0]}, a sua mensalidade está vencida desde ${m.vencimento}. Regularize o pagamento para continuar a utilizar o ginásio.`;
      }
      return tipo ? { membro: m, tipo, mensagem, dias } : null;
    })
    .filter(Boolean);
}

const ESTILO_NOTIFICACAO = {
  aviso: { cor: "text-amber-600 bg-amber-50 dark:bg-amber-900/20", rotulo: "Vence em breve" },
  hoje: { cor: "text-[#3F8F87] bg-[#EAF5F4] dark:bg-slate-700", rotulo: "Vence hoje" },
  vencido: { cor: "text-red-600 bg-red-50 dark:bg-red-900/20", rotulo: "Vencido" },
};

// ---------------------------------------------------------------------
// APROVAÇÃO DE PAGAMENTOS (transferências pendentes)
// ---------------------------------------------------------------------
function AprovacaoPagamentos({ pendentes, onAprovar, onRejeitar }) {
  const [verComprovativo, setVerComprovativo] = useState(null);
  // Só pagamentos submetidos pelos próprios membros (self-service) precisam de
  // aprovação aqui — um pagamento registado presencialmente por um funcionário
  // já foi verificado por essa pessoa na hora, não fica pendente.
  const pendentesDeMembro = pendentes.filter((p) => p.origem === "membro");

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 dark:bg-amber-900/20 ring-1 ring-amber-200 dark:ring-amber-800 rounded-xl p-4 flex items-start gap-3">
        <ShieldCheck size={18} className="text-amber-600 mt-0.5 shrink-0" />
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Quando um membro envia o comprovativo de uma transferência diretamente na área dele (self-service), o
          pagamento fica <strong>pendente</strong> aqui até seres aprovado ou rejeitado. A mensalidade só é
          atualizada e o recibo só é emitido depois da aprovação — tudo fica registado na Auditoria.
        </p>
      </div>

      {pendentesDeMembro.length === 0 ? (
        <Card><p className="text-sm text-slate-400 dark:text-slate-500">Sem pagamentos de membros pendentes de aprovação.</p></Card>
      ) : (
        <div className="space-y-3">
          {pendentesDeMembro.map((p) => (
            <Card key={p.id}>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setVerComprovativo(p.comprovativo)}
                  className="shrink-0 w-full sm:w-32 h-32 rounded-lg overflow-hidden ring-1 ring-slate-200 dark:ring-slate-600"
                >
                  <img src={p.comprovativo} alt="Comprovativo" className="w-full h-full object-cover" />
                </button>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{p.membro.nome}</p>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">
                      PENDENTE
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{p.membro.numero}</p>
                  <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                    <p><span className="text-slate-500 dark:text-slate-400">Valor:</span> <span className="font-bold text-[#3F8F87]">{kz(p.valor)}</span></p>
                    <p><span className="text-slate-500 dark:text-slate-400">Via:</span> {p.destino === "iban" ? "IBAN" : "Número de telefone"}</p>
                    <p><span className="text-slate-500 dark:text-slate-400">Submetido por:</span> {p.submetidoPor}</p>
                    <p><span className="text-slate-500 dark:text-slate-400">Data:</span> {p.data}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => onAprovar(p)}
                      className="flex-1 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white text-sm font-semibold py-2 rounded-lg"
                    >
                      Aprovar
                    </button>
                    <button
                      onClick={() => onRejeitar(p)}
                      className="flex-1 ring-1 ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300 text-sm font-semibold py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      Rejeitar
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {verComprovativo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setVerComprovativo(null)}>
          <img src={verComprovativo} alt="Comprovativo" className="max-w-full max-h-[85vh] rounded-lg" />
        </div>
      )}
    </div>
  );
}

function Notificacoes({ membros, planos }) {
  const notificacoes = calcularNotificacoes(membros, planos);
  const [enviados, setEnviados] = useState(() => new Set()); // sessão atual, para acompanhar o progresso ao percorrer a lista

  const marcarEnviado = (id) => setEnviados((atual) => new Set(atual).add(id));

  const porEnviar = notificacoes.filter((n) => !enviados.has(n.membro.id));

  return (
    <div className="space-y-4">
      <div className="bg-[#EAF5F4] dark:bg-slate-800 ring-1 ring-[#BFE4E1] dark:ring-slate-700 rounded-xl p-4 flex items-start gap-3">
        <Bell size={18} className="text-[#3F8F87] mt-0.5 shrink-0" />
        <p className="text-sm text-slate-600 dark:text-slate-300">
          O sistema avisa automaticamente <strong>5 dias antes</strong> do vencimento, <strong>no dia</strong> e
          <strong> depois</strong> de a mensalidade vencer. Clica em cada contacto para abrir o WhatsApp/SMS já
          escrito — o sistema marca como "enviado" para acompanhares o progresso ao percorrer a lista.
        </p>
      </div>

      <Card title={`${notificacoes.length} notificações ativas`} action={
        porEnviar.length > 0 && (
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">{porEnviar.length} por contactar</span>
        )
      }>
        {notificacoes.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">Sem notificações pendentes. 🎉</p>
        ) : (
          <div className="divide-y divide-slate-50 dark:divide-slate-700">
            {notificacoes.map((n) => {
              const jaEnviado = enviados.has(n.membro.id);
              return (
                <div key={n.membro.id} className={`flex items-center justify-between py-3 ${jaEnviado ? "opacity-40" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${ESTILO_NOTIFICACAO[n.tipo].cor}`}>
                      {ESTILO_NOTIFICACAO[n.tipo].rotulo}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{n.membro.nome}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{n.membro.numero} · {n.membro.vencimento}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {jaEnviado ? (
                      <span className="text-emerald-600 flex items-center gap-1 text-xs font-semibold"><CheckCircle2 size={14} /> Enviado</span>
                    ) : (
                      <>
                        <a href={linkWhatsApp(n.membro.telefone, n.mensagem)} target="_blank" rel="noreferrer"
                          onClick={() => marcarEnviado(n.membro.id)} className="text-emerald-600 hover:text-emerald-700">
                          <MessageCircle size={16} />
                        </a>
                        <a href={linkSMS(n.membro.telefone, n.mensagem)}
                          onClick={() => marcarEnviado(n.membro.id)} className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                          <Phone size={16} />
                        </a>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------
// AUDITORIA
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// DADOS DO GINÁSIO
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// PAGAMENTOS ONLINE (ativação Multicaixa Express / Referência)
// ---------------------------------------------------------------------
function PagamentosOnline({ dados, onSalvar }) {
  const expressAtivado = dados.expressAtivado || false;
  const referenciaAtivada = dados.referenciaAtivada || false;
  const contactoAtivacao = "+244 923 456 789"; // troca pelo contacto real de suporte/comercial

  const alternar = (chave) => {
    onSalvar({ ...dados, [chave]: !dados[chave] });
  };

  return (
    <div className="space-y-4 max-w-2xl">
      {!expressAtivado && !referenciaAtivada && (
        <div className="bg-amber-50 dark:bg-amber-900/20 ring-1 ring-amber-200 dark:ring-amber-800 rounded-xl p-4 flex items-start gap-3">
          <ShieldCheck size={20} className="text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-amber-700 dark:text-amber-400">Pagamentos Online não ativados</p>
            <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
              A integração (MULTICAIXA Express e Referência Bancária) precisa de ser ativada com a EMIS ou o teu
              banco antes de poderes ligar aqui. Contacta <strong>{contactoAtivacao}</strong> para tratar da adesão
              como comerciante — depois disso, ativa aqui os métodos que já tens disponíveis.
            </p>
          </div>
        </div>
      )}

      <Card>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
            <Smartphone size={22} className="text-orange-500" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-900 dark:text-slate-100">MULTICAIXA Express</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Permite pagamentos diretos com aprovação por PIN no telemóvel do membro.
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.sibsint.mcxwallet"
                target="_blank" rel="noreferrer"
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 ring-1 ring-orange-200 dark:ring-orange-800 px-2.5 py-1.5 rounded-lg flex items-center gap-1"
              >
                <Smartphone size={12} /> Abrir na Google Play
              </a>
              <a
                href="https://apps.apple.com/us/app/multicaixa-express/id1433675921"
                target="_blank" rel="noreferrer"
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 ring-1 ring-orange-200 dark:ring-orange-800 px-2.5 py-1.5 rounded-lg flex items-center gap-1"
              >
                <Smartphone size={12} /> Abrir na App Store
              </a>
            </div>

            <button
              onClick={() => alternar("expressAtivado")}
              className="flex items-center gap-2 mt-3 text-sm font-medium"
            >
              {expressAtivado ? (
                <ToggleRight size={28} className="text-[#3F8F87]" />
              ) : (
                <ToggleLeft size={28} className="text-slate-300 dark:text-slate-600" />
              )}
              <span className={expressAtivado ? "text-[#3F8F87]" : "text-slate-400 dark:text-slate-500"}>
                {expressAtivado ? "Ativado" : "Desativado"}
              </span>
            </button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
            <Landmark size={22} className="text-slate-600 dark:text-slate-300" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-900 dark:text-slate-100">Pagamento por Referência</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Gera Entidade e Referência automatizadas para pagamento em qualquer caixa eletrónico ou Internet Banking.
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              <a
                href="https://multicaixa.ao/pt/"
                target="_blank" rel="noreferrer"
                className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 ring-1 ring-slate-200 dark:ring-slate-600 px-2.5 py-1.5 rounded-lg flex items-center gap-1"
              >
                <Landmark size={12} /> Portal MULTICAIXA (aderir)
              </a>
            </div>

            <button
              onClick={() => alternar("referenciaAtivada")}
              className="flex items-center gap-2 mt-3 text-sm font-medium"
            >
              {referenciaAtivada ? (
                <ToggleRight size={28} className="text-[#3F8F87]" />
              ) : (
                <ToggleLeft size={28} className="text-slate-300 dark:text-slate-600" />
              )}
              <span className={referenciaAtivada ? "text-[#3F8F87]" : "text-slate-400 dark:text-slate-500"}>
                {referenciaAtivada ? "Ativado" : "Desativado"}
              </span>
            </button>
          </div>
        </div>
      </Card>

      <p className="text-[11px] text-slate-400 dark:text-slate-500">
        Estes interruptores só controlam se as opções aparecem para os membros — a ligação real de processamento de
        pagamento continua a precisar de credenciais próprias da EMIS/banco. Os links acima abrem a app/portal oficial
        para consultares ou fazeres a adesão como comerciante.
      </p>

      <QRTPAEditor dados={dados} onSalvar={onSalvar} />
    </div>
  );
}

// QR do TPA — carrega a imagem do código QR do teu terminal TPA físico.
// Fica disponível para mostrar ao cliente sempre que o método "TPA" for
// escolhido em Faturação ou no POS.
function QRTPAEditor({ dados, onSalvar }) {
  const inputRef = useRef(null);
  const [aCarregar, setACarregar] = useState(false);

  const carregar = (e) => {
    const ficheiro = e.target.files?.[0];
    if (!ficheiro) return;
    setACarregar(true);
    comprimirImagem(ficheiro, 500, 0.9) // QR precisa de ficar nítido para ler bem
      .then((dataUrl) => onSalvar({ ...dados, qrTPA: dataUrl }))
      .catch(() => alert("Não foi possível processar esta imagem. Tenta outra."))
      .finally(() => setACarregar(false));
  };

  return (
    <Card title={<span className="flex items-center gap-2"><QrCode size={16} className="text-[#3F8F87]" /> QR do TPA</span>}>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Se o teu terminal TPA tiver um código QR próprio (ex.: para pagamento por telemóvel), carrega aqui uma foto
        dele. Fica disponível para mostrar ao cliente sempre que escolheres "TPA" como método de pagamento, em
        Faturação ou no POS.
      </p>
      <div className="flex items-center gap-4">
        <div className="w-28 h-28 rounded-xl bg-slate-100 dark:bg-slate-700 ring-1 ring-slate-200 dark:ring-slate-600 flex items-center justify-center overflow-hidden shrink-0">
          {dados.qrTPA ? (
            <img src={dados.qrTPA} alt="QR do TPA" className="w-full h-full object-contain p-1" />
          ) : (
            <QrCode size={32} className="text-slate-300 dark:text-slate-600" />
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={aCarregar}
            className="text-sm font-semibold text-[#3F8F87] hover:underline disabled:opacity-50"
          >
            {aCarregar ? "A processar..." : dados.qrTPA ? "Trocar imagem do QR" : "Carregar imagem do QR"}
          </button>
          <input ref={inputRef} type="file" accept="image/*" onChange={carregar} className="hidden" />
          {dados.qrTPA && (
            <button
              type="button"
              onClick={() => onSalvar({ ...dados, qrTPA: null })}
              className="block text-xs text-red-500 hover:underline mt-1.5"
            >
              Remover
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------
// EDITOR DE CONTAS BANCÁRIAS/EXPRESS — suporta várias contas, em vários
// bancos, todas disponíveis para os membros escolherem ao pagar.
// ---------------------------------------------------------------------
function ContasBancariasEditor({ form, setForm, tocouNoFormulario }) {
  const [showForm, setShowForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const vazio = { tipo: "iban", banco: "", titular: form.nome || "", iban: "", telefone: "", moeda: "AOA", swift: "" };
  const [novo, setNovo] = useState(vazio);

  const contas = form.contasBancarias || [];

  const abrirNova = () => {
    setEditandoId(null);
    setNovo(vazio);
    setShowForm(true);
  };

  const abrirEdicao = (c) => {
    setEditandoId(c.id);
    setNovo(c);
    setShowForm(true);
  };

  const guardar = () => {
    if (!novo.banco) return;
    tocouNoFormulario.current = true;
    if (editandoId) {
      setForm((f) => ({ ...f, contasBancarias: (f.contasBancarias || []).map((c) => (c.id === editandoId ? { ...novo, id: editandoId } : c)) }));
    } else {
      const id = Math.max(0, ...contas.map((c) => (typeof c.id === "number" ? c.id : 0))) + 1;
      setForm((f) => ({ ...f, contasBancarias: [...(f.contasBancarias || []), { ...novo, id }] }));
    }
    setShowForm(false);
  };

  const remover = (id) => {
    tocouNoFormulario.current = true;
    setForm((f) => ({ ...f, contasBancarias: (f.contasBancarias || []).filter((c) => c.id !== id) }));
  };

  return (
    <Card
      title={<span className="flex items-center gap-2"><Landmark size={16} className="text-[#3F8F87]" /> Contas bancárias / Express (aparecem nos recibos e faturas)</span>}
      action={
        <button onClick={abrirNova} className="flex items-center gap-1.5 text-xs font-semibold text-[#3F8F87] hover:underline">
          <Plus size={14} /> Nova conta
        </button>
      }
    >
      {contas.length === 0 ? (
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Ainda não tens nenhuma conta configurada. Adiciona pelo menos uma para os membros poderem pagar por
          transferência ou MULTICAIXA Express.
        </p>
      ) : (
        <div className="space-y-2">
          {contas.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-3 rounded-xl ring-1 ring-slate-100 dark:ring-slate-700">
              <div className="flex items-center gap-3">
                {c.tipo === "iban" ? <Landmark size={18} className="text-slate-500 dark:text-slate-400" /> : <Smartphone size={18} className="text-orange-500" />}
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{c.banco}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {c.tipo === "iban" ? c.iban : c.telefone} · {c.titular}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => abrirEdicao(c)} className="text-slate-400 hover:text-[#3F8F87]"><Pencil size={14} /></button>
                <button onClick={() => remover(c.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={() => setShowForm(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">{editandoId ? "Editar conta" : "Nova conta bancária"}</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setNovo({ ...novo, tipo: "iban" })}
                  className={`text-sm font-semibold py-2 rounded-lg ring-1 ${novo.tipo === "iban" ? "bg-[#3F8F87] text-white ring-[#3F8F87]" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300"}`}>
                  IBAN / Banco
                </button>
                <button type="button" onClick={() => setNovo({ ...novo, tipo: "express" })}
                  className={`text-sm font-semibold py-2 rounded-lg ring-1 ${novo.tipo === "express" ? "bg-orange-500 text-white ring-orange-500" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300"}`}>
                  MULTICAIXA Express
                </button>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{novo.tipo === "iban" ? "Nome do banco" : "Nome (ex.: Express — Recepção)"}</label>
                <input value={novo.banco} onChange={(e) => setNovo({ ...novo, banco: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Titular</label>
                <input value={novo.titular} onChange={(e) => setNovo({ ...novo, titular: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              {novo.tipo === "iban" ? (
                <>
                  <div>
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400">IBAN</label>
                    <input value={novo.iban} onChange={(e) => setNovo({ ...novo, iban: e.target.value })}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Moeda</label>
                      <input value={novo.moeda} onChange={(e) => setNovo({ ...novo, moeda: e.target.value })}
                        className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 dark:text-slate-400">SWIFT (opcional)</label>
                      <input value={novo.swift} onChange={(e) => setNovo({ ...novo, swift: e.target.value })}
                        className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Nº de telefone (Express)</label>
                  <input value={novo.telefone} onChange={(e) => setNovo({ ...novo, telefone: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                </div>
              )}
              <button type="button" onClick={guardar} className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg mt-2">
                <Save size={16} /> {editandoId ? "Guardar alterações" : "Adicionar conta"}
              </button>
            </div>
          </div>
        </div>
      )}
      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3">
        Estas contas ficam automaticamente disponíveis para os membros escolherem ao pagar por transferência, e
        aparecem nos recibos e faturas.
      </p>
    </Card>
  );
}

function DadosGinasio({ dados, onSalvar, contaAtual }) {
  const [form, setForm] = useState(dados);
  const [guardado, setGuardado] = useState(false);
  const tocouNoFormulario = useRef(false);

  // Se os dados chegarem/mudarem vindos do Supabase (ex.: sincronização
  // inicial ainda a decorrer) e a pessoa ainda não tiver mexido em nada
  // neste formulário, atualiza — evita ficar preso a uma versão desatualizada.
  useEffect(() => {
    if (!tocouNoFormulario.current) setForm(dados);
  }, [dados]);

  const carregarLogo = (e) => {
    const ficheiro = e.target.files?.[0];
    if (!ficheiro) return;
    tocouNoFormulario.current = true;
    comprimirImagem(ficheiro, 600, 0.85) // logótipo precisa de ficar nítido, mas não gigante
      .then((dataUrl) => setForm((f) => ({ ...f, logo: dataUrl })))
      .catch(() => alert("Não foi possível processar esta imagem. Tenta outra (formatos HEIC do iPhone podem não funcionar — usa JPG ou PNG)."));
  };


  const submeter = (e) => {
    e.preventDefault();
    onSalvar(form);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2500);
  };

  const campo = (chave, rotulo, placeholder = "") => (
    <div>
      <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{rotulo}</label>
      <input
        value={form[chave]}
        onChange={(e) => {
          tocouNoFormulario.current = true;
          setForm({ ...form, [chave]: e.target.value });
        }}
        placeholder={placeholder}
        className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]"
      />
    </div>
  );

  return (
    <div className="space-y-5 max-w-2xl">
    <form onSubmit={submeter} className="space-y-5">
      <Card title={<span className="flex items-center gap-2"><ImagePlus size={16} className="text-[#3F8F87]" /> Logótipo</span>}>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-700 ring-1 ring-slate-200 dark:ring-slate-600 flex items-center justify-center overflow-hidden shrink-0">
            <img src={form.logo || LOGO_BASE64} alt="Logótipo" className="w-full h-full object-contain p-2" />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#3F8F87] cursor-pointer">
              Carregar novo logótipo
              <input type="file" accept="image/*" onChange={carregarLogo} className="hidden" />
            </label>
            {form.logo !== dados.logo && (
              <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1">
                Novo logótipo escolhido — não te esqueças de "Guardar dados" no fim da página.
              </p>
            )}
          </div>
        </div>
      </Card>

      <Card title={<span className="flex items-center gap-2"><DoorOpen size={16} className="text-[#3F8F87]" /> QR fixo de check-in (entrada)</span>}>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
          Imprime e cola este QR à entrada do ginásio. Os membros apontam a câmara do telemóvel, abrem o sistema na
          própria conta, e fazem check-in sozinhos em "Início" — sem precisar que a receção leia o QR de cada um.
        </p>
        <div>
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Endereço do site (ex.: o link do Vercel)</label>
          <input
            value={form.siteUrl || ""}
            onChange={(e) => { tocouNoFormulario.current = true; setForm({ ...form, siteUrl: e.target.value }); }}
            placeholder="https://catumbela-gym.vercel.app"
            className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]"
          />
        </div>
        {form.siteUrl ? (
          <div className="flex flex-col items-center gap-2 mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
            <QRCodeSVG valor={form.siteUrl} tamanho={160} />
            <p className="text-xs text-slate-400 dark:text-slate-500">Aponta a câmara para abrir o sistema</p>
          </div>
        ) : (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">Escreve o endereço do site acima para gerar o QR.</p>
        )}
      </Card>

      <Card title={<span className="flex items-center gap-2"><Building2 size={16} className="text-[#3F8F87]" /> Dados da empresa</span>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {campo("nome", "Nome do ginásio")}
          {campo("nif", "Nº de Contribuinte (NIF)")}
          {campo("morada", "Morada / Endereço")}
          {campo("cidade", "Cidade")}
          {campo("telefone", "Telefone")}
          {campo("email", "E-mail")}
        </div>
      </Card>

      <ContasBancariasEditor form={form} setForm={setForm} tocouNoFormulario={tocouNoFormulario} />

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold px-6 py-2.5 rounded-lg text-sm">
          <Save size={16} /> Guardar dados
        </button>
        {guardado && <span className="text-sm text-emerald-600 font-medium">Guardado com sucesso ✔</span>}
      </div>
    </form>

    <CopiaSeguranca dadosGinasio={dados} onSalvarFrequencia={(freq) => onSalvar({ ...dados, frequenciaBackup: freq })} />
    <ReiniciarSite contaAtual={contaAtual} />
    </div>
  );
}

// ---------------------------------------------------------------------
// MUDAR PALAVRA-PASSE (usado pelo próprio utilizador — ninguém mais tem
// acesso à palavra-passe de outra pessoa, nem sequer o administrador)
// ---------------------------------------------------------------------
function FormMudarSenha({ onMudar }) {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const submeter = (e) => {
    e.preventDefault();
    setSucesso(false);
    if (novaSenha.length < 6) {
      setErro("A nova palavra-passe deve ter pelo menos 6 caracteres.");
      return;
    }
    if (novaSenha !== confirmar) {
      setErro("As palavras-passe não coincidem.");
      return;
    }
    const ok = onMudar(senhaAtual, novaSenha);
    if (!ok) {
      setErro("A palavra-passe atual está incorreta.");
      return;
    }
    setErro("");
    setSucesso(true);
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmar("");
  };

  return (
    <form onSubmit={submeter} className="space-y-3">
      <div>
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Palavra-passe atual</label>
        <input type="password" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)}
          className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
      </div>
      <div>
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Nova palavra-passe</label>
        <input type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)}
          className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
      </div>
      <div>
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Confirmar nova palavra-passe</label>
        <input type="password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)}
          className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
      </div>
      {erro && <p className="text-xs text-red-500">{erro}</p>}
      {sucesso && <p className="text-xs text-emerald-600 font-medium">Palavra-passe atualizada com sucesso ✔</p>}
      <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg">
        <KeyRound size={16} /> Mudar palavra-passe
      </button>
    </form>
  );
}

// Ecrã "Meu Perfil" — para Administrador, Recepcionista e Personal Trainer
function MeuPerfil({ contaAtual, onMudarSenha }) {
  return (
    <div className="max-w-md space-y-4">
      <Card title="Os meus dados">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-1.5 border-b border-slate-50 dark:border-slate-700">
            <span className="text-slate-400 dark:text-slate-500">Nome</span>
            <span className="font-medium text-slate-900 dark:text-slate-100">{contaAtual?.nome}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-50 dark:border-slate-700">
            <span className="text-slate-400 dark:text-slate-500">E-mail</span>
            <span className="font-medium text-slate-900 dark:text-slate-100">{contaAtual?.email}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-slate-400 dark:text-slate-500">Perfil</span>
            <span className="font-medium text-slate-900 dark:text-slate-100">{ROTULO_PERFIL[contaAtual?.perfil]}</span>
          </div>
        </div>
      </Card>
      <Card title={<span className="flex items-center gap-2"><KeyRound size={16} className="text-[#3F8F87]" /> Mudar a minha palavra-passe</span>}>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
          Só tu conheces a tua palavra-passe — nem o administrador consegue vê-la.
        </p>
        <FormMudarSenha onMudar={onMudarSenha} />
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------
// MENSAGENS — chat interno entre atletas/recepção/PT e o administrador.
// Cada participante (membro, recepcionista ou PT) tem uma conversa só com
// o administrador; o administrador vê todas as conversas de uma vez.
// ---------------------------------------------------------------------
function BalaoMensagem({ msg, souEu }) {
  return (
    <div className={`flex ${souEu ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${souEu ? "bg-[#3F8F87] text-white rounded-br-sm" : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-sm"}`}>
        <p>{msg.texto}</p>
        <p className={`text-[10px] mt-1 ${souEu ? "text-white/70" : "text-slate-400 dark:text-slate-500"}`}>{msg.data} {msg.hora}</p>
      </div>
    </div>
  );
}

// Vista de UM participante (membro / recepcionista / PT) — só a sua própria conversa com o admin
function MensagensParticipante({ mensagens, participanteId, participanteTipo, participanteNome, onEnviar, onMarcarLidas }) {
  const [texto, setTexto] = useState("");
  const minhasMensagens = mensagens
    .filter((m) => m.participanteId === participanteId && m.participanteTipo === participanteTipo)
    .sort((a, b) => (a.id > b.id ? 1 : -1));
  const fimRef = useRef(null);

  useEffect(() => {
    onMarcarLidas(participanteId, participanteTipo, "participante");
    fimRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [minhasMensagens.length]);

  const enviar = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
    onEnviar({ participanteId, participanteNome, participanteTipo, texto: texto.trim(), deAdmin: false });
    setTexto("");
  };

  return (
    <Card title="Mensagens com o administrador">
      <div className="h-96 overflow-y-auto flex flex-col-reverse mb-3">
        <div ref={fimRef} />
        <div>
          {minhasMensagens.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-slate-500 text-center mt-8">
              Ainda não há mensagens. Escreve aqui para falares com o administrador.
            </p>
          ) : (
            minhasMensagens.map((m) => <BalaoMensagem key={m.id} msg={m} souEu={!m.deAdmin} />)
          )}
        </div>
      </div>
      <form onSubmit={enviar} className="flex gap-2">
        <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Escreve uma mensagem..."
          className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
        <button className="bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white px-4 rounded-lg">
          <Send size={16} />
        </button>
      </form>
    </Card>
  );
}

// Vista do administrador — lista de conversas + a conversa aberta
const RESPOSTAS_RAPIDAS = [
  "Sim, podes trazer um convidado.",
  "A tua mensalidade está em dia, obrigado!",
  "Vamos verificar e já te respondemos.",
  "Podes passar pela receção para resolver isso.",
];

function MensagensAdmin({ mensagens, onEnviar, onMarcarLidas, onEnviarGeral, totalMembros }) {
  const conversas = useMemo(() => {
    const mapa = {};
    mensagens.forEach((m) => {
      const chave = `${m.participanteTipo}-${m.participanteId}`;
      if (!mapa[chave]) mapa[chave] = { participanteId: m.participanteId, participanteTipo: m.participanteTipo, participanteNome: m.participanteNome, ultima: m, naoLidas: 0 };
      if (m.id > mapa[chave].ultima.id) mapa[chave].ultima = m;
      if (!m.deAdmin && !m.lida) mapa[chave].naoLidas += 1;
    });
    return Object.values(mapa).sort((a, b) => b.ultima.id - a.ultima.id);
  }, [mensagens]);

  const [aberta, setAberta] = useState(null);
  const [texto, setTexto] = useState("");
  const [showGeral, setShowGeral] = useState(false);
  const [textoGeral, setTextoGeral] = useState("");
  const [avisoEnviado, setAvisoEnviado] = useState(false);
  const fimRef = useRef(null);

  const mensagensDaConversa = aberta
    ? mensagens
        .filter((m) => m.participanteId === aberta.participanteId && m.participanteTipo === aberta.participanteTipo)
        .sort((a, b) => (a.id > b.id ? 1 : -1))
    : [];

  useEffect(() => {
    if (aberta) {
      onMarcarLidas(aberta.participanteId, aberta.participanteTipo, "admin");
      fimRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [aberta, mensagensDaConversa.length]);

  const enviar = (e) => {
    e.preventDefault();
    if (!texto.trim() || !aberta) return;
    onEnviar({ participanteId: aberta.participanteId, participanteNome: aberta.participanteNome, participanteTipo: aberta.participanteTipo, texto: texto.trim(), deAdmin: true });
    setTexto("");
  };

  const enviarGeral = (e) => {
    e.preventDefault();
    if (!textoGeral.trim()) return;
    onEnviarGeral(textoGeral.trim());
    setTextoGeral("");
    setShowGeral(false);
    setAvisoEnviado(true);
    setTimeout(() => setAvisoEnviado(false), 4000);
  };

  const rotuloTipo = { membro: "Membro", funcionario: "Funcionário" };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowGeral(true)}
          className="flex items-center gap-1.5 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white text-sm font-semibold px-4 py-2 rounded-lg"
        >
          <MessageSquare size={16} /> Aviso geral a todos os membros
        </button>
        {avisoEnviado && <span className="text-sm text-emerald-600 font-medium">Aviso enviado ✔</span>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card title={`Conversas (${conversas.length})`}>
          {conversas.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-slate-500">Ainda não há mensagens de ninguém.</p>
          ) : (
            <div className="divide-y divide-slate-50 dark:divide-slate-700 max-h-[28rem] overflow-y-auto">
              {conversas.map((c) => (
                <button
                  key={`${c.participanteTipo}-${c.participanteId}`}
                  onClick={() => setAberta(c)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${aberta?.participanteId === c.participanteId && aberta?.participanteTipo === c.participanteTipo ? "bg-[#EAF5F4] dark:bg-slate-700" : "hover:bg-slate-50 dark:hover:bg-slate-700"}`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{c.participanteNome}</p>
                    {c.naoLidas > 0 && (
                      <span className="bg-[#3F8F87] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{c.naoLidas}</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{rotuloTipo[c.participanteTipo]} · {c.ultima.texto.slice(0, 30)}{c.ultima.texto.length > 30 ? "…" : ""}</p>
                </button>
              ))}
            </div>
          )}
        </Card>

        <div className="lg:col-span-2">
          <Card title={aberta ? `Conversa com ${aberta.participanteNome}` : "Seleciona uma conversa"}>
            {!aberta ? (
              <p className="text-sm text-slate-400 dark:text-slate-500">Escolhe uma conversa à esquerda para responder.</p>
            ) : (
              <>
                <div className="h-80 overflow-y-auto flex flex-col-reverse mb-3">
                  <div ref={fimRef} />
                  <div>
                    {mensagensDaConversa.map((m) => <BalaoMensagem key={m.id} msg={m} souEu={m.deAdmin} />)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {RESPOSTAS_RAPIDAS.map((r) => (
                    <button key={r} type="button" onClick={() => setTexto(r)}
                      className="text-[11px] px-2.5 py-1 rounded-full ring-1 ring-slate-200 dark:ring-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700">
                      {r}
                    </button>
                  ))}
                </div>
                <form onSubmit={enviar} className="flex gap-2">
                  <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Responder..."
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                  <button className="bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white px-4 rounded-lg">
                    <Send size={16} />
                  </button>
                </form>
              </>
            )}
          </Card>
        </div>
      </div>

      {showGeral && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={() => setShowGeral(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Aviso geral a todos os membros</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
              Vai para a conversa de todos os {totalMembros} membro(s) cadastrados, de uma só vez.
            </p>
            <form onSubmit={enviarGeral} className="space-y-3">
              <textarea
                value={textoGeral}
                onChange={(e) => setTextoGeral(e.target.value)}
                placeholder="Ex.: O ginásio estará fechado no dia 15 (feriado)."
                rows={4}
                autoFocus
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]"
              />
              <button className="w-full flex items-center justify-center gap-2 bg-[#3F8F87] hover:bg-[#357A73] text-white font-semibold py-2.5 rounded-lg text-sm">
                <Send size={16} /> Enviar a todos
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Auditoria({ registos }) {
  return (
    <Card title="Registo de auditoria">
      {registos.length === 0 ? (
        <p className="text-sm text-slate-400 dark:text-slate-500">Ainda não há ações registadas nesta sessão.</p>
      ) : (
        <div className="divide-y divide-slate-50 dark:divide-slate-700">
          {registos.map((r, i) => (
            <div key={i} className="py-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{r.utilizador}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{r.hora}</p>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">{r.acao}</p>
              {r.detalhe && <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{r.detalhe}</p>}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

// Gera e descarrega um ficheiro CSV (abre diretamente no Excel) a partir de colunas e linhas
const exportarCSV = (nomeFicheiro, colunas, linhas) => {
  const escapar = (valor) => `"${String(valor ?? "").replace(/"/g, '""')}"`;
  const conteudo = [colunas.join(";"), ...linhas.map((linha) => linha.map(escapar).join(";"))].join("\r\n");
  const blob = new Blob(["\uFEFF" + conteudo], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${nomeFicheiro}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

// ---------------------------------------------------------------------
// CÓPIA DE SEGURANÇA — descarrega/restaura TODOS os dados do sistema
// ---------------------------------------------------------------------
const CHAVE_ULTIMO_BACKUP = "catumbela-gym:ultimo-backup";

// Descarrega uma cópia de segurança de todos os dados — função partilhada,
// usada tanto pelo botão manual como pelo lembrete/gatilho automático.
function descarregarCopiaSeguranca() {
  const bruto = window.localStorage.getItem(CHAVE_ARMAZENAMENTO_ATUAL) || "{}";
  const conteudo = JSON.stringify(JSON.parse(bruto), null, 2);
  const blob = new Blob([conteudo], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `catumbela-gym-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  window.localStorage.setItem(CHAVE_ULTIMO_BACKUP, new Date().toISOString());
}

const FREQUENCIAS_BACKUP = {
  automatico: { rotulo: "Automático (a cada 7 dias)", dias: 7 },
  "15dias": { rotulo: "A cada 15 dias", dias: 15 },
  mensal: { rotulo: "Mensal (a cada 30 dias)", dias: 30 },
};

function CopiaSeguranca({ dadosGinasio, onSalvarFrequencia }) {
  const [mensagem, setMensagem] = useState(null); // { tipo: "sucesso"|"erro", texto }
  const inputRef = useRef(null);
  const frequencia = dadosGinasio.frequenciaBackup || "15dias";

  const descarregar = () => descarregarCopiaSeguranca();

  const restaurar = (e) => {
    const ficheiro = e.target.files?.[0];
    if (!ficheiro) return;
    const leitor = new FileReader();
    leitor.onload = () => {
      try {
        const dados = JSON.parse(leitor.result);
        if (typeof dados !== "object" || dados === null) throw new Error("formato inválido");
        window.localStorage.setItem(CHAVE_ARMAZENAMENTO_ATUAL, JSON.stringify(dados));
        setMensagem({ tipo: "sucesso", texto: "Cópia restaurada com sucesso! A recarregar..." });
        setTimeout(() => window.location.reload(), 1200);
      } catch {
        setMensagem({ tipo: "erro", texto: "Este ficheiro não parece ser uma cópia de segurança válida do Catumbela Gym." });
      }
    };
    leitor.readAsText(ficheiro);
    e.target.value = ""; // permite escolher o mesmo ficheiro outra vez, se necessário
  };

  return (
    <Card title={<span className="flex items-center gap-2"><Save size={16} className="text-[#3F8F87]" /> Cópia de segurança</span>}>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Descarrega uma cópia de todos os dados do sistema (membros, planos, pagamentos, custos, etc.) num único
        ficheiro. Guarda-o num local seguro — serve para recuperar tudo caso percas acesso a este dispositivo, ou
        para transferir os dados para outro computador.
      </p>

      <div className="mb-4">
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block">Lembrete / cópia automática</label>
        <select
          value={frequencia}
          onChange={(e) => onSalvarFrequencia(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]"
        >
          {Object.entries(FREQUENCIAS_BACKUP).map(([chave, f]) => (
            <option key={chave} value={chave}>{f.rotulo}</option>
          ))}
        </select>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">
          Na opção "Automático", o site tenta descarregar a cópia sozinho quando abres, assim que passar o prazo —
          nas outras, só aparece um lembrete no topo do ecrã. Como o navegador nem sempre permite downloads
          automáticos sem interação, confirma sempre que o ficheiro foi mesmo descarregado.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={descarregar}
          className="flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white text-sm font-semibold px-4 py-2.5 rounded-lg"
        >
          <Save size={15} /> Descarregar cópia de segurança
        </button>
        <button
          onClick={() => inputRef.current?.click()}
          className="flex items-center justify-center gap-2 ring-1 ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-semibold px-4 py-2.5 rounded-lg"
        >
          <RefreshCw size={15} /> Restaurar de um ficheiro
        </button>
        <input ref={inputRef} type="file" accept="application/json" onChange={restaurar} className="hidden" />
      </div>
      {mensagem && (
        <p className={`text-xs mt-3 font-medium ${mensagem.tipo === "sucesso" ? "text-emerald-600" : "text-red-500"}`}>
          {mensagem.texto}
        </p>
      )}
      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3">
        Atenção: restaurar uma cópia <strong>substitui todos os dados atuais</strong> deste dispositivo pelos do
        ficheiro. Se o sistema estiver sincronizado com o Supabase, os dados restaurados vão sincronizar também.
      </p>
    </Card>
  );
}

// Todas as coleções persistentes do sistema — usado para limpar tudo (local
// e no Supabase) quando se reinicia o site.
const CHAVES_TODAS_COLECOES = [
  "membros", "planos", "produtos", "trainers", "dadosGinasio", "contas", "acessos",
  "pagamentosFeitos", "movimentosBancarios", "comprasMembros", "vendasProdutos",
  "auditLog", "pagamentosPendentes", "custos", "faturas",
];

function ReiniciarSite({ contaAtual }) {
  const [confirmacao, setConfirmacao] = useState("");
  const [showConfirmar, setShowConfirmar] = useState(false);
  const [aReiniciar, setAReiniciar] = useState(false);
  const [manterConta, setManterConta] = useState(true);
  const FRASE = "ELIMINAR TUDO";

  const reiniciar = async () => {
    setAReiniciar(true);
    // Se escolhido, mantém a própria conta de administrador — assim não
    // precisas de criar uma nova conta depois de reiniciar tudo o resto.
    const contasFinal = manterConta && contaAtual ? [{ ...contaAtual }] : [];
    try {
      const estadoNovo = { contas: contasFinal };
      if (manterConta && contaAtual) {
        // preserva também a sessão (login), para continuares ligado depois de recarregar
        estadoNovo.autenticado = true;
        estadoNovo.perfil = contaAtual.perfil;
        estadoNovo.contaAtual = contaAtual;
      }
      window.localStorage.setItem(CHAVE_ARMAZENAMENTO_ATUAL, JSON.stringify(estadoNovo));
      window.localStorage.removeItem(CHAVE_ULTIMO_BACKUP);
    } catch {
      // ignora — ainda assim tentamos limpar o Supabase abaixo
    }
    // Limpa também no Supabase — sem isto, ao recarregar, os dados antigos
    // voltavam a sincronizar de volta para este dispositivo.
    await Promise.all(
      CHAVES_TODAS_COLECOES.map((chave) => {
        if (chave === "contas") return gravarColecao(PREFIXO_COLECAO_TESTE + "contas", contasFinal).catch(() => {});
        return gravarColecao(PREFIXO_COLECAO_TESTE + chave, chave === "dadosGinasio" ? {} : []).catch(() => {});
      })
    );
    window.location.reload();
  };

  return (
    <Card title={<span className="flex items-center gap-2 text-red-600 dark:text-red-400"><AlertTriangle size={16} /> Reiniciar o site</span>}>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Apaga <strong>todos os dados</strong> do sistema (membros, planos, pagamentos, faturas, tudo) e volta ao
        estado inicial — útil depois de uma experiência/teste, antes de começares a usar a sério. <strong>Não há
        forma de desfazer isto</strong> — faz uma cópia de segurança antes, se quiseres guardar algo.
      </p>
      {!showConfirmar ? (
        <button
          onClick={() => setShowConfirmar(true)}
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg"
        >
          <AlertTriangle size={15} /> Reiniciar o site
        </button>
      ) : (
        <div className="space-y-3 bg-red-50 dark:bg-red-900/20 ring-1 ring-red-200 dark:ring-red-800 rounded-xl p-4">
          <div className="grid grid-cols-1 gap-2">
            <button type="button" onClick={() => setManterConta(true)}
              className={`text-left text-sm font-medium p-3 rounded-lg ring-1 ${manterConta ? "bg-white dark:bg-slate-800 ring-red-300 dark:ring-red-700" : "ring-red-100 dark:ring-red-900 text-red-500 dark:text-red-400"}`}>
              Eliminar tudo, <strong>exceto a minha conta de administrador</strong>
              <p className="text-xs font-normal text-red-600/70 dark:text-red-400/70 mt-0.5">Continuas com sessão iniciada depois de reiniciar.</p>
            </button>
            <button type="button" onClick={() => setManterConta(false)}
              className={`text-left text-sm font-medium p-3 rounded-lg ring-1 ${!manterConta ? "bg-white dark:bg-slate-800 ring-red-300 dark:ring-red-700" : "ring-red-100 dark:ring-red-900 text-red-500 dark:text-red-400"}`}>
              Eliminar absolutamente tudo, <strong>incluindo a minha conta</strong>
              <p className="text-xs font-normal text-red-600/70 dark:text-red-400/70 mt-0.5">Volta ao ecrã de "Criar conta de Administrador".</p>
            </button>
          </div>
          <p className="text-sm text-red-700 dark:text-red-400 font-medium">
            Escreve <strong>{FRASE}</strong> para confirmares:
          </p>
          <input
            value={confirmacao}
            onChange={(e) => setConfirmacao(e.target.value)}
            placeholder={FRASE}
            className="w-full px-3 py-2 rounded-lg border border-red-200 dark:border-red-800 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
          />
          <div className="flex gap-2">
            <button onClick={() => { setShowConfirmar(false); setConfirmacao(""); }} className="flex-1 ring-1 ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300 font-semibold py-2.5 rounded-lg text-sm">
              Cancelar
            </button>
            <button
              onClick={reiniciar}
              disabled={confirmacao !== FRASE || aReiniciar}
              className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-200 dark:disabled:bg-red-900/40 disabled:text-red-400 text-white font-semibold py-2.5 rounded-lg text-sm"
            >
              {aReiniciar ? "A reiniciar..." : "Apagar tudo e reiniciar"}
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}

function Relatorios({ membros, produtos, pagamentosFeitos, acessos, contas, custos, vendasProdutos, movimentosCaixa, movimentosBancarios }) {
  // "Saldo inicial" é dinheiro que o ginásio já tinha antes de começar a
  // usar o sistema — conta como receita/lucro já feita.
  const saldoInicialTotal = [...movimentosCaixa, ...movimentosBancarios]
    .filter((m) => m.subtipo === "Saldo inicial")
    .reduce((s, m) => s + m.valor, 0);
  const receitaTotal = pagamentosFeitos.reduce((s, p) => s + p.valor, 0) + saldoInicialTotal;
  const custosTotal = custos.reduce((s, c) => s + c.valor, 0);
  const lucro = receitaTotal - custosTotal;
  const [mesEscolhido, setMesEscolhido] = useState(new Date().toISOString().slice(0, 7)); // "YYYY-MM"

  // Produtos mais e menos vendidos — para saber o que reabastecer e o que
  // talvez já não valha a pena manter em stock.
  const rankingProdutos = useMemo(() => {
    const porProduto = {};
    vendasProdutos.forEach((v) => {
      if (!porProduto[v.produtoId]) porProduto[v.produtoId] = { quantidade: 0, valor: 0 };
      porProduto[v.produtoId].quantidade += v.quantidade;
      porProduto[v.produtoId].valor += v.subtotal;
    });
    return produtos
      .map((p) => ({ produto: p, quantidade: porProduto[p.id]?.quantidade || 0, valor: porProduto[p.id]?.valor || 0 }))
      .sort((a, b) => b.quantidade - a.quantidade);
  }, [produtos, vendasProdutos]);

  // Lucro por mês — últimos 6 meses, para perceber a tendência (não só o total acumulado)
  const lucroPorMes = useMemo(() => {
    const hoje = new Date();
    const meses = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
      meses.push({ chave: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, label: d.toLocaleDateString("pt-PT", { month: "short" }) });
    }
    return meses.map((m) => {
      const receitaMes = pagamentosFeitos.filter((p) => (p.data || "").startsWith(m.chave)).reduce((s, p) => s + p.valor, 0);
      const custoMes = custos.filter((c) => (c.data || "").startsWith(m.chave)).reduce((s, c) => s + c.valor, 0);
      return { mes: m.label, receita: receitaMes, custo: custoMes, lucro: receitaMes - custoMes };
    });
  }, [pagamentosFeitos, custos]);

  // Horas de pico — usa os check-ins já registados para saber que
  // horas/dias o ginásio está mais cheio (ajuda a planear turnos e horários
  // de aulas).
  const DIAS_SEMANA_ABREV = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const horasDePico = useMemo(() => {
    const porHora = Array.from({ length: 24 }, (_, h) => ({ hora: `${String(h).padStart(2, "0")}h`, checkins: 0 }));
    const porDiaSemana = DIAS_SEMANA_ABREV.map((d) => ({ dia: d, checkins: 0 }));
    acessos.forEach((a) => {
      if (a.entrada) {
        const hora = parseInt(a.entrada.split(":")[0], 10);
        if (!isNaN(hora) && porHora[hora]) porHora[hora].checkins += 1;
      }
      if (a.data) {
        const diaSemana = new Date(a.data + "T12:00:00").getDay();
        if (porDiaSemana[diaSemana]) porDiaSemana[diaSemana].checkins += 1;
      }
    });
    const horaMaisCheia = porHora.reduce((max, h) => (h.checkins > max.checkins ? h : max), porHora[0]);
    const diaMaisCheio = porDiaSemana.reduce((max, d) => (d.checkins > max.checkins ? d : max), porDiaSemana[0]);
    return { porHora, porDiaSemana, horaMaisCheia, diaMaisCheio, totalCheckins: acessos.length };
  }, [acessos]);

  // Relatório Mensal — resumo detalhado de um mês à escolha, pronto a
  // exportar (ex.: para levares ao contabilista ou reveres o mês).
  const resumoMensal = useMemo(() => {
    const pagamentosMes = pagamentosFeitos.filter((p) => (p.data || "").startsWith(mesEscolhido));
    const custosMes = custos.filter((c) => (c.data || "").startsWith(mesEscolhido));
    const membrosNovosMes = membros.filter((m) => (m.dataInscricao || "").startsWith(mesEscolhido));
    const porTipo = { mensalidade: 0, venda: 0, avulso: 0, inscricao: 0 };
    pagamentosMes.forEach((p) => { porTipo[p.tipo] = (porTipo[p.tipo] || 0) + p.valor; });
    const receita = pagamentosMes.reduce((s, p) => s + p.valor, 0);
    const custoTotal = custosMes.reduce((s, c) => s + c.valor, 0);
    return { receita, custoTotal, lucro: receita - custoTotal, porTipo, membrosNovos: membrosNovosMes.length, numPagamentos: pagamentosMes.length, pagamentosMes, custosMes };
  }, [pagamentosFeitos, custos, membros, mesEscolhido]);

  const exportarRelatorioMensal = () => {
    const [ano, mes] = mesEscolhido.split("-");
    exportarCSV(
      `relatorio-mensal-${mesEscolhido}`,
      ["Secção", "Descrição", "Valor (Kz)"],
      [
        ["Resumo", "Receita total do mês", resumoMensal.receita],
        ["Resumo", "Custos totais do mês", resumoMensal.custoTotal],
        ["Resumo", "Lucro líquido do mês", resumoMensal.lucro],
        ["Resumo", "Novos membros inscritos no mês", resumoMensal.membrosNovos],
        ["Receita por tipo", "Mensalidades", resumoMensal.porTipo.mensalidade || 0],
        ["Receita por tipo", "Vendas (produtos)", resumoMensal.porTipo.venda || 0],
        ["Receita por tipo", "Avulsos", resumoMensal.porTipo.avulso || 0],
        ["Receita por tipo", "Taxas de inscrição", resumoMensal.porTipo.inscricao || 0],
        ...resumoMensal.pagamentosMes.map((p) => ["Pagamento", `${p.numero || "—"} · ${ROTULO_METODO_PAGAMENTO[p.metodo] || p.metodo}`, p.valor]),
        ...resumoMensal.custosMes.map((c) => ["Custo", `${c.categoria} · ${c.descricao || ""}`, c.valor]),
      ]
    );
  };

  const exportarMembros = () => {
    exportarCSV(
      "membros",
      ["Número", "Nome", "Telefone", "Plano", "Vencimento", "Estado"],
      membros.map((m) => [m.numero, m.nome, m.telefone, m.plano, m.vencimento, m.estado])
    );
  };

  const exportarFinanceiro = () => {
    exportarCSV(
      "financeiro",
      ["Tipo", "Método", "Valor (Kz)", "Registado por"],
      pagamentosFeitos.map((p) => [p.tipo || "—", p.metodo, p.valor, p.registadoPor || "—"])
    );
  };

  const exportarStock = () => {
    exportarCSV(
      "stock",
      ["Código", "Produto", "Categoria", "Stock atual", "Stock mínimo", "Preço (Kz)"],
      produtos.map((p) => [p.codigo, p.nome, p.categoria, p.stock, p.minimo, p.preco])
    );
  };

  const exportarAcessos = () => {
    exportarCSV(
      "acessos",
      ["Membro", "Número", "Entrada", "Saída"],
      acessos.map((a) => [a.membro, a.numero, a.entrada, a.saida || "—"])
    );
  };

  const exportarFuncionarios = () => {
    exportarCSV(
      "funcionarios",
      ["Nome", "E-mail", "Perfil"],
      contas.filter((c) => c.perfil === "recepcionista" || c.perfil === "personal_trainer").map((c) => [c.nome, c.email, ROTULO_PERFIL[c.perfil]])
    );
  };

  const exportarLucro = () => {
    exportarCSV(
      "lucro",
      ["Tipo", "Categoria", "Descrição", "Valor (Kz)", "Data"],
      [
        ...pagamentosFeitos.map((p) => ["Receita", p.tipo === "venda" ? "Venda de produto" : "Mensalidade", p.metodo, p.valor, "—"]),
        ...custos.map((c) => ["Custo", c.categoria, c.descricao || "—", -c.valor, c.data]),
      ]
    );
  };

  const relatorios = [
    { titulo: "Financeiro", descricao: "Todos os pagamentos e vendas registados", onExportar: exportarFinanceiro },
    { titulo: "Membros", descricao: "Lista completa de membros e estado da mensalidade", onExportar: exportarMembros },
    { titulo: "Stock", descricao: "Produtos, stock atual e preços", onExportar: exportarStock },
    { titulo: "Acessos", descricao: "Histórico de entradas e saídas", onExportar: exportarAcessos },
    { titulo: "Funcionários", descricao: "Contas de recepcionista e personal trainer", onExportar: exportarFuncionarios },
  ];

  return (
    <div className="space-y-5">
      <Card title={<span className="flex items-center gap-2"><TrendingUp size={16} className="text-[#3F8F87]" /> Lucro — receitas menos custos</span>}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500">Receita total</p>
            <p className="text-xl font-bold text-emerald-600 mt-1">+{kz(receitaTotal)}</p>
            {saldoInicialTotal > 0 && (
              <p className="text-[10px] text-slate-400 dark:text-slate-500">Inclui {kz(saldoInicialTotal)} de saldo inicial</p>
            )}
          </div>
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500">Custos totais</p>
            <p className="text-xl font-bold text-red-500 mt-1">−{kz(custosTotal)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500">Lucro líquido</p>
            <p className={`text-xl font-bold mt-1 ${lucro >= 0 ? "text-[#3F8F87]" : "text-red-500"}`}>{kz(lucro)}</p>
          </div>
        </div>
        {(receitaTotal === 0 && custosTotal === 0) ? (
          <p className="text-xs text-slate-400 dark:text-slate-500">Ainda não há receitas nem custos registados.</p>
        ) : (
          <button
            onClick={exportarLucro}
            className="flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white text-sm font-semibold px-4 py-2.5 rounded-lg"
          >
            <FileText size={15} /> Exportar lucro para Excel (CSV)
          </button>
        )}
      </Card>

      <Card title="Lucro por mês" action={<span className="text-xs text-slate-400 dark:text-slate-500">Últimos 6 meses</span>}>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={lucroPorMes} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 12 }}
                formatter={(valor, nome) => [kz(valor), nome === "lucro" ? "Lucro" : nome === "receita" ? "Receita" : "Custo"]}
              />
              <Bar dataKey="receita" fill="#BFE4E1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="custo" fill="#F5B5B5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="lucro" fill="#3F8F87" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-5 mt-1">
          <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300"><span className="w-2.5 h-2.5 rounded-full bg-[#BFE4E1]" /> Receita</span>
          <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300"><span className="w-2.5 h-2.5 rounded-full bg-[#F5B5B5]" /> Custo</span>
          <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300"><span className="w-2.5 h-2.5 rounded-full bg-[#3F8F87]" /> Lucro</span>
        </div>
      </Card>

      <Card
        title="Relatório mensal"
        action={
          <input
            type="month"
            value={mesEscolhido}
            onChange={(e) => setMesEscolhido(e.target.value)}
            className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]"
          />
        }
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
            <p className="text-[11px] text-slate-400 dark:text-slate-500">Receita</p>
            <p className="text-sm font-bold text-emerald-600">{kz(resumoMensal.receita)}</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
            <p className="text-[11px] text-slate-400 dark:text-slate-500">Custos</p>
            <p className="text-sm font-bold text-red-500">{kz(resumoMensal.custoTotal)}</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
            <p className="text-[11px] text-slate-400 dark:text-slate-500">Lucro</p>
            <p className={`text-sm font-bold ${resumoMensal.lucro >= 0 ? "text-[#3F8F87]" : "text-red-500"}`}>{kz(resumoMensal.lucro)}</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
            <p className="text-[11px] text-slate-400 dark:text-slate-500">Membros novos</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{resumoMensal.membrosNovos}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-[11px] bg-[#EAF5F4] dark:bg-slate-700 text-[#2E6E68] dark:text-[#5AAFA8] px-2.5 py-1 rounded-full">Mensalidades: {kz(resumoMensal.porTipo.mensalidade || 0)}</span>
          <span className="text-[11px] bg-[#EAF5F4] dark:bg-slate-700 text-[#2E6E68] dark:text-[#5AAFA8] px-2.5 py-1 rounded-full">Vendas: {kz(resumoMensal.porTipo.venda || 0)}</span>
          <span className="text-[11px] bg-[#EAF5F4] dark:bg-slate-700 text-[#2E6E68] dark:text-[#5AAFA8] px-2.5 py-1 rounded-full">Avulsos: {kz(resumoMensal.porTipo.avulso || 0)}</span>
          <span className="text-[11px] bg-[#EAF5F4] dark:bg-slate-700 text-[#2E6E68] dark:text-[#5AAFA8] px-2.5 py-1 rounded-full">Inscrições: {kz(resumoMensal.porTipo.inscricao || 0)}</span>
        </div>
        {resumoMensal.numPagamentos === 0 && resumoMensal.custosMes.length === 0 ? (
          <p className="text-xs text-slate-400 dark:text-slate-500">Sem movimentos neste mês.</p>
        ) : (
          <button
            onClick={exportarRelatorioMensal}
            className="flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white text-sm font-semibold px-4 py-2.5 rounded-lg"
          >
            <FileText size={15} /> Exportar relatório deste mês (Excel/CSV)
          </button>
        )}
      </Card>

      {horasDePico.totalCheckins > 0 && (
        <Card title="Horas de pico" action={<span className="text-xs text-slate-400 dark:text-slate-500">Baseado em {horasDePico.totalCheckins} check-ins</span>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-[#EAF5F4] dark:bg-slate-900">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Hora mais cheia</p>
              <p className="text-lg font-bold text-[#3F8F87]">{horasDePico.horaMaisCheia.hora} <span className="text-xs font-normal text-slate-400">({horasDePico.horaMaisCheia.checkins} check-ins)</span></p>
            </div>
            <div className="p-3 rounded-lg bg-[#EAF5F4] dark:bg-slate-900">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Dia mais cheio</p>
              <p className="text-lg font-bold text-[#3F8F87]">{horasDePico.diaMaisCheio.dia} <span className="text-xs font-normal text-slate-400">({horasDePico.diaMaisCheio.checkins} check-ins)</span></p>
            </div>
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Check-ins por hora do dia</p>
          <div className="flex items-end gap-0.5 h-24 mb-1">
            {horasDePico.porHora.map((h) => {
              const max = Math.max(1, ...horasDePico.porHora.map((x) => x.checkins));
              return (
                <div key={h.hora} className="flex-1 flex flex-col items-center justify-end h-full" title={`${h.hora}: ${h.checkins} check-ins`}>
                  <div className="w-full bg-[#3F8F87] rounded-sm" style={{ height: `${(h.checkins / max) * 100}%`, minHeight: h.checkins > 0 ? "3px" : "0" }} />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-500">
            <span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>23h</span>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Card title="Produtos mais vendidos">
          {rankingProdutos.filter((r) => r.quantidade > 0).length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-slate-500">Ainda não há vendas de produtos registadas.</p>
          ) : (
            <div className="space-y-2">
              {rankingProdutos.filter((r) => r.quantidade > 0).slice(0, 5).map((r) => (
                <div key={r.produto.id} className="flex items-center justify-between text-sm">
                  <span className="text-slate-700 dark:text-slate-200">{r.produto.nome}</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{r.quantidade} un. · {kz(r.valor)}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card title="Produtos parados (sem vendas)">
          {rankingProdutos.filter((r) => r.quantidade === 0).length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-slate-500">Todos os produtos já tiveram alguma venda. 🎉</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {rankingProdutos.filter((r) => r.quantidade === 0).map((r) => (
                <span key={r.produto.id} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-full">
                  {r.produto.nome}
                </span>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {relatorios.map((r) => (
          <Card key={r.titulo} title={r.titulo}>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{r.descricao}</p>
            <button
              onClick={r.onExportar}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white text-sm font-semibold py-2.5 rounded-lg"
            >
              <FileText size={15} /> Exportar para Excel (CSV)
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// TURNO DE CAIXA (conta da recepcionista)
// ---------------------------------------------------------------------
function TurnoCaixa({ pagamentosFeitos, nomeAtual, onFecharTurno }) {
  const [aberto, setAberto] = useState(false);
  const [fechado, setFechado] = useState(false);
  const [aContar, setAContar] = useState(false);
  const [valorContado, setValorContado] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [resultado, setResultado] = useState(null);

  // Só os pagamentos/vendas processados por esta conta durante a sessão
  const meusPagamentos = pagamentosFeitos.filter((p) => p.registadoPor === nomeAtual);

  const totais = useMemo(() => {
    const t = { dinheiro: 0, tpa: 0, express: 0, referencia: 0, transferencia: 0 };
    meusPagamentos.forEach((p) => { t[p.metodo] = (t[p.metodo] || 0) + p.valor; });
    return t;
  }, [meusPagamentos]);
  const totalGeral = Object.values(totais).reduce((a, b) => a + b, 0);

  const confirmarContagem = () => {
    if (valorContado === "") return;
    const contado = Number(valorContado);
    const diferenca = contado - totais.dinheiro;
    onFecharTurno({ nomeFuncionario: nomeAtual, totalSistema: totais.dinheiro, totalContado: contado, diferenca, observacoes });
    setResultado({ contado, diferenca });
    setAContar(false);
    setFechado(true);
  };

  if (!aberto) {
    return (
      <Card title="Turno de caixa">
        <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-4">Ainda não abriste o teu turno hoje.</p>
        <button onClick={() => setAberto(true)} className="flex items-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold px-5 py-2.5 rounded-lg text-sm">
          <WalletIcon size={16} /> Abrir turno
        </button>
      </Card>
    );
  }

  return (
    <Card title={fechado ? `Turno fechado — resumo de ${nomeAtual}` : `Turno aberto — ${nomeAtual}`}>
      <div className="space-y-2 mb-4">
        {[
          { label: "Dinheiro", value: totais.dinheiro },
          { label: "TPA", value: totais.tpa },
          { label: "MULTICAIXA Express", value: totais.express },
          { label: "Referência", value: totais.referencia },
          { label: "Transferência", value: totais.transferencia },
        ].map((r) => (
          <div key={r.label} className="flex justify-between text-sm py-1.5 border-b border-slate-50 last:border-0">
            <span className="text-slate-600 dark:text-slate-300">{r.label}</span>
            <span className="font-medium text-slate-900 dark:text-slate-100">{kz(r.value)}</span>
          </div>
        ))}
        <div className="flex justify-between text-sm pt-2 font-bold">
          <span>Total (só o que tu registaste)</span>
          <span className="text-[#3F8F87]">{kz(totalGeral)}</span>
        </div>
      </div>

      {!fechado && !aContar && (
        <button onClick={() => setAContar(true)} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2.5 rounded-lg text-sm">
          <DoorClosed size={16} /> Fechar turno
        </button>
      )}

      {aContar && !fechado && (
        <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 space-y-3">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Contagem física do dinheiro</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            O sistema regista {kz(totais.dinheiro)} em dinheiro. Conta o dinheiro físico na gaveta e escreve o valor
            real abaixo — se não bater certo, fica registado para o administrador ver.
          </p>
          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Quanto contaste (Kz)?</label>
            <input type="number" min={0} value={valorContado} onChange={(e) => setValorContado(e.target.value)} autoFocus
              className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Observações (opcional)</label>
            <input value={observacoes} onChange={(e) => setObservacoes(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
          </div>
          <button onClick={confirmarContagem} className="w-full bg-[#3F8F87] hover:bg-[#357A73] text-white font-semibold py-2.5 rounded-lg text-sm">
            Confirmar fecho de turno
          </button>
        </div>
      )}

      {fechado && resultado && (
        <div className={`p-3 rounded-lg text-sm font-medium ${resultado.diferenca === 0 ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" : "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"}`}>
          {resultado.diferenca === 0
            ? "Turno fechado — a contagem bateu certo com o sistema. ✔"
            : `Turno fechado — diferença de ${kz(Math.abs(resultado.diferenca))} ${resultado.diferenca > 0 ? "a mais" : "a menos"} do que o sistema esperava. Já foi ajustada no saldo do Caixa e fica visível para o administrador.`}
        </div>
      )}
    </Card>
  );
}

// ---------------------------------------------------------------------
// TURNOS POR FUNCIONÁRIO (vista do administrador)
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// CAIXA — dividido em "Movimentação Bancária" e "Movimentação de Caixa",
// cada uma com entradas/saídas (depósito, levantamento, transferência,
// recibos, custos pagos), e o total gerado por cada funcionário.
// ---------------------------------------------------------------------
function CaixaEFuncionarios({ movimentosBancarios, movimentosCaixa, dadosGinasio, onAdicionarMovimento, onAdicionarTransferencia, fechosTurno }) {
  const [aba, setAba] = useState("resumo"); // "resumo" | "banco" | "caixa"

  const totalPorPessoa = useMemo(() => {
    const mapa = {};
    const somar = (lista, chaveEntrada, chaveSaida) => {
      lista.forEach((m) => {
        const nome = m.registadoPor || "Sem identificação";
        if (!mapa[nome]) mapa[nome] = { nome, entradaCaixa: 0, saidaCaixa: 0, entradaBanco: 0, saidaBanco: 0 };
        if (m.direcao === "entrada") mapa[nome][chaveEntrada] += m.valor;
        else mapa[nome][chaveSaida] += m.valor;
      });
    };
    somar(movimentosCaixa, "entradaCaixa", "saidaCaixa");
    somar(movimentosBancarios, "entradaBanco", "saidaBanco");
    return Object.values(mapa)
      .map((p) => ({ ...p, total: p.entradaCaixa - p.saidaCaixa + p.entradaBanco - p.saidaBanco }))
      .sort((a, b) => b.total - a.total);
  }, [movimentosCaixa, movimentosBancarios]);

  // Total de cada conta bancária individual — e, dentro de cada uma, o que
  // cada funcionário movimentou nela.
  const totalPorBanco = useMemo(() => {
    const mapa = {};
    movimentosBancarios.forEach((m) => {
      const nomeBanco = m.contaBancariaNome || "Sem conta especificada";
      if (!mapa[nomeBanco]) mapa[nomeBanco] = { nome: nomeBanco, saldo: 0, porFuncionario: {} };
      const valorComSinal = m.direcao === "entrada" ? m.valor : -m.valor;
      mapa[nomeBanco].saldo += valorComSinal;
      const func = m.registadoPor || "Sem identificação";
      mapa[nomeBanco].porFuncionario[func] = (mapa[nomeBanco].porFuncionario[func] || 0) + valorComSinal;
    });
    return Object.values(mapa).sort((a, b) => b.saldo - a.saldo);
  }, [movimentosBancarios]);

  const totalCaixa = movimentosCaixa.reduce((s, m) => s + (m.direcao === "entrada" ? m.valor : -m.valor), 0);
  const totalBanco = movimentosBancarios.reduce((s, m) => s + (m.direcao === "entrada" ? m.valor : -m.valor), 0);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setAba("resumo")} className={`text-sm font-semibold px-4 py-2 rounded-lg ring-1 ${aba === "resumo" ? "bg-[#3F8F87] text-white ring-[#3F8F87]" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300"}`}>
          Resumo por funcionário
        </button>
        <button onClick={() => setAba("caixa")} className={`text-sm font-semibold px-4 py-2 rounded-lg ring-1 ${aba === "caixa" ? "bg-[#3F8F87] text-white ring-[#3F8F87]" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300"}`}>
          Movimentação de Caixa
        </button>
        <button onClick={() => setAba("banco")} className={`text-sm font-semibold px-4 py-2 rounded-lg ring-1 ${aba === "banco" ? "bg-[#3F8F87] text-white ring-[#3F8F87]" : "ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300"}`}>
          Movimentação Bancária
        </button>
      </div>

      {aba === "resumo" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard icon={Wallet} label="Saldo em Caixa (dinheiro)" value={kz(totalCaixa)} tone="emerald" />
            <StatCard icon={Landmark} label="Saldo Bancário (todas as contas)" value={kz(totalBanco)} tone="blue" />
          </div>

          {totalPorBanco.length > 0 && (
            <Card title="Total por conta bancária">
              <div className="space-y-3">
                {totalPorBanco.map((b) => (
                  <div key={b.nome} className="p-3 rounded-lg ring-1 ring-slate-100 dark:ring-slate-700">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                        <Landmark size={14} className="text-[#3F8F87]" /> {b.nome}
                      </p>
                      <p className="font-bold text-[#3F8F87]">{kz(b.saldo)}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {Object.entries(b.porFuncionario).map(([nome, valor]) => (
                        <span key={nome} className="text-[11px] bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
                          {nome}: {kz(valor)}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card title="Total gerado por cada funcionário">
            {totalPorPessoa.length === 0 ? (
              <p className="text-sm text-slate-400 dark:text-slate-500">Ainda não há movimentos registados.</p>
            ) : (
              <div className="divide-y divide-slate-50 dark:divide-slate-700">
                {totalPorPessoa.map((p) => (
                  <div key={p.nome} className="py-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{p.nome}</p>
                      <p className="font-bold text-[#3F8F87]">{kz(p.total)}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-[11px] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-full">
                        Caixa: +{kz(p.entradaCaixa)} / −{kz(p.saidaCaixa)}
                      </span>
                      <span className="text-[11px] bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
                        Banco: +{kz(p.entradaBanco)} / −{kz(p.saidaBanco)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {fechosTurno && fechosTurno.length > 0 && (
            <Card title="Fechos de turno recentes (contagem física)">
              <div className="divide-y divide-slate-50 dark:divide-slate-700">
                {fechosTurno.slice(0, 10).map((f) => (
                  <div key={f.id} className="py-2.5 flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">{f.nomeFuncionario}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{f.data} {f.hora} · Sistema: {kz(f.totalSistema)} · Contado: {kz(f.totalContado)}{f.observacoes ? ` · ${f.observacoes}` : ""}</p>
                    </div>
                    {f.diferenca === 0 ? (
                      <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">Certo ✔</span>
                    ) : (
                      <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                        {f.diferenca > 0 ? "+" : ""}{kz(f.diferenca)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {aba === "caixa" && (
        <MovimentacaoLedger
          titulo="Movimentação de Caixa (dinheiro)"
          movimentos={movimentosCaixa}
          onAdicionar={(m) => onAdicionarMovimento("caixa", m)}
          onAdicionarTransferencia={onAdicionarTransferencia}
          usaContaBancaria={false}
          dadosGinasio={dadosGinasio}
        />
      )}

      {aba === "banco" && (
        <MovimentacaoLedger
          titulo="Movimentação Bancária"
          movimentos={movimentosBancarios}
          onAdicionar={(m) => onAdicionarMovimento("banco", m)}
          onAdicionarTransferencia={onAdicionarTransferencia}
          usaContaBancaria={true}
          dadosGinasio={dadosGinasio}
        />
      )}
    </div>
  );
}

// Ledger genérico de entradas/saídas — usado tanto para Caixa como para Banco
function MovimentacaoLedger({ titulo, movimentos, onAdicionar, onAdicionarTransferencia, usaContaBancaria, dadosGinasio }) {
  const [showForm, setShowForm] = useState(false);
  const todasContasBancarias = obterContasBancarias(dadosGinasio);
  const contasBancarias = usaContaBancaria ? todasContasBancarias : [];
  // Só mostra os tipos que fazem sentido neste ledger — ex.: "Fecho TPA" e
  // "Transferência" nunca aparecem no Caixa, porque nunca geram dinheiro físico.
  const tiposDisponiveis = TIPOS_MOVIMENTO.filter((t) => t.disponivel.includes(usaContaBancaria ? "banco" : "caixa"));
  const vazio = { subtipo: tiposDisponiveis[0].rotulo, valor: "", descricao: "", contaBancariaId: contasBancarias[0]?.id || todasContasBancarias[0]?.id || "" };
  const [novo, setNovo] = useState(vazio);
  const tipoEscolhido = tiposDisponiveis.find((t) => t.rotulo === novo.subtipo) || tiposDisponiveis[0];
  // Depósito/Levantamento têm direção OPOSTA no Caixa vs no Banco (é o mesmo
  // dinheiro a mudar de sítio) — os outros tipos são iguais nos dois.
  const direcaoAtual = usaContaBancaria ? tipoEscolhido.direcaoBanco : tipoEscolhido.direcaoCaixa;
  // Depósito/Levantamento afetam SEMPRE os dois lados (Caixa E Banco) ao
  // mesmo tempo — por isso precisam sempre de saber qual conta bancária,
  // mesmo quando estás a registar a partir do ecrã do Caixa.
  const ehTransferencia = tipoEscolhido.id === "deposito" || tipoEscolhido.id === "levantamento";

  const submeter = (e) => {
    e.preventDefault();
    if (!novo.valor) return;
    if (ehTransferencia) {
      onAdicionarTransferencia({ subtipo: novo.subtipo, valor: Number(novo.valor), contaBancariaId: novo.contaBancariaId, descricao: novo.descricao });
    } else {
      onAdicionar({ ...novo, direcao: direcaoAtual, valor: Number(novo.valor) });
    }
    setNovo(vazio);
    setShowForm(false);
  };

  const saldo = movimentos.reduce((s, m) => s + (m.direcao === "entrada" ? m.valor : -m.valor), 0);

  return (
    <Card
      title={`${titulo} (saldo: ${kz(saldo)})`}
      action={
        <button onClick={() => setShowForm(true)} className="flex items-center gap-1.5 text-xs font-semibold text-[#3F8F87] hover:underline">
          <Plus size={14} /> Novo movimento
        </button>
      }
    >
      {movimentos.length === 0 ? (
        <div className="text-sm text-slate-400 dark:text-slate-500">
          <p>Ainda não há movimentos registados.</p>
          <p className="text-xs mt-1.5">
            Se já tinhas dinheiro guardado antes de começares a usar o sistema, regista-o com o tipo
            <strong> "Saldo inicial"</strong>, para o saldo aqui ficar correto desde já.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-50 dark:divide-slate-700">
          {movimentos.map((m) => (
            <div key={m.id} className="flex items-center justify-between py-2.5 text-sm">
              <div>
                <p className="text-slate-700 dark:text-slate-200">
                  {m.subtipo}{m.descricao ? ` — ${m.descricao}` : ""}
                  {m.contaBancariaNome && <span className="text-slate-400 dark:text-slate-500"> · {m.contaBancariaNome}</span>}
                  {m.origemTransferencia && <span className="text-[10px] text-blue-500 dark:text-blue-400 ml-1.5">↔ atualizou os dois lados</span>}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{m.data} · {m.registadoPor}</p>
              </div>
              <span className={`font-semibold ${m.direcao === "entrada" ? "text-emerald-600" : "text-red-500"}`}>
                {m.direcao === "entrada" ? "+" : "−"}{kz(m.valor)}
              </span>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={() => setShowForm(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Novo movimento</h3>
            <form onSubmit={submeter} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Tipo</label>
                <select value={novo.subtipo} onChange={(e) => setNovo({ ...novo, subtipo: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                  {tiposDisponiveis.map((t) => <option key={t.id} value={t.rotulo}>{t.rotulo}</option>)}
                </select>
                {/* A direção é sempre determinada pelo tipo escolhido — nunca é possível
                    marcar um "Levantamento" como entrada nem um "Depósito" como saída. No
                    Caixa, Depósito e Levantamento saem/entram ao contrário do Banco, porque
                    é o mesmo dinheiro físico a mudar de sítio. */}
                <p className={`text-xs font-semibold mt-1.5 ${direcaoAtual === "entrada" ? "text-emerald-600" : "text-red-500"}`}>
                  {direcaoAtual === "entrada" ? "↑ Entrada" : "↓ Saída"} {usaContaBancaria ? "no Banco" : "no Caixa"} (automático consoante o tipo)
                </p>
                {ehTransferencia && (
                  <p className="text-[11px] text-blue-600 dark:text-blue-400 mt-1">
                    Isto atualiza automaticamente o Caixa E o Banco ao mesmo tempo — não precisas de registar dos dois lados.
                  </p>
                )}
              </div>
              {(usaContaBancaria || ehTransferencia) && todasContasBancarias.length > 0 && (
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Conta bancária</label>
                  <select value={novo.contaBancariaId} onChange={(e) => setNovo({ ...novo, contaBancariaId: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]">
                    {todasContasBancarias.map((c) => <option key={c.id} value={c.id}>{c.banco}</option>)}
                  </select>
                </div>
              )}
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Valor (Kz)</label>
                <input type="number" min={0} value={novo.valor} onChange={(e) => setNovo({ ...novo, valor: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Descrição (opcional)</label>
                <input value={novo.descricao} onChange={(e) => setNovo({ ...novo, descricao: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg mt-2">
                <Save size={16} /> Guardar movimento
              </button>
            </form>
          </div>
        </div>
      )}
    </Card>
  );
}


// ---------------------------------------------------------------------
// ÁREA DO MEMBRO (conta do membro)
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// PAGAR POR TRANSFERÊNCIA (self-service do membro, com comprovativo)
// ---------------------------------------------------------------------
function PagarPorTransferenciaMembro({ membro, plano, dadosGinasio, onSubmeter }) {
  const contas = obterContasBancarias(dadosGinasio);
  const [contaEscolhidaId, setContaEscolhidaId] = useState(contas[0]?.id || null);
  const [comprovativo, setComprovativo] = useState(null);
  const [aProcessar, setAProcessar] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const contaEscolhida = contas.find((c) => c.id === contaEscolhidaId) || contas[0];

  const carregarComprovativo = (e) => {
    const ficheiro = e.target.files?.[0];
    if (!ficheiro) return;
    setAProcessar(true);
    comprimirImagem(ficheiro, 1000, 0.75)
      .then((dataUrl) => setComprovativo(dataUrl))
      .catch(() => alert("Não foi possível processar esta imagem. Tenta outra."))
      .finally(() => setAProcessar(false));
  };

  const submeter = () => {
    if (!comprovativo || !contaEscolhida) return;
    onSubmeter({
      membro,
      valor: plano?.preco || 0,
      destino: contaEscolhida.tipo === "iban" ? "iban" : "telefone",
      comprovativo,
      origem: "membro",
      planoNome: plano?.nome,
    });
    setEnviado(true);
    setComprovativo(null);
  };

  if (contas.length === 0) {
    return null; // sem contas configuradas ainda — não mostra a opção
  }

  if (enviado) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-900/20 ring-1 ring-emerald-200 dark:ring-emerald-800 rounded-xl p-4 text-center">
        <CheckCircle2 className="mx-auto text-emerald-600 mb-2" size={28} />
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Comprovativo enviado!</p>
        <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">
          A recepção vai confirmar o pagamento em breve. O teu plano atualiza-se automaticamente assim que for aprovado.
        </p>
        <button onClick={() => setEnviado(false)} className="text-xs text-emerald-700 dark:text-emerald-400 underline mt-2">
          Enviar outro comprovativo
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 ring-1 ring-slate-100 dark:ring-slate-700 rounded-xl p-4 space-y-3">
      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
        <Landmark size={15} className="text-[#3F8F87]" /> Pagar por transferência / Express
      </p>

      {contas.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {contas.map((c) => (
            <button
              key={c.id}
              onClick={() => setContaEscolhidaId(c.id)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full ring-1 ${
                contaEscolhida?.id === c.id ? "bg-[#EAF5F4] dark:bg-slate-700 ring-[#3F8F87] text-[#2E6E68] dark:text-[#5AAFA8]" : "ring-slate-200 dark:ring-slate-600 text-slate-500 dark:text-slate-400"
              }`}
            >
              {c.banco}
            </button>
          ))}
        </div>
      )}

      <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
        <p>Titular: {contaEscolhida.titular}</p>
        {contaEscolhida.tipo === "iban" ? (
          <>
            <p>Banco: {contaEscolhida.banco}</p>
            <p>IBAN: {contaEscolhida.iban}</p>
          </>
        ) : (
          <p>Nº de telefone (Express): {contaEscolhida.telefone}</p>
        )}
        <p className="mt-1 font-semibold text-slate-700 dark:text-slate-200">Valor a transferir: {kz(plano?.preco || 0)}</p>
      </div>

      <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-lg py-3 text-xs font-medium text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700">
        {aProcessar ? (
          "A processar imagem..."
        ) : comprovativo ? (
          <span className="flex items-center gap-2 text-emerald-600"><CheckCircle2 size={14} /> Comprovativo pronto para enviar</span>
        ) : (
          <span className="flex items-center gap-2"><ImagePlus size={14} /> Carregar print/foto do comprovativo</span>
        )}
        <input type="file" accept="image/*" onChange={carregarComprovativo} className="hidden" />
      </label>

      <button
        onClick={submeter}
        disabled={!comprovativo}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all disabled:opacity-40 text-white font-semibold py-2.5 rounded-lg text-sm"
      >
        <ShieldCheck size={16} /> Enviar comprovativo para aprovação
      </button>
    </div>
  );
}

function AreaMembro({ membro, planos, compras, dadosGinasio, contaAtual, onMudarSenha, onSolicitarAprovacao, minhasAdvertencias, mensagens, onEnviarMensagem, onMarcarMensagensLidas, atividades, reservasAtividades, onReservarAtividade, onCancelarReservaAtividade, minhasAvaliacoes, meuPlanoTreino, acessos, onRegistarEntrada, onRegistarSaida }) {
  const [aba, setAba] = useState("inicio");
  const [planoEscolhido, setPlanoEscolhido] = useState(null);
  const cartaoRef = useRef(null);
  const plano = planos.find((p) => p.nome === membro.plano);
  const minhasCompras = compras.filter((c) => c.membroId === membro.id);
  const hojeStr = new Date().toISOString().slice(0, 10);
  const entradaAbertaHoje = acessos?.find((a) => a.numero === membro.numero && a.data === hojeStr && !a.saida) || null;
  const naoLidas = mensagens.filter((m) => m.participanteId === membro.id && m.participanteTipo === "membro" && m.deAdmin && !m.lida).length;
  const abas = [
    { id: "inicio", label: "Início", icon: LayoutDashboard },
    { id: "cartao", label: "Cartão", icon: QrCode },
    { id: "pagamentos", label: "Pagar", icon: CreditCard },
    { id: "aulas", label: "Aulas", icon: Dumbbell },
    { id: "historico", label: "Histórico", icon: History },
    { id: "compras", label: "Compras", icon: ShoppingCart },
    { id: "mensagens", label: "Mensagens", icon: MessageSquare, badge: naoLidas },
    { id: "perfil", label: "Perfil", icon: UserIcon },
  ];

  return (
    <div className="max-w-sm mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm ring-1 ring-slate-100 dark:ring-slate-700 overflow-hidden">
        <div className="bg-slate-900 text-white px-5 pt-5 pb-6">
          <p className="text-sm text-slate-300">Olá,</p>
          <p className="font-bold text-lg">{membro.nome.split(" ")[0]} 👋</p>
        </div>

        <div className="p-5 -mt-4">
          {aba === "inicio" && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-700 shadow-sm p-4">
                <p className="text-xs text-slate-400 dark:text-slate-500">Plano atual</p>
                <p className="font-bold text-slate-900 dark:text-slate-100">Plano {membro.plano}</p>
                <div className="flex items-center justify-between mt-2">
                  <Pill estado={membro.estado} />
                  <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">Válido até {membro.vencimento}</p>
                </div>
              </div>

              {membro.estado === "ativo" && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-700 shadow-sm p-4">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                    <DoorOpen size={14} className="text-[#3F8F87]" /> Check-in
                  </p>
                  {entradaAbertaHoje && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-2">
                      Estás no ginásio desde as {entradaAbertaHoje.entrada} — ainda não saíste.
                    </p>
                  )}
                  {entradaAbertaHoje ? (
                    <button
                      onClick={() => onRegistarSaida(membro)}
                      className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl text-sm"
                    >
                      <DoorClosed size={16} /> Fazer check-out
                    </button>
                  ) : (
                    <button
                      onClick={() => onRegistarEntrada(membro)}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-xl text-sm"
                    >
                      <DoorOpen size={16} /> Fazer check-in agora
                    </button>
                  )}
                </div>
              )}

              <button
                onClick={() => setAba("pagamentos")}
                className="w-full bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-3 rounded-xl text-sm"
              >
                Pagar mensalidade
              </button>
            </div>
          )}

          {aba === "cartao" && (
            <div className="text-center space-y-3">
              <div
                ref={cartaoRef}
                className="rounded-2xl p-5 text-white relative overflow-hidden shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_20px_40px_-12px_rgba(20,32,31,0.6)]"
                style={{ background: "linear-gradient(135deg, #1a2b2a 0%, #14201f 55%, #3F8F87 130%)" }}
              >
                {/* padrão decorativo subtil */}
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/5" />
                <div className="absolute -left-6 -bottom-10 w-28 h-28 rounded-full bg-white/5" />

                <div className="relative flex items-center justify-between mb-4">
                  <img src={dadosGinasio.logo || LOGO_BASE64} alt={dadosGinasio.nome} className="h-6 w-auto object-contain bg-white rounded p-1" />
                  <span className="text-[10px] font-bold tracking-widest text-[#8FC9C3]">MEMBRO</span>
                </div>

                <div className="relative flex items-center gap-3 text-left">
                  <div className="w-14 h-14 rounded-full bg-white/15 ring-2 ring-white/30 flex items-center justify-center font-bold text-lg shrink-0 overflow-hidden">
                    {membro.foto ? (
                      <img src={membro.foto} alt={membro.nome} className="w-full h-full object-cover" />
                    ) : (
                      membro.nome.split(" ").map((s) => s[0]).slice(0, 2).join("")
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{membro.nome}</p>
                    <p className="text-xs text-[#8FC9C3]">{membro.numero}</p>
                  </div>
                </div>

                <div className="relative w-28 h-28 bg-white mx-auto my-4 rounded-lg flex items-center justify-center p-2">
                  <QRCodeSVG valor={membro.numero} tamanho={96} />
                </div>

                <div className="relative flex items-center justify-between text-xs">
                  <div className="text-left">
                    <p className="text-[#8FC9C3]">Plano</p>
                    <p className="font-semibold">{membro.plano}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#8FC9C3]">Validade</p>
                    <p className="font-semibold">{membro.vencimento}</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500">FORÇA, FOCO E RESULTADOS</p>
              <button
                onClick={() => imprimirElemento(`Cartão — ${membro.nome}`, cartaoRef.current)}
                className="w-full ring-1 ring-slate-200 dark:ring-slate-600 text-slate-700 dark:text-slate-200 font-semibold py-2.5 rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Baixar cartão (PDF / imprimir)
              </button>
            </div>
          )}

          {aba === "pagamentos" && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800 ring-1 ring-slate-100 dark:ring-slate-700 rounded-2xl p-4">
                <p className="text-xs text-slate-400 dark:text-slate-500">Plano atual</p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">{membro.plano} — {kz(plano?.preco || 0)}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Escolher plano / subscrição</p>
                <div className="space-y-2">
                  {planos.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlanoEscolhido(p)}
                      className={`w-full text-left p-3 rounded-xl ring-1 flex items-center justify-between ${
                        (planoEscolhido?.id || plano?.id) === p.id
                          ? "bg-[#EAF5F4] dark:bg-slate-700 ring-[#3F8F87]"
                          : "ring-slate-100 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{p.nome}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">{p.duracaoDias} dias</p>
                      </div>
                      <p className="font-bold text-[#3F8F87]">{kz(p.preco)}</p>
                    </button>
                  ))}
                </div>
              </div>

              <PagarPorTransferenciaMembro
                membro={membro}
                plano={planoEscolhido || plano}
                dadosGinasio={dadosGinasio}
                onSubmeter={onSolicitarAprovacao}
              />

              <a
                href={linkWhatsApp(
                  dadosGinasio.telefone || dadosGinasio.telefonePix,
                  `Olá! Sou ${membro.nome} (${membro.numero}) e quero subscrever o plano ${(planoEscolhido || plano)?.nome} — ${kz((planoEscolhido || plano)?.preco || 0)}. Podem confirmar o pagamento comigo?`
                )}
                target="_blank" rel="noreferrer"
                className="w-full ring-1 ring-slate-200 dark:ring-slate-600 text-slate-700 dark:text-slate-200 font-semibold py-3 rounded-xl text-sm text-center block hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Prefiro combinar por WhatsApp
              </a>
            </div>
          )}

          {aba === "historico" && (
            <div className="space-y-2">
              {HISTORICO_PAGAMENTOS_MEMBRO.map((h) => (
                <div key={h.id} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{h.data}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{h.metodo}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{kz(h.valor)}</p>
                    <p className="text-xs text-emerald-600">{h.estado}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {aba === "compras" && (
            <div className="space-y-3">
              {minhasCompras.length === 0 && (
                <p className="text-sm text-slate-400 dark:text-slate-500">Ainda não tens compras registadas na loja.</p>
              )}
              {minhasCompras.map((c) => (
                <div key={c.id} className="border-b border-slate-50 dark:border-slate-700 pb-2.5 last:border-0">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">{c.data}</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{kz(c.total)}</span>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    {c.itens.map((i) => `${i.produto.nome} ×${i.quantidade}`).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}

          {aba === "aulas" && (
            <div className="space-y-3">
              {atividades.length === 0 ? (
                <p className="text-sm text-slate-400 dark:text-slate-500">Ainda não há aulas/atividades no horário.</p>
              ) : (
                atividades
                  .slice()
                  .sort((a, b) => a.diaSemana.localeCompare(b.diaSemana) || a.horaInicio.localeCompare(b.horaInicio))
                  .map((a) => {
                    const reservasDaAula = reservasAtividades.filter((r) => r.atividadeId === a.id);
                    const minhaReserva = reservasDaAula.find((r) => r.membroId === membro.id);
                    const cheia = a.capacidadeMax && reservasDaAula.length >= a.capacidadeMax && !minhaReserva;
                    return (
                      <div key={a.id} className="p-3 rounded-xl ring-1 ring-slate-100 dark:ring-slate-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{a.nome}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500">{a.diaSemana} · {a.horaInicio}–{a.horaFim}</p>
                          </div>
                          {a.capacidadeMax && (
                            <span className="text-[11px] text-slate-400 dark:text-slate-500">{reservasDaAula.length}/{a.capacidadeMax}</span>
                          )}
                        </div>
                        {minhaReserva ? (
                          <button
                            onClick={() => onCancelarReservaAtividade(minhaReserva.id, membro.nome)}
                            className="w-full mt-2 text-xs font-semibold text-red-500 ring-1 ring-red-200 dark:ring-red-800 rounded-lg py-2 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            Cancelar reserva ✓
                          </button>
                        ) : (
                          <button
                            onClick={async () => {
                              const resultado = await onReservarAtividade(a.id, membro);
                              if (resultado && !resultado.ok) alert(resultado.motivo);
                            }}
                            disabled={cheia}
                            className="w-full mt-2 text-xs font-semibold text-[#3F8F87] ring-1 ring-[#8FC9C3] rounded-lg py-2 hover:bg-[#EAF5F4] dark:hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-transparent"
                          >
                            {cheia ? "Sem vagas" : "Reservar vaga"}
                          </button>
                        )}
                      </div>
                    );
                  })
              )}
            </div>
          )}

          {aba === "mensagens" && (
            <MensagensParticipante
              mensagens={mensagens}
              participanteId={membro.id}
              participanteTipo="membro"
              participanteNome={membro.nome}
              onEnviar={onEnviarMensagem}
              onMarcarLidas={onMarcarMensagensLidas}
            />
          )}

          {aba === "perfil" && (
            <div className="space-y-4 text-sm">
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-400 dark:text-slate-500">Nome</span><span className="font-medium">{membro.nome}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-400 dark:text-slate-500">Nº de membro</span><span className="font-medium">{membro.numero}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-400 dark:text-slate-500">Telefone</span><span className="font-medium">{membro.telefone}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400 dark:text-slate-500">Plano</span><span className="font-medium">{membro.plano}</span>
                </div>
              </div>

              {minhasAdvertencias && minhasAdvertencias.length > 0 && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
                  <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                    <AlertTriangle size={14} /> Advertências ({minhasAdvertencias.length})
                  </p>
                  <div className="space-y-2">
                    {minhasAdvertencias.map((a) => (
                      <div key={a.id} className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 ring-1 ring-amber-200 dark:ring-amber-800">
                        <p className="text-xs text-slate-700 dark:text-slate-200">{a.motivo}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{a.data}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {minhasAvaliacoes && minhasAvaliacoes.length > 0 && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
                  <p className="font-semibold text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-[#3F8F87]" /> A minha evolução
                  </p>
                  <div className="space-y-1.5">
                    {minhasAvaliacoes.slice(0, 5).map((a) => (
                      <div key={a.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                        <span className="text-slate-600 dark:text-slate-300">{a.data}</span>
                        <span className="font-medium text-slate-900 dark:text-slate-100">{a.peso} kg{a.gordura ? ` · ${a.gordura}%` : ""}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {meuPlanoTreino && meuPlanoTreino.exercicios?.length > 0 && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
                  <p className="font-semibold text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                    <Dumbbell size={14} className="text-[#3F8F87]" /> {meuPlanoTreino.nome || "O meu plano de treino"}
                  </p>
                  <div className="space-y-1.5">
                    {meuPlanoTreino.exercicios.map((ex) => (
                      <div key={ex.id} className="text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                        <span className="font-medium text-slate-900 dark:text-slate-100">{ex.nome}</span>
                        <span className="text-slate-500 dark:text-slate-400"> — {ex.series} séries × {ex.repeticoes} reps{ex.notas ? ` · ${ex.notas}` : ""}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {contaAtual && onMudarSenha && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
                  <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1 flex items-center gap-1.5">
                    <KeyRound size={14} className="text-[#3F8F87]" /> Mudar palavra-passe
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-3">
                    Só tu conheces a tua palavra-passe — nem a recepção nem o administrador têm acesso a ela.
                  </p>
                  <FormMudarSenha onMudar={onMudarSenha} />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex border-t border-slate-100 dark:border-slate-700">
          {abas.map((a) => {
            const Icon = a.icon;
            const ativo = aba === a.id;
            return (
              <button
                key={a.id}
                onClick={() => setAba(a.id)}
                className={`relative flex-1 flex flex-col items-center gap-1 py-3 text-[11px] font-medium ${ativo ? "text-[#3F8F87]" : "text-slate-400 dark:text-slate-500"}`}
              >
                <span className="relative">
                  <Icon size={17} />
                  {!!a.badge && (
                    <span className="absolute -top-1.5 -right-2 bg-[#3F8F87] text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center">{a.badge}</span>
                  )}
                </span>
                {a.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// APP PRINCIPAL
// ---------------------------------------------------------------------
const MENU_ADMIN = [
  {
    grupo: "INÍCIO",
    itens: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    grupo: "GESTÃO",
    itens: [
      { id: "membros", label: "Membros", icon: Users },
      { id: "planos", label: "Planos", icon: ClipboardList },
      { id: "atividades", label: "Plano de Atividades", icon: Dumbbell },
      { id: "trainers", label: "Personal Trainers", icon: Dumbbell },
      { id: "funcionarios", label: "Funcionários", icon: UserCog },
    ],
  },
  {
    grupo: "FINANCEIRO",
    itens: [
      { id: "subscricoes", label: "Subscrições", icon: ClipboardList },
      { id: "pagamentos", label: "Pagamentos", icon: CreditCard },
      { id: "aprovacao", label: "Aprovação de Pagamentos", icon: ShieldCheck },
      { id: "caixa", label: "Caixa (por funcionário)", icon: Wallet },
      { id: "custos", label: "Centro de Custos", icon: TrendingUp },
      { id: "orcamento", label: "Orçamento (plano de compras)", icon: ClipboardList },
      { id: "faturacao", label: "Faturação / Recibos", icon: FileText },
    ],
  },
  {
    grupo: "VENDAS",
    itens: [
      { id: "pos", label: "Vendas (POS)", icon: ShoppingCart },
      { id: "stock", label: "Produtos / Stock", icon: Package },
    ],
  },
  {
    grupo: "ACESSOS",
    itens: [{ id: "acessos", label: "Controlo de Acessos", icon: DoorOpen }],
  },
  {
    grupo: "COMUNICAÇÃO",
    itens: [{ id: "mensagens", label: "Mensagens", icon: MessageSquare }],
  },
  {
    grupo: "RELATÓRIOS",
    itens: [
      { id: "notificacoes", label: "Notificações", icon: Bell },
      { id: "relatorios", label: "Relatórios", icon: BarChart3 },
      { id: "auditoria", label: "Auditoria", icon: ShieldCheck },
    ],
  },
  {
    grupo: "CONFIGURAÇÕES",
    itens: [
      { id: "utilizadores", label: "Utilizadores", icon: KeyRound },
      { id: "pagamentos-online", label: "Pagamentos Online", icon: Smartphone },
      { id: "configuracoes", label: "Dados do ginásio", icon: Settings },
      { id: "meu-perfil", label: "Meu Perfil", icon: UserIcon },
    ],
  },
];

const MENU_RECEPCAO = [
  {
    grupo: "",
    itens: [
      { id: "dashboard", label: "Início", icon: LayoutDashboard },
      { id: "membros", label: "Membros", icon: Users },
      { id: "subscricoes", label: "Subscrições", icon: ClipboardList },
      { id: "pagamentos", label: "Pagamentos", icon: CreditCard },
      { id: "faturacao", label: "Faturação / Recibos", icon: FileText },
      { id: "pos", label: "Vendas (POS)", icon: ShoppingCart },
      { id: "stock", label: "Stock / Produtos", icon: Package },
      { id: "acessos", label: "Controlo de Acessos", icon: DoorOpen },
      { id: "caixa", label: "O meu turno", icon: Wallet },
      { id: "mensagens", label: "Mensagens", icon: MessageSquare },
      { id: "meu-perfil", label: "Meu Perfil", icon: UserIcon },
    ],
  },
];

// Personal Trainer só vê os seus próprios alunos e o seu perfil — sem
// acesso a pagamentos, vendas, stock ou dados de outros membros/turmas.
const MENU_TRAINER = [
  {
    grupo: "",
    itens: [
      { id: "meus-alunos", label: "Os meus alunos", icon: Users },
      { id: "mensagens", label: "Mensagens", icon: MessageSquare },
      { id: "meu-perfil", label: "Meu Perfil", icon: UserIcon },
    ],
  },
];

// ---------------------------------------------------------------------
// TELA DE LOGIN
// ---------------------------------------------------------------------
function Login({ contas, membros, dadosGinasio, onEntrar, onCriarAdmin, onRedefinirSenha, escuro, setEscuro }) {
  const existeAdmin = contas.some((c) => c.perfil === "administrador");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  // Formulário de criação da conta de Administrador (só aparece se ainda não existir nenhuma)
  const [nomeAdmin, setNomeAdmin] = useState("");
  const [emailAdmin, setEmailAdmin] = useState("");
  const [senhaAdmin, setSenhaAdmin] = useState("");
  const [confirmarSenhaAdmin, setConfirmarSenhaAdmin] = useState("");
  const [erroAdmin, setErroAdmin] = useState("");

  // Recuperação de palavra-passe
  const [modoRecuperar, setModoRecuperar] = useState(false);
  const [emailRecuperar, setEmailRecuperar] = useState("");
  const [etapaRecuperar, setEtapaRecuperar] = useState("email"); // "email" | "confirmar" | "bloqueado" | "nova-senha" | "concluido"
  const [confirmacao, setConfirmacao] = useState(""); // telefone (membro) ou nome completo (admin)
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");
  const [erroRecuperar, setErroRecuperar] = useState("");
  const [contaRecuperar, setContaRecuperar] = useState(null);

  const submeterLogin = (e) => {
    e.preventDefault();
    const conta = contas.find(
      (c) => c.email.toLowerCase() === email.toLowerCase() && c.senha === senha
    );
    if (!conta) {
      setErro("E-mail ou palavra-passe incorretos.");
      return;
    }
    if (conta.desativada) {
      setErro("Esta conta foi cancelada. Pede ao administrador para a reativar.");
      return;
    }
    setErro("");
    onEntrar(conta);
  };

  const submeterCriarAdmin = (e) => {
    e.preventDefault();
    if (!nomeAdmin || !emailAdmin || !senhaAdmin) {
      setErroAdmin("Preenche todos os campos.");
      return;
    }
    if (senhaAdmin.length < 6) {
      setErroAdmin("A palavra-passe deve ter pelo menos 6 caracteres.");
      return;
    }
    if (senhaAdmin !== confirmarSenhaAdmin) {
      setErroAdmin("As palavras-passe não coincidem.");
      return;
    }
    setErroAdmin("");
    onCriarAdmin({ nome: nomeAdmin, email: emailAdmin, senha: senhaAdmin });
  };

  const pedirRecuperacao = (e) => {
    e.preventDefault();
    const conta = contas.find((c) => c.email.toLowerCase() === emailRecuperar.toLowerCase());
    if (!conta) {
      setErroRecuperar("Não encontrámos nenhuma conta com este e-mail.");
      return;
    }
    setErroRecuperar("");
    setContaRecuperar(conta);
    if (conta.perfil === "recepcionista" || conta.perfil === "personal_trainer") {
      // Contas de staff só podem ser repostas pelo administrador, dentro do sistema —
      // evita que alguém com acesso só ao e-mail consiga entrar como funcionário.
      setEtapaRecuperar("bloqueado");
    } else {
      setEtapaRecuperar("confirmar");
    }
  };

  const confirmarIdentidade = (e) => {
    e.preventDefault();
    if (contaRecuperar.perfil === "membro") {
      const membro = membros.find((m) => m.id === contaRecuperar.membroId);
      const alvo = (membro?.telefone || "").replace(/\D/g, "");
      const dado = confirmacao.replace(/\D/g, "");
      if (!alvo || dado !== alvo) {
        setErroRecuperar("O número de telefone não corresponde ao que temos registado.");
        return;
      }
    } else {
      // administrador — confirma o nome completo tal como está na conta
      if (confirmacao.trim().toLowerCase() !== contaRecuperar.nome.trim().toLowerCase()) {
        setErroRecuperar("O nome não corresponde ao que temos registado.");
        return;
      }
    }
    setErroRecuperar("");
    setEtapaRecuperar("nova-senha");
  };

  const confirmarNovaPassword = (e) => {
    e.preventDefault();
    if (novaSenha.length < 6) {
      setErroRecuperar("A palavra-passe deve ter pelo menos 6 caracteres.");
      return;
    }
    if (novaSenha !== confirmarNovaSenha) {
      setErroRecuperar("As palavras-passe não coincidem.");
      return;
    }
    onRedefinirSenha(emailRecuperar, novaSenha);
    setErroRecuperar("");
    setEtapaRecuperar("concluido");
  };

  const fecharRecuperacao = () => {
    setModoRecuperar(false);
    setEtapaRecuperar("email");
    setEmailRecuperar("");
    setConfirmacao("");
    setContaRecuperar(null);
    setNovaSenha("");
    setConfirmarNovaSenha("");
    setErroRecuperar("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6">
      <button
        onClick={() => setEscuro(!escuro)}
        className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
      >
        {escuro ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img src={dadosGinasio.logo || LOGO_BASE64} alt={dadosGinasio.nome} className="h-20 w-auto object-contain" />
          <p className="text-[#5AAFA8] text-xs font-semibold tracking-[0.2em] mt-3">
            FORÇA, FOCO E RESULTADOS
          </p>
        </div>

        {!existeAdmin ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-700 p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-16px_rgba(15,23,42,0.20)]">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck size={16} className="text-[#3F8F87]" />
              <h2 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Criar conta de Administrador</h2>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
              Esta é a primeira utilização do sistema. Cria a conta principal do ginásio —
              depois de entrares, é a partir dela que crias tudo o resto (recepcionistas,
              personal trainers e membros).
            </p>
            <form onSubmit={submeterCriarAdmin} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Nome completo</label>
                <input value={nomeAdmin} onChange={(e) => setNomeAdmin(e.target.value)}
                  className="w-full mt-1 px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1] focus:border-[#5AAFA8]" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">E-mail</label>
                <input type="email" value={emailAdmin} onChange={(e) => setEmailAdmin(e.target.value)}
                  placeholder="admin@catumbelagym.ao"
                  className="w-full mt-1 px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1] focus:border-[#5AAFA8]" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Palavra-passe</label>
                  <input type="password" value={senhaAdmin} onChange={(e) => setSenhaAdmin(e.target.value)}
                    className="w-full mt-1 px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1] focus:border-[#5AAFA8]" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Confirmar</label>
                  <input type="password" value={confirmarSenhaAdmin} onChange={(e) => setConfirmarSenhaAdmin(e.target.value)}
                    className="w-full mt-1 px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1] focus:border-[#5AAFA8]" />
                </div>
              </div>
              {erroAdmin && <p className="text-xs text-red-500">{erroAdmin}</p>}
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg text-sm mt-2">
                <ShieldCheck size={16} /> Criar conta e entrar
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-700 p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-16px_rgba(15,23,42,0.20)]">
            <form onSubmit={submeterLogin} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nome@catumbelagym.ao"
                  className="w-full mt-1 px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1] focus:border-[#5AAFA8]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500">Palavra-passe</label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  className="w-full mt-1 px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1] focus:border-[#5AAFA8]"
                />
              </div>
              {erro && <p className="text-xs text-red-500">{erro}</p>}
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg text-sm mt-2">
                <LogIn size={16} /> Entrar
              </button>
              <button type="button" onClick={() => setModoRecuperar(true)} className="w-full text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-300 pt-1">
                Recuperar palavra-passe
              </button>
            </form>
          </div>
        )}
      </div>

      {modoRecuperar && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm relative">
            <button onClick={fecharRecuperacao} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>

            {etapaRecuperar === "email" && (
              <>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Recuperar palavra-passe</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">Indica o e-mail da tua conta.</p>
                <form onSubmit={pedirRecuperacao} className="space-y-3">
                  <input type="email" placeholder="nome@catumbelagym.ao" value={emailRecuperar} onChange={(e) => setEmailRecuperar(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                  {erroRecuperar && <p className="text-xs text-red-500">{erroRecuperar}</p>}
                  <button className="w-full bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg text-sm">
                    Continuar
                  </button>
                </form>
              </>
            )}

            {etapaRecuperar === "bloqueado" && (
              <div className="text-center py-4">
                <ShieldCheck className="mx-auto text-amber-500 mb-3" size={36} />
                <p className="font-semibold text-slate-900 dark:text-slate-100">Pede ao administrador</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4">
                  Por segurança, palavras-passe de contas de {ROTULO_PERFIL[contaRecuperar?.perfil]} só podem ser repostas
                  pelo administrador, dentro do sistema (Configurações → Utilizadores).
                </p>
                <button onClick={fecharRecuperacao} className="w-full ring-1 ring-slate-200 dark:ring-slate-600 text-slate-600 dark:text-slate-300 font-semibold py-2.5 rounded-lg text-sm">
                  Entendi
                </button>
              </div>
            )}

            {etapaRecuperar === "confirmar" && (
              <>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Confirmar identidade</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
                  {contaRecuperar?.perfil === "membro"
                    ? "Para confirmar que és tu, indica o número de telefone associado à tua conta de membro."
                    : "Para confirmar que és tu, indica o teu nome completo tal como está registado."}
                </p>
                <form onSubmit={confirmarIdentidade} className="space-y-3">
                  <input
                    type={contaRecuperar?.perfil === "membro" ? "tel" : "text"}
                    placeholder={contaRecuperar?.perfil === "membro" ? "Nº de telefone" : "Nome completo"}
                    value={confirmacao}
                    onChange={(e) => setConfirmacao(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]"
                  />
                  {erroRecuperar && <p className="text-xs text-red-500">{erroRecuperar}</p>}
                  <button className="w-full bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg text-sm">
                    Confirmar
                  </button>
                </form>
              </>
            )}

            {etapaRecuperar === "nova-senha" && (
              <>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Definir nova palavra-passe</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">Conta confirmada: {emailRecuperar}</p>
                <form onSubmit={confirmarNovaPassword} className="space-y-3">
                  <input type="password" placeholder="Nova palavra-passe" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                  <input type="password" placeholder="Confirmar palavra-passe" value={confirmarNovaSenha} onChange={(e) => setConfirmarNovaSenha(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]" />
                  {erroRecuperar && <p className="text-xs text-red-500">{erroRecuperar}</p>}
                  <button className="w-full bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg text-sm">
                    Guardar nova palavra-passe
                  </button>
                </form>
              </>
            )}

            {etapaRecuperar === "concluido" && (
              <div className="text-center py-4">
                <CheckCircle2 className="mx-auto text-emerald-500 mb-3" size={36} />
                <p className="font-semibold text-slate-900 dark:text-slate-100">Palavra-passe atualizada</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4">Já podes entrar com a nova palavra-passe.</p>
                <button onClick={fecharRecuperacao} className="w-full bg-gradient-to-b from-[#4FA69D] to-[#357A73] hover:from-[#459087] hover:to-[#2E6C66] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(20,32,31,0.35)] active:shadow-[inset_0_1px_2px_rgba(20,32,31,0.35)] active:translate-y-px transition-all text-white font-semibold py-2.5 rounded-lg text-sm">
                  Voltar ao login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------
// PESQUISA GLOBAL (cabeçalho)
// ---------------------------------------------------------------------
function PesquisaGlobal({ membros, onIrParaMembros }) {
  const [aberta, setAberta] = useState(false);
  const [q, setQ] = useState("");

  const resultados = q.trim()
    ? membros.filter(
        (m) => m.nome.toLowerCase().includes(q.toLowerCase()) || m.numero.toLowerCase().includes(q.toLowerCase())
      ).slice(0, 6)
    : [];

  const fechar = () => {
    setAberta(false);
    setQ("");
  };

  return (
    <div className="relative hidden sm:block">
      <button onClick={() => setAberta((a) => !a)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
        <Search size={18} />
      </button>
      {aberta && (
        <>
          <div className="fixed inset-0 z-40" onClick={fechar} />
          <div className="absolute right-0 top-8 z-50 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-lg ring-1 ring-slate-200 dark:ring-slate-700 p-2">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Pesquisar membro por nome ou número..."
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE4E1]"
            />
            {q.trim() && (
              <div className="mt-2 max-h-64 overflow-y-auto">
                {resultados.length === 0 ? (
                  <p className="text-xs text-slate-400 dark:text-slate-500 px-2 py-3">Nenhum membro encontrado.</p>
                ) : (
                  resultados.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => { onIrParaMembros(); fechar(); }}
                      className="w-full text-left px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{m.nome}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{m.numero} · {m.plano}</p>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function CatumbelaGymApp() {
  const [autenticado, setAutenticado] = useLocalOnly("autenticado", false);
  const [perfil, setPerfil] = useLocalOnly("perfil", null);
  const [contaAtual, setContaAtual] = useLocalOnly("contaAtual", null);
  const [tela, setTela] = useState("dashboard");
  const [escuro, setEscuro] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [statusSync, setStatusSync] = useState("a-ligar"); // "a-ligar" | "ligado" | "offline"
  const [avisoArmazenamentoCheio, setAvisoArmazenamentoCheio] = useState(false);
  const [avisoConflito, setAvisoConflito] = useState(null); // nome da coleção em conflito, ou null
  const [avisoBackup, setAvisoBackup] = useState(false);
  const [atualizadoAgora, setAtualizadoAgora] = useState(false); // pisca brevemente quando chega uma atualização em tempo real de outro dispositivo
  const backupAutoDisparado = useRef(false);
  const timeoutAtualizadoRef = useRef(null);

  // Escuta falhas reais de gravação (ex.: espaço do navegador esgotado) e avisa
  // a pessoa de forma visível — antes disto, uma gravação podia falhar em
  // silêncio e os dados pareciam "não mudar nada", incluindo em relatórios.
  useEffect(() => {
    const aoFalhar = () => setAvisoArmazenamentoCheio(true);
    window.addEventListener("catumbela:erro-armazenamento", aoFalhar);
    return () => window.removeEventListener("catumbela:erro-armazenamento", aoFalhar);
  }, []);

  // Escuta conflitos de sincronização entre dispositivos (ex.: dois
  // computadores a mexer nos mesmos dados quase ao mesmo tempo). A deteção
  // já existia mas nunca mostrava nada — agora avisa mesmo.
  useEffect(() => {
    const aoDetetarConflito = (e) => setAvisoConflito(e.detail?.chave || "dados");
    window.addEventListener("catumbela:conflito-sincronizacao", aoDetetarConflito);
    return () => window.removeEventListener("catumbela:conflito-sincronizacao", aoDetetarConflito);
  }, []);

  // Escuta atualizações em tempo real vindas de outros dispositivos (ex.:
  // um atleta a fazer check-in no telemóvel dele, enquanto vês o Controlo de
  // Acessos noutro ecrã) — pisca brevemente o indicador para dares por isso.
  useEffect(() => {
    const aoAtualizar = () => {
      setAtualizadoAgora(true);
      if (timeoutAtualizadoRef.current) clearTimeout(timeoutAtualizadoRef.current);
      timeoutAtualizadoRef.current = setTimeout(() => setAtualizadoAgora(false), 2000);
    };
    window.addEventListener("catumbela:atualizado-tempo-real", aoAtualizar);
    return () => {
      window.removeEventListener("catumbela:atualizado-tempo-real", aoAtualizar);
      if (timeoutAtualizadoRef.current) clearTimeout(timeoutAtualizadoRef.current);
    };
  }, []);
  const [membros, setMembros] = usePersistente("membros", MEMBROS_INICIAIS, setStatusSync);

  // Corrige automaticamente o estado "ativo"/"vencido" com base na data real,
  // sempre que a app abre e a cada hora — sem isto, um membro cuja mensalidade
  // vence nunca deixava de aparecer como "Ativo". Nunca mexe em quem foi
  // manualmente "suspenso" ou está "pausada" (ex.: atleta a trabalhar fora).
  useEffect(() => {
    const recalcular = () => {
      const hojeStr = new Date().toISOString().slice(0, 10);
      setMembros((atual) =>
        atual.map((m) => {
          if (m.estado === "suspenso" || m.estado === "pausada" || m.estado === "cancelado" || !m.vencimento) return m;
          const novoEstado = m.vencimento < hojeStr ? "vencido" : "ativo";
          return m.estado === novoEstado ? m : { ...m, estado: novoEstado };
        })
      );
    };
    recalcular();
    const intervalo = setInterval(recalcular, 60 * 60 * 1000); // repete a cada hora
    return () => clearInterval(intervalo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [planos, setPlanos] = usePersistente("planos", PLANOS_INICIAIS, setStatusSync);
  const [produtos, setProdutos] = usePersistente("produtos", PRODUTOS_INICIAIS, setStatusSync);
  const [trainers, setTrainers] = usePersistente("trainers", PERSONAL_TRAINERS_INICIAIS, setStatusSync);
  const [dadosGinasio, setDadosGinasio] = usePersistente("dadosGinasio", {
    nome: "Catumbela Gym",
    morada: "",
    cidade: "",
    nif: "",
    telefone: "",
    email: "",
    // Mantidos para compatibilidade com quem já tinha só uma conta configurada —
    // ver "contasBancarias" abaixo, que suporta várias contas/bancos.
    titular: "",
    banco: DADOS_BANCARIOS_GYM.banco,
    numeroConta: "",
    moeda: "AOA",
    iban: DADOS_BANCARIOS_GYM.iban,
    swift: "",
    notasBancarias: "",
    telefonePix: DADOS_BANCARIOS_GYM.telefone,
    contasBancarias: [], // [{ id, tipo: "iban"|"express", banco, titular, iban, telefone, moeda }]
    logo: null, // se null, usa o logótipo original (LOGO_BASE64)
  }, setStatusSync);

  // Confirma se já passou o prazo da cópia de segurança (consoante a
  // frequência escolhida em Configurações) — e, na opção "Automático",
  // tenta descarregar a cópia sozinho assim que é necessário.
  useEffect(() => {
    if (perfil !== "administrador") return;
    try {
      const ultimo = window.localStorage.getItem(CHAVE_ULTIMO_BACKUP);
      const frequencia = dadosGinasio.frequenciaBackup || "15dias";
      const diasLimite = FREQUENCIAS_BACKUP[frequencia]?.dias ?? 15;
      const diasPassados = ultimo ? (Date.now() - new Date(ultimo).getTime()) / (1000 * 60 * 60 * 24) : Infinity;
      const emAtraso = diasPassados > diasLimite;
      setAvisoBackup(emAtraso);
      if (emAtraso && frequencia === "automatico" && !backupAutoDisparado.current) {
        backupAutoDisparado.current = true;
        descarregarCopiaSeguranca();
      }
    } catch {
      // sem acesso ao localStorage — não bloqueia o resto da app
    }
  }, [dadosGinasio.frequenciaBackup, perfil]);

  const [contas, setContas] = usePersistente("contas", CONTAS_INICIAIS, setStatusSync);
  const [acessos, setAcessos, adicionarAcessoSeguro] = usePersistente("acessos", ACESSOS_INICIAIS, setStatusSync);
  const [pagamentosFeitos, setPagamentosFeitos] = usePersistente("pagamentosFeitos", [], setStatusSync);
  const [movimentosBancarios, setMovimentosBancarios] = usePersistente("movimentosBancarios", [], setStatusSync);
  const [movimentosCaixa, setMovimentosCaixa] = usePersistente("movimentosCaixa", [], setStatusSync);
  const [comprasMembros, setComprasMembros] = usePersistente("comprasMembros", [], setStatusSync); // histórico de compras por membro (POS)
  const [vendasProdutos, setVendasProdutos] = usePersistente("vendasProdutos", [], setStatusSync); // histórico de vendas por produto (todas as vendas POS)
  const [auditLog, setAuditLog] = usePersistente("auditLog", [], setStatusSync);
  const [pagamentosPendentes, setPagamentosPendentes, adicionarPagamentoPendenteSeguro] = usePersistente("pagamentosPendentes", [], setStatusSync);
  const [custos, setCustos] = usePersistente("custos", [], setStatusSync);
  const [faturas, setFaturas] = usePersistente("faturas", [], setStatusSync);
  const [advertencias, setAdvertencias] = usePersistente("advertencias", [], setStatusSync);
  const [orcamento, setOrcamento] = usePersistente("orcamento", [], setStatusSync);
  const [atividades, setAtividades] = usePersistente("atividades", [], setStatusSync);
  const [reservasAtividades, setReservasAtividades, adicionarReservaSegura, definirReservasSemGravar] = usePersistente("reservasAtividades", [], setStatusSync);
  const [avaliacoesFisicas, setAvaliacoesFisicas] = usePersistente("avaliacoesFisicas", [], setStatusSync);
  const [planosTreino, setPlanosTreino] = usePersistente("planosTreino", [], setStatusSync);
  const [fechosTurno, setFechosTurno] = usePersistente("fechosTurno", [], setStatusSync);
  const [mensagens, setMensagens, adicionarMensagemSegura] = usePersistente("mensagens", [], setStatusSync);

  const registarAuditoria = (acao, detalhe) => {
    const nomeAtor = contaAtual?.nome || (perfil === "administrador" ? "Administrador" : perfil === "recepcionista" ? "Recepção" : "Sistema");
    setAuditLog((atual) => [
      { utilizador: nomeAtor, acao, detalhe, hora: new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }) },
      ...atual,
    ]);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", escuro);
  }, [escuro]);

  useEffect(() => {
    setMenuAberto(false);
  }, [tela]);

  const sair = () => {
    setAutenticado(false);
    setPerfil(null);
    setContaAtual(null);
    setTela("dashboard");
  };

  const criarContaAdmin = ({ nome, email, senha }) => {
    const conta = { id: 1, nome, email, senha, perfil: "administrador" };
    setContas([conta]);
    setPerfil("administrador");
    setContaAtual(conta);
    setTela("dashboard");
    setAutenticado(true);
  };

  const entrarComConta = (conta) => {
    setPerfil(conta.perfil);
    setContaAtual(conta);
    setTela(conta.perfil === "personal_trainer" ? "meus-alunos" : "dashboard");
    setAutenticado(true);
  };

  const redefinirSenha = (email, novaSenha) => {
    setContas((atual) =>
      atual.map((c) => (c.email.toLowerCase() === email.toLowerCase() ? { ...c, senha: novaSenha } : c))
    );
  };

  // O próprio utilizador muda a sua palavra-passe — precisa de saber a atual.
  // Nem o administrador consegue fazer isto por outra pessoa.
  const alterarPropriaSenha = (senhaAtual, novaSenha) => {
    if (!contaAtual || contaAtual.senha !== senhaAtual) return false;
    setContas((atual) => atual.map((c) => (c.id === contaAtual.id ? { ...c, senha: novaSenha } : c)));
    setContaAtual((atual) => ({ ...atual, senha: novaSenha }));
    registarAuditoria("Alterou a própria palavra-passe", contaAtual.nome);
    return true;
  };

  // Só o administrador pode repor a palavra-passe de contas de staff
  // (recepcionista/personal trainer) — nunca vê a antiga, só define uma nova.
  const reporSenhaConta = (contaId, novaSenha) => {
    const conta = contas.find((c) => c.id === contaId);
    setContas((atual) => atual.map((c) => (c.id === contaId ? { ...c, senha: novaSenha } : c)));
    registarAuditoria("Repôs palavra-passe de utilizador", conta?.nome || "—");
  };

  if (!autenticado) {
    return (
      <>
        {MODO_TESTE_ATIVO && (
          <div className="bg-amber-400 text-amber-950 text-center text-sm font-bold py-2 px-4 flex items-center justify-center gap-3 flex-wrap">
            🧪 MODO DE TESTE — estes dados não afetam o ginásio real
            <button onClick={() => alternarModoTeste(false)} className="underline hover:no-underline">Sair do modo de teste</button>
          </div>
        )}
        <Login
          contas={contas}
          membros={membros}
          dadosGinasio={dadosGinasio}
          escuro={escuro}
          setEscuro={setEscuro}
          onCriarAdmin={criarContaAdmin}
          onEntrar={entrarComConta}
          onRedefinirSenha={redefinirSenha}
        />
        {!MODO_TESTE_ATIVO && (
          <button
            onClick={() => alternarModoTeste(true)}
            className="fixed bottom-4 right-4 text-xs font-medium text-slate-400 hover:text-[#3F8F87] bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-600 px-3 py-2 rounded-full shadow-sm"
          >
            🧪 Entrar em modo de teste
          </button>
        )}
      </>
    );
  }

  const adicionarMembro = (novo) => {
    // Numeração sequencial: pega o maior número de membro já existente e soma 1 (começa em CG-000001)
    const maiorNumero = membros.reduce((max, m) => {
      const n = parseInt(m.numero.replace("CG-", ""), 10);
      return n > max ? n : max;
    }, 0);
    const numero = "CG-" + String(maiorNumero + 1).padStart(6, "0");
    // Um atleta inscrito de novo NÃO fica "Ativo" automaticamente — só ativa
    // depois de subscrever e pagar um plano, em Subscrições. A única exceção
    // é quando explicitamente indicas um vencimento (membro já existente
    // antes deste sistema, que já tinha uma subscrição paga).
    const vencimentoFinal = novo.vencimento || null;
    const estadoFinal = vencimentoFinal ? "ativo" : "sem-subscricao";
    const dataInscricaoFinal = novo.dataInscricao || new Date().toISOString().slice(0, 10);
    const novoId = Math.max(0, ...membros.map((m) => m.id)) + 1;
    const membroNovo = {
      id: novoId,
      numero,
      nome: novo.nome,
      telefone: novo.telefone,
      plano: novo.plano,
      foto: novo.foto || null,
      email: novo.email || null,
      dataInscricao: dataInscricaoFinal,
      dataNascimento: novo.dataNascimento || null,
      vencimento: vencimentoFinal,
      estado: estadoFinal,
    };
    setMembros([...membros, membroNovo]);
    // Se foi indicado e-mail e palavra-passe, cria também a conta de acesso à área do membro
    if (novo.email && novo.senha) {
      setContas((atual) => [
        ...atual,
        {
          id: Math.max(0, ...atual.map((c) => c.id)) + 1,
          nome: novo.nome,
          email: novo.email,
          senha: novo.senha,
          perfil: "membro",
          membroId: novoId,
        },
      ]);
    }
    // A inscrição (matrícula) é um pagamento separado do plano — o plano
    // só é mesmo pago/ativado depois, em Subscrições. Se for indicado um
    // valor de inscrição e um método, gera logo o recibo correspondente.
    let reciboInscricao = null;
    if (novo.taxaInscricao && Number(novo.taxaInscricao) > 0 && novo.metodoTaxaInscricao) {
      reciboInscricao = gerarDocumentoFaturacao({
        tipo: "RECIBO",
        membro: membroNovo,
        itens: [{ referencia: "TAXA-INSCRICAO", descricao: "Taxa de inscrição", qtd: 1, precoUnit: Number(novo.taxaInscricao), total: Number(novo.taxaInscricao) }],
        valor: Number(novo.taxaInscricao),
        metodo: novo.metodoTaxaInscricao,
        tipoReceita: "inscricao",
      });
    }
    registarAuditoria(
      "Inscreveu novo membro",
      `${novo.nome} — ${numero}${novo.email ? " · com acesso à área do membro" : ""}${reciboInscricao ? ` · Recibo de inscrição ${reciboInscricao.numero}` : ""}`
    );
    return reciboInscricao;
  };

  const atualizarMembro = (id, dados) => {
    setMembros((atual) =>
      atual.map((m) => {
        if (m.id !== id) return m;
        const vencimento = dados.vencimento || m.vencimento;
        const hojeStr = new Date().toISOString().slice(0, 10);
        const novoEstado =
          m.estado === "suspenso" || m.estado === "pausada" || m.estado === "cancelado"
            ? m.estado
            : !vencimento
            ? "sem-subscricao"
            : vencimento < hojeStr
            ? "vencido"
            : "ativo";
        return {
          ...m,
          nome: dados.nome,
          telefone: dados.telefone,
          plano: dados.plano,
          foto: dados.foto || null,
          dataInscricao: dados.dataInscricao || m.dataInscricao,
          dataNascimento: dados.dataNascimento || m.dataNascimento || null,
          vencimento,
          estado: novoEstado,
        };
      })
    );

    const contaExistente = contas.find((c) => c.perfil === "membro" && c.membroId === id);

    if (dados.email) {
      // criar, atualizar ou manter a conta de acesso
      setContas((atual) => {
        if (contaExistente) {
          return atual.map((c) =>
            c.id === contaExistente.id
              ? { ...c, nome: dados.nome, email: dados.email, senha: dados.senha ? dados.senha : c.senha }
              : c
          );
        }
        if (!dados.senha) return atual; // precisa de senha para criar acesso novo
        return [
          ...atual,
          { id: Math.max(0, ...atual.map((c) => c.id)) + 1, nome: dados.nome, email: dados.email, senha: dados.senha, perfil: "membro", membroId: id },
        ];
      });
    } else if (contaExistente) {
      // e-mail apagado → remove o acesso deste membro
      setContas((atual) => atual.filter((c) => c.id !== contaExistente.id));
    }

    registarAuditoria("Editou dados do membro", dados.nome);
  };

  // ELIMINAR = apaga mesmo tudo, incluindo o rasto financeiro (faturas,
  // pagamentos, movimentos de Caixa/Banco) — para nunca ficar "dinheiro
  // fantasma" a contar no lucro de alguém que já não existe no sistema.
  // Usa "Cancelar" em vez disto se só quiseres marcar como inativo mantendo
  // o histórico real.
  const removerMembro = (id) => {
    const membro = membros.find((m) => m.id === id);
    const numerosDocumentos = faturas.filter((f) => f.membro?.id === id).map((f) => f.numero);
    setFaturas((atual) => atual.filter((f) => f.membro?.id !== id));
    setPagamentosFeitos((atual) => atual.filter((p) => !numerosDocumentos.includes(p.numero)));
    setMovimentosCaixa((atual) => atual.filter((m) => !numerosDocumentos.includes(m.origemNumero)));
    setMovimentosBancarios((atual) => atual.filter((m) => !numerosDocumentos.includes(m.origemNumero)));
    setMembros((atual) => atual.filter((m) => m.id !== id));
    setContas((atual) => atual.filter((c) => !(c.perfil === "membro" && c.membroId === id)));
    setComprasMembros((atual) => atual.filter((c) => c.membroId !== id));
    if (membro) {
      setAcessos((atual) => atual.filter((a) => a.numero !== membro.numero));
    }
    setPagamentosPendentes((atual) => atual.filter((p) => p.membro?.id !== id));
    setAdvertencias((atual) => atual.filter((a) => a.membroId !== id));
    // Estas coleções foram criadas em fases mais recentes — sem isto, "Eliminar"
    // deixava para trás avaliações, plano de treino, reservas e conversas de
    // alguém que já não existe no sistema.
    setAvaliacoesFisicas((atual) => atual.filter((a) => a.membroId !== id));
    setPlanosTreino((atual) => atual.filter((p) => p.membroId !== id));
    setReservasAtividades((atual) => atual.filter((r) => r.membroId !== id));
    setMensagens((atual) => atual.filter((m) => !(m.participanteTipo === "membro" && m.participanteId === id)));
    registarAuditoria(
      "Eliminou membro e TODOS os seus dados (incluindo financeiros)",
      membro ? `${membro.nome} — ${membro.numero}` : `ID ${id}`
    );
  };

  // CANCELAR = não apaga nada — só marca o membro como inativo, mantendo
  // conta, compras, faturas e todo o histórico exatamente como estava.
  const cancelarMembro = (id) => {
    const membro = membros.find((m) => m.id === id);
    if (!membro) return;
    setMembros((atual) =>
      atual.map((m) => (m.id === id ? { ...m, estadoAntesCancelar: m.estado, estado: "cancelado" } : m))
    );
    registarAuditoria("Cancelou membro (mantém todo o registo/histórico)", `${membro.nome} — ${membro.numero}`);
  };

  const reativarMembro = (id) => {
    const membro = membros.find((m) => m.id === id);
    if (!membro || membro.estado !== "cancelado") return;
    setMembros((atual) =>
      atual.map((m) => {
        if (m.id !== id) return m;
        const hojeStr = new Date().toISOString().slice(0, 10);
        const { estadoAntesCancelar, ...resto } = m;
        const estadoRestaurado = estadoAntesCancelar || (!m.vencimento ? "sem-subscricao" : m.vencimento < hojeStr ? "vencido" : "ativo");
        return { ...resto, estado: estadoRestaurado };
      })
    );
    registarAuditoria("Reativou membro cancelado", membro.nome);
  };

  const adicionarAdvertencia = (membroId, motivo) => {
    const membro = membros.find((m) => m.id === membroId);
    setAdvertencias((atual) => [
      { id: Math.max(0, ...atual.map((a) => a.id || 0)) + 1, membroId, motivo, data: new Date().toLocaleDateString("pt-PT"), registadoPor: contaAtual?.nome || "—" },
      ...atual,
    ]);
    registarAuditoria("Emitiu advertência", `${membro?.nome || membroId} — ${motivo}`);
  };

  const removerAdvertencia = (id) => {
    setAdvertencias((atual) => atual.filter((a) => a.id !== id));
    registarAuditoria("Removeu advertência", `ID ${id}`);
  };

  const salvarPlano = (dados) => {
    const planoAntigo = dados.id ? planos.find((p) => p.id === dados.id) : null;
    setPlanos((atual) => {
      if (dados.id) {
        return atual.map((p) => (p.id === dados.id ? { ...p, ...dados } : p));
      }
      return [...atual, { ...dados, id: Math.max(0, ...atual.map((p) => p.id)) + 1 }];
    });
    // Se o NOME do plano mudou, atualiza também todos os membros que já
    // estavam nesse plano — a ligação é feita pelo nome, por isso, sem isto,
    // renomear um plano deixava esses membros "presos" a um nome que já não
    // existe (o botão de gerar recibo/fatura falhava sem nenhum aviso).
    if (planoAntigo && planoAntigo.nome !== dados.nome) {
      const membrosAfetados = membros.filter((m) => m.plano === planoAntigo.nome).length;
      setMembros((atual) => atual.map((m) => (m.plano === planoAntigo.nome ? { ...m, plano: dados.nome } : m)));
      registarAuditoria(
        `Renomeou Plano "${planoAntigo.nome}" → "${dados.nome}"`,
        `${membrosAfetados} membro(s) atualizados automaticamente para o nome novo`
      );
    }
    if (planoAntigo && planoAntigo.preco !== dados.preco) {
      registarAuditoria(
        `Alterou preço do Plano ${dados.nome}`,
        `De ${kz(planoAntigo.preco)} → ${kz(dados.preco)}`
      );
    } else if (!dados.id) {
      registarAuditoria("Criou novo plano", dados.nome);
    }
  };

  const adicionarTrainer = (novo) => {
    setTrainers([...trainers, { ...novo, id: Math.max(0, ...trainers.map((t) => t.id)) + 1 }]);
  };

  const atribuirAluno = (membroId, trainerId) => {
    setMembros((atual) => atual.map((m) => (m.id === membroId ? { ...m, trainerId } : m)));
  };

  const adicionarProduto = (novo) => {
    setProdutos([...produtos, { ...novo, id: Math.max(0, ...produtos.map((p) => p.id)) + 1 }]);
    registarAuditoria("Criou novo produto", novo.nome);
  };

  const atualizarProduto = (id, dados) => {
    setProdutos((atual) => atual.map((p) => (p.id === id ? { ...dados, id } : p)));
    registarAuditoria("Editou produto", dados.nome);
  };

  const removerProduto = (id) => {
    const produto = produtos.find((p) => p.id === id);
    setProdutos(produtos.filter((p) => p.id !== id));
    registarAuditoria("Eliminou produto", produto?.nome);
  };

  // Entrada de stock com preço de custo SEPARADO do preço de venda — antes,
  // ao repor stock com preço diferente, isto substituía o preço de VENDA
  // diretamente, perdendo o histórico do que a mercadoria antiga custou.
  // Agora: o preço de custo atualiza só a referência de custo (e gera um
  // registo real em Custos, ligado ao Caixa/Banco), e o preço de venda só
  // muda se explicitamente indicado — são duas coisas independentes.
  const entradaStock = (id, quantidade, novoPrecoCusto, novoPrecoVenda, pagoDe, contaBancariaId) => {
    const produto = produtos.find((p) => p.id === id);
    if (!produto) return;
    setProdutos((atual) =>
      atual.map((p) =>
        p.id === id
          ? { ...p, stock: p.stock + quantidade, precoCusto: novoPrecoCusto ?? p.precoCusto, preco: novoPrecoVenda ?? p.preco }
          : p
      )
    );
    if (novoPrecoCusto) {
      adicionarCusto({
        categoria: "Compra de mercadoria",
        valor: quantidade * novoPrecoCusto,
        descricao: `${produto.nome} — ${quantidade} un. a ${kz(novoPrecoCusto)}/un.`,
        pagoDe: pagoDe || "caixa",
        contaBancariaId,
      });
    }
    registarAuditoria(
      "Aumentou quantidade em stock",
      `${produto?.nome} — +${quantidade} un.${novoPrecoCusto ? ` · Custo: ${kz(novoPrecoCusto)}/un.` : ""}${novoPrecoVenda ? ` · Novo preço de venda: ${kz(novoPrecoVenda)}` : ""}`
    );
  };

  const adicionarConta = (nova) => {
    setContas([...contas, { ...nova, id: Math.max(0, ...contas.map((c) => c.id)) + 1 }]);
    registarAuditoria("Criou conta de acesso", `${nova.nome} — ${ROTULO_PERFIL[nova.perfil]}`);
  };

  // CANCELAR = desativa o acesso (não consegue entrar) sem apagar nada —
  // mantém o nome a aparecer corretamente em relatórios/auditoria antigos.
  const cancelarConta = (id) => {
    const conta = contas.find((c) => c.id === id);
    setContas((atual) => atual.map((c) => (c.id === id ? { ...c, desativada: true } : c)));
    registarAuditoria("Cancelou conta (acesso desativado)", conta?.nome);
  };

  const reativarConta = (id) => {
    const conta = contas.find((c) => c.id === id);
    setContas((atual) => atual.map((c) => (c.id === id ? { ...c, desativada: false } : c)));
    registarAuditoria("Reativou conta", conta?.nome);
  };

  // ELIMINAR = apaga mesmo a conta — irreversível
  const removerConta = (id) => {
    const conta = contas.find((c) => c.id === id);
    setContas(contas.filter((c) => c.id !== id));
    registarAuditoria("Eliminou conta de acesso", conta?.nome);
  };

  const finalizarVenda = ({ itens, total, metodo, membro, contaBancariaId }) => {
    // 1. reduz o stock de cada produto vendido
    setProdutos((atual) =>
      atual.map((p) => {
        const item = itens.find((i) => i.produtoId === p.id);
        return item ? { ...p, stock: p.stock - item.quantidade } : p;
      })
    );
    // 2. regista cada item vendido, para o Stock mostrar quanto se vendeu de cada produto
    setVendasProdutos((atual) => [
      ...atual,
      ...itens.map((i) => ({ produtoId: i.produtoId, quantidade: i.quantidade, subtotal: i.subtotal, metodo, data: new Date().toLocaleDateString("pt-PT") })),
    ]);
    // 3. gera o recibo com a MESMA numeração sequencial da Faturação, e
    // guarda no histórico partilhado (para veres tudo junto e a numeração
    // nunca se repetir entre POS e Faturação).
    const clienteRecibo = membro || { nome: "Cliente sem cadastro", numero: "AVULSO", telefone: "" };
    const documento = gerarDocumentoFaturacao({
      tipo: "RECIBO",
      membro: clienteRecibo,
      itens: itens.map((i) => ({
        referencia: i.produto.codigo, descricao: i.produto.nome, qtd: i.quantidade, precoUnit: i.produto.preco, total: i.subtotal,
      })),
      valor: total,
      metodo,
      contaBancariaId,
      tipoReceita: "venda",
    });
    // 4. se a compra foi feita por um membro, guarda no histórico da conta dele
    if (membro) {
      setComprasMembros((atual) => [
        { id: Math.max(0, ...atual.map((c) => c.id || 0)) + 1, membroId: membro.id, itens, total, data: new Date().toLocaleDateString("pt-PT") },
        ...atual,
      ]);
    }
    registarAuditoria(
      `Registou venda de ${kz(total)}`,
      `Método: ${metodo}${membro ? ` · Membro: ${membro.numero}` : ""} · Recibo: ${documento.numero}`
    );
    return documento;
  };

  const registarPagamento = (recibo) => {
    setPagamentosFeitos((atual) => [
      ...atual,
      { metodo: recibo.metodo, valor: recibo.valor, registadoPor: contaAtual?.nome || "—", tipo: "mensalidade", data: new Date().toISOString().slice(0, 10) },
    ]);
    registarAuditoria(
      `Registou pagamento de ${kz(recibo.valor)}`,
      `Método: ${recibo.metodo} · Membro: ${recibo.membro.numero}`
    );
  };

  // Gera Fatura/Proforma/Recibo com numeração sequencial real (contador
  // guardado e persistente, nunca reinicia), guarda no histórico para
  // segunda via, e — se for um Recibo — regista logo a receita nos
  // pagamentos (senão nunca entraria nos relatórios/lucro).
  const gerarDocumentoFaturacao = ({ tipo, membro, itens, valor, metodo, faturaOrigemNumero, tipoReceita, contaBancariaId }) => {
    const prefixo = tipo === "FATURA" ? "FAT" : tipo === "PROFORMA" ? "PRO" : "REC";
    const ano = new Date().getFullYear();
    const contadorAtual = faturas.filter((f) => f.tipo === tipo && f.numero.includes(`-${ano}-`)).length;
    const numero = `${prefixo}-${ano}-` + String(contadorAtual + 1).padStart(6, "0");
    const documento = {
      numero,
      tipo,
      membro,
      itens,
      valor,
      metodo: metodo || null,
      estado: tipo === "FATURA" ? "emitida" : undefined,
      data: new Date().toLocaleDateString("pt-PT"),
      hora: new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
    };
    setFaturas((atual) => {
      let novo = [documento, ...atual];
      if (tipo === "RECIBO" && faturaOrigemNumero) {
        novo = novo.map((f) => (f.numero === faturaOrigemNumero ? { ...f, estado: "paga" } : f));
      }
      return novo;
    });
    if (tipo === "RECIBO" && metodo) {
      setPagamentosFeitos((atual) => [
        ...atual,
        { numero, metodo, valor, registadoPor: contaAtual?.nome || "—", tipo: tipoReceita || "mensalidade", data: new Date().toISOString().slice(0, 10) },
      ]);
      // Regista automaticamente o dinheiro recebido no ledger certo: pagamentos
      // em dinheiro entram no Caixa; qualquer método eletrónico (TPA, Express,
      // Referência, Transferência) entra na Movimentação Bancária — e, se foi
      // indicada a conta/Express específica, fica ligado a ela.
      const contaEscolhida = contaBancariaId ? obterContasBancarias(dadosGinasio).find((c) => String(c.id) === String(contaBancariaId)) : null;
      const registoLedger = {
        id: Date.now(),
        direcao: "entrada",
        subtipo: `Recibo (${ROTULO_METODO_PAGAMENTO[metodo] || metodo})`,
        valor,
        descricao: `${numero} — ${membro.nome}`,
        data: new Date().toLocaleDateString("pt-PT") + " " + new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
        registadoPor: contaAtual?.nome || "—",
        origem: "recibo",
        origemNumero: numero,
        contaBancariaNome: contaEscolhida?.banco || null,
      };
      if (metodo === "dinheiro") {
        setMovimentosCaixa((atual) => [registoLedger, ...atual]);
      } else {
        setMovimentosBancarios((atual) => [registoLedger, ...atual]);
      }
    }
    registarAuditoria(`Gerou ${tipo === "FATURA" ? "fatura" : tipo === "PROFORMA" ? "proforma" : "recibo"} ${numero}`, `${membro.nome} — ${kz(valor)}`);
    return documento;
  };

  // Elimina um documento do histórico E desfaz tudo o que ele gerou (a
  // receita nos pagamentos e o movimento correspondente no Caixa/Banco) —
  // sem isto, cancelar um recibo deixava "fantasmas" a contar no lucro.
  const eliminarFatura = (numero) => {
    const doc = faturas.find((f) => f.numero === numero);
    setFaturas((atual) => atual.filter((f) => f.numero !== numero));
    setPagamentosFeitos((atual) => atual.filter((p) => p.numero !== numero));
    setMovimentosCaixa((atual) => atual.filter((m) => m.origemNumero !== numero));
    setMovimentosBancarios((atual) => atual.filter((m) => m.origemNumero !== numero));
    registarAuditoria("Eliminou documento e desfez os seus efeitos financeiros", `${numero} — ${doc?.membro?.nome || "—"}`);
  };

  // Pagamento avulso — pessoa sem inscrição (dia avulso, aula experimental).
  // Regista-se logo (staff já viu o comprovativo presencialmente, se houver),
  // sem passar pela fila de aprovação, que é só para self-service de membros.
  const registarPagamentoAvulso = ({ nome, telefone, descricao, valor, metodo, comprovativo }) => {
    const clienteAvulso = { nome, numero: "AVULSO", telefone: telefone || "" };
    const documento = gerarDocumentoFaturacao({
      tipo: "RECIBO",
      membro: clienteAvulso,
      itens: [{ referencia: "AVULSO", descricao, qtd: 1, precoUnit: valor, total: valor }],
      valor,
      metodo,
      tipoReceita: "avulso",
    });
    if (comprovativo) {
      registarAuditoria("Anexou comprovativo a pagamento avulso", `${nome} — ${documento.numero}`);
    }
    return documento;
  };

  const solicitarAprovacao = ({ membro, valor, destino, comprovativo, origem, planoNome }) => {
    // "origem" distingue se foi o próprio membro a submeter (self-service, sem ninguém
    // verificar antes) ou se foi um funcionário a registar em nome de alguém presencialmente
    // (nesse caso o funcionário já verificou o comprovativo pessoalmente).
    const origemFinal = origem || (perfil === "membro" ? "membro" : "staff");
    const nomeAtor =
      origemFinal === "membro" ? "Membro (self-service)" : perfil === "administrador" ? "Administrador" : "Recepção";
    const novoPendente = {
      // Usa um identificador único mesmo sem depender da lista atual (que pode
      // estar desatualizada) — importante para não colidir quando vários
      // membros submetem ao mesmo tempo.
      id: Date.now() + Math.floor(Math.random() * 1000),
      membro,
      valor,
      destino,
      comprovativo,
      origem: origemFinal,
      planoNome: planoNome || membro?.plano,
      submetidoPor: nomeAtor,
      submetidoPorNome: contaAtual?.nome || membro?.nome || "—",
      data: new Date().toLocaleDateString("pt-PT") + " " + new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
    };
    adicionarPagamentoPendenteSeguro(novoPendente);
    registarAuditoria(
      `Submeteu transferência de ${kz(valor)} para aprovação`,
      `Membro: ${membro.numero} · Via: ${destino === "iban" ? "IBAN" : "Telefone"} · Origem: ${nomeAtor}`
    );
  };

  const aprovarPagamento = (pendente) => {
    setPagamentosPendentes((atual) => atual.filter((p) => p.id !== pendente.id));
    const plano = planos.find((p) => p.nome === (pendente.planoNome || pendente.membro.plano));
    // Estende a partir do vencimento atual (se ainda não passou) ou de hoje —
    // a mesma regra usada em Subscrições, para nunca "perder" dias já pagos.
    const base = new Date(pendente.membro.vencimento) > new Date() ? new Date(pendente.membro.vencimento) : new Date();
    base.setDate(base.getDate() + (plano ? plano.duracaoDias : 30));
    const novoVencimento = dataLocalISO(base);
    const hojeStr = new Date().toISOString().slice(0, 10);
    // Gera o recibo pela mesma via central de todo o sistema — numeração
    // partilhada, entra no histórico, e conta no Caixa/Banco certo consoante
    // o método (aqui é sempre transferência, por isso vai para o Banco).
    const documento = gerarDocumentoFaturacao({
      tipo: "RECIBO",
      membro: pendente.membro,
      itens: [{
        referencia: `PLANO-${(pendente.planoNome || pendente.membro.plano).toUpperCase()}`,
        descricao: `Plano ${pendente.planoNome || pendente.membro.plano} (transferência aprovada)`,
        qtd: 1, precoUnit: pendente.valor, total: pendente.valor,
      }],
      valor: pendente.valor,
      metodo: "transferencia",
      tipoReceita: "mensalidade",
    });
    setMembros((atual) =>
      atual.map((m) => {
        if (m.id !== pendente.membro.id) return m;
        return {
          ...m,
          planoAnterior: m.plano,
          vencimentoAnterior: m.vencimento,
          ultimoReciboNumero: documento.numero,
          plano: pendente.planoNome || m.plano,
          estado: novoVencimento < hojeStr ? "vencido" : "ativo",
          vencimento: novoVencimento,
        };
      })
    );
    registarAuditoria(
      `Aprovou transferência de ${kz(pendente.valor)}`,
      `Membro: ${pendente.membro.numero} · Submetido por: ${pendente.submetidoPor} · Recibo ${documento.numero} · Comprovativo verificado`
    );
  };

  const rejeitarPagamento = (pendente) => {
    setPagamentosPendentes((atual) => atual.filter((p) => p.id !== pendente.id));
    registarAuditoria(
      `Rejeitou transferência de ${kz(pendente.valor)}`,
      `Membro: ${pendente.membro.numero} · Submetido por: ${pendente.submetidoPor}`
    );
  };

  const salvarDadosGinasio = (novosDados) => {
    setDadosGinasio(novosDados);
    registarAuditoria("Atualizou dados do ginásio", novosDados.nome);
  };

  // Junta "renovar" e "mudar de plano" numa única ação, que aceita a data
  // real de início do novo período — importante quando alguém paga hoje
  // mas o plano só começa noutro dia (ex.: paga sexta, começa segunda).
  // Junta "renovar" e "mudar de plano" com a geração do recibo — assim a
  // subscrição fica sempre ligada à parte financeira (numeração, histórico
  // de documentos, e a receita conta nos relatórios/lucro), nunca só a
  // atualizar os dados do membro sem deixar rasto do pagamento.
  const atualizarSubscricao = (membroId, novoPlanoNome, dataInicio, metodo) => {
    const membro = membros.find((m) => m.id === membroId);
    if (!membro) return null;
    const plano = planos.find((p) => p.nome === novoPlanoNome);
    // Sem um plano válido não há preço nem duração para calcular nada —
    // nunca deve avançar às cegas com 30 dias por defeito, que deixava o
    // membro "Ativo" mas sem plano nenhum atribuído.
    if (!plano) {
      alert("Escolhe um plano válido antes de confirmar.");
      return null;
    }
    const base = new Date((dataInicio || new Date().toISOString().slice(0, 10)) + "T00:00:00");
    base.setDate(base.getDate() + plano.duracaoDias);
    const novoVencimento = dataLocalISO(base);
    const hojeStr = new Date().toISOString().slice(0, 10);
    let documento = null;
    if (metodo) {
      documento = gerarDocumentoFaturacao({
        tipo: "RECIBO",
        membro,
        itens: [{
          referencia: `PLANO-${novoPlanoNome.toUpperCase()}`,
          descricao: `Plano ${novoPlanoNome} (início ${dataInicio})`,
          qtd: 1, precoUnit: plano.preco, total: plano.preco,
        }],
        valor: plano.preco,
        metodo,
        tipoReceita: "mensalidade",
      });
    }
    setMembros((atual) =>
      atual.map((m) => {
        if (m.id !== membroId) return m;
        // guarda o plano/vencimento anteriores e o número do recibo gerado,
        // para dar para desfazer tudo de uma vez se foi engano
        return {
          ...m,
          planoAnterior: m.plano,
          vencimentoAnterior: m.vencimento,
          ultimoReciboNumero: documento?.numero || null,
          plano: novoPlanoNome,
          vencimento: novoVencimento,
          estado: novoVencimento < hojeStr ? "vencido" : "ativo",
        };
      })
    );
    registarAuditoria(
      "Atualizou subscrição",
      `${membro.nome} — ${novoPlanoNome}, início ${dataInicio}, vence ${novoVencimento}${documento ? ` · Recibo ${documento.numero}` : " · sem recibo"}`
    );
    return documento;
  };

  // Quando um recibo é gerado diretamente em Faturação (não em Subscrições)
  // mas inclui o item do plano do membro, a subscrição tem de ser
  // estendida na mesma — sem isto, o dinheiro ficava registado mas o
  // vencimento do membro nunca avançava.
  const estenderSubscricaoPeloRecibo = (membroId, nomePlanoPago, numeroRecibo) => {
    const membro = membros.find((m) => m.id === membroId);
    const plano = planos.find((p) => p.nome === nomePlanoPago);
    if (!membro || !plano) return;
    const hojeStr = new Date().toISOString().slice(0, 10);
    // Renova a partir do vencimento atual, se ainda estiver a decorrer — ou
    // a partir de hoje, se já tiver expirado (mesma regra usada na aprovação
    // de pagamentos por transferência).
    const baseTexto = membro.vencimento && membro.vencimento > hojeStr ? membro.vencimento : hojeStr;
    const base = new Date(baseTexto + "T00:00:00");
    base.setDate(base.getDate() + plano.duracaoDias);
    const novoVencimento = dataLocalISO(base);
    setMembros((atual) =>
      atual.map((m) => {
        if (m.id !== membroId) return m;
        return {
          ...m,
          planoAnterior: m.plano,
          vencimentoAnterior: m.vencimento,
          ultimoReciboNumero: numeroRecibo || null,
          plano: nomePlanoPago,
          vencimento: novoVencimento,
          estado: novoVencimento < hojeStr ? "vencido" : "ativo",
        };
      })
    );
    registarAuditoria(
      "Estendeu subscrição a partir de um recibo em Faturação",
      `${membro.nome} — ${nomePlanoPago}, vence ${novoVencimento}${numeroRecibo ? ` · Recibo ${numeroRecibo}` : ""}`
    );
  };

  const cancelarRenovacao = (membroId) => {
    const membro = membros.find((m) => m.id === membroId);
    if (!membro || !membro.vencimentoAnterior) return;
    // Se esta alteração gerou um recibo, desfaz-o também (receita, Caixa/Banco) —
    // senão o "cancelar" só corrigia o membro e deixava o dinheiro a contar à mesma.
    if (membro.ultimoReciboNumero) {
      eliminarFatura(membro.ultimoReciboNumero);
    }
    setMembros((atual) =>
      atual.map((m) => {
        if (m.id !== membroId) return m;
        const hojeStr = new Date().toISOString().slice(0, 10);
        const { vencimentoAnterior, planoAnterior, ultimoReciboNumero, ...resto } = m;
        return {
          ...resto,
          plano: planoAnterior || m.plano,
          vencimento: vencimentoAnterior,
          estado: vencimentoAnterior < hojeStr ? "vencido" : "ativo",
        };
      })
    );
    registarAuditoria("Cancelou última alteração de subscrição (e o recibo associado, se houve)", membro.nome);
  };

  // Pausar/retomar subscrição — para atletas que trabalham e não conseguem vir
  // sempre: pausa "congela" o vencimento (não avança nem vence enquanto
  // pausado); retomar soma de volta os dias que esteve pausado, para nunca
  // perder o que já pagou.
  const pausarSubscricao = (membroId) => {
    const membro = membros.find((m) => m.id === membroId);
    if (!membro) return;
    setMembros((atual) =>
      atual.map((m) =>
        m.id === membroId
          ? { ...m, estadoAntesPausa: m.estado, dataPausa: new Date().toISOString().slice(0, 10), estado: "pausada" }
          : m
      )
    );
    registarAuditoria("Pausou subscrição", `${membro.nome} — vencimento congelado em ${membro.vencimento}`);
  };

  // Desfaz uma pausa feita por engano — devolve exatamente ao estado de
  // antes, sem nenhuma conta de dias (diferente de "Retomar", que assume a
  // pausa foi real e soma os dias pausados de volta ao vencimento).
  const cancelarPausa = (membroId) => {
    const membro = membros.find((m) => m.id === membroId);
    if (!membro || membro.estado !== "pausada") return;
    setMembros((atual) =>
      atual.map((m) => {
        if (m.id !== membroId) return m;
        const { estadoAntesPausa, dataPausa, ...resto } = m;
        return { ...resto, estado: estadoAntesPausa || "ativo" };
      })
    );
    registarAuditoria("Desfez pausa (engano)", `${membro.nome} — voltou a "${membro.estadoAntesPausa || "ativo"}" sem alterar o vencimento`);
  };

  const retomarSubscricao = (membroId) => {
    const membro = membros.find((m) => m.id === membroId);
    if (!membro || membro.estado !== "pausada" || !membro.dataPausa) return;
    const diasPausados = Math.max(
      0,
      Math.round((new Date() - new Date(membro.dataPausa + "T00:00:00")) / (1000 * 60 * 60 * 24))
    );
    // Monta a nova data manualmente, sem passar por toISOString() — isso
    // converte para UTC e, em fusos horários à frente de UTC (como Angola,
    // UTC+1), fazia perder sempre 1 dia, podendo até FAZER DIMINUIR o
    // vencimento em vez de o aumentar.
    const novoVenc = new Date(membro.vencimento + "T00:00:00");
    novoVenc.setDate(novoVenc.getDate() + diasPausados);
    const novoVencStr = dataLocalISO(novoVenc);
    const hojeStr = new Date().toISOString().slice(0, 10);
    setMembros((atual) =>
      atual.map((m) => {
        if (m.id !== membroId) return m;
        const { dataPausa, estadoAntesPausa, ...resto } = m;
        return { ...resto, vencimento: novoVencStr, estado: novoVencStr < hojeStr ? "vencido" : "ativo" };
      })
    );
    registarAuditoria(
      "Retomou subscrição",
      `${membro.nome} — ${diasPausados} dia(s) pausados, vencimento passou de ${membro.vencimento} para ${novoVencStr}`
    );
  };

  const adicionarCusto = (custo) => {
    setCustos((atual) => [
      { ...custo, id: Math.max(0, ...atual.map((c) => c.id || 0)) + 1, data: new Date().toISOString().slice(0, 10), registadoPor: contaAtual?.nome || "—" },
      ...atual,
    ]);
    // Liga automaticamente ao Caixa ou ao Banco (consoante escolhido), como
    // uma saída — assim o centro de custos fica sempre coerente com o saldo.
    adicionarMovimento(custo.pagoDe === "banco" ? "banco" : "caixa", {
      direcao: "saida",
      subtipo: `Custo — ${custo.categoria}`,
      valor: custo.valor,
      descricao: custo.descricao || custo.categoria,
      contaBancariaId: custo.contaBancariaId,
    });
    registarAuditoria("Registou custo", `${custo.categoria} — ${kz(custo.valor)}`);
  };

  const removerCusto = (id) => {
    const custo = custos.find((c) => c.id === id);
    setCustos((atual) => atual.filter((c) => c.id !== id));
    registarAuditoria("Removeu custo", `${custo?.categoria} — ${kz(custo?.valor || 0)}`);
  };

  // ORÇAMENTO (plano de compras)
  const adicionarItemOrcamento = (item) => {
    setOrcamento((atual) => [
      { ...item, id: Math.max(0, ...atual.map((i) => i.id || 0)) + 1, estado: "planeado", data: new Date().toISOString().slice(0, 10) },
      ...atual,
    ]);
    registarAuditoria("Adicionou item ao orçamento", `${item.nome} — ${kz(item.valorEstimado)}`);
  };

  const removerItemOrcamento = (id) => {
    const item = orcamento.find((i) => i.id === id);
    setOrcamento((atual) => atual.filter((i) => i.id !== id));
    registarAuditoria("Removeu item do orçamento", item?.nome || `ID ${id}`);
  };

  // Marcar como comprado gera logo o custo real (ligado ao Caixa/Banco) —
  // o orçamento nunca fica desligado da parte financeira.
  const marcarItemComprado = (id, { valorReal, pagoDe, contaBancariaId }) => {
    const item = orcamento.find((i) => i.id === id);
    if (!item) return;
    setOrcamento((atual) => atual.map((i) => (i.id === id ? { ...i, estado: "comprado", valorReal, dataCompra: new Date().toISOString().slice(0, 10) } : i)));
    adicionarCusto({ categoria: item.categoria, descricao: `Compra: ${item.nome}`, valor: valorReal, pagoDe, contaBancariaId });
  };

  // Regista um PAGAMENTO PARCIAL de um item do orçamento (ex.: sinal, ou
  // pago em várias vezes) — soma ao já pago, gera logo o custo real desse
  // parcelamento, e só marca "comprado" quando o total já pago atinge o
  // valor estimado (ou é ajustado manualmente).
  const registarPagamentoOrcamento = (id, { valor, pagoDe, contaBancariaId }) => {
    const item = orcamento.find((i) => i.id === id);
    if (!item) return;
    const jaPago = (item.valorPago || 0) + valor;
    const totalmentePago = jaPago >= (item.valorEstimado || 0);
    setOrcamento((atual) =>
      atual.map((i) =>
        i.id === id
          ? {
              ...i,
              valorPago: jaPago,
              estado: totalmentePago ? "comprado" : "planeado",
              valorReal: totalmentePago ? jaPago : i.valorReal,
              dataCompra: totalmentePago ? new Date().toISOString().slice(0, 10) : i.dataCompra,
            }
          : i
      )
    );
    adicionarCusto({
      categoria: item.categoria,
      descricao: `${totalmentePago && jaPago > valor ? "Última parcela" : "Pagamento parcial"}: ${item.nome}`,
      valor,
      pagoDe,
      contaBancariaId,
    });
  };

  // PLANO DE ATIVIDADES
  const adicionarAtividade = (dados) => {
    setAtividades((atual) => [...atual, { ...dados, id: Math.max(0, ...atual.map((a) => a.id || 0)) + 1 }]);
    registarAuditoria("Criou atividade no horário", `${dados.nome} — ${dados.diaSemana} ${dados.horaInicio}`);
  };

  const atualizarAtividade = (id, dados) => {
    setAtividades((atual) => atual.map((a) => (a.id === id ? { ...dados, id } : a)));
    registarAuditoria("Editou atividade do horário", dados.nome);
  };

  const removerAtividade = (id) => {
    const a = atividades.find((x) => x.id === id);
    setAtividades((atual) => atual.filter((x) => x.id !== id));
    setReservasAtividades((atual) => atual.filter((r) => r.atividadeId !== id));
    registarAuditoria("Removeu atividade do horário", a?.nome || `ID ${id}`);
  };

  // RESERVAS DE ATIVIDADES — o membro reserva vaga numa aula, respeitando a
  // capacidade máxima definida pelo administrador.
  const reservarAtividade = async (atividadeId, membro) => {
    const atividade = atividades.find((a) => a.id === atividadeId);
    if (!atividade) return { ok: false, motivo: "Atividade não encontrada." };
    const jaReservado = reservasAtividades.some((r) => r.atividadeId === atividadeId && r.membroId === membro.id);
    if (jaReservado) return { ok: false, motivo: "Já tens vaga reservada nesta atividade." };

    const novaReserva = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      atividadeId,
      membroId: membro.id,
      membroNome: membro.nome,
      data: new Date().toISOString().slice(0, 10),
    };

    try {
      // Verificação de vagas + gravação, tudo dentro do Postgres — garante
      // que a capacidade máxima nunca é ultrapassada, mesmo com vários
      // atletas a reservar ao mesmo tempo.
      const resultado = await reservarAtividadeAtomico(PREFIXO_COLECAO_TESTE + "reservasAtividades", atividadeId, atividade.capacidadeMax || null, novaReserva);
      if (!resultado.ok) return resultado;
      definirReservasSemGravar((atual) => [...atual, novaReserva]);
      registarAuditoria("Reservou vaga em atividade", `${membro.nome} — ${atividade.nome} (${atividade.diaSemana})`);
      return { ok: true };
    } catch (e) {
      // Sem ligação à função no Supabase (offline, ou SQL ainda não corrido)
      // — usa a verificação normal como recurso, para continuar a funcionar.
      console.warn("Reserva atómica indisponível, a usar verificação normal:", e);
      const numReservas = reservasAtividades.filter((r) => r.atividadeId === atividadeId).length;
      if (atividade.capacidadeMax && numReservas >= atividade.capacidadeMax) {
        return { ok: false, motivo: "Esta atividade já está com a capacidade máxima cheia." };
      }
      setReservasAtividades((atual) => [...atual, novaReserva]);
      registarAuditoria("Reservou vaga em atividade", `${membro.nome} — ${atividade.nome} (${atividade.diaSemana})`);
      return { ok: true };
    }
  };

  const cancelarReservaAtividade = (reservaId, membroNome) => {
    const reserva = reservasAtividades.find((r) => r.id === reservaId);
    setReservasAtividades((atual) => atual.filter((r) => r.id !== reservaId));
    if (reserva) {
      const atividade = atividades.find((a) => a.id === reserva.atividadeId);
      registarAuditoria("Cancelou reserva de atividade", `${membroNome || reserva.membroNome} — ${atividade?.nome || "—"}`);
    }
  };

  // AVALIAÇÃO FÍSICA — o PT regista peso, medidas e evolução do aluno ao longo do tempo
  const adicionarAvaliacaoFisica = (membroId, dados) => {
    const membro = membros.find((m) => m.id === membroId);
    setAvaliacoesFisicas((atual) => [
      { ...dados, id: Math.max(0, ...atual.map((a) => a.id || 0)) + 1, membroId, data: new Date().toISOString().slice(0, 10), registadoPor: contaAtual?.nome || "—" },
      ...atual,
    ]);
    registarAuditoria("Registou avaliação física", `${membro?.nome || membroId} — ${dados.peso ? dados.peso + "kg" : ""}`);
  };

  const removerAvaliacaoFisica = (id) => {
    setAvaliacoesFisicas((atual) => atual.filter((a) => a.id !== id));
    registarAuditoria("Removeu avaliação física", `ID ${id}`);
  };

  // PLANO DE TREINO — um plano ativo por membro; guardar substitui o anterior
  const salvarPlanoTreino = (membroId, dados) => {
    const membro = membros.find((m) => m.id === membroId);
    setPlanosTreino((atual) => {
      const semEsteMembro = atual.filter((p) => p.membroId !== membroId);
      return [...semEsteMembro, { ...dados, membroId, atualizadoEm: new Date().toISOString().slice(0, 10), criadoPor: contaAtual?.nome || "—" }];
    });
    registarAuditoria("Atualizou plano de treino", `${membro?.nome || membroId} — ${dados.nome || "—"}`);
  };

  // FECHO DE TURNO — contagem física do dinheiro no fim do turno, comparada
  // com o que o sistema esperava, para detetar diferenças cedo.
  const registarFechoTurno = (dados) => {
    setFechosTurno((atual) => [
      { ...dados, id: Math.max(0, ...atual.map((f) => f.id || 0)) + 1, data: new Date().toISOString().slice(0, 10), hora: new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }) },
      ...atual,
    ]);
    // Se a contagem física não bateu certo com o sistema, ajusta logo o saldo
    // real do Caixa — senão a diferença ficava só num aviso, sem nunca entrar
    // no saldo nem nos relatórios de lucro.
    if (dados.diferenca !== 0) {
      setMovimentosCaixa((atual) => [
        {
          id: Date.now(),
          direcao: dados.diferenca > 0 ? "entrada" : "saida",
          subtipo: "Ajuste de caixa (fecho de turno)",
          valor: Math.abs(dados.diferenca),
          descricao: `Contagem de ${dados.nomeFuncionario}${dados.observacoes ? ` — ${dados.observacoes}` : ""}`,
          data: new Date().toLocaleDateString("pt-PT") + " " + new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
          registadoPor: dados.nomeFuncionario,
          origem: "fecho-turno",
        },
        ...atual,
      ]);
    }
    registarAuditoria(
      "Fechou turno com contagem física",
      `${dados.nomeFuncionario} — sistema: ${kz(dados.totalSistema)}, contado: ${kz(dados.totalContado)}${dados.diferenca !== 0 ? ` · Diferença ajustada no Caixa: ${kz(dados.diferenca)}` : ""}`
    );
  };

  // MENSAGENS — chat interno entre membro/recepcionista/PT e o administrador
  const enviarMensagem = ({ participanteId, participanteNome, participanteTipo, texto, deAdmin }) => {
    const novaMensagem = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      participanteId,
      participanteNome,
      participanteTipo,
      texto,
      deAdmin,
      lida: deAdmin, // mensagens do admin já ficam "lidas" para ele mesmo; as do participante ficam por ler até o admin abrir a conversa
      data: new Date().toLocaleDateString("pt-PT"),
      hora: new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
    };
    // Gravação atómica — vários membros podem escrever mensagens ao mesmo
    // tempo, em conversas diferentes.
    adicionarMensagemSegura(novaMensagem);
  };

  const marcarMensagensLidas = (participanteId, participanteTipo, ladoQueLe) => {
    setMensagens((atual) =>
      atual.map((m) => {
        if (m.participanteId !== participanteId || m.participanteTipo !== participanteTipo) return m;
        // Só marca como lida a mensagem vinda do OUTRO lado — o membro a
        // abrir a própria conversa não pode marcar as SUAS PRÓPRIAS
        // mensagens como lidas (isso é para o admin ler, não para ele).
        const deveMarcar = ladoQueLe === "admin" ? !m.deAdmin : m.deAdmin;
        return deveMarcar && !m.lida ? { ...m, lida: true } : m;
      })
    );
  };

  // Envia a mesma mensagem para TODOS os membros de uma vez (ex.: "Ginásio
  // fechado no feriado") — cria uma mensagem na conversa de cada um.
  const enviarMensagemGeral = (texto) => {
    if (!texto.trim() || membros.length === 0) return;
    const agora = new Date();
    const base = {
      texto: texto.trim(),
      deAdmin: true,
      lida: true,
      data: agora.toLocaleDateString("pt-PT"),
      hora: agora.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
    };
    let proximoId = Math.max(0, ...mensagens.map((m) => m.id || 0)) + 1;
    const novasMensagens = membros.map((m) => ({
      id: proximoId++,
      participanteId: m.id,
      participanteNome: m.nome,
      participanteTipo: "membro",
      ...base,
    }));
    setMensagens((atual) => [...atual, ...novasMensagens]);
    registarAuditoria("Enviou aviso geral a todos os membros", `${membros.length} membro(s) — "${texto.slice(0, 60)}${texto.length > 60 ? "..." : ""}"`);
  };

  // Adiciona um movimento manual ao ledger certo (caixa ou banco), já com o
  // nome de quem registou, data, e — se for movimento bancário — o nome da
  // conta escolhida (das que existem em Configurações).
  const adicionarMovimento = (ledger, movimento) => {
    const registo = {
      ...movimento,
      id: Date.now(),
      data: new Date().toLocaleDateString("pt-PT") + " " + new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
      registadoPor: contaAtual?.nome || "—",
    };
    if (ledger === "banco") {
      const conta = obterContasBancarias(dadosGinasio).find((c) => String(c.id) === String(movimento.contaBancariaId));
      registo.contaBancariaNome = conta?.banco || null;
      setMovimentosBancarios((atual) => [registo, ...atual]);
    } else {
      setMovimentosCaixa((atual) => [registo, ...atual]);
    }
    registarAuditoria(
      `Registou ${movimento.direcao === "entrada" ? "entrada" : "saída"} de ${kz(movimento.valor)} (${ledger === "banco" ? "banco" : "caixa"})`,
      `${movimento.subtipo}${movimento.descricao ? " — " + movimento.descricao : ""}`
    );
  };

  // Depósito e Levantamento são o MESMO dinheiro a mudar de sítio — por
  // isso, ao contrário dos outros tipos, têm de gerar as DUAS entradas ao
  // mesmo tempo (Caixa + Banco), ligadas uma à outra. Sem isto, registar só
  // um dos lados deixava o outro ledger sem refletir o que realmente
  // aconteceu ao dinheiro.
  const registarTransferenciaCaixaBanco = ({ subtipo, valor, contaBancariaId, descricao }) => {
    const tipo = TIPOS_MOVIMENTO.find((t) => t.rotulo === subtipo);
    if (!tipo) return;
    const conta = obterContasBancarias(dadosGinasio).find((c) => String(c.id) === String(contaBancariaId));
    const agora = new Date();
    const dataHora = agora.toLocaleDateString("pt-PT") + " " + agora.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
    const idPartilhado = `TRF-${Date.now()}`;
    const base = { subtipo, valor: Number(valor), descricao, data: dataHora, registadoPor: contaAtual?.nome || "—", origemTransferencia: idPartilhado };

    setMovimentosCaixa((atual) => [{ ...base, id: Date.now(), direcao: tipo.direcaoCaixa }, ...atual]);
    setMovimentosBancarios((atual) => [
      { ...base, id: Date.now() + 1, direcao: tipo.direcaoBanco, contaBancariaId, contaBancariaNome: conta?.banco || null },
      ...atual,
    ]);
    registarAuditoria(
      `Registou ${subtipo} de ${kz(Number(valor))} (Caixa ↔ ${conta?.banco || "Banco"})`,
      `Atualizado automaticamente nos dois lados${descricao ? " — " + descricao : ""}`
    );
  };

  const registarEntrada = (membro) => {
    const agora = new Date();
    const novoAcesso = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      membro: membro.nome,
      numero: membro.numero,
      foto: membro.foto || null,
      data: agora.toISOString().slice(0, 10),
      entrada: agora.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
      saida: null,
    };
    // Gravação atómica — importante aqui, porque pode haver vários atletas a
    // fazer check-in sozinhos (auto check-in) quase ao mesmo segundo, ex.: à
    // hora de ponta.
    adicionarAcessoSeguro(novoAcesso);
    registarAuditoria("Registou entrada", `${membro.nome} — ${membro.numero}`);
  };

  const registarSaida = (membro) => {
    const agora = new Date();
    const hojeStr = agora.toISOString().slice(0, 10);
    setAcessos((atual) => {
      // encontra a entrada mais recente de hoje deste membro que ainda não tem saída
      const aberta = atual.find((a) => a.numero === membro.numero && a.data === hojeStr && !a.saida);
      if (!aberta) return atual;
      return atual.map((a) =>
        a.id === aberta.id ? { ...a, saida: agora.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }) } : a
      );
    });
    registarAuditoria("Registou saída", `${membro.nome} — ${membro.numero}`);
  };

  // --- ÁREA DO MEMBRO: layout próprio, sem sidebar administrativa ---
  if (perfil === "membro") {
    const meuMembro = membros.find((m) => m.id === contaAtual?.membroId);
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-700 font-sans text-slate-800 dark:text-slate-200 p-6">
        {MODO_TESTE_ATIVO && (
          <div className="max-w-sm mx-auto mb-4 bg-amber-400 text-amber-950 text-center text-xs font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-2 flex-wrap">
            🧪 MODO DE TESTE
            <button onClick={() => alternarModoTeste(false)} className="underline hover:no-underline">Sair</button>
          </div>
        )}
        <div className="max-w-sm mx-auto mb-4 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{contaAtual?.nome}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{contaAtual?.email}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={() => setEscuro(!escuro)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
              {escuro ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={sair}
              className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-300 flex items-center gap-1 text-xs font-medium"
            >
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
        {!meuMembro ? (
          <div className="max-w-sm mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-sm ring-1 ring-slate-100 dark:ring-slate-700 p-8 text-center">
            <UserIcon size={32} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
            <p className="font-semibold text-slate-900 dark:text-slate-100">Conta de membro não encontrada</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Fala com a recepção ou o administrador para verificar a tua inscrição.
            </p>
          </div>
        ) : (
          <AreaMembro
            membro={meuMembro}
            planos={planos}
            compras={comprasMembros}
            dadosGinasio={dadosGinasio}
            contaAtual={contaAtual}
            onMudarSenha={alterarPropriaSenha}
            onSolicitarAprovacao={solicitarAprovacao}
            minhasAdvertencias={advertencias.filter((a) => a.membroId === meuMembro?.id)}
            mensagens={mensagens}
            onEnviarMensagem={enviarMensagem}
            onMarcarMensagensLidas={marcarMensagensLidas}
            atividades={atividades}
            reservasAtividades={reservasAtividades}
            onReservarAtividade={reservarAtividade}
            onCancelarReservaAtividade={cancelarReservaAtividade}
            minhasAvaliacoes={avaliacoesFisicas.filter((a) => a.membroId === meuMembro?.id)}
            meuPlanoTreino={planosTreino.find((p) => p.membroId === meuMembro?.id)}
            acessos={acessos}
            onRegistarEntrada={registarEntrada}
            onRegistarSaida={registarSaida}
          />
        )}
      </div>
    );
  }

  const MENU = perfil === "administrador" ? MENU_ADMIN : perfil === "personal_trainer" ? MENU_TRAINER : MENU_RECEPCAO;
  const TODOS_ITENS = MENU.flatMap((g) => g.itens);
  const tituloTela = TODOS_ITENS.find((m) => m.id === tela)?.label || "";

  // Garante que a tela atual existe no menu do perfil ativo
  const telaValida = TODOS_ITENS.some((m) => m.id === tela);
  const telaAtual = telaValida ? tela : "dashboard";

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200 overflow-hidden">
      {/* Fundo escurecido atrás do menu no telemóvel */}
      {menuAberto && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMenuAberto(false)}
        />
      )}

      {/* SIDEBAR — fixa em ecrã grande, menu deslizante no telemóvel */}
      <aside
        className={`w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 flex flex-col shrink-0 fixed md:static inset-y-0 left-0 z-50 transform transition-transform duration-200 shadow-[4px_0_24px_rgba(0,0,0,0.35)] ${
          menuAberto ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between gap-2.5 px-5 py-5 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="bg-white rounded-lg p-1.5 shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
              <img src={dadosGinasio.logo || LOGO_BASE64} alt={dadosGinasio.nome} className="h-8 w-auto object-contain" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-extrabold text-sm leading-tight truncate tracking-tight">CATUMBELA</p>
              <p className="text-[#5AAFA8] font-bold text-xs leading-tight tracking-widest truncate">GYM SYSTEM</p>
            </div>
          </div>
          <button onClick={() => setMenuAberto(false)} className="md:hidden text-slate-400 hover:text-white shrink-0">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 py-3 px-3 space-y-4 overflow-y-auto">
          {MENU.map((grupo) => (
            <div key={grupo.grupo || "geral"}>
              {grupo.grupo && (
                <p className="px-3 text-[10px] font-bold tracking-wider text-slate-500 mb-1">{grupo.grupo}</p>
              )}
              <div className="space-y-1">
                {grupo.itens.map((item) => {
                  const Icon = item.icon;
                  const active = telaAtual === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setTela(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        active ? "bg-gradient-to-b from-[#4FA69D] to-[#357A73] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_6px_rgba(0,0,0,0.3)]" : "hover:bg-slate-800/70 text-slate-300"
                      }`}
                    >
                      <Icon size={17} className="shrink-0" />
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      {item.id === "aprovacao" && pagamentosPendentes.length > 0 && (
                        <span className="bg-amber-400 text-slate-900 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                          {pagamentosPendentes.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-slate-800 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-700 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">{contaAtual?.nome}</p>
            <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-[11px] truncate">{contaAtual?.email}</p>
          </div>
          <button
            onClick={sair}
            title="Sair"
            className="text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-white shrink-0"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {MODO_TESTE_ATIVO && (
          <div className="bg-amber-400 text-amber-950 text-center text-xs sm:text-sm font-bold py-1.5 px-4 flex items-center justify-center gap-3 flex-wrap shrink-0">
            🧪 MODO DE TESTE — estes dados não afetam o ginásio real
            <button onClick={() => alternarModoTeste(false)} className="underline hover:no-underline">Sair</button>
          </div>
        )}
        <header className="flex items-center justify-between gap-2 px-3 sm:px-6 py-3 sm:py-4 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <button onClick={() => setMenuAberto(true)} className="md:hidden text-slate-500 dark:text-slate-400 shrink-0">
              <Menu size={22} />
            </button>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 truncate">{tituloTela}</h1>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            <span
              title={
                statusSync === "ligado"
                  ? "Sincronizado com o Supabase em tempo real — os dados atualizam-se sozinhos em qualquer dispositivo"
                  : statusSync === "offline"
                  ? "Sem ligação ao Supabase — a guardar só neste dispositivo"
                  : "A ligar ao Supabase..."
              }
              className={`hidden sm:flex items-center gap-1.5 text-[11px] font-medium px-2 py-1 rounded-full transition-colors ${
                atualizadoAgora
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : statusSync === "ligado"
                  ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                  : statusSync === "offline"
                  ? "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-400"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${atualizadoAgora ? "bg-blue-500 animate-pulse" : statusSync === "ligado" ? "bg-emerald-500" : statusSync === "offline" ? "bg-amber-500" : "bg-slate-400"}`} />
              {atualizadoAgora ? "Atualizado agora ⚡" : statusSync === "ligado" ? "Sincronizado" : statusSync === "offline" ? "Só neste aparelho" : "A ligar..."}
            </span>
            <button
              onClick={() => setEscuro(!escuro)}
              title={escuro ? "Modo claro" : "Modo escuro"}
              className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {escuro ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <PesquisaGlobal membros={membros} onIrParaMembros={() => setTela("membros")} />
            <button onClick={() => setTela("notificacoes")} className="relative">
              <Bell size={18} className="text-slate-400 dark:text-slate-500" />
              {calcularNotificacoes(membros, planos).length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#3F8F87] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {calcularNotificacoes(membros, planos).length}
                </span>
              )}
            </button>
            {(perfil === "administrador" || perfil === "recepcionista" || perfil === "personal_trainer") && (
              <button onClick={() => setTela("mensagens")} className="relative">
                <MessageSquare size={18} className="text-slate-400 dark:text-slate-500" />
                {(() => {
                  const naoLidas =
                    perfil === "administrador"
                      ? mensagens.filter((m) => !m.deAdmin && !m.lida).length
                      : mensagens.filter((m) => m.participanteId === contaAtual?.id && m.participanteTipo === "funcionario" && m.deAdmin && !m.lida).length;
                  return naoLidas > 0 ? (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                      {naoLidas}
                    </span>
                  ) : null;
                })()}
              </button>
            )}
          </div>
        </header>

        {avisoArmazenamentoCheio && (
          <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 px-4 py-3 flex items-center gap-3">
            <AlertTriangle size={18} className="text-red-500 shrink-0" />
            <p className="text-sm text-red-700 dark:text-red-400 flex-1">
              <strong>Aviso:</strong> o espaço de armazenamento deste navegador está cheio — a última alteração pode
              não ter sido guardada. Faz já uma <strong>cópia de segurança</strong> (Configurações → Dados do ginásio)
              e considera remover fotos antigas desnecessárias.
            </p>
            <button onClick={() => setAvisoArmazenamentoCheio(false)} className="text-red-400 hover:text-red-600 shrink-0">
              <X size={16} />
            </button>
          </div>
        )}
        {avisoConflito && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 px-4 py-3 flex items-center gap-3">
            <RefreshCw size={18} className="text-amber-500 shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-400 flex-1">
              <strong>Atenção:</strong> outro dispositivo alterou "{ROTULO_COLECAO[avisoConflito] || avisoConflito}"
              quase ao mesmo tempo que tu. Guardámos a tua alteração, mas vale a pena confirmar noutro dispositivo se
              está tudo certo — recarrega a página lá para veres a versão mais recente.
            </p>
            <button onClick={() => setAvisoConflito(null)} className="text-amber-400 hover:text-amber-600 shrink-0">
              <X size={16} />
            </button>
          </div>
        )}
        {!avisoArmazenamentoCheio && avisoBackup && perfil === "administrador" && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 px-4 py-3 flex items-center gap-3">
            <Save size={18} className="text-amber-500 shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-400 flex-1">
              Já lá vai mais de uma semana desde a última cópia de segurança (ou nunca fizeste nenhuma). Vale a pena
              fazer uma agora, em <button onClick={() => setTela("configuracoes")} className="underline font-semibold">Configurações → Dados do ginásio</button>.
            </p>
            <button onClick={() => setAvisoBackup(false)} className="text-amber-400 hover:text-amber-600 shrink-0">
              <X size={16} />
            </button>
          </div>
        )}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6">
          {telaAtual === "meus-alunos" && perfil === "personal_trainer" && (
            <MeusAlunos
              trainer={trainers.find((t) => t.id === contaAtual?.trainerId)}
              membros={membros}
              avaliacoesFisicas={avaliacoesFisicas}
              planosTreino={planosTreino}
              onAdicionarAvaliacao={adicionarAvaliacaoFisica}
              onRemoverAvaliacao={removerAvaliacaoFisica}
              onSalvarPlano={salvarPlanoTreino}
            />
          )}
          {telaAtual === "dashboard" && (
            <Dashboard membros={membros} produtos={produtos} pagamentosFeitos={pagamentosFeitos} acessos={acessos} custos={custos} perfil={perfil} dadosGinasio={dadosGinasio} movimentosCaixa={movimentosCaixa} movimentosBancarios={movimentosBancarios} />
          )}
          {telaAtual === "membros" && (
            <Membros
              membros={membros}
              planos={planos}
              contas={contas}
              advertencias={advertencias}
              onAdd={adicionarMembro}
              onUpdate={atualizarMembro}
              onRemove={removerMembro}
              onCancelar={cancelarMembro}
              onReativar={reativarMembro}
              onAdicionarAdvertencia={adicionarAdvertencia}
              onRemoverAdvertencia={removerAdvertencia}
              perfil={perfil}
              dadosGinasio={dadosGinasio}
            />
          )}
          {telaAtual === "planos" && perfil === "administrador" && <Planos planos={planos} onSave={salvarPlano} />}
          {telaAtual === "trainers" && (
            <PersonalTrainers trainers={trainers} membros={membros} onAdd={adicionarTrainer} onAtribuirAluno={atribuirAluno} podeGerir={perfil === "administrador"} />
          )}
          {telaAtual === "subscricoes" && (
            <Subscricoes membros={membros} planos={planos} onAtualizarSubscricao={atualizarSubscricao} onCancelarRenovacao={cancelarRenovacao} onPausar={pausarSubscricao} onRetomar={retomarSubscricao} onCancelarPausa={cancelarPausa} perfil={perfil} />
          )}
          {telaAtual === "pagamentos" && (
            <Pagamentos dadosGinasio={dadosGinasio} onRegistarAvulso={registarPagamentoAvulso} />
          )}
          {telaAtual === "aprovacao" && perfil === "administrador" && (
            <AprovacaoPagamentos pendentes={pagamentosPendentes} onAprovar={aprovarPagamento} onRejeitar={rejeitarPagamento} />
          )}
          {telaAtual === "caixa" && perfil === "administrador" && (
            <CaixaEFuncionarios
              movimentosBancarios={movimentosBancarios}
              movimentosCaixa={movimentosCaixa}
              dadosGinasio={dadosGinasio}
              onAdicionarMovimento={adicionarMovimento}
              onAdicionarTransferencia={registarTransferenciaCaixaBanco}
              fechosTurno={fechosTurno}
            />
          )}
          {telaAtual === "custos" && perfil === "administrador" && (
            <CentroCustos custos={custos} onAdicionar={adicionarCusto} onRemover={removerCusto} dadosGinasio={dadosGinasio} />
          )}
          {telaAtual === "orcamento" && perfil === "administrador" && (
            <Orcamento itens={orcamento} onAdicionar={adicionarItemOrcamento} onRemover={removerItemOrcamento} onMarcarComprado={marcarItemComprado} onRegistarPagamento={registarPagamentoOrcamento} dadosGinasio={dadosGinasio} />
          )}
          {telaAtual === "atividades" && perfil === "administrador" && (
            <PlanoAtividades atividades={atividades} trainers={trainers} reservasAtividades={reservasAtividades} onAdicionar={adicionarAtividade} onAtualizar={atualizarAtividade} onRemover={removerAtividade} />
          )}
          {telaAtual === "faturacao" && (perfil === "administrador" || perfil === "recepcionista") && (
            <Faturacao membros={membros} planos={planos} produtos={produtos} dadosGinasio={dadosGinasio} faturas={faturas} onGerarFatura={gerarDocumentoFaturacao} onEliminarFatura={eliminarFatura} onEstenderSubscricao={estenderSubscricaoPeloRecibo} perfil={perfil} />
          )}
          {telaAtual === "pos" && (
            <VendasPOS produtos={produtos} membros={membros} dadosGinasio={dadosGinasio} onFinalizar={finalizarVenda} />
          )}
          {telaAtual === "stock" && (
            <Stock produtos={produtos} vendasProdutos={vendasProdutos} onAdd={adicionarProduto} onUpdate={atualizarProduto} onRemove={removerProduto} onEntrada={entradaStock} dadosGinasio={dadosGinasio} />
          )}
          {telaAtual === "acessos" && (
            <ControloAcessos membros={membros} acessos={acessos} onRegistarEntrada={registarEntrada} onRegistarSaida={registarSaida} />
          )}
          {telaAtual === "funcionarios" && perfil === "administrador" && <Funcionarios contas={contas} />}
          {telaAtual === "notificacoes" && perfil === "administrador" && <Notificacoes membros={membros} planos={planos} />}
          {telaAtual === "relatorios" && perfil === "administrador" && (
            <Relatorios membros={membros} produtos={produtos} pagamentosFeitos={pagamentosFeitos} acessos={acessos} contas={contas} custos={custos} vendasProdutos={vendasProdutos} movimentosCaixa={movimentosCaixa} movimentosBancarios={movimentosBancarios} />
          )}
          {telaAtual === "auditoria" && perfil === "administrador" && <Auditoria registos={auditLog} />}
          {telaAtual === "mensagens" && perfil === "administrador" && (
            <MensagensAdmin mensagens={mensagens} onEnviar={enviarMensagem} onMarcarLidas={marcarMensagensLidas} onEnviarGeral={enviarMensagemGeral} totalMembros={membros.length} />
          )}
          {telaAtual === "mensagens" && (perfil === "recepcionista" || perfil === "personal_trainer") && (
            <MensagensParticipante
              mensagens={mensagens}
              participanteId={contaAtual?.id}
              participanteTipo="funcionario"
              participanteNome={contaAtual?.nome}
              onEnviar={enviarMensagem}
              onMarcarLidas={marcarMensagensLidas}
            />
          )}
          {telaAtual === "caixa" && perfil === "recepcionista" && <TurnoCaixa pagamentosFeitos={pagamentosFeitos} nomeAtual={contaAtual?.nome} onFecharTurno={registarFechoTurno} />}
          {telaAtual === "utilizadores" && perfil === "administrador" && (
            <Utilizadores contas={contas} trainers={trainers} onAdd={adicionarConta} onRemove={removerConta} onCancelar={cancelarConta} onReativar={reativarConta} onReporSenha={reporSenhaConta} />
          )}
          {telaAtual === "pagamentos-online" && perfil === "administrador" && (
            <PagamentosOnline dados={dadosGinasio} onSalvar={salvarDadosGinasio} />
          )}
          {telaAtual === "configuracoes" && perfil === "administrador" && (
            <DadosGinasio dados={dadosGinasio} onSalvar={salvarDadosGinasio} contaAtual={contaAtual} />
          )}
          {telaAtual === "meu-perfil" && (
            <MeuPerfil contaAtual={contaAtual} onMudarSenha={alterarPropriaSenha} />
          )}
        </main>
      </div>
    </div>
  );
}
