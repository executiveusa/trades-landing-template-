'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getTenant } from '@/lib/tenant'

export default function Navbar() {
  const tenant = getTenant()
  const [isSticky, setIsSticky] = useState(false)

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
          {tenant.businessName}
        </Link>

        <div className="hidden md:flex gap-8">
          <a
            href="#services"
            className="text-brand-text-light hover:text-brand-accent transition-colors link-hover"
          >
            Servicios
          </a>
          <a
            href="#projects"
            className="text-brand-text-light hover:text-brand-accent transition-colors link-hover"
          >
            Proyectos
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
            Contacto
          </a>
        </div>

        <Link
          href="#contact"
          className="btn-primary btn-sm hidden md:inline-flex"
        >
          Cotización
        </Link>
      </div>
    </nav>
  )
}
