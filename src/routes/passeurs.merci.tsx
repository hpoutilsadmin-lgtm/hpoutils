import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

// Page de retour après un abonnement aux Passeurs (Stripe redirige ici).
//
// Règles de cette page :
// - session_id est lu pour choisir le texte, jamais affiché, jamais mis dans un lien.
// - Aucun montant, aucun courriel, aucun identifiant, aucune formule affichés.
// - Aucune requête externe, aucune image, aucune librairie en plus.
// - Page non indexée.

// Interrupteur : mis à true sur go HP, 1er nov. 18 h 40, avant dépôt.
// La phrase rappelle le lien d’annulation du courriel de bienvenue ;
// l’arrivée réelle de ce courriel reste à vérifier séparément par le retest TEST 8.
const AFFICHER_ANNULATION = true;

// Forme d’un identifiant de session Stripe Checkout (cs_test_… ou cs_live_…).
// Sert seulement à écarter les valeurs absurdes. Ce n’est pas une vérification serveur.
const FORME_SESSION = /^cs_[A-Za-z0-9_]{10,200}$/;

type PasseursMerciSearch = { session_id?: string };

export const Route = createFileRoute("/passeurs/merci")({
  validateSearch: (search: Record<string, unknown>): PasseursMerciSearch => {
    const brut = search.session_id;
    return {
      session_id:
        typeof brut === "string" && FORME_SESSION.test(brut) ? brut : undefined,
    };
  },
  head: () => {
    const head = createSeoHead({
      title: "Merci | HP Outils",
      description: "Merci pour votre abonnement aux Passeurs.",
      path: "/passeurs/merci",
      noindex: true,
    });
    return {
      ...head,
      meta: [...(head.meta ?? []), { name: "referrer", content: "no-referrer" }],
    };
  },
  component: PasseursMerci,
});

function PasseursMerci() {
  const { session_id } = Route.useSearch();
  // Sert uniquement à choisir le texte. La valeur n’est jamais affichée ni réutilisée.
  const avecSession = Boolean(session_id);

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-3xl font-bold leading-tight">
        {avecSession ? "Merci pour votre abonnement." : "Merci de votre visite."}
      </h1>

      {avecSession ? (
        <>
          {AFFICHER_ANNULATION && (
            <p className="mt-5 text-lg leading-relaxed">
              Votre courriel de bienvenue contient votre lien d’annulation en 1
              clic, effet fin de période payée, sans frais, sans relance.
            </p>
          )}
          <p className="mt-5 text-lg leading-relaxed">
            Si vous n’avez reçu aucun courriel de bienvenue,{" "}
            <Link to="/contact">écrivez à la direction humaine</Link>.
          </p>
        </>
      ) : (
        <p className="mt-5 text-lg leading-relaxed">
          Pour découvrir les Passeurs, c’est par ici.
        </p>
      )}

      <Link
        to="/les-passeurs"
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg border px-6 py-3 text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Retour aux Passeurs
      </Link>
    </main>
  );
}
