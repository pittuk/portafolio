# Portfolio Luis Cruz — Spec de Diseño

**Fecha:** 2026-06-04  
**Proyecto:** Portafolio personal como diseñador y desarrollador web  
**URL destino:** Despliegue en VPS con EasyPanel

---

## 1. Objetivo

Construir un portafolio personal de alto impacto visual que sirva como herramienta de captación de clientes y proyectos. El sitio debe demostrar capacidades técnicas y creativas simultáneamente — el portafolio en sí mismo es la primera evidencia del trabajo.

Objetivos secundarios: posicionamiento SEO para búsquedas de diseñadores web en Chile, plataforma escalable para agregar blog y proyectos sin tocar código, analítica de visitas.

---

## 2. Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15 (App Router) |
| CMS | Sanity v3 (Studio embebido en `/studio`) |
| Animaciones | GSAP 3 + ScrollTrigger (gratuitos) + Splitting.js (gratuito, reemplaza SplitText) |
| Estilos | Tailwind CSS v4 |
| Hosting | VPS con EasyPanel (Docker / Node.js) |
| Analytics | Google Analytics 4 + Vercel-style custom events |
| SEO | Next.js Metadata API, sitemap dinámico, structured data JSON-LD |
| Formulario | React Hook Form + Resend (envío de emails) |
| Imágenes | Next.js Image + Sanity CDN |

---

## 3. Identidad Visual

### Paleta de colores
- **Background principal:** `#040c0a` (negro con tinte teal muy sutil)
- **Acento primario:** `#00c2a8` (teal)
- **Texto principal:** `#f0ede8` (blanco cálido)
- **Texto secundario:** `rgba(240,237,232,0.45)` (muted)
- **Superficie de tarjetas:** `rgba(10,20,16,0.9)`
- **Hairlines / separadores:** `rgba(255,255,255,0.06)`

### Tipografía
- **Títulos:** Syne 800 (o reemplazable por PP Neue Montreal / Cabinet Grotesk). Variable CSS `--heading`.
- **Cuerpo:** Space Grotesk 300–600. Variable CSS `--body`.
- **Escala de títulos hero:** `clamp(72px, 12vw, 160px)` — domina la pantalla.
- **Escala de secciones:** `clamp(36px, 5vw, 68px)`.
- Nota: la familia tipográfica es intercambiable cambiando las dos variables CSS.

### Texturas y efectos
- **Grain overlay:** SVG noise fijo (`position:fixed, z-index:9999, pointer-events:none, opacity:0.03`). Solo en pseudo-elemento fijo, nunca en scroll containers.
- **Bloom teal:** Gradientes radiales posicionados en hero y secciones clave (`radial-gradient`). GPU-safe — no blur en scroll.
- **Grid sutil:** Líneas `rgba(0,194,168,0.03)` de 48×48px en fondos de tarjetas y slices de proyecto.

### Componentes base
- **Double-bezel card:** Outer shell `rgba(255,255,255,0.02)` + `border rgba(255,255,255,0.06)` + `border-radius:24px` + `padding:3px`. Inner core `rgba(10,20,16,0.9)` + `border-radius:22px` + `box-shadow: inset 0 1px rgba(255,255,255,0.05)`.
- **Pill / eyebrow tag:** `background rgba(0,194,168,0.08)` + `border rgba(0,194,168,0.2)` + `border-radius:100px`. Dot de color previo al texto.
- **Button shell:** Outer `rgba(0,194,168,0.06)` + `border rgba(0,194,168,0.15)` + `border-radius:100px` + `padding:5px`. Inner `background:var(--teal)` + botón-en-botón icon circle `rgba(4,12,10,0.15)`.
- **Nav floating pill:** `background rgba(255,255,255,0.04)` + `border rgba(255,255,255,0.08)` + `backdrop-blur:12px` + `border-radius:100px`. Desconectada del borde superior.

---

## 4. Estructura de Páginas

### 4.1 Homepage (`/`)
Single-scroll. Secciones en orden:

#### ① Hero — 100vh
- Nav floating pill fija arriba (logo izquierda, links + CTA derecha).
- Barra teal vertical izquierda (decorativa).
- Palabra `DISEÑADOR` gigante de fondo (`opacity:0.025`, font-size `clamp(120px,22vw,300px)`), parallax al scroll.
- Bloom radial teal en esquina inferior-derecha.
- Eyebrow pill: "WordPress · UI/UX · e-Commerce · Talca, Chile".
- Headline `LUIS CRUZ.` en Syne 800, alineado a la izquierda, bottom de la pantalla.
- Bottom row: descriptor (max 2 líneas) + botón doble bisel "Ver proyectos ↗".
- Scroll indicator: línea vertical degradada + texto "scroll" en writing-mode vertical.
- **Animaciones:** SplitText reveal en headline (letras desde máscara), fade-up en descriptor, bloom pulse sutil.

