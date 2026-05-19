import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/livres-pdf", label: "Contenus" },
  { to: "/sans-honte", label: "Outils" },
  { to: "/univers", label: "Univers" },
  { to: "/collaborer", label: "Collaborer" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc.pathname]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="logo" to="/" aria-label="Accueil HP">
          <img src="/images/hp-logo-clean.png" alt="HP — Des outils simples pour la vraie vie" />
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
          {NAV.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
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