import { createFileRoute, Link } from "@tanstack/react-router";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ParoleVisiteur } from "@/components/ParoleVisiteur";
import { HamsterWheel } from "@/components/hamster/HamsterWheel";
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
        "Jeux gratuits, 666 recettes, outils web sans compte et kits PDF à 5 $ CAD — créés à Terrebonne pour les familles et les petits budgets. Aucune taxe ajoutée.",
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
      {/* Bannière Noël 1 « Idée cadeau » (lot Décor de Noël, 10 nov. 2026) : accueil seulement, en flux. */}
      <div className="banniere-noel" aria-label="Idée cadeau">
        <p><strong>Idée cadeau</strong> — Des outils concrets pour la vraie vie : kits Sans Honte 5 $, livres 10 $, tomes dès 5 $.</p>
        <Link to="/sans-honte" className="banniere-noel-cta">Voir les idées cadeaux</Link>
      </div>
      <section id="sec-accueil" className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner-noel.webp)" }}>
        <div className="container">
          <span className="editorial-kicker">HP — créé au Québec</span>
          <h1>Des outils concrets pour la <em>vraie vie</em>.</h1>
          <p className="lead">
            Régler une démarche, tenir votre budget, cuisiner un repas avec ce que vous avez, jouer sans compte : des outils gratuits, des kits à petit prix et des ateliers, créés à Terrebonne, au Québec.
          </p>
          {/* Nuit 4A : les appels d'abord, les citations ensuite — textes inchangés, ordre seul. */}
          <div className="lead-actions">
            <Link to="/outils" className="btn-primary">Régler un problème</Link>
            <Link to="/jeux" className="btn-primary">Jouer 57 jeux gratuits</Link>
            <Link to="/sans-honte" className="btn-ghost">Découvrir les kits Sans Honte</Link>
          </div>
          <p style={{ margin: "28px 0", maxWidth: 700, fontFamily: "Georgia,serif", fontSize: 17, lineHeight: 1.55, color: "#f3d9a4", borderLeft: "3px solid rgba(216,149,50,.7)", paddingLeft: 14 }}>
            Direction humaine, accélérée par l'IA. On le dit toujours.
          </p>
          <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.55, margin: "0 0 28px", maxWidth: 700 }}>
            « J'ai jamais su qui j'étais ni ce que j'aimais. Alors je fais un peu de tout — et j'en ai fait des outils pour la vraie vie. » — HP
          </p>
        </div>
      </section>

      {/* DEUX PORTES (Jour 3, 6 nov. 2026, lot 2) : « Un outil pour moi »
          vers /outils et « Un atelier pour mon groupe » vers /ateliers,
          AU-DESSUS de « Vous cherchez quoi ? », sans remplacer la
          navigation existante ni aucune section de l'accueil, sans toucher
          aux boutons du hero. Même famille visuelle que les cartes
          existantes (three-pillars / pillar-grid / pillar-card) : côte à
          côte sur ordinateur (grille), empilées sous 860 px (règle
          existante de hp.css). La porte outil distingue outils web
          gratuits et kits PDF payants, à part — sinon elle reproduirait
          la confusion « Voir les outils » signalée au Jour 3. Les Jeux
          gardent leur entrée directe, hors des deux portes. */}
      {/* Bannière Noël 2 « Amusez-vous gratuitement » (lot Décor de Noël, 10 nov. 2026) : accueil seulement, en flux. */}
      <div className="banniere-noel" aria-label="Amusez-vous gratuitement">
        <p><strong>Amusez-vous gratuitement</strong> — 57 jeux gratuits, sans compte, et 666 recettes à essayer.</p>
        <Link to="/jeux" className="banniere-noel-cta">Jouer gratuitement</Link>
      </div>
      <section id="sec-portes" className="three-pillars" aria-label="Deux portes d'entrée">
        <div className="container">
          <span className="editorial-kicker">Commencez ici</span>
          <h2 className="section-title">Deux portes pour commencer</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>Un outil pour moi</h3>
              <p>Outils web gratuits, sans compte, pour le quotidien — et, à part, des kits PDF payants pour les situations de la vraie vie.</p>
              <Link className="pillar-cta" to="/outils">Voir les outils →</Link>
            </article>
            <article className="pillar-card">
              <h3>Un atelier pour mon groupe</h3>
              <p>Pour votre groupe, votre organisme, votre école : des ateliers à Terrebonne et dans Lanaudière — on vient chez vous.</p>
              <Link className="pillar-cta" to="/ateliers">Voir les ateliers →</Link>
            </article>
          </div>
        </div>
      </section>

      {/* TU CHERCHES QUOI? */}
      <section id="sec-arbre" className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Par où commencer</span>
          <h2 className="section-title">Vous cherchez quoi?</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>La Boîte à outils</h3>
              <p>8 outils gratuits, sans compte, pour le quotidien : préparer son héritage, trancher une décision, comprendre la paperasse, comparer les prix, préparer un appel difficile, savoir quelle démarche faire, garder ses codes en sécurité et suivre les promesses — qui doit quoi, pour quand.</p>
              <a className="pillar-cta" href="/boite/">Ouvrir la Boîte →</a>
            </article>
            <article className="pillar-card">
              <h3>En cuisine</h3>
              <p>666 recettes pour cuisiner avec ce qu'on a sous la main : cherchez par ingrédients, convertissez les températures du four et trouvez quoi faire avec les restes.</p>
              <a className="pillar-cta" href="/en-cuisine/index.html">Ouvrir En cuisine →</a>
            </article>
            <article className="pillar-card">
              <h3>Jeux</h3>
              <p>57 + 1 caché jeux gratuits, jouables dans votre navigateur</p>
              <Link className="pillar-cta" to="/jeux">Voir les jeux →</Link>
            </article>
            <article className="pillar-card">
              <h3>Groupes, organismes et commerces</h3>
              <p>Un jeu aux couleurs de votre commerce ou de votre organisme, que vos clients jouent, partagent et retiennent ; des ateliers pour vos groupes, à Terrebonne et dans Lanaudière, on vient chez vous. Jeux à vos couleurs dès 19 $ (aperçu gratuit, vente bientôt ouverte), ateliers pour groupes 150 à 290 $, aucune taxe ajoutée.</p>
              <Link className="pillar-cta" to="/jeux-a-votre-image">Voir les jeux à votre image →</Link>
              <Link className="pillar-cta" to="/ateliers">Voir les ateliers →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Découvrez aussi</span>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>Les Passeurs</h3>
              <p>Le programme qui tiendra le gratuit debout : 3 $ CAD par mois, inscription par courriel ouverte, aucun prélèvement sans confirmation. C'est un abonnement, pas un outil gratuit.</p>
              <Link className="pillar-cta" to="/les-passeurs">Découvrir les Passeurs →</Link>
            </article>
            <article className="pillar-card">
              <h3>Le Passeur de savoir</h3>
              <p>Les trucs et les savoirs de nos grands-parents, recueillis et transmis. Outil gratuit, sans compte — distinct de l'abonnement Les Passeurs.</p>
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

      {/* DÉTECTÔT PERMANENT (accueil seulement, 6 nov. 2026, go HP) : installé
          en flux, roue + description côte à côte. Le widget fixe est masqué
          sur l'accueil (voir __root.tsx) pour éviter le doublon. */}
      <section className="collections-strip" aria-label="Détectôt, la roue d'hamster d'HP Outils">
        <div className="container">
          <HamsterWheel permanent />
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
              <Link to="/pdf/$slug" params={{ slug: "enjeux-humanite" }} className="pillar-cta">Voir le produit →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>La faim justifie les moyens</h3>
              <p>Mieux manger avec peu : bases simples, recettes accessibles et réflexes anti-gaspillage. — 10 $ CAD, aucune taxe ajoutée</p>
              <Link to="/pdf/$slug" params={{ slug: "faim-justifie-les-moyens" }} className="pillar-cta">Voir le produit →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Les enfants cuisinent pour faire plaisir</h3>
              <p>Un projet doux pour transmettre le plaisir, pas la performance. — 10 $ CAD, aucune taxe ajoutée</p>
              <Link to="/pdf/$slug" params={{ slug: "enfants-cuisinent" }} className="pillar-cta">Voir le produit →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">04</span>
              <h3>Horizon Québec</h3>
              <p>Une nouvelle québécoise sur l'amitié, la langue, le Québec et ce qu'on essaie encore de tenir ensemble. — 10 $ CAD, aucune taxe ajoutée</p>
              <Link to="/pdf/$slug" params={{ slug: "horizon-quebec" }} className="pillar-cta">Voir le produit →</Link>
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
