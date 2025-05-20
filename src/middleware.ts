import path from "node:path";
import { fileURLToPath } from "node:url";
import { When, whenAmI } from "@it-astro:when";
import { outDir } from "astro:config/server";
import { defineMiddleware } from "astro:middleware";
import type { MiddlewareHandler } from "astro";
import Beasties from "beasties";

const beasties = new Beasties({
  path: path.join(fileURLToPath(outDir), "client"),
  pruneSource: false,
  inlineFonts: true,
  // @ts-expect-error pending package PR
  allowRules: [":root.dark"],
});

const beastiesMiddleware = defineMiddleware(async (_context, next) => {
  const response = await next();
  const html = await response.text();

  const inlined = await beasties.process(html);

  return new Response(inlined, { status: 200, headers: response.headers });
});

const middlewares: Record<When, MiddlewareHandler> = {
  [When.Prerender]: (_, next) => next(),
  [When.Client]: () => {
    throw new Error("Middleware should not run on client");
  },
  [When.DevServer]: beastiesMiddleware,
  [When.Server]: beastiesMiddleware,
  [When.StaticBuild]: beastiesMiddleware,
};

export const onRequest = middlewares[whenAmI];
