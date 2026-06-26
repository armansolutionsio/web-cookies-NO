// Crea las tablas si no existen — corre al arrancar el contenedor.
const { Client } = require('pg')

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.log('No DATABASE_URL, se omite init de base')
    return
  }

  const client = new Client({
    connectionString: url,
    ssl: url.includes('render.com') ? { rejectUnauthorized: false } : false,
  })

  try {
    await client.connect()
    console.log('Conectado a PostgreSQL')

    await client.query(`
      CREATE TABLE IF NOT EXISTS "web_cookies_no_productos" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "slug" TEXT UNIQUE NOT NULL,
        "description" TEXT NOT NULL DEFAULT '',
        "ingredients" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
        "price" TEXT NOT NULL DEFAULT '',
        "image" TEXT NOT NULL DEFAULT '',
        "accent" TEXT NOT NULL DEFAULT '#d17e36',
        "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
        "featured" BOOLEAN NOT NULL DEFAULT false,
        "active" BOOLEAN NOT NULL DEFAULT true,
        "order" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS "web_cookies_no_config" (
        "id" INTEGER PRIMARY KEY DEFAULT 1,
        "brandName" TEXT NOT NULL DEFAULT 'Cookies NyM',
        "tagline" TEXT NOT NULL DEFAULT 'Cookies artesanales horneadas a mano',
        "contactName" TEXT NOT NULL DEFAULT 'Nahir Orrego',
        "whatsapp" TEXT NOT NULL DEFAULT '5491153347746',
        "whatsappEnabled" BOOLEAN NOT NULL DEFAULT true,
        "email" TEXT NOT NULL DEFAULT '',
        "emailEnabled" BOOLEAN NOT NULL DEFAULT false,
        "instagram" TEXT NOT NULL DEFAULT 'nahirorrego',
        "instagramEnabled" BOOLEAN NOT NULL DEFAULT true,
        "linkedin" TEXT NOT NULL DEFAULT '',
        "linkedinEnabled" BOOLEAN NOT NULL DEFAULT false,
        "zone" TEXT NOT NULL DEFAULT 'CABA y Gran Buenos Aires',
        "heroTitle" TEXT NOT NULL DEFAULT 'Cookies que se hornean con amor',
        "heroSubtitle" TEXT NOT NULL DEFAULT '',
        "heroImage" TEXT NOT NULL DEFAULT '/images/cookies-hero.jpg',
        "heroVideo" TEXT NOT NULL DEFAULT '',
        "aboutTitle" TEXT NOT NULL DEFAULT 'Hechas a mano, como tienen que ser',
        "aboutText" TEXT NOT NULL DEFAULT '',
        "aboutImage" TEXT NOT NULL DEFAULT '/images/proceso.jpg',
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS "web_cookies_no_pedidos" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "contact" TEXT NOT NULL,
        "message" TEXT NOT NULL DEFAULT '',
        "items" TEXT NOT NULL DEFAULT '',
        "status" TEXT NOT NULL DEFAULT 'nuevo',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS "web_cookies_no_pedidos_status_idx" ON "web_cookies_no_pedidos"("status");
    `)

    console.log('Tablas listas')
  } catch (err) {
    console.log('Error en init de base:', err.message)
  } finally {
    await client.end()
  }
}

main()
