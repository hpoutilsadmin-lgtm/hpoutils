import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => createSeoHead({
    title: "Contact — HP",
    description: "Une question sur un PDF, un kit ou un atelier HP? Écrivez à hpoutils.admin@gmail.com.",
    path: "/contact",
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Contact</span>
          <h1>Une réponse simple, humaine et <em>concrète</em>.</h1>
          <p className="lead">
            Pour une question, une commande, un atelier ou un projet, le chemin
            doit rester clair et direct.
          </p>
          <div className="lead-actions">
            <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com">Écrire à la direction humaine</a>
            <a className="btn-ghost" href="/ateliers#formulaire-atelier">Réserver un atelier</a>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(28px,3.6vw,40px)", margin: "0 0 28px", color: "#2a1a12" }}>Comment me joindre</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Courriel officiel</h3>
              <p><a href="mailto:hpoutils.admin@gmail.com" style={{ color: "#b04a2f", fontWeight: 700 }}>hpoutils.admin@gmail.com</a><br />Pour toutes vos questions et commandes.</p>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Paiements acceptés</h3>
              <p>Comptant, cartes Visa, Mastercard, American Express et Apple Pay / Google Pay via Stripe (paiement sécurisé). Les chèques sont admissibles seulement pour les organismes.</p>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Réponse humaine</h3>
              <p>Chaque message reçoit une réponse d’humain, sous 3 jours ouvrables. Pas une réponse de La direction ! Ateliers en ligne, en personne ou sur demande.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="collections-strip">
        <div className="container">
          <h2>Je veux vous écrire pour…</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Commander un livre</h3>
              <p>Recevoir un PDF, un livre ou une information de prix.</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir les livres →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Commander un outil</h3>
              <p>Demander une fiche, un kit ou une ressource pratique.</p>
              <Link to="/sans-honte" className="pillar-cta">Voir les outils →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Réserver un atelier</h3>
              <p>Ateliers concrets pour tous les âges et milieux.</p>
              <Link to="/ateliers" className="pillar-cta">Voir les ateliers →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(28px,3.6vw,40px)", margin: "0 0 28px", color: "#2a1a12" }}>Questions fréquentes</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>Comment commander ?</h3>
              <p>Écrivez par courriel ou utilisez les boutons de la page. Un humain de l'équipe vous répond avec les détails, sous 3 jours ouvrables.</p>
            </article>
            <article className="pillar-card">
              <h3>Quels moyens de paiement ?</h3>
              <p>Comptant, cartes Visa, Mastercard, American Express et Apple Pay / Google Pay via Stripe (paiement sécurisé). Les chèques sont admissibles seulement pour les organismes.</p>
            </article>
            <article className="pillar-card">
              <h3>Ateliers pour organismes ?</h3>
              <p>Oui. Les thèmes peuvent être adaptés selon le groupe et le besoin.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(28px,3.6vw,40px)", margin: "0 0 28px", color: "#2a1a12" }}>FAQ — Moyens de paiement</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>Quelles cartes sont acceptées ?</h3>
              <p>Visa, Mastercard et American Express, traitées de façon sécurisée par Stripe.</p>
            </article>
            <article className="pillar-card">
              <h3>Apple Pay et Google Pay ?</h3>
              <p>Oui, les deux portefeuilles sont acceptés au moment du paiement. Les cartes Interac Débit ajoutées à Apple Pay ou Google Pay fonctionnent également.</p>
            </article>
            <article className="pillar-card">
              <h3>Comptant ?</h3>
              <p>Accepté pour les achats en personne lors d'ateliers, d'événements ou de rencontres.</p>
            </article>
            <article className="pillar-card">
              <h3>Chèques ?</h3>
              <p>Acceptés uniquement pour les organismes (écoles, centres communautaires, OBNL). Libellés à l'ordre indiqué sur la facture.</p>
            </article>
            <article className="pillar-card">
              <h3>Le paiement est-il sécurisé ?</h3>
              <p>Oui. Toutes les transactions en ligne passent par Stripe, certifié PCI-DSS. Aucune donnée bancaire n'est stockée sur le site.</p>
            </article>
            <article className="pillar-card">
              <h3>Reçu ou facture ?</h3>
              <p>Un reçu est envoyé automatiquement par courriel après chaque paiement. Une facture détaillée est disponible sur demande pour les organismes.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="collections-strip" style={{ textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2>Une question, une idée, un <em>projet</em> ?</h2>
          <p className="strip-intro">L'équipe est là pour écouter et aider.</p>
          <div className="lead-actions" style={{ justifyContent: "center" }}>
            <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com">Écrire à la direction humaine</a>
          </div>
        </div>
      </section>
    </>
  );
}