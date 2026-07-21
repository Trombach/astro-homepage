import {
  type ActionAPIContext,
  ActionError,
  defineAction,
} from "astro:actions";
import { RESEND_TOKEN } from "astro:env/server";
import { z } from "astro/zod";
import { Resend } from "resend";

export const contact = defineAction({
  accept: "form",
  input: z.object({
    name: z.string({ message: "Name is required" }),
    email: z.email({ message: "Invalid email" }),
    message: z
      .string({ message: "Message is required" })
      .min(10, { message: "Message must be at least 10 characters long" }),
  }),
  handler: async (payload, context: ActionAPIContext) => {
    if (!context.locals.altcha) {
      throw new ActionError({ code: "INTERNAL_SERVER_ERROR" });
    }

    if (!context.locals.altcha.verified) {
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
      replyTo: payload.email,
      subject: `Message from ${payload.name} <${payload.email}>`,
      text: payload.message,
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
