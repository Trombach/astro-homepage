import type { ActionAPIContext } from "astro/actions/runtime/utils.js";
import { ActionError } from "astro:actions";
import { TURNSTILE_SITEVERIFY_URL } from "astro:env/server";
import { getSecret } from "astro:env/server";
import { Resend } from "resend";

export default async function sendEmail(
  {
    name,
    email,
    message,
    "cf-turnstile-response": token,
  }: {
    name: string;
    email: string;
    message: string;
    "cf-turnstile-response": string;
  },
  { clientAddress }: ActionAPIContext,
) {
  const verification = await fetch(TURNSTILE_SITEVERIFY_URL, {
    body: JSON.stringify({
      secret: getSecret("TURNSTILE_SECRET_KEY"),
      response: token,
      remoteip: clientAddress,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const outcome = await verification.json();

  if (!outcome.success) {
    throw new ActionError({ code: "TOO_MANY_REQUESTS", message: "🤖" });
  }

  const RESEND_TOKEN = getSecret("RESEND_TOKEN");

  if (!RESEND_TOKEN) {
    const message = "Missing token";
    console.error(message);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message,
    });
  }

  const resend = new Resend(RESEND_TOKEN);
  const response = await resend.emails.send({
    from: "homepage-contact@lukastrombach.dev",
    to: ["contact@lukastrombach.dev"],
    replyTo: email,
    subject: `Message from ${name} <${email}>`,
    text: message,
    tags: [{ name: "category", value: "homepage-contact" }],
  });

  if (response.error) {
    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Error sending email: ${response.error.name} ${response.error.message}`,
    });
  }

  return {
    success: true,
    id: response.data?.id,
  } as const;
}
