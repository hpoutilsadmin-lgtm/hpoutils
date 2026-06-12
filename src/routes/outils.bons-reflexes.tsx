import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/outils/bons-reflexes")({
  head: () => ({
    meta: [
      { title: "Les bons réflexes d'HP | Outil interactif gratuit" },
      { name: "description", content: "Un jeu interactif gratuit pour réfléchir aux situations du quotidien : cuisine, maison, entraide, émotions, sécurité et débrouillardise." },
      { property: "og:title", content: "Les bons réflexes d'HP | Outil interactif gratuit" },
      { property: "og:description", content: "Un jeu interactif gratuit pour réfléchir aux situations du quotidien : cuisine, maison, entraide, émotions, sécurité et débrouillardise." },
      { property: "og:url", content: "https://www.hp-outils.com/outils/bons-reflexes" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://www.hp-outils.com/outils/bons-reflexes" },
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
            vraie vie. Le but n'est pas d'être parfait, mais de réfléchir,
            choisir, apprendre et parfois sourire un peu. Cuisine, maison,
            entraide, émotions, sécurité, débrouillardise : chaque question
            invite à développer des réflexes utiles au quotidien.
          </p>
        </header>

        <div style={{
          borderRadius: 22,
          overflow: "hidden",
          border: "1px solid rgba(231,216,174,.8)",
          boxShadow: "0 10px 26px rgba(0,0,0,.07)",
          background: "#f6f1e7",
        }}>
          <iframe
            src="/apps/bons-reflexes/index.html"
            title="Les bons réflexes d'HP — jeu interactif"
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