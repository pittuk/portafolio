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

  // ponytail: lastmod solo donde hay una fecha real de contenido; sin fecha es mejor omitirlo
  // que mandar la hora del build, que le dice a Google que todo cambió en cada deploy.
  const projectEntries = projects.map(p => ({
    url: `${baseUrl}/proyectos/${p.slug.current}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const postDate = (p: any) => p.updatedAt ?? p.publishedAt
  const postEntries = posts.map(p => ({
    url: `${baseUrl}/blog/${p.slug.current}`,
    lastModified: postDate(p),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  const latestPost = posts.map(postDate).sort().at(-1)

  const serviceEntries = [
    'diseno-web-wordpress',
    'diseno-tiendas-woocommerce',
    'mantenimiento-wordpress',
    'diseno-web-empresas',
  ].map(slug => ({
    url: `${baseUrl}/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  return [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/proyectos`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/sobre-mi`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/contacto`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: latestPost, changeFrequency: 'weekly', priority: 0.7 },
    ...serviceEntries,
    ...projectEntries,
    ...postEntries,
  ]
}
