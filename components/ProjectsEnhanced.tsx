'use client'

import { useState, useRef, useEffect } from 'react'
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

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
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
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

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
  }, [isDragging])

  return (
    <SlideUpView>
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-xl bg-brand-border cursor-ew-resize group shadow-lg"
        onMouseMove={isDragging ? handleMove : undefined}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleMove}
      >
        {/* After image (background) */}
        <div className="relative w-full aspect-video bg-gray-200">
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 font-semibold">
            📸 After - Finished Work
          </div>
        </div>

        {/* Before image (overlay) - Smooth reveal */}
        <motion.div
          className="absolute inset-0 overflow-hidden aspect-video"
          style={{ width: `${sliderPosition}%` }}
          animate={{ width: `${sliderPosition}%` }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div className="w-screen h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-gray-500 font-semibold">
            📷 Before - Original State
          </div>
        </motion.div>

        {/* Animated slider handle */}
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-xl"
          style={{ left: `${sliderPosition}%` }}
          animate={{ left: `${sliderPosition}%` }}
          transition={{ type: 'spring', damping: 20 }}
        >
          {/* Handle icon */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-brand-accent hover:border-brand-accent/80"
            whileHover={{ scale: 1.1 }}
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
 * Project card with hover effects
 */
function ProjectCard({ title, description }: { title: string; description: string }) {
  return (
    <StaggerItem>
      <motion.div
        className="p-6 rounded-xl bg-gradient-to-br from-brand-bg to-white border border-brand-border hover:border-brand-accent transition-all duration-300"
        whileHover={{ y: -4 }}
      >
        <h3 className="text-lg font-semibold text-brand-text mb-2">{title}</h3>
        <p className="text-sm text-brand-text-light">{description}</p>
      </motion.div>
    </StaggerItem>
  )
}

export default function Projects() {
  const tenant = getTenant()
  const { lang } = useLang()

  return (
    <section id="projects" className="section-spacing bg-gradient-to-b from-white via-brand-bg to-white">
      <div className="container-safe">
        <SlideUpView>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text mb-4">
              {lang === 'en'
                ? 'See the Difference'
                : 'Ve la Diferencia'}
            </h2>
            <p className="text-lg text-brand-text-light max-w-2xl mx-auto">
              {lang === 'en'
                ? 'Slide to compare our work. Professional finishes that stand the test of time.'
                : 'Desliza para comparar nuestro trabajo. Acabados profesionales que resisten el paso del tiempo.'}
            </p>
          </div>
        </SlideUpView>

        {/* Before/After Slider - Responsive */}
        <div className="mb-16 md:mb-20">
          <BeforeAfterSlider />
          <p className="text-center text-sm text-brand-text-light mt-4">
            {lang === 'en'
              ? 'Drag the slider to compare (or touch to interact on mobile)'
              : 'Arrastra el control deslizante para comparar (o toca para interactuar en móvil)'}
          </p>
        </div>

        {/* Gallery of project highlights */}
        <SlideUpView>
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-brand-text mb-8">
              {lang === 'en' ? 'Our Projects' : 'Nuestros Proyectos'}
            </h3>
            
            <StaggerContainer>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProjectCard
                  title={lang === 'en' ? 'Residential Finishes' : 'Acabados Residenciales'}
                  description={lang === 'en'
                    ? 'Beautiful interior and exterior plaster work for homes'
                    : 'Hermosos trabajos de yeso interior y exterior para hogares'}
                />
                <ProjectCard
                  title={lang === 'en' ? 'Commercial Properties' : 'Propiedades Comerciales'}
                  description={lang === 'en'
                    ? 'Professional finishes for shops, offices, and restaurants'
                    : 'Acabados profesionales para tiendas, oficinas y restaurantes'}
                />
                <ProjectCard
                  title={lang === 'en' ? 'Texture & Design' : 'Textura y Diseño'}
                  description={lang === 'en'
                    ? 'Custom textures and artistic finishes for unique spaces'
                    : 'Texturas personalizadas y acabados artísticos para espacios únicos'}
                />
                <ProjectCard
                  title={lang === 'en' ? 'Restoration Work' : 'Restauración'}
                  description={lang === 'en'
                    ? 'Expert restoration of damaging or aged plaster'
                    : 'Restauración experta de yeso dañado o envejecido'}
                />
                <ProjectCard
                  title={lang === 'en' ? 'Pool & Patio' : 'Piscina y Patio'}
                  description={lang === 'en'
                    ? 'Weather-resistant finishes for outdoor spaces'
                    : 'Acabados resistentes al clima para espacios al aire libre'}
                />
                <ProjectCard
                  title={lang === 'en' ? 'Special Effects' : 'Efectos Especiales'}
                  description={lang === 'en'
                    ? 'Metallic, polished, and decorative finish techniques'
                    : 'Técnicas de acabado metálico, pulido y decorativo'}
                />
              </div>
            </StaggerContainer>
          </div>
        </SlideUpView>

        {/* CTA */}
        <SlideUpView>
          <div className="text-center bg-gradient-to-r from-brand-accent/10 to-brand-accent/5 rounded-xl p-8 md:p-12 border border-brand-accent/20">
            <h3 className="text-2xl md:text-3xl font-bold text-brand-text mb-4">
              {lang === 'en'
                ? 'Ready to Transform Your Space?'
                : '¿Listo para transformar tu espacio?'}
            </h3>
            <p className="text-brand-text-light mb-6">
              {lang === 'en'
                ? 'Get a free quote today. No obligation.'
                : 'Obtén una cotización gratuita hoy. Sin compromiso.'}
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              {lang === 'en' ? 'Get Free Quote' : 'Obtener Cotización Gratis'}
            </a>
          </div>
        </SlideUpView>
      </div>
    </section>
  )
}
