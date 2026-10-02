# SEO Implementation Tasks — pittuk.net (auditoría 2026-10-01)

Informe completo: `docs/auditoria/pittuk-seo-geo-aeo-audit-2026-10-01.md` — score 54/100.

**Ronda anterior (TC-01 a TC-12 de la auditoría de junio 2026):** implementada. robots.ts, sitemap.ts, canonical por página, grafo Organization + WebSite + Person, BreadcrumbList, OG/Twitter, AVIF/WebP en next.config, llms.txt y H1 oculto en la home. Siguen pendientes de esa ronda: Google Business Profile optimizado, citaciones externas y Knowledge Panel (ver TC-18 y TC-19).

## Estado (actualizado 2026-10-01, ramas `seo/fase-1-oct` y `seo/fase-2-oct`)

- **Hecho:** TC-02, TC-03, TC-04, TC-05, TC-07, TC-09, TC-10, TC-13, TC-14, TC-15.
  - TC-13: byline "Por Luis Cruz · fecha · min de lectura" y caja de autor con avatar (`public/images/luis-cruz-autor.webp`) y LinkedIn.
  - TC-14: los clusters se definen en `lib/blogClusters.ts`. **Al publicar un post nuevo, agregar su slug al cluster que corresponda.** Cada artículo enlaza a su servicio y a 2 relacionados; cada servicio lista 3 guías.
- **Parcial:**
  - TC-01: el código ya carga el video recién al hacer scroll; falta comprimir el mp4 y el poster.
  - TC-06: el hero quedó resuelto (altura y opacidad por CSS). CLS móvil en 0,07 (< 0,1); About, Services y Portfolio solo si el dato de campo lo pide.
  - TC-11: se agregaron GitHub e Instagram al `sameAs` de Person y un retrato (`luis-cruz-retrato.webp`) como `image`. Luis decidió **no publicar ubicación**, así que no se agrega el nodo ProfessionalService.
  - TC-16: las 4 páginas de servicio pasaron de ~180 a ~500 palabras con la nueva prop `sections` del template (para quién, proceso, plazos, experiencia), sin precios por decisión de Luis. Los 5 artículos clave (cuánto cuesta, WooCommerce o Shopify, pasarelas, mantenimiento y hosting) pasaron de ~370 a 590-765 palabras, con un párrafo "Respuesta corta", una tabla comparativa (`PostSection.table`) y `updatedAt: 2026-10-01`. Para llegar a 1.000+ hacen falta datos propios (precios o casos).
- **Decidido:** TC-12, quitar el JSON-LD FAQPage de los servicios. Hecho; las preguntas siguen visibles.
- **Otros cambios:** Google Analytics carga con `lazyOnload`. Las fechas de los posts se formatean en UTC (antes mostraban un día menos).
- **Medición local (Lighthouse móvil, build de producción):**
  - Home: 45 → 76; peso 12,9 MB → 1,1 MB; CLS 0,27 → 0,07; TBT 170 ms; LCP simulado 5,4 s (real sin throttling ~0,4 s).
  - Post: 80.
  - Desktop: 94.
- **GSAP solo en la home** (rama `perf/gsap-solo-home`): se eliminó `GSAPProvider` del layout raíz (todas las animaciones ya definen su `ease`), y Nav (ocultar al bajar) y ProjectCard (hover magnético) pasaron a CSS. Lighthouse móvil: artículo 80 → 91, servicio 84, home sin cambio (75). **No volver a importar `gsap` en componentes compartidos** (Nav, ProjectCard, layout): lo arrastra a todas las páginas.

Categorías: `autonoma` = Claude Code puede ejecutarla sin supervisión · `staging` = probar con `npm run build` + revisión visual antes de deploy · `pause` = requiere decisión o insumo de Luis.

---

## Fase 1 — Performance e higiene (semanas 1-2)

