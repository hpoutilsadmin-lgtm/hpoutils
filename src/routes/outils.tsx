import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/outils")({
  head: () => ({
    meta: [
      { title: "Outils — Le cœur du projet HP" },
      { name: "description", content: "PDF téléchargeables, exercices guidés, guides pratiques, questionnaires et mini-outils de réflexion pour la vraie vie." },
      { property: "og:title", content: "Outils — HP" },
      { property: "og:description", content: "Des outils numériques simples pour mettre des mots, faire le tri et avancer." },
    ],
  }),
  component: Page,
});

type Tool = { title: string; desc: string; tag: string; cta?: string; href?: string };

const SECTIONS: { title: string; intro: string; items: Tool[] }[] = [
  {
    title: "À lire et télécharger",
    intro: "Des documents prêts à imprimer, à coller au frigo ou à garder dans son téléphone.",
    items: [
      { title: "Pages à arracher", desc: "Une page, une idée. À sortir du PDF quand tu en as besoin.", tag: "PDF" },
      { title: "Kit Sans Honte — Frigo", desc: "Repères concrets pour manger sans se juger.", tag: "PDF" },
      { title: "Guide rapide Tenir Debout", desc: "Quand la journée tient sur un fil.", tag: "PDF" },
    ],
  },
  {
    title: "Pour faire le tri",
    intro: "Pour mettre des mots, faire le tri, sortir du brouillard.",
    items: [
      { title: "Le tri du jour", desc: "10 minutes pour séparer ce qui est à toi de ce qui ne l'est pas.", tag: "Exercice" },
      { title: "La carte de la honte", desc: "Nommer ce qu'on cache, doucement.", tag: "Exercice" },
      { title: "Le filtre IA", desc: "Avant d'utiliser l'IA, se poser trois questions.", tag: "Exercice" },
    ],
  },
  {
    title: "Guides pour la vraie vie",
    intro: "Des pas-à-pas humains, pas des recettes magiques.",
    items: [
      { title: "Cuisiner avec ce qu'on a", desc: "Méthode simple pour éviter le gaspillage et nourrir vrai.", tag: "Guide" },
      { title: "Parler à un ado qui ne parle plus", desc: "Repères pour ne pas tout casser.", tag: "Guide" },
      { title: "Sortir d'une boucle perfectionniste", desc: "Des sorties d'urgence, pas des solutions.", tag: "Guide" },
    ],
  },
  {
    title: "Questionnaires et formulaires",
    intro: "Pour se situer, sans note ni jugement.",
    items: [
      { title: "Où j'en suis cette semaine ?", desc: "12 questions courtes pour faire le point.", tag: "Formulaire", href: "https://tally.so/r/A7AYGW" },
      { title: "Mon rapport à la performance", desc: "Voir où ça serre, où ça respire.", tag: "Formulaire", href: "https://tally.so/r/A7AYGW" },
      { title: "Demander un atelier sur mesure", desc: "Pour les groupes et organismes.", tag: "Formulaire", href: "https://tally.so/r/Pd8YeV" },
    ],
  },
  {
    title: "Petits outils à garder près de soi",
    intro: "Des petits formats qui tiennent dans la poche.",
    items: [
      { title: "3 phrases pour aujourd'hui", desc: "Choisir ce qu'on porte, et ce qu'on laisse tomber.", tag: "Mini-outil" },
      { title: "Outil ou piège ?", desc: "Tester un outil numérique avant qu'il te teste.", tag: "Mini-outil" },
      { title: "La phrase qu'on ne dit pas", desc: "Sortir une chose, en sécurité.", tag: "Mini-outil" },
    ],
  },
];

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Outils HP</span>
          <h1>Outils <em>HP</em>.</h1>
          <p className="lead">
            Des outils simples pour mettre des mots, faire le tri et avancer sans
            se perdre dans la perfection.
          </p>
        </div>
      </section>

      {/* OUTILS SANS HONTE — mis en avant */}
      <section className="tool-section">
        <div className="container">
          <header className="tool-section-head">
            <h2>Outils Sans Honte</h2>
            <p>La collection Sans Honte en format PDF — pour mettre des mots sur ce qu'on porte et reprendre un peu de place sans se juger.</p>
          </header>
          <div className="tool-grid">
            <article className="tool-card">
              <span className="tool-tag">Collection PDF — 60 $ CAD</span>
              <h3>Collection Sans Honte — 10 kits</h3>
              <p>
                Les 10 kits Sans Honte en un seul PDF — Papiers, Frigo, Tenir Debout,
                Seconde Main, Entraide et plus. Téléchargement immédiat après paiement.
              </p>
              <Link to="/pdf/$slug" params={{ slug: "sans-honte-collection" }}>Découvrir la collection PDF →</Link>
            </article>
            <article className="tool-card">
              <span className="tool-tag">Kit PDF — 10 $ CAD</span>
              <h3>Kit Sans Honte (au choix)</h3>
              <p>
                Un kit PDF pour explorer la honte, mettre des mots sur ce qu'on porte
                et reprendre un peu de place sans se juger.
              </p>
              <Link to="/livres-pdf">Voir les kits PDF →</Link>
            </article>
          </div>
        </div>
      </section>

      {SECTIONS.map((s) => (
        <section key={s.title} className="tool-section">
          <div className="container">
            <header className="tool-section-head">
              <h2>{s.title}</h2>
              <p>{s.intro}</p>
            </header>
            <div className="tool-grid">
              {s.items.map((t) => (
                <article key={t.title} className="tool-card">
                  <span className="tool-tag">{t.tag}</span>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                  {t.href ? (
                    <a href={t.href} target="_blank" rel="noopener noreferrer">{t.cta ?? "Ouvrir"} →</a>
                  ) : (
                    <Link to="/livres-pdf">{t.cta ?? "Découvrir"} →</Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="tool-section">
        <div className="container">
          <header className="tool-section-head">
            <h2>Application d'outils HP</h2>
            <p>Bientôt — pour utiliser certains outils HP directement en ligne.</p>
          </header>
          <div className="tool-grid">
            <article className="tool-card" style={{ opacity: 0.85 }}>
              <span className="tool-tag" style={{ background: "rgba(176,74,47,.12)", color: "#b04a2f" }}>Bientôt disponible</span>
              <h3>Application d'outils HP</h3>
              <p>
                Une petite application pour utiliser certains outils HP directement
                en ligne. Elle permettra de réfléchir, remplir, choisir ou explorer
                des ressources sans devoir tout télécharger.
              </p>
              <span style={{ opacity: 0.6, fontWeight: 600 }} aria-disabled>Bientôt disponible</span>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
