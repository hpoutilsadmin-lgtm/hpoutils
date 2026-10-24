import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createSeoHead } from "@/lib/seo";
import { getStripeEnvironment } from "@/lib/stripe";
import { createCartCheckoutSession } from "@/utils/cart.functions";
import {
  loadCart,
  saveCart,
  resolveCart,
  removeFromCart,
  setQuantity,
  clearCart,
  cartTotalCad,
  formatCad,
  NON_AJOUTABLES,
  type Cart,
} from "@/lib/panier";

export const Route = createFileRoute("/panier")({
  head: () =>
    createSeoHead({
      title: "Ton panier | HP Outils",
      description:
        "Ton panier HP Outils : livres et kits PDF, prix en $ CAD, aucune taxe ajoutée, livraison par courriel après paiement.",
      path: "/panier",
    }),
  component: Page,
});

/**
 * Page panier d'achat (v1) — distincte de /en-cuisine/panier/, qui est
 * l'outil de cuisine. Ne jamais confondre les deux.
 *
 * Paiement : le bouton « Payer » appelle la fonction serveur du panier
 * (contrat : POST { items: [{ priceId, quantity }], environment } →
 * { checkoutUrl } ou { error }). Tant que cette fonction n'est pas
 * déployée, le bouton affiche honnêtement que le paiement groupé arrive
 * bientôt et renvoie vers les fiches — jamais de faux paiement.
 */
function Page() {
  const [cart, setCart] = useState<Cart>([]);
  const [pret, setPret] = useState(false);
  const [paiement, setPaiement] = useState<"idle" | "envoi" | "indisponible">("idle");
  const creerSession = useServerFn(createCartCheckoutSession);

  useEffect(() => {
    setCart(loadCart());
    setPret(true);
  }, []);

  const changer = (next: Cart) => {
    setCart(next);
    saveCart(next);
  };

  const items = resolveCart(cart);
  const total = cartTotalCad(cart);

  const payer = async () => {
    if (items.length === 0 || paiement === "envoi") return;
    setPaiement("envoi");
    try {
      // Fonction serveur TanStack Start (même motif que l'achat seul) :
      // les prix sont résolus côté serveur par lookup_key, jamais depuis
      // le navigateur. En cas d'échec, repli honnête, jamais de faux paiement.
      const result = await creerSession({
        data: {
          items: items.map(({ product, qty }) => ({ priceId: product.priceId, quantity: qty })),
          environment: getStripeEnvironment(),
        },
      });
      if ("error" in result) {
        setPaiement("indisponible");
        return;
      }
      if (typeof result.checkoutUrl === "string" && result.checkoutUrl.startsWith("https://")) {
        window.location.href = result.checkoutUrl;
        return;
      }
      setPaiement("indisponible");
    } catch {
      setPaiement("indisponible");
    }
  };

  return (
    <>
      <section className="editorial-hero">
        <div className="container">
          <span className="editorial-kicker">Panier d'achat</span>
          <h1>
            Ton <em>panier</em>.
          </h1>
          <p className="lead">
            Livres et kits PDF, prix en $ CAD, aucune taxe ajoutée (petit
            fournisseur : la TPS et la TVQ ne sont pas perçues). Après le
            paiement, tu reçois chaque fichier par courriel, comme aujourd'hui.
            Tu peux retirer un article à tout moment, sans frais.
          </p>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          {!pret ? null : items.length === 0 ? (
            <div style={{ maxWidth: 640 }}>
              <h2 className="section-title">Ton panier est vide.</h2>
              <p>
                Les livres et les kits s'ajoutent depuis le tableau des prix
                et depuis chaque fiche, avec le bouton « Ajouter au panier ».
              </p>
              <div className="lead-actions">
                <Link to="/prix" className="btn-primary">
                  Voir les prix →
                </Link>
                <Link to="/livres-pdf" className="btn-ghost">
                  Voir les livres →
                </Link>
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: 720 }}>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Article</th>
                      <th>Quantité</th>
                      <th>Prix</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(({ product, qty }) => (
                      <tr key={product.priceId}>
                        <td>
                          <Link to="/pdf/$slug" params={{ slug: product.slug }}>
                            {product.title}
                          </Link>
                        </td>
                        <td>
                          <button
                            type="button"
                            aria-label="Retirer un exemplaire"
                            onClick={() => changer(setQuantity(cart, product.priceId, qty - 1))}
                          >
                            −
                          </button>{" "}
                          {qty}{" "}
                          <button
                            type="button"
                            aria-label="Ajouter un exemplaire"
                            title="Un fichier PDF ne s'achète qu'en un seul exemplaire."
                            disabled={qty >= product.maxQty}
                            onClick={() => changer(setQuantity(cart, product.priceId, qty + 1))}
                          >
                            +
                          </button>
                        </td>
                        <td>{formatCad(product.priceCad * qty)}</td>
                        <td>
                          <button type="button" onClick={() => changer(removeFromCart(cart, product.priceId))}>
                            Retirer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p style={{ fontSize: 18, marginTop: 16 }}>
                <strong>Total : {formatCad(total)}</strong> — aucune taxe ajoutée.
              </p>
              <p style={{ fontSize: 14, color: "rgba(58,42,32,.7)" }}>
                Livraison par courriel après paiement, comme pour un achat
                seul. Le total affiché ici est indicatif : c'est Stripe qui
                débite, au prix de chaque produit.
              </p>

              <div className="lead-actions">
                <button
                  type="button"
                  className="btn-primary"
                  disabled={paiement === "envoi"}
                  onClick={payer}
                >
                  {paiement === "envoi" ? "On prépare ton paiement…" : `Payer ${formatCad(total)}`}
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => changer(clearCart())}
                >
                  Vider le panier
                </button>
              </div>

              {paiement === "indisponible" && (
                <div style={{ marginTop: 24, maxWidth: 640 }}>
                  <h3>Le paiement groupé arrive bientôt.</h3>
                  <p>
                    Le paiement de plusieurs produits en une seule fois n'est
                    pas encore branché. En attendant, chaque fiche permet
                    d'acheter séparément, au même prix, sans frais ajoutés :
                  </p>
                  <ul>
                    {items.map(({ product }) => (
                      <li key={product.priceId}>
                        <Link to="/achat/$slug" params={{ slug: product.slug }}>
                          Acheter {product.title} — {formatCad(product.priceCad)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Bon à savoir</span>
          <h2>Ce qui n'entre <em>pas</em> dans ce panier</h2>
          <p className="strip-intro">
            Le bundle « Choisis 10 kits parmi 15 » garde son propre parcours
            de sélection : il ne passe pas par ce panier. Le reste, c'est
            l'honnêteté ordinaire d'HP : chaque produit dit pourquoi il
            n'est pas encore achetable.
          </p>
          <ul>
            {NON_AJOUTABLES.map((n) => (
              <li key={n.nom}>
                <strong>{n.nom}</strong> — {n.raison}
              </li>
            ))}
          </ul>
          <div className="lead-actions" style={{ marginTop: 16 }}>
            <Link to="/prix" className="btn-ghost">
              Continuer mes achats →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
