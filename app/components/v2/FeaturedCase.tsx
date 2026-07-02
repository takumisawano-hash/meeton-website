import Link from "next/link";
import Image from "next/image";
import type { CaseCardData } from "@/app/components/v2/CaseCardGrid";
import type { Lang } from "@/app/lib/i18n";

// One large featured case (home) — big media + headline metric + quote, like
// the existing Meeton site's featured story. 2026-06-10 per Takumi: with only
// a handful of cases, lead with one big story + 全ての事例を見る.

const SLUG_LOGO: Record<string, string> = {
  "g-gen-inside-sales-sql-2x": "/clients/ggen.png",
  "biztex-chat-leads-10x": "/clients/biztex.png",
  "edulinx-ai-chat-40-percent": "/clients/edulinx.png",
  "univis-multi-service-3month-2deals": "/clients/univis.png",
};

// Notion stock covers (Unsplash) ship w=3840 (~440KB). Clamp the width param
// to 1200 — plenty for the ~560px media column at 2x DPR.
function clampHeroWidth(src: string): string {
  try {
    const u = new URL(src);
    if (Number(u.searchParams.get("w")) > 1200) {
      u.searchParams.set("w", "1200");
      return u.toString();
    }
  } catch {
    // relative URL (e.g. /api/notion-image/) — leave as-is
  }
  return src;
}

// Chrome strings only — case CONTENT (company names, quotes, numbers) comes
// from Notion (JA) and stays as-is; only the surrounding labels translate.
const STR = {
  ja: {
    aria: (name: string) => `${name} の導入事例を読む`,
    caseAlt: (name: string) => `${name} 導入事例`,
    logoAlt: (name: string) => `${name} ロゴ`,
    more: "この事例を読む →",
    quote: (q: string) => `「${q}」`,
  },
  en: {
    aria: (name: string) => `Read the ${name} customer story`,
    caseAlt: (name: string) => `${name} customer story`,
    logoAlt: (name: string) => `${name} logo`,
    more: "Read this story →",
    quote: (q: string) => `“${q}”`,
  },
} as const;

export default function FeaturedCase({ c, lang = "ja" }: { c: CaseCardData; lang?: Lang }) {
  const logo = c.companyLogo || SLUG_LOGO[c.slug];
  const s = STR[lang];
  return (
    <Link href={lang === "en" ? `/en/cases/${c.slug}/` : `/cases/${c.slug}/`} aria-label={s.aria(c.name)} className="v2-fc">
      <div className="v2-fc-media">
        {c.heroImage ? (
          <Image src={clampHeroWidth(c.heroImage)} alt={s.caseAlt(c.name)} fill sizes="(max-width:900px) 100vw, 560px" style={{ objectFit: "cover" }} />
        ) : (
          <div className="v2-fc-fallback">
            {logo && <Image src={logo} alt={s.logoAlt(c.name)} width={220} height={64} style={{ height: 56, width: "auto", maxWidth: "64%", objectFit: "contain" }} />}
          </div>
        )}
        {c.industry && <span className="v2-fc-tag">{c.industry}</span>}
      </div>
      <div className="v2-fc-body">
        {logo && <Image src={logo} alt={s.logoAlt(c.name)} width={120} height={30} style={{ height: 26, width: "auto", objectFit: "contain", marginBottom: 14 }} />}
        {c.heroMetric && (
          <div className="v2-fc-metric-row">
            <span className="v2-fc-metric">{c.heroMetric}</span>
            {c.heroMetricLabel && <span className="v2-fc-metric-label">{c.heroMetricLabel}</span>}
          </div>
        )}
        {c.quote && <p className="v2-fc-quote">{s.quote(c.quote)}</p>}
        <span className="v2-fc-more">{s.more}</span>
      </div>
      <style>{`
        .v2-fc{display:grid;grid-template-columns:1.1fr 1fr;gap:0;max-width:1080px;margin:0 auto;background:#fff;border:1px solid var(--border);border-radius:24px;overflow:hidden;text-decoration:none;color:var(--text);box-shadow:0 1px 2px rgba(15,17,40,.04);transition:transform .35s cubic-bezier(.2,.8,.2,1),border-color .25s,box-shadow .35s}
        .v2-fc:hover{transform:translateY(-3px);border-color:var(--cta);box-shadow:0 30px 60px -28px rgba(7,203,121,.30)}
        .v2-fc-media{position:relative;min-height:340px;background:linear-gradient(135deg,#eef1fb,#e3e8f5);overflow:hidden}
        .v2-fc-media img{transition:transform .6s cubic-bezier(.2,.8,.2,1)}
        .v2-fc:hover .v2-fc-media img{transform:scale(1.04)}
        .v2-fc-fallback{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 30% 28%,rgba(7,203,121,.16),transparent 55%),radial-gradient(circle at 74% 76%,rgba(15,17,40,.07),transparent 55%),#fff}
        .v2-fc-tag{position:absolute;top:18px;left:18px;padding:6px 14px;background:rgba(255,255,255,.96);backdrop-filter:blur(8px);border-radius:999px;font-family:var(--fm);font-size:11px;font-weight:700;letter-spacing:.1em;color:var(--sub);box-shadow:0 2px 8px rgba(15,17,40,.06)}
        .v2-fc-body{padding:clamp(28px,4vw,48px);display:flex;flex-direction:column;justify-content:center}
        .v2-fc-metric-row{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;margin-bottom:16px}
        .v2-fc-metric{font-family:var(--fd);font-size:clamp(48px,6vw,68px);font-weight:800;color:var(--cta-ink);line-height:1;font-variant-numeric:tabular-nums}
        .v2-fc-metric-label{font-size:15px;color:var(--text);line-height:1.55;font-weight:600}
        .v2-fc-quote{font-size:16px;line-height:1.9;color:var(--text);margin:0 0 18px}
        .v2-fc-more{font-size:15px;font-weight:800;color:var(--cta-ink)}
        @media(max-width:780px){.v2-fc{grid-template-columns:1fr}.v2-fc-media{min-height:220px}}
      `}</style>
    </Link>
  );
}
