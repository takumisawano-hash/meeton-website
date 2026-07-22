// Blog post slugs that were 301-consolidated into a canonical twin on
// 2026-06-22 (title/content dedup). getAllPosts() drops these so they vanish
// from the sitemap, blog hub, category pages and internal links — their inbound
// equity flows to the canonical via the 301 in scripts/blog-redirects.js.
export const DEDUPED_BLOG_SLUGS = new Set<string>([
  "inbound-sales-guide-ai-conversion-2026",
  "abm-comparison-tool-selection-guide-2026",
  "abm-tool-enterprise-selection-guide",
  "abm-tools-complete-guide-2025-how-to-choose-and-implement",
  "abm-tool-free-vs-paid-comparison-2026",
  "ai-chatbot-lead-qualification-automation-guide",
  "80-percent-lead-ai-qualification-frontier",
  "objection-analysis-sales",
  "turn-objections-into-sales",
  "digital-sales-suitable-person-5-traits-ai-era",
  "how-to-identify-the-10-characteristics-of-successful-inside-sales",
  "ai-sdr-24-7-lead-generation",
  "developing-a-winning-inside-sales-process",
  "inside-sales-process-design-guide-2026",
  "kpi-for-inside-sales",
  "sales-marketing-ai",
  "2025-ai-revops-sales-marketing-integration-guide",
  "ai-pipeline-forecast-accuracy-method",
  "jp-mlutgtmq-7hss",
  "jp-mlutgq9p-3f9v",
  "jp-mlutg1dm-rgkb",
  // "lead-decline-causes-solutions" removed 2026-07-22 (approved weekly #2):
  // page is live 200 with no redirect, EN twin earns traffic — hiding only the
  // JA original from sitemap/listing was a leftover inconsistency from the
  // 06-22 dedup sweep, not an intentional exclusion.
  "websitebounce",
  "websitebounce-meeting-ai",
  "website-meeting-391-aistrategy",
  "jp-mlutgykn-n8r4",
  "2026-cookieless-meeting",
  "btob-web-engagement-tool-comparison-2026",
  "scenario-chatbot-ai",
  "btob-chatbot-comparison-2026-ai-scenario-meeting-conversion",
  "2026-leadform-ai",
  "speed-to-lead-5min-8x-conversion-b2b",
  "btob-sales-ai-conversion-rate",
  "data-driven-outbound-sales",
  "outbound-sales-strategy-email-phone-sns",
  "inside-sales-ai-automation-strategy",
  "buying-committee-72",
]);
