// Fiche « Ton jeu à toi, en 30 secondes » — ÉTAT B : parcours d'achat PRÉPARÉ, vente BLOQUÉE.
// Aperçu gratuit jouable intégré. AUCUN paiement n'est pris : le bouton est désactivé
// et aucun identifiant Stripe n'existe pour ce jeu (ni priceId, ni clé).
// La vente n'ouvrira que sur go explicite d'HP nommant le produit, après un test à 0 $ vérifié
// et après confirmation du prix par Mélanie. Voir le doc compagnon pour les portes.
// Cadre et présentation en VOUS ; à l'intérieur du mini-jeu, voix du
// joueur en « tu », comme dans les autres jeux du site.
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/ton-jeu-a-toi")({
  head: () =>
    createSeoHead({
      title: "Ton jeu à toi, en 30 secondes — Bientôt | HP Outils",
      description:
        "Votre jeu de course personnalisé arrive bientôt : un prénom, un thème, 30 secondes au doigt. Essayez l'aperçu gratuit dès maintenant, sans compte et sans achat.",
      path: "/ton-jeu-a-toi",
    }),
  component: Page,
});

type ThemeKey = "mer" | "foret" | "cuisine" | "etoiles";

type Theme = {
  label: string;
  coureur: string;
  obstacles: string[];
  bonus: string;
  ciel: string;
  sol: string;
  phrase: string;
};

const THEMES: Record<ThemeKey, Theme> = {
  mer: {
    label: "La mer",
    coureur: "🏃",
    obstacles: ["🌊", "🦀"],
    bonus: "🐚",
    ciel: "#dff1ff",
    sol: "#e8d9a8",
    phrase: "Saute les vagues !",
  },
  foret: {
    label: "La forêt",
    coureur: "🏃",
    obstacles: ["🪵", "🪨"],
    bonus: "🌰",
    ciel: "#dcefd8",
    sol: "#b7d29a",
    phrase: "Saute les troncs !",
  },
  cuisine: {
    label: "La cuisine",
    coureur: "🏃",
    obstacles: ["🧺", "🥖"],
    bonus: "🍓",
    ciel: "#ffeedd",
    sol: "#f2c99b",
    phrase: "Saute les paniers !",
  },
  etoiles: {
    label: "Les étoiles",
    coureur: "🏃",
    obstacles: ["🪨", "☄️"],
    bonus: "⭐",
    ciel: "#e4e0ff",
    sol: "#c9c2e8",
    phrase: "Saute les rochers !",
  },
};

const DUREE_JEU_MS = 30000;
const VITESSE_PX_S = 260;
const ACCEL_PX_S2 = 4;
const GRAVITE_PX_S2 = 2600;
const VITESSE_SAUT_PX_S = 980;
const COUREUR_X = 60;
const COUREUR_L = 40;
const HAUTEUR_SAUT_COLLISION = 46;
const POINTS_BONUS = 5;
const PX_PAR_METRE = 50;

type Obstacle = { x: number; passe: boolean };
type Bonus = { x: number; pris: boolean };

type EtatCourse = {
  theme: ThemeKey;
  tempsMs: number;
  distanceM: number;
  bonus: number;
  vitesse: number;
  y: number;
  vy: number;
  auSol: boolean;
  obstacles: Obstacle[];
  ramasses: Bonus[];
  termine: boolean;
  raison: "" | "obstacle" | "temps";
};

function creerCourse(theme: ThemeKey): EtatCourse {
  return {
    theme,
    tempsMs: 0,
    distanceM: 0,
    bonus: 0,
    vitesse: VITESSE_PX_S,
    y: 0,
    vy: 0,
    auSol: true,
    obstacles: [],
    ramasses: [],
    termine: false,
    raison: "",
  };
}

function scoreCourse(etat: EtatCourse): number {
  return Math.floor(etat.distanceM) + etat.bonus * POINTS_BONUS;
}

function secondesRestantes(msEcoulees: number): number {
  const reste = Math.ceil((DUREE_JEU_MS - msEcoulees) / 1000);
  return reste < 0 ? 0 : reste;
}

