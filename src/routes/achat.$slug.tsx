import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PdfCheckout } from "@/components/PdfCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { getProductBySlug } from "@/lib/products-catalog";

export const Route = createFileRoute("/achat/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Acheter — ${loaderData.product.title} (PDF)` : "Acheter" },
      {
        name: "description",
        content: loaderData
          ? `Achetez la version PDF de ${loaderData.product.title}. Téléchargement immédiat après paiement sécurisé.`
          : "",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  notFoundComponent: () => (
    <section className="subpage-content">
      <div className="container" style={{ maxWidth: 720, textAlign: "center", padding: "64px 24px" }}>
        <h1>Produit introuvable</h1>
        <p>Ce produit n'existe pas ou n'est plus disponible.</p>
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

function Page() {
  const { product } = Route.useLoaderData();
  const formatLabel =
    product.slug === "sans-honte-collection"
      ? "Collection PDF"
      : product.slug.startsWith("sans-honte-")
      ? "Kit PDF"
      : "Version PDF";
  return (
    <>
      <PaymentTestModeBanner />
      <section
        className="editorial-hero hero-banner-image"
        style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}
      >
        <div className="container">
          <span className="editorial-kicker">Finaliser l'achat — {formatLabel}</span>
          <h1>{product.title}</h1>
          <p className="lead">
            {formatLabel} — {product.priceLabel}. PDF téléchargeable immédiatement après paiement.
          </p>
        </div>
      </section>
      <section className="subpage-content">
        <div className="container" style={{ maxWidth: 920 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
            <PdfCheckout priceId={product.priceId} />
          </div>
        </div>
      </section>
    </>
  );
}