import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getProductBySlug, type DigitalProduct } from "@/lib/products-catalog";
import { PdfCover } from "@/components/PdfCover";
import { AjouterAuPanier } from "@/components/AjouterAuPanier";
import { ShareButton } from "@/components/ShareButton";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/pdf/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    if (!product) return createSeoHead({ title: "Aperçu PDF — HP", description: "Découvrez les PDF et kits HP.", path: "/livres-pdf" });
    const description = product.seoDescription ?? `${product.backCover ?? product.shortDescription ?? product.blurb} ${product.priceLabel}. ${product.purchaseHold ? "Achat en ligne bientôt rouvert au nouveau prix." : "Téléchargement immédiat."}`;
    const seo = createSeoHead({
      title: `${product.title} — PDF à télécharger | HP`,
      description,
      path: `/pdf/${product.slug}`,
      type: "product",
    });
    const priceMatch = product.priceLabel.match(/(\d+(?:[.,]\d+)?)/);
    if (!priceMatch) return seo;
    const price = Number(priceMatch[1].replace(",", ".")).toFixed(2);
    return {
      ...seo,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${product.title} (PDF)`,
            description: product.shortDescription ?? product.blurb,
            brand: { "@id": "https://www.hp-outils.com/#organisation" },
            offers: {
              "@type": "Offer",
              url: `https://www.hp-outils.com/pdf/${product.slug}`,
              priceCurrency: "CAD",
              price,
              availability: product.purchaseHold
                ? "https://schema.org/OutOfStock"
                : "https://schema.org/InStock",
            },
          }),
        },
      ],
    };
  },
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
        <p>{error instanceof Error ? error.message : "Une erreur inattendue est survenue."}</p>
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

// Filet d'aide santé — affiché sur les fiches des produits qui touchent
// la détresse, l'anxiété ou la proche-aidance (donnée : healthSupport).
function HealthSupportNote() {
  return (
    <div
      style={{
        border: "1px solid rgba(122,74,38,.35)",
        borderLeft: "4px solid #7a4a26",
        background: "rgba(247,244,236,.9)",
        borderRadius: 8,
        padding: "18px 20px",
        marginBottom: 32,
      }}
    >
      <h2 style={{ fontFamily: "Georgia,serif", fontSize: 22, marginBottom: 10, color: "#2a1a12" }}>
        Si ça devient trop lourd
      </h2>
      <p style={{ lineHeight: 1.7, color: "#3a2a20", marginBottom: 10 }}>
        Ce produit est un outil du quotidien : il aide à avancer à son rythme, une petite étape à la
        fois. <strong>Il ne remplace pas un professionnel de la santé.</strong> Si ce que tu traverses
        devient trop lourd — pour toi ou pour un proche que tu aides — de l'aide existe, gratuite et
        sans jugement :
      </p>
      <ul style={{ lineHeight: 1.7, color: "#3a2a20", marginBottom: 10, paddingLeft: 20 }}>
        <li>
          <strong>988</strong> — Ligne d'aide en cas de crise de suicide (partout au Canada) :
          appelle ou texte le 988, en tout temps.
        </li>
        <li>
          <strong>811, option 2</strong> — Info-Social (Québec) : des intervenants psychosociaux,
          en tout temps.
        </li>
      </ul>
      <p style={{ lineHeight: 1.7, color: "#3a2a20" }}>
        Les organismes d'aide et d'écoute de ta région peuvent aussi t'accompagner. Pour les
        proches aidants, L'Appui est là pour ça.
      </p>
    </div>
  );
}

