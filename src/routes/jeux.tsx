import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";
import { slugDepuisFichier } from "@/lib/jeux-adresses";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ShareButton } from "@/components/ShareButton";
import { useEffect, useState, type CSSProperties } from "react";

export const Route = createFileRoute("/jeux")({
  head: () => ({
    ...createSeoHead({
      title: "Jeux gratuits en français du Québec — 35 jeux en ligne | HP Outils",
      description: "35 jeux gratuits créés au Québec : enquêtes, stratégie, arcade, mots cachés, mémoire, gestion et histoires interactives. Sans compte, sans téléchargement — tu joues dans ton navigateur.",
      path: "/jeux",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: GAMES.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: g.title,
            url: `https://www.hp-outils.com/apps/${slugDepuisFichier(g.file)}`,
          })),
        }),
      },
    ],
  }),
  component: JeuxPage,
});

const STORIES = [
  { audience: "Jeunesse", copy: "Des choix simples, des situations familières et plusieurs chemins pour faire avancer l'histoire." },
  { audience: "Ado", copy: "Des décisions qui comptent, sans morale toute faite, pour explorer ce qui pourrait arriver ensuite." },
  { audience: "Adulte", copy: "Des récits à embranchements ancrés dans les relations, le quotidien et les décisions imparfaites." },
];

