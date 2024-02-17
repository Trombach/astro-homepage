/* eslint-env node */

/** @type import('prettier').Config */
module.exports = {
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-svelte",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-astro-organize-imports",
  ],
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
};
