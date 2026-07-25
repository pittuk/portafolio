import type { Metadata } from 'next'
import { getProjects } from '@/lib/sanity/queries'
import { MOCK_PROJECTS } from '@/lib/mock/projects'
import ServicePageTemplate from '@/components/service/ServicePageTemplate'

const TITLE = 'Diseño de tiendas online con WooCommerce — Luis Cruz'
const DESCRIPTION = 'Tiendas online construidas sobre WordPress y WooCommerce: catálogo, pagos, envíos y checkout pensados para vender, no solo para verse bien.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/diseno-tiendas-woocommerce' },
  openGraph: {
    title: TITLE, description: DESCRIPTION, type: 'website',
    url: 'https://pittuk.net/diseno-tiendas-woocommerce',
    siteName: 'Luis Cruz', locale: 'es_CL',
    images: [{ url: 'https://pittuk.net/images/logo/icono.svg', width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary_large_image', title: TITLE, description: DESCRIPTION,
    images: ['https://pittuk.net/images/logo/icono.svg'],
  },
}

const SLUGS = ['fluye-por-chile', 'piedras-naturales', 'alexander-gonzalez']

export default async function DisenoTiendasWooCommercePage() {
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
      title={<>Tiendas online con <span style={{ color: 'var(--teal)' }}>WooCommerce</span><span style={{ color: 'var(--orange)' }}>.</span></>}
      name="Diseño de tiendas online con WooCommerce"
      slug="diseno-tiendas-woocommerce"
      intro="Tiendas online construidas sobre WordPress y WooCommerce: catálogo, pagos, envíos y checkout pensados para vender, no solo para verse bien."
      included={[
        'Configuración de WooCommerce: catálogo, pagos, envíos',
        'Diseño de fichas de producto orientadas a conversión',
        'Checkout optimizado para reducir abandono de carrito',
        'Integración de pasarela de pago',
        'Campos personalizados (ACF) para catálogos con especificaciones técnicas',
        'Sitio responsive, pensado primero para mobile',
      ]}
      projects={featured}
      projectsHeading="Tiendas que he construido"
      faq={[
        {
          q: '¿WooCommerce o Shopify?',
          a: 'Depende de tu caso: cuánto control querés sobre el sitio, si ya tenés presencia en WordPress, y cuánto valorás no pensar en mantenimiento técnico.',
          link: { href: '/blog/woocommerce-o-shopify', label: 'Ver la comparación completa' },
        },
        {
          q: '¿Puedo vender internacionalmente?',
          a: 'Sí, WooCommerce soporta múltiples monedas y pasarelas de pago internacionales — se configura según lo que necesite tu negocio.',
        },
        {
          q: '¿Qué pasa si mi catálogo crece mucho?',
          a: 'WooCommerce escala bien con catálogos grandes si está bien configurado: hosting adecuado, campos personalizados y una buena estructura de categorías.',
        },
        {
          q: '¿Incluye la pasarela de pago?',
          a: 'Se integra la que uses (Webpay, Flow, Stripe, u otra) — la configuración forma parte del proyecto.',
        },
      ]}
    />
  )
}