const GAMES = [
  { title: "RELÈVE — Chapitre 1 : Surchauffe", file: "/apps/releve/releve-chapitre-1-v1.0.html", copy: "Jeu d'enquête 3D gratuit à Percé : avec Grizz, ourson policier de Faune-Secours, et NID à la radio, trouve la cause d'une surchauffe qui menace la faune. En français et en anglais.", tag: "Aventure · Enquête 3D à Percé", faits: "Histoire d'enquête · FR/EN", mono: "R1", art: 0 },
  { title: "LA BANQUE — le jeu de la banque alimentaire", file: "/apps/la-banque/la-banque-v1.1.html", copy: "Jeu de gestion gratuit : gère une banque alimentaire pendant une saison de 8 semaines — dons, tri, cuisine et service aux familles, qui reviennent semaine après semaine. Ton score : les familles nourries.", tag: "Gestion · Banque alimentaire", faits: "Partie longue : une saison de 8 semaines", mono: "LB", art: 1 },
  { title: "Les bons réflexes d'HP", file: "/apps/bons-reflexes/index.html", copy: "Jeu éducatif gratuit sur les bons réflexes du quotidien, par âge et par activité : cuisine, maison, entraide, émotions et sécurité.", tag: "Éducatif · Réflexes du quotidien", faits: "Par âge et par activité", mono: "BR", art: 2 },
  { title: "Mystères du Nord — enquêtes de déduction", file: "/apps/mysteres-du-nord/myst-res-du-nord-v1.2.html", copy: "Jeu d'enquête et de déduction gratuit : sept enquêtes dans le Nord — explore les lieux, interroge les suspects et démasque le coupable.", tag: "Enquête · Déduction", faits: "7 enquêtes · pour les jeunes détectives aussi", mono: "MN", art: 7 },
  { title: "Fait fructifier 100 $ en 30 jours", file: "/apps/100-en-30-jours/100-en-30-jours-v1.2.html", copy: "Jeu de gestion et d'investissement 100 % fictif et gratuit : 100 $ de départ, 30 jours pour fructifier.", tag: "Gestion · Investissement fictif", faits: "100 $ fictifs · 30 jours pour fructifier", mono: "100", art: 3 },
  { title: "Caribou Run — course sans fin québécoise", file: "/apps/caribou-run/caribou-run-v1.1.html", copy: "Jeu d'arcade gratuit, course sans fin québécoise : saute les bancs de neige et échappe à la déneigeuse !", tag: "Arcade · Course sans fin", faits: "Endless runner : la partie dure tant que tu tiens", mono: "CR", art: 0 },
  { title: "Cherche & Trouve — La vraie vie", file: "/apps/cherche-trouve-la-vraie-vie/cherche-trouve-la-vraie-vie-v1.1.html", copy: "Jeu d'observation gratuit : un cherche-et-trouve dans des scènes de la vraie vie.", tag: "Observation · Cherche-et-trouve", faits: "3 manches · 15 défis · sprint de 3 minutes", mono: "CT", art: 6 },
  { title: "Devine l'humeur — devine les émotions", file: "/apps/devine-l-humeur/devine-l-humeur-v1.1.html", copy: "Jeu des émotions gratuit : devine l'émotion cachée derrière chaque situation.", tag: "Émotions · Devine les émotions", faits: "10 manches · 13 humeurs · 52 visages", mono: "DH", art: 4 },
  { title: "La Spirale ASMR", file: "/apps/la-spirale-asmr/la-spirale-asmr-v1.1.html", copy: "Jeu de détente gratuit : un tourbillon de sable hypnotique à personnaliser — couleurs, effets et sons doux, avec respiration guidée.", tag: "Détente · ASMR et respiration", faits: "Solo · respiration guidée de 1 à 10 minutes", mono: "SA", art: 0 },
  { title: "Poutine Panic — sers des poutines à toute vitesse", file: "/apps/poutine-panic/poutine-panic-v1.1.html", copy: "Jeu d'arcade gratuit : sers des poutines à toute vitesse avant la fin du service, en parties de 2 minutes.", tag: "Arcade · Service rapide", faits: "Parties de 2 minutes", mono: "PP", art: 2 },
  { title: "Retromania — devine les prix d'époque", file: "/apps/retromania/retromania-v1.1.html", copy: "Jeu quiz gratuit et nostalgique : devine le prix d'époque d'objets d'hier à aujourd'hui — le plus proche sans dépasser gagne !", tag: "Quiz · Prix d'époque", faits: "10 manches · 280 objets · 20 secondes par objet", mono: "RM", art: 6 },
  { title: "Sirop Clicker — sirop d'érable", file: "/apps/sirop-clicker/sirop-clicker-v1.1.html", copy: "Jeu de clics gratuit et relaxant : clique pour produire du sirop d'érable au Temps des sucres, avec sauvegarde automatique.", tag: "Clics · Sirop d'érable", faits: "Sauvegarde automatique sur l'appareil", mono: "SC", art: 3 },
  { title: "Mots de Chez Nous — mots cachés d'ici", file: "/apps/mots-de-chez-nous/mots-de-chez-nous-v1.0.html", copy: "Jeu de mots cachés gratuit : 665 mots d'ici à retrouver, définitions incluses, grilles de 6 à 10 mots.", tag: "Mots cachés · Mots d'ici", faits: "665 mots · grilles de 6 à 10 mots", mono: "MC", art: 5 },
  { title: "Mémoire des Cantons — jeu de mémoire du Québec", file: "/apps/memoire-des-cantons/memoire-des-cantons-v1.0.html", copy: "Jeu de mémoire gratuit aux icônes du Québec : retourne les cartes et retrouve les paires d'ici.", tag: "Mémoire · Icônes du Québec", mono: "MÉ", art: 1 },
  { title: "Tir de Boules de Neige — 50 niveaux", file: "/apps/tir-de-boules-de-neige/tir-de-boules-de-neige-v2.0.html", copy: "Jeu d'adresse gratuit : 50 niveaux de tir à la boule de neige, sauvegarde incluse.", tag: "Adresse · Tir et 50 niveaux", faits: "50 niveaux · sauvegarde incluse", mono: "TB", art: 0 },
  { title: "Hockey 2 contre 2 — HGPTO & Pixel", file: "/apps/hockey-hgpto/hockey-hgpto-v1.0.html", copy: "Jeu de sport gratuit : une partie de hockey 2 contre 2 de 2 minutes — toi et ton gardien contre HGPTO et Pixel, la chatte gardienne. Attention à ses moments de distraction…", tag: "Sport · Hockey 2 contre 2", mono: "H2", art: 7 },
  { title: "Ado odieux, adieu", file: "/apps/ado-odieux-adieu/ado-odieux-adieu-v1.0.html", copy: "Jeu d'humour et de choix gratuit : fais des mauvais coups sans te faire pogner… et assume la vraie sentence.", tag: "Humour · Mauvais coups", mono: "AO", art: 5 },
  { title: "Couleuvre du Québec — jeu du serpent", file: "/apps/couleuvre-du-quebec/couleuvre-du-quebec-v1.0.html", copy: "Jeu d'arcade gratuit, le serpent d'ici : souris, bestioles dorées, mouettes et vidanges.", tag: "Arcade · Serpent du Québec", mono: "CQ", art: 1 },
  { title: "Fusion Sirop — fusion à la cabane à sucre", file: "/apps/fusion-sirop/fusion-sirop-v1.0.html", copy: "Jeu de réflexion et de fusion gratuit, à la cabane à sucre : de la sève au pain de sucre.", tag: "Réflexion · Fusion à la cabane à sucre", mono: "FS", art: 3 },
  { title: "Trio des Éléments — match-3 du tableau périodique", file: "/apps/trio-des-elements/trio-des-elements-v1.0.html", copy: "Jeu match-3 gratuit et scientifique : aligne silicium, diamant, or et cuivre, du tableau périodique.", tag: "Match-3 · Tableau périodique", mono: "T3", art: 4 },
  { title: "Bernache Express — migration à un seul bouton", file: "/apps/bernache-express/bernache-express-v1.0.html", copy: "Jeu d'arcade gratuit à un seul bouton : la grande migration de la bernache vers le Sud.", tag: "Arcade · Migration à un bouton", faits: "Un seul bouton", mono: "BE", art: 0 },
  { title: "Le Bonhomme Pendu — mots à deviner", file: "/apps/le-bonhomme-pendu/le-bonhomme-pendu-v1.0.html", copy: "Jeu de mots gratuit à deviner : 673 mots, dont 100 québécois d'ici, définitions incluses, solo ou à 2 joueurs.", tag: "Mots · Mots à deviner", faits: "Solo ou 2 joueurs · 673 mots", mono: "BP", art: 6 },
  { title: "Montgolfière — grimpe entre les orages", file: "/apps/montgolfiere/montgolfiere-v1.0.html", copy: "Jeu d'adresse gratuit : grimpe toujours plus haut en montgolfière, entre les orages et les éclairs.", tag: "Adresse · Montgolfière et orages", mono: "MG", art: 2 },
  { title: "Pop Ballons — 60 secondes de combos", file: "/apps/pop-ballons/pop-ballons-v1.0.html", copy: "Jeu de rapidité gratuit : 60 secondes, des combos, et une frénésie finale.", tag: "Rapidité · Ballons et combos", faits: "Parties de 60 secondes", mono: "PB", art: 5 },
  { title: "2 vérités, 1 mensonge", file: "/apps/2-verites-1-mensonge/2-verites-1-mensonge-v2.0.html", copy: "Jeu quiz et de déduction gratuit : 330 manches pour démasquer le mensonge — historique, inusité, cocasse.", tag: "Quiz · Vérités et mensonge", faits: "Pour les curieux de 7 à 107 ans · 110 manches par catégorie", mono: "2V", art: 7 },
  { title: "Chat'attaque — tower defense de chats", file: "/apps/chat-attaque/chat-attaque-v1.2.html", copy: "Jeu de stratégie gratuit, tower defense avec des chats : 9 chats-tours défendent 50 croquettes, 12 cartes labyrinthe, 3 difficultés, solo et multijoueur local.", tag: "Stratégie · Tower defense de chats", faits: "Solo ou 2 joueurs local · 12 cartes · 3 difficultés", mono: "CA", art: 2 },
  { title: "NORD 2087 — La Ligne de Glace", file: "/apps/nord-2087/nord-2087-v1.1.html", copy: "Jeu de stratégie et de science-fiction gratuit : en 2087, dessine ton labyrinthe et défends le Cœur du réseau contre la Horde — douze vagues, une tempête qui peut tout changer.", tag: "Stratégie · Tower defense futuriste", faits: "Solo · 12 vagues", mono: "87", art: 7 },
  { title: "Chevalier du fleuve — stratégie et histoire vraie", file: "/apps/chevalier-du-fleuve/chevalier-du-fleuve-v1.3.html", copy: "Jeu de stratégie en temps réel gratuit : refais la campagne vraie de Pierre Le Moyne d'Iberville — bâtis, lève ton armée, prends les forts de la baie James, défends Québec, coule la flotte à bord du Pélican. Et sur les berges, la légende des nains albinos des terriers et leur Forge des Rois Gybbys…", tag: "Stratégie · Temps réel · Histoire vraie", faits: "16 ans et plus · Campagne 1686-1699 + mode libre · Gratuit en entier — pierres précieuses gagnées en jouant", mono: "CF", art: 7 },
  { title: "IGLOO — La guerre des igloos", file: "/apps/igloo/igloo-v1.0.html", copy: "Jeu de stratégie en arène gratuit : bataille de boules de neige — déploie tes cartes, défends ton igloo et fais tomber celui d'en face. Chaque bataille tire une loi du quartier au hasard !", tag: "Stratégie · Bataille de boules de neige", faits: "Campagne de 10 batailles · parties d'environ 3 minutes", mono: "IG", art: 7 },
  { title: "Que vois-tu ? — jeu de perception", file: "/apps/que-vois-tu/que-vois-tu-v2.0.html", copy: "Jeu de perception gratuit, pour toute la famille : dis ce que tu vois en premier dans chaque image — il n'y a pas de mauvaise réponse.", tag: "Perception · Ce que tu vois d'abord", faits: "42 défis · 3 terrains : Jeunesse, Ado, Adulte", mono: "QV", art: 4 },
  { title: "Tapinoue — aventure jeunesse", file: "/apps/tapinoue/tapinoue-v2.0.html", copy: "Jeu d'aventure jeunesse gratuit : les aventures de Tapinoue et de sa famille, en 4 tableaux qui se débloquent un à un — la rencontre, le terrier, le potager de M. Grincheux… et le renard qui rôde.", tag: "Aventure · Jeunesse en 4 tableaux", faits: "4 tableaux · progression sauvegardée", mono: "TP", art: 1 },
  { title: "Ton chum frotte son char plus que toi !", file: "/apps/ton-chum-frotte-son-char/ton-chum-frotte-son-char-v2.0.html", copy: "Jeu ASMR gratuit : le vrai job d'esthétique automobile, du bout des doigts — choisis ton véhicule et frotte, roues, lavage, argile, cire, jusqu'à ce qu'il brille. Mets le son !", tag: "ASMR · Esthétique automobile", faits: "4 véhicules · 8 étapes du métier", mono: "TC", art: 2 },
  { title: "Conception de molécules 3D", file: "/apps/conception-de-molecules-3d/conception-de-molecules-3d-v2.0.html", copy: "Jeu de sciences 3D gratuit : un labo pour explorer l'ADN et fabriquer des remèdes, avec des missions sur de vraies molécules (aspirine, caféine, insuline…), en 4 niveaux.", tag: "Sciences · Molécules et ADN", faits: "4 niveaux · d'enfant à très avancé", mono: "M3", art: 3 },
  { title: "L'hydroélectricité, comment ça marche", file: "/apps/hydro-electricite/hydro-electricite-v1.1.html", copy: "Jeu éducatif gratuit : visite guidée d'une centrale hydroélectrique québécoise en suivant une goutte d'eau — barrage, turbine, alternateur… jusqu'à ta maison.", tag: "Éducatif · Centrale hydroélectrique", faits: "7 stations · pensée pour partir de zéro", mono: "HY", art: 0 },
  { title: "Anxiété, le jeu", file: "/apps/anxiete-le-jeu/anxiete-le-jeu-v1.1.html", copy: "Jeu de sensibilisation gratuit : une semaine dans la peau d'Alex, qui vit avec un trouble anxieux — météo intérieure, pensées qui envahissent et outils réels pour traverser. Ce jeu ne pose pas de diagnostic.", tag: "Sensibilisation · Santé mentale", faits: "5 journées · ressources 811 et 988 incluses", mono: "AX", art: 5 },
];

