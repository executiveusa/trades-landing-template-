import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import Testimonials from '@/components/Testimonials'
import ServiceArea from '@/components/ServiceArea'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export async function generateMetadata(props: any) {
  const { searchParams } = props as any
  const lang = typeof searchParams === 'object' && searchParams.lang === 'en' ? 'en' : 'es'
  return {
    title: lang === 'en' ? 'Puerto Vallarta Plaster & Finishes' : 'Puerto Vallarta Yeso & Acabados',
    description: lang === 'en'
      ? 'Professional plastering and finishing services serving Puerto Vallarta and surrounding areas.'
      : 'Servicios profesionales de yeso y acabados en Puerto Vallarta y áreas cercanas.',
  }
}

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <ServiceArea />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
