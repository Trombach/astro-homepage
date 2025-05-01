import { When, whenAmI } from "@it-astro:when";
import { defineMiddleware } from "astro:middleware";
import { beastiesSSR as beasties } from "@shared/beasties";
import type { MiddlewareHandler } from "astro";

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
