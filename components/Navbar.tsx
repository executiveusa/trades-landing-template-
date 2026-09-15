'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLang } from '@/lib/lang'

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false)
  const { lang, toggle } = useLang()

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const textClass = isSticky ? 'text-neutral-900' : 'text-white'
  const mutedClass = isSticky ? 'text-neutral-600 hover:text-neutral-950' : 'text-white/75 hover:text-white'
  const controlClass = isSticky
    ? 'border-black/15 text-neutral-700 hover:border-black/35'
    : 'border-white/35 text-white hover:border-white/70'

  return (
    <nav
      aria-label={lang === 'en' ? 'Main navigation' : 'Navegación principal'}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        isSticky ? 'border-b border-black/10 bg-white/95 backdrop-blur-md' : 'bg-gradient-to-b from-black/45 to-transparent'
      }`}
    >
      <div className="container-safe flex min-h-16 items-center justify-between gap-3 py-2.5">
        <Link href="/" className={`text-lg font-semibold tracking-[-0.02em] transition ${textClass}`}>
          Ray
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <a href="#services" className={`text-sm transition ${mutedClass}`}>
            {lang === 'en' ? 'Services' : 'Servicios'}
          </a>
          <a href="#area" className={`text-sm transition ${mutedClass}`}>
            {lang === 'en' ? 'Area' : 'Zona'}
          </a>
          <a href="#contact" className={`text-sm transition ${mutedClass}`}>
            {lang === 'en' ? 'Quote' : 'Cotización'}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border px-3 text-xs font-semibold transition ${controlClass}`}
            aria-label={lang === 'en' ? 'Cambiar a español' : 'Switch to English'}
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>

          <a
            href="#contact"
            className={`inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-semibold transition sm:px-5 ${
              isSticky ? 'bg-neutral-950 text-white hover:bg-neutral-800' : 'bg-white text-neutral-950 hover:bg-white/90'
            }`}
          >
            {lang === 'en' ? 'Quote' : 'Cotizar'}
          </a>
        </div>
      </div>
    </nav>
  )
}