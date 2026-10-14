import type { Lang } from './site'

export type LeadInput = {
  zona: string
  trabajo: string
  detalle: string
  nombre: string
  lang: Lang
  source: string
  /** Honeypot. Real people never fill it. */
  website: string
}

/** Client-generated id so a retry or double tap stores one record. */
export const KEY_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function readKey(raw: unknown): string | null {
  const k = raw && typeof raw === 'object' ? (raw as Record<string, unknown>).key : null
  return typeof k === 'string' && KEY_RE.test(k) ? k.toLowerCase() : null
}

export type LeadErrors = Partial<Record<'zona' | 'trabajo' | 'detalle' | 'nombre', string>>

export type LeadResult =
  | { ok: true; lead: Omit<LeadInput, 'website'> }
  | { ok: false; bot: true }
  | { ok: false; bot?: false; errors: LeadErrors }

const MAX = { zona: 80, trabajo: 80, detalle: 600, nombre: 60, source: 120 }

/** Strip control characters and collapse whitespace; keep accents and ñ. */
function clean(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim()
    .slice(0, max)
}

const MSG: Record<Lang, { zona: string; trabajo: string }> = {
  es: { zona: 'Escribe la zona o colonia.', trabajo: 'Elige o escribe el trabajo.' },
  en: { zona: 'Enter the area or neighborhood.', trabajo: 'Choose or describe the work.' },
}

export function validateLead(raw: unknown): LeadResult {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  const lang: Lang = r.lang === 'en' ? 'en' : 'es'

  if (typeof r.website === 'string' && r.website.trim() !== '') return { ok: false, bot: true }

  const lead = {
    zona: clean(r.zona, MAX.zona),
    trabajo: clean(r.trabajo, MAX.trabajo),
    detalle: clean(r.detalle, MAX.detalle),
    nombre: clean(r.nombre, MAX.nombre),
    lang,
    source: clean(r.source, MAX.source),
  }

  const errors: LeadErrors = {}
  if (!lead.zona) errors.zona = MSG[lang].zona
  if (!lead.trabajo) errors.trabajo = MSG[lang].trabajo
  if (Object.keys(errors).length) return { ok: false, errors }

  return { ok: true, lead }
}
