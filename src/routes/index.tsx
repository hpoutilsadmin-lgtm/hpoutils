import { createFileRoute, Link } from "@tanstack/react-router";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ParoleVisiteur } from "@/components/ParoleVisiteur";
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
      founder: { "@id": "https://www.hp-outils.com/#hp" },
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
      "@id": "https://www.hp-outils.com/#hp",
      name: "HP",
      jobTitle: "Créateur — jeux, livres et outils pour la vraie vie",
      worksFor: { "@id": "https://www.hp-outils.com/#organisation" },
      homeLocation: { "@type": "Place", name: "Terrebonne, Lanaudière, Québec" },
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    ...createSeoHead({
      title: "HP Outils — jeux, kits et outils pour la vraie vie",
      description:
        "Jeux gratuits, 629 recettes, outils web sans compte et kits PDF à 5 $ CAD — créés à Terrebonne pour les familles et les petits budgets. Aucune taxe ajoutée.",
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
            Des outils éducatifs gratuits pour les familles de Terrebonne, au Québec.
          </p>
          <p style={{ margin: "0 0 28px", maxWidth: 700, fontFamily: "Georgia,serif", fontSize: 17, lineHeight: 1.55, color: "#f3d9a4", borderLeft: "3px solid rgba(216,149,50,.7)", paddingLeft: 14 }}>
            Écrit par un humain, accéléré par l'IA. On le dit toujours.
          </p>
          <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.55, margin: "0 0 28px", maxWidth: 700 }}>
            « J'ai jamais su qui j'étais ni ce que j'aimais. Alors je fais un peu de tout — et j'en ai fait des outils pour la vraie vie. » — HP
          </p>
          <div className="lead-actions">
            <Link to="/jeux" className="btn-primary">Jouer — 36 jeux gratuits</Link>
            <Link to="/outils" className="btn-primary">Outils gratuits, sans compte</Link>
            <Link to="/sans-honte" className="btn-ghost">Découvrir les kits Sans Honte</Link>
          </div>
        </div>
      </section>

      {/* TU CHERCHES QUOI? */}
      <section id="sec-arbre" className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Par où commencer</span>
          <h2 className="section-title">Vous cherchez quoi?</h2>
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
                <p>36 jeux gratuits, jouables dans votre navigateur</p>
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
            <article className="pillar-card" style={{ padding: 0, overflow: "hidden", gap: 0 }}>
              <a href="/boite/" aria-label="Ouvrir la Boîte à outils" style={{ display: "block", textDecoration: "none" }}>
                <div style={{ ...categoryTile("#3d2a56", "#5a3d80"), height: 128, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span aria-hidden="true" style={{ fontFamily: "Georgia, serif", fontSize: 56, lineHeight: 1, color: "#f6eddd", textShadow: "0 8px 22px rgba(0,0,0,.42)" }}>B</span>
                  <span style={CATEGORY_TAG_STYLE}>Gratuit · sans compte</span>
                </div>
              </a>
              <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <h3 style={{ fontSize: 23 }}>La Boîte à outils</h3>
                <p>8 outils gratuits, sans compte, pour le quotidien : préparer son héritage, trancher une décision, comprendre la paperasse, comparer les prix, préparer un appel difficile, savoir quelle démarche faire, garder ses codes en sécurité et suivre les promesses — qui doit quoi, pour quand.</p>
                <a className="pillar-cta" href="/boite/">Ouvrir la Boîte →</a>
              </div>
            </article>
            <article className="pillar-card" style={{ padding: 0, overflow: "hidden", gap: 0 }}>
              <Link to="/univers" aria-label="Choisir votre histoire" style={{ display: "block", textDecoration: "none" }}>
                <div style={{ ...categoryTile("#7a1f2b", "#a63a44"), height: 128, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span aria-hidden="true" style={{ fontFamily: "Georgia, serif", fontSize: 56, lineHeight: 1, color: "#f6eddd", textShadow: "0 8px 22px rgba(0,0,0,.42)" }}>À</span>
                  <span style={CATEGORY_TAG_STYLE}>1er tome gratuit</span>
                </div>
              </Link>
              <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <h3 style={{ fontSize: 23 }}>À toi l'histoire</h3>
                <p>12 tomes interactifs : vous choisissez, l'histoire change. Le 1er est gratuit.</p>
                <Link className="pillar-cta" to="/univers">Choisir votre histoire →</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Découvre aussi</span>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>Les Passeurs</h3>
              <p>Le programme qui tiendra le gratuit debout : 3 $ CAD par mois, inscription ouverte — aucune taxe ajoutée.</p>
              <Link className="pillar-cta" to="/les-passeurs">Découvrir les Passeurs →</Link>
            </article>
            <article className="pillar-card">
              <h3>Le Passeur de savoir</h3>
              <p>Les trucs et les savoirs de nos grands-parents, recueillis et transmis.</p>
              <a className="pillar-cta" href="/passeur-de-savoir/">Ouvrir le Passeur →</a>
            </article>
            <article className="pillar-card">
              <h3>Futur simple, le balado</h3>
              <p>L'IA, les PME et le futur, racontés simplement — de nouveaux épisodes quand ils sont prêts.</p>
              <Link className="pillar-cta" to="/balado">Écouter le balado →</Link>
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
              <Link to="/pdf/$slug" params={{ slug: "enjeux-humanite" }} className="pillar-cta">Voir le PDF →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>La faim justifie les moyens</h3>
              <p>Mieux manger avec peu : bases simples, recettes accessibles et réflexes anti-gaspillage. — 10 $ CAD, aucune taxe ajoutée</p>
              <Link to="/pdf/$slug" params={{ slug: "faim-justifie-les-moyens" }} className="pillar-cta">Voir le PDF →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Les enfants cuisinent pour faire plaisir</h3>
              <p>Un projet doux pour transmettre le plaisir, pas la performance. — 10 $ CAD, aucune taxe ajoutée</p>
              <Link to="/pdf/$slug" params={{ slug: "enfants-cuisinent" }} className="pillar-cta">Voir le PDF →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">04</span>
              <h3>Horizon Québec</h3>
              <p>Une nouvelle québécoise sur l'amitié, la langue, le Québec et ce qu'on essaie encore de tenir ensemble. — 10 $ CAD, aucune taxe ajoutée</p>
              <Link to="/pdf/$slug" params={{ slug: "horizon-quebec" }} className="pillar-cta">Voir le PDF →</Link>
            </article>
          </div>
          <div className="lead-actions" style={{ marginTop: 28 }}>
            <Link to="/livres-pdf" className="btn-primary">Voir livres, PDF &amp; réflexions</Link>
          </div>
        </div>
      </section>

      {/* ATELIERS */}
      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Ateliers</span>
          <h2>Ateliers &amp; conférence</h2>
          <p className="strip-intro">
            Les ateliers HP prolongent les outils sur le terrain : Édition des Fêtes
            du 1er octobre au 23 décembre (pain maison à domicile, IA sans jargon,
            conférence La faim justifie les moyens), et ateliers pour les groupes
            et les organismes.
          </p>
          <div className="lead-actions">
            <Link to="/ateliers" hash="edition-des-fetes" className="btn-primary">Découvrir l'Édition des Fêtes</Link>
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

      {/* PAROLE DE VISITEUSE — juste au-dessus de la zone de vie d'HGPTO */}
      <ParoleVisiteur />
    </>
  );
}
