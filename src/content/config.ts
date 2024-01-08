import { z, defineCollection } from "astro:content";

const homeCollection = defineCollection({
    type: "data",
    schema: z.object({
        name: z.string(),
        block1: z.string(),
        block2: z.string()
    })
});

const technologyCollection = defineCollection({
    type: "data",
    schema: z.object({
        name: z.string(),
        icon: z.custom<`logos:${string}`>((val) => typeof val === 'string' ? /logos:.*/.test(val) : false),
        twClass: z.string().optional(),
        sortOrder: z.number()
    })
})

const aboutCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string()
    })
})

export const collections = {
    home: homeCollection ,
    technologies: technologyCollection,
    about: aboutCollection,
}