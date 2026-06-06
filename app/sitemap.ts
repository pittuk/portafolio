import type { MetadataRoute } from 'next'
import { MOCK_PROJECTS } from '@/lib/mock/projects'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pittuk.net'
  let projects: any[] = []
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { getProjects } = await import('@/lib/sanity/queries')
      projects = await getProjects()
    } else {
      projects = MOCK_PROJECTS
    }
  } catch {
    projects = MOCK_PROJECTS
  }

  const projectEntries = projects.map(p => ({
    url: `${baseUrl}/proyectos/${p.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/proyectos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...projectEntries,
  ]
}
