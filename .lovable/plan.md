## Objectif

Transformer la maquette actuelle en un vrai site HTML structuré, mobile, lisible et crédible — selon le plan détaillé en 8 étapes. Travail uniquement frontend (présentation, routes, contenu). Les paiements Stripe, le téléchargement PDF tokenisé et la collection Sans Honte restent intacts.

## Étape 1 — Homepage (`src/routes/index.tsx`) refaite en 7 blocs

1. **Hero HP** — titre « HP — des outils pour la vraie vie », sous-titre « Comprendre. Agir. Transmettre. », 3 boutons : *Explorer les contenus* → `/livres-pdf`, *Voir les outils Sans Honte* → `/sans-honte`, *Découvrir l'univers HP* → `/univers`.
2. **Contenus** — 3 cartes : Les enjeux de l'humanité, La faim justifie les moyens, Les enfants cuisinent — CTA vers `/livres-pdf`.
3. **Outils Sans Honte** — 3 cartes principales : Frigo, Me reconnaître, Fraude. Mention « autres kits en déploiement ».
4. **Univers alternatif** — 3 cartes : PH Déséquilibré, Famille atypique, Humain imparfait → `/univers`.
5. **Ateliers et collaborations** — 3 cartes (cuisine, IA, BD HP) → `/collaborer`.
6. **Contact / infolettre** — bloc avec courriel `hpoutils.admin@gmail.com`, boutons *Me contacter* / *Recevoir les nouvelles HP*.
7. **Footer** — déjà existant, ajusté.

Texte réduit de ~30 %, vrais éléments HTML sémantiques (h2/h3/p/a), pas d'images-zones-cliquables.

## Étape 2 — Navigation

- **Header desktop** : Accueil · Contenus · Outils · Univers · Collaborer · À propos · Contact
- **Mobile** (hamburger) : Accueil · Contenus · Outils · Univers · Contact · Collaborer · À propos
- Mapping : Contenus = `/livres-pdf`, Outils = `/sans-honte` (la collection principale), Univers = nouvelle route `/univers`, Collaborer = `/ateliers` renommé en `/collaborer`, Contact = `/contact`.

## Étape 3 — Nouvelles routes & ajustements

- **Créer `src/routes/univers.tsx`** — page Univers alternatif avec hero, intro, sections BD / Musique / Personnages. Réutilise contenu existant de `/album` et `/reflexions` pour PH/Humain imparfait/Famille atypique.
- **Créer `src/routes/collaborer.tsx`** — fusion/réécriture de l'actuel `/ateliers` avec les 3 cartes (cuisine, IA, BD HP), CTAs vers Tally/contact existants.
- **Garder `/ateliers`** comme alias-redirect vers `/collaborer` (ou simple lien) pour ne pas casser les liens existants.
- **Footer (`SiteFooter.tsx`)** : reorg liens selon la nouvelle architecture, courriel uniformisé en minuscules `hpoutils.admin@gmail.com`.

## Étape 4 — Header (`SiteHeader.tsx`)

Réécrire la liste `NAV` selon le nouvel ordre. Pas de changement structurel du composant.

## Hors scope (à ne pas toucher dans cette itération)

- Paiements Stripe, téléchargement PDF tokenisé, filigrane (déjà en place).
- Pages `/sans-honte`, `/achat/$slug`, `/checkout/return`, `/recuperer-achat` (déjà refaites récemment).
- Renommage physique des fichiers PDF dans le bucket Supabase (déjà uploadés sous des noms fixes — renommer casserait le téléchargement).
- Lancement / publications réseaux (étape opérationnelle pour Mélanie, pas du code).
- Création d'un système d'infolettre (le bouton pointera vers Tally / contact existant — pas de nouvelle intégration mail).

## Plan technique

Fichiers à modifier :
- `src/routes/index.tsx` — réécriture complète des 7 sections
- `src/components/SiteHeader.tsx` — nouvelle liste NAV
- `src/components/SiteFooter.tsx` — liens + courriel
- `src/routes/ateliers.tsx` — devient un simple lien/redirect vers `/collaborer` (ou contenu identique conservé)

Fichiers à créer :
- `src/routes/univers.tsx`
- `src/routes/collaborer.tsx`

Le CSS existant (`src/styles/hp.css`) sera réutilisé : `editorial-hero`, `three-pillars`, `pillar-card`, `collections-strip`, etc. J'ajouterai au besoin quelques classes pour les nouvelles grilles (cartes contenus, cartes univers).

## Confirmation demandée

1. OK pour créer `/univers` et `/collaborer` (et laisser `/ateliers` rediriger vers `/collaborer`) ?
2. Le bouton « Recevoir les nouvelles HP » pointe vers ton Tally existant (`https://tally.so/r/Pd8YeV`) ou vers `/contact` ? (pas d'intégration infolettre nouvelle dans cette itération)
3. Pour la section Univers, on garde aussi les pages séparées existantes (`/album`, `/reflexions`) ou on les fait pointer vers `/univers` ?
