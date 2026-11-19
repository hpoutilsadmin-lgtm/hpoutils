import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/ateliers")({
  head: () => ({
    ...createSeoHead({
      title: "Ateliers sur mesure pour organismes, entreprises et écoles | HP Outils",
      description: "Ateliers de groupe et offre Édition des Fêtes à Terrebonne et dans Lanaudière. Prix fermes en $ CAD, aucune taxe ajoutée.",
      path: "/ateliers",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Ateliers sur mesure pour organismes, entreprises et écoles",
          serviceType: "Ateliers de groupe",
          description: "Ateliers de groupe et offre Édition des Fêtes à Terrebonne et dans Lanaudière. Prix fermes en $ CAD, aucune taxe ajoutée.",
          url: "https://www.hp-outils.com/ateliers",
          provider: { "@id": "https://www.hp-outils.com/#organisation" },
          areaServed: "Lanaudière",
          offers: [
            { "@type": "Offer", name: "L'IA sans jargon — régulière", price: "220.00", priceCurrency: "CAD", availability: "https://schema.org/InStock", url: "https://www.hp-outils.com/ateliers" },
            { "@type": "Offer", name: "Cuisine pratique", price: "260.00", priceCurrency: "CAD", availability: "https://schema.org/InStock", url: "https://www.hp-outils.com/ateliers" },
            { "@type": "Offer", name: "Atelier jeunesse", price: "150.00", priceCurrency: "CAD", availability: "https://schema.org/InStock", url: "https://www.hp-outils.com/ateliers" },
            { "@type": "Offer", name: "Manger mieux avec moins", price: "260.00", priceCurrency: "CAD", availability: "https://schema.org/InStock", url: "https://www.hp-outils.com/ateliers" },
            { "@type": "Offer", name: "Les enfants cuisinent", price: "190.00", priceCurrency: "CAD", availability: "https://schema.org/InStock", url: "https://www.hp-outils.com/ateliers" },
            { "@type": "Offer", name: "Hygiène & salubrité", price: "150.00", priceCurrency: "CAD", availability: "https://schema.org/InStock", url: "https://www.hp-outils.com/ateliers" },
            { "@type": "Offer", name: "Pain maison à domicile", price: "290.00", priceCurrency: "CAD", availability: "https://schema.org/InStock", url: "https://www.hp-outils.com/ateliers" },
            { "@type": "Offer", name: "L'IA sans jargon — Édition des Fêtes", price: "220.00", priceCurrency: "CAD", availability: "https://schema.org/InStock", url: "https://www.hp-outils.com/ateliers" },
            { "@type": "Offer", name: "La faim justifie les moyens", price: "220.00", priceCurrency: "CAD", availability: "https://schema.org/InStock", url: "https://www.hp-outils.com/ateliers" },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

// Valeurs décidées par HP le 18 nov. 2026 (lot « 5 corrections
// prioritaires », travailleur 2) — aucune durée, aucun prix, aucun
// nombre inventé : seules ces valeurs figurent sur les fiches.
const PUBLIC_CIBLE = "Écoles, organismes, entreprises, groupes";
const DEPLACEMENT =
  "Déplacement gratuit à Terrebonne, L'Assomption, Repentigny et Charlemagne, sinon 0,71 $/km.";
const MAX_PARTICIPANTS =
  "10 participants (exception pour les organismes et les écoles, sur demande)";
const MAX_PAIN_MAISON = "6 à 8 personnes";

type Fiche = {
  title: string;
  price: string;
  duree: string;
  max: string;
  desc: string;
  inclus: string;
};

const ATELIERS: Fiche[] = [
  { title: "L'IA sans jargon — régulière", price: "220 $ CAD · forfait groupe", duree: "1 h 30", max: MAX_PARTICIPANTS, desc: "Comprendre l'IA avec des mots simples et repartir avec des usages concrets pour la vraie vie.", inclus: "Repartez avec un cas d'usage concret. Aucune taxe ajoutée." },
  { title: "Cuisine pratique", price: "260 $ CAD · forfait groupe", duree: "3 h", max: MAX_PARTICIPANTS, desc: "Cuisiner ensemble, essayer, apprendre et développer des réflexes utiles au quotidien.", inclus: "Inclut les fiches recette et astuces. Aucune taxe ajoutée." },
  { title: "Atelier jeunesse", price: "150 $ CAD · forfait groupe", duree: "3 h", max: MAX_PARTICIPANTS, desc: "Une activité participative adaptée aux jeunes pour apprendre en faisant.", inclus: "Aucune taxe ajoutée." },
  { title: "Manger mieux avec moins", price: "260 $ CAD · forfait groupe", duree: "3 h", max: MAX_PARTICIPANTS, desc: "Des repères concrets pour planifier, conserver et cuisiner avec les ressources disponibles.", inclus: "Inclut les fiches recette et astuces. Aucune taxe ajoutée." },
  { title: "Les enfants cuisinent", price: "190 $ CAD · forfait groupe", duree: "1 h 30", max: MAX_PARTICIPANTS, desc: "Cuisiner ensemble, apprendre et gagner en autonomie.", inclus: "Aucune taxe ajoutée." },
  { title: "Hygiène & salubrité", price: "150 $ CAD · forfait groupe", duree: "1 h à 1 h 30", max: MAX_PARTICIPANTS, desc: "Sensibilisation aux bons gestes du quotidien.", inclus: "Aucune taxe ajoutée." },
];

const FETES: Fiche[] = [
  { title: "Pain maison à domicile", price: "290 $ CAD · forfait groupe", duree: "3 h", max: MAX_PAIN_MAISON, desc: "Vous pétrissez, cuisez et repartez avec VOTRE pain des Fêtes. Soit environ 36 $ à 48 $ par personne.", inclus: "Aucune taxe ajoutée." },
  { title: "L'IA sans jargon — Édition des Fêtes", price: "220 $ CAD · forfait groupe", duree: "2 h", max: MAX_PARTICIPANTS, desc: "Repartez avec un cas d'usage concret, sans langage technique.", inclus: "Aucune taxe ajoutée." },
  { title: "La faim justifie les moyens", price: "220 $ CAD · cachet", duree: "1 h + 15 min de questions (1 h 15 au total)", max: MAX_PARTICIPANTS, desc: "Une conférence sur pourquoi on gaspille, qui est touché et quoi faire concrètement maintenant. Aucun local cuisine requis pour cette conférence.", inclus: "Aucune taxe ajoutée." },
];

const ficheLignesStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.6,
  margin: "12px 0",
};

function FicheLignes({ fiche }: { fiche: Fiche }) {
  return (
    <dl style={ficheLignesStyle}>
      <dt style={{ fontWeight: 700 }}>Durée</dt>
      <dd style={{ margin: "0 0 8px" }}>{fiche.duree}</dd>
      <dt style={{ fontWeight: 700 }}>Pour qui</dt>
      <dd style={{ margin: "0 0 8px" }}>{PUBLIC_CIBLE}</dd>
      <dt style={{ fontWeight: 700 }}>Nombre max de participants</dt>
      <dd style={{ margin: "0 0 8px" }}>{fiche.max}</dd>
      <dt style={{ fontWeight: 700 }}>Prix</dt>
      <dd style={{ margin: "0 0 8px" }}>{fiche.price} — aucune taxe ajoutée, prix affiché = prix payé.</dd>
      <dt style={{ fontWeight: 700 }}>Déplacement</dt>
      <dd style={{ margin: 0 }}>{DEPLACEMENT}</dd>
    </dl>
  );
}

function Page() {
  const [ficheAImprimer, setFicheAImprimer] = useState<Fiche | null>(null);

  // Impression d'une seule fiche : la fiche choisie est rendue dans la
  // zone réservée à l'impression, puis window.print() est appelé — le
  // visiteur l'enregistre en PDF depuis son navigateur (même mécanisme
  // que les affiches En cuisine ; aucun générateur de PDF dans le dépôt).
  useEffect(() => {
    if (!ficheAImprimer) return;
    const timer = window.setTimeout(() => window.print(), 80);
    const apresImpression = () => setFicheAImprimer(null);
    window.addEventListener("afterprint", apresImpression);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("afterprint", apresImpression);
    };
  }, [ficheAImprimer]);

  return (
    <>
      <style>{`
        .fiche-impression { display: none; }
        @media print {
          body * { visibility: hidden; }
          .fiche-impression, .fiche-impression * { visibility: visible; }
          .fiche-impression { display: block !important; position: absolute; left: 0; top: 0; width: 100%; padding: 24px; font-size: 14px; line-height: 1.6; color: #000; background: #fff; }
          .fiche-impression h2 { font-size: 22px; margin: 0 0 12px; }
          .fiche-impression p { margin: 0 0 8px; }
        }
      `}</style>

      {ficheAImprimer && (
        <section className="fiche-impression" aria-hidden="true">
          <h2>Fiche atelier — {ficheAImprimer.title}</h2>
          <p><strong>Durée :</strong> {ficheAImprimer.duree}</p>
          <p><strong>Pour qui :</strong> {PUBLIC_CIBLE}</p>
          <p><strong>Nombre max de participants :</strong> {ficheAImprimer.max}</p>
          <p><strong>Prix :</strong> {ficheAImprimer.price} — aucune taxe ajoutée, prix affiché = prix payé.</p>
          <p><strong>Déplacement :</strong> {DEPLACEMENT}</p>
          <p><strong>Contact :</strong> hpoutils.admin@gmail.com — la direction humaine vous répond sous 3 jours ouvrables, lundi à vendredi, de 8 h à 16 h.</p>
          <p>HP Outils — Ateliers à Terrebonne et dans Lanaudière. https://www.hp-outils.com/ateliers</p>
        </section>
      )}

      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.webp)" }}>
        <div className="container">
          <span className="editorial-kicker">Ateliers HP</span>
          <h1>Des ateliers pour mettre les outils en <em>mouvement</em>.</h1>
          <p className="lead">
            Ateliers pour organismes, écoles, entreprises et groupes, à Terrebonne et dans Lanaudière.
          </p>
          <p className="lead">
             Six ateliers pratiques pour les organismes et entreprises, les écoles et les groupes
            de Terrebonne, de Lanaudière et des environs. Chaque proposition peut
            être adaptée à votre milieu.
          </p>
          <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.55, marginTop: 14, maxWidth: 700 }}>« J'ai jamais su qui j'étais ni ce que j'aimais. Alors je fais un peu de tout — et j'en ai fait des ateliers pour la vraie vie. »</p>
          <div className="lead-actions">
            <a className="btn-primary" href="#formulaire-atelier">Demander une date</a>
            <a className="btn-ghost" href="#sec-ateliers">Voir les ateliers</a>
          </div>
        </div>
      </section>

      <section className="three-pillars" id="formulaire-atelier">
        <div className="container" style={{ maxWidth: 760 }}>
          <span className="editorial-kicker">Formulaire devis</span>
          <h2 className="section-title">Demander une date</h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.65 }}>
            Remplissez ce formulaire : il ouvre votre demande dans votre courriel, prête à envoyer — c'est vous qui l'envoyez, rien n'est transmis avant. La direction humaine vous répond sous 3 jours ouvrables, lundi à vendredi, de 8 h à 16 h.
          </p>
          <FormulaireAtelier />
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "#5a4a3f", marginTop: 16 }}>
            Vous préférez écrire directement ?{" "}
            <a href="mailto:hpoutils.admin@gmail.com?subject=Demande%20d%27atelier%20HP">hpoutils.admin@gmail.com</a>
          </p>
        </div>
      </section>

      <section id="sec-ateliers" className="three-pillars">
        <div className="container">
          <div className="pillar-grid">
            {ATELIERS.map((a, i) => (
              <article key={a.title} className="pillar-card">
                <span className="pillar-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{a.title}</h3>
                 <p className="workshop-meta">{a.price}{a.duree ? ` · ${a.duree}` : ""}</p>
                <p>{a.desc}</p>
                <p>{a.inclus}</p>
                <FicheLignes fiche={a} />
                <button type="button" className="btn-ghost" onClick={() => setFicheAImprimer(a)}>Imprimer la fiche</button>
              </article>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 8 }}>Pain maison — voir <a href="#edition-des-fetes">Édition des Fêtes</a>.</p>
          <div className="lead-actions" style={{ marginTop: 32, justifyContent: "center" }}>
            <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com?subject=Demande%20d%27atelier%20HP">hpoutils.admin@gmail.com</a>
          </div>
        </div>
      </section>

      <section className="three-pillars" id="organismes-ecoles">
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="editorial-kicker">Organismes et entreprises &amp; écoles</span>
          <h2 className="section-title">La fiche, en clair</h2>
          <div style={{ fontSize: 16.5, lineHeight: 1.65 }}>
            <p>
              <strong>Prix :</strong> forfaits groupe de 150 $ à 290 $ CAD selon l'atelier,
              aucune taxe ajoutée (petit fournisseur). Les fiches recette et astuces sont
              incluses aux ateliers de cuisine.
            </p>
            <p>
              <strong>Nombre max de participants :</strong> 10 par atelier, exception pour
              les organismes et les écoles, sur demande. (Pain maison de l'Édition des
              Fêtes : 6 à 8 personnes.)
            </p>
            <p>
              <strong>Territoire :</strong> Terrebonne, Lanaudière et les environs. Déplacement gratuit à Terrebonne, L'Assomption, Repentigny et Charlemagne, sinon 0,71 $/km.
              <strong> Réservation :</strong> par courriel à{" "}
              <a href="mailto:hpoutils.admin@gmail.com?subject=Demande%20d%27atelier%20HP">hpoutils.admin@gmail.com</a> —
              chaque proposition peut être adaptée à votre milieu.
            </p>
            <p>
              <strong>Horaires :</strong> pas d'horaires fixes. C'est à vous de dire quand vous le voulez, la direction humaine valide si elle est disponible. Réservation par courriel et sur entente.
            </p>
            <p>
              <strong>Ce qui se précise à la demande :</strong> les groupes d'âge visés, les
              ratios d'encadrement, les allergies et la sécurité alimentaire, les assurances
              et les vérifications d'antécédents. Ces points se confirment avec la direction
              avant toute réservation — ils ne sont pas promis ici à l'avance.
            </p>
          </div>
        </div>
      </section>

      <section className="three-pillars" id="ecoles-bibliotheques">
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="editorial-kicker">Écoles &amp; bibliothèques</span>
          <h2 className="section-title">Pour les écoles et les <em>bibliothèques</em></h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.65 }}>
            Pour les écoles et les bibliothèques : les jeux HP sont gratuits, sans compte et sans inscription — vos élèves et vos usagers jouent dans leur navigateur. Les ateliers sont sans jargon, en français du Québec, à Terrebonne et dans Lanaudière. Pour une animation en bibliothèque ou un atelier en classe, écrivez à{" "}
            <a href="mailto:hpoutils.admin@gmail.com?subject=Animation%20en%20biblioth%C3%A8que%20%E2%80%94%20demande">hpoutils.admin@gmail.com</a> — la direction humaine vous répond sous 3 jours ouvrables, lundi à vendredi, de 8 h à 16 h.
          </p>
          <div className="lead-actions">
            <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com?subject=Animation%20en%20biblioth%C3%A8que%20%E2%80%94%20demande&body=Bonjour%2C%0A%0AJe%20souhaite%20demander%20une%20animation%20en%20biblioth%C3%A8que%20(ou%20un%20atelier%20en%20classe).%0A%0ANom%20%3A%20%0AOrganisme%20%2F%20%C3%89cole%20%2F%20Biblioth%C3%A8que%20%3A%20%0ADate%20souhait%C3%A9e%20%3A%20%0A%0AMerci.">Demander une animation en bibliothèque</a>
          </div>
        </div>
      </section>

      <section className="collections-strip" id="edition-des-fetes">
        <div className="container">
          <span className="editorial-kicker">Du 1er octobre au 23 décembre</span>
          <h2>Ateliers &amp; conférence — <em>Édition des Fêtes</em></h2>
          <p className="strip-intro">Trois propositions saisonnières à vivre en groupe, à domicile ou dans votre organisme. Tous les prix sont en $ CAD, aucune taxe ajoutée.</p>
          <p className="strip-intro">Ateliers des Fêtes sur réservation et entente. Le milieu d'accueil doit disposer d'un local cuisine, sauf pour la conférence La faim justifie les moyens.</p>
          <div className="pillar-grid">
            {FETES.map((offer, i) => (
              <article key={offer.title} className="pillar-card">
                <span className="pillar-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{offer.title}</h3>
                <p className="workshop-meta">{offer.duree}<br />{offer.price}</p>
                <p>{offer.desc}</p>
                <p>{offer.inclus}</p>
                <FicheLignes fiche={offer} />
                <div className="lead-actions" style={{ flexWrap: "wrap" }}>
                  <button type="button" className="btn-ghost" onClick={() => setFicheAImprimer(offer)}>Imprimer la fiche</button>
                  <a className="btn-primary" href="#formulaire-atelier">Demander une date</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Découvrez aussi</span>
          <h2 className="section-title">Prolonger <em>l'atelier</em></h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>Collaborer avec HP</h3>
              <p>Un milieu, un groupe, un besoin particulier : la page Collaborer explique comment on adapte les outils HP à votre contexte.</p>
              <Link className="pillar-cta" to="/collaborer">Collaborer →</Link>
            </article>
            <article className="pillar-card">
              <h3>En cuisine, gratuitement</h3>
              <p>Le pendant libre des ateliers cuisine : 666 recettes gratuites, un convertisseur et des idées pour les petits budgets.</p>
              <a className="pillar-cta" href="/en-cuisine/">Ouvrir En cuisine →</a>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

// « L'IA sans jargon » existe en deux éditions aux titres distincts
// (régulière / Édition des Fêtes) : la déduplication par titre exact
// ci-dessous ne les fusionne pas — la liste déroulante compte donc
// 9 choix, IA deux fois, un par édition.
const ATELIER_CHOICES = Array.from(
  new Set([...ATELIERS.map((a) => a.title), ...FETES.map((f) => f.title)]),
);

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  fontSize: 16,
  lineHeight: 1.5,
  border: "1px solid rgba(58,42,32,.35)",
  borderRadius: 6,
  background: "#fffdf6",
  color: "#2a1a12",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontWeight: 700,
  fontSize: 15,
  marginBottom: 6,
  color: "#2a1a12",
};

function FormulaireAtelier() {
  const [nom, setNom] = useState("");
  const [organisme, setOrganisme] = useState("");
  const [courriel, setCourriel] = useState("");
  const [atelier, setAtelier] = useState(ATELIER_CHOICES[0]);
  const [dateSouhaitee, setDateSouhaitee] = useState("");
  const [personnes, setPersonnes] = useState("");
  const [message, setMessage] = useState("");
  const [ouvert, setOuvert] = useState(false);

  function envoyer(e: React.FormEvent) {
    e.preventDefault();
    const lignes = [
      `Nom : ${nom}`,
      ...(organisme ? [`Organisme / Entreprise : ${organisme}`] : []),
      `Courriel : ${courriel}`,
      `Atelier choisi : ${atelier}`,
      ...(dateSouhaitee ? [`Date souhaitée : ${dateSouhaitee}`] : []),
      ...(personnes ? [`Nombre de participants : ${personnes}`] : []),
      "",
      message,
    ];
    const sujet = `Demande de devis / réservation d'atelier HP — ${atelier}`;
    window.location.href =
      `mailto:hpoutils.admin@gmail.com?subject=${encodeURIComponent(sujet)}` +
      `&body=${encodeURIComponent(lignes.join("\n"))}`;
    setOuvert(true);
  }

  return (
    <form onSubmit={envoyer} style={{ display: "grid", gap: 18, marginTop: 24 }}>
      <div>
        <label htmlFor="atelier-nom" style={labelStyle}>Votre nom *</label>
        <input id="atelier-nom" required value={nom} onChange={(e) => setNom(e.target.value)} style={inputStyle} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="atelier-organisme" style={labelStyle}>Organisme / Entreprise</label>
        <input id="atelier-organisme" value={organisme} onChange={(e) => setOrganisme(e.target.value)} style={inputStyle} placeholder="Ex. : école, organisme, entreprise…" autoComplete="organization" />
      </div>
      <div>
        <label htmlFor="atelier-courriel" style={labelStyle}>Votre courriel *</label>
        <input id="atelier-courriel" type="email" required value={courriel} onChange={(e) => setCourriel(e.target.value)} style={inputStyle} autoComplete="email" />
      </div>
      <div>
        <label htmlFor="atelier-choix" style={labelStyle}>Atelier choisi *</label>
        <select id="atelier-choix" required value={atelier} onChange={(e) => setAtelier(e.target.value)} style={inputStyle}>
          {ATELIER_CHOICES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="atelier-date" style={labelStyle}>Date souhaitée</label>
        <input id="atelier-date" value={dateSouhaitee} onChange={(e) => setDateSouhaitee(e.target.value)} style={inputStyle} placeholder="Ex. : semaine du 10 novembre" />
      </div>
      <div>
        <label htmlFor="atelier-personnes" style={labelStyle}>Nombre de participants</label>
        <input id="atelier-personnes" value={personnes} onChange={(e) => setPersonnes(e.target.value)} style={inputStyle} placeholder="Ex. : 12" inputMode="numeric" />
      </div>
      <div>
        <label htmlFor="atelier-message" style={labelStyle}>Message</label>
        <textarea id="atelier-message" value={message} onChange={(e) => setMessage(e.target.value)} style={{ ...inputStyle, minHeight: 110 }} rows={4} />
      </div>
      <div>
        <button type="submit" className="btn-primary">Ouvrir ma demande dans mon courriel</button>
      </div>
      {ouvert && (
        <p role="status" style={{ fontSize: 16, lineHeight: 1.65, border: "1px solid rgba(58,42,32,.25)", borderLeft: "4px solid #3a2a20", borderRadius: 8, background: "rgba(247,244,236,.85)", padding: "14px 18px" }}>
          Votre demande s'est ouverte dans votre courriel, prête à envoyer — c'est vous qui
          l'envoyez, rien n'est transmis avant. La direction humaine vous répond sous
          3 jours ouvrables, lundi à vendredi, de 8 h à 16 h.
        </p>
      )}
    </form>
  );
}
