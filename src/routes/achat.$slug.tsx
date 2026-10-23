import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PdfCheckout } from "@/components/PdfCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import {
  getProductBySlug,
  getSansHonteKits,
  BUNDLE_KIT_COUNT,
  type DigitalProduct,
} from "@/lib/products-catalog";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/achat/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    return createSeoHead({
      title: product ? `Acheter — ${product.title} (PDF)` : "Acheter un PDF — HP",
      description: product ? `Achetez ${product.title} en PDF. ${product.priceLabel}. Téléchargement après paiement sécurisé.` : "Achetez un PDF HP.",
      path: product ? `/achat/${product.slug}` : "/livres-pdf",
      type: "product",
      noindex: true,
    });
  },
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
        <p>{error instanceof Error ? error.message : "Une erreur inattendue est survenue."}</p>
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
            {formatLabel} — {product.priceLabel}.{" "}
            {product.purchaseHold
              ? "L'achat en ligne n'est pas encore ouvert pour ce livre."
              : "PDF téléchargeable immédiatement après paiement."}
          </p>
          {product.precaution && <p className="product-precaution">{product.precaution}</p>}
          {product.priceJustification && (
            <p style={{ maxWidth: 700, lineHeight: 1.65 }}>{product.priceJustification}</p>
          )}
        </div>
      </section>
      <section className="subpage-content">
        <div className="container" style={{ maxWidth: 920 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
            {product.purchaseHold ? (
              <div
                style={{
                  padding: 20,
                  border: "1px solid #e0d8cf",
                  borderRadius: 4,
                  background: "#faf6f1",
                }}
              >
                <p style={{ margin: "0 0 8px", fontWeight: 700 }}>
                  Ce livre vient de baisser de prix : 10 $
                </p>
                <p style={{ margin: 0, fontSize: 14 }}>
                  {product.purchaseHold} En attendant, le pendant gratuit{" "}
                  <Link to="/en-cuisine/">En cuisine</Link> est ouvert, et
                  pour toute question, écris à{" "}
                  <a href="mailto:hpoutils.admin@gmail.com">
                    hpoutils.admin@gmail.com
                  </a>
                  .
                </p>
              </div>
            ) : product.slug === "sans-honte-collection" ? (
              <BundleCheckout product={product} />
            ) : (
              <PdfCheckout priceId={product.priceId} />
            )}
            {product.purchaseHold ? (
              <p className="purchase-note">Aucune taxe ajoutée · Petit fournisseur</p>
            ) : (
              <p className="purchase-note">PDF téléchargeable · Aucune taxe ajoutée · Paiement sécurisé</p>
            )}
            <div
              style={{
                padding: 20,
                border: "1px solid #e0d8cf",
                borderRadius: 4,
                background: "#faf6f1",
              }}
            >
              <p style={{ margin: "0 0 8px", fontWeight: 700 }}>
                Après ton achat, un humain s'en occupe
              </p>
              <p style={{ margin: "0 0 8px", fontSize: 14 }}>
                Tu reçois ton lien de téléchargement par courriel (valide
                7 jours). Tu n'arrives pas à ouvrir ton PDF, ton lien est
                expiré ou le courriel n'arrive pas ? Passe par la page{" "}
                <Link to="/recuperer-achat">Récupérer un achat</Link>, ou
                écris à{" "}
                <a href="mailto:hpoutils.admin@gmail.com">
                  hpoutils.admin@gmail.com
                </a>{" "}
                — une réponse d'Hugo, pas d'un robot, sous 3 jours ouvrables.
              </p>
              <p style={{ margin: 0, fontSize: 14 }}>
                Et si c'est une panne technique de notre côté — un fichier
                qui ne s'ouvre pas, un lien mort —, on répare ou on
                rembourse, comme le disent les{" "}
                <Link to="/conditions-de-vente">conditions de vente</Link>.
                — Hugo
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Sélecteur du bundle « Choisis 10 kits parmi 15 » : l'acheteur coche
// exactement 10 kits, valide son choix, puis le paiement s'ouvre avec
// cette sélection (elle voyage dans la session Stripe et la livraison
// envoie les 10 liens choisis).
function BundleCheckout({ product }: { product: DigitalProduct }) {
  const kits = getSansHonteKits();
  const [selected, setSelected] = useState<string[]>([]);
  const [locked, setLocked] = useState(false);

  function toggle(slug: string) {
    if (locked) return;
    setSelected((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length >= BUNDLE_KIT_COUNT
          ? prev
          : [...prev, slug],
    );
  }

  if (locked) {
    return (
      <div style={{ display: "grid", gap: 20 }}>
        <div
          style={{
            padding: 20,
            border: "1px solid #e0d8cf",
            borderRadius: 4,
            background: "#faf6f1",
          }}
        >
          <p style={{ margin: "0 0 6px", fontWeight: 700 }}>
            Tes {BUNDLE_KIT_COUNT} kits sont choisis ✓
          </p>
          <p style={{ margin: "0 0 12px", fontSize: 14 }}>
            {selected
              .map((slug) => kits.find((k) => k.slug === slug)?.title ?? slug)
              .join(" · ")}
          </p>
          <button
            type="button"
            onClick={() => setLocked(false)}
            style={{
              padding: "10px 18px",
              background: "transparent",
              color: "#b04a2f",
              border: "1px solid #b04a2f",
              borderRadius: 4,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Modifier mon choix
          </button>
        </div>
        <PdfCheckout
          key={selected.join(",")}
          priceId={product.priceId}
          kitSlugs={selected}
        />
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div>
        <h2 style={{ fontFamily: "Georgia,serif", fontSize: 24, margin: "0 0 8px" }}>
          Choisis tes {BUNDLE_KIT_COUNT} kits
        </h2>
        <p style={{ margin: 0 }}>
          Coche exactement {BUNDLE_KIT_COUNT} kits parmi les {kits.length} —
          ce sont eux que tu recevras par courriel après le paiement.{" "}
          <strong>
            {selected.length} / {BUNDLE_KIT_COUNT} choisis
          </strong>
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 12,
        }}
      >
        {kits.map((kit) => {
          const checked = selected.includes(kit.slug);
          const disabled = !checked && selected.length >= BUNDLE_KIT_COUNT;
          return (
            <label
              key={kit.slug}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                padding: 12,
                border: checked ? "2px solid #b04a2f" : "1px solid #e0d8cf",
                borderRadius: 4,
                background: checked ? "#faf6f1" : "#fff",
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.5 : 1,
              }}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => toggle(kit.slug)}
                style={{ width: 20, height: 20, flexShrink: 0 }}
              />
              {kit.cover && (
                <img
                  src={kit.cover}
                  alt=""
                  width={44}
                  height={56}
                  style={{ objectFit: "cover", borderRadius: 2, flexShrink: 0 }}
                />
              )}
              <span style={{ fontWeight: 600, fontSize: 15 }}>{kit.title}</span>
            </label>
          );
        })}
      </div>
      <button
        type="button"
        disabled={selected.length !== BUNDLE_KIT_COUNT}
        onClick={() => setLocked(true)}
        style={{
          padding: "14px 28px",
          background: selected.length === BUNDLE_KIT_COUNT ? "#b04a2f" : "#ccc",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          fontWeight: 600,
          fontSize: 16,
          cursor: selected.length === BUNDLE_KIT_COUNT ? "pointer" : "not-allowed",
        }}
      >
        {selected.length === BUNDLE_KIT_COUNT
          ? "Valider mes 10 kits et passer au paiement"
          : `Choisis encore ${BUNDLE_KIT_COUNT - selected.length} kit${BUNDLE_KIT_COUNT - selected.length > 1 ? "s" : ""}`}
      </button>
    </div>
  );
}
