import containerQueries from "@tailwindcss/container-queries";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import type { PluginCreator } from "tailwindcss/types/config";

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
      values: theme("transitionDelay") || {},
    },
  );
});

const timelineAnimation = plugin(
  ({ addComponents, addUtilities, addVariant }) => {
    addComponents({
      ".timeline-slide-in-bottom": {
        "animation-timeline": "view()",
        "animation-range": "entry 100% contain 25%",
        "animation-name": "slide-scale-in-bottom",
        "animation-fill-mode": "both",
      },
    });

    addUtilities({
      "@keyframes slide-scale-in-bottom": {
        from: {
          transform: "translateY(100px)",
          scale: "0.8",
          opacity: "0",
        },
        to: {
          transform: "translateY(0)",
          scale: "1",
          opacity: "1",
        },
      },
    });

    addVariant(
      "supports-scroll-animation",
      "@supports (animation-timeline: scroll())",
    );
  },
);

const textShadow = plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      "text-shadow": (value) => ({
        textShadow: value,
      }),
    },
    { values: theme("textShadow") || {} },
  );
});

export default {
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
          from: {
            transform: "translateY(100px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        "slide-in":
          "slide-in-bottom 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      fontFamily: {
        display: ["Lobster", ...defaultTheme.fontFamily.sans],
        sans: ["Inter Variable", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono Variable", ...defaultTheme.fontFamily.mono],
      },
      dropShadow: {
        text: "2px 2px hsl(var(--background))",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
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
    containerQueries as {
      handler: PluginCreator;
      config?: Partial<Config>;
    },
    animationDelay,
    timelineAnimation,
    textShadow,
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config;
