// Page de TEST Passeurs — checkout mensuel/annuel à 0 $ avec coupon.
// (GO HP 30 oct. 2026 : lien de test sans branchement à une page publique)
//
// Cette page N'EST LIÉE DE NULLE PART : pas de navigation, noindex,
// accessible uniquement par URL directe /test-passeurs.
// À SUPPRIMER après les tests validés.

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";
import { createPasseursCheckoutSession } from "@/utils/passeurs.functions";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/test-passeurs")({
  head: () =>
    createSeoHead({
      title: "TEST Passeurs — HP Outils",
      description: "Page de test interne, ne pas indexer.",
      path: "/test-passeurs",
      type: "website",
      noindex: true,
    }),
  component: TestPasseursPage,
});

function TestPasseursPage() {
  const [formule, setFormule] = useState<"mensuel" | "annuel" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = async (): Promise<string> => {
    if (!formule) throw new Error("Choisissez une formule");
    const result = await createPasseursCheckoutSession({
      data: { formule, environment: "live" },
    });
    if ("error" in result) throw new Error(result.error);
    if (!result.clientSecret) throw new Error("Impossible de créer la session");
    return result.clientSecret;
  };

  return (
    <section className="subpage-content">
      <div className="container" style={{ maxWidth: 720, padding: "48px 24px" }}>
        <h1>TEST Passeurs — checkout à 0 $</h1>
        <p style={{ color: "var(--ink-soft)" }}>
          Page de test interne. Utilisez le coupon{" "}
          <strong>TEST-PASSEURS-100</strong> dans le checkout pour un test à 0 $.
          Ne pas partager ce lien.
        </p>

        {!formule && (
          <div style={{ display: "flex", gap: 16, marginTop: 24, flexWrap: "wrap" }}>
            <button
              className="btn"
              type="button"
              style={{ minHeight: 56, padding: "0 24px" }}
              onClick={() => {
                setError(null);
                setFormule("mensuel");
              }}
            >
              Tester — Mensuel 3 $/mois
            </button>
            <button
              className="btn"
              type="button"
              style={{ minHeight: 56, padding: "0 24px" }}
              onClick={() => {
                setError(null);
                setFormule("annuel");
              }}
            >
              Tester — Annuel 28 $/an
            </button>
          </div>
        )}

        {formule && (
          <div style={{ marginTop: 24 }}>
            <p>
              Formule :{" "}
              <strong>{formule === "mensuel" ? "Mensuel — 3 $/mois" : "Annuel — 28 $/an"}</strong>{" "}
              <button
                type="button"
                onClick={() => setFormule(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--ink-soft)",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                changer
              </button>
            </p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div id="checkout" key={formule}>
              <EmbeddedCheckoutProvider
                stripe={getStripe()}
                options={{ fetchClientSecret }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
