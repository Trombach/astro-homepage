import type { Options as BeastiesOptions } from "beasties";

const options = {
  pruneSource: false,
  inlineFonts: true,
  // @ts-expect-error pending package PR
  allowRules: [":root.dark"],
  mergeStylesheets: false,
  reduceInlineStyles: false,
} as const satisfies BeastiesOptions;
export default options;
