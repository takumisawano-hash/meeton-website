/**
 * Monthly webinar schedule.
 *
 * Single source of truth for:
 *   - /webinar/ (3-month index LP)
 *   - /webinar/[slug]/ (individual registration LP)
 *   - InvitationBanner (sitewide popup auto-promotes current month)
 *   - Sitemap entries
 *
 * 編集ルール:
 *   - 3 ヶ月先まで定義しておく (LP が 3 件常時表示)
 *   - 毎月開催完了したら past=true をセット (LP の On-Demand エリアへ移動)
 *   - 日付は ISO 8601 (YYYY-MM-DD), JST 14:00 default
 *
 * このスケジュールを編集すると Nav / Popup / LP / Sitemap すべて自動で更新される。
 */

export type WebinarSchedule = {
  slug: string
  title: string
  subtitle: string
  /** Hosting date (JST). 過去日付になると自動で past flag が立つ */
  date: string // YYYY-MM-DD
  /** Display label: "6月18日(木) 14:00 JST" */
  dateLabel: string
  /** 90-120 char meta description for LP head */
  description: string
  /** Learning points (3-5 bullets) */
  learnings: string[]
  /** Agenda outline (4-6 sections w/ minutes) */
  agenda: Array<{ minutes: number; topic: string }>
  /** Speaker (default Sawano) */
  speaker?: {
    name: string
    title: string
    bio: string
  }
  /** True after the event is finished. Show in On-Demand library instead of upcoming. */
  past?: boolean
  /** Replay URL once available (post-event) */
  replayUrl?: string
}

const DEFAULT_SPEAKER = {
  name: '澤野 拓実',
  title: 'DynaMeet 株式会社 共同創業者 兼 CRO',
  bio:
    '前職で BtoB SaaS のグローバル展開を担当。インサイドセールス・パイプライン構築・AI 営業オペレーションの実装支援に従事。Meeton ai を共同創業し、日本の B2B 企業向け AI SDR プラットフォームを設計・推進している。',
}

