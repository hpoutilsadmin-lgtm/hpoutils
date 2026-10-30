// Fiche « Crée ton À toi l'histoire » — LOT 2, 5 $.
// CRÉATEUR, pas la série : l'utilisateur crée SA propre histoire à partir de
// ses choix. Ce n'est PAS la série « À toi l'histoire » existante (12 tomes).
// Textes 100 % originaux, adaptés du prototype `histoire-a-toi.html` (écrit
// pour HP, jamais copié d'un livre existant).
// Création essayable gratuitement ici, en session, sans compte, sans serveur.
// ACHAT BLOQUÉ : « Vente pas encore ouverte — aucun paiement n'est pris ».
// RÈGLE D'OR : AUCUN priceId, AUCUN pk_, AUCUNE clé créée. La clé de
// recherche ci-dessous est PROPOSÉE seulement, en attente de la confirmation
// de Mélanie (prix 5 $) — elle ne correspond à rien dans Stripe aujourd'hui.
// LIVRAISON AUTOMATIQUE DÉFINIE (voir section achat + doc compagnon) :
// Stripe hébergé → /checkout/return?session_id=… → paid → remise automatique
// de l'histoire créée + son lien, zéro étape manuelle.
// Cadre et présentation en VOUS ; à l'intérieur de l'histoire, voix du récit
// en « tu », comme dans les jeux et les tomes. Aucune promesse de date,
// aucune pression, aucune fausse urgence.
// Anti-injection : le prénom n'est jamais injecté en HTML — il est rendu
// comme nœud texte React (échappement automatique), jamais via innerHTML.
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/cree-ton-histoire-a-toi")({
  head: () =>
    createSeoHead({
      title: "Crée ton À toi l'histoire | HP Outils",
      description:
        "Créez votre propre histoire : un prénom, 4 thèmes, 2 à 4 fins, un ton, une longueur — et le récit s'assemble d'un coup. Essai gratuit, sans compte. Vente pas encore ouverte.",
      path: "/cree-ton-histoire-a-toi",
    }),
  component: Page,
});

/* LOGIQUE PURE — DÉBUT (extractible mécaniquement pour les tests) */
type Theme = {
  id: string;
  titre: string;
  resume: string;
  court: string;
  longExtra: string;
  ton: { doux: string; rigolo: string; aventureux: string };
};
type Fin = { id: string; titre: string; resume: string; court: string; longExtra: string };
type Ton = "doux" | "rigolo" | "aventureux";
type Longueur = "courte" | "longue";
type Entree = { prenom: string; themes: string[]; fins: string[]; ton: Ton; longueur: Longueur };

