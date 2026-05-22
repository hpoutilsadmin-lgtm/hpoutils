import type { CSSProperties } from "react";

interface PdfCoverProps {
  src: string;
  alt: string;
  /** "contain" (par défaut) montre toute la couverture sans coupure.
   *  "cover" remplit le cadre — à n'utiliser que si le titre reste lisible. */
  fit?: "contain" | "cover";
  className?: string;
  style?: CSSProperties;
}

/**
 * Cadre uniforme et vertical pour toutes les couvertures de PDF/livres du site.
 * Ratio 2/3, fond beige clair, image jamais étirée ni déformée.
 */
export function PdfCover({ src, alt, fit = "cover", className, style }: PdfCoverProps) {
  const wrapperClass = `library-cover${fit === "contain" ? " cover-contain" : ""}${className ? ` ${className}` : ""}`;
  return (
    <div className={wrapperClass} style={style}>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}