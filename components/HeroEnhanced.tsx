'use client'

import Image from 'next/image'
import { getTenant } from '@/lib/tenant'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { useLang } from '@/lib/lang'

export default function Hero() {
  const tenant = getTenant()
  const { lang } = useLang()
  const message = lang === 'en' ? tenant.whatsappMessage_en || tenant.whatsappMessage : tenant.whatsappMessage
  const whatsappLink = buildWhatsAppLink(tenant.whatsappNumber, message)

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-neutral-950 text-white">
      <Image
        src="/ray-hero.jpg"
        alt={lang === 'en' ? 'Plaster and finishing work in Puerto Vallarta' : 'Trabajo de yeso y acabados en Puerto Vallarta'}
        fill
        sizes="100vw"
        className="object-cover object-[58%_center] sm:object-center"
        priority
        quality={82}
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/80" />

      <div className="container-safe relative z-10 flex min-h-[100svh] items-end pb-10 pt-28 sm:pb-14 md:pb-20 lg:pb-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/75 md:text-sm">
            Ray · Puerto Vallarta, Jalisco
          </p>

          <h1 className="max-w-3xl text-[2.55rem] font-semibold leading-[0.98] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {lang === 'en' ? 'Plaster and finishes in Puerto Vallarta' : 'Yeso y acabados en Puerto Vallarta'}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:mt-6 md:text-xl">
            {lang === 'en'
              ? 'Plaster, surface repair and clean finishes for homes and businesses in Puerto Vallarta.'
              : 'Yeso, reparación de superficies y acabados limpios para casas y negocios en Puerto Vallarta.'}
          </p>

          <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:items-center">
            <a
              href={whatsappLink}
              target={whatsappLink.startsWith('https://') ? '_blank' : undefined}
              rel={whatsappLink.startsWith('https://') ? 'noopener noreferrer' : undefined}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {lang === 'en' ? 'Quote on WhatsApp' : 'Cotizar por WhatsApp'}
            </a>
            <a
              href="#services"
              className="inline-flex min-h-12 items-center justify-center px-4 py-3 text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
            >
              {lang === 'en' ? 'See services' : 'Ver servicios'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}