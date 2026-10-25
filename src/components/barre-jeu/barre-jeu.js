/* ============================================================
   BARRE DE JEU HP — module autonome pour les pages de jeux
   statiques de public/apps/ (hors shell React, comme HGPTO).

   Ordre d'HP (22 oct. 2026) : « Pour tous les jeux : une
   option retour au site, pause, et partager ton score —
   t'es pas game ! Ça doit être partout. »

   Sur chaque page de jeu, la barre offre :
     ← Retour           (page arrière réelle : history.back() si la
                         visite vient du site, repli /jeux sinon —
                         partout, toujours)
     ⏸ Pause            (SEULEMENT si une pause réelle existe :
                         bouton/fonction de pause du jeu lui-même,
                         ou gel vérifié de sa boucle — jamais un
                         bouton qui ment ; voir CONFIGS plus bas)
     🏆 Partager mon score (navigator.share, repli copie du lien ;
                         score lu dans le DOM du jeu quand il est
                         lisible, sinon texte de défi sans chiffre —
                         banque de défis HP : on défie sur le jeu,
                         jamais sur l'achat). Le lien partagé est
                         l'ADRESSE STABLE /apps/<slug> (vague 0,
                         item nº 4) : il survit aux changements de
                         version du fichier.
     ♥ Cœur              (vague 1, item nº 3 — 23 oct. 2026 :
                         favori personnel en localStorage, MÊMES clés
                         que la page /jeux — « hp-jeux-favoris » et
                         garde-fou « hp-jeux-coeurs » — plus compteur
                         public anonyme « cœurs reçus » via
                         /api/public/game-hearts quand il est actif ;
                         aucun nombre affiché sinon)
     Après ta partie     (vague 1, item nº 5 — seulement les jeux
                         dont la config a un « lien » : UN lien doux,
                         gratuit d'abord, en lien avec le sujet du
                         jeu ; rien à acheter pour continuer à jouer)
     ✓ Tampons           (décision d'HP, 23 oct. 2026, 08 h 18 —
                         seulement les jeux approuvés par les testeurs :
                         le tampon du testeur, à sa couleur, tel que
                         posé sur /jeux ; source : le registre des
                         approbations du 22 oct. 2026, 21 h 31. La
                         couleur de Lo n'y est pas précisée : tampon
                         neutre, rien d'inventé)

   Source unique : src/components/barre-jeu/barre-jeu.js
   Généré vers public/barre/barre-jeu.js par :
       bun run build:barre
   (scripts/build-barre-jeu.mjs — copie avec bandeau « généré »).
   RÉGÉNÉRER après toute modification de la source, puis
   déposer la sortie avec le reste du lot.

   Chaque page de jeu charge, avant </body> (bloc délimité par
   les commentaires « Barre de jeu HP », à ne pas éditer à la
   main) :
       <script src="/barre/barre-jeu.js" defer></script>
   ============================================================ */
