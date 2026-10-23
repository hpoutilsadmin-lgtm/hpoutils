import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { PRODUCTS } from "@/lib/products-catalog";

const BASE_URL = "https://www.hp-outils.com";
const STATIC_PATHS = [
  "/",
  "/outils",
  "/jeux",
  "/en-cuisine/",
  "/balado",
  "/confidentialite",
  "/conditions-de-vente",
  "/livres-pdf",
  "/sans-honte",
  "/ateliers",
  "/a-propos",
  "/album",
  "/collaborer",
  "/comprendre",
  "/contact",
  "/prix",
  "/univers",
  "/transmettre",
  "/les-passeurs",
  "/boite/",
  "/passeur-de-savoir/",
  "/outils-web/le-reste-du-mois.html",
  "/outils-web/ca-vaut-tu-la-peine.html",
  "/outils-web/le-relais.html",
  "/outils-web/maintenant.html",
  // Les 33 jeux (URLs des fichiers liés depuis /jeux)
  "/apps/releve/releve-chapitre-1-v1.0.html",
  "/apps/la-banque/la-banque-v1.1.html",
  "/apps/bons-reflexes/index.html",
  "/apps/mysteres-du-nord/myst-res-du-nord-v1.2.html",
  "/apps/100-en-30-jours/100-en-30-jours-v1.2.html",
  "/apps/caribou-run/caribou-run-v1.1.html",
  "/apps/cherche-trouve-la-vraie-vie/cherche-trouve-la-vraie-vie-v1.1.html",
  "/apps/devine-l-humeur/devine-l-humeur-v1.1.html",
  "/apps/la-spirale-asmr/la-spirale-asmr-v1.1.html",
  "/apps/poutine-panic/poutine-panic-v1.1.html",
  "/apps/retromania/retromania-v1.1.html",
  "/apps/sirop-clicker/sirop-clicker-v1.1.html",
  "/apps/mots-de-chez-nous/mots-de-chez-nous-v1.0.html",
  "/apps/memoire-des-cantons/memoire-des-cantons-v1.0.html",
  "/apps/tir-de-boules-de-neige/tir-de-boules-de-neige-v2.0.html",
  "/apps/ado-odieux-adieu/ado-odieux-adieu-v1.0.html",
  "/apps/couleuvre-du-quebec/couleuvre-du-quebec-v1.0.html",
  "/apps/fusion-sirop/fusion-sirop-v1.0.html",
  "/apps/trio-des-elements/trio-des-elements-v1.0.html",
  "/apps/bernache-express/bernache-express-v1.0.html",
  "/apps/le-bonhomme-pendu/le-bonhomme-pendu-v1.0.html",
  "/apps/montgolfiere/montgolfiere-v1.0.html",
  "/apps/pop-ballons/pop-ballons-v1.0.html",
  "/apps/2-verites-1-mensonge/2-verites-1-mensonge-v2.0.html",
  "/apps/chat-attaque/chat-attaque-v1.2.html",
  "/apps/nord-2087/nord-2087-v1.1.html",
  "/apps/igloo/igloo-v1.0.html",
  "/apps/que-vois-tu/que-vois-tu-v2.0.html",
  "/apps/tapinoue/tapinoue-v2.0.html",
  "/apps/ton-chum-frotte-son-char/ton-chum-frotte-son-char-v2.0.html",
  "/apps/conception-de-molecules-3d/conception-de-molecules-3d-v2.0.html",
  "/apps/hydro-electricite/hydro-electricite-v1.1.html",
  "/apps/anxiete-le-jeu/anxiete-le-jeu-v1.1.html",
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