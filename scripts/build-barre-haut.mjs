#!/usr/bin/env node
/* ============================================================
   BARRE UNIQUE EN HAUT HP — génération du module AUTONOME
   pour la page pilote (public/outils-web/barre-haut-pilote.html),
   même patron que la barre de jeu et que le Compagnon.

   Sources uniques :
     src/components/barre-haut/barre-haut.js
     src/components/barre-haut/barre-haut.css
   (JS vanilla, aucune dépendance — la « génération » est une
   copie avec bandeau, rien à transpiler.)

   Sorties (fichiers générés, jamais édités à la main) :
     public/barre-haut/barre-haut.js
     public/barre-haut/barre-haut.css

   RÉGÉNÉRER après toute modification d'une source :
       bun run build:barre-haut
   puis déposer les sorties régénérées avec le reste du lot.

   La page pilote charge, avant </body> :
       <link rel="stylesheet" href="/barre-haut/barre-haut.css">
       <script src="/barre-haut/barre-haut.js" defer></script>
   ============================================================ */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcJs = path.join(root, "src/components/barre-haut/barre-haut.js");
const srcCss = path.join(root, "src/components/barre-haut/barre-haut.css");
const outDir = path.join(root, "public/barre-haut");
const outJs = path.join(outDir, "barre-haut.js");
const outCss = path.join(outDir, "barre-haut.css");

const bannerJs =
  "/* ============================================================\n" +
  "   FICHIER GÉNÉRÉ — NE PAS ÉDITER À LA MAIN.\n" +
  "   Source : src/components/barre-haut/barre-haut.js\n" +
  "   Régénérer : bun run build:barre-haut\n" +
  "   ============================================================ */\n";

const bannerCss =
  "/* ============================================================\n" +
  "   FICHIER GÉNÉRÉ — NE PAS ÉDITER À LA MAIN.\n" +
  "   Source : src/components/barre-haut/barre-haut.css\n" +
  "   Régénérer : bun run build:barre-haut\n" +
  "   ============================================================ */\n";

mkdirSync(outDir, { recursive: true });
const js = readFileSync(srcJs, "utf8");
writeFileSync(outJs, bannerJs + js, "utf8");
const css = readFileSync(srcCss, "utf8");
writeFileSync(outCss, bannerCss + css, "utf8");
console.log("barre-haut.js généré ->", path.relative(root, outJs), `(${js.length} octets source)`);
console.log("barre-haut.css généré ->", path.relative(root, outCss), `(${css.length} octets source)`);
