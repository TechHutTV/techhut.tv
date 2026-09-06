import Script from 'next/script'
import { ANALYTICS_PREFERENCE_KEY } from '@/lib/analyticsPreference'

export function MatomoTagManager() {
  return (
    <Script id="matomo-tag-manager" strategy="afterInteractive">
      {`(function() {
try {
  var preference = window.localStorage.getItem('${ANALYTICS_PREFERENCE_KEY}');
  if (window.__techhutAnalyticsDisabled || (preference !== null && preference !== 'in')) return;
  if (preference === 'in') {
    window._paq = window._paq || [];
    window._paq.push(['forgetUserOptOut']);
  }
} catch (_) { return; }
var _mtm = window._mtm = window._mtm || [];
_mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
(function() {
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.async=true; g.src='https://matomo.hopkins.sh/js/container_sCz8NABU.js'; s.parentNode.insertBefore(g,s);
})();
})();`}
    </Script>
  )
}
