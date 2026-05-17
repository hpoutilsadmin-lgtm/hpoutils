import { createFileRoute } from "@tanstack/react-router";
import { PdfCheckout } from "@/components/PdfCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";

export const Route = createFileRoute("/achat/enjeux-humanite")({
  head: () => ({
    meta: [
      { title: "Acheter — Les enjeux de l'humanité (PDF)" },
      { name: "description", content: "Achetez la version PDF du livre Les enjeux de l'humanité. Téléchargement immédiat après paiement sécurisé." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PaymentTestModeBanner />
      <section className="subpage-hero">
        <div className="container" style={{ maxWidth: 920 }}>
          <h1>Les enjeux de l'humanité</h1>
          <p>
            Version PDF — 25&nbsp;$ CAD. Paiement sécurisé. Téléchargement
            immédiat dès la confirmation, lien aussi conservé pour vous.
          </p>
        </div>
      </section>
      <section className="subpage-content">
        <div className="container" style={{ maxWidth: 920 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
            <PdfCheckout priceId="enjeux_humanite_pdf_one_time" />
          </div>
        </div>
      </section>
    </>
  );
}