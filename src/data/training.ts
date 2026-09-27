/**
 * AI digital marketing training: the facts every training page shares, and
 * the audience-specific content for each page.
 *
 * Programme facts below are the business's own, as supplied: classroom in
 * Coimbatore, ₹20,000 for four weeks, eight trainees per batch, a weekday
 * batch at 2 hours a day starting on the first Monday of each month, a
 * weekend batch at 4 hours a day starting on the first Saturday. Change them
 * here and every page, the Course structured data and llms.txt follow.
 *
 * Deliberately absent, because nobody has supplied them and a course page
 * that invents them is the fastest way to lose a student's trust: class
 * clock times, the street address, total contact hours, salary figures and
 * placement rates. Where a page needs one of those, it says it is shared on
 * enquiry.
 */

import type { SourceKey } from "@/data/sources";

export const PROGRAMME = {
  name: "AI Digital Marketing Training",
  city: "Coimbatore",
  mode: "Classroom",
  feeInr: 20000,
  feeLabel: "₹20,000",
  duration: "4 weeks",
  durationIso: "P4W",
  batchSize: 8,
  batches: {
    weekday: { label: "Weekday batch", hoursPerDay: 2, startsOn: "the first Monday of every month" },
    weekend: { label: "Weekend batch", hoursPerDay: 4, startsOn: "the first Saturday of every month" },
  },
} as const;

/** What a trainee gets besides the classes. Each carries its own caveat. */
export const SUPPORT = [
  {
    title: "Live projects on real accounts",
    body: "You work on live campaigns for real businesses, supervised by our team, not on a simulation or a dummy account. You see real spend, real leads and real results, under the same confidentiality rules our own team works under.",
  },
  {
    title: "Placement assistance",
    body: "Help with your resume and portfolio, interview preparation, and introductions to hiring companies where we have them. It is not a job guarantee. No honest course can promise one, and a course that does is telling you something about everything else it says.",
  },
  {
    title: "Internship at growdigitalbranding",
    body: "Trainees who do well may be offered an internship with us, working on client accounts alongside the team. It is offered on the strength of your work, not included by default.",
  },
  {
    title: "Certificate of completion",
    body: "A growdigitalbranding certificate showing you completed the programme and its live project. It is not a government or university qualification. Employers and clients will care more about your portfolio, which is why the live project exists.",
  },
] as const;

/**
 * Four weeks, one theme each, ending in a live project. AI is taught where it
 * actually changes the work: research and writing, creative production, the
 * platforms' own automated campaign types, and being found in AI answers.
 */
export const CURRICULUM = [
  {
    week: "Week 1",
    title: "How digital marketing makes money, and your AI toolkit",
    topics: [
      "The funnel from ad to sale, and why cost per lead is not the number that matters",
      "Using AI assistants (ChatGPT, Gemini, Claude) for research, planning and first drafts",
      "Prompt writing that produces usable output rather than generic filler",
      "Brand basics: positioning, audience and message",
      "Content for Instagram, Facebook and LinkedIn, drafted with AI and edited by you",
    ],
  },
  {
    week: "Week 2",
    title: "Meta ads: Facebook and Instagram",
    topics: [
      "Campaign structure, objectives and budgets",
      "Audiences and Advantage+, Meta's AI-driven targeting",
      "Lead forms, click-to-WhatsApp ads and landing pages",
      "Producing ad creative with AI image and video tools, and testing it",
      "The Meta pixel and Conversions API, explained without jargon",
    ],
  },
  {
    week: "Week 3",
    title: "Google: Search ads, SEO and AI search",
    topics: [
      "Google Search ads, keyword research and negative keywords",
      "Performance Max, Google's AI campaign type, and when not to use it",
      "Google Business Profile and local search",
      "SEO basics, Search Console, and how pages get into AI answers (AEO and GEO)",
      "Writing content that search engines and AI assistants can quote",
    ],
  },
  {
    week: "Week 4",
    title: "Measurement, automation and your live project",
    topics: [
      "Google Analytics 4 and Google Tag Manager basics",
      "WhatsApp Business for follow-up, and simple automation",
      "Reading a campaign report and deciding what to change",
      "The live project: a supervised campaign on a real account",
      "Portfolio write-up, presentation and certificate",
    ],
  },
] as const;

