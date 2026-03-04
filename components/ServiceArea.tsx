'use client'

import { getTenant } from '@/lib/tenant'

export default function ServiceArea() {
  const tenant = getTenant()

  return (
    <section className="section-spacing bg-brand-bg">
      <div className="container-safe">
        <div className="text-center mb-12">
          <h2 className="text-brand-text">{tenant.serviceAreaTitle}</h2>
          <p className="text-lg text-brand-text-light mt-4">
            Atendemos en toda la Costa de Banderas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tenant.serviceAreas.map((area, idx) => (
            <div
              key={idx}
              className="px-4 py-3 bg-white border border-brand-border rounded-md text-center hover:border-brand-accent transition-colors"
            >
              <p className="text-brand-text font-medium text-sm">{area}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-brand-text-light">
            ¿Tu zona no está listada?{' '}
            <a href="#contact" className="font-semibold text-brand-accent hover:underline">
              Consulta con nosotros
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
