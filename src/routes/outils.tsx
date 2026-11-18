import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/outils")({
  beforeLoad: ({ location }) => {
    // Redirection vers la page statique SEULEMENT pour /outils exact.
    // Sans ce garde, le beforeLoad du parent avalait aussi les enfants
    // (/outils/bons-reflexes, /outils/hp-hyper-potentiel,
    // /outils/un-petit-pas-a-la-fois) : leurs propres routes ne seraient
    // jamais atteintes (leçon du 24 oct. 2026, modèle /en-cuisine).
    // La page statique vit dans public/outils/index.html (lot /outils,
    // 16 nov. 2026 : page reçue + corrections d'audit + vraies images).
    if (location.pathname === "/outils" || location.pathname === "/outils/") {
      throw redirect({ href: "/outils/index.html", statusCode: 301 });
    }
  },
  head: () => ({
    meta: [
      { title: "HP Outils — Outils numériques, PDF et cahier" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  return null;
}
