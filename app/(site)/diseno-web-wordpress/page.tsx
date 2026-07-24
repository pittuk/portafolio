import type { Metadata } from 'next'
import { getProjects } from '@/lib/sanity/queries'
import { MOCK_PROJECTS } from '@/lib/mock/projects'
import ServicePageTemplate from '@/components/service/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'Diseño web en WordPress — Luis Cruz',
  description: 'Sitios web profesionales en WordPress, diseñados y desarrollados por una sola persona: sin intermediarios, con foco en velocidad, SEO técnico y conversión.',
  alternates: { canonical: '/diseno-web-wordpress' },
}

const SLUGS = ['cablepar', 'varity-labs', 'contratista-mineria']

export default async function DisenoWebWordPressPage() {
  let projects: any[] = []
  try {
    projects = await getProjects()
  } catch {
    projects = MOCK_PROJECTS
  }
  const featured = SLUGS.map(s => projects.find(p => p.slug.current === s)).filter(Boolean)

  return (
    <ServicePageTemplate
      eyebrow="Servicios"
      title={<>Diseño web en <span style={{ color: 'var(--teal)' }}>WordPress</span><span style={{ color: 'var(--orange)' }}>.</span></>}
      intro="Sitios web profesionales en WordPress, diseñados y desarrollados por una sola persona: sin intermediarios, con foco en velocidad, SEO técnico y conversión."
      included={[
        'Diseño UI/UX a medida — no plantillas genéricas',
        'Maquetación en WordPress con Elementor o Divi, según el proyecto',
        'Optimización de velocidad y Core Web Vitals',
        'SEO técnico de base: sitemap, metadatos, estructura',
        'Sitio 100% responsive',
        'Capacitación para que puedas editar contenido vos mismo',
      ]}
      projects={featured}
      faq={[
        {
          q: '¿Cuánto tiempo toma construir un sitio en WordPress?',
          a: 'Depende del alcance. Un sitio corporativo simple puede estar listo en pocas semanas; uno con más secciones o funcionalidades a medida toma más tiempo.',
        },
        {
          q: '¿Usás Elementor o Divi?',
          a: 'Depende del proyecto — trabajo con ambos según lo que necesite el sitio, no fuerzo siempre la misma herramienta.',
          link: { href: '/blog/elementor-vs-divi', label: 'Ver la comparación completa' },
        },
        {
          q: '¿El sitio queda optimizado para SEO?',
          a: 'Se construye con buenas prácticas técnicas de base (velocidad, estructura, metadatos). El posicionamiento en el tiempo depende también de contenido y SEO continuo, que es un trabajo aparte.',
        },
        {
          q: '¿Puedo editar el contenido yo mismo después?',
          a: 'Sí. WordPress permite editar texto e imágenes sin tocar código, y te dejo una capacitación básica al momento de la entrega.',
        },
      ]}
    />
  )
}
