import sendEmail from "@utils/contact";
import { defineAction } from "astro:actions";
import { z } from "astro:content";

export const server = {
  contact: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      message: z.string(),
    }),
    handler: sendEmail,
  }),
};
