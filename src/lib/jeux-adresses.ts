/* Adresses stables des jeux (vagues 0-1, 23 oct. 2026 — item nº 4
   de la liste des 10 améliorations).

   Chaque jeu a UNE adresse stable : /apps/<slug> — celle qu'on
   partage, qu'on met dans le sitemap et sur les tuiles /jeux.
   La route /apps/$slug redirige (301) vers le fichier courant
   ci-dessous. Quand un jeu change de version, on met à jour LA
   ligne d'ici : tous les liens déjà partagés continuent de
   marcher. Les anciens fichiers restent joignables en direct.

   Source des fichiers courants : les tuiles de src/routes/jeux.tsx
   (vérifié le 23 oct. 2026 contre public/apps/). */

export const GAME_FILES: Record<string, string> = {
  "releve": "/apps/releve/releve-chapitre-1-v1.0.html",
  "la-banque": "/apps/la-banque/la-banque-v1.1.html",
  "bons-reflexes": "/apps/bons-reflexes/index.html",
  "mysteres-du-nord": "/apps/mysteres-du-nord/myst-res-du-nord-v1.2.html",
  "100-en-30-jours": "/apps/100-en-30-jours/100-en-30-jours-v1.2.html",
  "caribou-run": "/apps/caribou-run/caribou-run-v1.1.html",
  "cherche-trouve-la-vraie-vie": "/apps/cherche-trouve-la-vraie-vie/cherche-trouve-la-vraie-vie-v1.1.html",
  "devine-l-humeur": "/apps/devine-l-humeur/devine-l-humeur-v1.1.html",
  "la-spirale-asmr": "/apps/la-spirale-asmr/la-spirale-asmr-v1.1.html",
  "poutine-panic": "/apps/poutine-panic/poutine-panic-v1.1.html",
  "retromania": "/apps/retromania/retromania-v1.1.html",
  "sirop-clicker": "/apps/sirop-clicker/sirop-clicker-v1.1.html",
  "mots-de-chez-nous": "/apps/mots-de-chez-nous/mots-de-chez-nous-v1.0.html",
  "memoire-des-cantons": "/apps/memoire-des-cantons/memoire-des-cantons-v1.0.html",
  "tir-de-boules-de-neige": "/apps/tir-de-boules-de-neige/tir-de-boules-de-neige-v2.0.html",
  "ado-odieux-adieu": "/apps/ado-odieux-adieu/ado-odieux-adieu-v1.0.html",
  "couleuvre-du-quebec": "/apps/couleuvre-du-quebec/couleuvre-du-quebec-v1.0.html",
  "fusion-sirop": "/apps/fusion-sirop/fusion-sirop-v1.0.html",
  "trio-des-elements": "/apps/trio-des-elements/trio-des-elements-v1.0.html",
  "bernache-express": "/apps/bernache-express/bernache-express-v1.0.html",
  "le-bonhomme-pendu": "/apps/le-bonhomme-pendu/le-bonhomme-pendu-v1.0.html",
  "montgolfiere": "/apps/montgolfiere/montgolfiere-v1.0.html",
  "pop-ballons": "/apps/pop-ballons/pop-ballons-v1.0.html",
  "2-verites-1-mensonge": "/apps/2-verites-1-mensonge/2-verites-1-mensonge-v2.0.html",
  "chat-attaque": "/apps/chat-attaque/chat-attaque-v1.2.html",
  "nord-2087": "/apps/nord-2087/nord-2087-v1.1.html",
  "igloo": "/apps/igloo/igloo-v1.0.html",
  "que-vois-tu": "/apps/que-vois-tu/que-vois-tu-v2.0.html",
  "tapinoue": "/apps/tapinoue/tapinoue-v2.0.html",
  "ton-chum-frotte-son-char": "/apps/ton-chum-frotte-son-char/ton-chum-frotte-son-char-v2.0.html",
  "conception-de-molecules-3d": "/apps/conception-de-molecules-3d/conception-de-molecules-3d-v2.0.html",
  "hydro-electricite": "/apps/hydro-electricite/hydro-electricite-v1.1.html",
  "anxiete-le-jeu": "/apps/anxiete-le-jeu/anxiete-le-jeu-v1.1.html",
};

/** Adresse stable (partageable) d'un jeu, ex. « /apps/caribou-run ». */
export function adresseStableJeu(slug: string): string {
  return `/apps/${slug}`;
}

/** Slug d'un jeu depuis le chemin de son fichier, ex.
    « /apps/caribou-run/caribou-run-v1.1.html » → « caribou-run ». */
export function slugDepuisFichier(file: string): string {
  return file.split("/")[2] ?? "";
}
