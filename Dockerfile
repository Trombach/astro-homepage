FROM node:lts-alpine AS runtime
WORKDIR /app

COPY . .

RUN corepack enable

RUN pnpm install
RUN --mount=type=secret,id=BLOB_READ_WRITE_TOKEN,env=BLOB_READ_WRITE_TOKEN \
    --mount=type=secret,id=RESEND_TOKEN,env=RESEND_TOKEN \
    --mount=type=secret,id=TURNSTILE_SECRET_KEY,env=TURNSTILE_SECRET_KEY \
    --mount=type=secret,id=TURNSTILE_SITEVERIFY_URL,env=TURNSTILE_SITEVERIFY_URL \
    --mount=type=secret,id=TURNSTILE_SITE_KEY,env=TURNSTILE_SITE_KEY \
    --mount=type=secret,id=VERCEL_STORAGE_URL,env=VERCEL_STORAGE_URL \
    --mount=type=secret,id=GH_TOKEN,env=GH_TOKEN \
    pnpm run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs
