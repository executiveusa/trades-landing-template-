import RayLandingV1 from '@/components/RayLandingV1'

export async function generateMetadata(props: any) {
  const { searchParams } = props as any
  const lang = typeof searchParams === 'object' && searchParams.lang === 'en' ? 'en' : 'es'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pv-plaster-landing.vercel.app'

  const title = lang === 'en'
    ? 'Ray | Plaster & Finishes in Puerto Vallarta'
    : 'Ray | Yeso & Acabados en Puerto Vallarta'
  const description = lang === 'en'
    ? 'Plaster and finishes in Puerto Vallarta. Request a quote on WhatsApp.'
    : 'Yeso y acabados en Puerto Vallarta. Cotiza por WhatsApp.'

  return {
    title,
    description,
    alternates: { canonical: siteUrl },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: 'Ray',
      locale: 'es_MX',
      type: 'website',
      images: [{ url: `${siteUrl}/ray-hero-desktop.jpg`, width: 1200, height: 630, alt: 'Ray — yeso y acabados en Puerto Vallarta' }],
    },
  }
}

export default function Home() {
  return <RayLandingV1 />
}
