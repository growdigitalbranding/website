"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Slow marquee of creative formats.
 *
 * WCAG 2.2.2 requires a mechanism to pause any motion that starts
 * automatically and lasts more than five seconds. Hover-to-pause does not
 * satisfy it — it is unreachable by keyboard and by touch — so there is a real
 * button, and it is not hidden until hover either.
 */
export function CreativeTicker({ items }: { items: string[] }) {
  const [paused, setPaused] = useState(false);
  const track = [...items, ...items];

  return (
    <div className="mt-16 sm:mt-20 border-y border-mist relative">
      <div className="overflow-hidden py-4">
        <div
          className="ticker-track flex gap-8 w-max"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {track.map((item, i) => (
            <span key={`${item}-${i}`} className="mono-label text-graphite whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="press absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-paper border border-mist flex items-center justify-center text-graphite hover:text-ink transition-colors"
      >
        {paused ? <Play size={14} strokeWidth={2} /> : <Pause size={14} strokeWidth={2} />}
        <span className="sr-only">
          {paused ? "Resume the scrolling list of creative formats" : "Pause the scrolling list of creative formats"}
        </span>
      </button>
    </div>
  );
}
