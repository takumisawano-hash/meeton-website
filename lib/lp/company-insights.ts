import Anthropic from '@anthropic-ai/sdk'

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6'
const KEY = process.env.ANTHROPIC_API_KEY || ''

export type CompanyInsights = {
  flagshipProduct?: string
  customerType?: string
  strength?: string
  recentActivity?: string
  meetingAiOpportunity?: string
}

const SYSTEM_PROMPT = `あなたは B2B SaaS 営業のリサーチ AI です。 Webサイト本文から、 訪問先企業を理解するための営業インサイトを抽出します。

ルール:
- 本文に書かれている事実のみを使う(推測・捏造禁止)
- 不明な項目は省略してよい
- 各項目は1-2行で簡潔に
- 主力製品名・顧客名・数値などサイトに明記された具体名を必ず引用する`

export async function inferCompanyInsights(
  scrapeText: string,
  companyName: string,
  timeoutMs = 14000
): Promise<CompanyInsights | null> {
  if (!KEY || !scrapeText) return null
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const client = new Anthropic({ apiKey: KEY })
    const response = await client.messages.create(
      {
        model: MODEL,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `${companyName} のWebサイト本文から、 営業向けインサイトを抽出してください。

【Webサイト本文(冒頭)】
${scrapeText}

【ターゲット】
Meeton ai は AI Chat / AI Email / AI Calendar / AI Offer の4モジュールでウェブサイト訪問者を商談化する B2B SaaS。 この会社が Meeton ai を導入したら、 どこに価値が出そうかも示してください。`,
          },
        ],
        tools: [
          {
            name: 'extract_company_insights',
            description: '会社サイトから営業インサイトを構造化抽出',
            input_schema: {
              type: 'object',
              properties: {
                flagshipProduct: { type: 'string', description: '主力製品/サービスと短い説明 (1-2行、 サイト記載の具体名を使用)' },
                customerType: { type: 'string', description: 'ターゲット顧客層 (1行、 例: "上場メーカーの人事部門" "大手金融の法人営業")' },
                strength: { type: 'string', description: '市場での差別化強み (1行、 サイトに記載されたシェア・実績・特徴)' },
                recentActivity: { type: 'string', description: '直近の取り組み or プレスリリース or 新サービス (サイトに記載があれば、 1行)' },
                meetingAiOpportunity: { type: 'string', description: 'Meeton ai (4モジュールAI営業プラットフォーム) が貴社に貢献できそうな具体ポイント (1-2行、 主力製品の検討フェーズ顧客への対応など)' },
              },
            },
          },
        ],
        tool_choice: { type: 'tool', name: 'extract_company_insights' },
      },
      { signal: ctrl.signal }
    )
    const tool = response.content.find(c => c.type === 'tool_use')
    if (!tool || tool.type !== 'tool_use') return null
    return tool.input as CompanyInsights
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}
