import type { Metadata } from 'next'
import Script from 'next/script'
import { getTenant } from '@/lib/tenant'
import ClientLangProvider from '@/components/ClientLangProvider'
import './globals.css'

const tenant = getTenant()
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
const gaId = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: 'Ray | Maestro Yesero en Puerto Vallarta',
  description: 'Yeso, reparación de superficies y acabados hechos a mano para casas y negocios en Puerto Vallarta.',
  keywords: ['yesero Puerto Vallarta', 'yeso Puerto Vallarta', 'acabados Puerto Vallarta', 'reparación de muros Puerto Vallarta'],
  authors: [{ name: 'Ray' }],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    title: 'Ray | Maestro Yesero en Puerto Vallarta',
    description: 'Yeso, reparación de superficies y acabados hechos a mano en Puerto Vallarta.',
    siteName: 'Ray — Maestro Yesero',
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Ray — Maestro Yesero',
    description: 'Servicios de yeso, reparación de superficies y acabados en Puerto Vallarta.',
    areaServed: tenant.serviceAreas,
    ...(tenant.phone ? { telephone: tenant.phone } : {}),
    ...(siteUrl ? { url: siteUrl } : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: tenant.city,
      addressRegion: 'Jalisco',
      addressCountry: 'MX',
    },
  }

  return (
    <html lang="es">
      <head>
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        ) : null}

        <style>{`
          :root {
            --brand-bg: ${tenant.theme.background};
            --brand-text: ${tenant.theme.text};
            --brand-text-light: ${tenant.theme.textLight};
            --brand-accent: ${tenant.theme.accent};
            --brand-border: ${tenant.theme.border};
            --radius-sm: 0.375rem;
            --radius-md: 0.5rem;
            --radius-lg: 0.75rem;
          }
        `}</style>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
      </head>
      <body className="bg-brand-bg text-brand-text antialiased">
        <ClientLangProvider>{children}</ClientLangProvider>
      </body>
    </html>
  )
}
