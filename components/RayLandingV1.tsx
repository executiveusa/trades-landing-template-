'use client'

import { FormEvent, useState } from 'react'
import styles from './RayLandingV1.module.css'

const heroMedia = {
  mobile: '/ray-hero-mobile.jpg',
  desktop: '/ray-hero-desktop.jpg',
  mobilePosition: '58% center',
  desktopPosition: 'center center',
}

const work = [
  ['/jobsite/photo1.jpg', 'Preparación alrededor de instalación eléctrica'],
  ['/jobsite/photo2.jpg', 'Afinado de superficie'],
  ['/jobsite/photo3.jpg', 'Reparación de plafón'],
  ['/jobsite/photo4.jpg', 'Preparación de esquina'],
  ['/jobsite/photo6.jpg', 'Trabajo de superficie'],
  ['/jobsite/photo10.jpg', 'Detalle de acabado'],
] as const

const whatsapp = '523223041169'

function whatsappHref(message = 'Hola Ray, quisiera una cotización.') {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`
}

export default function RayLandingV1() {
  const [compare, setCompare] = useState(50)

  function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const zona = String(data.get('zona') || '').trim()
    const trabajo = String(data.get('trabajo') || '').trim()
    if (!zona || !trabajo) return
    window.open(whatsappHref(`Hola Ray, quisiera una cotización.\nZona: ${zona}\nTrabajo: ${trabajo}`), '_blank', 'noopener,noreferrer')
  }

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a className={styles.brand} href="#top">Ray</a>
        <div className={styles.navLinks}>
          <a href="#services">Servicios</a>
          <a href="#work">Trabajo</a>
          <a href="#before-after">Antes / Después</a>
          <a href="#contact">Cotización</a>
        </div>
        <a className={styles.lang} href="?lang=en">ES / EN</a>
      </nav>

      <header className={styles.hero} id="top">
        <picture className={styles.heroPicture}>
          <source media="(min-width: 768px)" srcSet={heroMedia.desktop} />
          <img
            src={heroMedia.mobile}
            alt="Trabajo de yeso y acabados"
            className={styles.heroImage}
            style={{ objectPosition: heroMedia.mobilePosition }}
          />
        </picture>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.kicker}>Ray · Puerto Vallarta</div>
          <h1>Yeso y acabados</h1>
          <p>Puerto Vallarta</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href={whatsappHref()} target="_blank" rel="noreferrer">Cotizar por WhatsApp</a>
            <a className={styles.secondaryButton} href="#work">Ver trabajo</a>
          </div>
        </div>
      </header>

      <section className={styles.section} id="services">
        <div className={styles.wrap}>
          <div className={styles.eyebrow}>Servicios</div>
          {[
            ['Yeso y aplanados', 'Preparación y acabado de muros.'],
            ['Reparación', 'Grietas y superficies dañadas.'],
            ['Acabados', 'Texturas y detalles.'],
            ['Interior / exterior', 'Casas, condominios y comercios.'],
          ].map(([title, body]) => (
            <div className={styles.serviceRow} key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.white}`} id="work">
        <div className={styles.wrap}>
          <div className={styles.eyebrow}>Trabajo</div>
          <h2 className={styles.sectionTitle}>Fotos de obra.</h2>
          <div className={styles.workRail}>
            {work.map(([src, caption]) => (
              <figure className={styles.workCard} key={src}>
                <img src={src} alt={caption} loading="lazy" />
                <figcaption>{caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="before-after">
        <div className={styles.wrap}>
          <div className={styles.eyebrow}>Antes / Después</div>
          <h2 className={styles.sectionTitle}>Comparación.</h2>
          <div className={styles.compare}>
            <div className={styles.afterPlaceholder}>DESPUÉS — foto pendiente</div>
            <div className={styles.beforePlaceholder} style={{ clipPath: `inset(0 ${100 - compare}% 0 0)` }}>ANTES — foto pendiente</div>
            <div className={styles.compareLine} style={{ left: `${compare}%` }} />
            <div className={styles.compareHandle} style={{ left: `${compare}%` }}>↔</div>
            <input
              className={styles.compareInput}
              aria-label="Comparar antes y después"
              type="range"
              min="0"
              max="100"
              value={compare}
              onChange={(event) => setCompare(Number(event.target.value))}
            />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.white}`}>
        <div className={styles.wrap}>
          <div className={styles.eyebrow}>Zona</div>
          <h2 className={styles.sectionTitle}>Puerto Vallarta</h2>
          <p className={styles.simpleCopy}>Envía ubicación y fotos por WhatsApp.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.contact}`} id="contact">
        <div className={styles.wrap}>
          <div className={styles.eyebrowLight}>Cotización</div>
          <h2 className={styles.sectionTitle}>Zona + descripción.</h2>
          <form onSubmit={submitQuote} className={styles.form}>
            <label>Zona<input name="zona" required autoComplete="address-level3" /></label>
            <label>Trabajo<textarea name="trabajo" required /></label>
            <button type="submit">Continuar en WhatsApp</button>
            <small>Revisa el mensaje antes de enviarlo.</small>
          </form>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.wrap}><strong>Ray</strong><span>Yeso &amp; acabados · Puerto Vallarta</span></div>
      </footer>

      <a className={styles.mobileCta} href={whatsappHref()} target="_blank" rel="noreferrer">Cotizar por WhatsApp</a>
    </main>
  )
}
