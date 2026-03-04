'use client'

import { useState, useRef, useEffect } from 'react'
import { getTenant } from '@/lib/tenant'
import { useLang } from '@/lib/lang'

function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

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
      return () => {
        window.removeEventListener('mousemove', handleMove as any)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
    return undefined
  }, [isDragging, handleMove, handleMouseUp])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-lg bg-brand-border cursor-ew-resize group"
      onMouseMove={isDragging ? handleMove : undefined}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleMove}
    >
      {/* After image (background) */}
      <div className="relative w-full aspect-video bg-gray-100">
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
          [After Image]
        </div>
      </div>

      {/* Before image (overlay) */}
      <div
        className="absolute inset-0 overflow-hidden aspect-video"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
          [Before Image]
        </div>
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-brand-accent" />
            <div className="w-0.5 h-4 bg-brand-accent" />
          </div>
        </div>
      </div>

      <p className="absolute bottom-4 left-4 text-white text-sm font-medium bg-black/30 px-3 py-1 rounded">
        Antes
      </p>
      <p className="absolute bottom-4 right-4 text-white text-sm font-medium bg-black/30 px-3 py-1 rounded">
        Después
      </p>
    </div>
  )
}

export default function Projects() {
  const tenant = getTenant()
  const { lang } = useLang()

  return (
    <section id="projects" className="section-spacing bg-brand-bg">
      <div className="container-safe">
        <div className="text-center mb-12">
          <h2 className="text-brand-text">
            {lang === 'en' ? 'Featured Projects' : 'Proyectos Destacados'}
          </h2>
          <p className="text-lg text-brand-text-light mt-4 max-w-2xl mx-auto">
            {lang === 'en'
              ? 'See before-and-after of our recent work in Puerto Vallarta.'
              : 'Mira antes y después de nuestros trabajos recientes en Puerto Vallarta.'}
          </p>
        </div>

        {/* Featured projects with sliders */}
        <div className="space-y-12 mb-16">
          {tenant.projects.map((project) => (
            <div key={project.id} className="grid md:grid-cols-2 gap-8 items-center">
              {/* Slider */}
              <div>
                <BeforeAfterSlider />
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-brand-text">{project.title}</h3>
                <p className="text-brand-text-light leading-relaxed">
                  {project.description}
                </p>
                <div className="pt-4">
                  <a href="#contact" className="btn-secondary btn-sm">
                    {lang === 'en' ? 'Similar Project' : 'Proyecto Similar'}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional thumbnail grid */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-brand-text mb-8">
            {lang === 'en' ? 'More of Our Work' : 'Más de Nuestro Trabajo'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gradient-to-br from-brand-accent/10 to-brand-accent/5 border border-brand-border flex items-center justify-center hover:shadow-sm transition-shadow"
              >
                <div className="text-center text-gray-400">
                  <div className="text-3xl mb-2">📷</div>
                  <span className="text-sm">
                    {lang === 'en' ? `Project ${i}` : `Proyecto ${i}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
