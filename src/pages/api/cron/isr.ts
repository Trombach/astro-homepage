import type { APIContext, APIRoute } from "astro";
import { timingSafeEqual } from "node:crypto";

const ENDPOINTS = ["/about"] as const;

export const prerender = false;

export const GET: APIRoute = async ({ request }: APIContext) => {
  const authHeader = request.headers.get("authorization");
  const secret = `Bearer ${import.meta.env.CRON_SECRET}`;

  if (!authHeader) {
    return new Response("Missing authentication", { status: 401 });
  }

  // use timingSafeEqual to prevent timing attacks
  if (!timingSafeEqual(Buffer.from(authHeader), Buffer.from(secret))) {
    return new Response("Access denied", { status: 401 });
  }

  const bypassToken = import.meta.env.ISR_BYPASS_TOKEN;

  try {
    for (const path of ENDPOINTS) {
      await fetch(`${new URL(request.url).origin}${path}`, {
        headers: { "x-prerender-revalidate": bypassToken },
      });
    }
  } catch (err) {
    return new Response("Error refreshing route", { status: 500 });
  }

  return new Response(null, { status: 200 });
};
