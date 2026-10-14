import type { Lang } from './site'

// Evidence ledger (see docs/AUDIT.md):
//  - Services, trade name, phone, city: USER PROVIDED (original repo).
//  - Photos: USER PROVIDED, captions describe only what is visible.
//  - Nothing here claims years of experience, prices, response time, guarantees,
//    reviews, client counts or coverage beyond Puerto Vallarta. Do not add any
//    without proof from Ray. tests/content.test.ts enforces a banned-claims list.

export type Copy = {
  htmlLang: string
  locale: string
  meta: { title: string; description: string; ogAlt: string }
  skip: string
  nav: { stages: string; services: string; quote: string; switchLabel: string; switchTo: string; call: string }
  hero: { h1: string; sub: string; cta: string; callLine: string; imgAlt: string }
  stages: {
    h2: string
    intro: string
    items: { title: string; caption: string; alt: string; src: string }[]
  }
  services: { h2: string; items: { title: string; body: string; job: string }[]; cta: string }
  more: { h2: string; items: { caption: string; alt: string; src: string }[] }
  quote: {
    h2: string
    sub: string
    zona: string
    zonaHint: string
    zonaOptions: string[]
    trabajo: string
    jobs: string[]
    detalle: string
    detalleHint: string
    nombre: string
    submit: string
    sending: string
    note: string
    doneTitle: string
    doneBody: string
    doneButton: string
  }
  footer: { area: string; whatsapp: string; call: string }
  sticky: { whatsapp: string; call: string }
}

