/* ============================================================
   FICHIER GÉNÉRÉ — NE PAS ÉDITER À LA MAIN.
   Sources : src/components/compagnon/compagnon.js
             src/components/compagnon/donnees-inventaire.json
   Régénérer : bun run build:compagnon
   ============================================================ */
/* ============================================================
   COMPAGNON DE NAVIGATION HP — barre universelle du site.
   Source : src/components/compagnon/compagnon.js
   Généré : public/compagnon/compagnon.js (bun run build:compagnon)
   Lot : workspace/compagnon-navigation/LOT-TRANSFERT-SITE.md
   Cahier : sections A à F. Périmètre gelé (T1 à T12, 5 nov. 2026).

   Règles : JS vanilla, aucune dépendance, aucun appel réseau,
   aucune donnée envoyée, aucun compte, aucun service payant.
   Les images des mascottes sont celles du site, chargées
   seulement à la demande (jamais dans le chemin critique).
   ============================================================ */
(function () {
  "use strict";

  /* Données : l'index de recherche, intégré au build depuis
     src/components/compagnon/donnees-inventaire.json (source
     unique). Le script de build remplace le marqueur par le
     contenu du JSON. Sans build, la barre s'affiche quand
     même, avec une recherche vide. */
  var DONNEES = [{"titre":"Accueil — HP Outils, jeux, kits et outils pour la vraie vie","famille":"Accueil","url":"/","mots":"accueil outils jeux kits vraie vie"},{"titre":"Jeux gratuits — grille 38 + 1 caché","famille":"Jeux","url":"/jeux","mots":"jeux gratuits grille jouer","menu":"Jeux"},{"titre":"RELÈVE — Chapitre 1 : Surchauffe","famille":"Jeux","url":"/apps/releve","mots":"relève surchauffe chapitre jeu"},{"titre":"LA BANQUE — le jeu de la banque alimentaire","famille":"Jeux","url":"/apps/la-banque","mots":"banque alimentaire jeu"},{"titre":"Les bons réflexes d'HP","famille":"Jeux","url":"/apps/bons-reflexes","mots":"bons réflexes sécurité jeu"},{"titre":"Mystères du Nord — enquêtes de déduction","famille":"Jeux","url":"/apps/mysteres-du-nord","mots":"mystères nord enquête déduction jeu"},{"titre":"Fait fructifier 100 $ en 30 jours","famille":"Jeux","url":"/apps/100-en-30-jours","mots":"fructifier argent 30 jours jeu"},{"titre":"Caribou Run — course sans fin québécoise","famille":"Jeux","url":"/apps/caribou-run","mots":"caribou course run québec jeu"},{"titre":"Cherche & Trouve — La vraie vie","famille":"Jeux","url":"/apps/cherche-trouve-la-vraie-vie","mots":"cherche trouve vraie vie jeu"},{"titre":"Devine l'humeur — devine les émotions","famille":"Jeux","url":"/apps/devine-l-humeur","mots":"humeur émotions devine jeu"},{"titre":"La Spirale ASMR","famille":"Jeux","url":"/apps/la-spirale-asmr","mots":"spirale asmr détente jeu"},{"titre":"Poutine Panic — sers des poutines à toute vitesse","famille":"Jeux","url":"/apps/poutine-panic","mots":"poutine panic service vite jeu"},{"titre":"Retromania — devine les prix d'époque","famille":"Jeux","url":"/apps/retromania","mots":"retromania prix époque rétro jeu"},{"titre":"Sirop Clicker — sirop d'érable","famille":"Jeux","url":"/apps/sirop-clicker","mots":"sirop érable clicker cabane jeu"},{"titre":"Mots de Chez Nous — mots cachés d'ici","famille":"Jeux","url":"/apps/mots-de-chez-nous","mots":"mots cachés chez nous québec jeu"},{"titre":"Mémoire des Cantons — jeu de mémoire du Québec","famille":"Jeux","url":"/apps/memoire-des-cantons","mots":"mémoire cantons québec jeu"},{"titre":"Tir de Boules de Neige — 50 niveaux","famille":"Jeux","url":"/apps/tir-de-boules-de-neige","mots":"boules neige tir hiver jeu"},{"titre":"Hockey 2 contre 2 — Sir H. Gepeto & Pixel","famille":"Jeux","url":"/apps/hockey-hgpto","mots":"hockey gepeto pixel glace jeu"},{"titre":"Ado odieux, adieu","famille":"Jeux","url":"/apps/ado-odieux-adieu","mots":"ado odieux adieu jeu"},{"titre":"Couleuvre du Québec — jeu du serpent","famille":"Jeux","url":"/apps/couleuvre-du-quebec","mots":"couleuvre serpent québec jeu"},{"titre":"Fusion Sirop — fusion à la cabane à sucre","famille":"Jeux","url":"/apps/fusion-sirop","mots":"fusion sirop érable cabane jeu"},{"titre":"Trio des Éléments — match-3 du tableau périodique","famille":"Jeux","url":"/apps/trio-des-elements","mots":"éléments match périodique chimie jeu"},{"titre":"Bernache Express — migration à un seul bouton","famille":"Jeux","url":"/apps/bernache-express","mots":"bernache migration oie express jeu"},{"titre":"Le Bonhomme Pendu — mots à deviner","famille":"Jeux","url":"/apps/le-bonhomme-pendu","mots":"bonhomme pendu mots deviner jeu"},{"titre":"Montgolfière — grimpe entre les orages","famille":"Jeux","url":"/apps/montgolfiere","mots":"montgolfière ballon orages grimpe jeu"},{"titre":"Pop Ballons — 60 secondes de combos","famille":"Jeux","url":"/apps/pop-ballons","mots":"pop ballons combos jeu"},{"titre":"2 vérités, 1 mensonge","famille":"Jeux","url":"/apps/2-verites-1-mensonge","mots":"vérités mensonge devine jeu"},{"titre":"Chat'attaque — tower defense de chats","famille":"Jeux","url":"/apps/chat-attaque","mots":"chat attaque tower défense jeu"},{"titre":"NORD 2087 — La Ligne de Glace","famille":"Jeux","url":"/apps/nord-2087","mots":"nord 2087 glace ligne jeu"},{"titre":"Chevalier du fleuve — stratégie et histoire vraie","famille":"Jeux","url":"/apps/chevalier-du-fleuve","mots":"chevalier fleuve stratégie histoire jeu"},{"titre":"IGLOO — La guerre des igloos","famille":"Jeux","url":"/apps/igloo","mots":"igloo guerre glace jeu"},{"titre":"Que vois-tu ? — jeu de perception","famille":"Jeux","url":"/apps/que-vois-tu","mots":"vois perception voir jeu"},{"titre":"Tapinoue — aventure jeunesse","famille":"Jeux","url":"/apps/tapinoue","mots":"tapinoue aventure jeunesse jeu"},{"titre":"Ton chum frotte son char plus que toi !","famille":"Jeux","url":"/apps/ton-chum-frotte-son-char","mots":"chum char frotte auto jeu"},{"titre":"Conception de molécules 3D","famille":"Jeux","url":"/apps/conception-de-molecules-3d","mots":"molécules 3d conception chimie jeu"},{"titre":"L'hydroélectricité, comment ça marche","famille":"Jeux","url":"/apps/hydro-electricite","mots":"hydroélectricité électricité énergie jeu"},{"titre":"Anxiété, le jeu","famille":"Jeux","url":"/apps/anxiete-le-jeu","mots":"anxiété stress calme jeu"},{"titre":"Votre IA parle-t-elle québécois ?","famille":"Jeux","url":"/apps/votre-ia-parle-t-elle-quebecois","mots":"ia québécois parle intelligence artificielle jeu"},{"titre":"La Slalomeuse de nids-de-poule","famille":"Jeux","url":"/apps/slalomeuse","mots":"slalomeuse nids-de-poule route auto jeu"},{"titre":"Sur l'herbe — La colonie","famille":"Jeux","url":"/apps/sur-lherbe/sur-lherbe-v1.0.html","mots":"sur l'herbe colonie fourmis araignées jeu"},{"titre":"Outils HP","famille":"Outils","url":"/outils","mots":"outils hub boîte cuisine passeur","menu":"Outils"},{"titre":"La Boîte à outils","famille":"Outils","url":"/boite/","mots":"boîte outils héritage paperasse codes","menu":"Outils"},{"titre":"Hub outils-web","famille":"Outils","url":"/outils-web/","mots":"outils-web hub outils"},{"titre":"Le reste du mois — combien puis-je dépenser par jour ?","famille":"Outils","url":"/outils-web/le-reste-du-mois.html","mots":"reste du mois dépenser budget jour","menu":"Outils"},{"titre":"Ça vaut-tu la peine ? — le vrai coût d'un achat","famille":"Outils","url":"/outils-web/ca-vaut-tu-la-peine.html","mots":"vaut la peine coût achat vrai prix","menu":"Outils"},{"titre":"Le relais — le cahier de transmission des proches aidants","famille":"Outils","url":"/outils-web/le-relais.html","mots":"relais transmission proches aidants cahier","menu":"Outils"},{"titre":"Maintenant — où est-ce que j'en suis ?","famille":"Outils","url":"/outils-web/maintenant.html","mots":"maintenant où en suis-je bilan","menu":"Outils"},{"titre":"Le Contrat humain-IA","famille":"Outils","url":"/outils-web/contrat-humain-ia.html","mots":"contrat humain ia intelligence artificielle","menu":"Outils"},{"titre":"La garde — hub trio","famille":"Outils","url":"/la-garde","mots":"garde trio sécurité intimidation","menu":"Outils"},{"titre":"Le Garde — prévention et aide au sentiment de sécurité","famille":"Outils","url":"/le-garde","mots":"garde prévention sécurité aide"},{"titre":"Survie 72h","famille":"Outils","url":"/survie-72h","mots":"survie 72h urgence préparation"},{"titre":"Personne seule","famille":"Outils","url":"/personne-seule","mots":"personne seule seul aide sécurité"},{"titre":"Les bons réflexes d'HP","famille":"Outils","url":"/outils/bons-reflexes","mots":"bons réflexes sécurité réflexes","menu":"Outils"},{"titre":"Un petit pas à la fois","famille":"Outils","url":"/outils/un-petit-pas-a-la-fois","mots":"petit pas à la fois commencer pas à pas","menu":"Outils"},{"titre":"Le Passeur de savoir","famille":"Outils","url":"/passeur-de-savoir/","mots":"passeur savoir transmettre trucs famille","menu":"Outils"},{"titre":"Recettes HP — En cuisine","famille":"Outils","url":"/en-cuisine/","mots":"recettes cuisine manger repas","menu":"Outils"},{"titre":"Panier Solidaire — votre panier de banque alimentaire","famille":"Outils","url":"/en-cuisine/panier/","mots":"panier solidaire banque alimentaire nourriture","menu":"Outils"},{"titre":"Panier Solidaire — Farine","famille":"Outils","url":"/en-cuisine/panier/farine","mots":"panier farine solidaire"},{"titre":"Panier Solidaire — Lait","famille":"Outils","url":"/en-cuisine/panier/lait","mots":"panier lait solidaire"},{"titre":"Panier Solidaire — Oeufs","famille":"Outils","url":"/en-cuisine/panier/oeufs","mots":"panier oeufs solidaire"},{"titre":"Panier Solidaire — Pommes de terre","famille":"Outils","url":"/en-cuisine/panier/pommes-de-terre","mots":"panier pommes de terre patates solidaire"},{"titre":"Panier Solidaire — Tomates en conserve","famille":"Outils","url":"/en-cuisine/panier/tomates-en-conserve","mots":"panier tomates conserve solidaire"},{"titre":"La Boîte à outils — L'héritage vivant","famille":"Outils","url":"/boite/#heritage","mots":"boîte héritage vivant souvenir famille"},{"titre":"La Boîte à outils — On tranche !","famille":"Outils","url":"/boite/#on-tranche","mots":"boîte tranche décider choix décideur"},{"titre":"La Boîte à outils — Le décodeur de paperasse","famille":"Outils","url":"/boite/#paperasse","mots":"boîte paperasse décodeur papiers formulaires"},{"titre":"La Boîte à outils — Le vrai prix au 100 g","famille":"Outils","url":"/boite/#comparateur","mots":"boîte prix 100 g comparateur épicerie"},{"titre":"La Boîte à outils — Le Démêleur","famille":"Outils","url":"/boite/#demeleur","mots":"boîte démêleur appels téléphone"},{"titre":"La Boîte à outils — Démarches, la prochaine étape","famille":"Outils","url":"/boite/#demarches","mots":"boîte démarches prochaine étape étapes"},{"titre":"La Boîte à outils — Le Coffre à codes","famille":"Outils","url":"/boite/#coffre","mots":"boîte coffre codes mots de passe"},{"titre":"La Boîte à outils — Le Relanceur","famille":"Outils","url":"/boite/#relanceur","mots":"boîte relanceur relances promesses"},{"titre":"Livres, PDF & réflexions","famille":"Livres et lectures","url":"/livres-pdf","mots":"livres pdf réflexions lecture","menu":"Livres et lectures"},{"titre":"Collection Sans Honte : 15 kits PDF","famille":"Livres et lectures","url":"/sans-honte","mots":"sans honte kits pdf collection","menu":"Livres et lectures"},{"titre":"Comprendre — Les enjeux de l'humanité","famille":"Livres et lectures","url":"/comprendre","mots":"comprendre enjeux humanité ia","menu":"Livres et lectures"},{"titre":"Transmettre — Les enfants cuisinent pour faire plaisir","famille":"Livres et lectures","url":"/transmettre","mots":"transmettre enfants cuisinent plaisir cuisine","menu":"Livres et lectures"},{"titre":"Réflexions","famille":"Livres et lectures","url":"/reflexions","mots":"réflexions lecture penser","menu":"Livres et lectures"},{"titre":"Lire — À toi l'histoire","famille":"Livres et lectures","url":"/lire","mots":"lire à toi l'histoire livres-jeux tomes","menu":"Livres et lectures"},{"titre":"Votre tome — À toi l'histoire (lien personnel)","famille":"Livres et lectures","url":"/lire/$jeton","mots":"tome à toi l'histoire lien personnel lire"},{"titre":"Merci — À toi l'histoire","famille":"Livres et lectures","url":"/lire/merci","mots":"merci à toi l'histoire tome"},{"titre":"Univers HP — À toi l'histoire, BD et musique","famille":"Livres et lectures","url":"/univers","mots":"univers bd musique à toi l'histoire","menu":"Livres et lectures"},{"titre":"Album Humain imparfait","famille":"Livres et lectures","url":"/album","mots":"album humain imparfait musique chansons","menu":"Livres et lectures"},{"titre":"Catalogue","famille":"Livres et lectures","url":"/catalogue.html","mots":"catalogue livres kits produits","menu":"Livres et lectures"},{"titre":"Les Passeurs","famille":"Passeurs","url":"/les-passeurs","mots":"passeurs abonnement savoir cartes","menu":"Passeurs"},{"titre":"Merci — abonnement Passeurs","famille":"Passeurs","url":"/passeurs/merci","mots":"merci passeurs abonnement"},{"titre":"Annuler mon abonnement Passeurs","famille":"Passeurs","url":"/passeurs/annuler/$jeton","mots":"annuler passeurs abonnement désabonnement"},{"titre":"Prix HP — kits, livres, ateliers, sans taxe ajoutée","famille":"Commerce et services","url":"/prix","mots":"prix kits livres ateliers acheter","menu":"Prix et achats"},{"titre":"Votre panier","famille":"Commerce et services","url":"/panier","mots":"panier achat payer","menu":"Prix et achats"},{"titre":"Achat produit","famille":"Commerce et services","url":"/achat/$slug","mots":"achat produit payer"},{"titre":"Aperçu PDF","famille":"Commerce et services","url":"/pdf/$slug","mots":"aperçu pdf extrait"},{"titre":"Merci — votre extrait Frigo Sans Honte","famille":"Commerce et services","url":"/merci","mots":"merci extrait frigo sans honte"},{"titre":"Merci pour votre achat (retour paiement)","famille":"Commerce et services","url":"/checkout/return","mots":"merci achat paiement retour"},{"titre":"Récupérer mon achat","famille":"Commerce et services","url":"/recuperer-achat","mots":"récupérer achat retrouver téléchargement","menu":"Prix et achats"},{"titre":"Bons cadeaux — plus en vente","famille":"Commerce et services","url":"/cadeaux","mots":"bons cadeaux cadeau offrir","menu":"Prix et achats"},{"titre":"Merci — statut de votre bon cadeau","famille":"Commerce et services","url":"/cadeaux/merci","mots":"merci bon cadeau statut"},{"titre":"Jeu personnalisé pour commerce","famille":"Commerce et services","url":"/jeux-a-votre-image","mots":"jeu personnalisé commerce à votre image entreprise","menu":"Prix et achats"},{"titre":"Aperçu personnalisé — voyez votre jeu à vos couleurs","famille":"Commerce et services","url":"/apercu","mots":"aperçu personnalisé couleurs jeu","menu":"Prix et achats"},{"titre":"Chevalier du fleuve — boutique fermée","famille":"Commerce et services","url":"/boutique-chevalier","mots":"boutique chevalier fermée"},{"titre":"Ton jeu à toi, en 30 secondes — Bientôt","famille":"Commerce et services","url":"/ton-jeu-a-toi","mots":"ton jeu à toi bientôt créer jeu"},{"titre":"Crée TON histoire — Bientôt","famille":"Commerce et services","url":"/cree-ton-histoire-a-toi","mots":"crée ton histoire bientôt histoire créer"},{"titre":"Votre cuisine familiale, à vous — Bientôt","famille":"Commerce et services","url":"/cuisine-familiale","mots":"cuisine familiale bientôt famille recettes"},{"titre":"Collaborer avec HP — ateliers sur mesure","famille":"Commerce et services","url":"/collaborer","mots":"collaborer ateliers sur mesure partenaires"},{"titre":"Futur simple — balado québécois sur l'IA, les PME et le futur","famille":"Balado et ateliers","url":"/balado","mots":"balado futur simple podcast ia pme","menu":"Ateliers et balado"},{"titre":"Ateliers sur mesure pour organismes et écoles","famille":"Balado et ateliers","url":"/ateliers","mots":"ateliers sur mesure organismes écoles cours","menu":"Ateliers et balado"},{"titre":"À propos — HP, créateur de HP Outils","famille":"Confiance et contact","url":"/a-propos","mots":"à propos hp créateur histoire","menu":"Aide et contact"},{"titre":"Questions fréquentes","famille":"Confiance et contact","url":"/faq","mots":"questions fréquentes faq aide","menu":"Aide et contact"},{"titre":"Politique de confidentialité","famille":"Confiance et contact","url":"/confidentialite","mots":"confidentialité politique données vie privée","menu":"Aide et contact"},{"titre":"Conditions de vente","famille":"Confiance et contact","url":"/conditions-de-vente","mots":"conditions vente remboursement achat","menu":"Aide et contact"},{"titre":"Contact — une réponse simple, humaine et concrète","famille":"Confiance et contact","url":"/contact","mots":"contact écrire message joindre","menu":"Aide et contact"},{"titre":"Désabonnement (infolettre)","famille":"Confiance et contact","url":"/unsubscribe","mots":"désabonnement infolettre courriel arrêter"},{"titre":"Affiches à imprimer","famille":"Confiance et contact","url":"/affiches.html","mots":"affiches imprimer affiches à imprimer"},{"titre":"Transposition — les 14 pratiques sans compte ni nuage","famille":"Confiance et contact","url":"/transposition-14-pratiques-sans-compte.html","mots":"transposition 14 pratiques sans compte nuage vie privée"}];

  /* ---------- Constantes ---------- */
  var LS_FAVORIS = "compagnon-favoris-v1";
  var LS_TEXTE = "compagnon-texte-v1";
  var LS_PROMENADE = "compagnon-promenade-v1";
  var SS_ACCUEIL = "compagnon-accueil-v1";
  var SS_MASQUEE = "compagnon-masquee-v1";

  var IMG_GEPETO = "/hgpto/gepeto/normal.png";
  var IMG_PIXEL = "/hgpto/pixel/c-tete.png";
  var MAIL_DIRECTION = "mailto:hpoutils.admin@gmail.com";

  /* Ordre des sections du menu (lot §2.2). Pas de section
     « Tout le site » : /plan-du-site n'existe pas encore (T5,
     lot B13-reste). Les liens du menu viennent de l'index
     (champ « menu »), jamais d'une liste en dur. */
  var ORDRE_MENU = ["Jeux", "Outils", "Livres et lectures", "Passeurs", "Ateliers et balado", "Prix et achats", "Aide et contact"];

  var PAGES_LECTURE = ["/lire", "/comprendre", "/transmettre", "/reflexions", "/univers", "/album"];

  var DIALOGUES = {
    gepeto_accueil: "Bienvenue chez HP Outils. Je suis Sir H. Gepeto, le gérant du site. La barre en bas vous mène partout : jeux, outils, livres. Bonne visite !",
    gepeto: "On avance ! Je suis Sir H. Gepeto, le gérant du site. Touchez une icône de la barre et je vous guide.",
    pixel: "Miaou. Je suis Pixel, la chatte du site. Je me promène sur la barre, je ne gêne personne, et je reviens quand vous m'appelez."
  };

  /* ---------- Petits outils ---------- */
  function $(sel, racine) { return (racine || document).querySelector(sel); }
  function $all(sel, racine) { return Array.prototype.slice.call((racine || document).querySelectorAll(sel)); }

  function el(tag, attrs, texte) {
    var n = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (k === "class") n.className = attrs[k];
        else if (k === "html") n.innerHTML = attrs[k];
        else n.setAttribute(k, attrs[k]);
      }
    }
    if (texte != null) n.textContent = texte;
    return n;
  }

  function on(noeud, evt, fn) { noeud.addEventListener(evt, fn); }

  /* Normalisation sans accents, pour une recherche qui accepte
     « sirop » comme « sirop », « érable » comme « erable ». */
  function norm(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
  }

  function lireLS(cle, defaut) {
    try {
      var v = window.localStorage.getItem(cle);
      return v == null ? defaut : JSON.parse(v);
    } catch (e) { return defaut; }
  }
  function ecrireLS(cle, valeur) {
    try { window.localStorage.setItem(cle, JSON.stringify(valeur)); } catch (e) { /* stockage indisponible : on continue sans */ }
  }
  function lireSS(cle) {
    try { return window.sessionStorage.getItem(cle); } catch (e) { return null; }
  }
  function ecrireSS(cle, valeur) {
    try { window.sessionStorage.setItem(cle, valeur); } catch (e) { /* session seulement */ }
  }

  var mouvementReduit = false;
  try { mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { mouvementReduit = false; }

  var chemin = window.location.pathname || "/";
  var estAccueil = chemin === "/" || chemin === "/index.html" || chemin === "/index.htm";
  var estJeu = chemin.indexOf("/apps/") === 0;
  var estLecture = false;
  for (var i = 0; i < PAGES_LECTURE.length; i++) {
    if (chemin === PAGES_LECTURE[i] || chemin.indexOf(PAGES_LECTURE[i] + "/") === 0) { estLecture = true; break; }
  }

  /* ---------- Recherche (index local, rien n'est envoyé) ---------- */
  function chercher(requete) {
    var mots = norm(requete).split(/\s+/).filter(function (w) { return w.length > 0; });
    if (mots.length === 0) return [];
    var resultats = [];
    for (var i = 0; i < DONNEES.length; i++) {
      var e = DONNEES[i];
      var hay = norm(e.titre + " " + e.famille + " " + e.mots + " " + e.url);
      var ok = true;
      for (var j = 0; j < mots.length; j++) {
        if (hay.indexOf(mots[j]) === -1) { ok = false; break; }
      }
      if (ok) resultats.push(e);
      if (resultats.length >= 12) break;
    }
    return resultats;
  }

  /* ---------- Favoris (localStorage de l'appareil, sans compte) ---------- */
  function chargerFavoris() {
    var f = lireLS(LS_FAVORIS, []);
    return Array.isArray(f) ? f : [];
  }
  function sauverFavoris(f) { ecrireLS(LS_FAVORIS, f); }
  function estFavori(url) {
    var f = chargerFavoris();
    for (var i = 0; i < f.length; i++) if (f[i].url === url) return true;
    return false;
  }
  function ajouterFavori(titre, url) {
    var f = chargerFavoris();
    if (!estFavori(url)) { f.push({ titre: titre, url: url }); sauverFavoris(f); }
  }
  function retirerFavori(url) {
    var f = chargerFavoris().filter(function (x) { return x.url !== url; });
    sauverFavoris(f);
  }

  /* ---------- Construction du DOM ---------- */
  var barre, panneau, zonePanneau, boite, carteMascotte, marcheur, boutonRappel;
  var panneauOuvert = null; /* "recherche" | "favoris" | "menu" | "aide" | null */
  var mascotteOuverte = null; /* "gepeto" | "pixel" | null */
  var modeLectureActif = false;
  var modeJeuActif = false;
  var niveauTexte = lireLS(LS_TEXTE, 0);
  var promenadeActive = lireLS(LS_PROMENADE, true);
  var minuteurPromenade = null;
  var jetonPromenade = 0;

  /* Icônes SVG originales, traits simples, sans texte permanent. */
  var ICONES = {
    accueil: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/></svg>',
    recherche: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>',
    favoris: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12v18l-6-4.5L6 21z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    fermer: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg>',
    haut: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 14 6-6 6 6"/></svg>'
  };

  function boutonIcone(nom, label, action) {
    var b = el("button", { "class": "compagnon-icone", "type": "button", "aria-label": label, "aria-expanded": "false" });
    b.innerHTML = ICONES[nom];
    on(b, "click", function () { action(b); });
    return b;
  }

  function construire() {
    if (document.getElementById("compagnon-barre")) return; /* jamais deux barres */

    var racine = el("div", { "id": "compagnon", "class": "compagnon" });
    document.body.appendChild(racine);

    /* Carte mascotte (Gepeto ou Pixel, jamais les deux à la fois). */
    carteMascotte = el("div", { "class": "compagnon-mascotte", "role": "dialog", "aria-label": "Compagnon", "hidden": "" });
    racine.appendChild(carteMascotte);

    /* Panneau (recherche, favoris, menu, aide) + boîte d'expansion. */
    panneau = el("div", { "class": "compagnon-panneau", "role": "dialog", "aria-label": "Panneau du Compagnon", "hidden": "" });
    zonePanneau = el("div", { "class": "compagnon-panneau-contenu" });
    panneau.appendChild(zonePanneau);
    boite = el("div", { "class": "compagnon-boite" });
    var titreBoite = el("p", { "class": "compagnon-boite-titre" }, "À portée de main");
    boite.appendChild(titreBoite);
    boite.appendChild(boutonCommande("Gepeto", "Afficher Sir H. Gepeto", function () { basculerMascotte("gepeto"); }));
    boite.appendChild(boutonCommande("Pixel", "Afficher Pixel", function () { basculerMascotte("pixel"); }));
    boite.appendChild(boutonCommande("Mode lecture", "Activer ou quitter le mode lecture", basculerModeLecture));
    boite.appendChild(boutonCommande("Mode jeu", "Masquer la barre pendant le jeu", basculerModeJeu));
    boite.appendChild(boutonCommande("Taille du texte", "Changer la taille du texte", changerTailleTexte));
    boite.appendChild(boutonCommande("Aide", "Ouvrir l'aide", function () { ouvrirPanneau("aide"); }));
    boite.appendChild(boutonCommande("Promenade", "Activer ou arrêter la promenade sur la barre", basculerPromenade));
    var btnReduire = boutonCommande("Réduire", "Réduire la barre", fermerPanneau);
    btnReduire.classList.add("compagnon-commande-reduire");
    boite.appendChild(btnReduire);
    panneau.appendChild(boite);
    racine.appendChild(panneau);

    /* La barre : 4 icônes, 48 px, sans texte permanent. */
    barre = el("nav", { "id": "compagnon-barre", "class": "compagnon-barre", "aria-label": "Compagnon de navigation" });
    var btnAccueil = el("button", { "class": "compagnon-icone", "type": "button", "aria-label": "Accueil" });
    btnAccueil.innerHTML = ICONES.accueil;
    on(btnAccueil, "click", function () { window.location.href = "/"; });
    barre.appendChild(btnAccueil);
    barre.appendChild(boutonIcone("recherche", "Rechercher sur le site", function (b) { basculerPanneau("recherche", b); }));
    barre.appendChild(boutonIcone("favoris", "Vos favoris", function (b) { basculerPanneau("favoris", b); }));
    barre.appendChild(boutonIcone("menu", "Ouvrir le menu", function (b) { basculerPanneau("menu", b); }));
    racine.appendChild(barre);

    /* Bande de vie : la promenade marche ici, jamais sur les icônes. */
    marcheur = el("img", { "class": "compagnon-marcheur", "alt": "", "aria-hidden": "true", "loading": "lazy", "decoding": "async" });
    barre.appendChild(marcheur);

    /* Bouton de rappel « Barre » : rappelle la barre masquée. */
    boutonRappel = el("button", { "class": "compagnon-rappel", "type": "button", "hidden": "" }, "Barre");
    boutonRappel.setAttribute("aria-label", "Afficher la barre du Compagnon");
    on(boutonRappel, "click", rappelerBarre);
    racine.appendChild(boutonRappel);

    document.documentElement.classList.add("compagnon-actif");
    appliquerTailleTexte();
    mettreAJourPromenadeBouton();
  }

  function boutonCommande(texte, label, action) {
    var b = el("button", { "class": "compagnon-commande", "type": "button", "aria-label": label }, texte);
    on(b, "click", action);
    return b;
  }

  /* ---------- Panneaux ---------- */
  function basculerPanneau(nom, bouton) {
    if (panneauOuvert === nom) { fermerPanneau(); return; }
    ouvrirPanneau(nom, bouton);
  }

  function ouvrirPanneau(nom, bouton) {
    panneauOuvert = nom;
    $all(".compagnon-icone", barre).forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
    if (bouton) bouton.setAttribute("aria-expanded", "true");
    panneau.removeAttribute("hidden");
    panneau.classList.add("ouvert");
    if (nom === "recherche") rendreRecherche();
    else if (nom === "favoris") rendreFavoris();
    else if (nom === "menu") rendreMenu();
    else if (nom === "aide") rendreAide();
    var champ = $("input", panneau);
    if (champ) champ.focus();
  }

  function fermerPanneau() {
    panneauOuvert = null;
    panneau.classList.remove("ouvert");
    panneau.setAttribute("hidden", "");
    $all(".compagnon-icone", barre).forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
    arreterPromenade(true);
  }

  function enTetePanneau(titre) {
    var h = el("div", { "class": "compagnon-panneau-tete" });
    h.appendChild(el("h2", { "class": "compagnon-panneau-titre" }, titre));
    var b = el("button", { "class": "compagnon-fermer", "type": "button", "aria-label": "Fermer le panneau" });
    b.innerHTML = ICONES.fermer;
    on(b, "click", fermerPanneau);
    h.appendChild(b);
    return h;
  }

  function rendreRecherche() {
    zonePanneau.textContent = "";
    zonePanneau.appendChild(enTetePanneau("Rechercher sur le site"));
    var champ = el("input", { "class": "compagnon-champ", "type": "search", "placeholder": "Tapez un mot : jeux, outils, recettes, prix…", "aria-label": "Rechercher sur le site", "autocomplete": "off" });
    zonePanneau.appendChild(champ);
    var liste = el("div", { "class": "compagnon-resultats" });
    var astuce = el("p", { "class": "compagnon-astuce" }, "La recherche reste sur votre appareil : rien n'est envoyé.");
    liste.appendChild(astuce);
    zonePanneau.appendChild(liste);
    on(champ, "input", function () { rendreResultats(champ.value, liste); });
  }

  function rendreResultats(requete, liste) {
    liste.textContent = "";
    var resultats = chercher(requete);
    if (norm(requete).length === 0) {
      liste.appendChild(el("p", { "class": "compagnon-astuce" }, "Tapez un mot : jeux, outils, recettes, prix…"));
      return;
    }
    if (resultats.length === 0) {
      var vide = el("p", { "class": "compagnon-astuce" }, "Aucun résultat. Essayez un autre mot, ou écrivez à la direction humaine.");
      liste.appendChild(vide);
      var lien = el("a", { "class": "compagnon-lien", "href": MAIL_DIRECTION }, "Écrire à la direction humaine");
      liste.appendChild(lien);
      return;
    }
    resultats.forEach(function (e) {
      var ligne = el("div", { "class": "compagnon-resultat" });
      var a = el("a", { "class": "compagnon-resultat-lien", "href": e.url }, e.titre);
      ligne.appendChild(a);
      ligne.appendChild(el("span", { "class": "compagnon-resultat-famille" }, e.famille));
      var fav = el("button", { "class": "compagnon-fav-ajout", "type": "button", "aria-label": "Ajouter aux favoris : " + e.titre }, estFavori(e.url) ? "Ajouté ✓" : "+ Favori");
      on(fav, "click", function () {
        if (estFavori(e.url)) { retirerFavori(e.url); fav.textContent = "+ Favori"; }
        else { ajouterFavori(e.titre, e.url); fav.textContent = "Ajouté ✓"; }
      });
      ligne.appendChild(fav);
      liste.appendChild(ligne);
    });
  }

  function rendreFavoris() {
    zonePanneau.textContent = "";
    zonePanneau.appendChild(enTetePanneau("Vos favoris"));
    var f = chargerFavoris();
    var ajout = el("button", { "class": "compagnon-commande", "type": "button" }, "Ajouter cette page aux favoris");
    on(ajout, "click", function () {
      ajouterFavori(document.title || chemin, chemin);
      rendreFavoris();
    });
    zonePanneau.appendChild(ajout);
    if (f.length === 0) {
      zonePanneau.appendChild(el("p", { "class": "compagnon-astuce" }, "Aucun favori pour l'instant. Vos favoris restent sur votre appareil, sans compte."));
      return;
    }
    var liste = el("ul", { "class": "compagnon-liste-favoris" });
    f.forEach(function (x) {
      var li = el("li", { "class": "compagnon-resultat" });
      li.appendChild(el("a", { "class": "compagnon-resultat-lien", "href": x.url }, x.titre));
      var sup = el("button", { "class": "compagnon-fav-ajout", "type": "button", "aria-label": "Retirer des favoris : " + x.titre }, "Retirer");
      on(sup, "click", function () { retirerFavori(x.url); rendreFavoris(); });
      li.appendChild(sup);
      liste.appendChild(li);
    });
    zonePanneau.appendChild(liste);
    zonePanneau.appendChild(el("p", { "class": "compagnon-astuce" }, "Suppression en 1 tap, sans confirmation."));
  }

  function rendreMenu() {
    zonePanneau.textContent = "";
    zonePanneau.appendChild(enTetePanneau("Menu"));
    var parSection = {};
    DONNEES.forEach(function (e) {
      if (!e.menu) return;
      (parSection[e.menu] = parSection[e.menu] || []).push(e);
    });
    ORDRE_MENU.forEach(function (section) {
      var entrees = parSection[section];
      if (!entrees || entrees.length === 0) return;
      var bloc = el("section", { "class": "compagnon-menu-section" });
      bloc.appendChild(el("h3", { "class": "compagnon-menu-titre" }, section));
      var ul = el("ul", { "class": "compagnon-menu-liste" });
      entrees.forEach(function (e) {
        var li = el("li");
        li.appendChild(el("a", { "class": "compagnon-lien", "href": e.url }, e.titre));
        ul.appendChild(li);
      });
      if (section === "Aide et contact") {
        var liMail = el("li");
        liMail.appendChild(el("a", { "class": "compagnon-lien", "href": MAIL_DIRECTION }, "Écrire à la direction humaine"));
        ul.appendChild(liMail);
      }
      bloc.appendChild(ul);
      zonePanneau.appendChild(bloc);
    });
    var desactiver = el("section", { "class": "compagnon-menu-section" });
    desactiver.appendChild(el("h3", { "class": "compagnon-menu-titre" }, "Désactiver"));
    var btnMasquer = el("button", { "class": "compagnon-commande", "type": "button" }, "Masquer la barre");
    on(btnMasquer, "click", masquerBarre);
    desactiver.appendChild(btnMasquer);
    zonePanneau.appendChild(desactiver);
  }

  function rendreAide() {
    zonePanneau.textContent = "";
    zonePanneau.appendChild(enTetePanneau("Aide"));
    var lignes = [
      "La barre en bas vous mène partout sur le site : accueil, recherche, favoris et menu.",
      "Elle ne recouvre jamais un champ, un résultat ni un bouton : si elle vous gêne, masquez-la, elle revient avec le bouton « Barre ».",
      "La direction humaine vous répond sous 3 jours ouvrables, lundi à vendredi."
    ];
    lignes.forEach(function (t) { zonePanneau.appendChild(el("p", { "class": "compagnon-aide-ligne" }, t)); });
    zonePanneau.appendChild(el("a", { "class": "compagnon-lien", "href": "/faq" }, "Questions fréquentes"));
    zonePanneau.appendChild(el("a", { "class": "compagnon-lien", "href": MAIL_DIRECTION }, "Écrire à la direction humaine"));
  }

  /* ---------- Mascottes (à la demande seulement, jamais les deux) ---------- */
  function afficherMascotte(qui, texte) {
    fermerMascotte();
    mascotteOuverte = qui;
    var estGepeto = qui === "gepeto";
    var img = el("img", {
      "class": "compagnon-mascotte-img",
      "alt": estGepeto ? "Sir H. Gepeto" : "Pixel, la chatte",
      "loading": "lazy",
      "decoding": "async"
    });
    img.src = estGepeto ? IMG_GEPETO : IMG_PIXEL;
    on(img, "error", function () {
      /* Repli honnête hors ligne : l'initiale, jamais une image générique. */
      var repli = el("span", { "class": "compagnon-mascotte-repli", "aria-hidden": "true" }, estGepeto ? "G" : "P");
      if (img.parentNode) img.parentNode.replaceChild(repli, img);
    });
    carteMascotte.textContent = "";
    carteMascotte.appendChild(img);
    carteMascotte.appendChild(el("p", { "class": "compagnon-mascotte-texte" }, texte || (estGepeto ? DIALOGUES.gepeto : DIALOGUES.pixel)));
    var fermer = el("button", { "class": "compagnon-fermer", "type": "button", "aria-label": "Fermer" });
    fermer.innerHTML = ICONES.fermer;
    on(fermer, "click", fermerMascotte);
    carteMascotte.appendChild(fermer);
    carteMascotte.removeAttribute("hidden");
    carteMascotte.classList.add("ouverte");
  }

  function basculerMascotte(qui) {
    if (mascotteOuverte === qui) { fermerMascotte(); return; }
    afficherMascotte(qui);
  }

  function fermerMascotte() {
    mascotteOuverte = null;
    carteMascotte.classList.remove("ouverte");
    carteMascotte.setAttribute("hidden", "");
    carteMascotte.textContent = "";
  }

  /* ---------- Commandes de la boîte d'expansion ---------- */
  function basculerModeLecture() {
    modeLectureActif = !modeLectureActif;
    document.documentElement.classList.toggle("compagnon-lecture", modeLectureActif);
    if (modeLectureActif) {
      fermerPanneau();
      fermerMascotte();
      cacherBarre("lecture");
      boutonRappel.textContent = "Sortir du mode lecture";
      boutonRappel.setAttribute("aria-label", "Sortir du mode lecture");
    } else {
      boutonRappel.textContent = "Barre";
      boutonRappel.setAttribute("aria-label", "Afficher la barre du Compagnon");
      montrerBarre();
    }
    mettreAJourCommandes();
  }

  function basculerModeJeu() {
    modeJeuActif = !modeJeuActif;
    if (modeJeuActif) {
      fermerPanneau();
      fermerMascotte();
      cacherBarre("jeu");
    } else {
      montrerBarre();
    }
    mettreAJourCommandes();
  }

  var LIBELLES_TEXTE = ["Taille du texte : normale", "Taille du texte : grande", "Taille du texte : très grande"];
  function changerTailleTexte() {
    niveauTexte = (niveauTexte + 1) % 3;
    ecrireLS(LS_TEXTE, niveauTexte);
    appliquerTailleTexte();
    mettreAJourCommandes();
  }
  function appliquerTailleTexte() {
    var html = document.documentElement;
    html.classList.remove("compagnon-texte-1", "compagnon-texte-2");
    if (niveauTexte === 1) html.classList.add("compagnon-texte-1");
    if (niveauTexte === 2) html.classList.add("compagnon-texte-2");
  }

  function basculerPromenade() {
    promenadeActive = !promenadeActive;
    ecrireLS(LS_PROMENADE, promenadeActive);
    if (!promenadeActive) arreterPromenade(true);
    else planifierPromenade();
    mettreAJourCommandes();
    mettreAJourPromenadeBouton();
  }
  function mettreAJourPromenadeBouton() {
    var b = $all(".compagnon-commande", boite).filter(function (x) { return x.textContent.indexOf("Promenade") === 0; })[0];
    if (b) b.textContent = promenadeActive ? "Promenade : oui" : "Promenade : non";
  }

  function mettreAJourCommandes() {
    var boutons = $all(".compagnon-commande", boite);
    boutons.forEach(function (b) {
      var t = b.textContent;
      if (t.indexOf("Mode lecture") === 0) b.setAttribute("aria-pressed", modeLectureActif ? "true" : "false");
      if (t.indexOf("Mode jeu") === 0) b.setAttribute("aria-pressed", modeJeuActif ? "true" : "false");
      if (t.indexOf("Taille du texte") === 0) b.textContent = LIBELLES_TEXTE[niveauTexte];
    });
  }

  /* ---------- Masquer / rappeler la barre ---------- */
  function cacherBarre(raison) {
    barre.classList.add("compagnon-cache");
    document.documentElement.classList.remove("compagnon-actif");
    boutonRappel.removeAttribute("hidden");
    if (raison === "session") ecrireSS(SS_MASQUEE, "1");
    arreterPromenade(true);
  }
  function montrerBarre() {
    barre.classList.remove("compagnon-cache", "reduite");
    document.documentElement.classList.add("compagnon-actif");
    boutonRappel.setAttribute("hidden", "");
    try { window.sessionStorage.removeItem(SS_MASQUEE); } catch (e) { /* session seulement */ }
    planifierPromenade();
  }
  function masquerBarre() {
    fermerPanneau();
    fermerMascotte();
    modeLectureActif = false;
    document.documentElement.classList.remove("compagnon-lecture");
    boutonRappel.textContent = "Barre";
    boutonRappel.setAttribute("aria-label", "Afficher la barre du Compagnon");
    cacherBarre("session");
  }
  function rappelerBarre() {
    if (modeLectureActif) { basculerModeLecture(); return; }
    modeJeuActif = false;
    montrerBarre();
    mettreAJourCommandes();
  }

  /* ---------- Promenade sur la barre (Gepeto et Pixel seulement) ----------
     Courte et occasionnelle, jamais d'animation permanente : un seul
     compagnon à la fois, une courte marche sur le bord de la barre,
     jamais sur les icônes, puis un long repos. Arrêt dès qu'on
     utilise la barre, arrêt avec le mouvement réduit, désactivable.
     La tête de Pixel reste strictement fixe : le marcheur ne fait
     que glisser horizontalement, sans rotation ni balancement. */
  var marcheurQui = "pixel";
  function planifierPromenade() {
    if (minuteurPromenade) { clearTimeout(minuteurPromenade); minuteurPromenade = null; }
    if (!promenadeActive || mouvementReduit) return;
    if (document.hidden || panneauOuvert || mascotteOuverte) {
      minuteurPromenade = setTimeout(planifierPromenade, 30000);
      return;
    }
    minuteurPromenade = setTimeout(demarrerMarche, 18000 + Math.random() * 17000);
  }

  function demarrerMarche() {
    minuteurPromenade = null;
    if (!promenadeActive || mouvementReduit || document.hidden || panneauOuvert || mascotteOuverte) { planifierPromenade(); return; }
    if (barre.classList.contains("compagnon-cache") || barre.classList.contains("reduite")) { planifierPromenade(); return; }
    marcheurQui = marcheurQui === "pixel" ? "gepeto" : "pixel";
    var estGepeto = marcheurQui === "gepeto";
    marcheur.src = estGepeto ? IMG_GEPETO : IMG_PIXEL;
    marcheur.alt = "";
    var jeton = ++jetonPromenade;
    var partGauche = Math.random() < 0.5;
    var largeur = barre.offsetWidth || 360;
    var distance = Math.max(90, Math.min(200, Math.round(largeur * 0.4)));
    var depart = partGauche ? 8 : largeur - 8 - 40;
    var arrivee = partGauche ? depart + distance : depart - distance;
    marcheur.style.transition = "none";
    marcheur.style.left = depart + "px";
    marcheur.style.opacity = "0";
    marcheur.classList.add("visible");
    /* Fondu d'entrée, marche, fondu de sortie. */
    setTimeout(function () {
      if (jeton !== jetonPromenade) return;
      marcheur.style.transition = "opacity .45s ease, left 7s linear";
      marcheur.style.opacity = "1";
      marcheur.style.left = arrivee + "px";
    }, 60);
    setTimeout(function () {
      if (jeton !== jetonPromenade) return;
      marcheur.style.opacity = "0";
    }, 6800);
    setTimeout(function () {
      if (jeton !== jetonPromenade) return;
      marcheur.classList.remove("visible");
      planifierPromenade();
    }, 7400);
  }

  function arreterPromenade(immediat) {
    jetonPromenade++;
    if (minuteurPromenade) { clearTimeout(minuteurPromenade); minuteurPromenade = null; }
    if (marcheur) {
      marcheur.style.transition = "none";
      marcheur.style.opacity = "0";
      marcheur.classList.remove("visible");
    }
    if (!immediat) planifierPromenade();
  }

  /* ---------- Comportements ---------- */
  var dernierDefilement = 0;
  function surDefilement() {
    if (mouvementReduit || panneauOuvert) return;
    var y = window.scrollY || window.pageYOffset || 0;
    if (y > dernierDefilement && y > 120) barre.classList.add("reduite");
    else if (y < dernierDefilement) barre.classList.remove("reduite");
    dernierDefilement = y;
  }

  function surFocusDans(e) {
    var c = e.target;
    if (!c || !c.tagName) return;
    var nom = c.tagName.toLowerCase();
    if ((nom === "input" || nom === "textarea" || nom === "select") && !document.getElementById("compagnon").contains(c)) {
      barre.classList.add("compagnon-cache");
      document.documentElement.classList.remove("compagnon-actif");
      arreterPromenade(true);
    }
  }
  function surFocusDehors(e) {
    var c = e.target;
    if (!c || !c.tagName) return;
    var nom = c.tagName.toLowerCase();
    if ((nom === "input" || nom === "textarea" || nom === "select") && !document.getElementById("compagnon").contains(c)) {
      if (!barre.classList.contains("compagnon-cache")) return;
      if (modeLectureActif || modeJeuActif || lireSS(SS_MASQUEE)) return;
      if (estJeu) return; /* sur une page de jeu, la barre reste masquée */
      barre.classList.remove("compagnon-cache");
      document.documentElement.classList.add("compagnon-actif");
    }
  }

  function surTouche(e) {
    if (e.key === "Escape") {
      if (mascotteOuverte) { fermerMascotte(); return; }
      if (panneauOuvert) { fermerPanneau(); return; }
    }
  }

  function surPointeurBas(e) {
    /* Sur une page de jeu, un tap hors de la barre = on rejoue :
       la barre se masque, le bouton « Barre » la rappelle (T2). */
    if (!estJeu) return;
    if (barre.classList.contains("compagnon-cache")) return;
    var racine = document.getElementById("compagnon");
    if (racine && racine.contains(e.target)) return;
    cacherBarre("jeu");
    boutonRappel.textContent = "Barre";
    boutonRappel.setAttribute("aria-label", "Afficher la barre du Compagnon");
  }

  /* ---------- Accueil : Gepeto accueille, une fois par session (T9) ---------- */
  function accueil() {
    if (!estAccueil) return;
    if (lireSS(SS_ACCUEIL)) return;
    ecrireSS(SS_ACCUEIL, "1");
    setTimeout(function () {
      if (barre.classList.contains("compagnon-cache")) return;
      if (mascotteOuverte || panneauOuvert) return;
      afficherMascotte("gepeto", DIALOGUES.gepeto_accueil);
    }, 800);
  }

  /* ---------- Démarrage ---------- */
  function demarrer() {
    construire();
    if (!barre) return;
    on(window, "scroll", surDefilement, { passive: true });
    on(document, "focusin", surFocusDans);
    on(document, "focusout", surFocusDehors);
    on(document, "keydown", surTouche);
    on(document, "pointerdown", surPointeurBas);
    on(document, "visibilitychange", function () { if (!document.hidden) planifierPromenade(); });
    on(barre, "pointerdown", function () { arreterPromenade(true); });
    on(barre, "focusin", function () { arreterPromenade(true); });
    mettreAJourCommandes();

    if (lireSS(SS_MASQUEE) && !estJeu) {
      cacherBarre("session");
    } else if (estJeu) {
      /* T2 : sur une page de jeu, la barre est masquée pendant le
         jeu ; le bouton « Barre » la rappelle à la pause ou au menu. */
      modeJeuActif = true;
      cacherBarre("jeu");
      mettreAJourCommandes();
    }
    accueil();
    planifierPromenade();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", demarrer);
  } else {
    demarrer();
  }
})();
