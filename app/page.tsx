// Ray Collins v1 landing-page metadata
import RayLandingV1 from '@/components/RayLandingV1'

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pv-plaster-landing.vercel.app'
  const title = 'Ray | Yeso & Acabados en Puerto Vallarta'
  const description = 'Yeso y acabados en Puerto Vallarta. Cotiza por WhatsApp.'

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