const PALETTES: [string, string][] = [
  ["#08243a", "#0f3e62"],
  ["#294f1e", "#496b2a"],
  ["#9a4a0d", "#c85f16"],
  ["#7a5210", "#d89532"],
  ["#4a2560", "#71408c"],
  ["#7e2d21", "#af3c2d"],
  ["#54432a", "#806943"],
  ["#07111b", "#123a5c"],
];

type GameEntry = (typeof GAMES)[number];

/* Adresse stable du jeu (item nº 4) : /apps/<slug>, redirigée en 301
   vers le fichier courant — les liens partagés ne cassent plus. */
const hrefJeu = (file: string) => `/apps/${slugDepuisFichier(file)}`;

const GENRES = ["Tous", ...Array.from(new Set(GAMES.map((g) => g.tag.split(" · ")[0])))];

const FILTER_BTN_STYLE: CSSProperties = {
  font: "inherit",
  fontSize: 13,
  fontWeight: 800,
  letterSpacing: ".02em",
  padding: "7px 14px",
  borderRadius: 999,
  border: "1.5px solid rgba(34,26,18,.5)",
  background: "transparent",
  color: "#221a12",
  cursor: "pointer",
};

const FILTER_BTN_ACTIVE_STYLE: CSSProperties = {
  ...FILTER_BTN_STYLE,
  background: "#221a12",
  color: "#f6eddd",
  borderColor: "#221a12",
};

