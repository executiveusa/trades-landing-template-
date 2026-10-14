import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

// Without a confirmed domain there are no honest absolute URLs to list.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE.url) return []
  return [
    { url: `${SITE.url}/`, alternates: { languages: { 'es-MX': `${SITE.url}/`, en: `${SITE.url}/en` } } },
    { url: `${SITE.url}/en`, alternates: { languages: { 'es-MX': `${SITE.url}/`, en: `${SITE.url}/en` } } },
  ]
}
