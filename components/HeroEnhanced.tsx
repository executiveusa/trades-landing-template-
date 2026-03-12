'use client'

import Link from 'next/link'
import Image from 'next/image'
import { getTenant } from '@/lib/tenant'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { useLang } from '@/lib/lang'
import { FadeInView, SlideUpView, TextReveal } from './MotionPrimitives'

/**
 * Steve Krug Principle: "Your primary job is not to design something pretty,
 * it's to get them from point A to point B without confusion"
 *
 * This hero uses:
 * - Clear hierarchy: Image, headline, subtext, CTAs
 * - Minimal cognitive load: Trust indicators, simple choices
 * - Mobile-first responsive design
 * - Accessible color contrast and spacing
 */

export default function Hero() {
  const tenant = getTenant()
  const { lang } = useLang()
  const cta2Text = lang === 'en' ? tenant.hero.cta2_en || tenant.hero.cta2 : tenant.hero.cta2
  const whatsappLink = buildWhatsAppLink(tenant.whatsappNumber, cta2Text)

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Background image container - MUST be relative for Image fill to work */}
      <div className="absolute inset-0 w-full h-full">
        {/* Desktop: Full image background */}
        <div className="hidden md:block relative w-full h-full">
          <Image
            src="/cuba-hero.jpg"
            alt="Premium plaster finishing work - Cuba destination"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
            quality={90}
          />
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-black/40 md:bg-black/35" />
        </div>

        {/* Mobile: Gradient fallback */}
        <div className="md:hidden w-full h-full bg-gradient-to-b from-brand-accent/30 via-brand-bg to-brand-text/40" />
      </div>

      {/* Content layer - centered on page */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center">
        <div className="container-safe w-full px-4 md:px-0">
          {/* Center all content */}
          <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
            
            {/* Headline */}
            <FadeInView>
              <div className="space-y-4 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                  <TextReveal
                    text={
                      lang === 'en'
                        ? tenant.hero.h1_en || tenant.hero.h1
                        : tenant.hero.h1
                    }
                    delay={0.1}
                  />
                </h1>
                
                {/* Subheading */}
                <SlideUpView delay={0.2}>
                  <p className="text-lg md:text-xl text-gray-100 leading-relaxed drop-shadow-md">
                    {lang === 'en'
                      ? tenant.hero.subhead_en || tenant.hero.subhead
                      : tenant.hero.subhead}
                  </p>
                </SlideUpView>
              </div>
            </FadeInView>

            {/* Trust indicators - Centered */}
            <SlideUpView delay={0.3}>
              <div className="flex flex-col gap-3 text-sm md:text-base text-gray-100 text-center">
                <div className="flex items-center justify-center gap-2 drop-shadow-md">
                  <svg className="w-5 h-5 text-brand-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{lang === 'en' ? 'No-obligation quotes' : 'Ofertas sin compromiso'}</span>
                </div>
                <div className="flex items-center justify-center gap-2 drop-shadow-md">
                  <svg className="w-5 h-5 text-brand-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{lang === 'en' ? '24-hour response time' : 'Respuesta dentro de 24 horas'}</span>
                </div>
                <div className="flex items-center justify-center gap-2 drop-shadow-md">
                  <svg className="w-5 h-5 text-brand-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{lang === 'en' ? 'Certified professionals' : 'Profesionales certificados'}</span>
                </div>
              </div>
            </SlideUpView>

            {/* CTAs - Centered */}
            <SlideUpView delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {/* Primary CTA */}
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 drop-shadow-lg"
                >
                  {lang === 'en' ? tenant.hero.cta1_en || tenant.hero.cta1 : tenant.hero.cta1}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

                {/* Secondary CTA - WhatsApp */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-brand-accent font-semibold rounded-lg transition-all duration-300 hover:shadow-lg drop-shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.55 2.46-5.555 6.5-5.555 11.098 0 1.713.305 3.39.904 5.005l-1.413 5.167 5.31-1.397c1.541.896 3.34 1.367 5.154 1.367 5.816 0 10.55-4.735 10.55-10.55 0-2.821-1.117-5.475-3.15-7.46-2.034-1.986-4.731-3.08-7.565-3.08z"/>
                  </svg>
                  {cta2Text}
                </a>
              </div>
            </SlideUpView>

            {/* Social proof */}
            <SlideUpView delay={0.5}>
              <p className="text-sm text-gray-200 italic drop-shadow-md text-center">
                {lang === 'en'
                  ? 'Join 500+ satisfied customers in Puerto Vallarta'
                  : 'Únete a más de 500 clientes satisfechos en Puerto Vallarta'}
              </p>
            </SlideUpView>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Mobile friendly */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <svg
          className="w-6 h-6 text-white animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
