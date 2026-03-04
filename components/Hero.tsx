'use client'

import Link from 'next/link'
import { getTenant } from '@/lib/tenant'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { useLang } from '@/lib/lang'

export default function Hero() {
  const tenant = getTenant()
  const { lang } = useLang()
  const cta2Text = lang === 'en' ? tenant.hero.cta2_en || tenant.hero.cta2 : tenant.hero.cta2
  const whatsappLink = buildWhatsAppLink(tenant.whatsappNumber, cta2Text)

  return (
    <section className="min-h-screen pt-20 pb-20 flex items-center bg-gradient-to-b from-brand-bg to-white">
      <div className="container-safe">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-brand-text">
                {lang === 'en' ? tenant.hero.h1_en || tenant.hero.h1 : tenant.hero.h1}
              </h1>
              <p className="text-lg text-brand-text-light leading-relaxed max-w-xl">
                {lang === 'en' ? tenant.hero.subhead_en || tenant.hero.subhead : tenant.hero.subhead}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="#contact" className="btn-primary">
                {lang === 'en' ? tenant.hero.cta1_en || tenant.hero.cta1 : tenant.hero.cta1}
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                {cta2Text}
              </a>
            </div>

            {/* Trust line */}
            <p className="text-sm text-brand-text-light pt-4">
              {lang === 'en'
                ? '✓ No‑obligation quotes • ✓ 24h response • ✓ Certified professionals'
                : '✓ Ofertas sin compromiso • ✓ Respuesta en 24 hs • ✓ Profesionales certificados'}
            </p>
          </div>

          {/* Right: Placeholder media */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-full aspect-square bg-gradient-to-br from-brand-accent/10 to-brand-accent/5 rounded-lg border border-brand-border flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">🏗️</div>
                <p className="text-brand-text-light">Proyectos de Calidad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
