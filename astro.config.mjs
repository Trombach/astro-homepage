import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import Icons from "unplugin-icons/vite";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";
import addsToHead from "./adds-to-head-integration";
import remarkGithub from "remark-github";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), mdx(), react(), addsToHead(), sitemap()],
  image: {
    domains: ["placehold.co"],
  },
  markdown: {
    remarkPlugins: [remarkGithub],
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
    },
  }),
  site: "https://www.lukastrombach.dev",
});
