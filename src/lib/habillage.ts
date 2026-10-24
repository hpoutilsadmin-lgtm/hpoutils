/* Module d'habillage « Jeux à votre image » — GÉNÉRIQUE et réutilisable.
   Un commerce = un nom, deux couleurs, un logo. Le module ne connaît AUCUN
   moteur : il prépare l'habillage, et chaque jeu l'applique via le même
   contrat (message « hp-habillage », écouté côté jeu par
   public/apps/apercu/habillage-jeu.js). C'est ce contrat qui permettra de
   brancher Quiz, Réflexes et Observation ensuite, sans toucher à ce fichier.
   Règle d'honnêteté : le logo est lu localement (FileReader) par la page
   d'aperçu et ne quitte jamais l'appareil du commerçant — ce module ne
   fait aucun envoi réseau. */

export type Habillage = {
  /** Nom du commerce, tel que tapé par le commerçant (peut être vide). */
  nom: string;
  /** Couleur principale — boutons, titres, accents du jeu. Format #rrggbb. */
  couleurPrincipale: string;
  /** Couleur d'accent — second ton du jeu. Format #rrggbb. */
  couleurAccent: string;
  /** Logo en data URL (lecture locale), ou null si aucun logo choisi. */
  logo: string | null;
};

/** Habillage par défaut = les couleurs du moteur Course lui-même. */
export const HABILLAGE_DEFAUT: Habillage = {
  nom: "",
  couleurPrincipale: "#c8372d",
  couleurAccent: "#1f5c46",
  logo: null,
};

/** Assombrit une couleur #rrggbb (ou #rgb) d'un facteur 0..1. Sert à dériver
    la teinte foncée des boutons à partir de la couleur principale choisie. */
export function assombrir(hex: string, facteur = 0.68): string {
  const propre = hex.replace("#", "");
  const plein =
    propre.length === 3
      ? propre
          .split("")
          .map((c) => c + c)
          .join("")
      : propre;
  if (!/^[0-9a-fA-F]{6}$/.test(plein)) return "#000000";
  const [r, g, b] = [0, 2, 4].map((i) =>
    Math.max(0, Math.min(255, Math.round(parseInt(plein.slice(i, i + 2), 16) * facteur))),
  );
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

/** Message envoyé au jeu (postMessage, même origine). Le jeu n'a qu'à écouter
    « hp-habillage » : nom, couleurs, teinte foncée dérivée, logo. */
export function messageHabillage(h: Habillage) {
  return {
    type: "hp-habillage",
    nom: h.nom.trim(),
    couleurPrincipale: h.couleurPrincipale,
    couleurPrincipaleFoncee: assombrir(h.couleurPrincipale),
    couleurAccent: h.couleurAccent,
    logo: h.logo,
  };
}

export type MessageHabillage = ReturnType<typeof messageHabillage>;

/** Applique l'habillage comme variables CSS sur une page (utile pour les
    futurs moteurs en React ; les jeux HTML autonomes passent par le message). */
export function appliquerHabillageCss(h: Habillage, racine: HTMLElement): void {
  const msg = messageHabillage(h);
  racine.style.setProperty("--hp-couleur-principale", msg.couleurPrincipale);
  racine.style.setProperty("--hp-couleur-principale-foncee", msg.couleurPrincipaleFoncee);
  racine.style.setProperty("--hp-couleur-accent", msg.couleurAccent);
}
