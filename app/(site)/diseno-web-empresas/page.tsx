import type { Metadata } from 'next'
import { getProjects } from '@/lib/sanity/queries'
import { MOCK_PROJECTS } from '@/lib/mock/projects'
import ServicePageTemplate from '@/components/service/ServicePageTemplate'

const TITLE = 'Diseño web para empresas — Luis Cruz'
const DESCRIPTION = 'Sitios corporativos pensados para transmitir solidez y generar consultas reales, no solo una tarjeta de presentación online.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/diseno-web-empresas' },
  openGraph: {
    title: TITLE, description: DESCRIPTION, type: 'website',
    url: 'https://pittuk.net/diseno-web-empresas',
    siteName: 'Luis Cruz', locale: 'es_CL',
    images: [{ url: 'https://pittuk.net/images/logo/icono.svg', width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary_large_image', title: TITLE, description: DESCRIPTION,
    images: ['https://pittuk.net/images/logo/icono.svg'],
  },
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
      name="Diseño web para empresas"
      slug="diseno-web-empresas"
      intro="Sitios corporativos pensados para transmitir solidez y generar consultas reales, no solo una tarjeta de presentación online."
      included={[
        'Arquitectura de información clara por tipo de servicio',
        'Diseño UI/UX a medida, alineado a tu marca',
        'Formularios de contacto ubicados estratégicamente',
        'Estructura técnica pensada para posicionar en Google',
        'Sitio 100% responsive',
        'WordPress como base, para que tu equipo pueda editar contenido sin depender de un developer',
      ]}
      sections={[
        {
          heading: 'Qué tiene que lograr un sitio corporativo',
          body: 'Que un cliente potencial entienda en segundos qué hace tu empresa, confíe en ella y sepa cómo contactarte. Un sitio que solo "se ve bien" no cumple ese trabajo: cada página tiene que responder una pregunta concreta del cliente y llevarlo a una acción, ya sea escribir por WhatsApp, pedir una cotización o llamar.',
        },
        {
          heading: 'Cómo se estructura',
          body: 'Normalmente: una página por servicio (cada una es una puerta de entrada distinta desde Google), una sección de empresa o trayectoria, proyectos o clientes como prueba de confianza, preguntas frecuentes y contacto visible en todo el sitio. La estructura exacta se define al inicio, según cómo te buscan tus clientes y qué necesitan saber antes de contactarte.',
        },
        {
          heading: 'Plazos reales',
          body: 'Un sitio corporativo de varias páginas toma de 3 a 5 semanas. Si lo que necesitás es una sola página para una campaña o un servicio puntual, una landing page toma de 1 a 2 semanas y se puede ampliar después sin rehacer el trabajo.',
        },
        {
          heading: 'Trato directo, sin intermediarios',
          body: 'En una agencia, lo que pedís pasa por un ejecutivo antes de llegar a quien diseña o programa. Conmigo hablás directamente con quien construye el sitio, así que los cambios son más rápidos y no se pierde información en el camino. Más de 15 años y 125 proyectos para clientes de Chile, Latinoamérica, España y Estados Unidos.',
        },
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
          a: 'Un sitio corporativo de varias páginas toma de 3 a 5 semanas, y una landing page de 1 a 2. En la guía de precios del blog explico qué factores influyen en el tiempo y el costo de un proyecto.',
          link: { href: '/blog/cuanto-cuesta-una-pagina-web-en-chile', label: 'Ver la guía de precios' },
        },
      ]}
    />
  )
}
