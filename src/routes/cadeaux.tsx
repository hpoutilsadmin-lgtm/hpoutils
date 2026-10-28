// Bons cadeaux — programme fermé, décision HP 28 oct. 2026.
// Plus aucune vente. Les codes déjà émis restent utilisables au panier.
// Cette page remplace la page d'achat : aucun bouton d'achat, aucun appel Stripe.
import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/cadeaux")({
  head: () =>
    createSeoHead({
      title: "Bons cadeaux — plus en vente | HP Outils",
      description:
        "Les bons cadeaux HP Outils ne sont plus en vente. Les codes déjà émis restent utilisables au panier.",
      path: "/cadeaux",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="editorial-hero">
        <div className="container">
          <span className="editorial-kicker">Bons cadeaux</span>
          <h1>Bons cadeaux — plus en vente.</h1>
          <p className="lead">
            Les bons cadeaux ne sont plus en vente chez HP Outils.
          </p>
          <p className="lead">
            Vous avez déjà un code ? Il reste utilisable au panier, jusqu'à
            épuisement de son solde.
          </p>
          <p className="lead">
            Pour offrir un produit, cochez « C'est pour offrir » sur la page
            du produit seul ou sur /lire, et entrez le courriel de la
            personne de votre choix. La facture reste à votre nom.
          </p>
          <p>
            Une question ? Écrivez à la direction humaine, un humain vous
            répond sous 3 jours ouvrables.
          </p>
          <p>
            <Link to="/panier">Aller au panier →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
