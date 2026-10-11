import { useId, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { subscribeToHpNews } from "@/utils/newsletter.functions";

export function NewsletterSignup({ source = "homepage" }: { source?: string }) {
  const id = useId();
  const subscribe = useServerFn(subscribeToHpNews);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    try {
      await subscribe({ data: { email, consent, source } });
      setStatus("done");
      setEmail("");
      navigate({ to: "/merci" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="newsletter-success" role="status">Merci — ton inscription est enregistrée.</p>;
  }

  return (
    <form className="newsletter-form" onSubmit={submit}>
      <label htmlFor={`${id}-email`} className="sr-only">Adresse courriel</label>
      <div className="newsletter-fields">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
          placeholder="ton@courriel.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-describedby={`${id}-consent ${id}-error`}
        />
        <Button type="submit" disabled={status === "loading" || !consent} className="btn-primary">
          {status === "loading" ? "Inscription…" : "M'inscrire aux nouveautés"}
        </Button>
      </div>
      <label id={`${id}-consent`} className="newsletter-consent consent-choice">
        <input type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)} />
        <span>J'accepte de recevoir les outils et nouveautés HP par courriel</span>
      </label>
      <p className="newsletter-consent">Désinscription en un clic. <a href="/confidentialite">Confidentialité</a></p>
      {status === "error" && (
        <p id={`${id}-error`} className="newsletter-error" role="alert">
          L'inscription n'a pas fonctionné. Réessaie dans un moment.
        </p>
      )}
    </form>
  );
}