const JINA_BASE = 'https://r.jina.ai/'
const MAX_LENGTH = 12000

export async function scrapeWebsiteText(domain: string, timeoutMs = 8000): Promise<string | null> {
  if (!domain) return null
  const target = domain.startsWith('http') ? domain : `https://${domain}`
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(`${JINA_BASE}${target}`, {
      signal: ctrl.signal,
      cache: 'no-store',
      headers: {
        Accept: 'text/markdown',
        'User-Agent': 'Mozilla/5.0 Meeton-LP-Bot',
      },
    })
    if (!res.ok) return null
    const text = await res.text()
    if (!text || text.length < 200) return null
    return text.slice(0, MAX_LENGTH)
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}
