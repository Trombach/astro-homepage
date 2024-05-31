import { ActionError } from "astro:actions";
import { Resend } from "resend";

export default async function sendEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  if (!import.meta.env.RESEND_TOKEN) {
    const message = "Missing token";
    console.error(message);

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message,
    });
  }

  const resend = new Resend(import.meta.env.RESEND_TOKEN);
  const response = await resend.emails.send({
    from: "homepage-contact@lukastrombach.dev",
    to: ["contact@lukastrombach.dev"],
    reply_to: email,
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
