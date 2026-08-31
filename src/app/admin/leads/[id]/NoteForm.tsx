"use client";

import { useRef, useState, useTransition } from "react";
import { addNote } from "./actions";

export function NoteForm({ leadId }: { leadId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <form
      ref={formRef}
      action={(formData) => {
        setError("");
        startTransition(async () => {
          const res = await addNote(formData);
          if (res?.error) setError(res.error);
          // Only clear once it is saved. Wiping the box on a failed save
          // destroys what they just typed.
          else formRef.current?.reset();
        });
      }}
      className="flex flex-col gap-3"
    >
      <input type="hidden" name="leadId" value={leadId} />
      <label className="sr-only" htmlFor="note-body">
        Add a follow-up note
      </label>
      <textarea
        id="note-body"
        name="body"
        rows={3}
        required
        maxLength={4000}
        placeholder="Called at 3pm. Wants a site visit this Saturday."
        className="w-full rounded-2xl border border-mist bg-paper p-4 text-sm outline-none focus-visible:border-signal transition-colors resize-y"
      />
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="primary-cta rounded-full bg-signal-bright text-ink px-5 py-2.5 text-xs font-medium uppercase tracking-widest disabled:opacity-60"
        >
          {pending ? "Saving…" : "Add note"}
        </button>
        {error && (
          <p role="alert" className="text-flag text-sm">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
