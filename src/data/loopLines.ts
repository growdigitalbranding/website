import type { PositionId, PropertyTypeId, StageId } from "./capability";

/**
 * The configurator's rule engine.
 *
 * Five stations x 8 types x 5 positions x 8 stages is 1,600 combinations, so
 * the lines are composed rather than written out.
 *
 * Resolution used one global order, stage then position then type. That fails
 * as soon as coverage fills in: whichever axis is covered highest always wins,
 * and the other two go dead. With every position written, changing the
 * property type stopped changing a single word, which is exactly how the tool
 * came to look broken.
 *
 * So priority is per station instead. Each one leads with the axis that
 * actually drives that part of the work: creative follows what is being sold,
 * tracking follows where the project sits in its lifecycle, follow-up follows
 * the price band. Any chip then changes at least one station, and no axis can
 * be starved by another.
 *
 * Overrides only exist where there is something specific and defensible to
 * say. A line that could not be written from real operating knowledge is
 * omitted so the base shows instead. Padding all 1,600 with plausible-sounding
 * filler would make the tool feel smart and be wrong.
 */

export type LoopLine = {
  base: string;
  byType?: Partial<Record<PropertyTypeId, string>>;
  byPosition?: Partial<Record<PositionId, string>>;
  byStage?: Partial<Record<StageId, string>>;
};

/** Which axis this station leads with, most specific first. */
export type Axis = "type" | "position" | "stage";

export type Station = {
  n: string;
  name: string;
  isReturn?: boolean;
  /** Defaults to type, stage, position when omitted. */
  priority?: readonly [Axis, Axis, Axis];
  line: LoopLine;
};

