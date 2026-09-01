/**
 * Single source of truth for the capability taxonomy.
 *
 * Every capability section reads from here. No component hardcodes a label,
 * because the same terms appear in the configurator, the pillars, the
 * taxonomy page and the schema markup, and four copies drift.
 */

export const PROPERTY_TYPES = [
  { id: "plots", label: "Plots", singular: "Plot", cycle: "short", ticket: "low" },
  { id: "apartments", label: "Apartments", singular: "Apartment", cycle: "medium", ticket: "mid" },
  { id: "villas", label: "Villas", singular: "Villa", cycle: "long", ticket: "high" },
  { id: "senior", label: "Senior Living", singular: "Senior Living", cycle: "long", ticket: "mid" },
  { id: "farmland", label: "Farm Land", singular: "Farm Land", cycle: "short", ticket: "low" },
  {
    id: "independent",
    label: "Independent & Row Houses",
    singular: "Independent House",
    cycle: "medium",
    ticket: "mid",
  },
  { id: "commercial", label: "Commercial", singular: "Commercial", cycle: "long", ticket: "high" },
  { id: "weekend", label: "Weekend Homes", singular: "Weekend Home", cycle: "medium", ticket: "high" },
] as const;

export const POSITIONS = [
  { id: "affordable", label: "Affordable" },
  { id: "mid", label: "Mid-Segment" },
  { id: "premium", label: "Premium" },
  { id: "luxury", label: "Luxury" },
  { id: "ultra", label: "Ultra-Luxury" },
] as const;

export const STAGES = [
  { id: "prelaunch", label: "Pre-Launch" },
  { id: "launch", label: "Launch" },
  { id: "ongoing", label: "Ongoing Sales" },
  { id: "construction", label: "Under Construction" },
  { id: "possession", label: "Near Possession" },
  { id: "rtm", label: "Ready to Move" },
  { id: "final", label: "Final Units" },
  { id: "relaunch", label: "Re-Launch" },
] as const;

export const SEGMENTS = [
  "First-Time Buyers",
  "Investors",
  "Upgraders",
  "NRIs",
  "Senior Citizens",
  "Families",
  "HNIs",
  "Corporate Buyers",
  "Second-Home Buyers",
  "End-Use Buyers",
] as const;

export const GEOGRAPHIES = [
  { label: "Local", note: "Radius targeting around the site, for walk-ins and weekend drive-bys." },
  { label: "City-Wide", note: "The whole metro, split by micro-market so budgets do not collide." },
  { label: "Regional", note: "Tier-2 feeder towns that supply more buyers than most builders expect." },
  { label: "Pan-India", note: "Metro investor demand for appreciation-led plots and second homes." },
  { label: "NRI", note: "Gulf, Singapore and US campaigns with timezone-aware follow-up." },
  { label: "International", note: "Where a project genuinely warrants it. Most do not, and we will say so." },
] as const;

export type PropertyTypeId = (typeof PROPERTY_TYPES)[number]["id"];
export type PositionId = (typeof POSITIONS)[number]["id"];
export type StageId = (typeof STAGES)[number]["id"];

/* -------------------------------------------------------------------------
   Funnel — §6
   ------------------------------------------------------------------------- */

export type FunnelStage = {
  n: string;
  name: string;
  does: string;
  measure: string;
  /** Only the tenth stage, which curves back to the first. */
  isReturn?: boolean;
};

export const FUNNEL_STAGES: readonly FunnelStage[] = [
  { n: "01", name: "Awareness", does: "Get the project in front of the right catchment before anyone is searching for it.", measure: "REACH AT TARGET FREQUENCY" },
  { n: "02", name: "Branding", does: "Give the project a name, a look and a reason to exist that survives a site visit.", measure: "BRANDED SEARCH VOLUME" },
  { n: "03", name: "Lead Generation", does: "Buy enquiries at a price that still works after the drop-off you have not measured yet.", measure: "COST PER QUALIFIED LEAD" },
  { n: "04", name: "Qualification", does: "Separate the buyer from the browser before your telecaller spends an hour on either.", measure: "QUALIFIED RATE" },
  { n: "05", name: "Follow-Up", does: "Reach the lead inside the window where they still remember filling the form.", measure: "SPEED TO FIRST CONTACT" },
  { n: "06", name: "Retargeting", does: "Stay in front of the ones who did not answer, and the ones who visited and went quiet.", measure: "RETURN VISIT RATE" },
  { n: "07", name: "Site Visit", does: "Turn interest into an appointment that is actually kept, not just booked.", measure: "VISIT SHOW-UP RATE" },
  { n: "08", name: "Negotiation", does: "Arm the sales team with what the buyer already read, so the pitch does not restart.", measure: "VISIT TO OFFER" },
  { n: "09", name: "Booking", does: "The only number the promoter asked about in the first meeting.", measure: "COST PER BOOKING" },
  { n: "10", name: "Referral", does: "Feed closed buyers back into targeting, so the account learns who actually buys.", measure: "SIGNAL RETURNED TO THE ACCOUNT", isReturn: true },
];

/* -------------------------------------------------------------------------
   Pillars — §7
   ------------------------------------------------------------------------- */

export const PILLARS = [
  { n: "01", name: "Branding", shown: ["Brand Strategy", "Project Naming", "Logo & Visual Identity", "Brochure & Collateral"], total: 8, anchor: "services" },
  { n: "02", name: "Lead Generation", shown: ["Meta Ads", "Google Ads", "YouTube Ads", "Landing Pages & Microsites"], total: 9, anchor: "services" },
  { n: "03", name: "Follow-Up", shown: ["WhatsApp Automation", "CRM Process", "Calling Discipline", "Site-Visit Follow-Up"], total: 8, anchor: "services" },
  { n: "04", name: "Retargeting", shown: ["Website", "Meta", "Video", "Dormant Database Reactivation"], total: 7, anchor: "services" },
  { n: "05", name: "Conversion", shown: ["Site-Visit Campaigns", "Offer & Closing Campaigns", "Inventory Clearance", "Referral & Social Proof"], total: 8, anchor: "services" },
] as const;

/** Content and creative is the input to all five pillars, not a sixth. */
export const CREATIVE_TICKER = [
  "REELS", "VIDEO ADS", "PROPERTY WALKTHROUGHS", "DRONE", "CGI & 3D",
  "MOTION GRAPHICS", "STATIC CREATIVE", "TESTIMONIALS", "BUILDER FILMS",
  "PROJECT FILMS", "EDUCATIONAL", "INVESTMENT CONTENT",
] as const;
