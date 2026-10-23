import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/les-passeurs")({
  head: () => createSeoHead({
    title: "Les Passeurs — soutenir HP Outils pour 1 $ par mois",
    description: "Les Passeurs soutiendront les jeux, les livres et les outils gratuits de HP Outils pour un dollar par mois. L'inscription n'est pas encore en ligne : aucun paiement n'est demandé pour l'instant.",
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
          <div className="lead-actions">
            <Link to="/jeux" className="btn-primary">Voir les produits</Link>
            <Link to="/contact" className="btn-ghost">Une question ? Écris-moi</Link>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Les Passeurs</span>
          <h2 className="section-title">Le monde qui tient ça debout</h2>
          <p className="strip-intro">
            Les Passeurs, c'est le monde qui tient ça debout: un petit montant qui revient chaque mois et qui fait passer le savoir d'une main à l'autre, comme les passeurs de savoir l'ont toujours fait.
          </p>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>Les jeux gratuits</h3>
              <p>26 jeux qui restent gratuits pour tout le monde, sans inscription.</p>
              <Link to="/jeux" className="pillar-cta">Voir les jeux →</Link>
            </article>
            <article className="pillar-card">
              <h3>Les livres et les kits</h3>
              <p>Des livres et des kits PDF à petit prix, pensés pour la vraie vie.</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir les livres →</Link>
            </article>
            <article className="pillar-card">
              <h3>Les outils gratuits</h3>
              <p>Des outils web gratuits, sans compte, pour les papiers, le budget et le quotidien.</p>
              <Link to="/outils" className="pillar-cta">Voir les outils →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Simple et clair</span>
          <h2>Pas de contrat déguisé, <em>pas de promesse en l'air.</em></h2>
          <p className="strip-intro">Juste: tu passes, et d'autres reçoivent.</p>
          <h3>Ce sera 1 $ / mois — ou 12 $ / an.</h3>
          <div
            style={{
              maxWidth: 640,
              margin: "24px auto 0",
              border: "1px solid rgba(58,42,32,.25)",
              borderLeft: "4px solid #3a2a20",
              borderRadius: 8,
              background: "rgba(247,244,236,.85)",
              padding: "18px 22px",
              textAlign: "left",
            }}
          >
            <p style={{ fontWeight: 700, marginBottom: 8, color: "#2a1a12" }}>
              L'inscription n'est pas encore en ligne.
            </p>
            <p style={{ lineHeight: 1.7, color: "#3a2a20" }}>
              Le programme se prépare : le bouton d'inscription s'en vient, mais il n'est pas encore
              là — aucun montant n'est prélevé d'ici là, et tout ce qui est gratuit sur HP Outils
              le reste. Tu veux être prévenu·e quand ça ouvre ?{" "}
              <Link to="/contact">Écris-moi</Link> — et merci de vouloir passer le savoir.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
