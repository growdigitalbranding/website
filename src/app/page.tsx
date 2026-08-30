import { Hero } from "@/components/sections/Hero";
import { ClientStrip } from "@/components/sections/ClientStrip";
import { ProblemScrub } from "@/components/motion/PinnedScrub";
import { Stations } from "@/components/sections/Stations";
import { Return } from "@/components/sections/Return";
import { Proof } from "@/components/sections/Proof";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Objections } from "@/components/sections/Objections";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientStrip />
      <div id="the-problem">
        <ProblemScrub />
      </div>
      <Stations />
      <Return />
      <Proof />
      <WhoWeHelp />
      <HowWeWork />
      <Objections />
      <FinalCTA />
    </>
  );
}