### TC-01: Video de About liviano y diferido
- **Categoría:** `pause` (Luis entrega el video comprimido) → luego `autonoma`
- **Bloque:** B — Core Web Vitals
- **Archivos:** `public/video/luis-cruz.mp4`, `components/sections/About.tsx`
- Hoy pesa 10 MB y `autoPlay` lo descarga completo al cargar la home (7-9 MB transferidos en Lighthouse).
- Comprimir: `ffmpeg -i luis-cruz.mp4 -vf scale=-2:720 -c:v libx264 -crf 28 -preset slow -an -movflags +faststart luis-cruz.mp4` (objetivo < 2 MB). Generar `public/video/luis-cruz-poster.jpg`.
- En el `<video>`: quitar `autoPlay`, agregar `preload="none"` y `poster`, y reproducir solo cuando entra en pantalla:

```tsx
const videoRef = useRef<HTMLVideoElement>(null)
useEffect(() => {
  const v = videoRef.current
  if (!v) return
  const io = new IntersectionObserver(([e]) => { e.isIntersecting ? v.play().catch(() => {}) : v.pause() }, { threshold: 0.25 })
  io.observe(v)
  return () => io.disconnect()
}, [])
```

- **Validación:** Lighthouse móvil, peso total < 3 MB; el video no aparece en la red hasta hacer scroll a "Sobre mí".
- **Rollback:** revertir `About.tsx` y restaurar el mp4 original desde git.

### TC-02: Portadas del portafolio optimizadas
- **Categoría:** `autonoma`
- **Bloque:** B — Core Web Vitals / C — Imágenes
- **Archivo:** `components/project/ProjectCard.tsx` (línea ~77)
- Quitar `unoptimized={!!project.coverUrl}`. Las portadas son locales, así que Next.js puede servirlas en AVIF/WebP. Mantener `unoptimized` solo para `.svg`. Revisar que `sizes` refleje el ancho real de la tarjeta.
- **Validación:** en la pestaña Network, las portadas salen de `/_next/image?...` en avif/webp y ninguna pasa de 200 KB. Ahorro estimado por Lighthouse: ~2,9 MB.
- **Rollback:** restaurar la prop.

### TC-03: Imagen del hero pre-optimizada (LCP)
- **Categoría:** `autonoma`
- **Bloque:** B — Core Web Vitals
- **Archivos:** `public/images/Luis Cruz.png` (2,4 MB), `components/sections/Hero.tsx`
- Convertir a `public/images/luis-cruz-hero.webp` (calidad 75, ~1600 px de ancho) y usarla en el `<Image>` del hero con `priority` y `quality={70}`. Mantener el PNG solo si otro sitio lo referencia (Schema Person `image` → actualizar a la nueva ruta).
- **Validación:** LCP móvil en Lighthouse < 3,5 s (objetivo final < 2,5 s junto con TC-06).
- **Rollback:** volver al `src` anterior.

### TC-04: Cifra de experiencia consistente
- **Categoría:** `autonoma`
- **Bloque:** E — GEO / F — E-E-A-T
- **Archivos:** `app/(site)/page.tsx`, `public/llms.txt`
- "Sobre mí" dice 15+ años, mientras el H1 oculto y llms.txt dicen "más de 5 años". Unificar en "más de 15 años" en todos lados.
- **Validación:** `grep -rn "5 años" app components public` no devuelve nada.
- **Rollback:** revertir texto.

### TC-05: Eliminar `/demo` y el componente sin uso
- **Categoría:** `autonoma`
- **Bloque:** A — Indexabilidad
- **Archivos:** borrar `app/(site)/demo/` y `components/ui/hero-shutter-text.tsx` (verificar con grep que nada más los importe).
- `/demo` responde 200, es indexable y su canonical apunta a la home.
- **Validación:** `GET /demo` → 404; `npm run build` OK.
- **Rollback:** `git checkout` de los archivos borrados.

