/**
 * Détectôt — le moteur derrière la roue d'hamster d'HP Outils.
 *
 * Ce que Détectôt fait : dire à la page à qui elle s'adresse — une IA,
 * un humain probable, ou inconnu — avec un niveau de confiance, pour
 * que le site (HGPTO en premier) communique efficacement.
 *
 * L'IDÉE HONNÊTE QUI FAIT TOUT LE SYSTÈME :
 * Détectôt confirme les robots, il ne certifie jamais les humains.
 * Côté navigateur, un robot se trahit (il le dit lui-même : webdriver,
 * navigateur sans tête, signature d'aspirateur connu). Un humain, lui,
 * ne peut pas être prouvé : un robot peut imiter une souris. Donc un
 * « humain » Détectôt est toujours « probable », jamais « confirmé ».
 *
 * Ce que Détectôt ne fait jamais : identifier une personne, suivre
 * quelqu'un d'une page à l'autre, poser un cookie de suivi, envoyer
 * quoi que ce soit ailleurs. Le signal reste sur la page, en mémoire
 * de session seulement, et il est lisible par le site via l'événement
 * « detectot » ou lireDetectot().
 *
 * États :
 * - 'ia' : signaux robot (confirmée si signature, probable si silence).
 * - 'humain' : activité réelle observée (toujours probable, jamais confirmée).
 * - 'inconnu' : personne ne bouge (inactivité, onglet caché) — on ne déduit
 *   rien, et on garde le dernier type connu.
 */

export type DetectotType = "ia" | "humain" | "inconnu";
export type DetectotConfiance = "confirmee" | "probable" | "faible";

export interface DetectotSignal {
  type: DetectotType;
  confiance: DetectotConfiance;
  signaux: string[];
  horodatage: number;
}

const CLE = "detectot";

const SIGNATURES_ROBOT = [
  "HeadlessChrome",
  "PhantomJS",
  "Puppeteer",
  "Selenium",
  "Playwright",
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Applebot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "Claude-Web",
  "Google-Extended",
  "CCBot",
  "anthropic-ai",
];

/** Signatures robot présentes dans le navigateur (vide = aucune). */
export function signaturesRobot(): string[] {
  const trouves: string[] = [];
  try {
    if (navigator.webdriver) trouves.push("webdriver");
  } catch {
    /* ignore */
  }
  const ua = navigator.userAgent || "";
  for (const sig of SIGNATURES_ROBOT) {
    if (ua.indexOf(sig) !== -1) trouves.push(sig);
  }
  return trouves;
}

/** Publie un signal : mémoire de session + événement « detectot ». */
export function publierDetectot(signal: DetectotSignal): void {
  try {
    sessionStorage.setItem(CLE, JSON.stringify(signal));
  } catch {
    /* stockage indisponible : l'événement suffit */
  }
  try {
    window.dispatchEvent(new CustomEvent("detectot", { detail: signal }));
  } catch {
    /* ignore */
  }
}

/** Lit le dernier signal (défaut : humain probable, sans signal). */
export function lireDetectot(): DetectotSignal {
  try {
    const brut = sessionStorage.getItem(CLE);
    if (brut) {
      const lu = JSON.parse(brut) as DetectotSignal;
      if (lu.type === "ia" || lu.type === "humain" || lu.type === "inconnu") {
        return lu;
      }
    }
  } catch {
    /* ignore */
  }
  return {
    type: "humain",
    confiance: "faible",
    signaux: ["defaut"],
    horodatage: Date.now(),
  };
}
