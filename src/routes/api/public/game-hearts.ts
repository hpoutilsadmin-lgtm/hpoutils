import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { GAME_FILES } from "@/lib/jeux-adresses";

/* Cœurs des jeux — compteur public ANONYME « cœurs reçus » (vague 1).
   GET  → { actif: true, coeurs: { <slug>: nombre } } si la table existe ;
          { actif: false, coeurs: {} } si la migration n'est pas encore
          appliquée (repli propre : le favori local continue seul).
   POST { slug } → enregistre un cœur (slug validé contre la liste des
          jeux ; garde-fou de vélocité par jeu). Aucune donnée
          personnelle n'est lue ni stockée : ni IP, ni identifiant —
          le garde-fou « déjà aimé » vit dans le navigateur du visiteur. */

const SLUGS = new Set(Object.keys(GAME_FILES));
// Au-delà de ce nombre de cœurs pour un même jeu dans la fenêtre,
// on refuse poliment : le compteur reste un thermomètre, pas une cible.
const MAX_PAR_FENETRE = 30;
const FENETRE_MS = 10 * 60 * 1000;

function admin() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

async function compteurs(
  supabase: ReturnType<typeof admin>,
): Promise<Record<string, number> | null> {
  const { data, error } = await supabase
    .from("game_heart_events")
    .select("game_slug")
    .limit(100000);
  if (error) return null;
  const out: Record<string, number> = {};
  for (const row of data ?? []) {
    const slug = (row as { game_slug: string }).game_slug;
    if (SLUGS.has(slug)) out[slug] = (out[slug] ?? 0) + 1;
  }
  return out;
}

export const Route = createFileRoute("/api/public/game-hearts")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const coeurs = await compteurs(admin());
          if (!coeurs) return Response.json({ actif: false, coeurs: {} });
          return Response.json({ actif: true, coeurs });
        } catch {
          return Response.json({ actif: false, coeurs: {} });
        }
      },
      POST: async ({ request }) => {
        let slug = "";
        try {
          const body = (await request.json()) as { slug?: unknown };
          slug = typeof body?.slug === "string" ? body.slug : "";
        } catch {
          return Response.json({ erreur: "corps invalide" }, { status: 400 });
        }
        if (!SLUGS.has(slug)) {
          return Response.json({ erreur: "jeu inconnu" }, { status: 400 });
        }
        try {
          const supabase = admin();
          const depuis = new Date(Date.now() - FENETRE_MS).toISOString();
          const { count, error: errCount } = await supabase
            .from("game_heart_events")
            .select("id", { count: "exact", head: true })
            .eq("game_slug", slug)
            .gte("created_at", depuis);
          if (errCount) return Response.json({ actif: false });
          if ((count ?? 0) >= MAX_PAR_FENETRE) {
            return Response.json(
              { erreur: "doucement — réessaie dans quelques minutes" },
              { status: 429 },
            );
          }
          const { error } = await supabase
            .from("game_heart_events")
            .insert({ game_slug: slug });
          if (error) return Response.json({ actif: false });
          const coeurs = await compteurs(supabase);
          return Response.json({
            actif: true,
            total: coeurs?.[slug] ?? null,
          });
        } catch {
          return Response.json({ actif: false });
        }
      },
    },
  },
});
