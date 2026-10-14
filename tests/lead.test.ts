import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateLead, readKey } from '../lib/lead'

const good = { zona: 'Versalles', trabajo: 'Reparación', detalle: '', nombre: '', lang: 'es', website: '' }

test('accepts a minimal valid lead and keeps accents', () => {
  const r = validateLead(good)
  assert.ok(r.ok)
  if (r.ok) assert.equal(r.lead.zona, 'Versalles')
})

test('requires zone and job, with messages in the visitor language', () => {
  const es = validateLead({ ...good, zona: '  ', trabajo: '' })
  assert.ok(!es.ok && !es.bot && es.errors.zona && es.errors.trabajo)
  const en = validateLead({ ...good, zona: '', lang: 'en' })
  assert.ok(!en.ok && !en.bot && en.errors.zona?.includes('area'))
})

test('honeypot is treated as a bot', () => {
  const r = validateLead({ ...good, website: 'http://spam.example' })
  assert.ok(!r.ok && r.bot === true)
})

test('strips control characters and caps length', () => {
  const r = validateLead({ ...good, detalle: 'x'.repeat(5000), nombre: 'Ana\u0000\u0007' })
  assert.ok(r.ok)
  if (r.ok) {
    assert.equal(r.lead.detalle.length, 600)
    assert.equal(r.lead.nombre, 'Ana')
  }
})

test('rejects non-object input without throwing', () => {
  for (const bad of [null, undefined, 'x', 42, []]) assert.ok(!validateLead(bad).ok)
})

test('idempotency key must be a uuid', () => {
  assert.equal(readKey({ key: 'nope' }), null)
  assert.equal(readKey({}), null)
  assert.equal(readKey({ key: '123E4567-E89B-12D3-A456-426614174000' }), '123e4567-e89b-12d3-a456-426614174000')
})