(function () {
  "use strict";
  if (window.__barreJeuHP) return;
  window.__barreJeuHP = true;

  /* ---------------- Configuration par jeu ----------------
     pause :
       { type:'gate' }       — boucle requestAnimationFrame : gelée par
                               décalage d'horloge (rAF + performance.now),
                               voile « En pause », entrées bloquées.
       { type:'gateTimeout'} — chaîne setTimeout (serpent) : les appels
                               sont mis en file pendant la pause.
       { type:'btnToggle', sel, textSel?, pausedText }
                             — le jeu a SON bouton pause (bascule) ;
                               la barre clique le sien, sonde son état.
       { type:'btnPair', pauseSel, resumeSel, pauseFn?,
         probeSel, probeText? | probeClass? | probeVisible? }
                             — le jeu a sa propre pause (boutons/fonction
                               distincts pour mettre en pause/reprendre).
       { type:'fnPair', pauseFn, resumeSel, probeSel, probeClass }
                             — fonction de pause du jeu + reprise par
                               clic sur son voile.
       null                  — aucune pause réelle (jeu au tour par tour,
                               rien n'avance tout seul) : PAS de bouton.
     score : liste de sélecteurs DOM essayés dans l'ordre (premier
             visible avec un nombre gagne) ; null = texte sans chiffre.
     pos : 'bottom' (défaut) ou 'top' si le bas de l'écran est le jeu. */
  var CONFIGS = {
    "/apps/releve/releve-chapitre-1-v1.0.html": {
      nom: "RELÈVE — Chapitre 1", score: null, pos: "top",
      pause: { type: "btnPair", pauseFn: "pauseGame", pauseSel: "#btn-pause",
               resumeSel: "#btn-resume", probeSel: "#screen-pause", probeVisible: true }
    },
    "/apps/la-banque/la-banque-v1.1.html": {
      nom: "LA BANQUE", score: null, pause: null,
      lien: { href: "/pdf/sans-honte-entraide", texte: "Le kit Sans Honte — Entraide : s'entraider sans se brûler (5 $)" },
      tampons: ["oz"]
    },
    "/apps/bons-reflexes/index.html": {
      nom: "Les bons réflexes d'HP", score: ["#scorePercent"], pause: null,
      lien: { href: "/pdf/sans-honte-fraude", texte: "Le kit Sans Honte — Fraude : garder ses réflexes aiguisés face aux pièges (5 $)" }
    },
    "/apps/mysteres-du-nord/myst-res-du-nord-v1.2.html": {
      nom: "Mystères du Nord", score: ["#scorePot"], pause: null,
      tampons: ["lo"]
    },
    "/apps/100-en-30-jours/100-en-30-jours-v1.1.html": {
      nom: "100 $ en 30 jours", score: ["#d-net", "#p-net", "#lg-net"], pause: null,
      lien: { href: "/pdf/sans-honte-frigo", texte: "Le kit Sans Honte — Frigo : étirer chaque dollar sans gaspiller (5 $)" }
    },
    "/apps/100-en-30-jours/100-en-30-jours-v1.2.html": {
      /* Liée depuis /jeux depuis le 22 oct. (dépôt 6d0a05f) — mêmes
         ancres de score que v1.1, vérifiées dans le fichier v1.2. */
      nom: "100 $ en 30 jours", score: ["#d-net", "#p-net", "#lg-net"], pause: null,
      lien: { href: "/pdf/sans-honte-frigo", texte: "Le kit Sans Honte — Frigo : étirer chaque dollar sans gaspiller (5 $)" }
    },
    "/apps/caribou-run/caribou-run-v1.1.html": {
      nom: "Caribou Run", score: ["#points", "#overScore"],
      pause: { type: "gate" },
      tampons: ["maeva"]
    },
    "/apps/cherche-trouve-la-vraie-vie/cherche-trouve-la-vraie-vie-v1.1.html": {
      nom: "Cherche & Trouve — La vraie vie", score: null, tampons: ["tous"],
      pause: { type: "fnPair", pauseFn: "mettreEnPause", resumeSel: "#overlay",
               probeSel: "#overlay", probeClass: "show" },
      lien: { href: "/passeur-de-savoir", texte: "Le Passeur de savoir : l'application gratuite des savoirs d'ici" }
    },
    "/apps/devine-l-humeur/devine-l-humeur-v1.1.html": {
      nom: "Devine l'humeur", score: ["#hudScore", "#finalScore"], pause: null,
      tampons: ["lo"]
    },
    "/apps/la-spirale-asmr/la-spirale-asmr-v1.1.html": {
      nom: "La Spirale ASMR", score: null, tampons: ["louka"],
      pause: { type: "btnToggle", sel: "#btnPause", textSel: "#lblPause", pausedText: "Reprendre" }
    },
    "/apps/poutine-panic/poutine-panic-v1.1.html": {
      nom: "Poutine Panic", score: ["#money"],
      pause: { type: "btnPair", pauseSel: "#restartBtn", resumeSel: "#startBtn",
               probeSel: "#startBtn", probeText: "Reprendre", probeVisibleSel: "#tutorial" },
      lien: { href: "/pdf/enfants-cuisinent", texte: "Le livre « Les enfants cuisinent pour faire plaisir » (10 $)" }
    },
    "/apps/retromania/retromania-v1.1.html": {
      nom: "Retromania", score: ["#soloScoreChip", "#finalScore"],
      /* Réexamen barre v2 : le mode Solo est sans chrono (le jeu le
         dit lui-même) ; le mode Encans a un chrono de 20 s calculé
         depuis performance.now (encT0/encPaused) — le gel d'horloge
         du « gate » le fige donc pour vrai. */
      pause: { type: "gate" }
    },
    "/apps/sirop-clicker/sirop-clicker-v1.1.html": {
      nom: "Sirop Clicker", score: null, pause: null
    },
    "/apps/mots-de-chez-nous/mots-de-chez-nous-v1.0.html": {
      nom: "Mots de Chez Nous", score: ["#jeu-trouves"], pause: null, tampons: ["hp"],
      lien: { href: "/passeur-de-savoir", texte: "Le Passeur de savoir : l'application gratuite des savoirs d'ici" }
    },
    "/apps/memoire-des-cantons/memoire-des-cantons-v1.0.html": {
      nom: "Mémoire des Cantons", score: null, pause: null,
      lien: { href: "/passeur-de-savoir", texte: "Le Passeur de savoir : l'application gratuite des savoirs d'ici" }
    },
    "/apps/tir-de-boules-de-neige/tir-de-boules-de-neige-v2.0.html": {
      nom: "Tir de Boules de Neige", score: ["#hudScore"],
      pause: { type: "gate" },
      tampons: ["maeva", "lo"]
    },
    "/apps/ado-odieux-adieu/ado-odieux-adieu-v1.0.html": {
      nom: "Ado odieux, adieu", score: ["#hud-points"],
      /* Réexamen barre v2 : le jeu a SA pause complète (bouton
         #btn-pause -> stopLoop() + écran #screen-pause, reprise par
         #btn-resume) — manquée au premier passage, branchée ici. */
      pause: { type: "btnPair", pauseSel: "#btn-pause",
               resumeSel: "#btn-resume", probeSel: "#screen-pause", probeVisible: true }
    },
    "/apps/couleuvre-du-quebec/couleuvre-du-quebec-v1.0.html": {
      nom: "Couleuvre du Québec", score: ["#score"],
      pause: { type: "gateTimeout" }
    },
    "/apps/fusion-sirop/fusion-sirop-v1.0.html": {
      nom: "Fusion Sirop", score: ["#score"], pause: null, tampons: ["hp"]
    },
    "/apps/trio-des-elements/trio-des-elements-v1.0.html": {
      nom: "Trio des Éléments", score: ["#score"], pause: null, tampons: ["hp"]
    },
    "/apps/bernache-express/bernache-express-v1.0.html": {
      nom: "Bernache Express", score: null, /* distance en mètres, pas un score */
      pause: { type: "gate" },
      tampons: ["maeva"]
    },
    "/apps/le-bonhomme-pendu/le-bonhomme-pendu-v1.0.html": {
      nom: "Le Bonhomme Pendu", score: ["#nb-gagnees"], pause: null
    },
    "/apps/montgolfiere/montgolfiere-v1.0.html": {
      nom: "Montgolfière", score: null, /* altitude en mètres, pas un score */
      pause: { type: "gate" },
      tampons: ["louka", "maeva"]
    },
    "/apps/pop-ballons/pop-ballons-v1.0.html": {
      nom: "Pop Ballons", score: ["#hudScore", "#finalScore"],
      pause: { type: "gate" },
      tampons: ["mel"]
    },
    "/apps/2-verites-1-mensonge/2-verites-1-mensonge-v2.0.html": {
      nom: "2 vérités, 1 mensonge", score: ["#hudScore", "#endScore"], pause: null,
      tampons: ["mel", "oz"]
    },
    "/apps/chat-attaque/chat-attaque-v1.2.html": {
      nom: "Chat'attaque", score: null,
      pause: { type: "btnToggle", sel: "#pauseBtn", pausedText: "▶" },
      tampons: ["louka"]
    },
    "/apps/nord-2087/nord-2087-v1.1.html": {
      nom: "NORD 2087", score: ["#statScore", "#sScore"],
      pause: { type: "btnToggle", sel: "#btnPause", pausedText: "▶" },
      tampons: ["maeva"]
    },
    /* Ajouts du 22 oct. au soir (ordre d'HP : envoyer les jeux
       absents) — les 6 du « paquet 6 jeux » préparé pour le site +
       IGLOO, retrouvés dans l'atelier. Pauses : null partout sauf
       IGLOO — jeux au clic / tour par tour, rien n'avance tout seul.
       IGLOO est une arène en temps réel : le gel « gate » a été
       PROUVÉ sur son compte à rebours de bataille (3:00 figé pendant
       la pause, reprise nette) avant de brancher le bouton. */
    "/apps/igloo/igloo-v1.0.html": {
      nom: "IGLOO — La guerre des igloos", score: null,
      pause: { type: "gate" },
      lien: { href: "/pdf/sans-honte-72-heures", texte: "Le kit Sans Honte — 72 Heures : être prêt quand ça coupe (5 $)" }
    },
    "/apps/que-vois-tu/que-vois-tu-v2.0.html": {
      nom: "Que vois-tu ?", score: null, pause: null
    },
    "/apps/tapinoue/tapinoue-v2.0.html": {
      nom: "Tapinoue", score: null, pause: null
    },
    "/apps/ton-chum-frotte-son-char/ton-chum-frotte-son-char-v2.0.html": {
      nom: "Ton chum frotte son char plus que toi !", score: null, pause: null
    },
    "/apps/conception-de-molecules-3d/conception-de-molecules-3d-v2.0.html": {
      nom: "Conception de molécules 3D", score: null, pause: null
    },
    "/apps/hydro-electricite/hydro-electricite-v1.1.html": {
      nom: "L'hydroélectricité, comment ça marche", score: null, pause: null,
      lien: { href: "/pdf/sans-honte-72-heures", texte: "Le kit Sans Honte — 72 Heures : être prêt quand ça coupe (5 $)" }
    },
    "/apps/anxiete-le-jeu/anxiete-le-jeu-v1.1.html": {
      nom: "Anxiété, le jeu", score: null, pause: null,
      lien: { href: "/pdf/sans-honte-tenir-debout", texte: "Le kit Sans Honte — Tenir debout : traverser les journées lourdes (5 $)" }
    },
    /* Ajout du 22 oct. au soir (chantier de nuit, commande d'HP) :
       Chevalier du fleuve — RTS à boucle requestAnimationFrame :
       le gel « gate » fige la simulation (prouvé au playtest :
       positions et minuteurs identiques pendant la pause). */
    "/apps/chevalier-du-fleuve/chevalier-du-fleuve-v1.4.html": {
      nom: "Chevalier du fleuve", score: null,
      pause: { type: "gate" }
    }
  };

  /* Certains serveurs livrent les jeux SANS l'extension .html dans
     l'URL (URL « propre » : le chemin vu par le navigateur perd le
     « .html »). Sans ce repli, la config du jeu ne serait pas
     trouvée et le bouton Pause disparaîtrait en silence — repéré à
     l'inventaire du 22 oct. (barre v2). */
  var cfg = CONFIGS[window.location.pathname];
  if (!cfg && window.location.pathname.slice(-5) !== ".html") {
    cfg = CONFIGS[window.location.pathname + ".html"];
  }
  cfg = cfg || {
    nom: (document.title || "Jeu").replace(/\s*[|—-]\s*HP.*$/, "").trim() || "Jeu",
    score: null, pause: null
  };

  /* ---------------- Tampons des testeurs ----------------
     Mêmes signatures que sur /jeux (registre du 22 oct. 2026) :
     nom court dans la barre, nom complet en infobulle.
     Ajout du 23 oct. 2026, 20 h 35 : O'Z « la grande », tampon
     jaune (#8A6D00) — 2 vérités 1 mensonge et LA BANQUE. */
  var TAMPONS = {
    louka: { court: "Louka", complet: "Louka", couleur: "#2e7d32", rotation: -2 },
    maeva: { court: "Maëva", symbole: "☾", complet: "Maëva (tampon noir, petite lune)", couleur: "#23201c", rotation: 1.5 },
    mel: { court: "Mel", complet: "Mel « The girl boss »", couleur: "#7b2d8b", rotation: -1.5 },
    lo: { court: "Lo", complet: "Lo « le petit Raptor »", couleur: "#0F6CA8", rotation: 2 },
    oz: { court: "O'Z", complet: "O'Z « la grande »", couleur: "#8A6D00", rotation: 1 },
    hp: { court: "HP", complet: "HP, le créateur", couleur: "#2456a6", rotation: -1.5 },
    tous: { court: "Tous", complet: "Tous les testeurs — à l'unanimité", couleur: "#221a12", rotation: 0 }
  };

  /* ---------------- Styles (injectés) ---------------- */
  var CSS = [
    ".bj-bar{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(10px + env(safe-area-inset-bottom,0px));z-index:2147483000;display:flex;gap:6px;align-items:center;background:rgba(24,19,12,.93);border:1px solid rgba(255,244,214,.28);border-radius:999px;padding:5px;box-shadow:0 8px 28px rgba(0,0,0,.38);font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;max-width:96vw;box-sizing:border-box}",
    ".bj-bar.bj-top{bottom:auto;top:calc(10px + env(safe-area-inset-top,0px))}",
    ".bj-btn{min-height:40px;padding:0 14px;border-radius:999px;border:0;background:transparent;color:#fdf6e0;font-size:14px;font-weight:600;line-height:1;cursor:pointer;white-space:nowrap;text-decoration:none;display:inline-flex;align-items:center;gap:6px;font-family:inherit}",
    ".bj-btn:hover{background:rgba(255,244,214,.16)}",
    ".bj-btn:focus-visible{outline:2px solid #f4b426;outline-offset:2px}",
    ".bj-back{background:#f4b426;color:#241a04}",
    ".bj-back:hover{background:#ffc84d}",
    ".bj-veil{position:fixed;inset:0;z-index:2147482000;background:rgba(12,9,4,.68);display:flex;align-items:center;justify-content:center}",
    ".bj-veil[hidden]{display:none}",
    ".bj-veil-card{background:#fffaf0;color:#241a04;border-radius:18px;padding:26px 32px;text-align:center;box-shadow:0 18px 50px rgba(0,0,0,.45);font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}",
    ".bj-veil-title{font-size:22px;font-weight:800;margin:0 0 14px}",
    ".bj-resume{background:#f4b426;color:#241a04;min-height:44px;padding:0 20px;font-size:15px}",
    ".bj-resume:hover{background:#ffc84d}",
    ".bj-toast{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(68px + env(safe-area-inset-bottom,0px));z-index:2147483001;background:#241a04;color:#fdf6e0;border:1px solid rgba(255,244,214,.35);border-radius:999px;padding:9px 18px;font-size:14px;font-weight:600;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.35)}",
    ".bj-toast[hidden]{display:none}",
    ".bj-lien{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(64px + env(safe-area-inset-bottom,0px));z-index:2147483001;background:#fffaf0;color:#241a04;border:1px solid rgba(36,26,4,.25);border-radius:16px;padding:14px 18px;font-size:14px;line-height:1.5;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.35);max-width:min(92vw,430px);text-align:center}",
    ".bj-lien[hidden]{display:none}",
    ".bj-lien.bj-lien-top{bottom:auto;top:calc(64px + env(safe-area-inset-top,0px))}",
    ".bj-lien p{margin:0 0 8px}",
    ".bj-lien a{color:#8a5a00;font-weight:800}",
    ".bj-coeur.bj-actif{color:#ff9d94}",
    ".bj-tampons{display:inline-flex;gap:5px;align-items:center;padding-left:2px}",
    ".bj-tampon{display:inline-flex;align-items:center;gap:4px;background:#fffaf0;border:1.6px solid #221a12;border-radius:6px;padding:3px 8px 4px;font-size:11.5px;font-weight:800;letter-spacing:.02em;line-height:1.15;white-space:nowrap;box-shadow:inset 0 0 0 1px rgba(255,255,255,.45)}",
    "@media (max-width:520px){.bj-btn{font-size:13px;padding:0 10px;min-height:38px}.bj-long{display:none}.bj-tampon-nom{display:none}.bj-tampon{padding:3px 6px 4px}}",
    "@media print{.bj-bar,.bj-veil,.bj-toast{display:none!important}}"
  ].join("\n");

  /* ---------------- État ---------------- */
  var paused = false;       // état de pause tel que la barre le connaît
  var pauseBtn = null, veil = null, toast = null, toastTimer = 0;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function visible(e) {
    if (!e) return false;
    var cs = window.getComputedStyle(e);
    if (cs.display === "none" || cs.visibility === "hidden") return false;
    var r = e.getBoundingClientRect();
    return r.width > 0 || r.height > 0;
  }
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.hidden = true; }, 2000);
  }
  function setPausedUI(v) {
    paused = v;
    if (pauseBtn) pauseBtn.textContent = v ? "▶ Reprendre" : "⏸ Pause";
    if (veil) veil.hidden = !v;
  }

  /* ---------------- Partage ---------------- */
  function lireScore() {
    if (!cfg.score) return null;
    for (var i = 0; i < cfg.score.length; i++) {
      var e = document.querySelector(cfg.score[i]);
      if (!e || !visible(e)) continue;
      var t = (e.textContent || "").replace(/\s+/g, " ").trim();
      var m = t.match(/\d[\d\s.,]*/);
      if (m) {
        var n = m[0].replace(/[\s.,]+$/, "").trim();
        if (/\d/.test(n)) return n;
      }
    }
    return null;
  }
  function copier(texte, fait) {
    function ok() { showToast("Lien copié !"); if (fait) fait(true); }
    function ko() { if (fait) fait(false); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texte).then(ok, function () { repli(); });
    } else repli();
    function repli() {
      try {
        var ta = document.createElement("textarea");
        ta.value = texte;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        var bon = document.execCommand("copy");
        document.body.removeChild(ta);
        if (bon) ok(); else ko();
      } catch (err) { ko(); }
    }
  }
  /* Slug du jeu, lu dans le chemin /apps/<slug>/<fichier> : c'est la
     clé des favoris/cœurs (même valeur que sur /jeux) et la base de
     l'adresse stable partagée. */
  var partiesChemin = window.location.pathname.split("/");
  var slugJeu = partiesChemin[1] === "apps" ? (partiesChemin[2] || "") : "";
  function urlStable() {
    return slugJeu
      ? "https://www.hp-outils.com/apps/" + slugJeu
      : window.location.href;
  }
  function partager() {
    var score = lireScore();
    var url = urlStable();
    var texte = score
      ? "Je joue à " + cfg.nom + " sur HP Outils — mon score : " + score + ". T'es pas game de me battre ?"
      : "Je joue à " + cfg.nom + " sur HP Outils. T'es pas game de l'essayer ?";
    if (navigator.share) {
      navigator.share({ title: cfg.nom + " — HP Outils", text: texte, url: url })
        .catch(function () { /* annulation du visiteur : rien à faire */ });
    } else {
      copier(texte + " " + url);
    }
  }

  /* =============== Moteur « gate » : gel d'horloge ===============
     Pour les jeux à boucle requestAnimationFrame (et Pop Ballons,
     dont le chrono se calcule depuis l'horodatage de la boucle) :
     pendant la pause, les callbacks rAF sont retenus et, à la
     reprise, TOUTES les horloges que le jeu lit (l'horodatage rAF
     et performance.now) sont décalées de la durée de la pause —
     le jeu ne voit pas le temps passer. Voile + blocage des
     entrées par-dessus. Les setTimeout sont aussi mis en file
     pour le type 'gateTimeout' (chaîne du serpent). */
  var gate = null;
  function installerGate(aussiTimeouts) {
    var realRAF = window.requestAnimationFrame.bind(window);
    var realCancel = window.cancelAnimationFrame.bind(window);
    var realNow = performance.now.bind(performance);
    var realST = window.setTimeout.bind(window);
    var realCT = window.clearTimeout.bind(window);
    var g = {
      actif: false, debut: 0, decalage: 0,
      retenus: new Map(),       // id barre -> callback rAF retenu
      liens: new Map(),         // id barre -> id réel (pour annuler)
      fileDelais: [],           // setTimeout retenus (gateTimeout)
      prochainId: 1,
      contextesAudioGeles: [], mediasGeles: []
    };
    window.requestAnimationFrame = function (cb) {
      var id = g.prochainId++;
      if (g.actif) { g.retenus.set(id, cb); return id; }
      var rid = realRAF(function (ts) {
        g.liens.delete(id);
        if (g.actif) { g.retenus.set(id, cb); return; }
        cb(ts - g.decalage);
      });
      g.liens.set(id, rid);
      return id;
    };
    window.cancelAnimationFrame = function (id) {
      if (g.retenus.has(id)) { g.retenus.delete(id); return; }
      var rid = g.liens.get(id);
      if (rid !== undefined) { realCancel(rid); g.liens.delete(id); }
    };
    performance.now = function () {
      return (g.actif ? g.debut : realNow()) - g.decalage;
    };
    if (aussiTimeouts) {
      window.setTimeout = function (fn, delai) {
        if (!g.actif || typeof fn !== "function")
          return realST.apply(window, arguments);
        var args = Array.prototype.slice.call(arguments, 2);
        var rec = { fn: fn, args: args, annule: false, id: -g.prochainId-- };
        g.fileDelais.push(rec);
        return rec.id;
      };
      window.clearTimeout = function (id) {
        for (var i = 0; i < g.fileDelais.length; i++)
          if (g.fileDelais[i].id === id) { g.fileDelais[i].annule = true; return; }
        return realCT.apply(window, arguments);
      };
    }
    g.basculer = function (vers) {
      if (vers === g.actif) return;
      if (vers) {
        g.actif = true;
        g.debut = realNow();
        /* audio : suspendre ce qui joue (contextes créés après
           l'installation de la barre + éléments <audio>/<video>) */
        g.contextesAudioGeles = [];
        window.__bjContextesAudio.forEach(function (c) {
          try {
            if (c.state === "running") { c.suspend(); g.contextesAudioGeles.push(c); }
          } catch (e) { /* sans gravité */ }
        });
        g.mediasGeles = [];
        document.querySelectorAll("audio,video").forEach(function (m) {
          if (!m.paused) { try { m.pause(); g.mediasGeles.push(m); } catch (e) {} }
        });
      } else {
        g.decalage += realNow() - g.debut;
        g.actif = false;
        var aRelancer = Array.from(g.retenus.entries());
        g.retenus.clear();
        aRelancer.forEach(function (paire) {
          var id = paire[0], cb = paire[1];
          var rid = realRAF(function (ts) { g.liens.delete(id); cb(ts - g.decalage); });
          g.liens.set(id, rid);
        });
        var file = g.fileDelais; g.fileDelais = [];
        file.forEach(function (rec) {
          if (!rec.annule) realST(function () { rec.fn.apply(window, rec.args); }, 0);
        });
        g.contextesAudioGeles.forEach(function (c) {
          try { c.resume(); } catch (e) { /* sans gravité */ }
        });
        g.contextesAudioGeles = [];
        g.mediasGeles.forEach(function (m) {
          try { m.play(); } catch (e) { /* sans gravité */ }
        });
        g.mediasGeles = [];
      }
    };
    return g;
  }

  /* Registre des contextes audio créés APRÈS l'installation de la
     barre (les jeux les créent au premier geste du visiteur) —
     sert uniquement au gel audio du moteur « gate ». */
  window.__bjContextesAudio = [];
  ["AudioContext", "webkitAudioContext"].forEach(function (nom) {
    var Orig = window[nom];
    if (!Orig) return;
    function Patched() {
      var c = new (Function.prototype.bind.apply(Orig, [null].concat(
        Array.prototype.slice.call(arguments))))();
      window.__bjContextesAudio.push(c);
      return c;
    }
    Patched.prototype = Orig.prototype;
    try { window[nom] = Patched; } catch (e) { /* sans gravité */ }
  });

  /* Blocage des entrées clavier pendant une pause « gate »
     (le voile bloque déjà les pointeurs). Échap = reprendre. */
  function surTouche(e) {
    if (!paused || !gate) return;
    if (e.key === "Escape") { e.preventDefault(); basculerPause(false); return; }
    var t = e.target;
    if (t && t.closest && t.closest(".bj-bar,.bj-veil")) return;
    e.stopPropagation();
    e.preventDefault();
  }

  /* =============== Bascule pause selon le type =============== */
  function sonderPause() {
    var p = cfg.pause;
    if (!p) return paused;
    try {
      if (p.type === "gate" || p.type === "gateTimeout") return paused;
      if (p.type === "btnToggle") {
        var cible = p.textSel ? document.querySelector(p.textSel)
                              : document.querySelector(p.sel);
        if (cible) return (cible.textContent || "").indexOf(p.pausedText) >= 0;
        return paused;
      }
      if (p.type === "btnPair" || p.type === "fnPair") {
        /* Sonde combinable : TOUS les critères présents doivent être
           vrais (ex. Poutine : le libellé « Reprendre » est affiché
           dès le démarrage du service — il ne vaut que si l'écran
           de pause est aussi visible). */
        var okSonde = true, aCritere = false;
        if (p.probeText) {
          var e1 = document.querySelector(p.probeSel);
          okSonde = okSonde && !!e1 && (e1.textContent || "").indexOf(p.probeText) >= 0;
          aCritere = true;
        }
        if (p.probeClass) {
          var e2 = document.querySelector(p.probeSel);
          okSonde = okSonde && !!e2 && e2.classList.contains(p.probeClass);
          aCritere = true;
        }
        if (p.probeVisible || p.probeVisibleSel) {
          var e3 = document.querySelector(p.probeVisibleSel || p.probeSel);
          okSonde = okSonde && visible(e3);
          aCritere = true;
        }
        return aCritere ? okSonde : paused;
      }
    } catch (err) { /* la sonde ne doit jamais casser la barre */ }
    return paused;
  }

  function resonner() {
    /* Certains jeux affichent leur pause avec un léger délai
       (transition) : sonder deux fois plutôt qu'une. */
    window.setTimeout(function () { setPausedUI(sonderPause()); }, 150);
    window.setTimeout(function () { setPausedUI(sonderPause()); }, 650);
  }

  function basculerPause(vers) {
    var p = cfg.pause;
    if (!p) return;
    try {
      if (p.type === "gate" || p.type === "gateTimeout") {
        if (gate) gate.basculer(vers);
        setPausedUI(vers);
      } else if (p.type === "btnToggle") {
        if (vers !== paused) {
          var b = document.querySelector(p.sel);
          if (b) b.click();
          resonner();
        }
      } else if (p.type === "btnPair") {
        if (vers && !paused) {
          var fait = false;
          if (p.pauseFn && typeof window[p.pauseFn] === "function") {
            window[p.pauseFn](); fait = true;
          }
          if (!fait && p.pauseSel) {
            var bp = document.querySelector(p.pauseSel);
            if (bp) bp.click();
          }
        } else if (!vers && paused) {
          var br = document.querySelector(p.resumeSel);
          if (br) br.click();
        }
        resonner();
      } else if (p.type === "fnPair") {
        if (vers && !paused) {
          var f = window[p.pauseFn];
          if (typeof f === "function") f();
        } else if (!vers && paused) {
          var vo = document.querySelector(p.resumeSel);
          if (vo) vo.click();
        }
        resonner();
      }
    } catch (err) { /* ne jamais casser le jeu pour une pause */ }
  }

  /* ---------------- Construction ---------------- */
  function construire() {
    var style = el("style");
    style.id = "bj-style";
    style.textContent = CSS;
    document.head.appendChild(style);

    var bar = el("div", "bj-bar" + (cfg.pos === "top" ? " bj-top" : ""));
    bar.setAttribute("role", "navigation");
    bar.setAttribute("aria-label", "Barre de jeu");

    var retour = el("a", "bj-btn bj-back", "← Retour");
    retour.href = "/jeux";
    retour.setAttribute("aria-label", "Revenir à la page précédente (ou à la page des jeux)");
    /* Vrai « revenir page arrière » (ordre d'HP, 22 oct. au soir) :
       si le visiteur est arrivé depuis une page du site, on repart
       par l'historique ; arrivée directe, lien externe ou nouvel
       onglet -> le href /jeux suit son cours (repli propre). */
    retour.addEventListener("click", function (e) {
      var duSite = false;
      try {
        duSite = !!document.referrer &&
          document.referrer.indexOf(window.location.origin) === 0;
      } catch (err) { duSite = false; }
      if (duSite && window.history.length > 1) {
        e.preventDefault();
        window.history.back();
      }
    });
    bar.appendChild(retour);

    if (cfg.pause) {
      pauseBtn = el("button", "bj-btn bj-pause", "⏸ Pause");
      pauseBtn.type = "button";
      pauseBtn.setAttribute("aria-label", "Mettre le jeu en pause ou reprendre");
      pauseBtn.addEventListener("click", function () { basculerPause(!paused); });
      bar.appendChild(pauseBtn);
    }

    var part = el("button", "bj-btn bj-share");
    part.type = "button";
    part.innerHTML = "🏆 Partager <span class=\"bj-long\">mon score</span>";
    part.setAttribute("aria-label", "Partager mon score");
    part.addEventListener("click", partager);
    bar.appendChild(part);

    /* ♥ Cœur (item nº 3) : favori local + cœur public anonyme.
       Mêmes clés localStorage que /jeux : un favori se suit d'une
       page à l'autre. Aucun nombre tant que le compteur public
       n'est pas actif côté serveur (repli honnête). */
    var coeurBtn = null, totalCoeurs = null, compteurActif = false;
    if (slugJeu) {
      coeurBtn = el("button", "bj-btn bj-coeur");
      coeurBtn.type = "button";
      var lireCle = function (cle) {
        try {
          var v = JSON.parse(window.localStorage.getItem(cle) || "[]");
          return Array.isArray(v) ? v : [];
        } catch (e) { return []; }
      };
      var ecrireCle = function (cle, v) {
        try { window.localStorage.setItem(cle, JSON.stringify(v)); } catch (e) {}
      };
      var majCoeur = function () {
        var fav = lireCle("hp-jeux-favoris").indexOf(slugJeu) >= 0;
        coeurBtn.textContent =
          (fav ? "♥" : "♡") +
          (compteurActif && totalCoeurs !== null ? " " + totalCoeurs : "");
        coeurBtn.classList.toggle("bj-actif", fav);
        coeurBtn.setAttribute("aria-pressed", fav ? "true" : "false");
        coeurBtn.setAttribute("aria-label",
          (fav ? "Retirer ce jeu de tes favoris" : "Ajouter ce jeu à tes favoris et lui donner un cœur"));
      };
      coeurBtn.addEventListener("click", function () {
        var favs = lireCle("hp-jeux-favoris");
        var i = favs.indexOf(slugJeu);
        if (i >= 0) { favs.splice(i, 1); } else { favs.push(slugJeu); }
        ecrireCle("hp-jeux-favoris", favs);
        var donnes = lireCle("hp-jeux-coeurs");
        if (donnes.indexOf(slugJeu) < 0) {
          donnes.push(slugJeu);
          ecrireCle("hp-jeux-coeurs", donnes);
          if (compteurActif && totalCoeurs !== null) totalCoeurs += 1;
          try {
            window.fetch("/api/public/game-hearts", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ slug: slugJeu })
            }).then(function (r) { return r.json(); }).then(function (d) {
              if (d && d.actif === false) { compteurActif = false; }
              else if (d && typeof d.total === "number") {
                compteurActif = true; totalCoeurs = d.total;
              }
              majCoeur();
            }).catch(function () {});
          } catch (e) { /* hors-ligne : le favori local reste */ }
        }
        majCoeur();
      });
      majCoeur();
      bar.appendChild(coeurBtn);
      try {
        window.fetch("/api/public/game-hearts")
          .then(function (r) { return r.json(); })
          .then(function (d) {
            if (d && d.actif) {
              compteurActif = true;
              totalCoeurs = (d.coeurs && d.coeurs[slugJeu]) || 0;
              majCoeur();
            }
          })
          .catch(function () {});
      } catch (e) { /* pas de compteur : le cœur reste un favori local */ }
    }

    /* ✓ Tampons des testeurs : même signature que sur /jeux,
       posée dans la barre pour les jeux approuvés (corps de preuve
       en partie). Purement informatif — aucun bouton, aucun clic. */
    if (cfg.tampons && cfg.tampons.length) {
      var zoneTampons = el("span", "bj-tampons");
      zoneTampons.setAttribute("role", "img");
      zoneTampons.setAttribute("aria-label",
        "Approuvé par : " + cfg.tampons.map(function (c) {
          return (TAMPONS[c] || {}).complet || c;
        }).join(", "));
      cfg.tampons.forEach(function (cle) {
        var t = TAMPONS[cle];
        if (!t) return;
        var pastille = el("span", "bj-tampon");
        pastille.style.borderColor = t.couleur;
        pastille.style.color = t.couleur;
        pastille.style.transform = "rotate(" + t.rotation + "deg)";
        pastille.title = "Approuvé par " + t.complet + ", testeur HP";
        var coche = el("span", null, "✓");
        coche.setAttribute("aria-hidden", "true");
        pastille.appendChild(coche);
        /* Le symbole (la petite lune de Maëva) reste visible même
           sur petit écran, où le nom se replie : la couleur et le
           symbole portent alors la signature. */
        if (t.symbole) {
          var symb = el("span", null, t.symbole);
          symb.setAttribute("aria-hidden", "true");
          pastille.appendChild(symb);
        }
        /* Libellé complet avec le nom (demande d'HP, 23 oct. 2026) :
           « Approuvé par : Louka ». Il vit dans le même span que le
           nom : sur ≤ 520 px, le span se replie comme avant (la
           couleur et le symbole portent la signature) — aucun
           débordement possible dans la barre. */
        var nomT = el("span", "bj-tampon-nom", "Approuvé par : " + t.court);
        pastille.appendChild(nomT);
        zoneTampons.appendChild(pastille);
      });
      bar.appendChild(zoneTampons);
    }

    /* « Après ta partie » (item nº 5) : un seul lien doux, seulement
       pour les jeux dont la config en déclare un. Le panneau le dit
       d'emblée : rien à acheter pour continuer à jouer. */
    if (cfg.lien) {
      var lienPanneau = el("div", "bj-lien" + (cfg.pos === "top" ? " bj-lien-top" : ""));
      lienPanneau.hidden = true;
      var lp1 = el("p", null,
        "Rien à acheter pour continuer : ce jeu reste gratuit, comme les 35 jeux d'HP.");
      lienPanneau.appendChild(lp1);
      var lp2 = el("p", null, "Si le sujet te parle, en lien avec ce jeu : ");
      var la = el("a", null, cfg.lien.texte);
      la.href = cfg.lien.href;
      lp2.appendChild(la);
      lienPanneau.appendChild(lp2);
      document.body.appendChild(lienPanneau);
      var lienBtn = el("button", "bj-btn bj-apres", "Après ta partie");
      lienBtn.type = "button";
      lienBtn.setAttribute("aria-expanded", "false");
      lienBtn.addEventListener("click", function () {
        lienPanneau.hidden = !lienPanneau.hidden;
        lienBtn.setAttribute("aria-expanded", lienPanneau.hidden ? "false" : "true");
      });
      bar.appendChild(lienBtn);
    }
    document.body.appendChild(bar);

    if (cfg.pause && (cfg.pause.type === "gate" || cfg.pause.type === "gateTimeout")) {
      veil = el("div", "bj-veil");
      veil.hidden = true;
      var carte = el("div", "bj-veil-card");
      carte.appendChild(el("p", "bj-veil-title", "⏸ En pause"));
      var rep = el("button", "bj-btn bj-resume", "▶ Reprendre");
      rep.type = "button";
      rep.addEventListener("click", function () { basculerPause(false); });
      carte.appendChild(rep);
      veil.appendChild(carte);
      veil.addEventListener("click", function (e) { if (e.target === veil) basculerPause(false); });
      document.body.appendChild(veil);
      document.addEventListener("keydown", surTouche, true);
      document.addEventListener("keyup", surTouche, true);
      gate = installerGate(cfg.pause.type === "gateTimeout");
    }

    toast = el("div", "bj-toast");
    toast.hidden = true;
    document.body.appendChild(toast);

    /* Resynchroniser l'état si le visiteur utilise les contrôles
       du jeu lui-même (types à sonde seulement). */
    if (cfg.pause && cfg.pause.type !== "gate" && cfg.pause.type !== "gateTimeout") {
      window.setInterval(function () {
        var reel = sonderPause();
        if (reel !== paused) setPausedUI(reel);
      }, 700);
    }
  }

  if (document.body) construire();
  else document.addEventListener("DOMContentLoaded", construire);
})();
