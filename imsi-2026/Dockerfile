

FROM node:22-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build


# Etapa 2: executar o frontend
FROM node:22-alpine AS frontend

ENV NODE_ENV=production
WORKDIR /app/frontend

COPY --chown=node:node frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY --from=frontend-build --chown=node:node /app/frontend/dist ./dist

USER node

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:8080').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "8080"]

FROM node:22-alpine AS backend

ENV NODE_ENV=production
WORKDIR /app/backend

COPY --chown=node:node backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev

COPY --chown=node:node backend/src ./src

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/frutas').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "src/main.js"]
