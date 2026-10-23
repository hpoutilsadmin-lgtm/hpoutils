import { createFileRoute, Link } from "@tanstack/react-router";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { createSeoHead } from "@/lib/seo";
import type { CSSProperties } from "react";

const ORGANISATION_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.hp-outils.com/#organisation",
      name: "HP Outils",
      url: "https://www.hp-outils.com/",
      slogan: "Des outils pour la vraie vie",
      description:
        "Jeux gratuits, kits PDF, livres, recettes et outils web créés au Québec pour les familles et les petits budgets. Petit fournisseur : prix affichés sans taxe ajoutée.",
      email: "hpoutils.admin@gmail.com",
      founder: { "@id": "https://www.hp-outils.com/#hugo" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Terrebonne",
        addressRegion: "QC",
        addressCountry: "CA",
      },
      areaServed: ["Lanaudière", "Québec", "Canada"],
      sameAs: ["https://youtube.com/@hp-2zl"],
    },
    {
      "@type": "Person",
      "@id": "https://www.hp-outils.com/#hugo",
      name: "Hugo Pierre Bertrand",
      jobTitle: "Créateur — jeux, livres et outils pour la vraie vie",
      worksFor: { "@id": "https://www.hp-outils.com/#organisation" },
      homeLocation: { "@type": "Place", name: "Terrebonne, Lanaudière, Québec" },
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    ...createSeoHead({
      title: "HP Outils — jeux gratuits, kits PDF 5 $ et outils pour la vraie vie | Québec",
      description:
        "Jeux gratuits, 629 recettes, outils web sans compte et kits PDF à 5 $ — créés à Terrebonne pour les familles et les petits budgets. Aucune taxe ajoutée.",
      path: "/",
    }),
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(ORGANISATION_JSON_LD) },
    ],
  }),
  component: Index,
});

const CATEGORY_TAG_STYLE: CSSProperties = {
  position: "absolute",
  left: 12,
  bottom: 10,
  fontSize: 10.5,
  fontWeight: 900,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "#f0c16d",
  background: "rgba(7,17,27,.55)",
  border: "1px solid rgba(240,193,109,.35)",
  borderRadius: 999,
  padding: "4px 9px",
};

function categoryTile(c1: string, c2: string): CSSProperties {
  return {
    backgroundColor: c2,
    backgroundImage:
      "radial-gradient(circle at 85% 12%, rgba(246,237,221,.22), transparent 46%)," +
      "radial-gradient(rgba(255,255,255,.13) 1px, transparent 1.6px)," +
      "linear-gradient(135deg, " + c1 + ", " + c2 + ")",
    backgroundSize: "auto, 22px 22px, auto",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,.12), inset 0 -26px 36px rgba(0,0,0,.28)",
  };
}

