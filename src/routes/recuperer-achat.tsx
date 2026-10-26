import { createFileRoute } from "@tanstack/react-router";
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
              Après votre achat, Stripe vous a envoyé un reçu par courriel,
              et le lien de téléchargement se trouve dedans. Cherchez
              «&nbsp;Stripe&nbsp;» ou «&nbsp;HP Outils&nbsp;» dans votre
              boîte de réception. Jetez aussi un œil au dossier
              «&nbsp;Indésirables&nbsp;» (le pourriel)&nbsp;: le reçu s'y
              glisse parfois.
            </p>
          </div>
          <div style={cardStyle}>
            <h2 style={stepTitleStyle}>
              Étape 2 — Recevez un nouveau lien par courriel
            </h2>
            <p style={{ ...stepTextStyle, marginBottom: 16 }}>
              Entrez l'adresse exacte utilisée lors de votre achat. Si une
              commande payée est associée à cette adresse, un nouveau lien
              de téléchargement (valide 7 jours) vous sera envoyé par
              courriel dans les prochaines minutes.
            </p>
          {submitted ? (
            <div>
              <p style={{ margin: 0 }}>
                Si un achat est associé à cette adresse, un courriel
                contenant vos liens de téléchargement vient d'être envoyé.
                Vérifiez votre boîte de réception (et le dossier
                «&nbsp;Indésirables&nbsp;») dans les prochaines minutes.
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
              L'équipe retrouvera votre commande et vous renverra votre accès : une réponse d'humain, pas d'un robot, sous
              3 jours ouvrables. Vous pouvez aussi passer par le{" "}
              <a href="/contact#formulaire-contact">formulaire de contact</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}