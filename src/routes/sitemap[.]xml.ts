import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { PRODUCTS } from "@/lib/products-catalog";

const BASE_URL = "https://www.hp-outils.com";
const STATIC_PATHS = [
  "/",
  "/outils",
  "/jeux",
  "/confidentialite",
  "/livres-pdf",
  "/sans-honte",
  "/reflexions",
  "/ateliers",
  "/a-propos",
  "/album",
  "/collaborer",
  "/comprendre",
  "/contact",
  "/prix",
  "/univers",
  "/transmettre",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const slugs = Array.from(
          new Set(Object.values(PRODUCTS).map((p) => p.slug).filter(Boolean)),
        );
        const dynamicPaths = slugs.flatMap((s) => [`/pdf/${s}`, `/achat/${s}`]);
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