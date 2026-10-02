import type { Post } from '@/types'

// Hub-and-spoke: cada artículo apunta a la página de servicio de su tema,
// y cada servicio lista las guías de su cluster.
export const SERVICES = {
  'diseno-tiendas-woocommerce': 'Diseño de tiendas WooCommerce',
  'mantenimiento-wordpress': 'Mantenimiento WordPress',
  'diseno-web-wordpress': 'Diseño web en WordPress',
  'diseno-web-empresas': 'Diseño web para empresas',
} as const

export type ServiceSlug = keyof typeof SERVICES

const CLUSTERS: Record<ServiceSlug, string[]> = {
  'diseno-tiendas-woocommerce': [
    'woocommerce-o-shopify',
    'pasarelas-de-pago-en-chile-para-woocommerce',
    'errores-al-crear-una-tienda-online',
    'como-migrar-tu-tienda-a-woocommerce-sin-perder-seo',
  ],
  'mantenimiento-wordpress': [
    'mantenimiento-wordpress-que-incluye-y-cuanto-cuesta',
    'wordpress-lento-causas-comunes-y-como-solucionarlo',
    'plugins-esenciales-de-wordpress-y-cuales-evitar',
    'como-elegir-hosting-para-wordpress-en-chile',
    'seo-tecnico-para-wordpress-lo-basico',
  ],
  'diseno-web-wordpress': [
    'cuanto-cuesta-una-pagina-web-en-chile',
    'elementor-vs-divi',
    'wordpress-vs-wix-vs-squarespace',
    'rediseno-web-cuando-conviene-y-que-esperar',
  ],
  'diseno-web-empresas': [
    'pagina-web-o-redes-sociales-que-necesita-tu-negocio',
    'landing-page-o-sitio-web-completo',
    'como-elegir-una-agencia-web',
    'como-es-el-proceso-de-crear-una-pagina-web-paso-a-paso',
    'que-necesitas-antes-de-encargar-tu-pagina-web',
    'cuanto-tiempo-toma-hacer-una-pagina-web',
    'senales-de-que-tu-pagina-web-pierde-clientes',
  ],
}

// ponytail: un post sin cluster cae en el servicio general; agregar el slug arriba al publicar uno nuevo
export function serviceForPost(slug: string): ServiceSlug {
  const hit = (Object.keys(CLUSTERS) as ServiceSlug[]).find(s => CLUSTERS[s].includes(slug))
  return hit ?? 'diseno-web-empresas'
}

export function postsForService(service: ServiceSlug, posts: Post[], limit = 3): Post[] {
  return CLUSTERS[service]
    .map(slug => posts.find(p => p.slug.current === slug))
    .filter((p): p is Post => !!p)
    .slice(0, limit)
}

export function relatedPosts(slug: string, posts: Post[], limit = 2): Post[] {
  const service = serviceForPost(slug)
  return postsForService(service, posts, Infinity)
    .filter(p => p.slug.current !== slug)
    .slice(0, limit)
}
