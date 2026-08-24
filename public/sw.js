// Service worker mínimo — permite que o site seja "instalado" como app
// (ícone no ecrã inicial, abre em ecrã cheio) e guarda em cache os
// ficheiros principais, para abrir mais depressa e funcionar offline
// para quem já visitou antes (os dados continuam a precisar de rede
// para sincronizar com o Supabase, mas a interface abre na mesma).

const NOME_CACHE = "catumbela-gym-cache-v1";
const FICHEIROS_ESSENCIAIS = ["/", "/manifest.json", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(NOME_CACHE).then((cache) => cache.addAll(FICHEIROS_ESSENCIAIS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then((chaves) =>
      Promise.all(chaves.filter((chave) => chave !== NOME_CACHE).map((chave) => caches.delete(chave)))
    )
  );
  self.clients.claim();
});

// Estratégia "network first, cache fallback" — tenta sempre buscar a versão
// mais recente da rede; só usa a cópia guardada se estiver offline.
self.addEventListener("fetch", (evento) => {
  if (evento.request.method !== "GET") return;
  evento.respondWith(
    fetch(evento.request)
      .then((resposta) => {
        const copia = resposta.clone();
        caches.open(NOME_CACHE).then((cache) => cache.put(evento.request, copia)).catch(() => {});
        return resposta;
      })
      .catch(() => caches.match(evento.request))
  );
});
