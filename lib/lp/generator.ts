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
import { buildLogoCandidate } from './logo'
import { matchCaseStudies, type CaseStudyHit } from './case-matcher'
import { matchBlogs, type BlogHit } from './blog-matcher'
import { estimateTraffic } from './traffic-estimate'
import { calculateRoi, type RoiCalc } from './roi-calculator'

const MODEL_ID = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6'
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || ''

const PROMPT_CACHE_VERSION = 'lp-2026-04-28-2'

const SYSTEM_PROMPT = `あなたはMeeton ai のAIランディングページ生成エンジンです。訪問者の文脈情報・実トラフィック試算・実事例・関連記事を入力に、その訪問者にとって最も商談化につながる構成のLPを「コンポーネント選択 + コピー差し替え」のみで作ります。コンポーネントは指定されたものから選び、コピーはJSONで返します。

出力ルール:
- 完全自由生成は禁止。提供されたコンポーネントから選択し、コピーを生成
- 不明な事実は捏造しない。データに無いものは出さない
- 数値はROI試算で渡された数字をそのまま使う(自分で計算しない)
- 事例・関連記事は提供されたリストから選ぶだけで、項目名・URL・指標は変えない
- 個人化のガイドライン:
${SAFE_PERSONALIZATION_RULES}
- 出力は JSON 1つだけ。コードブロックや解説テキストは付けない`

const SCHEMA_HINT = `{
  "rationale": "なぜこの構成にしたか日本語2文",
  "components": [
    { "key": "hero", "variant": "<HERO_VARIANTSのid>", "copy": { "headline": "...", "sub": "..." } },
    { "key": "traffic_roi", "variant": "default", "copy": { "headline": "{{companyName}} の月間訪問数 {{visits}} から見える伸びしろ", "subline": "..." } },
    { "key": "social_proof", "variant": "metrics", "copy": { "stats": ["商談化率2.4倍","工数50時間削減/月","予約完了率87%"] } },
    { "key": "related_cases", "variant": "industry-match", "copy": { "headline": "{{industry}}業界での実績", "intro": "..." } },
    { "key": "use_cases", "variant": "industry", "copy": { "headline": "...", "items": ["...","...","..."] } },
    { "key": "related_blogs", "variant": "default", "copy": { "headline": "..." } },
    { "key": "comparison", "variant": "default", "copy": { "headline": "..." } },
    { "key": "urgency", "variant": "<tier>", "copy": { "message": "..." } },
    { "key": "cta", "variant": "<tier>", "copy": { "primary": "...", "secondary": "..." } }
  ]
}`

function buildContextDigest(profile: UnifiedProfile, roi: RoiCalc | null, cases: CaseStudyHit[], blogs: BlogHit[]): string {
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

  lines.push(`■ ページ文脈: 着地=${pc.landingPath}, 現在=${pc.currentPath}, pricing閲覧=${pc.isPricingViewed}, 事例閲覧=${pc.isCaseStudyViewed}, 機能ページ=${pc.isFeaturePageViewed}`)

  if (hs) {
    lines.push(`■ HubSpot: stage=${hs.lifecyclestage || '-'}, status=${hs.hsLeadStatus || '-'}, jobTitle=${hs.jobTitle || '-'}, formSubmits=${hs.numFormSubmissions ?? 0}`)
    if (hs.firstName || hs.lastName) lines.push(`  氏名: ${[hs.lastName, hs.firstName].filter(Boolean).join(' ')}`)
  } else {
    lines.push(`■ HubSpot: 未登録`)
  }

  if (mcp) {
    lines.push(`■ Meeton MCP: engagementScore=${mcp.intentScore ?? '-'}, level=${mcp.engagementLevel || '-'}, hasMeeting=${mcp.hasMeeting ?? false}, topInterest=${mcp.topInterest || '-'}, sessions=${mcp.recentSessions?.length ?? 0}`)
  } else {
    lines.push(`■ Meeton MCP: 行動データなし`)
  }

  lines.push(`■ シグナル: ${profile.intentSignals.join(', ') || '(なし)'}`)
  lines.push(`■ スコア: tier=${profile.scoreTier}, funnel=${profile.funnelStage}`)

  if (roi) {
    lines.push(`■ トラフィックROI試算 (出典=${roi.trafficSource}, 信頼度=${roi.confidence}):`)
    lines.push(`  月間訪問数: ${roi.monthlyVisits.toLocaleString('ja-JP')}`)
    lines.push(`  現状: リード ${roi.baseline.leadsPerMonth}件/月 (CVR ${roi.baseline.leadCvrPct}%) / 商談 ${roi.baseline.meetingsPerMonth}件/月 (CVR ${roi.baseline.meetingCvrPct}%) / SDR工数 ${roi.baseline.sdrHoursPerMonth}h/月`)
    lines.push(`  Meeton ai導入後: リード ${roi.withMeetonAi.leadsPerMonth}件/月 (CVR ${roi.withMeetonAi.leadCvrPct}%) / 商談 ${roi.withMeetonAi.meetingsPerMonth}件/月 (CVR ${roi.withMeetonAi.meetingCvrPct}%) / SDR工数 ${roi.withMeetonAi.sdrHoursPerMonth}h/月`)
    lines.push(`  上乗せ: +${roi.uplift.addLeadsPerMonth}リード/月, +${roi.uplift.addMeetingsPerMonth}商談/月, -${roi.uplift.sdrHoursSaved}h SDR工数/月`)
  } else {
    lines.push(`■ トラフィックROI試算: 取得できず`)
  }

  if (cases.length) {
    lines.push(`■ マッチした実事例 (タイトル/会社/業種/規模/指標/url):`)
    cases.forEach(cs => {
      lines.push(`  - "${cs.title}" / ${cs.company} / ${cs.industry} / ${cs.employeeSize || '-'} / ${cs.heroMetric} ${cs.heroMetricLabel} / ${cs.url}`)
    })
  } else {
    lines.push(`■ マッチした実事例: なし`)
  }
  if (blogs.length) {
    lines.push(`■ 関連ブログ (タイトル/カテゴリ/url):`)
    blogs.forEach(b => {
      lines.push(`  - "${b.title}" / ${b.category} / ${b.url}`)
    })
  } else {
    lines.push(`■ 関連ブログ: なし`)
  }

  return lines.join('\n')
}

