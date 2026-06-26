// Contenido por defecto de Cookies NyM.
// Se usa como:
//   1) datos semilla de la base (scripts/seed.js refleja esta lista)
//   2) fallback cuando la base de datos no está disponible
// Todo esto es editable desde el panel /admin una vez que la base está cargada.

export type Cookie = {
  id: number
  name: string
  slug: string
  description: string
  ingredients: string[]
  price: string
  image: string
  accent: string
  tags: string[]
  featured: boolean
  active: boolean
  order: number
}

export type Settings = {
  brandName: string
  tagline: string
  contactName: string
  whatsapp: string
  whatsappEnabled: boolean
  email: string
  emailEnabled: boolean
  instagram: string
  instagramEnabled: boolean
  linkedin: string
  linkedinEnabled: boolean
  zone: string
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  heroVideo: string
  aboutTitle: string
  aboutText: string
  aboutImage: string
}

export const defaultSettings: Settings = {
  brandName: 'Cookies NyM',
  tagline: 'Cookies artesanales horneadas a mano',
  contactName: 'Nahir Orrego',
  whatsapp: '5491153347746',
  whatsappEnabled: true,
  email: '',
  emailEnabled: false,
  instagram: 'nahirorrego',
  instagramEnabled: true,
  linkedin: '',
  linkedinEnabled: false,
  zone: 'CABA y Gran Buenos Aires',
  heroTitle: 'Cookies que se hornean con amor',
  heroSubtitle:
    'Recién horneadas, hechas a mano, con ingredientes de verdad. Tu antojo, a un mensaje de distancia.',
  heroImage: '/images/cookies-hero.jpg',
  heroVideo: '',
  aboutTitle: 'Hechas a mano, como tienen que ser',
  aboutText:
    'En Cookies NyM cada cookie se amasa y hornea por encargo, en tandas chicas. Sin conservantes, sin atajos: manteca de verdad, chocolate de verdad y mucho cariño. El resultado es esa cookie de afuera crocante y adentro tierna que te hace cerrar los ojos en el primer bocado.',
  aboutImage: '/images/proceso.jpg',
}

export const defaultCookies: Cookie[] = [
  {
    id: 1,
    name: 'Chocolate Chip Clásica',
    slug: 'chocolate-chip-clasica',
    description:
      'La de toda la vida, pero mejor. Masa con azúcar mascabo, chips de chocolate semiamargo y una pizca de sal marina que lo cambia todo.',
    ingredients: ['Harina', 'Manteca', 'Azúcar mascabo', 'Huevo', 'Chips de chocolate semiamargo', 'Esencia de vainilla', 'Sal marina'],
    price: 'desde $1.900 c/u',
    image: '/images/cookies-hero.jpg',
    accent: '#bd672b',
    tags: ['Más vendida'],
    featured: true,
    active: true,
    order: 1,
  },
  {
    id: 2,
    name: 'Doble Chocolate',
    slug: 'doble-chocolate',
    description:
      'Para los fanáticos del cacao. Masa de chocolate intenso con chips que se derriten apenas la mordés. Tibia es una experiencia religiosa.',
    ingredients: ['Harina', 'Cacao amargo', 'Manteca', 'Azúcar', 'Huevo', 'Chips de chocolate', 'Chocolate semiamargo fundido'],
    price: 'desde $2.100 c/u',
    image: '/images/flavor-chocolate.jpg',
    accent: '#5c4130',
    tags: ['Intensa'],
    featured: true,
    active: true,
    order: 2,
  },
  {
    id: 3,
    name: 'Red Velvet',
    slug: 'red-velvet',
    description:
      'El clásico americano en formato cookie: suave toque de cacao, color rojo profundo y un frosting de queso crema que la corona.',
    ingredients: ['Harina', 'Cacao', 'Manteca', 'Azúcar', 'Huevo', 'Colorante natural de remolacha', 'Frosting de queso crema'],
    price: 'desde $2.300 c/u',
    image: '/images/flavor-redvelvet.jpg',
    accent: '#a11d2e',
    tags: ['Edición especial'],
    featured: true,
    active: true,
    order: 3,
  },
  {
    id: 4,
    name: 'Dulce de Leche',
    slug: 'dulce-de-leche',
    description:
      'Bien argentina. Cookie de vainilla rellena de dulce de leche repostero que se desborda en cada mordida. Imposible comer una sola.',
    ingredients: ['Harina', 'Manteca', 'Azúcar', 'Huevo', 'Vainilla', 'Dulce de leche repostero'],
    price: 'desde $2.300 c/u',
    image: '/images/cookies-tin.jpg',
    accent: '#9c5026',
    tags: ['Rellena', 'Favorita'],
    featured: true,
    active: true,
    order: 4,
  },
  {
    id: 5,
    name: 'Vainilla & Chocolate Blanco',
    slug: 'vainilla-chocolate-blanco',
    description:
      'Delicada y dulce. Masa de vainilla Madagascar con generosos trozos de chocolate blanco. La preferida de los que dicen "no me gusta tan chocolatoso".',
    ingredients: ['Harina', 'Manteca', 'Azúcar', 'Huevo', 'Vainilla Madagascar', 'Chips de chocolate blanco'],
    price: 'desde $2.000 c/u',
    image: '/images/blondies.jpg',
    accent: '#dd9450',
    tags: [],
    featured: false,
    active: true,
    order: 5,
  },
  {
    id: 6,
    name: 'Brownie Cookie',
    slug: 'brownie-cookie',
    description:
      'Mitad brownie, mitad cookie, 100% pecado. Húmeda, fudgy y profundamente chocolatosa, con esa tapita brillante de brownie de verdad.',
    ingredients: ['Chocolate semiamargo', 'Manteca', 'Azúcar', 'Huevo', 'Harina', 'Cacao', 'Nueces (opcional)'],
    price: 'desde $2.200 c/u',
    image: '/images/flavor-brownie.jpg',
    accent: '#43302d',
    tags: ['Nueva'],
    featured: false,
    active: true,
    order: 6,
  },
  {
    id: 7,
    name: 'Frambuesa & Limón',
    slug: 'frambuesa-limon',
    description:
      'La opción fresca y frutal. Masa con ralladura de limón, frambuesas y un glasé cítrico que equilibra lo dulce. Primavera en una cookie.',
    ingredients: ['Harina', 'Manteca', 'Azúcar', 'Huevo', 'Ralladura de limón', 'Frambuesas', 'Glasé de limón'],
    price: 'desde $2.200 c/u',
    image: '/images/flavor-frambuesa.jpg',
    accent: '#c2557a',
    tags: ['Frutal'],
    featured: false,
    active: true,
    order: 7,
  },
  {
    id: 8,
    name: 'Cookies & Cream',
    slug: 'cookies-and-cream',
    description:
      'Para los amantes de la galletita negra. Masa de vainilla cargada de trozos de Oreo y chips de chocolate blanco. Un golazo asegurado.',
    ingredients: ['Harina', 'Manteca', 'Azúcar', 'Huevo', 'Vainilla', 'Trozos de galleta tipo Oreo', 'Chips de chocolate blanco'],
    price: 'desde $2.100 c/u',
    image: '/images/cookies-dark.jpg',
    accent: '#3a322f',
    tags: [],
    featured: false,
    active: true,
    order: 8,
  },
]

