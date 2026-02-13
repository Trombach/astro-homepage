import {
  type ActionAPIContext,
  ActionError,
  defineAction,
} from "astro:actions";
import {
  RESEND_TOKEN,
  TURNSTILE_SECRET_KEY,
  TURNSTILE_SITEVERIFY_URL,
} from "astro:env/server";
import { z } from "astro:schema";
import { Resend } from "resend";

export const contact = defineAction({
  accept: "form",
  input: z.object({
    name: z.string({ message: "Name is required" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email" }),
    message: z
      .string({ message: "Message is required" })
      .min(10, { message: "Message must be at least 10 characters long" }),
    "cf-turnstile-response": z.string(),
  }),
  handler: async (
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
  ) => {
    let outcome: { success: boolean };

    try {
      const verification = await fetch(TURNSTILE_SITEVERIFY_URL, {
        body: JSON.stringify({
          TURNSTILE_SECRET_KEY,
          response: token,
          remoteip: clientAddress,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      outcome = await verification.json();
    } catch (err) {
      console.error(err);
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }

    if (!outcome.success) {
      throw new ActionError({ code: "TOO_MANY_REQUESTS", message: "🤖" });
    }

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
  },
});
