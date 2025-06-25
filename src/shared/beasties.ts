import { outDir } from "astro:config/server";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Options as BeastiesOptions } from "beasties";
import Beasties from "beasties";

const options = {
  pruneSource: false,
  inlineFonts: true,
  allowRules: [":root.dark"],
  mergeStylesheets: false,
  reduceInlineStyles: false,
} as const satisfies BeastiesOptions;

const beastiesSSR = new Beasties({
  path: path.join(fileURLToPath(outDir), "client"),
  ...options,
});

export { options, beastiesSSR };
export default new Beasties({
  path: path.join(fileURLToPath(outDir), "client"),
  ...options,
});
