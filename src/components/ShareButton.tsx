import { useEffect, useRef, useState } from "react";

// Bouton « Partager » : utilise le partage natif (navigator.share) quand il
// est disponible ; sinon, copie le lien de la page dans le presse-papiers et
// le confirme visiblement (« Lien copié ! »). Aucune donnée n'est envoyée
// nulle part : tout se passe dans le navigateur du visiteur.
export function ShareButton({
  text,
  className = "btn-ghost",
}: {
  text?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  async function onShare() {
    const url = window.location.href;
    const title = document.title;
    const nav = navigator as Navigator & {
      share?: (data: { title?: string; text?: string; url?: string }) => Promise<void>;
    };

    if (typeof nav.share === "function") {
      try {
        await nav.share({ title, text: text ?? title, url });
        return;
      } catch (err) {
        // Annulation par le visiteur : on s'arrête là, sans repli.
        if ((err as Error)?.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        // Presse-papiers indisponible : le lien reste dans la barre d'adresse.
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    timer.current = window.setTimeout(() => setCopied(false), 2600);
  }

  return (
    <button type="button" className={className} onClick={onShare} aria-label="Partager cette page">
      {copied ? "Lien copié !" : "Partager"}
    </button>
  );
}
