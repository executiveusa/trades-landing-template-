import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import Testimonials from '@/components/Testimonials'
import ServiceArea from '@/components/ServiceArea'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

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
