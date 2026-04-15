import { defineField, defineType } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: { source: 'title' },
      description: 'Click "Generate" to create the URL automatically from the title',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
    prepare: ({ title, subtitle }) => ({ title, subtitle: `/${subtitle}` }),
  },
});
