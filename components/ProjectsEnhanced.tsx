'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang'

const jobsitePhotos = [
  { src: '/jobsite/photo1.jpg', es: 'Preparación alrededor de la instalación eléctrica', en: 'Surface preparation around the electrical installation' },
  { src: '/jobsite/photo2.jpg', es: 'Superficie afinada durante el trabajo', en: 'Surface smoothing during the work' },
  { src: '/jobsite/photo3.jpg', es: 'Reparación y preparación del plafón', en: 'Ceiling repair and preparation' },
  { src: '/jobsite/photo4.jpg', es: 'Detalle del avance en muro y plafón', en: 'Wall and ceiling progress detail' },
  { src: '/jobsite/photo6.jpg', es: 'Preparación de esquina y encuentro de superficies', en: 'Corner and surface-joint preparation' },
  { src: '/jobsite/photo10.jpg', es: 'Avance de acabado en el espacio', en: 'Finishing progress in the space' },
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
          className="max-w-3xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
            {lang === 'en' ? 'Work in progress' : 'Trabajo en proceso'}
          </p>
          <h2 className="text-3xl font-bold text-brand-text md:text-5xl">
            {lang === 'en' ? 'Real material from the job site.' : 'Material real de la obra.'}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-text-light md:text-lg">
            {lang === 'en'
              ? 'Preparation, repair and finishing details photographed during the work. These are progress photos, not a before-and-after comparison.'
              : 'Detalles de preparación, reparación y acabado fotografiados durante el trabajo. Son fotos de avance, no una comparación de antes y después.'}
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-3 md:gap-5">
          {jobsitePhotos.map((photo, index) => (
            <motion.figure
              key={photo.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              viewport={{ once: true, margin: '-40px' }}
              className="overflow-hidden rounded-xl border border-brand-border bg-brand-bg"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={photo.src}
                  alt={lang === 'en' ? photo.en : photo.es}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-3 py-3 text-xs leading-relaxed text-brand-text-light md:px-4 md:text-sm">
                {lang === 'en' ? photo.en : photo.es}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
