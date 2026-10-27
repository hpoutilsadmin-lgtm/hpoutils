// Fiche « Votre cuisine familiale, à vous » — LOT 3 (5 $).
// Adaptée du prototype `prototypes-5-dollars/cuisine-familiale.html` (42 vérifications),
// 100 % originale, sans code ni visuel emprunté à un outil existant.
// RÈGLE D'OR — RIEN N'EST VENDU ICI :
// - AUCUN bouton d'achat menant à un paiement, AUCUN identifiant de prix,
//   AUCUNE clé publique, AUCUNE clé créée.
// - Clé de recherche PROPOSÉE SEULEMENT, marquée comme telle, non créée :
//   PROPOSED_LOOKUP_KEY = "cuisine_familiale_5" (Mélanie doit la créer et la
//   confirmer avant toute vente ; tant que ce n'est pas fait, la vente reste
//   fermée et le message honnête ci-dessous s'affiche).
// - Message honnête, affiché deux fois : « Vente pas encore ouverte — aucun
//   paiement n'est pris. » Aucune promesse de date, aucune pression, aucune
//   fausse urgence. Prix prévu : 5 $, aucune taxe ajoutée.
// CRÉATION AUTOMATIQUE : l'outil fonctionne d'un coup à partir des recettes
// que vous saisissez — portions recalculées, liste d'épicerie combinée, sans
// aucune étape manuelle entre la saisie et le résultat.
// LIVRAISON AUTOMATIQUE (définie ici et dans le doc compagnon, jamais
// exécutée sans les portes) : quand la vente ouvrira, paiement hébergé Stripe
// → retour sur /checkout/return → remise automatique de l'outil autonome et
// de son lien, zéro étape manuelle. Ce chemin n'existe pas encore dans cette
// page : aucun lien, aucun bouton ne le déclenche.
// POINT OUVERT, NON TRANCHÉ ICI : l'hébergement des recettes (local vs compte
// vs lien). Aujourd'hui, vos recettes vivent dans votre navigateur, sur votre
// appareil. L'automatisation complète reste à prouver ou le prix à re-chiffrer
// — signalé dans le rapport, jamais décidé seul.
// LANGUE : 100 % VOUS, cadre ET intérieur (la cuisine est tout VOUS,
// contrairement aux jeux). Aucun contenu pré-rempli, aucune recette inventée :
// si vous n'avez rien saisi, la page vous propose simplement d'ajouter votre
// première recette.
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/cuisine-familiale")({
  head: () =>
    createSeoHead({
      title: "Votre cuisine familiale, à vous | HP Outils",
      description:
        "Vos recettes, vos habitudes, vos mots : portions recalculées, liste d'épicerie combinée, recherche sans accents, partage par lien sans compte. Prix prévu 5 $, aucune taxe ajoutée. Vente pas encore ouverte.",
      path: "/cuisine-familiale",
    }),
  component: Page,
});

// Clé de recherche PROPOSÉE SEULEMENT — non créée, non confirmée par Mélanie.
// Ne jamais la présenter comme existante, ne jamais l'utiliser dans un appel.
const PROPOSED_LOOKUP_KEY = "cuisine_familiale_5";

// Définition de la livraison automatique FUTURE (documentation dans le code,
// aucun chemin de paiement actif) : paiement hébergé Stripe → retour sur
// /checkout/return → la page de retour remet automatiquement l'outil autonome
// (fichier + lien) et un courriel de confirmation part avec le même lien.
// Zéro étape manuelle. Portes avant toute mise en service : prix confirmé par
// Mélanie, clé ci-dessus créée et confirmée, TEST 0 $ vérifié, go d'HP
// nommant le produit.
const DELIVERY_FLOW_FUTURE = Object.freeze({
  etape1: "Paiement hébergé Stripe (5 $, aucune taxe ajoutée)",
  etape2: "Retour automatique sur /checkout/return",
  etape3: "Remise automatique de l'outil autonome et de son lien, sans envoi manuel",
  portes: ["Prix confirmé par Mélanie", "Clé créée et confirmée", "TEST 0 $ vérifié", "Go d'HP nommant le produit"],
});

// ==== LOGIQUE PURE (début — extraite mécaniquement pour les tests) ====
type Ingredient = { quantity: string; unit: string; name: string };
type Recipe = { id: string; title: string; servings: number; ingredients: Ingredient[]; steps: string[] };
type SharedRecipe = { title: string; servings: number; ingredients: Ingredient[]; steps: string[] };

