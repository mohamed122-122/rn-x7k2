const V = "rn-v2.1.0";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || !req.url.startsWith(self.location.origin)) return;
  // Pages: network first (so updates arrive), cache as offline fallback.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(res => { const cp = res.clone(); caches.open(V).then(c => c.put("./index.html", cp)); return res; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }
  // Everything else: cache first.
  e.respondWith(
    caches.match(req).then(r => r || fetch(req).then(res => {
      const cp = res.clone(); caches.open(V).then(c => c.put(req, cp)); return res;
    }))
  );
});
