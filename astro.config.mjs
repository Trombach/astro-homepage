import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import Icons from "unplugin-icons/vite";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";
import addsToHead from "./adds-to-head-integration";
import remarkGithub from "remark-github";
import sitemap from "@astrojs/sitemap";
import rehypeFigure from "@microflash/rehype-figure";

import vtbot from "astro-vtbot";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    svelte(),
    mdx(),
    react(),
    addsToHead(),
    sitemap(),
    vtbot(),
  ],
  image: {
    domains: ["placehold.co"],
  },
  markdown: {
    remarkPlugins: [remarkGithub],
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
  output: "hybrid",
  adapter: vercel({
    imageService: false,
    webAnalytics: {
      enabled: true,
    },
    isr: {
      bypassToken: import.meta.env.ISR_BYPASS_TOKEN,
      // caches all pages on first request and saves for 1 day
      expiration: 60 * 60 * 24,
      exclude: ["/contact"],
    },
  }),
  site: "https://www.lukastrombach.dev",
  experimental: {
    serverIslands: true,
    actions: true,
    env: {
      schema: {
        GH_TOKEN: envField.string({ context: "server", access: "secret" }),
        VERCEL_URL: envField.string({
          context: "server",
          access: "public",
          optional: true,
        }),
        RESEND_TOKEN: envField.string({ context: "server", access: "secret" }),
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
        }),
        TURNSTILE_SITEVERIFY_URL: envField.string({
          context: "server",
          access: "public",
          url: true,
        }),
        TURNSTILE_SECRET_KEY: envField.string({
          context: "server",
          access: "secret",
        }),
      },
    },
  },
});
