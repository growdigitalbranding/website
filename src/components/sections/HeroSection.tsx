"use client";

import Link from "next/link";
import { LoopGlyph } from "@/components/loop/LoopGlyph";
import { Magnet } from "@/components/loop/Magnet";
import { FadeIn, PrimaryCta } from "@/components/loop/ui";
import { FloatingNav } from "@/components/loop/FloatingNav";

/**
 * One axis, not four. The old hero opened with seventeen taxonomy terms across
 * four lines, which is a qualification menu standing between the reader and
 * the claim. Property type is the axis a builder self-identifies on fastest,
 * so it survives, demoted to a strip at the foot of the fold where it answers
 * "is this for me" at the point of decision.
 */
const SEGMENTS = {
  full: ["Plots", "Apartments", "Villas", "Senior Living", "Commercial"],
  short: ["Plots", "Apartments", "Villas"],
};

const NAV = [
  { href: "/the-loop", label: "The Loop" },
  { href: "/what-we-do", label: "What we do" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];


function Terms({ parts }: { parts: string[] }) {
  return (
    <>
      {parts.map((text, j) => (
        <span key={text}>
          {j > 0 && <span className="text-graphite/50"> &middot; </span>}
          <span className="text-ink">{text}</span>
        </span>
      ))}
    </>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative flex flex-col min-h-[100dvh] bg-paper"
      style={{ overflowX: "clip" }}
    >
      {/* The paper had no light source: one flat value corner to corner, which
          is what made a page of hairlines and large type read as unfinished.
          A wash from above and a vignette give it a direction, with no new
          colour in the palette. */}
      <div className="ambient" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <FloatingNav />

      <FadeIn y={-20} delay={0} className="relative z-[1] px-6 md:px-10 pt-6 md:pt-8">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className="press font-display font-extrabold uppercase track-h2 text-xl md:text-2xl text-ink"
          >
            Grow
          </Link>
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="nav-link text-ink font-medium uppercase tracking-wider text-sm md:text-base lg:text-[1.05rem]"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="nav-link md:hidden text-ink font-medium uppercase tracking-wider text-sm"
          >
            Contact
          </Link>
        </div>
      </FadeIn>

      {/* The fold is one centred block rather than four stacked bands. The
          claim and the CTA sit together in the optical centre; the glyph moves
          out of the vertical run and becomes a mark beside the type, so it
          stops spending 280px of the fold on decoration. */}
      <div className="relative z-[1] flex-1 flex items-center px-6 md:px-10 py-8">
        <div className="w-full max-w-[1400px] mx-auto grid gap-10 md:gap-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="min-w-0">
            {/* The counter-claim sets up the headline, so it stays. It is no
                longer inside the h1: the h1 is now the proposition itself,
                which is what a search result and a screen reader should get. */}
            <FadeIn y={16} delay={0.1}>
              <p
                className="font-display font-medium lowercase track-h2 text-graphite leading-none mb-3 md:mb-5"
                style={{ fontSize: "clamp(1rem, 2.1vw, 1.75rem)" }}
              >
                most agencies hand you leads and stop.
              </p>
            </FadeIn>

            {/* Three fixed lines, not a fluid wrap. Two lines broke as "from ad
                to site / visit" at 390px, orphaning a word; three short ones
                fit every width and the step reads as the chain the sentence
                describes.

                overflow-x-clip, never overflow-hidden: the rise enters from
                below its own box, and clipping y would hide it outright at
                mobile sizes where the offset exceeds the line box. */}
            <h1
              className="display-grad font-display font-extrabold lowercase track-display leading-[0.94] overflow-x-clip overflow-y-visible"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}
            >
              <FadeIn y={34} delay={0.22}>
                <span className="block">from ad</span>
              </FadeIn>
              <FadeIn y={34} delay={0.3}>
                <span className="block">to site visit</span>
              </FadeIn>
              <FadeIn y={34} delay={0.38}>
                <span className="block">to booking.</span>
              </FadeIn>
            </h1>

            {/* Promoted out of the floor. This is the line that says who we
                are, who we serve and where, so it is sized to be read rather
                than found. */}
            <FadeIn y={18} delay={0.44}>
              <p
                className="text-graphite leading-[1.5] mt-5 md:mt-7 max-w-[46ch]"
                style={{ fontSize: "clamp(0.95rem, 1.55vw, 1.45rem)" }}
              >
                We own the whole chain for real estate developers in Tamil Nadu and
                Karnataka. Creative volume, clean tracking, and follow-up that actually
                closes.
              </p>
            </FadeIn>

            <FadeIn y={18} delay={0.54}>
              <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                <PrimaryCta />
                <span className="mono-label text-graphite">
                  We reply on WhatsApp inside one working hour
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Hidden below md: at phone widths the fold is already carrying the
              headline, the proposition and the CTA, and a 130px mark below all
              of it pushes the CTA under the fold. */}
          <FadeIn y={24} delay={0.66} className="hidden md:block">
            <Magnet padding={150} strength={3}>
              <LoopGlyph drawOnMount className="h-auto w-[170px] lg:w-[210px]" />
            </Magnet>
          </FadeIn>
        </div>
      </div>

      {/* The qualifier strip, at the foot of the fold rather than the head. */}
      <FadeIn y={12} delay={0.76} className="relative z-[1]">
        <div className="px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 pt-4 border-t border-mist/70 mx-6 md:mx-10">
          <p className="mono-label positioning-line text-graphite leading-[1.55]">
            <span className="sm:hidden">
              <Terms parts={SEGMENTS.short} />
            </span>
            <span className="hidden sm:inline">
              <Terms parts={SEGMENTS.full} />
            </span>
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
