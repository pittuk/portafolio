import type { MetadataRoute } from 'next'
import { MOCK_PROJECTS } from '@/lib/mock/projects'
import { MOCK_POSTS } from '@/lib/mock/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pittuk.net'
  let projects: any[] = []
  let posts: any[] = []
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { getProjects, getPosts } = await import('@/lib/sanity/queries')
      projects = await getProjects()
      posts = await getPosts()
    } else {
      projects = MOCK_PROJECTS
      posts = MOCK_POSTS
    }
  } catch {
    projects = MOCK_PROJECTS
    posts = MOCK_POSTS
  }

  const projectEntries = projects.map(p => ({
    url: `${baseUrl}/proyectos/${p.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const postEntries = posts.map(p => ({
    url: `${baseUrl}/blog/${p.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const serviceEntries = [
    'diseno-web-wordpress',
    'diseno-tiendas-woocommerce',
    'mantenimiento-wordpress',
    'diseno-web-empresas',
  ].map(slug => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/proyectos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...serviceEntries,
    ...projectEntries,
    ...postEntries,
  ]
}
