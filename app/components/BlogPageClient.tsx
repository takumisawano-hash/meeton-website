'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/app/lib/notion'

type BlogPageClientProps = {
  posts: BlogPost[]
  categories: string[]
}

const PAGE_SIZE = 12

export default function BlogPageClient({ posts, categories }: BlogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // Extract top tags
  const allTags = useMemo(() => {
    const tagCounts: Record<string, number> = {}
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([tag, count]) => ({ tag, count }))
  }, [posts])

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === null || post.category === selectedCategory
      const matchesTag = selectedTag === null || post.tags?.includes(selectedTag)
      return matchesSearch && matchesCategory && matchesTag
    })
  }, [posts, searchQuery, selectedCategory, selectedTag])

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    posts.forEach(post => {
      if (post.category) counts[post.category] = (counts[post.category] || 0) + 1
    })
    return counts
  }, [posts])

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => (categoryCounts[b] || 0) - (categoryCounts[a] || 0)),
    [categories, categoryCounts]
  )

  const hasActiveFilters = !!(searchQuery || selectedCategory || selectedTag)

  // Featured = latest filtered post when no search filter is active OR latest in filter
  const showFeatured = !hasActiveFilters && filteredPosts.length > 0
  const featuredPost = showFeatured ? filteredPosts[0] : null
  const gridPosts = showFeatured ? filteredPosts.slice(1) : filteredPosts
  const visibleGridPosts = gridPosts.slice(0, visibleCount)
  const hasMore = gridPosts.length > visibleCount

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
    setSelectedTag(null)
    setVisibleCount(PAGE_SIZE)
  }

  const formatDate = (d: string) => {
    try {
      return new Date(d).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })
    } catch {
      return d
    }
  }

  return (
    <>
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
        .blog-search-wrap{
          max-width: 540px; margin: 0 auto; position: relative;
        }
        .blog-search-input{
          width: 100%;
          padding: 14px 18px 14px 46px;
          font-size: 15px;
          border: 1px solid #e4eaef;
          border-radius: 12px;
          outline: none;
          background: #fff;
          color: #0f2d40;
          transition: border-color .2s, box-shadow .2s;
          box-shadow: 0 1px 2px rgba(15,45,64,.04);
        }
        .blog-search-input:focus{
          border-color: #12a37d;
          box-shadow: 0 0 0 4px rgba(18,163,125,.12), 0 1px 2px rgba(15,45,64,.04);
        }
        .blog-search-icon{
          position: absolute; left: 16px; top: 50%;
          transform: translateY(-50%);
          width: 18px; height: 18px; color: #94a3b8;
          pointer-events: none;
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
          font-size: 13px; font-weight: 700; cursor: pointer;
          border: 1px solid transparent;
          background: transparent;
          color: #5a7080;
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
          padding: 5px 11px; border-radius: 999px;
          font-size: 12px; font-weight: 500;
          border: 1px solid #e4eaef;
          background: #fff;
          color: #5a7080;
          cursor: pointer;
          transition: all .18s ease;
          min-height: 28px;
        }
        .blog-tag-chip:hover{
          border-color: #c8d6e0; color: #0f2d40;
        }
        .blog-tag-chip.active{
          background: linear-gradient(135deg,#12a37d 0%,#0891b2 100%);
          border-color: transparent;
          color: #fff;
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
        .blog-result-text .blog-result-tag{
          color: #12a37d; font-weight: 700;
        }
        .blog-clear-btn{
          padding: 7px 14px; border-radius: 999px;
          font-size: 12.5px; font-weight: 700;
          background: #fff;
          border: 1px solid #e4eaef;
          color: #475569;
          cursor: pointer;
          transition: all .2s ease;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .blog-clear-btn:hover{
          border-color: #c8d6e0; color: #0f2d40;
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

        /* ===== Load more ===== */
        .blog-loadmore-wrap{
          display: flex; justify-content: center;
          padding: 48px 0 0;
        }
        .blog-loadmore-btn{
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px;
          border-radius: 999px;
          background: #fff;
          border: 1px solid #c8efe2;
          color: #065f46;
          font-size: 14px; font-weight: 800;
          cursor: pointer;
          transition: all .25s cubic-bezier(.16,1,.3,1);
          letter-spacing: -0.003em;
          min-height: 48px;
          box-shadow: 0 1px 2px rgba(18,163,125,.06), 0 4px 12px rgba(18,163,125,.08);
        }
        .blog-loadmore-btn:hover{
          background: linear-gradient(135deg,#12a37d 0%,#065f46 100%);
          color: #fff;
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 1px 2px rgba(18,163,125,.10), 0 14px 28px rgba(18,163,125,.20);
        }
        .blog-loadmore-meta{
          margin-top: 14px;
          font-size: 12.5px; color: #8fa0ae;
          text-align: center; font-weight: 600;
          letter-spacing: -0.003em;
        }

        /* ===== Empty state ===== */
        .blog-empty{
          text-align: center;
          padding: 72px 24px;
          background: #fafbfc;
          border: 1px dashed #e4eaef;
          border-radius: 18px;
        }
        .blog-empty-icon{
          width: 56px; height: 56px;
          margin: 0 auto 16px;
          color: #c8d6e0;
        }
        .blog-empty-title{
          font-size: 17px; font-weight: 800; color: #0f2d40;
          margin-bottom: 6px; letter-spacing: -0.015em;
        }
        .blog-empty-sub{
          font-size: 14px; color: #5a7080;
          margin-bottom: 18px; letter-spacing: -0.003em;
        }
        .blog-empty-btn{
          display: inline-flex; align-items: center; gap: 6px;
          padding: 11px 22px; border-radius: 999px;
          background: linear-gradient(135deg,#12a37d 0%,#065f46 100%);
          color: #fff;
          border: none;
          font-size: 13.5px; font-weight: 800;
          cursor: pointer;
          transition: all .25s ease;
          min-height: 44px;
          letter-spacing: -0.003em;
        }
        .blog-empty-btn:hover{
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(18,163,125,.22);
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
        <div className="blog-search-wrap">
          <svg className="blog-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="記事を検索（タイトル・概要）"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(PAGE_SIZE) }}
            className="blog-search-input"
            aria-label="記事を検索"
          />
        </div>
      </section>

      {/* ===== Sticky category filter ===== */}
      <div className="blog-filter-sticky">
        <div className="blog-filter-wrap">
          <div className="blog-filter-scroll" role="tablist" aria-label="カテゴリで絞り込み">
            <span className="blog-filter-label">カテゴリ</span>
            <button
              role="tab"
              aria-selected={selectedCategory === null}
              onClick={() => { setSelectedCategory(null); setVisibleCount(PAGE_SIZE) }}
              className={`blog-pill ${selectedCategory === null ? 'active' : ''}`}
            >
              すべて
              <span className="blog-pill-count">{posts.length}</span>
            </button>
            {sortedCategories.map(category => (
              <button
                key={category}
                role="tab"
                aria-selected={selectedCategory === category}
                onClick={() => { setSelectedCategory(category); setVisibleCount(PAGE_SIZE) }}
                className={`blog-pill ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
                <span className="blog-pill-count">{categoryCounts[category] || 0}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Tag chips ===== */}
      {allTags.length > 0 && (
        <div className="blog-tags-row" aria-label="キーワードで絞り込み">
          <span className="blog-filter-label" style={{ marginRight: 4 }}>キーワード</span>
          {allTags.map(({ tag, count }) => (
            <button
              key={tag}
              onClick={() => { setSelectedTag(selectedTag === tag ? null : tag); setVisibleCount(PAGE_SIZE) }}
              className={`blog-tag-chip ${selectedTag === tag ? 'active' : ''}`}
              aria-pressed={selectedTag === tag}
            >
              #{tag} <span style={{ opacity: 0.7, marginLeft: 2 }}>{count}</span>
            </button>
          ))}
        </div>
      )}

      {/* ===== Content ===== */}
      <section className="blog-content">
        <div className="blog-result-row">
          <p className="blog-result-text">
            <strong>{filteredPosts.length}件</strong>の記事
            {selectedCategory && <span className="blog-result-tag"> / {selectedCategory}</span>}
            {selectedTag && <span className="blog-result-tag"> / #{selectedTag}</span>}
            {searchQuery && <span className="blog-result-tag"> / 「{searchQuery}」</span>}
          </p>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="blog-clear-btn" aria-label="絞り込みをクリア">
              絞り込みをクリア
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="blog-empty">
            <svg className="blog-empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="blog-empty-title">該当する記事が見つかりませんでした</div>
            <div className="blog-empty-sub">検索条件を変えてもう一度お試しください。</div>
            <button onClick={clearFilters} className="blog-empty-btn">
              すべての記事を見る
            </button>
          </div>
        ) : (
          <>
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
            {visibleGridPosts.length > 0 && (
              <div className="blog-grid">
                {visibleGridPosts.map((post, idx) => (
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
                          priority={idx < 3 && !featuredPost}
                          loading={idx < 3 && !featuredPost ? 'eager' : 'lazy'}
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

            {/* Load more */}
            {hasMore && (
              <div className="blog-loadmore-wrap" style={{ flexDirection: 'column', alignItems: 'center' }}>
                <button
                  onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                  className="blog-loadmore-btn"
                >
                  さらに表示
                  <span style={{ opacity: 0.7, fontWeight: 700 }}>
                    +{Math.min(PAGE_SIZE, gridPosts.length - visibleCount)}
                  </span>
                </button>
                <div className="blog-loadmore-meta">
                  {visibleGridPosts.length + (featuredPost ? 1 : 0)} / {filteredPosts.length}件を表示中
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  )
}
