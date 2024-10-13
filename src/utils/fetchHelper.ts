import { VERCEL_URL } from "astro:env/server";
import type { z } from "astro:schema";

export default async function fetchWithSchema<S extends z.ZodTypeAny>(
  schema: S,
  input: URL | string,
  init?: RequestInit,
): Promise<z.infer<S> | z.ZodError> {
  const inp = typeof input === "string" ? getURL(input) : input;
  const response = await fetch(inp, init);

  if (!response.ok) {
    throw new Error(
      `Error fetching data from ${inp}: ${response.status} ${response.statusText}`,
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

function getURL(
  inputUrl: URL | string,
  searchParams?: { [key: string]: string },
) {
  let url =
    typeof inputUrl === "string" && inputUrl.startsWith("http")
      ? new URL(inputUrl)
      : new URL(
          inputUrl,
          VERCEL_URL ? `https://${VERCEL_URL}` : "http://localhost:4321",
        );

  if (searchParams) {
    url = new URL(
      `${url.origin}${url.pathname}${new URLSearchParams({ ...url.searchParams, ...searchParams })}`,
    );
  }

  return url;
}
