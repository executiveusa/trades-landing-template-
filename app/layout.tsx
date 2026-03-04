import type { Metadata } from 'next'
import { getTenant } from '@/lib/tenant'
import './globals.css'
import ClientLangProvider from '@/components/ClientLangProvider'

const tenant = getTenant()

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: `${tenant.businessName} | ${tenant.tradeName}`,
  description: tenant.hero.subhead,
  keywords: 'yeso, acabados, Puerto Vallarta, repellado, construcción',
  authors: [{ name: tenant.businessName }],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://example.com',
    title: tenant.businessName,
    description: tenant.hero.subhead,
    siteName: tenant.businessName,
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                'page_path': window.location.pathname,
                'page_title': document.title
              });
            `,
          }}
        ></script>
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: tenant.businessName,
              description: tenant.tradeName,
              areaServed: tenant.serviceAreas,
              telephone: tenant.phone,
              url: 'https://example.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: tenant.city,
                addressRegion: 'Jalisco',
                addressCountry: 'MX',
              },
            }),
          }}
        />
      </head>
      <body className="bg-brand-bg text-brand-text antialiased">
        <ClientLangProvider>
          {children}
        </ClientLangProvider>
      </body>
    </html>
  )
}
