import type { Metadata } from 'next'
import { getProjects } from '@/lib/sanity/queries'
import { MOCK_PROJECTS } from '@/lib/mock/projects'
import ProjectFilter from '@/components/project/ProjectFilter'

const TITLE = 'Proyectos — Luis Cruz'
const DESCRIPTION = 'Sitios web, tiendas WooCommerce y diseño gráfico para empresas de Chile, Latinoamérica, España y Estados Unidos. Más de 125 proyectos entregados.'

// Sin esto, la página heredaba el canonical y el título de la home
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/proyectos' },
  openGraph: {
    title: TITLE, description: DESCRIPTION, type: 'website',
    url: 'https://pittuk.net/proyectos',
    siteName: 'Luis Cruz', locale: 'es_CL',
    images: [{ url: 'https://pittuk.net/images/og-default.jpg', width: 1200, height: 630, alt: 'Luis Cruz — Diseño web y tiendas WooCommerce' }],
  },
  twitter: {
    card: 'summary_large_image', title: TITLE, description: DESCRIPTION,
    images: ['https://pittuk.net/images/og-default.jpg'],
  },
}

export default async function ProyectosPage() {
  let projects: any[] = []
  try {
    projects = await getProjects()
  } catch {
    projects = MOCK_PROJECTS
  }

  return (
    <section className="section-padding" style={{ padding: '100px 20px 60px', minHeight: '100vh' }}>
      <ProjectFilter projects={projects} />
    </section>
  )
}
