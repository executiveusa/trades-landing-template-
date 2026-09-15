import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(new URL('../components/ProjectsEnhanced.tsx', import.meta.url), 'utf8')

test('before/after slider retains its user-visible interaction contract', () => {
  assert.match(source, /function BeforeAfterSlider\(\)/)
  assert.match(source, /onMouseDown=\{handleMouseDown\}/)
  assert.match(source, /onTouchMove=\{handleMove\}/)
  assert.match(source, /src="\/cuba-project\.jpg"/)
  assert.match(source, /Before Transformation/)
})

test('the slider component has one complete implementation before ProjectCard', () => {
  const sliderStart = source.indexOf('function BeforeAfterSlider()')
  const cardStart = source.indexOf('function ProjectCard(')
  assert.ok(sliderStart >= 0 && cardStart > sliderStart)
  const sliderRegion = source.slice(sliderStart, cardStart)
  assert.equal((sliderRegion.match(/whileTap=\{\{ scale: 0\.95 \}\}/g) ?? []).length, 1)
  assert.equal((sliderRegion.match(/Before Transformation/g) ?? []).length, 1)
  assert.equal((sliderRegion.match(/Drag to compare/g) ?? []).length, 0)
})
