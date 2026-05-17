import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ateliers")({
  head: () => ({
    meta: [
      { title: "Ateliers — Apprendre, agir, transmettre — HP" },
      { name: "description", content: "Ateliers en ligne et en personne : Réflexion IA, cuisine, jeunesse, organismes." },
      { property: "og:title", content: "Ateliers — HP" },
      { property: "og:description", content: "En ligne, en personne, pour tous." },
      { property: "og:image", content: "/images/photo-auteur.jpg" },
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
            <p className="page-kicker">Ateliers</p>
            <h1>Apprendre, agir, transmettre.</h1>
            <p className="page-lead">En ligne, en personne, pour tous.</p>
            <p>Des ateliers utiles et humains pour comprendre, pratiquer et avancer ensemble. Chaque rencontre part d’un besoin concret.</p>
            <div className="page-actions">
              <a className="action-btn" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Participer cette semaine</a>
              <a className="outline-btn" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Demander un atelier</a>
            </div>
          </div>
          <img className="hero-photo" src="/images/photo-auteur.jpg" alt="Photo du créateur HP" />
        </div>
      </div>
      <div className="subpage-content">
        <div className="container">
          <h2 className="section-title">Ateliers en direct chaque semaine</h2>
          <div className="live-grid" style={{ marginBottom: 28 }}>
            <article className="live-card" style={{ background: "#08243a" }}>
              <span className="live-icon">IA</span>
              <div><h3>Lundi 21h</h3><p>Réflexion IA, comprendre sans se perdre.</p></div>
              <strong className="live-price">10 $</strong>
            </article>
            <article className="live-card" style={{ background: "#214719" }}>
              <span className="live-icon">🍅</span>
              <div><h3>Mardi 18h</h3><p>Cuisine en direct parent + enfant.</p></div>
              <strong className="live-price">Gratuit</strong>
            </article>
            <a className="hero-btn green" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Rejoindre cette semaine</a>
          </div>
          <div className="cards">
            <article className="info-card"><span className="mini-note">En ligne</span><h3>Réflexion IA</h3><p>Comprendre le monde qui change et poser ses questions dans un cadre simple.</p><p className="price">10 $ / séance</p><a className="action-btn" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Réserver</a></article>
            <article className="info-card"><span className="mini-note">En personne</span><h3>Atelier cuisine</h3><p>Recettes simples, budget, autonomie et plaisir d’apprendre en faisant.</p><p className="price">120 $ à 180 $ / atelier</p><a className="action-btn" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Réserver</a></article>
            <article className="info-card"><span className="mini-note">Organismes</span><h3>Ateliers sur mesure</h3><p>Thèmes adaptés aux besoins : jeunesse, familles, bibliothèques, écoles.</p><p className="price">Sur demande</p><a className="action-btn" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Écrire</a></article>
          </div>
          <h2 className="section-title" style={{ marginTop: 36 }}>Pour qui ?</h2>
          <div className="audience-grid">
            <div className="audience-item"><span>♡</span>Familles</div>
            <div className="audience-item"><span>◎</span>Adultes</div>
            <div className="audience-item"><span>★</span>Jeunes</div>
            <div className="audience-item"><span>⌂</span>Organismes</div>
            <div className="audience-item"><span>▣</span>Bibliothèques</div>
            <div className="audience-item"><span>⌁</span>Écoles</div>
          </div>
        </div>
      </div>
    </>
  );
}