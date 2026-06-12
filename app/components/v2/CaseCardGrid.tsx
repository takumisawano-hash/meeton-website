import Link from "next/link";
import Image from "next/image";

// Photo-card case format matching the existing Meeton site (cs-card): media
// on top (heroImage or gradient fallback) + industry tag, body with company
// logo, metric, quote. Reused by Home + /cases. 2026-06-04 per Takumi.

export type CaseCardData = {
  slug: string;
  name: string;
  industry?: string;
  quote?: string;
  heroMetric?: string;
  heroMetricLabel?: string;
  heroImage?: string | null;
  companyLogo?: string | null;
};

const SLUG_LOGO: Record<string, string> = {
  "biztex-chat-leads-10x": "/clients/biztex.png",
  "edulinx-ai-chat-40-percent": "/clients/edulinx.png",
  "univis-multi-service-3month-2deals": "/clients/univis.png",
};

export default function CaseCardGrid({ cases }: { cases: CaseCardData[] }) {
  return (
    <div className="v2-cs-grid">
      {cases.map((c) => {
        const logo = c.companyLogo || SLUG_LOGO[c.slug];
        return (
          <Link key={c.slug} href={`/cases/${c.slug}/`} aria-label={`${c.name} の導入事例を読む`} className="v2-cs-card">
            <div className="v2-cs-media">
              {c.heroImage ? (
                <Image src={c.heroImage} alt={`${c.name} 導入事例`} fill sizes="(max-width:760px) 100vw, 560px" style={{ objectFit: "cover" }} />
              ) : (
                <div className="v2-cs-media-fallback">
                  {logo ? (
                    <Image src={logo} alt={`${c.name} ロゴ`} width={180} height={56} style={{ height: 48, width: "auto", maxWidth: "62%", objectFit: "contain" }} />
                  ) : (
                    <span className="v2-cs-fallback-name">{c.name}</span>
                  )}
                </div>
              )}
              {c.industry && <span className="v2-cs-tag">{c.industry}</span>}
            </div>
            <div className="v2-cs-body">
              <div className="v2-cs-head">
                {logo ? (
                  <Image src={logo} alt={`${c.name} ロゴ`} width={104} height={28} style={{ height: 24, width: "auto", objectFit: "contain" }} />
                ) : (
                  <span className="v2-cs-company">{c.name}</span>
                )}
              </div>
              {c.heroMetric && (
                <div className="v2-cs-metric-row">
                  <span className="v2-cs-metric">{c.heroMetric}</span>
                  {c.heroMetricLabel && <span className="v2-cs-metric-label">{c.heroMetricLabel}</span>}
                </div>
              )}
              {c.quote && <p className="v2-cs-quote">「{c.quote}」</p>}
              <span className="v2-cs-more">この事例を読む →</span>
            </div>
          </Link>
        );
      })}
      <style>{`
        /* bigger cards (Takemi: 4件と少ないので旧サイト風に大きく) — 2 columns,
           larger media + type, so a small set still has presence */
        .v2-cs-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px;max-width:1080px;margin:0 auto}
        .v2-cs-card{display:flex;flex-direction:column;background:#fff;border:1px solid var(--border);border-radius:24px;overflow:hidden;text-decoration:none;color:var(--text);transition:transform .35s cubic-bezier(.2,.8,.2,1),border-color .25s,box-shadow .35s;box-shadow:0 1px 2px rgba(15,17,40,.04)}
        .v2-cs-card:hover{transform:translateY(-4px);border-color:var(--cta);box-shadow:0 28px 56px -24px rgba(7,203,121,.30)}
        .v2-cs-media{position:relative;width:100%;aspect-ratio:16/9;background:linear-gradient(135deg,#eef1fb,#e3e8f5);overflow:hidden}
        .v2-cs-media img{transition:transform .6s cubic-bezier(.2,.8,.2,1)}
        .v2-cs-card:hover .v2-cs-media img{transform:scale(1.05)}
        .v2-cs-media-fallback{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 30% 30%,rgba(7,203,121,.14),transparent 55%),radial-gradient(circle at 72% 72%,rgba(15,17,40,.08),transparent 55%),#fff}
        .v2-cs-fallback-name{font-size:22px;font-weight:800;color:var(--heading)}
        .v2-cs-tag{position:absolute;top:16px;left:16px;padding:6px 14px;background:rgba(255,255,255,.96);backdrop-filter:blur(8px);border-radius:999px;font-family:var(--fm);font-size:11px;font-weight:700;letter-spacing:.1em;color:var(--sub);box-shadow:0 2px 8px rgba(15,17,40,.06)}
        .v2-cs-body{padding:28px clamp(22px,2.4vw,32px);display:flex;flex-direction:column;flex:1}
        .v2-cs-head{min-height:30px;display:flex;align-items:center;margin-bottom:14px}
        .v2-cs-company{font-size:17px;font-weight:800;color:var(--heading)}
        .v2-cs-metric-row{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin-bottom:14px}
        .v2-cs-metric{font-family:var(--fd);font-size:clamp(40px,4vw,52px);font-weight:800;color:var(--cta-ink);line-height:1;font-variant-numeric:tabular-nums}
        .v2-cs-metric-label{font-size:14px;color:var(--text);line-height:1.55}
        .v2-cs-quote{font-size:15px;line-height:1.85;color:var(--text);margin:0 0 16px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
        .v2-cs-more{margin-top:auto;font-size:14px;font-weight:700;color:var(--cta-ink)}
        @media(max-width:680px){.v2-cs-grid{grid-template-columns:1fr}}
      `}</style>
    </div>
  );
}
