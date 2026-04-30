import { getAllCaseStudies, type CaseStudy } from '../../app/lib/case-studies'
import { getAllPosts, type BlogPost } from '../../app/lib/notion'

const TTL_MS = 5 * 60 * 1000

let caseCache: { ts: number; data: CaseStudy[] } | null = null
let blogCache: { ts: number; data: BlogPost[] } | null = null

let pendingCases: Promise<CaseStudy[]> | null = null
let pendingBlogs: Promise<BlogPost[]> | null = null

function withTimeout<T>(p: Promise<T>, ms: number, fallback: T): Promise<T> {
  return new Promise(resolve => {
    let settled = false
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true
        resolve(fallback)
      }
    }, ms)
    p.then(v => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      resolve(v)
    }).catch(() => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      resolve(fallback)
    })
  })
}

export async function getCachedCaseStudies(timeoutMs = 12000): Promise<CaseStudy[]> {
  if (caseCache && Date.now() - caseCache.ts < TTL_MS) return caseCache.data
  if (!pendingCases) {
    pendingCases = (async () => {
      try {
        const data = await getAllCaseStudies()
        caseCache = { ts: Date.now(), data }
        return data
      } finally {
        pendingCases = null
      }
    })()
  }
  return withTimeout(pendingCases, timeoutMs, caseCache?.data || [])
}

export async function getCachedBlogPosts(timeoutMs = 12000): Promise<BlogPost[]> {
  if (blogCache && Date.now() - blogCache.ts < TTL_MS) return blogCache.data
  if (!pendingBlogs) {
    pendingBlogs = (async () => {
      try {
        const data = await getAllPosts()
        blogCache = { ts: Date.now(), data }
        return data
      } finally {
        pendingBlogs = null
      }
    })()
  }
  return withTimeout(pendingBlogs, timeoutMs, blogCache?.data || [])
}
