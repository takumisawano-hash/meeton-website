import Anthropic from '@anthropic-ai/sdk'
import type { UnifiedProfile, LpDocument, LpComponent, ScoreTier } from './types'
import {
  HERO_VARIANTS,
  USE_CASE_BANK,
  COMPARISON_BANK,
  URGENCY_BANK,
  pickCtaForTier,
  SAFE_PERSONALIZATION_RULES,
} from './templates'

const MODEL_ID = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6'
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || ''

const PROMPT_CACHE_VERSION = 'lp-2026-04-28-1'

const SYSTEM_PROMPT = `あなたはMeeton ai のAIランディングページ生成エンジンです。訪問者の文脈情報と、用意されたコンポーネント・テンプレ群を入力に、その訪問者にとって最も商談化につながる構成のLPを「コンポーネント選択 + コピー差し替え」のみで作ります。コンポーネントは指定されたものから選び、コピーはJSONで返します。

出力ルール:
- 完全自由生成は禁止。必ず提供されたコンポーネントから選択し、コピーを生成
- 不明な事実は捏造しない。データに無いものは出さない
- 個人化のガイドライン:
${SAFE_PERSONALIZATION_RULES}
- 出力は JSON 1つだけ。コードブロックや解説テキストは付けない`

const SCHEMA_HINT = `{
  "primaryCta": "demo" | "document" | "chat",
  "rationale": "なぜこの構成にしたか日本語2文",
  "components": [
    { "key": "hero", "variant": "<HERO_VARIANTSのid>", "copy": { "headline": "...", "sub": "...", "ctaLabel": "..." } },
    { "key": "social_proof", "variant": "metrics", "copy": { "stats": ["商談化率2.4倍", "工数50時間削減/月", "予約完了率87%"] } },
    { "key": "case_study", "variant": "industry-match", "copy": { "headline": "...", "items": ["○○株式会社: 商談数2.3倍", "△△社: 初動5分以内", "××社: SDR 1名→3名分"] } },
    { "key": "roi", "variant": "default", "copy": { "headline": "貴社想定ROI", "lines": ["想定削減工数: 月X時間", "想定追加商談数: 月X件"] } },
    { "key": "use_cases", "variant": "industry", "copy": { "headline": "...", "items": ["...", "...", "..."] } },
    { "key": "comparison", "variant": "default", "copy": { "headline": "..." } },
    { "key": "urgency", "variant": "<tier>", "copy": { "message": "..." } },
    { "key": "cta", "variant": "<tier>", "copy": { "primary": "...", "secondary": "..." } }
  ]
}`

function buildContextDigest(profile: UnifiedProfile): string {
  const c = profile.company
  const t = profile.traffic
  const hs = profile.hubspot
  const mcp = profile.mcp
  const pc = profile.pageContext

  const lines: string[] = []
  lines.push(`■ 会社: ${c.name}（信頼度=${c.confidence}, 由来=${c.source}）`)
  if (c.industry) lines.push(`  業種: ${c.industry}`)
  if (c.employees) lines.push(`  従業員規模: ${c.employees}`)
  if (c.prefecture) lines.push(`  所在地: ${c.prefecture}`)
  if (c.domain) lines.push(`  ドメイン: ${c.domain}`)

  lines.push(`■ 流入: channel=${t.channel}, source=${t.source || '-'}, medium=${t.medium || '-'}, campaign=${t.campaign || '-'}, isAd=${t.isAdClick}`)
  if (t.searchKeyword) lines.push(`  検索KW: ${t.searchKeyword}`)
  if (t.referrerHost) lines.push(`  Referrer: ${t.referrerHost}`)

  lines.push(`■ ページ文脈: 着地=${pc.landingPath}, 現在=${pc.currentPath}, pricing閲覧=${pc.isPricingViewed}, 事例閲覧=${pc.isCaseStudyViewed}, 機能ページ=${pc.isFeaturePageViewed}, ページ数=${pc.pagesViewed.length}`)

  if (hs) {
    lines.push(`■ HubSpot: stage=${hs.lifecyclestage || '-'}, status=${hs.hsLeadStatus || '-'}, jobTitle=${hs.jobTitle || '-'}, recentEvent=${hs.recentConversionEvent || '-'}, formSubmits=${hs.numFormSubmissions ?? 0}`)
    if (hs.firstName || hs.lastName) lines.push(`  氏名: ${[hs.lastName, hs.firstName].filter(Boolean).join(' ')}`)
  } else {
    lines.push(`■ HubSpot: 未登録`)
  }

  if (mcp) {
    lines.push(`■ Meeton MCP: intentScore=${mcp.intentScore ?? '-'}, engagement=${mcp.engagementLevel || '-'}, hasMeeting=${mcp.hasMeeting ?? false}, topInterest=${mcp.topInterest || '-'}, sessions=${mcp.recentSessions?.length ?? 0}`)
    if (mcp.recentSessions?.length) {
      const total = mcp.recentSessions.reduce((s, x) => s + (x.duration || 0), 0)
      lines.push(`  累計滞在: ${total}秒, ページ滞在: ${JSON.stringify(mcp.pagesViewed || {}).slice(0, 200)}`)
    }
  } else {
    lines.push(`■ Meeton MCP: 行動データなし`)
  }

  lines.push(`■ シグナル: ${profile.intentSignals.join(', ') || '(なし)'}`)
  lines.push(`■ スコア: tier=${profile.scoreTier}, funnel=${profile.funnelStage}`)

  return lines.join('\n')
}

