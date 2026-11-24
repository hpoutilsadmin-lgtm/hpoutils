import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/outils_/verifie-avant-de-payer")({
  head: () =>
    createSeoHead({
      title: "Vérifie avant de payer | Outil gratuit anti-faux-président",
      description:
        "Un outil gratuit pour vérifier une demande de paiement avant de payer : cochez ce qui décrit la demande, suivez la règle d'or STOP — VÉRIFIE — CONFIRME, et convenez d'un mot de code en famille ou au travail.",
      path: "/outils/verifie-avant-de-payer",
    }),
  component: Page,
});

type Signal = {
  id: string;
  texte: string;
  detail: string;
  rouge: boolean;
};

const SIGNAUX: Signal[] = [
  {
    id: "urgence",
    texte: "« Il faut payer tout de suite. »",
    detail: "La demande insiste sur l'urgence : aujourd'hui, avant midi, avant la fin de journée.",
    rouge: false,
  },
  {
    id: "secret",
    texte: "« Ne dis à personne. »",
    detail:
      "On vous demande de garder la demande secrète, même envers vos collègues ou votre comptable.",
    rouge: false,
  },
  {
    id: "nouveau-compte",
    texte: "Le compte bancaire est nouveau ou vient de changer",
    detail:
      "Les coordonnées bancaires du fournisseur ou du partenaire ne sont plus celles que vous connaissez.",
    rouge: true,
  },
  {
    id: "compte-etranger",
    texte: "Le compte est à l'étranger",
    detail:
      "Le virement doit partir vers un autre pays, sans raison liée à votre activité habituelle.",
    rouge: true,
  },
  {
    id: "voix-presse",
    texte: "Un appel ou une voix vous presse pendant que vous lisez le message",
    detail:
      "Quelqu'un vous appelle en même temps pour vous pousser à payer vite, ou la voix ressemble à celle d'un dirigeant.",
    rouge: false,
  },
  {
    id: "faux-avocat",
    texte: "Une deuxième personne confirme que c'est urgent",
    detail:
      "Un « avocat », un « comptable » ou un « fournisseur » valide la demande par courriel ou par téléphone.",
    rouge: false,
  },
  {
    id: "adresse-presque",
    texte: "L'adresse courriel ressemble à la vraie, à une lettre près",
    detail:
      "Un point, un tiret ou une lettre en plus ou en moins — l'adresse n'est pas exactement celle que vous connaissez.",
    rouge: false,
  },
  {
    id: "montant-inhabituel",
    texte: "Le montant est inhabituel",
    detail:
      "Un montant que vous n'avez jamais vu pour ce type de paiement, ou un arrondi qui ne ressemble à aucune facture.",
    rouge: false,
  },
  {
    id: "contourne",
    texte: "La demande contourne la procédure habituelle",
    detail:
      "Aucun bon de commande, aucune deuxième signature, aucun document : on vous demande de payer autrement que d'habitude.",
    rouge: true,
  },
  {
    id: "canal-inhabituel",
    texte: "La demande arrive par un canal inhabituel",
    detail:
      "Un dirigeant qui écrit d'habitude par courriel professionnel vous écrit par courriel personnel, par texto ou d'un nouveau numéro.",
    rouge: false,
  },
];

const MOTS_IDEES = [
  "sirop",
  "tuque",
  "bleuet",
  "canot",
  "frigo",
  "raquette",
  "cabane",
  "sapin",
  "mitaines",
  "patinoire",
  "érable",
  "kayak",
  "bottes",
  "chocolat",
  "fromage",
  "pomme",
  "traîneau",
  "lanterne",
  "ruisseau",
  "citrouille",
  "moulin",
  "berceuse",
  "flocon",
  "sentier",
];

