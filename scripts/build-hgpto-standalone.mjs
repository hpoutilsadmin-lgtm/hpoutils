#!/usr/bin/env node
/* ============================================================
   HGPTO — génération du bundle AUTONOME pour les pages statiques
   hors shell React (aujourd'hui : public/en-cuisine/index.html,
   l'outil Recettes HP, servi tel quel — le montage global de
   src/routes/__root.tsx ne s'y applique jamais).

   Source unique : src/components/hgpto/ (les mêmes fichiers que
   le site React — markup, moteur, données, styles ; aucune copie
   divergente à maintenir).
   Entrée  : src/components/hgpto/standalone.ts
   Sorties : public/hgpto/hgpto.js + public/hgpto/hgpto.css

   RÉGÉNÉRER après toute modification de src/components/hgpto/ :
       bun run build:hgpto
   puis déposer les sorties régénérées avec le reste du lot.

   La page statique consommatrice charge, avant </body> (bloc
   délimité par les commentaires « HGPTO (autonome) », à ne pas
   éditer à la main) :
       <link rel="stylesheet" href="/hgpto/hgpto.css">
       <script src="/hgpto/hgpto.js" defer></script>
   ============================================================ */
import { build } from "esbuild";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await build({
  entryPoints: [path.join(root, "src/components/hgpto/standalone.ts")],
  bundle: true,
  minify: true,
  format: "iife",
  target: ["es2019"],
  outfile: path.join(root, "public/hgpto/hgpto.js"),
  logLevel: "info",
});

console.log("Bundle autonome HGPTO régénéré : public/hgpto/hgpto.js + hgpto.css");
