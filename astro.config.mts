import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import inoxToolswhen from "@inox-tools/astro-when";
import inoxToolsContentUtils from "@inox-tools/content-utils";
// @ts-expect-error
import rehypeFigure from "@microflash/rehype-figure";
import { defineConfig, envField } from "astro/config";
import astroStarlightRemarkAsides from "astro-starlight-remark-asides";
import remarkDirective from "remark-directive";
import remarkGithub from "remark-github";
import Icons from "unplugin-icons/vite";
import beasties from "./beasties-integration";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    svelte({ include: ["**/*.svelte"] }),
    mdx(),
    sitemap(),
    beasties(),
    inoxToolsContentUtils(),
    inoxToolswhen(),
  ],
  image: {
    domains: ["placehold.co"],
  },
  markdown: {
    remarkPlugins: [remarkGithub, remarkDirective, astroStarlightRemarkAsides],
    rehypePlugins: [rehypeFigure],
  },
  prefetch: {
    prefetchAll: true,
  },
  vite: {
    plugins: [
      Icons({
        compiler: "svelte",
      }),
      Icons({
        compiler: "astro",
      }),
    ],
    resolve: {
      alias: [
        {
          find: "icons:svelte",
          replacement: "~icons",
        },
        {
          find: "icons:astro",
          replacement: "~icons",
        },
      ],
    },
  },
  adapter: node({
    mode: "standalone",
  }),
  site: "https://www.lukastrombach.dev",
  trailingSlash: "never",
  env: {
    schema: {
      IS_PREVIEW: envField.boolean({
        context: "server",
        access: "public",
        default: true,
      }),
      GH_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      COOLIFY_FQDN: envField.string({
        context: "server",
        access: "public",
        optional: true,
      }),
      RESEND_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      VERCEL_STORAGE_URL: envField.string({
        context: "server",
        access: "public",
      }),
      CV_FILE_NAME: envField.string({
        context: "server",
        access: "public",
        default: "lukastrombach-cv.pdf",
      }),
      TURNSTILE_SITE_KEY: envField.string({
        context: "client",
        access: "public",
        default: "1x00000000000000000000AA",
      }),
      TURNSTILE_SITEVERIFY_URL: envField.string({
        context: "server",
        access: "public",
        url: true,
        default: "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      }),
      TURNSTILE_SECRET_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
  experimental: {
    contentIntellisense: true,
  },
});