function buildHints(tier: ScoreTier): { hero: string; cta: ReturnType<typeof pickCtaForTier>; urgency: string } {
  const cta = pickCtaForTier(tier, 'unknown')
  const urgency = URGENCY_BANK[tier] || ''
  const hero = HERO_VARIANTS.map(h => `- ${h.id}: ${h.audience}`).join('\n')
  return { hero, cta, urgency }
}

function fallbackComponents(profile: UnifiedProfile, roi: RoiCalc | null, cases: CaseStudyHit[], blogs: BlogHit[]): LpComponent[] {
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
        sub: '訪問者の識別から、AIチャット・メール・カレンダー予約までを自動化します',
      },
    },
  ]
  if (roi) {
    components.push({
      key: 'traffic_roi',
      variant: 'default',
      copy: {
        headline: `${profile.company.name} の月間訪問数 約${roi.monthlyVisits.toLocaleString('ja-JP')} から見える伸びしろ`,
        subline: `Meeton ai導入で月+${roi.uplift.addLeadsPerMonth}リード / +${roi.uplift.addMeetingsPerMonth}商談 / SDR工数 -${roi.uplift.sdrHoursSaved}h を見込みます`,
      },
    })
  }
  components.push({
    key: 'social_proof',
    variant: 'metrics',
    copy: { stats: ['商談化率 2.4倍', '工数 50時間/月削減', '予約完了率 87%'] },
  })
  if (cases.length) {
    components.push({
      key: 'related_cases',
      variant: 'industry-match',
      copy: { headline: `${industry !== 'default' ? industry + '業界の' : ''}実績`, intro: '貴社に近い業種・規模での導入事例です' },
    })
  }
  components.push({
    key: 'use_cases',
    variant: 'industry',
    copy: { headline: `${industry !== 'default' ? industry + '業界での' : ''}活用シーン`, items: useCases },
  })
  if (blogs.length) {
    components.push({
      key: 'related_blogs',
      variant: 'default',
      copy: { headline: '深掘り読み物' },
    })
  }
  components.push({
    key: 'comparison',
    variant: 'default',
    copy: { headline: 'Meeton ai が選ばれる理由', rows: comp.rows.map(r => r.join(' / ')) },
  })
  components.push({
    key: 'cta',
    variant: tier,
    copy: { primary: cta.primaryLabel, secondary: cta.secondaryLabel || '' },
  })
  return components
}

