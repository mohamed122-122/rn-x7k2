/* مفكرة المهبط · Ramp Notes — Service Worker v3.0.0 */
const V = "ramp-notes-v3.0.0";
const RT = "ramp-notes-rt-v3.0.0";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];

const OFFLINE = `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>دون اتصال</title><body style="background:#060B16;color:#EAF2FF;font-family:Tahoma,sans-serif;display:grid;place-items:center;min-height:90vh;text-align:center"><div><div style="font-size:52px">✈</div><h2>أنت دون اتصال</h2><p style="color:#9FB2CC">افتح التطبيق مرة واحدة وأنت متصل ليُحفظ بالكامل.</p><button onclick="location.reload()" style="background:#FFB020;border:0;padding:12px 26px;border-radius:12px;font-weight:bold;font-size:15px">إعادة المحاولة</button></div></body></html>`;

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(V)
      .then(c => Promise.allSettled(CORE.map(u => c.add(new Request(u, { cache: "reload" })))))
  );
  // لا skipWaiting تلقائي — التحديث يتم بضغط المستخدم على "تحديث الآن"
});

self.addEventListener("message", e => {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== V && k !== RT).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.origin === "https://fonts.googleapis.com" || url.origin === "https://fonts.gstatic.com";
  if (!sameOrigin && !isFont) return;

  // الصفحات: الشبكة أولًا حتى تصل تحديثات GitHub، والكاش احتياطي دون اتصال
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(res => {
          if (res && res.ok) { const cp = res.clone(); caches.open(V).then(c => c.put("./index.html", cp)); }
          return res;
        })
        .catch(() => caches.match("./index.html").then(r => r || caches.match("./")).then(r => r || new Response(OFFLINE, { headers: { "Content-Type": "text/html; charset=utf-8" } })))
    );
    return;
  }

  // الخطوط: كاش أولًا (تعمل دون اتصال بعد أول تحميل)
  if (isFont) {
    e.respondWith(
      caches.match(req).then(r => r || fetch(req).then(res => {
        if (res && (res.ok || res.type === "opaque")) { const cp = res.clone(); caches.open(RT).then(c => c.put(req, cp)); }
        return res;
      }))
    );
    return;
  }

  // باقي الملفات: stale-while-revalidate — سريع من الكاش ويتحدّث في الخلفية
  e.respondWith(
    caches.match(req).then(cached => {
      const net = fetch(req).then(res => {
        if (res && res.ok) { const cp = res.clone(); caches.open(V).then(c => c.put(req, cp)); }
        return res;
      }).catch(() => cached);
      return cached || net;
    })
  );
});
