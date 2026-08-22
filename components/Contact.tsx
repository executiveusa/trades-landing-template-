'use client'

import { useState } from 'react'
import { getTenant } from '@/lib/tenant'
import { buildWhatsAppLink, isWhatsAppConfigured } from '@/lib/whatsapp'
import { useLang } from '@/lib/lang'

type FormData = {
  nombre: string
  telefono: string
  zona: string
  descripcion: string
}

export default function Contact() {
  const tenant = getTenant()
  const { lang } = useLang()
  const whatsappReady = isWhatsAppConfigured(tenant.whatsappNumber)
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    telefono: '',
    zona: '',
    descripcion: '',
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!whatsappReady) return

    const message = lang === 'en'
      ? [
          'Hi Ray, I saw your website and would like a quote.',
          `Name: ${formData.nombre}`,
          `Area: ${formData.zona}`,
          formData.telefono ? `Phone: ${formData.telefono}` : null,
          `Work needed: ${formData.descripcion}`,
        ].filter(Boolean).join('\n')
      : [
          'Hola Ray, vi tu página y quisiera una cotización.',
          `Nombre: ${formData.nombre}`,
          `Zona: ${formData.zona}`,
          formData.telefono ? `Teléfono: ${formData.telefono}` : null,
          `Trabajo: ${formData.descripcion}`,
        ].filter(Boolean).join('\n')

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
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
              {lang === 'en' ? 'Tell Ray what needs work.' : 'Cuéntale a Ray qué necesitas.'}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
              {lang === 'en'
                ? 'Send the location and a short description. The request opens directly in WhatsApp so you can also attach photos of the wall or surface.'
                : 'Envía la zona y una descripción breve. La solicitud se abre directamente en WhatsApp para que también puedas adjuntar fotos de la pared o superficie.'}
            </p>

            {!whatsappReady ? (
              <div className="mt-6 rounded-xl border border-amber-300/30 bg-amber-200/10 p-4 text-sm leading-relaxed text-amber-100">
                {lang === 'en'
                  ? 'Preview safety: Ray’s real WhatsApp number has not been verified yet, so lead sending is intentionally disabled.'
                  : 'Seguridad de vista previa: el WhatsApp real de Ray todavía no está verificado, por lo que el envío de prospectos está desactivado intencionalmente.'}
              </div>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="nombre" className="mb-2 block text-sm font-medium text-white/80">
                  {lang === 'en' ? 'Name' : 'Nombre'}
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-white/15 bg-black/25 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/50"
                  placeholder={lang === 'en' ? 'Your name' : 'Tu nombre'}
                />
              </div>

              <div>
                <label htmlFor="telefono" className="mb-2 block text-sm font-medium text-white/80">
                  {lang === 'en' ? 'Phone (optional)' : 'Teléfono (opcional)'}
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  autoComplete="tel"
                  className="w-full rounded-lg border border-white/15 bg-black/25 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/50"
                  placeholder="+52"
                />
              </div>
            </div>

            <div>
              <label htmlFor="zona" className="mb-2 block text-sm font-medium text-white/80">
                {lang === 'en' ? 'Area' : 'Zona'}
              </label>
              <select
                id="zona"
                name="zona"
                value={formData.zona}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-white/15 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-white/50"
              >
                <option value="">{lang === 'en' ? 'Select an area' : 'Selecciona una zona'}</option>
                {tenant.serviceAreas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="descripcion" className="mb-2 block text-sm font-medium text-white/80">
                {lang === 'en' ? 'What needs to be done?' : '¿Qué trabajo necesitas?'}
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                rows={5}
                className="w-full resize-y rounded-lg border border-white/15 bg-black/25 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/50"
                placeholder={lang === 'en' ? 'Describe the wall, repair or finish...' : 'Describe la pared, reparación o acabado...'}
              />
            </div>

            <button
              type="submit"
              disabled={!whatsappReady}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-neutral-950 transition enabled:hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {whatsappReady
                ? lang === 'en' ? 'Continue on WhatsApp' : 'Continuar en WhatsApp'
                : lang === 'en' ? 'WhatsApp pending verification' : 'WhatsApp pendiente de verificación'}
            </button>

            <p className="text-center text-xs leading-relaxed text-white/45">
              {lang === 'en'
                ? 'Nothing is submitted silently. You review the message in WhatsApp before sending it.'
                : 'Nada se envía de forma oculta. Revisas el mensaje en WhatsApp antes de enviarlo.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
