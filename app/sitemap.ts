import { MetadataRoute } from 'next'
import { createClient } from './lib/supabase-server'
import { mapProduct } from './lib/data'
import { slugify } from './lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://revvview.com'
  
  let productUrls: MetadataRoute.Sitemap = []
  
  try {
    const supabase = await createClient()
    const { data: productData } = await supabase
      .from('products')
      .select('id, name')
    
    if (productData) {
      productUrls = productData.map((p) => ({
        url: `${baseUrl}/product/${slugify(p.name)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    }
  } catch (error) {
    console.error('Sitemap generation error:', error)
  }

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
