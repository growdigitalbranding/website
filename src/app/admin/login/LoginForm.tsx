"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

function Form() {
  const router = useRouter();
  const params = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const f = new FormData(e.currentTarget);
    const { error } = await createClient().auth.signInWithPassword({
      email: String(f.get("email")),
      password: String(f.get("password")),
    });

    if (error) {
      setStatus("error");
      // Supabase already returns "Invalid login credentials" rather than
      // distinguishing a wrong password from an unknown address, which is the
      // right behaviour: the difference tells an attacker which emails exist.
      setError(error.message);
      return;
    }

    // The middleware only sees the new session cookie after a refresh.
    const next = params.get("next");
    router.refresh();
    router.push(next?.startsWith("/admin") ? next : "/admin");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <label className="flex flex-col gap-2">
        <span className="mono-label">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="field-input h-11 text-ink"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="mono-label">Password</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="field-input h-11 text-ink"
        />
      </label>

      {status === "error" && (
        <div role="alert" className="rounded-xl border border-flag/30 bg-flag/[0.04] p-3">
          <p className="text-flag text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="primary-cta mt-1 h-11 rounded-full bg-signal-bright text-ink font-medium uppercase tracking-widest text-xs disabled:opacity-60"
      >
        {status === "loading" ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export function LoginForm() {
  // useSearchParams needs a Suspense boundary to keep the route static.
  return (
    <Suspense fallback={<div className="h-56" />}>
      <Form />
    </Suspense>
  );
}
