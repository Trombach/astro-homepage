import type { z } from "astro:schema";

export default async function fetchWithSchema<S extends z.ZodTypeAny>(
  schema: S,
  input: URL | string,
  init?: RequestInit,
): Promise<z.infer<S> | z.ZodError> {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error(
      `Error fetching data from ${input}: ${response.status} ${response.statusText}`,
    );
  }

  const json = await response.json();
  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    console.error(parsed.error);
    return parsed.error;
  }

  return parsed.data;
}
