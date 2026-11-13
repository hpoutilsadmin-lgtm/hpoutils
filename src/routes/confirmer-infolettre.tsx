import { createFileRoute, Link } from "@tanstack/react-router";
import extrait from "@/assets/extrait-frigo-sans-honte.pdf.asset.json";
import { useEffect, useState } from "react";
import { createSeoHead } from "@/lib/seo";

// Double confirmation infolettre (§3.2 — lot sécurité 2, appliqué
// 12 nov. 2026, décision HP Q-S2-2 : OUI) : page ouverte par le lien du
// courriel de confirmation. Même motif que /unsubscribe (jeton en
// paramètre, appel GET vers la route API, états affichés en VOUS).
export const Route = createFileRoute("/confirmer-infolettre")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
  }),
  head: () =>
    createSeoHead({
      title: "Confirmation de votre inscription — HP Outils",
      description: "Confirmez votre inscription aux nouveautés HP.",
      path: "/confirmer-infolettre",
      noindex: true,
    }),
  component: Page,
});

function Page() {
  const { token } = Route.useSearch();
  const [state, setState] = useState<
    "checking" | "confirmed" | "already" | "expired" | "invalid" | "error"
  >("checking");

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    fetch(`/api/public/newsletter-confirm?token=${token}`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) {
          if (data.reason === "expired") setState("expired");
          else setState("invalid");
          return;
        }
        if (data.reason === "already") setState("already");
        else setState("confirmed");
      })
      .catch(() => setState("error"));
  }, [token]);

  return (
    <section className="subpage-content">
      <div className="container" style={{ maxWidth: 560, padding: "48px 0" }}>
        <h1>Confirmation de votre inscription</h1>
        {state === "checking" && <p>Vérification…</p>}
        {state === "confirmed" && (
          <>
            <p>
              C&apos;est confirmé. Vous êtes bien inscrit aux nouveautés HP.
              Vous pouvez vous désinscrire en un clic à tout moment.
            </p>
            <p>
              Comme promis, voici votre extrait gratuit du kit Frigo Sans
              Honte : des repères concrets pour composer avec ce que vous
              avez déjà.
            </p>
            <p>
              <a className="action-btn" href={extrait.url} download="Extrait-gratuit-Frigo-Sans-Honte.pdf" target="_blank" rel="noopener">
                Télécharger l&apos;extrait gratuit (PDF)
              </a>
            </p>
          </>
        )}
        {state === "already" && (
          <p>
            Cette adresse est déjà confirmée. Aucune autre action n&apos;est
            requise.
          </p>
        )}
        {state === "expired" && (
          <p>
            Ce lien a expiré. Soumettez à nouveau le formulaire
            d&apos;inscription pour recevoir un nouveau lien.
          </p>
        )}
        {state === "invalid" && (
          <p>Ce lien de confirmation est invalide.</p>
        )}
        {state === "error" && (
          <p>Une erreur est survenue. Veuillez réessayer plus tard.</p>
        )}
        {state !== "checking" && (
          <p style={{ marginTop: 24 }}>
            <Link to="/">Retour à l&apos;accueil</Link>
          </p>
        )}
      </div>
    </section>
  );
}
