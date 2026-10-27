import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/conditions-de-vente")({
  head: () => createSeoHead({ title: "Conditions de vente — HP Outils", description: "Produits numériques, prix sans taxe ajoutée (petit fournisseur), livraison par courriel et remboursements : les conditions de vente de HP Outils, en mots simples.", path: "/conditions-de-vente" }),
  component: Page,
});

function Page() {
  return <section className="subpage-content"><div className="container privacy-copy">
    <h1>Conditions de vente — HP Outils</h1>
    <p>Dernière mise à jour : octobre 2026.</p>
    <p>Ces conditions expliquent comment ça marche quand vous achetez chez HP Outils : ce que vous achetez, comment vous le recevez, et ce qui se passe s'il y a un problème. En mots simples, comme tout ce qu'on fait.</p>
    <h2>1. Qui vend</h2>
    <p>HP Outils (HP), à Terrebonne, dans Lanaudière (Québec). Courriel : hpoutils.admin@gmail.com. Les produits sont écrits par HP ; un humain de l'équipe répond à vos courriels.</p>
    <h2>2. Ce qu'on vend</h2>
    <p>Des produits numériques et des ateliers :</p>
    <ul>
      <li>des livres et guides en fichier PDF, à télécharger ;</li>
      <li>des kits pratiques en PDF (la collection Sans Honte) ;</li>
      <li>des livres interactifs « À toi l'histoire », qui se lisent en ligne grâce à un lien web personnel ;</li>
      <li>des ateliers en personne (Terrebonne et environs, dans Lanaudière), réservés par courriel.</li>
    </ul>
    <p>Rien n'est expédié par la poste : tout arrive par courriel ou se lit en ligne.</p>
    <h2>3. Prix et taxes</h2>
    <p>Tous les prix sont en dollars canadiens ($ CAD).</p>
    <p>HP Outils est un <strong>petit fournisseur</strong> : nous ne sommes pas inscrits à la TPS ni à la TVQ, donc aucune taxe n'est perçue ni ajoutée. C'est pour ça que nos prix disent « aucune taxe ajoutée » — le prix affiché est exactement le prix que vous payez.</p>
    <h2>4. Paiement</h2>
    <p>Le paiement se fait en ligne par Stripe, de façon sécurisée. Nous ne voyons ni ne conservons votre numéro de carte.</p>
    <h2>5. Livraison</h2>
    <p>Après le paiement, vous recevez un courriel avec votre accès :</p>
    <ul>
      <li><strong>PDF</strong> : un lien de téléchargement personnel, valide 7 jours. Téléchargez votre fichier dès que vous le recevez, et gardez-le.</li>
      <li><strong>Tomes « À toi l'histoire »</strong> : un lien web personnel, pour lire en ligne.</li>
      <li><strong>Ateliers</strong> : votre réservation est confirmée par courriel.</li>
    </ul>
    <p>Le courriel n'arrive pas, ou votre lien est expiré ? Passez par la page <Link to="/recuperer-achat">« Récupérer un achat »</Link> du site, ou écrivez-nous : on vous redonne accès à ce que vous avez acheté.</p>
    <h2>6. Remboursements : les produits numériques ne sont pas remboursables</h2>
    <p>Nos produits numériques ne sont pas remboursables. Un fichier téléchargé ou un lien de lecture ne peut pas être « retourné » : dès qu'il est livré, la vente est finale.</p>
    <p>Regardez bien la description du produit avant d'acheter. Si vous hésitez entre deux produits, écrivez-nous avant : on vous répond franchement.</p>
    <p><strong>Exception — panne technique</strong> : si le lien ou le fichier que vous avez reçu ne fonctionne pas — un fichier qui ne s'ouvre pas, un lien mort, le mauvais fichier livré — écrivez-nous. On répare : nouveau lien, nouveau fichier. Et si on n'arrive pas à vous donner un accès qui fonctionne, on vous rembourse. Vous ne payez jamais pour quelque chose que vous n'avez pas pu recevoir.</p>
    <h2>7. Votre lien personnel</h2>
    <p>Les liens de téléchargement et les liens de lecture sont personnels : ils sont pour vous, sur vos appareils. Merci de ne pas les partager ni les publier. Si un lien est partagé publiquement, on peut le désactiver et vous en émettre un nouveau.</p>
    <p>Si vous perdez votre lien, écrivez-nous : on vous le renverra avec plaisir.</p>
    <h2>8. Ateliers : réservation et annulation</h2>
    <p>Les ateliers se réservent par courriel, et la date est confirmée par courriel. Le paiement se fait selon l'entente conclue au moment de la réservation.</p>
    <ul>
      <li><strong>Annulation par vous</strong> : sans frais jusqu'à 7 jours avant la date de l'atelier, en nous écrivant. Entre 7 jours et 48 heures avant, l'atelier peut être reporté une fois, sans frais. À moins de 48 heures, le montant n'est pas remboursable.</li>
      <li><strong>Annulation par HP</strong> : si HP doit annuler un atelier, vous choisissez — une nouvelle date ou un remboursement complet.</li>
    </ul>
    <h2>9. Changements à ces conditions</h2>
    <p>On peut mettre à jour ces conditions de temps en temps. La version publiée sur cette page au moment de votre achat est celle qui s'applique à cet achat.</p>
    <h2>11. Bons cadeaux</h2>
    <p>Codes personnels de 5 $, 10 $, 20 $, 50 $ ou 100 $ CAD, aucune taxe (mais c'est temporaire, profitez-en). Applicables en une fois ou par tranches jusqu'à épuisement du solde. Sans date d'expiration. Aucun frais d'utilisation. Les bons ne s'échangent pas contre de l'argent, sauf le solde de 5 $ ou moins, remboursable à la demande.</p>
    <p><strong>Vérifier votre solde.</strong> Le solde se vérifie au panier : saisissez votre code au panier, le solde utilisable s'affiche avant tout paiement. Si la vérification ne passe pas, écrivez à la direction humaine — un humain vous répondra sous 3 jours ouvrables.</p>
    <p><strong>Remboursement.</strong> Solde de 5 $ ou moins : remboursable à votre demande. Un solde de plus de 5 $ n'est pas remboursable en argent: il reste utilisable, sans date d'expiration et sans frais, en une fois ou par tranches, jusqu'à épuisement.</p>
    <p>Information générale, pas un avis juridique. En cas de question, écrivez à la direction — réponse d'humain sous 3 jours ouvrables.</p>
    <h2>10. Nous joindre — service client</h2>
    <p>Une question, un souci avec un achat, un lien qui ne fonctionne pas ? Écrivez à hpoutils.admin@gmail.com. Une réponse d'humain, pas d'un robot — sous 3 jours ouvrables. C'est un humain de l'équipe qui vous répond. Pour vos renseignements personnels, voyez la Politique de confidentialité.</p>
  </div></section>;
}
