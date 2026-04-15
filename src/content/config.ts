import { defineCollection, z } from 'astro:content';

const gallery = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    photo: z.string(),
    alt: z.string().default('Handmade crochet piece'),
  }),
});

export const collections = { gallery };
