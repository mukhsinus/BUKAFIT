import Script from "next/script";

/**
 * Loads Metrika / GA4 only when public IDs are set.
 * Event tracking stays in lib/analytics.ts (reachGoal / gtag).
 */
export function AnalyticsScripts() {
  const metricaId = process.env.NEXT_PUBLIC_METRICA_ID?.trim();
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();

  return (
    <>
      {metricaId ? (
        <Script id="yandex-metrica" strategy="afterInteractive">{`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          ym(${JSON.stringify(Number(metricaId))}, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:false
          });
        `}</Script>
      ) : null}

      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${JSON.stringify(gaId)}, { anonymize_ip: true });
          `}</Script>
        </>
      ) : null}
    </>
  );
}
