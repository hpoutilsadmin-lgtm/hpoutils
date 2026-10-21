import { createFileRoute } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/les-passeurs")({
  head: () => createSeoHead({
    title: "Les Passeurs — 1 $ par mois | HP Outils",
    description: "Un dollar par mois. Douze dollars pour l'année. C'est tout. Les Passeurs soutiennent les jeux, les livres et les outils pour la vraie vie de HP Outils.",
    path: "/les-passeurs",
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Les Passeurs</span>
          <h1>Un dollar par mois. <em>Douze dollars pour l'année.</em> C'est tout.</h1>
          <p className="lead">
            HP Outils fabrique des jeux, des livres et des outils pour la vraie vie — pensés pour les familles, les petits budgets et celles et ceux qui veulent apprendre. Beaucoup sont gratuits, et on veut que ça reste comme ça.
          </p>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Les Passeurs</span>
          <h2 className="section-title">Le monde qui tient ça debout</h2>
          <p className="strip-intro">
            Les Passeurs, c'est le monde qui tient ça debout: un petit montant qui revient chaque mois et qui fait passer le savoir d'une main à l'autre, comme les passeurs de savoir l'ont toujours fait.
          </p>
        </div>
      </section>

      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Simple et clair</span>
          <h2>Pas de contrat déguisé, <em>pas de promesse en l'air.</em></h2>
          <p className="strip-intro">Juste: tu passes, et d'autres reçoivent.</p>
          <h3>1 $ / mois — ou 12 $ / an.</h3>
        </div>
      </section>
    </>
  );
}