export const WEBINAR_SCHEDULE: WebinarSchedule[] = [
  {
    slug: 'lead-to-meeting-loss',
    title: 'リード→商談化の "見えない損失"',
    subtitle: 'B2B パイプラインから消える 80% を可視化する',
    date: '2026-06-18',
    dateLabel: '6 月 18 日(木) 14:00 - 14:30 JST',
    description:
      'リードはあるのに商談数が伸びない B2B 企業向けの 30 分セッション。業界統計から MQL→SQL の "見えない損失" を分解し、修復のフレームワークをコンパクトに提示します。',
    learnings: [
      'B2B パイプライン上で MQL→SQL 間に失われる平均 80% のリード、その内訳',
      '"見えない損失" を計測する 5 つの指標 (Speed to Lead / Touch 数 / コンテンツ消費 / 再訪率 / 温度減衰)',
      'ロスの大きい 3 つの転換点 (初動 / 育成 / 再エンゲージ) と修復アプローチ',
      '人手で解く範囲と AI で解く範囲の切り分け方',
    ],
    agenda: [
      { minutes: 3, topic: '"リードはあるのに商談化しない" — 業界統計の現在地' },
      { minutes: 8, topic: 'パイプライン分解モデル — 5 段階で見える損失の正体' },
      { minutes: 7, topic: '損失が起きる 3 つの転換点 と 修復フレーム' },
      { minutes: 5, topic: '人手と AI の境界線 — 実装の論点' },
      { minutes: 7, topic: 'Live Q&A' },
    ],
    speaker: DEFAULT_SPEAKER,
  },
  {
    slug: 'speed-to-lead-research',
    title: 'Speed to Lead 研究',
    subtitle: '初動 5 分・1 時間・24 時間で商談化率はどう変わるか',
    date: '2026-07-23',
    dateLabel: '7 月 23 日(木) 14:00 - 14:30 JST',
    description:
      'Harvard Business Review の Speed to Lead 古典研究と最新の B2B 実証データから、初動応答時間が商談化率にもたらす定量影響を 30 分でコンパクトに解説します。',
    learnings: [
      'Speed to Lead 研究の歴史 — 5 分以内 vs 1 時間以内 vs 24 時間後の商談化率倍率',
      'Japan B2B での実証データ — 日米差・業界差・営業組織サイズによる感応度',
      '初動 5 秒/5 分/24 時間 を実現するための 3 つの実装アーキテクチャ',
      'Speed to Lead を経営指標化する — KPI 設計と社内合意の作り方',
    ],
    agenda: [
      { minutes: 3, topic: 'なぜ Speed to Lead は B2B で再注目されているか' },
      { minutes: 7, topic: 'Harvard 研究の 5 分の壁 — 数字の中身を分解する' },
      { minutes: 6, topic: 'Japan 市場での実証 — 業界別・組織規模別の感応度' },
      { minutes: 7, topic: '実装アーキテクチャ 3 パターン — 人手 / 半自動 / フル自動' },
      { minutes: 7, topic: 'Live Q&A' },
    ],
    speaker: DEFAULT_SPEAKER,
  },
  {
    slug: 'cool-lead-nurture-design',
    title: '"温度低リード" を失わない B2B ナーチャリング設計',
    subtitle: 'メール開封率 5% 時代の代替モデル',
    date: '2026-08-27',
    dateLabel: '8 月 27 日(木) 14:00 - 14:30 JST',
    description:
      'B2B のメール開封率が下落するなか、温度低リードを失わずに育成するためのナーチャリング設計を、構造化されたフレームと業界データから 30 分でコンパクトに解説します。',
    learnings: [
      'なぜ B2B のメールナーチャリングは形骸化したか — 開封率 5% の構造要因',
      '温度低リードを失わない 4 段階モデル (Re-attention / Re-context / Re-engage / Re-route)',
      'メール以外のナーチャリング媒体 — Web 接客 / コンテンツライブラリ / リターゲ広告の使い分け',
      'ナーチャリング ROI を計測する指標と、長期育成のリーディングインジケータ',
    ],
    agenda: [
      { minutes: 3, topic: 'なぜメールナーチャリングは死んだのか' },
      { minutes: 8, topic: '4 段階モデル — Re-attention から Re-route まで' },
      { minutes: 6, topic: '代替媒体の組み合わせ方 — チャネルマトリクス' },
      { minutes: 6, topic: 'ROI 計測設計 — リーディングインジケータの選定' },
      { minutes: 7, topic: 'Live Q&A' },
    ],
    speaker: DEFAULT_SPEAKER,
  },
]

/** Mark webinars as past based on date, return enriched list. */
function withPastFlag(list: WebinarSchedule[], now: Date): WebinarSchedule[] {
  const todayStr = now.toISOString().split('T')[0]
  return list.map((w) => ({
    ...w,
    past: w.past ?? w.date < todayStr,
  }))
}

/** Get the next upcoming webinar (closest future date). */
export function getCurrentWebinar(now: Date = new Date()): WebinarSchedule | null {
  const enriched = withPastFlag(WEBINAR_SCHEDULE, now)
  const upcoming = enriched.filter((w) => !w.past).sort((a, b) => a.date.localeCompare(b.date))
  return upcoming[0] ?? null
}

/** Get all upcoming webinars (sorted asc). */
export function getUpcomingWebinars(now: Date = new Date()): WebinarSchedule[] {
  return withPastFlag(WEBINAR_SCHEDULE, now)
    .filter((w) => !w.past)
    .sort((a, b) => a.date.localeCompare(b.date))
}

/** Get all past webinars (sorted desc) for On-Demand library. */
export function getPastWebinars(now: Date = new Date()): WebinarSchedule[] {
  return withPastFlag(WEBINAR_SCHEDULE, now)
    .filter((w) => w.past)
    .sort((a, b) => b.date.localeCompare(a.date))
}

/** Find by slug (used by /webinar/[slug]/page.tsx). */
export function findWebinar(slug: string): WebinarSchedule | undefined {
  return WEBINAR_SCHEDULE.find((w) => w.slug === slug)
}
