import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/ateliers")({
  head: () => ({
    meta: [
      { title: "Ateliers — HP" },
      { name: "description", content: "Cette page a déménagé vers /collaborer." },
    ],
  }),
  component: Page,
});

function Page() {
  return <Navigate to="/collaborer" replace />;
}
