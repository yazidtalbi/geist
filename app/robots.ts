import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/settings/'],
    },
    sitemap: 'https://revvview.com/sitemap.xml',
  }
}
