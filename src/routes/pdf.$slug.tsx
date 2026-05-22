import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getProductBySlug, type DigitalProduct } from "@/lib/products-catalog";

export const Route = createFileRoute("/pdf/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.product.title} — Aperçu PDF`
          : "Aperçu PDF",
      },
      {
        name: "description",
        content: loaderData
          ? `Aperçu de ${loaderData.product.title} — ${loaderData.product.priceLabel}. PDF téléchargeable après paiement.`
          : "",
      },
    ],
  }),
  notFoundComponent: () => (
    <section className="subpage-content">
      <div className="container" style={{ maxWidth: 720, textAlign: "center", padding: "64px 24px" }}>
        <h1>PDF introuvable</h1>
        <p>Cette ressource n'existe pas ou n'est plus disponible.</p>
        <Link to="/livres-pdf">Retour à la bibliothèque</Link>
      </div>
    </section>
  ),
  errorComponent: ({ error }) => (
    <section className="subpage-content">
      <div className="container" style={{ maxWidth: 720, textAlign: "center", padding: "64px 24px" }}>
        <h1>Erreur</h1>
        <p>{error.message}</p>
        <Link to="/livres-pdf">Retour à la bibliothèque</Link>
      </div>
    </section>
  ),
  component: Page,
});

function resolveFormat(p: DigitalProduct): "Version PDF" | "Kit PDF" | "Collection PDF" {
  if (p.formatLabel) return p.formatLabel;
  if (p.slug === "sans-honte-collection") return "Collection PDF";
  if (p.slug.startsWith("sans-honte-")) return "Kit PDF";
  return "Version PDF";
}

const DEFAULT_INCLUDES_KIT: string[] = [
  "Courts textes de réflexion",
  "Exercices simples",
  "Phrases fortes à garder près de soi",
  "Pistes pour écrire, déposer ou nommer",
  "Pages à imprimer ou utiliser à l'écran",
];

const DEFAULT_AUDIENCE: string[] = [
  "comprendre ce qu'elles vivent",
  "mettre des mots sur une situation",
  "réfléchir sans se juger",
  "avancer sans chercher une solution parfaite",
];

function buyLabel(fmt: "Version PDF" | "Kit PDF" | "Collection PDF"): string {
  if (fmt === "Kit PDF") return "Acheter le kit PDF";
  if (fmt === "Collection PDF") return "Acheter la collection PDF";
  return "Acheter le PDF";
}

function Page() {
  const { product } = Route.useLoaderData();
  const fmt = resolveFormat(product);
  const includes = product.includes ?? DEFAULT_INCLUDES_KIT;
  const audience = product.audience ?? DEFAULT_AUDIENCE;
  const shortDescription =
    product.shortDescription ??
    (fmt === "Kit PDF"
      ? "Un kit PDF pour explorer une facette de la honte, mettre des mots sur ce qui reste souvent caché et reprendre un peu de place sans se juger."
      : product.blurb);

  return (
    <>
      <section className="subpage-hero">
        <div className="container" style={{ maxWidth: 960 }}>
          <span className="editorial-kicker">Aperçu — {fmt}</span>
          <h1>{product.title}</h1>
          <p className="lead">{shortDescription}</p>
        </div>
      </section>

      <section className="subpage-content">
        <div
          className="container"
          style={{
            maxWidth: 960,
            display: "grid",
            gridTemplateColumns: "minmax(0, 320px) 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          <div>
            {product.cover && (
              <div className="library-cover cover-contain" style={{ marginBottom: 16 }}>
                <img src={product.cover} alt={`Couverture ${product.title}`} loading="lazy" />
              </div>
            )}
            <div className="library-meta" style={{ marginBottom: 8 }}>
              <span className="dot" />
              {fmt} — {product.priceLabel}
            </div>
            <p style={{ fontSize: 14, color: "rgba(58,42,32,.7)", fontStyle: "italic", marginBottom: 16 }}>
              PDF téléchargeable immédiatement après paiement.
            </p>
            <Link
              to="/achat/$slug"
              params={{ slug: product.slug }}
              className="btn-primary"
              style={{ display: "inline-block" }}
            >
              {buyLabel(fmt)} — {product.priceLabel}
            </Link>
          </div>

          <div>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: 26, marginBottom: 12, color: "#2a1a12" }}>
              {fmt === "Collection PDF" ? "Ce que la collection contient" : "Ce que ce PDF contient"}
            </h2>
            <ul style={{ paddingLeft: 20, marginBottom: 32, lineHeight: 1.8, color: "#3a2a20" }}>
              {includes.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>

            <h2 style={{ fontFamily: "Georgia,serif", fontSize: 26, marginBottom: 12, color: "#2a1a12" }}>
              Pour qui ?
            </h2>
            <p style={{ marginBottom: 8, color: "#3a2a20" }}>
              Ce {fmt.toLowerCase()} s'adresse aux personnes qui veulent :
            </p>
            <ul style={{ paddingLeft: 20, marginBottom: 32, lineHeight: 1.8, color: "#3a2a20" }}>
              {audience.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>

            <h2 style={{ fontFamily: "Georgia,serif", fontSize: 26, marginBottom: 12, color: "#2a1a12" }}>
              Format
            </h2>
            <p style={{ color: "#3a2a20", marginBottom: 32 }}>
              PDF téléchargeable après achat. Aucun envoi postal, aucun produit physique.
            </p>

            <div className="cta-band">
              <div>
                <h3>{product.title}</h3>
                <p>
                  {fmt} — {product.priceLabel}. Téléchargement immédiat après paiement sécurisé.
                </p>
              </div>
              <Link
                to="/achat/$slug"
                params={{ slug: product.slug }}
                className="action-btn"
              >
                {buyLabel(fmt)}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}