const THEMES: Theme[] = [
  { id: "foret", titre: "La forêt qui chuchote", resume: "Un sentier de mousse, après la pluie.",
    court: "{prenom}, tu entres dans la forêt juste après la pluie. Les feuilles brillent encore, et entre les troncs, tu entends un chuchotement doux qui murmure : « {prenom}, par ici. » Tu poses un pied, puis l'autre, et tu découvres un sentier de mousse qui sent bon la terre mouillée et les épinettes.",
    longExtra: "Tu t'arrêtes près d'un gros rocher couvert de mousse, tu y déposes une petite pierre plate comme on dépose un mot gentil, et la forêt te répond par un bruissement de feuilles qui ressemble à un merci.",
    ton: { doux: "Tout est calme ici, et même ton cœur semble marcher plus lentement.", rigolo: "Un écureuil te regarde de travers, comme si c'était toi, l'invité surprise de la forêt.", aventureux: "Ton cœur bat un peu plus vite : derrière le prochain virage, quelque chose t'attend, tu le sens." } },
  { id: "fleuve", titre: "Le fleuve", resume: "Un caillou plat, trois bonds sur l'eau.",
    court: "{prenom}, tu descends jusqu'au fleuve au moment où le ciel devient rose. L'eau clapote contre les roches, un canard passe en laissant derrière lui un petit V d'écume, et tu lances un caillou plat qui fait trois bonds avant de disparaître. Tu respires l'air frais et tu te dis que le fleuve a toujours quelque chose à raconter à qui sait l'écouter.",
    longExtra: "Tu t'assois sur un tronc échoué, tu trempes le bout de tes doigts dans l'eau froide, et tu regardes les nuages se refléter comme des bateaux blancs qui ne coulent jamais.",
    ton: { doux: "Le fleuve te berce comme une chanson qu'on connaît par cœur.", rigolo: "Une goutte d'eau fraîche t'éclabousse le nez, et tu éclates de rire sans savoir pourquoi.", aventureux: "Tu as envie de suivre le courant du regard jusqu'au bout du monde, juste pour voir où il mène." } },
  { id: "cuisine", titre: "La cuisine de grand-maman", resume: "De la farine partout et un tablier trop grand.",
    court: "Chez grand-maman, {prenom}, la cuisine sent déjà bon avant même que tu ouvres la porte. Sur la table, il y a de la farine partout, un bol qui attend tes deux mains, et grand-maman qui te tend un tablier trop grand en souriant. Tu mélanges, tu goûtes du bout du doigt, et la pâte devient, sous tes doigts, quelque chose de tout simple et de tout bon.",
    longExtra: "Pendant que le plat cuit, tu bois un petit jus à la table avec grand-maman, elle te raconte comment elle a appris cette recette quand elle avait ton âge, et tu te promets de la refaire chez toi, à ta façon.",
    ton: { doux: "C'est chaud, c'est doux, et tu te sens chez toi comme dans un gros chandail de laine.", rigolo: "Un nuage de farine te poudre le nez, et tu ressembles à un petit fantôme de cuisine très fier de lui.", aventureux: "Tu décides d'ajouter une pincée d'un ingrédient secret — juste une pincée, pour voir ce que ça change." } },
  { id: "train", titre: "Le train de nuit", resume: "Des lumières qui passent comme des étoiles paresseuses.",
    court: "{prenom}, tu montes dans le train de nuit avec ton petit sac posé sur tes genoux. Dehors, les lumières des maisons passent comme des étoiles paresseuses, le train berce doucement, et la dame du wagon te souhaite bonne route avec un sourire. Tu colles ton front à la vitre froide et tu regardes le paysage devenir un ruban sombre et tranquille.",
    longExtra: "À un arrêt, tu descends deux minutes sur le quai pour sentir l'air de la nuit, tu entends un grillon quelque part dans le noir, puis tu remontes vite, le cœur léger, avant que le train reparte.",
    ton: { doux: "Le roulis du train te calme comme une berceuse sur des rails.", rigolo: "Ton sac glisse à chaque virage et tu dois le rattraper comme un petit animal fugueur.", aventureux: "Chaque gare traversée te donne envie de descendre pour explorer, juste une fois, juste un peu." } },
  { id: "marche", titre: "Le marché du samedi matin", resume: "Trois belles pommes rouges soupesées comme il faut.",
    court: "Le samedi matin, {prenom}, tu arrives au marché quand les étals ouvrent à peine. Ça sent les fraises, le pain chaud et les fleurs fraîches, un monsieur te fait goûter un morceau de fromage en te racontant d'où il vient, et tu choisis trois belles pommes rouges en les soupesant comme un vrai connaisseur. Tu repars avec ton sac qui sent bon et plein de couleurs.",
    longExtra: "Tu t'arrêtes aussi devant les confitures, tu lis les petites étiquettes écrites à la main, et tu te dis que chaque pot raconte l'été de quelqu'un.",
    ton: { doux: "Tout le monde se dit bonjour ici, et tu te sens bienvenue comme chez des amis.", rigolo: "Une pomme veut toujours rouler hors de ton sac, et tu la rattrapes de justesse en riant.", aventureux: "Tu décides de goûter un fruit que tu n'as jamais mangé, juste pour découvrir un goût nouveau." } },
  { id: "cabane", titre: "La cabane au fond du rang", resume: "Un tapis usé, des livres empilés, ta place à toi.",
    court: "Au fond du rang, {prenom}, tu pousses la petite porte de la cabane de bois que tu connais par cœur. Dedans, il y a un tapis usé, des livres empilés, une lampe qui grésille un peu, et la place exacte où tu t'assois toujours. Tu t'installes, tu ouvres un livre, et dehors, le vent raconte ses histoires dans les branches.",
    longExtra: "Tu allumes la lampe, tu sors ton carnet, tu dessines la cabane vue de dehors, et tu écris en bas de la page : « Ma place à moi, pour penser et pour rêver. »",
    ton: { doux: "Ici, le temps ralentit, et tu peux respirer sans rien devoir à personne.", rigolo: "La porte grince toujours au même endroit, comme si elle te disait bonjour à sa façon.", aventureux: "Sous une planche du plancher, tu as caché une petite boîte à trésors que personne d'autre ne connaît." } },
  { id: "etoiles", titre: "La nuit des étoiles filantes", resume: "Sept étoiles comptées sur une couverture dans l'herbe.",
    court: "Le soir, {prenom}, tu t'allonges sur une couverture dans l'herbe pour regarder les étoiles filantes. La première passe si vite que tu n'as pas le temps de faire un vœu, la deuxième traverse le ciel lentement, comme si elle prenait son temps pour toi. Tu comptes jusqu'à sept étoiles, puis tu fermes les yeux un instant, juste pour garder le ciel imprimé derrière tes paupières.",
    longExtra: "Un peu plus tard, tu reconnais trois constellations que tu as apprises par cœur, tu les montres du doigt à la personne à côté de toi, et le ciel te semble soudain un peu moins loin.",
    ton: { doux: "Le ciel te couvre comme une grande couverture douce et silencieuse.", rigolo: "Une étoile file dans la mauvaise direction, et tu te demandes si elle aussi, elle s'est trompée de chemin.", aventureux: "Tu te promets qu'un jour, tu verras ces étoiles d'encore plus près, d'un lieu encore plus haut." } },
  { id: "pont", titre: "Le vieux pont de bois", resume: "Des planches comptées une par une au-dessus de la rivière.",
    court: "{prenom}, tu traverses le vieux pont de bois en comptant ses planches une par une. Sous tes pieds, la petite rivière chante entre les pierres, le bois craque doucement sans jamais faire peur, et au milieu du pont, tu t'arrêtes pour regarder l'eau passer. De l'autre côté, un sentier nouveau t'attend, et tu souris rien qu'à l'idée de le suivre.",
    longExtra: "Avant de repartir, tu déposes une feuille d'érable sur la rambarde, tu la regardes s'envoler vers la rivière, et tu te dis que traverser, c'est déjà un peu partir à l'aventure.",
    ton: { doux: "Chaque planche te porte doucement, comme si le pont te connaissait depuis toujours.", rigolo: "Le pont fait « couic » sous ton pied gauche et « couac » sous ton pied droit, et tu traverses en rigolant.", aventureux: "De l'autre côté, tout est à découvrir, et tes jambes ont déjà envie de courir." } },
];

