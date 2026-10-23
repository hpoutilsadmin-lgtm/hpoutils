import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img src="/images/hp-logo-clean.png" alt="HP" className="footer-logo" />
          <p>Des outils simples<br />pour la vraie vie.</p>
          <div className="socials">
            <span aria-label="Facebook à venir">f</span>
            <span aria-label="Instagram à venir">◎</span>
            <a href="https://youtube.com/@hp-2zl" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶</a>
            <span aria-label="TikTok à venir">♪</span>
          </div>
        </div>
        <div>
          <h4>Liens rapides</h4>
          <p>
            <Link to="/">Accueil</Link><br />
            <Link to="/jeux">Jeux gratuits</Link><br />
            <Link to="/outils">Outils</Link><br />
            <a href="/boite/">Boîte à outils</a><br />
            <Link to="/livres-pdf">Livres, PDF &amp; réflexions</Link><br />
            <a href="/passeur-de-savoir/">Le Passeur de savoir</a><br />
            <Link to="/univers">Univers alternatif</Link><br />
            <Link to="/ateliers">Ateliers</Link><br />
            <Link to="/balado">Balado Futur simple</Link><br />
            <Link to="/les-passeurs">Les Passeurs</Link><br />
            <Link to="/a-propos">À propos</Link><br />
            <Link to="/recuperer-achat">Récupérer un achat</Link><br />
            <Link to="/confidentialite">Confidentialité</Link><br />
            <Link to="/conditions-de-vente">Conditions de vente</Link>
          </p>
        </div>
        <div>
          <h4>Me contacter</h4>
          <p>
            <a href="mailto:hpoutils.admin@gmail.com">hpoutils.admin@gmail.com</a><br />
            <Link to="/contact">Formulaire de contact</Link><br />
            <a href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Formulaire atelier</a><br />
            Une réponse d'Hugo, pas d'un robot — sous 48 h ouvrables.
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <img src="/images/hp-logo-clean.png" alt="HP" className="footer-logo-mark" />
          <p>HP © 2026<br />Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}