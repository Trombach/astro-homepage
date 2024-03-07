/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  GH_TOKEN: string;
  VERCEL_ENV?: "production" | "preview" | "development";
  VERCEL_URL?: string;
}

// eslint-disable-next-line no-redeclare, no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
