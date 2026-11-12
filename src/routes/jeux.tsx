import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";
import { slugDepuisFichier } from "@/lib/jeux-adresses";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ShareButton } from "@/components/ShareButton";
import { useEffect, useState, type CSSProperties } from "react";

export const Route = createFileRoute("/jeux")({
  head: () => ({
    ...createSeoHead({
      title: "Jeux gratuits en français du Québec — 57 jeux en ligne | HP Outils",
      description: "Des jeux gratuits créés au Québec — 57 jeux : enquêtes, stratégie, arcade, mots cachés, mémoire, gestion et histoires interactives. Sans compte, sans téléchargement — vous jouez dans votre navigateur.",
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
            url: `https://www.hp-outils.com/apps/${g.slug ?? slugDepuisFichier(g.file)}`,
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

/* Tuile : slug explicite quand le fichier ne vit pas dans son propre
   répertoire (éditions des Fêtes) — sinon le slug est le répertoire. */
const GAMES: { title: string; file: string; copy: string; tag: string; faits?: string; mono: string; art: number; slug?: string; image?: string; alt?: string; imageRatio?: string }[] = [
  { title: "Cherche & Trouve — La vraie vie", file: "/apps/cherche-trouve-la-vraie-vie/cherche-trouve-la-vraie-vie-v1.1.html", copy: "Jeu d'observation gratuit : un cherche-et-trouve dans des scènes de la vraie vie.", tag: "Observation · Cherche-et-trouve", faits: "3 manches · 15 défis · sprint de 3 minutes", mono: "CT", art: 6, image: "/apps/cherche-trouve-la-vraie-vie/entete.jpg", alt: "Carte défi « Quelque chose qui semble cassé mais fonctionne », minuteur 25 secondes, bouton BINGO" },
  { title: "Cherche et Trouve — Édition des Fêtes", file: "/apps/cherche-trouve-la-vraie-vie/cherche-trouve-fetes-v1.0.html", copy: "Jeu d'observation des Fêtes : trouve un chocolat chaud, une décoration, compte 5 lumières dehors — et attention, l'étincelle bloque des touches en rigolant.", tag: "Observation · Cherche-et-trouve", faits: "4 manches · 20 défis · sprint de 3 minutes", mono: "B7", art: 6, slug: "cherche-trouve-fetes", image: "/apps/cherche-trouve-fetes/entete.jpg", alt: "Carte « La personne qui rit le plus facilement », compte à rebours 23 secondes, bouton BINGO, manche 1 sur 4" },
  { title: "Les hommes préhistoriques du Québec", file: "/apps/hommes-prehistoriques/hommes-prehistoriques-v1.0.html", copy: "Jeu fantaisiste 2.5D gratuit : cours avec Silex dans un Québec imaginaire, avec des dinosaures inventés pour le jeu. Saute par-dessus les roches et les troncs, ramasse des silex et découvre 8 dinosaures imaginaires. Grimpe sur les paliers, attrape les boosts et crée ton parcours !", tag: "Aventure · 8 dinosaures imaginaires", faits: "8 dinos imaginaires · paliers et boosts · crée ton parcours", mono: "HP", art: 0, image: "/apps/hommes-prehistoriques/entete.jpg", alt: "Personnage préhistorique et stégosaure, plantes à baies, pointage 17, album 0 sur 8, niveau 1" },
  { title: "Mini-jeux HP", file: "/apps/mini-jeux/mini-jeux-hp.html", copy: "Trois mini-jeux gratuits réunis, jouables hors ligne : Hiverman, le bonhomme de neige qui ramasse les points en évitant les fantômes ; Flocon, pour dessiner ton flocon ; Mini point, pour dessiner au doigt. Aucun son, aucun réseau — fond noir pour économiser la pile.", tag: "Mini-jeux · 3 jeux en un", faits: "3 mini-jeux · jouables hors ligne", mono: "MJ", art: 7, image: "/apps/mini-jeux/entete.jpg", alt: "Labyrinthe façon Pac-Man en cours, pastilles et blocs bleus", imageRatio: "16:9" },
  { title: "Air bête", file: "/apps/air-bete/air-bete.html", copy: "Jeu d'humour gratuit : lis les intentions, démêle les malentendus — 30 situations, solo ou en gang de 2 à 8, et un vote pour le plus drôle de la soirée.", tag: "Humour · Malentendus et intentions", faits: "30 situations · Solo ou 2 à 8 joueurs", mono: "AB", art: 0, image: "/apps/air-bete/entete.jpg", alt: "Manche 1 sur 5, situation « Ton père raconte pour la 18e fois la même anecdote », défi, question et 3 réponses" },
  { title: "Mineur d'HP", file: "/apps/mineur-hp/mineur-hp-v0.1.html", copy: "Jeu de stratégie gratuit : creuse ta mine — 3 galeries, 4 minéraux aux faits vérifiés, des outils à débloquer. Les boulons d'or sont une monnaie de jeu, jamais du vrai argent.", tag: "Stratégie · Creuser et collectionner", faits: "3 galeries · 4 minéraux · Prototype v0.1", mono: "MH", art: 0, image: "/apps/mineur-hp/entete.jpg", alt: "Grille de mine 6 sur 6, 2 minéraux révélés, Pixel le chat dans un passage, objectif « Minerais trouvés : 2 / 4 »" },
  { title: "Un petit pas à la fois", file: "/apps/hp-hyper-potentiel/index.html", copy: "Trois petits outils gratuits : respiration guidée, carte ikigaï, plan WOOP de 7 jours — pour avancer doucement, sans compte.", tag: "Détente · Respiration et petits pas", faits: "3 modules · 7 jours", mono: "PP", art: 0, image: "/apps/hp-hyper-potentiel/entete.jpg", alt: "Accueil : les 3 modules Respire, ikigaï et WOOP" },
  { title: "Panne de courant — 72 h", file: "/apps/panne-72h/panne-72h-v1.0.html", copy: "Jeu de gestion gratuit : une panne de 72 heures, 22 moments pour tenir — eau, nourriture, chaleur, moral et entraide, sans jamais paniquer.", tag: "Gestion · 72 heures sans courant", faits: "22 moments · 6 paliers", mono: "P72", art: 0, image: "/apps/panne-72h/entete.jpg", alt: "Moment 1 sur 22 « La panne tombe », 3 choix, 5 ressources à 70, palier 1 sur 6" },
  { title: "Boîte à lunch", file: "/apps/boite-a-lunch/boite-a-lunch-v1.0.html", copy: "Jeu de gestion gratuit : 10 jours de lunchs à préparer avec 50 $ — bons aliments, allergies à surveiller, et un budget qui tient jusqu'à vendredi.", tag: "Gestion · 10 jours de lunchs", faits: "10 jours · budget 50 $", mono: "BL", art: 0, image: "/apps/boite-a-lunch/entete.jpg", alt: "Semaine 1, lundi, jour 1 sur 10 : beurre d'arachide, riz cuit et pomme, 3 pastilles vertes, budget 50,00 $" },
  { title: "Traversier", file: "/apps/traversier/traversier-v1.0.html", copy: "Jeu d'arcade gratuit : pilote ton traversier d'une rive à l'autre — livre les caisses, relève les défis, et attention aux courants.", tag: "Arcade · Défis et livraisons", faits: "Défis · 9 livraisons", mono: "TR", art: 0, image: "/apps/traversier/entete.jpg", alt: "Le traversier en pleine traversée avec trois caisses à bord" },
  { title: "Sir H. Gepeto — le quiz", file: "/apps/quiz-gepeto/quiz-gepeto-v1.0.html", copy: "Jeu quiz gratuit : 12 questions sur HP Outils, les jeux et la vraie vie — Sir H. Gepeto commente chaque réponse, bonne ou pas tout à fait.", tag: "Quiz · 12 questions sur HP", faits: "12 questions", mono: "QG", art: 0, image: "/apps/quiz-gepeto/entete.jpg", alt: "Question 1 sur 12, 4 choix, vraie face peinte de Gepeto en en-tête", imageRatio: "16:9" },
  { title: "Panne de courant — en douceur", file: "/apps/panne-72h-douce/panne-72h-douce-v1.0.html", copy: "Jeu de détente gratuit : la même panne, en douceur — 16 petits pas, une respiration, aucune urgence, aucun échec.", tag: "Détente · 16 petits pas", faits: "16 moments · respiration guidée", mono: "PD", art: 0, image: "/apps/panne-72h-douce/entete.jpg", alt: "Pause douce après le moment 1 sur 16, cercle de respiration, compteur PETIT PAS 1", imageRatio: "16:9" },
  { title: "Pêche blanche", file: "/apps/peche-blanche-arcade/peche-blanche-arcade-v1.0.html", copy: "Jeu d'arcade gratuit : pêche blanche sur la glace — brimbale, poissons jaunes, dorés à attraper, et l'hiver du Québec sous les pieds.", tag: "Arcade · Pêche sur glace", faits: "45 poissons · 7 dorés", mono: "PB", art: 0, image: "/apps/peche-blanche-arcade/entete.jpg", alt: "5 poissons jaunes, un encerclé à la ligne de la brimbale, hameçon et flotteur rouge, 2 trous dans la glace" },
  { title: "Pêche blanche — carnet", file: "/apps/peche-blanche-carnet/peche-blanche-carnet-v1.0.html", copy: "Jeu d'observation gratuit : descends jusqu'au plus profond du Saint-Laurent et remplis ton carnet — 20 espèces du Québec à reconnaître.", tag: "Observation · 20 espèces du Saint-Laurent", faits: "20 espèces · fiches vérifiées", mono: "PC", art: 0, image: "/apps/peche-blanche-carnet/entete.jpg", alt: "Poisson rose à l'hameçon, anneau orange « à portée », zones de profondeur, bouton « Ferrer ! »" },
  { title: "Les aventures du moteur", file: "/apps/aventures-moteur/aventures-moteur-v1.0.html", copy: "Jeu d'histoires gratuit : suis le moteur dans sa maison — 7 portes, 16 histoires, des câlins, un atelier et des aventures à chaque porte.", tag: "Aventure · 16 histoires", faits: "16 histoires · 7 portes", mono: "AM", art: 0, image: "/apps/aventures-moteur/entete.jpg", alt: "Hub « Bienvenue ! », vraie face de Gepeto en médaillon, 7 portes, carte de voyage « Chapitre 1 — 0 sur 16 histoires »" },
  { title: "RELÈVE — Chapitre 1 : Surchauffe", file: "/apps/releve/releve-chapitre-1-v1.0.html", copy: "Jeu d'enquête 3D gratuit à Percé : avec Grizz, ourson policier de Faune-Secours, et NID à la radio, trouve la cause d'une surchauffe qui menace la faune. En français et en anglais.", tag: "Aventure · Enquête 3D à Percé", faits: "Histoire d'enquête · FR/EN", mono: "R1", art: 0, image: "/apps/releve/entete.jpg", alt: "Scène 3D nocturne : personnage sur un quai au-dessus d'eau inondée, village, mini-carte, objectif « Trouve les 3 indices »", imageRatio: "16:9" },
  { title: "LA BANQUE — le jeu de la banque alimentaire", file: "/apps/la-banque/la-banque-v1.1.html", copy: "Jeu de gestion gratuit : gère une banque alimentaire pendant une saison de 8 semaines — dons, tri, cuisine et service aux familles, qui reviennent semaine après semaine. Ton score : les familles nourries.", tag: "Gestion · Banque alimentaire", faits: "Partie longue : une saison de 8 semaines", mono: "LB", art: 1, image: "/apps/la-banque/entete.jpg", alt: "Semaine 1 sur 8, onglets Dons, Tri et Cuisine, tri de denrées" },
  { title: "Les bons réflexes d'HP", file: "/apps/bons-reflexes/index.html", copy: "Jeu éducatif gratuit sur les bons réflexes du quotidien, par âge et par activité : cuisine, maison, entraide, émotions et sécurité.", tag: "Éducatif · Réflexes du quotidien", faits: "Par âge et par activité", mono: "BR", art: 2, image: "/apps/bons-reflexes/entete.jpg", alt: "Quiz cuisine 6 à 8 ans, question des cheveux longs, 3 réponses, progression 0 sur 12" },
  { title: "Mystères du Nord — enquêtes de déduction", file: "/apps/mysteres-du-nord/myst-res-du-nord-v1.2.html", copy: "Jeu d'enquête et de déduction gratuit : sept enquêtes dans le Nord — explore les lieux, interroge les suspects et démasque le coupable.", tag: "Enquête · Déduction", faits: "7 enquêtes · pour les jeunes détectives aussi", mono: "MN", art: 7, image: "/apps/mysteres-du-nord/entete.jpg", alt: "Enquête « Le chat perdu » : 4 lieux à visiter, tableau d'enquête" },
  { title: "Fait fructifier 100 $ en 30 jours", file: "/apps/100-en-30-jours/100-en-30-jours-v1.2.html", copy: "Jeu de gestion et d'investissement 100 % fictif et gratuit : 100 $ de départ, 30 jours pour fructifier.", tag: "Gestion · Investissement fictif", faits: "100 $ fictifs · 30 jours pour fructifier", mono: "100", art: 3, image: "/apps/100-en-30-jours/entete.jpg", alt: "Marché d'occasion jour 4 sur 30, valeur nette 100,00 $, cartes Vélo usagé, Meuble vintage et Tuque tricotée" },
  { title: "Caribou Run — course sans fin québécoise", file: "/apps/caribou-run/caribou-run-v1.1.html", copy: "Jeu d'arcade gratuit, course sans fin québécoise : saute les bancs de neige et échappe à la déneigeuse !", tag: "Arcade · Course sans fin", faits: "Endless runner : la partie dure tant que tu tiens", mono: "CR", art: 0, image: "/apps/caribou-run/entete.jpg", alt: "Caribou courant dans la neige, sapins, soleil et flocons", imageRatio: "16:9" },
  { title: "Caribou Run — Édition des Fêtes", file: "/apps/caribou-run/caribou-run-fetes-v1.0.html", copy: "Course sans fin des Fêtes : le caribou au nez rouge ramasse les cadeaux, évite les loups et échappe à la déneigeuse illuminée — l'étincelle chevauche sur son dos.", tag: "Arcade · Course sans fin", faits: "Cadeaux à ramasser (+25 pts) · loups à éviter · déneigeuse illuminée", mono: "B6", art: 0, slug: "caribou-run-fetes", image: "/apps/caribou-run-fetes/entete.jpg", alt: "Caribou au nez rouge dans la neige, sapins décorés d'étoiles et de boules", imageRatio: "16:9" },
  { title: "Devine l'humeur — devine les émotions", file: "/apps/devine-l-humeur/devine-l-humeur-v1.1.html", copy: "Jeu des émotions gratuit : devine l'émotion cachée derrière chaque situation.", tag: "Émotions · Devine les émotions", faits: "10 manches · 13 humeurs · 52 visages", mono: "DH", art: 4, image: "/apps/devine-l-humeur/entete.jpg", alt: "Visage effrayé, carte « Raté… c'était la peur », bouton Continuer" },
  { title: "La Spirale ASMR", file: "/apps/la-spirale-asmr/la-spirale-asmr-v1.1.html", copy: "Jeu de détente gratuit : un tourbillon de sable hypnotique à personnaliser — couleurs, effets et sons doux, avec respiration guidée.", tag: "Détente · ASMR et respiration", faits: "Solo · respiration guidée de 1 à 10 minutes", mono: "SA", art: 0, image: "/apps/la-spirale-asmr/entete.jpg", alt: "Spirale lumineuse en rotation sur fond noir, panneaux Couleurs, Effets, Sons doux et Ambiance" },
  { title: "Poutine Panic — sers des poutines à toute vitesse", file: "/apps/poutine-panic/poutine-panic-v1.1.html", copy: "Jeu d'arcade gratuit : sers des poutines à toute vitesse avant la fin du service, en parties de 2 minutes.", tag: "Arcade · Service rapide", faits: "Parties de 2 minutes", mono: "PP", art: 2, image: "/apps/poutine-panic/entete.jpg", alt: "Service de poutines : 3 commandes clients, assiette vide, barre d'ingrédients" },
  { title: "Retromania — devine les prix d'époque", file: "/apps/retromania/retromania-v1.1.html", copy: "Jeu quiz gratuit et nostalgique : devine le prix d'époque d'objets d'hier à aujourd'hui — le plus proche sans dépasser gagne !", tag: "Quiz · Prix d'époque", faits: "10 manches · 322 objets · 20 secondes par objet", mono: "RM", art: 6, image: "/apps/retromania/entete.jpg", alt: "Quiz des prix d'époque : le téléviseur 21 pouces, en 1956 au Canada, pavé numérique, mise 1,94 $" },
  { title: "Sirop Clicker — sirop d'érable", file: "/apps/sirop-clicker/sirop-clicker-v1.1.html", copy: "Jeu de clics gratuit et relaxant : clique pour produire du sirop d'érable au Temps des sucres, avec sauvegarde automatique.", tag: "Clics · Sirop d'érable", faits: "Sauvegarde automatique sur l'appareil", mono: "SC", art: 3, image: "/apps/sirop-clicker/entete.jpg", alt: "Érable roux enneigé, compteurs de gouttes, boutique du Temps des sucres" },
  { title: "Mots de Chez Nous — mots cachés d'ici", file: "/apps/mots-de-chez-nous/mots-de-chez-nous-v1.0.html", copy: "Jeu de mots cachés gratuit : 665 mots d'ici à retrouver, définitions incluses, grilles de 6 à 10 mots.", tag: "Mots cachés · Mots d'ici", faits: "665 mots · grilles de 6 à 10 mots", mono: "MC", art: 5, image: "/apps/mots-de-chez-nous/entete.jpg", alt: "Mots cachés : grille 8 sur 8, liste LÉVIS, MAGANÉ, BROUE, CÈDRE, FORÊT, FLÛTE, chrono 0:03" },
  { title: "Mémoire des Cantons — jeu de mémoire du Québec", file: "/apps/memoire-des-cantons/memoire-des-cantons-v1.0.html", copy: "Jeu de mémoire gratuit aux icônes du Québec : retourne les cartes et retrouve les paires d'ici.", tag: "Mémoire · Icônes du Québec", mono: "MÉ", art: 1, image: "/apps/memoire-des-cantons/entete.jpg", alt: "Grille mémoire 3 sur 4, cartes Bernache et Tuque retournées, compteurs Coups, Temps et Paires" },
  { title: "Tir de Boules de Neige — 50 niveaux", file: "/apps/tir-de-boules-de-neige/tir-de-boules-de-neige-v2.0.html", copy: "Jeu d'adresse gratuit : 50 niveaux de tir à la boule de neige, sauvegarde incluse.", tag: "Adresse · Tir et 50 niveaux", faits: "50 niveaux · sauvegarde incluse", mono: "TB", art: 0, image: "/apps/tir-de-boules-de-neige/entete.jpg", alt: "Scène d'hiver : bonhomme de neige, cible sur une branche, boules de neige" },
  { title: "Hockey 2 contre 2 — Sir H. Gepeto & Pixel", file: "/apps/hockey-hgpto/hockey-hgpto-v1.0.html", copy: "Jeu de sport gratuit : une partie de hockey 2 contre 2 de 2 minutes — toi et ton gardien contre Sir H. Gepeto et Pixel, la chatte gardienne. Attention à ses moments de distraction…", tag: "Sport · Hockey 2 contre 2", mono: "H2", art: 7, image: "/apps/hockey-hgpto/entete.jpg", alt: "Patinoire vue de dessus, Sir H. Gepeto et Pixel en joueurs, palet, bouton TIR", imageRatio: "16:9" },
  { title: "Ado odieux, adieu", file: "/apps/ado-odieux-adieu/ado-odieux-adieu-v1.0.html", copy: "Jeu d'humour et de choix gratuit : fais des mauvais coups sans te faire pogner… et assume la vraie sentence.", tag: "Humour · Mauvais coups", mono: "AO", art: 5, image: "/apps/ado-odieux-adieu/entete.jpg", alt: "Parc vu de dessus avec personnages, arbres, bancs et chemin beige" },
  { title: "Couleuvre du Québec — jeu du serpent", file: "/apps/couleuvre-du-quebec/couleuvre-du-quebec-v1.0.html", copy: "Jeu d'arcade gratuit, le serpent d'ici : souris, bestioles dorées, mouettes et vidanges.", tag: "Arcade · Serpent du Québec", mono: "CQ", art: 1, image: "/apps/couleuvre-du-quebec/entete.jpg", alt: "Serpent vert à 4 segments sur damier, sacs à ramasser" },
  { title: "Fusion Sirop — fusion à la cabane à sucre", file: "/apps/fusion-sirop/fusion-sirop-v1.0.html", copy: "Jeu de réflexion et de fusion gratuit, à la cabane à sucre : de la sève au pain de sucre.", tag: "Réflexion · Fusion à la cabane à sucre", mono: "FS", art: 3, image: "/apps/fusion-sirop/entete.jpg", alt: "Grille 2048 de tuiles sirop, panneau « Le vrai procédé, étape par étape »" },
  { title: "Trio des Éléments — match-3 du tableau périodique", file: "/apps/trio-des-elements/trio-des-elements-v1.0.html", copy: "Jeu match-3 gratuit et scientifique : aligne silicium, diamant, or et cuivre, du tableau périodique.", tag: "Match-3 · Tableau périodique", mono: "T3", art: 4, image: "/apps/trio-des-elements/entete.jpg", alt: "Grille match-3 du tableau périodique : silicium, calcium, fer, carbone, or et cuivre" },
  { title: "Bernache Express — migration à un seul bouton", file: "/apps/bernache-express/bernache-express-v1.0.html", copy: "Jeu d'arcade gratuit à un seul bouton : la grande migration de la bernache vers le Sud.", tag: "Arcade · Migration à un bouton", faits: "Un seul bouton", mono: "BE", art: 0, image: "/apps/bernache-express/entete.jpg", alt: "Bernache en vol, ciel bleu, nuages, soleil, « En vol vers le sud »", imageRatio: "16:9" },
  { title: "Le Bonhomme Pendu — mots à deviner", file: "/apps/le-bonhomme-pendu/le-bonhomme-pendu-v1.0.html", copy: "Jeu de mots gratuit à deviner : 673 mots, dont 100 québécois d'ici, définitions incluses, solo ou à 2 joueurs.", tag: "Mots · Mots à deviner", faits: "Solo ou 2 joueurs · 673 mots", mono: "BP", art: 6, image: "/apps/le-bonhomme-pendu/entete.jpg", alt: "Pendu en partie : cases « _ A _ _ E », clavier A à Z, scène « VIDANGES », erreurs 1 sur 10" },
  { title: "Montgolfière — grimpe entre les orages", file: "/apps/montgolfiere/montgolfiere-v1.0.html", copy: "Jeu d'adresse gratuit : grimpe toujours plus haut en montgolfière, entre les orages et les éclairs.", tag: "Adresse · Montgolfière et orages", mono: "MG", art: 2, image: "/apps/montgolfiere/entete.jpg", alt: "Montgolfière rayée rouge et verte en vol, ciel bleu nuageux, altitude 24 m" },
  { title: "Pop Ballons — 60 secondes de combos", file: "/apps/pop-ballons/pop-ballons-v1.0.html", copy: "Jeu de rapidité gratuit : 60 secondes, des combos, et une frénésie finale.", tag: "Rapidité · Ballons et combos", faits: "Parties de 60 secondes", mono: "PB", art: 5, image: "/apps/pop-ballons/entete.jpg", alt: "Ballons colorés qui montent, ballon « 45 », ballons noirs à croix rouge" },
  { title: "2 vérités, 1 mensonge", file: "/apps/2-verites-1-mensonge/2-verites-1-mensonge-v2.0.html", copy: "Jeu quiz et de déduction gratuit : 330 manches pour démasquer le mensonge — historique, inusité, cocasse.", tag: "Quiz · Vérités et mensonge", faits: "Pour les curieux de 7 à 107 ans · Histoire 110 · Insolite 110 · Cocasse 110 · Total 330", mono: "2V", art: 7, image: "/apps/2-verites-1-mensonge/entete.jpg", alt: "Quiz : 3 affirmations sur Agnes Macphail, numéro 2 marquée mensonge, « Bravo, c'était bien le mensonge ! », score 1" },
  { title: "Chat'attaque — tower defense de chats", file: "/apps/chat-attaque/chat-attaque-v1.2.html", copy: "Jeu de stratégie gratuit, tower defense avec des chats : 9 chats-tours défendent 50 croquettes, 12 cartes labyrinthe, 3 difficultés, solo et multijoueur local.", tag: "Stratégie · Tower defense de chats", faits: "Solo ou 2 joueurs local · 12 cartes · 3 difficultés", mono: "CA", art: 2, image: "/apps/chat-attaque/entete.jpg", alt: "Tower defense : chemin sinueux, chats ennemis, gamelle « MIAM », « Tempête : Gros matou »", imageRatio: "16:9" },
  { title: "NORD 2087 — La Ligne de Glace", file: "/apps/nord-2087/nord-2087-v1.1.html", copy: "Jeu de stratégie et de science-fiction gratuit : en 2087, dessine ton labyrinthe et défends le Cœur du réseau contre la Horde — douze vagues, une tempête qui peut tout changer.", tag: "Stratégie · Tower defense futuriste", faits: "Solo · 12 vagues", mono: "87", art: 7, image: "/apps/nord-2087/entete.jpg", alt: "Ligne de Glace : grille bleu nuit, trajectoire pointillée orange vers une cible rouge" },
  { title: "Chevalier du fleuve — stratégie et histoire vraie", file: "/apps/chevalier-du-fleuve/chevalier-du-fleuve-v1.4.html", copy: "Jeu de stratégie en temps réel gratuit : refais la campagne vraie de Pierre Le Moyne d'Iberville — bâtis, lève ton armée, prends les forts de la baie James, défends Québec, coule la flotte à bord du Pélican. Et sur les berges, la légende des nains albinos des terriers et leur Forge des Rois Gybbys…", tag: "Stratégie · Temps réel · Histoire vraie", faits: "12 ans et plus · Campagne 1686-1699 + mode libre · Gratuit en entier — pierres précieuses gagnées en jouant", mono: "CF", art: 7, image: "/apps/chevalier-du-fleuve/entete.jpg", alt: "Carte stratégique verte, littoral, postes et unités, barre de ressources, panneau « Ordres », objectifs" },
  { title: "IGLOO — La guerre des igloos", file: "/apps/igloo/igloo-v1.0.html", copy: "Jeu de stratégie en arène gratuit : bataille de boules de neige — déploie tes cartes, défends ton igloo et fais tomber celui d'en face. Chaque bataille tire une loi du quartier au hasard !", tag: "Stratégie · Bataille de boules de neige", faits: "Campagne de 10 batailles · parties d'environ 3 minutes", mono: "IG", art: 7, image: "/apps/igloo/entete.jpg", alt: "Arène verticale « IGLOO ENNEMI » et « TON IGLOO », bonhomme de neige au centre" },
  { title: "Que vois-tu ? — jeu de perception", file: "/apps/que-vois-tu/que-vois-tu-v2.0.html", copy: "Jeu de perception gratuit, pour toute la famille : dis ce que tu vois en premier dans chaque image — il n'y a pas de mauvaise réponse.", tag: "Perception · Ce que tu vois d'abord", faits: "42 défis · 3 terrains : Jeunesse, Ado, Adulte", mono: "QV", art: 4, image: "/apps/que-vois-tu/entete.jpg", alt: "Prairie ensoleillée, 3 fleurs, papillon orange caché, consigne « Un papillon se cache dans le pré… »" },
  { title: "Tapinoue — aventure jeunesse", file: "/apps/tapinoue/tapinoue-v2.0.html", copy: "Jeu d'aventure jeunesse gratuit : les aventures de Tapinoue et de sa famille, en 4 tableaux qui se débloquent un à un — la rencontre, le terrier, le potager de M. Grincheux… et le renard qui rôde.", tag: "Aventure · Jeunesse en 4 tableaux", faits: "4 tableaux · progression sauvegardée", mono: "TP", art: 1, image: "/apps/tapinoue/entete.jpg", alt: "Lapin blanc dans son terrier à nettoyer, toiles d'araignée, épluchures, seau, consigne « 1. Un terrier propre », barre 0 %" },
  { title: "Ton chum frotte son char plus que toi !", file: "/apps/ton-chum-frotte-son-char/ton-chum-frotte-son-char-v2.0.html", copy: "Jeu ASMR gratuit : le vrai job d'esthétique automobile, du bout des doigts — choisis ton véhicule et frotte, roues, lavage, argile, cire, jusqu'à ce qu'il brille. Mets le son !", tag: "ASMR · Esthétique automobile", faits: "4 véhicules · 8 étapes du métier", mono: "TC", art: 2, image: "/apps/ton-chum-frotte-son-char/entete.jpg", alt: "Les 4 roues du char à frotter : avant gauche, avant droite" },
  { title: "Conception de molécules 3D", file: "/apps/conception-de-molecules-3d/conception-de-molecules-3d-v2.0.html", copy: "Jeu de sciences 3D gratuit : un labo pour explorer l'ADN et fabriquer des remèdes, avec des missions sur de vraies molécules (aspirine, caféine, insuline…), en 4 niveaux.", tag: "Sciences · Molécules et ADN", faits: "4 niveaux · d'enfant à très avancé", mono: "M3", art: 3, image: "/apps/conception-de-molecules-3d/entete.jpg", alt: "Labo « Crée ton remède générique », grilles d'atomes C, O, H et N, microbe du rhume, défi 1 sur 3" },
  { title: "L'hydroélectricité, comment ça marche", file: "/apps/hydro-electricite/hydro-electricite-v1.1.html", copy: "Jeu éducatif gratuit : visite guidée d'une centrale hydroélectrique québécoise en suivant une goutte d'eau — barrage, turbine, alternateur… jusqu'à ta maison.", tag: "Éducatif · Centrale hydroélectrique", faits: "7 stations · pensée pour partir de zéro", mono: "HY", art: 0, image: "/apps/hydro-electricite/entete.jpg", alt: "Dialogue de Nadia, schéma barrage, réservoir et rivière, consigne « ouvre les vannes », curseur de débit" },
  { title: "Anxiété, le jeu", file: "/apps/anxiete-le-jeu/anxiete-le-jeu-v1.1.html", copy: "Jeu de sensibilisation gratuit : une semaine dans la peau d'Alex, qui vit avec un trouble anxieux — météo intérieure, pensées qui envahissent et outils réels pour traverser. Ce jeu ne pose pas de diagnostic.", tag: "Sensibilisation · Santé mentale", faits: "5 journées · ressources 811 et 988 incluses", mono: "AX", art: 5, image: "/apps/anxiete-le-jeu/entete.jpg", alt: "Jour 1 « Se préparer et déjeuner », préparer la table 1 sur 5, bulles de pensées anxieuses, énergie 90 %" },
  { title: "Votre IA parle-t-elle québécois?", file: "/apps/votre-ia-parle-t-elle-quebecois/votre-ia-parle-t-elle-quebecois-v1.html", copy: "Jeu gratuit : donne 20 expressions québécoises à ton assistant, colle sa réponse, et la page la note dans ton navigateur. Modes complet, express et duel, carte de résultat à copier, rien n'est envoyé.", tag: "Québécois · IA et expressions", faits: "20 expressions · 3 modes · carte de résultat", mono: "IA", art: 0, image: "/apps/votre-ia-parle-t-elle-quebecois/entete.jpg", alt: "Liste des 20 expressions québécoises, bouton « Copier la question »" },
  { title: "La Slalomeuse de nids-de-poule", file: "/apps/slalomeuse/index.html", copy: "Jeu d'arcade gratuit, slalom québécois : glisse entre les nids-de-poule, 3 roues, parties d'environ 1 minute.", tag: "Arcade · Slalom québécois", faits: "Parties d'environ 1 minute · 3 roues", mono: "SL", art: 0, image: "/apps/slalomeuse/entete.jpg", alt: "Route à 3 voies, cône orange, nid-de-poule, petite voiture jaune, score 31, mètres 31" },
  { title: "Sur l'herbe — La colonie", file: "/apps/sur-lherbe/sur-lherbe-v1.0.html", copy: "Jeu de stratégie gratuit : mène ta colonie sous l'herbe — Fourmis, Abeilles ou Araignées, 3 tableaux de 6 à 8 vagues, boutique en ambre gagnée en jeu.", tag: "Stratégie · Colonie sous l'herbe", faits: "3 factions · 3 tableaux · 6 à 8 vagues", mono: "SH", art: 0, image: "/apps/sur-lherbe/entete.jpg", alt: "Pelouse avec fourmis rouges, marguerites, feuilles et fourmilière, HUD vague 0 sur 6" },
  { title: "Pète et Répète", file: "/apps/pete-et-repete/pete-et-repete-v1.0.html", copy: "Jeu de course gratuit : tape les mots, lettre par lettre, pour faire péter ton bateau et battre Répète jusqu'à la bouée des 300 m. 3 mots parfaits d'affilée = SUPER PET !", tag: "Course · Mots à taper", faits: "300 m · mots français · clavier ou tactile", mono: "PR", art: 0, image: "/apps/pete-et-repete/entete.jpg", alt: "Course de canots sur le lac, mot à taper « THÉ », clavier de lettres" },
  { title: "Bataille d'aura — Sir H. Gepeto", file: "/apps/bataille-aura-magic/bataille-aura-magic-v1.0.html", copy: "Duel de magie gratuit : Sir H. Gepeto, en armure et marionnette à fils, défend sa scène contre 14 duellistes. Touche pour un petit sort, maintiens pour charger, relâche à MAX pour le gros sort !", tag: "Duel · 14 actes", faits: "14 actes · 3 auras · charge à MAX", mono: "MA", art: 0, image: "/apps/bataille-aura-magic/entete.jpg", alt: "Théâtre : Sir H. Gepeto, 100 PV, contre Pierrot le Mime, 60 PV, boutons Feu, Eau et Nature" },
];

// Compteur option B : Mini-jeux HP compte pour 3 jeux (1 tuile, 3 jeux) — source unique du chiffre public.
const JEUX_JOUABLES = GAMES.length + 2;

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
const hrefJeu = (g: GameEntry) => `/apps/${g.slug ?? slugDepuisFichier(g.file)}`;

const GENRES = ["Tous", ...Array.from(new Set(GAMES.map((g) => g.tag.split(" · ")[0])))];

const FILTER_BTN_STYLE: CSSProperties = {
  font: "inherit",
  fontSize: 13,
  fontWeight: 800,
  letterSpacing: ".02em",
  padding: "7px 14px",
  borderRadius: 999,
  border: "1.5px solid rgba(247,243,234,.5)",
  background: "transparent",
  color: "#f7f3ea",
  cursor: "pointer",
};

const FILTER_BTN_ACTIVE_STYLE: CSSProperties = {
  ...FILTER_BTN_STYLE,
  background: "#00e5ff",
  color: "#0f0f1a",
  borderColor: "#00e5ff",
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

/* ── Tampons des testeurs — RETRAIT DES NOMS, 2 nov. 2026 (GO HP) : consentement écrit des parents non trouvé à la tête, noms retirés, couleurs et approbations conservées, tampons neutres « Approuvé par un testeur ». Réversible seulement sur preuve écrite.
   Décision d'origine, 23 oct. 2026, 08 h 18 :
   « Oui — les tampons au site, noms + couleurs ») ──────────────────
   Source de vérité : le registre des approbations rapportées par la direction
   le 22 oct. 2026, 21 h 31 (approbations-joueurs-2026-10-22.md).
   Chaque testeur a SA couleur ; les noms sont les prénoms/surnoms du
   registre, affichés tels quels. La couleur de Lo n'est pas précisée
   au registre : son tampon est posé en neutre, sans rien inventer.
   « Fusion Shop », approuvé par Mel au registre, n'existe pas (encore)
    Ajout du 23 oct. 2026, 20 h 35 : tampon JAUNE — jaune profond #8A6D00, lisible sur fond crème
   2 vérités 1 mensonge (en plus du mauve de Mel) et LA BANQUE
   (premier tampon du jeu). */
const TESTEURS = {
  louka: { nom: "Testeur vérifié", couleur: "#2e7d32", fond: "rgba(46,125,50,.10)", rotation: -1.4 },
  maeva: { nom: "Testeur vérifié", couleur: "#23201c", fond: "rgba(35,32,28,.07)", rotation: 1 },
  mel: { nom: "Testeur vérifié", couleur: "#7b2d8b", fond: "rgba(123,45,139,.09)", rotation: -0.8 },
  lo: { nom: "Testeur vérifié", couleur: "#0F6CA8", fond: "rgba(15,108,168,.10)", rotation: 1.3 },
  oz: { nom: "Testeur vérifié", couleur: "#8A6D00", fond: "rgba(138,109,0,.10)", rotation: -0.5 },
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
          : "Approuvé par un testeur HP"
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
          2026, 19 h 18) — avant, il ne vivait que dans le title/aria,
          invisibles au tactile. Les couleurs sont inchangées. */}
      {cle === "hp" ? "Créateur : HP" : "Approuvé par un testeur"}
    </span>
  );
}

/* Pastille testeur ×2 — correctif P1, 6 nov. 2026 : UNE seule pastille par
   tuile. Avant, chaque testeur de APPROBATIONS rendait SA pastille avec le
   libellé complet « Approuvé par un testeur », donc 2 pastilles identiques
   côte à côte pour les jeux approuvés par 2 testeurs (2 vérités : mel+oz,
   Tir de Boules de Neige : maeva+lo, Montgolfière : louka+maeva).
   On n'affiche que le premier testeur du registre (ordre inchangé) : la
   pastille garde son ✓ et sa couleur. Les autres approbations restent
   dans APPROBATIONS (source de vérité intacte) et chaque testeur garde
   sa pastille dans la légende « Approuvés par nos joueurs » ci-dessous,
   qui n'utilise pas ce composant. */
function RangeeTampons({ slug, grand }: { slug: string; grand?: boolean }) {
  const cles = APPROBATIONS[slug];
  if (!cles || cles.length === 0) return null;
  return (
    <div
      aria-label={
        cles.length === 1 && cles[0] === "hp"
          ? "Créateur : HP"
          : "Approuvé par des testeurs HP"
      }
      style={{ display: "flex", flexWrap: "wrap", gap: 7, alignItems: "center" }}
    >
      <PastilleTampon cle={cles[0]} grand={grand} />
    </div>
  );
}

function JeuxPage() {
  const featured = GAMES.find((g) => g.title === "2 vérités, 1 mensonge") ?? GAMES[0];
  const [genre, setGenre] = useState("Tous");
  /* Lot /jeux façon Friv : recherche dans les titres + descriptions.
     Normalisation sans accents pour que « reflexes » trouve « réflexes ». */
  const [recherche, setRecherche] = useState("");
  const normaliser = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  const rechercheNorm = normaliser(recherche.trim());
  const correspondRecherche = (g: GameEntry) =>
    rechercheNorm === "" ||
    normaliser(g.title + " " + g.copy).includes(rechercheNorm);
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
    const slug = g.slug ?? slugDepuisFichier(g.file);
    return {
      slug,
      titre: g.title,
      favori: favoris.includes(slug),
      dejaDonne: donnes.includes(slug),
      total: compteurs ? compteurs[slug] ?? 0 : undefined,
      onBasculer: basculerCoeur,
    };
  };

  const baseVisible = (
    genre === "Tous"
      ? GAMES
      : GAMES.filter((g) => g.tag.split(" · ")[0] === genre)
  ).filter(correspondRecherche);
  /* Ordre fixe (lot /jeux façon Friv) : l'ordre du tableau GAMES, sans tri
     par popularité — la carte vedette reste affichée au-dessus de la grille,
     même quand un filtre ou une recherche est actif. */
  const visibleGames = baseVisible.filter((g) => g.title !== featured.title);
  const vedetteVisible =
    (genre === "Tous" ||
      featured.tag.split(" · ")[0] === genre) &&
    correspondRecherche(featured);
  const filtreActif = genre !== "Tous" || rechercheNorm !== "";
  const nombreResultats =
    visibleGames.length + (vedetteVisible ? 1 : 0);
  /* Comptes des filtres (lot /jeux façon Friv) : calculés sur GAMES, donc
     conformes à la liste exacte approuvée — Tous (57), Quiz (3), etc.
     La carte vedette compte dans son genre quand elle correspond. */
  const compterGenre = (g: string) =>
    g === "Tous"
      ? JEUX_JOUABLES
      : GAMES.filter((x) => x.tag.split(" · ")[0] === g).length;
  return (
    <div className="page-jeux-arcade">
      <section id="sec-jeux" className="editorial-hero hero-banner-image jeux-hero">
        <div className="container">
          <span className="editorial-kicker">Jeux HP</span>
          <h1>Jouer, choisir, <em>essayer autrement</em>.</h1>
          {/* Lot /jeux façon Friv (phrase d'accueil approuvée, en vous — option B :
              la page en vous, les contenus de jeux en tu) */}
          {/* Nuit 4A : la valeur (gratuits, sans compte, sans pub) en première phrase — textes inchangés, ordre seul. */}
          <p className="lead">Jeux gratuits, sans compte, sans pub — choisissez et jouez tout de suite.</p>
          <p className="lead" style={{ marginTop: 10 }}>Des jeux courts et des histoires interactives pour exercer ses réflexes, imaginer la suite et apprendre sans pression.</p>
          <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.55, marginTop: 14, maxWidth: 700 }}>« J'ai jamais su qui j'étais ni ce que j'aimais. Alors je fais un peu de tout — et j'en ai fait des jeux pour la vraie vie. » — HP</p>
          <div className="lead-actions">
            <a className="btn-primary" href="/apps/bons-reflexes">Jouer aux Bons réflexes d'HP</a>
            <a className="btn-ghost" href="#tous-les-jeux">Voir tous les jeux</a>
            <ShareButton text="Des jeux gratuits, sans inscription, à jouer dans ton navigateur — HP Outils. T'es pas game de l'essayer ?" />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 26 }}>
            {/* Compteur option B (Mini-jeux HP = 3 jeux) : 57 jeux + 1 caché, non nommé — le Panier Solidaire reste visible (section cuisine) mais ne compte plus dans le chiffre */}
            <span style={CHIP_STYLE}>{JEUX_JOUABLES} + 1 caché</span>
            <span style={CHIP_STYLE}>Sans inscription</span>
            <span style={CHIP_STYLE}>Jouables dans votre navigateur</span>
          </div>
          <p style={{ fontSize: 14, marginTop: 10 }}>57 jeux à jouer, plus 1 caché quelque part. La tuile Mini-jeux HP en cache 3 à elle seule.</p>
        </div>
      </section>

<section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">À jouer maintenant</span>
          <h2 className="section-title">Les jeux HP</h2>
          <div className="pillar-grid">
            <article className="pillar-card" style={{ padding: "22px 24px" }}>
              <span className="pillar-num">01</span>
              <h3>Les bons réflexes d'HP</h3>
              <p>Des situations de cuisine, de maison, d'entraide, d'émotions et de sécurité. Gratuit, sans inscription.</p>
              <a className="pillar-cta" href="/apps/bons-reflexes">Jouer maintenant →</a>
            </article>
            <article className="pillar-card" style={{ padding: "22px 24px" }}>
              <span className="pillar-num">02</span>
              <h3>Mystères du Nord</h3>
              <p>Sept enquêtes de déduction dans le Nord : explore les lieux, interroge les suspects, trouve les indices et démasque le coupable.</p>
              <a className="pillar-cta" href="/apps/mysteres-du-nord">Jouer maintenant →</a>
            </article>
            <article className="pillar-card" style={{ padding: "22px 24px" }}>
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
          <p style={{ textAlign: "center", maxWidth: 620, margin: "-6px auto 34px", color: "rgba(247,243,234,.78)", fontSize: 16, lineHeight: 1.55 }}>
            Touchez ou cliquez sur une tuile et jouez tout de suite : rien à installer, rien à payer.
          </p>
          <div style={{ display: "flex", justifyContent: "center", margin: "0 auto 16px", maxWidth: 520 }}>
            <input
              type="search"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Chercher un jeu…"
              aria-label="Chercher un jeu par mot-clé, dans les titres et les descriptions"
              style={{ width: "100%", font: "inherit", fontSize: 15, padding: "10px 16px", borderRadius: 999, border: "1.5px solid rgba(0,229,255,.45)", background: "rgba(247,243,234,.06)", color: "#f7f3ea" }}
            />
          </div>
          <div role="group" aria-label="Filtrer les jeux par genre" style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 900, margin: "0 auto 30px" }}>
            {GENRES.map((g) => (
              <button
                key={g}
                type="button"
                aria-pressed={genre === g}
                onClick={() => setGenre(g)}
                style={genre === g ? FILTER_BTN_ACTIVE_STYLE : FILTER_BTN_STYLE}
              >
                {g} ({compterGenre(g)})
              </button>
            ))}
          </div>
          {favoris.length > 0 ? (
            <div aria-label="Vos favoris" style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", justifyContent: "center", maxWidth: 900, margin: "0 auto 26px" }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#ff8a7a" }}>♥ Vos favoris :</span>
              {favoris.map((slug) => {
                const g = GAMES.find((x) => (x.slug ?? slugDepuisFichier(x.file)) === slug);
                if (!g) return null;
                return (
                  <a key={slug} href={hrefJeu(g)} style={{ ...FILTER_BTN_STYLE, textDecoration: "none", display: "inline-block" }}>
                    {g.title}
                  </a>
                );
              })}
            </div>
          ) : null}
          {/* Lot /jeux façon Friv : ordre fixe, sans tri par popularité.
              Le tri « Les plus aimés » du lot décisions est retiré ici :
              un ordre par popularité serait de la rétention déguisée.
              Les cœurs et les favoris, eux, restent (boutons par tuile). */}
          <div className="pillar-grid">
            {/* Lot /jeux façon Friv : la carte vedette suit le filtre et la
                recherche comme les autres jeux — visible quand elle
                correspond, masquée sinon (sinon un filtre afficherait
                un jeu hors catégorie). */}
            {vedetteVisible ? (
            <article className="pillar-card" style={{ gridColumn: "1 / -1", padding: 0, overflow: "hidden", flexDirection: "row", flexWrap: "wrap", gap: 0 }}>
              <a
                href={hrefJeu(featured)}
                aria-label={"Jouer à " + featured.title}
                style={featured.image ? { flex: "1 1 260px", minHeight: 230, display: "block", textDecoration: "none", padding: 0, overflow: "hidden", position: "relative" } : { ...tileBackground(featured), flex: "1 1 260px", minHeight: 230, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, textDecoration: "none", padding: "18px 14px" }}
              >
                {featured.image ? (
                  <img src={featured.image} alt={featured.alt ?? ("Image du jeu " + featured.title + " en action")} loading="lazy" width={960} height={featured.imageRatio === "16:9" ? 540 : 720} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <>
                    <span aria-hidden="true" style={{ fontFamily: "Georgia, serif", fontSize: 118, lineHeight: 1, color: "#f6eddd", textShadow: "0 12px 30px rgba(0,0,0,.45)", letterSpacing: ".01em" }}>
                      {featured.mono}
                    </span>
                    <span style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.25, color: "#f6eddd", textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,.5)" }}>
                      {featured.title}
                    </span>
                  </>
                )}
              </a>
              <div style={{ flex: "2 1 320px", padding: "30px 32px", display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
                <h3 style={{ fontSize: 34 }}>{featured.title}</h3>
                <span style={TAG_ON_PAPER_STYLE}>{featured.tag}</span>
                <p>{featured.copy}</p>
                {"faits" in featured && featured.faits ? <p className="workshop-meta">{featured.faits}</p> : null}
                <RangeeTampons slug={featured.slug ?? slugDepuisFichier(featured.file)} />
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <a className="btn-primary" href={hrefJeu(featured)}>Jouer maintenant</a>
                  <BoutonCoeur {...etatCoeur(featured)} />
                </div>
              </div>
            </article>
            ) : null}

            {visibleGames.map((game) => (
              <article className="pillar-card" key={game.title} style={{ padding: 0, overflow: "hidden", gap: 0 }}>
                <a href={hrefJeu(game)} aria-label={"Jouer à " + game.title} style={{ display: "block", textDecoration: "none" }}>
                  {game.image ? (
                    <div style={{ position: "relative" }}>
                      <img src={game.image} alt={game.alt ?? ("Image du jeu " + game.title + " en action")} loading="lazy" width={960} height={game.imageRatio === "16:9" ? 540 : 720} style={{ display: "block", width: "100%", height: "auto", aspectRatio: game.imageRatio === "16:9" ? "16 / 9" : "4 / 3", objectFit: "cover", borderBottom: "3px solid rgba(0,229,255,.45)" }} />
                      <span style={TAG_ON_TILE_STYLE}>{game.tag}</span>
                    </div>
                  ) : (
                    <div style={{ ...tileBackground(game), minHeight: 148, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 7, position: "relative", padding: "16px 14px 30px" }}>
                      <span aria-hidden="true" style={{ fontFamily: "Georgia, serif", fontSize: 52, lineHeight: 1, color: "#f6eddd", textShadow: "0 8px 22px rgba(0,0,0,.42)" }}>
                        {game.mono}
                      </span>
                      <span style={{ fontSize: 14.5, fontWeight: 800, lineHeight: 1.25, color: "#f6eddd", textAlign: "center", textShadow: "0 2px 8px rgba(0,0,0,.5)" }}>
                        {game.title}
                      </span>
                      <span style={TAG_ON_TILE_STYLE}>{game.tag}</span>
                    </div>
                  )}
                </a>
                <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  <h3 style={{ fontSize: 23 }}>{game.title}</h3>
                  <p>{game.copy}</p>
                  {"faits" in game && game.faits ? <p className="workshop-meta">{game.faits}</p> : null}
                  <RangeeTampons slug={game.slug ?? slugDepuisFichier(game.file)} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginTop: "auto" }}>
                    {/* Lot /jeux façon Friv : bouton « Jouer » net par tuile —
                        un geste = le jeu se lance (même lien qu'avant). */}
                    <a className="btn-primary" href={hrefJeu(game)} aria-label={"Jouer à " + game.title} style={{ fontSize: 14, padding: "9px 18px" }}>▶ JOUER</a>
                    <BoutonCoeur {...etatCoeur(game)} />
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p style={{ textAlign: "center", color: "#ffd21f", fontSize: 13, fontWeight: 900, letterSpacing: ".3em", margin: "26px auto 0" }}>INSERT COIN · c'est gratuit</p>
          {/* Lot /jeux façon Friv : compteur de résultats et zéro honnête,
              affichés seulement quand un filtre ou une recherche est actif. */}
          {filtreActif && nombreResultats === 0 ? (
            <p style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 10px", color: "rgba(247,243,234,.78)", fontSize: 16, lineHeight: 1.55 }}>
              Aucun jeu trouvé pour cette recherche.{" "}
              <button
                type="button"
                onClick={() => { setGenre("Tous"); setRecherche(""); }}
                style={{ ...FILTER_BTN_STYLE, marginLeft: 6 }}
              >
                Effacer les filtres
              </button>
            </p>
          ) : null}
          {filtreActif && nombreResultats > 0 ? (
            <p style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 10px", color: "rgba(247,243,234,.78)", fontSize: 15, lineHeight: 1.55 }}>
              {nombreResultats} jeu{nombreResultats > 1 ? "x" : ""} trouvé{nombreResultats > 1 ? "s" : ""}.{" "}
              <button
                type="button"
                onClick={() => { setGenre("Tous"); setRecherche(""); }}
                style={{ ...FILTER_BTN_STYLE, marginLeft: 6 }}
              >
                Effacer les filtres
              </button>
            </p>
          ) : null}
        </div>
      </section>

<section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Aussi dans En cuisine</span>
          <h2 className="section-title">Le Panier Solidaire, <em>là où on cuisine</em></h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>Le Panier Solidaire</h3>
              <span style={{ ...CHIP_STYLE, alignSelf: "flex-start" }}>Jouable</span>
              <p>Aussi dans En cuisine — découvre le jeu là où on cuisine.</p>
              <a className="pillar-cta" href="/en-cuisine/index.html#panier-solidaire">Jouer dans En cuisine →</a>
            </article>
          </div>
        </div>
      </section>

<section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Bientôt — à découvrir</span>
          <h2 className="section-title">Ton jeu à toi, <em>en 30 secondes</em></h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>Ton jeu à toi, en 30 secondes</h3>
              <p>Un jeu de course personnalisé : votre prénom, un thème au choix, 30 secondes au doigt. L'aperçu gratuit est jouable dès maintenant — prix prévu : 5 $, aucune taxe ajoutée. Aucun achat possible pour l'instant.</p>
              <a className="pillar-cta" href="/ton-jeu-a-toi">Essayer l'aperçu gratuit →</a>
            </article>
          </div>
        </div>
      </section>

<section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Pour votre commerce</span>
          <h2 className="section-title">Un jeu <em>à votre image</em></h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>Votre commerce, votre jeu</h3>
              <p>Un petit jeu aux couleurs de votre commerce, que vos clients jouent, partagent et retiennent. De 19 $ à 399 $, hébergement gratuit la première année, puis 29 $ par année, par jeu hébergé, aucune taxe ajoutée. Service sur mesure — ce n&apos;est pas un jeu gratuit de la liste ci-dessus, et il ne change pas le compteur des jeux gratuits.</p>
              <Link to="/jeux-a-votre-image" className="pillar-cta">Voir l&apos;offre →</Link>
            </article>
          </div>
        </div>
      </section>

<section className="three-pillars">
        <div className="container" style={{ maxWidth: 860 }}>
          <span className="editorial-kicker">Testés pour vrai</span>
          <h2 className="section-title">Approuvés par <em>nos joueurs</em></h2>
          <p style={{ textAlign: "center", maxWidth: 680, margin: "-6px auto 18px", color: "rgba(247,243,234,.78)", fontSize: 16, lineHeight: 1.6 }}>
            Avant d'arriver ici, les jeux HP passent entre les mains de vrais joueurs, testeurs et famille. Leur tampon
            « approuvé » ne s'achète pas et ne s'invente pas : il se mérite,
            partie par partie.
          </p>
          <p style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 22px", color: "rgba(247,243,234,.78)", fontSize: 16, lineHeight: 1.6 }}>
            Merci aux petits testeurs — à tous les enfants qui ont joué, testé, ri,
            et qui ont rendu ces jeux meilleurs, merci. Chaque testeur a son tampon
            et sa couleur, sans nom affiché :
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
              const g = GAMES.find((x) => (x.slug ?? slugDepuisFichier(x.file)) === slug);
              if (!g) return null;
              return (
                <li
                  key={slug}
                  style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", justifyContent: "center", textAlign: "center" }}
                >
                  <a
                    href={hrefJeu(g)}
                    style={{ color: "#f7f3ea", fontWeight: 700, fontSize: 15.5, textDecoration: "underline", textUnderlineOffset: 3 }}
                  >
                    {g.title}
                  </a>
                  {/* Pastille retirée ici (décision 6 nov. 2026, 11 h 37) :
                      une seule occurrence par jeu sur /jeux. La pastille
                      reste sur la tuile de la grille (ou la carte vedette) ;
                      cette liste ne fait que nommer les jeux approuvés, avec
                      leur lien. La légende des testeurs ci-dessus est
                      inchangée. */}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

<section className="collections-strip" id="a-toi-histoire">
        <div className="container">
          <span className="editorial-kicker">Histoires interactives</span>
          <h2>À toi <em>l'histoire</em></h2>
          <p className="strip-intro">La Chasse-Galerie gratuite · tomes standards 5 $ CAD · grands tomes 8 $ CAD. Aucune taxe ajoutée.</p>
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
              ["La Chasse-Galerie gratuite", "Commencer une histoire sans paiement et découvrir le principe des choix."],
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
          <h2>Les nouveaux jeux <em>à venir</em></h2>
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
          <span className="editorial-kicker">Découvrez aussi</span>
          <h2 className="section-title">Après le jeu, <em>le reste d'HP</em></h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>Les livres et les kits</h3>
              <p>Les histoires et les idées continuent en livres et en kits PDF, à petit prix.</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir les livres →</Link>
            </article>
            <article className="pillar-card">
              <h3>Les outils gratuits</h3>
              <p>Pour la vraie vie entre deux parties : Huit outils pour la vraie vie : préparer son héritage, trancher une décision, comprendre la paperasse, comparer les prix, préparer un appel difficile, savoir quelle démarche faire, garder ses codes en sécurité et suivre les promesses — qui doit quoi, pour quand.</p>
              <Link to="/outils" className="pillar-cta">Voir les outils →</Link>
            </article>
          </div>
        </div>
      </section>

      {/* Détectôt — bande statique RETIRÉE (6 nov. 2026, lot Détectôt
          permanent) : elle doublait le widget fixe HamsterWheel monté
          globalement dans __root.tsx, et les deux rendus du même texte
          se chevauchaient sur la page (photo d'HP, 6 nov.). Le texte
          reste sur /jeux via le widget fixe. Conséquence : la
          vérification S2 (source) ne trouvera plus le texte dans ce
          fichier ; elle doit être re-vérifiée en lecture du rendu. */}
    </div>
  );
}