function Index() {
  return (
    <>
      <section id="sec-accueil" className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">HP — créé au Québec</span>
          <h1>Des outils concrets pour la <em>vraie vie</em>.</h1>
          <p className="lead">
            Des jeux gratuits, des recettes et des outils web sans compte — et des kits
            PDF à petit prix, des livres et des ateliers, créés au Québec.
          </p>
          <p style={{ margin: "0 0 28px", maxWidth: 700, fontFamily: "Georgia,serif", fontSize: 17, lineHeight: 1.55, color: "#f3d9a4", borderLeft: "3px solid rgba(216,149,50,.7)", paddingLeft: 14 }}>
            Tout doit sembler humain. On ment jamais. L'IA est un outil très rapide et efficace — la direction, l'émotion, le "ce que je fais", c'est pour les humains.
          </p>
          <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.55, margin: "0 0 28px", maxWidth: 700 }}>
            « J'ai jamais su qui j'étais ni ce que j'aimais. Alors je fais un peu de tout — et j'en ai fait des outils pour la vraie vie. » — Hugo
          </p>
          <div className="lead-actions">
            <Link to="/jeux" className="btn-primary">Jouer — 26 jeux gratuits</Link>
            <Link to="/outils" className="btn-primary">Outils gratuits, sans compte</Link>
            <Link to="/sans-honte" className="btn-ghost">Découvrir les kits Sans Honte</Link>
          </div>
        </div>
      </section>

      {/* TU CHERCHES QUOI? */}
      <section id="sec-arbre" className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Par où commencer</span>
          <h2 className="section-title">Tu cherches quoi?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24 }}>
            <article className="pillar-card" style={{ padding: 0, overflow: "hidden", gap: 0 }}>
              <Link to="/jeux" aria-label="Voir les jeux" style={{ display: "block", textDecoration: "none" }}>
                <div style={{ ...categoryTile("#08243a", "#0f3e62"), height: 128, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span aria-hidden="true" style={{ fontFamily: "Georgia, serif", fontSize: 56, lineHeight: 1, color: "#f6eddd", textShadow: "0 8px 22px rgba(0,0,0,.42)" }}>J</span>
                  <span style={CATEGORY_TAG_STYLE}>Gratuits · navigateur</span>
                </div>
              </Link>
              <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <h3 style={{ fontSize: 23 }}>Jeux</h3>
                <p>26 jeux gratuits, jouables dans ton navigateur</p>
                <Link className="pillar-cta" to="/jeux">Voir les jeux →</Link>
              </div>
            </article>
            <article className="pillar-card" style={{ padding: 0, overflow: "hidden", gap: 0 }}>
              <Link to="/outils" aria-label="Voir les outils" style={{ display: "block", textDecoration: "none" }}>
                <div style={{ ...categoryTile("#294f1e", "#496b2a"), height: 128, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span aria-hidden="true" style={{ fontFamily: "Georgia, serif", fontSize: 56, lineHeight: 1, color: "#f6eddd", textShadow: "0 8px 22px rgba(0,0,0,.42)" }}>O</span>
                  <span style={CATEGORY_TAG_STYLE}>Web · papier</span>
                </div>
              </Link>
              <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <h3 style={{ fontSize: 23 }}>Outils</h3>
                <p>Interactifs sur le web, ou papier à imprimer : kits Sans Honte et fiches</p>
                <Link className="pillar-cta" to="/outils">Voir les outils →</Link>
              </div>
            </article>
            <article className="pillar-card" style={{ padding: 0, overflow: "hidden", gap: 0 }}>
              <Link to="/livres-pdf" aria-label="Voir les livres" style={{ display: "block", textDecoration: "none" }}>
                <div style={{ ...categoryTile("#54432a", "#806943"), height: 128, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span aria-hidden="true" style={{ fontFamily: "Georgia, serif", fontSize: 56, lineHeight: 1, color: "#f6eddd", textShadow: "0 8px 22px rgba(0,0,0,.42)" }}>L</span>
                  <span style={CATEGORY_TAG_STYLE}>PDF à télécharger</span>
                </div>
              </Link>
              <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <h3 style={{ fontSize: 23 }}>Livres</h3>
                <p>Livres et PDF d'ici</p>
                <Link className="pillar-cta" to="/livres-pdf">Voir les livres →</Link>
              </div>
            </article>
            <article className="pillar-card" style={{ padding: 0, overflow: "hidden", gap: 0 }}>
              <a href="/en-cuisine/index.html" aria-label="Ouvrir En cuisine" style={{ display: "block", textDecoration: "none" }}>
                <div style={{ ...categoryTile("#9a4a0d", "#c85f16"), height: 128, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span aria-hidden="true" style={{ fontFamily: "Georgia, serif", fontSize: 56, lineHeight: 1, color: "#f6eddd", textShadow: "0 8px 22px rgba(0,0,0,.42)" }}>C</span>
                  <span style={CATEGORY_TAG_STYLE}>Recettes HP</span>
                </div>
              </a>
              <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <h3 style={{ fontSize: 23 }}>Cuisine</h3>
                <p>Les enfants cuisinent, recettes et petits budgets</p>
                <a className="pillar-cta" href="/en-cuisine/index.html">Ouvrir En cuisine →</a>
              </div>
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
             Quinze kits PDF pratiques sur les papiers, le frigo, le logement,
             l'entraide, la fraude et d'autres situations de la vraie vie.
          </p>
          <div className="lead-actions">
             <Link to="/sans-honte" className="btn-primary">Voir les 15 kits Sans Honte</Link>
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
              <p>Voir clair sur ce qui se joue, sans paniquer ni minimiser. — 15 $ CAD, aucune taxe ajoutée</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir le PDF →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>La faim justifie les moyens</h3>
              <p>Mieux manger avec peu : bases simples, recettes accessibles et réflexes anti-gaspillage. — 10 $ CAD, aucune taxe ajoutée</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir le PDF →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Les enfants cuisinent pour faire plaisir</h3>
              <p>Un projet doux pour transmettre le plaisir, pas la performance. — 20 $ CAD, aucune taxe ajoutée</p>
              <Link to="/pdf/$slug" params={{ slug: "enfants-cuisinent" }} className="pillar-cta">Voir le PDF →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">04</span>
              <h3>Horizon Québec</h3>
              <p>Une nouvelle HP sur l'amitié, la langue, le Québec et ce qu'on essaie encore de tenir ensemble. — 10 $ CAD, aucune taxe ajoutée</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir le PDF →</Link>
            </article>
          </div>
          <div className="lead-actions" style={{ marginTop: 28 }}>
            <Link to="/livres-pdf" className="btn-primary">Voir livres, PDF &amp; réflexions</Link>
          </div>
        </div>
      </section>

      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Du 1er octobre au 23 décembre</span>
          <h2>Ateliers &amp; conférence — <em>Édition des Fêtes</em></h2>
          <p className="strip-intro">Pain maison à domicile, IA sans jargon et conférence La faim justifie les moyens.</p>
          <div className="lead-actions">
            <Link to="/ateliers" hash="edition-des-fetes" className="btn-primary">Découvrir l'Édition des Fêtes</Link>
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
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}
