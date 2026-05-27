import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { fulfillPdfOrder } from "@/utils/payments.functions";
import { getStripeEnvironment } from "@/lib/stripe";

export const Route = createFileRoute("/checkout/return")({
  validateSearch: (search: Record<string, unknown>): { session_id?: string } => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Merci pour votre achat — HP" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

type State =
  | { kind: "loading" }
  | { kind: "missing" }
  | { kind: "pending" }
  | { kind: "paid"; email: string; message: string | null }
  | { kind: "error"; message: string };

function Page() {
  const { session_id } = Route.useSearch();
  const fulfill = useServerFn(fulfillPdfOrder);
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;
    if (!session_id) {
      setState({ kind: "missing" });
      return;
    }
    (async () => {
      try {
        const result = await fulfill({
          data: { sessionId: session_id, environment: getStripeEnvironment() },
        });
        if (cancelled) return;
        if (result.status === "pending") setState({ kind: "pending" });
        else
          setState({
            kind: "paid",
            email: result.email,
            message: result.message,
          });
      } catch (e: any) {
        if (cancelled) return;
        setState({ kind: "error", message: e?.message ?? "Erreur inconnue" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session_id, fulfill]);

  return (
    <section className="subpage-content">
      <div className="container" style={{ maxWidth: 720, textAlign: "center", padding: "64px 24px" }}>
        {state.kind === "loading" && <p>Confirmation de votre paiement…</p>}
        {state.kind === "missing" && (
          <>
            <h1>Session introuvable</h1>
            <p>Aucun identifiant de paiement n'a été fourni.</p>
            <Link to="/livres-pdf">Retour à la bibliothèque</Link>
          </>
        )}
        {state.kind === "pending" && (
          <>
            <h1>Paiement en cours</h1>
            <p>Votre paiement est en cours de traitement. Rafraîchissez cette page dans un instant.</p>
          </>
        )}
        {state.kind === "error" && (
          <>
            <h1>Une erreur est survenue</h1>
            <p>{state.message}</p>
            <Link to="/contact">Nous contacter</Link>
          </>
        )}
        {state.kind === "paid" && (
          <>
            <h1>Merci !</h1>
            <p>
              Votre achat est confirmé.
              {state.email && <> Un reçu a été envoyé à <strong>{state.email}</strong>.</>}
            </p>
            {state.message ? (
              <p style={{ marginTop: 24, color: "#b04a2f" }}>{state.message}</p>
            ) : (
              <p style={{ marginTop: 32, fontSize: 16 }}>
                Un courriel contenant votre lien de téléchargement vient
                d'être envoyé à <strong>{state.email}</strong>. Vérifiez
                votre boîte de réception (et le dossier «&nbsp;Indésirables&nbsp;»)
                dans les prochaines minutes.
              </p>
            )}
            <p style={{ marginTop: 32, fontSize: 14, opacity: 0.7 }}>
              Le lien de téléchargement reste valide 7 jours. Conservez-le précieusement.
            </p>
            <p style={{ marginTop: 16, fontSize: 14 }}>
              Vous avez perdu votre lien plus tard ?{" "}
              <Link to="/recuperer-achat">Récupérez-le ici</Link>.
            </p>
          </>
        )}
      </div>
    </section>
  );
}