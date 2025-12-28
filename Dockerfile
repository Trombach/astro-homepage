# ============================================
# Stage 1: Build
# ============================================
FROM node:25-alpine AS builder
WORKDIR /app

# Install corepack and dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g corepack@latest --force && \
  corepack enable && \
  pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Accept build arguments and set as environment variables
ARG VERCEL_STORAGE_URL
ARG CV_FILE_NAME
ARG TURNSTILE_SITE_KEY
ARG IS_PREVIEW

ENV VERCEL_STORAGE_URL=$VERCEL_STORAGE_URL \
  CV_FILE_NAME=$CV_FILE_NAME \
  TURNSTILE_SITE_KEY=$TURNSTILE_SITE_KEY \
  IS_PREVIEW=$IS_PREVIEW

# Build the application
RUN pnpm build

# ============================================
# Stage 2: Production
# ============================================
FROM node:25-alpine
WORKDIR /app

# Install corepack
RUN npm install -g corepack@latest --force && corepack enable

# Copy package files for dependency installation
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built application
COPY --from=builder /app/dist ./dist

# Set runtime environment variables
ENV NODE_ENV=production \
  PORT=8080

EXPOSE 8080

# Start the server
CMD ["node", "./dist/server/entry.mjs"]