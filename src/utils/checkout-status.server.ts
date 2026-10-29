// Sécurité phase 2 — statut de paiement en lecture seule.
// Ne crée RIEN, n'envoie RIEN, ne renvoie JAMAIS un lien, un jeton,
// un code, ni un courriel complet. Seulement : paid / pending / missing
// et un nombre de lignes, sans titre ni lien. Le détail (titres, liens)
// arrive PAR COURRIEL, jamais dans la page.
import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

let _admin: any = null;
function getAdmin() {
  if (!_admin) {
    _admin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }
  return _admin;
}

export const getCheckoutStatus = createServerFn({ method: "GET" })
  .inputValidator((data: { sessionId: string }) => {
    if (!/^cs_[a-zA-Z0-9_]+$/.test(data.sessionId)) return { sessionId: "" };
    return data;
  })
  .handler(async ({ data }) => {
    if (!data.sessionId) return { status: "missing" as const, itemCount: 0 };
    const { data: orders, error } = await getAdmin()
      .from("orders")
      .select("id, status, delivery_sent_at")
      .eq("stripe_session_id", data.sessionId);
    if (error) throw new Error("Database error");
    const paid = (orders ?? []).filter((o: any) => o.status === "paid");
    if (paid.length > 0) {
      // Déjà livré : toutes les lignes paid ont delivery_sent_at posé.
      // Statut distinct, même forme que les autres : aucun lien, aucun titre, aucun courriel.
      const delivered = paid.every((o: any) => o.delivery_sent_at);
      if (delivered) return { status: "delivered" as const, itemCount: paid.length };
      return { status: "paid" as const, itemCount: paid.length };
    }
    // Payé chez Stripe mais aucune ligne orders : le webhook n'est pas
    // encore arrivé. On ne livre JAMAIS pour compenser un webhook lent.
    return { status: "pending" as const, itemCount: 0 };
  });
