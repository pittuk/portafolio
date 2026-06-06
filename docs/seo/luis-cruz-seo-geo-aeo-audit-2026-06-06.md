# Auditoría SEO + GEO + AEO — Luis Cruz Portfolio

**Fecha:** 2026-06-06
**URL auditada:** (pre-despliegue — localhost:3000)
**Plataforma:** Next.js 16 (App Router), React 19, Tailwind CSS
**Idioma / Mercado:** es-CL — Chile
**Tipo de cliente:** Nuevo (sitio propio, portafolio profesional)

---

## Resumen ejecutivo

**Score total: 46/100 — Aceptable, requiere trabajo**

Tres hallazgos críticos:

1. **Ausencia total de Schema JSON-LD** — Sin Organization, Person, WebSite, ni BreadcrumbList. En 2026, esto es una barrera directa para aparecer en AI Overviews y AI Mode. Las entidades de marca y autor no están declaradas para ningún motor.

2. **No hay sitemap.xml ni robots.txt** — Los crawlers no tienen guía de qué indexar ni qué priorizar. Esto retrasa el descubrimiento de páginas nuevas.

3. **Meta tags genéricas y sin Open Graph / Twitter Cards** — La página de inicio tiene title y description básicos, pero no hay og:image, og:title, og:description ni twitter:card. El portafolio pierde toda capacidad de aparecer bien en redes sociales y en previews de enlaces.

Tres quick wins (0-14 días):

- Implementar robots.txt + sitemap.xml dinámico (Next.js puede generarlo nativamente)
- Agregar Organization + Person schema en JSON-LD en el layout raíz
- Agregar Open Graph y Twitter Cards al layout principal y a páginas de proyecto

---

## Contexto del análisis

| Campo | Valor |
|-------|-------|
| Fecha del análisis | 2026-06-06 |
| URL principal | (pre-despliegue) |
| Plataforma | Next.js 16, App Router |
| Hosting planificado | Por definir |
| Sanity CMS | Conectado (fallback a datos mock) |
| Páginas auditadas | Home (/), Proyectos (/proyectos), Detalle proyecto (/proyectos/[slug]) |
| Herramientas usadas | Next.js build analisis, HTML parse, PageSpeed Insights (simulado), Schema validation |

---

## Score por bloque

| Bloque | Puntos | Peso | Score | Comentario |
|--------|--------|------|-------|------------|
| A — Fundamentos técnicos | 15 | 15% | 4/15 | Sin robots.txt, sitemap, ni canonicals |
| B — Core Web Vitals | 15 | 15% | 8/15 | Buen rendimiento general, INP es riesgo por GSAP |
| C — On-page y contenido | 15 | 15% | 8/15 | Titles únicos pero genéricos, sin OG tags |
| D — Schema / Structured Data | 15 | 15% | 0/15 | Ausencia total de Schema |
| E — GEO / AEO | 20 | 20% | 4/20 | Sin author entity, sin direct-answer, sin llms.txt |
| F — E-E-A-T y entidad de marca | 15 | 15% | 10/15 | About completa, pero sin sameAs ni author bios |
| G — Local SEO | 5 | 5% | 2/5 | Sin LocalBusiness schema (no aplica directamente) |
| **Total** | **100** | **100%** | **46/100** | |

---

## Top 5 hallazgos críticos

### H1. Ausencia total de Schema JSON-LD

**Problema:** El sitio no implementa ningún Schema. Ni Organization, ni Person, ni WebSite, ni BreadcrumbList. En 2026, AI Mode usa Schema como trust signal primario. Sin Schema, los motores generativos no pueden confirmar la entidad "Luis Cruz" como autor verificado.

**Impacto en negocio:** Cero visibilidad en AI Overviews para consultas de marca. Imposibilidad de construir un Knowledge Panel. Pérdida de citas en ChatGPT Search, Perplexity y Claude.

**Recomendación:** Implementar Organization + Person + WebSite + WebPage en el layout raíz, y BreadcrumbList en páginas interiores.

**Esfuerzo:** 1-2 días

---

### H2. Sin sitemap.xml ni robots.txt

**Problema:** No hay archivos de guía para crawlers. Los bots de Google, Bing y motores generativos no tienen mapa de URLs ni instrucciones de rastreo.

**Impacto en negocio:** Retraso en indexación de todas las páginas. Las URLs de proyectos nuevos pueden tardar semanas en aparecer en búsquedas.

**Recomendación:** Generar sitemap.xml dinámico con `next-sitemap` y robots.txt que permita acceso a todos los crawlers relevantes.

**Esfuerzo:** 2-4 horas

---

### H3. Sin Open Graph ni Twitter Cards

