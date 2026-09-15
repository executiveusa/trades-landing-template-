'use client'

import { useLang } from '@/lib/lang'

export default function ServiceArea() {
  const { lang } = useLang()

  return (
    <section id="area" className="section-spacing border-y border-brand-border bg-white">
      <div className="container-safe">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-text-light">
              {lang === 'en' ? 'Service area' : 'Zona de trabajo'}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-brand-text md:text-5xl">
              Puerto Vallarta
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-lg leading-relaxed text-brand-text-light md:text-xl">
              {lang === 'en'
                ? 'For work in Puerto Vallarta, send the location and a photo of the wall or surface. Ray can confirm whether the job is a fit before you spend time arranging a visit.'
                : 'Para trabajos en Puerto Vallarta, envía la ubicación y una foto del muro o superficie. Ray puede confirmar primero si el trabajo encaja antes de que pierdas tiempo coordinando una visita.'}
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex min-h-11 items-center font-semibold text-brand-text underline decoration-brand-accent/50 underline-offset-4 transition hover:decoration-brand-accent"
            >
              {lang === 'en' ? 'Describe the job' : 'Describe el trabajo'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}