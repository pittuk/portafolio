import type { Metadata } from 'next'
import { getProjects } from '@/lib/sanity/queries'
import { MOCK_PROJECTS } from '@/lib/mock/projects'
import ServicePageTemplate from '@/components/service/ServicePageTemplate'

const TITLE = 'Diseño web en WordPress — Luis Cruz'
const DESCRIPTION = 'Sitios web profesionales en WordPress, diseñados y desarrollados por una sola persona: sin intermediarios, con foco en velocidad, SEO técnico y conversión.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/diseno-web-wordpress' },
  openGraph: {
    title: TITLE, description: DESCRIPTION, type: 'website',
    url: 'https://pittuk.net/diseno-web-wordpress',
    siteName: 'Luis Cruz', locale: 'es_CL',
    images: [{ url: 'https://pittuk.net/images/logo/icono.svg', width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary_large_image', title: TITLE, description: DESCRIPTION,
    images: ['https://pittuk.net/images/logo/icono.svg'],
  },
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
      name="Diseño web en WordPress"
      slug="diseno-web-wordpress"
      intro="Sitios web profesionales en WordPress, diseñados y desarrollados por una sola persona: sin intermediarios, con foco en velocidad, SEO técnico y conversión."
      included={[
        'Diseño UI/UX a medida — no plantillas genéricas',
        'Maquetación en WordPress con Elementor o Divi, según el proyecto',
        'Optimización de velocidad y Core Web Vitals',
        'SEO técnico de base: sitemap, metadatos, estructura',
        'Sitio 100% responsive',
        'Capacitación para que puedas editar contenido vos mismo',
      ]}
      sections={[
        {
          heading: 'Para quién es',
          body: 'Para empresas y profesionales que necesitan un sitio propio, rápido y fácil de editar, sin depender de una agencia para cada cambio. WordPress mueve más del 40% de los sitios del mundo: hay soporte, plugins y profesionales disponibles para el largo plazo, y tu sitio no queda atado a una plataforma cerrada ni a una sola persona.',
        },
        {
          heading: 'Cómo trabajo un sitio en WordPress',
          body: 'Empieza con una reunión de 30 minutos para entender el negocio y qué tiene que lograr el sitio. Después viene una propuesta con alcance y plazos, el diseño de la arquitectura de páginas y la interfaz, el desarrollo en WordPress, una ronda de revisión con vos, y la publicación con dominio, SSL y verificaciones finales. Diseño y código los hace la misma persona, así que no se pierde nada entre lo que se aprueba y lo que se construye.',
        },
        {
          heading: 'Plazos reales',
          body: 'Una landing page toma de 1 a 2 semanas. Un sitio corporativo de varias páginas, de 3 a 5 semanas. Lo que más mueve el plazo no es el desarrollo, sino tener listos los textos, las fotos y los accesos; por eso al inicio te paso una lista concreta de lo que hace falta.',
        },
        {
          heading: 'Elementor, Divi o código a medida',
          body: 'Elijo la herramienta según el proyecto: Elementor o Divi cuando conviene que tu equipo edite páginas visualmente, y desarrollo más a medida cuando la prioridad es el rendimiento o una funcionalidad específica. En todos los casos el sitio se optimiza para velocidad y Core Web Vitals, porque Google mide la experiencia en celular y un sitio lento pierde visitas.',
        },
        {
          heading: 'Qué recibís al final',
          body: 'El sitio publicado, los accesos de administrador, el dominio registrado a tu nombre y una capacitación para editar textos e imágenes por tu cuenta. Más de 15 años construyendo sitios y más de 125 proyectos entregados me enseñaron que un sitio solo sirve si el cliente puede mantenerlo vivo después del lanzamiento.',
        },
      ]}
      projects={featured}
      faq={[
        {
          q: '¿Cuánto tiempo toma construir un sitio en WordPress?',
          a: 'Una landing page toma de 1 a 2 semanas y un sitio corporativo de varias páginas, de 3 a 5 semanas. El plazo depende sobre todo de tener listo el contenido.',
          link: { href: '/blog/cuanto-tiempo-toma-hacer-una-pagina-web', label: 'Ver los plazos en detalle' },
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