const FINS: Fin[] = [
  { id: "retour", titre: "Tu rentres le cœur léger", resume: "Plein de moments à raconter.",
    court: "À la fin, {prenom}, tu rentres chez toi le cœur léger. Tu as plein d'images dans la tête, plein de petits moments à raconter, et tu sais déjà par quoi tu commenceras quand on te demandera : « Alors, c'était comment ? » Tu répondras en souriant : « Venez, je raconte tout, depuis le début. »",
    longExtra: "Et ce soir, en t'endormant, les images reviendront toutes seules, comme des amies qui passent dire bonsoir." },
  { id: "graine", titre: "Tu plantes une graine", resume: "Une histoire qui pousse un peu chaque jour.",
    court: "{prenom}, avant de partir, tu plantes une petite graine là où tu te trouves. Tu l'arroses avec le fond de ta gourde, tu lui dis à voix basse de bien pousser, et tu te promets de revenir voir si elle a percé la terre. Une histoire, après tout, ça pousse aussi comme une plante, un peu chaque jour.",
    longExtra: "Des mois plus tard, quelqu'un passera par là, verra une petite pousse verte, et ne saura jamais que c'est toi qui l'as plantée — mais toi, tu le sauras." },
  { id: "proches", titre: "Tu invites tes proches", resume: "Le voyage refait ensemble.",
    court: "Alors {prenom}, tu décides d'inviter tes proches à refaire ce voyage avec toi. Tu leur prépares le chemin, tu leur montres tes endroits préférés, et tu les regardes découvrir à leur tour ce que tu as aimé. C'est drôle comme une histoire devient encore plus belle quand on la partage.",
    longExtra: "Et quand ils te raconteront ce qu'ils ont vu, tu découvriras des détails que tu n'avais pas remarqués toi-même." },
  { id: "souvenir", titre: "Tu gardes un petit objet", resume: "Un caillou lisse, une feuille séchée.",
    court: "{prenom}, tu gardes un petit objet souvenir de cette journée : un caillou lisse, une feuille séchée, un billet froissé. Tu le poses sur ta table, bien en vue, et chaque fois que ton regard tombe dessus, l'histoire recommence un peu dans ta tête. Les petits objets, parfois, gardent mieux les souvenirs que les grandes phrases.",
    longExtra: "Bien des années plus tard, tu le retrouveras au fond d'un tiroir, et tout te reviendra d'un coup, comme si c'était hier." },
  { id: "carnet", titre: "Tu écris tout dans ton carnet", resume: "Dans l'ordre ou dans le désordre, comme ça vient.",
    court: "Le soir même, {prenom}, tu ouvres ton carnet et tu écris tout, dans l'ordre ou dans le désordre, comme ça te vient. Tu ajoutes un dessin dans la marge, un mot que tu as inventé, une phrase que tu ne veux pas oublier. Ton histoire est maintenant écrite quelque part, et personne ne pourra te l'enlever.",
    longExtra: "Plus tard, tu reliras ces pages et tu te diras : « C'est moi qui ai écrit ça ? » — oui, c'est toi, et ton cœur en sera tout content." },
  { id: "revenir", titre: "Tu promets de revenir", resume: "L'an prochain, à la même saison.",
    court: "{prenom}, tu promets de revenir l'an prochain, au même endroit, à la même saison. Tu imagines déjà ce qui aura changé et ce qui sera resté pareil, et cette promesse te met le cœur en fête. Les belles histoires, tu le sais maintenant, on peut les retrouver : il suffit de revenir les chercher.",
    longExtra: "Et si l'endroit a un peu changé, ce n'est pas grave : tu raconteras la première fois à la deuxième fois, et les deux se répondront." },
];

