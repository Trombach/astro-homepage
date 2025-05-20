import { opendir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";
import Beasties, { type Options } from "beasties";

type AstroBeastiesOptions = {
  beasties: Options;
};

export default (options?: AstroBeastiesOptions): AstroIntegration => {
  // TODO asset prefix path

  return {
    name: "astro-beasties",
    hooks: {
      "astro:build:done": async ({ dir, logger: l }) => {
        const logger = l.fork("beasties");

        const dist = fileURLToPath(dir);
        const beasties = new Beasties({
          path: dist,
          logger,
          pruneSource: false,
          ...options?.beasties,
        });

        logger.info("Inlining critical css");

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

            const inlined = await beasties.process(fileContent);
            await writeFile(filePath, inlined);

            n++;
          }
        } catch (e) {
          if (e instanceof Error) {
            logger.error(`❌ Error inlining critical css: ${e.message}`);
          }
        }

        logger.info(`✅ Inlined critical css for ${n} pages`);
      },
    },
  };
};
