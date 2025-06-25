import { opendir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";
import Beasties from "beasties";

export default (): AstroIntegration => {
  // TODO asset prefix path

  return {
    name: "astro-beasties",
    hooks: {
      "astro:config:setup": ({ addMiddleware }) => {
        return addMiddleware({
          order: "post",
          entrypoint: new URL("./beasties-middleware", import.meta.url),
        });
      },
      "astro:build:done": async ({ dir, logger: l }) => {
        const logger = l.fork("astro-beasties");

        const dist = fileURLToPath(dir);
        const beasties = new Beasties({
          path: dist,
          logger,
          ...{
            pruneSource: false,
            inlineFonts: true,
            allowRules: [":root.dark"],
            mergeStylesheets: false,
            reduceInlineStyles: false,
          },
        });

        logger.info("🦔 Inlining critical css for static files");

        let n = 0;
        try {
          const handle = await opendir(dist, { recursive: true });
          for await (const entry of handle) {
            if (
              entry.isDirectory() ||
              (entry.isFile() && !entry.name.endsWith(".html"))
            ) {
              continue;
            }

            const filePath = path.join(entry.parentPath, entry.name);
            const fileContent = await readFile(filePath, "utf-8");

            logger.info(`▶ Inlining ${path.relative(dist, filePath)}`);

            const inlined = await beasties.process(fileContent);
            await writeFile(filePath, inlined);

            n++;
          }
        } catch (e) {
          logger.error(
            `❌ Error inlining critical css: ${e instanceof Error ? e.message : String(e)}`,
          );
        }

        logger.info(`✅ Inlined critical css for ${n} pages`);
      },
    },
  };
};
