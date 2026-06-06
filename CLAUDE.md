# SEO Implementation Tasks — Luis Cruz Portfolio

## Fase 1 — Higiene crítica (semana 1)

### TC-01: robots.txt
- **Categoría:** `autonoma`
- **Bloque:** A — Fundamentos técnicos
- **Archivo:** `app/robots.ts` (crear)

```ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/api/'],
    },
    sitemap: 'https://luiscruz.cl/sitemap.xml',
  }
}
```

- **Validacion:** `GET /robots.txt` debe devolver 200 con contenido válido
- **Rollback:** Eliminar `app/robots.ts`

### TC-02: Sitemap XML
- **Categoria:** `autonoma`
- **Bloque:** A — Fundamentos técnicos
- **Archivo:** `app/sitemap.ts` (crear)

```ts
import type { MetadataRoute } from 'next'
import { getProjects } from '@/lib/sanity/queries'
import { MOCK_PROJECTS } from '@/lib/mock/projects'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://luiscruz.cl'
  let projects: any[] = []
  try {
    projects = await getProjects()
  } catch {
    projects = MOCK_PROJECTS
  }

  const projectEntries = projects.map(p => ({
    url: `${baseUrl}/proyectos/${p.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/proyectos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...projectEntries,
  ]
}
```

- **Validacion:** `GET /sitemap.xml` debe devolver XML válido con todas las URLs
- **Rollback:** Eliminar `app/sitemap.ts`

### TC-03: Canonical URL
- **Categoria:** `autonoma`
- **Bloque:** A — Fundamentos técnicos
- **Archivos:** `app/layout.tsx`

Agregar `metadataBase` y `alternates` al metadata export:

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://luiscruz.cl'),
  alternates: {
    canonical: '/',
  },
  title: 'Luis Cruz — Diseñador Web & Desarrollador WordPress',
  description: 'Diseñador y desarrollador web especializado en WordPress, UI/UX y e-Commerce.',
  icons: {
    icon: '/images/logo/favicon.png',
  },
}
```

- **Validacion:** Inspeccionar HTML head, debe incluir `<link rel="canonical" href="https://luiscruz.cl/" />`
- **Rollback:** Revertir cambios en `app/layout.tsx`

---

## Fase 2 — Schema y entidades (semanas 2-3)

### TC-04: Organization + WebSite schema
- **Categoria:** `autonoma`
- **Bloque:** D — Schema / Structured Data
- **Archivo:** `app/layout.tsx`

Agregar JSON-LD con Organization + WebSite en el layout:

```ts
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://luiscruz.cl/#organization',
      name: 'Luis Cruz',
      url: 'https://luiscruz.cl',
      logo: 'https://luiscruz.cl/images/logo/icono.svg',
      sameAs: [
        'https://www.linkedin.com/in/luiscruz/',
        'https://www.behance.net/luiscruz',
      ],
      knowsAbout: ['WordPress', 'UI/UX Design', 'E-commerce', 'Diseño Gráfico'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://luiscruz.cl/#website',
      url: 'https://luiscruz.cl',
      name: 'Luis Cruz',
      description: 'Portafolio de Luis Cruz — Diseñador Web y Desarrollador WordPress',
      publisher: { '@id': 'https://luiscruz.cl/#organization' },
      inLanguage: 'es-CL',
    },
  ],
}
```

Insertar en el body del RootLayout, antes de `{children}`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

- **Validacion:** Google Rich Results Test debe mostrar Organization y WebSite sin errores
- **Rollback:** Eliminar el bloque `<script>` y la constante `jsonLd`

### TC-05: Person schema con sameAs
- **Categoria:** `autonoma`
- **Bloque:** D — Schema / Structured Data
- **Archivo:** `app/layout.tsx`

Agregar Person schema al @graph existente:

```ts
{
  '@type': 'Person',
  '@id': 'https://luiscruz.cl/#person',
  name: 'Luis Cruz',
  jobTitle: 'Diseñador Web & Desarrollador WordPress',
  url: 'https://luiscruz.cl',
  sameAs: [
    'https://www.linkedin.com/in/luiscruz/',
    'https://www.behance.net/luiscruz',
  ],
  knowsAbout: ['WordPress', 'UI/UX', 'E-commerce', 'Diseño Gráfico'],
  worksFor: { '@id': 'https://luiscruz.cl/#organization' },
}
```

