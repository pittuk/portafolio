import type { Metadata } from 'next'
import { getProjects } from '@/lib/sanity/queries'
import { MOCK_PROJECTS } from '@/lib/mock/projects'
import ServicePageTemplate from '@/components/service/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'Diseño web para empresas — Luis Cruz',
  description: 'Sitios corporativos pensados para transmitir solidez y generar consultas reales, no solo una tarjeta de presentación online.',
  alternates: { canonical: '/diseno-web-empresas' },
}

const SLUGS = ['cablepar', 'contratista-mineria', 'empresa-de-alimentos', 'arriendo-de-maquinaria']

export default async function DisenoWebEmpresasPage() {
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
      title={<>Diseño web para <span style={{ color: 'var(--teal)' }}>empresas</span><span style={{ color: 'var(--orange)' }}>.</span></>}
      intro="Sitios corporativos pensados para transmitir solidez y generar consultas reales, no solo una tarjeta de presentación online."
      included={[
        'Arquitectura de información clara por tipo de servicio',
        'Diseño UI/UX a medida, alineado a tu marca',
        'Formularios de contacto ubicados estratégicamente',
        'Estructura técnica pensada para posicionar en Google',
        'Sitio 100% responsive',
        'WordPress como base, para que tu equipo pueda editar contenido sin depender de un developer',
      ]}
      projects={featured}
      faq={[
        {
          q: '¿Qué diferencia un sitio corporativo de una landing page?',
          a: 'El sitio corporativo cubre varias secciones (servicios, nosotros, contacto) y necesita más arquitectura de información. La landing apunta a un solo objetivo con una sola página.',
        },
        {
          q: '¿Puede integrarse con mi sistema actual (ERP, CRM)?',
          a: 'Depende del sistema. Muchas integraciones son posibles vía API o formularios conectados a herramientas de automatización — se evalúa caso a caso.',
        },
        {
          q: '¿El sitio queda listo para posicionar en Google?',
          a: 'Se construye con buenas prácticas técnicas de base (velocidad, estructura, metadatos). El posicionamiento en el tiempo depende también de contenido y SEO continuo.',
        },
        {
          q: '¿Cuánto dura el proyecto?',
          a: 'Depende del alcance y la cantidad de secciones. En la guía de precios del blog explico qué factores influyen en el tiempo y el costo de un proyecto.',
          link: { href: '/blog/cuanto-cuesta-una-pagina-web-en-chile', label: 'Ver la guía de precios' },
        },
      ]}
    />
  )
}
