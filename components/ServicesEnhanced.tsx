'use client'

import { getTenant } from '@/lib/tenant'
import { useLang } from '@/lib/lang'
import { motion } from 'framer-motion'
import { SlideUpView, StaggerContainer, StaggerItem } from './MotionPrimitives'

/**
 * Services Component
 * Steve Krug Principle: Show, don't tell
 * Clear icons, short descriptions, mobile-responsive grid
 */

interface ServiceItem {
  icon: string
  title: string
  description: string
}

function ServiceCard({ service, delay }: { service: ServiceItem; delay?: number }) {
  return (
    <StaggerItem>
      <motion.div
        className="group p-6 md:p-8 rounded-xl bg-white border border-brand-border hover:border-brand-accent hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -8 }}
      >
        {/* Icon container */}
        <motion.div
          className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-brand-accent/20 to-brand-accent/5 flex items-center justify-center mb-4 group-hover:from-brand-accent/30 group-hover:to-brand-accent/10 transition-all"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <span className="text-3xl md:text-4xl">{service.icon}</span>
        </motion.div>

        {/* Content */}
        <h3 className="text-lg md:text-xl font-bold text-brand-text mb-2 group-hover:text-brand-accent transition-colors">
          {service.title}
        </h3>
        <p className="text-sm md:text-base text-brand-text-light leading-relaxed">
          {service.description}
        </p>

        {/* Hover indicator */}
        <motion.div
          className="mt-4 h-1 bg-brand-accent rounded-full"
          initial={{ width: 0 }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </StaggerItem>
  )
}

export default function Services() {
  const tenant = getTenant()
  const { lang } = useLang()

  const services: ServiceItem[] = [
    {
      icon: '🎨',
      title: lang === 'en' ? 'Aesthetic Finishes' : 'Acabados Estéticos',
      description:
        lang === 'en'
          ? 'Beautiful decorative plaster finishes that transform your spaces'
          : 'Hermosos acabados de yeso decorativos que transforman tus espacios',
    },
    {
      icon: '🔧',
      title: lang === 'en' ? 'Repair & Restoration' : 'Reparación y Restauración',
      description:
        lang === 'en'
          ? 'Expert damage repair and restoration of existing plaster work'
          : 'Reparación de daños experta y restauración de trabajo de yeso existente',
    },
    {
      icon: '🏗️',
      title: lang === 'en' ? 'New Construction' : 'Nueva Construcción',
      description:
        lang === 'en'
          ? 'Professional plaster installation for new building projects'
          : 'Instalación profesional de yeso para proyectos de nueva construcción',
    },
    {
      icon: '💧',
      title: lang === 'en' ? 'Weather Protection' : 'Protección Climática',
      description:
        lang === 'en'
          ? 'Moisture-resistant finishes for humid Puerto Vallarta climate'
          : 'Acabados resistentes a la humedad para el clima húmedo de Puerto Vallarta',
    },
    {
      icon: '💡',
      title: lang === 'en' ? 'Custom Designs' : 'Diseños Personalizados',
      description:
        lang === 'en'
          ? 'Unique artistic finishes tailored to your vision'
          : 'Acabados artísticos únicos adaptados a tu visión',
    },
    {
      icon: '⚡',
      title: lang === 'en' ? 'Quick Turnaround' : 'Entrega Rápida',
      description:
        lang === 'en'
          ? '24-hour response, efficient project completion'
          : 'Respuesta en 24 horas, finalización eficiente del proyecto',
    },
  ]

  return (
    <section id="services" className="section-spacing bg-gradient-to-b from-brand-bg via-white to-brand-bg">
      <div className="container-safe">
        {/* Section Header */}
        <SlideUpView>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text mb-4">
              {lang === 'en' ? 'What We Offer' : 'Lo Que Ofrecemos'}
            </h2>
            <p className="text-lg text-brand-text-light max-w-2xl mx-auto">
              {lang === 'en'
                ? 'Comprehensive plaster and finishing solutions for every project'
                : 'Soluciones completas de yeso y acabados para cada proyecto'}
            </p>
          </div>
        </SlideUpView>

        {/* Services Grid */}
        <StaggerContainer delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} delay={index * 0.1} />
            ))}
          </div>
        </StaggerContainer>

        {/* Bottom CTA */}
        <SlideUpView delay={0.6}>
          <div className="mt-16 md:mt-20 text-center">
            <div className="inline-block p-6 md:p-8 rounded-xl bg-gradient-to-r from-brand-accent/5 to-brand-accent/10 border border-brand-accent/20">
              <p className="text-brand-text-light mb-4">
                {lang === 'en'
                  ? "Don't see what you need? We offer custom solutions."
                  : '¿No ves lo que necesitas? Ofrecemos soluciones personalizadas.'}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                {lang === 'en' ? 'Tell Us Your Project' : 'Cuéntanos Tu Proyecto'}
              </a>
            </div>
          </div>
        </SlideUpView>
      </div>
    </section>
  )
}