const CHIP_STYLE: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "7px 13px",
  borderRadius: 999,
  border: "1px solid rgba(216,149,50,.38)",
  background: "rgba(216,149,50,.10)",
  color: "#f0c16d",
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: ".1em",
  textTransform: "uppercase",
};

const TAG_ON_TILE_STYLE: CSSProperties = {
  position: "absolute",
  left: 12,
  bottom: 10,
  fontSize: 10.5,
  fontWeight: 900,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "#f0c16d",
  background: "rgba(7,17,27,.55)",
  border: "1px solid rgba(240,193,109,.35)",
  borderRadius: 999,
  padding: "4px 9px",
};

const TAG_ON_PAPER_STYLE: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "#294f1e",
  background: "rgba(73,107,42,.12)",
  border: "1px solid rgba(73,107,42,.30)",
  borderRadius: 999,
  padding: "5px 10px",
};

function tileBackground(game: GameEntry): CSSProperties {
  const [c1, c2] = PALETTES[game.art % PALETTES.length];
  return {
    backgroundColor: c2,
    backgroundImage:
      "radial-gradient(circle at 85% 12%, rgba(246,237,221,.22), transparent 46%)," +
      "radial-gradient(rgba(255,255,255,.13) 1px, transparent 1.6px)," +
      "linear-gradient(135deg, " + c1 + ", " + c2 + ")",
    backgroundSize: "auto, 22px 22px, auto",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,.12), inset 0 -26px 36px rgba(0,0,0,.28)",
  };
}

/* ── Cœurs (item nº 3, vague 1) ────────────────────────────────────
   Favori personnel : localStorage du visiteur, MÊME clé que la barre
   de jeu (« hp-jeux-favoris ») — un favori mis dans un jeu se retrouve
   ici. Compteur public : « cœurs reçus », anonyme (aucun compte, ni IP
   ni identifiant stockés — voir /api/public/game-hearts et la
   migration 20261023_game_hearts). Le garde-fou « déjà aimé »
   (« hp-jeux-coeurs ») vit dans le navigateur : un cœur public se
   donne une seule fois par jeu ; retirer le favori ne retire pas le
   cœur déjà compté, et on le dit. Si le compteur n'est pas actif côté
   serveur, aucun nombre n'est affiché — le favori local marche seul. */
const CLE_FAVORIS = "hp-jeux-favoris";
const CLE_COEURS = "hp-jeux-coeurs";

const COEUR_BTN_STYLE: CSSProperties = {
  font: "inherit",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "6px 12px",
  borderRadius: 999,
  border: "1.5px solid rgba(179,54,43,.45)",
  background: "rgba(179,54,43,.06)",
  color: "#b3362b",
  fontSize: 14,
  fontWeight: 800,
  cursor: "pointer",
  lineHeight: 1,
};

function BoutonCoeur({
  slug,
  titre,
  favori,
  dejaDonne,
  total,
  onBasculer,
}: {
  slug: string;
  titre: string;
  favori: boolean;
  dejaDonne: boolean;
  total?: number;
  onBasculer: (slug: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onBasculer(slug)}
      aria-pressed={favori}
      aria-label={
        (favori ? "Retirer " : "Ajouter ") + titre + " de tes favoris"
      }
      title={
        dejaDonne
          ? "Dans tes favoris. Ton cœur public est déjà compté : le retirer d'ici ne retire pas le cœur."
          : "Ajoute ce jeu à tes favoris et donne-lui un cœur public, anonyme."
      }
      style={COEUR_BTN_STYLE}
    >
      <span aria-hidden="true" style={{ fontSize: 16 }}>
        {favori ? "♥" : "♡"}
      </span>
      {typeof total === "number" ? (
        <span aria-label={total + " cœurs reçus"}>{total}</span>
      ) : null}
    </button>
  );
}

