import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/outils_/hp-hyper-potentiel")({
  beforeLoad: () => {
    throw redirect({ to: "/outils/un-petit-pas-a-la-fois" });
  },
});
