'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Nav from './Nav'
import Footer from './Footer'
import type { BlogPost } from '@/app/lib/notion'

type BlogPageClientProps = {
  posts: BlogPost[]
  categories: string[]
}

export default function BlogPageClient({ posts, categories }: BlogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Extract all unique tags from posts
  const allTags = useMemo(() => {
    const tagCounts: Record<string, number> = {}
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })
    // Sort by count and return top tags
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([tag, count]) => ({ tag, count }))
  }, [posts])

  // Filter posts based on search, category, and tag
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
      if (post.category) {
        counts[post.category] = (counts[post.category] || 0) + 1
      }
    })
    return counts
  }, [posts])

  // Sort categories by count
  const sortedCategories = [...categories].sort((a, b) =>
    (categoryCounts[b] || 0) - (categoryCounts[a] || 0)
  )

  const hasActiveFilters = searchQuery || selectedCategory || selectedTag

  return (
    <>
      <Nav />
      <main style={{
        paddingTop: 'clamp(70px, 12vw, 100px)',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f8fafc 0%, #fff 50%)'
      }}>
        {/* Hero Section */}
        <section style={{
          padding: 'clamp(30px, 6vw, 60px) clamp(16px, 4vw, 24px) clamp(24px, 5vw, 40px)',
          textAlign: 'center',
          maxWidth: 900,
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            color: '#1a1a2e',
            marginBottom: 16,
            lineHeight: 1.2
          }}>
            ブログ
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 18px)',
            color: '#6e7494',
            maxWidth: 600,
            margin: '0 auto 40px',
            lineHeight: 1.7
          }}>
            AI営業・マーケティングの最新情報やノウハウ、<br />
            業界トレンドをお届けします。
          </p>

          {/* Search Bar */}
          <div style={{
            maxWidth: 500,
            margin: '0 auto',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="記事を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 20px 16px 50px',
                fontSize: 16,
                border: '2px solid #e5e7eb',
                borderRadius: 12,
                outline: 'none',
                background: '#fff',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#12a37d'
                e.target.style.boxShadow = '0 0 0 4px rgba(18,163,125,0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.boxShadow = 'none'
              }}
            />
            <svg
              style={{
                position: 'absolute',
                left: 18,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 20,
                height: 20,
                color: '#9ca3af'
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </section>

        {/* Category Filters */}
        <section style={{
          padding: '0 clamp(16px, 4vw, 24px) clamp(16px, 3vw, 24px)',
          maxWidth: 1200,
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 12,
            flexWrap: 'wrap'
          }}>
            <span style={{
              fontSize: 'clamp(12px, 1.8vw, 13px)',
              fontWeight: 600,
              color: '#64748b'
            }}>
              カテゴリ
            </span>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8
            }}>
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  padding: 'clamp(6px, 1.2vw, 8px) clamp(12px, 2vw, 16px)',
                  fontSize: 'clamp(11px, 1.8vw, 13px)',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: 20,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: selectedCategory === null ? '#12a37d' : '#f1f5f9',
                  color: selectedCategory === null ? '#fff' : '#64748b',
                  whiteSpace: 'nowrap'
                }}
              >
                すべて
              </button>
              {sortedCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: 'clamp(6px, 1.2vw, 8px) clamp(12px, 2vw, 16px)',
                    fontSize: 'clamp(11px, 1.8vw, 13px)',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: 20,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: selectedCategory === category ? '#12a37d' : '#f1f5f9',
                    color: selectedCategory === category ? '#fff' : '#64748b',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Keyword/Tag Filters */}
          {allTags.length > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexWrap: 'wrap'
            }}>
              <span style={{
                fontSize: 'clamp(12px, 1.8vw, 13px)',
                fontWeight: 600,
                color: '#64748b'
              }}>
                キーワード
              </span>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6
              }}>
                {allTags.map(({ tag, count }) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    style={{
                      padding: 'clamp(4px, 1vw, 6px) clamp(10px, 1.8vw, 14px)',
                      fontSize: 'clamp(10px, 1.6vw, 12px)',
                      fontWeight: 500,
                      border: selectedTag === tag ? 'none' : '1px solid #e2e8f0',
                      borderRadius: 16,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: selectedTag === tag ? '#3b82f6' : '#fff',
                      color: selectedTag === tag ? '#fff' : '#64748b',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Article Grid */}
        <section style={{
          padding: 'clamp(24px, 4vw, 32px) clamp(16px, 4vw, 24px) clamp(50px, 8vw, 80px)',
          maxWidth: 1200,
          margin: '0 auto'
        }}>
          <div style={{
            marginBottom: 'clamp(16px, 3vw, 24px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12
          }}>
            <p style={{
              fontSize: 'clamp(14px, 2vw, 16px)',
              color: '#64748b'
            }}>
              {filteredPosts.length}件の記事
              {selectedCategory && (
                <span style={{ color: '#12a37d', fontWeight: 600 }}> / {selectedCategory}</span>
              )}
              {selectedTag && (
                <span style={{ color: '#3b82f6', fontWeight: 600 }}> / #{selectedTag}</span>
              )}
            </p>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory(null)
                  setSelectedTag(null)
                }}
                style={{
                  padding: '6px 14px',
                  fontSize: 'clamp(11px, 1.6vw, 13px)',
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  color: '#64748b',
                  fontWeight: 500
                }}
              >
                クリア
              </button>
            )}
          </div>

          {filteredPosts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: 'clamp(50px, 10vw, 80px) 20px',
              color: '#6e7494'
            }}>
              <svg
                style={{ width: 'clamp(48px, 8vw, 64px)', height: 'clamp(48px, 8vw, 64px)', margin: '0 auto 20px', color: '#d1d5db' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p style={{ fontSize: 'clamp(16px, 2.5vw, 18px)', fontWeight: 600, marginBottom: 8 }}>
                記事が見つかりませんでした
              </p>
              <p style={{ fontSize: 'clamp(13px, 2vw, 14px)' }}>
                検索条件を変更してお試しください
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(16px, 3vw, 24px)'
            }}>
              {filteredPosts.map(post => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}/`}
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    background: '#fff',
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '1px solid #e5e7eb',
                    transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'
                    e.currentTarget.style.borderColor = '#12a37d'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.borderColor = '#e5e7eb'
                  }}
                >
                  <div style={{
                    position: 'relative',
                    paddingTop: '56.25%',
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)'
                  }}>
                    {post.featuredImage && (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                    {post.category && (
                      <span style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        padding: '4px 10px',
                        fontSize: 11,
                        fontWeight: 600,
                        background: 'rgba(18,163,125,0.95)',
                        color: '#fff',
                        borderRadius: 16
                      }}>
                        {post.category}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: 'clamp(14px, 2.5vw, 20px)' }}>
                    <h3 style={{
                      fontSize: 'clamp(15px, 2vw, 16px)',
                      fontWeight: 700,
                      color: '#1a1a2e',
                      marginBottom: 8,
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {post.title}
                    </h3>
                    <p style={{
                      fontSize: 'clamp(12px, 1.6vw, 13px)',
                      color: '#6e7494',
                      lineHeight: 1.6,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      marginBottom: 10
                    }}>
                      {post.description}
                    </p>
                    <time style={{
                      fontSize: 'clamp(11px, 1.4vw, 12px)',
                      color: '#9ca3af'
                    }}>
                      {new Date(post.publishedDate).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