#### ② Servicios
- Header: título izquierda + número "06" gigante semitransparente derecha.
- Grid 3×2 con Z-axis cascade: cards 2, 3, 5 tienen `translateY` de offset (+24px, -12px, +16px).
- Cada card: double-bezel, número 01–06, nombre, descripción, chips de tecnología.
- Línea teal `height:2px` en top del inner core aparece en hover.
- **Animaciones:** Stagger scroll reveal — cada card entra desde abajo con delay escalonado.
- 6 servicios: WordPress, E-Commerce WooCommerce, UI/UX Figma, SEO Técnico, Hosting/Admin, Diseño Gráfico.

#### ③ Portafolio
- Header: título izquierda + link "Ver todos (12) →" derecha.
- Bento grid asimétrico: `grid-template-columns: repeat(12, 1fr)`.
  - Proyecto featured: `col-span-8`, altura 340px.
  - 4 proyectos pequeños: `col-span-4` stacked.
  - 1 proyecto wide: `col-span-8`, altura 160px.
  - Total visible en homepage: 6 proyectos.
- Cada proyecto: overlay con categoría + nombre al hover, arrow badge `↗` animado.
- Link "Ver todos los proyectos (12)" al pie.
- **Animaciones:** Stagger reveal con delay por posición en grid, magnetic effect en hover de cada card (JS: seguimiento del cursor con `transform: translate(x,y)` limitado a ±8px).

#### ④ Proceso
- Título + 4 steps en grid de 4 columnas.
- Línea conectora horizontal (`::before`) entre dots.
- Cada step: dot teal, número gigante semitransparente (72px), nombre + descripción.
- **Animaciones:** ScrollTrigger dibuja la línea conectora (scaleX de 0 a 1), cada step hace fade-up escalonado al entrar.

#### ⑤ Sobre mí
- Grid 2 columnas: izquierda texto, derecha foto.
- Izquierda: título, bio, stats animados (10+ años, 50+ proyectos, 100% compromiso), chips de skills.
- Derecha: foto con double-bezel shell + offset decorativo (`::after` border desplazado 12px).
- **Animaciones:** Counter-up en stats al entrar en viewport, foto con clip-path reveal desde abajo.

#### ⑥ Contacto
- Título enorme en 3 líneas: "¿Tienes / un proyecto? / Hablemos." con pesos diferentes (normal / muted / teal).
- Grid 2 columnas: izquierda (email, teléfono, ubicación, social pills: LinkedIn, Behance, WhatsApp) + derecha (formulario en double-bezel).
- Formulario: 4 campos (nombre, email, tipo de proyecto, descripción) + submit con button-in-button. Backend: Resend API.
- **Animaciones:** SplitText en título, form campos fade-in escalonado.

#### Footer
- Logo + copyright. Sin elementos extra.

---

### 4.2 Página de proyecto (`/proyectos/[slug]`)

#### Hero del proyecto
- Nav con "← Volver a proyectos" en pill.
- Eyebrow pill con categorías del proyecto.
- Título del proyecto en Syne 800 (`clamp(48px, 8vw, 110px)`).
- **Animaciones:** SplitText reveal en título.

#### Intro split
- Descripción del proyecto (texto largo, 2–3 párrafos) izquierda.
- Tarjeta metadata derecha (double-bezel): Cliente, Año, Rol, Herramientas (chips), Link "Ver sitio ↗".

#### Image slices (la parte Behance)
- Label separador horizontal: "— Vista del proyecto —".
- Entre 3 y 6 slices full-width (configurable por proyecto desde Sanity), separadas por hairline teal de 3px.
- Cada slice: imagen de pantalla completa del proyecto, altura variable (220–340px).
- Slice labels: pill overlay en esquina indicando qué sección muestra ("Header + Hero — 1/5"). Si hay menos de 5 slices el número se ajusta automáticamente.
- **Animaciones:** Cada slice tiene parallax independiente con GSAP ScrollTrigger (`scrub: true`). Al hacer scroll, el interior de cada slice se mueve a velocidades ligeramente distintas, creando profundidad cinematográfica.

#### Navegación siguiente proyecto
- Full-width, fondo hover con scale desde la izquierda.
- "Siguiente proyecto" label + nombre + flecha doble bisel.

---

### 4.3 Página de proyectos (`/proyectos`)
- Grid masonry de los 12 proyectos: patrón bento que se repite cada 6 items (featured 8cols + 2×4cols, luego 2×4cols + wide 8cols).
- Filtros por categoría arriba: pill toggles (Todos / WordPress / E-Commerce / UI/UX / Diseño Gráfico). Filtrado client-side con animación de fade-out/in.
- Cada card igual que en homepage: overlay + arrow badge + magnetic hover.
- Sin paginación en Fase 1 (12 proyectos caben en una página). Paginación se añade si escala.

