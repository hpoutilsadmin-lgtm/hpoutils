import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/ateliers")({
  head: () => ({
    ...createSeoHead({
      title: "Ateliers sur mesure pour organismes et écoles | HP — Lanaudière",
      description: "Ateliers de groupe et offre Édition des Fêtes à Terrebonne et dans Lanaudière. Prix fermes en $ CAD, aucune taxe ajoutée.",
      path: "/ateliers",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Ateliers sur mesure pour organismes et écoles",
          serviceType: "Ateliers de groupe",
          url: "https://www.hp-outils.com/ateliers",
          provider: { "@id": "https://www.hp-outils.com/#organisation" },
          areaServed: "Lanaudière",
          offers: [
            { "@type": "Offer", price: "150.00", priceCurrency: "CAD" },
            { "@type": "Offer", price: "290.00", priceCurrency: "CAD" },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

const ATELIERS = [
  { title: "L'IA sans jargon — régulière", price: "220 $ CAD · forfait groupe", desc: "Comprendre l'IA avec des mots simples et repartir avec des usages concrets pour la vraie vie.", inclus: "Repartez avec un cas d'usage concret. Aucune taxe ajoutée." },
  { title: "Cuisine pratique", price: "260 $ CAD · forfait groupe", desc: "Cuisiner ensemble, essayer, apprendre et développer des réflexes utiles au quotidien.", inclus: "Inclut les fiches recette et astuces. Aucune taxe ajoutée." },
  { title: "Atelier jeunesse", price: "150 $ CAD · forfait groupe", desc: "Une activité participative adaptée aux jeunes pour apprendre en faisant.", inclus: "Inclut les fiches recette et astuces. Aucune taxe ajoutée." },
  { title: "Manger mieux avec moins", price: "260 $ CAD · forfait groupe", desc: "Des repères concrets pour planifier, conserver et cuisiner avec les ressources disponibles.", inclus: "Inclut les fiches recette et astuces. Aucune taxe ajoutée." },
  { title: "Les enfants cuisinent", price: "190 $ CAD · forfait groupe", duree: "90 min", desc: "Cuisiner ensemble, apprendre et gagner en autonomie.", inclus: "Aucune taxe ajoutée." },
  { title: "Hygiène & salubrité", price: "150 $ CAD · forfait groupe", duree: "60 à 90 min", desc: "Sensibilisation aux bons gestes du quotidien.", inclus: "Aucune taxe ajoutée." },
];

const FETES = [
  { title: "Pain maison à domicile", duration: "3 h · 6 à 8 personnes", price: "290 $ CAD · forfait groupe", desc: "Vous pétrissez, cuisez et repartez avec VOTRE pain des Fêtes. Soit 36 $ à 48 $ par personne." },
  { title: "L'IA sans jargon — Édition des Fêtes", duration: "2 h", price: "220 $ CAD · forfait organisme", desc: "Repartez avec un cas d'usage concret, sans langage technique." },
  { title: "La faim justifie les moyens", duration: "45 à 60 min + questions", price: "220 $ CAD · cachet", desc: "Une conférence sur pourquoi on gaspille, qui est touché et quoi faire concrètement maintenant." },
];

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Ateliers HP</span>
          <h1>Des ateliers pour mettre les outils en <em>mouvement</em>.</h1>
          <p className="lead">
             Six ateliers pratiques pour les organismes, les écoles et les groupes
            de Terrebonne, de Lanaudière et des environs. Chaque proposition peut
            être adaptée à votre milieu.
          </p>
          <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.55, marginTop: 14, maxWidth: 700 }}>« J'ai jamais su qui j'étais ni ce que j'aimais. Alors je fais un peu de tout — et j'en ai fait des ateliers pour la vraie vie. »</p>
          <div className="lead-actions">
            <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com?subject=Demande%20d%27atelier%20HP">Demander un atelier</a>
            <Link to="/outils" className="btn-ghost">Voir les outils</Link>
          </div>
        </div>
      </section>

      <section id="sec-ateliers" className="three-pillars">
        <div className="container">
          <div className="pillar-grid">
            {ATELIERS.map((a, i) => (
              <article key={a.title} className="pillar-card">
                <span className="pillar-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{a.title}</h3>
                 <p className="workshop-meta">{a.price}{"duree" in a && a.duree ? ` · ${a.duree}` : ""}</p>
                <p>{a.desc}</p>
                <p>{a.inclus}</p>
              </article>
            ))}
          </div>
          <div className="lead-actions" style={{ marginTop: 32, justifyContent: "center" }}>
            <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com?subject=Demande%20d%27atelier%20HP">hpoutils.admin@gmail.com</a>
          </div>
        </div>
      </section>

      <section className="three-pillars" id="organismes-ecoles">
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="editorial-kicker">Organismes &amp; écoles</span>
          <h2 className="section-title">La fiche, en clair</h2>
          <div style={{ fontSize: 16.5, lineHeight: 1.65 }}>
            <p>
              <strong>Prix :</strong> forfaits groupe de 150 $ à 290 $ CAD selon l'atelier,
              aucune taxe ajoutée (petit fournisseur). Les fiches recette et astuces sont
              incluses aux ateliers de cuisine.
            </p>
            <p>
              <strong>Territoire :</strong> Terrebonne, Lanaudière et les environs.
              <strong> Réservation :</strong> par courriel à{" "}
              <a href="mailto:hpoutils.admin@gmail.com?subject=Demande%20d%27atelier%20HP">hpoutils.admin@gmail.com</a> —
              chaque proposition peut être adaptée à votre milieu.
            </p>
            <p>
              <strong>Ce qui se précise à la demande :</strong> les groupes d'âge visés, les
              ratios d'encadrement, les allergies et la sécurité alimentaire, la taille de
              votre groupe, les assurances et les vérifications d'antécédents. Ces points se
              confirment avec la direction avant toute réservation — ils ne sont pas promis ici à
              l'avance. (Repère déjà établi : l'atelier Pain maison de l'Édition des Fêtes
              accueille 6 à 8 personnes.)
            </p>
          </div>
        </div>
      </section>

      <section className="three-pillars" id="formulaire-atelier">
        <div className="container" style={{ maxWidth: 760 }}>
          <span className="editorial-kicker">Formulaire atelier</span>
          <h2 className="section-title">Demander un <em>atelier</em></h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.65 }}>
            Remplis ce formulaire : il ouvre ta demande dans ton courriel, prête à
            envoyer — c'est toi qui l'envoies, rien n'est transmis avant. Un humain
            de l'équipe te répond sous 3 jours ouvrables.
          </p>
          <FormulaireAtelier />
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "#5a4a3f", marginTop: 16 }}>
            Tu préfères écrire directement ?{" "}
            <a href="mailto:hpoutils.admin@gmail.com?subject=Demande%20d%27atelier%20HP">hpoutils.admin@gmail.com</a>
          </p>
        </div>
      </section>

      <section className="collections-strip" id="edition-des-fetes">
        <div className="container">
          <span className="editorial-kicker">Du 1er octobre au 23 décembre</span>
          <h2>Ateliers &amp; conférence — <em>Édition des Fêtes</em></h2>
          <p className="strip-intro">Trois propositions saisonnières à vivre en groupe, à domicile ou dans votre organisme. Tous les prix sont en $ CAD, aucune taxe ajoutée.</p>
          <div className="pillar-grid">
            {FETES.map((offer, i) => (
              <article key={offer.title} className="pillar-card">
                <span className="pillar-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{offer.title}</h3>
                <p className="workshop-meta">{offer.duration}<br />{offer.price}</p>
                <p>{offer.desc}</p>
              </article>
            ))}
          </div>
          <div className="lead-actions" style={{ marginTop: 32 }}>
            <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com?subject=Édition%20des%20Fêtes%20HP">Réserver une date</a>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Découvre aussi</span>
          <h2 className="section-title">Prolonger <em>l'atelier</em></h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>Collaborer avec HP</h3>
              <p>Un milieu, un groupe, un besoin particulier : la page Collaborer explique comment on adapte les outils HP à ton contexte.</p>
              <Link className="pillar-cta" to="/collaborer">Collaborer →</Link>
            </article>
            <article className="pillar-card">
              <h3>En cuisine, gratuitement</h3>
              <p>Le pendant libre des ateliers cuisine : 629 recettes gratuites, un convertisseur et des idées pour les petits budgets.</p>
              <a className="pillar-cta" href="/en-cuisine/">Ouvrir En cuisine →</a>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

