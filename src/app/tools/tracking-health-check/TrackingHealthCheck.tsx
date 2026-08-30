"use client";

import { useState } from "react";

const QUESTIONS = [
  "Do you have Meta Conversions API set up alongside the browser pixel?",
  "Is there a server-side GTM container running on its own subdomain?",
  "Do closed-won deals from your CRM get uploaded back to Meta/Google?",
  "Is Consent Mode v2 implemented (not just a cookie banner)?",
  "Do you use a shared event_id for browser+server dedup?",
];

export function TrackingHealthCheck() {
  const [answers, setAnswers] = useState<boolean[]>(Array(QUESTIONS.length).fill(false));
  const score = answers.filter(Boolean).length;

  return (
    <>
      <div className="flex flex-col gap-3">
        {QUESTIONS.map((q, i) => (
          <label
            key={q}
            className="flex items-start gap-3 border border-mist rounded-xl p-4 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={answers[i]}
              onChange={() => setAnswers((prev) => prev.map((a, idx) => (idx === i ? !a : a)))}
              className="mt-1 w-5 h-5 accent-signal shrink-0"
            />
            <span>{q}</span>
          </label>
        ))}
      </div>

      <div className="mt-8 border border-mist rounded-2xl p-6 bg-paper-2">
        <p className="mono-label text-graphite mb-1">YOUR SCORE</p>
        <p className="font-mono text-3xl text-signal mb-3">
          {score} / {QUESTIONS.length}
        </p>
        <p className="text-graphite">
          {score >= 4
            ? "Solid foundation — the gaps left are likely worth a targeted fix, not a full rebuild."
            : score >= 2
            ? "Enough gaps that your platform is likely optimising toward the wrong signal some of the time."
            : "This is exactly the state most accounts are in before an audit. Worth a proper look."}
        </p>
      </div>
    </>
  );
}
