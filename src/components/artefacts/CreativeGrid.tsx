"use client";

import { motion } from "framer-motion";

// Station 01. A creative pool mid-refresh: the fatigued angles drain out,
// fresh ones take their slots. Frequency figures are illustrative, not
// measured from a live account.
const TILES = [
  { id: 1, freq: 3.4, fatigued: true },
  { id: 2, freq: 1.2, fatigued: false },
  { id: 3, freq: 2.9, fatigued: true },
  { id: 4, freq: 0.8, fatigued: false },
  { id: 5, freq: 1.6, fatigued: false },
  { id: 6, freq: 3.1, fatigued: true },
  { id: 7, freq: 0.4, fatigued: false },
  { id: 8, freq: 2.2, fatigued: false },
  { id: 9, freq: 1.1, fatigued: false },
  { id: 10, freq: 3.8, fatigued: true },
  { id: 11, freq: 0.9, fatigued: false },
  { id: 12, freq: 1.9, fatigued: false },
];

export function CreativeGrid() {
  return (
    <figure className="m-0">
      <div className="grid grid-cols-4 gap-2" role="presentation">
        {TILES.map((tile, i) => (
          <motion.div
            key={tile.id}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.42, delay: Math.min(i * 0.03, 0.4), ease: [0.16, 1, 0.3, 1] }}
            className={`aspect-[4/5] rounded-md border flex flex-col justify-end p-2 ${
              tile.fatigued
                ? "border-mist bg-mist/40 opacity-45"
                : "border-signal/30 bg-signal-bright/15"
            }`}
          >
            <span className="font-mono text-[10px] text-graphite">{tile.freq.toFixed(1)}</span>
          </motion.div>
        ))}
      </div>
      <figcaption className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
        <span>
          <span className="inline-block w-2 h-2 rounded-sm bg-signal-bright/60 align-middle mr-1.5" />
          in rotation
        </span>
        <span>
          <span className="inline-block w-2 h-2 rounded-sm bg-mist align-middle mr-1.5" />
          past frequency 2.8, queued for refresh
        </span>
      </figcaption>
    </figure>
  );
}
