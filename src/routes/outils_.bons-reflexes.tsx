import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/outils_/bons-reflexes")({
  head: () => createSeoHead({
    title: "Les bons réflexes d'HP | Outil interactif gratuit",
    description: "Un jeu interactif gratuit pour réfléchir aux situations du quotidien : cuisine, maison, entraide, émotions, sécurité et débrouillardise.",
    path: "/outils/bons-reflexes",
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
            Nouveauté HP
          </span>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link to="/outils" className="btn-ghost">← Retour aux outils</Link>
            <Link to="/livres-pdf" className="btn-ghost">Voir les PDF HP</Link>
          </div>
        </div>

        <header style={{ marginBottom: 24 }}>
          <h1 style={{ marginBottom: 8 }}>Les bons réflexes d'HP</h1>
          <p className="lead" style={{ marginBottom: 16 }}>
            Un jeu simple pour réfléchir aux choix du quotidien, sans pression et
            sans jugement.
          </p>
          <p style={{ marginBottom: 0 }}>
            Les bons réflexes d'HP propose de petites situations inspirées de la
            vraie vie : cuisine, maison, entraide, émotions, sécurité,
            débrouillardise. Disponible en français, anglais et espagnol.
          </p>
        </header>

        <div style={{ display: "flex", justifyContent: "center", margin: "16px 0 8px" }}>
          <a
            href="/apps/bons-reflexes/index.html"
            className="btn-primary"
            style={{
              display: "inline-block",
              background: "#b04a2f",
              color: "#fff",
              padding: "14px 28px",
              borderRadius: 999,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 8px 20px rgba(176,74,47,.25)",
            }}
          >
            Lancer le jeu →
          </a>
        </div>

        <p style={{ marginTop: 24, fontSize: 12, color: "rgba(58,42,32,.6)", lineHeight: 1.6, textAlign: "center" }}>
          © HP 2026. Tous droits réservés. Outil éducatif informatif. Ne remplace
          pas un avis médical, psychologique, juridique, sexologique ou
          professionnel. En situation de danger immédiat, contactez les services
          d'urgence de votre région.
        </p>
      </div>
    </section>
  );
}