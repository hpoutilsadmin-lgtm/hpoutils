import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";
import { ShareButton } from "@/components/ShareButton";

const FAQ = [
  {
    q: "Combien coûte un kit Sans Honte ?",
    a: "5 $ CAD le kit, ou 40 $ CAD pour 10 kits au choix parmi les 15. HP est petit fournisseur : aucune taxe n'est ajoutée.",
  },
  {
    q: "Le kit Testament remplace-t-il un notaire ?",
    a: "Non. Le kit aide à préparer un testament olographe au Québec, pas à pas ; ce n'est pas un avis juridique. Pour une situation complexe, un notaire reste la bonne porte.",
  },
  {
    q: "Comment je reçois mon kit après l'achat ?",
    a: "Par téléchargement immédiat après le paiement : un PDF imprimable, à utiliser seul, avec un proche ou dans un contexte d'intervention.",
  },
  {
    q: "Comment je choisis mes 10 kits ?",
    a: "Tu coches tes 10 kits sur la page d'achat, avant le paiement. Les 15 titres parmi lesquels tu choisis sont listés dans le bandeau du bundle, juste au-dessus.",
  },
  {
    q: "Combien de temps mon lien de téléchargement reste-t-il valide ?",
    a: "Après le paiement, vous recevez un lien de téléchargement personnel, valide 7 jours. Téléchargez votre fichier dès que vous le recevez, et gardez-le.",
  },
  {
    q: "Et si je ne retrouve plus mon achat ?",
    a: "Le courriel n'arrive pas, ou votre lien est expiré ? La page Récupérer un achat vous redonne accès à ce que vous avez acheté — ou écrivez-nous.",
  },
];

