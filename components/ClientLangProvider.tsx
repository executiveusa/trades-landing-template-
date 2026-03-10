'use client'

import { ReactNode } from 'react'
import { LangProvider } from '@/lib/lang'

export default function ClientLangProvider({ children }: { children: ReactNode }) {
  return <LangProvider>{children}</LangProvider>
}