const INTROS: Record<Ton, string> = {
  doux: "{prenom}, cette histoire est pour toi. Installe-toi confortablement, prends ton temps, et laisse les images venir doucement, une à une, comme des pas tranquilles sur un chemin que tu connais.",
  rigolo: "{prenom}, attention : cette histoire risque de te faire sourire, peut-être même rire tout haut. Installe-toi bien, respire un bon coup, et c'est parti pour une histoire rien qu'à toi.",
  aventureux: "{prenom}, prépare ton sac et tes yeux curieux : cette histoire t'emmène un peu plus loin que d'habitude. Ouvre grand tes yeux et tes oreilles : l'aventure commence ici, avec toi.",
};

export function trouverParId<T extends { id: string }>(liste: T[], id: string): T | null {
  for (const item of liste) if (item.id === id) return item;
  return null;
}

export function dansOrdreCanonique<T extends { id: string }>(liste: T[], ids: string[]): string[] {
  const choisis: string[] = [];
  for (const item of liste) if (ids.indexOf(item.id) !== -1) choisis.push(item.id);
  return choisis;
}

export function validerEntree(entree: {
  prenom: string; themes: string[]; fins: string[]; ton: string; longueur: string;
}): { ok: boolean; erreurs: string[] } {
  const erreurs: string[] = [];
  const prenom = (entree.prenom || "").trim();
  if (!prenom) erreurs.push("Pour commencer, indiquez-moi votre prénom, s'il vous plaît. Sans lui, je ne peux pas assembler votre histoire.");
  const themes = entree.themes || [];
  if (themes.length < 4) erreurs.push("Choisissez 4 thèmes, s'il vous plaît. Vous en avez choisi " + themes.length + " pour l'instant.");
  if (themes.length > 4) erreurs.push("Choisissez 4 thèmes exactement, s'il vous plaît. Vous en avez choisi " + themes.length + ".");
  const fins = entree.fins || [];
  if (fins.length < 2) erreurs.push("Choisissez de 2 à 4 fins, s'il vous plaît. Vous en avez choisi " + fins.length + " pour l'instant.");
  if (fins.length > 4) erreurs.push("Choisissez de 2 à 4 fins, s'il vous plaît. Vous en avez choisi " + fins.length + ".");
  if (themes.filter((id) => trouverParId(THEMES, id) !== null).length !== themes.length)
    erreurs.push("Un des thèmes choisis n'est pas reconnu. Veuillez refaire votre choix.");
  if (fins.filter((id) => trouverParId(FINS, id) !== null).length !== fins.length)
    erreurs.push("Une des fins choisies n'est pas reconnue. Veuillez refaire votre choix.");
  if (["doux", "rigolo", "aventureux"].indexOf(entree.ton) === -1)
    erreurs.push("Choisissez un ton, s'il vous plaît : doux, rigolo ou aventureux.");
  if (["courte", "longue"].indexOf(entree.longueur) === -1)
    erreurs.push("Choisissez une longueur, s'il vous plaît : courte ou longue.");
  return { ok: erreurs.length === 0, erreurs };
}

