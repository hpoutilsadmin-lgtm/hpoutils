import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/outils/bons-reflexes")({
  head: () => ({
    meta: [
      { title: "Les bons réflexes d'HP — Brouillon" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Brouillon non public de l'application interactive Les bons réflexes d'HP." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <section className="subpage-content">
      <div className="container" style={{ maxWidth: 760, padding: "64px 24px" }}>
        <p style={{
          display: "inline-block",
          background: "rgba(176,74,47,.12)",
          color: "#b04a2f",
          padding: "4px 10px",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: ".04em",
          textTransform: "uppercase",
          marginBottom: 16,
        }}>
          Brouillon — non public
        </p>
        <h1 style={{ fontFamily: "Georgia,serif", color: "#2a1a12" }}>
          Les bons réflexes d'HP
        </h1>
        <p style={{ lineHeight: 1.8, color: "#3a2a20" }}>
          Cette page accueillera bientôt l'application interactive « Les bons
          réflexes d'HP » — Version 6.3. Pour l'instant, elle reste cachée du
          menu principal et n'est pas indexée par les moteurs de recherche.
        </p>
        <p style={{ lineHeight: 1.8, color: "#3a2a20" }}>
          L'intégration du composant React (catégories, groupes d'âge,
          progression, score, conseils HP, visuels, sons) sera ajoutée ici, avec
          des styles scopés à <code>.hp-reflexes-app</code> pour ne pas affecter
          le reste du site HP.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
          <Link to="/outils" className="btn-primary">Retour aux outils</Link>
          <Link to="/livres-pdf" className="btn-ghost">Voir les PDF HP</Link>
        </div>

        <p style={{ marginTop: 48, fontSize: 12, color: "rgba(58,42,32,.6)", lineHeight: 1.6 }}>
          © HP 2026. Tous droits réservés. Outil éducatif informatif. Ne remplace
          pas un avis médical, psychologique, juridique, sexologique ou
          professionnel. En situation de danger immédiat, contacte les services
          d'urgence de ta région.
        </p>
      </div>
    </section>
  );
}