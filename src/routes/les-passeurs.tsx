import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/les-passeurs")({
  head: () => createSeoHead({
    title: "Les Passeurs — l'accès au savoir pour 3 $ CAD par mois",
    description: "Les Passeurs soutiennent les jeux, les livres et les outils gratuits de HP Outils. L'accès au savoir : 3 $ CAD par mois (ou 28 $ CAD pour l'année). Aucune taxe ajoutée (petit fournisseur). L'inscription par courriel est ouverte : écrivez à la direction humaine pour vous inscrire. Le paiement automatisé en ligne s'en vient. Aucun prélèvement sans confirmation.",
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
              <p>37 + 1 caché jeux qui restent gratuits pour tout le monde, sans inscription.</p>
              <Link to="/jeux" className="pillar-cta">Voir les jeux →</Link>
            </article>
            <article className="pillar-card">
              <h3>Les livres et les kits</h3>
              <p>Des livres et des kits PDF à petit prix, pensés pour la vraie vie.</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir les livres →</Link>
            </article>
            <article className="pillar-card">
              <h3>Les outils gratuits</h3>
              <p>Huit outils pour la vraie vie : préparer son héritage, trancher une décision, comprendre la paperasse, comparer les prix, préparer un appel difficile, savoir quelle démarche faire, garder ses codes en sécurité et suivre les promesses — qui doit quoi, pour quand.</p>
              <Link to="/outils" className="pillar-cta">Voir les outils →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Simple et clair</span>
          <h2>Juste : vous passez, et d'autres reçoivent.</h2>
          
          <h3>C'est 3 $ CAD / mois — ou 28 $ CAD / an. Les 16 savoirs choisis par HP — de lire à connaître ses droits — en feuilles à consulter au fur et à mesure de leur parution, 3 par trimestre au maximum.</h3>
          <p className="strip-intro" style={{ marginTop: 4 }}>L'abonnement, c'est l'accès aux feuilles Passeurs, au fur et à mesure de leur parution — les outils gratuits d'HP restent gratuits pour tout le monde.</p>
          <p className="strip-intro" style={{ marginTop: 4 }}>L'annulation est immédiate, effet à la fin de la période déjà payée, sans frais, sans relance. Aucun prélèvement automatique n'est pris sans votre confirmation préalable des détails par courriel. Information générale, pas un avis juridique.</p>
          <p className="strip-intro" style={{ marginTop: 4 }}>Vous gardez l'accès aux feuilles Passeurs parues jusqu'à la fin de la période déjà payée, puis l'abonnement s'arrête. L'annulation est immédiate et prend effet à la fin de la période déjà payée, sans frais, sans relance. Si un problème survient, la direction humaine vous répond sous 3 jours ouvrables, lundi à vendredi.</p>
          <p className="strip-intro" style={{ marginTop: 4 }}>Pour annuler : l'annulation est immédiate, effet à la fin de la période déjà payée, sans frais, sans relance. Pour les abonnés existants, le lien reçu dans le courriel de bienvenue reste le geste à utiliser, sans être présenté comme le mécanisme final. Si vous avez un problème, écrivez à la direction humaine : la direction humaine vous répond sous 3 jours ouvrables, lundi à vendredi.</p>
          <p className="strip-intro" style={{ marginTop: 4 }}>Aucune taxe ajoutée : petit fournisseur, la TPS et la TVQ ne sont pas perçues.</p>
          <p className="strip-intro" style={{ marginTop: 12, textAlign: "left", maxWidth: 640, margin: "12px auto 0" }}><strong>Les 16 savoirs :</strong> 1. Lire vite et comprendre ; 2. Écrire clairement ; 3. Parler et se faire comprendre, y compris devant un groupe ; 4. Math du quotidien ; 5. Finances personnelles ; 6. Pensée critique ; 7. Apprendre à apprendre ; 8. Santé de base ; 9. Gestion du stress et des émotions ; 10. Négociation et vente ; 11. Écoute et relations ; 12. Gestion du temps et de l'attention ; 13. Littératie numérique et IA ; 14. Cuisiner ; 15. Réparer et bricoler ; 16. Notions de droit.</p>
          <p className="strip-intro" style={{ marginTop: 4, textAlign: "left", maxWidth: 640, margin: "4px auto 0" }}><em>Cet ordre est un jugement, pas une vérité : selon la personne et son projet, les priorités changent.</em></p>
          <p className="strip-intro" style={{ marginTop: 4, textAlign: "left", maxWidth: 640, margin: "4px auto 0" }}>L'abonnement donne accès aux feuilles publiées, les suivantes à leur parution. La collection se remplit au fur et à mesure — elle n'est pas complète aujourd'hui.</p>
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
              Pour vous inscrire, <a href="mailto:hpoutils.admin@gmail.com?subject=Inscription%20Les%20Passeurs">écrivez à la direction humaine</a> en précisant la formule (3 $ / mois ou 28 $ / an) — la direction humaine vous répond sous 3 jours
              ouvrables avec les détails. Aucun paiement n'est demandé ici : la direction
              vous confirme les détails avant tout prélèvement. Le paiement automatisé en
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
