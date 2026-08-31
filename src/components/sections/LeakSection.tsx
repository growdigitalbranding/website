"use client";

import { AnimatedText } from "@/components/loop/AnimatedText";
import { FadeIn, GhostCta } from "@/components/loop/ui";
import { BrokenArc, CplReadout, DeadThread, BlindPixel } from "@/components/artefacts/LeakArtefacts";

const COPY =
  "your cost per lead looks fine. but most of those leads never get called back inside an hour, your ad platform never learns which ones were real, and so it keeps buying more of the wrong ones. that is not a media buying problem. it is a loop problem.";

// The thesis sentence is the only coloured text in the section.
const HIGHLIGHT_FROM = COPY.indexOf("it is a loop problem.");

export function LeakSection() {
  return (
    <section
      id="the-leak"
      className="relative min-h-screen flex flex-col items-center justify-center bg-paper-2 px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      <FadeIn
        x={-80}
        y={0}
        delay={0.1}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[110px] sm:w-[150px] md:w-[190px]"
      >
        <BrokenArc />
      </FadeIn>
      <FadeIn
        x={80}
        y={0}
        delay={0.15}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[110px] sm:w-[150px] md:w-[190px]"
      >
        <DeadThread />
      </FadeIn>
      <FadeIn
        x={-80}
        y={0}
        delay={0.25}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]"
      >
        <CplReadout />
      </FadeIn>
      <FadeIn
        x={80}
        y={0}
        delay={0.3}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[120px] sm:w-[160px] md:w-[200px]"
      >
        <BlindPixel />
      </FadeIn>

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16 w-full">
        <FadeIn y={40} delay={0}>
          <h2
            className="display-grad font-display font-extrabold lowercase leading-none tracking-tight text-center"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            the leak
          </h2>
        </FadeIn>

        <AnimatedText
          text={COPY}
          highlightFrom={HIGHLIGHT_FROM}
          className="font-medium text-center leading-relaxed max-w-[620px]"
        />
      </div>

      <div className="relative z-10 mt-16 sm:mt-20 md:mt-24">
        <FadeIn y={20} delay={0.1}>
          <GhostCta href="#what-we-run" />
        </FadeIn>
      </div>
    </section>
  );
}
