import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { recoverOrdersByEmail } from "@/utils/payments.functions";
import { getStripeEnvironment } from "@/lib/stripe";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/recuperer-achat")({
  head: () => createSeoHead({
    title: "Récupérer mon achat — HP",
    description: "Recevez par courriel un nouveau lien pour vos achats numériques HP.",
    path: "/recuperer-achat",
    noindex: true,
  }),
  component: Page,
});

function Page() {
  const recover = useServerFn(recoverOrdersByEmail);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await recover({
        data: { email, environment: getStripeEnvironment() },
      });
    } catch {
      // Stay neutral — same message either way.
    } finally {
      setSubmitted(true);
      setLoading(false);
    }
  }

  const cardStyle: React.CSSProperties = {
    padding: 20,
    border: "1px solid #e0d8cf",
    borderRadius: 4,
    background: "#faf6f1",
    marginBottom: 20,
  };
  const stepTitleStyle: React.CSSProperties = {
    margin: "0 0 8px",
    fontSize: 20,
  };
  const stepTextStyle: React.CSSProperties = {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.55,
  };

  return (
    <>
      <PaymentTestModeBanner />
      <section className="subpage-hero">
        <div className="container" style={{ maxWidth: 720 }}>
          <h1>Récupérer mon achat</h1>
          <p>
            Pas de panique&nbsp;: votre achat n'est pas perdu. Suivez les
            étapes ci-dessous, dans l'ordre — la plupart des gens retrouvent
            leur accès à l'étape 1 ou 2.
          </p>
        </div>
      </section>
      <section className="subpage-content">
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={cardStyle}>
            <h2 style={stepTitleStyle}>
              Étape 1 — Cherchez le reçu Stripe dans vos courriels
            </h2>
            <p style={stepTextStyle}>
              Après votre achat, Stripe vous a envoyé un reçu par courriel :
              ce reçu confirme le paiement, mais il ne contient pas votre
              lien HP. Votre lien se trouve dans le courriel envoyé par
              HP Outils, séparément. Cherchez
              «&nbsp;Stripe&nbsp;» ou «&nbsp;HP Outils&nbsp;» dans votre
              boîte de réception. Jetez aussi un œil au dossier
              «&nbsp;Indésirables&nbsp;» (le pourriel)&nbsp;: le courriel
              s'y glisse parfois.
            </p>
          </div>
          <div style={cardStyle}>
            <h2 style={stepTitleStyle}>
              Étape 2 — Recevez un nouveau lien par courriel
            </h2>
            <p style={{ ...stepTextStyle, marginBottom: 16 }}>
              Entrez l'adresse exacte utilisée lors de votre achat. Si une
              commande payée est associée à cette adresse, un nouveau lien vous sera envoyé par
              courriel dans les prochaines minutes (téléchargement valide 7 jours, ou lecture web sans expiration, selon le produit).
              {/* Fusion 3B+3J : le texte 3B est gardé car le formulaire
                  couvre désormais aussi les tomes (récupération 3B) — la
                  restriction « PDF seulement » de 3J serait fausse après
                  fusion. La correction « reçu Stripe » de 3J est gardée
                  dans le paragraphe précédent. */}
            </p>
          {submitted ? (
            <div>
              <p style={{ margin: 0 }}>
                Si un achat est associé à cette adresse, un courriel
                contenant vos liens vient d'être envoyé.
                Vérifiez votre boîte de réception (et le dossier
                «&nbsp;Indésirables&nbsp;») dans les prochaines minutes.
                Pour un tome, vous pouvez aussi utiliser la page <a href="/lire">Lire</a>.
              </p>
              <p style={{ marginTop: 16, fontSize: 13, opacity: 0.75 }}>
                Vous ne recevez rien&nbsp;?{" "}
                <a href="/contact">Contactez-nous</a>.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
            <label htmlFor="email" style={{ fontWeight: 600 }}>
              Courriel
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              style={{
                padding: "12px 14px",
                border: "1px solid #ccc",
                borderRadius: 4,
                fontSize: 16,
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "14px 28px",
                background: "#b04a2f",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                fontWeight: 600,
                cursor: loading ? "wait" : "pointer",
              }}
            >
              {loading ? "Envoi…" : "Recevoir mes liens par courriel"}
            </button>
            </form>
          )}
          </div>
          <div style={cardStyle}>
            <h2 style={stepTitleStyle}>
              Étape 3 — Toujours rien&nbsp;? Un humain s'en occupe
            </h2>
            <p style={stepTextStyle}>
              Écrivez à{" "}
              <a href="mailto:hpoutils.admin@gmail.com">
                hpoutils.admin@gmail.com
              </a>{" "}
              avec l'adresse courriel utilisée à l'achat — et, si vous vous
              en souvenez, le nom du produit et la date approximative.
              L'équipe retrouvera votre commande et vous renverra votre accès : une réponse de la direction humaine, pas d'un robot, sous
              3 jours ouvrables. Vous pouvez aussi passer par le{" "}
              <a href="/contact#formulaire-contact">formulaire de contact</a>.
            </p>
          </div>
          <p style={{ textAlign: "center" }}>
            <Link to="/">Retour à l'accueil</Link>
          </p>
        </div>
      </section>
    </>
  );
}