/* ── Tampons des testeurs (décision de la direction, 23 oct. 2026, 08 h 18 :
   « Oui — les tampons au site, noms + couleurs ») ──────────────────
   Source de vérité : le registre des approbations rapportées par la direction
   le 22 oct. 2026, 21 h 31 (approbations-joueurs-2026-10-22.md).
   Chaque testeur a SA couleur ; les noms sont les prénoms/surnoms du
   registre, affichés tels quels. La couleur de Lo n'est pas précisée
   au registre : son tampon est posé en neutre, sans rien inventer.
   « Fusion Shop », approuvé par Mel au registre, n'existe pas (encore)
   sur le site : aucun tampon posé pour lui.
   Ajout du 23 oct. 2026, 20 h 35 (dicté par la direction) : O'Z « la grande »,
   tampon JAUNE — jaune profond #8A6D00, lisible sur fond crème
   (contraste ≈ 4,7:1, même exigence que le bleu ciel de Lo) :
   2 vérités 1 mensonge (en plus du mauve de Mel) et LA BANQUE
   (premier tampon du jeu). */
const TESTEURS = {
  louka: { nom: "Louka", couleur: "#2e7d32", fond: "rgba(46,125,50,.10)", rotation: -1.4 },
  maeva: { nom: "Maëva ☾", couleur: "#23201c", fond: "rgba(35,32,28,.07)", rotation: 1 },
  mel: { nom: "Mel « The girl boss »", couleur: "#7b2d8b", fond: "rgba(123,45,139,.09)", rotation: -0.8 },
  lo: { nom: "Lo « le petit Raptor »", couleur: "#0F6CA8", fond: "rgba(15,108,168,.10)", rotation: 1.3 },
  oz: { nom: "O'Z « la grande »", couleur: "#8A6D00", fond: "rgba(138,109,0,.10)", rotation: -0.5 },
  hp: { nom: "HP, le créateur", couleur: "#2456a6", fond: "rgba(36,86,166,.09)", rotation: -1 },
  tous: { nom: "à compléter", couleur: "#221a12", fond: "rgba(34,26,18,.06)", rotation: 0 },
} as const;

type CleTesteur = keyof typeof TESTEURS;

/* Approbations par slug stable de jeu (registre du 22 oct. 2026). */
const APPROBATIONS: Record<string, CleTesteur[]> = {
  "chat-attaque": ["louka"],
  "montgolfiere": ["louka", "maeva"],
  "la-spirale-asmr": ["louka"],
  "bernache-express": ["maeva"],
  "tir-de-boules-de-neige": ["maeva", "lo"],
  "caribou-run": ["maeva"],
  "nord-2087": ["maeva"],
  "mysteres-du-nord": ["lo"],
  "devine-l-humeur": ["lo"],
  "2-verites-1-mensonge": ["mel", "oz"],
  "la-banque": ["oz"],
  "pop-ballons": ["mel"],
  "fusion-sirop": ["hp"],
  "mots-de-chez-nous": ["hp"],
  "trio-des-elements": ["hp"],
};

/* Ordre d'affichage du bloc de preuve (celui du texte d'origine). */
const ORDRE_PREUVE = [
  "chat-attaque",
  "montgolfiere",
  "bernache-express",
  "caribou-run",
  "nord-2087",
  "mysteres-du-nord",
  "trio-des-elements",
  "mots-de-chez-nous",
  "fusion-sirop",
  "pop-ballons",
  "devine-l-humeur",
  "tir-de-boules-de-neige",
  "la-spirale-asmr",
  "2-verites-1-mensonge",
  "la-banque",
  "cherche-trouve-la-vraie-vie",
];

function PastilleTampon({ cle, grand }: { cle: CleTesteur; grand?: boolean }) {
  const t = TESTEURS[cle];
  return (
    <span
      title={
        cle === "hp"
          ? "Créateur : HP"
          : cle === "tous"
          ? "Approuvé par : à compléter"
          : "Approuvé par " + t.nom + ", testeur HP"
      }
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: grand ? "6px 12px 7px" : "4px 9px 5px",
        border: "1.6px solid " + t.couleur,
        borderRadius: 6,
        background: t.fond,
        color: t.couleur,
        fontSize: grand ? 13 : 11.5,
        fontWeight: 800,
        letterSpacing: ".03em",
        lineHeight: 1.15,
        transform: "rotate(" + t.rotation + "deg)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,.45)",
        whiteSpace: "nowrap",
      }}
    >
      {cle !== "hp" && <span aria-hidden="true">✓</span>}
      {/* Libellé complet sur le tampon même (demande de la direction, 23 oct.
          2026, 19 h 18 : « Ajouter au tampon avec nom le Approuvé
          par : ») — avant, il ne vivait que dans le title/aria,
          invisibles au tactile. Le nom, la couleur et la lune de
          Maëva sont inchangés. */}
      {cle === "hp" ? "Créateur : HP" : "Approuvé par : " + t.nom}
    </span>
  );
}

function RangeeTampons({ slug, grand }: { slug: string; grand?: boolean }) {
  const cles = APPROBATIONS[slug];
  if (!cles || cles.length === 0) return null;
  return (
    <div
      aria-label={
        cles.length === 1 && cles[0] === "hp"
          ? "Créateur : HP"
          : "Approuvé par : " + cles.map((c) => TESTEURS[c].nom).join(", ")
      }
      style={{ display: "flex", flexWrap: "wrap", gap: 7, alignItems: "center" }}
    >
      {cles.map((c) => (
        <PastilleTampon key={c} cle={c} grand={grand} />
      ))}
    </div>
  );
}

