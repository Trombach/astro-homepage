import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import crittersRs from "@critters-rs/astro";
import inoxToolsContentUtils from "@inox-tools/content-utils";
// @ts-expect-error
import rehypeFigure from "@microflash/rehype-figure";
import astroStarlightRemarkAsides from "astro-starlight-remark-asides";
import { defineConfig, envField } from "astro/config";
import remarkDirective from "remark-directive";
import remarkGithub from "remark-github";
import Icons from "unplugin-icons/vite";

import copyFilesPlugin from "./copy-files.ts";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    svelte({ include: ["**/*.svelte"] }),
    mdx(),
    sitemap(),
    inoxToolsContentUtils(),
    crittersRs({ pruneSource: true, preload: "BodyPreload" }),
    copyFilesPlugin(),
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
  adapter: vercel({
    imageService: false,
    maxDuration: 60,
  }),
  site: "https://www.lukastrombach.dev",
  trailingSlash: "never",
  env: {
    schema: {
      GH_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      VERCEL_URL: envField.string({
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
