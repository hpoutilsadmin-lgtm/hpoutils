import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { PRODUCTS } from "@/lib/products-catalog";

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
  "/lire/merci",
  "/outils/bons-reflexes",
  "/outils/hp-hyper-potentiel",
  "/boite/",
  "/passeur-de-savoir/",
  "/outils-web/le-reste-du-mois.html",
  "/outils-web/ca-vaut-tu-la-peine.html",
  "/outils-web/le-relais.html",
  "/outils-web/maintenant.html",
  // Les 36 jeux gratuits + 1 caché (adresses stables /apps/<slug> — redirection 301 vers le fichier courant)
  "/apps/releve",
  "/apps/la-banque",
  "/apps/bons-reflexes",
  "/apps/mysteres-du-nord",
  "/apps/100-en-30-jours",
  "/apps/caribou-run",
  "/apps/cherche-trouve-la-vraie-vie",
  "/apps/devine-l-humeur",
  "/apps/la-spirale-asmr",
  "/apps/poutine-panic",
  "/apps/retromania",
  "/apps/sirop-clicker",
  "/apps/mots-de-chez-nous",
  "/apps/memoire-des-cantons",
  "/apps/tir-de-boules-de-neige",
  "/apps/hockey-hgpto",
  "/apps/ado-odieux-adieu",
  "/apps/couleuvre-du-quebec",
  "/apps/fusion-sirop",
  "/apps/trio-des-elements",
  "/apps/bernache-express",
  "/apps/le-bonhomme-pendu",
  "/apps/montgolfiere",
  "/apps/pop-ballons",
  "/apps/2-verites-1-mensonge",
  "/apps/chat-attaque",
  "/apps/nord-2087",
  "/apps/igloo",
  "/apps/chevalier-du-fleuve",
  "/apps/que-vois-tu",
  "/apps/tapinoue",
  "/apps/ton-chum-frotte-son-char",
  "/apps/conception-de-molecules-3d",
  "/apps/hydro-electricite",
  "/apps/anxiete-le-jeu",
];

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
        const paths = [...STATIC_PATHS, ...dynamicPaths];
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