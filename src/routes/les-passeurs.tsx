import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/les-passeurs")({
  head: () => createSeoHead({
    title: "Les Passeurs — l'accès au savoir pour 3 $ CAD par mois",
    description: "Les Passeurs soutiennent les jeux, les livres et les outils gratuits de HP Outils. L'accès au savoir : 3 $ CAD par mois (ou 28 $ CAD pour l'année). Aucune taxe ajoutée (petit fournisseur). L'inscription est ouverte : écris à la direction pour t'inscrire.",
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
          <h1>Trois dollars par mois. <em>Vingt-huit dollars pour l'année.</em> C'est tout.</h1>
          <p className="lead">
            HP Outils fabrique des jeux, des livres et des outils pour la vraie vie — pensés pour les familles, les petits budgets et celles et ceux qui veulent apprendre. Beaucoup sont gratuits, et on veut que ça reste comme ça.
          </p>
          <div className="lead-actions">
            <Link to="/prix" className="btn-primary">Voir les produits</Link>
            <a className="btn-ghost" href="mailto:hpoutils.admin@gmail.com?subject=Inscription%20Les%20Passeurs">Écrire à la direction humaine</a>
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
              <p>35 jeux qui restent gratuits pour tout le monde, sans inscription.</p>
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
          <h3>C'est 3 $ CAD / mois — ou 28 $ CAD / an. Accès aux 16 savoirs.</h3>
          <p className="strip-intro" style={{ marginTop: 4 }}>L'abonnement, c'est l'accès à des astuces que les autres n'ont pas.</p>
          <p className="strip-intro" style={{ marginTop: 4 }}>Aucune taxe ajoutée : petit fournisseur, la TPS et la TVQ ne sont pas perçues.</p>
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
              L'inscription est ouverte.
            </p>
            <p style={{ lineHeight: 1.7, color: "#3a2a20" }}>
              Pour t'inscrire, <a href="mailto:hpoutils.admin@gmail.com?subject=Inscription%20Les%20Passeurs">écris à la direction</a> en précisant la formule (3 $ / mois ou 28 $ / an) — un humain te répond sous 3 jours
              ouvrables avec les détails. Aucun paiement n'est demandé ici : la direction
              te confirme les détails avant tout prélèvement. Le paiement automatisé en
              ligne, lui, s'en vient. Et tout ce qui est gratuit sur HP Outils le reste.
            </p>
            <div className="lead-actions" style={{ marginTop: 16 }}>
              <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com?subject=Inscription%20Les%20Passeurs">S'inscrire en écrivant à la direction</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
