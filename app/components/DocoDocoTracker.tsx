'use client'

import Script from 'next/script'

export default function DocoDocoTracker() {
  return (
    <Script
      id="docodoco-tracker"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
(function() {
  if (navigator.webdriver) return;
  if (sessionStorage.getItem('_ddc')) return;

  fetch('https://api.ipify.org?format=json')
    .then(function(r) { return r.json(); })
    .then(function(ipData) {
      return fetch('https://api.docodoco.jp/v6/search?format=json'
        + '&ipadr=' + encodeURIComponent(ipData.ip)
        + '&key1=Oq3jXfIIMPjyTgR6rpI00j41YnOdH3G9XBcVp4UqTmxskjBLoXCOvugFVrR5CiYv'
        + '&key2=538c14fdb5fdfde8b64547df6aa902961ac2442c');
    })
    .then(function(r) { return r.json(); })
    .then(function(d) {
      sessionStorage.setItem('_ddc', '1');
      var org = d.OrgName || '';
      if (!org || !d.DomainName) return;
      var lineCode = d.LineCode || '';
      if (lineCode === '1' || lineCode === '2') return;

      fetch('/api/visitor-signal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: org,
          domain: d.DomainName,
          org_url: d.OrgUrl || '',
          employees: d.OrgEmployeesCode || '',
          industry: d.OrgIndustrialCategoryL || '',
          page_url: location.href,
          referrer: document.referrer || ''
        }),
        keepalive: true
      }).catch(function() {});
    }).catch(function() {});
})();
`,
      }}
    />
  )
}