function Page() {
  const [coches, setCoches] = useState<Record<string, boolean>>({});
  const [idee, setIdee] = useState<string>("Touchez « Autre idée » pour commencer.");

  const score = useMemo(
    () => SIGNAUX.reduce((total, s) => total + (coches[s.id] ? (s.rouge ? 2 : 1) : 0), 0),
    [coches],
  );
  const nbCoches = useMemo(() => SIGNAUX.filter((s) => coches[s.id]).length, [coches]);
  const unRouge = useMemo(() => SIGNAUX.some((s) => coches[s.id] && s.rouge), [coches]);

  const verdict = score === 0 ? "ok" : score === 1 ? "averifier" : "nepaiepas";

  function basculer(id: string) {
    setCoches((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toutEffacer() {
    setCoches({});
  }

  function autreIdee() {
    const mot = MOTS_IDEES[Math.floor(Math.random() * MOTS_IDEES.length)];
    const nombre = 10 + Math.floor(Math.random() * 90);
    setIdee(`${mot} – ${nombre}`);
  }

  return (
    <section className="subpage-content">
      <style>{`
        .subpage-content :focus-visible { outline: 3px solid #a3482f; outline-offset: 2px; }
        @media print {
          body * { visibility: hidden; }
          #carte-frigo, #carte-frigo * { visibility: visible; }
          #carte-frigo { position: absolute; top: 0; left: 0; width: 100%; }
        }
      `}</style>
      <div className="container" style={{ maxWidth: 1100, padding: "32px 16px 64px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: "rgba(176,74,47,.12)",
              color: "#b04a2f",
              padding: "4px 10px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: ".04em",
              textTransform: "uppercase",
            }}
          >
            Outil gratuit
          </span>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link to="/boite" className="btn-ghost">
              ← Retour à La Boîte à outils
            </Link>
            <a className="btn-ghost" href="/boite/#verifie-avant-de-payer">
              Ouvrir dans La Boîte
            </a>
          </div>
        </div>

        <p
          style={{
            background: "#f6e1d8",
            border: "2px solid #a3482f",
            borderRadius: 12,
            padding: "14px 18px",
            fontSize: 17,
            lineHeight: 1.55,
            margin: "0 0 24px",
          }}
        >
          <strong>On vous presse de payer ? Ne payez rien pour l'instant.</strong> Cochez ce
          qui décrit la demande ci-dessous — cela prend une minute. Le verdict vous dira quoi
          faire ensuite.
        </p>

        <header style={{ marginBottom: 24 }}>
          <h1 style={{ marginBottom: 8 }}>Vérifie avant de payer</h1>
          <p className="lead" style={{ marginBottom: 16 }}>
            Une demande de paiement qui ressemble à un ordre du patron — mais qui n'en est pas un.
          </p>
          <p style={{ marginBottom: 12 }}>
            C'est le stratagème qu'on appelle la « fraude du président » : une personne se fait
            passer pour un dirigeant et demande un virement urgent et secret. En 2025, les
            Canadiens ont déclaré plus de 704 millions de dollars perdus par fraude — la pire
            année jamais enregistrée (Centre antifraude du Canada, 25 février 2026) — et
            seulement 5 à 10 % des fraudes sont déclarées (Centre antifraude du Canada, 6 mars
            2026). David Shipley (Beauceron Security), témoin entendu par le Comité de
            l'industrie de la Chambre des communes, estime le coût réel entre 7 et 14 milliards
            de dollars (rapport du Comité, novembre 2026). Au Québec, le Groupe TYT de
            Drummondville a perdu environ 1,43 million
            de dollars en 2020 après cinq virements vers la Chine ; la Cour supérieure du Québec a
            rendu sa décision le 11 mai 2026. Le CIUSSS du Centre-Sud-de-l'Île-de-Montréal a perdu
            environ 310 000 $ en 2017-2018 ; la peine de 30 mois a été annoncée le 24 septembre
            2026. En janvier 2024, à Hong Kong, des employés ont transféré 25,6 millions de
            dollars américains (200 millions de dollars de Hong Kong) après une fausse réunion
            vidéo où les visages et les voix des dirigeants avaient été imités : même en vidéo,
            même avec une voix familière, la voix et le visage ne prouvent plus rien.
          </p>
          <p style={{ marginBottom: 12 }}>
            La défense, ce n'est pas d'être plus vigilant : c'est un processus. Cochez ce qui décrit
            la demande, puis suivez la règle d'or. Tout se passe ici, dans votre appareil : rien
            n'est envoyé, rien n'est enregistré. Rien de ce que vous cochez ne quitte votre
            appareil.
          </p>
          <p style={{ marginBottom: 0, fontSize: 15, color: "rgba(58,42,32,.75)" }}>
            Chiffres vérifiés le 24 novembre 2026 — sources : Centre antifraude du Canada, Sûreté
            du Québec, AMF, SPVM, Centre canadien pour la cybersécurité.
          </p>
        </header>

        <p
          style={{
            background: "#f6e1d8",
            border: "2px solid #a3482f",
            borderRadius: 12,
            padding: "14px 18px",
            fontSize: 16,
            lineHeight: 1.55,
            margin: "0 0 24px",
          }}
        >
          <strong>Important :</strong> cet outil ne peut pas confirmer une fraude. Il signale
          seulement des ressemblances avec un stratagème connu. « Nous ne pouvons pas confirmer une
          fraude » — seule une vérification humaine, par un canal que vous connaissez déjà, peut
          trancher. En cas de doute, ne payez pas et vérifiez.
        </p>

        {/* ---------- La liste de vérification ---------- */}
        <h2 style={{ margin: "8px 0 6px" }}>1. Cochez ce qui décrit la demande</h2>
        <p style={{ margin: "0 0 16px" }}>
          Cochez tout ce qui s'applique — même si un seul élément vous semble petit. Un élément
          marqué « Signal fort » pèse plus lourd : un seul suffit pour ne pas payer sans
          vérifier ; deux éléments, même petits, suffisent aussi.
        </p>

        <fieldset
          style={{
            display: "grid",
            gap: 10,
            border: 0,
            padding: 0,
            margin: "0 0 16px",
          }}
        >
          <legend style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, padding: 0 }}>
            Cochez ce qui décrit la demande
          </legend>
          {SIGNAUX.map((s) => {
            const actif = !!coches[s.id];
            return (
              <label
                key={s.id}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  border: actif ? "2px solid #a3482f" : "2px solid rgba(58,42,32,.25)",
                  background: actif ? "#fdf3ee" : "transparent",
                  borderRadius: 14,
                  padding: "14px 16px",
                  cursor: "pointer",
                  minHeight: 52,
                }}
              >
                <input
                  type="checkbox"
                  checked={actif}
                  onChange={() => basculer(s.id)}
                  style={{
                    width: 26,
                    height: 26,
                    flex: "none",
                    marginTop: 2,
                    accentColor: "#a3482f",
                  }}
                />
                <span style={{ fontSize: 16, lineHeight: 1.5 }}>
                  <strong>
                    {s.rouge ? "Signal fort : " : ""}
                    {s.texte}
                  </strong>
                  <br />
                  <span style={{ color: "rgba(58,42,32,.75)" }}>{s.detail}</span>
                </span>
              </label>
            );
          })}
        </fieldset>

        <p style={{ margin: "0 0 16px", fontSize: 15, color: "rgba(58,42,32,.75)" }}>
          La règle : aucun élément coché, suivez la procédure habituelle ; un seul élément,
          vérifiez avant de payer ; un élément « Signal fort », ou deux éléments, ne payez pas
          sans vérifier.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
          <button
            type="button"
            className="btn-ghost"
            onClick={toutEffacer}
            style={{ minHeight: 48 }}
          >
            Tout effacer
          </button>
          <span
            aria-live="polite"
            style={{ alignSelf: "center", fontSize: 15, color: "rgba(58,42,32,.75)" }}
          >
            {nbCoches === 0
              ? "Aucun élément coché."
              : `${nbCoches} élément${nbCoches > 1 ? "s" : ""} coché${nbCoches > 1 ? "s" : ""}.`}
          </span>
        </div>

        <p
          style={{
            background: "#f4e8cf",
            borderLeft: "6px solid #8a5a1b",
            borderRadius: 10,
            padding: "16px 20px",
            fontSize: 16,
            lineHeight: 1.55,
            margin: "0 0 24px",
          }}
        >
          <strong>Astuce du SPVM :</strong> demandez le numéro où rappeler la personne, en
          prétextant que vous êtes trop occupé pour lui parler en ce moment. Dans 99 % des cas,
          les fraudeurs raccrochent — parce qu'ils ne veulent pas donner de numéro pour les
          contacter. Ne vous fiez jamais à l'afficheur : la banque ou la police ne vous
          demanderont jamais de remettre une carte bancaire ni de dévoiler un NIP.
        </p>

        {/* ---------- Le verdict ---------- */}
        <div
          aria-live="polite"
          style={{
            border: `3px solid ${verdict === "ok" ? "#2e6b45" : verdict === "averifier" ? "#8a5a1b" : "#a83a2c"}`,
            borderRadius: 20,
            padding: "clamp(20px, 5vw, 32px)",
            marginBottom: 32,
            background: "#fffdf8",
          }}
        >
          {verdict === "ok" && (
            <>
              <p
                style={{
                  margin: "0 0 4px",
                  fontWeight: 700,
                  color: "#2e6b45",
                  fontSize: 13,
                  letterSpacing: ".05em",
                  textTransform: "uppercase",
                }}
              >
                Aucun signal coché
              </p>
              <h3 style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", margin: ".1em 0 .3em" }}>
                OK — suivez quand même la procédure habituelle
              </h3>
              <p style={{ margin: "0 0 12px" }}>
                Rien de ce que vous avez coché ne ressemble aux signaux connus de la fraude du
                président. Cela ne prouve pas que la demande est légitime : cela veut seulement dire
                qu'aucun signal connu n'a été repéré ici.
              </p>
              <ol
                style={{
                  margin: 0,
                  paddingLeft: "1.4em",
                  display: "grid",
                  gap: 8,
                  lineHeight: 1.55,
                }}
              >
                <li>Payez par la procédure habituelle, avec les validations habituelles.</li>
                <li>
                  Si quelque chose vous semble bizarre en cours de route, arrêtez-vous et
                  recommencez la vérification.
                </li>
              </ol>
            </>
          )}
          {verdict === "averifier" && (
            <>
              <p
                style={{
                  margin: "0 0 4px",
                  fontWeight: 700,
                  color: "#8a5a1b",
                  fontSize: 13,
                  letterSpacing: ".05em",
                  textTransform: "uppercase",
                }}
              >
                Un signal coché
              </p>
              <h3 style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", margin: ".1em 0 .3em" }}>
                À vérifier — ne payez pas tout de suite
              </h3>
              <p style={{ margin: "0 0 12px" }}>
                Un élément ressemble à un stratagème connu. Nous ne pouvons pas confirmer une fraude
                — mais une vérification humaine s'impose avant tout paiement.
              </p>
              <ol
                style={{
                  margin: 0,
                  paddingLeft: "1.4em",
                  display: "grid",
                  gap: 8,
                  lineHeight: 1.55,
                }}
              >
                <li>
                  Raccrochez, fermez le courriel, et rappelez la personne au numéro que vous
                  connaissez déjà — jamais à celui du message.
                </li>
                <li>Demandez-lui de confirmer la demande de vive voix, avec vos mots à vous.</li>
                <li>Faites valider par une deuxième personne avant de payer.</li>
              </ol>
            </>
          )}
          {verdict === "nepaiepas" && (
            <>
              <p
                style={{
                  margin: "0 0 4px",
                  fontWeight: 700,
                  color: "#a83a2c",
                  fontSize: 13,
                  letterSpacing: ".05em",
                  textTransform: "uppercase",
                }}
              >
                {nbCoches} {nbCoches > 1 ? "signaux" : "signal"} coché{nbCoches > 1 ? "s" : ""}
                {unRouge ? " — dont un signal fort" : ""}
              </p>
              <h3 style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", margin: ".1em 0 .3em" }}>
                Ne paie pas — vérifiez d'abord
              </h3>
              <p style={{ margin: "0 0 12px" }}>
                Plusieurs éléments — ou un élément fort — ressemblent au stratagème de la fraude du
                président. Nous ne pouvons pas confirmer une fraude, mais ne payez rien tant que la
                vérification n'est pas faite. Un virement parti se récupère rarement : il est
                transféré ailleurs en quelques minutes.
              </p>
              <ol
                style={{
                  margin: 0,
                  paddingLeft: "1.4em",
                  display: "grid",
                  gap: 8,
                  lineHeight: 1.55,
                }}
              >
                <li>
                  <strong>Ne payez pas.</strong> Ne répondez pas au message, ne cliquez sur rien.
                </li>
                <li>
                  <strong>Rappelez au numéro déjà connu.</strong> Appelez le dirigeant ou le
                  fournisseur au numéro enregistré dans vos contacts — jamais à celui du message.
                </li>
                <li>
                  <strong>Demandez le mot de code.</strong> Si vous en avez convenu un ensemble,
                  demandez-le. Une imitation ne peut pas le deviner.
                </li>
                <li>
                  <strong>Faites valider par une deuxième personne</strong> au-dessus du seuil que
                  vous avez fixé ensemble.
                </li>
                <li>
                  <strong>Prévenez votre banque</strong> si un paiement a déjà été lancé, et
                  signalez la tentative au Centre antifraude du Canada :{" "}
                  <a href="tel:+18884958501">1-888-495-8501</a> (10 h à 16 h 45, heure de l'Est,
                  du lundi au vendredi ; fermé les jours fériés).
                </li>
                <li>
                  <strong>Même si vous n'avez rien payé, signalez la tentative.</strong> Une
                  tentative est déjà un acte criminel, même sans perte d'argent. Signalez en
                  ligne, à toute heure, sur{" "}
                  <a href="https://signalercyberetfraude.canada.ca/">
                    signalercyberetfraude.canada.ca
                  </a>{" "}
                  (signalement anonyme possible), ou par téléphone au{" "}
                  <a href="tel:+18884958501">1-888-495-8501</a>. Signalez aussi à votre service
                  de police local.
                </li>
                <li>
                  <strong>Ne vous blâmez pas.</strong> Ces messages trompent même des gens très
                  prudents — n'ayez pas peur ni honte de signaler.
                </li>
              </ol>
              <a
                className="btn-primary"
                href="tel:+18884958501"
                style={{ display: "inline-block", minHeight: 48, padding: "12px 20px", marginTop: 16 }}
              >
                Appeler le Centre antifraude du Canada : 1-888-495-8501
              </a>
            </>
          )}
        </div>

        {/* ---------- La règle d'or ---------- */}
        <h2 id="regle-dor" style={{ margin: "8px 0 6px", scrollMarginTop: 90 }}>
          2. La règle d'or : STOP — VÉRIFIE — CONFIRME
        </h2>
        <p style={{ margin: "0 0 16px" }}>
          Trois gestes, dans cet ordre, à chaque demande de paiement urgente. Écrivez-les et
          affichez-les là où les paiements se décident.
        </p>
        <div style={{ display: "grid", gap: 12, marginBottom: 16 }}>
          <div style={{ border: "2px solid #a3482f", borderRadius: 16, padding: "18px 20px" }}>
            <h3 style={{ margin: "0 0 6px" }}>STOP — On ne paie pas sous pression</h3>
            <p style={{ margin: 0, lineHeight: 1.55 }}>
              Une demande urgente, secrète, qui contourne la procédure : on s'arrête. L'urgence fait
              partie du piège — un vrai besoin supporte très bien quelques minutes d'attente.
            </p>
          </div>
          <div style={{ border: "2px solid #a3482f", borderRadius: 16, padding: "18px 20px" }}>
            <h3 style={{ margin: "0 0 6px" }}>VÉRIFIE — On rappelle au numéro déjà connu</h3>
            <p style={{ margin: 0, lineHeight: 1.55 }}>
              Raccrochez, puis rappelez la personne au numéro enregistré dans vos contacts ou écrit
              sur papier — jamais au numéro que le message vous donne, jamais en rappelant le numéro
              affiché si vous ne le reconnaissez pas. Si c'est vraiment elle, elle répondra à son
              vrai numéro.
            </p>
          </div>
          <div style={{ border: "2px solid #a3482f", borderRadius: 16, padding: "18px 20px" }}>
            <h3 style={{ margin: "0 0 6px" }}>CONFIRME — Mot de code et deuxième personne</h3>
            <p style={{ margin: 0, lineHeight: 1.55 }}>
              Demandez le mot de code convenu en personne, à l'avance. Et au-dessus du seuil que
              vous avez fixé ensemble, une deuxième personne valide le paiement avant qu'il parte.
              Deux paires d'yeux valent mieux qu'une. Au travail, convenez d'une phrase de
              vérification entre les personnes qui peuvent demander ou approuver un paiement —
              par exemple lors d'une réunion, jamais par courriel. Changez-la quand une personne
              quitte son poste ou si vous pensez qu'elle a été entendue.
            </p>
          </div>
        </div>
        <p
          style={{
            background: "#f4e8cf",
            borderLeft: "6px solid #8a5a1b",
            borderRadius: 10,
            padding: "16px 20px",
            fontSize: 17,
            lineHeight: 1.55,
            margin: "0 0 32px",
          }}
        >
          <strong>Règle écrite :</strong> « Aucun dirigeant ne demandera jamais un paiement en
          contournant la procédure. » Si une demande contourne la procédure, ce n'est pas une
          exception : c'est le signal d'arrêter et de vérifier.
        </p>
        <p
          style={{
            background: "#f4e8cf",
            borderLeft: "6px solid #8a5a1b",
            borderRadius: 10,
            padding: "16px 20px",
            fontSize: 16,
            lineHeight: 1.55,
            margin: "0 0 32px",
          }}
        >
          <strong>Exemple :</strong> vous recevez un courriel du président, en réunion, qui vous
          demande un virement confidentiel avant 15 h vers un nouveau compte — et un « avocat »
          vous appelle pour confirmer. Cochez : urgence, secret, nouveau compte, faux avocat.
          Votre résultat : Ne paie pas.
        </p>

        {/* ---------- Argent déjà envoyé ? ---------- */}
        <h2 id="argent-envoye" style={{ margin: "8px 0 6px", scrollMarginTop: 90 }}>
          3. Argent déjà envoyé ? Agissez vite, dans cet ordre
        </h2>
        <p style={{ margin: "0 0 16px" }}>
          Un virement parti se récupère rarement : il est transféré ailleurs en quelques minutes.
          Mais chaque minute compte — plus vous agissez vite, plus vous avez de chances de le
          bloquer ou d'en récupérer une partie.
        </p>
        <ol
          style={{
            margin: "0 0 16px",
            paddingLeft: "1.4em",
            display: "grid",
            gap: 10,
            lineHeight: 1.55,
          }}
        >
          <li>
            <strong>Appelez votre banque ou l'émetteur de votre carte tout de suite.</strong>{" "}
            Composez le numéro officiel que vous connaissez déjà — au dos de votre carte, par
            exemple — jamais celui du message. Demandez le blocage ou le rappel du virement.
          </li>
          <li>
            <strong>Appelez votre police locale.</strong> Signalez les faits et gardez le numéro
            de dossier.
          </li>
          <li>
            <strong>
              Signalez au Centre antifraude du Canada :{" "}
              <a href="tel:+18884958501">1-888-495-8501</a>
            </strong>{" "}
            (10 h à 16 h 45, heure de l'Est, du lundi au vendredi ; fermé les jours fériés) ou
            en ligne à{" "}
            <a href="https://signalercyberetfraude.canada.ca/">
              signalercyberetfraude.canada.ca
            </a>
            .
            Le signalement compte même si vous n'avez rien perdu.
          </li>
        </ol>
        <p style={{ margin: "0 0 32px" }}>
          <strong>
            Vous ne devez pas avoir honte si vous êtes victime : le fraudeur est un excellent
            manipulateur. Dénoncez-le.
          </strong>{" "}
          (SPVM)
        </p>

        {/* ---------- Le mot de code ---------- */}
        <h2 id="mot-de-code" style={{ margin: "8px 0 6px", scrollMarginTop: 90 }}>
          4. Le mot de code : un mot secret que seuls vos vrais proches connaissent
        </h2>
        <p style={{ margin: "0 0 16px" }}>
          Certaines arnaques imitent la voix d'un proche — un enfant, un parent, un conjoint — qui
          appelle en panique et demande de l'argent ou un code, tout de suite. La voix peut sembler
          vraie. Cet outil ne sert pas à deviner si une voix est vraie ou fausse : il sert à
          vérifier autrement, par un mot et des gestes que l'imitation ne peut pas deviner. Vous
          n'avez pas à être expert en technologie. Vous avez juste besoin d'un accord pris à
          l'avance, au calme, entre vous.
        </p>

        <h3 style={{ margin: "20px 0 8px" }}>Choisissez ensemble votre mot</h3>
        <p style={{ margin: "0 0 8px" }}>
          Choisissez ensemble un mot ou une courte phrase que seuls les vrais proches connaissent.
          Au téléphone, si un « proche » vous demande quelque chose d'urgent, vous lui demandez le
          mot. S'il ne le connaît pas, vous raccrochez — peu importe la voix.
        </p>
        <p style={{ margin: "0 0 8px" }}>
          <strong>De bons formats — à vous d'inventer le vôtre :</strong>
        </p>
        <ul
          style={{
            margin: "0 0 12px",
            paddingLeft: "1.25em",
            display: "grid",
            gap: 6,
            lineHeight: 1.55,
          }}
        >
          <li>
            Une phrase drôle de famille — quelque chose qui vous fait rire entre vous et que
            personne d'autre ne connaît.
          </li>
          <li>
            Un mot inventé + un chiffre — un mot qui n'existe pas, suivi d'un nombre facile à
            retenir pour vous.
          </li>
          <li>
            Un souvenir précis — le surnom d'un objet, d'un lieu ou d'un repas dont vous seuls
            parlez.
          </li>
        </ul>
        <p style={{ margin: "0 0 8px" }}>
          <strong>À éviter :</strong> le nom d'un animal, d'un enfant ou d'un proche (trop facile à
          trouver) ; une date de naissance ou une adresse (quelqu'un d'autre peut les connaître) ;
          un mot déjà utilisé comme mot de passe ailleurs.
        </p>
        <p style={{ margin: "0 0 16px" }}>
          <strong>Écrivez-le sur papier, au calme, en famille.</strong> Ne le photographiez pas, ne
          l'envoyez pas par texto et ne le mettez pas sur les réseaux sociaux.
        </p>

        <div
          style={{
            border: "2px solid rgba(58,42,32,.5)",
            borderRadius: 14,
            padding: "16px 18px",
            textAlign: "center",
            margin: "0 0 24px",
          }}
        >
          <p style={{ margin: "0 0 8px" }}>
            <strong>Besoin d'une idée ?</strong> Ceci est une idée à transformer ensemble, pas une
            réponse à copier. L'outil ne la garde pas : si elle vous plaît, écrivez-la sur papier.
          </p>
          <p style={{ fontSize: 28, fontWeight: 700, margin: "10px 0" }}>{idee}</p>
          <button
            type="button"
            className="btn-primary"
            onClick={autreIdee}
            style={{ minHeight: 48, padding: "8px 20px" }}
          >
            Autre idée
          </button>
          <p style={{ fontSize: 15, margin: "10px 0 0" }}>
            Cet outil ne vous demande jamais votre vrai mot secret : il ne l'enregistre pas, ne
            l'envoie pas.
          </p>
        </div>

        <h3 style={{ margin: "20px 0 8px" }}>Les 3 vérifications</h3>
        <p style={{ margin: "0 0 12px" }}>
          Quand un « proche » appelle en panique et demande de l'argent, un virement, des cartes ou
          un code : on ne décide rien pendant l'appel. On vérifie, dans cet ordre.
        </p>
        <ol
          style={{
            margin: "0 0 16px",
            paddingLeft: "1.4em",
            display: "grid",
            gap: 10,
            lineHeight: 1.55,
          }}
        >
          <li>
            <strong>Raccrocher et rappeler au vrai numéro.</strong> Raccrochez, même au milieu d'une
            phrase. Puis rappelez la personne au numéro déjà enregistré dans votre téléphone ou
            écrit ci-dessous — jamais au numéro que l'appelant vous donne, jamais en rappelant le
            numéro affiché si vous ne le reconnaissez pas. Si c'est vraiment votre proche, il
            répondra à son vrai numéro.
          </li>
          <li>
            <strong>Poser la question dont seul le vrai proche connaît la réponse.</strong> Demandez
            votre mot secret ou posez votre question personnelle. Une imitation peut copier une voix
            — elle ne peut pas deviner ce que vous n'avez jamais dit publiquement.
          </li>
          <li>
            <strong>Attendre et en parler à quelqu'un avant tout envoi.</strong> N'envoyez rien
            sur-le-champ : ni argent, ni code, ni numéro. Appelez une personne de confiance,
            racontez l'appel à voix haute et décidez ensemble. L'urgence fait partie du piège — un
            vrai besoin supporte très bien quelques minutes d'attente.
          </li>
        </ol>

        <div
          style={{
            border: "2px solid rgba(58,42,32,.5)",
            borderRadius: 14,
            padding: "14px 18px",
            margin: "0 0 24px",
          }}
        >
          <p style={{ margin: "0 0 6px" }}>
            <strong>Phrases toutes prêtes, si vous manquez de mots sur le moment :</strong>
          </p>
          <p style={{ margin: "6px 0" }}>
            « Je vous rappelle à votre numéro habituel dans deux minutes. »
            <br />
            « C'est quoi notre mot de famille ? »
            <br />« Je ne décide jamais d'argent au téléphone. Je vérifie et je vous rappelle. »
          </p>
          <p style={{ margin: "6px 0 0", fontSize: 15 }}>
            Vous pouvez raccrocher sans vous justifier davantage. La politesse vient après la
            vérification, pas avant. Personne ne vous en voudra jamais d'avoir raccroché pour
            vérifier — un vrai proche comprendra toujours.
          </p>
        </div>

        <h3 style={{ margin: "20px 0 8px" }}>Si vous avez envoyé quelque chose</h3>
        <p style={{ margin: "0 0 8px" }}>
          Ne vous blâmez pas — ça arrive à des gens très prudents, parce que ces appels sont faits
          pour vous précipiter. Agissez vite et parlez-en :
        </p>
        <ul
          style={{
            margin: "0 0 12px",
            paddingLeft: "1.25em",
            display: "grid",
            gap: 6,
            lineHeight: 1.55,
          }}
        >
          <li>
            Appelez votre institution financière au numéro officiel que vous connaissez déjà (par
            exemple au dos de votre carte) et racontez ce qui s'est passé.
          </li>
          <li>Prévenez le vrai proche dont la voix aurait été imitée.</li>
          <li>Notez tout ce dont vous vous souvenez, pendant que c'est frais.</li>
          <li>Changez votre mot secret familial si vous l'avez dit pendant l'appel.</li>
          <li>
            Signalez l'appel au{" "}
            <strong>
              Centre antifraude du Canada : <a href="tel:+18884958501">1-888-495-8501</a>
            </strong>{" "}
            (10 h à 16 h 45, heure de l'Est, du lundi au vendredi ; fermé les jours fériés) et
            à votre service de police
            local.
          </li>
        </ul>
        <p style={{ margin: "0 0 24px", fontSize: 15 }}>
          Rappel : aucune agence gouvernementale, institution ou autre organisme ne demande un
          paiement par cartes prépayées ou cartes-cadeaux.
        </p>

        <h3 style={{ margin: "20px 0 8px" }}>Carte frigo</h3>
        <p style={{ margin: "0 0 12px" }}>
          Découpez ou imprimez cette carte et placez-la sur le frigo ou près du téléphone.
        </p>
        <div
          id="carte-frigo"
          style={{
            border: "2px dashed rgba(58,42,32,.6)",
            borderRadius: 14,
            padding: "16px 18px",
            margin: "0 0 8px",
          }}
        >
          <p style={{ margin: "0 0 8px" }}>
            <strong>Un appel en panique ? On vérifie d'abord.</strong>
          </p>
          <p style={{ margin: "0 0 8px", lineHeight: 1.6 }}>
            <strong>1.</strong> Je raccroche et je rappelle au <strong>vrai numéro</strong>{" "}
            enregistré.
            <br />
            <strong>2.</strong> Je demande <strong>notre mot de famille</strong> ou je pose notre
            question.
            <br />
            <strong>3.</strong> J'<strong>attends</strong> et j'en parle à quelqu'un avant tout
            envoi.
          </p>
          <p style={{ margin: "0 0 8px", fontSize: 15 }}>
            Pas d'argent, pas de code, pas de décision pendant l'appel.
          </p>
          <p style={{ margin: "12px 0 0", fontSize: 15 }}>
            La personne que j'appelle en premier en cas de doute :{" "}
            ________________________________________
          </p>
          <p style={{ margin: "8px 0 0", fontSize: 15 }}>
            Son vrai numéro : ________________________________________
          </p>
          <p style={{ margin: "12px 0 0", fontSize: 15 }}>
            N'écrivez jamais le mot secret sur cette carte si elle est visible par les visiteurs.
          </p>
        </div>
        <p style={{ margin: "0 0 32px", fontSize: 15 }}>
          Gardez vos vrais numéros écrits sur papier, dans un endroit connu de la famille, mais pas
          à la vue des visiteurs. Si un proche déménage ou change de numéro, mettez la page à jour
          et dites-le aux autres.
        </p>

        {/* ---------- Vérifiez en 1 clic ---------- */}
        <h2 id="verifications-1-clic" style={{ margin: "8px 0 6px", scrollMarginTop: 90 }}>
          5. Vérifiez en 1 clic, sans rien nous envoyer
        </h2>
        <p style={{ margin: "0 0 16px" }}>
          Ces vérifications se font directement sur les sites officiels : rien de ce que vous
          tapez ne passe par nous, et rien n'est enregistré ici.
        </p>
        <ul
          style={{
            margin: "0 0 32px",
            paddingLeft: "1.25em",
            display: "grid",
            gap: 10,
            lineHeight: 1.55,
          }}
        >
          <li>
            <strong>La personne ou l'entreprise est-elle autorisée ?</strong> Cherchez son nom
            dans le{" "}
            <a href="https://lautorite.qc.ca/">
              Registre des entreprises et des individus autorisés à exercer de l'AMF
            </a>{" "}
            (sur lautorite.qc.ca, allez à Registres), et dans la{" "}
            <a href="https://aretheyregistered.ca/">Recherche nationale d'inscription</a> des
            Autorités canadiennes en valeurs mobilières, pour tout le Canada. Vérifiez la
            personne ET l'entreprise : ce sont deux inscriptions distinctes.
          </li>
          <li>
            <strong>Le lien est-il suspect ?</strong> Copiez-le — ne cliquez jamais dessus pour
            le vérifier — puis collez-le dans{" "}
            <a href="https://www.virustotal.com/">VirusTotal</a> (vérifié contre plus de 70
            moteurs à la fois) ou sur{" "}
            <a href="https://www.scamadviser.com/">ScamAdviser</a> (score de confiance du site).
          </li>
        </ul>

        {/* ---------- Pour aller plus loin ---------- */}
        <h2 style={{ margin: "8px 0 6px" }}>Pour aller plus loin</h2>
        <p style={{ margin: "0 0 8px" }}>
          Cet outil gratuit couvre une seule situation : la demande de paiement urgente qui se fait
          passer pour un dirigeant ou un proche. Pour les autres fraudes, il existe le kit Fraude
          Sans Honte (5 $) : 12 fiches, une situation à la fois, qui complètent cet outil sans le
          répéter.
        </p>
        <p style={{ margin: "0 0 32px" }}>
          L'outil et le kit sont des compagnons : l'un vérifie avant de payer, l'autre couvre le
          reste, fiche par fiche. Cet outil ne remplace pas votre banque ni la police : il vous
          aide à décider, en une minute, si vous devez les appeler.
        </p>

        {/* ---------- Sources ---------- */}
        <h2 style={{ margin: "8px 0 6px" }}>Sources officielles</h2>
        <ul
          style={{
            margin: "0 0 24px",
            paddingLeft: "1.25em",
            display: "grid",
            gap: 6,
            lineHeight: 1.55,
          }}
        >
          <li>
            <a href="https://antifraudcentre-centreantifraude.ca/features-vedette/2026/02/top-fraud-2025-fraudes-plus-courantes-eng.htm">
              Centre antifraude du Canada — Les fraudes les plus courantes en 2025 (page modifiée
              le 25 février 2026)
            </a>
          </li>
          <li>
            <a href="https://portail-assurance.ca/article/la-victime-dune-fraude-du-president-est-en-partie-dedommagee-par-desjardins/">
              Portail de l'assurance — Groupe TYT : la victime d'une fraude du président en partie
              dédommagée (décision du 11 mai 2026)
            </a>
          </li>
          <li>
            <a href="https://www.cybersecuritepetiteenfance.com/faille-de-securite/fraude-du-president-obnl-saguenay-ciusss-courriel-cpe/">
              Cybersécurité petite enfance — Fraude du président : CIUSSS du Centre-Sud (peine
              annoncée le 24 septembre 2026)
            </a>
          </li>
          <li>
            <a href="https://spvm.qc.ca/fr/PDQ15/Actualites/15382">
              SPVM — Faux représentant : le test du rappel
            </a>
          </li>
          <li>
            <a href="https://lautorite.qc.ca/">
              AMF — Registre des entreprises et des individus autorisés à exercer (sur
              lautorite.qc.ca, section Registres)
            </a>
          </li>
          <li>
            <a href="https://aretheyregistered.ca/">
              Autorités canadiennes en valeurs mobilières — Recherche nationale d'inscription
            </a>
          </li>
          <li>
            <a href="https://www.cyber.gc.ca/fr/orientation/faire-des-achats-en-ligne-en-toute-securite-itsap00071">
              Centre canadien pour la cybersécurité — Faire des achats en ligne en toute sécurité
              (octobre 2026)
            </a>
          </li>
          <li>
            <a href="https://spvm.qc.ca/fr/Fiches/Details/Fraude-visant-des-entreprises">
              SPVM — Fraude visant des entreprises
            </a>
          </li>
          <li>
            <a href="https://grc.ca/fr/police-federale/cybercriminalite/nouvelles-sur-cybercriminalite/fraude-du-president">
              GRC — La fraude du président
            </a>
          </li>
          <li>
            <a href="https://antifraudcentre-centreantifraude.ca/report-signalez-fra.htm">
              Centre antifraude du Canada — Signaler les cas de fraude et de cybercriminalité
              (page modifiée le 27 novembre 2025)
            </a>
          </li>
          <li>
            <a href="https://antifraudcentre-centreantifraude.ca/news-nouvelles/2026/2026-03-06-fra.htm">
              Centre antifraude du Canada — Mois de la prévention de la fraude (6 mars 2026)
            </a>
          </li>
          <li>
            <a href="https://www.noscommunes.ca/Content/Committee/451/INDU/Reports/RP14305539/indurp07/indurp07-f.pdf">
              Comité de l'industrie de la Chambre des communes — Rapport sur la fraude et les
              escroqueries au Canada (novembre 2026)
            </a>
          </li>
          <li>
            <a href="https://lautorite.qc.ca/grand-public/salle-de-presse/mises-en-garde/fiche-mises-en-garde/mise-en-garde-contre-un-stratageme-de-fraude-du-president">
              AMF — Mise en garde contre un stratagème de « fraude du président » (31 mars 2022)
            </a>
          </li>
          <li>
            Centre antifraude du Canada : <a href="tel:+18884958501">1-888-495-8501</a> (10 h à 16
            h 45, heure de l'Est, du lundi au vendredi ; fermé les jours fériés) ou en ligne, à
            toute heure, sur{" "}
            <a href="https://signalercyberetfraude.canada.ca/">
              signalercyberetfraude.canada.ca
            </a>
          </li>
        </ul>

        <p style={{ margin: "0 0 24px", fontSize: 15 }}>
          Sources vérifiées le 24 novembre 2026. Nous revérifions les chiffres et les liens
          chaque année, en février, quand le Centre antifraude du Canada publie ses nouveaux
          chiffres.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link to="/boite" className="btn-ghost">
            ← Retour à La Boîte à outils
          </Link>
          <a className="btn-ghost" href="#regle-dor">
            Revoir la règle d'or ↑
          </a>
        </div>

        <p
          style={{
            marginTop: 24,
            fontSize: 13,
            color: "rgba(58,42,32,.6)",
            lineHeight: 1.6,
            textAlign: "center",
          }}
        >
          © HP 2026. Tous droits réservés. Outil d'information générale seulement, pas un avis
          juridique. En situation de danger immédiat, contactez les services d'urgence de votre
          région.
        </p>
      </div>
    </section>
  );
}
