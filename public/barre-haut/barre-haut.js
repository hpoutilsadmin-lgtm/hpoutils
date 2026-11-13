/* ============================================================
   FICHIER GÉNÉRÉ — NE PAS ÉDITER À LA MAIN.
   Source : src/components/barre-haut/barre-haut.js
   Régénérer : bun run build:barre-haut
   ============================================================ */
"use strict";
/* ================================================================
   BARRE UNIQUE EN HAUT — HP À portée de main
   Pilote — produit 9, nuit du 6 au 7 nov. 2026.
   Déposé sur GitHub seulement (7 nov. 2026), pas branché aux pages
   live, pas en production. Décisions HP du 7 nov. 2026 : fond #07111B,
   grille 5 × 2, arrivée dépliée, panneaux en glissement.

   Succède à la barre unique v3 (lot 5 nov. 2026, commit 3712a96) :
   mêmes 10 commandes, mêmes libellés, même bouton « Réduire »,
   même liseré 22 px, même contrat d'événements (hp:gepeto-*).
   Différences décidées par HP le 6 nov. 21 h 33 :
   - la barre est EN HAUT (la v3 était en bas) ;
   - Jeux, Outils, Livres sont des boutons directs, jamais dans « Plus » ;
   - elle REMPLACE le menu (un seul élément de navigation).

   Options lues depuis l'élément <script> qui charge ce fichier :
   - data-page="accueil|jeu|outil|cuisine|garde"
     (défaut : "jeu" — la face Gepeto 48 px est cachée sur "accueil",
      règle tranchée 6 nov. 07 h 08) ;
   - data-arrivee="reduite" : arrivée réduite (A2, option non imposée —
     défaut dépliée, décidé par HP le 7 nov. 2026) ;
   - data-disposition="defilement" : sur téléphone, les 10 commandes
     en une rangée défilante au lieu de la grille 5 × 2 (option B,
     non retenue — défaut grille 5 × 2, décidé par HP le 7 nov. 2026) ;
   - data-chemin-face="..." : chemin de la face Gepeto 48 px
     (défaut : "/hgpto/gepeto/tete-144.png", actif canonique 144 px ;
      en décembre, la tuque : "/hgpto/gepeto/tete-144-tuque-noel.png",
      lot tuque Noël Q-T3 + Q-T5, dates automatiques).

   Contraintes portées ici (voir SPEC.md) :
   - UNE SEULE barre (jamais deux) ;
   - jamais de recouvrement : la réserve --bh-hauteur est mesurée
     sur la barre réelle, panneau ouvert comme fermé, et le contenu
     de la page glisse en dessous ;
   - SEC-07 : la barre NE SE MONTE PAS sur /le-garde ni
     /personne-seule (liste STOP — aucune injection avant sa
     correction). data-page="garde" reproduit ce cas (page STOP,
     sans barre).
   Aucune dépendance externe, aucun service payant. La lecture
   vocale utilise speechSynthesis du navigateur, voix française
   si disponible.
   ================================================================ */
