import { type MetadataRoute } from 'next'
import { SITEMAP } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
	const { baseUrl, paths } = SITEMAP

	const sitemaps = paths.map((path) => {
		return {
			url: `${baseUrl}${path}`,
			lastModified: new Date()
		}
	})
	return sitemaps
}
