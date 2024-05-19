import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async () => {
  if (!import.meta.env.CV_FILE_URL) {
    return new Response("Missing file URL", { status: 500 });
  }

  const file = await fetch(import.meta.env.CV_FILE_URL);

  return new Response(await file.arrayBuffer());
};