(function () {
  var PAGES_STOP = ["/le-garde", "/personne-seule"];
  /* Lot tuque Noël (Q-T3 + Q-T5, dates automatiques) : en décembre
     seulement, la face 48 px porte la tuque ; retour automatique
     le 1er janvier. */
  var CHEMIN_FACE_DEFAUT = new Date().getMonth() === 11
    ? "/hgpto/gepeto/tete-144-tuque-noel.png"
    : "/hgpto/gepeto/tete-144.png";
  /* Les 5 sections réelles du site (slogan HP : « Jeux, cuisine,
     outils, ateliers, livres. »). La Loupe du pilote cherche
     dans ces 5 entrées ; l'index réel de la v3 en compte 110. */
  var ENTREES_RECHERCHE = [
    { titre: "Jeux", desc: "Jeux HP — amusement, en un tap." },
    { titre: "Outils", desc: "Outils web et papier — dignité, en un tap." },
    { titre: "Livres", desc: "Livres et tomes — lecture, en un tap." },
    { titre: "En cuisine", desc: "En cuisine — manger, en un tap." },
    { titre: "Ateliers", desc: "Ateliers — avec des gens, en un tap." }
  ];
  /* Routes réelles des sections (confirmées dans src/routes/ du
     dépôt — jeux.tsx, outils.tsx, lire.tsx, en-cuisine.tsx,
     ateliers.tsx — jamais devinées). Les 3 sections de la barre
     + les 2 entrées de recherche qui n'ont pas de bouton de section. */
  var ROUTES_SECTIONS = {
    jeux: "/jeux",
    outils: "/outils",
    livres: "/livres-pdf",          // P1-4 : /lire = « À toi l'histoire », pas les livres
    "en cuisine": "/en-cuisine",
    ateliers: "/ateliers"
  };
  /* Les 5 questions rapides de Sir H. Gepeto (hgpto-data.ts, lot v3). */
  var RAPIDES = [
    "Explique-moi cette page",
    "Trouve un outil",
    "Résume-moi ceci",
    "Comment ça marche ?",
    "Aide-moi à choisir"
  ];
  /* Les 8 scènes de Sir H. Gepeto (lot v3). */
  /* P1-1 : le moteur écoute les CLÉS (cuisine, lecture, graffiti,
     skate, lutteur, mime, 2heures, barbouillage). L'affichage garde
     les libellés, le dispatch envoie la clé. */
  var SCENES = [
    { cle: "cuisine", label: "En cuisine" },
    { cle: "lecture", label: "En lecture" },
    { cle: "graffiti", label: "Graffiti" },
    { cle: "skate", label: "En skate" },
    { cle: "lutteur", label: "Lutteur" },
    { cle: "mime", label: "Mime" },
    { cle: "2heures", label: "Scène des 2 heures" },
    { cle: "barbouillage", label: "Barbouillage" }
  ];
  /* Bulle d'accueil — texte de la capture d'HP du 6 nov. 21 h 25,
     un seul mot changé : « en bas » devient « en haut », puisque
     la barre a déménagé. Voir SPEC.md. */
  var BULLE_ACCUEIL = "Bienvenue chez HP Outils. Je suis Sir H. Gepeto, le gérant du site. La barre en haut vous mène partout : jeux, outils, livres. Bonne visite !";

  var script = document.currentScript;
  var optPage = (script && script.getAttribute("data-page")) || pageDepuisChemin();
  /* P1 (§2.2) : __root.tsx ne connaît pas la page au moment du head().
     Quand l'attribut est absent, on dérive du chemin. La page pilote
     garde son attribut explicite (prioritaire). */
  function pageDepuisChemin() {
    var p = (window.location.pathname || "").toLowerCase();
    if (p === "/" || p === "/index.html") return "accueil";
    if (p === "/le-garde" || p === "/personne-seule") return "garde";
    if (p === "/en-cuisine" || p.indexOf("/en-cuisine/") === 0) return "cuisine";
    if (p === "/outils" || p.indexOf("/outils/") === 0 || p.indexOf("/outils-web/") === 0) return "outil";
    return "jeu";
  }
  var optArriveeReduite = script && script.getAttribute("data-arrivee") === "reduite";
  var optDefilement = script && script.getAttribute("data-disposition") === "defilement";
  var cheminFace = (script && script.getAttribute("data-chemin-face")) || CHEMIN_FACE_DEFAUT;

  /* ---------- Garde SEC-07 : pas d'injection sur les pages STOP ---------- */
  var cheminPage = (window.location.pathname || "").toLowerCase();
  if (PAGES_STOP.indexOf(cheminPage) !== -1 || optPage === "garde") {
    document.documentElement.classList.add("bh-stop");
    return; /* rien n'est monté, rien n'est injecté */
  }

  /* ---------- Garde d'idempotence (correctif 11 nov. 2026) ---------- */
  /* TanStack Start ré-exécute ce script à chaque navigation interne :
     son composant <Script> retire la balise du serveur après hydratation
     puis la recrée quand le head change — sans cette garde, chaque
     ré-exécution montait une barre de plus (copies invisibles qui
     interceptaient les taps). Une seule barre : on met à jour l'état
     de celle qui existe (page courante, face accueil) et on sort. */
  var existante = document.getElementById("bh-barre");
  if (existante) {
    existante.classList.toggle("bh-page-accueil", pageDepuisChemin() === "accueil");
    document.documentElement.setAttribute("data-bh-page", optPage);
    barre = existante; /* mesurerReserve() lit `barre` : l'assigner d'abord */
    mesurerReserve();
    majCompteurPanier(); /* lot boutons panier : relecture défensive à chaque navigation */
    return;
  }

  /* ---------- Petits outils ---------- */
  function el(tag, attrs, texte) {
    var n = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (k === "class") { n.className = attrs[k]; }
        else if (k === "html") { n.innerHTML = attrs[k]; }
        else { n.setAttribute(k, attrs[k]); }
      }
    }
    if (texte != null) { n.textContent = texte; }
    return n;
  }
  function $(sel, racine) { return (racine || document).querySelector(sel); }
  function on(n, evt, fn) { n.addEventListener(evt, fn); }

  /* Icônes : SVG simples, trait courant, rien d'externe. */
  var ICONES = {
    accueil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/></svg>',
    retour: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    suivant: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
    loupe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
    lire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 010 7"/></svg>',
    lanterne: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h6"/><path d="M10 3v3l-3 3v9a2 2 0 002 2h6a2 2 0 002-2V9l-3-3V3"/><path d="M12 10v4"/><path d="M9 21h6"/></svg>',
    question: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 .3c0 1.7-2.5 2-2.5 3.7"/><path d="M12 17h.01"/></svg>',
    confort: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
    panier: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h16l-1.5 9a2 2 0 01-2 1.7h-9A2 2 0 015.5 18L4 9z"/><path d="M8 9l4-5 4 5"/><path d="M9.5 12.5v3.5M14.5 12.5v3.5"/></svg>'
  };

  var barre, panneau, zonePanneau, panneauOuvert = null;
  var boutonsCommandes = {};
  var boutonsSections = {};
  var btnLire = null, lectureEnCours = false;
  var pastillePanier = null; /* lot boutons panier : pastille du nombre */

  /* ---------- Réserve : le contenu ne passe jamais sous la barre ---------- */
  function mesurerReserve() {
    if (!barre) { return; }
    var h = barre.getBoundingClientRect().height;
    document.documentElement.style.setProperty("--bh-hauteur", Math.ceil(h) + "px");
  }

  /* ---------- Compteur du panier (lot boutons panier, 11 nov. 2026) ----------
     Lecture défensive de localStorage, mêmes règles que loadCart()
     (panier.ts) : JSON.parse en try/catch, tableau attendu, on compte
     les entrées dont priceId est une chaîne (la quantité vaut toujours
     1 par PDF : le nombre d'entrées = le nombre d'articles). Stockage
     indisponible ou panier corrompu → 0, pastille cachée, bouton intact.
     Le bouton est résolu depuis le DOM en repli : lors d'une
     ré-exécution du script (garde d'idempotence, navigation interne),
     la barre existe déjà et les références du premier montage ne sont
     plus dans la portée — on relit alors la pastille existante. */
  var CLE_PANIER = "hp-panier-v1";
  function lireNombrePanier() {
    try {
      var brut = window.localStorage.getItem(CLE_PANIER);
      if (!brut) { return 0; }
      var parsed = JSON.parse(brut);
      if (!Array.isArray(parsed)) { return 0; }
      var n = 0;
      parsed.forEach(function (e) {
        if (e && typeof e.priceId === "string") { n += 1; }
      });
      return n;
    } catch (err) { return 0; }
  }
  function majCompteurPanier() {
    /* Résolution depuis le DOM seulement : lors d'une ré-exécution
       du script (garde d'idempotence), cette fonction est appelée
       avant l'assignation des variables du module — un accès à
       `boutonsCommandes.panier` lèverait alors une TypeError. */
    var bouton = document.querySelector('#bh-barre [data-commande="panier"]');
    var pastille = pastillePanier || document.querySelector("#bh-barre .bh-panier-nombre");
    if (!bouton || !pastille) { return; }
    var n = lireNombrePanier();
    if (n > 0) {
      pastille.textContent = String(n);
      pastille.hidden = false;
      bouton.setAttribute("aria-label", "Panier : " + n + (n > 1 ? " articles" : " article"));
    } else {
      pastille.textContent = "";
      pastille.hidden = true;
      bouton.setAttribute("aria-label", "Panier : voir votre panier");
    }
  }

  /* ---------- Panneaux ---------- */
  function fermerPanneau() {
    if (panneauOuvert === null) { return; }
    panneau.setAttribute("hidden", "");
    zonePanneau.innerHTML = "";
    if (boutonsCommandes[panneauOuvert]) {
      boutonsCommandes[panneauOuvert].setAttribute("aria-expanded", "false");
    }
    panneauOuvert = null;
    mesurerReserve();
  }
  function basculerPanneau(nom, bouton) {
    if (panneauOuvert === nom) { fermerPanneau(); return; }
    fermerPanneau();
    panneauOuvert = nom;
    if (bouton) { bouton.setAttribute("aria-expanded", "true"); }
    panneau.removeAttribute("hidden");
    construirePanneau(nom);
    mesurerReserve();
  }
  function construirePanneau(nom) {
    zonePanneau.innerHTML = "";
    if (nom === "recherche") { construireRecherche(); }
    else if (nom === "lanterne") { construireLanterne(); }
    else if (nom === "confort") { construireConfort(); }
    else if (nom === "plus") { construirePlus(); }
    else if (nom === "gepeto") { construireGepeto(); }
    var fermer = el("button", { "class": "bh-fermer-panneau", "type": "button" }, "Fermer le panneau");
    on(fermer, "click", fermerPanneau);
    zonePanneau.appendChild(fermer);
  }

  function construireRecherche() {
    zonePanneau.appendChild(el("h2", null, "Loupe — rechercher sur le site"));
    var champ = el("input", { type: "search", placeholder: "Jeux, outils, livres…", "aria-label": "Rechercher sur le site" });
    zonePanneau.appendChild(champ);
    var liste = el("ul", { "class": "bh-liste" });
    zonePanneau.appendChild(liste);
    function afficher(filtre) {
      liste.innerHTML = "";
      var f = (filtre || "").toLowerCase();
      var trouves = ENTREES_RECHERCHE.filter(function (e) {
        return !f || e.titre.toLowerCase().indexOf(f) !== -1 || e.desc.toLowerCase().indexOf(f) !== -1;
      });
      if (trouves.length === 0) {
        liste.appendChild(el("li", null, "Rien trouvé dans ce pilote."));
      }
      trouves.forEach(function (e) {
        var li = el("li");
        var b = el("button", { type: "button" }, e.titre + " — " + e.desc);
        on(b, "click", function () { choisirSection(e.titre); });
        li.appendChild(b);
        liste.appendChild(li);
      });
    }
    on(champ, "input", function () { afficher(champ.value); });
    afficher("");
    zonePanneau.appendChild(el("p", { "class": "bh-note" },
      "Pilote : la recherche porte sur les 5 sections. L'index réel de la barre v3 compte 110 entrées — il sera branché à l'intégration, pas inventé ici."));
  }

  function construireLanterne() {
    zonePanneau.appendChild(el("h2", null, "Lanterne — mode lecture confortable"));
    zonePanneau.appendChild(el("p", null,
      "La lanterne atténue ce qui entoure le texte et éclaire la zone de lecture. Elle ne bloque jamais un bouton."));
    var rang = el("div", { "class": "bh-rang" });
    var btn = el("button", { type: "button", "aria-pressed": "false" }, "Allumer la lanterne");
    on(btn, "click", function () {
      var allumee = document.documentElement.classList.toggle("bh-lanterne-on");
      btn.setAttribute("aria-pressed", allumee ? "true" : "false");
      btn.textContent = allumee ? "Éteindre la lanterne" : "Allumer la lanterne";
    });
    rang.appendChild(btn);
    zonePanneau.appendChild(rang);
    zonePanneau.appendChild(el("p", { "class": "bh-note" },
      "Fermeture en un clic : le bouton « Fermer le panneau » ci-dessous, ou la touche Échap."));
  }

  function construireConfort() {
    zonePanneau.appendChild(el("h2", null, "Confort — affichage et lisibilité"));
    var tailles = [["A", "1"], ["A+", "2"], ["A++", "3"]];
    var rangTaille = el("div", { "class": "bh-rang" });
    tailles.forEach(function (t) {
      var b = el("button", { type: "button", "aria-pressed": t[1] === "1" ? "true" : "false" }, "Taille " + t[0]);
      on(b, "click", function () {
        document.documentElement.setAttribute("data-bh-taille", t[1]);
        Array.prototype.forEach.call(rangTaille.children, function (c) { c.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        try { localStorage.setItem("barre-haut-confort-v1", JSON.stringify({ taille: t[1] })); } catch (e) {}
      });
      rangTaille.appendChild(b);
    });
    zonePanneau.appendChild(rangTaille);
    var rang = el("div", { "class": "bh-rang" });
    var sombre = el("button", { type: "button", "aria-pressed": "false" }, "Fond sombre");
    on(sombre, "click", function () {
      var actif = document.documentElement.classList.toggle("bh-sombre");
      sombre.setAttribute("aria-pressed", actif ? "true" : "false");
    });
    rang.appendChild(sombre);
    var contraste = el("button", { type: "button", "aria-pressed": "false" }, "Contraste renforcé");
    on(contraste, "click", function () {
      var actif = document.documentElement.classList.toggle("bh-contraste");
      contraste.setAttribute("aria-pressed", actif ? "true" : "false");
    });
    rang.appendChild(contraste);
    var anims = el("button", { type: "button", "aria-pressed": "false" }, "Réduire les animations");
    on(anims, "click", function () {
      var actif = document.documentElement.classList.toggle("bh-anim-reduites");
      anims.setAttribute("aria-pressed", actif ? "true" : "false");
    });
    rang.appendChild(anims);
    zonePanneau.appendChild(rang);
    var reset = el("button", { "class": "bh-fermer-panneau", "type": "button" }, "Réinitialiser les réglages");
    on(reset, "click", function () {
      document.documentElement.removeAttribute("data-bh-taille");
      document.documentElement.classList.remove("bh-sombre", "bh-contraste", "bh-anim-reduites");
      try { localStorage.removeItem("barre-haut-confort-v1"); } catch (e) {}
      construirePanneau("confort");
    });
    zonePanneau.appendChild(reset);
    zonePanneau.appendChild(el("p", { "class": "bh-note" },
      "Les réglages sont conservés pendant la navigation (clé barre-haut-confort-v1). Ils ne modifient jamais définitivement la présentation du site."));
  }

  function construirePlus() {
    zonePanneau.appendChild(el("h2", null, "Plus — fonctions secondaires"));
    var liste = el("ul", { "class": "bh-liste" });
    function item(label, fn, maquette) {
      var li = el("li");
      var b = el("button", { type: "button" }, label);
      if (maquette) {
        var tag = el("span", { "class": "bh-maquette" }, "pilote — non branché");
        b.appendChild(tag);
        b.disabled = true;
        b.setAttribute("aria-disabled", "true");
      } else if (fn) {
        on(b, "click", fn);
      }
      li.appendChild(b);
      liste.appendChild(li);
    }
    /* Q-DB-1 = A (12 nov. 2026) : vrais liens vers les pages du site.
       Chaque route est vérifiée dans src/routes/. Un vrai lien <a>
       navigue comme les liens du site (pas de rechargement forcé). */
    function lien(label, href) {
      var li = el("li");
      li.appendChild(el("a", { href: href }, label));
      liste.appendChild(li);
    }
    item("Copier le lien de la page", function () {
      var lien = window.location.href;
      function ok() { dire("Lien copié."); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(lien).then(ok, function () { dire("Copie impossible sur cet appareil — lien : " + lien); });
      } else { dire("Copie impossible sur cet appareil — lien : " + lien); }
    });
    item("Revenir en haut de page", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    item("Imprimer la page", function () { window.print(); });
    if (navigator.share) {
      item("Partager la page", function () {
        navigator.share({ title: document.title, url: window.location.href }).catch(function () {});
      });
    } else {
      item("Partager la page", null, true);
    }
    item("Ajouter aux favoris", null, true);
    item("Télécharger (aucun fichier sur cette page)", null, true);
    item("Signaler un problème", null, true);
    lien("Consulter l'aide", "/faq");
    lien("Contacter HP", "/contact");
    lien("Balado", "/balado");
    lien("À toi l'histoire", "/univers");
    lien("Ateliers", "/ateliers");
    lien("Prix", "/prix");
    lien("Jeux à votre image", "/jeux-a-votre-image");
    lien("À propos", "/a-propos");
    lien("En cuisine", "/en-cuisine");
    item("Réseaux sociaux", null, true);
    zonePanneau.appendChild(liste);
    zonePanneau.appendChild(el("p", { "class": "bh-note" },
      "Règle du cahier : une fonction non disponible est désactivée, jamais présentée comme fonctionnelle. Les fonctions marquées « pilote » seront branchées à l'intégration, une par une."));
    var remettre = el("button", { "class": "bh-fermer-panneau", "type": "button" }, "Remettre la barre en haut");
    on(remettre, "click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); fermerPanneau(); });
    zonePanneau.appendChild(remettre);
  }

  function construireGepeto() {
    zonePanneau.appendChild(el("h2", null, "Sir H. Gepeto — le gérant du site"));
    var bulle = el("div", { "class": "bh-bulle" });
    bulle.appendChild(el("p", null, BULLE_ACCUEIL));
    zonePanneau.appendChild(bulle);
    zonePanneau.appendChild(el("p", null, "Questions rapides :"));
    var rang = el("div", { "class": "bh-rang" });
    RAPIDES.forEach(function (q) {
      var b = el("button", { type: "button" }, q);
      on(b, "click", function () {
        document.dispatchEvent(new CustomEvent("hp:gepeto-question", { detail: { question: q } }));
        bulle.querySelector("p").textContent =
          "« " + q + " » — en production, Sir H. Gepeto répond ici avec les vraies informations du site. Le pilote montre l'interface, elle n'invente pas de réponse.";
      });
      rang.appendChild(b);
    });
    zonePanneau.appendChild(rang);
    zonePanneau.appendChild(el("p", null, "Scènes :"));
    var scenes = el("div", { "class": "bh-rang" });
    SCENES.forEach(function (s) {
      var b = el("button", { type: "button" }, s.label);
      on(b, "click", function () {
        document.dispatchEvent(new CustomEvent("hp:gepeto-scene", { detail: { scene: s.cle } }));
        bulle.querySelector("p").textContent =
          "Scène « " + s.label + " » — en production, le moteur Gepeto joue la scène ici. Le pilote montre le bouton, il ne joue pas la scène.";
      });
      scenes.appendChild(b);
    });
    zonePanneau.appendChild(scenes);
    zonePanneau.appendChild(el("p", { "class": "bh-note" },
      "Sir H. Gepeto ne dit jamais d'erreur : s'il ne sait pas, il renvoie honnêtement vers la direction humaine. Le moteur ne charge qu'au tap sur « Gepeto »."));
  }

  /* ---------- Lecture vocale (voix du navigateur, rien de payant) ---------- */
  function basculerLecture() {
    if (!("speechSynthesis" in window)) {
      dire("Votre appareil n'a pas de voix de lecture intégrée — je ne peux pas vous lire ça.");
      return;
    }
    if (lectureEnCours) { arreterLecture(); return; }
    var texte = textePage();
    if (!texte) { dire("Il n'y a rien à lire sur cette page."); return; }
    var voix = window.speechSynthesis.getVoices().filter(function (v) {
      return (v.lang || "").toLowerCase().indexOf("fr") === 0;
    });
    if (voix.length === 0) {
      dire("Votre appareil n'a pas de voix française — je ne peux pas vous lire ça.");
      return;
    }
    var parole = new SpeechSynthesisUtterance(texte);
    parole.lang = "fr-FR";
    parole.voice = voix[0];
    parole.onend = function () { lectureEnCours = false; majBoutonLire(); };
    parole.onerror = function () { lectureEnCours = false; majBoutonLire(); };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(parole);
    lectureEnCours = true;
    majBoutonLire();
    document.dispatchEvent(new CustomEvent("hp:lecture-etat", { detail: { etat: "lecture" } }));
  }
  function arreterLecture() {
    if ("speechSynthesis" in window) { window.speechSynthesis.cancel(); }
    lectureEnCours = false;
    majBoutonLire();
    document.dispatchEvent(new CustomEvent("hp:lecture-etat", { detail: { etat: "arretee" } }));
  }
  function majBoutonLire() {
    if (!btnLire) { return; }
    btnLire.setAttribute("aria-pressed", lectureEnCours ? "true" : "false");
    btnLire.querySelector("span").textContent = lectureEnCours ? "Arrêter" : "Lire";
  }
  function textePage() {
    var principal = document.querySelector("main") || document.body;
    var texte = (principal.innerText || principal.textContent || "").replace(/\s+/g, " ").trim();
    return texte.slice(0, 2000);
  }
  function dire(message) {
    if (panneauOuvert !== "gepeto") { basculerPanneau("gepeto", boutonsCommandes.gepeto); }
    var bulle = $(".bh-bulle p", zonePanneau);
    if (bulle) { bulle.textContent = message; return; }
    zonePanneau.appendChild(el("p", { "class": "bh-note", role: "status" }, message));
  }

  /* ---------- Sections : Jeux, Outils, Livres ---------- */
  function choisirSection(nom) {
    var cle = (nom || "").toLowerCase();
    ["jeux", "outils", "livres"].forEach(function (s) {
      if (boutonsSections[s]) {
        if (s === cle) { boutonsSections[s].setAttribute("aria-current", "page"); }
        else { boutonsSections[s].removeAttribute("aria-current"); }
      }
    });
    /* Pilote : les sections mènent aux vraies pages du site
       (voir ROUTES_SECTIONS plus haut). */
    if (document.body && document.body.setAttribute) {
      document.body.setAttribute("data-bh-section", cle);
    }
    if (ROUTES_SECTIONS[cle]) {
      window.location.href = ROUTES_SECTIONS[cle];
    }
    fermerPanneau();
  }

  /* ---------- Réduire / rappeler (un seul verbe : « Réduire ») ---------- */
  function reduireBarre() {
    fermerPanneau();
    arreterLecture();
    barre.classList.add("bh-reduite");
    mesurerReserve();
  }
  function rappelerBarre() {
    barre.classList.remove("bh-reduite");
    mesurerReserve();
  }

  /* ---------- Construction ---------- */
  function boutonCommande(nom, label, icone, fn, ariaLabel) {
    var b = el("button", {
      "class": "bh-cmd", type: "button",
      "aria-label": ariaLabel || label,
      "data-commande": nom
    });
    if (icone === "face") {
      var img = el("img", { "class": "bh-mini-face", src: cheminFace, alt: "", "width": "48", "height": "48" });
      img.setAttribute("aria-hidden", "true");
      b.appendChild(img);
    } else {
      b.innerHTML = ICONES[icone] || "";
    }
    b.appendChild(el("span", null, label));
    on(b, "click", fn);
    boutonsCommandes[nom] = b;
    return b;
  }

  function construire() {
    barre = el("div", {
      id: "bh-barre", "class": "bh-barre", role: "region",
      "aria-label": "Barre HP, à portée de main"
    });
    if (optPage === "accueil") { barre.classList.add("bh-page-accueil"); }
    if (optDefilement) { barre.classList.add("bh-defilement"); }

    var contenu = el("div", { "class": "bh-contenu" });

    /* En-tête : face 48 px (sauf accueil) + titre + Réduire. */
    var tete = el("div", { "class": "bh-tete" });
    var face = el("img", {
      "class": "bh-face", src: cheminFace,
      alt: "Sir H. Gepeto, le gérant du site",
      "width": "48", "height": "48", "fetchpriority": "high"
    });
    tete.appendChild(face);
    var titre = el("p", { "class": "bh-titre", html: "<strong>HP</strong> À portée de main" });
    tete.appendChild(titre);
    var btnReduire = el("button", {
      "class": "bh-reduire", type: "button",
      "aria-label": "Réduire la barre"
    }, "Réduire");
    on(btnReduire, "click", reduireBarre);
    tete.appendChild(btnReduire);
    contenu.appendChild(tete);

    /* Sections : Jeux, Outils, Livres — en un tap. */
    var sections = el("nav", { "class": "bh-sections", "aria-label": "Sections du site" });
    ["Jeux", "Outils", "Livres"].forEach(function (nom) {
      var b = el("button", { "class": "bh-section", type: "button" }, nom);
      on(b, "click", function () { choisirSection(nom); });
      boutonsSections[nom.toLowerCase()] = b;
      sections.appendChild(b);
    });
    contenu.appendChild(sections);

    /* Les 10 commandes Compagnon. */
    var rangee = el("nav", { "class": "bh-commandes", "aria-label": "Commandes de la barre" });
    rangee.appendChild(boutonCommande("accueil", "Accueil", "accueil", function () {
      window.location.href = "https://www.hp-outils.com/";
    }, "Accueil : retourner à la page d'accueil"));
    rangee.appendChild(boutonCommande("retour", "Retour", "retour", function () { window.history.back(); },
      "Retour : revenir à la page précédente"));
    rangee.appendChild(boutonCommande("suivant", "Suivant", "suivant", function () { window.history.forward(); },
      "Suivant : reprendre la navigation suivante"));
    rangee.appendChild(boutonCommande("recherche", "Loupe", "loupe", function (e) {
      basculerPanneau("recherche", boutonsCommandes.recherche);
    }, "Loupe : rechercher sur le site"));
    btnLire = boutonCommande("lire", "Lire", "lire", basculerLecture, "Lire : lecture vocale de la page");
    btnLire.setAttribute("aria-pressed", "false");
    rangee.appendChild(btnLire);
    rangee.appendChild(boutonCommande("lanterne", "Lanterne", "lanterne", function () {
      basculerPanneau("lanterne", boutonsCommandes.lanterne);
    }, "Lanterne : mode lecture confortable"));
    rangee.appendChild(boutonCommande("question", "Question", "question", function () {
      basculerPanneau("gepeto", boutonsCommandes.gepeto);
      document.dispatchEvent(new CustomEvent("hp:gepeto-question", { detail: { question: "" } }));
    }, "Question : poser une question sur la page"));
    var btnGepeto = boutonCommande("gepeto", "Gepeto", "face", function () {
      document.dispatchEvent(new CustomEvent("hp:gepeto-ouvrir", {}));
      /* P4-B : le Pont ne monte le moteur qu'une fois par page
         (HgptoPont `monte` : le 2e tap ne redispatch pas
         `hp:gepeto-pret`) ; si le moteur est déjà prêt, on dévoile
         l'hôte tout de suite, sans attendre un signal qui ne
         reviendra pas. */
      if (moteurPret) { devoilerGepeto(); }
      basculerPanneau("gepeto", boutonsCommandes.gepeto);
    }, "Gepeto : ouvrir Sir H. Gepeto");
    rangee.appendChild(btnGepeto);
    rangee.appendChild(boutonCommande("confort", "Confort", "confort", function () {
      basculerPanneau("confort", boutonsCommandes.confort);
    }, "Confort : réglages d'affichage"));
    rangee.appendChild(boutonCommande("plus", "Plus", "plus", function () {
      basculerPanneau("plus", boutonsCommandes.plus);
    }, "Plus : fonctions secondaires"));
    /* Lot boutons panier : 11e commande, toujours visible et cliquable,
       vide ou non. La pastille porte le nombre ; cachée quand vide. */
    var btnPanier = boutonCommande("panier", "Panier", "panier", function () {
      window.location.href = "/panier";
    }, "Panier : voir votre panier");
    pastillePanier = el("span", { "class": "bh-panier-nombre", "aria-hidden": "true" });
    pastillePanier.hidden = true;
    btnPanier.appendChild(pastillePanier);
    rangee.appendChild(btnPanier);
    contenu.appendChild(rangee);

    barre.appendChild(contenu);

    /* Panneau : une section du conteneur, jamais un recouvrement. */
    panneau = el("div", { "class": "bh-panneau", role: "dialog", "aria-label": "Panneau de la barre", hidden: "" });
    zonePanneau = el("div", { "class": "bh-panneau-contenu" });
    panneau.appendChild(zonePanneau);
    barre.appendChild(panneau);

    /* P1-3 : hôte du moteur Sir H. Gepeto, même id et même classe que
       dans la v3 (le Pont et le bundle autonome le cherchent par cet
       id). Stable : hors de zonePanneau, vidée à chaque ouverture.
       Section cachée au départ, comme dans la v3 ; P4-B décide
       quand elle devient visible. */
    var sectionGepeto = el("div", { "class": "bh-gepeto", hidden: "" });
    var hoteGepeto = el("div", { "id": "compagnon-gepeto-hote", "class": "compagnon-gepeto-hote" });
    sectionGepeto.appendChild(hoteGepeto);
    barre.appendChild(sectionGepeto);

    /* P4-B (lot correctif panneau Gepeto, 12 nov. 2026) : l'hôte
       ci-dessus ne devient visible que quand le moteur signale
       `hp:gepeto-pret` (fin de `initHgpto`, hgpto-engine.ts).
       Avant ce lot, rien ne retirait jamais `hidden` : le moteur
       tournait invisible. UN SEUL site retire `hidden` sur
       `sectionGepeto` : `devoilerGepeto()` ci-dessous.
       Modèle repris de la v3 (compagnon.js) : `pret` dévoile,
       `ferme` remasque l'hôte et ferme le panneau pilote,
       `réduire` remasque l'hôte et réduit la barre comme son
       bouton « Réduire ». Écarts au modèle, documentés :
       (1) la v3 ne fait que fermer sur `réduire` ; ici on appelle
       aussi `reduireBarre()`, parce que la barre réduite ne cache
       que `.bh-contenu` (CSS L66) et pas `.bh-gepeto` — sans le
       remasquage, le moteur resterait visible au-dessus de la
       barre réduite ;
       (2) la v3 pose un drapeau de fermeture de session
       (`gepetoFermeSession`) et redispatch `hp:gepeto-rouvrir`
       au tap suivant ; ici le tap redispatch toujours
       `hp:gepeto-ouvrir` et le Pont ne monte qu'une fois, donc
       aucun drapeau n'est nécessaire.
       Aucun événement nouveau dispatché côté barre. */
    var moteurPret = false;
    function devoilerGepeto() {
      moteurPret = true;
      sectionGepeto.removeAttribute("hidden");
    }
    function masquerGepeto() {
      sectionGepeto.setAttribute("hidden", "");
    }
    document.addEventListener("hp:gepeto-pret", devoilerGepeto);
    document.addEventListener("hp:gepeto-ferme", function () {
      masquerGepeto();
      if (panneauOuvert === "gepeto") { fermerPanneau(); }
    });
    document.addEventListener("hp:gepeto-reduire", function () {
      masquerGepeto();
      reduireBarre();
    });
    /* Moteur déjà monté par une autre voie avant la barre (ex.
       bundle autonome chargé au chargement de la page) : le
       signal `hp:gepeto-pret` est déjà passé, on dévoile tout de
       suite — même garde que `assurerMoteur` dans la v3. */
    if (document.querySelector(".hgpto-host")) { devoilerGepeto(); }

    /* Liseré 22 px + rappel, quand la barre est réduite. */
    var lisere = el("div", { "class": "bh-lisere" });
    var rappel = el("button", { type: "button", "aria-label": "Afficher la barre HP" }, "▲ Barre");
    on(rappel, "click", rappelerBarre);
    lisere.appendChild(rappel);
    barre.appendChild(lisere);

    var racine = $("#bh-racine") || document.body;
    racine.insertBefore(barre, racine.firstChild);

    document.documentElement.classList.add("bh-actif");
    /* Correctif CLS mobile 13 nov. 2026 : la réserve CSS
       (html.bh-reserve, posée par le script synchrone en tête)
       n'a plus lieu d'être — la règle html.bh-actif reprend la
       main avec la hauteur mesurée, dans la même tâche : aucun
       mouvement, la réserve valait exactement la hauteur mesurée. */
    document.documentElement.classList.remove("bh-reserve");
    document.documentElement.setAttribute("data-bh-page", optPage);

    /* Arrivée réduite (A2) : option non imposée — défaut dépliée,
       décidé par HP le 7 nov. 2026. La barre arrive réduite
       seulement quand data-arrivee="reduite". */
    if (optArriveeReduite) { barre.classList.add("bh-reduite"); }

    /* Échap ferme les panneaux ouverts, jamais la barre. */
    on(document, "keydown", function (e) {
      if (e.key === "Escape" && panneauOuvert !== null) { fermerPanneau(); }
    });
    on(window, "resize", mesurerReserve);

    mesurerReserve();
    /* La mesure change quand la police ou la mise en page se stabilise. */
    setTimeout(mesurerReserve, 300);
    setTimeout(mesurerReserve, 1200);

    /* Compteur du panier (lot boutons panier) : lecture initiale, puis
       réabonnement. Les écouteurs vivent sur document/window : ils
       survivent aux navigations internes, la garde d'idempotence ne
       reconstruisant pas la barre — pas de doublon, construire() ne
       tourne qu'une fois par chargement de page. */
    majCompteurPanier();
    on(document, "hp:panier-change", majCompteurPanier);
    on(window, "storage", majCompteurPanier);
    on(document, "visibilitychange", function () { if (!document.hidden) { majCompteurPanier(); } });
    on(window, "pageshow", majCompteurPanier);
    on(window, "focus", majCompteurPanier);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", construire);
  } else {
    construire();
  }
})();
