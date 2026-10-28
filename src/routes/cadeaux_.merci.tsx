// Sécurité phase 2 — page de merci bons cadeaux en LECTURE SEULE.
// Le programme bons cadeaux est fermé (ventes désactivées) : cette page
// ne crée PLUS aucun code, n'affiche aucun code, aucun montant, aucun
// courriel. Elle n'affiche qu'un statut, comme les autres pages de retour.
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createSeoHead } from "@/lib/seo";
import { getCheckoutStatus } from "@/utils/checkout-status.server";
import { ThankYouCelebration } from "@/components/ThankYouCelebration";

export const Route = createFileRoute("/cadeaux_/merci")({
  validateSearch: (search: Record<string, unknown>): { session_id?: string } => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  head: () =>
    createSeoHead({
      title: "Merci — votre bon cadeau | HP Outils",
      description: "Confirmation de ton bon cadeau HP Outils.",
      path: "/cadeaux/merci",
      noindex: true,
    }),
  component: Page,
});

type State =
  | { kind: "loading" }
  | { kind: "missing" }
  | { kind: "pending" }
  | { kind: "paid" }
  | { kind: "error" };

function Page() {
  const { session_id } = Route.useSearch();
  const check = useServerFn(getCheckoutStatus);
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;
    if (!session_id) {
      setState({ kind: "missing" });
      return;
    }
    (async () => {
      try {
        const result = await check({ data: { sessionId: session_id } });
        if (cancelled) return;
        if (result.status === "pending") setState({ kind: "pending" });
        else if (result.status === "paid") setState({ kind: "paid" });
        else setState({ kind: "missing" });
      } catch {
        if (!cancelled) setState({ kind: "error" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session_id, check]);

  return (
    <section className="subpage-content">
      <div className="container" style={{ maxWidth: 720, textAlign: "center", padding: "64px 24px" }}>
        {state.kind === "loading" && <p>Confirmation de votre paiement…</p>}
        {state.kind === "missing" && (
          <>
            <h1>Session introuvable</h1>
            <p>Aucun identifiant de paiement n'a été fourni.</p>
            <Link to="/cadeaux">Retour aux bons cadeaux</Link>
          </>
        )}
        {state.kind === "pending" && (
          <>
            <h1>Paiement en cours</h1>
            <p>Rafraîchis cette page dans un instant.</p>
          </>
        )}
        {state.kind === "error" && (
          <>
            <h1>Une erreur est survenue</h1>
            <p>
              Ton paiement n'a pas pu être confirmé. Une question ?{" "}
              <a href="mailto:hpoutils.admin@gmail.com">Écrire à la direction humaine</a>.
            </p>
          </>
        )}
        {state.kind === "paid" && (
          <>
            <h1>Merci !</h1>
            <ThankYouCelebration />
            <p>
              Votre achat est confirmé. Les détails vous ont été envoyés par courriel.
              Les codes déjà émis restent utilisables au panier.
            </p>
            <p style={{ marginTop: 24 }}>
              <Link to="/panier">Aller au panier →</Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
