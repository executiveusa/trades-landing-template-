import Script from 'next/script'
import '@fontsource-variable/archivo/wdth.css'
import '@/app/styles.css'
import { COPY } from '@/lib/content'
import { jsonLd } from '@/lib/seo'
import { SITE, type Lang } from '@/lib/site'

/** Shared <html> for both language roots. Two root layouts keep <html lang> correct per route. */
export default function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={COPY[lang].htmlLang}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang)) }} />
        {SITE.gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${SITE.gaId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  )
}
