import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

// AW-18060590496 (Google Ads) は GoogleAnalytics コンポーネントで
// グローバルに gtag('config') 済み。/lp/ で重複 gtag.js (140KB)
// をロードしていた問題を解消したため、ここでは LinkedIn のみ。
export default function LPLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="linkedin-insight-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            _linkedin_partner_id = "9112612";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `,
        }}
      />
      <Script
        id="linkedin-insight"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
          `,
        }}
      />
      {children}
    </>
  )
}
