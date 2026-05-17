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

type Item = {
  orderId: string;
  title: string;
  downloadUrl: string | null;
  purchasedAt: string;
};

function Page() {
  const recover = useServerFn(recoverOrdersByEmail);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setItems(null);
    try {
      const result = await recover({
        data: { email, environment: getStripeEnvironment() },
      });
      setItems(result.items);
    } catch (err: any) {
      setError(err?.message ?? "Erreur inconnue");
    } finally {
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
            payée est trouvée, un nouveau lien de téléchargement (valide 7
            jours) sera affiché ci-dessous.
          </p>
        </div>
      </section>
      <section className="subpage-content">
        <div className="container" style={{ maxWidth: 560 }}>
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
              {loading ? "Recherche…" : "Récupérer mes liens"}
            </button>
          </form>

          {error && (
            <p style={{ marginTop: 24, color: "#b04a2f" }}>{error}</p>
          )}

          {items && items.length === 0 && (
            <p style={{ marginTop: 32 }}>
              Aucune commande payée trouvée pour ce courriel. Vérifiez
              l'adresse exacte utilisée lors de l'achat, ou{" "}
              <a href="/contact">contactez-nous</a>.
            </p>
          )}

          {items && items.length > 0 && (
            <div style={{ marginTop: 32, display: "grid", gap: 16 }}>
              <h2 style={{ fontSize: 18 }}>Vos achats</h2>
              {items.map((it) => (
                <div
                  key={it.orderId}
                  style={{
                    padding: 16,
                    border: "1px solid #e0d8cf",
                    borderRadius: 4,
                  }}
                >
                  <strong>{it.title}</strong>
                  <div style={{ fontSize: 13, opacity: 0.7, marginTop: 4 }}>
                    Acheté le{" "}
                    {new Date(it.purchasedAt).toLocaleDateString("fr-CA")}
                  </div>
                  {it.downloadUrl ? (
                    <p style={{ marginTop: 12 }}>
                      <a
                        href={it.downloadUrl}
                        style={{
                          display: "inline-block",
                          padding: "10px 20px",
                          background: "#b04a2f",
                          color: "#fff",
                          borderRadius: 4,
                          textDecoration: "none",
                          fontWeight: 600,
                        }}
                      >
                        Télécharger →
                      </a>
                    </p>
                  ) : (
                    <p style={{ marginTop: 12, color: "#b04a2f" }}>
                      Lien indisponible — contactez-nous.
                    </p>
                  )}
                </div>
              ))}
              <p style={{ fontSize: 13, opacity: 0.7 }}>
                Les liens restent valides 7 jours. Vous pouvez revenir sur
                cette page à tout moment pour en générer de nouveaux.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}