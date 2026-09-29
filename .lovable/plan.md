# Repositionnement HP et mise en avant de Sans Honte

## Objectif

Rendre tout le site cohérent avec la mission officielle : « Des outils concrets pour la vraie vie : des PDF et des kits à télécharger, des livres, et des ateliers sur mesure — créés au Québec. » Sans modifier les paiements, les produits Stripe, les PDF ou le design général.

## Changements prévus

1. **Corriger les mentions fiscales**
   - Remplacer « taxes incluses » par « aucune taxe ajoutée » dans le catalogue, les listes, l’accueil, Sans Honte, les aperçus et les pages d’achat.
   - Conserver les montants, identifiants, slugs et calculs de paiement existants.

2. **Mettre Sans Honte au premier plan**
   - Faire de la collection le premier signal et le premier parcours commercial de l’accueil.
   - Ajouter à chacun des 10 kits deux phrases « Pour qui ? » propres à son sujet.
   - Ajouter sur chaque fiche de kit le renvoi vers la collection à 60 $ au lieu de 100 $.
   - Ajouter sous l’achat : « PDF téléchargeable · Aucune taxe ajoutée · Paiement sécurisé ».

3. **Appliquer les textes SEO validés**
   - Utiliser exactement les titres et descriptions fournis pour l’accueil, `/livres-pdf`, `/sans-honte` et `/ateliers`.
   - Générer les titres et descriptions demandés pour chaque fiche PDF à partir de son contenu et de son prix.
   - Harmoniser description et partage social, ajouter type de page, carte sociale et URL canonique absolue sur chaque page publique.
   - Retirer les images sociales relatives ou de prévisualisation; utiliser seulement les images du site en URL absolue lorsqu’elles correspondent à l’image visible.

4. **Remplacer les ateliers génériques**
   - Afficher les cinq ateliers validés avec durée et prix de départ.
   - Mentionner Terrebonne, Lanaudière et environs.
   - Employer « sensibilisation » pour Hygiène & salubrité, jamais « formation certifiée ».
   - Faire pointer la demande vers `hpoutils.admin@gmail.com`.

5. **Ajouter l’inscription aux nouvelles HP**
   - Remplacer l’adresse affichée dans « Rester proche du projet » par un champ courriel et « Recevoir l’extrait gratuit ».
   - Enregistrer le courriel dans Lovable Cloud puis afficher un remerciement, sans envoyer d’extrait tant qu’il n’est pas fourni.
   - Ajouter la mention de consentement et conserver la désinscription en un clic.
   - Valider le courriel côté page et côté serveur, limiter les soumissions abusives et garder la liste inaccessible au public.

6. **Recentrer les textes et retirer le badge**
   - Remplacer les formulations thérapeutiques par le positionnement « outils concrets pour la vraie vie », en gardant le ton humain et sans jugement.
   - Retirer le badge « Made with Lovable » via le réglage du projet, sur ordinateur et mobile.

## Données et sécurité

- Créer une table privée d’inscriptions avec accès réservé au serveur, consentement et date d’inscription; aucune lecture ou écriture directe depuis le navigateur.
- Utiliser une fonction serveur validée pour l’inscription et respecter la liste de désinscription existante.
- Ne modifier ni Stripe, ni les prix configurés, ni les identifiants produit, ni les téléchargements.

## Vérification

- Contrôler les mentions fiscales et les anciens termes sur tout le site.
- Tester l’accueil, les listes, les 10 fiches Sans Honte, la collection, les pages d’achat et les cinq ateliers sur mobile et ordinateur.
- Tester une inscription valide, un doublon et un courriel invalide; confirmer qu’aucune donnée n’est publiquement lisible.
- Vérifier titres, descriptions, canoniques et images sociales rendus sur les pages principales et les fiches PDF.
