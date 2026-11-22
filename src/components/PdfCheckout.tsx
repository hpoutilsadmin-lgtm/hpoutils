import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { BOUTIQUE_FERMEE } from "@/lib/boutique";
import { createPdfCheckoutSession } from "@/utils/payments.functions";

interface Props {
  priceId: string;
  returnUrl?: string;
  /** Bundle « Choisis 10 kits parmi 15 » : les slugs des kits choisis. */
  kitSlugs?: string[];
  /** « Offrir » : courriel du destinataire, validé par la page avant
   * d'afficher le paiement. Absent = achat pour soi. */
  giftTo?: string;
}

export function PdfCheckout({ priceId, kitSlugs, giftTo }: Props) {
  const fetchClientSecret = async (): Promise<string> => {
    const result = await createPdfCheckoutSession({
      data: {
        priceId,
        environment: getStripeEnvironment(),
        kitSlugs,
        giftTo,
      },
    });
    if ("error" in result) throw new Error(result.error);
    if (!result.clientSecret) throw new Error("Impossible de créer la session de paiement");
    return result.clientSecret;
  };

  // Boutique fermée pour maintenance (MISSION 1 — E1) : on n'affiche
  // pas le formulaire de paiement — même garde côté serveur dans
  // createPdfCheckoutSession, pour les requêtes directes aussi.
  if (BOUTIQUE_FERMEE) {
    return (
      <p
        role="status"
        style={{
          background: "#f6e8c8",
          border: "1px solid #d9a860",
          borderRadius: 8,
          padding: "12px 16px",
          margin: "16px auto",
          maxWidth: 760,
          textAlign: "center",
          fontSize: 15,
        }}
      >
        <strong>Boutique fermée pour maintenance.</strong> Les paiements
        sont suspendus pour le moment — merci de votre compréhension.
      </p>
    );
  }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}