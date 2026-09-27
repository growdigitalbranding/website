/**
 * Primary sources the site's factual claims rest on.
 *
 * The site's whole argument is that its numbers can be checked, and until
 * this file existed not one page linked to anything outside the domain. Every
 * entry below is the publisher's own page: the statute, the regulator, or the
 * platform's documentation. No blogs, no aggregators, no competitors.
 *
 * Each URL was confirmed to exist and to say what the site cites it for, by
 * live search against the publisher's own domain, on the date in VERIFIED.
 * Platform documentation moves; re-check these when a page is next edited
 * rather than trusting them forever.
 *
 * Pages reference sources by key, so a URL that moves is fixed once here.
 */

export const SOURCES_VERIFIED = "2026-09-27";

export const SOURCES = {
  reraAct: {
    label: "The Real Estate (Regulation and Development) Act, 2016",
    publisher: "India Code, Government of India",
    url: "https://www.indiacode.nic.in/handle/123456789/2158?locale=en",
  },
  tnrera: {
    label: "Tamil Nadu Real Estate Regulatory Authority (TNRERA)",
    publisher: "Government of Tamil Nadu",
    url: "https://rera.tn.gov.in/",
  },
  reraKarnataka: {
    label: "Real Estate Regulatory Authority Karnataka",
    publisher: "Government of Karnataka",
    url: "https://rera.karnataka.gov.in/home?language=en",
  },
  metaLearningPhase: {
    label: "About the learning phase",
    publisher: "Meta Business Help Centre",
    url: "https://www.facebook.com/business/help/112167992830700/",
  },
  metaInstantFormTypes: {
    label: "About Instant Form types (More Volume and Higher Intent)",
    publisher: "Meta Business Help Centre",
    url: "https://www.facebook.com/business/help/252352181957512/",
  },
  metaConversionLeads: {
    label: "Conversions API for CRM integration (conversion leads)",
    publisher: "Meta for Developers",
    url: "https://developers.facebook.com/documentation/ads-commerce/conversions-api/conversion-leads-integration",
  },
  metaCapi: {
    label: "Conversions API documentation",
    publisher: "Meta for Developers",
    url: "https://developers.facebook.com/docs/marketing-api/conversions-api/",
  },
  metaDedup: {
    label: "About deduplication for Meta Pixel and Conversions API events",
    publisher: "Meta Business Help Centre",
    url: "https://www.facebook.com/business/help/823677331451951",
  },
  metaClickToWhatsApp: {
    label: "Create ads that click to WhatsApp",
    publisher: "Meta Business Help Centre",
    url: "https://www.facebook.com/business/help/447934475640650",
  },
  waServiceWindow: {
    label: "Service messages and the customer service window",
    publisher: "WhatsApp Business Platform, Meta for Developers",
    url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/send-messages",
  },
  waTemplates: {
    label: "Template fundamentals",
    publisher: "WhatsApp Business Platform, Meta for Developers",
    url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview",
  },
  waOptIn: {
    label: "Get opt-in for WhatsApp",
    publisher: "WhatsApp Business Platform, Meta for Developers",
    url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/getting-opt-in",
  },
  waQuality: {
    label: "Messaging limits and quality rating",
    publisher: "WhatsApp Business Platform, Meta for Developers",
    url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/messaging-limits",
  },
  waPolicy: {
    label: "WhatsApp Business Messaging Policy",
    publisher: "WhatsApp",
    url: "https://business.whatsapp.com/policy",
  },
  googleEcLeads: {
    label: "About enhanced conversions for leads",
    publisher: "Google Ads Help",
    url: "https://support.google.com/google-ads/answer/15713840?hl=en",
  },
  googleOci: {
    label: "About offline conversion imports",
    publisher: "Google Ads Help",
    url: "https://support.google.com/google-ads/answer/2998031?hl=en",
  },
  googleBrandExclusions: {
    label: "Apply brand exclusions to Performance Max or Search campaigns",
    publisher: "Google Ads Help",
    url: "https://support.google.com/google-ads/answer/14505308?hl=en",
  },
  googleLocationOptions: {
    label: "About advanced location options (presence and interest)",
    publisher: "Google Ads Help",
    url: "https://support.google.com/google-ads/answer/1722038?hl=en",
  },
  googleTrademarks: {
    label: "Trademarks policy",
    publisher: "Google Advertising Policies Help",
    url: "https://support.google.com/adspolicy/answer/6118?hl=en",
  },
  googleConsentMode: {
    label: "Set up consent mode on websites",
    publisher: "Google for Developers",
    url: "https://developers.google.com/tag-platform/security/guides/consent",
  },
  googleAiFeatures: {
    label: "AI features and your website",
    publisher: "Google Search Central",
    url: "https://developers.google.com/search/docs/appearance/ai-features",
  },
  googleCrawlers: {
    label: "Google's common crawlers, including the Google-Extended token",
    publisher: "Google for Developers",
    url: "https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers",
  },
  webkitTrackingPrevention: {
    label: "Tracking Prevention in WebKit (Safari)",
    publisher: "WebKit",
    url: "https://webkit.org/tracking-prevention/",
  },
  llmsTxt: {
    label: "The /llms.txt file proposal",
    publisher: "llmstxt.org",
    url: "https://llmstxt.org/",
  },
  googleAdsCertification: {
    label: "About Google Ads certifications",
    publisher: "Google Ads Help",
    url: "https://support.google.com/google-ads/answer/9702955?hl=en",
  },
  skillshopCertifications: {
    label: "Certifications for Skillshop Google Ads, GMP and GA",
    publisher: "Skillshop Help (Google)",
    url: "https://support.google.com/skillshop/answer/14744470?hl=en",
  },
  metaCertification: {
    label: "Meta Certification: professional certificate exams",
    publisher: "Meta for Business",
    url: "https://www.facebook.com/business/learn/certification",
  },
  metaDigitalMarketingAssociate: {
    label: "100-101: Meta Certified Digital Marketing Associate exam",
    publisher: "Meta for Business",
    url: "https://www.facebook.com/business/learn/certification/exams/100-101-exam",
  },
} as const;

export type SourceKey = keyof typeof SOURCES;

export function resolveSources(keys: readonly SourceKey[] = []) {
  return keys.map((k) => SOURCES[k]);
}