/** Shared FAQ answers, used on every training page. */
export const COMMON_FAQS = [
  {
    question: "How much does the AI digital marketing course cost?",
    answer:
      "₹20,000 for the four-week programme, for both the weekday and the weekend batch. It includes the classes, the supervised live project, placement assistance and the certificate.",
  },
  {
    question: "When does the next batch start?",
    answer:
      "The weekday batch starts on the first Monday of every month and the weekend batch on the first Saturday. The next exact dates are shown at the top of this page and update automatically.",
  },
  {
    question: "How many students are in a batch?",
    answer:
      "Eight at most. A small batch is what makes it possible to review every trainee's work, including the live project, rather than lecturing at a room.",
  },
  {
    question: "Is the training online or in a classroom?",
    answer:
      "Classroom only, in Coimbatore. Marketing is learned by doing it with someone checking your work, and that works far better in the same room. The exact location and class timings are shared when you enquire.",
  },
  {
    question: "Do you guarantee a job after the course?",
    answer:
      "No. We provide placement assistance: resume and portfolio help, interview preparation and introductions where we have them, and trainees who do well may be offered an internship with us. A guarantee would not be honest, and it is worth being wary of any course that offers one.",
  },
  {
    question: "Do I need a laptop?",
    answer:
      "Yes, bring a laptop to every class. The work is hands-on from the first day, including AI tools and live ad accounts.",
  },
] as const;

export type Audience = {
  slug: string;
  path: string;
  /** <title> base; the layout template appends the brand. */
  title: string;
  /** H1, with the city. */
  h1: string;
  eyebrow: string;
  description: string;
  subtitle: string;
  /** Direct answer, rendered first. */
  answer: string;
  /** Which batch usually suits this reader, and why. */
  batchAdvice: string;
  sections: { heading: string; body: string[] }[];
  /** Outcomes specific to this audience. */
  outcomes: string[];
  faqs: { question: string; answer: string }[];
  sources?: SourceKey[];
};

