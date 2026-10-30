// Les Passeurs — livraison serveur d'un abonnement (webhook seul).
// Appelé UNIQUEMENT par le webhook Stripe vérifié, jamais par une page,
// jamais depuis le navigateur. Même motif que deliver-order.server.ts.
//
// Le jeton d'annulation n'est JAMAIS journalisé : ni console.log, ni
// courriel de preuve, ni table email_send_log.

import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { type StripeEnv, createStripeClient } from "@/lib/stripe.server";
import { enqueueTransactionalEmail } from "@/lib/email/enqueue.server";

let _admin: any = null;
function admin() {
  if (!_admin) {
    _admin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }
  return _admin;
}

function origin(): string {
  const raw = process.env.SITE_URL?.trim();
  if (!raw) return "https://www.hp-outils.com";
  try {
    const parsed = new URL(raw);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") return parsed.origin;
  } catch {
    console.warn("SITE_URL is invalid; using fallback site origin");
  }
  return "https://www.hp-outils.com";
}

const FORMULE_LABEL: Record<string, string> = {
  mensuel: "3 $ CAD par mois",
  annuel: "28 $ CAD par année",
};

// Une session de caisse Passeurs porte la métadonnée passeurs_formule
// ('mensuel' | 'annuel'), posée par createPasseursCheckoutSession.
export function isPasseursSession(session: any): boolean {
  const f = session?.metadata?.passeurs_formule;
  return f === "mensuel" || f === "annuel";
}

export async function fulfillPasseursSubscription(session: any, env: StripeEnv) {
  const db = admin();
  const stripe = createStripeClient(env);

  const formule = session.metadata.passeurs_formule as "mensuel" | "annuel";
  const email: string =
    session.customer_details?.email || session.customer_email || "";
  if (!email) throw new Error("Passeurs: session sans courriel");

  const subscriptionId =
    typeof session.subscription === "string" ? session.subscription : null;
  if (!subscriptionId) throw new Error("Passeurs: session sans abonnement");

  // Idempotence : si Stripe rejoue le webhook, on ne crée pas de doublon
  // et on ne régénère pas le jeton (le lien envoyé reste le bon).
  const { data: existing } = await db
    .from("passeurs_abonnements")
    .select("id")
    .eq("stripe_subscription_id", subscriptionId)
    .maybeSingle();
  if (existing) {
    console.log("fulfillPasseursSubscription: already fulfilled, skipping", {
      sessionId: session.id,
    });
    return;
  }

  // Dates réelles de la période, lues sur l'abonnement Stripe.
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const customerId =
    typeof subscription.customer === "string" ? subscription.customer : null;
  const dateFinPeriode = new Date(
    (subscription as any).current_period_end * 1000,
  ).toISOString();

  // Jeton d'annulation : 32 octets aléatoires, jamais journalisé.
  const jeton = randomBytes(32).toString("hex");

  const { error } = await db.from("passeurs_abonnements").insert({
    email: email.toLowerCase(),
    formule,
    stripe_subscription_id: subscriptionId,
    stripe_customer_id: customerId,
    jeton_annulation: jeton,
    date_fin_periode: dateFinPeriode,
    statut: "actif",
  });
  if (error) throw new Error("Database error");

  // Courriel de bienvenue avec le lien d'annulation en 1 clic.
  // Clé d'idempotence par abonnement : pas de doublon si Stripe rejoue.
  await enqueueTransactionalEmail({
    templateName: "passeurs-bienvenue",
    recipientEmail: email,
    idempotencyKey: `passeurs-bienvenue-${subscriptionId}`,
    templateData: {
      formuleLabel: FORMULE_LABEL[formule] ?? formule,
      lienAnnulation: `${origin()}/passeurs/annuler/${jeton}`,
      dateFinPeriode: new Date(dateFinPeriode).toLocaleDateString("fr-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  });

  console.log("fulfillPasseursSubscription: created", {
    sessionId: session.id,
    formule,
  });
}
