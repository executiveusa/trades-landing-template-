'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getTenant } from '@/lib/tenant'
import { useLang } from '@/lib/lang'

export default function Navbar() {
  const tenant = getTenant()
  const [isSticky, setIsSticky] = useState(false)
  const { lang, toggle } = useLang()

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isSticky ? 'bg-white border-b border-brand-border shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-safe h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg hover:text-brand-accent transition-colors">
          {lang === 'en' ? tenant.businessName_en || tenant.businessName : tenant.businessName}
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <a
            href="#services"
            className="text-brand-text-light hover:text-brand-accent transition-colors link-hover"
          >
            {lang === 'en' ? 'Services' : 'Servicios'}
          </a>
          <a
            href="#projects"
            className="text-brand-text-light hover:text-brand-accent transition-colors link-hover"
          >
            {lang === 'en' ? 'Projects' : 'Proyectos'}
          </a>
          <Link
            href="/blog"
            className="text-brand-text-light hover:text-brand-accent transition-colors link-hover"
          >
            Blog
          </Link>
          <a
            href="#contact"
            className="text-brand-text-light hover:text-brand-accent transition-colors link-hover"
          >
            {lang === 'en' ? 'Contact' : 'Contacto'}
          </a>
          <button
            onClick={toggle}
            className="ml-4 px-2 py-1 border border-[var(--brand-border)] rounded text-sm"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
        </div>

        <Link
          href="#contact"
          className="btn-primary btn-sm hidden md:inline-flex"
        >
          {lang === 'en' ? 'Quote' : 'Cotización'}
        </Link>
      </div>
    </nav>
  )
}
