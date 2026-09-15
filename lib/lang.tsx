'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export type Lang = 'es' | 'en'

interface LangContextValue {
  lang: Lang
  toggle: () => void
}

const LangContext = createContext<LangContextValue | undefined>(undefined)

export function LangProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [lang, setLang] = useState<Lang>('es')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const param = params.get('lang') as Lang | null

    if (param === 'en' || param === 'es') {
      setLang(param)
      localStorage.setItem('lang', param)
      return
    }

    const stored = localStorage.getItem('lang') as Lang | null
    if (stored === 'en' || stored === 'es') setLang(stored)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const toggle = () => {
    const next: Lang = lang === 'es' ? 'en' : 'es'
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
    params.set('lang', next)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    setLang(next)
    localStorage.setItem('lang', next)
  }

  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
