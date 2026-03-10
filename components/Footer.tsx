'use client'

import { getTenant } from '@/lib/tenant'
import { useLang } from '@/lib/lang'

export default function Footer() {
  const tenant = getTenant()
  const { lang } = useLang()
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
            <h4 className="font-semibold mb-4">
              {lang === 'en' ? 'Quick Links' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">
                  {lang === 'en' ? 'Services' : 'Servicios'}
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-white transition-colors">
                  {lang === 'en' ? 'Projects' : 'Proyectos'}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  {lang === 'en' ? 'Contact' : 'Contacto'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">
            {lang === 'en' ? 'Contact' : 'Contacto'}
          </h4>
            <p className="text-gray-300 text-sm mb-2">
              <a href={`tel:${tenant.phone}`} className="hover:text-white transition-colors">
                {tenant.phone}
              </a>
            </p>
            {tenant.facebookUrl && (
              <p className="text-gray-300 text-sm mb-2">
                <a href={tenant.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Facebook
                </a>
              </p>
            )}
            <p className="text-gray-400 text-xs">
              {lang === 'en'
                ? 'Replies within 24 hours • No‑obligation quotes'
                : 'Respuestas en 24 horas • Cotizaciones sin compromiso'}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>
              © {currentYear} {tenant.businessName}.{' '}
              {lang === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                {lang === 'en' ? 'Privacy' : 'Privacidad'}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {lang === 'en' ? 'Terms' : 'Términos'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
