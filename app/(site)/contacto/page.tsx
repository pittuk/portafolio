import type { Metadata } from 'next'
import Contact from '@/components/sections/Contact'

const TITLE = 'Contacto — Luis Cruz'
const DESCRIPTION = 'Cuéntame tu proyecto de sitio WordPress, tienda WooCommerce o mantenimiento web. Trato directo con quien diseña y programa, para empresas de Chile y Latinoamérica.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/contacto' },
  openGraph: {
    title: TITLE, description: DESCRIPTION, type: 'website',
    url: 'https://pittuk.net/contacto',
    siteName: 'Luis Cruz', locale: 'es_CL',
    images: [{ url: 'https://pittuk.net/images/og-default.jpg', width: 1200, height: 630, alt: 'Luis Cruz — Diseño web y tiendas WooCommerce' }],
  },
  twitter: {
    card: 'summary_large_image', title: TITLE, description: DESCRIPTION,
    images: ['https://pittuk.net/images/og-default.jpg'],
  },
}

const contactLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: 'https://pittuk.net/contacto',
  name: TITLE,
  about: { '@id': 'https://pittuk.net/#person' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://pittuk.net/' },
    { '@type': 'ListItem', position: 2, name: 'Contacto', item: 'https://pittuk.net/contacto' },
  ],
}

export default function ContactoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div style={{ paddingTop: 60 }}>
        <Contact headingLevel="h1" />
      </div>
    </>
  )
}
