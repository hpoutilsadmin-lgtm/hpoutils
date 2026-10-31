import { useEffect, useState } from "react";
import type { HgptoProps } from "./Hgpto";

/**
 * Lot A1 tap (candidat, 30 oct. 2026) — la mascotte ne charge qu'au tap.
 *
 * Au départ, seules existent : une pastille 56 px + une zone de vie
 * réservée (bande basse, mêmes hauteurs que le padding mascotte :
 * 290 px, 240 px sur téléphone). ZÉRO code mascotte chargé : le moteur
 * (~302 Ko source), les données (~103 Ko), le balisage et les styles
 * mascotte ne partent qu'au premier tap, en un seul import dynamique.
 *
 * Machine à états (mémoire seulement, jamais localStorage) :
 * - pastille : pastille seule + zone. Tap → chargement.
 * - chargement : pastille visible, taps ignorés (rien ne casse).
 * - pancarte : code chargé, pancarte de bienvenue affichée (1 fois
 *   par session, drapeau sessionStorage « hgpto-pancarte-vue »).
 *   Son Fermer → mascotte.
 * - mascotte : la mascotte vit normalement. Son propre « Fermer »
 *   (moteur, 4 s d'au revoir) la ferme pour la session ; sa pastille
 *   « Rouvrir » (moteur) la ramène au tap. Jamais automatique.
 *   La pastille du lanceur ne revient jamais après le chargement :
 *   les deux pastilles se succèdent, ne se doublent jamais.
 * - echec : l'import a échoué, la page reste utilisable, la pastille
 *   permet de réessayer (le « 1 fois » vaut pour le chargement réussi).
 *
 * Au tap qui monte la mascotte, on efface « hgpto-closed » (stockage
 * + classe) : un tap explicite rouvre toujours, même après un
 * rechargement qui suit un Fermer. Sans cela, le montage refuserait
 * d'injecter et le tap semblerait mort.
 *
 * La zone reste toujours présente et le padding corps ajouté par le
 * moteur (body.hgpto-on) est neutralisé tant que la zone existe :
 * aucune double réservation, aucun saut de mise en page au chargement.
 */
type Etat = "pastille" | "chargement" | "pancarte" | "mascotte" | "echec";

const STYLE = `
.hgpto-tap-zone{height:290px}
@media (max-width:560px){.hgpto-tap-zone{height:240px}}
body.hgpto-tap-zone-on.hgpto-on{padding-bottom:0}
.hgpto-tap-pastille{position:fixed;left:0;bottom:8px;width:56px;height:56px;border-radius:50%;background:#fffaf0;color:#2b2118;border:2.5px solid #2b2118;font-size:11px;font-weight:700;cursor:pointer;box-shadow:2px 2px 0 rgba(43,33,24,.18);z-index:60}
.hgpto-tap-echec{position:fixed;left:64px;bottom:16px;max-width:min(72vw,320px);background:#fffaf0;color:#2b2118;border:2px solid #2b2118;border-radius:12px;padding:10px 12px;font-size:14px;font-weight:600;box-shadow:2px 2px 0 rgba(43,33,24,.18);z-index:60}
`;

export function HgptoTap() {
  const [etat, setEtat] = useState<Etat>("pastille");
  const [Mascotte, setMascotte] = useState<React.ComponentType<HgptoProps> | null>(null);

  // La zone est toujours présente tant que le lanceur est monté :
  // la classe qui neutralise le padding moteur l'est aussi, sinon
  // la règle CSS ne s'appliquerait jamais et la page réserverait
  // 290 px (zone) + 290 px (padding moteur) au chargement.
  useEffect(() => {
    document.body.classList.add("hgpto-tap-zone-on");
    return () => {
      document.body.classList.remove("hgpto-tap-zone-on");
    };
  }, []);

  const ouvrir = () => {
    if (etat === "chargement" || Mascotte) return;
    setEtat("chargement");
    import("./Hgpto")
      .then((mod) => {
        setMascotte(() => mod.Hgpto);
        // Un tap explicite rouvre toujours, même après Fermer + rechargement.
        try {
          sessionStorage.removeItem("hgpto-closed");
        } catch {
          /* stockage indisponible */
        }
        document.body.classList.remove("hgpto-closed");
        let vue = false;
        try {
          vue = sessionStorage.getItem("hgpto-pancarte-vue") === "1";
        } catch {
          /* stockage indisponible : on montre la pancarte */
        }
        setEtat(vue ? "mascotte" : "pancarte");
      })
      .catch(() => setEtat("echec"));
  };

  const fermerPancarte = () => {
    try {
      sessionStorage.setItem("hgpto-pancarte-vue", "1");
    } catch {
      /* stockage indisponible */
    }
    setEtat("mascotte");
  };

  const monte = etat === "pancarte" || etat === "mascotte";
  const etiquette =
    etat === "chargement"
      ? "Chargement de Sir H. Gepeto"
      : "Ouvrir Sir H. Gepeto";

  return (
    <>
      <style>{STYLE}</style>
      <div className="hgpto-tap-zone" aria-hidden="true" />
      {!monte && (
        <button
          type="button"
          className="hgpto-tap-pastille"
          onClick={ouvrir}
          aria-label={etiquette}
        >
          Sir H. Gepeto
        </button>
      )}
      {etat === "echec" && (
        <p className="hgpto-tap-echec">
          Le chargement n'a pas fonctionné. Touchez la pastille pour
          réessayer.
        </p>
      )}
      {monte && Mascotte && (
        <Mascotte
          pancarte={etat === "pancarte"}
          onPancarteFermer={fermerPancarte}
        />
      )}
    </>
  );
}
