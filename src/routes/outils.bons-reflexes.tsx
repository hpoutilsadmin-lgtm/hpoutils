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
    <section className="subpage-content hp-reflexes-app">
      <div className="container" style={{ maxWidth: 1100, padding: "32px 16px 64px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 20,
        }}>
          <span style={{
            display: "inline-block",
            background: "rgba(176,74,47,.12)",
            color: "#b04a2f",
            padding: "4px 10px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: ".04em",
            textTransform: "uppercase",
          }}>
            Brouillon — non public — Version 6.3
          </span>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link to="/outils" className="btn-ghost">← Retour aux outils</Link>
            <Link to="/livres-pdf" className="btn-ghost">Voir les PDF HP</Link>
          </div>
        </div>

        <div style={{
          borderRadius: 22,
          overflow: "hidden",
          border: "1px solid rgba(231,216,174,.8)",
          boxShadow: "0 10px 26px rgba(0,0,0,.07)",
          background: "#f6f1e7",
        }}>
          <iframe
            src="/apps/bons-reflexes/index.html"
            title="Les bons réflexes d'HP — Version 6.3"
            style={{
              display: "block",
              width: "100%",
              height: "min(1400px, 90vh)",
              minHeight: 900,
              border: "0",
              background: "transparent",
            }}
            loading="lazy"
          />
        </div>

        <p style={{ marginTop: 24, fontSize: 12, color: "rgba(58,42,32,.6)", lineHeight: 1.6, textAlign: "center" }}>
          © HP 2026. Tous droits réservés. Outil éducatif informatif. Ne remplace
          pas un avis médical, psychologique, juridique, sexologique ou
          professionnel. En situation de danger immédiat, contacte les services
          d'urgence de ta région.
        </p>
      </div>
    </section>
  );
}