"use client";

import { useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";

export function Marquee({ items }: { items: ReactNode[] }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative">
      <div className="overflow-hidden" role="marquee" aria-label="Client logos">
        <div
          className="flex w-max marquee-track"
          style={paused ? { animationPlayState: "paused" } : undefined}
        >
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center px-8 shrink-0">
              {item}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play logo marquee" : "Pause logo marquee"}
        className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full border border-mist bg-paper text-graphite hover:text-ink"
      >
        {paused ? <Play size={14} /> : <Pause size={14} />}
      </button>
    </div>
  );
}
