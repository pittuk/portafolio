# Auditoría SEO + GEO + AEO — pittuk.net

**Fecha:** 1 de octubre de 2026
**URL auditada:** https://pittuk.net/
**Plataforma:** Next.js 16 (App Router, standalone) en VPS con Easypanel
**Tipo de cliente:** activo (segunda auditoría, tras implementar TC-01 a TC-12)
**Mercado:** es-CL, con clientes en Latinoamérica, España y EE. UU.

---

## 1. Resumen ejecutivo

**Score total: 54 / 100 — Aceptable, requiere trabajo.**

La base técnica quedó sólida: HTTPS, redirecciones, robots.txt, sitemap, canonicals y Schema base funcionan, y las 41 URLs del sitemap responden 200. El blog pasó de 0 a 20 artículos de intención comercial. Lo que hoy frena la visibilidad no es la indexación, sino tres cosas: **la página de inicio es muy pesada en móvil**, **el contenido es corto para competir** y **la entidad "Luis Cruz / Pittuk" todavía no existe para Google ni para las IAs**.

> **Hallazgos críticos**
> 1. **La home pesa 12,9 MB en móvil.** El video de la sección "Sobre mí" (10 MB) se descarga completo al cargar la página, y las imágenes del portafolio se sirven sin optimizar. Resultado de laboratorio: LCP 6,6 s y Performance 45/100.
> 2. **Hay layout shift alto (CLS 0,27) en el hero.** El servidor renderiza la versión desktop y al hidratar cambia a la versión móvil, lo que mueve la página completa.
> 3. **La marca no aparece en búsquedas.** Ni "pittuk" ni "Luis Cruz diseñador web" devuelven el sitio; los resultados de intención comercial ("diseñador web WordPress Talca", "diseño tiendas WooCommerce Chile") están dominados por marketplaces como 2x3.cl, Tiendanube y Workana.

> **Quick wins**
> 1. Comprimir el video a menos de 2 MB y cargarlo solo cuando entra en pantalla.
> 2. Quitar `unoptimized` de las portadas del portafolio para que Next.js las sirva en AVIF/WebP al tamaño correcto (ahorro estimado de 2,9 MB).
> 3. Unificar la cifra de experiencia: el sitio dice "15+ años" en "Sobre mí", pero el H1 oculto y llms.txt dicen "más de 5 años".

---

## 2. Contexto del análisis

- **Alcance:** home, 4 páginas de servicio, índice de proyectos y 14 fichas, índice del blog y 20 artículos, robots.txt, sitemap.xml, llms.txt.
- **Método:** análisis del HTML servido (server-side), Lighthouse 12 móvil ejecutado localmente contra producción, prueba de acceso con user-agents de crawlers de IA y búsquedas de marca y comerciales.
- **Limitaciones:**
  - Sin datos de campo (CrUX): el sitio no tiene tráfico suficiente para reportarlos y la API de PageSpeed estaba sin cuota el día del análisis. Las métricas de Core Web Vitals son de laboratorio, no de usuarios reales.
  - La herramienta de búsqueda usada opera desde EE. UU., así que los resultados no reflejan exactamente Google Chile.
  - No hubo acceso a Search Console. Se recomienda exportar el informe de rendimiento para la próxima revisión.

---

## 3. Score por bloque

| Bloque | Puntaje | Comentario |
|---|---|---|
| A — Fundamentos técnicos | 13 / 15 | Sólido. Falta `lastmod` real en el sitemap y la página `/demo` sigue pública. |
| B — Core Web Vitals | 6 / 15 | LCP 6,6 s, CLS 0,27 y TBT 390 ms en móvil (laboratorio). Página de 12,9 MB. |
| C — On-page y contenido | 7 / 15 | 9 etiquetas H1 en la home, páginas de servicio de ~180 palabras y artículos de ~370. |
| D — Schema | 10 / 15 | Buen grafo base. Falta ProfessionalService con dirección; FAQPage en páginas de servicio. |
| E — GEO / AEO | 9,5 / 20 | Crawlers de IA con acceso total, pero sin citas, sin cifras citables ni enlaces internos entre artículos y servicios. |
| F — E-E-A-T | 6 / 15 | Sin firma ni bio de autor visible en los artículos, sin reseñas, sin menciones externas. |
| G — SEO local | 2,5 / 5 | Hay perfil de Google Business, pero no hay LocalBusiness schema ni NAP publicado. |
| **Total** | **54 / 100** | |

---

## 4. Top 5 hallazgos críticos

### 4.1 Peso de la home y LCP en móvil

