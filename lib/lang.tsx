'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export type Lang = 'es' | 'en'

interface LangContextValue {
  lang: Lang
  toggle: () => void
}

const LangContext = createContext<LangContextValue | undefined>(undefined)

export function LangProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [lang, setLang] = useState<Lang>('es')

  useEffect(() => {
    const param = searchParams.get('lang') as Lang | null
    if (param === 'en' || param === 'es') {
      setLang(param)
      if (typeof window !== 'undefined') {
        localStorage.setItem('lang', param)
      }
    } else {
      const stored = localStorage.getItem('lang') as Lang | null
      if (stored === 'en' || stored === 'es') {
        setLang(stored)
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'en' ? 'en' : 'es'
    }
  }, [lang])

  const toggle = () => {
    const next: Lang = lang === 'es' ? 'en' : 'es'
    const params = new URLSearchParams(searchParams.toString())
    params.set('lang', next)
    router.replace(`${pathname}?${params.toString()}`)
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
