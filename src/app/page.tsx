import { listAssets } from "@/lib/assets";
import { HeroSection } from "@/components/sections/HeroSection";
import { CreativeMarqueeSection } from "@/components/sections/CreativeMarqueeSection";
import { LeakSection } from "@/components/sections/LeakSection";
import { StationsSection } from "@/components/sections/StationsSection";
import { ConfiguratorSection } from "@/components/sections/ConfiguratorSection";
import { FunnelRibbonSection } from "@/components/sections/FunnelRibbonSection";
import { FollowUpFlowSection } from "@/components/sections/FollowUpFlowSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { OperatorSection } from "@/components/sections/OperatorSection";
import { Objections } from "@/components/sections/Objections";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export default function HomePage() {
  // Read at build time, so uploading any subset of the images just works.
  const creatives = listAssets("creatives");

  return (
    <>
      <HeroSection />
      <CreativeMarqueeSection available={creatives} />
      <LeakSection />
      {/* Stations stays on --ink. The addendum asked for it to move to paper
          on the grounds that it sits directly above the dark funnel ribbon,
          but in the revised order the configurator (--paper-2) sits between
          them, so there are no adjacent dark blocks to break up. */}
      <StationsSection />
      <ConfiguratorSection />
      <FunnelRibbonSection />
      {/* The follow-up station, shown rather than asserted. It sits directly
          after the funnel because the funnel is where the claim is made. */}
      <FollowUpFlowSection />
      <ProofSection />
      {/* Who runs this, what it costs, who it is not for. Placed after the
          proof and before the objections: the reader has seen the method and
          the evidence, and the next question is who they would be hiring. */}
      <OperatorSection />
      {/* Retained against the revised order, which omits it. This section is
          the homepage's only FAQPage schema source and answers six real
          objections before a call. */}
      <Objections />
      <FinalCtaSection />
    </>
  );
}

/*
 * PillarsSection and SegmentStripSection were removed from the homepage.
 *
 * The page was making the specialist claim six times over: the hero strip, the
 * configurator, the funnel, the pillars, the segment strip and the whole
 * /what-we-do page. It is also the least differentiating of the five things
 * this site is trying to say, since every agency in the market claims property
 * specialism, and it was crowding out the two that actually separate us.
 *
 * Those two sections were also the third and fourth consecutive capability
 * enumerations after the stations and the funnel, which is where a reader
 * stops reading lists. Both survive in full on /what-we-do, which is the page
 * built to hold a taxonomy.
 */