function avancerCourse(etat: EtatCourse, dtSec: number): void {
  if (etat.termine || dtSec <= 0) return;
  etat.tempsMs += dtSec * 1000;
  etat.vitesse = Math.min(430, etat.vitesse + ACCEL_PX_S2 * dtSec);
  etat.distanceM += (etat.vitesse * dtSec) / PX_PAR_METRE;
  if (!etat.auSol) {
    etat.y += etat.vy * dtSec;
    etat.vy -= GRAVITE_PX_S2 * dtSec;
    if (etat.y <= 0) {
      etat.y = 0;
      etat.vy = 0;
      etat.auSol = true;
    }
  }
  const dx = etat.vitesse * dtSec;
  for (const o of etat.obstacles) o.x -= dx;
  for (const b of etat.ramasses) b.x -= dx;
  etat.obstacles = etat.obstacles.filter((o) => o.x > -60);
  etat.ramasses = etat.ramasses.filter((b) => b.x > -60 && !b.pris);
  for (const b of etat.ramasses) {
    if (!b.pris && b.x >= COUREUR_X - 10 && b.x <= COUREUR_X + COUREUR_L + 10) {
      b.pris = true;
      etat.bonus += 1;
    }
  }
  etat.ramasses = etat.ramasses.filter((b) => !b.pris);
  for (const o of etat.obstacles) {
    if (o.x >= COUREUR_X - 12 && o.x <= COUREUR_X + COUREUR_L) {
      if (etat.y < HAUTEUR_SAUT_COLLISION) {
        etat.termine = true;
        etat.raison = "obstacle";
        return;
      }
      o.passe = true;
    }
  }
  if (etat.tempsMs >= DUREE_JEU_MS) {
    etat.termine = true;
    etat.raison = "temps";
  }
}

