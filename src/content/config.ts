import { z, defineCollection, reference } from "astro:content";

const homeCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image().optional(),
      imageTransitionName: z.string().optional(),
      slot: z.enum(["panel-one", "panel-two", "panel-three", "panel-four"]),
    }),
});

const aboutCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    person: reference("person"),
  }),
});

const personCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    birthday: z.date(),
    from: z.string(),
    industryStart: z.number(),
    currentLocation: z.string(),
    education: z.string(),
  }),
});

const tags = [
  "Front-end",
  "Personal",
  "Research",
  "SysAdmin",
  "Computing",
] as const;

const tools = ["astro", "svelte", "typescript", "tailwind", "vercel"] as const;

const projectsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        repoLink: z.string().url().optional(),
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
        tools: z.array(z.enum(tools)).optional(),
      })
      .strict(),
});

export const collections = {
  person: personCollection,
  home: homeCollection,
  about: aboutCollection,
  projects: projectsCollection,
};

export type Tool = (typeof tools)[number];
