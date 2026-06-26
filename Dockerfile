FROM node:20-alpine AS base

# --- Dependencias ---
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# --- Builder ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG DATABASE_URL=postgresql://cookies_user:cookies_password@db:5432/cookies_nym
ENV DATABASE_URL=$DATABASE_URL

RUN npx prisma generate
RUN npm run build

# --- Runner ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# pg para los scripts de init/seed de la base
RUN npm install pg --prefix /app/tools --no-save 2>/dev/null

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/scripts/init-db.js ./scripts/init-db.js
COPY --from=builder /app/scripts/seed.js ./scripts/seed.js

# Carpeta para imágenes subidas desde el admin (se monta un volumen encima)
RUN mkdir -p /app/public/uploads && chown -R nextjs:nodejs /app/public/uploads

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Crea tablas y carga datos por defecto, luego arranca el servidor
CMD ["sh", "-c", "NODE_PATH=/app/tools/node_modules node scripts/init-db.js && NODE_PATH=/app/tools/node_modules node scripts/seed.js; node server.js"]
