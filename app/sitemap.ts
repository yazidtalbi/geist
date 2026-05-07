import { MetadataRoute } from 'next'
import { products } from './lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://revvview.com'
  
  const productUrls = products.map((p) => ({
    url: `${baseUrl}/product/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const staticPages = [
    '',
    '/best',
    '/leaderboard',
    '/about',
    '/faq',
    '/contact',
    '/privacy',
    '/cookies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.6,
  }))

  return [...staticPages, ...productUrls]
}
