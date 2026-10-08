import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { subscribeToHpNews } from "@/utils/newsletter.functions";

export function NewsletterSignup() {
  const subscribe = useServerFn(subscribeToHpNews);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    try {
      await subscribe({ data: { email } });
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
      <label htmlFor="newsletter-email" className="sr-only">Adresse courriel</label>
      <div className="newsletter-fields">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
          placeholder="ton@courriel.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-describedby="newsletter-consent newsletter-error"
        />
        <Button type="submit" disabled={status === "loading"} className="btn-primary">
          {status === "loading" ? "Inscription…" : "M'inscrire aux nouveautés"}
        </Button>
      </div>
      <p id="newsletter-consent" className="newsletter-consent">
        En t'inscrivant, tu acceptes de recevoir les nouveautés HP. Désinscription en un clic.
      </p>
      {status === "error" && (
        <p id="newsletter-error" className="newsletter-error" role="alert">
          L'inscription n'a pas fonctionné. Réessaie dans un moment.
        </p>
      )}
    </form>
  );
}