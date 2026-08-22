'use client'

import { useLang } from '@/lib/lang'

const services = [
  {
    es: 'Yeso y aplanados',
    en: 'Plaster and smoothing',
    esDescription: 'Preparación y acabado de muros interiores y exteriores con atención al plano, textura y detalle.',
    enDescription: 'Interior and exterior wall preparation and finishing with close attention to plane, texture and detail.',
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
    esDescription: 'Texturas y acabados hechos a mano para muros que requieren un resultado más especial.',
    enDescription: 'Hand-worked textures and finishes for walls that call for a more distinctive result.',
  },
  {
    es: 'Interiores y exteriores',
    en: 'Interior and exterior work',
    esDescription: 'Trabajo para casas, condominios, comercios y espacios en proceso de renovación.',
    enDescription: 'Work for homes, condominiums, businesses and spaces undergoing renovation.',
  },
  {
    es: 'Trabajo a la medida',
    en: 'Custom work',
    esDescription: 'Cada superficie se revisa antes de recomendar el proceso y acabado apropiados.',
    enDescription: 'Each surface is reviewed before recommending the appropriate process and finish.',
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
              {lang === 'en' ? 'Good plaster work starts with the surface.' : 'Un buen acabado empieza con la superficie.'}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-brand-text-light">
              {lang === 'en'
                ? 'The site is intentionally focused on the work Ray actually wants to sell—not a catalog of generic contractor services.'
                : 'El sitio está enfocado en el trabajo que Ray realmente quiere vender, no en un catálogo genérico de servicios de contratista.'}
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