export const AUDIENCES: Audience[] = [
  {
    slug: "students",
    path: "/training/students",
    title: "AI digital marketing training for students",
    h1: "AI digital marketing training for students in Coimbatore",
    eyebrow: "TRAINING / STUDENTS",
    description:
      "A 4-week classroom course in Coimbatore for college students: AI tools, Meta and Google ads, SEO, a live project and a portfolio. ₹20,000, 8 per batch.",
    subtitle:
      "Four weeks that leave you with something a degree does not: work you did on a real account, that you can show an interviewer.",
    answer:
      "A four-week, classroom course in Coimbatore that teaches college students to run digital marketing the way agencies do it now, with AI tools built in: Meta and Google ads, SEO and AI search, content, measurement and WhatsApp follow-up. You finish with a supervised project on a live account and a portfolio to show for it. It costs ₹20,000, batches are capped at eight, and most students take the weekend batch so it fits around college.",
    batchAdvice:
      "Most students take the weekend batch, 4 hours a day, so it fits around college. In vacations the weekday batch, 2 hours a day, gets you through the same programme without giving up whole weekends.",
    sections: [
      {
        heading: "Why learn digital marketing while you are still studying?",
        body: [
          "Because the thing that gets a fresher hired in marketing is proof, and proof takes time to build. A degree tells an employer you can learn. A campaign you actually ran, with its numbers, tells them you can do the job. Starting while you are in college means you graduate with the proof already in hand instead of spending your first months after college trying to build it.",
          "It is also one of the few fields where the tools are free or cheap to learn on and the skills carry across industries. The same thinking that sells an apartment sells a course, a product or a service.",
        ],
      },
      {
        heading: "Where does AI fit in, for someone just starting?",
        body: [
          "AI now does much of the first-draft work: research, outlines, ad copy variations, image ideas. That does not make marketers unnecessary. It makes the judgment more valuable: knowing which draft is right, what to test, and what the numbers are saying. We teach the tools and, more importantly, how to check and improve what they produce.",
          "You will also learn how Meta's and Google's own AI campaign types work, Advantage+ and Performance Max, because that is what you will be operating on day one of a real job, and how pages get chosen by AI assistants, which is a skill most working marketers are still catching up on.",
        ],
      },
      {
        heading: "What will you actually be able to show at the end?",
        body: [
          "A portfolio write-up of your live project: what the business needed, what you set up, what happened, and what you would change. That single page, with real numbers from a supervised account, carries more weight in an interview than a list of certificates.",
          "Alongside it, you can add Google's free Skillshop certifications and Meta's certification exam, both of which the course prepares you for, and the growdigitalbranding certificate of completion.",
        ],
      },
    ],
    outcomes: [
      "Plan and launch a Meta ads campaign, and read its results",
      "Set up Google Search ads with a sensible keyword and negative keyword list",
      "Use AI assistants and image tools to produce content, then edit it into something usable",
      "Explain SEO and how pages get into AI answers",
      "Present a live project in an interview, with real numbers",
    ],
    faqs: [
      {
        question: "Which degree do I need for this course?",
        answer:
          "Any. Students from commerce, arts, engineering and science all do well. What matters is that you are comfortable on a laptop and willing to do the work between classes.",
      },
      {
        question: "Can I do this in my first or second year?",
        answer:
          "Yes, and it can be an advantage: you will have time to build on it with freelance projects or an internship before placements, instead of starting from scratch in final year.",
      },
      {
        question: "Will this help me get an internship?",
        answer:
          "It gives you what internship interviews look for: hands-on work you can explain. We also offer internships with us to trainees who do well, and help with your resume and interviews either way.",
      },
    ],
    sources: ["googleAdsCertification", "skillshopCertifications", "metaDigitalMarketingAssociate"],
  },
  {
    slug: "job-switchers",
    path: "/training/job-switchers",
    title: "AI digital marketing course for job switchers",
    h1: "AI digital marketing training for job switchers in Coimbatore",
    eyebrow: "TRAINING / JOB SWITCHERS",
    description:
      "Switching into digital marketing? A 4-week Coimbatore classroom course with AI tools, Meta and Google ads, a live project and placement help. ₹20,000.",
    subtitle:
      "Your previous job is not wasted. It is the part of the story that makes you a better marketer than a fresher, if you can show you can do the work.",
    answer:
      "A four-week classroom course in Coimbatore for people moving into digital marketing from another field. It covers the work a marketing team actually hires for, with AI tools built in: Meta and Google ads, SEO and AI search, analytics and WhatsApp follow-up, ending in a supervised project on a live account that becomes the centrepiece of your application. ₹20,000, eight people per batch, and a weekend batch so you can keep your current job while you train.",
    batchAdvice:
      "If you are still working, take the weekend batch: 4 hours a day on Saturdays and Sundays. If you are between jobs, the weekday batch at 2 hours a day leaves the rest of the day for applications and practice.",
    sections: [
      {
        heading: "Is switching to digital marketing realistic?",
        body: [
          "Yes, and it is one of the more realistic switches, because hiring in marketing leans heavily on what you can demonstrate rather than on what you studied. But be clear about how it works: most switchers enter at an executive or specialist level, not at their current seniority, and move up quickly because they bring things a fresher does not.",
          "The switchers who do best are the ones who connect their past work to their new one. A sales background understands leads and follow-up. An accounts background reads a campaign report like a P&L. A teacher explains things clearly, which is most of content marketing. We help you tell that story.",
        ],
      },
      {
        heading: "What does an employer want to see from a switcher?",
        body: [
          "Evidence that you have done the work, not just studied it. That is why the course ends with a supervised live project on a real account, and why we spend time on writing it up. In an interview, walking through a campaign you ran, what you changed and why, answers the question every hiring manager has about a switcher: can this person actually do it?",
          "The other thing they want is judgment about AI. Almost every team now uses AI tools; the gap is people who can tell good output from bad and know what to test. That is a skill experience in any field sharpens.",
        ],
      },
      {
        heading: "How do you make the switch without losing income?",
        body: [
          "Train on weekends while you are still employed, build the portfolio, and apply before you resign. Freelance projects for small businesses are a common bridge: they add to your portfolio and your income while you look. The placement assistance helps with the resume, interviews and introductions, but plan on the search taking some weeks and keep your current role until you have an offer.",
        ],
      },
    ],
    outcomes: [
      "Run Meta and Google campaigns and explain the results in business terms",
      "Use AI tools for research, copy and creative, and judge their output",
      "Set up basic analytics and read what it tells you",
      "Present a live project and connect it to your past experience",
      "Take on small freelance projects while you look for a role",
    ],
    faqs: [
      {
        question: "Am I too old to switch into digital marketing?",
        answer:
          "No. Marketing teams value people who understand customers and business, which comes with experience. What matters is showing you can do the hands-on work, which is what the live project is for.",
      },
      {
        question: "Can I keep working while I do the course?",
        answer:
          "Yes. The weekend batch runs 4 hours a day on weekends, so you can complete it without leaving your job.",
      },
      {
        question: "What kind of role can I apply for afterwards?",
        answer:
          "Typically roles such as digital marketing executive, performance marketing or paid ads executive, social media executive or SEO executive, depending on what you enjoyed most in the course. Our career guide explains each.",
      },
    ],
  },
  {
    slug: "business-owners",
    path: "/training/business-owners",
    title: "AI digital marketing training for business owners",
    h1: "AI digital marketing training for business owners in Coimbatore",
    eyebrow: "TRAINING / BUSINESS OWNERS",
    description:
      "Learn to run your own ads and judge your agency. A 4-week Coimbatore classroom course on AI tools, Meta and Google ads, SEO and WhatsApp. ₹20,000.",
    subtitle:
      "You do not need to become a marketer. You need to know enough to run the basics yourself, and to know when someone else is doing it badly.",
    answer:
      "A four-week classroom course in Coimbatore for owners and managers who want to run their own digital marketing or oversee someone who does. You learn Meta and Google ads, Google Business Profile, SEO and AI search, WhatsApp follow-up and how to read the numbers, with AI tools to produce content in a fraction of the time. The live project can be your own business. ₹20,000, eight people per batch, weekday or weekend.",
    batchAdvice:
      "Owners usually prefer the weekday batch, 2 hours a day, which fits around running the business. The weekend batch covers the same programme in longer sessions if weekdays are impossible.",
    sections: [
      {
        heading: "Why should a business owner learn digital marketing?",
        body: [
          "Two reasons, and most owners care about the second more than the first. You can run the basics yourself: boosting the right posts, running a local lead campaign, keeping your Google Business Profile working for you. And you can judge whoever you pay to do it. Owners who understand cost per lead, conversion and what a campaign report should show are very hard to sell a bad retainer to.",
          "We are an agency, so we are aware of the irony of teaching this. It is deliberate: the clients who understand the numbers are the ones we work best with.",
        ],
      },
      {
        heading: "What can AI do for a small business's marketing?",
        body: [
          "A great deal of the production work that used to need a designer or a copywriter: first drafts of posts and ads, product descriptions, image variations, replies to common customer questions. We teach you to use it well, which mostly means giving it the right brief and checking what comes back, because unedited AI content is easy for customers to spot.",
          "You will also learn how your business can show up when customers ask AI assistants for recommendations, which increasingly happens before they ever search Google.",
        ],
      },
      {
        heading: "Can the live project be my own business?",
        body: [
          "Yes, and for most owners that is the best use of it. You set up and run a real campaign for your own business, supervised, so you finish the course with something already working rather than a practice exercise. If you would rather not use your own business, you work on one of our live accounts instead.",
        ],
      },
    ],
    outcomes: [
      "Run a local lead campaign on Meta and on Google",
      "Set up and maintain a Google Business Profile that brings in enquiries",
      "Produce weekly content with AI tools in a fraction of the time",
      "Follow up leads on WhatsApp before they go cold",
      "Read an agency's report and ask the right questions",
    ],
    faqs: [
      {
        question: "I don't have time for a long course. Is four weeks enough?",
        answer:
          "Four weeks is enough to run the basics yourself and to supervise others properly. It will not make you a specialist, and it is not meant to. The weekday batch is 2 hours a day.",
      },
      {
        question: "Can someone from my team attend instead of me?",
        answer:
          "Yes. Many businesses send the person who will run the marketing day to day. Some owners attend with them so they can judge the work afterwards.",
      },
      {
        question: "Will you try to sell me agency services?",
        answer:
          "No. The course is complete on its own. If you later want help, you will know exactly what to ask any agency, including us.",
      },
    ],
  },
  {
    slug: "housewives",
    path: "/training/housewives",
    title: "AI digital marketing course for housewives",
    h1: "AI digital marketing training for housewives and homemakers in Coimbatore",
    eyebrow: "TRAINING / HOMEMAKERS",
    description:
      "A 4-week Coimbatore classroom course for housewives and homemakers: AI tools, social media, ads and freelancing skills, 2 hours a day. ₹20,000, 8 per batch.",
    subtitle:
      "A skill you can use from home, on your own hours: for freelance work, for a return to a career, or for a business of your own.",
    answer:
      "A four-week classroom course in Coimbatore for housewives and homemakers who want a skill they can use from home. It covers social media, Meta and Google ads, content made with AI tools, WhatsApp marketing and how to find freelance clients, with a supervised project on a live account to build your confidence and your portfolio. The weekday batch is 2 hours a day, which fits around school hours. ₹20,000, eight women and men per batch.",
    batchAdvice:
      "The weekday batch, 2 hours a day, is the one most homemakers choose because it fits within school hours. The weekend batch suits those who have help at home on Saturdays and Sundays.",
    sections: [
      {
        heading: "Why is digital marketing a good fit for working from home?",
        body: [
          "Because almost all of it is done on a laptop and a phone, much of it can be scheduled around your day, and there is steady demand from small businesses that need someone to handle their social media, ads and WhatsApp enquiries. Many local businesses in Coimbatore need exactly this help and cannot afford an agency.",
          "It is also a skill that grows with you. You can start with one or two small clients, take on more as your confidence grows, move into a full-time role, or use it to grow a business of your own.",
        ],
      },
      {
        heading: "I haven't worked in years. Can I still do this?",
        body: [
          "Yes. The course starts from the basics and assumes no marketing background, and the batches are small, eight people, so nobody gets left behind and you can ask anything. Many people returning after a break find the AI tools make it easier than they expected, because the first draft of a post, an ad or a message is no longer the hard part. The skill we teach is making it good.",
          "If you have been managing a household, you already understand budgets, planning and what makes people buy. Those turn out to matter a great deal in marketing.",
        ],
      },
      {
        heading: "How do you find your first freelance clients?",
        body: [
          "Usually close to home: a relative's shop, a friend's boutique, a home baker, a local tutor. We cover how to offer a simple package, how to price it sensibly, and how to show results so one client leads to the next. Your live project and certificate give you something to show when you approach them.",
          "If you would rather work for a company, the placement assistance helps with your resume and interviews, including explaining a career break, and trainees who do well may be offered an internship with us.",
        ],
      },
    ],
    outcomes: [
      "Manage social media for a small business, with AI tools for posts and images",
      "Run simple ad campaigns on Instagram, Facebook and Google",
      "Handle enquiries and follow-up on WhatsApp Business",
      "Offer, price and deliver a freelance package",
      "Promote a home business of your own",
    ],
    faqs: [
      {
        question: "Can I bring my own home business to the course?",
        answer:
          "Yes. Your live project can be your own business, such as a home bakery, tailoring or tuition, so you finish with its marketing already running.",
      },
      {
        question: "Is the class only for women?",
        answer:
          "No. This page is written for homemakers, but batches are open to everyone and capped at eight people.",
      },
      {
        question: "How much can I earn from freelancing?",
        answer:
          "It depends on how many clients you take on, what you offer and your local market, so we will not quote a figure. The course covers how to price your services sensibly and how to grow from one client to several.",
      },
    ],
  },
];

export function getAudience(slug: string) {
  return AUDIENCES.find((a) => a.slug === slug);
}
