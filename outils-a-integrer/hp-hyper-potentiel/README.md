# Outil web « HP — Hyper potentiel » — EN ATTENTE D'INTÉGRATION (ne pas publier tel quel)

Déposé le 2026-10-22 sur le go d'Hugo. **Ce dossier n'est pas servi par le
site** : il est volontairement HORS de `public/` et hors des routes. Un
fichier déposé dans `public/` serait public immédiatement — ce n'est pas
le moment. Rien n'est en vente, rien n'est en ligne.

## Ce que c'est

`index.html` (fichier unique, ~40 Ko) = l'outil web **gratuit** « HP —
Hyper potentiel », compagnon du mini cahier du même nom (produit payant
à venir, 10 $ — entrée brouillon `MINI_CAHIER_DRAFT` dans
`src/lib/products-catalog.ts`).

Le principe d'Hugo : « un vend l'autre ». L'outil gratuit fait découvrir
et recrute ; le cahier vend la version complète, à travailler au crayon.

Contenu de l'outil (3 modules, une seule page) :

1. **Respire avec moi** — respiration guidée animée (soupir physiologique,
   cohérence 5 minutes à 6 respirations/min, respiration carrée).
2. **Ta carte ikigaï** — les 4 questions en format interactif, carte
   visuelle assemblée et phrase « Mon HP, c'est… ».
3. **Ton plan WOOP** — guidé en 4 étapes, carte plan finale, engagement
   doux de 7 jours à cocher.

Technique : 100 % local et hors ligne après chargement. **Aucune
requête externe** (aucune police, aucun script, aucun traqueur),
**aucun compte**, données uniquement dans le `localStorage` de
l'appareil de la personne (avec bouton « Tout effacer »). Aucune
dépendance à installer : le fichier se sert tel quel.

En bas de l'outil : l'encadré de vente du cahier (« Le mini cahier
complet — 10 $ sur hp-outils.com », texte seulement, aucun lien
d'achat pour l'instant) + la mention « Ce n'est pas un avis médical ».

## À la mise en ligne (après validation d'Hugo, en même temps que le cahier)

1. Servir l'outil à la route suggérée : **/outils/hp-hyper-potentiel**
   (même patron que les autres outils du site).
2. Brancher le lien croisé, côté outil : dans l'encadré « Le mini
   cahier complet » de `index.html`, pointer le texte vers la **fiche
   produit du cahier** une fois qu'elle existera (le prix de 10 $ dans
   l'encadré reste — décision d'Hugo du 2026-10-22 : c'est la surface
   de vente du cahier).
3. Brancher le lien croisé, côté fiche : la fiche produit du cahier
   (entrée `MINI_CAHIER_DRAFT` → `PRODUCTS`, voir le mode d'emploi en
   tête de ce tableau dans `products-catalog.ts`) pointera vers
   l'outil gratuit.
4. Ajouter la carte de l'outil à la page /outils, comme les autres
   outils gratuits.

## Publication du cahier (rappel, mêmes étapes que les outils papier)

1. Créer le produit + le prix dans Stripe avec le lookup_key proposé
   `hp_hyper_potentiel_cahier_pdf_10` (voir
   `feuille-stripe-outils-papier.md`, section « Mini cahier — Série
   HP ») et le reporter dans l'entrée du catalogue.
2. Téléverser le PDF du cahier (20 pages, couverture intégrée p. 1)
   dans le bucket `pdfs`.
3. Déplacer l'entrée de `MINI_CAHIER_DRAFT` vers `PRODUCTS`.