function JeuxPage() {
  const featured = GAMES.find((g) => g.title === "2 vérités, 1 mensonge") ?? GAMES[0];
  const [genre, setGenre] = useState("Tous");
  const [tri, setTri] = useState<"defaut" | "aimes">("defaut");
  const [favoris, setFavoris] = useState<string[]>([]);
  const [donnes, setDonnes] = useState<string[]>([]);
  const [compteurs, setCompteurs] = useState<Record<string, number> | null>(
    null,
  );

  useEffect(() => {
    try {
      const f = JSON.parse(localStorage.getItem(CLE_FAVORIS) ?? "[]");
      if (Array.isArray(f)) setFavoris(f.filter((x) => typeof x === "string"));
      const d = JSON.parse(localStorage.getItem(CLE_COEURS) ?? "[]");
      if (Array.isArray(d)) setDonnes(d.filter((x) => typeof x === "string"));
    } catch {
      /* localStorage indisponible : les cœurs restent visuels, sans mémoire */
    }
    fetch("/api/public/game-hearts")
      .then((r) => r.json())
      .then((d) => {
        if (d && d.actif) setCompteurs(d.coeurs ?? {});
      })
      .catch(() => {
        /* compteur injoignable : on n'affiche aucun nombre */
      });
  }, []);

  const basculerCoeur = (slug: string) => {
    setFavoris((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      try {
        localStorage.setItem(CLE_FAVORIS, JSON.stringify(next));
      } catch {}
      return next;
    });
    if (donnes.includes(slug)) return; // cœur public déjà donné : une seule fois
    setDonnes((prev) => {
      const next = [...prev, slug];
      try {
        localStorage.setItem(CLE_COEURS, JSON.stringify(next));
      } catch {}
      return next;
    });
    if (compteurs) {
      setCompteurs((prev) =>
        prev ? { ...prev, [slug]: (prev[slug] ?? 0) + 1 } : prev,
      );
    }
    fetch("/api/public/game-hearts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d && d.actif === false) {
          setCompteurs(null); // compteur pas actif : on n'affiche pas de nombre
        } else if (d && typeof d.total === "number") {
          setCompteurs((prev) => ({ ...(prev ?? {}), [slug]: d.total }));
        }
      })
      .catch(() => {});
  };

  const etatCoeur = (g: GameEntry) => {
    const slug = slugDepuisFichier(g.file);
    return {
      slug,
      titre: g.title,
      favori: favoris.includes(slug),
      dejaDonne: donnes.includes(slug),
      total: compteurs ? compteurs[slug] ?? 0 : undefined,
      onBasculer: basculerCoeur,
    };
  };

  const baseVisible =
    genre === "Tous"
      ? GAMES
      : GAMES.filter((g) => g.tag.split(" · ")[0] === genre);
  const visibleGames = baseVisible
    .filter((g) => g.title !== featured.title)
    .slice()
    .sort((a, b) => {
      if (tri !== "aimes" || !compteurs) return 0;
      const ca = compteurs[slugDepuisFichier(a.file)] ?? 0;
      const cb = compteurs[slugDepuisFichier(b.file)] ?? 0;
      return cb - ca;
    });
  return (
    <>
      <section id="sec-jeux" className="editorial-hero hero-banner-image jeux-hero">
        <div className="container">
          <span className="editorial-kicker">Jeux HP</span>
          <h1>Jouer, choisir, <em>essayer autrement</em>.</h1>
          <p className="lead">Des jeux courts et des histoires interactives pour exercer ses réflexes, imaginer la suite et apprendre sans pression.</p>
          <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.55, marginTop: 14, maxWidth: 700 }}>« J'ai jamais su qui j'étais ni ce que j'aimais. Alors je fais un peu de tout — et j'en ai fait des jeux pour la vraie vie. »</p>
          <div className="lead-actions">
            <a className="btn-primary" href="/apps/bons-reflexes">Jouer aux Bons réflexes d'HP</a>
            <a className="btn-ghost" href="#tous-les-jeux">Voir tous les jeux</a>
            <ShareButton text="Des jeux gratuits, sans inscription, à jouer dans ton navigateur — HP Outils. T'es pas game de l'essayer ?" />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 26 }}>
            <span style={CHIP_STYLE}>{GAMES.length} jeux gratuits</span>
            <span style={CHIP_STYLE}>Sans inscription</span>
            <span style={CHIP_STYLE}>Jouables dans ton navigateur</span>
          </div>
        </div>
      </section>

