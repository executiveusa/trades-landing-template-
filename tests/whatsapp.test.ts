import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildQuoteMessage, normalizeWhatsAppNumber, whatsappHref } from '../lib/whatsapp'

test('Mexican numbers are normalized to wa.me form exactly once', () => {
  assert.equal(normalizeWhatsAppNumber('322 304 1169'), '523223041169')
  assert.equal(normalizeWhatsAppNumber('+52 322 304 1169'), '523223041169')
  assert.equal(normalizeWhatsAppNumber('523223041169'), '523223041169')
  assert.equal(normalizeWhatsAppNumber(''), '')
})

test('quote message carries zone, job, details and name, in the visitor language', () => {
  const es = buildQuoteMessage({ zona: 'Versalles', trabajo: 'Reparación', detalle: '40 m2', nombre: 'Ana' }, 'es')
  for (const s of ['Hola Ray', 'Zona: Versalles', 'Trabajo: Reparación', 'Detalle: 40 m2', 'Nombre: Ana', 'fotos']) {
    assert.ok(es.includes(s), `missing ${s}`)
  }
  const en = buildQuoteMessage({ zona: 'Centro', trabajo: 'Finishes' }, 'en')
  assert.ok(en.includes('Hi Ray') && en.includes('Area: Centro') && en.includes('Work: Finishes'))
  assert.ok(!en.includes('Name:') && !en.includes('Details:'), 'optional fields omitted when empty')
})

test('href encodes accents and newlines and targets the right number', () => {
  const href = whatsappHref(buildQuoteMessage({ zona: 'Zona Romántica', trabajo: 'Acabados' }, 'es'))
  assert.ok(href.startsWith('https://wa.me/523223041169?text='))
  assert.ok(href.includes('Rom%C3%A1ntica') && href.includes('%0A'))
  assert.ok(!href.includes(' '))
})

test('generic message when there is no draft', () => {
  assert.equal(buildQuoteMessage(null, 'es'), 'Hola Ray, quisiera una cotización.')
})
