/* Sir H. Gepeto — pilote ÉTAPE 1 (accueil + zone de vie), 3 nov. 2026. PRÉPARATION.
   Dérivé de demo-finition.html (gestes vérifiés au doigt HP 3 nov. 13 h 34) : nombres,
   angles et durées VERBATIM ; câblage démo remplacé par câblage site (voir build).
   Gestes Étape 1 seulement : saluer, révérence, clin d'œil, antenne. AUCUN son, AUCUNE
   bulle (la bulle appartient au moteur), AUCUN mode (normal seul à l'Étape 1).
   Mouvement réduit système = statique (refus silencieux). Un seul geste à la fois.
   Déclencheurs PROPOSÉS (à confirmer au lot site, jamais décidés ici) : saluer puis
   révérence, 1 fois à l'apparition sur l'accueil (après Fermer de la pancarte, ou à la
   réouverture) ; clin d'œil rare, 1 fois par minute au plus, jamais pendant un jeu,
   un paiement, un sommeil ou un mode calme ; antenne rare cycle 9 s (CSS). */
(function () {
  "use strict";
  var svg = document.getElementById("gepeto");
  var corps = document.getElementById("respiration");
  var buste = document.getElementById("calque-2");
  var tete = document.getElementById("groupe-tete");
  var bras = document.getElementById("bras-gauche");
  var brasTous = document.getElementById("calque-3");
  var yeux = document.getElementById("groupe-yeux");
  var oeilDroit = document.getElementById("oeil-droit");
  var sourcils = document.getElementById("groupe-sourcils");
  var reduitSysteme = typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var enGeste = false;
  function reduit() { return reduitSysteme; }
  function dire() { /* pas de ligne d'état sur le site : refus silencieux, statique */ }
  function verrouillerGestes() { /* pas de boutons démo sur le site : enGeste suffit */ }
  function easeOutQuad(p) { return 1 - (1 - p) * (1 - p); }
  function easeInOut(p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; }
  function animer(duree, appliquer, easing, fin) {
      var debut = null;
      function pas(t) {
        if (debut === null) debut = t;
        var p = Math.min(1, (t - debut) / duree);
        appliquer((easing || easeOutQuad)(p));
        if (p < 1) { requestAnimationFrame(pas); } else if (fin) { fin(); }
      }
      requestAnimationFrame(pas);
    }
  function attendre(ms, fin) { setTimeout(fin, ms); }
  function setTransform(el, v) { if (v) { el.setAttribute("transform", v); } else { el.removeAttribute("transform"); } }
  function geste(nom, phases) {
      if (enGeste || reduit()) {
        return;
      }
      enGeste = true; 
      var i = 0;
      function suivante() {
        if (i >= phases.length) {
          setTransform(tete, null); setTransform(bras, null); setTransform(brasTous, null);
          setTransform(buste, null); svg.removeAttribute("transform");
          setTransform(oeilDroit, null); setTransform(sourcils, null);
          enGeste = false; 
          return;
        }
        var ph = phases[i++];
        if (ph.attendre) { attendre(ph.attendre, suivante); return; }
        animer(ph.duree, ph.appliquer, ph.easing, suivante);
      }
      suivante();
    }
  function saluer() {
      // CORRECTION 3 nov. 13 h 34, doigt HP : « Il ne salut pas la main des air qui fait allô ? »
      // Résolution du spécialiste : c'est la main GAUCHE LIBRE qui salue — elle est ouverte, sans
      // objet, et elle monte en l'air puis remue. La main DROITE garde la tasse et NE BOUGE JAMAIS :
      // la chaîne épaule → poignet → paume → anse → tasse reste intacte (règle du bloc).
      // La main gauche bouge D'UN SEUL TENANT (manche + manchette + paume + doigts, un seul groupe,
      // pivot épaule gauche 360,558) : jamais un doigt seul, jamais une main miroitée (c'est la main
      // ouverte d'origine, jamais redessinée ni retournée). Levée +78° (main en l'air, à gauche de
      // la tête), oscillation ±10° (le « allô »), tenue, retour eased. Bulle « Allô ! » en mode normal.
      geste("saluer", [
        { duree: 250, appliquer: function (p) {
            setTransform(bras, "rotate(" + (20 * p).toFixed(2) + " 360 558)");
            setTransform(tete, "rotate(" + (1 * p).toFixed(2) + " 500 520)");
          } },
        { duree: 550, appliquer: function (p) {
            setTransform(bras, "rotate(" + (20 + 58 * p).toFixed(2) + " 360 558)");
            setTransform(tete, "rotate(" + (1 + 1 * p).toFixed(2) + " 500 520)");
            setTransform(sourcils, "translate(0 " + (-2 * p).toFixed(1) + ")");
          } },
        { duree: 960, appliquer: function (p) {
            var a = 78 + 10 * Math.sin(p * Math.PI * 4);
            setTransform(bras, "rotate(" + a.toFixed(2) + " 360 558)");
          } },
        { attendre: 400 },
        { duree: 700, easing: easeInOut, appliquer: function (p) {
            setTransform(bras, "rotate(" + (78 * (1 - p)).toFixed(2) + " 360 558)");
            setTransform(tete, "rotate(" + (2 * (1 - p)).toFixed(2) + " 500 520)");
            setTransform(sourcils, "translate(0 " + (-2 * (1 - p)).toFixed(1) + ")");
          } }
      ]);
      // Restauration de la bulle après le geste (le nettoyage du geste ne touche pas la bulle).
    }
  function reverence() {
      // CORRECTION 3 nov. 13 h 34, doigt HP : « c'est un homme qui fait un bonjour distingué
      // en se pliant vers l'avant ». Refaite comme un salut distingué : redressement, plié vers
      // l'avant (buste comprimé depuis la taille + tête inclinée 14° + bras qui suivent le buste,
      // jamais seuls), LONGUE tenue (la politesse se voit dans la pause), relevé lent.
      // Le buste (calque-2) et la respiration (enveloppe) sont séparés : aucun conflit.
      geste("révérence", [
        { duree: 300, appliquer: function (p) { svg.setAttribute("transform", "translate(0 " + (-2 * p).toFixed(1) + ")"); } },
        { duree: 900, appliquer: function (p) {
            svg.setAttribute("transform", "translate(0 " + (-2 + 7 * p).toFixed(1) + ")");
            setTransform(buste, "translate(500 750) scale(1 " + (1 - 0.035 * p).toFixed(4) + ") translate(-500 -750)");
            setTransform(tete, "rotate(" + (14 * p).toFixed(2) + " 500 520)");
            setTransform(brasTous, "translate(0 " + (4 * p).toFixed(1) + ")");
          } },
        { attendre: 1000 },
        { duree: 1000, easing: easeInOut, appliquer: function (p) {
            svg.setAttribute("transform", "translate(0 " + (5 * (1 - p)).toFixed(1) + ")");
            setTransform(buste, "translate(500 750) scale(1 " + (0.965 + 0.035 * p).toFixed(4) + ") translate(-500 -750)");
            setTransform(tete, "rotate(" + (14 * (1 - p)).toFixed(2) + " 500 520)");
            setTransform(brasTous, "translate(0 " + (4 * (1 - p)).toFixed(1) + ")");
          } }
      ]);
    }
  function clin() {
      geste("clin d'œil", [
        { duree: 80, appliquer: function (p) { setTransform(oeilDroit, "translate(0 348) scale(1 " + (1 - 0.9 * p).toFixed(3) + ") translate(0 -348)"); } },
        { attendre: 60 },
        { duree: 140, appliquer: function (p) { setTransform(oeilDroit, "translate(0 348) scale(1 " + (0.1 + 0.9 * p).toFixed(3) + ") translate(0 -348)"); setTransform(sourcils, "translate(0 " + (-2 * p).toFixed(1) + ")"); } },
        { attendre: 400 },
        { duree: 200, appliquer: function (p) { setTransform(sourcils, "translate(0 " + (-2 * (1 - p)).toFixed(1) + ")"); } }
      ]);
    }

  /* Antenne midi (démo, sans la ligne d'état) : interrupteur SUR l'antenne seulement.
     ACTIVÉ = bip rouge allumé + lanterne allumée + mouvement rare (CSS 9 s).
     FERMÉ = pas de bip + lanterne éteinte + aucun mouvement, antenne toujours dessinée. */
  var antenneActive = true;
  function appliquerAntenne() {
    var ant = document.getElementById("antenne");
    var bip = document.getElementById("antenne-bip");
    var lanterne = document.getElementById("antenne-lanterne");
    if (!ant || !bip || !lanterne) return;
    if (antenneActive) {
      ant.classList.remove("fermee");
      bip.setAttribute("fill", "#d92b2b"); bip.setAttribute("opacity", "1");
      lanterne.querySelector("rect:last-child").setAttribute("fill", "#ffd94a");
    } else {
      ant.classList.add("fermee");
      bip.setAttribute("fill", "#5a1a1a"); bip.setAttribute("opacity", "0.5");
      lanterne.querySelector("rect:last-child").setAttribute("fill", "#6b5a2a");
    }
  }
  function basculerAntenne() { antenneActive = !antenneActive; appliquerAntenne(); }

  var interrupteur = document.getElementById("antenne-interrupteur");
  if (interrupteur) { interrupteur.addEventListener("click", basculerAntenne); }
  window.HgptoMaitreEtape1 = {
    saluer: saluer, reverence: reverence, clin: clin,
    basculerAntenne: basculerAntenne, reduit: reduit
  };
})();
