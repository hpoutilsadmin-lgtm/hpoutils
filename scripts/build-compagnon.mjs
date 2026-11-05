#!/usr/bin/env node
/* ============================================================
   COMPAGNON DE NAVIGATION HP — génération du module AUTONOME
   pour les pages du site (React via __root.tsx, statiques via
   <script>), même patron que la barre de jeu et que le bundle
   HGPTO autonome.

   Sources uniques :
     src/components/compagnon/compagnon.js
     src/components/compagnon/compagnon.css
     src/components/compagnon/donnees-inventaire.json
   (l'index de recherche, source unique : jamais de liste en dur
   ailleurs — ni dans le JS, ni dans le menu.)

   Sorties (fichiers générés, jamais édités à la main) :
     public/compagnon/compagnon.js   (index intégré au build,
                                      aucun appel réseau au chargement)
     public/compagnon/compagnon.css

   RÉGÉNÉRER après toute modification d'une source :
       bun run build:compagnon
   puis déposer les sorties régénérées avec le reste du lot.

   Chaque page consommatrice charge, avant </body> :
       <link rel="stylesheet" href="/compagnon/compagnon.css">
       <script src="/compagnon/compagnon.js" defer></script>
   ============================================================ */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcJs = path.join(root, "src/components/compagnon/compagnon.js");
const srcCss = path.join(root, "src/components/compagnon/compagnon.css");
const srcJson = path.join(root, "src/components/compagnon/donnees-inventaire.json");
const outDir = path.join(root, "public/compagnon");
const outJs = path.join(outDir, "compagnon.js");
const outCss = path.join(outDir, "compagnon.css");

const MARQUEUR = "__DONNEES_INVENTAIRE__";

const bannerJs =
  "/* ============================================================\n" +
  "   FICHIER GÉNÉRÉ — NE PAS ÉDITER À LA MAIN.\n" +
  "   Sources : src/components/compagnon/compagnon.js\n" +
  "             src/components/compagnon/donnees-inventaire.json\n" +
  "   Régénérer : bun run build:compagnon\n" +
  "   ============================================================ */\n";

const bannerCss =
  "/* ============================================================\n" +
  "   FICHIER GÉNÉRÉ — NE PAS ÉDITER À LA MAIN.\n" +
  "   Source : src/components/compagnon/compagnon.css\n" +
  "   Régénérer : bun run build:compagnon\n" +
  "   ============================================================ */\n";

/* L'index doit être du JSON valide, sinon le build échoue ici —
   jamais en production. */
const donneesTexte = readFileSync(srcJson, "utf8");
let donnees;
try {
  donnees = JSON.parse(donneesTexte);
} catch (e) {
  console.error("donnees-inventaire.json invalide :", e.message);
  process.exit(1);
}
if (!Array.isArray(donnees.entrees) || donnees.entrees.length === 0) {
  console.error("donnees-inventaire.json : aucune entrée.");
  process.exit(1);
}

const codeJs = readFileSync(srcJs, "utf8");
if (!codeJs.includes(MARQUEUR)) {
  console.error("compagnon.js : marqueur " + MARQUEUR + " introuvable.");
  process.exit(1);
}
/* L'index est intégré tel quel au JS généré : la barre n'a rien
   à télécharger au chargement (aucun appel réseau). Le marqueur
   est remplacé partout (replaceAll) : il ne doit rester aucune
   occurrence du marqueur dans la sortie. */
const jsGenere = codeJs.replaceAll(MARQUEUR, JSON.stringify(donnees.entrees));
if (jsGenere.includes(MARQUEUR)) {
  console.error("compagnon.js : le marqueur " + MARQUEUR + " subsiste après remplacement.");
  process.exit(1);
}
const cssGenere = readFileSync(srcCss, "utf8");

mkdirSync(outDir, { recursive: true });
writeFileSync(outJs, bannerJs + jsGenere, "utf8");
writeFileSync(outCss, bannerCss + cssGenere, "utf8");
console.log("compagnon.js généré ->", path.relative(root, outJs), `(${jsGenere.length} octets, ${donnees.entrees.length} entrées d'index)`);
console.log("compagnon.css généré ->", path.relative(root, outCss), `(${cssGenere.length} octets)`);