<section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">À jouer maintenant</span>
          <h2 className="section-title">Les jeux HP</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Les bons réflexes d'HP</h3>
              <p>Des situations de cuisine, de maison, d'entraide, d'émotions et de sécurité. Gratuit, sans inscription.</p>
              <a className="pillar-cta" href="/apps/bons-reflexes">Jouer maintenant →</a>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Mystères du Nord</h3>
              <p>Sept enquêtes de déduction dans le Nord : explore les lieux, interroge les suspects, trouve les indices et démasque le coupable.</p>
              <a className="pillar-cta" href="/apps/mysteres-du-nord">Jouer maintenant →</a>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>À toi l'histoire</h3>
              <p>Des aventures à embranchements où chaque choix ouvre une nouvelle piste.</p>
              <a className="pillar-cta" href="#a-toi-histoire">Découvrir les rayons →</a>
            </article>
          </div>
        </div>
      </section>

      <section className="three-pillars" id="tous-les-jeux">
        <div className="container">
          <span className="editorial-kicker">Gratuits, sans inscription</span>
          <h2 className="section-title">Tous les jeux</h2>
          <p style={{ textAlign: "center", maxWidth: 620, margin: "-6px auto 34px", color: "#5a4a3f", fontSize: 16, lineHeight: 1.55 }}>
            Clique sur une tuile et joue tout de suite : rien à installer, rien à payer.
          </p>
          <div role="group" aria-label="Filtrer les jeux par genre" style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 900, margin: "0 auto 30px" }}>
            {GENRES.map((g) => (
              <button
                key={g}
                type="button"
                aria-pressed={genre === g}
                onClick={() => setGenre(g)}
                style={genre === g ? FILTER_BTN_ACTIVE_STYLE : FILTER_BTN_STYLE}
              >
                {g}
              </button>
            ))}
          </div>
          {favoris.length > 0 ? (
            <div aria-label="Tes favoris" style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", justifyContent: "center", maxWidth: 900, margin: "0 auto 26px" }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#b3362b" }}>♥ Tes favoris :</span>
              {favoris.map((slug) => {
                const g = GAMES.find((x) => slugDepuisFichier(x.file) === slug);
                if (!g) return null;
                return (
                  <a key={slug} href={hrefJeu(g.file)} style={{ ...FILTER_BTN_STYLE, textDecoration: "none", display: "inline-block" }}>
                    {g.title}
                  </a>
                );
              })}
            </div>
          ) : null}
          {compteurs ? (
            <div style={{ textAlign: "center", margin: "0 auto 26px" }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#5a4a3f" }}>
                Trier les jeux :{" "}
                <select
                  value={tri}
                  onChange={(e) => setTri(e.target.value as "defaut" | "aimes")}
                  style={{ font: "inherit", fontSize: 13, fontWeight: 700, padding: "6px 10px", borderRadius: 999, border: "1.5px solid rgba(34,26,18,.5)", background: "transparent", color: "#221a12" }}
                >
                  <option value="defaut">Nos suggestions</option>
                  <option value="aimes">Les plus aimés ♥</option>
                </select>
              </label>
            </div>
          ) : null}
          <div className="pillar-grid">
            <article className="pillar-card" style={{ gridColumn: "1 / -1", padding: 0, overflow: "hidden", flexDirection: "row", flexWrap: "wrap", gap: 0 }}>
              <a
                href={hrefJeu(featured.file)}
                aria-label={"Jouer à " + featured.title}
                style={{ ...tileBackground(featured), flex: "1 1 260px", minHeight: 230, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, textDecoration: "none", padding: "18px 14px" }}
              >
                <span aria-hidden="true" style={{ fontFamily: "Georgia, serif", fontSize: 118, lineHeight: 1, color: "#f6eddd", textShadow: "0 12px 30px rgba(0,0,0,.45)", letterSpacing: ".01em" }}>
                  {featured.mono}
                </span>
                <span style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.25, color: "#f6eddd", textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,.5)" }}>
                  {featured.title}
                </span>
              </a>
              <div style={{ flex: "2 1 320px", padding: "30px 32px", display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
                <span className="editorial-kicker" style={{ margin: 0, background: "rgba(200,95,22,.12)", color: "#be5c23", borderColor: "rgba(200,95,22,.35)" }}>Jeu vedette</span>
                <h3 style={{ fontSize: 34 }}>{featured.title}</h3>
                <span style={TAG_ON_PAPER_STYLE}>{featured.tag}</span>
                <p>{featured.copy}</p>
                {"faits" in featured && featured.faits ? <p className="workshop-meta">{featured.faits}</p> : null}
                <RangeeTampons slug={slugDepuisFichier(featured.file)} />
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <a className="btn-primary" href={hrefJeu(featured.file)}>Jouer maintenant</a>
                  <BoutonCoeur {...etatCoeur(featured)} />
                </div>
              </div>
            </article>

            {visibleGames.map((game) => (
              <article className="pillar-card" key={game.title} style={{ padding: 0, overflow: "hidden", gap: 0 }}>
                <a href={hrefJeu(game.file)} aria-label={"Jouer à " + game.title} style={{ display: "block", textDecoration: "none" }}>
                  <div style={{ ...tileBackground(game), minHeight: 148, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 7, position: "relative", padding: "16px 14px 30px" }}>
                    <span aria-hidden="true" style={{ fontFamily: "Georgia, serif", fontSize: 52, lineHeight: 1, color: "#f6eddd", textShadow: "0 8px 22px rgba(0,0,0,.42)" }}>
                      {game.mono}
                    </span>
                    <span style={{ fontSize: 14.5, fontWeight: 800, lineHeight: 1.25, color: "#f6eddd", textAlign: "center", textShadow: "0 2px 8px rgba(0,0,0,.5)" }}>
                      {game.title}
                    </span>
                    <span style={TAG_ON_TILE_STYLE}>{game.tag}</span>
                  </div>
                </a>
                <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  <h3 style={{ fontSize: 23 }}>{game.title}</h3>
                  <p>{game.copy}</p>
                  {"faits" in game && game.faits ? <p className="workshop-meta">{game.faits}</p> : null}
                  <RangeeTampons slug={slugDepuisFichier(game.file)} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginTop: "auto" }}>
                    <a className="pillar-cta" href={hrefJeu(game.file)}>Jouer maintenant →</a>
                    <BoutonCoeur {...etatCoeur(game)} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

<section className="three-pillars">
        <div className="container" style={{ maxWidth: 860 }}>
          <span className="editorial-kicker">Testés pour vrai</span>
          <h2 className="section-title">Approuvés par <em>nos joueurs</em></h2>
          <p style={{ textAlign: "center", maxWidth: 680, margin: "-6px auto 18px", color: "#5a4a3f", fontSize: 16, lineHeight: 1.6 }}>
            Avant d'arriver ici, les jeux HP passent entre les mains de vrais
            joueurs — de jeunes testeurs et la famille d'HP. Leur tampon
            « approuvé » ne s'achète pas et ne s'invente pas : il se mérite,
            partie par partie.
          </p>
          <p style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 22px", color: "#5a4a3f", fontSize: 16, lineHeight: 1.6 }}>
            Chaque testeur a son tampon, sa couleur, sa signature :
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9, justifyContent: "center", margin: "0 auto 30px", maxWidth: 680 }}>
            {(Object.keys(TESTEURS) as CleTesteur[])
              .filter((c) => c !== "tous")
              .map((c) => (
                <PastilleTampon key={c} cle={c} grand />
              ))}
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 13 }}>
            {ORDRE_PREUVE.map((slug) => {
              const g = GAMES.find((x) => slugDepuisFichier(x.file) === slug);
              if (!g) return null;
              return (
                <li
                  key={slug}
                  style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", justifyContent: "center", textAlign: "center" }}
                >
                  <a
                    href={hrefJeu(g.file)}
                    style={{ color: "#221a12", fontWeight: 700, fontSize: 15.5, textDecoration: "underline", textUnderlineOffset: 3 }}
                  >
                    {g.title}
                  </a>
                  <RangeeTampons slug={slug} />
                </li>
              );
            })}
          </ul>
          <p style={{ textAlign: "center", maxWidth: 680, margin: "22px auto 0", color: "#5a4a3f", fontSize: 15, lineHeight: 1.6 }}>
            Et Cherche &amp; Trouve — La vraie vie a été approuvé à
            l'unanimité : tous les tampons d'un coup.
          </p>
        </div>
      </section>

