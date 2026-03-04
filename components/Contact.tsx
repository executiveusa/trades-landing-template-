'use client'

import { useState } from 'react'
import { getTenant } from '@/lib/tenant'

type FormData = {
  nombre: string
  email: string
  telefono: string
  zona: string
  descripcion: string
}

export default function Contact() {
  const tenant = getTenant()
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
            <h2 className="text-brand-text">Solicita tu Cotización</h2>
            <p className="text-lg text-brand-text-light mt-4">
              Llena el formulario y nos pondremos en contacto en 24 horas.
            </p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                {tenant.contactForm.messageSuccess}
              </h3>
              <p className="text-green-700">
                También puedes contactarnos directamente por WhatsApp para una respuesta más rápida.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-brand-text mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-brand-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white text-brand-text"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-text mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-brand-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white text-brand-text"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Teléfono */}
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-brand-text mb-2">
                    Teléfono (Opcional)
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-brand-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white text-brand-text"
                    placeholder="+52..."
                  />
                </div>

                {/* Zona */}
                <div>
                  <label htmlFor="zona" className="block text-sm font-medium text-brand-text mb-2">
                    Zona *
                  </label>
                  <select
                    id="zona"
                    name="zona"
                    value={formData.zona}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-brand-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white text-brand-text"
                  >
                    <option value="">Selecciona una zona</option>
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
                  Descripción del Trabajo *
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-brand-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white text-brand-text resize-vertical"
                  placeholder="Cuéntanos qué necesitas..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? 'Enviando...' : 'Enviar Solicitud'}
              </button>

              <p className="text-center text-sm text-brand-text-light">
                O contacta directamente:{' '}
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
