import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const page = read('app/page.tsx')
const hero = read('components/HeroEnhanced.tsx')
const projects = read('components/ProjectsEnhanced.tsx')
const tenant = JSON.parse(read('content/tenant.json'))

test('hero uses the approved plain-language headline and one primary lead action', () => {
  assert.match(hero, /Yeso y acabados en Puerto Vallarta/)
  assert.match(hero, /Cotizar por WhatsApp/)
  assert.doesNotMatch(hero, /Muros bien hechos|clima de Vallarta|20\+|premium/i)
})

test('homepage shows verified job-site material without before-after claims', () => {
  assert.match(page, /ProjectsEnhanced/)
  assert.match(projects, /\/jobsite\/photo1\.jpg/)
  assert.match(projects, /Trabajo en proceso/)
  assert.doesNotMatch(projects, /BeforeAfterSlider|cuba-project|Arrastra para comparar/i)
})

test('only verified contact and service area are configured', () => {
  assert.equal(tenant.phone, '+52 322 304 1169')
  assert.equal(tenant.whatsappNumber, '523223041169')
  assert.deepEqual(tenant.serviceAreas, ['Puerto Vallarta'])
  assert.equal(tenant.facebookUrl, '')
  assert.deepEqual(tenant.testimonials, [])
})
