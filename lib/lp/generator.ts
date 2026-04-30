import Anthropic from '@anthropic-ai/sdk'
import { jsonrepair } from 'jsonrepair'
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
- 「Meeton ai 導入企業◯社の実績」「上乗せ約N%」「過去30日」のような算出根拠の開示は本文に書かない(訪問者にとって透明化されすぎて訴求が弱くなる)
- 「会社インサイト」が渡されている場合は、 主力製品名・顧客層・強み・直近の動きを必ずヒーローやROIサブコピーで具体的に引用する(訪問者に「うちのこと知ってる」と感じさせるため)。 一般論や業種一般のコピーは避け、 サイトに記載があった具体名で語る
- 個人化のガイドライン:
${SAFE_PERSONALIZATION_RULES}

JSON出力の厳格ルール (絶対遵守):
- 出力は { から } までの単一 JSON オブジェクトのみ。前後の説明、コードフェンス \`\`\`、改行などすべて禁止
- 文字列値の中ではダブルクォートを使わない。代わりに「」や全角ダブルクォート" "を使う(エスケープ忘れ防止)
- 文字列値に改行を入れない。一文で簡潔に
- 末尾カンマ禁止
- 各プロパティはカンマでまっすぐ区切る`

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

  if (profile.companyInsights) {
    const ci = profile.companyInsights
    lines.push(`■ 会社インサイト (Webサイト解析):`)
    if (ci.flagshipProduct) lines.push(`  主力製品: ${ci.flagshipProduct}`)
    if (ci.customerType) lines.push(`  顧客層: ${ci.customerType}`)
    if (ci.strength) lines.push(`  強み: ${ci.strength}`)
    if (ci.recentActivity) lines.push(`  直近の動き: ${ci.recentActivity}`)
    if (ci.meetingAiOpportunity) lines.push(`  Meeton ai 貢献ポイント仮説: ${ci.meetingAiOpportunity}`)
  }

  if (roi) {
    lines.push(`■ トラフィック試算 (出典=${roi.trafficSource}, 信頼度=${roi.confidence}${roi.trancoRank ? `, GlobalRank=${roi.trancoRank}` : ''}${roi.category ? `, Category=${roi.category}` : ''}):`)
    lines.push(`  月間訪問数: ${roi.monthlyVisits.toLocaleString('ja-JP')} / 有能訪問者: ${roi.monthlyEngageable.toLocaleString('ja-JP')} (engageable率 ${(roi.basis.engageableRate * 100).toFixed(0)}%)`)
    if (roi.jpShareRatio) lines.push(`  日本国内比率: ${(roi.jpShareRatio * 100).toFixed(1)}%`)
    if (roi.topKeywords?.length) {
      lines.push(`  TOP検索KW: ${roi.topKeywords.slice(0, 3).map(k => k.name).join(' / ')}`)
    }
    lines.push(`  Meeton ai が提供する月次価値:`)
    lines.push(`    自動獲得される商談: ${roi.expected.meetingsPerMonth.toLocaleString('ja-JP')} 件/月`)
    lines.push(`    AI が自動フォローするリード: ${roi.expected.autoFollowedLeadsPerMonth.toLocaleString('ja-JP')} 件/月`)
    if (roi.uplift) {
      lines.push(`    リード上乗せ: 現状 ${roi.uplift.currentLeadsPerMonth}件 → 見込み ${roi.uplift.expectedLeadsPerMonth}件 (+${roi.uplift.addLeadsPerMonth}件 / 月) ※訪問者本人申告ベース`)
    }
    if (roi.basis.sdrHeadcount) {
      lines.push(`    工数削減: ${roi.expected.hoursSavedPerMonth.toLocaleString('ja-JP')} h/月 (営業${roi.basis.sdrHeadcount}名チームの実数換算)`)
    } else {
      lines.push(`    工数削減: ${roi.expected.hoursSavedPerMonth.toLocaleString('ja-JP')} h/月 = 営業 ${roi.expected.hoursSavedAsHeadcount} 人分相当`)
    }
    if (roi.basis.capApplied) lines.push(`    ※ 入力されたSDR数で上限キャップ適用済`)
  } else {
    lines.push(`■ トラフィック試算: 取得できず`)
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
        headline: `${profile.company.name} の月間訪問数 約${roi.monthlyVisits.toLocaleString('ja-JP')} から Meeton ai が提供する月次価値`,
        subline: `自動獲得される商談 ${roi.expected.meetingsPerMonth.toLocaleString('ja-JP')}件/月、AI が自動フォローするリード ${roi.expected.autoFollowedLeadsPerMonth.toLocaleString('ja-JP')}件/月、工数削減 ${roi.expected.hoursSavedPerMonth.toLocaleString('ja-JP')}h/月 (営業 ${roi.expected.hoursSavedAsHeadcount} 人分) を見込みます`,
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

type ParseResult = { value: unknown; debug: string }

function safeParseJsonWithDebug(text: string): ParseResult {
  const trimmed = text.trim()
  try {
    return { value: JSON.parse(trimmed), debug: 'direct' }
  } catch (e1) {
    // continue
  }
  let cleaned = trimmed
  let cleanedDbg = 'no-fence'
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '')
    cleanedDbg = `fence-stripped len=${cleaned.length} tail="${cleaned.slice(-30)}"`
    try {
      return { value: JSON.parse(cleaned), debug: 'cleaned-direct' }
    } catch (e2) {
      cleanedDbg += ` parse_err=${(e2 as Error).message.slice(0, 80)}`
    }
  }
  for (const src of [cleaned, trimmed]) {
    const start = src.indexOf('{')
    if (start < 0) continue
    let depth = 0
    let inString = false
    let escape = false
    for (let i = start; i < src.length; i++) {
      const ch = src[i]
      if (escape) {
        escape = false
        continue
      }
      if (inString && ch === '\\') {
        escape = true
        continue
      }
      if (ch === '"') {
        inString = !inString
        continue
      }
      if (inString) continue
      if (ch === '{') depth++
      else if (ch === '}') {
        depth--
        if (depth === 0) {
          try {
            return { value: JSON.parse(src.slice(start, i + 1)), debug: `depth-extract src_len=${src.length} extract_len=${i + 1 - start}` }
          } catch (e3) {
            cleanedDbg += ` depth_err=${(e3 as Error).message.slice(0, 80)}`
          }
          break
        }
      }
    }
  }
  return { value: null, debug: cleanedDbg }
}

