import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/les-passeurs")({
  head: () => createSeoHead({
    title: "Les Passeurs — le bouche-à-oreille HP | Québec",
    description: "Tu as acheté un produit HP ? Deviens Passeur : tes amis ont -5 % avec ton code, et tu reçois -10 % après 2 amis acheteurs. Simple, sans piège.",
    path: "/les-passeurs",
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Programme de parrainage</span>
          <h1>Deviens <em>Passeur</em>.</h1>
          <p className="lead">
            Tu as acheté un produit HP ? Partage ton code passeur : tes amis ont
            <strong> -5 %</strong>, et quand <strong>2 amis</strong> achètent avec ton code,
            tu reçois <strong>-10 %</strong> sur ton prochain achat. Les deux côtés gagnent.
          </p>
          <div className="lead-actions">
            <Link to="/jeux" className="btn-primary">Voir les produits</Link>
            <Link to="/contact" className="btn-ghost">Une question ? Écris-moi</Link>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Comment ça marche</span>
          <h2 className="section-title">Trois étapes, zéro friction</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Reçois ton code</h3>
              <p>Ton <strong>code passeur personnel</strong> arrive par courriel après ton achat, avec un message pré-écrit à copier-coller.</p>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Partage-le</h3>
              <p>Tes amis entrent ton code au checkout → ils ont <strong>-5 %</strong> immédiatement sur leur premier achat.</p>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Récolte</h3>
              <p>Quand <strong>2 amis</strong> ont acheté avec ton code, tu reçois <strong>-10 %</strong> sur ton prochain achat. Ton compteur est indiqué dans chaque courriel.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Les paliers</span>
          <h2>Plus tu partages, plus <em>ça rapporte</em></h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>2 filleuls → -10 %</h3>
              <p>Deux amis acheteurs avec ton code, et ton prochain achat te coûte 10 % de moins.</p>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">05</span>
              <h3>5 filleuls → 1 tome gratuit</h3>
              <p>Cinq amis acheteurs, et tu choisis <strong>1 tome « À toi l'histoire » gratuit</strong>.</p>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">10</span>
              <h3>10 filleuls → bundle gratuit</h3>
              <p>Dix amis acheteurs, et le <strong>bundle Jeunesse gratuit</strong>. Les grands passeurs sont récompensés.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Les règles, simples</span>
          <h2 className="section-title">Sans piège, comme tout le reste ici</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Un code par acheteur</h3>
              <p>Ton code est personnel et non transférable. Une récompense par palier.</p>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>De vraies ventes seulement</h3>
              <p>Les codes servent aux vrais achats : usage anormal = code désactivé. On ne partage jamais les courriels de tes amis avec toi — juste ton compteur.</p>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Pas un système pyramidal</h3>
              <p>Il n'y a rien à payer pour participer, et les récompenses viennent uniquement de vraies ventes. Chaque dollar est réinvesti dans le projet.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Passeurs Créateurs</span>
          <h2>Tu fais des <em>vidéos</em> ?</h2>
          <p className="strip-intro">
            Parle d'un produit HP en vidéo — ton avis sincère, pas de script imposé — avec ton code
            passeur + #ÀToiLHistoire, et reçois <strong>1 tome au choix gratuit</strong> par vidéo publiée
            (15 secondes minimum). Vidéo à 10 000 vues et plus → <strong>bundle Jeunesse gratuit</strong> +
            on te repartage sur nos comptes. Chaque vidéo est vérifiée avant récompense.
          </p>
          <div className="lead-actions">
            <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com?subject=Passeur%20Cr%C3%A9ateur%20%E2%80%94%20ma%20vid%C3%A9o">Proposer ma vidéo</a>
          </div>
        </div>
      </section>
    </>
  );
}
