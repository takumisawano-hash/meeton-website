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
  /** Thumbnail (1200x630 OGP-spec image). Generated via
   *  ~/Projects/meeton-ads/generate_webinar_thumbnail.py with Gemini 3 Pro. */
  thumbnailUrl?: string
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
    title: '「リードは来てるのに、商談にならない」を分解する 30 分',
    subtitle: 'どこで落ちてるか、3 つの転換点に絞って見つけにいく',
    date: '2026-06-18',
    dateLabel: '6 月 18 日(木) 14:00 - 14:30 JST',
    thumbnailUrl: '/webinars/lead-to-meeting-loss.png',
    description:
      'リードはあるのに商談につながらない。その「どこで落ちてるか」を、明日の社内会議で説明できる粒度まで分解する 30 分。',
    learnings: [
      '自社のリードがどこで止まっているか、地図に落とす方法',
      '「対応した」と「商談化した」の間にある 3 つの落とし穴',
      '見るべき数字は 5 つだけ。残りは捨てていい理由',
      '人手でやるべき仕事と、AI に任せていい仕事の線引き',
    ],
    agenda: [
      { minutes: 3, topic: '「リードは来てる、でも商談にならない」— よくある現場の声から始める' },
      { minutes: 8, topic: 'リードが消える 3 つの場所 — 初動・フォロー・再接触' },
      { minutes: 7, topic: '明日から見る指標を 5 つに絞る' },
      { minutes: 5, topic: 'IS の負担を減らさずに商談化率を上げる順序' },
      { minutes: 7, topic: 'Live Q&A — 自社の数字で相談歓迎' },
    ],
    speaker: DEFAULT_SPEAKER,
  },
  {
    slug: 'speed-to-lead-research',
    title: 'リードが来てから何分で連絡すれば、アポになるのか',
    subtitle: '5 分・1 時間・24 時間で何がどう変わるか、研究データで答え合わせ',
    date: '2026-07-23',
    dateLabel: '7 月 23 日(木) 14:00 - 14:30 JST',
    thumbnailUrl: '/webinars/speed-to-lead-research.png',
    description:
      'リード対応のスピードで商談化率がどれだけ変わるのか。海外の古典研究と日本の B2B 実例を突き合わせて、現実的な目標値を 30 分で持ち帰る。',
    learnings: [
      '「5 分以内」と「1 時間後」と「翌日」で、商談化率が実際どう違うか',
      '日本の B2B で、何分以内なら勝負になるかの目安',
      '初動を速くするための 3 パターン — 人だけ / 半分自動 / 全部自動',
      '上司や社長に「対応スピードを KPI にしよう」と言うときの伝え方',
    ],
    agenda: [
      { minutes: 3, topic: 'なぜ今、また「対応スピード」の話なのか' },
      { minutes: 7, topic: '研究データを噛み砕く — 5 分の壁の中身' },
      { minutes: 6, topic: '日本の B2B 現場で、実際は何分が限界か' },
      { minutes: 7, topic: '人手 / 半自動 / 全自動 — 自社の規模で選ぶならどれか' },
      { minutes: 7, topic: 'Live Q&A — 自社の体制で相談歓迎' },
    ],
    speaker: DEFAULT_SPEAKER,
  },
  {
    slug: 'cool-lead-nurture-design',
    title: 'メールは届いてるのに、開かれない。眠ったリードの戻し方',
    subtitle: 'メール一辺倒をやめて、もう一度こちらを向いてもらう設計',
    date: '2026-08-27',
    dateLabel: '8 月 27 日(木) 14:00 - 14:30 JST',
    thumbnailUrl: '/webinars/cool-lead-nurture-design.png',
    description:
      '一度問い合わせてくれたのに、メルマガを送っても開かれない。死蔵リードを起こすために、メール以外で何ができるかを 30 分で整理。',
    learnings: [
      'なぜ B2B のメールは届いても読まれないのか — シンプルな構造の話',
      '眠ったリードを 4 段階で起こす考え方 (気づかせる→思い出させる→動かす→戻す)',
      'メール以外で接触する手段の使い分け — サイト上 / 広告 / 営業のひと言',
      '「育成してる感」だけで終わらないために、何を見ればいいか',
    ],
    agenda: [
      { minutes: 3, topic: 'メールが効かなくなった本当の理由' },
      { minutes: 8, topic: '眠ったリードを起こす 4 ステップ' },
      { minutes: 6, topic: 'メール以外の接触手段、使い分け表' },
      { minutes: 6, topic: '「やってる感」で終わらせない数字の見方' },
      { minutes: 7, topic: 'Live Q&A — 自社のリード状況で相談歓迎' },
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
