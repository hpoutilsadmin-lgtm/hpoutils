import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/outils_/hp-hyper-potentiel")({
  head: () => createSeoHead({
    title: "Un petit pas à la fois | Outil interactif gratuit",
    description: "Respiration guidée, carte ikigaï interactive et plan WOOP : l'outil web gratuit compagnon du mini cahier Un petit pas à la fois. Sans compte, tes données restent sur ton appareil.",
    path: "/outils/hp-hyper-potentiel",
  }),
  component: Page,
});

function Page() {
  return (
    <section className="subpage-content hp-hyper-potentiel-app">
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
            <Link to="/pdf/$slug" params={{ slug: "mini-cahier-hyper-potentiel" }} className="btn-ghost">La fiche du mini cahier</Link>
          </div>
        </div>

        <header style={{ marginBottom: 24 }}>
          <h1 style={{ marginBottom: 8 }}>Un petit pas à la fois</h1>
          <p className="lead" style={{ marginBottom: 16 }}>
            Comme un petit dinosaure qui fait la grande traversée : trois modules pour respirer, clarifier
            ce qui compte et passer à l'action — gratuitement, sans compte.
          </p>
          <p style={{ marginBottom: 0 }}>
            Respire avec moi (respiration guidée animée), Ta carte ikigaï (les
            quatre questions, en format interactif) et Ton plan WOOP (un souhait,
            un résultat, un obstacle, un plan — avec un engagement doux de
            7 jours). Tout se fait sur ton appareil : aucune donnée ne sort d'ici.
            C'est le compagnon gratuit du mini cahier du même nom — l'écran te
            guide ; le papier te fait écrire, et durer.
          </p>
        </header>

        <div style={{ display: "flex", justifyContent: "center", margin: "16px 0 8px" }}>
          <a
            href="/apps/hp-hyper-potentiel/index.html"
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
            Lancer l'outil →
          </a>
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
