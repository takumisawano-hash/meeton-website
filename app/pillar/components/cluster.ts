import type { BlogPost } from '@/app/lib/notion'
import type { PillarClusterGroup } from './PillarPage'

/**
 * Pillar pages must NEVER fabricate cluster articles. We pull from the
 * canonical Notion-backed BlogPost[] and bucket posts whose title /
 * description / category / tags / focusKeyword match one of the
 * keyword sets below.
 *
 * Matching is intentionally permissive on substrings because Notion
 * tags are typed by humans and inconsistent (e.g. "リード獲得",
 * "リードジェネレーション", "LeadGen", "lead generation" all show up).
 * Each post may match multiple groups, but we dedupe so it only appears
 * in the first matching group.
 */

export type ClusterGroupSpec = {
  label: string
  /** Lowercased substrings; match if ANY appears in title/desc/tags/cat/kw. */
  keywords: string[]
}

function postHaystack(p: BlogPost): string {
  return [
    p.title,
    p.description,
    p.category,
    p.focusKeyword || '',
    ...p.tags,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function matchesAny(haystack: string, kws: string[]): boolean {
  return kws.some((kw) => haystack.includes(kw.toLowerCase()))
}

/**
 * Returns posts that match ANY of the supplied keyword sets, plus the
 * grouped breakdown ready for <PillarPage clusterGroups>.
 *
 * Empty groups are filtered out automatically so the section never
 * renders a header with zero posts under it.
 */
export function buildClusterGroups(
  posts: BlogPost[],
  groups: ClusterGroupSpec[],
): { groups: PillarClusterGroup[]; total: number } {
  const used = new Set<string>()
  const out: PillarClusterGroup[] = []

  for (const group of groups) {
    const matched: BlogPost[] = []
    for (const post of posts) {
      if (used.has(post.id)) continue
      if (post.noIndex) continue
      const hay = postHaystack(post)
      if (matchesAny(hay, group.keywords)) {
        matched.push(post)
        used.add(post.id)
      }
    }
    // sort by publishedDate desc within each group
    matched.sort((a, b) =>
      (b.publishedDate || '').localeCompare(a.publishedDate || ''),
    )
    if (matched.length > 0) {
      out.push({ label: group.label, posts: matched })
    }
  }

  return { groups: out, total: out.reduce((n, g) => n + g.posts.length, 0) }
}
