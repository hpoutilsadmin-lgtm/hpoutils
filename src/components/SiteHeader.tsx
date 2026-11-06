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
  useEffect(() => setOpen(false), [loc.pathname]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="logo" to="/" aria-label="Accueil HP">
          <img src="/images/hp-logo-clean.png" alt="HP — des outils pour la vraie vie" />
          {/* Accueil sans face (6 nov. 2026, décision 17) : la petite face de
              Gepeto va dans l'en-tête de tous les jeux, outils et En cuisine —
              mais PAS sur l'accueil. Le composant est partagé : on la masque
              ici seulement quand la route est "/" ; elle reste partout ailleurs. */}
          {loc.pathname !== "/" && (
            <img src="/hgpto/gepeto/tete-144.png" alt="" className="logo-gepeto" width="48" height="48" />
          )}
        </Link>
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