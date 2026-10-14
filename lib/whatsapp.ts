import { SITE, type Lang } from './site'

export type QuoteDraft = {
  zona: string
  trabajo: string
  detalle?: string
  nombre?: string
}

const GREETING: Record<Lang, string> = {
  es: 'Hola Ray, quisiera una cotización.',
  en: 'Hi Ray, I would like a quote.',
}

const LABELS: Record<Lang, { name: string; area: string; work: string; detail: string; photos: string }> = {
  es: { name: 'Nombre', area: 'Zona', work: 'Trabajo', detail: 'Detalle', photos: 'Te mando fotos por este chat.' },
  en: { name: 'Name', area: 'Area', work: 'Work', detail: 'Details', photos: "I'll send photos in this chat." },
}

/** Digits only, for wa.me. Keeps Mexican numbers in international form. */
export function normalizeWhatsAppNumber(input: string): string {
  const digits = input.replace(/\D/g, '')
  if (!digits) return ''
  return digits.startsWith('52') ? digits : `52${digits}`
}

export function buildQuoteMessage(draft: QuoteDraft | null, lang: Lang): string {
  if (!draft) return GREETING[lang]
  const L = LABELS[lang]
  const lines = [GREETING[lang]]
  if (draft.nombre?.trim()) lines.push(`${L.name}: ${draft.nombre.trim()}`)
  lines.push(`${L.area}: ${draft.zona.trim()}`)
  lines.push(`${L.work}: ${draft.trabajo.trim()}`)
  if (draft.detalle?.trim()) lines.push(`${L.detail}: ${draft.detalle.trim()}`)
  lines.push(L.photos)
  return lines.join('\n')
}

export function whatsappHref(message: string, number: string = SITE.whatsappDigits): string {
  const n = normalizeWhatsAppNumber(number)
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`
}

export function telHref(): string {
  return `tel:${SITE.phoneE164}`
}
