import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";

const NAV_MAIN = [
  { to: "/jeux", label: "Jeux" },
  { to: "/outils", label: "Outils" },
  { to: "/livres-pdf", label: "Livres" },
] as const;

const NAV_SECONDARY = [
  { to: "/balado", label: "Balado" },
  { to: "/univers", label: "À toi l'histoire" },
  { to: "/ateliers", label: "Ateliers" },
  { to: "/prix", label: "Prix" },
  { to: "/jeux-a-votre-image", label: "Jeux à votre image" },
  { to: "/a-propos", label: "À propos" },
  /* Contact (Jour 3, 6 nov. 2026, lot 2) : en fin du groupe secondaire,
     après « À propos » — la route /contact existe déjà
     (src/routes/contact.tsx) ; aucun lien existant n'est déplacé ni
     supprimé. La même <nav> sert le bureau et le menu mobile (bouton
     « Menu », classe .open) : un seul ajout couvre les deux. */
  { to: "/contact", label: "Contact" },
] as const;

const MAIN_LINK_STYLE = { color: "#f0c16d" } as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  /* N0 (lot normes, 11 nov. 2026) : tuque en décembre seulement — même
     règle que la barre-haut (barre-haut.js:54) et le moteur (Hgpto.tsx:41).
     Hors décembre, la face normale ; en décembre, la face avec tuque. */
  const TUQUE_NOEL = new Date().getMonth() === 11;
  useEffect(() => setOpen(false), [loc.pathname]);
  /* Q-C1 (correctif 11 nov. 2026) : la face de l'en-tête ouvre Sir H.
     Gepeto — même geste que le bouton Gepeto de la barre : on déclenche
     son bouton, qui envoie 'hp:gepeto-ouvrir' et ouvre son panneau.
     Secours (barre pas encore montée) : l'événement seul. */
  const ouvrirGepeto = () => {
    const btn = document.querySelector<HTMLButtonElement>('[data-commande="gepeto"]');
    if (btn) {
      btn.click();
      return;
    }
    document.dispatchEvent(new CustomEvent("hp:gepeto-ouvrir"));
  };
  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Q-C1 (correctif 11 nov. 2026) : la face n'est plus dans le lien
            d'accueil — c'est un bouton qui ouvre Sir H. Gepeto. Le logo
            HP reste le lien d'accueil ; la disposition (logo + face,
            10 px d'écart) est conservée. */}
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link className="logo" to="/" aria-label="Accueil HP" style={{ minWidth: 0 }}>
            <img src="/images/hp-logo-clean.png" alt="HP — des outils pour la vraie vie" />
          </Link>
          {/* Accueil sans face (6 nov. 2026, décision 17) : la petite face de
              Gepeto va dans l'en-tête de tous les jeux, outils et En cuisine —
              mais PAS sur l'accueil. Le composant est partagé : on la masque
              ici seulement quand la route est "/" ; elle reste partout ailleurs. */}
          {loc.pathname !== "/" && (
            <button
              type="button"
              aria-label="Ouvrir Sir H. Gepeto"
              onClick={ouvrirGepeto}
              style={{ background: "none", border: 0, padding: 0, cursor: "pointer", flex: "none", lineHeight: 0 }}
            >
              <img src={TUQUE_NOEL ? "/hgpto/gepeto/tete-144-tuque-noel.png" : "/hgpto/gepeto/tete-144.png"} alt="" className="logo-gepeto" width="48" height="48" style={{ borderRadius: "50%", objectFit: "cover", flex: "none" }} />
            </button>
          )}
        </span>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
        <nav className={`site-nav${open ? " open" : ""}`} aria-label="Navigation principale">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "active" }}>
            Accueil
          </Link>
          {NAV_MAIN.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={MAIN_LINK_STYLE}
              activeProps={{ className: "active" }}
            >
              {l.label}
            </Link>
          ))}
          <a href="/en-cuisine/index.html" style={MAIN_LINK_STYLE}>
            En cuisine
          </a>
          {NAV_SECONDARY.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: false }}
              activeProps={{ className: "active" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}