import { z } from "astro/zod";
import { Resend } from "resend";

type SendEmailResponse = {
  success: boolean;
  message: string;
  id?: string | undefined;
};

export default async function sendEmail(request: Request) {
  let data: FormData;
  try {
    data = await request.formData();
  } catch (err) {
    const message =
      "Error reading form data: " +
      (err instanceof TypeError
        ? `${err.name} ${err.message}`
        : JSON.stringify(err));

    console.error(message);

    return {
      success: false,
      message,
    } as const satisfies SendEmailResponse;
  }

  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  if (!import.meta.env.RESEND_TOKEN) {
    const message = "Missing token";
    console.error(message);

    return {
      success: false,
      message,
    } as const satisfies SendEmailResponse;
  }

  if (!name || !email || !message) {
    const message = "Missing required fields";
    console.error(message);

    return {
      success: false,
      message,
    } as const satisfies SendEmailResponse;
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return {
      success: false,
      message: "Unexpected field type",
    } as const satisfies SendEmailResponse;
  }

  if (!z.string().email().safeParse(email).success) {
    return {
      success: false,
      message: "Invalid email format",
    } as const satisfies SendEmailResponse;
  }

  const resend = new Resend(import.meta.env.RESEND_TOKEN);
  const response = await resend.emails.send({
    from: "homepage-contact@lukastrombach.dev",
    to: ["contact@lukastrombach.dev"],
    subject: `Message from ${name} <${email}>`,
    text: message,
    tags: [{ name: "category", value: "homepage-contact" }],
  });

  if (response.error) {
    return {
      success: false,
      message: `Error sending email: ${response.error.name} ${response.error.message}`,
    } as const satisfies SendEmailResponse;
  }

  return {
    success: true,
    message: "Success",
    id: response?.data?.id,
  } as const satisfies SendEmailResponse;
}