function encoderBase64Url(texte: string): string {
  const octets = new TextEncoder().encode(texte);
  let binaire = "";
  for (let i = 0; i < octets.length; i++) binaire += String.fromCharCode(octets[i]);
  return btoa(binaire).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decoderBase64Url(code: string): string {
  const base64 = code.replace(/-/g, "+").replace(/_/g, "/");
  const complete = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binaire = atob(complete);
  const octets = new Uint8Array(binaire.length);
  for (let i = 0; i < binaire.length; i++) octets[i] = binaire.charCodeAt(i);
  return new TextDecoder().decode(octets);
}

function encoderInvitation(prenom: string, theme: ThemeKey, score: number): string | null {
  if (!prenom.trim() || !THEMES[theme]) return null;
  if (score < 0 || Math.floor(score) !== score) return null;
  return encoderBase64Url(JSON.stringify({ p: prenom.trim(), t: theme, s: score }));
}

type Invitation =
  | { ok: true; prenom: string; theme: ThemeKey; score: number }
  | { ok: false; message: string };

function decoderInvitation(code: string): Invitation {
  try {
    if (!code) return { ok: false, message: "Ce lien d'invitation semble incomplet. Vous pouvez quand même jouer." };
    const donnees = JSON.parse(decoderBase64Url(code)) as { p?: unknown; t?: unknown; s?: unknown };
    if (typeof donnees.p !== "string" || !donnees.p.trim()) {
      return { ok: false, message: "Ce lien d'invitation semble incomplet. Vous pouvez quand même jouer." };
    }
    if (donnees.t !== "mer" && donnees.t !== "foret" && donnees.t !== "cuisine" && donnees.t !== "etoiles") {
      return { ok: false, message: "Ce lien d'invitation semble incomplet. Vous pouvez quand même jouer." };
    }
    if (typeof donnees.s !== "number" || donnees.s < 0 || Math.floor(donnees.s) !== donnees.s) {
      return { ok: false, message: "Ce lien d'invitation semble incomplet. Vous pouvez quand même jouer." };
    }
    return { ok: true, prenom: donnees.p, theme: donnees.t, score: donnees.s };
  } catch {
    return { ok: false, message: "Ce lien d'invitation semble incomplet. Vous pouvez quand même jouer." };
  }
}

function comparerScore(score: number, scoreABattre: number | null): string {
  if (scoreABattre === null || scoreABattre === 0) return "";
  if (score > scoreABattre) return "Bravo, tu as battu le score !";
  if (score === scoreABattre) return "Égalité ! Tu as égalé le score.";
  return "Pas cette fois… mais tu peux rejouer !";
}

// ——— Produit « Ton jeu à toi » — ÉTAT B : parcours PRÉPARÉ, vente BLOQUÉE.
// Patron suivi : celui des produits du site (products-catalog.ts, achat.$slug.tsx,
// panier-validation.ts). Un produit en `purchaseHold` affiche le message de suspension
// À LA PLACE du paiement, et le panier refuse les produits suspendus.
// Différence honnête : ce jeu n'est PAS un PDF, donc il n'entre PAS dans PRODUCTS
// (qui exige un chemin PDF et un priceId Stripe réel). Règle maison (AGENTS.md) : on ne
// touche aux priceId du catalogue qu'une fois le produit test Stripe existant. Ici,
// AUCUN produit Stripe n'existe : aucun priceId, aucune clé, rien de créé.
// TODO (porte Mélanie) : le priceId Stripe confirmé ira dans `priceId` ci-dessous,
// puis dans le parcours de paiement — jamais un prix inventé.
const JEU_PRODUIT = {
  titre: "Ton jeu à toi, en 30 secondes",
  slug: "ton-jeu-a-toi",
  prixAffiche: "5 $ CAD, aucune taxe ajoutée",
  // Clé de recherche PROPOSÉE, NON CRÉÉE — à créer par Mélanie côté Stripe, puis confirmée.
  lookupKeyProposee: "jeu_30_secondes_course_5",
  priceId: null as string | null,
  // Tant que ce message est présent, AUCUN paiement n'est proposé (patron purchaseHold).
  purchaseHold: "Vente pas encore ouverte — aucun paiement n'est pris",
};

// BASCULE (après les 3 portes — voir doc compagnon) :
// priceId: "<priceId Stripe confirmé par Mélanie>" + purchaseHold: undefined,
// puis TEST 0 $ vérifié, puis go d'HP nommant le produit. Sans ces 3 portes, ne pas basculer.
function achatBloque(): boolean {
  return JEU_PRODUIT.purchaseHold !== undefined && JEU_PRODUIT.priceId === null;
}

// Point de branchement de la livraison automatique (voir doc compagnon) :
// après paiement, Stripe hébergé → /checkout/return (confirmation serveur, patron
// existant) → retour ici avec `?livraison=confirme`. Aucun lien de la fiche ne pose
// ce paramètre aujourd'hui : la section de livraison reste injoignable tant que le
// produit Stripe n'existe pas. Elle ne débloque rien qui ne soit déjà gratuit :
// le jeu livré est le même que l'aperçu gratuit ; la valeur payée est le lien de
// défi personnel + le soutien. La vérification du paiement reste côté /checkout/return.
function livraisonConfirmee(recherche: string): boolean {
  try {
    return new URLSearchParams(recherche).get("livraison") === "confirme";
  } catch {
    return false;
  }
}

type Phase = "accueil" | "jeu" | "fin";

function Page() {
  const [prenom, setPrenom] = useState("");
  const [theme, setTheme] = useState<ThemeKey | null>(null);
  const [phase, setPhase] = useState<Phase>("accueil");
  const [messageDepart, setMessageDepart] = useState("");
  const [messageLien, setMessageLien] = useState("");
  const [banniereInvitation, setBanniereInvitation] = useState("");
  const [scoreABattre, setScoreABattre] = useState<number | null>(null);
  const [scoreAffiche, setScoreAffiche] = useState(0);
  const [tempsAffiche, setTempsAffiche] = useState(30);
  const [scoreFinal, setScoreFinal] = useState(0);
  const [raisonFin, setRaisonFin] = useState("");
  const [lienPartage, setLienPartage] = useState("");
  const [partageVisible, setPartageVisible] = useState(false);
  const [messageCopie, setMessageCopie] = useState("");
  const [livraison, setLivraison] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const etatRef = useRef<EtatCourse | null>(null);
  const rafRef = useRef<number>(0);
  const dernierTempsRef = useRef(0);
  const delaiApparitionRef = useRef(0);
  const compteurObstacleRef = useRef(0);
  const prenomRef = useRef("");
  const themeRef = useRef<ThemeKey | null>(null);
  prenomRef.current = prenom;
  themeRef.current = theme;

  // Invitation entrante, lue une fois côté client (même format #invite= que
  // le prototype : un lien du prototype rouvre sur cette fiche).
  useEffect(() => {
    const hash = window.location.hash || "";
    if (hash.indexOf("#invite=") !== 0) return;
    const invitation = decoderInvitation(hash.slice("#invite=".length));
    if (invitation.ok) {
      setScoreABattre(invitation.score);
      setBanniereInvitation(
        `${invitation.prenom} t'invite à battre ${invitation.score} points. Choisissez un thème et courez pour essayer de le battre !`,
      );
      setTheme(invitation.theme);
    } else {
      setMessageLien(invitation.message);
    }
  }, []);

  // Arrêt propre de la boucle si la page se démonte en pleine partie.
  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Livraison automatique : le paramètre est posé par /checkout/return après
  // confirmation serveur (voir doc compagnon). Aucun lien ne le pose aujourd'hui.
  useEffect(() => {
    setLivraison(livraisonConfirmee(window.location.search || ""));
  }, []);

  const dessiner = () => {
    const canvas = canvasRef.current;
    const etat = etatRef.current;
    if (!canvas || !etat) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const t = THEMES[etat.theme];
    const W = canvas.width;
    const H = canvas.height;
    const solY = H - 52;
    ctx.fillStyle = t.ciel;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = t.sol;
    ctx.fillRect(0, solY, W, H - solY);
    ctx.fillStyle = "#2a7a4b";
    ctx.fillRect(0, solY, W, 4);
    ctx.font = "44px system-ui";
    ctx.textAlign = "center";
    etat.obstacles.forEach((ob, i) => {
      ctx.fillText(t.obstacles[i % t.obstacles.length], ob.x, solY + 6);
    });
    etat.ramasses.forEach((b) => {
      ctx.fillText(t.bonus, b.x, solY - 70);
    });
    ctx.fillText(t.coureur, COUREUR_X + COUREUR_L / 2, solY - etat.y + 6);
    ctx.font = "700 15px system-ui";
    ctx.textAlign = "left";
    ctx.fillStyle = "#222";
    ctx.fillText(t.phrase, 12, 24);
  };

  const terminerPartie = () => {
    cancelAnimationFrame(rafRef.current);
    const etat = etatRef.current;
    if (!etat) return;
    const final = scoreCourse(etat);
    setScoreFinal(final);
    setRaisonFin(
      etat.raison === "obstacle"
        ? "Tu as touché un obstacle : la course s'est arrêtée là."
        : "Les 30 secondes sont écoulées : belle course !",
    );
    setPartageVisible(false);
    setPhase("fin");
  };

  const boucle = (maintenant: number) => {
    const etat = etatRef.current;
    if (!etat || etat.termine) return;
    const dt = Math.min(0.05, (maintenant - dernierTempsRef.current) / 1000);
    dernierTempsRef.current = maintenant;
    delaiApparitionRef.current -= dt;
    if (delaiApparitionRef.current <= 0) {
      compteurObstacleRef.current += 1;
      const canvas = canvasRef.current;
      const x = canvas ? canvas.width + 20 : 540;
      if (compteurObstacleRef.current % 3 === 0) {
        etat.ramasses.push({ x, pris: false });
      } else {
        etat.obstacles.push({ x, passe: false });
      }
      delaiApparitionRef.current = 0.9 + Math.random() * 0.6;
    }
    avancerCourse(etat, dt);
    const nouveauScore = scoreCourse(etat);
    const nouveauTemps = secondesRestantes(etat.tempsMs);
    setScoreAffiche((ancien) => (ancien === nouveauScore ? ancien : nouveauScore));
    setTempsAffiche((ancien) => (ancien === nouveauTemps ? ancien : nouveauTemps));
    dessiner();
    if (etat.termine) {
      terminerPartie();
      return;
    }
    rafRef.current = requestAnimationFrame(boucle);
  };

  const demarrerPartie = () => {
    if (!prenom.trim()) {
      setMessageDepart("Veuillez indiquer votre prénom pour commencer.");
      return;
    }
    if (!theme) {
      setMessageDepart("Veuillez choisir un thème pour commencer.");
      return;
    }
    setMessageDepart("");
    const etat = creerCourse(theme);
    etatRef.current = etat;
    compteurObstacleRef.current = 0;
    delaiApparitionRef.current = 0.8;
    setScoreAffiche(0);
    setTempsAffiche(30);
    setPhase("jeu");
    // Le canvas n'existe qu'une fois la phase rendue : on dessine et on
    // lance la boucle au prochain tour, quand il est monté.
    window.setTimeout(() => {
      dessiner();
      dernierTempsRef.current = performance.now();
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(boucle);
    }, 0);
  };

  const faireSaut = () => {
    const etat = etatRef.current;
    if (etat && !etat.termine && etat.auSol) {
      etat.vy = VITESSE_SAUT_PX_S;
      etat.auSol = false;
    }
  };

  const partagerScore = () => {
    const etat = etatRef.current;
    const themeActuel = themeRef.current;
    if (!etat || !themeActuel) return;
    const code = encoderInvitation(prenomRef.current, themeActuel, scoreFinal);
    if (!code) return;
    const base = window.location.href.split("#")[0];
    setLienPartage(`${base}#invite=${code}`);
    setPartageVisible(true);
  };

  const copierLien = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(lienPartage);
      }
      setMessageCopie("Lien copié ! Vous pouvez le coller où vous voulez.");
    } catch {
      setMessageCopie("Sélectionnez le lien ci-dessus pour le copier.");
    }
  };

  const themeButtons: { key: ThemeKey; emoji: string }[] = [
    { key: "mer", emoji: "🌊" },
    { key: "foret", emoji: "🌲" },
    { key: "cuisine", emoji: "🍳" },
    { key: "etoiles", emoji: "⭐" },
  ];

  return (
    <>
      <section className="editorial-hero">
        <div className="container">
          <span className="editorial-kicker">Bientôt</span>
          <h1>
            Ton jeu à toi, <em>en 30 secondes</em>.
          </h1>
          <p className="lead">
            Votre jeu de course personnalisé arrive bientôt : un prénom, un
            thème, 30 secondes au doigt — et un score à battre entre proches.
            En attendant, vous pouvez essayer l'aperçu gratuit ci-dessous,
            sans compte et sans achat.
          </p>
          <p className="lead">
            Prix prévu : 5 $, aucune taxe ajoutée. Aucun achat possible pour
            l'instant.
          </p>
        </div>
      </section>

      {livraison && (
        <section className="three-pillars">
          <div className="container" style={{ maxWidth: 720 }}>
            <h2>Livraison — votre jeu est arrivé</h2>
            <p>
              Votre paiement a été confirmé. Aucune étape manuelle : votre jeu
              est ci-dessous, jouable tout de suite, sans compte. À la fin de
              votre course, « Partager mon score » crée votre lien de défi
              personnel (#invite=) à envoyer à vos proches.
            </p>
            <p style={{ fontSize: "0.95rem", color: "#444" }}>
              Le reçu de votre paiement vous a été envoyé par courriel, comme
              pour les autres produits du site. Si ça coince, écrivez à{" "}
              <a href="mailto:hpoutils.admin@gmail.com">
                hpoutils.admin@gmail.com
              </a>{" "}
              : un humain de l'équipe vous répond sous 3 jours ouvrables.
            </p>
          </div>
        </section>
      )}

      <section className="three-pillars">
        <div className="container" style={{ maxWidth: 720 }}>
          {banniereInvitation && (
            <p role="status" style={{ fontWeight: 700 }}>
              {banniereInvitation}
            </p>
          )}
          {messageLien && (
            <p role="status" style={{ fontWeight: 700 }}>
              {messageLien}
            </p>
          )}

          {phase === "accueil" && (
            <div>
              <label htmlFor="prenom" style={{ display: "block", fontWeight: 700, margin: "14px 0 6px" }}>
                Votre prénom
              </label>
              <input
                id="prenom"
                type="text"
                autoComplete="given-name"
                placeholder="Exemple : Marie"
                maxLength={40}
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                style={{ width: "100%", fontSize: "1.1rem", padding: 14, border: "2px solid #888", borderRadius: 12 }}
              />
              <p style={{ fontWeight: 700, margin: "14px 0 6px" }}>Choisissez un thème</p>
              <div role="group" aria-label="Thèmes du jeu" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {themeButtons.map((b) => (
                  <button
                    key={b.key}
                    type="button"
                    aria-pressed={theme === b.key}
                    onClick={() => {
                      setTheme(b.key);
                      setMessageDepart("");
                    }}
                    style={{
                      minHeight: 64,
                      fontSize: "1.05rem",
                      border: theme === b.key ? "2px solid #2a7a4b" : "2px solid #888",
                      borderRadius: 14,
                      background: theme === b.key ? "#eef6f0" : "#fff",
                      cursor: "pointer",
                      padding: 10,
                    }}
                  >
                    {b.emoji} {THEMES[b.key].label}
                  </button>
                ))}
              </div>
              {messageDepart && (
                <p role="status" style={{ fontWeight: 700, color: "#8a3b00" }}>
                  {messageDepart}
                </p>
              )}
              <button
                type="button"
                className="btn-primary"
                onClick={demarrerPartie}
                style={{ width: "100%", minHeight: 56, fontSize: "1.15rem", marginTop: 16 }}
              >
                Courir 30 secondes
              </button>
              <p style={{ fontSize: "0.95rem", color: "#444" }}>
                À l'intérieur du jeu, c'est la voix du joueur qui vous parle :
                on vous tutoie le temps de la partie, comme dans les autres jeux.
              </p>
            </div>
          )}

          {phase === "jeu" && (
            <div>
              <p>
                <strong>À toi de jouer ! Tape pour sauter.</strong>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between", fontSize: "1.15rem", fontWeight: 700 }}>
                <span>⭐ Points : {scoreAffiche}</span>
                <span>⏱ {tempsAffiche} s</span>
              </p>
              {scoreABattre !== null && scoreABattre > 0 && (
                <p style={{ fontSize: "0.95rem", color: "#444" }}>Score à battre : {scoreABattre} points.</p>
              )}
              <canvas
                ref={canvasRef}
                width={520}
                height={300}
                aria-label="Zone de course : tapez pour sauter par-dessus les obstacles"
                onPointerDown={faireSaut}
                onKeyDown={(e) => {
                  if (e.code === "Space" || e.code === "ArrowUp") {
                    e.preventDefault();
                    faireSaut();
                  }
                }}
                tabIndex={0}
                style={{
                  width: "100%",
                  height: 300,
                  display: "block",
                  border: "2px solid #2a7a4b",
                  borderRadius: 16,
                  touchAction: "manipulation",
                  background: theme ? THEMES[theme].ciel : "#dff1ff",
                }}
              />
              <p style={{ fontSize: "0.95rem", color: "#444" }}>
                Tape ou appuie sur Espace pour sauter. Chaque obstacle évité te
                fait avancer ; chaque bonus ramassé vaut 5 points. Si tu
                touches un obstacle, la course s'arrête.
              </p>
              <button
                type="button"
                className="btn-primary"
                onClick={faireSaut}
                style={{ width: "100%", minHeight: 56, fontSize: "1.15rem" }}
              >
                Sauter !
              </button>
            </div>
          )}

          {phase === "fin" && (
            <div>
              <h2>Course terminée !</h2>
              <p style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                {prenom.trim()}, ton score : {scoreFinal} points !
              </p>
              <p style={{ fontSize: "0.95rem", color: "#444" }}>{raisonFin}</p>
              {comparerScore(scoreFinal, scoreABattre) && <p>{comparerScore(scoreFinal, scoreABattre)}</p>}
              <button
                type="button"
                className="btn-primary"
                onClick={partagerScore}
                style={{ width: "100%", minHeight: 56, fontSize: "1.15rem" }}
              >
                Partager mon score
              </button>
              {partageVisible && (
                <div style={{ marginTop: 14 }}>
                  <label htmlFor="lien-partage" style={{ display: "block", fontWeight: 700, margin: "14px 0 6px" }}>
                    Votre lien à partager
                  </label>
                  <input
                    id="lien-partage"
                    type="text"
                    readOnly
                    value={lienPartage}
                    style={{ width: "100%", fontSize: "0.95rem", padding: 12, border: "2px solid #888", borderRadius: 12 }}
                  />
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={copierLien}
                    style={{ width: "100%", minHeight: 56, fontSize: "1.15rem", marginTop: 10 }}
                  >
                    Copier le lien
                  </button>
                  {messageCopie && (
                    <p role="status" style={{ fontWeight: 700, color: "#8a3b00" }}>
                      {messageCopie}
                    </p>
                  )}
                  <p style={{ fontSize: "0.95rem", color: "#444" }}>
                    Ce lien ne contient que votre prénom, votre thème et votre
                    score. Il fonctionne sans serveur et sans compte : la
                    personne qui l'ouvre voit votre invitation et peut relancer
                    la course.
                  </p>
                </div>
              )}
              <button
                type="button"
                className="btn-primary"
                onClick={demarrerPartie}
                style={{ width: "100%", minHeight: 56, fontSize: "1.15rem", marginTop: 10 }}
              >
                Rejouer
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setPhase("accueil")}
                style={{ width: "100%", minHeight: 56, fontSize: "1.15rem", marginTop: 10 }}
              >
                Changer de prénom ou de thème
              </button>
            </div>
          )}

          <div style={{ marginTop: 32, border: "2px solid #b7791f", borderRadius: 12, padding: 12, background: "#fdf0d5" }}>
            <h2 style={{ marginTop: 0 }}>L'achat — vente pas encore ouverte</h2>
            <p>
              Prix : {JEU_PRODUIT.prixAffiche}. Ce jeu personnalisé n'est pas
              encore en vente. Vous pouvez essayer l'aperçu gratuit ci-dessus,
              sans compte et sans engagement. Quand la vente ouvrira, les
              conditions seront affichées ici avant tout paiement.
            </p>
            {achatBloque() && (
              <p style={{ fontWeight: 700 }}>
                {JEU_PRODUIT.purchaseHold}. En attendant, l'aperçu gratuit est
                ouvert, et pour toute question, écrivez à{" "}
                <a href="mailto:hpoutils.admin@gmail.com">
                  hpoutils.admin@gmail.com
                </a>
                .
              </p>
            )}
            <p>
              Ce que la livraison automatique remettra, sans aucune étape
              manuelle : le jeu jouable + votre lien de défi personnel
              (#invite=) à envoyer à vos proches — le paiement confirmé, le
              jeu s'ouvre ici même, sans compte et sans attente.
            </p>
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="Vente pas encore ouverte — aucun paiement n'est pris"
              style={{ width: "100%", minHeight: 56, fontSize: "1.15rem", marginTop: 10, cursor: "not-allowed", opacity: 0.6 }}
            >
              Acheter — vente pas encore ouverte
            </button>
            <p style={{ marginBottom: 0, fontSize: "0.95rem", color: "#444" }}>
              Aucune taxe ajoutée · Petit fournisseur · Aucun paiement n'est
              pris tant que ce bouton reste désactivé.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
