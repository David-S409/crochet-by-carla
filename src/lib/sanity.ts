import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: 'xau00n0h',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);
