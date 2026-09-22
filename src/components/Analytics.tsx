import Script from "next/script";

/**
 * Google Tag Manager, with Consent Mode v2 defaulting to denied.
 *
 * Only the container ID is configurable, never a pasted script. A field whose
 * contents are injected into every page is stored XSS: one compromised admin
 * account would own every visitor's browser, on a site that collects phone
 * numbers. GTM is the supported way to add everything else — GA4, the Meta
 * pixel, Google Ads, conversion tags — so nothing is lost by refusing raw
 * script, and it all becomes editable without a deploy.
 *
 * Consent defaults are set before the container loads, and they are
 * region-scoped. This matters: a single unscoped denied default applies
 * worldwide, and with no banner to update it, every visitor everywhere stays
 * denied forever. GTM's container diagnostics reports exactly that, as a 0%
 * consent rate "including regions outside the EEA", and the measurement cost
 * is real: no remarketing audiences build, and conversions arrive modelled
 * rather than observed.
 *
 * So: denied by default inside the EEA, the UK and Switzerland, where prior
 * consent is the expectation, and granted everywhere else. ConsentBanner
 * then offers the EEA visitor the choice that turns denied into granted.
 *
 * Google resolves the region by IP at tag-fire time, which is authoritative
 * and not something this code can be wrong about. The banner's own region
 * guess only decides whether to draw the UI.
 *
 * Grow sells Consent Mode v2 as a service; shipping its own site without it
 * would be a poor look.
 */
export function Analytics({ containerId }: { containerId: string | null }) {
  if (!containerId) return null;

  return (
    <>
      {/* A plain inline script, not next/script. It has to execute before
          gtm.js, and an inline script in the initial HTML runs at parse time,
          which is provably earlier than the afterInteractive container below.
          beforeInteractive would also work but carries a lint rule aimed at
          the Pages Router and more machinery than one ordering needs. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var CONSENT_REGIONS = ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','GB','CH'];
// Region-scoped first. A region-specific default wins over the general one,
// and listing it first also makes the intent readable.
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  region: CONSENT_REGIONS,
  wait_for_update: 500
});
// Everywhere else, which for this business is almost all of the traffic.
gtag('consent', 'default', {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted',
  functionality_storage: 'granted',
  security_storage: 'granted'
});
gtag('set', 'url_passthrough', true);
gtag('set', 'ads_data_redaction', true);
`,
        }}
      />

      <Script id="gtm" strategy="afterInteractive">
        {`
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');
        `}
      </Script>
    </>
  );
}

/** The no-JavaScript fallback. Goes immediately after the opening body tag. */
export function AnalyticsNoScript({ containerId }: { containerId: string | null }) {
  if (!containerId) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
