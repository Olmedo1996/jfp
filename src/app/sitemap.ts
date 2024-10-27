import { MetadataRoute } from 'next';

import { env } from '@/env.mjs';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: env.APP_URL || '/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
      alternates: {
        languages: {
          es: `${env.APP_URL}/es`,
        },
      },
    },
  ];
}
