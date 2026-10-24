import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/en-cuisine")({
  beforeLoad: ({ location }) => {
    // Redirection vers la page statique SEULEMENT pour /en-cuisine exact.
    // Sans ce garde, le beforeLoad du parent avalait aussi les enfants
    // (/en-cuisine/panier, /en-cuisine/panier/$grappe) : leurs propres
    // redirections vers les pages distinctes n'étaient jamais atteintes
    // (24 oct. 2026 : les adresses panier retombaient sur l'index générique).
    if (location.pathname === "/en-cuisine" || location.pathname === "/en-cuisine/") {
      throw redirect({ href: "/en-cuisine/index.html", statusCode: 301 });
    }
  },
  head: () => ({
    meta: [
      { title: "En cuisine — Recettes HP" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  return null;
}
