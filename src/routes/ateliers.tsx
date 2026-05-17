import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ateliers")({
  head: () => ({
    meta: [
      { title: "Ateliers — Mettre les outils HP en mouvement" },
      { name: "description", content: "Les ateliers HP sont un prolongement vivant des outils : pour les groupes, organismes et milieux qui veulent réfléchir autrement." },
      { property: "og:title", content: "Ateliers — HP" },
      { property: "og:description", content: "Un prolongement vivant des outils HP." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="editorial-hero">
        <div className="container">
          <span className="editorial-kicker">Ateliers</span>
          <h1>Des ateliers pour mettre les outils en <em>mouvement</em>.</h1>
          <p className="lead">
            Les ateliers HP ne sont pas le centre du projet. Ils sont une façon
            d'amener les outils dans les groupes, les organismes et les milieux
            qui veulent réfléchir autrement.
          </p>
          <div className="lead-actions">
            <a className="btn-primary" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Demander un atelier</a>
            <a className="btn-ghost" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Rejoindre un direct</a>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>En direct chaque semaine</h3>
              <p>Réflexion IA le lundi 21 h, cuisine le mardi 18 h. Des rendez-vous simples, sans posture.</p>
              <a className="pillar-cta" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Rejoindre →</a>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Pour les organismes</h3>
              <p>Ateliers sur mesure dans les bibliothèques, écoles et milieux communautaires — à partir des outils existants.</p>
              <a className="pillar-cta" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Écrire →</a>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Sur le terrain</h3>
              <p>Interventions ponctuelles, conférences et collaborations. Ce qui sort des ateliers nourrit les prochains outils.</p>
              <a className="pillar-cta" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">En parler →</a>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
