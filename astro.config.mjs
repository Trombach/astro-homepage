import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import Icons from "unplugin-icons/vite";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), mdx()],
  image: {
    domains: ["placehold.co"],
  },
  prefetch: {
    prefetchAll: true,
  },
  vite: {
    plugins: [
      Icons({
        compiler: "astro",
      }),
    ],
  },
  output: "hybrid",
  adapter: vercel(),
  site: "https://astro-homepage-one.vercel.app",
});
