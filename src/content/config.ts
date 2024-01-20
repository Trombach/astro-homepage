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

export const collections = {
    home: homeCollection ,
    about: aboutCollection,
}