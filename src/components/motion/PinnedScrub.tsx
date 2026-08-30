"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const BEATS = [
  "Your cost per lead looks fine.",
  "But 60% of those leads never get called back inside an hour. Your platform never learns which ones were real. So it keeps buying more of the wrong ones.",
  "That's not a media buying problem. It's a loop problem.",
];

export function ProblemScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    if (!container) return;
    let trigger: { kill: () => void } | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        trigger = ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const idx = Math.min(BEATS.length - 1, Math.floor(self.progress * BEATS.length));
            setBeat(idx);
          },
        });
      }
    );

    return () => {
      cancelled = true;
      trigger?.kill();
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div className="bg-ink text-paper px-6 py-24 flex flex-col gap-8 max-w-3xl mx-auto">
        {BEATS.map((b) => (
          <p key={b} className="text-h2 font-display">
            {b}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-screen bg-ink overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <p className="mono-label text-pulse mb-6">THE PROBLEM</p>
          <p key={beat} className="text-h2 font-display text-paper animate-[beat-in_0.5s_ease-out]">
            {BEATS[beat]}
          </p>
        </div>
      </div>
      <style>{`
        @keyframes beat-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