- **Problema:** 12,9 MB transferidos. El video `luis-cruz.mp4` (10 MB) tiene `autoPlay`, así que el navegador lo descarga entero aunque la sección esté varios scrolls más abajo. Las portadas del carrusel del portafolio se sirven con `unoptimized` (hasta 1,1 MB cada una en JPG). El LCP es la foto del hero: 6,6 s, de los cuales 3,4 s son de descarga.
- **Impacto:** en una conexión 4G chilena promedio, la página tarda varios segundos en verse completa. Google usa LCP como señal de ranking y los usuarios móviles abandonan antes de ver el portafolio.
- **Recomendación:** comprimir el video (H.264, 720p, ~1,5 MB) con `preload="none"`, `poster` y reproducción activada al entrar en pantalla; quitar `unoptimized` de `ProjectCard`; servir el hero desde un WebP/AVIF ya optimizado de ~200 KB.
- **Esfuerzo:** bajo (1 día).

### 4.2 Layout shift en el hero (CLS 0,27)

- **Problema:** `useMediaQuery` devuelve `false` en el servidor, así que el HTML inicial trae estilos de desktop (`minHeight: 100svh`, padding de 120 px). Al hidratar en móvil, cambian a `auto` y 100 px, y la página salta.
- **Impacto:** un CLS de 0,27 está en la zona "Poor" (umbral bueno: 0,1). Afecta ranking y la percepción de calidad justo en el primer pantallazo.
- **Recomendación:** mover los estilos que dependen del viewport a CSS con media queries, para que el HTML del servidor ya sea correcto en móvil.
- **Esfuerzo:** medio (2-3 días si se aplica a todas las secciones; empezar por Hero y About).

### 4.3 Estructura de encabezados de la home

- **Problema:** la home tiene 9 etiquetas `<h1>`. Una es el H1 visualmente oculto añadido para SEO y las otras 8 son los pasos del proceso (Contacto, Briefing, Propuesta…) en el acordeón. El título visible "Luis Cruz." es un `<div>`.
- **Impacto:** se diluye el tema principal de la página y queda un H1 oculto con texto distinto al visible, algo que Google puede leer como contenido escondido.
- **Recomendación:** que el título visible del hero sea el único `<h1>` (con el texto completo para lectores de pantalla), eliminar el bloque oculto y pasar los pasos del proceso a `<h3>`.
- **Esfuerzo:** bajo.

### 4.4 Contenido corto y sin cifras citables

- **Problema:** las páginas de servicio tienen ~180 palabras y los artículos ~370. Los artículos evitan dar números (precios, plazos, comisiones), justo el tipo de dato que AI Overviews, Perplexity y ChatGPT extraen como cita.
- **Impacto:** para "cuánto cuesta una página web en Chile", los resultados que aparecen (Neolo, Tiendanube, GoDaddy, 2x3.cl) dan rangos concretos, por ejemplo "$300.000 a $1.000.000". Sin cifras, el artículo no compite ni como resultado orgánico ni como fuente citada.
- **Recomendación:** ampliar los 4 servicios y los 5 artículos de mayor intención comercial a 900-1.500 palabras, con rangos de precio propios, plazos reales, una tabla comparativa y un caso del portafolio.
- **Esfuerzo:** alto (contenido; 2-4 semanas).

### 4.5 Entidad de marca y autor sin construir

- **Problema:** los artículos no muestran autor, foto ni bio (solo existe en el Schema). El nombre "Luis Cruz" es muy común y "Pittuk" no aparece en buscadores. No hay reseñas publicadas ni menciones externas. El `sameAs` de Organization usa un enlace corto `share.google`, y el footer enlaza a una búsqueda de Google con parámetros de sesión.
- **Impacto:** Google y los motores de IA no pueden asociar el contenido a un experto verificable, y en 2026 eso pesa en las citas de AI Overviews.
- **Recomendación:** byline + caja de autor en cada artículo con enlace a LinkedIn; reemplazar el enlace de búsqueda por la URL de Maps del perfil de Google Business; conseguir 5-10 reseñas en Google; usar "Pittuk" de forma consistente como marca junto a "Luis Cruz".
- **Esfuerzo:** medio (código bajo, gestión continua).

---

## 5. Quick wins (0-14 días)

| # | Acción | Quién |
|---|---|---|
| 1 | Comprimir `luis-cruz.mp4` a ~1,5 MB y generar un poster JPG | Luis (HandBrake o ffmpeg) |
| 2 | Quitar `unoptimized` de las portadas del portafolio | Claude Code (TC-02) |
| 3 | Unificar "15+ años" en el H1, llms.txt y Schema | Claude Code (TC-04) |
| 4 | Eliminar la página `/demo` y el componente `hero-shutter-text`, que quedó sin uso | Claude Code (TC-05) |
| 5 | Crear una imagen OG de 1200×630 en JPG/PNG. Las redes no muestran el SVG actual al compartir. | Luis (diseño) + Claude Code (TC-08) |
| 6 | Pedir reseñas en Google a 5-10 clientes recientes (Red ANA, Cruiser-Tech, Varity Labs…) | Luis |
| 7 | Acortar las meta descripciones de los 5 artículos nuevos (hoy 170-180 caracteres) | Claude Code (TC-09) |

