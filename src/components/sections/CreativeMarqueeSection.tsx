"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";

/**
 * Two rows of real ad creatives, driven by page scroll rather than a timer, so
 * it reads as an ad library rather than a portfolio carousel. This section is
 * the argument for Station 01.
 *
 * Which creatives exist is detected at build time. Whatever is present is
 * used and cycled to fill both rows; only if none exist do the --mist slots
 * show. That means a partial upload reads as finished rather than patchy —
 * six real creatives cycling look intentional, six real ones beside fifteen
 * grey boxes do not.
 */

type Tile = { id: string; angle: string; result: string };

const ROW_1: Tile[] = [
  { id: "c-01", angle: "Price anchor", result: "₹890 CPL" },
  { id: "c-02", angle: "Possession date", result: "₹1,020 CPL" },
  { id: "c-03", angle: "Walkthrough", result: "₹1,140 CPL" },
  { id: "c-04", angle: "Floor plan", result: "₹960 CPL" },
  { id: "c-05", angle: "Locality drive", result: "₹1,310 CPL" },
  { id: "c-06", angle: "Approval proof", result: "₹880 CPL" },
  { id: "c-07", angle: "Founder piece", result: "₹1,450 CPL" },
  { id: "c-08", angle: "Resident voice", result: "₹1,070 CPL" },
  { id: "c-09", angle: "Amenity cut", result: "₹1,220 CPL" },
  { id: "c-10", angle: "Investment case", result: "₹940 CPL" },
  { id: "c-11", angle: "Site progress", result: "₹1,180 CPL" },
];

const ROW_2: Tile[] = [
  { id: "c-12", angle: "Launch offer", result: "₹1,020 CPL" },
  { id: "c-13", angle: "Comparison", result: "₹1,390 CPL" },
  { id: "c-14", angle: "Schools nearby", result: "₹1,240 CPL" },
  { id: "c-15", angle: "EMI framing", result: "₹910 CPL" },
  { id: "c-16", angle: "Vastu angle", result: "₹1,330 CPL" },
  { id: "c-17", angle: "Handover proof", result: "₹1,010 CPL" },
  { id: "c-18", angle: "Drone reveal", result: "₹1,160 CPL" },
  { id: "c-19", angle: "Testimonial", result: "₹1,080 CPL" },
  { id: "c-20", angle: "Scarcity", result: "₹1,270 CPL" },
  { id: "c-21", angle: "Clubhouse", result: "₹1,150 CPL" },
];

export function CreativeMarqueeSection({ available = [] }: { available?: string[] }) {
  // Map c-01 -> the real filename, whatever its extension.
  const byId = new Map(available.map((f) => [f.replace(/\.[^.]+$/, ""), f]));
  const withFile = (tiles: Tile[]) => tiles.map((t) => ({ ...t, file: byId.get(t.id) }));
  const real = [...ROW_1, ...ROW_2].filter((t) => byId.has(t.id));

  // With a partial set, cycle only what exists so neither row shows a gap.
  const row1 = real.length
    ? withFile(real.filter((_, i) => i % 2 === 0).length ? real.filter((_, i) => i % 2 === 0) : real)
    : withFile(ROW_1);
  const row2 = real.length
    ? withFile(real.filter((_, i) => i % 2 === 1).length ? real.filter((_, i) => i % 2 === 1) : real)
    : withFile(ROW_2);

  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const fine = useMediaQuery("(pointer: fine)");

  // Scroll drives the rows through Motion values, so nothing runs on the React
  // render path per frame. A raw scroll listener here re-lays-out inside the
  // handler and is the pattern that costs mid-range devices frames.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [-260, 260]);
  const xInverse = useTransform(scrollYProgress, [0, 1], [260, -260]);

  return (
    <section
      ref={sectionRef}
      className="bg-paper pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
      aria-label="Creative library"
    >
      {/* The tiles carry a CPL, and the section thesis is that CPL is the wrong
          metric. Left unframed the two fight each other, and the loudest
          numbers on the homepage argue against the page. Framed, the spread
          becomes the evidence: same creative library, wide CPL range, wider
          booking range. */}
      <p className="mono-label text-center px-6 mb-10 max-w-3xl mx-auto leading-[1.9]">
        Nineteen angles on one buyer decision. CPL ranged ₹890 to ₹1,390 across
        them. Booking rate ranged wider. That gap is why we do not optimise on
        the cheaper number.
      </p>

      <div className="flex flex-col gap-3">
        <Row x={reduced ? undefined : x} tiles={row1} portrait fine={fine} />
        <Row x={reduced ? undefined : xInverse} tiles={row2} fine={fine} />
      </div>
    </section>
  );
}

function Row({
  x,
  tiles,
  portrait = false,
  fine,
}: {
  x?: MotionValue<number>;
  tiles: (Tile & { file?: string })[];
  portrait?: boolean;
  fine: boolean;
}) {
  // Motion's `x` shorthand is not hardware accelerated: it writes through
  // requestAnimationFrame on the main thread. A full transform string is. With
  // 63 tiles moving on scroll while the page is still loading fonts and
  // images, that is the difference between smooth and stuttering.
  const transform = useMotionTemplate`translate3d(${x ?? 0}px, 0, 0)`;
  // Tripled for seamless travel in either direction.
  const track = [...tiles, ...tiles, ...tiles];
  const w = portrait ? 260 : 300;
  const h = portrait ? 325 : 300;

  return (
    <motion.div
      style={x ? { transform } : undefined}
      className="flex gap-3 w-max will-change-transform"
    >
      {track.map((t, i) => (
        <figure
          key={`${t.id}-${i}`}
          className="tile group relative m-0 shrink-0 rounded-xl overflow-hidden border border-ink/[0.07] bg-paper-2"
          style={{ width: w, height: h }}
        >
          {t.file ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/creatives/${t.file}`}
              alt={`${t.angle} ad creative`}
              width={w}
              height={h}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          ) : (
            // Still a --mist block naming the file, per the asset note, but
            // built as a spec frame rather than an empty div: crop marks, a
            // faint hatch, and the angle it is reserved for. No stock imagery.
            //
            // The ratio quoted is the source to supply, not this tile's own
            // shape. The two rows are 4:5 and 1:1 and a partial set cycles
            // through both, so one 3:4 original has to survive either crop.
            <div className="slot w-full h-full flex flex-col justify-between p-4">
              <span className="mono-label text-graphite/70">{t.angle}</span>
              <span className="mono-label text-graphite">
                {t.id}.webp · 3:4
              </span>
            </div>
          )}

          {fine && (
            <figcaption className="absolute inset-0 flex flex-col justify-end gap-1 p-4 bg-ink/[0.88] opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out">
              <span className="mono-label text-paper">{t.angle}</span>
              <span className="font-mono text-lg text-signal-bright">{t.result}</span>
            </figcaption>
          )}
        </figure>
      ))}
    </motion.div>
  );
}
