FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS deps
RUN npm ci --only=production

FROM base AS test-deps
RUN npm ci

FROM node:18-alpine AS production
WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN chown -R appuser:appgroup /app
USER appuser

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/quiz/health || exit 1

CMD ["node", "server.js"]
