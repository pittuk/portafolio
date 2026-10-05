import type { Metadata } from 'next'
import { Syne, Space_Grotesk, Inknut_Antiqua } from 'next/font/google'
import Script from 'next/script'
import '@/app/globals.css'

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

const inknutAntiqua = Inknut_Antiqua({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inknut-antiqua',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pittuk.net'),
  alternates: {
    canonical: '/',
  },
  title: 'Luis Cruz — Diseñador Web & Desarrollador WordPress',
  description: 'Diseño de sitios WordPress y tiendas WooCommerce para empresas en Chile y Latinoamérica. Trato directo con quien diseña y programa, sin intermediarios.',
  openGraph: {
    title: 'Luis Cruz — Diseñador Web & Desarrollador WordPress',
    description: 'Diseño de sitios WordPress y tiendas WooCommerce para empresas en Chile y Latinoamérica. Trato directo con quien diseña y programa, sin intermediarios.',
    url: 'https://pittuk.net',
    siteName: 'Luis Cruz',
    locale: 'es_CL',
    type: 'website',
    images: [{ url: 'https://pittuk.net/images/og-default.jpg', width: 1200, height: 630, alt: 'Luis Cruz — Diseño web y tiendas WooCommerce' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luis Cruz — Diseñador Web & Desarrollador WordPress',
    description: 'Diseño de sitios WordPress y tiendas WooCommerce para empresas en Chile y Latinoamérica. Trato directo con quien diseña y programa, sin intermediarios.',
    images: ['https://pittuk.net/images/og-default.jpg'],
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
        'https://www.google.com/maps?cid=4049934109923776097',
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
      url: 'https://pittuk.net/sobre-mi',
      image: 'https://pittuk.net/images/luis-cruz-retrato.webp',
      sameAs: [
        'https://www.linkedin.com/in/pittuk/',
        'https://www.behance.net/PITTUK',
        'https://github.com/pittuk',
        'https://www.instagram.com/p1ttuk/',
      ],
      knowsAbout: ['WordPress', 'WooCommerce', 'Elementor', 'UI/UX', 'E-commerce', 'Diseño Gráfico'],
      alumniOf: [
        { '@type': 'EducationalOrganization', name: 'Universidad Bicentenaria de Aragua' },
        { '@type': 'EducationalOrganization', name: 'Instituto de Diseño de Valencia' },
      ],
      worksFor: { '@id': 'https://pittuk.net/#organization' },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${syne.variable} ${spaceGrotesk.variable} ${inknutAntiqua.variable}`} suppressHydrationWarning>
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G5QHPP2V5W"
          strategy="lazyOnload"
        />
        <Script id="ga-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G5QHPP2V5W');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
