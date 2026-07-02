// 4-stage AI SDR flow — single source of truth (2026-07-02, Takumi: split
// stage ① after Meeton Ads joined capture; supersedes the 3-stage deck-p7
// framing). The site tells one story: 掴む → 育てる → 商談化する → 追客する —
// matching the long-standing full-pipeline phrase.

import type { ClusterId } from "@/app/lib/content-clusters";

export type StageProduct = Exclude<ClusterId, "ai-sdr">; // calendar | chat | library | email | ads

export type Stage = {
  num: "①" | "②" | "③" | "④";
  id: "capture" | "nurture" | "convert" | "follow";
  title: string; // 掴む
  titleEn: string; // English stage title (consumed only when lang="en")
  transform: string; // 潜在層 → リード
  transformEn: string; // English transform line
  lede: string;
  ledeEn: string;
  products: StageProduct[]; // products that do this stage's job
  /** primary landing page for this stage (the single nav link) */
  href: string;
};

export const STAGES: Stage[] = [
  {
    num: "①",
    id: "capture",
    title: "掴む",
    titleEn: "Capture",
    transform: "潜在層 → リード",
    transformEn: "Prospects → Leads",
    lede: "問い合わせ前の潜在層を、会話とサイト内広告で掴んでリードに変える。",
    ledeEn: "Engage pre-inquiry prospects with conversation and on-site ads, and turn them into leads.",
    products: ["chat", "ads"],
    href: "/capture/",
  },
  {
    num: "②",
    id: "nurture",
    title: "育てる",
    titleEn: "Nurture",
    transform: "まだ早い見込み客 → 温まったリード",
    transformEn: "Not-yet-ready prospects → warm leads",
    lede: "まだ早い見込み客を、AIが解説する資料で自動ナーチャリングし、検討を前に進める。",
    ledeEn: "Auto-nurture not-yet-ready prospects with AI-explained content, and move their consideration forward.",
    products: ["library"],
    href: "/library/",
  },
  {
    num: "③",
    id: "convert",
    title: "商談化する",
    titleEn: "Convert to meetings",
    transform: "リード → 商談",
    transformEn: "Leads → Meetings",
    lede: "温度が高まった瞬間に、その場で商談予約まで運ぶ。離脱前に完結。",
    ledeEn: "The moment intent peaks, book the meeting on the spot — done before they leave.",
    products: ["calendar"],
    href: "/calendar/",
  },
  {
    num: "④",
    id: "follow",
    title: "追客する",
    titleEn: "Win back",
    transform: "逃したリードを回収",
    transformEn: "Recover lost leads",
    lede: "予約しなかったリードを諦めず、AIが1:1で追い、再びホットになれば商談化へ戻す。",
    ledeEn: "Don't give up on leads who didn't book — the AI follows up 1:1 and brings them back when they turn hot again.",
    products: ["email"],
    href: "/email/",
  },
];

// Per-product short line shown inside the stage card (deck wording).
// `nameEn` is the same brand name (English); `lineEn` is the English copy,
// read only when lang="en". JA `name`/`line` stay intact.
export const PRODUCT_IN_STAGE: Record<
  StageProduct,
  { name: string; nameEn: string; line: string; lineEn: string; icon: string }
> = {
  chat: {
    name: "Meeton Chat",
    nameEn: "Meeton Chat",
    line: "会話で訪問者を掴み、リードに変える。",
    lineEn: "Engages visitors in conversation and turns them into leads.",
    icon: "chat",
  },
  library: {
    name: "Meeton Library",
    nameEn: "Meeton Library",
    line: "資料で見込み客を自動ナーチャリングし、検討を育てる。",
    lineEn: "Auto-nurtures prospects with content and grows their consideration.",
    icon: "library",
  },
  calendar: {
    name: "Meeton Calendar",
    nameEn: "Meeton Calendar",
    line: "温度が高まった瞬間に、その場で商談予約まで完結。",
    lineEn: "Books the meeting on the spot the moment intent peaks.",
    icon: "calendar",
  },
  email: {
    name: "Meeton Email",
    nameEn: "Meeton Email",
    line: "予約しなかったリードを諦めず1:1で追い、再商談化へ戻す。",
    lineEn: "Pursues no-show leads 1:1 and brings them back to a meeting.",
    icon: "email",
  },
  ads: {
    name: "Meeton Ads",
    nameEn: "Meeton Ads",
    line: "サイト内広告をAIが訪問者ごとに出し分け、リード獲得を最大化。",
    lineEn: "AI-optimized on-site ads, matched to each visitor, that maximize lead capture.",
    icon: "ads",
  },
};

/** Which stage a product belongs to (for stage badges on LPs). */
export function stageOf(product: StageProduct): Stage {
  return STAGES.find((s) => s.products.includes(product))!;
}
