// Carga datos por defecto si las tablas están vacías. Idempotente: no pisa
// cambios hechos desde el admin (solo inserta si no hay nada).
const { Client } = require('pg')

const COOKIES = [
  { name: 'Chocolate Chip Clásica', slug: 'chocolate-chip-clasica', description: 'La de toda la vida, pero mejor. Masa con azúcar mascabo, chips de chocolate semiamargo y una pizca de sal marina que lo cambia todo.', ingredients: ['Harina', 'Manteca', 'Azúcar mascabo', 'Huevo', 'Chips de chocolate semiamargo', 'Esencia de vainilla', 'Sal marina'], price: 'desde $1.900 c/u', image: '/images/cookies-hero.jpg', accent: '#bd672b', tags: ['Más vendida'], featured: true, order: 1 },
  { name: 'Doble Chocolate', slug: 'doble-chocolate', description: 'Para los fanáticos del cacao. Masa de chocolate intenso con chips que se derriten apenas la mordés. Tibia es una experiencia religiosa.', ingredients: ['Harina', 'Cacao amargo', 'Manteca', 'Azúcar', 'Huevo', 'Chips de chocolate', 'Chocolate semiamargo fundido'], price: 'desde $2.100 c/u', image: '/images/flavor-chocolate.jpg', accent: '#5c4130', tags: ['Intensa'], featured: true, order: 2 },
  { name: 'Red Velvet', slug: 'red-velvet', description: 'El clásico americano en formato cookie: suave toque de cacao, color rojo profundo y un frosting de queso crema que la corona.', ingredients: ['Harina', 'Cacao', 'Manteca', 'Azúcar', 'Huevo', 'Colorante natural de remolacha', 'Frosting de queso crema'], price: 'desde $2.300 c/u', image: '/images/flavor-redvelvet.jpg', accent: '#a11d2e', tags: ['Edición especial'], featured: true, order: 3 },
  { name: 'Dulce de Leche', slug: 'dulce-de-leche', description: 'Bien argentina. Cookie de vainilla rellena de dulce de leche repostero que se desborda en cada mordida. Imposible comer una sola.', ingredients: ['Harina', 'Manteca', 'Azúcar', 'Huevo', 'Vainilla', 'Dulce de leche repostero'], price: 'desde $2.300 c/u', image: '/images/cookies-tin.jpg', accent: '#9c5026', tags: ['Rellena', 'Favorita'], featured: true, order: 4 },
  { name: 'Vainilla & Chocolate Blanco', slug: 'vainilla-chocolate-blanco', description: 'Delicada y dulce. Masa de vainilla Madagascar con generosos trozos de chocolate blanco. La preferida de los que dicen "no me gusta tan chocolatoso".', ingredients: ['Harina', 'Manteca', 'Azúcar', 'Huevo', 'Vainilla Madagascar', 'Chips de chocolate blanco'], price: 'desde $2.000 c/u', image: '/images/blondies.jpg', accent: '#dd9450', tags: [], featured: false, order: 5 },
  { name: 'Brownie Cookie', slug: 'brownie-cookie', description: 'Mitad brownie, mitad cookie, 100% pecado. Húmeda, fudgy y profundamente chocolatosa, con esa tapita brillante de brownie de verdad.', ingredients: ['Chocolate semiamargo', 'Manteca', 'Azúcar', 'Huevo', 'Harina', 'Cacao', 'Nueces (opcional)'], price: 'desde $2.200 c/u', image: '/images/flavor-brownie.jpg', accent: '#43302d', tags: ['Nueva'], featured: false, order: 6 },
  { name: 'Frambuesa & Limón', slug: 'frambuesa-limon', description: 'La opción fresca y frutal. Masa con ralladura de limón, frambuesas y un glasé cítrico que equilibra lo dulce. Primavera en una cookie.', ingredients: ['Harina', 'Manteca', 'Azúcar', 'Huevo', 'Ralladura de limón', 'Frambuesas', 'Glasé de limón'], price: 'desde $2.200 c/u', image: '/images/flavor-frambuesa.jpg', accent: '#c2557a', tags: ['Frutal'], featured: false, order: 7 },
  { name: 'Cookies & Cream', slug: 'cookies-and-cream', description: 'Para los amantes de la galletita negra. Masa de vainilla cargada de trozos de Oreo y chips de chocolate blanco. Un golazo asegurado.', ingredients: ['Harina', 'Manteca', 'Azúcar', 'Huevo', 'Vainilla', 'Trozos de galleta tipo Oreo', 'Chips de chocolate blanco'], price: 'desde $2.100 c/u', image: '/images/cookies-dark.jpg', accent: '#3a322f', tags: [], featured: false, order: 8 },
]

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) { console.log('No DATABASE_URL, se omite seed'); return }

  const client = new Client({
    connectionString: url,
    ssl: url.includes('render.com') ? { rejectUnauthorized: false } : false,
  })

  try {
    await client.connect()

    // --- Settings (fila única id=1) ---
    const s = await client.query('SELECT COUNT(*)::int AS n FROM "web_cookies_no_config"')
    if (s.rows[0].n === 0) {
      const heroSubtitle = 'Recién horneadas, hechas a mano, con ingredientes de verdad. Tu antojo, a un mensaje de distancia.'
      const aboutText = 'En Cookies NyM cada cookie se amasa y hornea por encargo, en tandas chicas. Sin conservantes, sin atajos: manteca de verdad, chocolate de verdad y mucho cariño. El resultado es esa cookie de afuera crocante y adentro tierna que te hace cerrar los ojos en el primer bocado.'
      await client.query(
        `INSERT INTO "web_cookies_no_config" ("id","whatsapp","instagram","email","linkedin","heroSubtitle","aboutText","updatedAt")
         VALUES (1,$1,$2,$3,$4,$5,$6,CURRENT_TIMESTAMP)`,
        [
          process.env.NEXT_PUBLIC_WHATSAPP || '5491153347746',
          process.env.NEXT_PUBLIC_INSTAGRAM || 'nahirorrego',
          process.env.NEXT_PUBLIC_EMAIL || '',
          process.env.NEXT_PUBLIC_LINKEDIN || '',
          heroSubtitle,
          aboutText,
        ]
      )
      // Si vino mail/linkedin por env, los habilitamos
      if (process.env.NEXT_PUBLIC_EMAIL) await client.query('UPDATE "web_cookies_no_config" SET "emailEnabled"=true WHERE id=1')
      if (process.env.NEXT_PUBLIC_LINKEDIN) await client.query('UPDATE "web_cookies_no_config" SET "linkedinEnabled"=true WHERE id=1')
      console.log('Settings sembrados')
    } else {
      console.log('Settings ya existen, no se tocan')
    }

    // --- Cookies (solo si la tabla está vacía) ---
    const c = await client.query('SELECT COUNT(*)::int AS n FROM "web_cookies_no_productos"')
    if (c.rows[0].n === 0) {
      for (const k of COOKIES) {
        await client.query(
          `INSERT INTO "web_cookies_no_productos" ("name","slug","description","ingredients","price","image","accent","tags","featured","active","order","updatedAt")
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,true,$10,CURRENT_TIMESTAMP)
           ON CONFLICT ("slug") DO NOTHING`,
          [k.name, k.slug, k.description, k.ingredients, k.price, k.image, k.accent, k.tags, k.featured, k.order]
        )
      }
      console.log(`Cookies sembradas: ${COOKIES.length}`)
    } else {
      console.log('Cookies ya existen, no se tocan')
    }
  } catch (err) {
    console.log('Error en seed:', err.message)
  } finally {
    await client.end()
  }
}

main()
