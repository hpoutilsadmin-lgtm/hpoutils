import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/livres")({
  beforeLoad: () => {
    throw redirect({ to: "/livres-pdf", statusCode: 301 });
  },
});
