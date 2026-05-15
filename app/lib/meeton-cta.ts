/**
 * Site-wide CTA handlers that route to the Meeton widget instead of
 * HubSpot iframes.
 *
 * Background (2026-05-14): user moved all "資料請求" + "デモを予約"
 * actions off the HubSpot embed onto our own Meeton chatbot widget so
 * (a) booking happens inside our own product UX, and (b) we stop
 * paying the ~200KB HubSpot embed for every CTA click.
 */

declare global {
  interface Window {
    Meeton?: {
      openDownloadCenter?: () => void
      openChat?: (opts?: { showCalendar?: boolean; calendarId?: string }) => void
      openCalendar?: (opts: { calendarId: string }) => void
    }
  }
}

const CALENDAR_URL =
  'https://dynameet.ai/?calendarId=takumi-sawano&showChat=true'

const MEETON_WAIT_MS = 800
const MEETON_RETRY_DELAY_MS = 150

/**
 * Open the Meeton "お役立ち資料" library popup.
 *
 * If the chatbot widget hasn't finished loading yet (the user clicked
 * a 資料請求 button as their first gesture), we poll briefly. If it
 * still isn't there, fall back to navigating to the homepage with a
 * query flag the widget bootstrapper recognizes.
 */
export function openMeetonDownloadCenter(): void {
  if (typeof window === 'undefined') return
  const tryOpen = () => {
    const api = window.Meeton
    if (api?.openDownloadCenter) {
      api.openDownloadCenter()
      return true
    }
    return false
  }
  if (tryOpen()) return

  // Poll: widget may still be loading (MeetonScript starts on first gesture
  // which IS this click).
  let elapsed = 0
  const interval = window.setInterval(() => {
    if (tryOpen() || elapsed >= MEETON_WAIT_MS) {
      window.clearInterval(interval)
      if (elapsed >= MEETON_WAIT_MS) {
        // Last resort: route to homepage with a flag — the chatbot
        // bootstrapper auto-opens its download center on detecting it.
        window.location.href = 'https://dynameet.ai/?openDownloadCenter=true'
      }
    }
    elapsed += MEETON_RETRY_DELAY_MS
  }, MEETON_RETRY_DELAY_MS)
}

/**
 * Open the Meeton calendar (takumi-sawano) inside the chatbot widget.
 *
 * On any page, simplest reliable behavior is to navigate to the
 * canonical calendar URL — the Meeton bootstrapper reads
 * ?calendarId=... &showChat=true and opens the booking flow inside
 * the widget on load. We try the in-place API first so users already
 * on the homepage skip the page reload.
 */
export function openMeetonCalendar(): void {
  if (typeof window === 'undefined') return
  const api = window.Meeton
  if (api?.openCalendar) {
    api.openCalendar({ calendarId: 'takumi-sawano' })
    return
  }
  if (api?.openChat) {
    api.openChat({ showCalendar: true, calendarId: 'takumi-sawano' })
    return
  }
  window.location.href = CALENDAR_URL
}
