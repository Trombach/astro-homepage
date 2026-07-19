import { ALTCHA_HMAC_SIGNATURE } from "astro:env/server";
import { config } from "virtual:astro-altcha-config";
import { createChallenge, randomInt } from "altcha-lib";
import { deriveKey } from "altcha-lib/algorithms/pbkdf2";
import { deriveHmacKeySecret } from "altcha-lib/frameworks/shared";
import type { APIRoute } from "astro";

export const GET = (async (context) => {
  if (context.cache.enabled) {
    context.cache.set(false);
  }

  const challenge = await createChallenge({
    algorithm: "PBKDF2/SHA-256",
    cost: 5_000,
    counter: randomInt(5_000, 10_000),
    deriveKey,
    ...config,
    hmacSignatureSecret: ALTCHA_HMAC_SIGNATURE,
    hmacKeySignatureSecret: await deriveHmacKeySecret(ALTCHA_HMAC_SIGNATURE),
  });

  return Response.json(challenge);
}) satisfies APIRoute;
