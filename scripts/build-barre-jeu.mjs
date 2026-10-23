#!/usr/bin/env node
/* ============================================================
   BARRE DE JEU HP — génération du module AUTONOME pour les
   pages de jeux statiques de public/apps/ (hors shell React,
   même patron que le bundle HGPTO autonome).

   Source unique : src/components/barre-jeu/barre-jeu.js
   (JS vanilla, aucune dépendance — la « génération » est une
   copie avec bandeau, rien à transpiler).
   Sortie : public/barre/barre-jeu.js

   RÉGÉNÉRER après toute modification de la source :
       bun run build:barre
   puis déposer la sortie régénérée avec le reste du lot.

   Chaque page de jeu consommatrice charge, avant </body>
   (bloc délimité par les commentaires « Barre de jeu HP »,
   à ne pas éditer à la main) :
       <script src="/barre/barre-jeu.js" defer></script>
   ============================================================ */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "src/components/barre-jeu/barre-jeu.js");
const outDir = path.join(root, "public/barre");
const out = path.join(outDir, "barre-jeu.js");

const banner =
  "/* ============================================================\n" +
  "   FICHIER GÉNÉRÉ — NE PAS ÉDITER À LA MAIN.\n" +
  "   Source : src/components/barre-jeu/barre-jeu.js\n" +
  "   Régénérer : bun run build:barre\n" +
  "   ============================================================ */\n";

const code = readFileSync(src, "utf8");
mkdirSync(outDir, { recursive: true });
writeFileSync(out, banner + code, "utf8");
console.log("barre-jeu.js généré ->", path.relative(root, out), `(${code.length} octets source)`);
