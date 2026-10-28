// Sécurité phase 2 — page de merci tomes en LECTURE SEULE.
// Elle n'affiche JAMAIS les liens de lecture dans la page : les liens
// sont envoyés par courriel, par le webhook seul. Un rechargement ne
// renvoie rien, un session_id seul ne donne aucun lien.
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { createSeoHead } from "@/lib/seo";
import { getCheckoutStatus } from "@/utils/checkout-status.server";
import { ThankYouCelebration } from "@/components/ThankYouCelebration";

export const Route = createFileRoute("/lire_/merci")({
  validateSearch: (search: Record<string, unknown>): { session_id?: string } => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  head: () => createSeoHead({
    title: "Merci — À toi l'histoire | HP Outils",
    description: "Confirmation de ton achat « À toi l'histoire ».",
    path: "/lire/merci",
    noindex: true,
  }),
  component: Page,
});

type State =
  | { kind: "loading" }
  | { kind: "missing" }
  | { kind: "pending" }
  | { kind: "paid" }
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
        else if (result.status === "paid") setState({ kind: "paid" });
        else setState({ kind: "missing" });
      } catch (e: any) {
        if (!cancelled) setState({ kind: "error", message: e?.message ?? "Erreur inconnue" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session_id, check]);

  return (
    <>
      <PaymentTestModeBanner />
      <section className="subpage-content">
        <div className="container" style={{ maxWidth: 720, textAlign: "center", padding: "64px 24px" }}>
          {state.kind === "loading" && <p>Confirmation de ton paiement…</p>}
          {state.kind === "missing" && (
            <>
              <h1>Session introuvable</h1>
              <p>Aucun identifiant de paiement n'a été fourni.</p>
              <Link to="/lire">Retour aux tomes</Link>
            </>
          )}
          {state.kind === "pending" && (
            <>
              <h1>Paiement en cours</h1>
              <p>Ton paiement est en cours de traitement. Vérifiez votre courriel dans quelques minutes, ou récupérez votre achat ici :{" "}
                <Link to="/recuperer-achat">Récupérer un achat</Link>.</p>
            </>
          )}
          {state.kind === "paid" && (
            <>
              <h1>Merci !</h1>
              <ThankYouCelebration />
              <p>Les liens de lecture vous ont été envoyés par courriel. Vérifiez votre boîte de réception (et vos indésirables, au besoin).</p>
              <p>
                <Link to="/lire">Retour aux tomes</Link>
              </p>
            </>
          )}
          {state.kind === "error" && (
            <>
              <h1>Erreur</h1>
              <p>{state.message}</p>
              <p>
                <a href="mailto:hpoutils.admin@gmail.com">Écrire à la direction humaine</a> —
                la direction humaine répond sous 3 jours ouvrables.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
