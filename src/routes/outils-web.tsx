// ROUTE DE REDIRECTION — /outils-web → /outils-web/index.html
// LOT P5-A (nuit harmonisation, 7 nov. 2026) — PRÉPARÉ, NON DÉPOSÉ.
// À déposer sur go du coordinateur / d'HP, avec le MANIFESTE du lot.
//
// Cause vérifiée (tête 2d0f1db, D-N2) : la page existe sous
// public/outils-web/index.html (20 400 o, 9 outils) et répond par son
// chemin exact (/outils-web/maintenant.html répond aussi), mais AUCUNE
// route TanStack ne couvre /outils-web — routeTree.gen.ts : 0 occurrence
// de « outils-web ». La demande /outils-web/ ne correspond donc ni à un
// fichier statique exact, ni à une route : elle tombe sur le
// notFoundComponent de __root.tsx (404 « Page introuvable »).
// Aucun index de répertoire n'est résolu nulle part dans le dépôt
// (pas de _redirects, pas de règle dans public/_headers, wrangler.jsonc
// sans assets ni routes) et aucune config de routage « Lovable inversé »
// n'existe dans le dépôt : l'explication de Mel est réfutée sur pièces.
// Précédents du même correctif, même forme : /livres → /livres-pdf
// (livres.tsx, 83b455c), /en-cuisine → /en-cuisine/index.html
// (en-cuisine.tsx), /boite → /boite/index.html (boite.tsx).
// Le garde sur les deux pathname reprend en-cuisine.tsx : c'est
// /outils-web/ (avec barre oblique) qui est signalé en 404.
// src/routes/__root.tsx n'est PAS touché ; routeTree.gen.ts est généré
// par le build (en-tête du fichier : « automatically generated ») et
// n'est donc pas fourni dans ce lot.
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/outils-web")({
  beforeLoad: ({ location }) => {
    // Redirection vers la page statique SEULEMENT pour /outils-web exact.
    if (location.pathname === "/outils-web" || location.pathname === "/outils-web/") {
      throw redirect({ href: "/outils-web/index.html", statusCode: 301 });
    }
  },
  head: () => ({
    meta: [
      { title: "Outils gratuits pour la vraie vie — HP Outils" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  return null;
}
