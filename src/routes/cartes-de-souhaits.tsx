import { useRef, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";
import "./cartes-de-souhaits.css";

/* /cartes-de-souhaits — LOT-CARTES v3 (22 nov. 2026).
   Images finales : 22 WebP 800×800 dans public/images/cartes-de-souhaits/
   (10 classiques + 12 cocasses), rendues en <img> à chargement différé.
   Les SVG v2 codés ont été supprimés de la route (rejetés par HP) :
   plus aucune chaîne svg, plus d'injection de HTML brut.
   Idées croisées (lot-cartes-22nov-2026/idees-croisees-cartes.md) : sous
   l'aperçu de la carte choisie, quand la carte en a une — libellé exact,
   lien vers la vraie page HP, aucun prix. Aucune idée pour : Bonne année,
   Toilettes, Carnet, Douche, Frigo 2 h, Lundi nuage.
   Comportements gardés : tap pour ouvrir une cocasse, une seule ouverte
   à la fois ; partage = lien à copier (?carte=&pour=&message=&de=) ;
   AUCUN envoi — aucun lien courriel, aucun appel réseau. Les 12 exemples sont repris VERBATIM.
   Aucun prix, aucun paiement, aucune adresse courriel demandée. */
export const Route = createFileRoute("/cartes-de-souhaits")({
  validateSearch: (search: Record<string, unknown>): {
    carte?: string;
    pour?: string;
    message?: string;
    de?: string;
  } => ({
    carte: typeof search.carte === "string" ? search.carte : undefined,
    pour: typeof search.pour === "string" ? search.pour : undefined,
    message: typeof search.message === "string" ? search.message : undefined,
    de: typeof search.de === "string" ? search.de : undefined,
  }),
  head: () =>
    createSeoHead({
      title: "Cartes de souhaits — HP Outils",
      description:
        "Choisissez une carte de souhaits originale, écrivez votre message et partagez son lien. Gratuit, sans compte — HP Outils.",
      path: "/cartes-de-souhaits",
    }),
  component: Page,
});

type IdeeCroisee = {
  texte: ReactNode;
  lien: "/lire" | "/en-cuisine" | "/les-passeurs" | "/outils" | "/jeux" | "/ateliers";
  lienTexte: string;
};

type Carte = {
  id: string;
  nom: string;
  occasion: string;
  image: string;
  alt: string;
  idee?: IdeeCroisee;
};

type Cocasse = {
  id: string;
  dehors: string;
  dedans: string;
  image: string;
  alt: string;
  idee?: IdeeCroisee;
};

type Exemple = { titre: string; texte: string };

const CARTES: Carte[] = [
  { id:"lys", nom:"Fleur de lys", occasion:"Pensée du jour",
    image:"/images/cartes-de-souhaits/01-lys.webp", alt:"Fleur de lys gravée dans le bois",
    idee:{ texte:"À glisser avec un livre HP, pour dire je pense à toi.", lien:"/lire", lienTexte:"Voir la lecture" } },
  { id:"gateau", nom:"Gâteau d’anniversaire", occasion:"Anniversaire",
    image:"/images/cartes-de-souhaits/02-gateau-anniversaire.webp", alt:"Gâteau d’anniversaire sur l’établi de l’atelier",
    idee:{ texte:<>À offrir avec un gâteau du livre <em>Les enfants cuisinent pour faire plaisir</em>.</>, lien:"/en-cuisine", lienTexte:"Voir les recettes" } },
  { id:"sapin", nom:"Sapin de Noël", occasion:"Noël",
    image:"/images/cartes-de-souhaits/03-sapin-noel.webp", alt:"Sapin de Noël à la fenêtre de l’atelier sous la neige",
    idee:{ texte:"À offrir avec une recette des Fêtes, à cuisiner ensemble.", lien:"/en-cuisine", lienTexte:"Voir les recettes" } },
  { id:"erable", nom:"Feuille d’érable", occasion:"Remerciement",
    image:"/images/cartes-de-souhaits/04-feuille-erable.webp", alt:"Feuille d’érable gravée comme du bois",
    idee:{ texte:"À joindre à un savoir transmis, comme un Passeur.", lien:"/les-passeurs", lienTexte:"Voir les Passeurs" } },
  { id:"soleil", nom:"Soleil levant", occasion:"Encouragement",
    image:"/images/cartes-de-souhaits/05-soleil-levant.webp", alt:"Soleil levant sur les collines et un chemin clair",
    idee:{ texte:"À offrir avec un outil qui aide, de la Boîte à outils.", lien:"/outils", lienTexte:"Voir les outils" } },
  { id:"tasses", nom:"Deux tasses", occasion:"Amitié",
    image:"/images/cartes-de-souhaits/06-deux-tasses.webp", alt:"Deux tasses de café sur l’établi, vapeurs mêlées",
    idee:{ texte:"À envoyer avec une invitation à jouer ensemble.", lien:"/jeux", lienTexte:"Voir les jeux" } },
  { id:"etoiles", nom:"Bonne année", occasion:"Bonne année",
    image:"/images/cartes-de-souhaits/07-bonne-annee.webp", alt:"Feux d’artifice dorés au-dessus du village la nuit" },
  { id:"ruban", nom:"Ruban de fête", occasion:"Félicitations",
    image:"/images/cartes-de-souhaits/08-medaille.webp", alt:"Médaille de bois avec ruban rouge et étoile dorée",
    idee:{ texte:"À joindre à un atelier, pour fêter comme il faut.", lien:"/ateliers", lienTexte:"Voir les ateliers" } },
  { id:"journee", nom:"Bonne journée", occasion:"Bonne journée",
    image:"/images/cartes-de-souhaits/09-jardin.webp", alt:"Soleil à rayons gravés sur le jardin de l’atelier",
    idee:{ texte:"À glisser avec une recette du matin.", lien:"/en-cuisine", lienTexte:"Voir les recettes" } },
  { id:"fleur", nom:"Fleur qui pousse", occasion:"Rétablissement",
    image:"/images/cartes-de-souhaits/10-pousse.webp", alt:"Petite pousse dans un pot sur le rebord de la fenêtre",
    idee:{ texte:"À offrir avec un livre doux, à lire au calme.", lien:"/lire", lienTexte:"Voir la lecture" } },
];

const COCASSES: Cocasse[] = [
  { id:"cocasse-1", dehors:"Je pensais à toi dernièrement…", dedans:"…en attendant que le café passe.",
    image:"/images/cartes-de-souhaits/cocasse-01-cafe.webp", alt:"Tasse de café fumante sur l'établi en bois, lumière du matin" },
  { id:"cocasse-2", dehors:"Tu me manques…", dedans:"comme mon chargeur quand mon téléphone est à 2 %.",
    image:"/images/cartes-de-souhaits/cocasse-02-chargeur.webp", alt:"Téléphone branché à son chargeur, batterie presque vide",
    idee:{ texte:"À envoyer avec une partie de Caribou Run, pour recharger les batteries.", lien:"/jeux", lienTexte:"Voir les jeux" } },
  { id:"cocasse-3", dehors:"Je voulais te dire quelque chose de beau…", dedans:"mais je l'ai oublié en ouvrant la carte.",
    image:"/images/cartes-de-souhaits/cocasse-03-carnet.webp", alt:"Carte ouverte et vide avec un point d’interrogation gravé" },
  { id:"cocasse-4", dehors:"Tu es la plus belle chose qui me soit arrivée…", dedans:"après le café du matin.",
    image:"/images/cartes-de-souhaits/cocasse-04-tasse-endormi.webp", alt:"Tasse de café fumante avec un petit soleil levant derrière",
    idee:{ texte:"À offrir avec une recette de café du matin.", lien:"/en-cuisine", lienTexte:"Voir les recettes" } },
  { id:"cocasse-5", dehors:"Je t'aime plus que tout…", dedans:"sauf le dernier morceau de pizza. Bon, OK, je te le donne. Presque.",
    image:"/images/cartes-de-souhaits/cocasse-05-pizza.webp", alt:"Dernier morceau de pizza dorée sur une planche de bois",
    idee:{ texte:"À offrir avec la recette de pizza, à cuisiner ensemble.", lien:"/en-cuisine", lienTexte:"Voir les recettes" } },
  { id:"cocasse-6", dehors:"J'ai pensé à toi toute la journée…", dedans:"surtout quand j'ai vu qu'il restait du gâteau.",
    image:"/images/cartes-de-souhaits/cocasse-06-frigo-gateau.webp", alt:"Part de gâteau sur une assiette avec une cuillère",
    idee:{ texte:"À offrir avec la recette du gâteau.", lien:"/en-cuisine", lienTexte:"Voir les recettes" } },
  { id:"cocasse-7", dehors:"Tu illumines ma vie…", dedans:"comme la lumière du frigo à 2 h du matin.",
    image:"/images/cartes-de-souhaits/cocasse-07-frigo-2h.webp", alt:"Frigo entrouvert la nuit, lumière dorée dedans et petite lune" },
  { id:"cocasse-8", dehors:"Je te trouve formidable…", dedans:"même quand tu chantes faux sous la douche.",
    image:"/images/cartes-de-souhaits/cocasse-08-douche.webp", alt:"Pomme de douche, gouttes et notes de musique gravées" },
  { id:"cocasse-9", dehors:"J'avais une belle phrase pour toi…", dedans:"je l'ai perdue entre le salon et la cuisine.",
    image:"/images/cartes-de-souhaits/cocasse-09-phrase-perdue.webp", alt:"Petit chemin de pas gravés du salon vers la cuisine",
    idee:{ texte:"À joindre à un mot du Passeur, pour retrouver les mots.", lien:"/les-passeurs", lienTexte:"Voir les Passeurs" } },
  { id:"cocasse-10", dehors:"Tu es mon rayon de soleil…", dedans:"sauf le lundi matin. Le lundi, t'es un nuage, pis c'est correct.",
    image:"/images/cartes-de-souhaits/cocasse-10-lundi-nuage.webp", alt:"Petit nuage brun et or avec un brin de soleil qui dépasse" },
  { id:"cocasse-11", dehors:"Je voulais t'écrire un mot doux…", dedans:"mais le chien a mangé mon crayon. Pis mon mot doux.",
    image:"/images/cartes-de-souhaits/cocasse-11-chien-crayon.webp", alt:"Petit chien en silhouette avec un crayon doré dans la gueule",
    idee:{ texte:"À offrir avec un livre pour enfants, à lire avec un chien.", lien:"/lire", lienTexte:"Voir la lecture" } },
  { id:"cocasse-12", dehors:"Merci d'être dans ma vie…", dedans:"quelqu'un doit bien rire de mes blagues.",
    image:"/images/cartes-de-souhaits/cocasse-12-theatre.webp", alt:"Rideau de scène entrouvert avec une étoile dorée au centre",
    idee:{ texte:"À offrir avec un atelier, pour monter sur scène.", lien:"/ateliers", lienTexte:"Voir les ateliers" } },
];

const EXEMPLES: Exemple[] = [
  { titre:"Pensée du jour", texte:"Je voulais te dire que je pense à toi aujourd'hui. Bonne journée." },
  { titre:"Pensée du jour", texte:"Tu m'as traversé l'esprit ce matin, alors je t'envoie ce petit mot : je pense à toi, et je te souhaite une belle journée." },
  { titre:"Anniversaire", texte:"Joyeux anniversaire ! Que cette nouvelle année t'apporte autant de bonheur que tu en donnes autour de toi." },
  { titre:"Anniversaire", texte:"Un an de plus, et toujours le même sourire. Je te souhaite une journée aussi belle que toi. Joyeux anniversaire !" },
  { titre:"Noël", texte:"Je te souhaite un Noël doux et lumineux, entouré de ceux que tu aimes. Que la nouvelle année t'apporte paix et bonheur." },
  { titre:"Noël", texte:"Sous le sapin, je t'offre ce petit mot : merci d'être là. Joyeux Noël, et que la magie dure toute l'année." },
  { titre:"Remerciement", texte:"Merci pour ton aide, ton temps et ta gentillesse. Tu as fait une vraie différence, et je ne l'oublie pas." },
  { titre:"Remerciement", texte:"Un petit mot pour te dire un grand merci. Ta présence compte plus que tu ne le crois." },
  { titre:"Encouragement", texte:"Je sais que la route est difficile en ce moment, mais tu as déjà traversé bien des tempêtes. Tiens bon, je suis là." },
  { titre:"Encouragement", texte:"Tu as tout ce qu'il faut pour y arriver. Un pas à la fois, et tu verras : la lumière revient toujours." },
  { titre:"Amitié", texte:"Les années passent, mais notre amitié reste. Merci d'être mon ami, aujourd'hui comme hier." },
  { titre:"Amitié", texte:"On ne se voit pas assez souvent, mais sache que tu comptes beaucoup pour moi. À très bientôt, mon ami." }
];

const MESSAGE_DEFAUT = "Je voulais te dire que je pense à toi aujourd'hui. Bonne journée.";
const ORIGINE = "https://www.hp-outils.com";

function Page() {
  const recherche = Route.useSearch();
  const choixInitial = ((): { kind: "classique" | "cocasse"; id: string } => {
    if (typeof recherche.carte === "string") {
      if (CARTES.some((c) => c.id === recherche.carte)) return { kind: "classique", id: recherche.carte };
      if (COCASSES.some((c) => c.id === recherche.carte)) return { kind: "cocasse", id: recherche.carte };
    }
    return { kind: "classique", id: CARTES[0].id };
  })();
  const [choix, setChoix] = useState(choixInitial);
  const [cocasseOuverteId, setCocasseOuverteId] = useState<string | null>(null);
  const [apercuOuvert, setApercuOuvert] = useState(false);
  const [pour, setPour] = useState(recherche.pour !== undefined ? recherche.pour.slice(0, 60) : "");
  const [message, setMessage] = useState(
    recherche.message !== undefined ? recherche.message.slice(0, 400) : MESSAGE_DEFAUT,
  );
  const [de, setDe] = useState(recherche.de !== undefined ? recherche.de.slice(0, 60) : "");
  const [avis, setAvis] = useState("");
  const champMessage = useRef<HTMLTextAreaElement | null>(null);

  const estCocasse = choix.kind === "cocasse";
  const carteChoisie = estCocasse
    ? (COCASSES.find((c) => c.id === choix.id) ?? COCASSES[0])
    : (CARTES.find((c) => c.id === choix.id) ?? CARTES[0]);
  const dehorsChoisi = estCocasse
    ? (COCASSES.find((c) => c.id === choix.id) ?? COCASSES[0]).dehors
    : "";
  const dedansChoisi = estCocasse
    ? (COCASSES.find((c) => c.id === choix.id) ?? COCASSES[0]).dedans
    : "";

  const choisirClassique = (c: Carte) => {
    setChoix({ kind: "classique", id: c.id });
    setApercuOuvert(false);
  };
  const choisirCocasse = (c: Cocasse) => {
    setChoix({ kind: "cocasse", id: c.id });
    setApercuOuvert(false);
    setCocasseOuverteId((prev) => (prev === c.id ? null : c.id));
  };

  const lienCarte = () => {
    const params = new URLSearchParams();
    params.set("carte", choix.id);
    if (pour.trim()) params.set("pour", pour.trim());
    /* Le message est toujours porté, même vide : sans lui, la personne
       qui ouvre le lien verrait le message par défaut au lieu d'un
       aperçu vide (l'aperçu montre le message, jamais le défaut
       quand l'expéditeur l'a effacé). */
    params.set("message", message.trim());
    if (de.trim()) params.set("de", de.trim());
    return ORIGINE + "/cartes-de-souhaits?" + params.toString();
  };

  const copierLien = async () => {
    const lien = lienCarte();
    try {
      await navigator.clipboard.writeText(lien);
      setAvis("Lien copié — collez-le où vous voulez : la personne verra votre carte et votre message.");
    } catch {
      /* Repli vieux navigateurs : copie par sélection manuelle. */
      const zone = document.createElement("textarea");
      zone.value = lien;
      document.body.appendChild(zone);
      zone.select();
      try {
        document.execCommand("copy");
        setAvis("Lien copié — collez-le où vous voulez : la personne verra votre carte et votre message.");
      } catch {
        setAvis("La copie automatique n'a pas fonctionné — voici le lien à copier : " + lien);
      }
      document.body.removeChild(zone);
    }
  };

  const recommencer = () => {
    setPour("");
    setMessage("");
    setDe("");
    setAvis("");
  };

  const choisirExemple = (texte: string) => {
    setMessage(texte);
    champMessage.current?.focus();
  };

  const pourAffiche = pour.trim();
  const messageAffiche = message.trim();
  const deAffiche = de.trim();

  return (
    <main className="cartes-souhaits">
      <p>
        <Link to="/">← Retour à l'accueil</Link>
      </p>
      <header className="hero">
        <span className="lys" aria-hidden="true">⚜</span>
        <h1>Cartes de souhaits</h1>
        <p>Choisissez une carte, écrivez votre message, et offrez un petit mot qui fait du bien. Comme dans les années 90 — mais en un clic.</p>
      </header>

      <div className="avertissement" role="note">
        <strong>L'envoi par courriel n'est pas encore branché.</strong> Vous pouvez choisir une carte, écrire votre message et voir l'aperçu, puis copier le lien de votre carte pour la partager vous-même. Rien n'est envoyé depuis ce site, et aucune adresse courriel n'est demandée ni conservée.
      </div>

      <section aria-labelledby="titre-choisir">
        <h2 id="titre-choisir">1. Choisissez votre carte</h2>
        <p>Dix cartes originales, dessinées pour HP Outils. Touchez une carte pour la choisir.</p>
        <div className="galerie" role="group" aria-label="Galerie des cartes">
          {CARTES.map((c) => (
            <button
              key={c.id}
              type="button"
              className="carte-choix"
              aria-pressed={choix.kind === "classique" && choix.id === c.id ? "true" : "false"}
              onClick={() => choisirClassique(c)}
            >
              <img src={c.image} alt={c.alt} loading="lazy" width="800" height="800" />
              <span className="nom">{c.nom}</span>
              <span className="occasion">{c.occasion}</span>
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="titre-cocasse">
        <h2 id="titre-cocasse">2. Ou une carte cocasse&nbsp;?</h2>
        <p>Douze cartes cocasses : une phrase douce dehors, la chute comique dedans. Touchez une carte pour l'ouvrir et la choisir.</p>
        <div className="galerie-cocasse" role="group" aria-label="Galerie des cartes cocasses">
          {COCASSES.map((c) => (
            <button
              key={c.id}
              type="button"
              className="carte-cocasse"
              aria-pressed={choix.kind === "cocasse" && choix.id === c.id ? "true" : "false"}
              aria-expanded={cocasseOuverteId === c.id ? "true" : "false"}
              onClick={() => choisirCocasse(c)}
            >
              <img src={c.image} alt={c.alt} loading="lazy" width="800" height="800" />
              <span className="dehors">{c.dehors}</span>
              <span className="indice-ouvrir">Touchez pour ouvrir</span>
              <span className="dedans"><span className="dedans-texte">{c.dedans}</span></span>
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="titre-ecrire">
        <h2 id="titre-ecrire">3. Écrivez votre message</h2>
        <div className="composeur">
          <div className="panneau">
            <label htmlFor="destinataire">Pour qui est cette carte&nbsp;?</label>
            <input type="text" id="destinataire" maxLength={60} placeholder="Ex. : Marie, mon ami Jean…" value={pour} onChange={(e) => setPour(e.target.value)} />
            <label htmlFor="message">Votre message <span className="note">(parlez-lui directement, comme dans une vraie carte)</span></label>
            <textarea ref={champMessage} id="message" maxLength={400} placeholder="Écrivez votre petit mot ici…" value={message} onChange={(e) => setMessage(e.target.value)} />
            <p className="compteur"><span>{message.length}</span> / 400 caractères</p>
            <label htmlFor="expediteur">De la part de</label>
            <input type="text" id="expediteur" maxLength={60} placeholder="Ex. : Ton ami, Maman…" value={de} onChange={(e) => setDe(e.target.value)} />
            <h3>Besoin d'inspiration&nbsp;? Touchez un exemple</h3>
            <div className="exemples">
              {EXEMPLES.map((ex, i) => (
                <button key={i} type="button" className="exemple" onClick={() => choisirExemple(ex.texte)}>
                  <span className="titre-ex">{ex.titre}</span>
                  <span className="texte-ex">«&nbsp;{ex.texte}&nbsp;»</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3>Aperçu de votre carte</h3>
            <div className={apercuOuvert ? "apercu-carte apercu-ouvert" : "apercu-carte"} aria-live="polite">
              <img src={carteChoisie.image} alt={carteChoisie.alt} loading="lazy" width="800" height="800" />
              <div className="apercu-message">
                {estCocasse ? <p><strong>{dehorsChoisi}</strong></p> : null}
                {pourAffiche ? <p className="pour">Pour {pourAffiche}</p> : null}
                <p>{messageAffiche ? messageAffiche : "Votre message apparaîtra ici…"}</p>
                {deAffiche ? <span className="de">— {deAffiche}</span> : null}
              </div>
              {estCocasse ? (
                <>
                  <button type="button" className="apercu-ouvrir" aria-expanded={apercuOuvert ? "true" : "false"} onClick={() => setApercuOuvert((v) => !v)}>
                    {apercuOuvert ? "Refermer la carte" : "Ouvrir la carte"}
                  </button>
                  <div className="apercu-dedans"><span className="apercu-dedans-texte">{dedansChoisi}</span></div>
                </>
              ) : null}
            </div>
            {carteChoisie.idee ? (
              <p className="idee-croisee">
                {carteChoisie.idee.texte} <Link to={carteChoisie.idee.lien}>{carteChoisie.idee.lienTexte}</Link>
              </p>
            ) : null}
            <div className="boutons">
              <button type="button" className="bouton-principal" onClick={copierLien}>Copier le lien de ma carte</button>
              <button type="button" className="bouton-doux" onClick={recommencer}>Recommencer</button>
            </div>
            <p className="note" role="status">{avis}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="titre-comment">
        <h2 id="titre-comment">Comment ça marche&nbsp;?</h2>
        <ol>
          <li><strong>Vous choisissez</strong> une carte : dix modèles classiques ou douze cartes cocasses ci-dessus.</li>
          <li><strong>Vous écrivez</strong> votre message, ou vous partez d'un exemple proposé.</li>
          <li><strong>Vous regardez l'aperçu</strong> : c'est exactement ce que la personne recevra.</li>
          <li><strong>Vous copiez le lien de votre carte</strong> et vous l'envoyez vous-même à la personne — par courriel, par message, comme vous voulez.</li>
        </ol>
        <p className="note">Toutes les cartes sont des créations originales de HP Outils : aucun visuel copié, aucune marque, aucun texte emprunté. Ce ne sont pas des cartes-cadeaux : aucune valeur d'argent, juste un mot gentil.</p>
      </section>
    </main>
  );
}