export const COPY: Record<Lang, Copy> = {
  es: {
    htmlLang: 'es-MX',
    locale: 'es_MX',
    meta: {
      title: 'Yesero en Puerto Vallarta | Ray, yeso y acabados',
      description:
        'Yeso, aplanados y acabados en Puerto Vallarta. Manda zona, trabajo y fotos por WhatsApp y Ray te cotiza.',
      ogAlt: 'Ray aplicando yeso en una obra de Puerto Vallarta',
    },
    skip: 'Saltar al contenido',
    nav: { stages: 'Etapas', services: 'Servicios', quote: 'Cotizar', switchLabel: 'English version', switchTo: 'EN', call: 'Llamar a Ray' },
    hero: {
      h1: 'Yeso y aplanados en Puerto Vallarta',
      sub: 'Muros y plafones, del bloque al acabado liso. Manda la zona, el trabajo y fotos por WhatsApp.',
      cta: 'Cotizar por WhatsApp',
      callLine: 'o llama al',
      imgAlt: 'Ray en cuclillas aplicando mezcla sobre un muro, con una cubeta de mezcla a su lado',
    },
    stages: {
      h2: 'Un plafón, tres etapas',
      intro: 'Fotos de obra de Ray.',
      items: [
        {
          title: 'Bloque al descubierto',
          caption: 'Instalación eléctrica a la vista, antes de aplanar.',
          alt: 'Plafón de bloque sin cubrir, con caja eléctrica verde y tubo naranja visibles',
          src: '/img/stage-1-bloque.jpg',
        },
        {
          title: 'Aplanado',
          caption: 'Primera capa aplicada sobre el bloque.',
          alt: 'Plafón cubierto con una capa de aplanado texturizada alrededor de la caja eléctrica',
          src: '/img/stage-2-aplanado.jpg',
        },
        {
          title: 'Acabado liso',
          caption: 'Superficie alisada.',
          alt: 'Plafón con superficie lisa y uniforme, con la caja eléctrica y el tubo naranja en el centro',
          src: '/img/stage-3-acabado.jpg',
        },
      ],
    },
    services: {
      h2: 'Servicios',
      cta: 'Cotizar este trabajo',
      items: [
        { title: 'Yeso y aplanados', body: 'Preparación y acabado de muros.', job: 'Yeso y aplanados' },
        { title: 'Reparación', body: 'Grietas y superficies dañadas.', job: 'Reparación' },
        { title: 'Acabados', body: 'Texturas y detalles.', job: 'Acabados' },
        { title: 'Interior / exterior', body: 'Casas, condominios y comercios.', job: 'Interior / exterior' },
      ],
    },
    more: {
      h2: 'Más obra',
      items: [
        {
          caption: 'Muro liso junto a una base todavía por aplanar.',
          alt: 'Esquina de un muro: arriba y a la izquierda superficie blanca lisa, abajo base gruesa sin alisar',
          src: '/img/detalle-muro.jpg',
        },
        {
          caption: 'Plafón con aplanado, caja eléctrica y lámpara empotrada.',
          alt: 'Plafón con aplanado texturizado, caja eléctrica verde y una lámpara circular blanca',
          src: '/img/detalle-plafon.jpg',
        },
      ],
    },
    quote: {
      h2: 'Pide tu cotización',
      sub: 'Dinos la zona y el trabajo. Las fotos las mandas después, en el mismo chat de WhatsApp.',
      zona: 'Zona o colonia',
      zonaHint: 'Ejemplo: Centro, Versalles, Marina',
      zonaOptions: ['Centro', 'Zona Romántica', 'Versalles', '5 de Diciembre', 'Marina Vallarta', 'Pitillal', 'Las Juntas'],
      trabajo: '¿Qué trabajo es?',
      jobs: ['Yeso y aplanados', 'Reparación', 'Acabados', 'Interior / exterior', 'No estoy seguro'],
      detalle: 'Detalles (opcional)',
      detalleHint: 'Medidas aproximadas, cuántos cuartos, para cuándo.',
      nombre: 'Tu nombre (opcional)',
      submit: 'Enviar por WhatsApp',
      sending: 'Preparando tu mensaje…',
      note: 'Se abre WhatsApp con tu mensaje ya escrito. Ray lo recibe cuando tú lo envías.',
      doneTitle: 'Tu mensaje está listo en WhatsApp.',
      doneBody: 'Presiona enviar en WhatsApp para que Ray lo reciba. Si no se abrió, toca el botón.',
      doneButton: 'Abrir WhatsApp',
    },
    footer: { area: 'Puerto Vallarta, Jalisco', whatsapp: 'WhatsApp', call: 'Llamar' },
    sticky: { whatsapp: 'WhatsApp', call: 'Llamar' },
  },

  en: {
    htmlLang: 'en',
    locale: 'en_US',
    meta: {
      title: 'Plasterer in Puerto Vallarta | Ray, plaster & finishes',
      description:
        'Plaster, rendering and finishes in Puerto Vallarta. Send your area, the job and photos on WhatsApp and Ray will quote it.',
      ogAlt: 'Ray applying plaster on a jobsite in Puerto Vallarta',
    },
    skip: 'Skip to content',
    nav: { stages: 'Stages', services: 'Services', quote: 'Get a quote', switchLabel: 'Versión en español', switchTo: 'ES', call: 'Call Ray' },
    hero: {
      h1: 'Plaster and rendering in Puerto Vallarta',
      sub: 'Walls and ceilings, from bare block to a smooth finish. Send the area, the job and photos on WhatsApp.',
      cta: 'Get a quote on WhatsApp',
      callLine: 'or call',
      imgAlt: 'Ray crouching and applying mix to a wall, with a bucket of mix beside him',
    },
    stages: {
      h2: 'One ceiling, three stages',
      intro: "Photos from Ray's jobsite.",
      items: [
        {
          title: 'Bare block',
          caption: 'Electrical work exposed, before rendering.',
          alt: 'Uncovered block ceiling with a green electrical box and orange conduit visible',
          src: '/img/stage-1-bloque.jpg',
        },
        {
          title: 'Rendered',
          caption: 'First coat applied over the block.',
          alt: 'Ceiling covered with a textured render coat around the electrical box',
          src: '/img/stage-2-aplanado.jpg',
        },
        {
          title: 'Smooth finish',
          caption: 'Smoothed surface.',
          alt: 'Ceiling with a smooth, even surface, electrical box and orange conduit in the center',
          src: '/img/stage-3-acabado.jpg',
        },
      ],
    },
    services: {
      h2: 'Services',
      cta: 'Quote this job',
      items: [
        { title: 'Plaster and rendering', body: 'Wall preparation and finishing.', job: 'Plaster and rendering' },
        { title: 'Repairs', body: 'Cracks and damaged surfaces.', job: 'Repairs' },
        { title: 'Finishes', body: 'Textures and details.', job: 'Finishes' },
        { title: 'Interior / exterior', body: 'Houses, condos and businesses.', job: 'Interior / exterior' },
      ],
    },
    more: {
      h2: 'More work',
      items: [
        {
          caption: 'Smooth wall next to a base still to be rendered.',
          alt: 'Wall corner: smooth white surface above and left, rough unsmoothed base below',
          src: '/img/detalle-muro.jpg',
        },
        {
          caption: 'Rendered ceiling with electrical box and recessed light.',
          alt: 'Ceiling with textured render, a green electrical box and a round white light',
          src: '/img/detalle-plafon.jpg',
        },
      ],
    },
    quote: {
      h2: 'Get your quote',
      sub: 'Tell us the area and the job. You send the photos afterwards, in the same WhatsApp chat.',
      zona: 'Area or neighborhood',
      zonaHint: 'Example: Centro, Versalles, Marina',
      zonaOptions: ['Centro', 'Zona Romántica', 'Versalles', '5 de Diciembre', 'Marina Vallarta', 'Pitillal', 'Las Juntas'],
      trabajo: 'What is the job?',
      jobs: ['Plaster and rendering', 'Repairs', 'Finishes', 'Interior / exterior', 'Not sure'],
      detalle: 'Details (optional)',
      detalleHint: 'Rough measurements, how many rooms, when you need it.',
      nombre: 'Your name (optional)',
      submit: 'Send on WhatsApp',
      sending: 'Preparing your message…',
      note: 'WhatsApp opens with your message already written. Ray receives it when you send it.',
      doneTitle: 'Your message is ready in WhatsApp.',
      doneBody: 'Press send in WhatsApp so Ray receives it. If it did not open, tap the button.',
      doneButton: 'Open WhatsApp',
    },
    footer: { area: 'Puerto Vallarta, Jalisco', whatsapp: 'WhatsApp', call: 'Call' },
    sticky: { whatsapp: 'WhatsApp', call: 'Call' },
  },
}
