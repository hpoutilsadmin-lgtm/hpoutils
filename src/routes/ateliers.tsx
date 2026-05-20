import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/ateliers")({
  head: () => ({
    meta: [
      { title: "Ateliers HP — prolonger les outils sur le terrain" },
      { name: "description", content: "Les ateliers HP prolongent les outils dans les groupes, les organismes et les milieux qui veulent réfléchir autrement." },
      { property: "og:title", content: "Ateliers — HP" },
      { property: "og:description", content: "Ateliers cuisine, IA / esprit critique, BD HP et activités sur mesure." },
    ],
  }),
  component: Page,
});

const ATELIERS = [
  { title: "Atelier cuisine", desc: "Cuisiner simple, comprendre les bases, utiliser ce qu'on a — sans recettes parfaites ni jugement." },
  { title: "Atelier IA / esprit critique", desc: "Comprendre les outils, les risques, les bons réflexes et les dérives, sans panique." },
  { title: "Atelier BD HP", desc: "Créer une page BD personnalisée à partir d'un personnage, d'une émotion, d'un thème et d'un décor." },
  { title: "Activité sur mesure", desc: "Adapter un atelier à votre milieu — école, organisme, équipe, famille élargie." },
];

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Ateliers HP</span>
          <h1>Des ateliers pour mettre les outils en <em>mouvement</em>.</h1>
          <p className="lead">
            Les ateliers HP prolongent les outils dans les groupes, les organismes
            et les milieux qui veulent réfléchir autrement. Ils ne sont pas le
            centre du projet : ils sont une façon de faire vivre les ressources sur
            le terrain.
          </p>
          <div className="lead-actions">
            <a className="btn-primary" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Demander un atelier</a>
            <Link to="/outils" className="btn-ghost">Voir les outils</Link>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <div className="pillar-grid">
            {ATELIERS.map((a, i) => (
              <article key={a.title} className="pillar-card">
                <span className="pillar-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </article>
            ))}
          </div>
          <div className="lead-actions" style={{ marginTop: 32, justifyContent: "center" }}>
            <a className="btn-primary" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Demander un atelier</a>
          </div>
        </div>
      </section>
    </>
  );
}
