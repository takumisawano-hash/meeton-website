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
