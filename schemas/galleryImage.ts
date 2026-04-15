import { defineField, defineType } from 'sanity';

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Photo',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', description: 'e.g. Blue baby blanket' }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'alt', title: 'Alt text', type: 'string', initialValue: 'Handmade crochet piece' }),
    defineField({ name: 'order', title: 'Display order', type: 'number', description: 'Lower numbers show first' }),
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
});