- **Validacion:** Schema.org validator debe mostrar Person con sameAs válidos
- **Rollback:** Eliminar el objeto Person del @graph

### TC-06: BreadcrumbList schema
- **Categoria:** `autonoma`
- **Bloque:** D — Schema / Structured Data
- **Archivos:** `app/(site)/proyectos/[slug]/page.tsx`

Agregar BreadcrumbList schema en la página de detalle de proyecto:

```tsx
const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://luiscruz.cl/' },
    { '@type': 'ListItem', position: 2, name: 'Proyectos', item: 'https://luiscruz.cl/proyectos' },
    { '@type': 'ListItem', position: 3, name: project.title },
  ],
}
```

Insertar en el JSX:

```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
```

- **Validacion:** Rich Results Test debe mostrar BreadcrumbList
- **Rollback:** Eliminar el bloque de script

### TC-07: Open Graph + Twitter Cards
- **Categoria:** `autonoma`
- **Bloque:** C — On-page y contenido
- **Archivo:** `app/layout.tsx`

Actualizar metadata:

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://luiscruz.cl'),
  title: 'Luis Cruz — Diseñador Web & Desarrollador WordPress',
  description: 'Diseñador y desarrollador web especializado en WordPress, UI/UX y e-Commerce. Portafolio profesional en Talca, Chile.',
  openGraph: {
    title: 'Luis Cruz — Diseñador Web & Desarrollador WordPress',
    description: 'Portafolio profesional de diseño y desarrollo web. WordPress, UI/UX, E-commerce.',
    url: 'https://luiscruz.cl',
    siteName: 'Luis Cruz',
    locale: 'es_CL',
    type: 'website',
    images: [{ url: 'https://luiscruz.cl/images/logo/icono.svg', width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luis Cruz — Diseñador Web & Desarrollador WordPress',
    description: 'Portafolio profesional de diseño y desarrollo web. WordPress, UI/UX, E-commerce.',
    images: ['https://luiscruz.cl/images/logo/icono.svg'],
  },
  icons: {
    icon: '/images/logo/favicon.png',
  },
}
```

En `[slug]/page.tsx`, mejorar `generateMetadata` para incluir OG por proyecto:

```ts
return {
  title: `${project.title} — Luis Cruz`,
  description: project.descriptionText?.slice(0, 160) || `Proyecto de ${project.client || 'Luis Cruz'}`,
  openGraph: {
    title: `${project.title} — Luis Cruz`,
    description: project.descriptionText?.slice(0, 160) || `Proyecto de diseño y desarrollo web`,
    images: project.coverUrl ? [{ url: project.coverUrl }] : [],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${project.title} — Luis Cruz`,
    description: project.descriptionText?.slice(0, 160) || `Proyecto de diseño y desarrollo web`,
    images: project.coverUrl ? [project.coverUrl] : [],
  },
}
```

- **Validacion:** Compartir URL en WhatsApp/LinkedIn debe mostrar preview con imagen
- **Rollback:** Revertir cambios en metadata

---

## Fase 3 — Performance (semana 3-4)

### TC-08: Optimización de imágenes
- **Categoria:** `autonoma`
- **Bloque:** B — Core Web Vitals
- **Archivos:** Múltiples (revisar componentes Image)

Asegurar que todas las imágenes usen:
- `sizes` correcto
- `priority` solo en LCP (hero)
- `loading="lazy"` en el resto
- Formatos modernos (las imágenes locales están en .webp y .jpg — convertir a AVIF cuando sea posible)

En `next.config.ts`:

```ts
images: {
  formats: ['image/avif', 'image/webp'],
  // ...
}
```

### TC-09: Lazy loading + dimensiones explícitas
- **Categoria:** `autonoma`
- **Bloque:** B — Core Web Vitals
- **Archivos:** Todos los componentes con imágenes

Todas las imágenes no-hero deben tener `loading="lazy"` y `aspectRatio` explícito para evitar CLS. Las imágenes del portfolio carousel ya tienen `aspectRatio`, verificar que el contenedor tenga dimensiones antes de la carga.

### TC-10: Reducir payload JS
- **Categoria:** `pause` (requiere verificación manual)
- **Bloque:** B — Core Web Vitals
- **Archivos:** `components/providers/GSAPProvider.tsx`

GSAP y Splitting.js son bundles grandes para un portafolio. Verificar:
- Tree-shaking de módulos GSAP no usados (Draggable, MotionPath, etc.)
- `import('splitting')` dinámico solo en Hero
- SplitChunks para separar vendor JS del app JS

---

## Fase 4 — Contenido y GEO (semanas 4-8)

### TC-11: Direct-answer paragraphs en Home
- **Categoria:** `staging` (probar en build antes)
- **Bloque:** E — GEO/AEO
- **Archivo:** `app/(site)/page.tsx`

El Hero debe abrir con un párrafo directo que responda "quién es Luis Cruz" en 2-4 oraciones. Esto debe estar visible en el HTML inicial (server component) para que los crawlers AI lo capturen. Actualmente Hero es client component — mover contenido clave a server component wrapper.

Agregar un bloque server-side antes del Hero:

```tsx
<section style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0 }}>
  <h1>Luis Cruz — Diseñador Web y Desarrollador WordPress en Talca, Chile</h1>
  <p>Especialista en WordPress, WooCommerce, UI/UX design y e-commerce. Más de 5 años de experiencia creando sitios web profesionales para empresas en Chile y Latinoamérica.</p>
</section>
```

### TC-12: llms.txt
- **Categoria:** `autonoma`
- **Bloque:** E — GEO/AEO
- **Archivo:** `public/llms.txt` (crear)

```
# Luis Cruz — Diseñador Web & Desarrollador WordPress

## Sobre mí
Diseñador y desarrollador web especializado en WordPress, UI/UX y e-Commerce con más de 5 años de experiencia. Con sede en Talca, Chile.

## Servicios
- Diseño y desarrollo WordPress
- WooCommerce y E-commerce
- UI/UX Design
- Diseño Gráfico
- Branding

## Proyectos destacados
- Cablepar: https://luiscruz.cl/proyectos/cablepar
- Fluye por Chile: https://luiscruz.cl/proyectos/fluye-por-chile
- Varity Labs: https://luiscruz.cl/proyectos/varity-labs
- Wui Coffee Drink & Lounge: https://luiscruz.cl/proyectos/wui-coffee-drink-lounge

## Redes
- LinkedIn: https://www.linkedin.com/in/luiscruz/
- Behance: https://www.behance.net/luiscruz
```

### TC-13: Author entity verification
- **Categoria:** `pause` (requiere inputs del cliente)
- **Bloque:** E — GEO/AEO
- **Archivos:** `app/layout.tsx`

Actualizar Person schema con:
- LinkedIn URL real
- `alumniOf` si aplica
- `birthPlace` (Talca, Chile)
- Foto (`image`) profesional

Requiere que el cliente confirme URLs de LinkedIn y Behance.

---

## Fase 5 — E-E-A-T (continuo)

### TC-14: Google Business Profile
- **Categoria:** `pause` (requiere decisión humana)
- **Bloque:** F — E-E-A-T

Para un diseñador web freelance, un perfil de Google Business Profile con reseñas y portafolio refuerza la entidad local. Crear perfil con:
- Categoría: "Diseñador web"
- Servicios: WordPress, UI/UX, E-commerce
- Fotos del portafolio

### TC-15: Citaciones externas
- **Categoria:** `pause` (requiere decisión humana)
- **Bloque:** F — E-E-A-T

Obtener menciones en:
- Behance (ya tiene perfil — vincular desde el sitio)
- Directorios chilenos: Páginas Amarillas, EmpresasChile
- Foros de WordPress Chile

### TC-16: Knowledge Panel
- **Categoria:** `pause` (requiere decisión humana)
- **Bloque:** F — E-E-A-T

Una vez implementados Organization + Person schema con sameAs correctos y verified LinkedIn, Google puede generar automáticamente un Knowledge Panel. Monitorear en Search Console tras 4-8 semanas de indexación.

---

## Notas técnicas

- **URL base:** Usar `https://luiscruz.cl` (o el dominio real del deploy). Cambiar en sitemap.ts, metadata, y JSON-LD antes de desplegar.
- **Sanity:** El sitio ya integra Sanity CMS con fallback a MOCK_PROJECTS. Cuando Sanity esté en producción, el sitemap generará todas las URLs dinámicamente.
- **Hosting:** Next.js standalone output (`output: 'standalone'` en next.config.ts) — compatible con Vercel, Docker, o Node server propio.
