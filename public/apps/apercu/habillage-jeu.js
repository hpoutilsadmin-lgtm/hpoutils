/* Écouteur d'habillage générique — côté JEU (tous moteurs).
   À inclure dans chaque jeu habillable (Course, puis Quiz, Réflexes,
   Observation) : <script src="/apps/apercu/habillage-jeu.js"></script>.
   Contrat : la page parente envoie un postMessage { type: "hp-habillage",
   nom, couleurPrincipale, couleurPrincipaleFoncee, couleurAccent, logo }.
   Le script applique les couleurs aux variables CSS du jeu (--accent,
   --accent-dark, --spruce) et remplit les éléments marqués :
     [data-hp-marque]       : conteneur de la marque (caché si ni nom ni logo)
     [data-hp-marque-nom]   : texte du nom du commerce
     [data-hp-marque-logo]  : <img> du logo (data URL locale, jamais envoyée)
   Seuls les messages venant de la fenêtre parente et de la même origine
   sont acceptés. Aucun
   envoi réseau, aucune collecte : tout reste sur l'appareil du joueur. */
(function () {
  function appliquer(msg) {
    var racine = document.documentElement;
    if (msg.couleurPrincipale) racine.style.setProperty("--accent", msg.couleurPrincipale);
    if (msg.couleurPrincipaleFoncee) racine.style.setProperty("--accent-dark", msg.couleurPrincipaleFoncee);
    if (msg.couleurAccent) racine.style.setProperty("--spruce", msg.couleurAccent);
    var nom = (msg.nom || "").trim();
    document.querySelectorAll("[data-hp-marque-nom]").forEach(function (el) {
      el.textContent = nom || "Votre commerce";
    });
    document.querySelectorAll("[data-hp-marque-logo]").forEach(function (img) {
      if (msg.logo) {
        img.src = msg.logo;
        img.style.display = "";
      } else {
        img.style.display = "none";
      }
    });
    document.querySelectorAll("[data-hp-marque]").forEach(function (el) {
      el.style.display = nom || msg.logo ? "" : "none";
    });
  }
  window.addEventListener("message", function (e) {
    if (e.source !== window.parent) return;
    if (e.origin !== window.location.origin) return;
    var d = e.data;
    if (d && d.type === "hp-habillage") appliquer(d);
  });
})();
