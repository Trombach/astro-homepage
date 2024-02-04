import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import Icons from "unplugin-icons/vite";
import lighthouse from "astro-lighthouse";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), lighthouse(), mdx()],
  image: {
    domains: ["placehold.co"]
  },
  prefetch: {
    prefetchAll: true
  },
  vite: {
    plugins: [Icons({
      compiler: "astro"
    })]
  }
});