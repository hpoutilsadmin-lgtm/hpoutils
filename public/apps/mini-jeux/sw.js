const C="mini-jeux-2";
const FICHIERS=["./mini-jeux-hp.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./gepeto-tete-144.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(FICHIERS))));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(cles=>Promise.all(cles.filter(k=>k!==C).map(k=>caches.delete(k))))));
self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
