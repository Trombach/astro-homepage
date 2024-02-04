import { z, defineCollection } from "astro:content";

const homeCollection = defineCollection({
    type: "data",
    schema: z.object({
        name: z.string(),
        block1: z.string(),
        block2: z.string()
    })
});

const aboutCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string()
    })
})

const projectsCollection = defineCollection({
    type: "content",
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        location: z.string(),
        image: z.string().optional(),
        completed: z.coerce.date().optional(),
        cover: image().optional().refine((img) => img?.width && img.format === "png" ? img.width >= 1080 : true, {
            message: "Cover image must be at least 1080 pixels wide!",
        })
    })
});

export const collections = {
    home: homeCollection,
    about: aboutCollection,
    projects: projectsCollection,
}