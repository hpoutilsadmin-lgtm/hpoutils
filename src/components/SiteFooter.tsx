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
          <h4>Découvrir</h4>
          <p>
            <Link to="/">Accueil</Link><br />
            <Link to="/jeux">Jeux gratuits</Link><br />
            <Link to="/outils">Outils</Link><br />
            <a href="/boite/">La Boîte à outils</a><br />
            <Link to="/univers">À toi l'histoire</Link><br />
            <Link to="/balado">Balado Futur simple</Link><br />
            <Link to="/a-propos">À propos</Link>
          </p>
          <h4>Apprendre</h4>
          <p>
            <Link to="/livres-pdf">Livres, PDF &amp; réflexions</Link><br />
            <a href="/passeur-de-savoir/">Le Passeur de savoir</a><br />
            <Link to="/les-passeurs">Les Passeurs</Link><br />
            <Link to="/comprendre">Comprendre — le livre Enjeux de l'humanité</Link><br />
            <Link to="/transmettre">Transmettre — cuisiner en famille</Link>
          </p>
          <h4>Acheter</h4>
          <p>
            <Link to="/ateliers">Ateliers</Link><br />
            <Link to="/cadeaux">Bons cadeaux</Link><br />
            <Link to="/apercu">Jeux à votre image — démo gratuite</Link><br />
            <Link to="/recuperer-achat">Récupérer un achat</Link>
          </p>
          <h4>Confiance</h4>
          <p>
            <Link to="/faq">Questions fréquentes</Link><br />
            <Link to="/confidentialite">Confidentialité</Link><br />
            <Link to="/conditions-de-vente">Conditions de vente</Link>
          </p>
        </div>
        <div>
          <h4>Me contacter</h4>
          <p>
            <a href="mailto:hpoutils.admin@gmail.com">hpoutils.admin@gmail.com</a><br />
            <a href="mailto:hpoutils.admin@gmail.com">Écrire à la direction humaine</a><br />
            <a href="/ateliers#formulaire-atelier">Formulaire atelier</a><br />
            Une réponse d'humain, pas d'un robot — sous 3 jours ouvrables.
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