import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { createFileRoute } from "@tanstack/react-router";

// Double confirmation infolettre (§3.2 — lot sécurité 2, appliqué
// 12 nov. 2026, décision HP Q-S2-2 : OUI) : confirme une inscription en
// attente à partir du jeton reçu par courriel. Même motif que
// /email/unsubscribe (jeton en paramètre, JSON neutre).
export const Route = createFileRoute("/api/public/newsletter-confirm")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
          return Response.json({ error: "Server configuration error" }, { status: 500 });
        }

        const url = new URL(request.url);
        const token = url.searchParams.get("token");
        if (!token) {
          return Response.json({ error: "Token is required" }, { status: 400 });
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const tokenHash = createHash("sha256").update(token).digest("hex");

        const { data: signup, error } = await supabase
          .from("newsletter_signups")
          .select("id, status, confirmation_expires_at")
          .eq("confirmation_token_hash", tokenHash)
          .maybeSingle();

        if (error || !signup) {
          return Response.json({ ok: false, reason: "invalid" }, { status: 404 });
        }
        if (signup.status === "confirmed") {
          return Response.json({ ok: true, reason: "already" });
        }
        if (
          signup.status !== "pending" ||
          !signup.confirmation_expires_at ||
          new Date(signup.confirmation_expires_at).getTime() < Date.now()
        ) {
          return Response.json({ ok: false, reason: "expired" }, { status: 410 });
        }

        const { error: updateError } = await supabase
          .from("newsletter_signups")
          .update({
            status: "confirmed",
            confirmed_at: new Date().toISOString(),
            confirmation_token_hash: null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", signup.id)
          .eq("status", "pending");
        if (updateError) {
          return Response.json({ ok: false, reason: "invalid" }, { status: 500 });
        }

        return Response.json({ ok: true, reason: "confirmed" });
      },
    },
  },
});
