import { createClient } from "@supabase/supabase-js";

// Projecto Supabase (migrado em 10/11/2026 para uma organização nova, por causa
// do limite de largura de banda do plano grátis). A chave "anon" é pública por
// desenho; fica aqui para não depender das variáveis do Vercel (que ainda
// apontam para o projecto antigo). O projecto antigo é yhbqopxqudjinsvcjhpx.
const supabaseUrl = "https://qhkwfqzacucgurtgxsne.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoa3dmcXphY3VjZ3VydGd4c25lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyNjc4NDAsImV4cCI6MjEwOTg0Mzg0MH0.WUmVHlhOsgSIGu8RaSreiajvGq2IZjox_sXPg6o1kZk";

let supabaseClient;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase não está configurado (falta o ficheiro .env com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY). " +
    "O site continua a funcionar normalmente, só guarda os dados neste dispositivo."
  );
  // Cliente "vazio" — qualquer chamada rejeita com um erro claro, em vez de
  // rebentar logo ao arrancar a aplicação (o que deixava a página em branco).
  const erroConfiguracao = () => Promise.reject(new Error("Supabase não configurado — falta o ficheiro .env"));
  supabaseClient = {
    from() {
      return {
        select: () => ({ eq: () => ({ maybeSingle: erroConfiguracao }) }),
        upsert: erroConfiguracao,
      };
    },
    // Sem isto, a sincronização em tempo real (novo) tentava chamar
    // supabase.channel(...) e a app rebentava logo ao arrancar quando o
    // .env não estava configurado.
    channel() {
      return {
        on() {
          return this;
        },
        subscribe() {
          return this;
        },
      };
    },
    removeChannel() {},
    // Idem para as funções atómicas (adicionar_item_colecao,
    // reservar_atividade_atomico) — sem isto, submeter um pagamento ou
    // reservar uma aula sem o .env configurado rebentava a app.
    rpc: erroConfiguracao,
  };
} else {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseClient;
