# ==============================================================================
# Stage 1: Builder
# ==============================================================================
FROM node:25-alpine AS builder
WORKDIR /app

# Copy package files first for better layer caching
COPY package.json pnpm-lock.yaml ./

# Install corepack and pnpm, then install dependencies
RUN npm install -g corepack@latest --force && \
    corepack enable && \
    pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Accept build arguments for build-time environment variables
ARG VERCEL_STORAGE_URL
ARG CV_FILE_NAME
ARG TURNSTILE_SITE_KEY
ARG IS_PREVIEW
ARG GH_TOKEN

# Set environment variables for the build process
ENV VERCEL_STORAGE_URL=$VERCEL_STORAGE_URL \
  CV_FILE_NAME=$CV_FILE_NAME \
  TURNSTILE_SITE_KEY=$TURNSTILE_SITE_KEY \
  IS_PREVIEW=$IS_PREVIEW \
  GH_TOKEN=$GH_TOKEN

# Build the application
RUN pnpm build

# ==============================================================================
# Stage 2: Production
# ==============================================================================
FROM node:25-alpine AS production
WORKDIR /app

# Install corepack for pnpm support
RUN npm install -g corepack@latest --force && corepack enable

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nodejs -u 1001

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Runtime environment variables (server-side routes need these)
ARG VERCEL_STORAGE_URL
ARG CV_FILE_NAME
ARG IS_PREVIEW
ARG GH_TOKEN

ENV VERCEL_STORAGE_URL=$VERCEL_STORAGE_URL \
  CV_FILE_NAME=$CV_FILE_NAME \
  IS_PREVIEW=$IS_PREVIEW \
  GH_TOKEN=$GH_TOKEN \
  HOST=0.0.0.0 \
  PORT=4321

# Set ownership of app directory to non-root user
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose the port
EXPOSE 4321

# Health check for container orchestration
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:4321/', (r) => { process.exit(r.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the application
CMD ["node", "./dist/server/entry.mjs"]
