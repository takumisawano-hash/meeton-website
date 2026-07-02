// Static fallback for the 3 public case studies — used on the homepage
// when the live Notion fetch returns empty (e.g. preview deploys without
// the NOTION_CASE_STUDIES_DATABASE_ID env). Mirrors the real published
// cases at /case-studies/. EduLinx is anonymized as "研修業界リーダー" to
// match how it appears on the live case page.

export type FeaturedCase = {
  slug: string;
  name: string;
  industry?: string;
  quote?: string;
  heroMetric?: string;
  heroMetricLabel?: string;
  companyLogo?: string | null;
  heroImage?: string | null;
};

// companyLogo points at local /clients/*.png so the fallback always shows a
// real logo even when Notion is unreachable (preview deploys have no Notion
// env). EduLinx is anonymized as 研修業界リーダー on the public case, so no logo.
// English overlay for the EN homepage/cases surfaces (2026-07-02). Case data
// comes from Notion in Japanese; these are faithful translations of the four
// public cases keyed by slug — numbers must stay exactly as approved
// (60%+ = EdulinX, 20x = BizteX, SQL 2x = G-gen, 2 deals = Univis).
export type FeaturedCaseEn = Partial<FeaturedCase> & {
  /** EN page <h1>/<title> for the case detail page */
  title?: string;
  /** EN body shown on /en/cases/[slug] instead of the (Japanese) Notion body */
  summary?: string;
};

export const FEATURED_CASE_EN: Record<string, FeaturedCaseEn> = {
  "edulinx-ai-chat-40-percent": {
    name: "EdulinX, Inc.",
    industry: "HR & corporate training",
    heroMetricLabel: "Meeting-conversion rate via Meeton ai (about 3x the 20% industry average)",
    quote:
      "Customers who come through Meeton ai reach out already well nurtured. It's remarkably effective for meeting conversion.",
    title: "60%+ meeting conversion via Meeton ai — EdulinX (corporate training)",
    summary:
      "EdulinX, a leading corporate-training provider, deployed Meeton Chat to engage website visitors who were still in the research stage. Prospects now arrive at sales conversations already nurtured, and the meeting-conversion rate for leads that come through Meeton ai exceeds 60% — about three times the ~20% industry average, versus 23% across the company's other channels.",
  },
  "biztex-chat-leads-10x": {
    name: "BizteX Inc.",
    industry: "SaaS",
    heroMetricLabel: "Chat-sourced leads acquired (vs. conventional scripted chat)",
    quote:
      "Previously 1–2 a month. Since switching to Meeton ai, 20+ a month — more than 20x the leads are born from chat.",
    title: "20x+ chat-sourced leads — BizteX (cloud RPA SaaS)",
    summary:
      "BizteX, a cloud-RPA SaaS company, replaced its scripted decision-tree chat with Meeton ai. Because the AI answers visitors' real questions in context instead of forcing them down a fixed scenario, chat-sourced lead acquisition grew from one or two leads a month to more than twenty — a 20x+ increase.",
  },
  "g-gen-inside-sales-sql-2x": {
    name: "G-gen Co., Ltd.",
    industry: "IT & cloud",
    heroMetric: "2x SQLs",
    heroMetricLabel: "Doubled monthly SQLs with an 80% meeting-conversion rate (Google Cloud / Workspace services)",
    quote:
      "We replaced the 30–60 minutes per inquiry spent on matching, discovery, and scheduling with a new lead channel that identifies in-market buyers early.",
    title: "Monthly SQLs doubled — G-gen (Google Cloud services)",
    summary:
      "G-gen, a Google Cloud / Workspace specialist, used Meeton ai to identify in-market visitors early and route them straight to inside sales. Monthly SQLs doubled — from about 20 to 41–48 — with an 80% meeting-conversion rate, replacing the 30–60 minutes of manual matching, discovery, and scheduling that each inquiry used to require.",
  },
  "univis-multi-service-3month-2deals": {
    name: "Univis Group",
    industry: "Consulting",
    heroMetric: "2 deals won",
    heroMetricLabel: "Closed M&A / consulting deals within 3 months",
    quote:
      "Even without a booked meeting, we can instantly see which companies are viewing our content. Our proposal count has grown too.",
    title: "2 deals won in 3 months — Univis Group (M&A / consulting)",
    summary:
      "Univis Group, an M&A and consulting firm, runs Meeton ai across multiple service lines. Within three months it closed two deals sourced through the platform — and even before a meeting is booked, the team can instantly see which companies are engaging with its content, growing the number of proposals it sends.",
  },
};

/** Apply the EN overlay to a (Notion-sourced, Japanese) featured case. */
export function localizeFeaturedCase<T extends { slug: string }>(c: T): T {
  const en = FEATURED_CASE_EN[c.slug];
  if (!en) return c;
  // only overlay the card-level fields present on T (title/summary are for
  // the detail page and would be extraneous on card data)
  const { title: _t, summary: _s, ...card } = en;
  return { ...c, ...card };
}

export const FEATURED_CASES: FeaturedCase[] = [
  {
    slug: "edulinx-ai-chat-40-percent",
    name: "研修業界リーダー",
    industry: "人材・研修",
    heroMetric: "60%+",
    heroMetricLabel: "Meeton ai 経由の商談化率（業界平均20%の約3倍）",
    quote:
      "Meeton ai を経由したお客様は、明らかにナーチャリングされた状態で問い合わせてくださる。商談化に非常に有効。",
    companyLogo: null, // anonymized
  },
  {
    slug: "biztex-chat-leads-10x",
    name: "BizteX 株式会社",
    industry: "SaaS",
    heroMetric: "20x+",
    heroMetricLabel: "チャット経由のリード獲得数（対 従来型チャット）",
    quote:
      "従来は月1〜2件。Meeton ai にしてから月20件以上——20倍以上のリードがチャットから生まれている。",
    companyLogo: "/clients/biztex.png",
  },
  {
    slug: "g-gen-inside-sales-sql-2x",
    name: "株式会社G-gen",
    industry: "IT・クラウド",
    heroMetric: "SQL 2倍",
    heroMetricLabel: "月間SQLを2倍、商談化率80%を実現（Google Cloud/Workspace 支援）",
    quote:
      "問い合わせ1件あたり30分〜1時間かけていた照合・ヒアリング・アポ調整を、検討層を早期特定する新しいリードチャネルに置き換えた。",
    companyLogo: "/clients/ggen.png",
  },
  {
    slug: "univis-multi-service-3month-2deals",
    name: "Univis Group",
    industry: "コンサルティング",
    heroMetric: "受注2件",
    heroMetricLabel: "3ヶ月でM&A・コンサル領域の受注を獲得",
    quote:
      "アポにならなくても『どの企業が自社のコンテンツを見ているか』が瞬時にわかる。提案件数も増えた。",
    companyLogo: "/clients/univis.png",
  },
];
