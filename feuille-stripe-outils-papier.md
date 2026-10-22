# Feuille de création Stripe — Collection « Outils papier » (16 produits)

Préparée le 2026-10-21. **Aucun produit Stripe n'a été créé** : cette feuille sert à créer les 16 produits/prix dans Stripe, un par un, après validation d'Hugo produit par produit. La publication/activation reste chez Mélanie.

## Comment reporter dans le site

Dans ce dépôt, le champ `priceId` de `src/lib/products-catalog.ts` est en fait le **lookup_key** Stripe du prix : le serveur le résout avec `stripe.prices.list({ lookup_keys: [...] })` (voir `src/utils/payments.functions.ts`). Ce n'est **pas** l'identifiant `price_…` généré par Stripe.

Pour chaque produit, après création dans Stripe :

1. Donner au **prix** Stripe le lookup_key proposé ci-dessous (ou, s'il diffère, reporter le lookup_key réellement créé).
2. Reporter ce lookup_key dans `products-catalog.ts` : comme **clé** de l'entrée dans `PRODUCTS` et comme valeur de son champ `priceId`, en déplaçant l'entrée depuis le tableau brouillon `PAPER_TOOLS_DRAFT` (voir le mode d'emploi en tête de ce tableau dans le fichier).
3. Téléverser le fichier PDF de vente (couverture + pages de contenu) dans le bucket `pdfs` et reporter son chemin dans `pdfPath`.
4. Vérifier le `tax_code` du produit dans Stripe, comme pour les produits existants (biens numériques — voir le commentaire dans `payments.functions.ts`).

Devise pour les 16 prix : **CAD**. Mention à garder partout : « Aucune taxe ajoutée — petit fournisseur ».

## Fiche pratique — 2,00 $ CAD

| Nom Stripe proposé | Prix (CAD) | Catégorie | Description courte (= accroche) | lookup_key proposé → price_id à reporter dans products-catalog.ts |
|---|---|---|---|---|
| Le Code familial anti-clone | 2,00 $ | Fiche pratique | Un mot de passe que seuls les vrais membres de ta famille connaissent. | `outil_papier_code_familial_anti_clone_pdf_2` |

## Outils thématiques — 5,00 $ CAD

| Nom Stripe proposé | Prix (CAD) | Catégorie | Description courte (= accroche) | lookup_key proposé → price_id à reporter dans products-catalog.ts |
|---|---|---|---|---|
| Mes repas, mon épicerie | 5,00 $ | Outil thématique | Le souper décidé, la liste faite : l'épicerie sans improviser. | `outil_papier_repas_epicerie_pdf_5` |
| Mon carnet de codes | 5,00 $ | Outil thématique | Tous tes codes au même endroit — sans jamais écrire le mot de passe au complet. | `outil_papier_carnet_codes_pdf_5` |
| Ma maison, sans y penser | 5,00 $ | Outil thématique | La maison reste propre presque toute seule : une tâche à la fois. | `outil_papier_menage_maison_pdf_5` |
| Je déménage sans virer fou | 5,00 $ | Outil thématique | Déménager sans virer fou : chaque étape dans l'ordre, du bail aux cartons. | `outil_papier_demenagement_pdf_5` |
| Tout ce qu'on a — inventaire de la maison | 5,00 $ | Outil thématique | Tout ce que ta maison contient, noté une fois — pour l'assurance comme pour la succession. | `outil_papier_inventaire_maison_pdf_5` |
| Le Registre de mes IA | 5,00 $ | Outil thématique | Sache quelles IA voient quoi de ta vie — et garde le contrôle. | `outil_papier_registre_de_mes_ia_pdf_5` |

## Planificateurs — 8,00 $ CAD

| Nom Stripe proposé | Prix (CAD) | Catégorie | Description courte (= accroche) | lookup_key proposé → price_id à reporter dans products-catalog.ts |
|---|---|---|---|---|
| Mon budget par paie | 8,00 $ | Planificateur | Chaque paie, tu sais où va ton argent — avant qu'il parte. | `outil_papier_budget_par_paie_pdf_8` |
| Notre semaine | 8,00 $ | Planificateur | La semaine de toute la famille sur une page, accrochée au frigo. | `outil_papier_semaine_familiale_pdf_8` |
| Mes habitudes, jour après jour | 8,00 $ | Planificateur | Une case à cocher par jour : tes habitudes deviennent visibles. | `outil_papier_habitudes_bien_etre_pdf_8` |
| Mon suivi santé | 8,00 $ | Planificateur | Tes symptômes et tes médicaments notés au même endroit pour ton prochain rendez-vous. | `outil_papier_suivi_sante_pdf_8` |
| Mon auto, son carnet | 8,00 $ | Planificateur | L'historique complet de ton auto, du premier changement d'huile à la revente. | `outil_papier_auto_carnet_pdf_8` |
| Le Planificateur de famille | 8,00 $ | Planificateur | Toute la semaine de la famille au même endroit — fini la tête qui sait tout. | `planificateur_famille_pdf_8` |
| Le Planificateur du gérant | 8,00 $ | Planificateur | Horaires, ouvertures, passations : le commerce roule, même quand tu n'es pas là. | `planificateur_gerant_pdf_8` |
| Mon planificateur TDAH | 8,00 $ | Planificateur | Trois choses par jour, pas trente — un planificateur qui ne te juge pas. | `planificateur_tdah_pdf_8` |
| Le Planificateur de l'étudiant | 8,00 $ | Planificateur | Ta session au complet sur papier : échéances, examens et budget, sans application. | `planificateur_etudiant_pdf_8` |

## Offre « 2 planificateurs pour 15 $ » — à ne PAS créer tout de suite dans Stripe

Encadré prévu sur les fiches Planificateur : « Un deuxième planificateur pour 7 $ — Choisis-en deux : la paire revient à 15 $ au lieu de 16 $. La réduction s'applique automatiquement dans le panier. »

**État honnête : la réduction n'est pas implémentée.** Le site n'a pas de panier : le paiement actuel est mono-produit (une session Stripe Embedded par produit, un seul article). Avant d'activer l'offre, il faudra :

- construire un panier multi-produits et une session Checkout multi-lignes ;
- décider du mécanisme de réduction côté serveur (coupon/promotion Stripe ou ajustement calculé côté serveur) — **aucun coupon Stripe n'a été créé** ;
- brancher la règle déjà codée en fonction pure dans `products-catalog.ts` : `planificateurPairDiscountCad(nombreDePlanificateurs)` — chaque paire complète de planificateurs (tous modèles confondus) donne 1 $ de réduction : 2 → −1 $, 3 → −1 $, 4 → −2 $.

Paires suggérées approuvées (déjà dans les entrées de catalogue, champ `suggestedPairs`) : Budget par paie + Planificateur de famille ; TDAH + Habitudes ; Étudiant + TDAH ; Gérant + Budget par paie.
