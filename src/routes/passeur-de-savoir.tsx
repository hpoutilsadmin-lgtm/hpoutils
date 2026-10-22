import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/passeur-de-savoir")({
  beforeLoad: () => {
    throw redirect({ href: "/passeur-de-savoir/index.html", statusCode: 301 });
  },
  head: () => ({
    meta: [
      { title: "Le Passeur de savoir — HP Outils" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  return null;
}