### TC-06: CLS — estilos responsive en CSS, no en JS
- **Categoría:** `staging`
- **Bloque:** B — Core Web Vitals
- **Archivos:** `components/sections/Hero.tsx` (prioridad), luego `About.tsx`, `Services`, `Portfolio`
- `useMediaQuery` es `false` en el SSR, así que el HTML inicial trae estilos desktop y al hidratar en móvil cambian (`minHeight: 100svh → auto`, padding 120/40 → 100/20). Lighthouse mide CLS 0,27 en el hero.
- Pasar los valores que dependen del viewport a clases con media queries (Tailwind `md:` o CSS en `globals.css`), y dejar `isMobile` solo para lógica (desactivar animaciones GSAP).
- **Validación:** Lighthouse móvil con CLS < 0,1; revisión visual en 375 px y 1920 px.
- **Rollback:** revertir los componentes tocados.

### TC-07: Un solo H1 en la home
- **Categoría:** `autonoma`
- **Bloque:** C — Encabezados
- **Archivos:** `app/(site)/page.tsx`, `components/sections/Hero.tsx`, `components/ui/accordion-05.tsx` (línea ~76)
- Hoy hay 9 H1: el bloque oculto + 8 pasos del proceso.
- Convertir el `<div className="hero-title">` en `<h1>`, con el texto completo accesible: `Luis Cruz.` visible + `<span className="sr-only"> — Diseñador web y desarrollador WordPress en Chile</span>`. Mantener la clase `.hero-title`, porque la usa la animación GSAP.
- Eliminar la `<section>` oculta de `page.tsx` (mover su párrafo a texto visible si aporta).
- En `accordion-05.tsx`, `<h1>` → `<h3>` sin cambiar estilos.
- **Validación:** `curl -s https://pittuk.net | grep -o "<h1" | wc -l` → 1. La animación del título sigue funcionando.
- **Rollback:** revertir los tres archivos.

### TC-08: Imagen OG rasterizada
- **Categoría:** `pause` (Luis diseña la imagen) → luego `autonoma`
- **Bloque:** C — On-page
- **Archivos:** `public/images/og-default.jpg` (1200×630), `app/layout.tsx`, páginas de servicio y `/blog`
- Facebook, LinkedIn y WhatsApp no renderizan el SVG actual (`icono.svg`). Reemplazar en `openGraph.images` y `twitter.images` por `/images/og-default.jpg` con `width: 1200, height: 630`.
- **Validación:** Facebook Sharing Debugger y LinkedIn Post Inspector muestran la imagen.
- **Rollback:** volver a `icono.svg`.

### TC-09: Meta descriptions en rango
- **Categoría:** `autonoma`
- **Bloque:** C — On-page
- **Archivos:** `lib/mock/posts.ts`, `app/layout.tsx`
- Los `excerpt` de los 5 posts de septiembre tienen 170-180 caracteres, y la home tiene 101 con un "Portafolio profesional" genérico. Dejar todo en 140-160 caracteres, con intención y ciudad o país. Ejemplo para la home: "Diseño y desarrollo de sitios WordPress y tiendas WooCommerce para empresas en Chile y Latinoamérica. Trato directo, sin intermediarios. Pittuk — Luis Cruz."
- **Validación:** script que mida `len(excerpt)` ≤ 160.
- **Rollback:** revertir textos.

### TC-10: `lastmod` real en el sitemap
- **Categoría:** `autonoma`
- **Bloque:** A — Sitemap
- **Archivos:** `app/sitemap.ts`, `types/index.ts`, `lib/mock/posts.ts`
- Hoy todas las URLs usan `new Date()` (la hora del build), lo que le dice a Google que todo cambió en cada deploy. Usar `post.updatedAt ?? post.publishedAt` para posts (agregar el campo opcional `updatedAt` al tipo `Post`), y una fecha fija por proyecto o página estática.
- **Validación:** `curl -s https://pittuk.net/sitemap.xml | grep lastmod | sort | uniq -c` muestra fechas distintas.
- **Rollback:** volver a `new Date()`.

---

## Fase 2 — Schema, autor y enlazado (semanas 3-6)

