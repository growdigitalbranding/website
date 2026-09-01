import type { PositionId, PropertyTypeId, StageId } from "./capability";

/**
 * The configurator's rule engine.
 *
 * Five stations x 8 types x 5 positions x 8 stages is 1,600 combinations, so
 * the lines are composed rather than written out. Resolution runs
 * base -> type -> position -> stage, last match wins, which means a stage
 * override speaks over a type one. That order is deliberate: where a project
 * sits in its lifecycle changes the work more than what is being sold.
 *
 * Overrides only exist where there is something specific and defensible to
 * say. Per the brief, a line that could not be written from real operating
 * knowledge is omitted so the base shows instead. Padding all 1,600 with
 * plausible-sounding filler would make the tool feel smart and be wrong.
 */

export type LoopLine = {
  base: string;
  byType?: Partial<Record<PropertyTypeId, string>>;
  byPosition?: Partial<Record<PositionId, string>>;
  byStage?: Partial<Record<StageId, string>>;
};

export type Station = {
  n: string;
  name: string;
  isReturn?: boolean;
  line: LoopLine;
};

export const STATIONS: Station[] = [
  {
    n: "01",
    name: "Creative Engine",
    line: {
      base: "Fifteen to twenty distinct angles a month, refreshed before fatigue hits rather than after.",
      byType: {
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
        ultra:
          "Fewer angles, far higher production value. Volume is the wrong lever above five crore.",
        affordable:
          "High angle volume and fast rotation. At this budget the audience is broad and fatigues quickly.",
      },
      byStage: {
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
    line: {
      base: "Conversions API with proper deduplication, server-side tagging, consent mode, and offline conversions uploaded from your CRM weekly.",
      byType: {
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
    line: {
      base: "WhatsApp acknowledgement inside sixty seconds, qualification before your telecaller dials, and disposition written back to the ad account.",
      byType: {
        plots:
          "Speed matters most here. Plot buyers are usually enquiring on three projects the same evening.",
        senior:
          "Slower, warmer cadence. Pushing a family decision at portal speed loses it.",
        commercial:
          "Fewer leads, each worth a real conversation. Qualification is about intent and timeline, not budget.",
      },
      byPosition: {
        ultra:
          "No automation on the first touch. At this ticket the first contact should be a named person, and the automation only schedules it.",
        affordable:
          "Volume demands automation. Manual follow-up will not survive four hundred leads a month.",
      },
      byStage: {
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
    line: {
      base: "Entity consistency, schema coverage, and a mention footprint on the sources assistants actually cite.",
      byType: {
        plots:
          "Buyers ask about approvals and title before they ask about price. Answer those in public and you get cited.",
        senior:
          "The adult child researches for weeks before calling. This is where that research happens.",
        farmland:
          "Legality questions dominate the search. Publishing straight answers earns the citation nobody else wants to write.",
      },
      byPosition: {
        ultra:
          "Low search volume, extremely high value per query. Coverage matters more than ranking.",
      },
      byStage: {
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
    isReturn: true,
    line: {
      base: "Reporting that ends at cost per booking, not cost per lead. Closed deals flow back into targeting weekly.",
      byType: {
        plots: "Short cycle, so the loop closes inside a month and compounds fast.",
        villas: "Long cycle, so the loop closes slowly. That is the argument for starting it now rather than next quarter.",
        commercial: "Low volume means every closed deal is a large share of the signal. Send all of them back.",
      },
      byPosition: {
        ultra: "Too few bookings to optimise on directly. Send qualified visits back instead and treat bookings as validation.",
      },
      byStage: {
        prelaunch: "No bookings yet, so the first loop closes on waitlist quality rather than revenue.",
      },
    },
  },
];

/** base -> type -> position -> stage, last match wins. */
export function resolveLine(
  line: LoopLine,
  type: PropertyTypeId,
  position: PositionId,
  stage: StageId
): string {
  return (
    line.byStage?.[stage] ??
    line.byPosition?.[position] ??
    line.byType?.[type] ??
    line.base
  );
}
