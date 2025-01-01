import { copyFile, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";

async function copyFiles(srcDir: string, destDir: string) {
  const files = await readdir(srcDir);

  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);

    const stats = await stat(srcPath);

    if (stats.isDirectory()) {
      await mkdir(destPath, { recursive: true });
      await copyFiles(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

export default function copyFilesPlugin(): AstroIntegration {
  return {
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        logger.info("Copying files to .vercel/output/static");

        const distDir = fileURLToPath(dir.href);
        const staticDir = path.resolve(".vercel/output/static");

        await mkdir(staticDir, { recursive: true });
        await copyFiles(distDir, staticDir);
      },
    },
    name: "copy-files",
  };
}
