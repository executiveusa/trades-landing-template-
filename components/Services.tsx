'use client'

import { getTenant } from '@/lib/tenant'

export default function Services() {
  const tenant = getTenant()

  return (
    <section id="services" className="section-spacing bg-white">
      <div className="container-safe">
        <div className="text-center mb-12">
          <h2 className="text-brand-text">Nuestros Servicios</h2>
          <p className="text-lg text-brand-text-light mt-4 max-w-2xl mx-auto">
            Soluciones completas de acabados para tu hogar o negocio en Puerto Vallarta.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenant.services.map((service) => (
            <div key={service.id} className="card group">
              <div className="mb-4">
                <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
                  <span className="text-xl">✓</span>
                </div>
              </div>
              <h3 className="text-brand-text mb-2">{service.name}</h3>
              <p className="text-brand-text-light text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#contact" className="btn-primary">
            Solicitar Cotización Personalizada
          </a>
        </div>
      </div>
    </section>
  )
}
