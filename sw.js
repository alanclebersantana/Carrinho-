/* ============================================================
   Bora pro Carrinho? · service worker
   IMPORTANTE: a cada publicação no GitHub, troque o número da
   VERSAO abaixo (bora-v1 → bora-v2 → ...). É isso que faz o
   celular baixar os arquivos novos em vez de usar os antigos.
   ============================================================ */
const VERSAO = "bora-v5";
const CACHE_APP = "bora-app-" + VERSAO;
const CACHE_EXT = "bora-ext-" + VERSAO;

const ARQUIVOS = [
  "./",
  "./index.html",
  "./estilo.css",
  "./app.js",
  "./instalar.html",
  "./manifest.webmanifest",
  "./favicon.png",
  "./icone-180.png",
  "./icone-192.png",
  "./icone-512.png",
  "./icone-maskable-512.png",
  "./logo-app.png"
];

/* domínios externos que podem ficar em cache (fontes e SDK) */
const EXTERNOS = [
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "www.gstatic.com"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_APP)
      .then(c => c.addAll(ARQUIVOS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(nomes => Promise.all(
        nomes.filter(n => n !== CACHE_APP && n !== CACHE_EXT).map(n => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", e => {
  if (e.data === "atualizar") self.skipWaiting();
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  /* nunca interceptar chamadas de login e de banco de dados */
  if (url.hostname.endsWith("googleapis.com") && url.hostname !== "fonts.googleapis.com") return;
  if (url.hostname.endsWith("firebaseio.com")) return;

  /* páginas: rede primeiro, cache como reserva (funciona offline) */
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(resp => {
          const copia = resp.clone();
          caches.open(CACHE_APP).then(c => c.put(req, copia));
          return resp;
        })
        .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
    );
    return;
  }

  /* arquivos do próprio app: cache primeiro */
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then(r => r || fetch(req).then(resp => {
        const copia = resp.clone();
        caches.open(CACHE_APP).then(c => c.put(req, copia));
        return resp;
      }))
    );
    return;
  }

  /* fontes e SDK do Firebase: cache primeiro, atualizando por trás */
  if (EXTERNOS.indexOf(url.hostname) > -1) {
    e.respondWith(
      caches.match(req).then(r => {
        const rede = fetch(req).then(resp => {
          const copia = resp.clone();
          caches.open(CACHE_EXT).then(c => c.put(req, copia));
          return resp;
        }).catch(() => r);
        return r || rede;
      })
    );
  }
});
