'use strict';
/* Pack hors ligne HP Outils — service worker.
   Garde la Boite a outils, les outils autonomes, En cuisine, le Passeur
   et 6 jeux legers sur l'appareil pour qu'ils fonctionnent sans internet.
   Cache-first, version a changer (hp-hors-ligne-1 -> hp-hors-ligne-2)
   pour mettre le pack a jour. Portee : tout le site (/).
   Seuls les fichiers de la liste PACK sont mis en cache ; le reste
   passe par le reseau, et une navigation sans reseau tombe sur
   /hors-ligne.html. Aucune donnee saisie ne quitte l'appareil. */
var V = 'hp-hors-ligne-1';
var PACK = [
  '/manifest.webmanifest',
  '/hors-ligne.html',
  '/boite/index.html',
  '/boite/assets/manifest.webmanifest',
  '/boite/assets/icon-512.png',
  '/boite/assets/apple-touch-icon.png',
  '/boite/assets/tesseract/tesseract.min.js',
  '/boite/assets/tesseract/worker.min.js',
  '/boite/assets/tesseract/tesseract-core-lstm.wasm.js',
  '/boite/assets/tesseract/tesseract-core-lstm.wasm',
  '/boite/assets/tesseract/fra.traineddata.gz',
  '/boite/assets/qrcode.min.js',
  '/hgpto/hgpto.js',
  '/hgpto/hgpto.css',
  '/hgpto/gepeto/normal.png',
  '/hgpto/gepeto/tete-144.png',
  '/hgpto/pixel/c-patte-arr.png',
  '/hgpto/pixel/c-patte-av-d.png',
  '/hgpto/pixel/c-patte-av-g.png',
  '/hgpto/pixel/c-queue.png',
  '/hgpto/pixel/c-tete-fiche-curieux.png',
  '/hgpto/pixel/c-tete-fiche-heureux.png',
  '/hgpto/pixel/c-tete-fiche-surpris.png',
  '/hgpto/pixel/c-tete-grognon.png',
  '/hgpto/pixel/c-tete.png',
  '/hgpto/pixel/c-torse.png',
  '/hgpto/pixel/oeil-cyan.png',
  '/hgpto/pixel/oeil-rouge.png',
  '/hgpto/pixel/oreille-d.png',
  '/hgpto/pixel/oreille-g.png',
  '/hgpto/pixel/panneaux.png',
  '/hgpto/pixel/pixel-miaou-distinct-1-doux.mp3',
  '/hgpto/pixel/pixel-miaou-distinct-2-doux.mp3',
  '/hgpto/pixel/pixel-miaou-distinct-3-doux.mp3',
  '/hgpto/pixel/queue-grognon.png',
  '/outils-web/index.html',
  '/outils-web/le-reste-du-mois.html',
  '/outils-web/ca-vaut-tu-la-peine.html',
  '/outils-web/le-relais.html',
  '/outils-web/maintenant.html',
  '/compagnon/compagnon.js',
  '/compagnon/compagnon.css',
  '/apps/hp-hyper-potentiel/index.html',
  '/en-cuisine/index.html',
  '/en-cuisine/panier/index.html',
  '/en-cuisine/panier/farine/index.html',
  '/en-cuisine/panier/lait/index.html',
  '/en-cuisine/panier/oeufs/index.html',
  '/en-cuisine/panier/pommes-de-terre/index.html',
  '/en-cuisine/panier/tomates-en-conserve/index.html',
  '/passeur-de-savoir/index.html',
  '/passeur-de-savoir/assets/hero.webp',
  '/passeur-de-savoir/assets/atelier.webp',
  '/apps/hockey-hgpto/hockey-hgpto-v1.0.html',
  '/apps/mineur-hp/mineur-hp-v0.1.html',
  '/apps/slalomeuse/index.html',
  '/apps/slalomeuse/game.js',
  '/apps/votre-ia-parle-t-elle-quebecois/votre-ia-parle-t-elle-quebecois-v1.html',
  '/apps/chevalier-du-fleuve/chevalier-du-fleuve-v1.4.html',
  '/barre/barre-jeu.js',
  '/apps/sur-lherbe/sur-lherbe-v1.0.html'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(V).then(function (c) { return c.addAll(PACK); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (k) {
    return Promise.all(k.filter(function (x) { return x !== V; }).map(function (x) { return caches.delete(x); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') { return; }
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) { return; }
  var path = url.pathname;
  /* Une adresse de dossier (/boite/) ouvre son index.html du pack. */
  if (path.slice(-1) === '/') { path = path + 'index.html'; }
  if (PACK.indexOf(path) !== -1) {
    e.respondWith(caches.match(path).then(function (r) {
      return r || fetch(e.request);
    }));
    return;
  }
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(function () {
      return caches.match('/hors-ligne.html');
    }));
  }
});
