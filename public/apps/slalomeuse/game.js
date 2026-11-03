"use strict";
(function () {
  var route = document.getElementById("route");
  var voiture = document.getElementById("voiture");
  var panneauDepart = document.getElementById("panneau-depart");
  var panneauFin = document.getElementById("panneau-fin");
  var message = document.getElementById("message");
  var hudScore = document.getElementById("hud-score");
  var hudCones = document.getElementById("hud-cones");
  var hudMetres = document.getElementById("hud-metres");
  var hudRoues = document.getElementById("hud-roues");
  var texteScoreFinal = document.getElementById("texte-score-final");
  var texteDetailFinal = document.getElementById("texte-detail-final");

  var voie = 1; // 0, 1, 2
  var roues = 3;
  var cones = 0;
  var metres = 0;
  var enJeu = false;
  var invulnerableJusquA = 0;
  var dernierTemps = 0;
  var dernierObstacle = 0;
  var dernierMetre = 0;
  var debutPartie = 0;
  var obstacles = [];
  var raf = 0;

  function placerVoiture() {
    // Centre de chaque voie, en pourcentage.
    var centres = [16.666, 50, 83.333];
    voiture.style.left = centres[voie] + "%";
  }
  function allerGauche() { if (voie > 0) { voie -= 1; placerVoiture(); } }
  function allerDroite() { if (voie < 2) { voie += 1; placerVoiture(); } }
  function afficherHud() {
    var score = metres + cones * 10;
    hudScore.textContent = "Score : " + score;
    hudCones.textContent = "Cônes : " + cones;
    hudMetres.textContent = "Mètres : " + metres;
    hudRoues.textContent = "Roues : " + "●".repeat(roues) + "○".repeat(3 - roues);
  }
  function nettoyerObstacles() {
    obstacles.forEach(function (o) { o.el.remove(); });
    obstacles = [];
  }
  function demarrer() {
    voie = 1; roues = 3; cones = 0; metres = 0;
    nettoyerObstacles();
    panneauDepart.hidden = true;
    panneauFin.hidden = true;
    message.textContent = "";
    enJeu = true;
    debutPartie = performance.now();
    dernierTemps = debutPartie;
    dernierObstacle = debutPartie;
    dernierMetre = debutPartie;
    placerVoiture();
    afficherHud();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(boucle);
  }
  function terminer() {
    enJeu = false;
    cancelAnimationFrame(raf);
    var score = metres + cones * 10;
    texteScoreFinal.textContent = "Ton score : " + score + " points.";
    texteDetailFinal.textContent = cones + " cônes, " + metres + " mètres.";
    panneauFin.hidden = false;
  }
  function creerObstacle(type) {
    var el = document.createElement("div");
    el.className = "obstacle " + (type === "nid" ? "nid" : "cone");
    var v = Math.floor(Math.random() * 3);
    el.style.left = (v * 33.333 + 4) + "%";
    el.style.top = "-60px";
    route.appendChild(el);
    obstacles.push({ el: el, voie: v, y: -60, type: type });
  }
  function boucle(temps) {
    if (!enJeu) return;
    var dt = Math.min(temps - dernierTemps, 100);
    dernierTemps = temps;
    var ecoule = temps - debutPartie;
    // Fin douce à 60 secondes, sans compte à rebours affiché en gros.
    if (ecoule >= 60000) { terminer(); return; }
    // 1 mètre toutes les 120 ms, soit environ 500 mètres par minute.
    if (temps - dernierMetre >= 120) {
      metres += 1;
      dernierMetre = temps;
      afficherHud();
    }
    // Apparition progressive : 950 ms au départ, 620 ms après 40 secondes.
    var delai = ecoule < 40000 ? 950 : 620;
    if (temps - dernierObstacle >= delai) {
      dernierObstacle = temps;
      creerObstacle(Math.random() < 0.55 ? "nid" : "cone");
    }
    var vitesse = 0.24 + ecoule / 60000 * 0.18; // px par ms, douce au départ
    var hauteur = route.clientHeight;
    var yVoiture = hauteur - 110;
    var restants = [];
    obstacles.forEach(function (o) {
      o.y += vitesse * dt;
      o.el.style.top = o.y + "px";
      var touche = o.voie === voie && o.y > yVoiture - 40 && o.y < yVoiture + 60;
      if (touche) {
        if (o.type === "cone") {
          cones += 1;
          afficherHud();
          o.el.remove();
          return;
        }
        if (temps > invulnerableJusquA) {
          roues -= 1;
          invulnerableJusquA = temps + 1200;
          message.textContent = "Ouch ! Une roue de moins.";
          afficherHud();
          if (roues <= 0) { o.el.remove(); terminer(); return; }
        }
        o.el.remove();
        return;
      }
      if (o.y > hauteur + 80) { o.el.remove(); return; }
      restants.push(o);
    });
    obstacles = restants;
    raf = requestAnimationFrame(boucle);
  }

  document.getElementById("bouton-jouer").addEventListener("click", demarrer);
  document.getElementById("bouton-rejouer").addEventListener("click", demarrer);
  document.getElementById("bouton-gauche").addEventListener("click", allerGauche);
  document.getElementById("bouton-droite").addEventListener("click", allerDroite);
  document.getElementById("bouton-retour").addEventListener("click", function () {
    window.location.href = "https://www.hp-outils.com/jeux";
  });
  document.getElementById("bouton-partager").addEventListener("click", function () {
    var score = metres + cones * 10;
    var texte = "J'ai joué à La Slalomeuse de nids-de-poule, sur HP Outils. Mon score : " + score + " points, " + cones + " cônes, " + metres + " mètres. T'es pas game de l'essayer ?";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texte).then(function () {
        message.textContent = "Score copié. À toi de partager.";
      }, function () {
        message.textContent = "Copie impossible ici. Recopie ton score.";
      });
    } else {
      message.textContent = "Copie impossible ici. Recopie ton score.";
    }
  });

  // Glisser / balayer, seuil 24 px, sans bloquer les boutons.
  var departX = null;
  route.addEventListener("pointerdown", function (e) { departX = e.clientX; });
  route.addEventListener("pointermove", function (e) {
    if (departX === null || !enJeu) return;
    var dx = e.clientX - departX;
    if (dx > 24) { allerDroite(); departX = e.clientX; }
    if (dx < -24) { allerGauche(); departX = e.clientX; }
  });
  route.addEventListener("pointerup", function () { departX = null; });
  route.addEventListener("pointercancel", function () { departX = null; });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { allerGauche(); }
    if (e.key === "ArrowRight") { allerDroite(); }
    if (e.key === " " && !enJeu) { e.preventDefault(); demarrer(); }
  });

  placerVoiture();
  afficherHud();
})();
