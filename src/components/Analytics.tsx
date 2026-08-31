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
 * Consent defaults are denied before the container loads. Under Consent Mode
 * v2 tags then run in a cookieless mode until consent is granted, so adding a
 * banner later is an update call rather than a retrofit. Grow sells Consent
 * Mode v2 as a service; shipping its own site without it would be a poor look.
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
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
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
