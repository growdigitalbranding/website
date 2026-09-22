/**
 * Insight articles.
 *
 * Structured data rather than MDX, matching how the rest of the site carries
 * content (src/data/* + a template component). The old /insights page claimed
 * an MDX pipeline was "built and ready"; it was not, and there is no reason to
 * add the dependency for three articles that need no arbitrary markup.
 *
 * Editorial rule these were written under, and which any fourth article has to
 * keep: every number on the page is either arithmetic the reader can redo,
 * a rate the reader supplies themselves, a published price of ours, or a
 * matter of public record. Nothing here is a measured client result, because
 * measured client results are confidential and invented ones are worse than
 * none. Where a market figure is commonly quoted rather than measured by us,
 * it says so in the sentence.
 *
 * That constraint is also what makes these citable. An answer engine will
 * quote a formula and a worked example; it cannot safely quote an
 * unattributed benchmark, and neither can a buyer.
 */

export type Block =
  | { kind: "p"; lead?: string; text: string }
  | { kind: "h2"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "table"; caption?: string; head: string[]; rows: string[][] }
  | { kind: "formula"; expression: string; note?: string }
  | { kind: "callout"; label: string; items: string[] };

export type Article = {
  slug: string;
  /** H1. Phrased as the question it answers wherever that reads naturally. */
  title: string;
  /** Short label for cards and breadcrumbs. */
  shortTitle: string;
  kind: "Benchmark method" | "Tactical" | "Economics" | "Diagnostic";
  dek: string;
  description: string;
  published: string;
  updated: string;
  /**
   * The direct answer, rendered above everything else. Assistants and skim
   * readers both take the first substantive paragraph, so the conclusion goes
   * there rather than after a warm-up.
   */
  answer: string;
  blocks: Block[];
  faq: { question: string; answer: string }[];
  related: { href: string; label: string }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "good-cost-per-lead-real-estate",
    title: "What is a good cost per lead for a real estate project?",
    shortTitle: "What is a good cost per lead?",
    kind: "Benchmark method",
    dek: "There is no such number in isolation. Here is the one that replaces it, the five rates it depends on, and how to work out yours in about five minutes.",
    description:
      "Cost per lead means nothing without the five funnel rates underneath it. The formula for cost per booking, a fully worked example, and why CPL rises with ticket size.",
    published: "2026-09-22",
    updated: "2026-09-22",
    answer:
      "There is no good cost per lead in isolation. A ₹1,200 lead that books at 1% costs you ₹1,20,000 a booking. A ₹2,500 lead that books at 4% costs you ₹62,500. The second one is half the price at twice the cost per lead. The number worth holding an agency to is cost per booking, and it depends on five rates that sit between the form fill and the signed application. Work those out and you can stop negotiating CPL targets in the dark.",
    blocks: [
      { kind: "h2", text: "Why cost per lead survives as the headline number" },
      {
        kind: "p",
        text: "Three reasons, none of them about whether it is the right metric.",
      },
      {
        kind: "ol",
        items: [
          "It is the only number a media buyer can move without touching your sales process, your tracking stack or your creative pipeline. Everything downstream of the form belongs to someone else, so it gets reported as someone else's problem.",
          "It is available in week one. Cost per booking for a ₹75L ticket needs two to four months of funnel data before it stops swinging, and nobody wants to sign a retainer against a number that will not exist until the third invoice.",
          "It looks comparable between agencies. That is the dangerous part, because it usually is not, for the reasons further down this page.",
        ],
      },
      { kind: "h2", text: "The five rates between a lead and a booking" },
      {
        kind: "p",
        text: "Cost per booking is cost per lead divided by the product of every conversion step after the lead. There are usually five.",
      },
      {
        kind: "formula",
        expression:
          "Cost per booking = CPL ÷ (contact × qualified × visit booked × showed up × closed)",
        note: "Each term is a rate between 0 and 1. Multiply them, do not average them.",
      },
      {
        kind: "p",
        text: "Multiplying is the whole point. Five rates that each look survivable on their own compound into a number most builders have never calculated. Here is a worked example. The rates below are example inputs so the arithmetic is followable, not benchmarks from our accounts. Put your own in.",
      },
      {
        kind: "table",
        caption: "Worked example. Example inputs, not benchmarks.",
        head: ["Step", "Rate", "Running conversion"],
        rows: [
          ["Leads bought at ₹1,500 CPL", "", "100%"],
          ["Contacted at all", "60%", "60%"],
          ["Qualified, of those contacted", "50%", "30%"],
          ["Site visit booked, of qualified", "35%", "10.5%"],
          ["Showed up, of booked", "55%", "5.78%"],
          ["Closed, of those who showed up", "12%", "0.693%"],
        ],
      },
      {
        kind: "p",
        text: "0.693% means one booking per 144 leads. At ₹1,500 a lead, that is ₹2,16,450 of media per booking. On a ₹75L flat, that is roughly 2.9% of ticket value spent on media alone, before any agency fee or sales cost.",
      },
      {
        kind: "p",
        lead: "Now change two rates and leave cost per lead exactly where it is.",
        text: "Contact rate from 60% to 85%, which is a speed-to-lead and routing problem, not a media problem. Show-up rate from 55% to 70%, which is a reminder sequence. Nothing about the ads changes.",
      },
      {
        kind: "table",
        caption: "Same CPL, same creative, same targeting. Two downstream rates fixed.",
        head: ["Step", "Before", "After"],
        rows: [
          ["Contacted at all", "60%", "85%"],
          ["Qualified", "50%", "50%"],
          ["Site visit booked", "35%", "35%"],
          ["Showed up", "55%", "70%"],
          ["Closed", "12%", "12%"],
          ["Lead to booking", "0.693%", "1.25%"],
          ["Leads per booking", "144", "80"],
          ["Media per booking at ₹1,500 CPL", "₹2,16,450", "₹1,20,048"],
        ],
      },
      {
        kind: "p",
        text: "A 44% cut in cost per booking with the cost per lead untouched. If your agency reports only the left-hand column, it can run a technically excellent campaign while the money leaks somewhere it does not look. That is the argument for treating the funnel below the lead as part of the media buy rather than the client's own business.",
      },
      { kind: "h2", text: "Why your cost per lead rises with ticket size" },
      {
        kind: "p",
        text: "The direction is structural, so a ₹40L apartment and a ₹2.5Cr villa should never be held to the same CPL target. Three compounding causes:",
      },
      {
        kind: "ul",
        items: [
          "The qualified audience is smaller. Fewer people can service a ₹2.5Cr commitment, so you are bidding into a thinner pool and the auction price per useful impression rises.",
          "The consideration window is longer. A higher ticket takes more touches before anyone fills a form, and every touch before the conversion event is paid for but not counted.",
          "Competition concentrates. Every developer in the segment is bidding for the same narrow high-intent inventory at the same time, particularly in the weeks around a launch.",
        ],
      },
      {
        kind: "p",
        text: "Which band your own ticket size lands in is account-specific and moves with season, micro-market and launch stage. Anyone quoting you a fixed rupee CPL for a ticket size, sight unseen, is quoting their last account and not yours.",
      },
      { kind: "h2", text: "Three reasons two CPL quotes are not comparable" },
      {
        kind: "p",
        text: "Before you accept that one agency is cheaper than another, find out whether they are counting the same thing.",
      },
      {
        kind: "ul",
        items: [
          "What counts as a lead. An instant form or a click-to-WhatsApp tap is cheaper per lead than a landing page form with a phone field, and materially less qualified. Quoting the cheap event and the expensive event as the same unit makes one agency look twice as good as another at identical performance.",
          "What is inside the number. Media only, or media plus retainer, plus platform fees, plus the landing page and the creative production? A ₹900 CPL that excludes a ₹1,25,000 retainer is not a ₹900 CPL at 400 leads a month.",
          "Which period. A launch fortnight and a sustenance month have very different CPLs. A blended figure across both flatters the sustenance work and hides whether anything is being learned between launches.",
        ],
      },
      { kind: "h2", text: "What to ask before you agree a CPL target" },
      {
        kind: "ol",
        items: [
          "Which of the five rates are we measuring today, and which are we guessing?",
          "What is our current cost per booking, using last quarter's actual closes rather than a projection?",
          "Which single rate is cheapest to improve this month, and who owns it?",
          "When a booking happens, does the ad account find out? If not, cost per booking will stay flat no matter how well the media is bought.",
          "If cost per lead rises 20% and cost per booking falls 30%, will this be reported as a win or a problem?",
        ],
      },
      {
        kind: "p",
        text: "That last question is the real test. An agency compensated for a metric it can move in isolation will defend that metric.",
      },
      {
        kind: "callout",
        label: "The short version",
        items: [
          "Cost per lead is a media metric. Cost per booking is a business metric.",
          "Cost per booking = CPL divided by the product of the five post-lead rates.",
          "Five ordinary-looking rates compound to well under 1% lead-to-booking.",
          "Fixing contact rate and show-up rate alone cut the worked example's cost per booking 44% with CPL unchanged.",
          "CPL rises with ticket size for structural reasons. The bands are account-specific; anyone quoting them blind is quoting someone else's account.",
        ],
      },
    ],
    faq: [
      {
        question: "What is a good cost per lead for real estate in India?",
        answer:
          "There is no single figure, and any number quoted without your funnel rates is guesswork. Cost per lead is only meaningful divided by the five rates between the lead and the booking: contact, qualification, site visit booked, showed up, closed. A ₹1,200 lead converting at 1% to booking costs ₹1,20,000 per booking; a ₹2,500 lead converting at 4% costs ₹62,500. Calculate cost per booking and hold the agency to that instead.",
      },
      {
        question: "How do I calculate cost per booking?",
        answer:
          "Divide your cost per lead by the product of every conversion rate after the lead. With a ₹1,500 CPL, a 60% contact rate, 50% qualification, 35% site visit booked, 55% show-up and 12% close, the rates multiply to 0.693%, which is one booking per 144 leads, or ₹2,16,450 of media per booking.",
      },
      {
        question: "Why is my cost per lead higher than another builder's?",
        answer:
          "Usually because you are not counting the same event. Instant forms and click-to-WhatsApp produce cheaper, less qualified leads than a landing page form with a phone field. Beyond that, cost per lead rises structurally with ticket size, because the qualified audience is smaller, the consideration window is longer and competition concentrates on the same narrow high-intent inventory.",
      },
      {
        question: "Can cost per booking improve without cost per lead improving?",
        answer:
          "Yes, and it is usually the faster route. In the worked example on this page, raising contact rate from 60% to 85% and show-up rate from 55% to 70%, with no change to the ads, cut cost per booking by 44% while cost per lead stayed at ₹1,500.",
      },
    ],
    related: [
      { href: "/tools/cpl-calculator", label: "Run your own numbers in the CPL calculator" },
      {
        href: "/insights/channel-partner-vs-direct-leads",
        label: "The same arithmetic applied to channel partners versus direct",
      },
      { href: "/the-loop", label: "The four stations that move cost per booking" },
      { href: "/what-we-do/performance-marketing", label: "How we buy media against cost per booking" },
    ],
  },

  {
    slug: "rera-approval-status-lead-quality",
    title: "How RERA and approval status change your lead quality",
    shortTitle: "RERA, approvals and lead quality",
    kind: "Tactical",
    dek: "Leading with registration and approval status raises your cost per lead and lowers your cost per booking. Here is the arithmetic of that trade, and where approval status belongs in the funnel.",
    description:
      "Why putting RERA registration and approval status in the creative, not the footer, raises cost per lead and lowers cost per booking. Plus what you can legitimately run before registration.",
    published: "2026-09-22",
    updated: "2026-09-22",
    answer:
      "Approval status is the first filter a serious buyer applies and the last thing an unserious one cares about. Put it in the creative and fewer people click, so your cost per lead rises. The people who do click have already self-selected on the thing that kills most deals late, so qualification and site visit rates rise with it. The trade is worth making whenever the qualification-rate gain is proportionally larger than the cost-per-lead loss, and it usually is, because the two effects are not the same size.",
    blocks: [
      { kind: "h2", text: "What the law requires, in one paragraph" },
      {
        kind: "p",
        text: "Under the Real Estate (Regulation and Development) Act, 2016, a project falling within the Act's scope has to be registered with the state authority before it is advertised, marketed, booked or offered for sale, and the registration number has to appear in the advertisement. In Tamil Nadu the authority is TNRERA. Plotted developments carry a separate layout approval from DTCP or the relevant local planning authority, which is what buyers here usually mean when they ask whether a layout is approved.",
      },
      {
        kind: "p",
        lead: "This is marketing guidance, not legal advice.",
        text: "Thresholds, exemptions and disclosure formats vary by state and change by circular. Have your counsel confirm what applies to a specific project before any campaign goes live.",
      },
      { kind: "h2", text: "Why approval status is the buyer's first filter" },
      {
        kind: "p",
        text: "For a ₹50L or ₹2Cr commitment, the buyer's largest fear is not price. It is approval and title risk, because that is the risk that cannot be negotiated away later and is the one their family will ask about. Approval status is also binary and independently checkable, which makes it the cheapest possible filter for a buyer to apply before spending a Saturday on a site visit. So it gets applied first, whether or not your ad mentions it.",
      },
      {
        kind: "p",
        text: "That is the asymmetry the media plan should exploit. A fact the buyer is going to verify anyway is a fact you gain nothing by withholding and lose qualification by burying.",
      },
      { kind: "h2", text: "What happens when the ad hides it" },
      {
        kind: "p",
        text: "A creative built on price teasers, launch urgency and no approval detail buys the cheapest available action. The people most likely to tap a vague high-intent-looking ad are the people doing the least verification, which is not the same population as your buyers.",
      },
      {
        kind: "ul",
        items: [
          "The telecaller spends the first two minutes of every call establishing what the ad should have said, before any qualification can start.",
          "Qualification rate falls, and qualification sits third in the compounding chain, so the damage multiplies through every rate after it.",
          "Your follow-up desk learns to distrust the lead source, which is how good leads start getting handled like bad ones.",
          "The ad platform optimises toward whatever converted. Feed it unqualified form fills and it will find you more of them, faster.",
        ],
      },
      { kind: "h2", text: "What happens when the ad leads with it" },
      {
        kind: "p",
        text: "Registration number, approval authority and stage in the creative itself does two things at once. Fewer people click, so cost per lead rises. The ones who click have pre-qualified themselves on the deal-breaker, so qualification rate rises.",
      },
      {
        kind: "p",
        text: "Whether that is a good trade is arithmetic, not taste. Cost per booking is cost per lead divided by the product of the downstream rates, so a 25% rise in cost per lead is repaid exactly by a 25% rise in qualification rate. The two cancel. Everything past that point is margin.",
      },
      {
        kind: "formula",
        expression: "CPL × 1.25 ÷ (qualification × 1.25) = unchanged cost per booking",
        note: "So the question is never whether CPL went up. It is whether qualification went up by more.",
      },
      {
        kind: "p",
        text: "In practice the qualification effect tends to be the larger of the two, because the buyers you lose to a disclosed approval status were mostly never going to qualify, while the ones you keep arrive several objections further along. But it is a measurable claim, not an article of faith. Run it as a split, hold cost per lead and qualification rate side by side for a full cycle, and let the product of the rates decide.",
      },
      { kind: "h2", text: "Putting approval status into the funnel, not the footer" },
      {
        kind: "p",
        text: "The compliance minimum is the registration number in the advertisement. The marketing use of it is different work, and mostly it is about moving the same fact earlier.",
      },
      {
        kind: "ul",
        items: [
          "In the creative, not only the landing page. If it appears for the first time after the click, it has already failed to filter anybody.",
          "As a viewable artefact. A link to the actual approval or registration entry converts better than a badge asserting the approval exists, and a badge that merely asserts it is the exact pattern buyers have learned to discount.",
          "As the first qualification question on the call, framed as information rather than interrogation: confirm the stage and authority, and the conversation starts from a shared fact.",
          "In the WhatsApp auto-reply. If the first automated message carries the registration number and the approval stage, the lead arrives at the human already filtered.",
          "In the exclusion logic. People who bounced off a disclosed approval stage are a cheap negative signal. Feeding that back is worth more than another round of creative.",
        ],
      },
      { kind: "h2", text: "Before you have a registration number" },
      {
        kind: "p",
        text: "The registration requirement is what makes pre-launch marketing genuinely constrained rather than merely awkward, and it is where most builders either stall or take a risk they have not priced.",
      },
      {
        kind: "table",
        head: ["During the approval window", "Notes"],
        rows: [
          [
            "Developer and locality brand building",
            "Your own track record and the micro-market are not the unregistered project.",
          ],
          [
            "Audience and list building with no project-specific claim",
            "Intent signals, page engagement, video views and past-project enquirers can all be assembled now.",
          ],
          [
            "Content on the buying decision itself",
            "Approval literacy, locality infrastructure, the questions to ask any developer. This is the material that earns search and assistant visibility, which takes months to compound and so has to start early.",
          ],
          [
            "Advertising, marketing, booking or selling the project",
            "Not until the project is registered, where the Act applies. Confirm the specifics with counsel.",
          ],
        ],
      },
      {
        kind: "p",
        text: "The practical consequence is a sequencing one. If the audience only starts being built on registration day, launch week is spent paying auction prices for cold traffic. The approval window is dead time on the construction schedule and the cheapest audience-building window you will get.",
      },
      {
        kind: "callout",
        label: "The short version",
        items: [
          "Registration before advertising, and the registration number in the advertisement, where the Act applies. Confirm specifics with counsel.",
          "Approval status is the buyer's first filter because it is binary, checkable and the risk that cannot be fixed later.",
          "Hiding it buys cheap leads and destroys qualification rate, which compounds through every rate after it.",
          "A 25% cost-per-lead rise is repaid exactly by a 25% qualification-rate rise. Measure both, not one.",
          "Use the approval window to build the audience you will need on launch day.",
        ],
      },
    ],
    faq: [
      {
        question: "Can you advertise a project before RERA registration?",
        answer:
          "Where the Real Estate (Regulation and Development) Act, 2016 applies, a project has to be registered with the state authority before it is advertised, marketed, booked or offered for sale, and the registration number has to appear in advertisements. Developer and locality brand building, audience building without project-specific claims, and educational content are the work that can run during the approval window. Thresholds and exemptions vary by state, so confirm the specifics with counsel.",
      },
      {
        question: "Does mentioning RERA registration in an ad increase cost per lead?",
        answer:
          "Usually yes, because it filters out people who were not going to verify anything. That is only a problem if qualification rate does not rise by more. Cost per booking is cost per lead divided by the product of the downstream rates, so a 25% rise in cost per lead is cancelled exactly by a 25% rise in qualification rate, and anything beyond that is a net gain.",
      },
      {
        question: "What is the difference between RERA registration and DTCP approval?",
        answer:
          "RERA registration is the project's registration with the state real estate regulator, TNRERA in Tamil Nadu, required before marketing or sale where the Act applies. DTCP or local planning authority approval is the layout or building approval from the planning authority. Buyers asking whether a plotted layout is approved in Tamil Nadu usually mean the latter. A project can need both.",
      },
      {
        question: "Where should approval status appear in a campaign?",
        answer:
          "In the creative rather than only the landing page, since anything appearing after the click has not filtered anyone. Then as a viewable document rather than an asserted badge, as the opening qualification point on the call, and in the WhatsApp auto-reply so the lead reaches a human already filtered.",
      },
    ],
    related: [
      {
        href: "/insights/good-cost-per-lead-real-estate",
        label: "Where the cost-per-booking formula on this page comes from",
      },
      { href: "/who-we-help/real-estate", label: "How we work with builders and developers" },
      { href: "/what-we-do/creative-engine", label: "Creative volume as a production system" },
      { href: "/the-loop", label: "The methodology behind this" },
    ],
  },

  {
    slug: "channel-partner-vs-direct-leads",
    title: "Channel partner leads vs direct leads: the real cost comparison",
    shortTitle: "Channel partners vs direct leads",
    kind: "Economics",
    dek: "On cost per booking alone, channel partners often win. The comparison is still incomplete, because only one of the two channels gets cheaper the longer you run it.",
    description:
      "Brokerage against media cost per booking, worked at a ₹75L ticket, plus the three asymmetries that decide it: risk shape, marginal cost direction, and who owns the buyer data.",
    published: "2026-09-22",
    updated: "2026-09-22",
    answer:
      "Priced per booking on a single project, channel partners are frequently competitive and sometimes cheaper than running your own media. The number that comparison misses is direction. Brokerage per booking is flat forever and rises with ticket value, while direct cost per booking falls as the ad account learns, but only if booking data flows back into it. A channel partner booking is a transaction. A direct booking is a transaction plus a training example. Most builders compare the first project and conclude direct does not work, having never run the mechanism that makes it work.",
    blocks: [
      { kind: "h2", text: "Put both channels in the same unit" },
      {
        kind: "p",
        text: "The comparison is usually argued as a percentage against a rupee figure, which is how it stays unresolved. Convert both to cost per booking.",
      },
      {
        kind: "table",
        head: ["", "Channel partner", "Direct"],
        rows: [
          ["Unit of cost", "Brokerage as a share of ticket value", "Media spend, plus agency, sales desk and tooling"],
          ["When you pay", "On booking only", "Every month, booking or not"],
          ["Scales with", "Ticket value", "Lead volume and auction prices"],
          ["Who handles the objections", "The partner", "Your sales desk"],
          ["Who holds the buyer data", "The partner", "You"],
        ],
      },
      {
        kind: "p",
        text: "Worked at a ₹75L ticket. Brokerage in Indian residential is commonly quoted in the 1% to 2% range and varies with market, inventory age, exclusivity and how badly the stock needs to move, so take the midpoint as an illustration and put your own negotiated rate in.",
      },
      {
        kind: "table",
        caption: "₹75L ticket. Illustrative inputs, not our measured results.",
        head: ["Channel", "Working", "Cost per booking"],
        rows: [
          ["Channel partner at 1.5%", "₹75,00,000 × 1.5%", "₹1,12,500"],
          ["Direct at ₹1,500 CPL, 80 leads per booking", "80 × ₹1,500", "₹1,20,000 media, before retainer"],
        ],
      },
      {
        kind: "p",
        text: "So on that arithmetic direct is more expensive, and it gets worse once the retainer is amortised across the month's bookings. Anyone selling you direct marketing who will not put that comparison on the table is hiding the first thing you would find out yourself in quarter two.",
      },
      { kind: "h2", text: "Three asymmetries the per-booking number hides" },
      {
        kind: "p",
        lead: "Risk shape.",
        text: "Brokerage is variable and success-only. Media is fixed and spent whether or not anything closes. At low volume, or on a first project with no data, that asymmetry is the entire argument, and it favours partners heavily. At steady volume the fixed cost amortises and the argument weakens.",
      },
      {
        kind: "p",
        lead: "Marginal cost direction.",
        text: "This is the one that decides it over more than one project. Brokerage per booking never falls. It is a fixed percentage, so in rupees it rises every time your ticket size does. Direct cost per booking can fall, because every booking fed back as an offline conversion makes the next month's targeting better. The condition attached is strict: it only falls if bookings actually reach the ad account. Without that, direct cost per booking is also flat, and a flat direct channel loses this comparison on every axis.",
      },
      {
        kind: "p",
        lead: "Who owns the buyer.",
        text: "A partner owns the relationship, the pitch, the objection handling and the data. You receive a name and a booking. You cannot retarget those buyers, build a look-alike from them, exclude them from the next campaign, or ask them what nearly stopped them from buying. For one project that costs you nothing measurable. By the third project in the same micro-market it is the difference between launching to an audience and launching to strangers.",
      },
      { kind: "h2", text: "The compounding argument, stated plainly" },
      {
        kind: "p",
        text: "Fifty direct bookings and fifty partner bookings are the same revenue and different assets.",
      },
      {
        kind: "ul",
        items: [
          "Fifty partner bookings are a spreadsheet of names and a commission invoice.",
          "Fifty direct bookings, uploaded weekly as offline conversions, are fifty training examples telling Meta and Google which of the people who filled your forms were actually worth something.",
          "They are also a seed audience for the next launch, and a negative audience so you stop paying to reach people who already bought.",
        ],
      },
      {
        kind: "p",
        text: "None of that shows up in the first project's cost per booking, which is precisely why it gets skipped. It shows up in the second one, as a lower cost per booking that has no obvious cause if you were not tracking why.",
      },
      { kind: "h2", text: "When each one is right" },
      {
        kind: "ul",
        items: [
          "Partners, when it is your first project in a micro-market, when there is no historical booking data to learn from, when you have no follow-up desk, when inventory has to move against a deadline, or when the segment is one your ads genuinely cannot reach.",
          "Direct, from the second project onward in the same micro-market, when ticket size is high enough that brokerage comfortably exceeds plausible media cost, when you have a referral or repeat-buyer base worth reactivating, and when someone will own contacting leads inside the hour.",
        ],
      },
      {
        kind: "p",
        text: "Note that most of the conditions favouring direct are ones you can create, and most of the conditions favouring partners are ones that expire.",
      },
      { kind: "h2", text: "The hybrid most builders should actually run" },
      {
        kind: "p",
        text: "Not a choice, a division of labour. Direct owns the top of the funnel and the data. Partners own inventory velocity and the segments the ads cannot reach. Two operational details decide whether it works or quietly fails.",
      },
      {
        kind: "ol",
        items: [
          "Tag lead source properly, at creation, in one system. Without it you will credit partner bookings to your ads and ad bookings to your partners, and mismanage both channels with equal confidence. This is the most common way a hybrid setup produces worse decisions than either channel alone.",
          "Feed every booking back, including the partner ones, wherever you can legitimately capture them. The algorithm does not care who closed the deal. It cares what kind of person ends up closing, and a partner booking teaches it that just as well as a direct one.",
        ],
      },
      {
        kind: "p",
        text: "That second point is the one builders resist and the one that pays. Partner bookings are usually treated as belonging to the partner's funnel and therefore outside the ad account. They are still your buyers, and they are the largest untapped training set most builders have.",
      },
      {
        kind: "callout",
        label: "The short version",
        items: [
          "Convert both to cost per booking before arguing. At a ₹75L ticket, 1.5% brokerage is ₹1,12,500; 80 leads at ₹1,500 is ₹1,20,000 of media.",
          "On the first project, partners usually win, and the risk shape is why.",
          "Brokerage per booking is flat forever and rises with ticket value. Direct can fall, but only if bookings reach the ad account.",
          "A partner booking is revenue. A direct booking is revenue plus a training example plus an audience.",
          "Run both, tag source at creation, and feed every booking back including the partner ones.",
        ],
      },
    ],
    faq: [
      {
        question: "Is digital marketing cheaper than channel partners for real estate?",
        answer:
          "Not usually on the first project. At a ₹75L ticket, brokerage at 1.5% is ₹1,12,500 per booking paid only on success, while 80 leads at a ₹1,500 cost per lead is ₹1,20,000 of media spent whether or not anything closes. Direct becomes cheaper over time only if bookings are fed back into the ad account so targeting improves; without that feedback its cost per booking stays flat and partners keep winning.",
      },
      {
        question: "What does a channel partner cost in Indian real estate?",
        answer:
          "Brokerage is commonly quoted in the 1% to 2% range of ticket value, paid on booking, though the rate moves with market, inventory age, exclusivity and how urgently the stock needs to move. Because it is a percentage, the rupee cost per booking rises with ticket size and never falls with volume.",
      },
      {
        question: "Why do builders say digital marketing does not work for them?",
        answer:
          "Most often because the channel was run without a feedback loop. If bookings never reach the ad account as offline conversions, the platform keeps optimising toward form fills rather than buyers, cost per booking stays flat, and direct marketing genuinely does lose to brokerage on cost. The conclusion is right about what was run and wrong about the channel.",
      },
      {
        question: "Should channel partner bookings be uploaded to the ad account?",
        answer:
          "Where you can legitimately capture them, yes. The platform is not learning who closed the deal, it is learning what kind of person ends up buying, and a partner booking is as informative as a direct one. Most builders treat partner bookings as outside the ad account, which leaves the largest available training set unused.",
      },
    ],
    related: [
      {
        href: "/insights/good-cost-per-lead-real-estate",
        label: "Where the 80 leads per booking figure comes from",
      },
      { href: "/what-we-do/tracking-attribution", label: "The signal layer that makes direct compound" },
      { href: "/tools/cpl-calculator", label: "Work out your own cost per booking" },
      { href: "/who-we-help/real-estate", label: "How we work with builders and developers" },
    ],
  },
  {
    slug: "speed-to-lead-real-estate",
    title: "How fast do you have to call a real estate lead?",
    shortTitle: "How fast to call a lead",
    kind: "Tactical",
    dek: "Inside a minute if you can, inside five if you cannot. Not out of politeness. Contact rate is the first term in the cost-per-booking chain, so it multiplies everything after it.",
    description:
      "Why contact rate is the cheapest rate to move, what actually decays in the first minutes, and how to measure your own speed-to-lead decay curve from data you already have.",
    published: "2026-09-22",
    updated: "2026-09-22",
    answer:
      "Inside a minute if you can staff it, inside five if you cannot. A lead you never reach converts at zero no matter how good the rest of your process is, and contact rate sits first in the chain that produces cost per booking, so it multiplies every rate after it. On the worked funnel from our cost-per-lead article, moving contact rate from 60% to 85% and changing nothing else cuts cost per booking 29%, from ₹2,16,450 to ₹1,52,788. No new creative, no new targeting, no change in cost per lead.",
    blocks: [
      { kind: "h2", text: "Why the first term is the one to attack" },
      {
        kind: "p",
        text: "Cost per booking is cost per lead divided by the product of the five rates after the lead: contacted, qualified, site visit booked, showed up, closed. Because they multiply, a proportional gain anywhere is worth the same as a proportional gain anywhere else. Contact rate is not special in the arithmetic. It is special in practice, for two reasons.",
      },
      {
        kind: "ul",
        items: [
          "It is usually furthest from its ceiling. Qualification and close rates are constrained by the market and your product. Contact rate is constrained by whether someone dialled, which is a staffing and routing decision you control outright.",
          "It is the cheapest to move. Nobody has to get better at selling. Somebody has to pick up the phone sooner, and a system has to make sure the lead reaches them.",
        ],
      },
      {
        kind: "table",
        caption: "Contact rate in isolation. All other rates held constant. Example inputs.",
        head: ["", "Before", "After"],
        rows: [
          ["Contact rate", "60%", "85%"],
          ["Lead to booking", "0.693%", "0.982%"],
          ["Leads per booking", "144", "102"],
          ["Media per booking at ₹1,500 CPL", "₹2,16,450", "₹1,52,788"],
        ],
      },
      {
        kind: "p",
        text: "A 29% cut in the cost of a booking from one rate, with the media plan untouched. And because contact rate is bounded at 100%, you can see exactly how much headroom is left. If you are at 60%, you know there is 40 points of it.",
      },
      { kind: "h2", text: "What actually decays in those minutes" },
      {
        kind: "p",
        text: "Three things, and it is worth being precise about them, because the mechanism tells you what to build.",
      },
      {
        kind: "p",
        lead: "Memory and frame.",
        text: "They did not fill one form. They filled several in one sitting, because that is how anyone shortlists. Whoever calls first is a continuation of what the buyer was already doing. Whoever calls on Tuesday is an interruption from a company they have to be reminded about.",
      },
      {
        kind: "p",
        lead: "Availability.",
        text: "The moment of maximum intent is the moment they were already on their phone looking at property. That window closes on its own. Twenty minutes later they are driving, in a meeting, or back at work.",
      },
      {
        kind: "p",
        lead: "Competition.",
        text: "Broad targeting means every developer in the segment is reaching a heavily overlapping audience. You are not competing for the buyer's attention in the abstract. You are competing with four other callers on the same afternoon.",
      },
      {
        kind: "p",
        text: "You will find plenty of quoted multiples for how much better a one-minute callback performs. We are not going to repeat a number we cannot source to your account. The direction is not in dispute, the magnitude is account-specific, and it is measurable from data you already hold.",
      },
      { kind: "h2", text: "Measure your own decay curve" },
      {
        kind: "p",
        text: "Your call logs carry a timestamp and your CRM carries a lead creation time. The difference between them is the only speed-to-lead study that should set your policy. Bucket every lead from the last quarter and fill this in.",
      },
      {
        kind: "table",
        caption: "Build this from your own call logs. One quarter is usually enough.",
        head: ["Time to first dial", "Leads", "Contact rate", "Site visit booked"],
        rows: [
          ["Under 1 minute", "", "", ""],
          ["1 to 5 minutes", "", "", ""],
          ["5 to 30 minutes", "", "", ""],
          ["30 to 120 minutes", "", "", ""],
          ["2 hours to same day", "", "", ""],
          ["Next day or later", "", "", ""],
          ["Never dialled", "", "0%", "0%"],
        ],
      },
      {
        kind: "p",
        text: "Two things usually fall out of that table the first time anyone builds it. The never-dialled row is larger than management believed, and the drop between the first two buckets and the rest is steeper than anyone expected. Both are worth more than another round of creative testing.",
      },
      { kind: "h2", text: "The arithmetic of a second dial attempt" },
      {
        kind: "p",
        text: "One dial is not a contact attempt. If a single dial connects with probability p and you treat attempts within a short window as roughly independent, n attempts connect with 1 minus (1 minus p) to the power n.",
      },
      {
        kind: "formula",
        expression: "Connect probability after n attempts = 1 - (1 - p)^n",
        note: "Independence is an approximation, so read these as an optimistic ceiling.",
      },
      {
        kind: "table",
        caption: "At a 45% single-dial connect rate. Upper bound, not a forecast.",
        head: ["Attempts", "Cumulative connect"],
        rows: [
          ["1", "45.0%"],
          ["2", "69.8%"],
          ["3", "83.4%"],
          ["4", "90.8%"],
        ],
      },
      {
        kind: "p",
        text: "The independence assumption is doing real work there and it is not quite true, because someone who never answers a first call is a different kind of person from someone who happened to miss one. So treat the table as the shape rather than the forecast: the second and third attempts carry most of the recoverable contact rate, and after the fourth you are mostly annoying people. Measure your own multi-attempt curve the same way you measured the decay curve.",
      },
      { kind: "h2", text: "What makes the number achievable" },
      {
        kind: "p",
        text: "A service level is a staffing decision, not an aspiration written on a whiteboard. Five rules make the difference between a policy and a number that quietly drifts.",
      },
      {
        kind: "ol",
        items: [
          "Decide who owns the hours your leads actually arrive in. Property gets browsed in the evening and at weekends. An SLA that only holds between 10am and 6pm on weekdays is an SLA for a minority of your leads.",
          "Automate the first touch, humanise the second. An instant WhatsApp carrying the project's approval status and a booking link holds the frame while a person gets to the phone. It is not a substitute for the call.",
          "Route by source, not round robin. The person who knows the project should get the lead from that project's campaign, or the first two minutes are spent on internal lookup.",
          "Define attempts and a window before you define outcomes. How many dials, over how long, before a lead is marked unreachable. Without that rule, unreachable means whatever the busiest telecaller decides it means.",
          "Report time to first dial weekly, on the same dashboard as cost per lead. A rate nobody reports is a rate that decays back to where it started within a quarter.",
        ],
      },
      {
        kind: "callout",
        label: "The short version",
        items: [
          "Contact rate sits first in the chain, so it multiplies every rate after it.",
          "60% to 85% contact rate, alone, cut the worked example's cost per booking 29% with cost per lead unchanged.",
          "It is the cheapest rate to move because it is a routing problem, not a selling problem.",
          "Do not adopt someone else's speed-to-lead multiple. Build your own decay curve from call logs; you already have the data.",
          "One dial is not an attempt. The second and third carry most of the recoverable contact rate.",
        ],
      },
    ],
    faq: [
      {
        question: "How quickly should you call a real estate lead?",
        answer:
          "Inside a minute where staffing allows, inside five otherwise. The reason is arithmetic rather than etiquette: contact rate is the first of the five rates between a lead and a booking, and because those rates multiply, it scales everything after it. Raising contact rate from 60% to 85% with no other change cut cost per booking by 29% in our worked example.",
      },
      {
        question: "How many times should you call a lead before giving up?",
        answer:
          "Three to four attempts within a defined window captures most of the recoverable contact rate. At a 45% single-dial connect rate, treating attempts as roughly independent, cumulative connect goes 45%, 70%, 83%, 91% across four attempts. That independence assumption makes it an optimistic ceiling, so measure your own curve, but the shape holds: the second and third attempts do most of the work.",
      },
      {
        question: "How do I measure speed to lead without buying a tool?",
        answer:
          "Take lead creation time from your CRM and first dial time from your call logs, bucket every lead from the last quarter by the difference, then compute contact rate and site-visit-booked rate for each bucket. That gives you your own decay curve, which is the only one that should set your policy. The never-dialled row is usually the finding.",
      },
      {
        question: "Does an automated WhatsApp reply count as speed to lead?",
        answer:
          "It helps and it does not substitute. An instant automated message carrying approval status and a booking link holds the buyer's attention while a person gets to the phone, which is valuable because the buyer is shortlisting several projects at once. Contact rate in the funnel should still be measured on human contact.",
      },
    ],
    related: [
      {
        href: "/insights/good-cost-per-lead-real-estate",
        label: "Where the five-rate chain and these figures come from",
      },
      { href: "/what-we-do/follow-up-systems", label: "How we build the follow-up loop" },
      { href: "/tools/cpl-calculator", label: "Run your own funnel through the calculator" },
    ],
  },

  {
    slug: "why-meta-lead-ads-poor-quality",
    title: "Why are my Facebook and Instagram leads such poor quality?",
    shortTitle: "Why Meta leads come in unqualified",
    kind: "Diagnostic",
    dek: "Because the platform is optimising for exactly what you asked it for, and you almost certainly asked for form fills. Here is what it can and cannot see, and the three levels of telling it the truth.",
    description:
      "Meta optimises toward the event you select, and it cannot see anything after the form unless you send it. The three levels of feedback, and why optimising straight for bookings usually backfires.",
    published: "2026-09-22",
    updated: "2026-09-22",
    answer:
      "Because the system is working correctly against the wrong objective. Meta does not know which of your leads bought. It knows which of them submitted a form, because that is the only outcome you told it about. Ask for form fills and it will find the people most likely to fill a form and least likely to buy, since those are the cheapest people in the auction to reach. This is not a targeting failure to be fixed with better audiences. It is a feedback failure, and the fix is telling the platform what a good outcome actually was.",
    blocks: [
      { kind: "h2", text: "The optimisation event is the entire instruction" },
      {
        kind: "p",
        text: "With broad targeting and Advantage+ placements, you are no longer choosing who sees the ad. The system is, and the only thing steering it is the conversion event you selected. Select Lead and you have instructed it, precisely and literally, to find people who submit lead forms cheaply.",
      },
      {
        kind: "p",
        text: "It is very good at that. The complaint that leads are poor quality is usually a complaint that the machine did what it was told.",
      },
      { kind: "h2", text: "Why instant forms are the sharpest version of the problem" },
      {
        kind: "p",
        text: "A native pre-filled form removes friction between the ad and the submission. That friction was not waste. It was doing qualification work for free, by asking the buyer to want it slightly more than a single tap.",
      },
      {
        kind: "ul",
        items: [
          "Pre-filled instant forms produce the cheapest leads and the lowest intent, because the buyer supplied nothing and decided nothing.",
          "A higher-intent form type, an added review step, or two qualifying questions each raise cost per lead and raise qualification rate. That is the same trade as disclosing approval status, and it is settled the same way: by whether qualification rose proportionally more than cost per lead.",
          "Comparing your cost per lead against another builder's is close to meaningless when one of you is running instant forms and the other is running a landing page with a phone field. You are pricing different things.",
        ],
      },
      { kind: "h2", text: "What the platform never finds out" },
      {
        kind: "p",
        text: "Everything after the form is invisible unless you send it. Meta has no view of any of this:",
      },
      {
        kind: "table",
        head: ["Event", "Visible to the platform by default"],
        rows: [
          ["Form submitted", "Yes. This is the event you optimise on."],
          ["Telecaller reached them", "No"],
          ["Qualified on budget and intent", "No"],
          ["Site visit booked", "No"],
          ["Actually turned up", "No"],
          ["Booked a unit", "No"],
          ["Ticket value of that booking", "No"],
        ],
      },
      {
        kind: "p",
        text: "So the model's entire concept of success stops at the form. Every optimisation decision it makes for the next month is built from a definition of a good outcome that your sales team would not recognise.",
      },
      { kind: "h2", text: "Three levels of sending the truth back" },
      {
        kind: "p",
        text: "These are cumulative. Most accounts stop at the first, a good agency runs the second, and the third is the one that changes lead quality.",
      },
      {
        kind: "ol",
        items: [
          "Browser pixel only. The baseline, and increasingly lossy: consent banners, tracking prevention and ad blockers all cut into it. Events that never arrive cannot teach anything.",
          "Conversions API, server-side, deduplicated against the pixel. This makes the lead event reliable again. Worth doing, but note what it has achieved: it has made the platform more confident about the wrong objective.",
          "Offline conversion upload. A weekly file saying which of those leads were qualified, which booked a site visit, which turned up and which bought. Only now does the platform have a definition of quality that matches yours.",
        ],
      },
      {
        kind: "p",
        text: "Almost nobody runs the third one. It is the difference between an ad account that learns from your business and one that learns from your form.",
      },
      { kind: "h2", text: "What changes once bookings go back, and the trap in it" },
      {
        kind: "p",
        text: "Two things become possible. You can optimise for a deeper event than the form, and you can send value with the conversion so the system learns the difference between a ₹45L buyer and a ₹1.5Cr buyer rather than treating both as one unit of success.",
      },
      {
        kind: "p",
        lead: "The trap:",
        text: "deeper events are rarer, and optimisation needs volume to learn from. Meta's published guidance has long put the figure at roughly 50 conversions per week per ad set to get out of the learning phase. If you close four bookings a month, pointing the campaign directly at bookings starves it, and performance gets worse rather than better while everyone concludes the whole approach failed.",
      },
      {
        kind: "p",
        text: "The workable path is to optimise for the deepest event that still clears usable weekly volume, usually qualified lead or site visit booked, and to keep feeding the rarer booking events as offline conversions and as value. The rare events then shape the model without being asked to carry it.",
      },
      { kind: "h2", text: "The diagnostic, in order" },
      {
        kind: "p",
        text: "Before blaming the creative or the audience, work down this list. In our experience the answer is above line four more often than below it.",
      },
      {
        kind: "ol",
        items: [
          "What event is the campaign actually optimising for right now? Not what the brief said. Check the ad set.",
          "Is the Conversions API live, and are server and browser events deduplicated? Double-counted events train the model on phantom success.",
          "Are offline conversions being uploaded at all, on what cadence, and what is the match rate? A low match rate means the uploads exist and teach nothing.",
          "Is lead source tagged at creation, in one system, so a booking can be traced back to the campaign that produced it?",
          "Is the sales team's disposition data, the reason a lead was rejected, getting back to whoever runs the account? Otherwise nobody can tell a targeting problem from a qualification-script problem.",
          "Only now: is the form type doing free qualification work, or removing it?",
          "Only now: is the creative attracting the buyer or attracting the tap?",
        ],
      },
      {
        kind: "callout",
        label: "The short version",
        items: [
          "Poor lead quality is usually the platform succeeding at the objective you set.",
          "With broad targeting, the conversion event is the only steering input you still control.",
          "Meta sees the form and nothing after it unless you send it.",
          "Pixel, then Conversions API, then offline conversions. Only the third changes quality.",
          "Do not optimise straight for bookings at low volume. Optimise for the deepest event that clears roughly 50 a week, and feed bookings back as offline conversions and value.",
        ],
      },
    ],
    faq: [
      {
        question: "Why are Facebook lead ads producing unqualified leads?",
        answer:
          "Because the campaign is optimising for form submissions and the platform cannot see anything that happens after the form. With broad targeting, the conversion event is the only instruction it receives, so it finds the people cheapest to convert into a form fill, who are rarely the people most likely to buy. The fix is feeding qualification, site visit and booking data back through offline conversions, not adjusting the audience.",
      },
      {
        question: "Do Meta instant forms produce worse leads than a landing page?",
        answer:
          "Generally yes, and the mechanism is friction. A pre-filled instant form asks the buyer to supply nothing and decide nothing, so it removes the free qualification that a landing page form with a phone field was doing. Higher-intent form types, a review step or two qualifying questions raise cost per lead and raise qualification rate; whether that is a good trade depends on which rose proportionally more.",
      },
      {
        question: "Should I optimise my campaign for bookings instead of leads?",
        answer:
          "Not directly, at typical real estate volumes. Meta's published guidance has long put the learning phase at roughly 50 conversions per week per ad set, and a developer closing a handful of bookings a month cannot supply that. Optimise for the deepest event that still clears usable volume, usually qualified lead or site visit booked, and feed bookings back as offline conversions and conversion value so they shape the model without having to carry it.",
      },
      {
        question: "What are offline conversions and why do they matter?",
        answer:
          "An offline conversion upload is a periodic file telling the ad platform what happened to leads after they left the platform: which were qualified, which booked a site visit, which turned up, which bought, and for how much. It is the only way the system learns a definition of quality that matches yours. Most accounts never implement it, which is why their lead quality never improves no matter how the targeting is adjusted.",
      },
    ],
    related: [
      { href: "/what-we-do/tracking-attribution", label: "The signal layer, in practice" },
      { href: "/tools/tracking-health-check", label: "Check what your tracking is actually sending" },
      {
        href: "/insights/good-cost-per-lead-real-estate",
        label: "Why cost per lead comparisons mislead",
      },
    ],
  },

  {
    slug: "how-many-ad-creatives-real-estate",
    title: "How many ad creatives does a real estate campaign need?",
    shortTitle: "How many creatives you need",
    kind: "Benchmark method",
    dek: "It is an arithmetic question, not a taste question. Work it from your weekly impressions, your reached audience and the frequency at which your account starts to fatigue.",
    description:
      "Derive your own creative volume from frequency accrual, winner lifespan and your hit rate. A worked example landing between 12 and 23 new creatives a month, with a sensitivity table.",
    published: "2026-09-22",
    updated: "2026-09-22",
    answer:
      "Enough to keep frequency below the point where your cost per lead starts climbing with nothing else changed. That is derivable rather than a matter of opinion: divide your fatigue frequency by your weekly frequency accrual to get how long a set of creatives lasts, multiply up to find how many have to be live, then divide by your hit rate to find how many you must produce to get them. On the worked example below it lands between 12 and 23 new creatives a month, which is why our own standard is 15 to 20.",
    blocks: [
      { kind: "h2", text: "What frequency is, and why 3 is not a magic number" },
      {
        kind: "p",
        text: "Frequency is impressions divided by reach over a window. It is an average, and that is the thing to hold on to: an average of 2.8 means a substantial part of your audience has seen the ad six or seven times while another part has seen it once.",
      },
      {
        kind: "p",
        text: "There is no universal number at which fatigue begins. What is general is the shape. Cost per lead sits flat, then starts climbing with no change to your offer, your targeting or the market. Your own fatigue point is the frequency at which that turn happens in your account, and you can read it off a chart of weekly frequency against weekly cost per lead over a couple of months. Ours trigger at 2.8 for metro real-estate audiences. Yours is yours.",
      },
      { kind: "h2", text: "Step one: how many creatives have to be live" },
      {
        kind: "p",
        text: "Frequency accrues at weekly impressions divided by weekly reach. A creative set is done when accumulated frequency reaches your fatigue point.",
      },
      {
        kind: "formula",
        expression: "Weeks per creative set = fatigue frequency ÷ (weekly impressions ÷ weekly reach)",
      },
      {
        kind: "table",
        caption: "Worked example. Example inputs, not benchmarks. Put your own in.",
        head: ["Input", "Value", "Working"],
        rows: [
          ["Weekly impressions", "5,00,000", "From a roughly ₹3L monthly media budget"],
          ["Weekly reach", "2,00,000", ""],
          ["Weekly frequency accrual", "2.5", "5,00,000 ÷ 2,00,000"],
          ["Fatigue frequency", "2.8", "Read from your own CPL curve"],
          ["Weeks per set", "1.12", "2.8 ÷ 2.5"],
          ["Sets per month", "3.87", "4.33 ÷ 1.12"],
          ["Creatives live per month at 3 per set", "11.6", "3.87 × 3"],
        ],
      },
      {
        kind: "p",
        text: "Roughly twelve creative slots a month, just to hold frequency steady. Notice that nothing in that calculation is about taste, seasonality or how good your designer is. It is a consequence of spending concentrated money against a finite audience.",
      },
      { kind: "h2", text: "Step two: how many you have to produce" },
      {
        kind: "p",
        text: "Twelve live slots is not twelve new creatives. Winners do not retire the first time a set fatigues; they rest, rotate back, and run against different segments. What you are really replacing each month is the share of the bank that has genuinely stopped working.",
      },
      {
        kind: "formula",
        expression: "New creatives per month = (live slots ÷ winner lifespan in months) ÷ hit rate",
        note: "Hit rate = creatives that beat your account's median CPL ÷ creatives shipped.",
      },
      {
        kind: "table",
        caption: "Sensitivity around 11.6 live slots. Find your own row.",
        head: ["Winner lifespan", "Hit rate 20%", "Hit rate 25%", "Hit rate 33%"],
        rows: [
          ["2 months", "29 / month", "23 / month", "18 / month"],
          ["3 months", "19 / month", "15 / month", "12 / month"],
          ["4 months", "14 / month", "12 / month", "9 / month"],
        ],
      },
      {
        kind: "p",
        text: "Most metro real-estate accounts we see sit near the middle row, which is where 15 to 20 a month comes from. If your hit rate is 20% and your winners die after two months, you need nearly thirty and an agency promising you four is not going to hold your frequency down. Both of those inputs are measurable in your own account, and neither is usually measured.",
      },
      { kind: "h2", text: "Distinct means distinct" },
      {
        kind: "p",
        text: "The number is meaningless if the creatives are not genuinely different. Five colourways of one layout are one creative to the viewer and close to one creative to the algorithm, which is learning what makes a person stop rather than what hex value you used.",
      },
      {
        kind: "ul",
        items: [
          "Distinct means a different angle, not a different crop: approval and title proof, a specific objection answered, the locality rather than the building, price framing, a resident or buyer voice, construction progress, an explicit comparison.",
          "A refresh that changes only the headline resets nothing, and the frequency clock keeps running.",
          "Format counts as variation and is the cheapest kind: the same angle as a static, a carousel and a short vertical video is three tests, not one.",
          "If you cannot describe in one sentence why a creative is different from the one next to it, it is not a second creative.",
        ],
      },
      { kind: "h2", text: "The cadence that makes it survivable" },
      {
        kind: "p",
        text: "Fifteen to twenty distinct creatives a month is impossible as a monthly request to a designer and routine as a pipeline. Four things make it a pipeline.",
      },
      {
        kind: "ol",
        items: [
          "A shoot bank. One proper day of site footage, units, construction progress and locality, cut down repeatedly, beats twelve separate briefs. Renders age badly and every competitor has the same ones.",
          "A running angle list, so the question each week is which angle to shoot next rather than what to make.",
          "Kill rules agreed in advance: at what spend and what cost per lead does a creative get switched off, decided before anyone is emotionally invested in it.",
          "Frequency and first-time impression ratio on the weekly report next to cost per lead. Fatigue is only invisible if nobody is looking for it.",
        ],
      },
      {
        kind: "callout",
        label: "The short version",
        items: [
          "Creative volume is derivable from frequency accrual, not a matter of taste.",
          "Weeks per set = fatigue frequency ÷ (weekly impressions ÷ weekly reach).",
          "The worked example needs about 12 creatives live per month just to hold frequency.",
          "New production = live slots ÷ winner lifespan ÷ hit rate, which lands between 12 and 29 a month depending on two numbers you can measure.",
          "Recolours are not variations. If you cannot say why it is different in a sentence, it is not a second creative.",
        ],
      },
    ],
    faq: [
      {
        question: "How many ad creatives does a real estate campaign need per month?",
        answer:
          "Derive it rather than guessing. Weeks per creative set equals your fatigue frequency divided by weekly impressions over weekly reach. On a worked example of 5,00,000 weekly impressions against 2,00,000 weekly reach with fatigue at 2.8, a set lasts 1.12 weeks, which needs about 12 creatives live per month. Dividing by winner lifespan and hit rate gives new production of roughly 12 to 29 a month, with most metro accounts landing at 15 to 20.",
      },
      {
        question: "What ad frequency is too high for real estate?",
        answer:
          "There is no universal threshold. Frequency is an average, so a figure of 2.8 means part of your audience has seen the ad six or seven times. Find your own fatigue point by charting weekly frequency against weekly cost per lead over two months and looking for where cost per lead starts climbing with nothing else changed. Our trigger for metro real-estate audiences is 2.8.",
      },
      {
        question: "Do different colours or headlines count as different creatives?",
        answer:
          "No. Five colourways of one layout are one creative to the viewer and close to one to the algorithm, which is learning what makes someone stop scrolling. A distinct creative uses a different angle: approval proof, a specific objection, the locality rather than the building, price framing, a buyer voice, construction progress. Running the same angle as a static, a carousel and a short video does count as three tests.",
      },
      {
        question: "What is a creative hit rate and how do I measure mine?",
        answer:
          "It is the share of creatives you ship that beat your account's median cost per lead. Measure it over a quarter by ranking every creative you ran by cost per lead and counting how many landed above the median. It is one of the two inputs that decide how many creatives you need to produce, and almost nobody tracks it.",
      },
    ],
    related: [
      { href: "/what-we-do/creative-engine", label: "How we run creative as a production line" },
      {
        href: "/tools/creative-fatigue-estimator",
        label: "Estimate your own fatigue point",
      },
      {
        href: "/insights/good-cost-per-lead-real-estate",
        label: "What rising cost per lead does to cost per booking",
      },
    ],
  },
  {
    slug: "get-cited-by-ai-assistants",
    title: "How do you get your company cited by AI assistants?",
    shortTitle: "Getting cited by AI assistants",
    kind: "Tactical",
    dek: "There is no ranking factor to game and no submission form. Three things decide it: whether a crawler can read you without JavaScript, whether your company resolves to one entity, and whether you have published anything specific enough to quote.",
    description:
      "Why assistants synthesise rather than rank, the three tests that decide whether you appear in an answer, and the plumbing that makes you eligible. Includes what nobody can promise.",
    published: "2026-09-22",
    updated: "2026-09-22",
    answer:
      "You cannot buy it, submit for it, or optimise a keyword into it. An assistant composes an answer from sources it can parse, attribute to a consistent organisation, and safely quote, so those three properties are the whole job. Most sites fail the first for technical reasons, the second because their own name is inconsistent across their own markup, and the third because everything specific they know is kept back for a sales call. Fix all three and you become eligible. Nobody, us included, can promise more than eligible.",
    blocks: [
      { kind: "h2", text: "Assistants do not rank, they synthesise" },
      {
        kind: "p",
        text: "A search engine returns a list and lets the person choose. An assistant reads several sources and writes one answer, citing a handful. That difference changes the economics completely.",
      },
      {
        kind: "p",
        text: "Position seven on a results page still gets clicks. There is no position seven in a generated answer. You are in the paragraph or you are not, which makes this closer to winner-take-few than to a gradient. It also means the useful question is not how to rank. It is what makes a passage safe for a model to lift.",
      },
      { kind: "h2", text: "Test one: can a crawler read you without JavaScript?" },
      {
        kind: "p",
        text: "Several of the crawlers feeding assistant answers do not execute JavaScript. If your content is assembled in the browser, what they fetch is an empty shell with a loading spinner in it. No amount of good writing survives that.",
      },
      {
        kind: "p",
        lead: "How to check yours in thirty seconds:",
        text: "open the page, view source, and search the raw HTML for a sentence from the middle of your copy. If it is not there, it does not exist as far as a non-rendering crawler is concerned. Do it for your service pages, not just the homepage, because they are usually built differently.",
      },
      {
        kind: "p",
        text: "For reference, we measured our own site the same way: between 97% and 100% of the text inside the main element of every page is present in the raw HTML before any JavaScript runs. That is not a boast, it is the floor. It is also the single most common reason a well-written site is invisible to assistants, and it is invisible to the people running the site because their browser renders everything perfectly.",
      },
      { kind: "h2", text: "Test two: does your company resolve to one entity?" },
      {
        kind: "p",
        text: "Assistants corroborate before they cite. A company that appears under three variations of its name, with two phone numbers and an address that differs between the website and the Google Business Profile, does not consolidate into one confident entity. It looks like three weak ones.",
      },
      {
        kind: "p",
        lead: "We shipped this bug on our own site.",
        text: "Our schema.org markup declared the organisation under one name, our Open Graph tags used a longer version of it, and the domain was a third string. Three names for one company, in our own machine-readable markup, on a site that sells this as a service. It is an easy thing to miss precisely because every individual page looks correct to a human.",
      },
      {
        kind: "p",
        text: "What consolidation actually requires:",
      },
      {
        kind: "ul",
        items: [
          "One name, spelled one way, in the schema.org organisation node, in og:site_name, in the page copy, in the Google Business Profile and in every directory listing.",
          "A stable @id on the organisation node. Without one, the same organisation object repeated across thirty pages reads as thirty unrelated declarations rather than one entity seen thirty times.",
          "sameAs pointing at the profiles you control: LinkedIn, the Google Business Profile, Instagram. This is the corroboration mechanism. It is how a model confirms the entity on your site is the same one it has seen elsewhere.",
          "Identical phone number and address everywhere, down to the formatting.",
        ],
      },
      {
        kind: "p",
        text: "None of this is exotic and all of it is checkable in an afternoon. It is also the part most agencies skip, because it produces no screenshot.",
      },
      { kind: "h2", text: "Test three: have you published anything worth quoting?" },
      {
        kind: "p",
        text: "This is the one that actually decides it, and the one no technical fix reaches.",
      },
      {
        kind: "p",
        text: "A model quoting you needs a sentence that is specific, self-contained and attributable. Look at your own site honestly and ask which sentence a model could lift into an answer without embarrassing itself.",
      },
      {
        kind: "table",
        head: ["Unquotable", "Quotable"],
        rows: [
          ["We deliver measurable results", "Cost per booking is cost per lead divided by the product of the five rates after the lead"],
          ["Industry-leading expertise", "Creative fatigue for metro real-estate audiences triggers our refresh at frequency 2.8"],
          ["Transparent pricing", "Signal Setup is ₹75,000, one time"],
          ["Case studies available on request", "Anything at all with a number in it"],
        ],
      },
      {
        kind: "p",
        lead: "Hedged copy is worse than vague copy.",
        text: "A page that says a figure is illustrative and not an average is explicitly instructing a model not to cite it, and the model will comply. That hedge may be the right call, ours are deliberate, but be clear about the cost: every caveat you add is a passage you have removed from the citable pool.",
      },
      {
        kind: "p",
        text: "Which leads to the uncomfortable part. If everything specific you know is reserved for a sales conversation, there is nothing on your site to cite, and you will not appear in answers no matter how clean the markup is. Getting cited requires publishing something you would rather charge for.",
      },
      { kind: "h2", text: "The plumbing, in order of how often it is broken" },
      {
        kind: "ol",
        items: [
          "Server-render the content. Everything else is decoration if the crawler sees an empty page.",
          "One correct canonical URL per page. We found every page on our own site declaring the homepage as its canonical, inherited from a single line in a layout file. A crawler reads that as a site of duplicates, and it is silent: nothing looks wrong in a browser.",
          "schema.org as a graph with a stable @id, not a loose object repeated per page, so the publisher and author references resolve to one node.",
          "FAQPage markup on real questions, and never the same question on two URLs. Duplicated FAQ markup means neither page gets the result.",
          "An llms.txt naming what the site actually answers, which is the file an assistant reads to orient itself.",
          "A robots.txt that names the answer engines. Note that Google-Extended and Applebot-Extended are separate tokens governing AI grounding rather than classic search, so allowing Googlebot does not allow them.",
        ],
      },
      {
        kind: "p",
        text: "Treat that list as hygiene rather than a growth lever. It does not get you cited. It removes the reasons you would be excluded.",
      },
      { kind: "h2", text: "What nobody can promise" },
      {
        kind: "p",
        text: "There is no submission form, no ranking API, no inclusion guarantee, and no agency relationship that changes what a model says. Answers vary between assistants, between phrasings of the same question, and between one week and the next.",
      },
      {
        kind: "p",
        text: "So treat a promise of guaranteed AI citations the way you would treat a promise of a guaranteed Google position: as a claim about something the seller does not control. What is controllable is being parseable, being one entity, and being quotable. All three are necessary. None of them is sufficient, and we would rather say that than sell the other thing.",
      },
      {
        kind: "callout",
        label: "The short version",
        items: [
          "Assistants compose one answer rather than ranking a list, so it is closer to winner-take-few than to a gradient.",
          "View source and search for a sentence from the middle of your page. If it is not in the raw HTML, non-rendering crawlers cannot see it.",
          "One name, one phone number, one address, a stable @id, and sameAs profiles. Inconsistency reads as three weak entities rather than one strong one.",
          "A model quotes specifics. If everything specific is held back for the sales call, there is nothing to cite.",
          "The plumbing makes you eligible. Nobody controls what an assistant actually says, and anyone promising otherwise is selling something they do not own.",
        ],
      },
    ],
    faq: [
      {
        question: "How do you get your business mentioned by ChatGPT or Gemini?",
        answer:
          "There is no submission process. An assistant composes answers from sources it can parse, attribute to a consistent organisation and safely quote, so those are the three things to fix: server-render your content so non-rendering crawlers can read it, make your company resolve to one entity across schema.org, Open Graph, your Google Business Profile and directories, and publish something specific enough that a sentence can be lifted from it. Those make you eligible; nobody controls what the model actually says.",
      },
      {
        question: "Does my website need to work without JavaScript for AI search?",
        answer:
          "Effectively yes. Several crawlers that feed assistant answers do not execute JavaScript, so content assembled in the browser reaches them as an empty shell. Check by opening view source and searching the raw HTML for a sentence from the middle of your copy. Do it on service pages rather than just the homepage, since those are often built differently.",
      },
      {
        question: "What is llms.txt and does it matter?",
        answer:
          "It is a plain text file at the root of your site describing what the site covers and which pages answer what, intended as an orientation file for AI crawlers the way robots.txt is for search crawlers. It is cheap to add and helps an assistant find the right page, but it is orientation rather than a ranking mechanism. It will not compensate for content a crawler cannot read or an entity it cannot resolve.",
      },
      {
        question: "Can an agency guarantee you will appear in AI search results?",
        answer:
          "No, and the guarantee is the warning sign. There is no submission form, no ranking API and no inclusion guarantee; answers vary between assistants, between phrasings of the same question and week to week. What an agency can legitimately do is make you parseable, consolidate your entity, and help you publish material specific enough to quote. That produces eligibility, not a promise.",
      },
    ],
    related: [
      { href: "/what-we-do/ai-search-visibility", label: "The Answer Visibility station in practice" },
      {
        href: "/insights/good-cost-per-lead-real-estate",
        label: "An example of the kind of specificity that gets quoted",
      },
      { href: "/the-loop", label: "Where this sits in the loop" },
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Newest first, for the index. */
export const ARTICLES_BY_DATE = [...ARTICLES].sort((a, b) =>
  b.published.localeCompare(a.published),
);
