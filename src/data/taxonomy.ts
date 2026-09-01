/**
 * Clarifying lines for the /what-we-do directory.
 *
 * Every item carries one. A bare list of ninety terms is unreadable for a
 * person and worthless for retrieval — an assistant cites the sentence that
 * answers a question, not the noun that names one. Each line is written to be
 * quotable on its own, out of context.
 *
 * These describe how the marketing motion differs, which is knowledge we can
 * stand behind. Where a claim would need portfolio data we do not have, the
 * line says something structural instead of inventing a number.
 */

export const TYPE_NOTES: Record<string, string> = {
  plots: "Shortest decision cycle of any category. Buyers compare three projects the same evening, so speed to first contact matters more than creative volume.",
  apartments: "The most competitive auction in real estate. Cost per lead is rarely the problem; the drop-off between enquiry and site visit usually is.",
  villas: "Long cycles starve the ad platform of signal. Feed it site visits and qualified stages, or it optimises on nothing for a quarter.",
  senior: "The enquirer and the resident are usually different people. Creative aimed at the adult child outperforms creative aimed at the parent.",
  farmland: "Legality and title dominate the search before price does. Answering those in public is what earns both the enquiry and the citation.",
  independent: "Sits between plots and apartments: enough emotion for a walkthrough to matter, enough pragmatism for the floor plan to close it.",
  commercial: "The buyer is running a spreadsheet, not imagining a life. Yield, tenant profile and exit horizon, in that order.",
  weekend: "The objection is never the price. It is how often they will realistically go, so drive time and usage are the whole argument.",
};

export const POSITION_NOTES: Record<string, string> = {
  affordable: "Broad audiences that fatigue fast. High angle volume and rapid rotation, with automation carrying the follow-up load.",
  mid: "The widest competitive set. Differentiation comes from the follow-up experience more often than from the ad.",
  premium: "Buyers shortlist rather than browse. Being present through a longer consideration window beats winning the first click.",
  luxury: "Low volume, high value per enquiry. Qualification protects the sales team's time more than it filters the buyer.",
  ultra: "Volume is the wrong lever above roughly five crore. Fewer angles, far higher production value, and a named person on first contact.",
};

export const STAGE_NOTES: Record<string, string> = {
  prelaunch: "The job is waitlist capture, not enquiry volume. Set measurement up before spend starts, because attribution cannot be retrofitted onto a launch.",
  launch: "The one window where scarcity is genuinely true. Spend it on reach and speed rather than on discounting.",
  ongoing: "Enough closed-deal history now exists to upload. Most accounts at this stage have never once sent it back to the platform.",
  construction: "Progress is the content. Site updates answer the objection nobody says out loud, which is whether it will actually finish.",
  possession: "A real deadline, and the one buyers believe. Urgency works here because it is not manufactured.",
  rtm: "Comparison queries dominate. The honest comparison, including where you lose, is the one that gets cited and trusted.",
  final: "Inventory-specific creative only. Generic project ads waste spend when eleven units remain.",
  relaunch: "New angles, not the launch set re-run. The market has already scrolled past those once.",
};

