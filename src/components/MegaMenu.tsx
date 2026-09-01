"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { PILLARS, PROPERTY_TYPES, STAGES } from "@/data/capability";

/**
 * Hover-triggered panel on fine pointers, tap-to-expand on touch.
 *
 * The 150ms close delay is the point of this component. Without it, moving
 * the pointer diagonally from the trigger toward the panel crosses a sliver of
 * dead space and the panel snaps shut — the single most common mega-menu bug,
 * and the reason so many of them feel broken rather than fast.
 *
 * Hover alone never opens it for keyboard users: focus opens it too, Escape
 * closes it and returns focus to the trigger.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const CLOSE_DELAY = 150;

type Column = { heading: string; items: { href: string; label: string }[] };

const PANELS: Record<string, Column[]> = {
  "What we do": [
    {
      heading: "Pillars",
      items: PILLARS.map((p) => ({ href: `/what-we-do#pillar-${p.n}`, label: p.name })),
    },
    {
      heading: "Property types",
      items: PROPERTY_TYPES.map((t) => ({ href: "/what-we-do#property-types", label: t.label })),
    },
    {
      heading: "Project stages",
      items: STAGES.map((s) => ({ href: "/what-we-do#stages", label: s.label })),
    },
  ],
  "Who we help": [
    {
      heading: "Sectors",
      items: [
        { href: "/who-we-help/real-estate", label: "Real estate" },
        { href: "/who-we-help/senior-living", label: "Senior living" },
        { href: "/who-we-help/interiors", label: "Interiors" },
      ],
    },
    {
      heading: "By position",
      items: [
        { href: "/what-we-do#positioning", label: "Affordable" },
        { href: "/what-we-do#positioning", label: "Premium" },
        { href: "/what-we-do#positioning", label: "Luxury" },
        { href: "/what-we-do#positioning", label: "Ultra-Luxury" },
      ],
    },
    {
      heading: "By segment",
      items: [
        { href: "/what-we-do#segments", label: "First-time buyers" },
        { href: "/what-we-do#segments", label: "Investors" },
        { href: "/what-we-do#segments", label: "NRIs" },
        { href: "/what-we-do#segments", label: "HNIs" },
      ],
    },
  ],
};

export function MegaMenu({ label, href }: { label: string; href: string }) {
  const [open, setOpen] = useState(false);
  const fine = useMediaQuery("(pointer: fine)");
  const reduced = useReducedMotion();
  const timer = useRef<number | undefined>(undefined);
  const wrap = useRef<HTMLDivElement>(null);

  const columns = PANELS[label] ?? [];

  const cancelClose = () => window.clearTimeout(timer.current);
  const scheduleClose = () => {
    cancelClose();
    timer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Escape closes and hands focus back, so the panel is never a trap.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        wrap.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      ref={wrap}
      className="relative"
      onMouseEnter={fine ? () => { cancelClose(); setOpen(true); } : undefined}
      onMouseLeave={fine ? scheduleClose : undefined}
      onFocus={() => { cancelClose(); setOpen(true); }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose();
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className="nav-link inline-flex items-center gap-1 text-ink font-medium uppercase tracking-wider text-[0.8rem]"
      >
        {label}
        <ChevronDown
          size={13}
          strokeWidth={2}
          className="transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, transition: { duration: 0.12 } }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50"
          >
            <div className="surface rounded-2xl p-6 w-[min(90vw,640px)] grid grid-cols-3 gap-6">
              {columns.map((col) => (
                <div key={col.heading}>
                  <p className="mono-label text-graphite mb-3">{col.heading}</p>
                  <ul className="flex flex-col gap-1.5">
                    {col.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="nav-link text-sm text-ink"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="col-span-3 border-t border-mist pt-4">
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="nav-link mono-label text-signal"
                >
                  See everything &rarr;
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
