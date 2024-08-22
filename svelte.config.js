import { vitePreprocess } from "@astrojs/svelte";
import { sveltePreprocess } from "svelte-preprocess";
import tailwindcss from "tailwindcss";

export default {
  preprocess: [
    sveltePreprocess({ postcss: { plugins: [tailwindcss] } }),
    vitePreprocess(),
  ],
};
