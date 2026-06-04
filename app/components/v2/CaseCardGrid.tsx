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
                <div className="v2-cs-media-fallback" />
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
        .v2-cs-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px}
        .v2-cs-card{display:flex;flex-direction:column;background:#fff;border:1px solid var(--border);border-radius:20px;overflow:hidden;text-decoration:none;color:var(--text);transition:transform .35s cubic-bezier(.2,.8,.2,1),border-color .25s,box-shadow .35s;box-shadow:0 1px 2px rgba(15,17,40,.04)}
        .v2-cs-card:hover{transform:translateY(-3px);border-color:var(--cta);box-shadow:0 24px 48px -24px rgba(7,203,121,.28)}
        .v2-cs-media{position:relative;width:100%;aspect-ratio:16/10;background:linear-gradient(135deg,#eef1fb,#e3e8f5);overflow:hidden}
        .v2-cs-media img{transition:transform .6s cubic-bezier(.2,.8,.2,1)}
        .v2-cs-card:hover .v2-cs-media img{transform:scale(1.05)}
        .v2-cs-media-fallback{position:absolute;inset:0;background:radial-gradient(circle at 30% 30%,rgba(7,203,121,.16),transparent 50%),radial-gradient(circle at 72% 72%,rgba(15,17,40,.10),transparent 50%),#f3f6fb}
        .v2-cs-tag{position:absolute;top:14px;left:14px;padding:5px 12px;background:rgba(255,255,255,.96);backdrop-filter:blur(8px);border-radius:999px;font-family:var(--fm);font-size:10px;font-weight:700;letter-spacing:.1em;color:var(--sub);box-shadow:0 2px 8px rgba(15,17,40,.06)}
        .v2-cs-body{padding:22px;display:flex;flex-direction:column;flex:1}
        .v2-cs-head{min-height:26px;display:flex;align-items:center;margin-bottom:12px}
        .v2-cs-company{font-size:15px;font-weight:800;color:var(--heading)}
        .v2-cs-metric-row{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:12px}
        .v2-cs-metric{font-family:var(--fd);font-size:34px;font-weight:800;color:var(--cta);line-height:1}
        .v2-cs-metric-label{font-size:12.5px;color:var(--text);line-height:1.5}
        .v2-cs-quote{font-size:14px;line-height:1.75;color:var(--text);margin:0 0 14px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
        .v2-cs-more{margin-top:auto;font-size:13px;font-weight:700;color:var(--cta-ink)}
      `}</style>
    </div>
  );
}
