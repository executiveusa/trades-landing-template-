'use client'

import { getTenant } from '@/lib/tenant'

export default function Footer() {
  const tenant = getTenant()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-text text-white py-12">
      <div className="container-safe">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h4 className="font-bold text-lg mb-2">{tenant.businessName}</h4>
            <p className="text-gray-300 text-sm">{tenant.tradeName}</p>
            <p className="text-gray-400 text-xs mt-2">Ubicación: {tenant.city}, Jalisco</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-white transition-colors">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <p className="text-gray-300 text-sm mb-2">
              <a href={`tel:${tenant.phone}`} className="hover:text-white transition-colors">
                {tenant.phone}
              </a>
            </p>
            <p className="text-gray-400 text-xs">
              Respuestas en 24 horas • Cotizaciones sin compromiso
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {currentYear} {tenant.businessName}. Todos los derechos reservados.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Privacidad
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Términos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
