import { useState } from "react";
import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Card } from "../../components/brand/Card";
import { PinInput, PinInputGroup, PinInputSeparator, PinInputSlot } from "../../components/ui/pin-input";

export const Route = createFileRoute("/admin/login")({
  validateSearch: z.object({ redirect: z.string().optional() }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/admin/login" });
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleComplete(value: string) {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: value }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) {
        setError(body.error || "Incorrect code.");
        setCode("");
        setSubmitting(false);
        return;
      }
      navigate({ to: search.redirect || "/admin" });
    } catch {
      setError("Something went wrong. Try again.");
      setCode("");
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-paper px-6 font-body">
      <Card raised className="w-full max-w-[380px]">
        <h1 className="mb-1 font-display text-heading-md font-semibold text-ink-900">Admin</h1>
        <p className="mb-6 text-body-sm text-ink-500">Enter your 6-digit code to manage the site.</p>
        <div className="flex flex-col items-center gap-4">
          <PinInput
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={code}
            onChange={setCode}
            onComplete={handleComplete}
            disabled={submitting}
            autoFocus
          >
            <PinInputGroup>
              <PinInputSlot index={0} />
              <PinInputSlot index={1} />
              <PinInputSlot index={2} />
            </PinInputGroup>
            <PinInputSeparator />
            <PinInputGroup>
              <PinInputSlot index={3} />
              <PinInputSlot index={4} />
              <PinInputSlot index={5} />
            </PinInputGroup>
          </PinInput>
          {error && <p className="text-caption text-critical">{error}</p>}
          {submitting && !error && <p className="text-caption text-ink-500">Signing in…</p>}
        </div>
      </Card>
    </div>
  );
}
