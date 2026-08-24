import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
