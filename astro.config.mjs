import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    svelte(),
    icon({
      include: {
        logos: [
          "typescript-icon",
          "angular-icon",
          "javascript",
          "html-5",
          "css-3",
          "tailwindcss-icon",
          "nextjs-icon",
          "git-icon",
          "github-icon",
          "go",
          "bash-icon",
          "rust",
          "astro-icon",
          "nodejs-icon",
          "svelte-icon",
        ],
      },
    }),
  ],
  image: {
    domains: ["placehold.co"],
  },
  prefetch: {
    prefetchAll: true,
  },
});