### TC-11: ProfessionalService con NAP
- **Categoría:** `pause` (Luis confirma qué dirección publicar: ciudad o dirección completa, y teléfono)
- **Bloque:** D — Schema / G — Local
- **Archivo:** `app/layout.tsx` (agregar al `@graph`)

```ts
{
  '@type': 'ProfessionalService',
  '@id': 'https://pittuk.net/#business',
  name: 'Pittuk — Luis Cruz',
  url: 'https://pittuk.net',
  image: 'https://pittuk.net/images/og-default.jpg',
  telephone: '+56967093146',
  address: { '@type': 'PostalAddress', addressLocality: 'Talca', addressRegion: 'Maule', addressCountry: 'CL' },
  areaServed: ['CL', 'AR', 'CO', 'VE', 'ES', 'US'],
  founder: { '@id': 'https://pittuk.net/#person' },
  sameAs: ['<URL de Maps del perfil de Google Business>'],
}
```

- Reemplazar `https://share.google/...` en Organization por la URL de Maps del perfil. En `components/sections/Contact.tsx`, reemplazar el link a `google.com/search?...` (lleva parámetros de sesión) por la misma URL.
- Agregar a `sameAs` de Person: `https://github.com/pittuk` y `https://www.instagram.com/p1ttuk/`.
- **Validación:** Rich Results Test sin errores; validator.schema.org muestra ProfessionalService.
- **Rollback:** quitar el nodo.

### TC-12: FAQPage solo donde corresponde
- **Categoría:** `pause` (decidir: quitar el schema o crear `/preguntas-frecuentes`)
- **Bloque:** D — Schema
- **Archivos:** páginas de servicio (`app/(site)/diseno-web-wordpress/page.tsx` y las otras 3)
- Desde 2026, Google no muestra rich results de FAQPage fuera de páginas de FAQ primarias. Recomendación: mantener las preguntas visibles y quitar solo el JSON-LD FAQPage.
- **Validación:** Rich Results Test sin FAQPage en servicios.
- **Rollback:** restaurar el bloque.

### TC-13: Byline y caja de autor en artículos
- **Categoría:** `autonoma`
- **Bloque:** E — Author entity / F — E-E-A-T
- **Archivo:** `app/(site)/blog/[slug]/page.tsx`
- Bajo el H1: "Por Luis Cruz · {fecha} · {minutos} min de lectura". Al final del artículo: caja con foto (avatar recortado de la foto del hero), 2 líneas de bio ("Diseñador y desarrollador web con más de 15 años de experiencia…") y enlace a LinkedIn con `rel="author"`.
- En el Article JSON-LD: `image` como URL absoluta (`https://pittuk.net${image}`) y `dateModified` desde `updatedAt`.
- **Validación:** Rich Results Test → Article sin advertencias; la caja de autor se ve en móvil.
- **Rollback:** revertir el archivo.

### TC-14: Enlazado interno contextual
- **Categoría:** `autonoma`
- **Bloque:** C — Internal linking / E — Topical cluster
- **Archivos:** `types/index.ts`, `lib/mock/posts.ts`, `app/(site)/blog/[slug]/page.tsx`
- Agregar a `Post` los campos opcionales `service?: string` (slug de la página de servicio) y `related?: string[]` (slugs). Renderizar al final de cada artículo un CTA al servicio ("¿Necesitás una tienda WooCommerce? → Diseño de tiendas WooCommerce") y "Artículos relacionados" con 2 enlaces.
- Mapeo sugerido: pasarelas/migrar/WooCommerce vs Shopify/errores tienda → `/diseno-tiendas-woocommerce`; mantenimiento/plugins/lento/hosting → `/mantenimiento-wordpress`; el resto → `/diseno-web-empresas` o `/diseno-web-wordpress`.
- En cada página de servicio, una sección "Guías relacionadas" con 3 artículos de su cluster.
- **Validación:** cada artículo tiene ≥ 3 enlaces internos en el cuerpo y cada servicio ≥ 3 hacia el blog.
- **Rollback:** quitar el render, porque los campos son opcionales.

