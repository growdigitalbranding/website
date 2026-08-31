"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";

/**
 * Two rows of real ad creatives, driven by page scroll rather than a timer, so
 * it reads as an ad library rather than a portfolio carousel. This section is
 * the argument for Station 01.
 *
 * The creatives are not in the repo yet. Per the asset note, a missing asset
 * renders as a --mist block naming what belongs there, never a stock photo.
 * Drop c-01.webp ... c-21.webp into /public/creatives and set HAS_ASSETS true.
 */
const HAS_ASSETS = false;

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

export function CreativeMarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1 = useRef<HTMLDivElement>(null);
  const row2 = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();
  const fine = useMediaQuery("(pointer: fine)");

  // Park the rows off their start so both directions have travel available.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduced) return;

    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: "200px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduced || !inView) return;

    // Capture the nodes so cleanup acts on the same elements the effect used.
    const a = row1.current;
    const b = row2.current;

    // will-change only while the section is actually on screen.
    if (a) a.style.willChange = "transform";
    if (b) b.style.willChange = "transform";

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        const offset = (window.scrollY - top + window.innerHeight) * 0.3;
        const x = offset - 200;
        if (a) a.style.transform = `translate3d(${x}px,0,0)`;
        if (b) b.style.transform = `translate3d(${-x}px,0,0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      if (a) a.style.willChange = "auto";
      if (b) b.style.willChange = "auto";
    };
  }, [inView, reduced]);

  return (
    <section
      ref={sectionRef}
      className="bg-paper pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
      aria-label="Creative library"
    >
      <p className="mono-label text-center px-6 mb-10">
        72 distinct creative angles shipped in the last 90 days
      </p>

      <div className="flex flex-col gap-3">
        <Row trackRef={row1} tiles={ROW_1} portrait fine={fine} />
        <Row trackRef={row2} tiles={ROW_2} fine={fine} />
      </div>
    </section>
  );
}

function Row({
  trackRef,
  tiles,
  portrait = false,
  fine,
}: {
  trackRef: React.RefObject<HTMLDivElement | null>;
  tiles: Tile[];
  portrait?: boolean;
  fine: boolean;
}) {
  // Tripled for seamless travel in either direction.
  const track = [...tiles, ...tiles, ...tiles];
  const w = portrait ? 260 : 300;
  const h = portrait ? 325 : 300;

  return (
    <div ref={trackRef} className="flex gap-3 w-max">
      {track.map((t, i) => (
        <figure
          key={`${t.id}-${i}`}
          className="group relative m-0 shrink-0 rounded-xl overflow-hidden border border-mist bg-paper-2"
          style={{ width: w, height: h }}
        >
          {HAS_ASSETS ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/creatives/${t.id}.webp`}
              alt={`${t.angle} ad creative`}
              width={w}
              height={h}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-end p-3 bg-mist/50">
              <span className="mono-label text-graphite">
                {t.id}.webp · {portrait ? "4:5" : "1:1"}
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
    </div>
  );
}
