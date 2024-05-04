import type { APIContext, APIRoute } from "astro";

const ENDPOINTS = ["/about"] as const;

export const prerender = false;

export const GET: APIRoute = async ({ request }: APIContext) => {
  const bypassToken = import.meta.env.ISR_BYPASS_TOKEN;

  try {
    for (const path of ENDPOINTS) {
      console.log(`${new URL(request.url).origin}${path}`);

      const response = await fetch(`${new URL(request.url).origin}${path}`, {
        headers: { "x-prerender-revalidate": bypassToken },
      });

      console.log(response.status);
    }
  } catch (err) {
    return new Response("Error refreshing route", { status: 500 });
  }

  return new Response(null, { status: 200 });
};
