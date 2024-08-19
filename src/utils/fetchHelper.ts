/* global URL RequestInit fetch URLSearchParams console */

import type { z } from "astro/zod";
import { VERCEL_URL } from "astro:env/server";

export default async function fetchWithSchema<S extends z.ZodTypeAny>(
  schema: S,
  input: URL | string,
  init?: RequestInit,
): Promise<z.infer<S> | z.ZodError> {
  if (typeof input === "string") {
    input = getURL(input);
  }

  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error(
      `Error fetching data from ${input}: ${response.status} ${response.statusText}`,
    );
  }

  try {
    const json = await response.json();
    const parsed = schema.safeParse(json);

    if (!parsed.success) {
      console.error(parsed.error);
      return parsed.error;
    }

    return parsed.data;
  } catch (err) {
    console.log(err);
    return;
  }
}

function getURL(url: URL | string, searchParams?: { [key: string]: string }) {
  if (typeof url === "string" && url.startsWith("http")) {
    url = new URL(url);
  } else {
    const base = VERCEL_URL ? `https://${VERCEL_URL}` : "http://localhost:4321";
    url = new URL(url, base);
  }

  if (searchParams) {
    url = new URL(
      `${url.origin}${url.pathname}${new URLSearchParams({ ...url.searchParams, ...searchParams })}`,
    );
  }

  return url;
}
