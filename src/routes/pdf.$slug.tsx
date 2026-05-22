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

function buyLabel(fmt: "Version PDF" | "Kit PDF" | "Collection PDF"): string {
  if (fmt === "Kit PDF") return "Acheter le kit PDF";
  if (fmt === "Collection PDF") return "Acheter la collection PDF";
  return "Acheter le PDF";
}

function Page() {
  const { product } = Route.useLoaderData();
  const fmt = resolveFormat(product);
  const shortDescription =
    product.shortDescription ??
    (fmt === "Kit PDF"
      ? "Un kit PDF pour explorer une facette de la honte, mettre des mots sur ce qui reste souvent caché et reprendre un peu de place sans se juger."
      : product.blurb);

  // 4e de couverture — texte éditorial
  const backCover =
    product.backCover ??
    product.shortDescription ??
    product.blurb;

  // Phrase « Pour qui ? »
  const audienceSentence =
    product.audienceSentence ??
    (product.audience && product.audience.length > 0
      ? `Ce ${fmt.toLowerCase()} s'adresse aux personnes qui veulent ${joinFr(product.audience)}.`
      : fmt === "Kit PDF"
      ? "Ce kit PDF s'adresse aux personnes qui veulent explorer la honte, nommer ce qu'elles portent en silence et reprendre un peu de place sans se réparer de force."
      : fmt === "Collection PDF"
      ? "Cette collection PDF s'adresse aux personnes qui veulent explorer la honte sous plusieurs angles, mettre des mots sur ce qu'elles portent et garder une bibliothèque d'outils près d'elles."
      : "Ce PDF s'adresse aux personnes qui veulent comprendre ce qu'elles vivent, mettre des mots sur une situation, réfléchir sans se juger et avancer sans chercher une solution parfaite.");

  return (
    <>
      <section
        className="editorial-hero hero-banner-image"
        style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}
      >
        <div className="container">
          <span className="editorial-kicker">Aperçu — {fmt}</span>
          <h1>{product.title}</h1>
          <p className="lead">
            {fmt} — {product.priceLabel}. {shortDescription}
          </p>
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
              4e de couverture
            </h2>
            <p style={{ marginBottom: 32, lineHeight: 1.8, color: "#3a2a20", whiteSpace: "pre-line" }}>
              {backCover}
            </p>

            <h2 style={{ fontFamily: "Georgia,serif", fontSize: 26, marginBottom: 12, color: "#2a1a12" }}>
              Pour qui ?
            </h2>
            <p style={{ marginBottom: 32, lineHeight: 1.8, color: "#3a2a20" }}>
              {audienceSentence}
            </p>

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

function joinFr(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return items.slice(0, -1).join(", ") + " et " + items[items.length - 1];
}