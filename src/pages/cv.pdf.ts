import type { APIRoute } from "astro";
import {
  PUBLIC_VERCEL_STORAGE_URL,
  PUBLIC_CV_FILE_NAME,
} from "astro:env/server";

export const prerender = false;

export const GET: APIRoute = async () => {
  if (!PUBLIC_VERCEL_STORAGE_URL) {
    return new Response("Vercel storage URL not set", { status: 500 });
  }

  if (!PUBLIC_CV_FILE_NAME) {
    return new Response("Missing CV file name", { status: 500 });
  }

  const file = await fetch(
    new URL(PUBLIC_CV_FILE_NAME, PUBLIC_VERCEL_STORAGE_URL),
  );

  if (file.ok) {
    return new Response(await file.arrayBuffer());
  } else {
    return new Response("Error fetching data: ", {
      status: 500,
      statusText: `${file.status} ${file.statusText}`,
    });
  }
};
