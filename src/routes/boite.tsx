import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/boite")({
  beforeLoad: () => {
    throw redirect({ href: "/boite/index.html", statusCode: 301 });
  },
  head: () => ({
    meta: [
      { title: "La Boîte à outils | HP Outils" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  return null;
}
