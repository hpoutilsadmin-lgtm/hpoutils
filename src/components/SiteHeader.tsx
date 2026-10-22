import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect, Fragment } from "react";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/outils", label: "Outils" },
  { to: "/jeux", label: "Jeux" },
  { to: "/balado", label: "Balado" },
  { to: "/livres-pdf", label: "Livres, PDF & réflexions" },
  { to: "/univers", label: "Univers alternatif" },
  { to: "/ateliers", label: "Ateliers" },
  { to: "/a-propos", label: "À propos" },
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
            <Fragment key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "active" }}
              >
                {l.label}
              </Link>
              {l.to === "/outils" && <a href="/en-cuisine/">En cuisine</a>}
            </Fragment>
          ))}
        </nav>
      </div>
    </header>
  );
}