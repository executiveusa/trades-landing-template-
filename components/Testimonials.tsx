'use client'

import { getTenant } from '@/lib/tenant'

export default function Testimonials() {
  const tenant = getTenant()

  return (
    <section className="section-spacing bg-white">
      <div className="container-safe">
        <div className="text-center mb-12">
          <h2 className="text-brand-text">Lo Que Dicen Nuestros Clientes</h2>
          <p className="text-lg text-brand-text-light mt-4">
            Confían en nuestro trabajo y experiencia.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tenant.testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card">
              {/* Star rating */}
              <div className="flex gap-1 mb-4">
                {Array(testimonial.rating)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
              </div>

              <p className="text-brand-text-light italic mb-4">&ldquo;{testimonial.text}&rdquo;</p>

              <div className="pt-4 border-t border-brand-border">
                <p className="font-semibold text-brand-text">{testimonial.name}</p>
                <p className="text-sm text-brand-text-light">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-brand-accent">500+</div>
            <p className="text-sm text-brand-text-light">Proyectos Completados</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-accent">15+</div>
            <p className="text-sm text-brand-text-light">Años de Experiencia</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-accent">100%</div>
            <p className="text-sm text-brand-text-light">Satisfacción Clientes</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-accent">24h</div>
            <p className="text-sm text-brand-text-light">Respuesta Garantizada</p>
          </div>
        </div>
      </div>
    </section>
  )
}
