import type { AstroIntegration } from "astro";
import type { AstroAltchaConfig } from "./types";
import plugin, { virtualModuleId } from "./vite-plugin";

export default (options: AstroAltchaConfig = {}): AstroIntegration => {
  const config = {
    challengePath: "/api/altcha/challenge",
    name: "altcha",
    ...options,
  } satisfies AstroAltchaConfig;

  return {
    name: "astro-altcha",
    hooks: {
      "astro:config:setup": ({ injectRoute, updateConfig, addMiddleware }) => {
        updateConfig({
          vite: {
            plugins: [plugin(config)],
          },
        });

        injectRoute({
          pattern: config.challengePath,
          entrypoint: new URL("./altcha-challenge.ts", import.meta.url),
          prerender: false,
        });

        addMiddleware({
          order: "pre",
          entrypoint: new URL("./altcha-middleware.ts", import.meta.url),
        });
      },
      "astro:config:done": ({ injectTypes }) => {
        injectTypes({
          filename: "astro-altcha-config.d.ts",
          content: `declare module "${virtualModuleId}" {
  export const config: Required<import("../../../src/altcha/types").AstroAltchaConfig>;
}
`,
        });
        injectTypes({
          filename: "astro-altcha-locals.d.ts",
          content: `declare namespace App {
  interface Locals {
    altcha: import("altcha/types").VerifySolutionResult
  }
}
`,
        });
      },
    },
  };
};
