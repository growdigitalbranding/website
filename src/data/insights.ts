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
  kind: "Benchmark method" | "Tactical" | "Economics";
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
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Newest first, for the index. */
export const ARTICLES_BY_DATE = [...ARTICLES].sort((a, b) =>
  b.published.localeCompare(a.published),
);
