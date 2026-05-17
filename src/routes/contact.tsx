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
      <div className="subpage-hero hero-split">
        <div className="container">
          <div>
            <p className="page-kicker">Contact</p>
            <h1>Une réponse simple, humaine et concrète.</h1>
            <p className="page-lead">Écrivons ensemble la suite.</p>
            <p>Pour une question, une commande, un atelier ou un projet, le chemin doit rester clair et direct.</p>
            <div className="page-actions">
              <a className="action-btn" href="mailto:HPOUTILS.ADMIN@gmail.com">Écrire un courriel</a>
              <a className="outline-btn" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Réserver un atelier</a>
            </div>
          </div>
          <img className="hero-photo" src="/images/photo-auteur.jpg" alt="Photo du créateur HP" />
        </div>
      </div>
      <div className="subpage-content">
        <div className="container">
          <div className="contact-tiles">
            <article className="contact-tile"><span>✉</span><h3>Courriel officiel</h3><p><strong>HPOUTILS.ADMIN@gmail.com</strong><br />Pour toutes vos questions et commandes.</p></article>
            <article className="contact-tile"><span>▣</span><h3>Paiements acceptés</h3><p>Interac, comptant et chèques pour organismes.</p></article>
            <article className="contact-tile"><span>♡</span><h3>Réponse humaine</h3><p>Chaque message reçoit une réponse personnalisée.</p></article>
            <article className="contact-tile"><span>▤</span><h3>Disponibilités</h3><p>Ateliers en ligne, en personne ou sur demande.</p></article>
          </div>
          <h2 className="section-title" style={{ marginTop: 36 }}>Je veux vous écrire pour...</h2>
          <div className="cards">
            <article className="info-card"><h3>Commander un livre</h3><p>Recevoir un PDF, un livre ou une information de prix.</p><a className="action-btn" href="https://tally.so/r/A7AYGW" target="_blank" rel="noopener noreferrer">En savoir plus</a></article>
            <article className="info-card"><h3>Commander un outil</h3><p>Demander une fiche, un kit ou une ressource pratique.</p><Link className="action-btn" to="/outils">Voir les outils</Link></article>
            <article className="info-card"><h3>Réserver un atelier</h3><p>Ateliers concrets pour tous les âges et milieux.</p><Link className="action-btn" to="/ateliers">Voir les ateliers</Link></article>
          </div>
          <h2 className="section-title" style={{ marginTop: 36 }}>Questions fréquentes</h2>
          <div className="faq-list">
            <div className="faq-item"><strong>Comment commander ?</strong><p>Écrivez par courriel ou utilisez les boutons de la page. Je vous réponds avec les détails.</p></div>
            <div className="faq-item"><strong>Quels moyens de paiement ?</strong><p>Interac, comptant et chèques pour organismes.</p></div>
            <div className="faq-item"><strong>Offrez-vous des ateliers aux organismes ?</strong><p>Oui. Les thèmes peuvent être adaptés selon le groupe et le besoin.</p></div>
          </div>
          <div className="cta-band">
            <div><h3>Une question, une idée, un projet ?</h3><p>Je suis là pour écouter et aider.</p></div>
            <a className="hero-btn gold" href="mailto:HPOUTILS.ADMIN@gmail.com">Écrire un courriel</a>
          </div>
        </div>
      </div>
    </>
  );
}