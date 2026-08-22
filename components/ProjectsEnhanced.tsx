'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang'

function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, next)))
  }, [])

  useEffect(() => {
    if (!isDragging) return

    const onMouseMove = (event: MouseEvent) => updatePosition(event.clientX)
    const onMouseUp = () => setIsDragging(false)
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (touch) updatePosition(touch.clientX)
    }
    const onTouchEnd = () => setIsDragging(false)

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [isDragging, updatePosition])

  return (
    <div
      ref={containerRef}
      className="relative aspect-video overflow-hidden rounded-xl bg-neutral-900 shadow-xl cursor-ew-resize select-none"
      onMouseDown={(event) => {
        setIsDragging(true)
        updatePosition(event.clientX)
      }}
      onTouchStart={(event) => {
        setIsDragging(true)
        const touch = event.touches[0]
        if (touch) updatePosition(touch.clientX)
      }}
      onTouchMove={(event) => {
        const touch = event.touches[0]
        if (touch) updatePosition(touch.clientX)
      }}
      role="img"
      aria-label="Comparador visual de antes y después"
    >
      <Image
        src="/cuba-project.jpg"
        alt="Trabajo de yeso y acabados terminado"
        fill
        className="object-cover"
        priority
        quality={85}
        sizes="(max-width: 1024px) 100vw, 1100px"
      />

      <div
        className="absolute inset-y-0 left-0 overflow-hidden bg-neutral-700"
        style={{ width: `${sliderPosition}%` }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
          <div className="px-6 text-center text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em]">Antes</p>
            <p className="mt-2 text-xs text-white/70">Foto real pendiente de verificación</p>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-y-0 w-px bg-white shadow-lg"
        style={{ left: `${sliderPosition}%` }}
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-900 shadow-xl">
          <span className="text-lg">↔</span>
        </div>
      </div>

      <span className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        Antes
      </span>
      <span className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        Después
      </span>
    </div>
  )
}

const projectTypes = [
  {
    es: 'Acabados residenciales',
    en: 'Residential finishes',
    esDescription: 'Yeso, aplanados y acabados interiores y exteriores para viviendas.',
    enDescription: 'Plaster, smoothing and interior or exterior finishing for homes.',
  },
  {
    es: 'Reparación y restauración',
    en: 'Repair and restoration',
    esDescription: 'Corrección de superficies dañadas, grietas y acabados deteriorados.',
    enDescription: 'Repair of damaged surfaces, cracks and deteriorated finishes.',
  },
  {
    es: 'Texturas y detalle',
    en: 'Texture and detail',
    esDescription: 'Acabados decorativos y detalles hechos a mano para espacios especiales.',
    enDescription: 'Decorative finishes and hand-worked details for distinctive spaces.',
  },
]

export default function Projects() {
  const { lang } = useLang()

  return (
    <section id="projects" className="section-spacing bg-white">
      <div className="container-safe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
            {lang === 'en' ? 'The work' : 'El trabajo'}
          </p>
          <h2 className="text-3xl font-bold text-brand-text md:text-5xl">
            {lang === 'en' ? 'The finish should speak for itself.' : 'El acabado debe hablar por sí solo.'}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-text-light md:text-lg">
            {lang === 'en'
              ? 'This gallery is being rebuilt around verified project photography. No stock before-and-after claims will ship.'
              : 'Esta galería se está reconstruyendo con fotografías verificadas de trabajos reales. No se publicarán comparaciones de banco de imágenes.'}
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <BeforeAfterSlider />
          <p className="mt-3 text-center text-xs text-brand-text-light">
            {lang === 'en' ? 'Drag to compare.' : 'Arrastra para comparar.'}
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
          {projectTypes.map((project) => (
            <article key={project.es} className="border-t border-brand-border pt-5">
              <h3 className="text-lg font-semibold text-brand-text">
                {lang === 'en' ? project.en : project.es}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-text-light">
                {lang === 'en' ? project.enDescription : project.esDescription}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