// « Avant d'acheter » — les faits des Conditions de vente (§5, §6, §7),
// repris tels quels, placés avant le bouton d'achat.
function BeforeYouBuyNote() {
  return (
    <div
      style={{
        border: "1px solid rgba(58,42,32,.25)",
        borderRadius: 8,
        background: "rgba(247,244,236,.7)",
        padding: "14px 16px",
        marginBottom: 16,
        fontSize: 14,
        lineHeight: 1.65,
        color: "#3a2a20",
      }}
    >
      <p style={{ fontWeight: 700, marginBottom: 8 }}>Avant d'acheter</p>
      <ul style={{ paddingLeft: 18, margin: 0 }}>
        <li>
          Produit numérique : <strong>la vente est finale, sans remboursement</strong> — un fichier
          téléchargé ne peut pas être « retourné ».
        </li>
        <li>
          <strong>Exception — panne technique</strong> : si le lien ou le fichier reçu ne fonctionne
          pas, écris-nous. On répare — nouveau lien, nouveau fichier — et si on n'arrive pas à
          te donner un accès qui fonctionne, on te rembourse.
        </li>
        <li>
          Après le paiement, tu reçois un <strong>lien de téléchargement personnel, valide
          7 jours</strong>. Télécharge ton fichier dès que tu le reçois, et garde-le.
        </li>
        <li>
          Le courriel n'arrive pas, ou ton lien est expiré ? La page{" "}
          <Link to="/recuperer-achat">Récupérer un achat</Link> te redonne accès à ce que tu
          as acheté — ou écris-nous.
        </li>
      </ul>
      <p style={{ marginTop: 8 }}>
        Le détail complet : <Link to="/conditions-de-vente">Conditions de vente</Link>.
      </p>
    </div>
  );
}

