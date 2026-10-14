import Image from 'next/image'
import { COPY } from '@/lib/content'
import { SITE, type Lang } from '@/lib/site'
import { buildQuoteMessage, telHref, whatsappHref } from '@/lib/whatsapp'
import QuoteForm from './QuoteForm'
import Behaviors from './Behaviors'
import { ArrowIcon, ChatIcon, PhoneIcon } from './Icons'

export default function Landing({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const other = lang === 'es' ? '/en' : '/'
  const waGeneric = whatsappHref(buildQuoteMessage(null, lang))

  return (
    <>
      <a className="skip" href="#contenido">
        {t.skip}
      </a>

      <header className="wrap top">
        <a className="mark" href={lang === 'es' ? '/' : '/en'}>
          <b>{SITE.name}</b>
          <span>{SITE.trade[lang]}</span>
        </a>
        <nav aria-label={lang === 'es' ? 'Principal' : 'Main'}>
          <a className="nav-text" href="#etapas">
            {t.more.h2}
          </a>
          <a className="nav-text" href="#servicios">
            {t.nav.services}
          </a>
          <a className="nav-text" href="#cotizar">
            {t.nav.quote}
          </a>
          <a href={other} hrefLang={lang === 'es' ? 'en' : 'es'} lang={lang === 'es' ? 'en' : 'es'} aria-label={`${t.nav.switchTo}: ${t.nav.switchLabel}`} data-track="lang_switch">
            {t.nav.switchTo}
          </a>
          <a className="call-icon" href={telHref()} aria-label={`${t.nav.call}: ${SITE.phoneDisplay}`} data-track="call_click" data-place="header">
            <PhoneIcon />
          </a>
        </nav>
      </header>

      <main id="contenido">
        <section className="hero" aria-labelledby="h1">
          <div className="wrap hero__grid">
            <div className="hero__media">
              <Image
                src="/img/ray-hero.jpg"
                alt={t.hero.imgAlt}
                width={1350}
                height={1800}
                priority
                quality={60}
                sizes="(min-width: 960px) 520px, 100vw"
              />
            </div>
            <div className="hero__text">
              <h1 id="h1" className="display">
                {t.hero.h1}
              </h1>
              <p className="hero__sub">{t.hero.sub}</p>
              <div className="hero__actions">
                <a id="hero-cta" className="btn" href={waGeneric} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" data-place="hero">
                  <ChatIcon />
                  {t.hero.cta}
                </a>
                <p className="callline">
                  {t.hero.callLine}{' '}
                  <a className="num" href={telHref()} data-track="call_click" data-place="hero">
                    {SITE.phoneDisplay}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="etapas" className="section" aria-labelledby="etapas-h">
          <div className="wrap">
            <div className="section__head">
              <h2 id="etapas-h" className="display">
                {t.more.h2}
              </h2>
              <p>{t.stages.intro}</p>
            </div>
            <ul className="rail" tabIndex={0} aria-label={t.more.h2}>
              {t.stages.items.map((s) => (
                <li className="stage" key={s.src}>
                  <div className="stage__img">
                    <Image src={s.src} alt={s.alt} width={1204} height={1600} sizes="(min-width: 900px) 360px, 76vw" />
                  </div>
                  <h3>
                    {s.title}
                  </h3>
                  <p>{s.caption}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="servicios" className="section" aria-labelledby="servicios-h">
          <div className="wrap">
            <div className="section__head">
              <h2 id="servicios-h" className="display">
                {t.services.h2}
              </h2>
            </div>
            <ul className="rows">
              {t.services.items.map((s) => (
                <li className="row" key={s.title}>
                  <a href="#cotizar" data-job={s.job}>
                    <strong>{s.title}</strong>
                    <span>{s.body}</span>
                    <ArrowIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="cotizar" className="section quote-light" aria-labelledby="cotizar-h">
          <div className="wrap quote">
            <div className="section__head">
              <h2 id="cotizar-h" className="display">
                {t.quote.h2}
              </h2>
              <p>{t.quote.sub}</p>
            </div>
            <QuoteForm lang={lang} t={t.quote} />
          </div>
        </section>
      </main>

      <footer className="foot on-ink">
        <div className="wrap foot__grid">
          <div>
            <b>{SITE.name}</b>
            <p>
              <small>
                {SITE.trade[lang]} · {t.footer.area}
              </small>
            </p>
          </div>
          <ul>
            <li>
              <a href={waGeneric} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" data-place="footer">
                {t.footer.whatsapp}
              </a>
            </li>
            <li>
              <a className="num" href={telHref()} data-track="call_click" data-place="footer">
                {t.footer.call} {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={other} hrefLang={lang === 'es' ? 'en' : 'es'} lang={lang === 'es' ? 'en' : 'es'}>
                {lang === 'es' ? 'English' : 'Español'}
              </a>
            </li>
          </ul>
        </div>
      </footer>

      <nav id="action-bar" className="sticky" aria-label={lang === 'es' ? 'Acciones rápidas' : 'Quick actions'}>
        <a className="btn" href={waGeneric} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" data-place="bar">
          <ChatIcon />
          {t.sticky.whatsapp}
        </a>
        <a className="btn btn--line" href={telHref()} data-track="call_click" data-place="bar">
          <PhoneIcon />
          {t.sticky.call}
        </a>
      </nav>

      <Behaviors />
    </>
  )
}
