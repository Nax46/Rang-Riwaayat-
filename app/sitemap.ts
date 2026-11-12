import { MetadataRoute } from 'next';
import { VERIFIED_FESTIVALS, VERIFIED_RECIPES } from '../lib/data/verified-seeds';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rangriwaayat.in';
  const locales = ['en', 'hi', 'gu'];

  const staticRoutes = [
    '',
    '/festivals',
    '/calendar',
    '/culture',
    '/recipes',
    '/studio',
    '/quiz',
    '/explorer',
    '/search',
    '/corrections',
    '/editorial-policy',
    '/about',
    '/privacy',
    '/terms',
    '/advertising',
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Generate for each locale and static route
  for (const loc of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${loc}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' || route === '/calendar' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route === '/festivals' ? 0.9 : 0.8,
      });
    }

    // Dynamic festival detail pages
    for (const fest of VERIFIED_FESTIVALS) {
      entries.push({
        url: `${baseUrl}/${loc}/festivals/${fest.slug}`,
        lastModified: new Date(fest.lastVerifiedDate || '2026-11-01'),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }

    // Dynamic recipe detail pages
    for (const rec of VERIFIED_RECIPES) {
      entries.push({
        url: `${baseUrl}/${loc}/recipes/${rec.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}

