import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
    },
    sitemap: 'https://www.karanraj.me/sitemap.xml',
    host: 'https://www.karanraj.me',
  };
}
