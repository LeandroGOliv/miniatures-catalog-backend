# ──────────────────────────────────────────
# Stage 1: deps — instala dependências
# ──────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ──────────────────────────────────────────
# Stage 2: build — compila o TypeScript
# ──────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app
RUN npm install -g pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN DATABASE_URL="postgresql://x:x@localhost:5432/x" pnpm prisma generate
RUN pnpm build

# ──────────────────────────────────────────
# Stage 3: development — hot reload com ts-node
# ──────────────────────────────────────────
FROM node:20-alpine AS development
WORKDIR /app
RUN npm install -g pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN DATABASE_URL="postgresql://x:x@localhost:5432/x" pnpm prisma generate
EXPOSE 6060
CMD ["pnpm", "start:dev"]

# ──────────────────────────────────────────
# Stage 4: production — imagem final enxuta
# ──────────────────────────────────────────
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/prisma ./prisma

EXPOSE 6060
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]