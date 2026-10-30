import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { getProduct, COLLECTION_PRICE_ID } from "@/lib/products-catalog";
import { verifyDownloadToken } from "@/lib/download-token.server";

const PDF_BUCKET = "pdfs";

export const Route = createFileRoute("/api/public/download-pdf")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const token = url.searchParams.get("token") ?? "";
        const payload = verifyDownloadToken(token);
        if (!payload) {
          return new Response("Lien expiré ou invalide", { status: 401 });
        }

        const product = getProduct(payload.priceId);
        if (!product?.pdfPath) {
          return new Response("Produit introuvable", { status: 404 });
        }

        const admin = createClient(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
        );

        // Sécurité : le téléchargement exige une commande payée, non
        // remboursée, pour ce jeton. Le courriel du jeton peut être le
        // payeur ou le destinataire d'un cadeau : on cherche les deux,
        // sans jamais accepter un token sans commande payée.
        // Escape LIKE metacharacters to prevent wildcard matching via user input.
        const escapedEmail = payload.email.replace(/([\\%_])/g, "\\$1");
        const { data: paidOrder } = await admin
          .from("orders")
          .select("id,status")
          .ilike("customer_email", escapedEmail)
          .eq("price_id", payload.priceId)
          .eq("status", "paid")
          .limit(1)
          .maybeSingle();
        const { data: paidGiftOrder, error: paidGiftError } = paidOrder
          ? { data: null, error: null }
          : await admin
              .from("orders")
              .select("id,status")
              .ilike("gift_recipient_email", escapedEmail)
              .eq("price_id", payload.priceId)
              .eq("status", "paid")
              .limit(1)
              .maybeSingle();
        // Diagnostic H-P2 : si la colonne gift_recipient_email manque
        // (migration non appliquée), la requête échoue et le destinataire
        // d'un cadeau tombe en 410 — journalisé, jamais silencieux.
        if (paidGiftError) console.error("download gift lookup failed", paidGiftError.message);
        // Bundle : une commande bundle payée vaut pour chaque kit de sa
        // liste kit_slugs, même si aucun achat seul du kit n'existe.
        // Refus strict sinon : kit hors liste, kit_slugs absent, ou
        // commande remboursée = 410 comme avant, jamais de passe-droit.
        let bundleOrder = null;
        if (!paidOrder && !paidGiftOrder) {
          const { data: bundlePaid } = await admin
            .from("orders")
            .select("id,status,kit_slugs")
            .ilike("customer_email", escapedEmail)
            .eq("price_id", COLLECTION_PRICE_ID)
            .eq("status", "paid")
            .limit(1)
            .maybeSingle();
          const { data: bundleGift, error: bundleGiftError } = bundlePaid
            ? { data: null, error: null }
            : await admin
                .from("orders")
                .select("id,status,kit_slugs")
                .ilike("gift_recipient_email", escapedEmail)
                .eq("price_id", COLLECTION_PRICE_ID)
                .eq("status", "paid")
                .limit(1)
                .maybeSingle();
          if (bundleGiftError) console.error("download bundle gift lookup failed", bundleGiftError.message);
          const bundle = bundlePaid ?? bundleGift;
          const slugs = typeof bundle?.kit_slugs === "string" ? bundle.kit_slugs.split(",").filter(Boolean) : [];
          if (bundle && product.slug && slugs.includes(product.slug)) bundleOrder = bundle;
        }
        if (!paidOrder && !paidGiftOrder && !bundleOrder) {
          return new Response("Lien invalide ou révoqué", { status: 410 });
        }

        const { data: file, error } = await admin.storage
          .from(PDF_BUCKET)
          .download(product.pdfPath);
        if (error || !file) {
          console.error("download error", error);
          return new Response("Fichier indisponible", { status: 502 });
        }

        const srcBytes = new Uint8Array(await file.arrayBuffer());

        // Filigrane pied de page personnalisé avec le courriel de l'acheteur.
        let outBytes: Uint8Array;
        try {
          const pdf = await PDFDocument.load(srcBytes, { updateMetadata: false });
          const font = await pdf.embedFont(StandardFonts.Helvetica);
          const mark = `Acheté par ${payload.email} — usage personnel, ne pas redistribuer`;
          const fontSize = 8;
          const color = rgb(0.45, 0.45, 0.45);
          for (const page of pdf.getPages()) {
            const { width } = page.getSize();
            const textWidth = font.widthOfTextAtSize(mark, fontSize);
            page.drawText(mark, {
              x: Math.max(12, (width - textWidth) / 2),
              y: 10,
              size: fontSize,
              font,
              color,
              opacity: 0.85,
            });
          }
          outBytes = await pdf.save();
        } catch (e) {
          console.error("watermark failed, serving original", e);
          outBytes = srcBytes;
        }

        const filename = product.downloadFileName || "document.pdf";
        return new Response(new Blob([outBytes as BlobPart], { type: "application/pdf" }), {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${filename}"`,
            "Cache-Control": "private, no-store",
          },
        });
      },
    },
  },
});