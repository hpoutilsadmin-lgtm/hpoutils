import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/en-cuisine/panier/$grappe")({
  beforeLoad: ({ params }) => {
    throw redirect({
      href: `/en-cuisine/panier/${params.grappe}/index.html`,
      statusCode: 301,
    });
  },
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
  }),
  component: Page,
});

function Page() {
  return null;
}
