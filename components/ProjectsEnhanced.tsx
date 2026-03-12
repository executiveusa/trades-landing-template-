'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { getTenant } from '@/lib/tenant'
import { useLang } from '@/lib/lang'
import { motion } from 'framer-motion'
import { SlideUpView, StaggerContainer, StaggerItem } from './MotionPrimitives'

/**
 * Enhanced Before/After Gallery
 * Steve Krug Principle: "Make it obvious" - Clear visual feedback on interaction
 * Mobile-optimized: Touch-friendly slider, full-width on small screens
 */

function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    let x: number

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left
    } else {
      x = e.clientX - rect.left
    }

    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = useCallback(() => setIsDragging(false), [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove as any)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleMove as any)
      window.addEventListener('touchend', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMove as any)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('touchmove', handleMove as any)
        window.removeEventListener('touchend', handleMouseUp)
      }
    }
    return undefined
  }, [isDragging, handleMove, handleMouseUp])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-xl bg-brand-border cursor-ew-resize group shadow-2xl"
        onMouseMove={isDragging ? handleMove : undefined}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleMove}
      >
        {/* After image (background) - Cuba project finished */}
        <div className="relative w-full aspect-video bg-gray-900">
          <Image
            src="/cuba-project.jpg"
            alt="Professional plaster and finishing work - completed project"
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1000px"
          />
        </div>

        {/* Before image (overlay) - Placeholder with gradient - Smooth reveal */}
        <motion.div
          className="absolute inset-0 overflow-hidden aspect-video"
          style={{ width: `${sliderPosition}%` }}
          animate={{ width: `${sliderPosition}%` }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div className="w-screen h-full bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 flex items-center justify-center relative">
            <div className="text-center">
              <p className="text-white text-sm md:text-base font-bold opacity-90">
                Before Transformation
              </p>
              <p className="text-white text-xs md:text-sm opacity-70 mt-1">
                Original condition
              </p>
            </div>
          </div>
        </motion.div>

        {/* Animated slider handle */}
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl"
          style={{ left: `${sliderPosition}%` }}
          animate={{ left: `${sliderPosition}%` }}
          transition={{ type: 'spring', damping: 20 }}
        >
          {/* Handle icon */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 md:w-14 h-12 md:h-14 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-brand-accent hover:border-brand-accent/80"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex gap-1.5">
              <motion.div
                className="w-0.5 h-4 md:h-5 bg-brand-accent rounded-full"
                animate={{ x: isDragging ? -3 : 0 }}
              />
              <motion.div
                className="w-0.5 h-4 md:h-5 bg-brand-accent rounded-full"
                animate={{ x: isDragging ? 3 : 0 }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Labels - Mobile-friendly positioning */}
        <motion.p
          className="absolute bottom-2 md:bottom-4 left-2 md:left-4 text-white text-xs md:text-sm font-bold bg-black/50 backdrop-blur-sm px-2 md:px-3 py-1 md:py-1.5 rounded-lg pointer-events-none"
          animate={{ opacity: sliderPosition > 20 ? 1 : 0.5 }}
        >
          {isMobile ? '📷' : '📷 Before'}
        </motion.p>
        <motion.p
          className="absolute bottom-2 md:bottom-4 right-2 md:right-4 text-white text-xs md:text-sm font-bold bg-black/50 backdrop-blur-sm px-2 md:px-3 py-1 md:py-1.5 rounded-lg pointer-events-none"
          animate={{ opacity: sliderPosition < 80 ? 1 : 0.5 }}
        >
          {isMobile ? '📸' : '📸 After'}
        </motion.p>

        {/* Mobile helper text */}
        {isMobile && (
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-semibold bg-black/40 backdrop-blur-sm px-3 py-2 rounded pointer-events-none"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Swipe to compare
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex gap-1.5">
              <motion.div
                className="w-0.5 h-5 bg-brand-accent rounded-full"
                animate={{ x: isDragging ? -3 : 0 }}
              />
              <motion.div
                className="w-0.5 h-5 bg-brand-accent rounded-full"
                animate={{ x: isDragging ? 3 : 0 }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Labels -Mobile-friendly positioning */}
        <motion.p
          className="absolute bottom-4 left-4 text-white text-xs md:text-sm font-bold bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg pointer-events-none"
          animate={{ opacity: sliderPosition > 20 ? 1 : 0.5 }}
        >
          {isMobile ? '📷' : '📷 Before'}
        </motion.p>
        <motion.p
          className="absolute bottom-4 right-4 text-white text-xs md:text-sm font-bold bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg pointer-events-none"
          animate={{ opacity: sliderPosition < 80 ? 1 : 0.5 }}
        >
          {isMobile ? '📸' : '📸 After'}
        </motion.p>

        {/* Mobile helper text */}
        {isMobile && (
          <motion.div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs bg-black/30 px-3 py-1 rounded pointer-events-none" >
            Drag to compare
          </motion.div>
        )}
      </div>
    </SlideUpView>
  )
}

/**
 * Project card with hover and slide-in effects
 */
function ProjectCard({ title, description, index }: { title: string; description: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: 'easeOut',
        delay: index * 0.1
      }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <motion.div
        className="h-full p-4 md:p-6 rounded-xl bg-gradient-to-br from-brand-bg to-white border border-brand-border hover:border-brand-accent transition-all duration-300"
        whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      >
        <h3 className="text-base md:text-lg font-semibold text-brand-text mb-2">{title}</h3>
        <p className="text-sm text-brand-text-light leading-relaxed">{description}</p>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const tenant = getTenant()
  const { lang } = useLang()

  const projectsData = [
    {
      title: lang === 'en' ? 'Residential Finishes' : 'Acabados Residenciales',
      description: lang === 'en'
        ? 'Beautiful interior and exterior plaster work for homes'
        : 'Hermosos trabajos de yeso interior y exterior para hogares'
    },
    {
      title: lang === 'en' ? 'Commercial Properties' : 'Propiedades Comerciales',
      description: lang === 'en'
        ? 'Professional finishes for shops, offices, and restaurants'
        : 'Acabados profesionales para tiendas, oficinas y restaurantes'
    },
    {
      title: lang === 'en' ? 'Texture & Design' : 'Textura y Diseño',
      description: lang === 'en'
        ? 'Custom textures and artistic finishes for unique spaces'
        : 'Texturas personalizadas y acabados artísticos para espacios únicos'
    },
    {
      title: lang === 'en' ? 'Restoration Work' : 'Restauración',
      description: lang === 'en'
        ? 'Expert restoration of damaging or aged plaster'
        : 'Restauración experta de yeso dañado o envejecido'
    },
    {
      title: lang === 'en' ? 'Pool & Patio' : 'Piscina y Patio',
      description: lang === 'en'
        ? 'Weather-resistant finishes for outdoor spaces'
        : 'Acabados resistentes al clima para espacios al aire libre'
    },
    {
      title: lang === 'en' ? 'Special Effects' : 'Efectos Especiales',
      description: lang === 'en'
        ? 'Metallic, polished, and decorative finish techniques'
        : 'Técnicas de acabado metálico, pulido y decorativo'
    }
  ]

  return (
    <section id="projects" className="section-spacing bg-gradient-to-b from-white via-brand-bg to-white">
      <div className="container-safe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text mb-3 md:mb-4">
            {lang === 'en'
              ? 'See the Difference'
              : 'Ve la Diferencia'}
          </h2>
          <p className="text-base md:text-lg text-brand-text-light max-w-2xl mx-auto px-4">
            {lang === 'en'
              ? 'Slide to compare our work. Professional finishes that stand the test of time.'
              : 'Desliza para comparar nuestro trabajo. Acabados profesionales que resisten el paso del tiempo.'}
          </p>
        </motion.div>

        {/* Before/After Slider - Responsive */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <BeforeAfterSlider />
          <motion.p 
            className="text-center text-xs md:text-sm text-brand-text-light mt-3 md:mt-4 px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {lang === 'en'
              ? 'Drag the slider to compare (or touch to interact on mobile)'
              : 'Arrastra el control deslizante para comparar (o toca para interactuar en móvil)'}
          </motion.p>
        </div>

        {/* Gallery of project highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-brand-text mb-6 md:mb-8 px-4">
            {lang === 'en' ? 'Our Projects' : 'Proyectos de Calidad'}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-center bg-gradient-to-r from-brand-accent/10 to-brand-accent/5 rounded-xl p-6 md:p-8 lg:p-12 border border-brand-accent/20 mx-4 md:mx-0"
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-brand-text mb-3 md:mb-4">
            {lang === 'en'
              ? 'Ready to Transform Your Space?'
              : '¿Listo para transformar tu espacio?'}
          </h3>
          <p className="text-sm md:text-base text-brand-text-light mb-4 md:mb-6 max-w-xl mx-auto">
            {lang === 'en'
              ? 'Get a free quote today. No obligation.'
              : 'Obtén una cotización gratuita hoy. Sin compromiso.'}
          </p>
          <motion.a
            href="#contact"
            className="inline-block px-6 md:px-8 py-3 md:py-4 bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)' }}
            whileTap={{ scale: 0.98 }}
          >
            {lang === 'en' ? 'Get Free Quote' : 'Obtener Cotización Gratis'}
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