/** Full service lists per pillar. The homepage shows four of each. */
export const SERVICES: Record<string, { item: string; note: string }[]> = {
  Branding: [
    { item: "Brand Strategy", note: "What the project stands for before a single ad runs, so the creative has something to say." },
    { item: "Project Naming", note: "A name buyers can repeat on a phone call and spell into a search box." },
    { item: "Logo & Visual Identity", note: "The mark and system that has to survive a hoarding, a brochure and a 1080x1080 ad." },
    { item: "Brochure & Collateral", note: "The document that leaves with the buyer and gets shown to whoever was not at the visit." },
    { item: "Brand Positioning", note: "Where the project sits against the four others the buyer is looking at this week." },
    { item: "Creative Direction", note: "One visual argument across every channel, rather than five agencies' worth of taste." },
    { item: "Sales Collateral", note: "What the sales team holds in the room. Usually the weakest asset in the whole funnel." },
    { item: "Digital Branding", note: "How the project looks when someone searches it after seeing a hoarding." },
  ],
  "Lead Generation": [
    { item: "Meta Ads", note: "Still where the volume is for residential. The ad is the targeting now, not the audience settings." },
    { item: "Google Ads", note: "Catches the demand that already exists, which is why it flatters itself in reporting." },
    { item: "YouTube Ads", note: "Underused in real estate. The only channel where a walkthrough gets watched rather than skipped." },
    { item: "Landing Pages & Microsites", note: "A page that answers the objection the ad raised, instead of a form on top of a render." },
    { item: "Lead Forms", note: "Native forms buy cheap leads and expensive drop-off. Worth it only with qualification behind them." },
    { item: "Campaign Strategy", note: "Structure before spend: how many campaigns, splitting what, and what each one is allowed to learn." },
    { item: "Audience Targeting", note: "Mostly a creative decision now. Where it still matters, it matters a lot." },
    { item: "Lead Qualification", note: "Your telecaller should never be the first filter." },
    { item: "Budget Planning", note: "What the number has to be for the structure to exit learning before the month ends." },
  ],
  "Follow-Up": [
    { item: "WhatsApp Automation", note: "An acknowledgement inside sixty seconds, while they still remember filling the form." },
    { item: "CRM Process", note: "Where a lead lives, who owns it, and what happens when nobody touches it for three days." },
    { item: "Calling Discipline", note: "Attempt counts, timing and scripting. The unglamorous half that decides the booking rate." },
    { item: "Site-Visit Follow-Up", note: "The visit is not the outcome. What happens in the seventy-two hours after it is." },
    { item: "Automated Responses", note: "Answers to the four questions every enquirer asks, delivered before a human is free." },
    { item: "Drip Campaigns", note: "For buyers whose timeline is six months, not six days. Most projects give up on them at week two." },
    { item: "Enquiry Reactivation", note: "The cheapest leads you will ever buy are the ones already in the CRM." },
    { item: "Disposition Write-Back", note: "Sending call outcomes back to the ad account, so it learns which leads were real." },
  ],
  Retargeting: [
    { item: "Website Retargeting", note: "For the visitor who read three pages and did not enquire. Usually the warmest audience you own." },
    { item: "Meta Retargeting", note: "Sequenced by what they actually saw, not one catch-all audience shown the same ad for a month." },
    { item: "Google Display Retargeting", note: "Cheap reach that holds the project in view through a long consideration window." },
    { item: "Video Retargeting", note: "Built on watch depth. Someone who finished a walkthrough is not the same person as a three-second view." },
    { item: "Lead Retargeting", note: "For enquirers who went quiet. Different message from the one that acquired them." },
    { item: "Abandoned Enquiry Retargeting", note: "Form opened, form not submitted. Small audience, disproportionate return." },
    { item: "Dormant Database Reactivation", note: "Old CRM records, matched and re-approached. Most builders are sitting on a year of these." },
  ],
  Conversion: [
    { item: "Site-Visit Campaigns", note: "Optimised for visits that are kept, not appointments that are booked." },
    { item: "Booking Campaigns", note: "The only number the promoter asked about in the first meeting." },
    { item: "Offer Campaigns", note: "A reason to act this month that does not permanently reset the price expectation." },
    { item: "Inventory Clearance", note: "Unit-specific targeting when the remaining stock is the awkward stock." },
    { item: "Closing Campaigns", note: "Support for the sales team in the final conversation, not another top-of-funnel push." },
    { item: "Referral Campaigns", note: "Existing buyers are the highest-intent audience in the account and the least worked." },
    { item: "Customer Testimonials", note: "The objection-handler that works when nothing you say does." },
    { item: "Social Proof Campaigns", note: "Handovers, occupancy, resident life. Evidence the project is real and finished." },
  ],
};

export const SEGMENT_NOTES: Record<string, string> = {
  "First-Time Buyers": "Longest research phase, most questions, most reassurance. Educational content does the selling.",
  Investors: "Speak in yield and appreciation. Emotional creative actively loses them.",
  Upgraders: "Already own. The comparison is against their current home, not against your competitor.",
  NRIs: "Timezone-aware follow-up or nothing. A call at 3pm IST reaches nobody in the Gulf.",
  "Senior Citizens": "Often not the person searching. Reach the adult child and make the parent the beneficiary.",
  Families: "School proximity and commute decide more bookings than amenity lists do.",
  HNIs: "Discretion and access matter more than reach. Wrong audience for a lead form.",
  "Corporate Buyers": "Procedural buyers on procedural timelines. Documentation beats persuasion.",
  "Second-Home Buyers": "Buying a usage pattern, not a property. Drive time is the whole conversation.",
  "End-Use Buyers": "Buying to live in it. Possession certainty outranks appreciation every time.",
};
