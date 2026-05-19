import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — HP" },
      { name: "description", content: "Une réponse simple, humaine et concrète. Écrivez à HPOUTILS.ADMIN@gmail.com." },
      { property: "og:title", content: "Contact — HP" },
      { property: "og:description", content: "Écrivons ensemble la suite." },
    ],
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
            <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com">Écrire un courriel</a>
            <a className="btn-ghost" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Réserver un atelier</a>
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
              <p>Cartes Visa, Mastercard, American Express et Apple Pay / Google Pay via Stripe (paiement sécurisé). Comptant accepté pour tous, chèques acceptés uniquement pour les organismes.</p>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Réponse humaine</h3>
              <p>Chaque message reçoit une réponse personnalisée. Ateliers en ligne, en personne ou sur demande.</p>
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
              <Link to="/collaborer" className="pillar-cta">Voir les ateliers →</Link>
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
              <p>Écrivez par courriel ou utilisez les boutons de la page. Je vous réponds avec les détails.</p>
            </article>
            <article className="pillar-card">
              <h3>Quels moyens de paiement ?</h3>
              <p>Paiement en ligne par carte (Visa, Mastercard, Amex) et portefeuilles Apple Pay / Google Pay via Stripe. Comptant accepté pour tous, chèques acceptés uniquement pour les organismes.</p>
            </article>
            <article className="pillar-card">
              <h3>Ateliers pour organismes ?</h3>
              <p>Oui. Les thèmes peuvent être adaptés selon le groupe et le besoin.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="collections-strip" style={{ textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2>Une question, une idée, un <em>projet</em> ?</h2>
          <p className="strip-intro">Je suis là pour écouter et aider.</p>
          <div className="lead-actions" style={{ justifyContent: "center" }}>
            <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com">Écrire un courriel</a>
          </div>
        </div>
      </section>
    </>
  );
}