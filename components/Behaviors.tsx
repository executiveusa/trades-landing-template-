'use client'

import { useEffect } from 'react'
import { track, type TrackName } from '@/lib/track'

/**
 * Three small jobs, no UI of its own:
 *  1. delegated click tracking for [data-track]
 *  2. service rows announce their job to the quote form ([data-job])
 *  3. the phone action bar shows only while neither the hero action nor the form is on screen
 */
export default function Behaviors() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track],[data-job]')
      if (!el) return
      const name = el.dataset.track as TrackName | undefined
      if (name) track(name, { place: el.dataset.place || '' })
      const job = el.dataset.job
      if (job) {
        window.dispatchEvent(new CustomEvent('ray:job', { detail: job }))
        track('service_select', { job })
      }
    }
    document.addEventListener('click', onClick)

    const bar = document.getElementById('action-bar')
    const hero = document.getElementById('hero-cta')
    const form = document.getElementById('cotizar')
    let heroSeen = true
    let formSeen = false
    const apply = () => bar?.classList.toggle('is-visible', !heroSeen && !formSeen)

    let io: IntersectionObserver | undefined
    if (bar && hero && form && 'IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        for (const en of entries) {
          if (en.target === hero) heroSeen = en.isIntersecting
          if (en.target === form) formSeen = en.isIntersecting
        }
        apply()
      })
      io.observe(hero)
      io.observe(form)
    } else {
      bar?.classList.add('is-visible')
    }

    return () => {
      document.removeEventListener('click', onClick)
      io?.disconnect()
    }
  }, [])

  return null
}
