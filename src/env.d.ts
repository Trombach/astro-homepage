/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/actions.d.ts" />
/// <reference types="astro/client" />
/// <reference types="svelte-gestures" />

interface ImportMetaEnv {
  GH_TOKEN: string;
  VERCEL_ENV?: "production" | "preview" | "development";
  VERCEL_URL?: string;
  RESEND_TOKEN?: string;
  CV_FILE_ID?: string;
  GOOGLE_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Workaround for icon type checking
declare module "icons:astro/*" {
  const component: (
    props: astroHTML.JSX.SVGAttributes,
  ) => astroHTML.JSX.Element;
  export default component;
}

declare module "icons:svelte/*" {
  import { SvelteComponent } from "svelte";
  import type { SvelteHTMLElements } from "svelte/elements";
  export default class extends SvelteComponent<SvelteHTMLElements["svg"]> {}
}