### TC-15: llms.txt actualizado
- **Categoría:** `autonoma`
- **Bloque:** E — GEO (baja prioridad)
- **Archivo:** `public/llms.txt`
- Agregar "Servicios" con las 4 URLs, "Guías" con los 10 artículos más comerciales, contacto (WhatsApp) y la experiencia corregida (TC-04).
- **Validación:** `GET /llms.txt` → 200.
- **Rollback:** versión anterior.

---

## Fase 3 — Contenido y autoridad (semanas 6-12)

### TC-16: Ampliar páginas de servicio y artículos clave
- **Categoría:** `pause` (Luis valida precios, plazos y casos reales)
- **Bloque:** C — Topical depth / E — Citable facts
- **Archivos:** las 4 páginas de servicio y `lib/mock/posts.ts`
- Servicios: hoy tienen ~180 palabras; objetivo 900+. Cada uno abre con una respuesta directa de 2-4 oraciones (qué es, para quién, desde cuánto, en cuánto tiempo), seguida de qué incluye, rango de precio en CLP, plazos, proceso, 2 casos del portafolio con resultado y FAQ visible.
- Artículos prioritarios (hoy ~370 palabras; objetivo 1.000-1.500): cuánto cuesta una página web en Chile, WooCommerce o Shopify, pasarelas de pago en Chile, mantenimiento WordPress y hosting en Chile. Incluir cifras propias (rangos de precio, plazos medidos en proyectos reales) y una tabla comparativa por artículo.
- **Validación:** conteo de palabras; Search Console a 4-6 semanas muestra impresiones nuevas en queries con cifras.
- **Rollback:** n/a (contenido).

### TC-17: Fichas de proyecto como casos de estudio
- **Categoría:** `pause` (requiere datos de cada cliente)
- **Bloque:** C — Contenido / F — E-E-A-T
- **Archivos:** `lib/mock/projects.ts`, `app/(site)/proyectos/[slug]/page.tsx`
- Hoy tienen ~155 palabras. Agregar: desafío, solución, stack, resultado medible (velocidad, ventas, leads) y, si es posible, una cita del cliente. Title: `{Proyecto} — Caso de diseño web {tipo} | Pittuk`.
- **Validación:** ≥ 400 palabras por ficha en los 5 proyectos principales.

### TC-18: Reseñas y perfil de Google Business
- **Categoría:** `pause`
- **Bloque:** F — E-E-A-T / G — Local
- Pedir reseñas a clientes recientes (enlace directo a reseñas del perfil), completar servicios y categoría "Diseñador de sitios web" y publicar proyectos como posts del perfil. Con ≥ 5 reseñas reales, evaluar mostrarlas en el sitio. No usar AggregateRating con reseñas propias del sitio.

### TC-19: Citaciones externas y marca
- **Categoría:** `pause`
- **Bloque:** F — E-E-A-T
- Mismo nombre ("Pittuk — Luis Cruz"), web y WhatsApp en LinkedIn, Behance, GitHub, Instagram, Páginas Amarillas, Hotfrog Chile y 2x3.cl (perfil profesional). Pedir crédito "Sitio por Pittuk" con enlace en el footer de los sitios de clientes que lo acepten.

---

## Notas técnicas

- **URL base:** `https://pittuk.net` (www y http redirigen con 308).
- **Contenido:** posts y proyectos viven en `lib/mock/*.ts`; Sanity es opcional (si `NEXT_PUBLIC_SANITY_PROJECT_ID` está vacío, se usan los mocks).
- **Deploy:** push a `main` + clic manual en Easypanel. El build en el VPS tarda varios minutos; es normal.
- **Medición:** repetir Lighthouse móvil tras la Fase 1. Cuando PageSpeed tenga cuota o haya datos CrUX, usar campo (p75) como métrica oficial.