---

## 6. Plan a 30 / 60 / 90 días

**Días 1-30 — Performance e higiene**
- Video, imágenes, hero optimizado (TC-01 a TC-03).
- CLS: estilos responsive en CSS (TC-06).
- H1 único en la home (TC-07), OG image (TC-08), metas (TC-09), `/demo` fuera (TC-05).
- `lastmod` real en el sitemap (TC-10).

**Días 31-60 — Schema, autor y enlazado**
- ProfessionalService con dirección (Talca), teléfono y área atendida (TC-11).
- Quitar FAQPage de las páginas de servicio o crear una página `/preguntas-frecuentes` real (TC-12).
- Byline y caja de autor en los artículos, e `image` absoluta en Article (TC-13).
- Enlaces contextuales desde cada artículo a su servicio y a 2 artículos relacionados (TC-14).
- llms.txt actualizado con servicios y blog (TC-15).

**Días 61-90 — Contenido y autoridad**
- Ampliar las 4 páginas de servicio y 5 artículos clave, con cifras propias (TC-16).
- Fichas de proyecto con problema, solución y resultado (TC-17).
- Reseñas en Google, citas en directorios chilenos y perfiles consistentes (TC-18, TC-19).
- Primera revisión en Search Console: queries, impresiones y páginas con impresiones pero 0 clics.

---

## 7. Benchmarks competitivos

| Punto | pittuk.net | 2x3.cl | neolo.com (blog) |
|---|---|---|---|
| Aparece en "diseñador web Talca" | No | Sí (página por comuna) | No |
| Aparece en "cuánto cuesta página web Chile" | No | Sí | Sí (posición alta) |
| Cifras concretas en el contenido | No | Sí (rangos en CLP) | Sí |
| Reseñas visibles | No | Sí (marketplace) | Sí |
| Trato directo con quien construye | Sí (diferenciador) | No | No |

La ventaja diferencial de pittuk.net, trabajar directamente con quien diseña y desarrolla y tener un portafolio real, todavía no se traduce en señales que los buscadores puedan medir: reseñas, cifras y casos con resultados.

---

## 8. Anexos

### 8.1 Queries probadas

| Query | ¿Aparece pittuk.net? | Quién aparece |
|---|---|---|
| pittuk Luis Cruz diseñador web | No | Otros "Luis Cruz" en Behance y LinkedIn |
| diseñador web WordPress freelance Talca Chile | No | 2x3.cl, Indeed, LinkedIn |
| cuánto cuesta una página web en Chile 2026 | No | Neolo, Tiendanube, GoDaddy, 2x3.cl |
| diseño tiendas WooCommerce Chile freelance | No | 2x3.cl, Tiendanube, Workana, Fiverr |
| site:pittuk.net | Sin resultados en el buscador usado | — |

*Repetir estas pruebas en Google Chile (con AI Overview), Perplexity y ChatGPT Search, y comparar con Search Console.*

### 8.2 Resultados Lighthouse (móvil, laboratorio)

| Métrica | Valor | Umbral bueno |
|---|---|---|
| Performance | 45 | ≥ 90 |
| Accesibilidad | 95 | ≥ 90 |
| Buenas prácticas | 100 | ≥ 90 |
| SEO | 100 | ≥ 90 |
| LCP | 6,6 s | < 2,5 s |
| CLS | 0,272 | < 0,1 |
| TBT | 390 ms | < 200 ms |
| FCP | 3,5 s | < 1,8 s |
| Peso total | 12,9 MB | < 2 MB |

Otros: contraste insuficiente en textos de 9-11 px con `var(--muted)` (TrustBar, etiquetas, pasos del proceso).

### 8.3 Lo que ya está bien

- 308 de `http://` y `www.` a `https://pittuk.net`.
- robots.txt correcto y crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended) con acceso 200.
- Sitemap con 41 URLs, todas 200, y TTFB cercano a 0,5 s.
- Canonical por página, OG por artículo y proyecto, Article con autor enlazado a Person, BreadcrumbList, Service y CollectionPage.
- `noindex` en `/cuestionario`. Todas las imágenes tienen alt.

### 8.4 Herramientas

- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Validator: https://validator.schema.org
- PageSpeed Insights (datos de campo cuando haya tráfico): https://pagespeed.web.dev
- Search Console → Rendimiento → filtrar por "Apariencia en la búsqueda".

### 8.5 Glosario

- **LCP:** tiempo hasta que se ve el elemento principal de la página.
- **CLS:** cuánto se "mueve" la página mientras carga.
- **INP / TBT:** qué tan rápido responde la página al tocarla.
- **GEO / AEO:** optimización para que motores de IA y asistentes citen el sitio como fuente.
- **E-E-A-T:** experiencia, pericia, autoridad y confianza; criterios de calidad de Google.
- **Schema / JSON-LD:** datos estructurados que describen la página a los buscadores.
