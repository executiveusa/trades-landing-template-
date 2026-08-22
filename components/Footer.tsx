'use client'

import { useLang } from '@/lib/lang'

export default function Footer() {
  const { lang } = useLang()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-neutral-950 py-10 text-white">
      <div className="container-safe">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-[-0.02em]">Ray</p>
            <p className="mt-2 text-sm text-white/55">
              {lang === 'en' ? 'Master plasterer · Puerto Vallarta, Jalisco' : 'Maestro yesero · Puerto Vallarta, Jalisco'}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/60" aria-label={lang === 'en' ? 'Footer navigation' : 'Navegación del pie'}>
            <a href="#services" className="transition hover:text-white">
              {lang === 'en' ? 'Services' : 'Servicios'}
            </a>
            <a href="#projects" className="transition hover:text-white">
              {lang === 'en' ? 'Work' : 'Trabajos'}
            </a>
            <a href="#contact" className="transition hover:text-white">
              {lang === 'en' ? 'Quote' : 'Cotización'}
            </a>
          </nav>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/35">
          © {currentYear} Ray · Puerto Vallarta
        </div>
      </div>
    </footer>
  )
}