// Opciones de cajas / cantidades (sección "Cajas")
export const boxes = [
  {
    name: 'Caja Degustación',
    qty: '4 cookies',
    description: 'Probá 4 sabores a elección. Ideal para conocernos.',
    price: '$6.900',
    highlight: false,
  },
  {
    name: 'Caja Clásica',
    qty: '6 cookies',
    description: 'La medida perfecta para compartir (o no). La más elegida.',
    price: '$9.900',
    highlight: true,
  },
  {
    name: 'Caja Familiar',
    qty: '12 cookies',
    description: 'Para los que no se quieren quedar sin. Surtido a gusto.',
    price: '$18.500',
    highlight: false,
  },
  {
    name: 'Caja Eventos',
    qty: '24 cookies',
    description: 'Cumpleaños, oficinas y celebraciones. Personalizable.',
    price: '$34.900',
    highlight: false,
  },
]

// Pasos de "Cómo funciona"
export const steps = [
  { n: '01', title: 'Elegí tus sabores', text: 'Armá tu caja a gusto entre todas las variedades.' },
  { n: '02', title: 'Hacé tu pedido', text: 'Por WhatsApp, en un minuto y sin vueltas.' },
  { n: '03', title: 'Horneamos para vos', text: 'Recién hechas, en tandas chicas, el día de la entrega.' },
  { n: '04', title: 'Las recibís', text: 'Envío en CABA y GBA o retiro coordinado. Frescas siempre.' },
]

// Testimonios
export const testimonials = [
  { name: 'Sofía M.', text: 'Las mejores cookies que probé en Buenos Aires. La de dulce de leche es de otro planeta.', role: 'Palermo' },
  { name: 'Martín G.', text: 'Pedí una caja x24 para la oficina y volaron en minutos. Repetimos seguro.', role: 'Pedido corporativo' },
  { name: 'Caro P.', text: 'El Red Velvet con frosting es adictivo y llegaron fresquísimas. Atención 10 puntos.', role: 'Caballito' },
]

// Preguntas frecuentes
export const faqs = [
  { q: '¿Hacen envíos?', a: 'Sí, hacemos envíos en CABA y Gran Buenos Aires. También podés coordinar el retiro sin cargo.' },
  { q: '¿Cuánto duran las cookies?', a: 'Se mantienen frescas entre 5 y 7 días en un recipiente hermético. También se pueden freezar y calentar 10 segundos antes de comer.' },
  { q: '¿Tienen opciones sin TACC o veganas?', a: 'Sí, varias variedades se pueden adaptar sin TACC o veganas bajo pedido. Consultanos por WhatsApp.' },
  { q: '¿Con cuánta anticipación tengo que pedir?', a: 'Para cajas chicas, 24 hs. Para cajas de eventos o pedidos corporativos, te pedimos 48 hs de anticipación.' },
  { q: '¿Qué medios de pago aceptan?', a: 'Efectivo, transferencia y Mercado Pago. Para empresas también emitimos comprobante.' },
]
