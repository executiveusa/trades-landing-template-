import Navbar from '@/components/Navbar'
import Hero from '@/components/HeroEnhanced'
import Services from '@/components/ServicesEnhanced'
import Projects from '@/components/ProjectsEnhanced'
import ServiceArea from '@/components/ServiceArea'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export async function generateMetadata(props: any) {
  const { searchParams } = props as any
  const lang = typeof searchParams === 'object' && searchParams.lang === 'en' ? 'en' : 'es'

  return {
    title: lang === 'en' ? 'Ray | Master Plasterer in Puerto Vallarta' : 'Ray | Maestro Yesero en Puerto Vallarta',
    description: lang === 'en'
      ? 'Plaster, surface repair and hand-finished details for homes and businesses in Puerto Vallarta.'
      : 'Yeso, reparación de superficies y acabados hechos a mano para casas y negocios en Puerto Vallarta.',
  }
}

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <ServiceArea />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
