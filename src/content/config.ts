import { z, defineCollection } from "astro:content";

const homeCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image().optional(),
      slot: z.enum(["panel-one", "panel-two", "panel-three", "panel-four"]),
    }),
});

const aboutCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});

const tags = [
  "Front-end",
  "Personal",
  "Research",
  "SysAdmin",
  "Computing",
] as const;

const projectsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      location: z.string(),
      image: z.string().optional(),
      completed: z.coerce.date().optional(),
      cover: image()
        .optional()
        .refine(
          (img) =>
            img?.width && img.format === "png" ? img.width >= 600 : true,
          {
            message: "Cover image must be at least 600 pixels wide!",
          },
        ),
      tags: z.array(z.enum(tags)).optional(),
    }),
});

export const collections = {
  home: homeCollection,
  about: aboutCollection,
  projects: projectsCollection,
};