export const Route = createFileRoute("/sans-honte")({
  head: () => ({
    ...createSeoHead({
      title: "Collection Sans Honte : 15 kits PDF | HP — Québec",
      description: "15 kits PDF concrets : papiers, frigo, logement, entraide… 5 $ CAD le kit, 40 $ CAD pour 10 kits au choix. Aucune taxe ajoutée.",
      path: "/sans-honte",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Collection Sans Honte — 10 kits au choix (PDF)",
          description:
            "Le bundle regroupe 10 kits Sans Honte au choix, parmi les 15 de la collection, en format PDF.",
          brand: { "@id": "https://www.hp-outils.com/#organisation" },
          offers: {
            "@type": "Offer",
            url: "https://www.hp-outils.com/pdf/sans-honte-collection",
            priceCurrency: "CAD",
            price: "40.00",
            availability: "https://schema.org/InStock",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Page,
});

const QUOTES = [
  "Ce qu'on cache prend toute la place.",
  "La honte n'a jamais aidé personne à se relever.",
  "On peut être en désordre et debout en même temps.",
  "Tu n'as rien à prouver pour avoir le droit d'exister.",
];

const KITS = [
  { n: "01", cover: "/images/sans-honte/kit-01.jpg", title: "Papiers Sans Honte", sub: "Reprendre le contrôle de ses papiers.", slug: "sans-honte-papiers" },
  { n: "02", cover: "/images/sans-honte/kit-02.jpg", title: "Me Reconnaître Sans Honte", sub: "Se retrouver quand on s'est perdu·e de vue.", slug: "sans-honte-me-reconnaitre" },
  { n: "03", cover: "/images/sans-honte/kit-03.jpg", title: "Frigo Sans Honte", sub: "Manger vrai avec ce qu'on a.", slug: "sans-honte-frigo" },
  { n: "04", cover: "/images/sans-honte/kit-04.jpg", title: "Tenir Debout Sans Honte", sub: "Quand la journée tient sur un fil.", slug: "sans-honte-tenir-debout" },
  { n: "05", cover: "/images/sans-honte/kit-05.jpg", title: "Seconde Main Sans Honte", sub: "S'habiller, se meubler, sans se juger.", slug: "sans-honte-seconde-main" },
  { n: "06", cover: "/images/sans-honte/kit-06.jpg", title: "Entraide Sans Honte", sub: "Demander, donner, recevoir.", slug: "sans-honte-entraide" },
  { n: "07", cover: "/images/sans-honte/kit-07.jpg", title: "Fraude Sans Honte", sub: "Se protéger, sans avoir l'air naïf·ve.", slug: "sans-honte-fraude" },
  { n: "08", cover: "/images/sans-honte/kit-08.jpg", title: "Logement Sans Honte", sub: "Habiter, garder, retrouver un chez-soi.", slug: "sans-honte-logement" },
  { n: "09", cover: "/images/sans-honte/kit-09.jpg", title: "Proche Aidant Sans Honte", sub: "Aider sans s'oublier.", slug: "sans-honte-proche-aidant" },
  { n: "10", cover: "/images/sans-honte/kit-10.jpg", title: "72 Heures Sans Honte", sub: "Tenir trois jours quand tout bascule.", slug: "sans-honte-72-heures" },
  { n: "11", cover: "/images/sans-honte/kit-11.jpg", title: "Testament Sans Honte", sub: "Préparer un testament olographe au Québec, pas à pas.", slug: "sans-honte-testament" },
  { n: "12", cover: "/images/sans-honte/kit-12.jpg", title: "Papiers de mes parents Sans Honte", sub: "Organiser les papiers de ses parents, sans honte.", slug: "sans-honte-papiers-parents" },
  { n: "13", cover: "/images/sans-honte/kit-13.jpg", title: "Chalet Sans Honte", sub: "Des règles claires pour partager le chalet.", slug: "sans-honte-chalet" },
  { n: "14", cover: "/images/sans-honte/kit-14.jpg", title: "L'année québécoise Sans Honte", sub: "Des repères pour l'année québécoise.", slug: "sans-honte-annee-quebecoise" },
  { n: "15", cover: "/images/sans-honte/kit-15.jpg", title: "Héritage numérique Sans Honte", sub: "Préparer la transmission de son héritage numérique.", slug: "sans-honte-heritage-numerique" },
];

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="kicker">Collection</span>
          <h1>Sans <em>Honte</em>.</h1>
          <p className="lead">
             Quinze kits PDF concrets pour faire face aux papiers, au frigo, au logement,
             à l'entraide et à d'autres situations de la vraie vie.
          </p>
          <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.55, marginTop: 14, maxWidth: 700 }}>« J'ai jamais su qui j'étais ni ce que j'aimais. Alors je fais un peu de tout — et j'en ai fait des kits d'aide sans honte — oui, ça aussi, c'est la vraie vie. »</p>
          <div className="lead-actions">
            <ShareButton text="Sans Honte — quinze kits PDF concrets pour la vraie vie, 5 $ CAD le kit, aucune taxe ajoutée." />
          </div>
        </div>
      </section>

      <section id="sec-kits" className="subpage-content">
        <div className="container">
          <div style={{ maxWidth: 760, margin: "0 auto 48px", textAlign: "center" }}>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "#3a2a20" }}>
              Créée pour aider à mieux comprendre ce qu'on vit sans se juger ni
              devoir bien paraître, cette collection propose une approche simple,
              humaine et accessible.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(58,42,32,.75)", fontStyle: "italic", marginTop: 16 }}>
              À utiliser seul, avec un proche ou dans un contexte d'intervention.
            </p>
          </div>
          <h2 className="section-title">15 kits — La collection complète</h2>
          <p style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 32px", color: "#5a4a3f", fontSize: 16 }}>
              Chaque kit est un PDF imprimable — 5 $ CAD, aucune taxe ajoutée, téléchargement immédiat après paiement.
          </p>
          <div className="library-grid">
            {KITS.map((k) => (
              <article key={k.n} className="library-item kit-item">
                <div className="library-cover" onContextMenu={(e) => e.preventDefault()}>
                  <img src={k.cover} alt={`Couverture — ${k.title}`} loading="lazy" draggable={false} />
                  <span className="kit-badge">N°{k.n}</span>
                  <span className="kit-watermark">Aperçu • HP</span>
                </div>
                <div className="library-meta"><span className="dot" />Kit PDF — 5 $ CAD, aucune taxe ajoutée</div>
                <h3>{k.title}</h3>
                <p>{k.sub}</p>
                <Link className="lib-link" to="/pdf/$slug" params={{ slug: k.slug }}>Découvrir le kit PDF →</Link>
              </article>
            ))}
          </div>
          <div className="cta-band" style={{ marginTop: 48 }}>
            <div>
              <h3>Le bundle — Choisis 10 kits parmi 15</h3>
               <p>Choisis 10 kits parmi les 15 de la collection Sans Honte — 40 $ CAD, aucune taxe ajoutée. Téléchargement immédiat.</p>
               <p><strong>Économie de 10 $ :</strong> achetés un par un, 10 kits coûteraient 50 $ — le bundle est à 40 $.</p>
               <p>Les 15 titres parmi lesquels tu choisis tes 10 : {KITS.map((k) => k.title).join(" · ")}.</p>
               <p>Tu coches tes 10 kits sur la page d'achat, avant le paiement.</p>
            </div>
            <Link className="action-btn" to="/pdf/$slug" params={{ slug: "sans-honte-collection" }}>Découvrir la collection PDF</Link>
          </div>
        </div>
      </section>

      <section className="subpage-content">
        <div className="container">
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto",
              border: "1px solid rgba(122,74,38,.35)",
              borderLeft: "4px solid #7a4a26",
              background: "rgba(247,244,236,.9)",
              borderRadius: 8,
              padding: "22px 26px",
            }}
          >
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: 24, marginBottom: 10, color: "#2a1a12" }}>
              Si ça devient trop lourd
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "#3a2a20", marginBottom: 10 }}>
              Ces kits aident à avancer à son rythme, une petite étape à la fois.{" "}
              <strong>Ils ne remplacent pas un professionnel de la santé.</strong> Certains parlent
              de moments lourds — Tenir Debout, Me Reconnaître, Proche Aidant, 72 Heures. Si ce que
              tu traverses devient trop lourd — pour toi ou pour un proche que tu aides — de l'aide
              existe, gratuite et sans jugement :
            </p>
            <ul style={{ fontSize: 16, lineHeight: 1.7, color: "#3a2a20", marginBottom: 10, paddingLeft: 20 }}>
              <li>
                <strong>988</strong> — Ligne d'aide en cas de crise de suicide (partout au Canada) :
                appelle ou texte le 988, en tout temps.
              </li>
              <li>
                <strong>811, option 2</strong> — Info-Social (Québec) : des intervenants
                psychosociaux, en tout temps.
              </li>
            </ul>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "#3a2a20" }}>
              Les organismes d'aide et d'écoute de ta région peuvent aussi t'accompagner. Pour les
              proches aidants, L'Appui est là pour ça.
            </p>
          </div>
        </div>
      </section>

      <section className="strong-quotes">
        <div className="container">
          <h2 className="section-title">Phrases fortes</h2>
          <div className="quote-grid">
            {QUOTES.map((q) => (
              <blockquote key={q} className="strong-quote">« {q} »</blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="subpage-content">
        <div className="container">
          <h2 className="section-title">Questions fréquentes</h2>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            {FAQ.map((f) => (
              <article key={f.q} style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 20, marginBottom: 8 }}>{f.q}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: "#3a2a20" }}>{f.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <h2 className="section-title">Outils associés</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">→</span>
              <h3>La carte de la honte</h3>
              <p>Un exercice court pour nommer ce qui pèse, sans avoir à l'expliquer à personne.</p>
              <Link to="/outils" className="pillar-cta">Ouvrir l'exercice</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">→</span>
              <h3>La phrase qu'on ne dit pas</h3>
              <p>Sortir une chose, en privé, et voir ce que ça change.</p>
              <Link to="/outils" className="pillar-cta">Ouvrir l'outil</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">→</span>
              <h3>Le tri du jour</h3>
              <p>10 minutes pour séparer ce qui est à toi de ce qui ne l'est pas.</p>
              <Link to="/outils" className="pillar-cta">Ouvrir l'outil</Link>
            </article>
          </div>
          <div className="cta-band" style={{ marginTop: 40 }}>
            <div>
              <h3>Rester en lien avec Sans Honte</h3>
              <p>Recevoir les nouveaux kits, les phrases et les textes — sans spam.</p>
            </div>
            <a className="action-btn" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Recevoir les nouvelles Sans Honte</a>
          </div>
        </div>
      </section>
    </>
  );
}
