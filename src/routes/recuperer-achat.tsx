import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { recoverOrdersByEmail } from "@/utils/payments.functions";
import { getStripeEnvironment } from "@/lib/stripe";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";

export const Route = createFileRoute("/recuperer-achat")({
  head: () => ({
    meta: [
      { title: "Récupérer mon achat — HP" },
      {
        name: "description",
        content:
          "Récupérez le lien de téléchargement de vos achats numériques en saisissant votre courriel.",
      },
      { name: "robots", content: "noindex" },
    ],
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

  return (
    <>
      <PaymentTestModeBanner />
      <section className="subpage-hero">
        <div className="container" style={{ maxWidth: 720 }}>
          <h1>Récupérer mon achat</h1>
          <p>
            Entrez le courriel utilisé lors de votre achat. Si une commande
            payée est associée à cette adresse, vous recevrez par courriel
            un nouveau lien de téléchargement (valide 7 jours).
          </p>
        </div>
      </section>
      <section className="subpage-content">
        <div className="container" style={{ maxWidth: 560 }}>
          {submitted ? (
            <div
              style={{
                padding: 20,
                border: "1px solid #e0d8cf",
                borderRadius: 4,
                background: "#faf6f1",
              }}
            >
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
      </section>
    </>
  );
}