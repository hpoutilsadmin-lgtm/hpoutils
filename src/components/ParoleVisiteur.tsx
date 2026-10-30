// Parole de visiteur — la première parole reçue sur le site, affichée telle quelle.
// Commentaire de Maëva au sujet d'HGPTO (22 oct. 2026), posé sur l'accueil,
// juste au-dessus de la zone de vie d'HGPTO, avec sa réplique en bulle.
// NE PAS « corriger » la citation : son orthographe et son enthousiasme sont sa vérité.

const CITATION_MAEVA = "Y'é tropppp cute hgpto ! C'tu une mascotte.";

const REPLIQUE_HGPTO =
  "Une mascotte ?! Minute ! Je suis Sir H. Gepeto, le gérant du site, moi. …Mais merci, Maëva — je le prends comme un compliment. On avance !";

export function ParoleVisiteur() {
  return (
    <section className="collections-strip" style={{ textAlign: "center" }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <span className="editorial-kicker">Parole de visiteuse</span>
        <h2>
          Ce qu'on nous <em>dit</em>
        </h2>
        <p className="strip-intro" style={{ margin: "0 auto 28px" }}>
          La première parole de visiteuse arrivée jusqu’ici — la voici, telle quelle.
        </p>

        <blockquote
          style={{
            margin: "0 auto",
            maxWidth: 640,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(22px, 3.2vw, 30px)",
            lineHeight: 1.45,
            color: "#2a1a12",
          }}
        >
          «&nbsp;{CITATION_MAEVA}&nbsp;»
        </blockquote>
        <p
          style={{
            margin: "12px 0 0",
            fontWeight: 700,
            color: "#b04a2f",
            letterSpacing: "0.02em",
          }}
        >
          — Maëva
        </p>

        {/* La réplique d'HGPTO, en bulle — vexé pour rire, puis touché. */}
        <div style={{ position: "relative", maxWidth: 560, margin: "34px auto 0" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: -8,
              left: "50%",
              width: 16,
              height: 16,
              marginLeft: -8,
              transform: "rotate(45deg)",
              background: "#fff8ec",
              borderLeft: "1px solid #e5d5b8",
              borderTop: "1px solid #e5d5b8",
            }}
          />
          <div
            style={{
              background: "#fff8ec",
              border: "1px solid #e5d5b8",
              borderRadius: 18,
              padding: "18px 22px",
              textAlign: "left",
              boxShadow: "0 2px 10px rgba(42, 26, 18, 0.06)",
            }}
          >
            <p
              style={{
                margin: "0 0 6px",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#b04a2f",
              }}
            >
              Sir H. Gepeto répond&nbsp;:
            </p>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: "#2a1a12" }}>
              {REPLIQUE_HGPTO}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
