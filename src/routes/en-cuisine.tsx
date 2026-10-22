import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/en-cuisine")({
  beforeLoad: () => {
    throw redirect({ href: "/en-cuisine/index.html", statusCode: 301 });
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