<section className="collections-strip" id="a-toi-histoire">
        <div className="container">
          <span className="editorial-kicker">Histoires interactives</span>
          <h2>À toi <em>l'histoire</em></h2>
          <p className="strip-intro">Tome 1 gratuit · tomes standards 5 $ CAD · grands tomes 8 $ CAD. Aucune taxe ajoutée.</p>
          <div className="pillar-grid">
            {STORIES.map((story, index) => (
              <Link to="/lire" className="pillar-card" style={{ textDecoration: "none" }} key={story.audience}>
                <span className="pillar-num">{String(index + 1).padStart(2, "0")}</span>
                <h3>Rayon {story.audience}</h3>
                <p>{story.copy}</p>
                <span className="workshop-meta">Voir les tomes →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

<section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">À découvrir</span>
          <div className="pillar-grid">
            {[
              ["Tome 1 gratuit", "Commencer une histoire sans paiement et découvrir le principe des choix."],
              ["Tomes standards", "Des histoires complètes à 5 $ CAD, aucune taxe ajoutée."],
              ["Grands tomes", "Grands tomes à 8 $ CAD, aucune taxe ajoutée."],
            ].map(([title, copy], index) => (
              <Link to="/lire" className="pillar-card" style={{ textDecoration: "none" }} key={title}>
                <span className="pillar-num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

<section className="collections-strip">
        <div className="container" style={{ maxWidth: 720 }}>
          <span className="editorial-kicker">Infolettre</span>
          <h2>Les nouveaux jeux <em>dans ta boîte</em></h2>
          <p className="strip-intro">
            Nouveaux jeux, nouveaux tomes « À toi l'histoire », coulisses HP.
            Un courriel de temps en temps, jamais de spam.
          </p>
          <NewsletterSignup source="jeux" />
        </div>
      </section>

<section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Organismes, écoles et médias</span>
          <h2>Partager les jeux avec vos <em>publics</em></h2>
          <p className="strip-intro">Un bloc d'intégration pourra être fourni aux partenaires qui souhaitent présenter ou diffuser les jeux HP.</p>
          <div className="lead-actions">
            <Link to="/contact" className="btn-primary">Devenir partenaire</Link>
          </div>
        </div>
      </section>

<section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Découvre aussi</span>
          <h2 className="section-title">Après le jeu, <em>le reste d'HP</em></h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>Les livres et les kits</h3>
              <p>Les histoires et les idées continuent en livres et en kits PDF, à petit prix.</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir les livres →</Link>
            </article>
            <article className="pillar-card">
              <h3>Les outils gratuits</h3>
              <p>Pour la vraie vie entre deux parties : des outils web gratuits, sans compte — budget, papiers, proches aidants.</p>
              <Link to="/outils" className="pillar-cta">Voir les outils →</Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
