import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import Icons from "unplugin-icons/vite";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), mdx(), react()],
  image: {
    domains: ["placehold.co"],
  },
  prefetch: {
    prefetchAll: true,
  },
  vite: {
    plugins: [Icons({ compiler: "svelte" }), Icons({ compiler: "astro" })],
    resolve: {
      alias: [
        { find: "icons:svelte", replacement: "~icons" },
        { find: "icons:astro", replacement: "~icons" },
      ],
    },
  },
  output: "hybrid",
  adapter: vercel({ imageService: true, webAnalytics: { enabled: true } }),
  site: "https://astro-homepage-one.vercel.app",
});
