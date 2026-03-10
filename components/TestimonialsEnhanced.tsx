'use client'

import { getTenant } from '@/lib/tenant'
import { useLang } from '@/lib/lang'
import { motion } from 'framer-motion'
import { SlideUpView, StaggerContainer, StaggerItem } from './MotionPrimitives'

/**
 * Testimonials Component
 * Steve Krug Principle: Build trust through real customer voices
 * Small, easy-to-scan cards with clear attribution
 */

interface TestimonialItem {
  quote: string
  author: string
  rating: number
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
  return (
    <StaggerItem>
      <motion.div
        className="p-6 md:p-8 rounded-xl bg-white border border-brand-border hover:border-brand-accent hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -4 }}
      >
        {/* Star rating */}
        <div className="flex gap-1 mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <span key={i} className="text-lg">
              ⭐
            </span>
          ))}
          {[...Array(5 - testimonial.rating)].map((_, i) => (
            <span key={i} className="text-lg opacity-30">
              ⭐
            </span>
          ))}
        </div>

        {/* Quote */}
        <p className="text-brand-text-light mb-4 italic leading-relaxed">
          "{testimonial.quote}"
        </p>

        {/* Author */}
        <p className="font-semibold text-brand-text text-sm">— {testimonial.author}</p>
      </motion.div>
    </StaggerItem>
  )
}

export default function Testimonials() {
  const tenant = getTenant()
  const { lang } = useLang()

  const testimonials: TestimonialItem[] = [
    {
      quote:
        lang === 'en'
          ? 'Professional work, amazing attention to detail. Highly recommend!'
          : '¡Trabajo profesional, atención increíble al detalle! ¡Altamente recomendado!',
      author: lang === 'en' ? 'Maria Garcia' : 'María García',
      rating: 5,
    },
    {
      quote:
        lang === 'en'
          ? 'They showed up on time and finished early. Beautiful results.'
          : 'Llegaron a tiempo y terminaron temprano. Resultados hermosos.',
      author: lang === 'en' ? 'Carlos Rodriguez' : 'Carlos Rodríguez',
      rating: 5,
    },
    {
      quote:
        lang === 'en'
          ? 'Our walls look brand new. Worth every peso!'
          : '¡Nuestras paredes se ven como nuevas! ¡Vale la pena cada peso!',
      author: lang === 'en' ? 'Sofia Martinez' : 'Sofía Martínez',
      rating: 5,
    },
    {
      quote:
        lang === 'en'
          ? 'Excellent customer service and quality work. Very satisfied.'
          : 'Excelente servicio al cliente y trabajo de calidad. Muy satisfecho.',
      author: lang === 'en' ? 'Jorge Hernandez' : 'Jorge Hernández',
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="section-spacing bg-brand-bg">
      <div className="container-safe">
        {/* Section Header */}
        <SlideUpView>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text mb-4">
              {lang === 'en'
                ? 'What Our Customers Say'
                : 'Lo Que Dicen Nuestros Clientes'}
            </h2>
            <p className="text-lg text-brand-text-light max-w-2xl mx-auto">
              {lang === 'en'
                ? 'Real feedback from happy customers across Puerto Vallarta'
                : 'Comentarios reales de clientes satisfechos en Puerto Vallarta'}
            </p>
          </div>
        </SlideUpView>

        {/* Testimonials Grid */}
        <StaggerContainer delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </StaggerContainer>

        {/* Trust badges */}
        <SlideUpView delay={0.6}>
          <div className="mt-16 md:mt-20 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-accent">500+</p>
              <p className="text-sm text-brand-text-light">
                {lang === 'en' ? 'Happy Customers' : 'Clientes Felices'}
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-accent">4.9⭐</p>
              <p className="text-sm text-brand-text-light">
                {lang === 'en' ? 'Average Rating' : 'Calificación Promedio'}
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-brand-accent">20+</p>
              <p className="text-sm text-brand-text-light">
                {lang === 'en' ? 'Years Experience' : 'Años de Experiencia'}
              </p>
            </div>
          </div>
        </SlideUpView>
      </div>
    </section>
  )
}