export function insererPrenom(texte: string, prenom: string): string {
  return texte.split("{prenom}").join(prenom);
}

export function assemblerHistoire(entree: Entree): { titre: string; paragraphes: string[] } {
  const validation = validerEntree(entree);
  if (!validation.ok) throw new Error(validation.erreurs.join(" "));
  const prenom = entree.prenom.trim();
  const paragraphes: string[] = [];
  paragraphes.push(insererPrenom(INTROS[entree.ton], prenom));
  for (const id of dansOrdreCanonique(THEMES, entree.themes)) {
    const theme = trouverParId(THEMES, id)!;
    let paragraphe = theme.court + " " + theme.ton[entree.ton];
    if (entree.longueur === "longue") paragraphe += " " + theme.longExtra;
    paragraphes.push(insererPrenom(paragraphe, prenom));
  }
  for (const id of dansOrdreCanonique(FINS, entree.fins)) {
    const fin = trouverParId(FINS, id)!;
    let paragrapheFin = fin.court;
    if (entree.longueur === "longue") paragrapheFin += " " + fin.longExtra;
    paragraphes.push(insererPrenom(paragrapheFin, prenom));
  }
  paragraphes.push("Et voilà, " + prenom + " : ton histoire à toi. Tu peux la relire, la partager, ou en créer une autre.");
  return { titre: "L'histoire de " + prenom, paragraphes };
}

