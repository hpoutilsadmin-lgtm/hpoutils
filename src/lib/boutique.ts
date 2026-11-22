// Boutique OUVERTE — état unique partagé (MISSION 1, nuit 21 nov. 2026).
// BOUTIQUE_FERMEE = false : la boutique est ouverte, les paiements sont
// possibles. true = boutique fermée pour maintenance.
//
// Règle : UNE seule constante, lue partout — sinon la fermeture n'est
// appliquée qu'à l'affichage du panier et le paiement direct reste
// ouvert (E1 : createPdfCheckoutSession n'avait aucune garde).
// Lecteurs de cette constante :
//   - src/routes/panier.tsx (bandeau + boutons désactivés)
//   - src/components/PdfCheckout.tsx (bandeau au lieu du checkout, pages /achat et /pdf)
//   - src/routes/lire.tsx (bandeau + boutons d'achat désactivés)
//   - src/utils/payments.functions.ts (refus serveur PDF, même sur requête forgée)
//   - src/utils/cart.functions.ts (refus serveur panier, même sur requête forgée)
//   - src/utils/tomes.functions.ts (refus serveur tomes, même sur requête forgée)
//   - src/utils/passeurs.functions.ts (refus serveur Passeurs, même sur requête forgée)
//   - src/utils/cadeaux.functions.ts (refus serveur : achat de bon, paiement
//     par bon, et panier partiel par bon — même sur requête forgée)
// Fermeture = passer ce booléen à true, sur go d'HP nommant le lot
// de fermeture. Ne jamais le basculer pour un test : le TEST 0 $
// se fait en mode test Stripe, boutique fermée ou non.
export const BOUTIQUE_FERMEE = false;

export const MESSAGE_BOUTIQUE_FERMEE =
  "Boutique fermée pour maintenance. Les paiements sont suspendus pour le moment — merci de votre compréhension.";
