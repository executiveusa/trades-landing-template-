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
    <section className="relative min-h-[92vh] overflow-hidden bg-neutral-950 text-white">
      <Image
        src="/cuba-hero.jpg"
        alt={lang === 'en' ? 'Plaster and finishing work in Puerto Vallarta' : 'Trabajo de yeso y acabados en Puerto Vallarta'}
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
        quality={88}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />

      <div className="container-safe relative z-10 flex min-h-[92vh] items-end pb-16 pt-28 md:pb-20 lg:pb-24">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-white/75 md:text-sm">
            Puerto Vallarta · Jalisco
          </p>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-white md:text-6xl lg:text-7xl">
            {lang === 'en' ? 'Ray — master plasterer in Puerto Vallarta.' : 'Ray — maestro yesero en Puerto Vallarta.'}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-xl">
            {lang === 'en'
              ? 'Plaster, surface repair and hand-finished details for homes and businesses across the bay.'
              : 'Yeso, reparación de superficies y acabados hechos a mano para casas y negocios en la bahía.'}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
            >
              {lang === 'en' ? 'See the work' : 'Ver trabajos'}
            </a>
            <a
              href={whatsappLink}
              target={whatsappLink.startsWith('https://') ? '_blank' : undefined}
              rel={whatsappLink.startsWith('https://') ? 'noopener noreferrer' : undefined}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/55 bg-black/20 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-950"
            >
              {lang === 'en' ? 'Quote on WhatsApp' : 'Cotizar por WhatsApp'}
            </a>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-white/60">
            {lang === 'en'
              ? 'Portfolio and customer proof are published only after verification.'
              : 'El portafolio y los testimonios se publican únicamente después de ser verificados.'}
          </p>
        </div>
      </div>
    </section>
  )
}
