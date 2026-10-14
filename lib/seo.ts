import type { Metadata } from 'next'
import { COPY } from './content'
import { SITE, type Lang } from './site'

const path = (lang: Lang) => (lang === 'es' ? '/' : '/en')

export function buildMetadata(lang: Lang): Metadata {
  const t = COPY[lang]
  const hasUrl = Boolean(SITE.url)
  return {
    ...(hasUrl ? { metadataBase: new URL(SITE.url) } : {}),
    title: t.meta.title,
    description: t.meta.description,
    ...(hasUrl
      ? {
          alternates: {
            canonical: path(lang),
            languages: { 'es-MX': '/', en: '/en', 'x-default': '/' },
          },
        }
      : {}),
    openGraph: {
      type: 'website',
      locale: t.locale,
      title: t.meta.title,
      description: t.meta.description,
      siteName: `${SITE.name}, ${SITE.trade[lang]}`,
      // Relative image URLs need a real domain; without one, emit none rather than a wrong one.
      ...(hasUrl ? { images: [{ url: '/og.jpg', width: 1200, height: 630, alt: t.meta.ogAlt }] } : {}),
    },
    robots: { index: true, follow: true },
  }
}

/**
 * Structured data uses only verified facts: name, phone, city, service area.
 * No street address, rating, price range or opening hours: none are verified.
 */
export function jsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: `${SITE.name}, ${SITE.trade[lang]}`,
    description: COPY[lang].meta.description,
    telephone: SITE.phoneE164,
    areaServed: { '@type': 'City', name: SITE.city },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    ...(SITE.url ? { url: `${SITE.url}${path(lang) === '/' ? '' : path(lang)}`, image: `${SITE.url}/og.jpg` } : {}),
  }
}
