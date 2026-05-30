import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HP — Des outils pour la vraie vie" },
      { name: "description", content: "HP crée des outils concrets, livres et PDF pour la santé mentale, le soutien émotionnel et la réflexion personnelle. Des ressources francophones accessibles pour la vraie vie." },
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
            HP crée des outils concrets — livres, PDF, réflexions et ressources —
            pour mieux comprendre ce qu'on vit au quotidien. Sans performance, sans
            honte, sans fausse solution. Des ressources accessibles pour soi, ses proches
            ou un contexte d'accompagnement.
          </p>
          <div className="lead-actions">
            <Link to="/outils" className="btn-primary">Explorer outils Sans Honte</Link>
            <Link to="/livres-pdf" className="btn-primary">Voir livres, PDF &amp; réflexions</Link>
            <Link to="/univers" className="btn-primary">Découvrir Univers alternatif</Link>
          </div>
        </div>
      </section>

      {/* SANS HONTE */}
      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Collection</span>
          <h2>Collection <em>Sans Honte</em></h2>
          <p className="strip-intro">
            Des outils pour mettre des mots sur la honte, le stress, l'isolement
            ou certaines blessures qu'on garde souvent pour soi. Une approche
            simple, humaine et accessible — à utiliser seul, avec un proche ou
            dans un contexte d'intervention.
          </p>
          <div className="lead-actions">
            <Link to="/outils" className="btn-primary">Explorer outils Sans Honte</Link>
          </div>
        </div>
      </section>

      {/* LIVRES & PDF */}
      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Bibliothèque</span>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(32px,4.4vw,48px)", margin: "8px 0 8px", color: "#2a1a12" }}>Livres, PDF &amp; réflexions</h2>
          <p style={{ margin: "0 0 36px", color: "rgba(42,26,18,.7)", fontStyle: "italic", fontSize: 17 }}>Des formats qui se gardent, se prêtent, se relisent.</p>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Enjeux de l'humanité à l'ère de l'IA</h3>
              <p>Voir clair sur ce qui se joue, sans paniquer ni minimiser. — 15 $ CAD taxes incluses</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir le PDF →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>La faim justifie les moyens</h3>
              <p>Mieux manger avec peu : bases simples, recettes accessibles et réflexes anti-gaspillage. — 10 $ CAD taxes incluses</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir le PDF →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Horizon Québec</h3>
              <p>Une nouvelle HP sur l'amitié, la langue, le Québec et ce qu'on essaie encore de tenir ensemble. — 10 $ CAD taxes incluses</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir le PDF →</Link>
            </article>
          </div>
          <div className="lead-actions" style={{ marginTop: 28 }}>
            <Link to="/livres-pdf" className="btn-primary">Voir livres, PDF &amp; réflexions</Link>
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
