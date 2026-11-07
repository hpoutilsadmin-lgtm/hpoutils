import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { PRODUCTS } from "@/lib/products-catalog";
import { GAME_FILES, adresseStableJeu } from "@/lib/jeux-adresses";

const BASE_URL = "https://www.hp-outils.com";
const STATIC_PATHS = [
  "/",
  "/outils",
  "/jeux",
  "/en-cuisine/",
  "/en-cuisine/panier/",
  "/en-cuisine/panier/lait/",
  "/en-cuisine/panier/oeufs/",
  "/en-cuisine/panier/tomates-en-conserve/",
  "/en-cuisine/panier/farine/",
  "/en-cuisine/panier/pommes-de-terre/",
  "/balado",
  "/confidentialite",
  "/conditions-de-vente",
  "/livres-pdf",
  "/sans-honte",
  "/ateliers",
  "/a-propos",
  "/album",
  "/collaborer",
  "/apercu",
  "/jeux-a-votre-image",
  "/comprendre",
  "/contact",
  "/faq",
  "/prix",
  "/boutique-chevalier",
  "/cadeaux",
  "/univers",
  "/transmettre",
  "/les-passeurs",
  "/lire/",
  "/outils/bons-reflexes",
  "/outils/hp-hyper-potentiel",
  "/boite/",
  "/passeur-de-savoir/",
  "/outils-web/index.html",
  "/outils-web/le-reste-du-mois.html",
  "/outils-web/ca-vaut-tu-la-peine.html",
  "/outils-web/le-relais.html",
  "/outils-web/maintenant.html",
  "/outils-web/contrat-humain-ia.html",
];

// Les jeux publics (44) + 1 caché : les adresses stables /apps/<slug>
// sont générées depuis src/lib/jeux-adresses.ts (source unique —
// c'est ce fichier qui définit ce qu'on partage et ce qui va dans
// le sitemap). Le jeu caché n'est pas dans GAME_FILES, donc il
// n'apparaît pas dans le sitemap. Redirection 301 vers le fichier
// courant (voir src/routes/apps.$slug.tsx).
const GAME_PATHS = Object.keys(GAME_FILES).map((slug) =>
  adresseStableJeu(slug),
);

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const slugs = Array.from(
          new Set(Object.values(PRODUCTS).map((p) => p.slug).filter(Boolean)),
        );
        // Pages /achat/* exclues volontairement : ce sont des pages d'achat
        // noindex, elles n'ont pas leur place dans le sitemap.
        const dynamicPaths = slugs.map((s) => `/pdf/${s}`);
        const paths = [...STATIC_PATHS, ...GAME_PATHS, ...dynamicPaths];
        const urls = paths.map(
          (p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});