'use client'

import { useLang } from '@/lib/lang'

const services = [
  {
    es: 'Yeso y aplanados',
    en: 'Plaster and smoothing',
    esDescription: 'Preparación, nivelación y acabado de muros interiores y exteriores.',
    enDescription: 'Preparation, leveling and finishing for interior and exterior walls.',
  },
  {
    es: 'Reparación de superficies',
    en: 'Surface repair',
    esDescription: 'Corrección de grietas, zonas dañadas y superficies que necesitan preparación antes del acabado.',
    enDescription: 'Repair of cracks, damaged areas and surfaces that need proper preparation before finishing.',
  },
  {
    es: 'Acabados decorativos',
    en: 'Decorative finishes',
    esDescription: 'Texturas y detalles hechos a mano para muros que requieren un acabado especial.',
    enDescription: 'Hand-worked textures and details for walls that call for a distinctive finish.',
  },
  {
    es: 'Interiores y exteriores',
    en: 'Interior and exterior work',
    esDescription: 'Trabajo para casas, condominios, comercios y espacios en renovación.',
    enDescription: 'Work for homes, condominiums, businesses and spaces undergoing renovation.',
  },
]

export default function Services() {
  const { lang } = useLang()

  return (
    <section id="services" className="section-spacing bg-brand-bg">
      <div className="container-safe">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-text-light">
              {lang === 'en' ? 'Services' : 'Servicios'}
            </p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-[-0.025em] text-brand-text md:text-5xl">
              {lang === 'en' ? 'Start with the surface. Finish with the detail.' : 'Primero la superficie. Después, el detalle.'}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-brand-text-light">
              {lang === 'en'
                ? 'Ray reviews the condition of the wall first, then recommends the repair, preparation and finish the job actually needs.'
                : 'Ray revisa primero el estado del muro y después recomienda la reparación, preparación y acabado que realmente necesita el trabajo.'}
            </p>
          </div>

          <div className="border-t border-brand-border">
            {services.map((service, index) => (
              <article key={service.es} className="grid gap-2 border-b border-brand-border py-6 md:grid-cols-[3rem_1fr] md:gap-5 md:py-7">
                <span className="text-sm tabular-nums text-brand-text-light">0{index + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.01em] text-brand-text">
                    {lang === 'en' ? service.en : service.es}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-text-light md:text-base">
                    {lang === 'en' ? service.enDescription : service.esDescription}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}