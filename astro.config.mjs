// @ts-check

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import inoxToolsContentUtils from "@inox-tools/content-utils";
// @ts-ignore
import rehypeFigure from "@microflash/rehype-figure";
import astroStarlightRemarkAsides from "astro-starlight-remark-asides";
import { defineConfig, envField } from "astro/config";
import remarkDirective from "remark-directive";
import remarkGithub from "remark-github";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    svelte({ include: ["**/*.svelte"] }),
    mdx(),
    react({ include: ["**/*.tsx", "**/*.jsx"] }),
    sitemap(),
    inoxToolsContentUtils(),
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
  output: "hybrid",
  adapter: vercel({
    imageService: false,
    webAnalytics: {
      enabled: true,
    },
    maxDuration: 60,
  }),
  site: "https://www.lukastrombach.dev",
  experimental: {
    contentIntellisense: true,
    serverIslands: true,
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