### 4.4 Blog (`/blog`) — Fase 2
- Listado de artículos desde Sanity.
- Página de artículo (`/blog/[slug]`): tipografía editorial, tabla de contenidos lateral, estimated reading time.

---

## 5. CMS — Sanity v3

### Schemas

**`project` (Proyecto)**
```
title: string
slug: slug
category: array<string>  // WordPress | E-Commerce | UI/UX | Branding
year: number
client: string
role: string
tools: array<string>
description: text (portable text)
liveUrl: url
featured: boolean
order: number
sliceImages: array<image>  // las 5 imágenes horizontales
coverImage: image
```

**`post` (Blog)**
```
title: string
slug: slug
publishedAt: datetime
excerpt: string
body: block (portable text)
coverImage: image
tags: array<string>
seo: { metaTitle, metaDescription, ogImage }
```

**`settings` (Global)**
```
siteTitle: string
siteDescription: string
email: string
phone: string
location: string
socialLinks: { linkedin, behance, whatsapp }
```

### Sanity Studio
- Accesible en `/studio` (ruta protegida por auth de Sanity).
- Deploy junto al sitio Next.js en el mismo container Docker.

---

## 6. SEO

- **Metadata API de Next.js:** `generateMetadata()` en cada page — title, description, OG image, canonical.
- **Sitemap dinámico:** `app/sitemap.ts` — genera URLs de todos los proyectos y posts desde Sanity.
- **Robots.txt:** `app/robots.ts`.
- **JSON-LD Structured Data:** `Person` schema en homepage, `WebPage` en proyectos, `Article` en blog posts.
- **Core Web Vitals:** Next.js Image optimization, fonts con `display:swap`, lazy loading de slices.
- **OG Images:** Generadas dinámicamente con `next/og` por proyecto y post.

---

## 7. Animaciones — Inventario GSAP

| Animación | Trigger | Implementación |
|-----------|---------|---------------|
| Text reveal hero title | On load | `Splitting.js` divide en chars → `gsap.from` con `yPercent:100, clipPath` por char |
| Text reveal sección titles | ScrollTrigger | `Splitting.js` por líneas → mask reveal escalonado |
| Parallax hero bg-word | Scroll | `ScrollTrigger scrub:1` |
| Bloom pulse hero | On load | `gsap.to` scale + opacity loop |
| Services stagger | ScrollTrigger | `stagger: 0.1` con `from below` |
| Process line draw | ScrollTrigger | `scaleX: 0→1` en pseudo-elemento |
| Counter-up stats | ScrollTrigger | `gsap.to` con snap integer |
| Foto clip-path reveal | ScrollTrigger | `clipPath: inset(100%→0%)` |
| Slices parallax | Scroll scrub | `y: -30→30` independiente por slice |
| Magnetic buttons | Mouse move | JS manual `lerp` en hover, `transform:translate` ±8px |
| Custom cursor | Global | Dot 12px que sigue al mouse con `lerp`, escala en links |
| Nav pill hide/show | Scroll direction | `ScrollTrigger.create` detecta dirección |

---

## 8. Formulario de Contacto

- **Frontend:** React Hook Form + Zod validation.
- **Backend:** Next.js Route Handler (`app/api/contact/route.ts`) → Resend API.
- **Campos:** nombre, email, tipo de proyecto (select), descripción.
- **Feedback:** Toast de éxito/error con animación.
- **Protección spam:** Honeypot field.

---

## 9. Analytics

- Google Analytics 4 (via `next/third-parties/google`).
- Eventos custom: `project_view`, `contact_form_submit`, `cv_download`, `social_click`.

---

## 10. Despliegue — EasyPanel + VPS

- **Dockerfile:** Multi-stage build, imagen Node 20 Alpine.
- **Variables de entorno:** `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN` (read+write, para ISR revalidation), `SANITY_WEBHOOK_SECRET`, `RESEND_API_KEY`, `NEXT_PUBLIC_GA_ID`.
- **Puerto:** 3000 interno, EasyPanel maneja reverse proxy + SSL.
- **Sanity Studio:** Embebido en el mismo build Next.js, no requiere deploy separado.

---

## 11. Fases de Entrega

| Fase | Contenido |
|------|-----------|
| **Fase 1** | Homepage + 12 páginas de proyecto + Sanity CMS + SEO + Deploy |
| **Fase 2** | Blog (listado + detalle) + página `/proyectos` con filtros |
| **Fase 3** | Analytics avanzado, formulario mejorado, optimizaciones de performance |