function buildHints(tier: ScoreTier): { hero: string; cta: ReturnType<typeof pickCtaForTier>; urgency: string } {
  const cta = pickCtaForTier(tier, 'unknown')
  const urgency = URGENCY_BANK[tier] || ''
  const hero = HERO_VARIANTS.map(h => `- ${h.id}: ${h.audience}`).join('\n')
  return { hero, cta, urgency }
}

function fallbackDoc(profile: UnifiedProfile): LpDocument {
  const tier = profile.scoreTier
  const stage = profile.funnelStage
  const cta = pickCtaForTier(tier, stage)
  const industry = profile.company.industry || 'default'
  const useCases = USE_CASE_BANK[industry] || USE_CASE_BANK.default
  const comp = COMPARISON_BANK.default

  const components: LpComponent[] = [
    {
      key: 'hero',
      variant: 'hero-direct-cold',
      copy: {
        headline: `${profile.company.name} の商談を、AIが自動で増やす`,
        sub: '訪問者の識別から、AIチャット・メール・カレンダー予約までを自動化',
        ctaLabel: cta.primaryLabel,
      },
    },
    {
      key: 'social_proof',
      variant: 'metrics',
      copy: { stats: ['商談化率 2.4倍', '工数 50時間/月削減', '予約完了率 87%'] },
    },
    {
      key: 'use_cases',
      variant: 'industry',
      copy: { headline: `${industry !== 'default' ? industry + '業界の' : ''}活用シーン`, items: useCases },
    },
    {
      key: 'comparison',
      variant: 'default',
      copy: { headline: 'Meeton ai が選ばれる理由', headers: comp.headers as unknown as string, rows: comp.rows.map(r => r.join(' / ')) },
    },
    {
      key: 'cta',
      variant: tier,
      copy: { primary: cta.primaryLabel, secondary: cta.secondaryLabel || '' },
    },
  ]
  return {
    visitorId: profile.visitorId,
    generatedAt: new Date().toISOString(),
    components,
    primaryCta: cta.primary,
    rationale: 'fallback: Anthropic API未設定または応答失敗のため、テンプレ既定で構成',
  }
}

function safeParseJson(text: string): unknown {
  const trimmed = text.trim()
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const candidate = fenced ? fenced[1] : trimmed
  try {
    return JSON.parse(candidate)
  } catch {
    const start = candidate.indexOf('{')
    const end = candidate.lastIndexOf('}')
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(candidate.slice(start, end + 1))
      } catch {
        return null
      }
    }
    return null
  }
}

export async function generateLp(profile: UnifiedProfile): Promise<LpDocument> {
  if (!ANTHROPIC_API_KEY) return fallbackDoc(profile)

  const hints = buildHints(profile.scoreTier)
  const userText = `▼ 訪問者プロファイル
${buildContextDigest(profile)}

▼ 利用可能なヒーローコンポーネント
${hints.hero}

▼ 推奨CTA構成
primary=${hints.cta.primary}, primaryLabel="${hints.cta.primaryLabel}", secondary=${hints.cta.secondary || '-'}, secondaryLabel="${hints.cta.secondaryLabel || ''}"

▼ Urgency既定
${hints.urgency || '(空)'}

▼ 出力フォーマット (このJSONスキーマで返答)
${SCHEMA_HINT}

このプロファイルにとって最も商談化につながるLP構成をJSONで返してください。`

  try {
    const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY })
    const response = await client.messages.create({
      model: MODEL_ID,
      max_tokens: 2400,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: userText }],
      metadata: { user_id: `lp-${PROMPT_CACHE_VERSION}` },
    })
    const block = response.content.find(c => c.type === 'text')
    if (!block || block.type !== 'text') return fallbackDoc(profile)
    const parsed = safeParseJson(block.text) as
      | { primaryCta?: 'demo' | 'document' | 'chat'; rationale?: string; components?: LpComponent[] }
      | null
    if (!parsed?.components?.length) return fallbackDoc(profile)
    return {
      visitorId: profile.visitorId,
      generatedAt: new Date().toISOString(),
      components: parsed.components,
      primaryCta: parsed.primaryCta || pickCtaForTier(profile.scoreTier, profile.funnelStage).primary,
      rationale: parsed.rationale,
    }
  } catch {
    return fallbackDoc(profile)
  }
}
