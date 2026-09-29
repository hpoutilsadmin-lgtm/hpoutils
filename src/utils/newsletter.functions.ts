import { createHash } from "crypto";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
});

const CONSENT_TEXT =
  "En t'inscrivant, tu acceptes de recevoir les nouveautés HP. Désinscription en un clic.";

function hash(value: string): string {
  return createHash("sha256").update(value).digest("hex");
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
      const { error } = await supabaseAdmin.from("newsletter_signups").upsert(
        {
          email: data.email,
          source: "homepage",
          consent_text: CONSENT_TEXT,
          consented_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "email" },
      );
      if (error) throw new Error("Impossible d'enregistrer l'inscription");
    }

    return { ok: true as const };
  });