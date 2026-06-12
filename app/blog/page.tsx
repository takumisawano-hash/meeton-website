import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  getAllPosts,
  getCategoriesWithCounts,
  getTagsWithCounts,
} from '@/app/lib/notion'
import BlogListJsonLd from '@/app/components/BlogListJsonLd'

export const revalidate = 3600 // 1時間ごとに再検証

export const metadata: Metadata = {
  title: 'AI営業ブログ｜AI SDR・インサイドセールス・商談化ノウハウ',
  description: 'AI SDR・インサイドセールス・商談化率改善・ABM運用のベストプラクティスを毎日配信。B2B営業の最前線を実例と数字で解説する160本超の記事。',
  alternates: {
    canonical: '/blog/',
    languages: {
      'ja-JP': '/blog/',
    },
  },
  openGraph: {
    title: 'AI営業ブログ｜AI SDR・インサイドセールス・商談化ノウハウ',
    description: 'AI SDR・インサイドセールス・商談化率改善・ABM運用のベストプラクティスを毎日配信。B2B営業の最前線を実例と数字で解説する160本超の記事。',
    url: 'https://dynameet.ai/blog/',
    type: 'website',
    siteName: 'Meeton ai',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI営業ブログ｜AI SDR・商談化ノウハウ',
    description: 'AI SDR・インサイドセールス・商談化率改善のベストプラクティスを毎日配信。160本超の記事。',
    site: '@meetonai',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

// 2026-06-12 perf audit: the previous BlogPageClient ('use client') received
// ALL posts as props, serializing ~226KB of post JSON into the page payload
// just to power client-side filtering. The index is now fully server-rendered:
// category/tag filters became links to the existing /blog/category/ and
// /blog/tag/ routes, and the grid is capped at the newest posts with a
// clearly-labeled archive section below for everything older.
const INITIAL_GRID = 24

// Reader-role entry points (kept from the 2026-05-19 external review fix:
// "as the article count grows, readers don't know where to start"). Each card
// now links straight to its category archive instead of toggling client state.
const PERSONAS = [
  {
    title: 'マーケ担当者の方',
    lines: ['リードが商談化しない原因', 'ナーチャリング改善', 'ウェビナー後フォロー'],
    category: 'Marketing',
    accent: '#7c5cfc',
  },
  {
    title: 'インサイドセールス責任者の方',
    lines: ['初動対応の自動化', '日程調整の削減', 'フォロー漏れ防止'],
    category: 'Inside Sales',
    accent: '#0891b2',
  },
  {
    title: '営業 / Sales リーダーの方',
    lines: ['商談化率の改善', 'Speed to Lead 実装', 'AI SDR とは？'],
    category: 'Sales',
    accent: '#12a37d',
  },
]

function formatDate(d: string): string {
  try {
    return new Date(d).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return d
  }
}

export default async function BlogPage() {
  // getAllPosts() is wrapped in React.cache, so these three share one
  // Notion fetch per render instead of issuing parallel API calls.
  const [posts, categories, tags] = await Promise.all([
    getAllPosts(),
    getCategoriesWithCounts(1),
    getTagsWithCounts(1),
  ])

  const featuredPost = posts.length > 0 ? posts[0] : null
  const gridPosts = posts.slice(1, 1 + INITIAL_GRID)
  const shownCount = (featuredPost ? 1 : 0) + gridPosts.length
  const remaining = Math.max(0, posts.length - shownCount)
  const topTags = tags.slice(0, 12)

  // Only render persona cards whose category archive actually resolves.
  const personaCards = PERSONAS.map((p) => {
    const cat = categories.find((c) => c.name === p.category)
    return cat ? { ...p, href: `/blog/category/${cat.slug}/` } : null
  }).filter((p): p is NonNullable<typeof p> => p !== null)

  return (
    <>
      <BlogListJsonLd posts={posts} />
      <style>{`
        /* ===== Hero ===== */
        .blog-hero{
          position: relative;
          padding: 116px clamp(16px,5vw,48px) 36px;
          background: #fff;
          text-align: center;
          overflow: hidden;
          isolation: isolate;
        }
        .blog-hero::before{
          content: "";
          position: absolute; inset: 0;
          background-image:
            radial-gradient(circle at 1px 1px, rgba(15,45,64,.09) 1px, transparent 0);
          background-size: 22px 22px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%);
          z-index: -2;
        }
        .blog-hero::after{
          content: "";
          position: absolute; inset: 0;
          background:
            radial-gradient(circle at 18% 15%, rgba(18,163,125,.18), transparent 45%),
            radial-gradient(circle at 82% 20%, rgba(124,92,252,.16), transparent 45%),
            radial-gradient(circle at 50% 100%, rgba(8,145,178,.10), transparent 55%);
          z-index: -1;
          pointer-events: none;
        }
        .blog-eyebrow{
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg,#ecfdf5,#f0fdfa);
          border: 1px solid #a7f3d0;
          padding: 7px 16px; border-radius: 999px;
          font-size: 12.5px; font-weight: 700; color: #065f46;
          margin-bottom: 20px; letter-spacing: .08em;
          text-transform: uppercase;
          box-shadow: 0 1px 2px rgba(6,95,70,.04), inset 0 1px 0 rgba(255,255,255,.7);
        }
        .blog-eyebrow::before{
          content: ""; width: 6px; height: 6px; border-radius: 50%;
          background: #12a37d;
          box-shadow: 0 0 0 3px rgba(18,163,125,.18);
        }
        .blog-h1{
          font-size: clamp(28px,4.6vw,46px); font-weight: 800;
          color: #0f2d40; line-height: 1.1; letter-spacing: -0.035em;
          margin: 0 auto 16px; max-width: 880px;
        }
        .blog-h1 em{
          font-style: normal;
          background: linear-gradient(120deg,#12a37d 0%,#0891b2 55%,#7c5cfc 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .blog-sub{
          font-size: clamp(14px,1.55vw,17px); line-height: 1.65;
          color: #475569; max-width: 620px; margin: 0 auto 24px;
          letter-spacing: -0.005em;
        }
        .blog-meta-row{
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 12.5px; color: #5a7080; font-weight: 600;
          margin-bottom: 28px;
        }
        .blog-meta-pulse{
          width: 7px; height: 7px; border-radius: 50%;
          background: #12a37d;
          box-shadow: 0 0 0 4px rgba(18,163,125,.18);
          animation: blog-pulse 2.2s ease-in-out infinite;
        }
        @keyframes blog-pulse{
          0%, 100% { box-shadow: 0 0 0 4px rgba(18,163,125,.18); }
          50% { box-shadow: 0 0 0 7px rgba(18,163,125,.08); }
        }

        /* ===== Personas (どこから読めばいい？) ===== */
        .blog-personas{
          max-width: 960px; margin: 36px auto 0;
        }
        .blog-personas-eyebrow{
          text-align: center; font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px; font-weight: 800; letter-spacing: 0.16em;
          color: #5a7080; text-transform: uppercase; margin-bottom: 16px;
        }
        .blog-personas-grid{
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }
        @media (max-width: 800px){
          .blog-personas-grid{ grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; }
        }
        .blog-persona-card{
          text-align: left;
          padding: 22px 22px 18px;
          background: #fff;
          border: 1px solid #e7edf2;
          border-top: 3px solid #12a37d;
          border-radius: 14px;
          font: inherit;
          color: inherit;
          text-decoration: none;
          transition: transform .2s, box-shadow .2s, border-color .2s;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .blog-persona-card:hover{
          transform: translateY(-3px);
          box-shadow: 0 12px 32px -16px rgba(15,45,64,.16);
        }
        .blog-persona-title{
          font-size: 15px; font-weight: 800; color: #0f2d40; line-height: 1.35;
        }
        .blog-persona-list{
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 6px;
        }
        .blog-persona-list li{
          font-size: 13px; color: #475569; line-height: 1.5;
          padding-left: 16px; position: relative;
        }
        .blog-persona-list li::before{
          content: ""; position: absolute; left: 0; top: 8px;
          width: 8px; height: 2px; background: currentColor; opacity: .35;
        }
        .blog-persona-cta{
          margin-top: auto; font-size: 13px; font-weight: 800;
        }

        /* ===== Filter bar (sticky) ===== */
        .blog-filter-sticky{
          position: sticky; top: 64px;
          z-index: 30;
          background: rgba(255,255,255,.86);
          backdrop-filter: saturate(180%) blur(12px);
          -webkit-backdrop-filter: saturate(180%) blur(12px);
          border-bottom: 1px solid #eef2f6;
        }
        .blog-filter-wrap{
          padding: 14px clamp(16px,5vw,48px);
          max-width: 1188px; margin: 0 auto;
        }
        .blog-filter-label{
          font-size: 11px; font-weight: 800; letter-spacing: 0.12em;
          text-transform: uppercase; color: #8fa0ae;
          margin-right: 4px;
        }
        .blog-filter-scroll{
          display: flex; align-items: center; gap: 8px;
          flex-wrap: wrap;
          padding: 6px;
          border-radius: 14px;
          background: #fafbfc;
          border: 1px solid #eef2f6;
        }
        .blog-pill{
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 14px; border-radius: 10px;
          font-size: 13px; font-weight: 700;
          border: 1px solid transparent;
          background: transparent;
          color: #5a7080;
          text-decoration: none;
          transition: all .2s cubic-bezier(.16,1,.3,1);
          letter-spacing: -0.003em;
          min-height: 36px;
          white-space: nowrap;
        }
        .blog-pill:hover{
          background: #fff; color: #0f2d40; border-color: #e4eaef;
        }
        .blog-pill.active{
          background: #fff; color: #065f46; border-color: #c8efe2;
          box-shadow: 0 1px 2px rgba(18,163,125,.06), 0 4px 12px rgba(18,163,125,.08);
        }
        .blog-pill-count{
          font-size: 11px; font-weight: 700;
          padding: 2px 7px; border-radius: 999px;
          background: #eef2f6; color: #5a7080;
        }
        .blog-pill.active .blog-pill-count{
          background: #ecfdf5; color: #065f46;
        }

        /* ===== Tags row ===== */
        .blog-tags-row{
          display: flex; flex-wrap: wrap; align-items: center;
          gap: 6px;
          padding: 12px clamp(16px,5vw,48px) 0;
          max-width: 1188px; margin: 0 auto;
        }
        .blog-tag-chip{
          display: inline-flex; align-items: center;
          padding: 5px 11px; border-radius: 999px;
          font-size: 12px; font-weight: 500;
          border: 1px solid #e4eaef;
          background: #fff;
          color: #5a7080;
          text-decoration: none;
          transition: all .18s ease;
          min-height: 28px;
        }
        .blog-tag-chip:hover{
          border-color: #c8d6e0; color: #0f2d40;
        }

        /* ===== Content section ===== */
        .blog-content{
          padding: 28px clamp(16px,5vw,48px) 88px;
          max-width: 1188px; margin: 0 auto;
        }
        .blog-result-row{
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
          margin-bottom: 20px;
        }
        .blog-result-text{
          font-size: 13.5px; color: #5a7080; font-weight: 600;
          letter-spacing: -0.003em;
        }
        .blog-result-text strong{
          color: #0f2d40; font-weight: 800;
        }

        /* ===== Featured card ===== */
        .blog-featured{
          position: relative;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 0;
          background: #fff;
          border: 1px solid #eef2f6;
          border-radius: 22px;
          overflow: hidden;
          text-decoration: none;
          margin-bottom: 36px;
          transition: all .35s cubic-bezier(.16,1,.3,1);
          isolation: isolate;
        }
        .blog-featured::before{
          content: "";
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg,#12a37d 0%,#0891b2 50%,#7c5cfc 100%);
          z-index: 2;
        }
        .blog-featured:hover{
          border-color: #d9f0e6;
          transform: translateY(-2px);
          box-shadow: 0 1px 2px rgba(15,45,64,.04), 0 18px 44px rgba(18,163,125,.12);
        }
        .blog-featured-img{
          position: relative;
          min-height: 320px;
          background: linear-gradient(135deg,#0f2d40 0%,#1a4a5e 100%);
          overflow: hidden;
        }
        .blog-featured-img img{
          transition: transform .6s cubic-bezier(.16,1,.3,1);
        }
        .blog-featured:hover .blog-featured-img img{
          transform: scale(1.04);
        }
        .blog-featured-body{
          padding: clamp(24px,3.5vw,40px);
          display: flex; flex-direction: column; justify-content: center;
        }
        .blog-featured-badge{
          display: inline-flex; align-items: center; gap: 6px;
          align-self: flex-start;
          padding: 5px 12px; border-radius: 999px;
          font-size: 11px; font-weight: 800;
          background: linear-gradient(135deg,#ecfdf5,#f0fdfa);
          border: 1px solid #a7f3d0;
          color: #065f46;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .blog-featured-badge::before{
          content: ""; width: 5px; height: 5px; border-radius: 50%;
          background: #12a37d;
        }
        .blog-featured-cat{
          display: inline-block;
          font-size: 11.5px; font-weight: 800;
          color: #12a37d;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .blog-featured-title{
          font-size: clamp(20px,2.6vw,28px);
          font-weight: 800;
          color: #0f2d40;
          line-height: 1.25;
          letter-spacing: -0.025em;
          margin: 0 0 12px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .blog-featured-excerpt{
          font-size: 14.5px; line-height: 1.7;
          color: #475569;
          margin: 0 0 20px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          letter-spacing: -0.003em;
        }
        .blog-featured-foot{
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px;
        }
        .blog-featured-date{
          font-size: 12px;
          color: #8fa0ae;
          font-weight: 600;
          letter-spacing: 0.04em;
          font-variant-numeric: tabular-nums;
        }
        .blog-featured-cta{
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13.5px; font-weight: 800;
          color: #12a37d;
        }
        .blog-featured-cta span{
          transition: transform .25s cubic-bezier(.16,1,.3,1);
        }
        .blog-featured:hover .blog-featured-cta span{
          transform: translateX(4px);
        }

        /* ===== Grid ===== */
        .blog-grid{
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .blog-card{
          position: relative;
          background: #fff;
          border: 1px solid #eef2f6;
          border-radius: 18px;
          overflow: hidden;
          text-decoration: none;
          display: flex; flex-direction: column;
          transition: all .35s cubic-bezier(.16,1,.3,1);
          isolation: isolate;
        }
        .blog-card::before{
          content: "";
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg,#12a37d 0%,#0891b2 50%,#7c5cfc 100%);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform .4s cubic-bezier(.16,1,.3,1);
          z-index: 2;
        }
        .blog-card:hover{
          border-color: #d9f0e6;
          transform: translateY(-3px);
          box-shadow: 0 1px 2px rgba(15,45,64,.04), 0 14px 36px rgba(18,163,125,.10);
        }
        .blog-card:hover::before{ transform: scaleX(1); }
        .blog-card-thumb{
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          background: linear-gradient(135deg,#0f2d40 0%,#1a4a5e 100%);
          overflow: hidden;
        }
        .blog-card-thumb img{
          transition: transform .5s cubic-bezier(.16,1,.3,1);
        }
        .blog-card:hover .blog-card-thumb img{ transform: scale(1.05); }
        .blog-card-chip{
          position: absolute;
          top: 12px; left: 12px;
          padding: 5px 11px; border-radius: 999px;
          font-size: 11px; font-weight: 800;
          background: rgba(255,255,255,.95);
          backdrop-filter: blur(6px);
          color: #065f46;
          letter-spacing: 0.04em;
          box-shadow: 0 2px 8px rgba(15,45,64,.12);
          z-index: 1;
        }
        .blog-card-body{
          padding: 18px 20px 20px;
          display: flex; flex-direction: column; flex: 1;
        }
        .blog-card-title{
          font-size: 16px; font-weight: 800;
          color: #0f2d40;
          line-height: 1.45;
          letter-spacing: -0.015em;
          margin: 0 0 8px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-break: break-word;
          overflow-wrap: anywhere;
        }
        .blog-card-excerpt{
          font-size: 13px; line-height: 1.65;
          color: #5a7080;
          margin: 0 0 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          letter-spacing: -0.003em;
          flex: 1;
        }
        .blog-card-foot{
          display: flex; align-items: center; justify-content: space-between;
          gap: 8px;
          padding-top: 12px;
          border-top: 1px solid #f1f4f7;
        }
        .blog-card-date{
          font-size: 11.5px;
          color: #8fa0ae;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-variant-numeric: tabular-nums;
        }
        .blog-card-arrow{
          font-size: 12.5px; font-weight: 800;
          color: #12a37d;
          display: inline-flex; align-items: center; gap: 4px;
        }
        .blog-card-arrow span{
          transition: transform .25s cubic-bezier(.16,1,.3,1);
        }
        .blog-card:hover .blog-card-arrow span{ transform: translateX(3px); }

        /* ===== Archive (older posts via category pages) ===== */
        .blog-archive{
          margin-top: 48px;
          padding: 32px 24px;
          text-align: center;
          background: #fafbfc;
          border: 1px solid #eef2f6;
          border-radius: 18px;
        }
        .blog-archive-title{
          font-size: 16px; font-weight: 800; color: #0f2d40;
          margin: 0 0 6px; letter-spacing: -0.015em;
        }
        .blog-archive-sub{
          font-size: 13px; color: #5a7080;
          margin: 0 0 18px; letter-spacing: -0.003em;
        }
        .blog-archive-links{
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: 8px;
        }
        .blog-archive-link{
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 16px; border-radius: 999px;
          background: #fff;
          border: 1px solid #c8efe2;
          color: #065f46;
          font-size: 13px; font-weight: 800;
          text-decoration: none;
          transition: all .2s cubic-bezier(.16,1,.3,1);
          min-height: 40px;
          letter-spacing: -0.003em;
        }
        .blog-archive-link:hover{
          border-color: #12a37d;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(18,163,125,.14);
        }

        /* ===== Empty state ===== */
        .blog-empty{
          text-align: center;
          padding: 72px 24px;
          background: #fafbfc;
          border: 1px dashed #e4eaef;
          border-radius: 18px;
        }
        .blog-empty-title{
          font-size: 17px; font-weight: 800; color: #0f2d40;
          margin-bottom: 6px; letter-spacing: -0.015em;
        }
        .blog-empty-sub{
          font-size: 14px; color: #5a7080;
          letter-spacing: -0.003em;
        }

        /* ===== Responsive ===== */
        @media (max-width: 1024px){
          .blog-grid{ grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .blog-featured{ grid-template-columns: 1fr; }
          .blog-featured-img{ min-height: 240px; aspect-ratio: 16/9; }
        }
        @media (max-width: 720px){
          .blog-hero{ padding: 96px 16px 28px; }
          .blog-filter-sticky{ top: 56px; }
          .blog-filter-wrap{ padding: 12px 16px; }
          .blog-grid{ grid-template-columns: 1fr; gap: 16px; }
          .blog-featured-img{ min-height: 200px; }
          .blog-featured-body{ padding: 20px; }
          .blog-content{ padding: 24px 16px 64px; }
          .blog-filter-scroll{
            flex-wrap: nowrap;
            overflow-x: auto;
            scrollbar-width: none;
          }
          .blog-filter-scroll::-webkit-scrollbar{ display: none; }
        }
      `}</style>

      {/* ===== Hero ===== */}
      <section className="blog-hero">
        <div className="blog-eyebrow">Blog</div>
        <h1 className="blog-h1">
          AI営業の<em>最前線</em>を、毎日配信
        </h1>
        <p className="blog-sub">
          AI SDR・インサイドセールス・商談化率改善・ABM運用のベストプラクティスを、
          実例と数字で解説します。
        </p>
        <div className="blog-meta-row">
          <span className="blog-meta-pulse" aria-hidden />
          <span>
            <strong style={{ color: '#0f2d40', fontWeight: 800 }}>{posts.length}本</strong>
            の記事を公開中
          </span>
        </div>

        {/* Reader-role entry points: link directly to category archives. */}
        {personaCards.length > 0 && (
          <div className="blog-personas">
            <div className="blog-personas-eyebrow">どこから読めばいい？</div>
            <div className="blog-personas-grid">
              {personaCards.map((p) => (
                <Link
                  key={p.title}
                  href={p.href}
                  className="blog-persona-card"
                  style={{ borderTopColor: p.accent }}
                  aria-label={`${p.title}向けの記事を読む`}
                >
                  <div className="blog-persona-title">{p.title}</div>
                  <ul className="blog-persona-list">
                    {p.lines.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                  <span className="blog-persona-cta" style={{ color: p.accent }}>
                    記事を読む →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ===== Sticky category nav (links to category archives) ===== */}
      <div className="blog-filter-sticky">
        <div className="blog-filter-wrap">
          <nav className="blog-filter-scroll" aria-label="カテゴリで絞り込み">
            <span className="blog-filter-label">カテゴリ</span>
            <span className="blog-pill active" aria-current="page">
              すべて
              <span className="blog-pill-count">{posts.length}</span>
            </span>
            {categories.map((c) => (
              <Link key={c.slug} href={`/blog/category/${c.slug}/`} className="blog-pill">
                {c.name}
                <span className="blog-pill-count">{c.count}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ===== Tag links ===== */}
      {topTags.length > 0 && (
        <nav className="blog-tags-row" aria-label="キーワードで絞り込み">
          <span className="blog-filter-label" style={{ marginRight: 4 }}>キーワード</span>
          {topTags.map((t) => (
            <Link key={t.slug} href={`/blog/tag/${t.slug}/`} className="blog-tag-chip">
              #{t.name} <span style={{ opacity: 0.7, marginLeft: 2 }}>{t.count}</span>
            </Link>
          ))}
        </nav>
      )}

      {/* ===== Content ===== */}
      <section className="blog-content">
        {posts.length === 0 ? (
          <div className="blog-empty">
            <div className="blog-empty-title">記事を読み込めませんでした</div>
            <div className="blog-empty-sub">お手数ですが、時間をおいて再度お試しください。</div>
          </div>
        ) : (
          <>
            <div className="blog-result-row">
              <p className="blog-result-text">
                全<strong>{posts.length}件</strong>中、最新<strong>{shownCount}件</strong>を表示
              </p>
            </div>

            {/* Featured card */}
            {featuredPost && (
              <Link href={`/blog/${featuredPost.slug}/`} className="blog-featured" aria-label={`最新記事を読む: ${featuredPost.title}`}>
                <div className="blog-featured-img">
                  {featuredPost.featuredImage && (
                    <Image
                      src={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      priority
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                </div>
                <div className="blog-featured-body">
                  <span className="blog-featured-badge">Featured</span>
                  {featuredPost.category && (
                    <span className="blog-featured-cat">{featuredPost.category}</span>
                  )}
                  <h2 className="blog-featured-title">{featuredPost.title}</h2>
                  <p className="blog-featured-excerpt">{featuredPost.description}</p>
                  <div className="blog-featured-foot">
                    <time className="blog-featured-date" dateTime={featuredPost.publishedDate}>
                      {formatDate(featuredPost.publishedDate)}
                    </time>
                    <span className="blog-featured-cta">
                      記事を読む <span>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Article grid */}
            {gridPosts.length > 0 && (
              <div className="blog-grid">
                {gridPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}/`}
                    className="blog-card"
                    aria-label={post.title}
                  >
                    <div className="blog-card-thumb">
                      {post.featuredImage && (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="lazy"
                          style={{ objectFit: 'cover' }}
                        />
                      )}
                      {post.category && (
                        <span className="blog-card-chip">{post.category}</span>
                      )}
                    </div>
                    <div className="blog-card-body">
                      <h3 className="blog-card-title">{post.title}</h3>
                      <p className="blog-card-excerpt">{post.description}</p>
                      <div className="blog-card-foot">
                        <time className="blog-card-date" dateTime={post.publishedDate}>
                          {formatDate(post.publishedDate)}
                        </time>
                        <span className="blog-card-arrow">
                          Read <span>→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Archive: older posts are reachable via category pages */}
            {remaining > 0 && categories.length > 0 && (
              <div className="blog-archive">
                <p className="blog-archive-title">続きの{remaining}本はカテゴリ別アーカイブへ</p>
                <p className="blog-archive-sub">すべての記事をカテゴリごとにご覧いただけます。</p>
                <div className="blog-archive-links">
                  {categories.map((c) => (
                    <Link key={c.slug} href={`/blog/category/${c.slug}/`} className="blog-archive-link">
                      {c.name}
                      <span className="blog-pill-count">{c.count}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  )
}
