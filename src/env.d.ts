// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

/* global astroHTML */

interface ImportMetaEnv {
  GH_TOKEN: string;
  VERCEL_ENV?: "production" | "preview" | "development";
  VERCEL_URL?: string;
}

// eslint-disable-next-line no-redeclare, no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Workaround for icon type checking
declare module "icons:astro/*" {
  const component: (
    // eslint-disable-next-line no-unused-vars
    props: astroHTML.JSX.SVGAttributes,
  ) => astroHTML.JSX.Element;
  export default component;
}

declare module "icons:svelte/*" {
  import { SvelteComponent } from "svelte";
  import type { SvelteHTMLElements } from "svelte/elements";
  export default class extends SvelteComponent<SvelteHTMLElements["svg"]> {}
}
