/* ============================================================
   FICHIER GÉNÉRÉ — NE PAS ÉDITER À LA MAIN.
   Sources : src/components/compagnon/compagnon.js
             src/components/compagnon/donnees-inventaire.json
   Régénérer : bun run build:compagnon
   ============================================================ */
/* ============================================================
   COMPAGNON DE NAVIGATION HP — barre unique v3.
   Source : src/components/compagnon/compagnon.js
   Généré : public/compagnon/compagnon.js (bun run build:compagnon)
   Lot : workspace/lot-barre-unique-v3-5nov-2026/ (P1 + P2)
   Base : tête dc2371a7 (socle ecd2b23b reconstruit, pas reparti de zéro).

   Modèle tranché : workspace/simplification-navigation-site-5nov-2026/
   PROPOSITION-V3-MODELE-TRANCHE.md — UNE SEULE barre, déplaçable,
   style photo 1 (vert foncé arrondi, « HP À portée de main »,
   « Réduire »), les 10 commandes, le panneau Sir H. Gepeto intégré
   DANS la barre, plus de pastille, plus de panneau séparé, plus de
   boîte d'expansion. Principe d'HP (5 nov. 09 h 01) : « Voilà plu
   rien de cacher et même barré partout, simple et utilitaire. »

   Règles : JS vanilla, aucune dépendance, aucun appel réseau,
   aucune donnée envoyée, aucun compte, aucun service payant.
   Les images des mascottes sont celles du site, chargées
   seulement à la demande (jamais dans le chemin critique).
   Boutons ≥ 48 px. VOUS hors jeux. Slogan fixe :
   « HP — des outils pour la vraie vie. »

   TENSION OUVERTE (v3 §10 nº 1, NON tranchée par ce lot) :
   « barre partout » contre l'option A (Le Garde / Personne seule
   exclus pour le STOP, 5 nov. 06 h 31). Ce fichier applique
   l'option A (EXCLURE_PAGES_STOP = true, en vigueur) ET porte
   le mécanisme de coexistence (zone interdite : la barre ne peut
   pas être glissée sur le STOP, elle revient en bas). Basculer
   l'exclusion est 1 tap d'HP, pas une décision de ce lot.
   Jamais : déplacer le STOP, ni baisser le z-index sous 500.

   CONTRAT D'ÉVÉNEMENTS avec le moteur Sir H. Gepeto (P2) :
   - Barreau -> moteur : 'hp:gepeto-ouvrir' (charger + ouvrir le
     panneau), 'hp:gepeto-question' (ouvrir les Questions),
     'hp:gepeto-lire' (lire la page à voix haute),
     'hp:gepeto-lecture-pause' / 'hp:gepeto-lecture-reprise',
     'hp:gepeto-rouvrir'.
   - Moteur -> barre : 'hp:gepeto-pret' (moteur monté, fin du
     « Chargement… »), 'hp:gepeto-ferme' (Fermer pour la session),
     'hp:gepeto-reduire' (Réduire : fermer le panneau),
     'hp:lecture-etat' {etat} (lecture, pause, arretee).
   - Recherche (5 rapides) : 'hp:compagnon-recherche' (le moteur
     demande d'ouvrir la Loupe).
   Le moteur se charge de deux façons : pages React, par le pont
   (HgptoPont, événement 'hp:gepeto-ouvrir', signalé par
   data-hgpto-pont sur <html>) ; pages statiques, par injection du
   bundle autonome /hgpto/hgpto.js (+ /hgpto/hgpto.css).
   ============================================================ */
