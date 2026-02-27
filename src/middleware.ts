import { defineMiddleware, sequence } from "astro:middleware";

const clientHintPrefersColorScheme = "Sec-CH-Prefers-Color-Scheme";

const clientHints = [
  ["Accept-CH", clientHintPrefersColorScheme],
  ["Critial-CH", clientHintPrefersColorScheme],
  ["Vary", clientHintPrefersColorScheme],
] as const satisfies Array<Array<string>>;

const sendClientHints = defineMiddleware(async (_, next) => {
  const response = await next();
  for (const [key, value] of clientHints) {
    response.headers.set(key, value);
  }

  return response;
});

const handleClientHints = defineMiddleware(
  async ({ locals, request }, next) => {
    if (!locals.prefersColorScheme) {
      locals.prefersColorScheme = request.headers.get(
        clientHintPrefersColorScheme,
      ) as "dark" | "light";
    }

    return await next();
  },
);

export const onRequest = sequence(sendClientHints, handleClientHints);
