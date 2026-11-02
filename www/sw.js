// Offline support. The build stamp changes on every deploy, so phones pick up new versions automatically.
const BUILD = "__BUILD__";
const CACHE = "maya-" + BUILD;
const CORE = [
  "./", "index.html", "manifest.webmanifest", "offline.html",
  "css/style.css?v=" + BUILD,
  "js/config.js?v=" + BUILD, "js/products1.js?v=" + BUILD, "js/products2.js?v=" + BUILD, "js/learn.js?v=" + BUILD, "js/app.js?v=" + BUILD,
  "icons/icon-192.png", "icons/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("maya-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com" || url.hostname === "cdnjs.cloudflare.com";
  if (isFont) {
    // fonts: cache first
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
    })));
    return;
  }
  if (url.origin !== self.location.origin) return;
  // app files: network first (fresh content when online), cache when offline
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, {ignoreSearch: req.mode === "navigate"}).then(hit => hit || (req.mode === "navigate" ? caches.match("index.html") : undefined)))
  );
});
