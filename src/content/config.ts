import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().optional(),
    category: z.string(),
    keywords: z.array(z.string()),
  }),
});

export const collections = { articles };
