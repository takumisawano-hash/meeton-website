// Topic-cluster + KW→URL map (single source of truth, spec §4.2 / §4.5).
// Each product LP is a pillar (money page); blog articles attach to a cluster
// and link UP to the pillar (§4.8). Used for: internal-link automation, the
// blog hub organization, and the content pipeline's dedup / cannibalization
// guard (one KW → one URL).

export type ClusterId = "library" | "calendar" | "email" | "chat" | "ads" | "ai-sdr";

export type Cluster = {
  id: ClusterId;
  label: string;
  /** pillar = the money page this cluster links up to */
  pillar: string;
  pillarName: string;
  blurb: string;
  /** weight: how much volume to pour here (spec §4.2) */
  weight: "high" | "mid" | "low";
  /** target keywords for this cluster (planning + classification) */
  keywords: string[];
  /** Notion category names / tag fragments that map to this cluster */
  aliases: string[];
};

export const CLUSTERS: Record<ClusterId, Cluster> = {
  ads: {
    id: "ads",
    label: "サイト内広告・CVR改善",
    pillar: "/ads/",
    pillarName: "Meeton Ads",
    blurb: "AIが訪問者ごとに最適なオファーを出し分けるサイト内広告で、リード獲得を最大化する。",
    weight: "high",
    keywords: ["サイト内広告", "Web接客 ポップアップ", "オンサイトマーケティング", "CVR改善 施策", "ポップアップ 最適化"],
    aliases: ["ads", "広告", "ポップアップ", "オンサイト", "on-site-ads", "web接客"],
  },
  library: {
    id: "library",
    label: "資料共有・トラッキング",
    pillar: "/library/",
    pillarName: "Meeton Library",
    blurb: "営業資料の共有・開封トラッキング・AI解説で、提案を商談に変える。",
    weight: "high",
    keywords: ["営業資料 共有 ツール", "提案資料 開封率", "DocSend 代替", "資料 トラッキング", "セールスコンテンツ 管理"],
    aliases: ["library", "資料", "コンテンツ", "提案", "docsend", "sales-content"],
  },
  calendar: {
    id: "calendar",
    label: "日程調整・商談化",
    pillar: "/calendar/",
    pillarName: "Meeton Calendar",
    blurb: "リード発生の瞬間に即フォロー。日程調整を商談化まで運ぶ。",
    weight: "mid",
    keywords: ["日程調整 自動化", "商談 取りこぼし", "インバウンド 商談化", "immedio 比較", "Speed to Lead"],
    aliases: ["calendar", "meeting", "日程", "商談予約", "scheduling", "speed-to-lead", "inside-sales"],
  },
  email: {
    id: "email",
    label: "追客・ナーチャリング",
    pillar: "/email/",
    pillarName: "Meeton Email",
    blurb: "予約しなかったリードを、行動シグナル起点にAIが1:1で追客する。",
    weight: "mid",
    keywords: ["リードナーチャリング メール", "セールスエンゲージメント", "追客 自動化", "休眠リード 掘り起こし"],
    aliases: ["email", "メール", "追客", "ナーチャリング", "nurture", "lead-nurturing"],
  },
  chat: {
    id: "chat",
    label: "Web接客・チャット商談化",
    pillar: "/chat/",
    pillarName: "Meeton Chat",
    blurb: "問い合わせ前の検討の土台に立ち、訪問者を会話で商談化する。",
    weight: "low",
    keywords: ["Web接客 ツール", "サイト離脱 防止", "チャットボット 商談化", "AIチャット 商談"],
    aliases: ["chat", "live", "web接客", "チャット", "chatbot"],
  },
  "ai-sdr": {
    id: "ai-sdr",
    label: "AI SDR / カテゴリ",
    // 2026-07-22: was "/" — since 7/10 the /ai-sdr/ pillar page exists; pointing
    // cluster links there consolidates the "ai sdr" query (cannibalised by
    // /glossary/ai-sdr/) into one recovery target.
    pillar: "/ai-sdr/",
    pillarName: "Meeton ai",
    blurb: "AI SDR とは何か、商談化率をどう上げるか——カテゴリの定義と実践知。",
    weight: "low",
    keywords: ["AI SDR とは", "商談化率 改善", "リードが商談にならない", "インサイドセールス スケール", "BtoB 商談化", "abmツール 比較", "abmツール 中小企業", "abmツール 大企業", "ABM とは"],
    aliases: ["ai-sdr", "sales", "marketing", "revops", "abm", "戦略", "general"],
  },
};

export const CLUSTER_ORDER: ClusterId[] = ["ads", "library", "calendar", "email", "chat", "ai-sdr"];

/** Classify a post into a cluster from its category / tags / targetKeyword. */
export function classifyCluster(input: { category?: string; tags?: string[]; targetKeyword?: string; title?: string }): ClusterId {
  const hay = [input.category, input.targetKeyword, input.title, ...(input.tags || [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  for (const id of CLUSTER_ORDER) {
    const c = CLUSTERS[id];
    if (id === "ai-sdr") continue; // fallback last
    if (c.aliases.some((a) => hay.includes(a.toLowerCase())) || c.keywords.some((k) => hay.includes(k.toLowerCase().split(" ")[0]))) {
      return id;
    }
  }
  return "ai-sdr";
}

/** Compare-page slugs relevant to each cluster (for related BOFU links §4.8). */
export const CLUSTER_COMPARES: Record<ClusterId, string[]> = {
  library: ["docsend"],
  ads: ["sprocket", "flipdesk"],
  calendar: ["immedio", "timerex", "spir", "calendly"],
  email: ["lemlist", "smartlead"],
  chat: ["channel-talk", "fin", "intercom", "hubspot-chatbot"],
  "ai-sdr": ["qualified", "drift", "warmly"],
};
