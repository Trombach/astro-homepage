import { ALTCHA_HMAC_SIGNATURE } from "astro:env/server";
import { defineMiddleware } from "astro:middleware";
import { config } from "virtual:astro-altcha-config";
import { CappedMap } from "altcha-lib";
import { deriveKey } from "altcha-lib/algorithms/pbkdf2";
import { deriveHmacKeySecret, verify } from "altcha-lib/frameworks/shared";
import { z } from "astro/zod";
import { base64ToString } from "uint8array-extras";

const altchaPayloadSchema = z.object({
  challenge: z.object({
    parameters: z.object({
      algorithm: z.string(),
      cost: z.number(),
      keyLength: z.number(),
      keyPrefix: z.string(),
      keySignature: z.string(),
      nonce: z.string(),
      salt: z.string(),
    }),
    signature: z.string(),
  }),
  solution: z.object({
    counter: z.number(),
    derivedKey: z.string(),
    time: z.number(),
  }),
});

const store = new CappedMap({ maxSize: 500 });

const altchaMiddleware = defineMiddleware(async (context, next) => {
  if (context.request.method !== "POST") {
    return next();
  }

  if (
    !context.request.headers
      .get("content-type")
      ?.includes("multipart/form-data") &&
    !context.request.headers
      .get("content-type")
      ?.includes("application/x-www-form-urlencoded")
  ) {
    return next();
  }

  const body = Object.fromEntries(
    (await context.request.clone().formData()).entries(),
  );
  const altchaBase64 = body?.[config.name]?.toString();

  if (!altchaBase64) {
    return next();
  }

  const { success, data: altchaPayload } = altchaPayloadSchema.safeParse(
    JSON.parse(base64ToString(altchaBase64)),
  );

  if (!success) {
    return next();
  }

  const result = await verify(
    altchaPayload,
    deriveKey,
    ALTCHA_HMAC_SIGNATURE,
    await deriveHmacKeySecret(ALTCHA_HMAC_SIGNATURE),
    store,
  );

  if (!result.error) {
    context.locals.altcha = result.verification;
  }

  return next();
});

export const onRequest = altchaMiddleware;
