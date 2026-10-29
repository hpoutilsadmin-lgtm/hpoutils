// Sécurité phase 2 — page de retour en LECTURE SEULE.
// Elle n'affiche qu'un statut (paid / pending / missing), jamais un lien,
// jamais un jeton, jamais un courriel complet. La livraison se fait
// UNIQUEMENT par le webhook Stripe vérifié, par courriel.
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getCheckoutStatus } from "@/utils/checkout-status.server";
import { createSeoHead } from "@/lib/seo";
import { ThankYouCelebration } from "@/components/ThankYouCelebration";

export const Route = createFileRoute("/checkout/return")({
  validateSearch: (search: Record<string, unknown>): { session_id?: string } => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  head: () => createSeoHead({
    title: "Merci pour votre achat — HP",
    description: "Confirmation de votre achat numérique HP.",
    path: "/checkout/return",
    noindex: true,
  }),
  component: Page,
});

type State =
  | { kind: "loading" }
  | { kind: "missing" }
  | { kind: "pending" }
  | { kind: "paid"; itemCount: number }
  | { kind: "delivered"; itemCount: number }
  | { kind: "error"; message: string };

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
        else if (result.status === "delivered") setState({ kind: "delivered", itemCount: result.itemCount });
        else if (result.status === "paid") setState({ kind: "paid", itemCount: result.itemCount });
        else setState({ kind: "missing" });
      } catch (e: any) {
        if (cancelled) return;
        setState({ kind: "error", message: e?.message ?? "Erreur inconnue" });
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
            <Link to="/livres-pdf">Retour à la bibliothèque</Link>
          </>
        )}
        {state.kind === "pending" && (
          <>
            <h1>Paiement en cours</h1>
            <p>Votre paiement est en cours de traitement. Vérifiez votre courriel dans quelques minutes, ou récupérez votre achat ici :{" "}
              <Link to="/recuperer-achat">Récupérer un achat</Link>.</p>
          </>
        )}
        {state.kind === "error" && (
          <>
            <h1>Une erreur est survenue</h1>
            <p>{state.message}</p>
            <Link to="/contact">Nous contacter</Link>
          </>
        )}
        {state.kind === "delivered" && (
          <>
            <h1>Déjà livré</h1>
            <p>
              Cet achat a déjà été livré par courriel. Vérifiez votre boîte de réception (et le dossier «&nbsp;Indésirables&nbsp;»).
              Si vous avez perdu votre lien, récupérez votre achat ici :{" "}
              <Link to="/recuperer-achat">Récupérer un achat</Link>.
            </p>
          </>
        )}
        {state.kind === "paid" && (
          <>
            <h1>Merci !</h1>
            <ThankYouCelebration />
            <p>
              Votre achat est confirmé. Les liens de téléchargement vous ont été envoyés par courriel.
              Vérifiez votre boîte de réception (et le dossier «&nbsp;Indésirables&nbsp;») dans les prochaines minutes.
            </p>
            <p style={{ marginTop: 32, fontSize: 14, opacity: 0.7 }}>
              Le lien de téléchargement reste valide 7 jours. Conservez-le précieusement.
            </p>
            <p style={{ marginTop: 16, fontSize: 14 }}>
              Vous avez perdu votre lien plus tard ?{" "}
              <Link to="/recuperer-achat">Récupérez-le ici</Link>.
            </p>
            <div
              style={{
                marginTop: 32,
                padding: 20,
                border: "1px solid #e0d8cf",
                borderRadius: 4,
                background: "#faf6f1",
                textAlign: "left",
              }}
            >
              <p style={{ margin: "0 0 8px", fontWeight: 700 }}>
                Vous avez réussi à ouvrir votre PDF ?
              </p>
              <p style={{ margin: 0, fontSize: 14 }}>
                Si ça coince — un fichier qui ne s'ouvre pas, un lien
                mort, le mauvais fichier — écris à{" "}
                <a href="mailto:hpoutils.admin@gmail.com">
                  hpoutils.admin@gmail.com
                </a>{" "}
                : une réponse de la direction humaine, pas d'un robot, sous 3 jours ouvrables.
                Si c'est une panne technique de notre côté, on répare ou
                on rembourse, comme le disent les{" "}
                <Link to="/conditions-de-vente">conditions de vente</Link>.
              </p>
              <p style={{ margin: "12px 0 0", fontSize: 14 }}>
                Merci pour votre confiance. — HP
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
