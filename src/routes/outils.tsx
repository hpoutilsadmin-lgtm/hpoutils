import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/outils")({
  head: () => ({
    meta: [
      { title: "Outils — Des repères simples pour la vraie vie — HP" },
      { name: "description", content: "Livres et fiches pratiques pour mieux manger, organiser, économiser et simplifier le quotidien." },
      { property: "og:title", content: "Outils — HP" },
      { property: "og:description", content: "Livre et fiches pour passer à l’action." },
      { property: "og:image", content: "/images/cover-faim.jpg" },
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
            <p className="page-kicker">Outils</p>
            <h1>Des repères simples pour la vraie vie.</h1>
            <p className="page-lead">Livre et fiches pour passer à l’action.</p>
            <p>Des formats concrets, imprimables et faciles à utiliser pour mieux manger, organiser, économiser et simplifier le quotidien.</p>
            <div className="page-actions">
              <Link className="action-btn" to="/contact">Commander maintenant</Link>
              <Link className="outline-btn" to="/prix">Voir les tarifs</Link>
            </div>
          </div>
          <img className="hero-photo" src="/images/photo-auteur.jpg" alt="Photo du créateur HP" />
        </div>
      </div>
      <div className="subpage-content">
        <div className="container">
          <div className="cards">
            <article className="info-card">
              <img className="product-img" src="/images/cover-faim.jpg" alt="Couverture La faim justifie les moyens" />
              <span className="mini-note">Livre pratique</span>
              <h3>La faim justifie les moyens</h3>
              <p>Guide pour manger mieux avec moins, réduire le gaspillage et garder du plaisir.</p>
              <a className="action-btn" href="https://tally.so/r/A7AYGW" target="_blank" rel="noopener noreferrer">Découvrir le guide</a>
            </article>
            <article className="info-card">
              <span className="mini-note">Collection</span>
              <h3>Collection Sans Honte</h3>
              <p>Frigo, Tenir Debout, Seconde Main et Entraide : quatre kits pour retrouver des repères simples.</p>
              <p className="price">20 $ le kit / 60 $ les 4</p>
              <a className="action-btn" href="https://tally.so/r/A7AYGW" target="_blank" rel="noopener noreferrer">Découvrir la collection</a>
            </article>
            <article className="info-card">
              <span className="mini-note">PDF</span>
              <h3>Outils pratiques HP</h3>
              <p>Fiches, listes, guides courts, tableaux et formats imprimables pour la maison ou les groupes.</p>
              <p className="price">5 $ à 20 $</p>
              <a className="action-btn" href="https://tally.so/r/A7AYGW" target="_blank" rel="noopener noreferrer">Voir tous les outils</a>
            </article>
          </div>
          <h2 className="section-title" style={{ marginTop: 36 }}>Comment ça fonctionne ?</h2>
          <div className="process-grid">
            <article className="step-card"><span className="step-num">1</span><h3>Choisir</h3><p>Repérer l’outil qui répond au besoin.</p></article>
            <article className="step-card"><span className="step-num">2</span><h3>Commander</h3><p>Demander le format qui convient.</p></article>
            <article className="step-card"><span className="step-num">3</span><h3>Recevoir</h3><p>Recevoir les fiches par courriel ou en main propre.</p></article>
            <article className="step-card"><span className="step-num">4</span><h3>Utiliser</h3><p>Imprimer, plastifier, partager et passer à l’action.</p></article>
          </div>
          <div className="icon-strip">
            <div className="mini-feature"><span>PDF</span><strong>À télécharger</strong></div>
            <div className="mini-feature"><span>▣</span><strong>Imprimable</strong></div>
            <div className="mini-feature"><span>↗</span><strong>Partageable</strong></div>
            <div className="mini-feature"><span>♡</span><strong>Utile</strong></div>
          </div>
        </div>
      </div>
    </>
  );
}