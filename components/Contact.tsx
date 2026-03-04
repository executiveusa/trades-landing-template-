'use client'

import { useState } from 'react'
import { getTenant } from '@/lib/tenant'
import { useLang } from '@/lib/lang'

type FormData = {
  nombre: string
  email: string
  telefono: string
  zona: string
  descripcion: string
}

export default function Contact() {
  const tenant = getTenant()
  const { lang } = useLang()
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    zona: '',
    descripcion: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Analytics tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'contact_form_submit', {
          contact_method: 'form',
          language: lang,
          service_area: formData.zona,
          timestamp: new Date().toISOString()
        })
      }

      // Simulate API call or send to webhook
      console.log('Form submitted:', formData)

      // Reset form
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        zona: '',
        descripcion: '',
      })
      setSubmitted(true)

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="section-spacing bg-white">
      <div className="container-safe">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-brand-text">
              {lang === 'en' ? 'Request a Quote' : 'Solicita tu Cotización'}
            </h2>
            <p className="text-lg text-brand-text-light mt-4">
              {lang === 'en'
                ? 'Fill out the form and we will get back to you within 24 hours.'
                : 'Llena el formulario y nos pondremos en contacto en 24 horas.'}
            </p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                {lang === 'en'
                  ? tenant.contactForm.messageSuccess_en || tenant.contactForm.messageSuccess
                  : tenant.contactForm.messageSuccess}
              </h3>
              <p className="text-green-700">
                {lang === 'en'
                  ? 'You can also contact us directly via WhatsApp for a faster response.'
                  : 'También puedes contactarnos directamente por WhatsApp para una respuesta más rápida.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-brand-text mb-2">
                    {lang === 'en'
                      ? tenant.contactForm.fields.find(f => f.name === 'nombre')?.label_en || 'Name'
                      : tenant.contactForm.fields.find(f => f.name === 'nombre')?.label || 'Nombre'}
                    {' '}*
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-brand-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white text-brand-text"
                    placeholder={lang === 'en' ? 'Your name' : 'Tu nombre'}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-text mb-2">
                    {lang === 'en'
                      ? tenant.contactForm.fields.find(f => f.name === 'email')?.label_en || 'Email'
                      : tenant.contactForm.fields.find(f => f.name === 'email')?.label || 'Email'}
                    {' '}*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-brand-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white text-brand-text"
                    placeholder={lang === 'en' ? 'you@example.com' : 'tu@email.com'}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Teléfono */}
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-brand-text mb-2">
                    {lang === 'en'
                      ? tenant.contactForm.fields.find(f => f.name === 'telefono')?.label_en || 'Phone (Optional)'
                      : tenant.contactForm.fields.find(f => f.name === 'telefono')?.label || 'Teléfono (Opcional)'}
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-brand-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white text-brand-text"
                    placeholder={lang === 'en' ? '+52...' : '+52...'}
                  />
                </div>

                {/* Zona */}
                <div>
                  <label htmlFor="zona" className="block text-sm font-medium text-brand-text mb-2">
                    {lang === 'en'
                      ? tenant.contactForm.fields.find(f => f.name === 'zona')?.label_en || 'Zone'
                      : tenant.contactForm.fields.find(f => f.name === 'zona')?.label || 'Zona'}
                    {' '}*
                  </label>
                  <select
                    id="zona"
                    name="zona"
                    value={formData.zona}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-brand-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white text-brand-text"
                  >
                    <option value="">{lang === 'en' ? 'Select a zone' : 'Selecciona una zona'}</option>
                    {tenant.serviceAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label htmlFor="descripcion" className="block text-sm font-medium text-brand-text mb-2">
                  {lang === 'en'
                    ? tenant.contactForm.fields.find(f => f.name === 'descripcion')?.label_en || 'Work Description'
                    : tenant.contactForm.fields.find(f => f.name === 'descripcion')?.label || 'Descripción del Trabajo'}
                  {' '}*
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-brand-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white text-brand-text resize-vertical"
                  placeholder={lang === 'en' ? "Tell us what you need..." : 'Cuéntanos qué necesitas...'}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading
                  ? lang === 'en' ? 'Sending...' : 'Enviando...'
                  : lang === 'en' ? 'Submit Request' : 'Enviar Solicitud'}
              </button>

              <p className="text-center text-sm text-brand-text-light">
                {lang === 'en' ? 'Or contact directly:' : 'O contacta directamente:'}{' '}
                <a href={`tel:${tenant.phone}`} className="text-brand-accent font-semibold hover:underline">
                  {tenant.phone}
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
