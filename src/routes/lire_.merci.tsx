import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { createSeoHead } from "@/lib/seo";
import { fulfillTomeOrder } from "@/utils/tomes.functions";
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
  | { kind: "paid"; links: Array<{ slug: string; title: string; url: string }> }
  | { kind: "delivered"; email: string }
  // « Offrir » : l'acheteur ne voit JAMAIS les liens du destinataire.
  | { kind: "gift"; email: string }
  | { kind: "not-tome" }
  | { kind: "error"; message: string };

function Page() {
  const { session_id } = Route.useSearch();
  const fulfill = useServerFn(fulfillTomeOrder);
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;
    if (!session_id) {
      setState({ kind: "missing" });
      return;
    }
    (async () => {
      try {
        const result = await fulfill({ data: { sessionId: session_id } });
        if (cancelled) return;
        if (result.status === "pending") setState({ kind: "pending" });
        else if (result.status === "gift") setState({ kind: "gift", email: result.email });
        else if (result.status === "paid") setState({ kind: "paid", links: result.links });
        else if (result.status === "delivered") setState({ kind: "delivered", email: result.email });
        else if (result.status === "not-tome") setState({ kind: "not-tome" });
        else setState({ kind: "error", message: result.message ?? "Erreur inconnue" });
      } catch (e: any) {
        if (!cancelled) setState({ kind: "error", message: e?.message ?? "Erreur inconnue" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session_id, fulfill]);

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
              <p>Ton paiement est en cours de traitement. Rafraîchis cette page dans un instant.</p>
            </>
          )}
          {state.kind === "gift" && (
            <>
              <h1>Merci ! C'est offert.</h1>
              <ThankYouCelebration />
              <p>
                Les liens ont été envoyés à <strong>{state.email}</strong>.
                Vous, vous gardez la facture. Si le cadeau n'arrive pas, la
                direction humaine vous répond sous 3 jours ouvrables :{" "}
                <a href="mailto:hpoutils.admin@gmail.com">hpoutils.admin@gmail.com</a>.
              </p>
              <p>
                <Link to="/lire">Retour aux tomes</Link>
              </p>
            </>
          )}
          {state.kind === "paid" && (
            <>
              <h1>Merci ! Voici tes liens</h1>
              <ThankYouCelebration />
              <p>Les mêmes liens te sont aussi envoyés par courriel.</p>
              {state.links.map((link) => (
                <p key={link.slug}>
                  <strong>{link.title}</strong> — <Link to={link.url}>Lire →</Link>
                </p>
              ))}
              <p>
                <Link to="/univers">L'univers des histoires →</Link>
              </p>
            </>
          )}
          {state.kind === "delivered" && (
            <>
              <h1>Déjà livré</h1>
              <p>
                Tes liens ont déjà été envoyés par courriel à {state.email}. Vérifie
                ta boîte courriel — et tes indésirables, au besoin.
              </p>
              <p>
                <Link to="/lire">Recevoir de nouveaux liens →</Link>
              </p>
            </>
          )}
          {state.kind === "not-tome" && (
            <>
              <h1>Ce n'est pas une commande de tomes</h1>
              <p>
                Cette session concerne un autre produit. Pour les livres et kits en
                PDF, c'est la page de retour habituelle.
              </p>
              <Link to="/livres-pdf">Voir les livres →</Link>
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
