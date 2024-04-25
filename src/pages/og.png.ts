import OgImage from "@components/OgImage/OgImage";
import { ImageResponse } from "@vercel/og";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  return new ImageResponse(OgImage(), {
    width: 1200,
    height: 630,
  });
};
