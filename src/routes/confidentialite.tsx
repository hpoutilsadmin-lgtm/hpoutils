import { createFileRoute } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/confidentialite")({
  head: () => createSeoHead({ title: "Politique de confidentialité — HP Outils", description: "Consentement, renseignements personnels, conservation et droits : la politique de confidentialité de HP Outils au Québec.", path: "/confidentialite" }),
  component: Page,
});

function Page() {
  return <section className="subpage-content"><div className="container privacy-copy">
    <h1>Politique de confidentialité — HP Outils</h1>
    <p>Dernière mise à jour : octobre 2026.</p>
    <h2>1. Qui sommes-nous</h2>
    <p>HP Outils (HP), joignable à hpoutils.admin@gmail.com. Le responsable de la protection des renseignements personnels est HP, à cette même adresse.</p>
    <h2>2. Ce qu'on recueille</h2>
    <ul><li>Votre courriel, quand vous vous inscrivez pour recevoir nos outils et nouveautés (formulaire du site, page Jeux). Si vous remplissez un formulaire externe Tally lié depuis le site (pages Transmettre, Comprendre, Outils, Sans Honte), vos réponses sont recueillies par Tally, selon sa propre politique de confidentialité.</li><li>Ce qui reste dans votre navigateur seulement, sans jamais nous être transmis : votre panier, votre sauvegarde du jeu Chevalier et des informations de session (comme la position du hamster Détectôt), qui s'effacent à la fermeture de l'onglet.</li><li>Vos informations de commande (nom, courriel) quand vous achetez. Les paiements sont traités par Stripe — nous ne voyons ni ne conservons votre numéro de carte.</li><li>Les cœurs que vous donnez aux jeux (bouton ♥) alimentent un compteur public entièrement anonyme : nous conservons seulement le nom du jeu et l'heure du cœur — ni compte, ni adresse IP, ni identifiant. Vos favoris, eux, restent dans votre navigateur et ne nous sont jamais transmis.</li></ul>
    <h2>3. Pourquoi</h2>
    <ul><li>Vous envoyer les outils, contenus et dates d'ateliers que vous avez demandés.</li><li>Traiter vos commandes et vous donner accès à vos achats.</li><li>Rien d'autre. Nous ne vendons ni ne louons vos renseignements. Jamais.</li></ul>
    <h2>4. Votre consentement</h2>
    <p>Vous donnez votre consentement en cochant la case du formulaire. Vous pouvez le retirer n'importe quand en cliquant « Se désinscrire » au bas de nos courriels ou en nous écrivant.</p>
    <h2>5. Vos droits</h2>
    <p>Vous pouvez demander à voir, corriger ou supprimer vos renseignements personnels en écrivant à hpoutils.admin@gmail.com. Réponse dans les 30 jours.</p>
    <h2>6. Conservation</h2>
    <p>Votre courriel est conservé tant que vous êtes inscrit; il est supprimé à votre désinscription. Les données de commande sont conservées le temps requis par les lois fiscales.</p>
    <h2>7. Sécurité et partage</h2>
    <p>Vos renseignements sont conservés de façon sécuritaire et accessibles uniquement aux personnes qui en ont besoin pour vous servir : notre gestionnaire de site, notre fournisseur de paiement (Stripe) et notre outil d'envoi de courriels (Brevo). La mesure d'audience du site passe par Cloudflare Insights (données agrégées).</p>
  </div></section>;
}