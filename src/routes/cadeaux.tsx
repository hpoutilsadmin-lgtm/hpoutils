// Page d'achat d'un bon cadeau — route /cadeaux.
// Même motif que la page panier : la fonction serveur résout le prix par
// lookup_key ; si le prix Stripe n'existe pas encore, la page l'affiche
// honnêtement au lieu de simuler un paiement.
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createSeoHead } from "@/lib/seo";
import { getStripeEnvironment } from "@/lib/stripe";
import { createGiftCheckoutSession } from "@/utils/cadeaux.functions";
import { GIFT_DENOMINATIONS } from "@/lib/cadeaux";

export const Route = createFileRoute("/cadeaux")({
  head: () =>
    createSeoHead({
      title: "Bons cadeaux | HP Outils",
      description:
        "Offre un bon cadeau HP Outils : 5, 10, 20, 50 ou 100 $ CAD, par code personnel, à échanger au panier.",
      path: "/cadeaux",
    }),
  component: Page,
});

function Page() {
  const [etat, setEtat] = useState<"idle" | "envoi" | "indisponible">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const creerSession = useServerFn(createGiftCheckoutSession);

  const acheter = async (lookupKey: string) => {
    if (etat === "envoi") return;
    setEtat("envoi");
    setMessage(null);
    try {
      const result = await creerSession({
        data: { lookupKey, environment: getStripeEnvironment() },
      });
      if ("error" in result) {
        setEtat("indisponible");
        setMessage("Ce bon n'est pas en vente pour l'instant. Réessaie plus tard.");
        return;
      }
      if (typeof result.checkoutUrl === "string" && result.checkoutUrl.startsWith("https://")) {
        window.location.href = result.checkoutUrl;
        return;
      }
      setEtat("indisponible");
    } catch {
      setEtat("indisponible");
      setMessage("Ce bon n'est pas en vente pour l'instant. Réessaie plus tard.");
    }
  };

  return (
    <>
      <section className="editorial-hero">
        <div className="container">
          <span className="editorial-kicker">Bons cadeaux</span>
          <h1>
            Offrir, <em>simplement</em>.
          </h1>
          <p className="lead">
            Un bon cadeau, c'est un code personnel. Tu l'achètes, tu le reçois
            par courriel, tu l'offres à qui tu veux. La personne saisit le
            code au panier : le montant s'applique à son achat, en une fois
            ou par tranches, jusqu'à épuisement du solde.
          </p>
          <p className="lead">
            Prix en $ CAD, aucune taxe ajoutée. Un bon ne s'échange pas
            contre de l'argent, sauf le solde de 5 $ ou moins, remboursable à la demande.
          </p>
        </div>
      </section>
      <section className="three-pillars">
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Bon cadeau</th>
                  <th>Prix</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {GIFT_DENOMINATIONS.map((d) => (
                  <tr key={d.lookupKey}>
                    <td>Bon cadeau {d.label}</td>
                    <td>{d.label}</td>
                    <td>
                      <button
                        type="button"
                        className="btn-primary"
                        disabled={etat === "envoi"}
                        onClick={() => acheter(d.lookupKey)}
                      >
                        {etat === "envoi" ? "Redirection…" : "Acheter"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {message && <p style={{ marginTop: 16 }}>{message}</p>}
          <p style={{ marginTop: 24 }}>
            Tu as déjà un code ? <Link to="/panier">Saisis-le au panier →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
