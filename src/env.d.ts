/// <reference path="../.astro/types.d.ts" />
/// <reference types="@types/cloudflare-turnstile" />

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

declare module "@fontsource-variable/inter" { }
declare module "@fontsource-variable/jetbrains-mono" { }
declare module "@fontsource/lobster" { }
