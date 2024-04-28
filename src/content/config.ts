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
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      birthday: z.date(),
      from: z.string(),
      industryStart: z.number(),
      currentLocation: z.string(),
      education: z.string(),
      avatar: image().optional(),
    }),
});

const tags = [
  "Front-end",
  "Personal",
  "Research",
  "SysAdmin",
  "Computing",
] as const;

const tools = [
  "Astro",
  "Svelte",
  "Typescript",
  "Tailwind",
  "Vercel",
  "Angular",
  "Sass",
  "AWS Lambda",
  "Contentful",
  "elasticsearch",
  "LaTeX",
  "C++",
  "Next.js",
  "Supabase",
  "Monday.com",
] as const;

const projectsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        repoLink: z.string().url().optional(),
        coverAlt: z.string().optional(),
        completed: z.coerce.date().optional(),
        cover: image()
          .optional()
          .refine(
            (img) =>
              img?.width && img.format !== "svg" ? img.width >= 850 : true,
            {
              message: "Cover image must be at least 850 pixels wide!",
            },
          ),
        tags: z.array(z.enum(tags)).max(4).optional(),
        tools: z.array(z.enum(tools)).max(10).optional(),
      })
      .strict()
      .refine(({ cover, coverAlt }) => {
        if (cover !== undefined) {
          return coverAlt !== undefined && coverAlt.length > 0;
        }

        return true;
      }, "Cover image alt text must be provided when cover image is present."),
});

export const collections = {
  person: personCollection,
  home: homeCollection,
  about: aboutCollection,
  projects: projectsCollection,
};

export type Tool = (typeof tools)[number];