function normalizeText(value: string | null | undefined): string {
  if (value === null || value === undefined) return "";
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function parseNumber(value: string | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  const t = String(value).trim().replace(",", ".");
  if (t === "") return null;
  if (!/^-?[0-9]+(\.[0-9]+)?$/.test(t)) return null;
  const n = parseFloat(t);
  return isNaN(n) ? null : n;
}

function formatNumber(n: number): string {
  const r = Math.round(n * 100) / 100;
  if (Number.isInteger(r)) return String(r);
  return String(r);
}

function scaleQuantity(quantity: string, factor: number): { display: string; scalable: boolean; note: string } {
  const original = (quantity === null || quantity === undefined) ? "" : String(quantity).trim();
  const n = parseNumber(original);
  if (n === null) {
    return {
      display: original,
      scalable: false,
      note: original === "" ? "Quantité non indiquée : adaptez-la selon votre habitude." : "Cette quantité ne se recalcule pas automatiquement : adaptez-la à l'œil.",
    };
  }
  return { display: formatNumber(n * factor), scalable: true, note: "" };
}

function validateRecipe(recipe: { title: string; ingredients: Ingredient[]; steps: string[] }): { ok: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const title = recipe && recipe.title ? String(recipe.title).trim() : "";
  if (!title) errors.push("Veuillez indiquer un titre pour votre recette avant de l'enregistrer.");
  const named = (recipe.ingredients || []).filter((i) => i && String(i.name || "").trim() !== "");
  if (named.length === 0) warnings.push("Cette recette n'a pas encore d'ingrédient : vous pourrez en ajouter plus tard.");
  const realSteps = (recipe.steps || []).filter((s) => String(s || "").trim() !== "");
  if (realSteps.length === 0) warnings.push("Cette recette n'a pas encore d'étape : vous pourrez en ajouter plus tard.");
  return { ok: errors.length === 0, errors, warnings };
}

function searchRecipes(recipes: Recipe[], query: string): Recipe[] {
  const q = normalizeText(query);
  if (!q) return (recipes || []).slice();
  return (recipes || []).filter((r) =>
    (r.ingredients || []).some((i) => normalizeText(i.name).indexOf(q) !== -1),
  );
}

function filterByPantry(recipes: Recipe[], pantry: string[], active: boolean): Recipe[] {
  if (!active) return (recipes || []).slice();
  const set: Record<string, boolean> = {};
  (pantry || []).forEach((p) => { const k = normalizeText(p); if (k) set[k] = true; });
  if (Object.keys(set).length === 0) return [];
  return (recipes || []).filter((r) => {
    const ings = (r.ingredients || []).filter((i) => String(i.name || "").trim() !== "");
    if (ings.length === 0) return false;
    return ings.every((i) => !!set[normalizeText(i.name)]);
  });
}

function buildGroceryList(selections: { recipe: Recipe; servings: number }[]): {
  grouped: { name: string; unit: string; total: string }[];
  nonNumeric: { name: string; unit: string; display: string; note: string }[];
} {
  const map: Record<string, { name: string; unit: string; total: number }> = {};
  const order: string[] = [];
  const nonNumeric: { name: string; unit: string; display: string; note: string }[] = [];
  (selections || []).forEach((sel) => {
    const recipe = sel.recipe;
    if (!recipe) return;
    const base = parseNumber(String(recipe.servings)) || 1;
    const target = parseNumber(String(sel.servings)) || base;
    const factor = base ? target / base : 1;
    (recipe.ingredients || []).forEach((ing) => {
      const name = String(ing.name || "").trim();
      if (!name) return;
      const unit = String(ing.unit || "").trim();
      const key = normalizeText(name) + "|" + normalizeText(unit);
      const scaled = scaleQuantity(ing.quantity, factor);
      if (!scaled.scalable) {
        nonNumeric.push({ name, unit, display: scaled.display, note: scaled.note });
        return;
      }
      if (!map[key]) { map[key] = { name, unit, total: 0 }; order.push(key); }
      const parsed = parseNumber(scaled.display);
      if (parsed !== null) map[key].total += parsed;
    });
  });
  const grouped = order.map((k) => ({ name: map[k].name, unit: map[k].unit, total: formatNumber(map[k].total) }));
  grouped.sort((a, b) => (normalizeText(a.name) < normalizeText(b.name) ? -1 : 1));
  return { grouped, nonNumeric };
}

function encodeBase64Utf8(json: string): string {
  return btoa(unescape(encodeURIComponent(json)));
}

function decodeBase64Utf8(b64: string): string {
  return decodeURIComponent(escape(atob(b64)));
}

function encodeShare(recipe: Recipe | SharedRecipe): string {
  const clean = {
    title: recipe.title || "",
    servings: recipe.servings || 4,
    ingredients: (recipe.ingredients || []).map((i) => ({ quantity: i.quantity || "", unit: i.unit || "", name: i.name || "" })),
    steps: (recipe.steps || []).slice(),
  };
  return "#r=" + encodeURIComponent(encodeBase64Utf8(JSON.stringify(clean)));
}

function decodeShare(hash: string): SharedRecipe | null {
  try {
    if (!hash || hash.indexOf("#r=") !== 0) return null;
    const b64 = decodeURIComponent(hash.slice(3));
    const json = decodeBase64Utf8(b64);
    const data = JSON.parse(json);
    if (!data || typeof data.title !== "string") return null;
    return { title: data.title, servings: data.servings || 4, ingredients: data.ingredients || [], steps: data.steps || [] };
  } catch {
    return null;
  }
}
// ==== LOGIQUE PURE (fin) ====

const CLE_RECETTES = "cuisine-familiale-recettes-v1";
const CLE_PANIER = "cuisine-familiale-panier-v1";

function charger<T>(cle: string, defaut: T): T {
  try {
    const v = localStorage.getItem(cle);
    return v ? (JSON.parse(v) as T) : defaut;
  } catch {
    return defaut;
  }
}

function sauver(cle: string, valeur: unknown): void {
  try {
    localStorage.setItem(cle, JSON.stringify(valeur));
  } catch {
    /* stockage indisponible : l'outil continue sans conserver */
  }
}

function nouvelId(): string {
  return "r" + Date.now().toString(36) + Math.floor(Math.random() * 10000).toString(36);
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 14,
  fontSize: 17,
  border: "2px solid #cbb9a0",
  borderRadius: 12,
  background: "#fff",
  color: "#2b2118",
  boxSizing: "border-box",
};

const btnStyle: React.CSSProperties = {
  width: "100%",
  padding: 15,
  fontSize: 17,
  fontWeight: 700,
  borderRadius: 14,
  border: 0,
  cursor: "pointer",
  minHeight: 52,
  margin: "8px 0",
  background: "#2e7d32",
  color: "#fff",
};

const btnSecondaire: React.CSSProperties = {
  ...btnStyle,
  background: "#fff",
  color: "#2b2118",
  border: "2px solid #2b2118",
};

const btnDanger: React.CSSProperties = {
  ...btnStyle,
  background: "#fff",
  color: "#b3261e",
  border: "2px solid #b3261e",
};

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "2px solid #e8dcc8",
  borderRadius: 16,
  padding: 16,
  margin: "16px 0",
};

