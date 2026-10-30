import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/unsubscribe")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
  }),
  head: () => createSeoHead({
    title: "Désabonnement — HP Outils",
    description: "Gérez votre désabonnement aux courriels HP.",
    path: "/unsubscribe",
    noindex: true,
  }),
  component: Page,
});

function Page() {
  const { token } = Route.useSearch();
  const [state, setState] = useState<
    "checking" | "ready" | "already" | "invalid" | "submitting" | "done" | "error"
  >("checking");

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) {
          setState("invalid");
          return;
        }
        if (data.valid) setState("ready");
        else if (data.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      })
      .catch(() => setState("invalid"));
  }, [token]);

  async function confirm() {
    setState("submitting");
    try {
      const r = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await r.json();
      if (data.success) setState("done");
      else if (data.reason === "already_unsubscribed") setState("already");
      else setState("error");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="subpage-content">
      <div className="container" style={{ maxWidth: 560, padding: "48px 0" }}>
        <h1>Désabonnement</h1>
        {state === "checking" && <p>Vérification…</p>}
        {state === "invalid" && (
          <p>Ce lien de désabonnement est invalide ou a expiré.</p>
        )}
        {state === "already" && (
          <p>Cette adresse est déjà désabonnée. Aucune autre action n'est requise.</p>
        )}
        {state === "ready" && (
          <>
            <p>
              Confirmez le désabonnement pour ne plus recevoir de courriels
              de notre part.
            </p>
            <button
              onClick={confirm}
              style={{
                padding: "12px 24px",
                background: "#b04a2f",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Confirmer le désabonnement
            </button>
          </>
        )}
        {state === "submitting" && <p>Traitement…</p>}
        {state === "done" && (
          <p>C'est fait. Vous ne recevrez plus de courriels.</p>
        )}
        {state === "error" && (
          <p>Une erreur est survenue. Veuillez réessayer plus tard.</p>
        )}
        {(state === "invalid" || state === "already" || state === "done" || state === "error") && (
          <p style={{ marginTop: 24 }}>
            <Link to="/">Retour à l'accueil</Link>
          </p>
        )}
      </div>
    </section>
  );
}