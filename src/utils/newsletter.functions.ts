import { createHash, randomBytes } from "crypto";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { enqueueTransactionalEmail } from "@/lib/email/enqueue.server";

const signupSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  consent: z.literal(true),
  source: z.string().max(80).regex(/^[a-z0-9-]+$/).default("homepage"),
});

const CONSENT_TEXT =
  "J'accepte de recevoir les outils et nouveautés HP par courriel";

// Double confirmation (§3.2 — lot sécurité 2, appliqué 12 nov. 2026,
// décision HP Q-S2-2 : OUI) : durée de validité du lien de confirmation
// (24 h, tranchées par HP le 12 nov. 2026).
const CONFIRMATION_TTL_MS = 24 * 60 * 60 * 1000;

function hash(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

// Origine de confiance locale, même motif que cadeaux.functions.ts.
function getTrustedSiteOrigin(): string {
  const raw = process.env.SITE_URL?.trim();
  if (!raw) return "https://www.hp-outils.com";
  try {
    const parsed = new URL(raw);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      return parsed.origin;
    }
  } catch {
    console.warn("SITE_URL is invalid; using fallback site origin");
  }
  return "https://www.hp-outils.com";
}

export const subscribeToHpNews = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => signupSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const ip =
      getRequestHeader("cf-connecting-ip") ??
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
      "";
    const emailHash = hash(data.email);
    const ipHash = ip ? hash(ip) : null;
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const [{ count: emailCount }, ipResult] = await Promise.all([
      supabaseAdmin
        .from("newsletter_signup_attempts")
        .select("id", { count: "exact", head: true })
        .eq("email_hash", emailHash)
        .gte("created_at", oneHourAgo),
      ipHash
        ? supabaseAdmin
            .from("newsletter_signup_attempts")
            .select("id", { count: "exact", head: true })
            .eq("ip_hash", ipHash)
            .gte("created_at", oneHourAgo)
        : Promise.resolve({ count: 0 }),
    ]);

    if ((emailCount ?? 0) >= 5 || (ipResult.count ?? 0) >= 20) {
      return { ok: true as const };
    }

    await supabaseAdmin.from("newsletter_signup_attempts").insert({
      email_hash: emailHash,
      ip_hash: ipHash,
    });

    const { data: suppressed } = await supabaseAdmin
      .from("suppressed_emails")
      .select("id")
      .eq("email", data.email)
      .maybeSingle();

    if (!suppressed) {
      // Sécurité + Loi 25 : ne jamais écraser la preuve de consentement
      // d'une inscription existante. Si le courriel existe déjà et est
      // confirmé, on ne change rien et on répond pareil, sans rien
      // révéler. Si l'inscription est en attente de confirmation, on
      // régénère le jeton et on renvoie le courriel (sans toucher à
      // consented_at).
      const { data: existingSignup } = await supabaseAdmin
        .from("newsletter_signups")
        .select("id, status")
        .eq("email", data.email)
        .maybeSingle();
      if (existingSignup && (existingSignup as { status: string }).status === "confirmed") {
        return { ok: true as const };
      }
      // Double confirmation (§3.2) : le jeton brut (256 bits) ne part que
      // par courriel ; seule son empreinte SHA-256 est stockée. Sans clic,
      // aucune inscription effective, aucun envoi.
      // consented_at reste posé à la soumission, comme aujourd'hui : la
      // nullabilité de la colonne en live n'est pas vérifiée (table hors
      // migrations) ; la preuve du consentement exprès est confirmed_at,
      // posé au clic, avec consent_text conservé.
      const token = randomBytes(32).toString("hex");
      const tokenHash = hash(token);
      const expiresAt = new Date(Date.now() + CONFIRMATION_TTL_MS).toISOString();
      if (existingSignup) {
        const { error } = await supabaseAdmin
          .from("newsletter_signups")
          .update({
            confirmation_token_hash: tokenHash,
            confirmation_expires_at: expiresAt,
            updated_at: new Date().toISOString(),
          })
          .eq("email", data.email)
          .eq("status", "pending");
        if (error) throw new Error("Impossible d'enregistrer l'inscription");
      } else {
        const { error } = await supabaseAdmin.from("newsletter_signups").insert(
          {
            email: data.email,
            source: data.source,
            consent_text: CONSENT_TEXT,
            consented_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            status: "pending",
            confirmation_token_hash: tokenHash,
            confirmation_expires_at: expiresAt,
          },
        );
        if (error) throw new Error("Impossible d'enregistrer l'inscription");
      }
      const origin = getTrustedSiteOrigin();
      const queued = await enqueueTransactionalEmail({
        templateName: "newsletter-confirmation",
        recipientEmail: data.email,
        idempotencyKey: `newsletter-confirm-${tokenHash.slice(0, 16)}`,
        templateData: {
          confirmUrl: `${origin}/confirmer-infolettre?token=${token}`,
          siteOrigin: origin,
        },
      });
      if (!queued) {
        // Le courriel n'est pas parti : l'inscription reste en attente et
        // une nouvelle soumission régénère le jeton et renvoie le
        // courriel. Journalisé, jamais silencieux.
        console.error("newsletter confirmation email not queued", data.email);
      }
    }

    return { ok: true as const };
  });
