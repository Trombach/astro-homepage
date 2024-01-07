import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), icon()],
  image: {
    domains: ["placehold.co"]
  },
  prefetch: {
    prefetchAll: true
  }
});