import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "../components/brand/NavBar";
import { Footer } from "../components/brand/Footer";
import { Container } from "../components/brand/Container";
import { Card } from "../components/brand/Card";
import { Input, Textarea } from "../components/brand/Field";
import { Button } from "../components/brand/Button";
import { submitContactMessage } from "../lib/api/content.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [{ title: "Contact | Ameer Moavia" }, { name: "description", content: "Get in touch with Ameer Moavia." }],
  }),
  component: Contact,
});

type Status = "idle" | "submitting" | "sent" | "error";

function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const data = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
    };

    try {
      await submitContactMessage({ data });
      setStatus("sent");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      const message = err instanceof Error ? err.message : "Something went wrong. Try again.";
      setErrorMessage(message);
    }
  }

  return (
    <Container>
      <NavBar />

      <section className="flex justify-center py-24">
        <Card raised className="w-full max-w-[480px]">
          <h1 className="mb-2 font-display text-heading-lg font-semibold text-ink-900">Get in touch</h1>
          <p className="mb-6 font-body text-body-sm text-ink-500">I usually reply within a couple of days.</p>

          {status === "sent" ? (
            <p className="rounded-md bg-success-bg px-4 py-3 font-body text-body-sm text-success-fg">
              Thanks! Your message is on its way. I'll get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input name="name" label="Name" placeholder="Your name" required maxLength={200} />
              <Input name="email" label="Email" placeholder="you@studio.com" type="email" required maxLength={320} />
              <Textarea
                name="message"
                label="Message"
                placeholder="What are you working on?"
                rows={5}
                required
                maxLength={5000}
              />
              {status === "error" && (
                <p className="text-caption text-critical">{errorMessage}</p>
              )}
              <Button type="submit" disabled={status === "submitting"} className="mt-1">
                {status === "submitting" ? "Sending…" : "Send message"}
              </Button>
            </form>
          )}
        </Card>
      </section>

      <Footer />
    </Container>
  );
}