// « L'IA sans jargon » figure dans ATELIERS et dans FETES : on déduplique
// pour ne pas l'afficher deux fois dans la liste déroulante.
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
  const [courriel, setCourriel] = useState("");
  const [atelier, setAtelier] = useState(ATELIER_CHOICES[0]);
  const [pourQui, setPourQui] = useState("Organisme");
  const [dateSouhaitee, setDateSouhaitee] = useState("");
  const [personnes, setPersonnes] = useState("");
  const [message, setMessage] = useState("");
  const [ouvert, setOuvert] = useState(false);

  function envoyer(e: React.FormEvent) {
    e.preventDefault();
    const lignes = [
      `Nom : ${nom}`,
      `Courriel : ${courriel}`,
      `Atelier souhaité : ${atelier}`,
      `Pour qui : ${pourQui}`,
      ...(dateSouhaitee ? [`Date souhaitée : ${dateSouhaitee}`] : []),
      ...(personnes ? [`Nombre de personnes : ${personnes}`] : []),
      "",
      message,
    ];
    const sujet = `Demande d'atelier HP — ${atelier}`;
    window.location.href =
      `mailto:hpoutils.admin@gmail.com?subject=${encodeURIComponent(sujet)}` +
      `&body=${encodeURIComponent(lignes.join("\n"))}`;
    setOuvert(true);
  }

  return (
    <form onSubmit={envoyer} style={{ display: "grid", gap: 18, marginTop: 24 }}>
      <div>
        <label htmlFor="atelier-nom" style={labelStyle}>Ton nom *</label>
        <input id="atelier-nom" required value={nom} onChange={(e) => setNom(e.target.value)} style={inputStyle} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="atelier-courriel" style={labelStyle}>Ton courriel *</label>
        <input id="atelier-courriel" type="email" required value={courriel} onChange={(e) => setCourriel(e.target.value)} style={inputStyle} autoComplete="email" />
      </div>
      <div>
        <label htmlFor="atelier-choix" style={labelStyle}>Atelier souhaité *</label>
        <select id="atelier-choix" required value={atelier} onChange={(e) => setAtelier(e.target.value)} style={inputStyle}>
          {ATELIER_CHOICES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="atelier-pourqui" style={labelStyle}>Pour qui ? *</label>
        <select id="atelier-pourqui" required value={pourQui} onChange={(e) => setPourQui(e.target.value)} style={inputStyle}>
          {["Organisme", "École", "Groupe", "Famille", "Autre"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="atelier-date" style={labelStyle}>Date souhaitée</label>
        <input id="atelier-date" value={dateSouhaitee} onChange={(e) => setDateSouhaitee(e.target.value)} style={inputStyle} placeholder="Ex. : semaine du 10 novembre" />
      </div>
      <div>
        <label htmlFor="atelier-personnes" style={labelStyle}>Nombre de personnes</label>
        <input id="atelier-personnes" value={personnes} onChange={(e) => setPersonnes(e.target.value)} style={inputStyle} placeholder="Ex. : 12" inputMode="numeric" />
      </div>
      <div>
        <label htmlFor="atelier-message" style={labelStyle}>Ton besoin, en quelques mots</label>
        <textarea id="atelier-message" value={message} onChange={(e) => setMessage(e.target.value)} style={{ ...inputStyle, minHeight: 110 }} rows={4} />
      </div>
      <div>
        <button type="submit" className="btn-primary">Ouvrir ma demande dans mon courriel</button>
      </div>
      {ouvert && (
        <p role="status" style={{ fontSize: 16, lineHeight: 1.65, border: "1px solid rgba(58,42,32,.25)", borderLeft: "4px solid #3a2a20", borderRadius: 8, background: "rgba(247,244,236,.85)", padding: "14px 18px" }}>
          Ta demande s'est ouverte dans ton courriel, prête à envoyer — c'est toi qui
          l'envoies, rien n'est transmis avant. Un humain de l'équipe te répond sous
          3 jours ouvrables.
        </p>
      )}
    </form>
  );
}