(function () {
  "use strict";

  /* Données : l'index de recherche, intégré au build depuis
     src/components/compagnon/donnees-inventaire.json (source
     unique). Le script de build remplace le marqueur par le
     contenu du JSON. Sans build, la barre s'affiche quand
     même, avec une recherche vide. */
  var DONNEES = [{"titre":"Accueil — HP Outils, jeux, kits et outils pour la vraie vie","famille":"Accueil","url":"/","mots":"accueil outils jeux kits vraie vie"},{"titre":"Jeux gratuits — grille 40 + 1 caché","famille":"Jeux","url":"/jeux","mots":"jeux gratuits grille jouer","menu":"Jeux"},{"titre":"RELÈVE — Chapitre 1 : Surchauffe","famille":"Jeux","url":"/apps/releve","mots":"relève surchauffe chapitre jeu"},{"titre":"LA BANQUE — le jeu de la banque alimentaire","famille":"Jeux","url":"/apps/la-banque","mots":"banque alimentaire jeu"},{"titre":"Les bons réflexes d'HP","famille":"Jeux","url":"/apps/bons-reflexes","mots":"bons réflexes sécurité jeu"},{"titre":"Mystères du Nord — enquêtes de déduction","famille":"Jeux","url":"/apps/mysteres-du-nord","mots":"mystères nord enquête déduction jeu"},{"titre":"Fait fructifier 100 $ en 30 jours","famille":"Jeux","url":"/apps/100-en-30-jours","mots":"fructifier argent 30 jours jeu"},{"titre":"Caribou Run — course sans fin québécoise","famille":"Jeux","url":"/apps/caribou-run","mots":"caribou course run québec jeu"},{"titre":"Cherche & Trouve — La vraie vie","famille":"Jeux","url":"/apps/cherche-trouve-la-vraie-vie","mots":"cherche trouve vraie vie jeu"},{"titre":"Devine l'humeur — devine les émotions","famille":"Jeux","url":"/apps/devine-l-humeur","mots":"humeur émotions devine jeu"},{"titre":"La Spirale ASMR","famille":"Jeux","url":"/apps/la-spirale-asmr","mots":"spirale asmr détente jeu"},{"titre":"Poutine Panic — sers des poutines à toute vitesse","famille":"Jeux","url":"/apps/poutine-panic","mots":"poutine panic service vite jeu"},{"titre":"Retromania — devine les prix d'époque","famille":"Jeux","url":"/apps/retromania","mots":"retromania prix époque rétro jeu"},{"titre":"Sirop Clicker — sirop d'érable","famille":"Jeux","url":"/apps/sirop-clicker","mots":"sirop érable clicker cabane jeu"},{"titre":"Mots de Chez Nous — mots cachés d'ici","famille":"Jeux","url":"/apps/mots-de-chez-nous","mots":"mots cachés chez nous québec jeu"},{"titre":"Mémoire des Cantons — jeu de mémoire du Québec","famille":"Jeux","url":"/apps/memoire-des-cantons","mots":"mémoire cantons québec jeu"},{"titre":"Tir de Boules de Neige — 50 niveaux","famille":"Jeux","url":"/apps/tir-de-boules-de-neige","mots":"boules neige tir hiver jeu"},{"titre":"Hockey 2 contre 2 — Sir H. Gepeto & Pixel","famille":"Jeux","url":"/apps/hockey-hgpto","mots":"hockey gepeto pixel glace jeu"},{"titre":"Ado odieux, adieu","famille":"Jeux","url":"/apps/ado-odieux-adieu","mots":"ado odieux adieu jeu"},{"titre":"Couleuvre du Québec — jeu du serpent","famille":"Jeux","url":"/apps/couleuvre-du-quebec","mots":"couleuvre serpent québec jeu"},{"titre":"Fusion Sirop — fusion à la cabane à sucre","famille":"Jeux","url":"/apps/fusion-sirop","mots":"fusion sirop érable cabane jeu"},{"titre":"Trio des Éléments — match-3 du tableau périodique","famille":"Jeux","url":"/apps/trio-des-elements","mots":"éléments match périodique chimie jeu"},{"titre":"Bernache Express — migration à un seul bouton","famille":"Jeux","url":"/apps/bernache-express","mots":"bernache migration oie express jeu"},{"titre":"Le Bonhomme Pendu — mots à deviner","famille":"Jeux","url":"/apps/le-bonhomme-pendu","mots":"bonhomme pendu mots deviner jeu"},{"titre":"Montgolfière — grimpe entre les orages","famille":"Jeux","url":"/apps/montgolfiere","mots":"montgolfière ballon orages grimpe jeu"},{"titre":"Pop Ballons — 60 secondes de combos","famille":"Jeux","url":"/apps/pop-ballons","mots":"pop ballons combos jeu"},{"titre":"2 vérités, 1 mensonge","famille":"Jeux","url":"/apps/2-verites-1-mensonge","mots":"vérités mensonge devine jeu"},{"titre":"Chat'attaque — tower defense de chats","famille":"Jeux","url":"/apps/chat-attaque","mots":"chat attaque tower défense jeu"},{"titre":"NORD 2087 — La Ligne de Glace","famille":"Jeux","url":"/apps/nord-2087","mots":"nord 2087 glace ligne jeu"},{"titre":"Chevalier du fleuve — stratégie et histoire vraie","famille":"Jeux","url":"/apps/chevalier-du-fleuve","mots":"chevalier fleuve stratégie histoire jeu"},{"titre":"IGLOO — La guerre des igloos","famille":"Jeux","url":"/apps/igloo","mots":"igloo guerre glace jeu"},{"titre":"Que vois-tu ? — jeu de perception","famille":"Jeux","url":"/apps/que-vois-tu","mots":"vois perception voir jeu"},{"titre":"Tapinoue — aventure jeunesse","famille":"Jeux","url":"/apps/tapinoue","mots":"tapinoue aventure jeunesse jeu"},{"titre":"Ton chum frotte son char plus que toi !","famille":"Jeux","url":"/apps/ton-chum-frotte-son-char","mots":"chum char frotte auto jeu"},{"titre":"Conception de molécules 3D","famille":"Jeux","url":"/apps/conception-de-molecules-3d","mots":"molécules 3d conception chimie jeu"},{"titre":"L'hydroélectricité, comment ça marche","famille":"Jeux","url":"/apps/hydro-electricite","mots":"hydroélectricité électricité énergie jeu"},{"titre":"Anxiété, le jeu","famille":"Jeux","url":"/apps/anxiete-le-jeu","mots":"anxiété stress calme jeu"},{"titre":"Votre IA parle-t-elle québécois ?","famille":"Jeux","url":"/apps/votre-ia-parle-t-elle-quebecois","mots":"ia québécois parle intelligence artificielle jeu"},{"titre":"La Slalomeuse de nids-de-poule","famille":"Jeux","url":"/apps/slalomeuse","mots":"slalomeuse nids-de-poule route auto jeu"},{"titre":"Sur l'herbe — La colonie","famille":"Jeux","url":"/apps/sur-lherbe/sur-lherbe-v1.0.html","mots":"sur l'herbe colonie fourmis araignées jeu"},{"titre":"Pète et Répète","famille":"Jeux","url":"/apps/pete-et-repete","mots":"pète répète course mots taper bateau pet jeu"},{"titre":"Les hommes préhistoriques du Québec","famille":"Jeux","url":"/apps/hommes-prehistoriques","mots":"hommes préhistoriques québec silex dinosaures dino jeu"},{"titre":"Outils HP","famille":"Outils","url":"/outils","mots":"outils hub boîte cuisine passeur","menu":"Outils"},{"titre":"La Boîte à outils","famille":"Outils","url":"/boite/","mots":"boîte outils héritage paperasse codes","menu":"Outils"},{"titre":"Hub outils-web","famille":"Outils","url":"/outils-web/","mots":"outils-web hub outils"},{"titre":"Le reste du mois — combien puis-je dépenser par jour ?","famille":"Outils","url":"/outils-web/le-reste-du-mois.html","mots":"reste du mois dépenser budget jour","menu":"Outils"},{"titre":"Ça vaut-tu la peine ? — le vrai coût d'un achat","famille":"Outils","url":"/outils-web/ca-vaut-tu-la-peine.html","mots":"vaut la peine coût achat vrai prix","menu":"Outils"},{"titre":"Le relais — le cahier de transmission des proches aidants","famille":"Outils","url":"/outils-web/le-relais.html","mots":"relais transmission proches aidants cahier","menu":"Outils"},{"titre":"Maintenant — où est-ce que j'en suis ?","famille":"Outils","url":"/outils-web/maintenant.html","mots":"maintenant où en suis-je bilan","menu":"Outils"},{"titre":"Le Contrat humain-IA","famille":"Outils","url":"/outils-web/contrat-humain-ia.html","mots":"contrat humain ia intelligence artificielle","menu":"Outils"},{"titre":"La garde — hub trio","famille":"Outils","url":"/la-garde","mots":"garde trio sécurité intimidation","menu":"Outils"},{"titre":"Le Garde — prévention et aide au sentiment de sécurité","famille":"Outils","url":"/le-garde","mots":"garde prévention sécurité aide"},{"titre":"Survie 72h","famille":"Outils","url":"/survie-72h","mots":"survie 72h urgence préparation"},{"titre":"Personne seule","famille":"Outils","url":"/personne-seule","mots":"personne seule seul aide sécurité"},{"titre":"Les bons réflexes d'HP","famille":"Outils","url":"/outils/bons-reflexes","mots":"bons réflexes sécurité réflexes","menu":"Outils"},{"titre":"Un petit pas à la fois","famille":"Outils","url":"/outils/un-petit-pas-a-la-fois","mots":"petit pas à la fois commencer pas à pas","menu":"Outils"},{"titre":"Le Passeur de savoir","famille":"Outils","url":"/passeur-de-savoir/","mots":"passeur savoir transmettre trucs famille","menu":"Outils"},{"titre":"Recettes HP — En cuisine","famille":"Outils","url":"/en-cuisine/","mots":"recettes cuisine manger repas","menu":"Outils"},{"titre":"Panier Solidaire — votre panier de banque alimentaire","famille":"Outils","url":"/en-cuisine/panier/","mots":"panier solidaire banque alimentaire nourriture","menu":"Outils"},{"titre":"Panier Solidaire — Farine","famille":"Outils","url":"/en-cuisine/panier/farine","mots":"panier farine solidaire"},{"titre":"Panier Solidaire — Lait","famille":"Outils","url":"/en-cuisine/panier/lait","mots":"panier lait solidaire"},{"titre":"Panier Solidaire — Oeufs","famille":"Outils","url":"/en-cuisine/panier/oeufs","mots":"panier oeufs solidaire"},{"titre":"Panier Solidaire — Pommes de terre","famille":"Outils","url":"/en-cuisine/panier/pommes-de-terre","mots":"panier pommes de terre patates solidaire"},{"titre":"Panier Solidaire — Tomates en conserve","famille":"Outils","url":"/en-cuisine/panier/tomates-en-conserve","mots":"panier tomates conserve solidaire"},{"titre":"La Boîte à outils — L'héritage vivant","famille":"Outils","url":"/boite/#heritage","mots":"boîte héritage vivant souvenir famille"},{"titre":"La Boîte à outils — On tranche !","famille":"Outils","url":"/boite/#on-tranche","mots":"boîte tranche décider choix décideur"},{"titre":"La Boîte à outils — Le décodeur de paperasse","famille":"Outils","url":"/boite/#paperasse","mots":"boîte paperasse décodeur papiers formulaires"},{"titre":"La Boîte à outils — Le vrai prix au 100 g","famille":"Outils","url":"/boite/#comparateur","mots":"boîte prix 100 g comparateur épicerie"},{"titre":"La Boîte à outils — Le Démêleur","famille":"Outils","url":"/boite/#demeleur","mots":"boîte démêleur appels téléphone"},{"titre":"La Boîte à outils — Démarches, la prochaine étape","famille":"Outils","url":"/boite/#demarches","mots":"boîte démarches prochaine étape étapes"},{"titre":"La Boîte à outils — Le Coffre à codes","famille":"Outils","url":"/boite/#coffre","mots":"boîte coffre codes mots de passe"},{"titre":"La Boîte à outils — Le Relanceur","famille":"Outils","url":"/boite/#relanceur","mots":"boîte relanceur relances promesses"},{"titre":"Livres, PDF & réflexions","famille":"Livres et lectures","url":"/livres-pdf","mots":"livres pdf réflexions lecture","menu":"Livres et lectures"},{"titre":"Collection Sans Honte : 15 kits PDF","famille":"Livres et lectures","url":"/sans-honte","mots":"sans honte kits pdf collection","menu":"Livres et lectures"},{"titre":"Comprendre — Les enjeux de l'humanité","famille":"Livres et lectures","url":"/comprendre","mots":"comprendre enjeux humanité ia","menu":"Livres et lectures"},{"titre":"Transmettre — Les enfants cuisinent pour faire plaisir","famille":"Livres et lectures","url":"/transmettre","mots":"transmettre enfants cuisinent plaisir cuisine","menu":"Livres et lectures"},{"titre":"Réflexions","famille":"Livres et lectures","url":"/reflexions","mots":"réflexions lecture penser","menu":"Livres et lectures"},{"titre":"Lire — À toi l'histoire","famille":"Livres et lectures","url":"/lire","mots":"lire à toi l'histoire livres-jeux tomes","menu":"Livres et lectures"},{"titre":"Votre tome — À toi l'histoire (lien personnel)","famille":"Livres et lectures","url":"/lire/$jeton","mots":"tome à toi l'histoire lien personnel lire"},{"titre":"Merci — À toi l'histoire","famille":"Livres et lectures","url":"/lire/merci","mots":"merci à toi l'histoire tome"},{"titre":"Univers HP — À toi l'histoire, BD et musique","famille":"Livres et lectures","url":"/univers","mots":"univers bd musique à toi l'histoire","menu":"Livres et lectures"},{"titre":"Album Humain imparfait","famille":"Livres et lectures","url":"/album","mots":"album humain imparfait musique chansons","menu":"Livres et lectures"},{"titre":"Catalogue","famille":"Livres et lectures","url":"/catalogue.html","mots":"catalogue livres kits produits","menu":"Livres et lectures"},{"titre":"Les Passeurs","famille":"Passeurs","url":"/les-passeurs","mots":"passeurs abonnement savoir cartes","menu":"Passeurs"},{"titre":"Merci — abonnement Passeurs","famille":"Passeurs","url":"/passeurs/merci","mots":"merci passeurs abonnement"},{"titre":"Annuler mon abonnement Passeurs","famille":"Passeurs","url":"/passeurs/annuler/$jeton","mots":"annuler passeurs abonnement désabonnement"},{"titre":"Prix HP — kits, livres, ateliers, sans taxe ajoutée","famille":"Commerce et services","url":"/prix","mots":"prix kits livres ateliers acheter","menu":"Prix et achats"},{"titre":"Votre panier","famille":"Commerce et services","url":"/panier","mots":"panier achat payer","menu":"Prix et achats"},{"titre":"Achat produit","famille":"Commerce et services","url":"/achat/$slug","mots":"achat produit payer"},{"titre":"Aperçu PDF","famille":"Commerce et services","url":"/pdf/$slug","mots":"aperçu pdf extrait"},{"titre":"Merci — votre extrait Frigo Sans Honte","famille":"Commerce et services","url":"/merci","mots":"merci extrait frigo sans honte"},{"titre":"Merci pour votre achat (retour paiement)","famille":"Commerce et services","url":"/checkout/return","mots":"merci achat paiement retour"},{"titre":"Récupérer mon achat","famille":"Commerce et services","url":"/recuperer-achat","mots":"récupérer achat retrouver téléchargement","menu":"Prix et achats"},{"titre":"Bons cadeaux — plus en vente","famille":"Commerce et services","url":"/cadeaux","mots":"bons cadeaux cadeau offrir","menu":"Prix et achats"},{"titre":"Merci — statut de votre bon cadeau","famille":"Commerce et services","url":"/cadeaux/merci","mots":"merci bon cadeau statut"},{"titre":"Jeu personnalisé pour commerce","famille":"Commerce et services","url":"/jeux-a-votre-image","mots":"jeu personnalisé commerce à votre image entreprise","menu":"Prix et achats"},{"titre":"Aperçu personnalisé — voyez votre jeu à vos couleurs","famille":"Commerce et services","url":"/apercu","mots":"aperçu personnalisé couleurs jeu","menu":"Prix et achats"},{"titre":"Chevalier du fleuve — boutique fermée","famille":"Commerce et services","url":"/boutique-chevalier","mots":"boutique chevalier fermée"},{"titre":"Ton jeu à toi, en 30 secondes — Bientôt","famille":"Commerce et services","url":"/ton-jeu-a-toi","mots":"ton jeu à toi bientôt créer jeu"},{"titre":"Crée TON histoire — Bientôt","famille":"Commerce et services","url":"/cree-ton-histoire-a-toi","mots":"crée ton histoire bientôt histoire créer"},{"titre":"Votre cuisine familiale, à vous — Bientôt","famille":"Commerce et services","url":"/cuisine-familiale","mots":"cuisine familiale bientôt famille recettes"},{"titre":"Collaborer avec HP — ateliers sur mesure","famille":"Commerce et services","url":"/collaborer","mots":"collaborer ateliers sur mesure partenaires"},{"titre":"Futur simple — balado québécois sur l'IA, les PME et le futur","famille":"Balado et ateliers","url":"/balado","mots":"balado futur simple podcast ia pme","menu":"Ateliers et balado"},{"titre":"Ateliers sur mesure pour organismes et écoles","famille":"Balado et ateliers","url":"/ateliers","mots":"ateliers sur mesure organismes écoles cours","menu":"Ateliers et balado"},{"titre":"À propos — HP, créateur de HP Outils","famille":"Confiance et contact","url":"/a-propos","mots":"à propos hp créateur histoire","menu":"Aide et contact"},{"titre":"Questions fréquentes","famille":"Confiance et contact","url":"/faq","mots":"questions fréquentes faq aide","menu":"Aide et contact"},{"titre":"Politique de confidentialité","famille":"Confiance et contact","url":"/confidentialite","mots":"confidentialité politique données vie privée","menu":"Aide et contact"},{"titre":"Conditions de vente","famille":"Confiance et contact","url":"/conditions-de-vente","mots":"conditions vente remboursement achat","menu":"Aide et contact"},{"titre":"Contact — une réponse simple, humaine et concrète","famille":"Confiance et contact","url":"/contact","mots":"contact écrire message joindre","menu":"Aide et contact"},{"titre":"Désabonnement (infolettre)","famille":"Confiance et contact","url":"/unsubscribe","mots":"désabonnement infolettre courriel arrêter"},{"titre":"Affiches à imprimer","famille":"Confiance et contact","url":"/affiches.html","mots":"affiches imprimer affiches à imprimer"},{"titre":"Transposition — les 14 pratiques sans compte ni nuage","famille":"Confiance et contact","url":"/transposition-14-pratiques-sans-compte.html","mots":"transposition 14 pratiques sans compte nuage vie privée"}];

  /* ---------- Constantes ---------- */
  var LS_FAVORIS = "compagnon-favoris-v1";
  var LS_TEXTE = "compagnon-texte-v1";
  var LS_PROMENADE = "compagnon-promenade-v1";
  var LS_POSITION = "compagnon-position-v1";
  var LS_CONFORT = "compagnon-confort-v1";
  var SS_ACCUEIL = "compagnon-accueil-v1";
  var SS_MASQUEE = "compagnon-masquee-v1";

  var IMG_GEPETO = "/hgpto/gepeto/normal.png";
  var IMG_PIXEL = "/hgpto/pixel/c-tete.png";
  var MAIL_DIRECTION = "mailto:hpoutils.admin@gmail.com";
  var URL_RESEAUX = {
    instagram: "https://www.instagram.com/hpoutils/",
    facebook: "https://www.facebook.com/hpoutils/",
    tiktok: "https://www.tiktok.com/@hp2zl",
    youtube: "https://www.youtube.com/@hpoutils"
  };

  /* Option A (5 nov. 06 h 31, EN VIGUEUR) : la barre ne se monte
     pas sur Le Garde ni sur Personne seule, tant qu'HP n'a pas
     tranché la coexistence barre déplaçable / STOP (1 tap).
     Le mécanisme de zone interdite ci-dessous reste en place
     pour le jour du basculement. */
  var EXCLURE_PAGES_STOP = true;
  var PAGES_STOP_EXCLUES = ["/le-garde", "/personne-seule"];

  /* Ordre des sections du menu Plus (lot §2.2). Pas de section
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

  /* Scènes retirées du panneau le 5 nov. 2026 (mot d'HP : « il en
     faut aucune ») — le moteur garde ses scènes de vie autonomes,
     jamais commandées par la barre. */

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

  function on(noeud, evt, fn, opts) { noeud.addEventListener(evt, fn, opts); }

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
  var estPageStopExclue = false;
  if (EXCLURE_PAGES_STOP) {
    for (var s = 0; s < PAGES_STOP_EXCLUES.length; s++) {
      if (chemin === PAGES_STOP_EXCLUES[s] || chemin.indexOf(PAGES_STOP_EXCLUES[s] + "/") === 0) { estPageStopExclue = true; break; }
    }
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

  /* ---------- Confort (réglages persistés, sans compte) ----------
     Taille : 3 niveaux (existant). Sombre, contraste renforcé,
     animations réduites, espacement du texte, navigation clavier :
     des classes sur <html>, jamais une modification définitive
     du site. Réglages de base, à affiner par page au pilote. */
  var CONFORT_DEFAUT = { sombre: false, contraste: false, animations: false, espacement: false, clavier: false };
  var confort = lireLS(LS_CONFORT, CONFORT_DEFAUT);
  if (!confort || typeof confort !== "object") confort = CONFORT_DEFAUT;
  function appliquerConfort() {
    var html = document.documentElement;
    html.classList.toggle("compagnon-sombre", !!confort.sombre);
    html.classList.toggle("compagnon-contraste", !!confort.contraste);
    html.classList.toggle("compagnon-animations-reduites", !!confort.animations);
    html.classList.toggle("compagnon-espacement", !!confort.espacement);
    html.classList.toggle("compagnon-clavier", !!confort.clavier);
  }
  function sauverConfort() { ecrireLS(LS_CONFORT, confort); }

  /* ---------- Construction du DOM ---------- */
  var racine, barre, panneau, zonePanneau, sectionGepeto, hoteGepeto,
    dialogueGepeto, marcheur, boutonRappel, poignee;
  var panneauOuvert = null; /* "recherche" | "favoris" | "plus" | "confort" | "lanterne" | "aide" | "gepeto" | null */
  var modeLectureActif = false;
  var modeJeuActif = false;
  var niveauTexte = lireLS(LS_TEXTE, 0);
  var promenadeActive = lireLS(LS_PROMENADE, true);
  var minuteurPromenade = null;
  var jetonPromenade = 0;
  var moteurCharge = false;
  var moteurEnChargement = false;
  var gepetoFermeSession = false;
  var lectureEtat = "arretee"; /* "lecture" | "pause" | "arretee" */
  var lanterneActive = false;
  var lanterneFond = "doux"; /* "doux" | "sombre" */
  var boutonsCommandes = {}; /* nom -> bouton (une seule porte par commande) */
  var boutonsSecondaires = ["retour", "suivant", "lire", "lanterne", "question", "confort"];
  var telephoneEtroit = false;
  try { telephoneEtroit = window.matchMedia("(max-width: 560px)").matches; } catch (e) { telephoneEtroit = false; }

  /* Icônes SVG originales, traits simples, sans texte permanent. */
  var ICONES = {
    accueil: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/></svg>',
    retour: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    suivant: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
    recherche: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>',
    lire: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    lanterne: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z"/></svg>',
    question: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',
    gepeto: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M12 8V4"/><circle cx="12" cy="3" r="1"/><circle cx="9" cy="13" r="1" fill="currentColor"/><circle cx="15" cy="13" r="1" fill="currentColor"/><path d="M9 17h6"/></svg>',
    confort: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/></svg>',
    fermer: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg>',
    haut: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 14 6-6 6 6"/></svg>',
    deplacer: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="6" r="1.2" fill="currentColor"/><circle cx="15" cy="6" r="1.2" fill="currentColor"/><circle cx="9" cy="12" r="1.2" fill="currentColor"/><circle cx="15" cy="12" r="1.2" fill="currentColor"/><circle cx="9" cy="18" r="1.2" fill="currentColor"/><circle cx="15" cy="18" r="1.2" fill="currentColor"/></svg>'
  };

  function boutonCommandeBarre(nom, label, libelle, action) {
    var b = el("button", { "class": "compagnon-cmd", "type": "button", "aria-label": label });
    b.innerHTML = ICONES[nom] + '<span class="compagnon-cmd-texte">' + libelle + "</span>";
    on(b, "click", function () { action(b); });
    boutonsCommandes[nom] = b;
    return b;
  }

  function boutonCommande(texte, label, action) {
    var b = el("button", { "class": "compagnon-commande", "type": "button", "aria-label": label }, texte);
    on(b, "click", action);
    return b;
  }

  function construire() {
    if (document.getElementById("compagnon-barre")) return; /* jamais deux barres */
    if (estPageStopExclue) return; /* option A en vigueur (tension ouverte, v3 §10 nº 1) */

    racine = el("div", { "id": "compagnon", "class": "compagnon" });
    document.body.appendChild(racine);

    /* La barre : un panneau flottant vert foncé arrondi (style photo 1),
       qui démarre en bas de l'écran. Tout vit dedans : l'en-tête, les
       10 commandes, les panneaux, le panneau Sir H. Gepeto. */
    barre = el("div", { "id": "compagnon-barre", "class": "compagnon-barre", "role": "region", "aria-label": "Barre HP, à portée de main" });

    /* En-tête : poignée de déplacement + « HP À portée de main » + Réduire. */
    var tete = el("div", { "class": "compagnon-tete" });
    poignee = el("button", {
      "class": "compagnon-poignee", "type": "button",
      "aria-label": "Déplacer la barre : glissez, ou utilisez les flèches du clavier, Échap pour annuler"
    });
    poignee.innerHTML = ICONES.deplacer;
    tete.appendChild(poignee);
    var titre = el("p", { "class": "compagnon-titre" });
    titre.innerHTML = "<strong>HP</strong> À portée de main";
    tete.appendChild(titre);
    var btnReduire = el("button", { "class": "compagnon-reduire", "type": "button", "aria-label": "Réduire la barre" }, "Réduire");
    on(btnReduire, "click", function () { reduireBarre(); });
    tete.appendChild(btnReduire);
    barre.appendChild(tete);

    /* Slogan fixe, partout, exactement « HP — des outils pour la vraie vie. » */
    var slogan = el("p", { "class": "compagnon-slogan" }, "HP — des outils pour la vraie vie.");
    barre.appendChild(slogan);

    /* Rangée des 10 commandes. Sur téléphone, 4 visibles (Accueil,
       Loupe, Gepeto, Plus) — les 6 secondaires vivent dans Plus. */
    var rangee = el("nav", { "class": "compagnon-rangee", "aria-label": "Commandes de la barre" });
    rangee.appendChild(boutonCommandeBarre("accueil", "Accueil", "Accueil", function () { window.location.href = "/"; }));
    rangee.appendChild(boutonCommandeBarre("retour", "Retour", "Retour", function () { window.history.back(); }));
    rangee.appendChild(boutonCommandeBarre("suivant", "Suivant", "Suivant", function () { window.history.forward(); }));
    rangee.appendChild(boutonCommandeBarre("recherche", "Loupe : rechercher sur le site", "Loupe", function (b) { basculerPanneau("recherche", b); }));
    rangee.appendChild(boutonCommandeBarre("lire", "Lire : lecture vocale de la page", "Lire", function () { basculerLecture(); }));
    rangee.appendChild(boutonCommandeBarre("lanterne", "Lanterne : mode lecture confortable", "Lanterne", function (b) { basculerPanneau("lanterne", b); }));
    rangee.appendChild(boutonCommandeBarre("question", "Question : poser une question sur la page", "Question", function () { ouvrirQuestion(); }));
    rangee.appendChild(boutonCommandeBarre("gepeto", "Gepeto : ouvrir Sir H. Gepeto", "Gepeto", function () { basculerGepeto(); }));
    rangee.appendChild(boutonCommandeBarre("confort", "Confort : réglages d'affichage", "Confort", function (b) { basculerPanneau("confort", b); }));
    rangee.appendChild(boutonCommandeBarre("plus", "Plus : fonctions secondaires", "Plus", function (b) { basculerPanneau("plus", b); }));
    barre.appendChild(rangee);

    /* Panneau : recherche, favoris, Plus, Confort, Lanterne, aide.
       Une section du conteneur, jamais un recouvrement. */
    panneau = el("div", { "class": "compagnon-panneau", "role": "dialog", "aria-label": "Panneau de la barre", "hidden": "" });
    zonePanneau = el("div", { "class": "compagnon-panneau-contenu" });
    panneau.appendChild(zonePanneau);
    barre.appendChild(panneau);

    /* Section Sir H. Gepeto, intégrée DANS la barre (v3 §5) :
       dialogue d'accueil (rangée, fermable), hôte du moteur.
       Le moteur ne charge qu'au tap sur la commande Gepeto
       (0 code mascotte avant). */
    sectionGepeto = el("div", { "class": "compagnon-gepeto", "hidden": "" });
    dialogueGepeto = el("div", { "class": "compagnon-gepeto-dialogue", "hidden": "" });
    var dialogueTexte = el("p", { "class": "compagnon-gepeto-texte" }, DIALOGUES.gepeto);
    dialogueGepeto.appendChild(dialogueTexte);
    var dialogueFermer = el("button", { "class": "compagnon-fermer", "type": "button", "aria-label": "Fermer le dialogue" });
    dialogueFermer.innerHTML = ICONES.fermer;
    on(dialogueFermer, "click", function () { dialogueGepeto.setAttribute("hidden", ""); });
    dialogueGepeto.appendChild(dialogueFermer);
    sectionGepeto.appendChild(dialogueGepeto);
    hoteGepeto = el("div", { "id": "compagnon-gepeto-hote", "class": "compagnon-gepeto-hote" });
    sectionGepeto.appendChild(hoteGepeto);
    barre.appendChild(sectionGepeto);

    /* Bande de vie : la promenade marche ici, jamais sur les icônes. */
    marcheur = el("img", { "class": "compagnon-marcheur", "alt": "", "aria-hidden": "true", "loading": "lazy", "decoding": "async" });
    barre.appendChild(marcheur);

    racine.appendChild(barre);

    /* Bouton de rappel « Barre » : rappelle la barre réduite ou masquée. */
    boutonRappel = el("button", { "class": "compagnon-rappel", "type": "button", "hidden": "" }, "Barre");
    boutonRappel.setAttribute("aria-label", "Afficher la barre du Compagnon");
    on(boutonRappel, "click", rappelerBarre);
    racine.appendChild(boutonRappel);

    document.documentElement.classList.add("compagnon-actif", "compagnon-v3");
    appliquerTailleTexte();
    appliquerConfort();
    appliquerPositionMemorisee();
    placerCommandes();
    mettreAJourCommandes();
  }

  /* ---------- Placement des commandes selon le format ----------
     Téléphone (≤560 px) : 4 visibles — Accueil, Loupe, Gepeto,
     Plus (décision nº 2). Les 6 secondaires déménagent dans le
     panneau Plus (un seul élément bouton, deux parents possibles,
     jamais de doublon). Ordinateur et tablette : les 10 visibles. */
  var conteneurSecondaires = null;
  var conteneurSecondairesCache = null;
  function placerCommandes() {
    var rangee = $(".compagnon-rangee", barre);
    if (!rangee) return;
    boutonsSecondaires.forEach(function (nom) {
      var b = boutonsCommandes[nom];
      if (!b) return;
      if (telephoneEtroit) {
        /* Sur téléphone, les 6 secondaires vivent dans Plus.
           Si Plus n'a jamais été ouvert, un conteneur caché les
           garde (jamais de doublon, jamais de débordement). Si le
           conteneur de Plus a été retiré (panneau refermé), on
           retombe sur le conteneur caché. */
        if (!conteneurSecondaires || !document.contains(conteneurSecondaires)) {
          if (!conteneurSecondairesCache) {
            conteneurSecondairesCache = el("div", { "class": "compagnon-secondaires-cache", "hidden": "" });
            barre.appendChild(conteneurSecondairesCache);
          }
          conteneurSecondaires = conteneurSecondairesCache;
        }
        if (b.parentNode !== conteneurSecondaires) conteneurSecondaires.appendChild(b);
        b.classList.add("compagnon-cmd-secondaire");
      } else {
        if (b.parentNode !== rangee) rangee.appendChild(b);
        b.classList.remove("compagnon-cmd-secondaire");
      }
    });
    /* Remettre les 4 visibles dans l'ordre : Accueil, Loupe, Gepeto, Plus. */
    if (!telephoneEtroit) {
      ["accueil", "retour", "suivant", "recherche", "lire", "lanterne", "question", "gepeto", "confort", "plus"].forEach(function (nom) {
        var b = boutonsCommandes[nom];
        if (b) rangee.appendChild(b);
      });
    }
  }

  /* ---------- Déplacer la barre (décision nº 9) ----------
     Poignée seule prise du glisser (Pointer Events). Seuil 8 px :
     un tap reste un tap, le défilement reste le défilement.
     Position mémorisée (localStorage, par appareil, sans compte).
     La barre ne sort jamais de l'écran ; jamais sur le STOP
     (zone interdite) ; jamais sur un bouton important (garde
     simple : boutons de validation et de paiement visibles).
     Au clavier : flèches pour déplacer, Échap pour annuler.
     Mouvement réduit : saut direct, aucune animation. */
  var enDeplacement = false;
  var deplacementActif = false;
  var depSX = 0, depSY = 0, depOX = 0, depOY = 0, depPid = null;
  var depAvant = null;

  function rectBarre() { return barre.getBoundingClientRect(); }

  function zonesInterdites() {
    var zones = [];
    $all(".stop-global, #stopBar").forEach(function (n) {
      if (n.offsetParent !== null) zones.push(n.getBoundingClientRect());
    });
    return zones;
  }

  function recouvreZoneInterdite(rect) {
    var zones = zonesInterdites();
    for (var i = 0; i < zones.length; i++) {
      var z = zones[i];
      if (rect.left < z.right && rect.right > z.left && rect.top < z.bottom && rect.bottom > z.top) return true;
    }
    return false;
  }

  function recouvreBoutonImportant(rect) {
    var boutons = $all("button[type='submit'], a[href*='checkout'], a[href*='paiement'], [data-paiement]");
    for (var i = 0; i < boutons.length; i++) {
      var b = boutons[i];
      if (b.offsetParent === null) continue;
      if (racine.contains(b)) continue;
      var r = b.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (rect.left < r.right && rect.right > r.left && rect.top < r.bottom && rect.bottom > r.top) return true;
    }
    return false;
  }

  function contraindrePosition(left, top) {
    var vw = window.innerWidth || 360;
    var vh = window.innerHeight || 640;
    var r = rectBarre();
    var marge = 8;
    var safeBas = 0;
    try { safeBas = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--sat") || "0", 10) || 0; } catch (e) { safeBas = 0; }
    left = Math.max(marge, Math.min(left, vw - r.width - marge));
    top = Math.max(marge, Math.min(top, vh - r.height - marge - safeBas));
    return { left: left, top: top };
  }

  function poserBarre(left, top) {
    var p = contraindrePosition(left, top);
    barre.style.left = p.left + "px";
    barre.style.top = p.top + "px";
    barre.style.right = "auto";
    barre.style.bottom = "auto";
    barre.classList.add("compagnon-deplacee");
    return p;
  }

  function remettreEnBas() {
    barre.style.left = "";
    barre.style.top = "";
    barre.style.right = "";
    barre.style.bottom = "";
    barre.classList.remove("compagnon-deplacee");
    try { window.localStorage.removeItem(LS_POSITION); } catch (e) { /* stockage indisponible */ }
  }

  function appliquerPositionMemorisee() {
    var pos = lireLS(LS_POSITION, null);
    if (!pos || typeof pos.left !== "number" || typeof pos.top !== "number") return;
    var p = poserBarre(pos.left, pos.top);
    if (recouvreZoneInterdite(rectBarre()) || recouvreBoutonImportant(rectBarre())) remettreEnBas();
    else poserBarre(p.left, p.top);
  }

  function memoriserPosition() {
    var r = rectBarre();
    ecrireLS(LS_POSITION, { left: Math.round(r.left), top: Math.round(r.top) });
  }

  function surPoigneeBas(e) {
    if (e.button !== undefined && e.button !== 0) return;
    enDeplacement = true;
    deplacementActif = false;
    depSX = e.clientX; depSY = e.clientY;
    var r = rectBarre();
    depOX = r.left; depOY = r.top;
    depPid = e.pointerId;
    depAvant = { left: r.left, top: r.top };
    try { poignee.setPointerCapture(e.pointerId); } catch (err) { /* capture indisponible */ }
    e.preventDefault();
  }

  function surPoigneeBouger(e) {
    if (!enDeplacement || e.pointerId !== depPid) return;
    var dx = e.clientX - depSX, dy = e.clientY - depSY;
    if (!deplacementActif && Math.sqrt(dx * dx + dy * dy) <= 8) return;
    if (!deplacementActif) {
      deplacementActif = true;
      barre.classList.add("en-deplacement");
      arreterPromenade(true);
    }
    poserBarre(depOX + dx, depOY + dy);
  }

  function surPoigneeHaut(e) {
    if (!enDeplacement || e.pointerId !== depPid) return;
    enDeplacement = false;
    barre.classList.remove("en-deplacement");
    if (!deplacementActif) return; /* c'était un tap, pas un glisser */
    deplacementActif = false;
    if (recouvreZoneInterdite(rectBarre()) || recouvreBoutonImportant(rectBarre())) {
      /* Jamais sur le STOP ni sur un bouton important : retour en bas. */
      if (depAvant) poserBarre(depAvant.left, depAvant.top);
      else remettreEnBas();
      return;
    }
    memoriserPosition();
  }

  function surPoigneeClavier(e) {
    var pas = e.shiftKey ? 64 : 16;
    var r = rectBarre();
    var x = r.left, y = r.top, bouge = true;
    if (e.key === "ArrowLeft") x -= pas;
    else if (e.key === "ArrowRight") x += pas;
    else if (e.key === "ArrowUp") y -= pas;
    else if (e.key === "ArrowDown") y += pas;
    else if (e.key === "Escape") {
      if (depAvant) poserBarre(depAvant.left, depAvant.top);
      return;
    } else bouge = false;
    if (!bouge) return;
    e.preventDefault();
    if (!depAvant) depAvant = { left: r.left, top: r.top };
    var p = poserBarre(x, y);
    if (recouvreZoneInterdite(rectBarre()) || recouvreBoutonImportant(rectBarre())) {
      if (depAvant) poserBarre(depAvant.left, depAvant.top);
      return;
    }
    poserBarre(p.left, p.top);
    memoriserPosition();
  }

  /* ---------- Panneaux ---------- */
  function fermerPanneau() {
    if (panneau) panneau.setAttribute("hidden", "");
    if (sectionGepeto) sectionGepeto.setAttribute("hidden", "");
    panneauOuvert = null;
    mettreAJourCommandes();
  }

  function ouvrirPanneau(nom) {
    panneauOuvert = nom;
    if (sectionGepeto) sectionGepeto.setAttribute("hidden", "");
    if (nom === "recherche") rendreRecherche();
    else if (nom === "favoris") rendreFavoris();
    else if (nom === "plus") rendrePlus();
    else if (nom === "confort") rendreConfort();
    else if (nom === "lanterne") rendreLanterne();
    else if (nom === "aide") rendreAide();
    panneau.removeAttribute("hidden");
    mettreAJourCommandes();
  }

  function basculerPanneau(nom, bouton) {
    if (panneauOuvert === nom) { fermerPanneau(); return; }
    ouvrirPanneau(nom);
  }

  function mettreAJourCommandes() {
    ["recherche", "lanterne", "confort", "plus"].forEach(function (nom) {
      var b = boutonsCommandes[nom];
      if (b) b.setAttribute("aria-expanded", panneauOuvert === nom ? "true" : "false");
    });
    var bGepeto = boutonsCommandes.gepeto;
    if (bGepeto) bGepeto.setAttribute("aria-expanded", panneauOuvert === "gepeto" ? "true" : "false");
    var bLire = boutonsCommandes.lire;
    if (bLire) {
      bLire.classList.toggle("en-lecture", lectureEtat === "lecture");
      bLire.setAttribute("aria-label", lectureEtat === "lecture" ? "Lire : lecture en cours, touchez pour arrêter" : (lectureEtat === "pause" ? "Lire : lecture en pause, touchez pour reprendre" : "Lire : lecture vocale de la page"));
    }
  }

  function entetePanneau(titre, boutonFermer) {
    var h = el("div", { "class": "compagnon-panneau-tete" });
    h.appendChild(el("h2", { "class": "compagnon-panneau-titre" }, titre));
    if (boutonFermer) {
      var f = el("button", { "class": "compagnon-fermer", "type": "button", "aria-label": "Fermer le panneau" });
      f.innerHTML = ICONES.fermer;
      on(f, "click", fermerPanneau);
      h.appendChild(f);
    }
    return h;
  }

  /* Loupe : recherche sur l'index local (110 entrées) + favoris.
     La recherche sert aussi les 5 rapides de la Question
     (« Trouve un outil » ouvre la Loupe). */
  function rendreRecherche() {
    zonePanneau.innerHTML = "";
    zonePanneau.appendChild(entetePanneau("Rechercher sur le site", true));
    var champ = el("input", {
      "class": "compagnon-champ", "type": "search", "placeholder": "Rechercher jeux, outils, livres, ateliers…",
      "aria-label": "Rechercher sur le site", "autocomplete": "off"
    });
    var resultats = el("ul", { "class": "compagnon-resultats", "aria-label": "Résultats de la recherche" });
    var aides = el("div", { "class": "compagnon-rapides" });
    aides.appendChild(el("p", { "class": "compagnon-rapides-titre" }, "Par ici :"));
    ["Jeux", "Outils", "Livres", "Ateliers"].forEach(function (nom) {
      var b = boutonCommande(nom, "Aller à " + nom, function () { window.location.href = nom === "Jeux" ? "/jeux" : (nom === "Outils" ? "/outils" : (nom === "Livres" ? "/livres-pdf" : "/ateliers")); });
      aides.appendChild(b);
    });
    zonePanneau.appendChild(champ);
    zonePanneau.appendChild(aides);
    zonePanneau.appendChild(resultats);

    function afficher(liste, vide) {
      resultats.innerHTML = "";
      if (liste.length === 0) {
        var li = el("li", { "class": "compagnon-vide" }, vide);
        resultats.appendChild(li);
        return;
      }
      liste.forEach(function (e) {
        var li = el("li");
        var a = el("a", { "class": "compagnon-lien", "href": e.url }, e.titre);
        var meta = el("span", { "class": "compagnon-lien-meta" }, " " + e.famille);
        a.appendChild(meta);
        li.appendChild(a);
        var f = el("button", { "class": "compagnon-fav", "type": "button", "aria-label": estFavori(e.url) ? "Retirer des favoris" : "Ajouter aux favoris" }, estFavori(e.url) ? "★ Retiré" : "☆ Favori");
        on(f, "click", function () {
          if (estFavori(e.url)) retirerFavori(e.url); else ajouterFavori(e.titre, e.url);
          afficher(chercher(champ.value), "Aucun résultat pour cette recherche.");
        });
        li.appendChild(f);
        resultats.appendChild(li);
      });
    }
    afficher(chercher(""), "");
    on(champ, "input", function () {
      var q = champ.value;
      if (q.trim() === "") { afficher(chercher(""), ""); return; }
      afficher(chercher(q), "Aucun résultat pour cette recherche.");
    });
    setTimeout(function () { try { champ.focus(); } catch (e) { /* focus indisponible */ } }, 60);
  }

  function rendreFavoris() {
    zonePanneau.innerHTML = "";
    zonePanneau.appendChild(entetePanneau("Vos favoris", true));
    var f = chargerFavoris();
    var liste = el("ul", { "class": "compagnon-resultats" });
    if (f.length === 0) {
      liste.appendChild(el("li", { "class": "compagnon-vide" }, "Aucun favori pour l'instant. Touchez ☆ à côté d'un résultat de recherche pour en garder un ici."));
    } else {
      f.forEach(function (x) {
        var li = el("li");
        li.appendChild(el("a", { "class": "compagnon-lien", "href": x.url }, x.titre));
        var r = el("button", { "class": "compagnon-fav", "type": "button", "aria-label": "Retirer des favoris" }, "★ Retiré");
        on(r, "click", function () { retirerFavori(x.url); rendreFavoris(); });
        li.appendChild(r);
        liste.appendChild(li);
      });
    }
    zonePanneau.appendChild(liste);
  }

  /* Plus : fonctions secondaires. Sans Paramètres séparé (décision
     nº 5) : tout réglage vit dans Confort. Sans lien du menu
     « Tout le site » : /plan-du-site n'existe pas (T5). */
  function rendrePlus() {
    zonePanneau.innerHTML = "";
    zonePanneau.appendChild(entetePanneau("Plus", true));
    conteneurSecondaires = el("div", { "class": "compagnon-secondaires" });
    if (telephoneEtroit) {
      conteneurSecondaires.appendChild(el("p", { "class": "compagnon-secondaires-titre" }, "Commandes :"));
      placerCommandes();
    }
    zonePanneau.appendChild(conteneurSecondaires);

    var groupe = el("div", { "class": "compagnon-groupe" });
    groupe.appendChild(el("p", { "class": "compagnon-groupe-titre" }, "Partager et garder :"));
    var bPartager = boutonCommande("Partager", "Partager cette page", partagerPage);
    groupe.appendChild(bPartager);
    groupe.appendChild(boutonCommande("Copier le lien", "Copier le lien de cette page", copierLien));
    groupe.appendChild(boutonCommande("Favoris", "Voir vos favoris", function () { ouvrirPanneau("favoris"); }));
    groupe.appendChild(boutonCommande("Imprimer", "Imprimer cette page", function () { window.print(); }));
    var bTelecharger = boutonCommande("Télécharger", "Télécharger le fichier de cette page", function () {
      var a = document.querySelector("[data-telechargement]");
      if (a) a.click();
    });
    var aTel = document.querySelector("[data-telechargement]");
    if (!aTel) bTelecharger.setAttribute("disabled", "");
    groupe.appendChild(bTelecharger);
    groupe.appendChild(boutonCommande("Revenir en haut", "Revenir en haut de la page", function () {
      if (mouvementReduit) window.scrollTo(0, 0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }));
    zonePanneau.appendChild(groupe);

    var groupe2 = el("div", { "class": "compagnon-groupe" });
    groupe2.appendChild(el("p", { "class": "compagnon-groupe-titre" }, "Aide et réseaux :"));
    groupe2.appendChild(boutonCommande("Signaler un problème", "Signaler un problème sur cette page", function () {
      var sujet = encodeURIComponent("Problème sur la page : " + (document.title || window.location.href));
      var corps = encodeURIComponent("Bonjour,\n\nPage : " + window.location.href + "\n\nProblème :\n");
      window.location.href = MAIL_DIRECTION + "?subject=" + sujet + "&body=" + corps;
    }));
    groupe2.appendChild(boutonCommande("Aide", "Aide et réponses", function () { ouvrirPanneau("aide"); }));
    groupe2.appendChild(boutonCommande("Contacter HP", "Écrire à la direction humaine", function () { window.location.href = MAIL_DIRECTION; }));
    groupe2.appendChild(el("p", { "class": "compagnon-groupe-titre" }, "Réseaux sociaux :"));
    Object.keys(URL_RESEAUX).forEach(function (nom) {
      groupe2.appendChild(boutonCommande(nom.charAt(0).toUpperCase() + nom.slice(1), "Ouvrir " + nom + " dans un nouvel onglet", function () { window.open(URL_RESEAUX[nom], "_blank", "noopener"); }));
    });
    groupe2.appendChild(boutonCommande("Remettre en bas", "Remettre la barre en bas de l'écran", function () { remettreEnBas(); }));
    zonePanneau.appendChild(groupe2);

    /* Menu du site (index, champs « menu »), par section. */
    var sections = {};
    for (var i = 0; i < DONNEES.length; i++) {
      var e = DONNEES[i];
      if (!e.menu) continue;
      if (!sections[e.famille]) sections[e.famille] = [];
      sections[e.famille].push(e);
    }
    var nav = el("nav", { "class": "compagnon-menu", "aria-label": "Menu du site" });
    ORDRE_MENU.forEach(function (famille) {
      var entrees = sections[famille];
      if (!entrees || entrees.length === 0) return;
      var g = el("div", { "class": "compagnon-groupe" });
      g.appendChild(el("p", { "class": "compagnon-groupe-titre" }, famille + " :"));
      entrees.forEach(function (e) {
        g.appendChild(el("a", { "class": "compagnon-lien", "href": e.url }, e.titre));
      });
      nav.appendChild(g);
    });
    zonePanneau.appendChild(nav);
  }

  /* Confort : 7 réglages (décision nº 4 + P1). La taille vit
     ici ; la Lanterne garde l'atténuation, l'éclairage de zone,
     le fond doux/sombre et la fermeture en 1 clic — le contraste
     et l'espacement restent ici, un seul contrôle par réglage.
     (Point à trancher au pilote : déplacer contraste/espacement
     dans Lanterne serait 1 ligne.) */
  function rendreConfort() {
    zonePanneau.innerHTML = "";
    zonePanneau.appendChild(entetePanneau("Confort", true));
    zonePanneau.appendChild(el("p", { "class": "compagnon-note" }, "Vos réglages sont gardés sur cet appareil, sans compte. Ils s'appliquent à tout le site."));

    var g1 = el("div", { "class": "compagnon-groupe" });
    g1.appendChild(el("p", { "class": "compagnon-groupe-titre" }, "Taille du texte :"));
    var tailles = ["Texte normal", "Texte plus grand", "Texte très grand"];
    tailles.forEach(function (label, idx) {
      var b = boutonCommande(label, label, function () { niveauTexte = idx; ecrireLS(LS_TEXTE, idx); appliquerTailleTexte(); rendreConfort(); });
      if (niveauTexte === idx) b.classList.add("actif");
      g1.appendChild(b);
    });
    zonePanneau.appendChild(g1);

    var g2 = el("div", { "class": "compagnon-groupe" });
    g2.appendChild(el("p", { "class": "compagnon-groupe-titre" }, "Affichage :"));
    function bascule(label, cle, description) {
      var b = boutonCommande(label + (confort[cle] ? " : activé" : " : désactivé"), description, function () {
        confort[cle] = !confort[cle];
        sauverConfort(); appliquerConfort(); rendreConfort();
      });
      if (confort[cle]) b.classList.add("actif");
      g2.appendChild(b);
    }
    bascule("Fond sombre", "sombre", "Activer ou couper le fond sombre");
    bascule("Contraste renforcé", "contraste", "Activer ou couper le contraste renforcé");
    bascule("Animations réduites", "animations", "Activer ou couper les animations réduites");
    bascule("Espacement du texte", "espacement", "Activer ou couper l'espacement du texte");
    bascule("Navigation au clavier", "clavier", "Activer ou couper la navigation au clavier renforcée");
    zonePanneau.appendChild(g2);

    var g3 = el("div", { "class": "compagnon-groupe" });
    g3.appendChild(boutonCommande("Réinitialiser le confort", "Réinitialiser tous les réglages de confort", function () {
      confort = { sombre: false, contraste: false, animations: false, espacement: false, clavier: false };
      niveauTexte = 0; ecrireLS(LS_TEXTE, 0); sauverConfort(); appliquerConfort(); appliquerTailleTexte(); rendreConfort();
    }));
    zonePanneau.appendChild(g3);
  }

  /* Lanterne : atténuation + éclairage de zone (P1). Le fond
     doux/sombre et la fermeture en 1 clic sont ici aussi. */
  function rendreLanterne() {
    zonePanneau.innerHTML = "";
    zonePanneau.appendChild(entetePanneau("Lanterne", true));
    zonePanneau.appendChild(el("p", { "class": "compagnon-note" }, "Mode lecture confortable : la page s'assombrit, la zone de lecture reste éclairée."));
    var g = el("div", { "class": "compagnon-groupe" });
    var bActiver = boutonCommande(lanterneActive ? "Lanterne : activée" : "Allumer la Lanterne", "Allumer ou éteindre la Lanterne", function () {
      lanterneActive = !lanterneActive;
      document.documentElement.classList.toggle("compagnon-lanterne", lanterneActive);
      if (lanterneActive) appliquerLanterne(); else retirerLanterne();
      rendreLanterne();
    });
    if (lanterneActive) bActiver.classList.add("actif");
    g.appendChild(bActiver);
    ["doux", "sombre"].forEach(function (fond) {
      var b = boutonCommande(fond === "doux" ? "Fond doux" : "Fond sombre", "Choisir le fond " + fond, function () {
        lanterneFond = fond; appliquerLanterne(); rendreLanterne();
      });
      if (lanterneFond === fond) b.classList.add("actif");
      g.appendChild(b);
    });
    zonePanneau.appendChild(g);
  }

  function appliquerLanterne() {
    retirerLanterne();
    var cible = document.querySelector("main") || document.body;
    var voile = el("div", { "class": "compagnon-lanterne-voile compagnon-lanterne-" + lanterneFond, "aria-hidden": "true" });
    on(voile, "click", function () { lanterneActive = false; document.documentElement.classList.remove("compagnon-lanterne"); retirerLanterne(); fermerPanneau(); });
    cible.appendChild(voile);
    cible.classList.add("compagnon-lanterne-cible");
  }
  function retirerLanterne() {
    $all(".compagnon-lanterne-voile").forEach(function (n) { n.remove(); });
    $all(".compagnon-lanterne-cible").forEach(function (n) { n.classList.remove("compagnon-lanterne-cible"); });
  }

  function rendreAide() {
    zonePanneau.innerHTML = "";
    zonePanneau.appendChild(entetePanneau("Aide", true));
    zonePanneau.appendChild(el("p", { "class": "compagnon-note" }, "La direction humaine vous répond sous 3 jours ouvrables, lundi à vendredi."));
    var g = el("div", { "class": "compagnon-groupe" });
    g.appendChild(boutonCommande("Écrire à la direction humaine", "Écrire à la direction humaine par courriel", function () { window.location.href = MAIL_DIRECTION; }));
    g.appendChild(boutonCommande("Poser une question à Sir H. Gepeto", "Poser une question à Sir H. Gepeto", function () { ouvrirQuestion(); }));
    g.appendChild(boutonCommande("Plan du site (à venir)", "Le plan du site n'existe pas encore", function () { /* T5 : /plan-du-site, lot B13-reste */ }));
    zonePanneau.appendChild(g);
  }

  /* ---------- Sir H. Gepeto, intégré dans la barre (v3 §5) ---------- */
  function ouvrirGepeto() {
    panneauOuvert = "gepeto";
    if (panneau) panneau.setAttribute("hidden", "");
    sectionGepeto.removeAttribute("hidden");
    dialogueGepeto.removeAttribute("hidden");
    mettreAJourCommandes();
    assurerMoteur(function () { /* moteur prêt, rien de plus */ });
  }

  function fermerGepeto() {
    if (panneauOuvert === "gepeto") {
      sectionGepeto.setAttribute("hidden", "");
      panneauOuvert = null;
      mettreAJourCommandes();
    }
  }

  function basculerGepeto() {
    if (panneauOuvert === "gepeto") { fermerGepeto(); return; }
    if (gepetoFermeSession) {
      document.dispatchEvent(new CustomEvent("hp:gepeto-rouvrir"));
      gepetoFermeSession = false;
    }
    ouvrirGepeto();
  }

  /* Chargement du moteur (P2-a) : un seul tap = un seul
     chargement. Pages React : le pont (HgptoPont) écoute
     'hp:gepeto-ouvrir'. Pages statiques : injection du bundle
     autonome /hgpto/hgpto.js (+ /hgpto/hgpto.css). Le moteur
     signale 'hp:gepeto-pret' quand il est monté. */
  function assurerMoteur(apres) {
    if (moteurCharge) { if (apres) apres(); return; }
    /* Moteur déjà monté par une autre voie (ex. page autonome qui
       charge son bundle au chargement) : rien à charger, on signale
       prêt tout de suite — sinon la barre attendrait un événement
       déjà passé. */
    if (document.querySelector(".hgpto-host")) {
      moteurCharge = true;
      if (apres) apres();
      return;
    }
    if (moteurEnChargement) {
      if (apres) document.addEventListener("hp:gepeto-pret", function pourPret() { document.removeEventListener("hp:gepeto-pret", pourPret); apres(); });
      return;
    }
    moteurEnChargement = true;
    var indicateur = el("p", { "class": "compagnon-gepeto-chargement" }, "Chargement de Sir H. Gepeto…");
    hoteGepeto.appendChild(indicateur);
    /* Un tap explicite sur Gepeto rouvre toujours : on efface le
       drapeau de fermeture de session avant de charger (comme
       l'ancien lanceur HgptoTap). */
    try { window.sessionStorage.removeItem("hgpto-closed"); } catch (e) { /* session seulement */ }
    var pontPresent = false;
    try { pontPresent = document.documentElement.dataset.hgptoPont === "1"; } catch (e) { pontPresent = false; }
    document.addEventListener("hp:gepeto-pret", function pourPret() {
      document.removeEventListener("hp:gepeto-pret", pourPret);
      moteurCharge = true;
      moteurEnChargement = false;
      if (indicateur.parentNode) indicateur.remove();
      if (apres) apres();
    });
    if (pontPresent) {
      document.dispatchEvent(new CustomEvent("hp:gepeto-ouvrir"));
    } else {
      if (!document.querySelector('link[href="/hgpto/hgpto.css"]')) {
        var css = el("link", { "rel": "stylesheet", "href": "/hgpto/hgpto.css" });
        document.head.appendChild(css);
      }
      if (!document.querySelector('script[src="/hgpto/hgpto.js"]')) {
        var js = el("script", { "src": "/hgpto/hgpto.js", "defer": "" });
        on(js, "error", function () {
          moteurEnChargement = false;
          indicateur.textContent = "Sir H. Gepeto n'a pas pu se charger. Réessayez, ou écrivez à la direction humaine.";
        });
        document.body.appendChild(js);
      }
    }
    /* La promenade Gepeto : tant que le moteur n'est pas chargé,
       Pixel seule marche sur la bande (c-tete.png, 55 Ko). */
    if (!moteurCharge) demarrerPromenade("pixel");
  }

  function ouvrirQuestion() {
    assurerMoteur(function () {
      if (panneauOuvert !== "gepeto") ouvrirGepeto();
      document.dispatchEvent(new CustomEvent("hp:gepeto-question"));
    });
  }

  /* ---------- Lire : lecture vocale à la demande (décision nº 8) ----------
     La lecture est faite par le moteur (voix du navigateur,
     français si disponible). La barre ne fait que commander
     et montrer l'état : lecture, pause, arrêtée. */
  function basculerLecture() {
    if (lectureEtat === "lecture") {
      document.dispatchEvent(new CustomEvent("hp:gepeto-lecture-pause"));
      return;
    }
    if (lectureEtat === "pause") {
      document.dispatchEvent(new CustomEvent("hp:gepeto-lecture-reprise"));
      return;
    }
    assurerMoteur(function () {
      document.dispatchEvent(new CustomEvent("hp:gepeto-lire"));
    });
  }

  /* ---------- Partager et copier ---------- */
  function partagerPage() {
    var url = window.location.href;
    var titre = document.title || "HP Outils";
    if (navigator.share) {
      navigator.share({ title: titre, url: url }).catch(function () { /* partage annulé */ });
    } else {
      copierLien();
    }
  }

  function copierLien() {
    var url = window.location.href;
    function ok() {
      var b = boutonsCommandes.plus;
      if (b) b.setAttribute("aria-label", "Plus : lien copié");
      setTimeout(function () { if (b) b.setAttribute("aria-label", "Plus : fonctions secondaires"); }, 3000);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(ok, function () { copierLienSecours(url); ok(); });
    } else {
      copierLienSecours(url);
      ok();
    }
  }

  function copierLienSecours(url) {
    var t = el("textarea");
    t.value = url;
    t.style.position = "fixed"; t.style.opacity = "0";
    document.body.appendChild(t);
    t.select();
    try { document.execCommand("copy"); } catch (e) { /* copie indisponible */ }
    t.remove();
  }

  /* ---------- Promenade (P2-d) ----------
     Pixel seule marche sur la bande de la barre (sa tête est
     fixe). Sir H. Gepeto ne marche que si le moteur est déjà
     chargé (sinon, charger son image de 695 Ko juste pour la
     promenade serait du gaspillage). Arrêt dès usage de la
     barre, dès mouvement réduit, dès l'interrupteur coupé. */
  function demarrerPromenade(qui) {
    arreterPromenade();
    if (!promenadeActive || mouvementReduit) return;
    if (modeJeuActif || estLecture) return;
    jetonPromenade++;
    var monJeton = jetonPromenade;
    var img = qui === "gepeto" ? IMG_GEPETO : IMG_PIXEL;
    var delai = qui === "gepeto" ? 16000 + Math.random() * 14000 : 8000 + Math.random() * 8000;
    minuteurPromenade = setTimeout(function () {
      if (monJeton !== jetonPromenade) return;
      marcheur.src = img;
      marcheur.style.opacity = "1";
      var rect = barre.getBoundingClientRect();
      var largeur = rect.width || 320;
      var depart = Math.random() * (largeur - 60);
      var distance = 60 + Math.random() * 140;
      var direction = Math.random() < 0.5 ? 1 : -1;
      var fin = Math.max(10, Math.min(largeur - 50, depart + direction * distance));
      marcheur.style.left = depart + "px";
      marcheur.style.transform = direction < 0 ? "scaleX(-1)" : "";
      if (!mouvementReduit) marcheur.style.transition = "left " + (2 + Math.random() * 3.2) + "s linear";
      else marcheur.style.transition = "none";
      requestAnimationFrame(function () { marcheur.style.left = fin + "px"; });
      minuteurPromenade = setTimeout(function () {
        if (monJeton !== jetonPromenade) return;
        marcheur.style.opacity = "0";
        minuteurPromenade = setTimeout(function () { if (monJeton === jetonPromenade) demarrerPromenade("pixel"); }, 400);
      }, 2500 + Math.random() * 2700);
    }, delai);
  }

  function arreterPromenade(definitif) {
    if (minuteurPromenade) { clearTimeout(minuteurPromenade); minuteurPromenade = null; }
    jetonPromenade++;
    if (marcheur) marcheur.style.opacity = "0";
    if (definitif) promenadeActive = false;
  }

  /* ---------- Réduire / rappeler (un seul verbe : « Réduire ») ---------- */
  function reduireBarre() {
    fermerPanneau();
    barre.classList.add("compagnon-reduite");
    boutonRappel.removeAttribute("hidden");
    try { window.sessionStorage.setItem(SS_MASQUEE, "1"); } catch (e) { /* session seulement */ }
  }

  function rappelerBarre() {
    barre.classList.remove("compagnon-reduite");
    boutonRappel.setAttribute("hidden", "");
    try { window.sessionStorage.removeItem(SS_MASQUEE); } catch (e) { /* session seulement */ }
  }

  /* ---------- Taille du texte (3 niveaux, existant) ---------- */
  function appliquerTailleTexte() {
    var html = document.documentElement;
    html.classList.remove("compagnon-texte-1", "compagnon-texte-2");
    if (niveauTexte === 1) html.classList.add("compagnon-texte-1");
    else if (niveauTexte === 2) html.classList.add("compagnon-texte-2");
  }

  /* ---------- Écoutes ---------- */
  function ecouter() {
    if (poignee) {
      on(poignee, "pointerdown", surPoigneeBas);
      on(poignee, "pointermove", surPoigneeBouger);
      on(poignee, "pointerup", surPoigneeHaut);
      on(poignee, "pointercancel", surPoigneeHaut);
      on(poignee, "keydown", surPoigneeClavier);
    }

    /* Événements du moteur (contrat P2). */
    document.addEventListener("hp:gepeto-ferme", function () {
      gepetoFermeSession = true;
      fermerGepeto();
    });
    document.addEventListener("hp:gepeto-reduire", function () { fermerGepeto(); });
    document.addEventListener("hp:lecture-etat", function (e) {
      lectureEtat = (e && e.detail && e.detail.etat) || "arretee";
      mettreAJourCommandes();
    });
    /* Le rapide « Trouve un outil » du moteur ouvre la Loupe. */
    document.addEventListener("hp:compagnon-recherche", function () { ouvrirPanneau("recherche"); });

    /* Échap : ferme le panneau ouvert, jamais la barre. */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panneauOuvert) { fermerPanneau(); }
    });

    /* Réduction au défilement : la barre se replie en liseré,
       le bouton « Barre » la rappelle. */
    var dernierY = window.scrollY || 0;
    var minuteurDefilement = null;
    window.addEventListener("scroll", function () {
      var y = window.scrollY || 0;
      var descend = y > dernierY && y > 200;
      dernierY = y;
      if (minuteurDefilement) clearTimeout(minuteurDefilement);
      minuteurDefilement = setTimeout(function () {
        if (descend && panneauOuvert === null && !barre.classList.contains("compagnon-reduite") && !barre.classList.contains("compagnon-deplacee")) {
          barre.classList.add("compagnon-repliee");
          boutonRappel.removeAttribute("hidden");
        } else if (!descend) {
          barre.classList.remove("compagnon-repliee");
          if (!barre.classList.contains("compagnon-reduite")) boutonRappel.setAttribute("hidden", "");
        }
      }, 120);
    }, { passive: true });

    /* À la moindre interaction avec la barre, la promenade s'arrête. */
    ["pointerdown", "focusin"].forEach(function (evt) {
      barre.addEventListener(evt, function () { arreterPromenade(); });
    });

    /* Retour au premier plan : la promenade reprend. */
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden && promenadeActive) demarrerPromenade("pixel");
    });

    /* Changement de format : les commandes se replacent. */
    try {
      window.matchMedia("(max-width: 560px)").addEventListener("change", function (e) {
        telephoneEtroit = e.matches;
        placerCommandes();
        if (panneauOuvert === "plus") rendrePlus();
      });
    } catch (e) { /* écoute indisponible */ }
    window.addEventListener("resize", function () {
      if (barre.classList.contains("compagnon-deplacee")) {
        var r = rectBarre();
        poserBarre(r.left, r.top);
      }
    });
  }

  /* ---------- Démarrage ---------- */
  function demarrer() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", demarrer);
      return;
    }
    /* Le Garde et Personne seule : la barre ne se monte pas
       (option A, tension ouverte). La zone interdite s'applique
       quand même si la barre y apparaît un jour. */
    if (estPageStopExclue) return;
    construire();
    ecouter();
    if (lireSS(SS_MASQUEE) === "1") reduireBarre();

    /* Accueil (T9) : Sir H. Gepeto accueille à l'arrivée, une
       fois par session, après 800 ms, dans le panneau de la
       barre — jamais un recouvrement, jamais une pastille. */
    if (estAccueil && lireSS(SS_ACCUEIL) !== "1") {
      ecrireSS(SS_ACCUEIL, "1");
      setTimeout(function () {
        if (panneauOuvert) return;
        dialogueGepeto.querySelector(".compagnon-gepeto-texte").textContent = DIALOGUES.gepeto_accueil;
        ouvrirGepeto();
      }, 800);
    }
    if (!estLecture && !modeJeuActif) demarrerPromenade("pixel");
  }

  demarrer();
})();
