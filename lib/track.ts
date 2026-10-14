// Analytics events. They only fire if a GA measurement ID is configured (NEXT_PUBLIC_GA_ID).
// Until then "analytics working" is UNVERIFIED: the code path exists, nothing is collected.

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params?: Record<string, string>) => void
  }
}

export type TrackName =
  | 'whatsapp_click'
  | 'call_click'
  | 'quote_submit'
  | 'service_select'
  | 'lang_switch'

export function track(name: TrackName, params?: Record<string, string>): void {
  if (typeof window === 'undefined') return
  try {
    window.gtag?.('event', name, params)
  } catch {
    /* analytics must never break the page */
  }
}
