import type { APIRoute } from "astro";
import { getImage } from "astro:assets";
import { getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({
  params: { slug },
  redirect,
  request,
}) => {
  // redirect if slug is undefined
  if (!slug) {
    return redirect("/og.png", 307);
  }

  const entry = await getEntry("projects", slug);

  // redirect if entry is undefined or doesn't have a cover image
  if (!entry || !entry.data.cover) {
    return redirect("/og.png", 307);
  }

  const image = await getImage({
    src: entry.data.cover,
    width: 1200,
    height: 630,
    format: "png",
  });

  const img = await fetch(`${new URL(request.url).origin}${image.src}`);

  return new Response(await img.arrayBuffer());
};