function safeParseJson(text: string): unknown {
  return safeParseJsonWithDebug(text).value
}

function safeParseArray(text: string): unknown[] | null {
  const trimmed = text.trim()
  try {
    const v = JSON.parse(trimmed)
    return Array.isArray(v) ? v : null
  } catch {
    // continue
  }
  const start = trimmed.indexOf('[')
  if (start < 0) return null
  let depth = 0
  let inString = false
  let escape = false
  for (let i = start; i < trimmed.length; i++) {
    const ch = trimmed[i]
    if (escape) {
      escape = false
      continue
    }
    if (inString && ch === '\\') {
      escape = true
      continue
    }
    if (ch === '"') {
      inString = !inString
      continue
    }
    if (inString) continue
    if (ch === '[') depth++
    else if (ch === ']') {
      depth--
      if (depth === 0) {
        try {
          const v = JSON.parse(trimmed.slice(start, i + 1))
          return Array.isArray(v) ? v : null
        } catch {
          return null
        }
      }
    }
  }
  return null
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
    userMonthlyVisits: profile.userInputs?.monthlyVisits,
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
  const roi = traffic
    ? calculateRoi({
        traffic,
        industry: profile.company.industry,
        employees: profile.company.employees,
        userMonthlyLeads: profile.userInputs?.monthlyLeads,
        userSdrCount: profile.userInputs?.sdrCount,
      })
    : null
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
      tools: [
        {
          name: 'render_lp',
          description: '訪問者向けに個別最適化されたランディングページの構成とコピーを返す',
          input_schema: {
            type: 'object',
            properties: {
              rationale: { type: 'string', description: 'なぜこの構成にしたか日本語2文' },
              components: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    key: { type: 'string' },
                    variant: { type: 'string' },
                    copy: { type: 'object', additionalProperties: true },
                  },
                  required: ['key', 'variant', 'copy'],
                },
              },
            },
            required: ['rationale', 'components'],
          },
        },
      ],
      tool_choice: { type: 'tool', name: 'render_lp' },
      metadata: { user_id: `lp-${PROMPT_CACHE_VERSION}` },
    })
    const toolUse = response.content.find(c => c.type === 'tool_use')
    if (!toolUse || toolUse.type !== 'tool_use') {
      return { ...baseDoc, rationale: `[debug] no tool_use block. types=${response.content.map(c => c.type).join(',')} stop=${response.stop_reason}` }
    }
    const parsed = toolUse.input as { rationale?: string; components?: unknown }
    let components: LpComponent[] | null = null
    if (Array.isArray(parsed.components)) {
      components = parsed.components as LpComponent[]
    } else if (typeof parsed.components === 'string') {
      const arr = safeParseArray(parsed.components)
      if (arr) components = arr as LpComponent[]
      else {
        try {
          const repaired = jsonrepair(parsed.components)
          const v = JSON.parse(repaired)
          if (Array.isArray(v)) components = v as LpComponent[]
        } catch {
          // give up
        }
      }
    }
    if (!components || components.length === 0) {
      const cType = Array.isArray(parsed.components) ? 'arr' : typeof parsed.components
      const sample = typeof parsed.components === 'string' ? parsed.components.slice(0, 240) : JSON.stringify(parsed.components).slice(0, 240)
      return { ...baseDoc, rationale: `[debug] tool_use components invalid. type=${cType} sample=${sample}` }
    }
    return {
      ...baseDoc,
      components,
      rationale: parsed.rationale,
    }
  } catch (e) {
    const msg = (e as Error)?.message || String(e)
    console.error('[lp-generate] LLM error:', msg)
    return { ...baseDoc, rationale: `[debug] LLM error: ${msg.slice(0, 300)}` }
  }
}
