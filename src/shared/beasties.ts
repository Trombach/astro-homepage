import { outDir } from "astro:config/server";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Options as BeastiesOptions } from "beasties";
import Beasties from "beasties";

const options = {
  pruneSource: false,
  inlineFonts: true,
  allowRules: [":root:where(.dark,.dark *)"],
  mergeStylesheets: false,
  reduceInlineStyles: false,
} as const satisfies BeastiesOptions;

const beastiesSSR = new Beasties({
  path: path.join(fileURLToPath(outDir), "client"),
  ...options,
});

export { beastiesSSR, options };
export default new Beasties({
  path: path.join(fileURLToPath(outDir), "client"),
  ...options,
});
