import type { Metadata } from 'next'
import { Syne, Space_Grotesk } from 'next/font/google'
import '@/app/globals.css'
import GSAPProvider from '@/components/providers/GSAPProvider'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pittuk.net'),
  alternates: {
    canonical: '/',
  },
  title: 'Luis Cruz — Diseñador Web & Desarrollador WordPress',
  description: 'Diseñador y desarrollador web especializado en WordPress, UI/UX y e-Commerce. Portafolio profesional en Talca, Chile.',
  openGraph: {
    title: 'Luis Cruz — Diseñador Web & Desarrollador WordPress',
    description: 'Portafolio profesional de diseño y desarrollo web. WordPress, UI/UX, E-commerce.',
    url: 'https://pittuk.net',
    siteName: 'Luis Cruz',
    locale: 'es_CL',
    type: 'website',
    images: [{ url: 'https://pittuk.net/images/logo/icono.svg', width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luis Cruz — Diseñador Web & Desarrollador WordPress',
    description: 'Portafolio profesional de diseño y desarrollo web. WordPress, UI/UX, E-commerce.',
    images: ['https://pittuk.net/images/logo/icono.svg'],
  },
  icons: {
    icon: '/images/logo/favicon.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://pittuk.net/#organization',
      name: 'Luis Cruz',
      url: 'https://pittuk.net',
      logo: 'https://pittuk.net/images/logo/icono.svg',
      sameAs: [
        'https://www.linkedin.com/in/pittuk/',
        'https://www.behance.net/PITTUK',
        'https://share.google/A9ASHwUpghOa34qSe',
      ],
      knowsAbout: ['WordPress', 'UI/UX Design', 'E-commerce', 'Diseño Gráfico'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://pittuk.net/#website',
      url: 'https://pittuk.net',
      name: 'Luis Cruz',
      description: 'Portafolio de Luis Cruz — Diseñador Web y Desarrollador WordPress',
      publisher: { '@id': 'https://pittuk.net/#organization' },
      inLanguage: 'es-CL',
    },
    {
      '@type': 'Person',
      '@id': 'https://pittuk.net/#person',
      name: 'Luis Cruz',
      jobTitle: 'Diseñador Web & Desarrollador WordPress',
      url: 'https://pittuk.net',
      image: 'https://pittuk.net/images/Luis%20Cruz.png',
      sameAs: [
        'https://www.linkedin.com/in/pittuk/',
        'https://www.behance.net/PITTUK',
      ],
      knowsAbout: ['WordPress', 'UI/UX', 'E-commerce', 'Diseño Gráfico'],
      worksFor: { '@id': 'https://pittuk.net/#organization' },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${syne.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GSAPProvider>
          {children}
        </GSAPProvider>
      </body>
    </html>
  )
}
