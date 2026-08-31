"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const NAV = [
  { href: "/the-loop", label: "The Loop" },
  { href: "/what-we-do", label: "What we do" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

/**
 * The hero nav scrolls away and never comes back, which leaves seven full
 * sections with no way out except the browser's back button.
 *
 * This is the replacement: a translucent layer the page scrolls *under*,
 * materialising once the hero nav has left. It arrives by animating blur and
 * scale together rather than fading opacity, so it reads as a material coming
 * forward instead of a div appearing. Enter and exit follow the same path.
 */
export function FloatingNav() {
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 220;
    if (next !== shown) setShown(next);
  });

  return (
    <>
      {/* Always mounted and faded, not conditionally rendered. Mounting it
          popped a gradient band in on the frame the nav started moving, which
          is the one moment the eye is already there. */}
      <div
        className="scroll-edge"
        aria-hidden="true"
        style={{
          opacity: shown ? 1 : 0,
          transition: "opacity 280ms var(--ease-out)",
        }}
      />
      <motion.div
        initial={false}
        animate={
          shown
            ? { y: 0, scale: 1, opacity: 1, pointerEvents: "auto" }
            : { y: -16, scale: 0.96, opacity: 0, pointerEvents: "none" }
        }
        // Critically damped, no bounce: nothing threw this, so nothing should
        // overshoot. 280ms rather than 400 — chrome that reappears on every
        // scroll past the hero cannot afford to feel like an event.
        transition={{ type: "spring", bounce: 0, duration: 0.28 }}
        style={{ transformOrigin: "top center" }}
        className="fixed top-3 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-1.5rem)] max-w-[1100px]"
      >
        <nav
          aria-label="Primary"
          aria-hidden={!shown}
          className="glass rounded-full flex items-center justify-between gap-4 pl-5 pr-2 py-2"
        >
          <Link
            href="/"
            tabIndex={shown ? undefined : -1}
            className="press font-display font-extrabold uppercase track-h2 text-base text-ink"
          >
            Grow
          </Link>
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV.slice(0, 4).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                tabIndex={shown ? undefined : -1}
                className="nav-link press text-ink font-medium uppercase tracking-wider text-[0.8rem]"
              >
                {n.label}
              </Link>
            ))}
          </div>
          <Link
            href="/contact"
            tabIndex={shown ? undefined : -1}
            className="primary-cta inline-flex items-center rounded-full bg-signal-bright text-ink font-medium uppercase tracking-widest px-5 py-2 text-[0.72rem]"
          >
            Book a call
          </Link>
        </nav>
      </motion.div>
    </>
  );
}
