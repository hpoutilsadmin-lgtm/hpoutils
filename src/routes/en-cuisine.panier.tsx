import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/en-cuisine/panier")({
  beforeLoad: ({ location }) => {
    // Même garde que le parent /en-cuisine (24 oct. 2026) : la redirection
    // vers la page pilier ne vaut que pour /en-cuisine/panier exact, sinon
    // elle avale les grappes (/panier/$grappe) qui ont leur propre page.
    if (location.pathname === "/en-cuisine/panier" || location.pathname === "/en-cuisine/panier/") {
      throw redirect({ href: "/en-cuisine/panier/index.html", statusCode: 301 });
    }
  },
  head: () => ({
    meta: [
      { title: "Quoi faire avec ton panier de banque alimentaire ?" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  return null;
}
