'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { Copy } from '@/lib/content'
import type { Lang } from '@/lib/site'
import { validateLead, type LeadErrors } from '@/lib/lead'
import { buildQuoteMessage, whatsappHref } from '@/lib/whatsapp'
import { track } from '@/lib/track'
import { CheckIcon, ChatIcon } from './Icons'

type Props = { lang: Lang; t: Copy['quote'] }

/**
 * Honest flow: the form prepares a WhatsApp message and opens it. Ray only receives it when
 * the visitor presses send in WhatsApp, and the UI says exactly that. The server copy of the
 * request (/api/lead) is a backup record for Ray, never presented as "delivered".
 */
export default function QuoteForm({ lang, t }: Props) {
  const [zona, setZona] = useState('')
  const [trabajo, setTrabajo] = useState('')
  const [detalle, setDetalle] = useState('')
  const [nombre, setNombre] = useState('')
  const [website, setWebsite] = useState('')
  const [errors, setErrors] = useState<LeadErrors>({})
  const [doneHref, setDoneHref] = useState<string | null>(null)
  const doneRef = useRef<HTMLHeadingElement>(null)

  // Service rows elsewhere on the page pre-select the job here.
  useEffect(() => {
    const onJob = (e: Event) => {
      const job = (e as CustomEvent<string>).detail
      if (typeof job === 'string') setTrabajo(job)
    }
    window.addEventListener('ray:job', onJob)
    return () => window.removeEventListener('ray:job', onJob)
  }, [])

  useEffect(() => {
    if (doneHref) doneRef.current?.focus()
  }, [doneHref])

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const source = `${location.pathname}${location.search}`
    const result = validateLead({ zona, trabajo, detalle, nombre, lang, source, website })
    if (!result.ok) {
      if (result.bot) return
      setErrors(result.errors)
      const first = result.errors.zona ? 'zona' : 'trabajo-0'
      document.getElementById(first)?.focus()
      return
    }
    setErrors({})

    const href = whatsappHref(buildQuoteMessage(result.lead, lang))
    // Open synchronously inside the tap so mobile browsers allow it.
    window.open(href, '_blank', 'noopener,noreferrer')
    // Backup record for Ray. Fire and forget: the visitor never waits on it.
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...result.lead, website, key: crypto.randomUUID() }),
      keepalive: true,
    }).catch(() => {})
    track('quote_submit', { lang, job: result.lead.trabajo })
    setDoneHref(href)
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="zona">
          {t.zona} <span className="hint">{t.zonaHint}</span>
        </label>
        <input
          id="zona"
          name="zona"
          className="input"
          list="zonas"
          autoComplete="off"
          enterKeyHint="next"
          value={zona}
          onChange={(e) => setZona(e.target.value)}
          aria-invalid={errors.zona ? 'true' : undefined}
          aria-describedby={errors.zona ? 'zona-err' : undefined}
          required
        />
        <datalist id="zonas">
          {t.zonaOptions.map((o) => (
            <option key={o} value={o} />
          ))}
        </datalist>
        {errors.zona && (
          <p id="zona-err" className="err">
            {errors.zona}
          </p>
        )}
      </div>

      <fieldset className="field" aria-describedby={errors.trabajo ? 'trabajo-err' : undefined}>
        <legend>{t.trabajo}</legend>
        <div className="chips">
          {t.jobs.map((job, i) => (
            <label className="chip" key={job}>
              <input
                id={`trabajo-${i}`}
                type="radio"
                name="trabajo"
                value={job}
                checked={trabajo === job}
                onChange={() => setTrabajo(job)}
              />
              <span>
                <CheckIcon />
                {job}
              </span>
            </label>
          ))}
        </div>
        {errors.trabajo && (
          <p id="trabajo-err" className="err">
            {errors.trabajo}
          </p>
        )}
      </fieldset>

      <div className="field">
        <label htmlFor="detalle">
          {t.detalle} <span className="hint">{t.detalleHint}</span>
        </label>
        <textarea
          id="detalle"
          name="detalle"
          className="input"
          rows={3}
          maxLength={600}
          value={detalle}
          onChange={(e) => setDetalle(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="nombre">{t.nombre}</label>
        <input
          id="nombre"
          name="nombre"
          className="input"
          autoComplete="name"
          enterKeyHint="done"
          maxLength={60}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
      </div>

      <button className="btn btn--block" type="submit">
        <ChatIcon />
        {t.submit}
      </button>
      <p className="note">{t.note}</p>

      <div aria-live="polite">
        {doneHref && (
          <div className="done" role="status">
            <h3 ref={doneRef} tabIndex={-1}>
              {t.doneTitle}
            </h3>
            <p>{t.doneBody}</p>
            <a className="btn btn--line" href={doneHref} target="_blank" rel="noopener noreferrer">
              <ChatIcon />
              {t.doneButton}
            </a>
          </div>
        )}
      </div>
    </form>
  )
}
