import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { createPdfCheckoutSession } from "@/utils/payments.functions";

interface Props {
  priceId: string;
  returnUrl?: string;
  /** Bundle « Choisis 10 kits parmi 15 » : les slugs des kits choisis. */
  kitSlugs?: string[];
}

export function PdfCheckout({ priceId, kitSlugs }: Props) {
  const fetchClientSecret = async (): Promise<string> => {
    const result = await createPdfCheckoutSession({
      data: {
        priceId,
        environment: getStripeEnvironment(),
        kitSlugs,
      },
    });
    if ("error" in result) throw new Error(result.error);
    if (!result.clientSecret) throw new Error("Impossible de créer la session de paiement");
    return result.clientSecret;
  };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}