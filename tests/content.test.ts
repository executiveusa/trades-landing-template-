import { test } from 'node:test'
import assert from 'node:assert/strict'
import { COPY } from '../lib/content'

// Evidence lock. Ray has supplied no proof for any of these. If he does, move the claim
// into the Evidence ledger in docs/AUDIT.md first, then relax the matching pattern here.
const UNSUPPORTED: RegExp[] = [
  /\b\d+\s*(\+\s*)?(años|years)\b/i, // years of experience
  /\bexperiencia\b|\bexperience\b/i,
  /\bgarant/i, // garantía / guarantee
  /\b(mejor|mejores|best|#1|número uno)\b/i,
  /\bcalidad\b|\bquality\b|\bpremium\b|\bprofesional/i,
  /\b(cientos|miles|hundreds|thousands)\b/i,
  /\b\d+\s*%/, // percentages
  /\$\s*\d|\bMXN\b|\bUSD\b|\bdesde\s+\$/i, // prices
  /\b(24\s*\/\s*7|24 horas|same.day|mismo día|en \d+ (horas|minutos))\b/i, // response-time promises
  /\b(rese[ñn]as?|reviews?|testimon|clientes satisfechos|satisfied)\b/i,
  /\b(innovador|innovative|seamless|cutting.edge|robust|world.class|de primera|todo.terreno)\b/i,
  /\bBah[ií]a de Banderas\b|\bNuevo Vallarta\b|\bBucer[ií]as\b/i, // coverage beyond Puerto Vallarta is unverified
]

function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value)
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out))
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => strings(v, out))
  return out
}

test('public copy contains no unsupported claims', () => {
  for (const lang of ['es', 'en'] as const) {
    const t = { ...COPY[lang] } as Record<string, unknown>
    delete t.htmlLang
    delete t.locale
    for (const text of strings(t)) {
      for (const re of UNSUPPORTED) assert.ok(!re.test(text), `[${lang}] "${text}" matches ${re}`)
    }
  }
})

test('both languages expose the same structure and the same number of items', () => {
  assert.equal(COPY.es.stages.items.length, COPY.en.stages.items.length)
  assert.equal(COPY.es.services.items.length, COPY.en.services.items.length)
  assert.equal(COPY.es.quote.jobs.length, COPY.en.quote.jobs.length)
  assert.deepEqual(
    COPY.es.stages.items.map((i) => i.src),
    COPY.en.stages.items.map((i) => i.src),
  )
})

test('every service row maps to a selectable job in the form', () => {
  for (const lang of ['es', 'en'] as const) {
    for (const s of COPY[lang].services.items) assert.ok(COPY[lang].quote.jobs.includes(s.job), `${lang}: ${s.job}`)
  }
})

test('every image has descriptive alt text', () => {
  for (const lang of ['es', 'en'] as const) {
    const all = [...COPY[lang].stages.items, ...COPY[lang].more.items]
    for (const i of all) assert.ok(i.alt.length > 20, `${lang}: ${i.src}`)
  }
})
