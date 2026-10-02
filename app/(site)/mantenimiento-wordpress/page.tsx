import type { Metadata } from 'next'
import { getProjects } from '@/lib/sanity/queries'
import { MOCK_PROJECTS } from '@/lib/mock/projects'
import ServicePageTemplate from '@/components/service/ServicePageTemplate'

const TITLE = 'Mantenimiento de sitios WordPress — Luis Cruz'
const DESCRIPTION = 'Actualizaciones, seguridad, backups y soporte para que tu sitio siga funcionando bien después del lanzamiento, sin que tengas que pensar en eso.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/mantenimiento-wordpress' },
  openGraph: {
    title: TITLE, description: DESCRIPTION, type: 'website',
    url: 'https://pittuk.net/mantenimiento-wordpress',
    siteName: 'Luis Cruz', locale: 'es_CL',
    images: [{ url: 'https://pittuk.net/images/logo/icono.svg', width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary_large_image', title: TITLE, description: DESCRIPTION,
    images: ['https://pittuk.net/images/logo/icono.svg'],
  },
}

const SLUGS = ['cablepar', 'fluye-por-chile', 'varity-labs']

export default async function MantenimientoWordPressPage() {
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
      title={<>Mantenimiento de sitios <span style={{ color: 'var(--teal)' }}>WordPress</span><span style={{ color: 'var(--orange)' }}>.</span></>}
      name="Mantenimiento de sitios WordPress"
      slug="mantenimiento-wordpress"
      intro="Actualizaciones, seguridad, backups y soporte para que tu sitio siga funcionando bien después del lanzamiento, sin que tengas que pensar en eso."
      included={[
        'Actualizaciones de WordPress, plugins y tema',
        'Backups periódicos',
        'Monitoreo de seguridad (Wordfence u otra solución según el sitio)',
        'Soporte ante errores o caídas',
        'Cambios menores de contenido bajo demanda',
      ]}
      sections={[
        {
          heading: 'Para quién es',
          body: 'Para empresas con un sitio o una tienda en WordPress que no tienen a nadie a cargo de la parte técnica. Si tu sitio vende, recibe consultas o simplemente representa a tu marca, que se caiga, se ponga lento o lo hackeen tiene un costo, aunque nadie lo esté mirando.',
        },
        {
          heading: 'Cómo funciona mes a mes',
          body: 'Las actualizaciones de WordPress, el tema y los plugins se aplican de forma controlada, con un backup reciente antes de cada cambio para poder revertir si algo falla. Los backups se guardan fuera del hosting. El sitio se monitorea para detectar caídas y actividad sospechosa, y si algo se rompe, lo resuelvo yo sin que tengas que coordinar con nadie más.',
        },
        {
          heading: 'Por qué no conviene saltárselo',
          body: 'Los plugins desactualizados son la puerta de entrada más común para sitios hackeados en WordPress, y muchas veces el daño no se nota: el sitio sigue funcionando mientras inyecta contenido que Google penaliza. Mantener al día cuesta mucho menos que limpiar un sitio comprometido y recuperar las posiciones perdidas.',
        },
        {
          heading: 'Si tu sitio lo hizo otra persona',
          body: 'No hace falta que yo haya construido el sitio. Al empezar hago una revisión: versiones de WordPress y plugins, plugins abandonados, backups existentes, velocidad y seguridad básica. Con eso sabés en qué estado está el sitio y qué conviene corregir primero.',
        },
        {
          heading: 'Qué no incluye',
          body: 'Rediseños, secciones nuevas o funcionalidades a medida se cotizan aparte. El mantenimiento cubre que el sitio funcione, esté seguro y al día; los cambios menores de texto e imágenes sí están incluidos.',
        },
      ]}
      projects={featured}
      faq={[
        {
          q: '¿Qué incluye el mantenimiento?',
          a: 'Actualizaciones, backups, monitoreo de seguridad y soporte ante errores. Los cambios de contenido menores están cubiertos; cambios grandes de diseño se cotizan aparte.',
        },
        {
          q: '¿Necesito mantenimiento si mi sitio ya funciona bien?',
          a: 'Sí — WordPress y sus plugins reciben actualizaciones constantes. No actualizar es una de las causas más comunes de sitios hackeados o rotos.',
        },
        {
          q: '¿Qué pasa si mi sitio se cae?',
          a: 'Te aviso y lo resuelvo lo antes posible. El monitoreo está pensado justamente para detectar este tipo de problemas rápido, antes de que se conviertan en algo mayor.',
        },
        {
          q: '¿Puedo pedir cambios de contenido?',
          a: 'Sí, cambios menores de texto o imágenes están cubiertos dentro del mantenimiento acordado.',
        },
      ]}
    />
  )
}
