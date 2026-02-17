import { allLocations } from '@/data/arrondissements';
import { blogPosts } from '@/data/blog';

export default function sitemap() {
  const base = 'https://loyerparis.vercel.app';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    ...allLocations.map(l => ({ url: `${base}/${l.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...blogPosts.map(p => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
