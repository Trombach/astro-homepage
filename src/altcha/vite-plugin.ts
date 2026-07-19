import type { AstroConfig } from "astro";
import type { AstroAltchaConfig } from "./types";

export const virtualModuleId = "virtual:astro-altcha-config";
const resolvedVirtualModuleId = `\0${virtualModuleId}`;

const plugin = (
  config: AstroAltchaConfig,
): NonNullable<AstroConfig["vite"]["plugins"]>[number] => {
  return {
    name: "vite-plugin-altcha-config",
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
      return;
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export const config =
${JSON.stringify(config)}`;
      }
      return;
    },
  };
};

export default plugin;