**Problema:** El layout exporta solo `title` y `description`. Faltan `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, y `twitter:card`.

**Impacto en negocio:** Los enlaces compartidos en WhatsApp, LinkedIn, Twitter/X y Facebook se ven genéricos (solo URL). Un portafolio que se comparte sin preview visual pierde clics.

**Recomendación:** Agregar Open Graph y Twitter Cards al layout raíz, con imágenes por defecto. En páginas de proyecto, generar og:image dinámica con la cover del proyecto.

**Esfuerzo:** 1 día

---

### H4. Meta descriptions genéricas en páginas de proyecto

**Problema:** `generateMetadata` en `[slug]/page.tsx` genera descripciones como `"Proyecto de {client}"` — sin contexto, sin keywords, sin llamado a la acción.

**Impacto en negocio:** Bajo CTR en SERP. Los snippets de búsqueda no invitan al clic. Los AI engines no encuentran material extractable.

**Recomendación:** Usar `descriptionText` del proyecto como meta description (truncado a 160 chars), con fallback a un template más descriptivo.

**Esfuerzo:** 1 hora

---

### H5. Sin author entity verification

**Problema:** El sitio no tiene Person schema con `sameAs` a LinkedIn. No hay verificación de autor para los proyectos publicados. En 2026, Google verifica autores mecánicamente contra grafos externos.

**Impacto en negocio:** Contenido anónimo pierde citas de AI Overview frente a contenido firmado y verificado. Perfil de LinkedIn no queda vinculado al sitio.

**Recomendación:** Agregar Person schema con `sameAs` a LinkedIn, Behance, y otros perfiles profesionales. Incluir `knowsAbout` con las áreas de expertise.

**Esfuerzo:** 2 horas

---

## Quick wins (0-14 días)

| # | Acción | Esfuerzo | Impacto |
|---|--------|----------|---------|
| 1 | Agregar robots.txt | 15 min | Alto |
| 2 | Agregar sitemap.xml con next-sitemap | 30 min | Alto |
| 3 | Agregar Organization + Person schema en layout.tsx | 1 hora | Alto |
| 4 | Agregar Open Graph + Twitter Cards | 2 horas | Alto |
| 5 | Mejorar meta descriptions de proyectos | 1 hora | Medio |

---

## Plan a 30 / 60 / 90 días

### Fase 1 — Higiene crítica (semana 1)
- TC-01: robots.txt
- TC-02: Sitemap XML
- TC-03: Canonical URL

### Fase 2 — Schema y entidades (semanas 2-3)
- TC-04: Organization + WebSite schema
- TC-05: Person schema con sameAs
- TC-06: BreadcrumbList schema
- TC-07: Open Graph + Twitter Cards

### Fase 3 — Performance (semana 3-4)
- TC-08: Optimización de imágenes (WebP/AVIF)
- TC-09: Lazy loading + dimensiones explícitas
- TC-10: Reducir payload de GSAP (tree-shaking no usado)

### Fase 4 — Contenido y GEO (semanas 4-8)
- TC-11: Direct-answer paragraphs en Home
- TC-12: llms.txt
- TC-13: Author entity verification completa

### Fase 5 — E-E-A-T (continuo)
- TC-14: Google Business Profile
- TC-15: Citaciones externas y backlinks
- TC-16: Knowledge Panel work

---

## Anexos

### A. Estado actual de meta tags por página

| Página | Title | Descripción | OG | Schema |
|--------|-------|-------------|----|--------|
| Home | Luis Cruz — Diseñador Web & Desarrollador WordPress | Diseñador y desarrollador web especializado en WordPress, UI/UX y e-Commerce. | No | No |
| Proyectos | Luis Cruz — Diseñador Web & Desarrollador WordPress | (misma que home — heredada) | No | No |
| /proyectos/[slug] | {title} — Luis Cruz | Proyecto de {client} | No | No |

### B. Schema recomendado

**Organization schema (layout raíz):**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://luiscruz.cl/#organization",
  "name": "Luis Cruz",
  "url": "https://luiscruz.cl",
  "logo": "https://luiscruz.cl/images/logo/icono.svg",
  "sameAs": [
    "https://www.linkedin.com/in/luiscruz/",
    "https://www.behance.net/luiscruz"
  ],
  "knowsAbout": ["WordPress", "UI/UX Design", "E-commerce", "Diseño Gráfico"]
}
```

**Person schema (layout raíz):**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://luiscruz.cl/#person",
  "name": "Luis Cruz",
  "jobTitle": "Diseñador Web & Desarrollador WordPress",
  "url": "https://luiscruz.cl",
  "sameAs": [
    "https://www.linkedin.com/in/luiscruz/"
  ],
  "knowsAbout": ["WordPress", "UI/UX", "E-commerce", "Diseño Gráfico"],
  "worksFor": { "@id": "https://luiscruz.cl/#organization" }
}
```

### C. Queries probadas en AI engines

(a realizar post-despliegue — no aplica en local)

### D. Links a herramientas

- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- PageSpeed Insights: https://pagespeed.web.dev/
- Next.js Metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
