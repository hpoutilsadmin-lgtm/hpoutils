import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { createSeoHead } from "@/lib/seo";
import { getStripeEnvironment } from "@/lib/stripe";
import {
  BUNDLE,
  FREE_TOME,
  PAYANT_TOMES,
  priceLabel,
} from "@/lib/tomes-catalog";
import {
  createTomeCheckoutSession,
  requestFreeTomeLink,
  recoverTomeLinks,
} from "@/utils/tomes.functions";

export const Route = createFileRoute("/lire")({
  head: () => createSeoHead({
    title: "Lire — À toi l'histoire | HP Outils",
    description:
      "Les tomes « À toi l'histoire » : 11 livres-jeux interactifs, de 5 $ à 8 $, reçus par lien web personnel après l'achat — plus le tome gratuit La Chasse-Galerie. Aucune taxe ajoutée.",
    path: "/lire",
  }),
  component: Page,
});

function Page() {
  const checkout = useServerFn(createTomeCheckoutSession);
  const freeLink = useServerFn(requestFreeTomeLink);
  const recover = useServerFn(recoverTomeLinks);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [freeEmail, setFreeEmail] = useState("");
  const [freeSent, setFreeSent] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState("");
  const [recoverSent, setRecoverSent] = useState(false);
  const [bundleChoice, setBundleChoice] = useState<string[]>([]);
  // « Offrir » (lot 28 oct. 2026) : une seule case pour les tomes payants
  // et le bundle. Le tome gratuit et la récupération ne sont pas concernés.
  const [giftChecked, setGiftChecked] = useState(false);
  const [giftEmail, setGiftEmail] = useState("");

  // Destinataire validé AVANT tout paiement : case cochée + courriel
  // invalide = erreur affichée, aucune session Stripe créée, aucun débit.
  // Destinataire = acheteur lui-même : le serveur retombe sur le parcours
  // normal (ce n'est pas un cadeau).
  function giftToOrError(): string | undefined | null {
    if (!giftChecked) return undefined;
    const value = giftEmail.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value.length > 254) {
      setError("Entrez un courriel valide pour la personne qui recevra le cadeau.");
      return null;
    }
    return value;
  }

  async function buyTome(slug: string) {
    setError(null);
    const giftTo = giftToOrError();
    if (giftTo === null) return;
    setBusy(`tome-${slug}`);
    try {
      const res = await checkout({ data: { kind: "tome", slug, environment: getStripeEnvironment(), giftTo } });
      if (res.checkoutUrl) window.location.href = res.checkoutUrl;
      else setError("Le paiement n'a pas pu démarrer.");
    } catch (e: any) {
      setError(e?.message ?? "Erreur au démarrage du paiement.");
    } finally {
      setBusy(null);
    }
  }

  async function buyBundle() {
    setError(null);
    if (bundleChoice.length !== BUNDLE.count) {
      setError("Choisis exactement 3 tomes pour le bundle.");
      return;
    }
    const giftTo = giftToOrError();
    if (giftTo === null) return;
    setBusy("bundle");
    try {
      const res = await checkout({ data: { kind: "bundle", tomes: bundleChoice, environment: getStripeEnvironment(), giftTo } });
      if (res.checkoutUrl) window.location.href = res.checkoutUrl;
      else setError("Le paiement n'a pas pu démarrer.");
    } catch (e: any) {
      setError(e?.message ?? "Erreur au démarrage du paiement.");
    } finally {
      setBusy(null);
    }
  }

  async function askFreeLink(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy("free");
    try {
      await freeLink({ data: { email: freeEmail } });
      setFreeSent(true);
    } catch (err: any) {
      setError(err?.message ?? "Courriel invalide.");
    } finally {
      setBusy(null);
    }
  }

  async function askRecover(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy("recover");
    try {
      await recover({ data: { email: recoverEmail } });
      setRecoverSent(true);
    } catch (err: any) {
      setError(err?.message ?? "Courriel invalide.");
    } finally {
      setBusy(null);
    }
  }

  function toggleBundle(slug: string) {
    setBundleChoice((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length >= BUNDLE.count
          ? prev
          : [...prev, slug],
    );
  }

  return (
    <>
      <PaymentTestModeBanner />
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">À toi l'histoire</span>
          <h1>Des livres-jeux qui se lisent par lien web personnel.</h1>
          <p className="lead">
            11 tomes payants, de 5 $ à 8 $, plus le tome gratuit La Chasse-Galerie.
            Après l'achat, tu reçois ton lien web personnel par courriel — pas de
            PDF, pas de compte. Aucune taxe ajoutée.
          </p>
          <div className="lead-actions">
            <Link to="/univers" className="btn-ghost">L'univers des histoires →</Link>
          </div>
        </div>
      </section>

      <section className="subpage-content">
        <div className="container">
          <p style={{ background: "#fff7e6", border: "1px solid #e5d9c3", borderRadius: 8, padding: "12px 16px" }}>
            Les liens d'accès sont envoyés par courriel après le paiement.
          </p>
          {error && <p role="alert" style={{ color: "#8a1f1f" }}>{error}</p>}

          <h2>Le tome gratuit</h2>
          <article className="pillar-card">
            <h3>{FREE_TOME.title}</h3>
            <p>{FREE_TOME.hook}</p>
            {freeSent ? (
              <p>Vérifie ta boîte courriel : ton lien gratuit est en route.</p>
            ) : (
              <form onSubmit={askFreeLink}>
                <label>
                  Ton courriel
                  <input
                    type="email"
                    required
                    value={freeEmail}
                    onChange={(e) => setFreeEmail(e.target.value)}
                    placeholder="ton@courriel.com"
                    style={{ display: "block", margin: "8px 0", padding: "10px", width: "100%", maxWidth: 360 }}
                  />
                </label>
                <button className="btn-primary" type="submit" disabled={busy === "free"}>
                  {busy === "free" ? "Envoi…" : "Recevoir mon lien gratuit"}
                </button>
              </form>
            )}
          </article>

          <div style={{ background: "#fff7e6", border: "1px solid #e5d9c3", borderRadius: 8, padding: "12px 16px", marginBottom: 16 }}>
            <label style={{ display: "flex", gap: 10, alignItems: "center", fontWeight: 700, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={giftChecked}
                onChange={(e) => setGiftChecked(e.target.checked)}
                style={{ width: 20, height: 20 }}
              />
              C'est pour offrir
            </label>
            <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.65 }}>
        C'est pour offrir ? Cochez « C'est pour offrir » et entrez le courriel de la personne de votre choix. Vous payez comme d'habitude, et c'est elle qui reçoit le lien de livraison par courriel. La facture reste à votre nom. Aucun code, aucun solde, aucune expiration. Si le lien ne fonctionne pas, écrivez à la direction humaine, un humain vous répond sous 3 jours ouvrables. En cas de remboursement, le lien est coupé.
      </p>
            {giftChecked && (
              <label style={{ fontSize: 14, fontWeight: 600 }}>
                Courriel de la personne qui recevra le cadeau
                <input
                  type="email"
                  required
                  value={giftEmail}
                  onChange={(e) => setGiftEmail(e.target.value)}
                  placeholder="son@courriel.com"
                  style={{ display: "block", margin: "8px 0 0", padding: "10px", width: "100%", maxWidth: 360 }}
                />
              </label>
            )}
          </div>

          <h2>Les 11 tomes</h2>
          <div className="pillar-grid">
            {PAYANT_TOMES.map((tome) => (
              <article className="pillar-card" key={tome.slug}>
                <h3>{tome.title}</h3>
                <p>{tome.hook}</p>
                <p>
                  {tome.paragraphes} paragraphes · {tome.fins} fins
                  {tome.public ? ` · ${tome.public}` : ""}
                </p>
                <p><strong>{priceLabel(tome)}</strong> · aucune taxe ajoutée</p>
                <button
                  className="btn-primary"
                  onClick={() => buyTome(tome.slug)}
                  disabled={busy === `tome-${tome.slug}`}
                >
                  {busy === `tome-${tome.slug}` ? "Redirection…" : `Acheter — ${priceLabel(tome)}`}
                </button>
              </article>
            ))}
          </div>

          <h2>Le bundle — 3 tomes au choix, 12 $</h2>
          <p>
            Trois tomes pour 12 $ — 15 $ à 24 $ séparément, selon les tomes choisis.
            La Chasse-Galerie est déjà gratuite : elle ne compte pas dans les trois.
          </p>
          <div className="pillar-grid">
            {PAYANT_TOMES.map((tome) => (
              <label className="pillar-card" key={tome.slug}>
                <input
                  type="checkbox"
                  checked={bundleChoice.includes(tome.slug)}
                  onChange={() => toggleBundle(tome.slug)}
                />{" "}
                <strong>{tome.title}</strong> — {priceLabel(tome)}
              </label>
            ))}
          </div>
          <p>{bundleChoice.length} / {BUNDLE.count} tomes choisis</p>
          <button className="btn-primary" onClick={buyBundle} disabled={busy === "bundle"}>
            {busy === "bundle" ? "Redirection…" : "Acheter le bundle — 12 $ CAD"}
          </button>

          <h2>Autre chose — Crée TON histoire</h2>
          <p>
            Ce n’est pas la série « À toi l’histoire » : ici, c’est vous qui
            créez votre histoire — un prénom, 1 thème parmi 4, et 2, 3 ou 4 fins.
            Bientôt — vente pas encore ouverte, aucun achat possible pour
            l’instant. Prix prévu : 5 $, aucune taxe ajoutée.
          </p>
          <p>
            <a href="/cree-ton-histoire-a-toi">Voir la fiche « Crée TON histoire » (Bientôt)</a>
          </p>

          <h2>Vous avez perdu vos liens ?</h2>
          <p>
            <a href="/recuperer-achat">Récupérer un achat →</a>
          </p>
          {recoverSent ? (
            <p>
              Si des achats existent pour ce courriel, de nouveaux liens sont en
              route. Vérifie ta boîte courriel.
            </p>
          ) : (
            <form onSubmit={askRecover}>
              <label>
                Ton courriel
                <input
                  type="email"
                  required
                  value={recoverEmail}
                  onChange={(e) => setRecoverEmail(e.target.value)}
                  placeholder="ton@courriel.com"
                  style={{ display: "block", margin: "8px 0", padding: "10px", width: "100%", maxWidth: 360 }}
                />
              </label>
              <button className="btn-primary" type="submit" disabled={busy === "recover"}>
                {busy === "recover" ? "Envoi…" : "Recevoir mes liens"}
              </button>
            </form>
          )}

          <p style={{ marginTop: 32 }}>
            Une question ? <a href="mailto:hpoutils.admin@gmail.com">Écrire à la direction humaine</a> —
            la direction humaine répond sous 3 jours ouvrables.
          </p>
        </div>
      </section>
    </>
  );
}
