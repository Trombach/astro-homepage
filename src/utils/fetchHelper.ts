/* global URL RequestInit fetch */

import type { z } from "astro/zod";

export default async function fetchWithSchema<T>(
  schema: z.ZodSchema<T>,
  input: URL | string,
  init?: RequestInit,
) {
  const url = parseInput(input);

  const data = await fetch(url, init);
  return schema.parse(await data.json());
}

function parseInput(input: URL | string) {
  // return early if we already have a URL
  if (input instanceof URL) {
    return input;
  }

  // check if qualified URL string
  if (/^https?:\/\//.test(input)) {
    return new URL(input);
  }

  // we have a relative URL path
  // figure out base path based on environment
  const base = import.meta.env.VERCEL_URL
    ? `https://${import.meta.env.VERCEL_URL}`
    : "http://localhost:4321";

  return new URL(input, base);
}