export function encoderBase64Url(texte: string): string {
  return btoa(unescape(encodeURIComponent(texte)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function decoderBase64Url(code: string): string {
  let normalise = code.replace(/-/g, "+").replace(/_/g, "/");
  while (normalise.length % 4 !== 0) normalise += "=";
  return decodeURIComponent(escape(atob(normalise)));
}

export function encoderPartage(entree: Entree): string {
  const propre = {
    prenom: (entree.prenom || "").trim(),
    themes: dansOrdreCanonique(THEMES, entree.themes || []),
    fins: dansOrdreCanonique(FINS, entree.fins || []),
    ton: entree.ton,
    longueur: entree.longueur,
  };
  return "#h=" + encoderBase64Url(JSON.stringify(propre));
}

export function decoderPartage(hash: string): Entree | null {
  try {
    if (!hash || hash.indexOf("#h=") !== 0) return null;
    const etat = JSON.parse(decoderBase64Url(hash.slice(3)));
    if (!etat || typeof etat.prenom !== "string" || !Array.isArray(etat.themes) || !Array.isArray(etat.fins)) return null;
    const validation = validerEntree(etat);
    if (!validation.ok) return null;
    return {
      prenom: etat.prenom.trim(),
      themes: dansOrdreCanonique(THEMES, etat.themes),
      fins: dansOrdreCanonique(FINS, etat.fins),
      ton: etat.ton,
      longueur: etat.longueur,
    };
  } catch {
    return null;
  }
}
/* LOGIQUE PURE — FIN */

/* LIVRAISON AUTOMATIQUE DÉFINIE (code + doc compagnon) :
   1) Le visiteur crée son histoire ici, gratuitement, en session.
   2) Quand la vente ouvrira : Stripe hébergé (aucune carte saisie sur le
      site) → /checkout/return?session_id=… → état « paid » →
      remise AUTOMATIQUE de l'histoire créée + son lien de partage, sans
      aucune étape manuelle, sans courriel à envoyer à la main.
   3) Jusqu'à l'ouverture, le bouton d'achat reste BLOQUÉ (ci-dessous) :
      aucun paiement n'est pris, aucune carte n'est demandée.
   Clé de recherche PROPOSÉE seulement (non créée, ne correspond à rien
   dans Stripe aujourd'hui) : histoire_a_toi_createur_5 — à confirmer par
   Mélanie avec le prix 5 $ avant tout branchement. */

const CLE_PROPOSEE = "histoire_a_toi_createur_5"; // PROPOSÉE, NON CRÉÉE

function basculer(liste: string[], id: string): string[] {
  return liste.indexOf(id) === -1 ? [...liste, id] : liste.filter((x) => x !== id);
}

function Page() {
  const [prenom, setPrenom] = useState("");
  const [themes, setThemes] = useState<string[]>([]);
  const [fins, setFins] = useState<string[]>([]);
  const [ton, setTon] = useState<Ton>("doux");
  const [longueur, setLongueur] = useState<Longueur>("courte");
  const [erreurs, setErreurs] = useState<string[]>([]);
  const [histoire, setHistoire] = useState<{ titre: string; paragraphes: string[] } | null>(null);
  const [lienPartage, setLienPartage] = useState("");
  const [copie, setCopie] = useState("");
  const [parcoursOuvert, setParcoursOuvert] = useState(false);

  // Lien de partage entrant : rouvre exactement la même histoire.
  useEffect(() => {
    const etat = decoderPartage(window.location.hash || "");
    if (etat) {
      setPrenom(etat.prenom);
      setThemes(etat.themes);
      setFins(etat.fins);
      setTon(etat.ton);
      setLongueur(etat.longueur);
      try {
        const resultat = assemblerHistoire(etat);
        setHistoire(resultat);
        setLienPartage(window.location.href);
      } catch {
        // Lien invalide malgré un décodage apparent : refus propre, rien d'inventé.
        setErreurs(["Ce lien ne semble pas contenir une histoire valide. Vous pouvez en créer une nouvelle ci-dessous."]);
      }
    } else if ((window.location.hash || "").indexOf("#h=") === 0) {
      setErreurs(["Ce lien ne semble pas contenir une histoire valide. Vous pouvez en créer une nouvelle ci-dessous."]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function assembler() {
    const entree: Entree = { prenom, themes, fins, ton, longueur };
    const validation = validerEntree(entree);
    if (!validation.ok) {
      setErreurs(validation.erreurs);
      setHistoire(null);
      return;
    }
    setErreurs([]);
    setHistoire(assemblerHistoire(entree));
    const hash = encoderPartage(entree);
    if (window.history && window.history.replaceState) window.history.replaceState(null, "", hash);
    setLienPartage(window.location.href);
    setCopie("");
  }

  function copierLien() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(lienPartage)
        .then(() => setCopie("Lien copié. Vous pouvez le coller où vous voulez."))
        .catch(() => setCopie("Le lien est affiché ci-dessus : copiez-le avec votre clavier."));
    } else {
      setCopie("Le lien est affiché ci-dessus : copiez-le avec votre clavier.");
    }
  }

  function nouvelleHistoire() {
    setHistoire(null);
    setErreurs([]);
    if (window.history && window.history.replaceState)
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    setLienPartage("");
    setCopie("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main style={{ maxWidth: 680, margin: "0 auto", padding: "20px 16px 48px", lineHeight: 1.5 }}>
      <h1>Crée ton À toi l&rsquo;histoire</h1>
      <p><strong>Bientôt — vente pas encore ouverte, aucun paiement n'est pris. La création est gratuite à essayer ici.</strong></p>
      <p>
        Vous choisissez vos thèmes et vos fins, puis votre histoire s&rsquo;assemble
        d&rsquo;un coup, rien qu&rsquo;à vous — sans étape manuelle, sans compte, sans serveur.
        Ceci est un <strong>créateur</strong> : vous créez votre propre histoire.
        Ce n&rsquo;est pas la série «&nbsp;À toi l&rsquo;histoire&nbsp;» (12 tomes), qui reste
        une collection à part.
      </p>

      <section aria-label="Création de votre histoire">
        <div style={{ border: "1px solid #e3d5bd", borderRadius: 12, padding: 16, margin: "16px 0" }}>
          <label htmlFor="prenom" style={{ fontWeight: 600, display: "block", marginBottom: 6 }}>
            Indiquez votre prénom
          </label>
          <input
            id="prenom"
            type="text"
            autoComplete="off"
            placeholder="Par exemple : Léa"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            style={{ width: "100%", fontSize: "1.05rem", padding: 12, border: "1px solid #b9a888", borderRadius: 8 }}
          />
          <p style={{ color: "#6b5a44" }}>Votre prénom apparaîtra dans chaque paragraphe du récit, à la place qui lui revient.</p>
        </div>

        <fieldset style={{ border: 0, padding: 0, margin: "20px 0" }}>
          <legend style={{ fontWeight: 700, fontSize: "1.1rem" }}>Choisissez 4 thèmes</legend>
          <p style={{ color: "#6b5a44" }}>Vous avez choisi {themes.length} thème(s) sur 4.</p>
          {THEMES.map((theme) => (
            <label key={theme.id} style={{ display: "block", border: "1px solid #e3d5bd", borderRadius: 10, padding: 12, margin: "8px 0", cursor: "pointer" }}>
              <input type="checkbox" checked={themes.indexOf(theme.id) !== -1} onChange={() => setThemes(basculer(themes, theme.id))} style={{ marginRight: 10, transform: "scale(1.25)" }} />
              <strong>{theme.titre}</strong>
              <small style={{ display: "block", color: "#6b5a44", marginLeft: 30 }}>{theme.resume}</small>
            </label>
          ))}
        </fieldset>

        <fieldset style={{ border: 0, padding: 0, margin: "20px 0" }}>
          <legend style={{ fontWeight: 700, fontSize: "1.1rem" }}>Choisissez de 2 à 4 fins</legend>
          <p style={{ color: "#6b5a44" }}>Vous avez choisi {fins.length} fin(s) sur 2 à 4.</p>
          {FINS.map((fin) => (
            <label key={fin.id} style={{ display: "block", border: "1px solid #e3d5bd", borderRadius: 10, padding: 12, margin: "8px 0", cursor: "pointer" }}>
              <input type="checkbox" checked={fins.indexOf(fin.id) !== -1} onChange={() => setFins(basculer(fins, fin.id))} style={{ marginRight: 10, transform: "scale(1.25)" }} />
              <strong>{fin.titre}</strong>
              <small style={{ display: "block", color: "#6b5a44", marginLeft: 30 }}>{fin.resume}</small>
            </label>
          ))}
        </fieldset>

        <fieldset style={{ border: 0, padding: 0, margin: "20px 0" }}>
          <legend style={{ fontWeight: 700, fontSize: "1.1rem" }}>Choisissez le ton de l&rsquo;histoire</legend>
          {(["doux", "rigolo", "aventureux"] as Ton[]).map((t) => (
            <label key={t} style={{ display: "inline-block", border: "1px solid #e3d5bd", borderRadius: 999, padding: "10px 16px", margin: "4px 8px 4px 0", cursor: "pointer" }}>
              <input type="radio" name="ton" checked={ton === t} onChange={() => setTon(t)} style={{ marginRight: 8 }} />
              {t === "doux" ? "Doux" : t === "rigolo" ? "Rigolo" : "Aventureux"}
            </label>
          ))}
        </fieldset>

        <fieldset style={{ border: 0, padding: 0, margin: "20px 0" }}>
          <legend style={{ fontWeight: 700, fontSize: "1.1rem" }}>Choisissez la longueur</legend>
          {(["courte", "longue"] as Longueur[]).map((l) => (
            <label key={l} style={{ display: "inline-block", border: "1px solid #e3d5bd", borderRadius: 999, padding: "10px 16px", margin: "4px 8px 4px 0", cursor: "pointer" }}>
              <input type="radio" name="longueur" checked={longueur === l} onChange={() => setLongueur(l)} style={{ marginRight: 8 }} />
              {l === "courte" ? "Courte" : "Longue"}
            </label>
          ))}
        </fieldset>

        {erreurs.length > 0 && (
          <div role="alert" style={{ border: "2px solid #a33d2a", background: "#fff0ec", borderRadius: 10, padding: "14px 16px", margin: "16px 0" }}>
            <p>Je ne peux pas assembler votre histoire pour l&rsquo;instant. Voici ce qui manque :</p>
            <ul>
              {erreurs.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          onClick={assembler}
          style={{ fontSize: "1.05rem", padding: "14px 20px", borderRadius: 10, border: "1px solid #2b2118", background: "#2b2118", color: "#fff", cursor: "pointer", width: "100%", margin: "8px 0" }}
        >
          Assemblez votre histoire
        </button>
        <p style={{ color: "#6b5a44" }}>
          Si un choix manque, la page vous le dira simplement, au lieu d&rsquo;inventer une histoire à votre place.
          Aucun contenu générique ne remplace vos choix.
        </p>
      </section>

      {histoire && (
        <section aria-label="Votre histoire">
          <div style={{ fontSize: "1.18rem", lineHeight: 1.75 }}>
            <h2>{histoire.titre}</h2>
            {histoire.paragraphes.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div style={{ border: "1px solid #e3d5bd", borderRadius: 12, padding: 16, margin: "16px 0" }}>
            <h2>Partagez votre histoire</h2>
            <p>Ce lien rouvre exactement la même histoire chez un proche, sans compte et sans serveur. Vous pouvez le copier et l&rsquo;envoyer à qui vous voulez.</p>
            <input type="text" readOnly value={lienPartage} aria-label="Lien partageable de votre histoire" style={{ width: "100%", fontSize: "0.95rem", padding: 12, border: "1px solid #b9a888", borderRadius: 8 }} />
            <button type="button" onClick={copierLien} style={{ fontSize: "1.05rem", padding: "14px 20px", borderRadius: 10, border: "1px solid #2b2118", background: "#fffdf7", color: "#2b2118", cursor: "pointer", width: "100%", margin: "8px 0" }}>
              Copier le lien
            </button>
            {copie && <p aria-live="polite">{copie}</p>}
            <button type="button" onClick={nouvelleHistoire} style={{ fontSize: "1.05rem", padding: "14px 20px", borderRadius: 10, border: "1px solid #2b2118", background: "#fffdf7", color: "#2b2118", cursor: "pointer", width: "100%", margin: "8px 0" }}>
              Créer une autre histoire
            </button>
          </div>
        </section>
      )}

      <section aria-label="Prix et parcours d'achat" style={{ border: "1px solid #e3d5bd", borderRadius: 12, padding: 16, margin: "16px 0" }}>
        <h2>Combien ça coûte&nbsp;?</h2>
        <p style={{ fontSize: "1.4rem", fontWeight: 700 }}>Prix prévu : 5&nbsp;$, aucune taxe ajoutée</p>
        <p>
          La création est gratuite à essayer ici. La version à garder — votre histoire créée
          + son lien, remis automatiquement après paiement — sera offerte à 5&nbsp;$.
        </p>
        <button type="button" onClick={() => setParcoursOuvert(!parcoursOuvert)} style={{ fontSize: "1.05rem", padding: "14px 20px", borderRadius: 10, border: "1px solid #2b2118", background: "#fffdf7", color: "#2b2118", cursor: "pointer", width: "100%", margin: "8px 0" }}>
          Voir le parcours d&rsquo;achat
        </button>
        {parcoursOuvert && (
          <div>
            <ol>
              <li>Vous choisissez vos thèmes et vos fins.</li>
              <li>Vous vérifiez votre histoire.</li>
              <li>Vous arrivez à l&rsquo;étape du paiement (Stripe hébergé, aucune carte saisie sur le site).</li>
              <li>Après paiement, /checkout/return vous remet automatiquement votre histoire créée + son lien — zéro étape manuelle.</li>
            </ol>
            <p style={{ border: "2px solid #a33d2a", background: "#fff0ec", borderRadius: 10, padding: "14px 16px", fontWeight: 600 }}>
              Vente pas encore ouverte — aucun paiement n&rsquo;est pris.
            </p>
            <p>
              Aucune carte n&rsquo;est demandée ici, aucun montant n&rsquo;est débité, et rien ne vous est
              promis pour plus tard. Quand la vente ouvrira, vous le saurez clairement, et vous
              choisirez alors, tranquillement, si vous souhaitez poursuivre ou non.
            </p>
            <p style={{ color: "#6b5a44" }}>
              Clé de recherche proposée (non créée, en attente de confirmation) : {CLE_PROPOSEE}.
            </p>
          </div>
        )}
      </section>

      <p style={{ color: "#6b5a44" }}>
        Textes 100&nbsp;% originaux, écrits pour ce créateur. Le cadre de cette page vous parle
        en «&nbsp;vous&nbsp;»&nbsp;; à l&rsquo;intérieur de l&rsquo;histoire, le récit s&rsquo;adresse
        à vous en «&nbsp;tu&nbsp;», comme dans les jeux et les tomes existants.
      </p>
    </main>
  );
}