function safeParseJson(text: string): unknown {
  const trimmed = text.trim()
  let candidate = trimmed
  const fencedFull = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fencedFull) {
    candidate = fencedFull[1]
  } else if (trimmed.startsWith('```')) {
    candidate = trimmed.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '')
  }
  try {
    return JSON.parse(candidate)
  } catch {
    const start = candidate.indexOf('{')
    let end = candidate.lastIndexOf('}')
    if (start < 0) return null
    if (end <= start) {
      let depth = 0
      for (let i = start; i < candidate.length; i++) {
        const ch = candidate[i]
        if (ch === '{') depth++
        else if (ch === '}') {
          depth--
          if (depth === 0) {
            end = i
            break
          }
        }
      }
      if (end <= start) return null
    }
    try {
      return JSON.parse(candidate.slice(start, end + 1))
    } catch {
      return null
    }
  }
}

export async function generateLp(profile: UnifiedProfile): Promise<LpDocument> {
  const logo = buildLogoCandidate({
    domain: profile.company.domain,
    companyUrl: undefined,
    email: profile.hubspot?.email,
  })

  const trafficPromise = estimateTraffic({
    domain: profile.company.domain || logo?.domain,
    industry: profile.company.industry,
    employees: profile.company.employees,
  })
  const casesPromise = matchCaseStudies({
    industry: profile.company.industry,
    employeeSize: profile.company.employees,
    limit: 3,
  })
  const blogsPromise = matchBlogs({
    industry: profile.company.industry,
    searchKeyword: profile.traffic.searchKeyword,
    isPricingViewed: profile.pageContext.isPricingViewed,
    isCaseStudyViewed: profile.pageContext.isCaseStudyViewed,
    topInterest: profile.mcp?.topInterest,
    funnelStage: profile.funnelStage,
    limit: 3,
  })

  const [traffic, cases, blogs] = await Promise.all([trafficPromise, casesPromise, blogsPromise])
  const roi = traffic ? calculateRoi({ traffic, industry: profile.company.industry, employees: profile.company.employees }) : null
  const cta = pickCtaForTier(profile.scoreTier, profile.funnelStage)

  const baseDoc: LpDocument = {
    visitorId: profile.visitorId,
    generatedAt: new Date().toISOString(),
    components: fallbackComponents(profile, roi, cases, blogs),
    primaryCta: cta.primary,
    rationale: 'fallback: テンプレ既定構成',
    logo,
    trafficRoi: roi,
    relatedCases: cases,
    relatedBlogs: blogs,
  }

  if (!ANTHROPIC_API_KEY) return baseDoc

  const hints = buildHints(profile.scoreTier)
  const userText = `▼ 訪問者プロファイル
${buildContextDigest(profile, roi, cases, blogs)}

▼ 利用可能なヒーローコンポーネント
${hints.hero}

▼ 推奨CTA構成
primary=${hints.cta.primary}, primaryLabel="${hints.cta.primaryLabel}", secondary=${hints.cta.secondary || '-'}, secondaryLabel="${hints.cta.secondaryLabel || ''}"

▼ Urgency既定
${hints.urgency || '(空)'}

▼ 出力フォーマット (このJSONスキーマで返答)
${SCHEMA_HINT}

注意:
- traffic_roi コンポーネントは ROI試算データがある時だけ含める
- related_cases は「マッチした実事例」が1件以上ある時だけ含める
- related_blogs は「関連ブログ」が1件以上ある時だけ含める
- 各コンポーネントの copy では訪問者プロファイル/ROI/事例/ブログを参考にコピーを生成
- ROIの数値は本文中に書く時もそのまま使うこと(再計算しない)

このプロファイルにとって最も商談化につながるLP構成をJSONで返してください。`

  try {
    const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY })
    const response = await client.messages.create({
      model: MODEL_ID,
      max_tokens: 8192,
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
    if (!block || block.type !== 'text') {
      return { ...baseDoc, rationale: `[debug] no text block. types=${response.content.map(c => c.type).join(',')} stop=${response.stop_reason}` }
    }
    const parsed = safeParseJson(block.text) as
      | { primaryCta?: 'demo' | 'document' | 'chat'; rationale?: string; components?: LpComponent[] }
      | null
    if (!parsed?.components?.length) {
      return { ...baseDoc, rationale: `[debug] parse fail. keys=${parsed ? Object.keys(parsed).join(',') : 'null'} head=${block.text.slice(0, 240)}` }
    }
    return {
      ...baseDoc,
      components: parsed.components,
      rationale: parsed.rationale,
    }
  } catch (e) {
    const msg = (e as Error)?.message || String(e)
    console.error('[lp-generate] LLM error:', msg)
    return { ...baseDoc, rationale: `[debug] LLM error: ${msg.slice(0, 300)}` }
  }
}
