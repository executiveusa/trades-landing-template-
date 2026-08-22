'use client'

import { useEffect, useState } from 'react'
import { getTenant } from '@/lib/tenant'
import { buildWhatsAppLink, isWhatsAppConfigured } from '@/lib/whatsapp'
import { useLang } from '@/lib/lang'

export default function WhatsAppButton() {
  const tenant = getTenant()
  const { lang } = useLang()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isWhatsAppConfigured(tenant.whatsappNumber)) return null

  const message = lang === 'en'
    ? tenant.whatsappMessage_en || tenant.whatsappMessage
    : tenant.whatsappMessage
  const whatsappLink = buildWhatsAppLink(tenant.whatsappNumber, message)

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-105 ${isVisible ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'}`}
      title={lang === 'en' ? 'Contact Ray on WhatsApp' : 'Contactar a Ray por WhatsApp'}
      aria-label={lang === 'en' ? 'Contact Ray on WhatsApp' : 'Contactar a Ray por WhatsApp'}
    >
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.729.75 5.405 2.174 7.659L3.1 23.98l8.391-2.498c2.228 1.217 4.724 1.862 7.334 1.862 5.433 0 9.866-4.433 9.866-9.867 0-2.632-.997-5.109-2.812-7.04A9.83 9.83 0 0011.05 6.979z" />
      </svg>
    </a>
  )
}