export const STATIONS: Station[] = [
  {
    n: "01",
    name: "Creative Engine",
    priority: ["type", "position", "stage"] as const,
    line: {
      base: "Fifteen to twenty distinct angles a month, refreshed before fatigue hits rather than after.",
      byType: {
        independent:
          "Land plus build, so the angle is ownership without the project. Privacy and plot size do the work here.",
        apartments:
          "Layout and view angles carry this one. Two buyers on the same floor plate want opposite things from it.",
        plots:
          "Price per square foot and appreciation angles, refreshed weekly. Plot buyers decide fast and compare hard.",
        senior:
          "Angles aimed at the adult child, not the resident. That is who searches, and who books the visit.",
        commercial:
          "Yield and tenant-profile angles. The buyer is running a spreadsheet, not imagining a life.",
        weekend:
          "Drive-time and second-life angles. The objection is never price, it is how often they will actually go.",
        farmland:
          "Appreciation horizon and title clarity. Both objections surface in the first conversation, so lead with them.",
      },
      byPosition: {
        luxury:
          "Restraint is the strategy. Production value over angle count, and never a price-led hook.",
        premium:
          "Fewer angles, higher craft, and lifestyle framing that survives a site visit. Discounting language undoes the position.",
        mid:
          "Steady angle rotation against a competitive set. At this budget the buyer is comparing four projects, so differentiation beats polish.",
        ultra:
          "Fewer angles, far higher production value. Volume is the wrong lever above five crore.",
        affordable:
          "High angle volume and fast rotation. At this budget the audience is broad and fatigues quickly.",
      },
      byStage: {
        construction:
          "Progress is the creative. Real site footage beats renders once there is something standing.",
        prelaunch:
          "Teaser-led creative built for waitlist capture, not enquiry volume. Scarcity is real at this stage and should not be faked later.",
        final:
          "Inventory-specific creative. Generic project ads waste spend when eleven units are left.",
        relaunch:
          "New angles, not the launch set re-run. The market has already scrolled past those.",
      },
    },
  },
  {
    n: "02",
    name: "Signal Layer",
    priority: ["stage", "type", "position"] as const,
    line: {
      base: "Conversions API with proper deduplication, server-side tagging, consent mode, and offline conversions uploaded from your CRM weekly.",
      byPosition: {
        luxury:
          "Low volume, long cycle. Feed value-based conversions or the algorithm optimises toward the cheapest enquiry.",
        premium:
          "Longer consideration, so the site-visit and qualified stages matter more to the model than the enquiry.",
        mid:
          "Volume is high enough for the algorithm to learn properly, which makes clean event hygiene worth more here than anywhere.",
      },
      byType: {
        independent:
          "Fewer, higher-value enquiries. Value-based signals matter more than event volume at this count.",
        apartments:
          "High volume and a medium cycle, so the pixel learns fast if the qualified stage is fed back, not just the form fill.",
        plots:
          "Short cycles mean the feedback loop closes fast. Upload bookings weekly and the algorithm learns inside a month.",
        villas:
          "Long cycles starve the pixel. Feed it site visits and qualified stages, not just bookings, or it optimises on nothing for a quarter.",
        senior:
          "The enquirer and the buyer are often different people. Match on the enquirer or your audiences will be built on the wrong profile.",
        commercial:
          "Long cycles and low volume. Value-based signals matter more than event counts here.",
      },
      byStage: {
        construction:
          "Long gap between enquiry and booking, so offline uploads are the only way the account sees the outcome.",
        prelaunch:
          "Set the measurement up before spend starts. Retrofitting attribution after launch loses the launch data permanently.",
        ongoing:
          "By now there is enough closed-deal history to upload. Most accounts at this stage have never once sent it back.",
      },
    },
  },
  {
    n: "03",
    name: "Follow-Up Loop",
    priority: ["position", "type", "stage"] as const,
    line: {
      base: "WhatsApp acknowledgement inside sixty seconds, qualification before your telecaller dials, and disposition written back to the ad account.",
      byType: {
        independent:
          "The objection is construction risk and timeline. Answer both before the dial, or the call becomes a defence.",
        apartments:
          "Configuration and floor preference decided in chat, so the telecaller opens with inventory that actually exists.",
        plots:
          "Speed matters most here. Plot buyers are usually enquiring on three projects the same evening.",
        senior:
          "Slower, warmer cadence. Pushing a family decision at portal speed loses it.",
        commercial:
          "Fewer leads, each worth a real conversation. Qualification is about intent and timeline, not budget.",
      },
      byPosition: {
        luxury:
          "Qualification before contact, because the wrong call at this price costs the relationship, not just the lead.",
        premium:
          "Response speed still matters, but tone matters as much. A templated blast reads cheap at this price.",
        mid:
          "Speed and consistency, because the same buyer is enquiring across the micro-market the same evening.",
        ultra:
          "No automation on the first touch. At this ticket the first contact should be a named person, and the automation only schedules it.",
        affordable:
          "Volume demands automation. Manual follow-up will not survive four hundred leads a month.",
      },
      byStage: {
        construction:
          "Nurture against a milestone calendar. Every slab is a reason to re-contact that is not a discount.",
        prelaunch:
          "Nurture, do not sell. The job is holding a waitlist warm until there is something to actually book.",
        possession:
          "Urgency is genuine now, so use it. Possession dates are the one deadline buyers believe.",
      },
    },
  },
  {
    n: "04",
    name: "Answer Visibility",
    priority: ["type", "stage", "position"] as const,
    line: {
      base: "Entity consistency, schema coverage, and a mention footprint on the sources assistants actually cite.",
      byType: {
        independent:
          "Approval status, plot dimensions and handover terms. That is what gets asked and what should be publicly answerable.",
        apartments:
          "Buyers compare three towers in the same micro-market. Be the one whose specifics an assistant can quote.",
        plots:
          "Buyers ask about approvals and title before they ask about price. Answer those in public and you get cited.",
        senior:
          "The adult child researches for weeks before calling. This is where that research happens.",
        farmland:
          "Legality questions dominate the search. Publishing straight answers earns the citation nobody else wants to write.",
      },
      byPosition: {
        luxury:
          "A small, high-intent audience researches deeply. Depth and accuracy beat reach.",
        premium:
          "Buyers research the builder before the project. Entity credibility carries more weight than project pages.",
        mid:
          "Comparison queries dominate. Being answerable on price band, location and possession is most of the work.",
        ultra:
          "Low search volume, extremely high value per query. Coverage matters more than ranking.",
      },
      byStage: {
        construction:
          "Possession timeline and approval status are the live questions. Answer them where they are being asked.",
        prelaunch:
          "Nothing to rank for yet, so build the builder's entity rather than the project's.",
        rtm:
          "Comparison queries dominate. Be the source that answers them honestly, including where you lose.",
      },
    },
  },
  {
    n: "↩",
    name: "The Return",
    priority: ["stage", "position", "type"] as const,
    isReturn: true,
    line: {
      base: "Reporting that ends at cost per booking, not cost per lead. Closed deals flow back into targeting weekly.",
      byType: {
        independent:
          "Long cycle with few units, so each closed deal teaches the account more than a batch of apartment bookings would.",
        apartments:
          "Medium cycle, so the loop closes each quarter and the next quarter starts better informed.",
        plots: "Short cycle, so the loop closes inside a month and compounds fast.",
        villas: "Long cycle, so the loop closes slowly. That is the argument for starting it now rather than next quarter.",
        commercial: "Low volume means every closed deal is a large share of the signal. Send all of them back.",
      },
      byPosition: {
        luxury:
          "Each booking is a material share of the year, so the loop closes on a handful of deals and must be measured precisely.",
        premium:
          "Fewer, larger bookings, so attribution has to be exact. One mis-assigned deal skews the whole month.",
        mid:
          "Enough monthly bookings to close the loop on real numbers rather than a trend line.",
        ultra: "Too few bookings to optimise on directly. Send qualified visits back instead and treat bookings as validation.",
      },
      byStage: {
        possession:
          "Bookings and registrations land close together now, so one month of upload finally shows the whole picture rather than half of it.",
        final:
          "Few units left, so the loop is measured on which remaining inventory moved, not on volume.",
        relaunch:
          "The account already holds the first run's outcomes. Upload them before spending again, or the relaunch starts as blind as the launch did.",
        construction:
          "Bookings land months after the ad, so the return path has to survive the gap. That is exactly what offline upload is for.",
        prelaunch: "No bookings yet, so the first loop closes on waitlist quality rather than revenue.",
      },
    },
  },
];

const DEFAULT_PRIORITY = ["type", "stage", "position"] as const;

/** First hit in this station's own axis order, else the base line. */
export function resolveLine(
  station: Station,
  type: PropertyTypeId,
  position: PositionId,
  stage: StageId
): string {
  const { line } = station;
  for (const axis of station.priority ?? DEFAULT_PRIORITY) {
    const hit =
      axis === "type"
        ? line.byType?.[type]
        : axis === "position"
          ? line.byPosition?.[position]
          : line.byStage?.[stage];
    if (hit) return hit;
  }
  return line.base;
}
