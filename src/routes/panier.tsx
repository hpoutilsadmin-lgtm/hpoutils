import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createSeoHead } from "@/lib/seo";
import { getStripeEnvironment } from "@/lib/stripe";
import { createCartCheckoutSession } from "@/utils/cart.functions";
import {
  checkGiftBalance,
  payCartWithGift,
  createCartCheckoutWithGift,
} from "@/utils/cadeaux.functions";
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
      title: "Votre panier | HP Outils",
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
 * { checkoutUrl } ou { error }). La session Stripe multi-produits est
 * créée côté serveur par lookup_key ; en cas d'échec, le repli honnête
 * renvoie vers les fiches d'achat séparé — jamais de faux paiement.
 *
 * Bon cadeau : champ code + vérification serveur ; si le bon couvre tout
 * le total, paiement par bon seul (courriel de livraison) ; sinon, session
 * Stripe avec le crédit en coupon. Le serveur recalcule tout.
 */
function Page() {
  const [cart, setCart] = useState<Cart>([]);
  const [pret, setPret] = useState(false);
  const [paiement, setPaiement] = useState<"idle" | "envoi" | "indisponible">("idle");
  const creerSession = useServerFn(createCartCheckoutSession);
  const verifierSolde = useServerFn(checkGiftBalance);
  const payerBon = useServerFn(payCartWithGift);
  const creerSessionCadeau = useServerFn(createCartCheckoutWithGift);
  const [codeCadeau, setCodeCadeau] = useState("");
  const [cadeau, setCadeau] = useState<{
    valide: boolean;
    soldeCents: number;
    message: string;
  } | null>(null);
  const [verifCadeau, setVerifCadeau] = useState(false);
  const [courrielCadeau, setCourrielCadeau] = useState("");
  const [payeCadeau, setPayeCadeau] = useState<{ resteCents: number } | null>(null);

  useEffect(() => {
    setCart(loadCart());
    setPret(true);
  }, []);

  const changer = (next: Cart) => {
    setCart(next);
    saveCart(next);
    if (next.length > 0) setPayeCadeau(null);
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
      // Bon cadeau partiel : le serveur réserve le crédit et crée la
      // session Stripe avec coupon. Le serveur recalcule tout.
      if (cadeau && cadeau.valide && cadeau.soldeCents > 0 && cadeau.soldeCents < total * 100) {
        const resultCadeau = await creerSessionCadeau({
          data: {
            items: items.map(({ product }) => ({ priceId: product.priceId })),
            code: codeCadeau,
            environment: getStripeEnvironment(),
          },
        });
        if ("error" in resultCadeau) {
          setPaiement("indisponible");
          return;
        }
        if (typeof resultCadeau.checkoutUrl === "string" && resultCadeau.checkoutUrl.startsWith("https://")) {
          window.location.href = resultCadeau.checkoutUrl;
          return;
        }
        setPaiement("indisponible");
        return;
      }
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

  const soldeCouvreTout =
    cadeau !== null && cadeau.valide && cadeau.soldeCents >= total * 100;
  const soldePartiel =
    cadeau !== null &&
    cadeau.valide &&
    cadeau.soldeCents > 0 &&
    cadeau.soldeCents < total * 100;
  const resteApresBon =
    soldePartiel && cadeau !== null ? total - cadeau.soldeCents / 100 : null;
  const afficherSolde = (cents: number) =>
    cents % 100 === 0 ? formatCad(cents / 100) : `${(cents / 100).toFixed(2)} $ CAD`;

  const verifierCode = async () => {
    if (codeCadeau.trim() === "" || verifCadeau || paiement === "envoi") return;
    setVerifCadeau(true);
    try {
      const result = await verifierSolde({ data: { code: codeCadeau } });
      if (result.valid) {
        setCadeau({
          valide: true,
          soldeCents: result.availableCents,
          message: `Solde utilisable : ${afficherSolde(result.availableCents)}.`,
        });
      } else {
        setCadeau({
          valide: false,
          soldeCents: 0,
          message:
            "error" in result && typeof result.error === "string"
              ? result.error
              : "Code invalide.",
        });
      }
    } catch {
      setCadeau({ valide: false, soldeCents: 0, message: "Vérification impossible pour l'instant." });
    } finally {
      setVerifCadeau(false);
    }
  };

  const payerAvecBon = async () => {
    if (items.length === 0 || paiement === "envoi" || courrielCadeau.trim() === "") return;
    setPaiement("envoi");
    try {
      const result = await payerBon({
        data: {
          items: items.map(({ product }) => ({ priceId: product.priceId })),
          code: codeCadeau,
          email: courrielCadeau.trim(),
        },
      });
      if ("ok" in result && result.ok) {
        changer(clearCart());
        setPayeCadeau({ resteCents: result.remainingBalanceCents });
        return;
      }
      setPaiement("indisponible");
    } catch {
      // Solde changé ou code devenu invalide : on force une re-vérification.
      setCadeau(null);
      setPaiement("indisponible");
    }
  };

  const retirerCode = () => {
    setCadeau(null);
    setCodeCadeau("");
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
              <h2 className="section-title">
                {payeCadeau ? "Payé avec ton bon cadeau." : "Ton panier est vide."}
              </h2>
              <p>
                {payeCadeau
                  ? payeCadeau.resteCents > 0
                    ? `Solde restant sur ton bon : ${afficherSolde(payeCadeau.resteCents)}. Les liens de téléchargement sont envoyés par courriel.`
                    : "Les liens de téléchargement sont envoyés par courriel."
                  : "Les livres et les kits s'ajoutent depuis le tableau des prix et depuis chaque fiche, avec le bouton « Ajouter au panier »."}
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

              <div style={{ marginTop: 16, maxWidth: 640 }}>
                <p style={{ fontWeight: 700, marginBottom: 8 }}>Code cadeau</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <input
                    type="text"
                    value={codeCadeau}
                    onChange={(e) => {
                      setCodeCadeau(e.target.value);
                      setCadeau(null);
                    }}
                    placeholder="Ex. HP-XXXX-XXXX-XXXX"
                    disabled={paiement === "envoi" || verifCadeau}
                    style={{ flex: 1, minWidth: 220, padding: "8px 10px" }}
                  />
                  <button type="button" className="btn-ghost" disabled={paiement === "envoi" || verifCadeau} onClick={verifierCode}>
                    {verifCadeau ? "Vérification…" : "Vérifier"}
                  </button>
                  {cadeau && (
                    <button type="button" className="btn-ghost" onClick={retirerCode}>
                      Retirer le code
                    </button>
                  )}
                </div>
                {cadeau && <p style={{ marginTop: 8 }}>{cadeau.message}</p>}
                {soldeCouvreTout && (
                  <div style={{ marginTop: 12 }}>
                    <p>Le bon couvre tout le total. Indique le courriel de livraison :</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginTop: 8 }}>
                      <input
                        type="email"
                        value={courrielCadeau}
                        onChange={(e) => setCourrielCadeau(e.target.value)}
                        placeholder="ton@courriel.com"
                        disabled={paiement === "envoi"}
                        style={{ flex: 1, minWidth: 220, padding: "8px 10px" }}
                      />
                      <button
                        type="button"
                        className="btn-primary"
                        disabled={paiement === "envoi" || courrielCadeau.trim() === ""}
                        onClick={payerAvecBon}
                      >
                        {paiement === "envoi" ? "On prépare ton paiement…" : "Payer avec mon bon cadeau"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="lead-actions">
                {!soldeCouvreTout && (
                  <button
                    type="button"
                    className="btn-primary"
                    disabled={paiement === "envoi"}
                    onClick={payer}
                  >
                    {paiement === "envoi"
                      ? "On prépare ton paiement…"
                      : resteApresBon !== null
                        ? `Payer le reste (${formatCad(resteApresBon)})`
                        : `Payer ${formatCad(total)}`}
                  </button>
                )}
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
                  <h3>Le paiement groupé est indisponible pour le moment.</h3>
                  <p>
                    Impossible de démarrer le paiement groupé pour le moment.
                    En attendant, chaque fiche permet d'acheter séparément,
                    au même prix, sans frais ajoutés :
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
