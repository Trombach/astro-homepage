/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      borderRadius: {
        "4xl": "2rem",
      },
    },
    extend: {},
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  }
};
