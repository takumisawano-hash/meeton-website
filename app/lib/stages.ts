// 3-stage AI SDR flow — single source of truth (deck p7「AI SDR の3つの仕事」).
// Supersedes the flat "4 jobs" + product×moment coverage matrix framing
// (2026-06-04, Takumi). Products are grouped into 3 sequential stages so the
// site tells one story: 掴む・育てる → 商談化する → 追客する.

import type { ClusterId } from "@/app/lib/content-clusters";

export type StageProduct = Exclude<ClusterId, "ai-sdr">; // calendar | chat | library | email

export type Stage = {
  num: "①" | "②" | "③";
  id: "capture" | "convert" | "follow";
  title: string; // 掴む・育てる
  transform: string; // 潜在層 → リード
  lede: string;
  products: StageProduct[]; // products that do this stage's job
  /** primary landing page for this stage (the single nav link) */
  href: string;
};

export const STAGES: Stage[] = [
  {
    num: "①",
    id: "capture",
    title: "掴む・育てる",
    transform: "潜在層 → リード",
    lede: "問い合わせ前の潜在層を、会話と資料で掴んでリードに変え、検討を前に進める。",
    products: ["chat", "library"],
    href: "/capture/",
  },
  {
    num: "②",
    id: "convert",
    title: "商談化する",
    transform: "リード → 商談",
    lede: "温度が高まった瞬間に、その場で商談予約まで運ぶ。離脱前に完結。",
    products: ["calendar"],
    href: "/calendar/",
  },
  {
    num: "③",
    id: "follow",
    title: "追客する",
    transform: "逃したリードを回収",
    lede: "予約しなかったリードを諦めず、AIが1:1で追い、再びホットになれば商談化へ戻す。",
    products: ["email"],
    href: "/email/",
  },
];

// Per-product short line shown inside the stage card (deck wording).
export const PRODUCT_IN_STAGE: Record<StageProduct, { name: string; line: string; icon: string }> = {
  chat: { name: "Meeton Chat", line: "会話で訪問者を掴み、リードに変える。", icon: "chat" },
  library: { name: "Meeton Library", line: "資料で検討を育て、前に進める。", icon: "library" },
  calendar: { name: "Meeton Calendar", line: "温度が高まった瞬間に、その場で商談予約まで完結。", icon: "calendar" },
  email: { name: "Meeton Email", line: "予約しなかったリードを諦めず1:1で追い、再商談化へ戻す。", icon: "email" },
};

/** Which stage a product belongs to (for stage badges on LPs). */
export function stageOf(product: StageProduct): Stage {
  return STAGES.find((s) => s.products.includes(product))!;
}

// Plans (deck p19). Each plan includes everything below it.
export type Plan = { name: string; price: string; stages: Stage["id"][]; highlight?: boolean };
export const PLANS: Plan[] = [
  { name: "リード獲得プラン", price: "¥12万〜", stages: ["capture"] },
  { name: "商談獲得プラン", price: "¥18万〜", stages: ["capture", "convert"], highlight: true },
  { name: "オールインワンプラン", price: "¥24万〜", stages: ["capture", "convert", "follow"] },
];

/** The cheapest plan that includes a given product's stage. */
export function entryPlanFor(product: StageProduct): Plan {
  const stageId = stageOf(product).id;
  return PLANS.find((p) => p.stages.includes(stageId))!;
}
