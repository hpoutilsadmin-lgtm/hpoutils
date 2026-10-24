import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/en-cuisine/panier")({
  beforeLoad: () => {
    throw redirect({ href: "/en-cuisine/panier/index.html", statusCode: 301 });
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
