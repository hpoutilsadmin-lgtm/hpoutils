// Page de merci d'un bon cadeau — route /cadeaux/merci, non imbriquée
// (même motif que lire_.merci.tsx : une route à la racine, pas un enfant
// de /cadeaux, pour éviter l'affichage du catalogue à la place du contenu).
// La page appelle fulfillGiftPurchase : le code n'est créé qu'après un
// paiement confirmé, et un rechargement relit le même code.
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createSeoHead } from "@/lib/seo";
import { fulfillGiftPurchase } from "@/utils/cadeaux.functions";
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
  | { kind: "paid"; code: string; amountCents: number; email: string | null }
  | { kind: "error" };

function Page() {
  const { session_id } = Route.useSearch();
  const fulfill = useServerFn(fulfillGiftPurchase);
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
        else if (result.status === "paid") {
          setState({
            kind: "paid",
            code: result.code,
            amountCents: result.amountCents,
            email: result.email,
          });
        } else setState({ kind: "error" });
      } catch {
        if (!cancelled) setState({ kind: "error" });
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
              Ton bon cadeau de {state.amountCents / 100} $ CAD est prêt.
              Voici ton code personnel — il est aussi envoyé par courriel
              {state.email ? <> à <strong>{state.email}</strong></> : null} :
            </p>
            <p style={{ fontSize: 24, fontWeight: "bold", letterSpacing: 2, margin: "24px 0" }}>
              {state.code}
            </p>
            <p>Offre ce code à qui tu veux : il se saisit au panier.</p>
            <p style={{ marginTop: 24 }}>
              <Link to="/panier">Aller au panier →</Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
