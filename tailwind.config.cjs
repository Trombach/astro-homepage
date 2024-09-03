const defaultTheme = require("tailwindcss/defaultTheme");
const typography = require("@tailwindcss/typography");
const containerQueries = require("@tailwindcss/container-queries");
const plugin = require("tailwindcss/plugin");

const animationDelay = plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      "animation-delay": (value) => {
        return {
          "animation-delay": value,
        };
      },
    },
    {
      values: theme("transitionDelay"),
    },
  );
});

const timelineAnimation = plugin(({ addComponents }) => {
  addComponents({
    ".timeline-slide-in-bottom": {
      "animation-timeline": "view()",
      "animation-range": "entry 100% contain 25%",
      "animation-name": "slide-in-bottom",
      "animation-fill-mode": "both",
    },
  });
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "selector",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      "l-xl": "1200px",
      xl: "1440px",
    },
    extend: {
      keyframes: {
        "slide-in-bottom": {
          "0%": {
            transform: "translateY(100px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
      },
      animation: {
        "slide-in":
          "slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      fontFamily: {
        sans: ["Inter Variable", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono Variable", ...defaultTheme.fontFamily.mono],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      height: {
        "screen-less-header": "calc(100svh - var(--header-height))",
      },
      minHeight: {
        "screen-less-header": "calc(100svh - var(--header-height))",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          green: "hsl(var(--primary-green))",
          pink: "hsl(var(--primary-pink))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
    },
  },
  plugins: [
    typography,
    containerQueries,

    animationDelay,
    timelineAnimation,
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
