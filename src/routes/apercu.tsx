import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";
import { HABILLAGE_DEFAUT, messageHabillage, type Habillage } from "@/lib/habillage";

/* /apercu — « Jeux à votre image », v1 : l'aperçu personnalisé.
   Le commerçant entre son nom, ses deux couleurs et son logo, et voit le
   moteur Course (Caribou Run) habillé et jouable, en 30 secondes.
   Gratuit, sans compte, sans engagement — et sans rien envoyer : le logo
   est lu localement (FileReader) et reste sur l'appareil du commerçant.
   L'habillage voyage vers le jeu par postMessage (même origine), via le
   contrat générique de src/lib/habillage.ts — les 3 autres moteurs
   (Quiz, Réflexes, Observation) s'y brancheront ensuite. Aucun Stripe
   dans cette v1 : l'aperçu est gratuit, aucun paiement. */
export const Route = createFileRoute("/apercu")({
  head: () =>
    createSeoHead({
      title: "Aperçu personnalisé — Voyez votre jeu à vos couleurs | HP Outils",
      description:
        "Entrez le nom de votre commerce, vos couleurs et votre logo, et voyez un jeu HP habillé à votre image en 30 secondes. Gratuit, sans compte, sans engagement — rien n'est envoyé.",
      path: "/apercu",
    }),
  component: Page,
});

const JEU_APERCU = "/apps/caribou-run/caribou-run-apercu.html";