const labelStyle: React.CSSProperties = { display: "block", fontWeight: 700, margin: "14px 0 6px" };
const mutedStyle: React.CSSProperties = { color: "#6b5a4a", fontSize: 15 };

function Page() {
  const [recettes, setRecettes] = useState<Recipe[]>([]);
  const [panier, setPanier] = useState<string[]>([]);
  const [charge, setCharge] = useState(false);
  const [recherche, setRecherche] = useState("");
  const [filtrePanier, setFiltrePanier] = useState(false);
  const [nouvelIndispensable, setNouvelIndispensable] = useState("");
  const [portionsAffichees, setPortionsAffichees] = useState<Record<string, number>>({});
  const [selectionEpicerie, setSelectionEpicerie] = useState<Record<string, boolean>>({});
  const [recettePartagee, setRecettePartagee] = useState<SharedRecipe | null>(null);
  const [lienInvalide, setLienInvalide] = useState(false);
  const [liensPartage, setLiensPartage] = useState<Record<string, string>>({});
  const [copieConfirmee, setCopieConfirmee] = useState("");

  // Formulaire d'ajout / de modification
  const [titre, setTitre] = useState("");
  const [portionsBase, setPortionsBase] = useState(4);
  const [lignes, setLignes] = useState<Ingredient[]>([{ quantity: "", unit: "", name: "" }]);
  const [etapesTexte, setEtapesTexte] = useState("");
  const [editionId, setEditionId] = useState<string | null>(null);
  const [msgFormulaire, setMsgFormulaire] = useState<{ type: "ok" | "warn" | "error"; texte: string } | null>(null);
  const [parcoursOuvert, setParcoursOuvert] = useState(false);

  useEffect(() => {
    setRecettes(charger<Recipe[]>(CLE_RECETTES, []));
    setPanier(charger<string[]>(CLE_PANIER, []));
    if (window.location.hash.indexOf("#r=") === 0) {
      const dec = decodeShare(window.location.hash);
      if (dec) setRecettePartagee(dec);
      else setLienInvalide(true);
    }
    setCharge(true);
  }, []);

  useEffect(() => {
    if (charge) sauver(CLE_RECETTES, recettes);
  }, [recettes, charge]);

  useEffect(() => {
    if (charge) sauver(CLE_PANIER, panier);
  }, [panier, charge]);

  const visibles = filterByPantry(searchRecipes(recettes, recherche), panier, filtrePanier);

  function majPortions(id: string, base: number, n: number) {
    const v = Math.max(1, Math.min(50, Math.floor(n) || 1));
    setPortionsAffichees((p) => ({ ...p, [id]: v }));
    void base;
  }

  function effacerHashPartage() {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  function ajouterPartage() {
    if (!recettePartagee) return;
    const copie: Recipe = {
      id: nouvelId(),
      title: recettePartagee.title,
      servings: recettePartagee.servings,
      ingredients: recettePartagee.ingredients,
      steps: recettePartagee.steps,
    };
    setRecettes((r) => [...r, copie]);
    setRecettePartagee(null);
    effacerHashPartage();
  }

  function ignorerPartage() {
    setRecettePartagee(null);
    effacerHashPartage();
  }

  function ajouterIndispensable() {
    const v = nouvelIndispensable.trim();
    if (!v) return;
    if (panier.map(normalizeText).indexOf(normalizeText(v)) === -1) {
      setPanier((p) => [...p, v]);
    }
    setNouvelIndispensable("");
  }

  function reinitialiserFormulaire() {
    setTitre("");
    setPortionsBase(4);
    setLignes([{ quantity: "", unit: "", name: "" }]);
    setEtapesTexte("");
    setEditionId(null);
    setMsgFormulaire(null);
  }

  function enregistrerRecette() {
    const ingredients = lignes.filter((i) => String(i.name || "").trim() !== "" || String(i.quantity || "").trim() !== "");
    const etapes = etapesTexte.split("\n").map((s) => s.trim()).filter((s) => s !== "");
    const data = { title: titre, ingredients, steps: etapes };
    const check = validateRecipe(data);
    if (!check.ok) {
      setMsgFormulaire({ type: "error", texte: check.errors.join(" ") });
      return;
    }
    const avert = check.warnings.join(" ");
    if (editionId) {
      setRecettes((rs) =>
        rs.map((r) => (r.id === editionId ? { id: editionId, title: titre.trim(), servings: portionsBase, ingredients, steps: etapes } : r)),
      );
    } else {
      setRecettes((rs) => [...rs, { id: nouvelId(), title: titre.trim(), servings: portionsBase, ingredients, steps: etapes }]);
    }
    reinitialiserFormulaire();
    setMsgFormulaire({
      type: avert ? "warn" : "ok",
      texte: (avert ? avert + " " : "") + "Votre recette a bien été enregistrée dans votre navigateur.",
    });
  }

  function modifierRecette(r: Recipe) {
    setEditionId(r.id);
    setTitre(r.title);
    setPortionsBase(r.servings);
    setLignes(r.ingredients.length ? r.ingredients.map((i) => ({ ...i })) : [{ quantity: "", unit: "", name: "" }]);
    setEtapesTexte(r.steps.join("\n"));
    setMsgFormulaire(null);
    document.querySelector("section[aria-label='Ajouter une recette']")?.scrollIntoView();
  }

  function retirerRecette(r: Recipe) {
    if (window.confirm("Voulez-vous vraiment retirer la recette « " + r.title + " » de vos recettes ?")) {
      setRecettes((rs) => rs.filter((x) => x.id !== r.id));
      setPortionsAffichees((p) => {
        const c = { ...p };
        delete c[r.id];
        return c;
      });
      setSelectionEpicerie((s) => {
        const c = { ...s };
        delete c[r.id];
        return c;
      });
    }
  }

  function partagerRecette(r: Recipe) {
    const lien = window.location.origin + window.location.pathname + encodeShare(r);
    setLiensPartage((l) => ({ ...l, [r.id]: lien }));
  }

  function copierLien(id: string) {
    const lien = liensPartage[id];
    if (!lien) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(lien).catch(() => {});
    }
    setCopieConfirmee(id);
  }

  const selsEpicerie = recettes
    .filter((r) => selectionEpicerie[r.id])
    .map((r) => ({ recipe: r, servings: portionsAffichees[r.id] || r.servings || 4 }));
  const listeEpicerie = buildGroceryList(selsEpicerie);

  return (
    <main style={{ background: "#fdf8f0", color: "#2b2118", lineHeight: 1.55, fontSize: 17 }}>
      <section className="editorial-hero">
        <div className="container">
          <span className="editorial-kicker">Votre cuisine familiale, à vous</span>
          <h1>Votre cuisine familiale, à vous</h1>
          <p className="lead">
            Vos recettes, vos habitudes, vos mots. Rien n&rsquo;est inventé ici : si vous n&rsquo;avez encore rien écrit,
            cette page vous propose simplement d&rsquo;ajouter votre première recette.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 720 }}>
        {/* CADRE COMMERCE HONNÊTE — aucun bouton d'achat, aucun paiement */}
        <section style={{ ...cardStyle, background: "#fff7e6", border: "3px solid #c98a1b" }} aria-label="Prix et achat">
          <h2 style={{ marginTop: 0 }}>Le prix, dit simplement</h2>
          <p style={{ fontSize: "2rem", fontWeight: 800, margin: "4px 0" }}>5&nbsp;$</p>
          <p>
            Prix prévu : <strong>5&nbsp;$, aucune taxe ajoutée.</strong> Vous pouvez découvrir l&rsquo;outil ici,
            sans compte et sans pression. Vous décidez ensuite, tranquillement.
          </p>
          <p role="status" style={{ fontWeight: 700, background: "#fdecea", border: "2px solid #b3261e", borderRadius: 12, padding: 14 }}>
            Vente pas encore ouverte — aucun paiement n&rsquo;est pris.
          </p>
          <button type="button" style={btnSecondaire} onClick={() => setParcoursOuvert((o) => !o)}>
            Découvrir le parcours d&rsquo;achat
          </button>
          {parcoursOuvert && (
            <div>
              <ol>
                <li>
                  <strong>Vous choisissez.</strong> Vous regardez l&rsquo;outil et vous vérifiez qu&rsquo;il vous convient.
                </li>
                <li>
                  <strong>Vous vérifiez le prix.</strong> Le prix prévu est de 5&nbsp;$, aucune taxe ajoutée.
                </li>
                <li>
                  <strong>Vous passez au paiement.</strong> C&rsquo;est ici que le parcours s&rsquo;arrête, pour l&rsquo;instant.
                </li>
              </ol>
              <p role="status" style={{ fontWeight: 700, background: "#fdecea", border: "2px solid #b3261e", borderRadius: 12, padding: 14 }}>
                Vente pas encore ouverte — aucun paiement n&rsquo;est pris.
              </p>
              <p style={mutedStyle}>
                Aucune carte n&rsquo;est demandée, aucun montant n&rsquo;est débité, aucune livraison n&rsquo;est promise ici.
                Quand la vente ouvrira vraiment, les conditions seront indiquées clairement avant tout paiement, et
                la livraison se fera automatiquement, sans envoi manuel.
              </p>
            </div>
          )}
        </section>

        {/* RECETTE PARTAGÉE PAR LIEN */}
        {recettePartagee && (
          <section style={{ ...cardStyle, background: "#eef4ff", border: "2px solid #3b5a8a" }} aria-label="Recette partagée">
            <h2 style={{ marginTop: 0 }}>Une recette vous a été partagée</h2>
            <p>
              « {recettePartagee.title} » vous est proposée. Vous pouvez l&rsquo;ajouter à vos recettes ou l&rsquo;ignorer.
            </p>
            {recettePartagee.ingredients.length > 0 ? (
              <ul>
                {recettePartagee.ingredients.map((ing, i) => (
                  <li key={i}>
                    {ing.name} — {ing.quantity}
                    {ing.unit ? " " + ing.unit : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={mutedStyle}>Aucun ingrédient indiqué dans ce partage.</p>
            )}
            {recettePartagee.steps.length > 0 && (
              <ol>
                {recettePartagee.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            )}
            <button type="button" style={btnStyle} onClick={ajouterPartage}>
              Ajouter cette recette à vos recettes
            </button>
            <button type="button" style={btnSecondaire} onClick={ignorerPartage}>
              Ignorer ce lien pour le moment
            </button>
          </section>
        )}
        {lienInvalide && (
          <section style={cardStyle} role="status">
            <p>Ce lien de partage n&rsquo;a pas pu être lu. La recette qu&rsquo;il contenait n&rsquo;a pas été ajoutée.</p>
          </section>
        )}

        {/* RECHERCHE + PANIER */}
        <section style={cardStyle} aria-label="Rechercher et filtrer">
          <h2 style={{ marginTop: 0 }}>Retrouvez vos recettes</h2>
          <label htmlFor="recherche" style={labelStyle}>
            Rechercher par ingrédient
          </label>
          <input
            type="text"
            id="recherche"
            style={inputStyle}
            placeholder="Exemple : tomates, riz, chocolat…"
            autoComplete="off"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
          <p style={mutedStyle}>
            La recherche ne tient pas compte des accents ni des majuscules. Elle cherche dans les recettes que vous
            avez saisies, et seulement dans celles-là.
          </p>

          <h3>Vos ingrédients du panier</h3>
          <p>
            Indiquez ici vos indispensables, ceux que vous avez presque toujours chez vous. Vous pourrez ensuite
            n&rsquo;afficher que les recettes qui n&rsquo;utilisent que ceux-là.
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="text"
              style={{ ...inputStyle, flex: 1 }}
              placeholder="Exemple : riz"
              value={nouvelIndispensable}
              onChange={(e) => setNouvelIndispensable(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  ajouterIndispensable();
                }
              }}
            />
            <button type="button" style={{ ...btnSecondaire, width: "auto", minWidth: 120 }} onClick={ajouterIndispensable}>
              Ajouter
            </button>
          </div>
          <div>
            {panier.length === 0 ? (
              <p style={mutedStyle}>Vous n&rsquo;avez encore indiqué aucun indispensable.</p>
            ) : (
              panier.map((p, i) => (
                <span
                  key={i}
                  style={{ display: "inline-block", background: "#eef3ee", borderRadius: 999, padding: "4px 10px", fontSize: 14, margin: "2px 4px 2px 0" }}
                >
                  {p}{" "}
                  <button
                    type="button"
                    aria-label={"Retirer " + p}
                    style={{ background: "none", border: 0, cursor: "pointer", fontSize: 16 }}
                    onClick={() => setPanier((ps) => ps.filter((_, j) => j !== i))}
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", margin: "10px 0" }}>
            <input
              type="checkbox"
              id="filtre-panier"
              style={{ width: 24, height: 24, flex: "0 0 24px", marginTop: 2 }}
              checked={filtrePanier}
              onChange={(e) => setFiltrePanier(e.target.checked)}
            />
            <label htmlFor="filtre-panier" style={{ margin: 0, fontWeight: 600 }}>
              N&rsquo;afficher que les recettes faisables avec votre panier seulement
            </label>
          </div>
          <p style={mutedStyle}>
            {filtrePanier && panier.length === 0
              ? "Indiquez d'abord vos indispensables ci-dessus pour utiliser ce filtre."
              : filtrePanier
                ? "Filtre actif : seules les recettes qui n'utilisent que vos indispensables sont affichées."
                : ""}
          </p>
        </section>

        {/* FORMULAIRE D'AJOUT */}
        <section style={cardStyle} aria-label="Ajouter une recette">
          <h2 style={{ marginTop: 0 }}>Ajoutez une de vos recettes</h2>
          <p style={mutedStyle}>
            Écrivez-la avec vos mots, vos quantités, vos habitudes. Vous pouvez la modifier ou la retirer plus tard.
          </p>
          {msgFormulaire && (
            <div
              role="status"
              style={{
                borderRadius: 12,
                padding: 12,
                marginTop: 12,
                fontWeight: msgFormulaire.type === "error" ? 700 : 400,
                background: msgFormulaire.type === "error" ? "#fdecea" : msgFormulaire.type === "warn" ? "#fff7e6" : "#eaf5ea",
                border:
                  msgFormulaire.type === "error"
                    ? "2px solid #b3261e"
                    : msgFormulaire.type === "warn"
                      ? "2px solid #c98a1b"
                      : "2px solid #2e7d32",
              }}
            >
              {msgFormulaire.texte}
            </div>
          )}
          <label htmlFor="titre" style={labelStyle}>
            Titre de votre recette
          </label>
          <input
            type="text"
            id="titre"
            style={inputStyle}
            placeholder="Exemple : la soupe de votre grand-mère — à vous de nommer la vôtre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
          <label htmlFor="portions-base" style={labelStyle}>
            Nombre de portions de base
          </label>
          <input
            type="number"
            id="portions-base"
            style={inputStyle}
            value={portionsBase}
            min={1}
            max={50}
            step={1}
            onChange={(e) => setPortionsBase(parseInt(e.target.value, 10) || 4)}
          />
          <h3>Ingrédients</h3>
          <p style={mutedStyle}>
            Pour chaque ingrédient : une quantité, une unité si vous en utilisez une, et le nom. La quantité peut
            rester écrite en lettres, par exemple « une pincée » : elle ne se recalculera pas, et la fiche vous le
            dira simplement.
          </p>
          {lignes.map((lig, i) => (
            <div key={i} style={{ display: "flex", gap: 8, margin: "8px 0", alignItems: "center" }}>
              <input
                type="text"
                style={{ ...inputStyle, padding: 12, flex: "0 0 78px" }}
                placeholder="Qté"
                aria-label="Quantité"
                value={lig.quantity}
                onChange={(e) => setLignes((ls) => ls.map((x, j) => (j === i ? { ...x, quantity: e.target.value } : x)))}
              />
              <input
                type="text"
                style={{ ...inputStyle, padding: 12, flex: "0 0 104px" }}
                placeholder="Unité"
                aria-label="Unité"
                value={lig.unit}
                onChange={(e) => setLignes((ls) => ls.map((x, j) => (j === i ? { ...x, unit: e.target.value } : x)))}
              />
              <input
                type="text"
                style={{ ...inputStyle, padding: 12, flex: 1 }}
                placeholder="Ingrédient"
                aria-label="Ingrédient"
                value={lig.name}
                onChange={(e) => setLignes((ls) => ls.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
              />
              <button
                type="button"
                aria-label="Retirer cet ingrédient"
                style={{ ...btnSecondaire, flex: "0 0 48px", width: 48, minHeight: 48, padding: 0, margin: 0 }}
                onClick={() => setLignes((ls) => ls.filter((_, j) => j !== i))}
              >
                ×
              </button>
            </div>
          ))}
          <button type="button" style={btnSecondaire} onClick={() => setLignes((ls) => [...ls, { quantity: "", unit: "", name: "" }])}>
            + Ajouter un ingrédient
          </button>
          <label htmlFor="etapes" style={labelStyle}>
            Étapes, une par ligne
          </label>
          <textarea
            id="etapes"
            style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
            placeholder="Écrivez chaque étape sur sa propre ligne."
            value={etapesTexte}
            onChange={(e) => setEtapesTexte(e.target.value)}
          />
          <button type="button" style={btnStyle} onClick={enregistrerRecette}>
            {editionId ? "Enregistrer les modifications" : "Enregistrer cette recette"}
          </button>
          {editionId && (
            <button type="button" style={btnSecondaire} onClick={reinitialiserFormulaire}>
              Annuler la modification
            </button>
          )}
        </section>

        {/* LISTE D'ÉPICERIE COMBINÉE */}
        <section style={cardStyle} aria-label="Liste d'épicerie">
          <h2 style={{ marginTop: 0 }}>Votre liste d&rsquo;épicerie</h2>
          <p>
            Cochez les recettes que vous voulez préparer, puis retrouvez ici leurs ingrédients regroupés. Quand le
            même ingrédient revient avec la même unité, les quantités s&rsquo;additionnent.
          </p>
          {selsEpicerie.length === 0 ? (
            <p style={mutedStyle}>Cochez une ou plusieurs recettes ci-dessous pour composer votre liste.</p>
          ) : (
            <div>
              {listeEpicerie.grouped.length > 0 && (
                <ul>
                  {listeEpicerie.grouped.map((g, i) => (
                    <li key={i}>
                      <strong>{g.name}</strong> — {g.total}
                      {g.unit ? " " + g.unit : ""}
                    </li>
                  ))}
                </ul>
              )}
              {listeEpicerie.nonNumeric.length > 0 && (
                <div>
                  <p>
                    <strong>Quantités à adapter à l&rsquo;œil :</strong>
                  </p>
                  <ul>
                    {listeEpicerie.nonNumeric.map((n, i) => (
                      <li key={i}>
                        {n.name}
                        {n.display ? " — " + n.display : ""}
                        {n.unit ? " " + n.unit : ""} <span style={mutedStyle}>({n.note})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {listeEpicerie.grouped.length === 0 && listeEpicerie.nonNumeric.length === 0 && (
                <p style={mutedStyle}>Les recettes sélectionnées ne contiennent pas encore d&rsquo;ingrédients.</p>
              )}
            </div>
          )}
        </section>

        {/* RECETTES */}
        <section aria-label="Vos recettes">
          <h2>Vos recettes</h2>
          {recettes.length === 0 && (
            <div style={{ ...cardStyle, textAlign: "center", padding: 22 }}>
              <p>
                <strong>Vous n&rsquo;avez encore ajouté aucune recette.</strong>
              </p>
              <p>
                Ajoutez votre première recette familiale avec le formulaire ci-dessus. C&rsquo;est vous qui décidez ce
                qui s&rsquo;y trouve — rien n&rsquo;est pré-rempli à votre place.
              </p>
            </div>
          )}
          {recettes.length > 0 && visibles.length === 0 && (
            <p style={mutedStyle}>
              Aucune recette saisie ne correspond à votre recherche pour le moment. Essayez un autre ingrédient, ou
              ajoutez une recette qui l&rsquo;utilise.
            </p>
          )}
          {visibles.map((r) => {
            const base = r.servings || 4;
            const portions = portionsAffichees[r.id] || base;
            const facteur = base ? portions / base : 1;
            const ingredientsNommes = r.ingredients.filter((ing) => String(ing.name || "").trim() !== "");
            const seule = buildGroceryList([{ recipe: r, servings: portions }]);
            return (
              <div key={r.id} style={{ ...cardStyle, background: "#fff" }}>
                <h3 style={{ marginTop: 0 }}>{r.title}</h3>
                <p style={mutedStyle}>
                  Recette de base : {base} portions. Vous l&rsquo;affichez pour {portions} portions.
                </p>
                <div style={{ display: "flex", gap: 8, alignItems: "center", margin: "10px 0" }}>
                  <button
                    type="button"
                    aria-label="Diminuer les portions"
                    style={{ ...btnSecondaire, width: 56, minHeight: 52, fontSize: 22, margin: 0 }}
                    onClick={() => majPortions(r.id, base, portions - 1)}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    aria-label="Nombre de portions"
                    style={{ ...inputStyle, textAlign: "center", fontWeight: 800, width: 90 }}
                    value={portions}
                    min={1}
                    max={50}
                    onChange={(e) => majPortions(r.id, base, parseInt(e.target.value, 10) || 1)}
                  />
                  <button
                    type="button"
                    aria-label="Augmenter les portions"
                    style={{ ...btnSecondaire, width: 56, minHeight: 52, fontSize: 22, margin: 0 }}
                    onClick={() => majPortions(r.id, base, portions + 1)}
                  >
                    +
                  </button>
                  <span>portions</span>
                </div>
                {ingredientsNommes.length === 0 ? (
                  <p style={{ ...cardStyle, background: "#fff7e6", border: "2px solid #c98a1b" }}>
                    Cette recette n&rsquo;a pas encore d&rsquo;ingrédient. Vous pourrez en ajouter en la modifiant.
                  </p>
                ) : (
                  <div>
                    <h3>Ingrédients recalculés</h3>
                    <ul>
                      {r.ingredients.map((ing, i) => {
                        if (!String(ing.name || "").trim()) return null;
                        const s = scaleQuantity(ing.quantity, facteur);
                        return (
                          <li key={i}>
                            <strong>{ing.name}</strong> — {s.display}
                            {ing.unit ? " " + ing.unit : ""}
                            {s.note ? <span style={mutedStyle}> ({s.note})</span> : ""}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                {r.steps.length === 0 ? (
                  <p style={{ ...cardStyle, background: "#fff7e6", border: "2px solid #c98a1b" }}>
                    Cette recette n&rsquo;a pas encore d&rsquo;étape. Vous pourrez en ajouter en la modifiant.
                  </p>
                ) : (
                  <div>
                    <h3>Étapes</h3>
                    <ol>
                      {r.steps.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ol>
                  </div>
                )}
                {(seule.grouped.length > 0 || seule.nonNumeric.length > 0) && (
                  <div>
                    <h3>Liste d&rsquo;épicerie pour cette recette</h3>
                    {seule.grouped.length > 0 && (
                      <ul>
                        {seule.grouped.map((g, i) => (
                          <li key={i}>
                            {g.name} — {g.total}
                            {g.unit ? " " + g.unit : ""}
                          </li>
                        ))}
                      </ul>
                    )}
                    {seule.nonNumeric.length > 0 && (
                      <p style={mutedStyle}>
                        À adapter à l&rsquo;œil :{" "}
                        {seule.nonNumeric.map((n) => n.name + (n.display ? " (" + n.display + ")" : "")).join(", ")}.
                      </p>
                    )}
                  </div>
                )}
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", margin: "10px 0" }}>
                  <input
                    type="checkbox"
                    id={"ep-" + r.id}
                    style={{ width: 24, height: 24, flex: "0 0 24px", marginTop: 2 }}
                    checked={!!selectionEpicerie[r.id]}
                    onChange={(e) => setSelectionEpicerie((s) => ({ ...s, [r.id]: e.target.checked }))}
                  />
                  <label htmlFor={"ep-" + r.id} style={{ margin: 0, fontWeight: 600 }}>
                    Ajouter cette recette à votre liste d&rsquo;épicerie combinée
                  </label>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button type="button" style={{ ...btnSecondaire, flex: 1 }} onClick={() => partagerRecette(r)}>
                    Partager cette recette
                  </button>
                  <button type="button" style={{ ...btnSecondaire, flex: 1 }} onClick={() => modifierRecette(r)}>
                    Modifier
                  </button>
                  <button type="button" style={{ ...btnDanger, flex: 1 }} onClick={() => retirerRecette(r)}>
                    Retirer
                  </button>
                </div>
                {liensPartage[r.id] && (
                  <div style={{ ...cardStyle, background: "#eef4ff", border: "2px solid #3b5a8a" }}>
                    <p>
                      <strong>Votre lien de partage :</strong>
                    </p>
                    <input type="text" readOnly style={inputStyle} value={liensPartage[r.id]} aria-label="Lien de partage" />
                    <button
                      type="button"
                      style={{ ...btnSecondaire, width: "auto", minWidth: 160 }}
                      onClick={() => copierLien(r.id)}
                    >
                      Copier le lien
                    </button>
                    {copieConfirmee === r.id && <p style={mutedStyle}>Lien copié dans votre presse-papiers, si votre appareil le permet.</p>}
                    <p style={mutedStyle}>
                      Envoyez ce lien à un proche : la recette s&rsquo;ouvrira telle quelle chez cette personne, sans
                      compte.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* LIVRAISON AUTOMATIQUE — définition honnête, future, non active */}
        <section style={cardStyle} aria-label="Livraison">
          <h2 style={{ marginTop: 0 }}>Comment la livraison fonctionnera, quand la vente ouvrira</h2>
          <p>
            Aujourd&rsquo;hui, l&rsquo;outil fonctionne ici, dans votre navigateur, avec vos recettes. Quand la vente
            ouvrira, la livraison sera automatique, sans envoi manuel : paiement hébergé, retour automatique, et
            remise immédiate de l&rsquo;outil autonome avec son lien. Aucune étape manuelle ne vous sera demandée.
          </p>
          <p style={mutedStyle}>
            Point ouvert, dit franchement : l&rsquo;hébergement de vos recettes (dans votre appareil, dans un compte,
            ou par lien) reste à trancher avant que l&rsquo;automatisation complète soit prouvée. Le prix prévu reste
            de 5&nbsp;$, aucune taxe ajoutée, tant que ce point n&rsquo;est pas tranché.
          </p>
        </section>

        <footer>
          <p style={mutedStyle}>
            Vos recettes sont conservées dans votre navigateur, sur votre appareil. Le lien de partage ne passe par
            aucun serveur et ne demande aucun compte : il contient la recette elle-même, dans l&rsquo;adresse de la
            page. Partagez-le seulement avec des proches à qui vous voulez confier cette recette.
          </p>
          <p style={mutedStyle}>Vente pas encore ouverte — aucun paiement n&rsquo;est pris.</p>
        </footer>
      </div>
    </main>
  );
}
