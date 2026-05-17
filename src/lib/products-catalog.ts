// Catalogue des produits numériques en vente.
// Pour ajouter un nouveau PDF : créer un produit Stripe avec un lookup_key,
// téléverser le fichier dans le bucket `pdfs`, puis ajouter une entrée ici.

export interface DigitalProduct {
  priceId: string;          // lookup_key Stripe
  title: string;            // titre affiché
  pdfPath: string;          // chemin dans le bucket `pdfs`
  downloadFileName: string; // nom de fichier proposé au téléchargement
}

export const PRODUCTS: Record<string, DigitalProduct> = {
  enjeux_humanite_pdf_one_time: {
    priceId: "enjeux_humanite_pdf_one_time",
    title: "Les enjeux de l'humanité",
    pdfPath: "enjeux-humanite.pdf",
    downloadFileName: "Les-enjeux-de-l-humanite.pdf",
  },
};

export function getProduct(priceId: string): DigitalProduct | null {
  return PRODUCTS[priceId] ?? null;
}