import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HP — Des outils pour la vraie vie" },
      { name: "description", content: "HP crée des contenus, livres, PDF et réflexions pour mieux comprendre ce qu'on vit — sans se faire avaler par la performance, la honte ou les fausses solutions." },
      { property: "og:title", content: "HP — Des outils pour la vraie vie" },
      { property: "og:description", content: "Médias, livres, PDF et réflexions pour la vraie vie." },
      { property: "og:image", content: "/images/cover-faim.jpg" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">HP — outils &amp; livres pour la vraie vie</span>
          <h1>Des outils pour la <em>vraie vie</em>.</h1>
          <p className="lead">
            HP crée des livres, PDF, réflexions, outils numériques et univers
            créatifs pour comprendre ce qu'on vit — sans se faire avaler par la
            performance, la honte ou les fausses solutions.
          </p>
          <div className="lead-actions">
            <Link to="/outils" className="btn-primary">Explorer les outils</Link>
            <Link to="/livres-pdf" className="btn-ghost">Voir les livres &amp; PDF</Link>
            <Link to="/sans-honte" className="btn-ghost">Découvrir Sans Honte</Link>
          </div>
        </div>
      </section>

      {/* TROIS PORTES D'ENTRÉE */}
      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Par où commencer</span>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(32px,4.4vw,48px)", margin: "8px 0 36px", color: "#2a1a12" }}>Trois portes d'entrée</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Lire &amp; télécharger</h3>
              <p>Livres, PDF, guides et ressources concrètes à garder près de soi.</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir les livres &amp; PDF →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Regarder &amp; réfléchir</h3>
              <p>Capsules, textes courts et réflexions sur l'IA, l'humain imparfait, la honte, les pièges modernes et les outils qu'on utilise.</p>
              <Link to="/reflexions" className="pillar-cta">Lire les réflexions →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Utiliser &amp; créer</h3>
              <p>Des outils simples pour mettre des mots, faire le tri et avancer sans se perdre dans la perfection.</p>
              <Link to="/outils" className="pillar-cta">Explorer les outils →</Link>
            </article>
          </div>
        </div>
      </section>

      {/* SANS HONTE */}
      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Collection</span>
          <h2>Collection <em>Sans Honte</em></h2>
          <p className="strip-intro">
            Sans Honte, c'est pour ce qu'on cache, ce qu'on ravale, ce qu'on porte
            sans toujours savoir le nommer. Une collection pour comprendre la honte
            sans se juger, sans se réparer de force, sans devenir une meilleure
            version bien propre de soi-même.
          </p>
          <div className="lead-actions">
            <Link to="/sans-honte" className="btn-primary">Découvrir Sans Honte</Link>
          </div>
        </div>
      </section>

      {/* LIVRES & PDF */}
      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Bibliothèque</span>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(32px,4.4vw,48px)", margin: "8px 0 8px", color: "#2a1a12" }}>Livres &amp; PDF</h2>
          <p style={{ margin: "0 0 36px", color: "rgba(42,26,18,.7)", fontStyle: "italic", fontSize: 17 }}>Des formats qui se gardent, se prêtent, se relisent.</p>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Les enjeux de l'humanité</h3>
              <p>Voir clair sur ce qui se joue, sans paniquer ni minimiser.</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir le PDF →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>La faim justifie les moyens</h3>
              <p>Cuisiner avec peu, gaspiller moins, sans se faire la morale.</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir le PDF →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Les enfants cuisinent pour faire plaisir</h3>
              <p>Un livre coloré pour aider les jeunes à cuisiner, essayer, rater et recommencer.</p>
              <Link to="/livres-pdf" className="pillar-cta">Découvrir le livre →</Link>
            </article>
          </div>
          <div className="lead-actions" style={{ marginTop: 28 }}>
            <Link to="/livres-pdf" className="btn-primary">Voir toute la bibliothèque</Link>
          </div>
        </div>
      </section>

      {/* RÉFLEXIONS */}
      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Le média HP</span>
          <h2><em>Réflexions</em></h2>
          <p className="strip-intro">Textes courts et capsules sur l'IA, la honte, les pièges modernes et les outils qu'on utilise.</p>
          <div className="lead-actions">
            <Link to="/reflexions" className="btn-primary">Lire les réflexions</Link>
          </div>
        </div>
      </section>

      {/* UNIVERS ALTERNATIF */}
      <section className="three-pillars" style={{ background: "#0b1422", color: "#f5ead4" }}>
        <div className="container">
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(32px,4.4vw,48px)", margin: "0 0 8px", color: "#f5ead4" }}>Univers alternatif</h2>
          <p style={{ margin: "0 0 36px", color: "rgba(245,234,212,.75)", fontStyle: "italic", fontSize: 17 }}>
            Des personnages, mondes et collections qui prolongent HP autrement : PH,
            Famille atypique, Humain imparfait et les projets créatifs qui regardent
            la vraie vie de côté.
          </p>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>PH — Déséquilibré</h3>
              <p>Chroniques de l'ordinaire. Une BD muette, absurde et humaine.</p>
              <Link to="/univers" className="pillar-cta">Découvrir PH →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Famille atypique</h3>
              <p>Un univers shōnen québécois sur la famille, les blessures, la force et la différence.</p>
              <Link to="/univers" className="pillar-cta">Voir l'aperçu →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Humain imparfait</h3>
              <p>Album DIY, sensible et brut autour de l'imperfection, de la lucidité et du besoin de rester humain.</p>
              <Link to="/univers" className="pillar-cta">Écouter l'album →</Link>
            </article>
          </div>
          <div className="lead-actions" style={{ marginTop: 28 }}>
            <Link to="/univers" className="btn-primary">Explorer les univers</Link>
          </div>
        </div>
      </section>

      {/* ATELIERS */}
      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Pour les groupes &amp; organismes</span>
          <h2><em>Ateliers</em></h2>
          <p className="strip-intro">
            Les ateliers HP prolongent les outils dans les groupes, les organismes et
            les milieux qui veulent réfléchir autrement. Une façon de faire vivre les
            ressources sur le terrain.
          </p>
          <div className="lead-actions">
            <Link to="/ateliers" className="btn-primary">Voir les ateliers</Link>
          </div>
        </div>
      </section>

      {/* CONTACT / INFOLETTRE */}
      <section className="collections-strip" style={{ textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2>Rester <em>proche</em> du projet</h2>
          <p className="strip-intro" style={{ margin: "0 auto 36px" }}>
            Recevoir les nouveaux outils, les contenus utiles, les dates d'ateliers et les prochaines sorties HP.
          </p>
          <div className="lead-actions" style={{ justifyContent: "center" }}>
            <Link to="/contact" className="btn-primary">Me contacter</Link>
            <a href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ color: "#2a1a12", borderColor: "rgba(176,74,47,.5)" }}>Recevoir les nouvelles HP</a>
          </div>
          <p style={{ marginTop: 28, fontSize: 15, color: "rgba(42,26,18,.7)" }}>
            <a href="mailto:hpoutils.admin@gmail.com" style={{ color: "#b04a2f", fontWeight: 700 }}>hpoutils.admin@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  );
}
