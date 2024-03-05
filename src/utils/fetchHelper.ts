/* global URL RequestInit fetch URLSearchParams console */

import type { z } from "astro/zod";

export default async function fetchWithSchema<S extends z.ZodTypeAny>(
  schema: S,
  input: URL | string,
  init?: RequestInit,
): Promise<z.infer<S> | undefined> {
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
    return schema.parse(json);
  } catch (err) {
    console.log(err);
    return;
  }
}

function getURL(url: URL | string, searchParams?: { [key: string]: string }) {
  if (typeof url === "string" && url.startsWith("http")) {
    url = new URL(url);
  } else {
    const base = import.meta.env.VERCEL_URL
      ? `https://${import.meta.env.VERCEL_URL}`
      : "http://localhost:4321";
    url = new URL(url, base);
  }

  if (searchParams) {
    url = new URL(
      `${url.origin}${url.pathname}${new URLSearchParams({ ...url.searchParams, ...searchParams })}`,
    );
  }

  return url;
}
