'use client'

import { useState } from 'react'
import { getTenant } from '@/lib/tenant'
import { buildWhatsAppLink, isWhatsAppConfigured } from '@/lib/whatsapp'
import { useLang } from '@/lib/lang'

type FormData = {
  zona: string
  descripcion: string
}

export default function Contact() {
  const tenant = getTenant()
  const { lang } = useLang()
  const whatsappReady = isWhatsAppConfigured(tenant.whatsappNumber)
  const [formData, setFormData] = useState<FormData>({ zona: '', descripcion: '' })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!whatsappReady) return

    const message = lang === 'en'
      ? [
          'Hi Ray, I saw your website and would like a quote.',
          `Area: ${formData.zona}`,
          `Work needed: ${formData.descripcion}`,
        ].join('\n')
      : [
          'Hola Ray, vi tu página y quisiera una cotización.',
          `Zona: ${formData.zona}`,
          `Trabajo: ${formData.descripcion}`,
        ].join('\n')

    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'quote_whatsapp_click', {
        language: lang,
        service_area: formData.zona,
      })
    }

    const whatsappLink = buildWhatsAppLink(tenant.whatsappNumber, message, formData.zona)
    window.open(whatsappLink, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contact" className="section-spacing bg-neutral-950 text-white">
      <div className="container-safe">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
              {lang === 'en' ? 'Request a quote' : 'Solicita una cotización'}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-white md:text-5xl">
              {lang === 'en' ? 'Show Ray what needs work.' : 'Muéstrale a Ray qué necesitas.'}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
              {lang === 'en'
                ? 'Tell him where the job is and what is happening. WhatsApp opens with the message prepared so you can add photos before sending.'
                : 'Dile dónde está el trabajo y qué está pasando. WhatsApp se abre con el mensaje preparado para que agregues fotos antes de enviarlo.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div>
              <label htmlFor="zona" className="mb-2 block text-sm font-medium text-white/80">
                {lang === 'en' ? 'Neighborhood or area' : 'Colonia o zona'}
              </label>
              <input
                id="zona"
                name="zona"
                type="text"
                value={formData.zona}
                onChange={handleChange}
                required
                autoComplete="address-level3"
                className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3.5 text-base text-white outline-none transition placeholder:text-white/30 focus:border-white/50 focus:ring-2 focus:ring-white/15"
                placeholder={lang === 'en' ? 'e.g. Versalles' : 'Ej. Versalles'}
              />
            </div>

            <div>
              <label htmlFor="descripcion" className="mb-2 block text-sm font-medium text-white/80">
                {lang === 'en' ? 'What needs attention?' : '¿Qué necesita atención?'}
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                rows={5}
                className="w-full resize-y rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3.5 text-base text-white outline-none transition placeholder:text-white/30 focus:border-white/50 focus:ring-2 focus:ring-white/15"
                placeholder={lang === 'en' ? 'Cracks, damaged plaster, a new finish...' : 'Grietas, yeso dañado, un acabado nuevo...'}
              />
            </div>

            <button
              type="submit"
              disabled={!whatsappReady}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-neutral-950 transition enabled:hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {lang === 'en' ? 'Continue on WhatsApp' : 'Continuar en WhatsApp'}
            </button>

            <p className="text-center text-xs leading-relaxed text-white/45">
              {lang === 'en'
                ? 'You review the message in WhatsApp before anything is sent.'
                : 'Revisas el mensaje en WhatsApp antes de enviar nada.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}