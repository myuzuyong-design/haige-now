/* ハイゲなう。 service worker: network-first so the 5-minute updates always win. */
const CACHE = "haige-now-v2";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  /* GitHub Pages serves HTML with a 10-minute HTTP cache. Page navigations
     bypass it so an app open always shows the newest 5-minute update. */
  const request =
    event.request.mode === "navigate"
      ? new Request(event.request.url, { cache: "reload" })
      : event.request;
  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
