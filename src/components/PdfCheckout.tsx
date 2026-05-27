import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { createPdfCheckoutSession } from "@/utils/payments.functions";

interface Props {
  priceId: string;
  returnUrl?: string;
}

export function PdfCheckout({ priceId }: Props) {
  const fetchClientSecret = async (): Promise<string> => {
    const result = await createPdfCheckoutSession({
      data: {
        priceId,
        environment: getStripeEnvironment(),
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