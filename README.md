# 🍪 Cookies NyM

Sitio web + tienda de catálogo para **Cookies NyM** — cookies artesanales horneadas a mano.
Incluye una **landing** completa (sabores, cajas, empresas, testimonios, FAQ, contacto) y un
**panel de administración** para editar todo sin tocar código.

Construido con **Next.js 15 (App Router) + TypeScript + Tailwind + Prisma + PostgreSQL**,
empaquetado con **Docker**. Mismo stack y arquitectura que el template `arman-travel-web`.

---

## ✨ Qué incluye

**Web pública (`/`)**
- Portada (hero) con imágenes en transición y CTA a WhatsApp
- Banda de ingredientes, sección "Nosotros", "Cómo funciona"
- Catálogo de cookies con ingredientes desplegables y botón "Pedir" (WhatsApp con mensaje listo)
- Cajas y cantidades con precios
- Sección Empresas & Eventos (regalos corporativos → LinkedIn)
- Testimonios, Preguntas Frecuentes
- Contacto multicanal (WhatsApp · Instagram · Email · LinkedIn) + formulario que guarda los pedidos
- Botón flotante de WhatsApp

**Panel de administración (`/admin`)**
- 🍪 **Cookies**: crear, editar, ocultar y borrar variedades, con ingredientes, precio, imagen (subida o URL), color y etiquetas
- 📱 **Contacto**: cambiar WhatsApp, **agregar mail y LinkedIn**, Instagram, y prender/apagar cada canal
- ✏️ **Contenido**: editar textos e imágenes de la portada y la sección "Nosotros", incluso poner un video
- 📥 **Pedidos**: ver las consultas que llegan del formulario

> Si la base de datos no está disponible, la web igual funciona mostrando el contenido por defecto.

---

## 🚀 Puesta en marcha con Docker (recomendado)

```bash
cp .env.example .env     # completá las variables (sobre todo ADMIN_PASSWORD y JWT_SECRET)
docker compose up --build
```

- Web: http://localhost:3000
- Admin: http://localhost:3000/admin  (usuario/clave según `.env`)

Al arrancar, el contenedor crea las tablas y carga los sabores por defecto automáticamente.
Las imágenes que subas desde el admin quedan guardadas en el volumen `uploads_data`.

---

## 🧑‍💻 Desarrollo local (sin Docker)

Necesitás Node 20+ y un PostgreSQL corriendo.

```bash
npm install
# Levantá solo la base con Docker (opcional):
docker compose up -d db
# Apuntá DATABASE_URL a localhost en .env y creá el esquema:
npx prisma db push
node scripts/seed.js     # carga los sabores por defecto
npm run dev
```

App en http://localhost:3000

---

## 🔑 Variables de entorno

Ver `.env.example`. Las más importantes:

| Variable | Para qué |
|---|---|
| `DATABASE_URL` | Conexión a PostgreSQL |
| `ADMIN_USER` / `ADMIN_PASSWORD` | Acceso al panel `/admin` |
| `JWT_SECRET` | Firma de la sesión del admin (poné algo largo y secreto) |
| `NEXT_PUBLIC_WHATSAPP` / `NEXT_PUBLIC_INSTAGRAM` | Contacto inicial (después se edita desde el admin) |

---

## 📁 Estructura

```
src/
  app/            # páginas (home, admin) y rutas de API
  components/     # componentes de la web + admin/
  data/           # contenido por defecto (sabores, textos)
  lib/            # prisma, auth, links, acceso a datos
prisma/           # schema de la base
scripts/          # init-db.js + seed.js (corren al arrancar el contenedor)
public/images/    # fotos de las cookies
public/uploads/   # imágenes subidas desde el admin (runtime)
```

Hecho con cariño (y mucha manteca) 🧈
