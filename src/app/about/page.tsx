import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero, CTABand } from "@/components/PageHero";
import { DirectAnswer } from "@/components/DirectAnswer";

export const metadata: Metadata = pageMeta({
  path: "/about",
  title: "An operator-run agency in Coimbatore",
  description:
    "An operator-run agency in Coimbatore, working with builders across Tamil Nadu and Karnataka. Who runs it, how many accounts we take, and who we are not for.",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT"
        title="Run by people who've bought their own media."
        subtitle="Grow is based in Coimbatore, working with builders across Tamil Nadu and Karnataka on the assumption that most agencies stop too early to matter."
      />

      <DirectAnswer>
        An operator-run agency in Coimbatore, working with builders across Tamil Nadu and Karnataka. Pricing is published rather than quoted: ₹75,000 one-time for Signal Setup, ₹1,25,000 for the Creative Engine, and ₹60,000 to ₹2,50,000 a month for the full loop above a ₹1.5L media floor. We take a small number of accounts at a time, and we do not take a percentage of spend.
      </DirectAnswer>
      <article className="mx-auto max-w-3xl px-6 py-16 flex flex-col gap-10">
        <p className="text-lg text-graphite">
          We started this agency because every real estate account we inherited had the same
          three problems: a media buyer reporting cost per lead with no idea what happened to
          those leads afterward, a tracking setup that hadn't been touched since the pixel was
          first installed, and a follow-up process that lived entirely in one overworked
          telecaller's head. Fixing all three at once, as one system, is the whole premise of
          the loop.
        </p>
        <p className="text-lg text-graphite">
          We work with a small number of accounts at a time on purpose. The creative volume and
          tracking discipline this system needs doesn't scale to fifty clients per account
          manager. If our roster is full when you call, we'll tell you and give you a real
          timeline, not a placeholder.
        </p>
        <p className="text-lg text-graphite">
          Explicitly not for us: ecommerce dropshippers, sub-₹25k/month budgets, or anyone
          shopping purely on price. If that's you, there are cheaper options and they'll serve
          you better than we would.
        </p>
      </article>
      <CTABand />
    </>
  );
}