function Page() {
  const { product } = Route.useLoaderData();
  const fmt = resolveFormat(product);
  const shortDescription = product.shortDescription ?? product.blurb;

  // 4e de couverture — texte éditorial
  const backCover =
    product.backCover ??
    product.shortDescription ??
    product.blurb;

  // Phrase « Pour qui ? »
  const audienceSentence =
    product.audienceSentence ??
    (product.audience && product.audience.length > 0
      ? `Ce PDF s'adresse aux personnes qui veulent ${joinFr(product.audience)}.`
      : fmt === "Kit PDF"
      ? "Ce PDF s'adresse aux personnes qui veulent explorer la honte, nommer ce qu'elles portent en silence et reprendre un peu de place sans se réparer de force."
      : fmt === "Collection PDF"
      ? "Ce PDF s'adresse aux personnes qui veulent explorer la honte sous plusieurs angles, mettre des mots sur ce qu'elles portent et garder une bibliothèque d'outils près d'elles."
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
              <PdfCover
                src={product.cover}
                alt={`Couverture ${product.title}`}
                style={{ marginBottom: 16 }}
              />
            )}
            <div className="library-meta" style={{ marginBottom: 8 }}>
              <span className="dot" />
              {fmt} — {product.priceLabel}
            </div>
            {["faim-justifie-les-moyens", "horizon-quebec", "enjeux-humanite", "enfants-cuisinent"].includes(product.slug) && (
              <p style={{ fontSize: 13, color: "rgba(58,42,32,.75)", marginBottom: 16 }}>
                HP Outils est un petit fournisseur : la TPS et la TVQ ne sont pas perçues.
              </p>
            )}
            {product.slug === "sans-honte-collection" && (
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "#3a2a20", marginBottom: 16 }}>
                <strong>Économie de 10 $ :</strong> achetés un par un, 10 kits coûteraient 50 $ — le bundle est à 40 $.
              </p>
            )}
            <p style={{ fontSize: 14, color: "rgba(58,42,32,.7)", fontStyle: "italic", marginBottom: 16 }}>
              {product.purchaseHold
                ? "Nouveau prix · Aucune taxe ajoutée · Achat en ligne bientôt rouvert"
                : "PDF téléchargeable · Aucune taxe ajoutée · Paiement sécurisé"}
            </p>
            <BeforeYouBuyNote />
            {["faim-justifie-les-moyens", "horizon-quebec", "enjeux-humanite", "enfants-cuisinent"].includes(product.slug) && (
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "#3a2a20", marginBottom: 16 }}>
                Une réponse d’humain sous 3 jours ouvrables. Pas une réponse de La direction !
              </p>
            )}
            {product.purchaseHold ? (
              <p style={{ maxWidth: 520, lineHeight: 1.65, margin: 0 }}>
                {product.purchaseHold}
              </p>
            ) : (
              <>
                <Link
                  to="/achat/$slug"
                  params={{ slug: product.slug }}
                  className="btn-primary"
                  style={{ display: "inline-block" }}
                >
                  {buyLabel(fmt)} — {product.priceLabel}
                </Link>
                {fmt !== "Collection PDF" ? (
                  <>
                    {" "}
                    <AjouterAuPanier priceId={product.priceId} />
                  </>
                ) : null}
              </>
            )}
            <div style={{ marginTop: 16 }}>
              <ShareButton
                text={`${product.title} — ${product.priceLabel}, aucune taxe ajoutée. HP Outils.`}
              />
            </div>
            {fmt === "Kit PDF" && (
              <Link
                to="/pdf/$slug"
                params={{ slug: "sans-honte-collection" }}
                className="collection-offer"
              >
                Choisis 10 kits parmi 15 pour 40 $ CAD — Voir la collection →
              </Link>
            )}
          </div>

          <div>
            {product.healthSupport && <HealthSupportNote />}

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

            {product.priceJustification && (
              <>
                <h2 style={{ fontFamily: "Georgia,serif", fontSize: 26, marginBottom: 12, color: "#2a1a12" }}>
                  Pourquoi ce prix ?
                </h2>
                <p style={{ marginBottom: 32, lineHeight: 1.8, color: "#3a2a20" }}>
                  {product.priceJustification}
                </p>
              </>
            )}

            {product.contents && product.contents.length > 0 && (
              <>
                <h2 style={{ fontFamily: "Georgia,serif", fontSize: 26, marginBottom: 12, color: "#2a1a12" }}>
                  Sommaire
                </h2>
                <ol style={{ marginBottom: 32, lineHeight: 1.8, color: "#3a2a20", paddingLeft: 22 }}>
                  {product.contents.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </>
            )}

            {product.includes && product.includes.length > 0 && (
              <>
                <h2 style={{ fontFamily: "Georgia,serif", fontSize: 26, marginBottom: 12, color: "#2a1a12" }}>
                  Ce que contient ce PDF
                </h2>
                <ul style={{ marginBottom: 32, lineHeight: 1.8, color: "#3a2a20", paddingLeft: 20 }}>
                  {product.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {product.preview && (
              <>
                <h2 style={{ fontFamily: "Georgia,serif", fontSize: 26, marginBottom: 12, color: "#2a1a12" }}>
                  Aperçu — un extrait du produit
                </h2>
                <div
                  style={{
                    border: "1px solid rgba(58,42,32,.2)",
                    borderRadius: 8,
                    background: "rgba(247,244,236,.7)",
                    padding: "16px 20px",
                    marginBottom: 32,
                  }}
                >
                  <p style={{ fontWeight: 700, color: "#2a1a12", marginBottom: 8 }}>{product.preview.title}</p>
                  <p style={{ lineHeight: 1.8, color: "#3a2a20" }}>{product.preview.text}</p>
                  <p style={{ fontSize: 13, color: "rgba(58,42,32,.65)", fontStyle: "italic", marginTop: 10 }}>
                    Extrait authentique, tiré du produit.
                  </p>
                </div>
              </>
            )}

            <h2 style={{ fontFamily: "Georgia,serif", fontSize: 26, marginBottom: 12, color: "#2a1a12" }}>
              Format
            </h2>
            <p style={{ color: "#3a2a20", marginBottom: 32 }}>
              PDF téléchargeable après achat.
              {product.volumeLabel && <> {product.volumeLabel}.</>} Aucun envoi postal, aucun
              produit physique.
            </p>

            {product.precaution && (
              <div
                style={{
                  border: "1px solid rgba(58,42,32,.25)",
                  borderLeft: "4px solid #3a2a20",
                  borderRadius: 8,
                  background: "rgba(247,244,236,.7)",
                  padding: "16px 20px",
                  marginBottom: 32,
                }}
              >
                <h2 style={{ fontFamily: "Georgia,serif", fontSize: 22, marginBottom: 8, color: "#2a1a12" }}>
                  À savoir
                </h2>
                <p style={{ lineHeight: 1.7, color: "#3a2a20" }}>{product.precaution}</p>
              </div>
            )}

            {(() => {
              const cross =
                product.slug === "mini-cahier-hyper-potentiel"
                  ? { desc: "Le pendant gratuit de ce cahier : respiration guidée, carte ikigaï interactive et plan WOOP — sans compte, et tes réponses restent sur ton appareil.", href: "/outils/hp-hyper-potentiel", label: "Ouvrir l'outil gratuit" }
                  : product.slug === "enjeux-humanite"
                  ? { desc: "Le même sujet, en audio : Futur simple, le balado HP sur l'IA — gratuit, de nouveaux épisodes quand ils sont prêts.", href: "/balado", label: "Écouter le balado" }
                  : product.slug === "faim-justifie-les-moyens"
                    ? { desc: "Le pendant gratuit de ce livre : 629 recettes, pensées pour les petits budgets.", href: "/en-cuisine/", label: "Ouvrir En cuisine" }
                    : product.slug === "enfants-cuisinent"
                      ? { desc: "Le pendant gratuit de ce livre : des recettes à faire en famille, avec le convertisseur.", href: "/en-cuisine/", label: "Ouvrir En cuisine" }
                      : product.slug === "horizon-quebec"
                        ? { desc: "L'autre porte du même monde : BD, musique et récits dans l'univers HP.", href: "/univers", label: "Découvrir l'univers" }
                        : { desc: "Avant ou après le PDF : des outils web gratuits, sans compte, pour le même genre de situations.", href: "/outils", label: "Voir les outils gratuits" };
              return (
                <div
                  style={{
                    border: "1px solid rgba(58,42,32,.2)",
                    borderRadius: 8,
                    background: "rgba(247,244,236,.7)",
                    padding: "16px 20px",
                    marginBottom: 32,
                  }}
                >
                  <h2 style={{ fontFamily: "Georgia,serif", fontSize: 22, marginBottom: 8, color: "#2a1a12" }}>
                    Découvre aussi
                  </h2>
                  <p style={{ lineHeight: 1.7, color: "#3a2a20", marginBottom: 10 }}>{cross.desc}</p>
                  <a href={cross.href} style={{ fontWeight: 700, color: "#2a1a12" }}>
                    {cross.label} →
                  </a>
                </div>
              );
            })()}

            <div className="cta-band">
              <div>
                <h3>{product.title}</h3>
                <p>
                  {product.purchaseHold
                    ? `${fmt} — ${product.priceLabel}. ${product.purchaseHold}`
                    : `${fmt} — ${product.priceLabel}. Téléchargement immédiat après paiement sécurisé.`}
                </p>
              </div>
              {product.purchaseHold ? (
                <a href="/en-cuisine/" className="action-btn">
                  En attendant : En cuisine (gratuit)
                </a>
              ) : (
                <>
                  <Link
                    to="/achat/$slug"
                    params={{ slug: product.slug }}
                    className="action-btn"
                  >
                    {buyLabel(fmt)}
                  </Link>
                  {fmt !== "Collection PDF" ? (
                    <>
                      {" "}
                      <AjouterAuPanier priceId={product.priceId} />
                    </>
                  ) : null}
                </>
              )}
            </div>
            {product.slug === "sans-honte-collection" && (
              <p style={{ textAlign: "center", marginTop: 12 }}>
                <Link to="/sans-honte">← Retour à la collection Sans Honte — Voir les 15 kits</Link>
              </p>
            )}
            <p style={{ textAlign: "center", color: "#3a2a20", fontSize: 14, marginTop: 8 }}>
              HP — des outils pour la vraie vie
            </p>
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