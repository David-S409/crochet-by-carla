import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'instagramHandle', title: 'Instagram Handle', type: 'string', initialValue: 'HandCrochetedByCarlaArias' }),
    defineField({ name: 'aboutImage', title: 'About Photo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'aboutText',
      title: 'About Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
