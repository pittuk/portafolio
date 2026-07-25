// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  async redirects() {
    return [
      // Legacy WordPress projects that map 1:1 to a current portfolio entry
      { source: '/project/voy-de-una', destination: '/proyectos/voy-de-una', permanent: true },
      { source: '/project/web-e-commerce-futbolista-alexander-gonzalez', destination: '/proyectos/alexander-gonzalez', permanent: true },
      { source: '/project/wui-coffee-drink-lounge', destination: '/proyectos/wui-coffee-drink-lounge', permanent: true },
      { source: '/project/contratista-mineria', destination: '/proyectos/contratista-mineria', permanent: true },
      // Discontinued legacy WordPress projects → portfolio hub
      { source: '/project/:slug*', destination: '/proyectos', permanent: true },
      { source: '/project_category/:slug*', destination: '/proyectos', permanent: true },
      { source: '/project_tag/:slug*', destination: '/proyectos', permanent: true },
      // Legacy WordPress blog archive/pagination/category → blog hub
      { source: '/tag/:slug*', destination: '/blog', permanent: true },
      { source: '/category/:slug*', destination: '/blog', permanent: true },
      { source: '/page/:num*', destination: '/blog', permanent: true },
      { source: '/blog/page/:num*', destination: '/blog', permanent: true },
      // Legacy WordPress posts never migrated → blog hub
      { source: '/tipografias-manuscritas-historia-tipos-y-usos', destination: '/blog', permanent: true },
      { source: '/mas-de-100-disenos-de-formulario-de-login-en-html-gratis', destination: '/blog', permanent: true },
      { source: '/julia-geiser-la-dexter-del-collage', destination: '/blog', permanent: true },
      { source: '/ningun-animal-deberia-sufrir-y-morir-en-nombre-de-la-belleza', destination: '/blog', permanent: true },
      { source: '/7-sitios-web-para-descargar-plantillas-de-powerpoint-de-gran-calidad', destination: '/blog', permanent: true },
    ]
  },
}

export default nextConfig
