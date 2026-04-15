import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { galleryImage, siteSettings, page } from './schemas';

export default defineConfig({
  name: 'handcrocheted-by-carla',
  title: 'HandCrochetedByCarlaArias',
  projectId: 'xau00n0h',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('galleryImage').title('Gallery Photos'),
            S.documentTypeListItem('page').title('Pages'),
            S.divider(),
            S.documentListItem().schemaType('siteSettings').id('siteSettings').title('Site Settings'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: [galleryImage, siteSettings, page],
  },
});
