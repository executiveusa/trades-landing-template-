// Single source of truth for facts about the business.
// Every value here is either USER PROVIDED (from the original repo) or UNVERIFIED and marked.
// Nothing in the public site may state a fact that is not in this file or in lib/content.ts.

export const SITE = {
  /** Public name. Full business name is UNVERIFIED: ask Ray. */
  name: 'Ray',
  trade: { es: 'Yeso y acabados', en: 'Plaster & finishes' },
  city: 'Puerto Vallarta',
  region: 'Jalisco',
  country: 'MX',
  /** USER PROVIDED (original repo content/tenant.json). Same number for call and WhatsApp. */
  phoneDisplay: '322 304 1169',
  phoneE164: '+523223041169',
  whatsappDigits: '523223041169',
  /** Canonical URL. UNVERIFIED until the domain is chosen. */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL || ''
  ).replace(/\/$/, ''),
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
} as const

export type Lang = 'es' | 'en'
