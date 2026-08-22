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

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isSticky ? 'border-b border-black/10 bg-white/95 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container-safe flex h-18 items-center justify-between py-4">
        <Link href="/" className={`text-lg font-semibold tracking-[-0.02em] transition ${textClass}`}>
          Ray
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <a href="#services" className={`text-sm transition ${mutedClass}`}>
            {lang === 'en' ? 'Services' : 'Servicios'}
          </a>
          <a href="#projects" className={`text-sm transition ${mutedClass}`}>
            {lang === 'en' ? 'Work' : 'Trabajos'}
          </a>
          <a href="#contact" className={`text-sm transition ${mutedClass}`}>
            {lang === 'en' ? 'Quote' : 'Cotización'}
          </a>
          <button
            onClick={toggle}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${isSticky ? 'border-black/15 text-neutral-700 hover:border-black/35' : 'border-white/35 text-white hover:border-white/70'}`}
            aria-label={lang === 'en' ? 'Cambiar a español' : 'Switch to English'}
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
        </div>

        <a
          href="#contact"
          className={`inline-flex min-h-10 items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition ${isSticky ? 'bg-neutral-950 text-white hover:bg-neutral-800' : 'bg-white text-neutral-950 hover:bg-white/90'}`}
        >
          {lang === 'en' ? 'Get a quote' : 'Cotizar'}
        </a>
      </div>
    </nav>
  )
}
