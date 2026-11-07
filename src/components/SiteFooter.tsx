import { Link } from "@tanstack/react-router";

/* P1 — retour en haut intermittent (6 nov. 2026) : chaque route est un
   morceau JS chargé à la demande ; sans préchargement, le 1er clic sur
   une route jamais visitée (/a-propos, /les-passeurs au point 8 de la
   vérification live b98f4303) laissait l'ancienne page affichée.
   preload="viewport" : dès que le pied de page entre dans l'écran, le
   morceau de chaque route liée est téléchargé — au clic, la page est
   déjà là et s'ouvre en haut au 1er essai. Les liens <a> pleins
   (/boite/, /passeur-de-savoir/, mailto, réseaux) ne sont pas des
   routes : ils restent tels quels. L'ancre /ateliers#formulaire-atelier
   reste aussi telle quelle (rechargement plein + ancre native, vérifié). */

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img src="/images/hp-logo-clean.png" alt="HP" className="footer-logo" />
          <p>HP — Des outils pour la vraie vie. Comprendre. Agir. Transmettre.</p>
          <div className="socials">
            <a href="https://www.facebook.com/1186804767843963" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
            <a href="https://www.instagram.com/hpoutils/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">◎</a>
            <a href="https://youtube.com/@hp-2zl" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶</a>
            <a href="https://www.tiktok.com/@hp2zl" target="_blank" rel="noopener noreferrer" aria-label="TikTok">♪</a>
          </div>
          <div className="footer-qr">
            <img src="/images/qr-hp-outils.png" alt="Code QR — https://www.hp-outils.com/" className="footer-qr-img" width="96" height="96" />
            <a href="https://www.hp-outils.com/">https://www.hp-outils.com/</a>
          </div>
        </div>
        <div>
          <h4>Découvrir</h4>
          <p>
            <Link preload="viewport" to="/">Accueil</Link><br />
            <Link preload="viewport" to="/jeux">Jeux gratuits</Link><br />
            <Link preload="viewport" to="/outils">Outils</Link><br />
            <a href="/boite/">La Boîte à outils</a><br />
            <Link preload="viewport" to="/univers">À toi l'histoire</Link><br />
            <Link preload="viewport" to="/balado">Balado Futur simple</Link><br />
            <Link preload="viewport" to="/a-propos">À propos</Link>
          </p>
          <h4>Apprendre</h4>
          <p>
            <Link preload="viewport" to="/livres-pdf">Livres, PDF &amp; réflexions</Link><br />
            <a href="/passeur-de-savoir/">Le Passeur de savoir</a><br />
            <Link preload="viewport" to="/les-passeurs">Les Passeurs</Link><br />
            <Link preload="viewport" to="/comprendre">Comprendre — le livre Enjeux de l'humanité</Link><br />
            <Link preload="viewport" to="/transmettre">Transmettre — cuisiner en famille</Link>
          </p>
          <h4>Acheter</h4>
          <p>
            <Link preload="viewport" to="/ateliers">Ateliers</Link><br />
            <Link preload="viewport" to="/prix">Prix</Link><br />
                        <Link preload="viewport" to="/apercu">Jeux à votre image — démo gratuite</Link><br />
            <Link preload="viewport" to="/recuperer-achat">Récupérer un achat</Link><br />
            <Link preload="viewport" to="/cadeaux">Utiliser un code cadeau</Link>
          </p>
          <h4>Confiance</h4>
          <p>
            <Link preload="viewport" to="/faq">Questions fréquentes</Link><br />
            <Link preload="viewport" to="/confidentialite">Confidentialité</Link><br />
            <Link preload="viewport" to="/conditions-de-vente">Conditions de vente</Link>
          </p>
        </div>
        <div>
          <h4>Contacter la direction humaine</h4>
          <p>
            <a href="mailto:hpoutils.admin@gmail.com">hpoutils.admin@gmail.com</a><br />
            <a href="mailto:hpoutils.admin@gmail.com">Écrire à la direction humaine</a><br />
            <a href="/ateliers#formulaire-atelier">Formulaire atelier</a><br />
            <Link preload="viewport" to="/contact">Contact</Link><br />
            Une réponse de la direction humaine, pas d'un robot — sous 3 jours ouvrables.
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