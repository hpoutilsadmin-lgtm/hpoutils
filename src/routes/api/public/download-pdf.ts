import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { getProduct } from "@/lib/products-catalog";
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

        // Refuse si la commande associée a été remboursée.
        // (On accepte le token tant qu'aucune commande remboursée
        // n'existe pour ce couple courriel + priceId.)
        const { data: refundedOrder } = await admin
          .from("orders")
          .select("id")
          .ilike("customer_email", payload.email)
          .eq("price_id", payload.priceId)
          .eq("status", "refunded")
          .limit(1)
          .maybeSingle();
        if (refundedOrder) {
          return new Response("Lien révoqué (remboursement)", { status: 410 });
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