function Page() {
  const [habillage, setHabillage] = useState<Habillage>(HABILLAGE_DEFAUT);
  const [messageLogo, setMessageLogo] = useState<string>("");
  const cadreRef = useRef<HTMLIFrameElement | null>(null);
  const pretRef = useRef(false);

  const envoyer = (h: Habillage) => {
    const cadre = cadreRef.current?.contentWindow;
    if (cadre) cadre.postMessage(messageHabillage(h), window.location.origin);
  };

  /* Chaque changement habille le jeu aussitôt ; au chargement du cadre,
     on renvoie l'habillage courant (le jeu écoute dès son arrivée). */
  useEffect(() => {
    if (pretRef.current) envoyer(habillage);
  }, [habillage]);

  /* Si le cadre a déjà fini de charger avant l'hydratation, l'événement
     onLoad est manqué (le cadre charge pendant le HTML SSR, avant que
     React attache son écouteur) — on rattrape alors l'envoi au montage. */
  useEffect(() => {
    const cadre = cadreRef.current;
    if (cadre && cadre.contentDocument?.readyState === "complete") {
      pretRef.current = true;
      envoyer(habillage);
    }
  }, []);

  const surChargementCadre = () => {
    pretRef.current = true;
    envoyer(habillage);
  };

  const surLogo = (fichier: File | undefined) => {
    setMessageLogo("");
    if (!fichier) {
      setHabillage((h) => ({ ...h, logo: null }));
      return;
    }
    if (!fichier.type.startsWith("image/")) {
      setMessageLogo("Ce fichier n'est pas une image — choisissez un fichier image (PNG, JPG…).");
      return;
    }
    const lecteur = new FileReader();
    lecteur.onload = () => {
      /* Lecture locale seulement : la donnée reste dans cette page,
         elle n'est envoyée à aucun serveur. */
      setHabillage((h) => ({ ...h, logo: String(lecteur.result) }));
    };
    lecteur.onerror = () => {
      setMessageLogo("Impossible de lire ce fichier — essayez une autre image.");
    };
    lecteur.readAsDataURL(fichier);
  };

  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
      <p style={{ fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase", fontSize: 13 }}>
        Jeux à votre image
      </p>
      <h1>Voyez votre jeu, à vos couleurs.</h1>
      <p style={{ fontSize: 18, lineHeight: 1.55, maxWidth: 640 }}>
        Entrez le nom de votre commerce, vos deux couleurs et votre logo — le jeu
        ci-dessous s&apos;habille aussitôt, et vous pouvez y jouer. C&apos;est un
        aperçu du moteur Course (Caribou Run) : le jeu livré portera votre nom
        et vos couleurs, pour toujours.
      </p>
      <p style={{ fontSize: 18, lineHeight: 1.55, maxWidth: 640 }}>
        Un petit jeu qui porte votre nom et vos couleurs, que vos clients
        peuvent jouer et partager s&apos;ils en ont envie, au lieu d&apos;une
        publicité qu&apos;ils subissent.
      </p>
      <p style={{ maxWidth: 640, lineHeight: 1.55 }}>
        <strong>Aperçu gratuit, sans engagement, sans compte.</strong> Votre logo
        est lu ici, dans votre navigateur — il ne quitte jamais votre appareil
        et n&apos;est envoyé nulle part.
      </p>

      <section
        aria-label="Habiller votre jeu"
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          margin: "24px 0",
        }}
      >
        <div>
          <label htmlFor="apercu-nom" style={{ display: "block", fontWeight: 800, marginBottom: 6 }}>
            Nom de votre commerce
          </label>
          <input
            id="apercu-nom"
            type="text"
            value={habillage.nom}
            onChange={(e) => setHabillage((h) => ({ ...h, nom: e.target.value }))}
            placeholder="Ex. : Boulangerie du coin"
            maxLength={60}
            style={{ width: "100%", padding: "10px 12px", fontSize: 16, borderRadius: 10, border: "1px solid #999" }}
          />
        </div>
        <div>
          <label htmlFor="apercu-c1" style={{ display: "block", fontWeight: 800, marginBottom: 6 }}>
            Couleur principale
          </label>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              id="apercu-c1"
              type="color"
              value={habillage.couleurPrincipale}
              onChange={(e) => setHabillage((h) => ({ ...h, couleurPrincipale: e.target.value }))}
              style={{ width: 48, height: 40, padding: 2, borderRadius: 10, border: "1px solid #999" }}
            />
            <code>{habillage.couleurPrincipale}</code>
          </div>
        </div>
        <div>
          <label htmlFor="apercu-c2" style={{ display: "block", fontWeight: 800, marginBottom: 6 }}>
            Couleur d&apos;accent
          </label>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              id="apercu-c2"
              type="color"
              value={habillage.couleurAccent}
              onChange={(e) => setHabillage((h) => ({ ...h, couleurAccent: e.target.value }))}
              style={{ width: 48, height: 40, padding: 2, borderRadius: 10, border: "1px solid #999" }}
            />
            <code>{habillage.couleurAccent}</code>
          </div>
        </div>
        <div>
          <label htmlFor="apercu-logo" style={{ display: "block", fontWeight: 800, marginBottom: 6 }}>
            Votre logo (facultatif)
          </label>
          <input
            id="apercu-logo"
            type="file"
            accept="image/*"
            onChange={(e) => surLogo(e.target.files?.[0])}
            style={{ width: "100%", fontSize: 15 }}
          />
          {habillage.logo && (
            <button
              type="button"
              onClick={() => surLogo(undefined)}
              style={{ marginTop: 8, fontSize: 14, padding: "6px 12px", borderRadius: 999, cursor: "pointer" }}
            >
              Retirer le logo
            </button>
          )}
          {messageLogo && (
            <p role="alert" style={{ color: "#8e241c", fontWeight: 700 }}>
              {messageLogo}
            </p>
          )}
        </div>
      </section>

      <section aria-label="Votre jeu habillé">
        <iframe
          ref={cadreRef}
          src={JEU_APERCU}
          title="Aperçu de votre jeu Course, habillé à vos couleurs"
          onLoad={surChargementCadre}
          style={{ width: "100%", height: 560, border: "1px solid #ccc", borderRadius: 16 }}
        />
        <p style={{ lineHeight: 1.55 }}>
          Le jeu est jouable tel quel : touchez, ou utilisez les flèches et la barre
          d&apos;espace. Si l&apos;aperçu vous plaît,{" "}
          <Link to="/contact">écrivez à la direction humaine</Link> — un humain
          vous répond sous 3 jours ouvrables.
        </p>
      </section>
    </main>
  );
}
