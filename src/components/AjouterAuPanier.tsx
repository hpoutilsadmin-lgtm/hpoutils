import { useEffect, useState } from "react";
import { addToCart, loadCart, saveCart, getCartProduct } from "@/lib/panier";

/**
 * Bouton « Ajouter au panier » — à placer à côté du bouton d'achat existant
 * sur /prix et sur les fiches /pdf/$slug, pour les produits vendables
 * seulement. Ne jamais l'afficher pour un produit en purchaseHold, pour le
 * bundle (sélection propre) ou pour un produit hors catalogue.
 * Après l'ajout, le bouton devient un lien vers /panier/.
 */
export function AjouterAuPanier({ priceId }: { priceId: string }) {
  const [dansPanier, setDansPanier] = useState(false);

  useEffect(() => {
    const cart = loadCart();
    setDansPanier(cart.some((i) => i.priceId === priceId));
  }, [priceId]);

  if (!getCartProduct(priceId)) return null;

  if (dansPanier) {
    return (
      <a href="/panier/" className="btn-ghost" style={{ display: "inline-block" }}>
        Dans le panier — Voir le panier →
      </a>
    );
  }

  return (
    <button
      type="button"
      className="btn-ghost"
      onClick={() => {
        const { cart, error } = addToCart(loadCart(), priceId);
        if (error) return;
        saveCart(cart);
        setDansPanier(true);
      }}
    >
      Ajouter au panier
    </button>
  );
}
