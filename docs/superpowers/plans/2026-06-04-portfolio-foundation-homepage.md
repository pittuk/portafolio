# Portfolio Luis Cruz — Plan 1: Foundation + Homepage

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir el homepage completo del portafolio de Luis Cruz con todas sus secciones, animaciones GSAP, integración Sanity CMS, y servidor corriendo en local listo para revisión visual.

**Architecture:** Next.js 15 App Router con componentes de servidor para data fetching desde Sanity, componentes de cliente solo donde se necesita interactividad o GSAP. GSAP se inicializa en un provider global. Tailwind v4 con CSS custom properties para el design system.

**Tech Stack:** Next.js 15, Sanity v3, Tailwind CSS v4, GSAP 3 + ScrollTrigger, Splitting.js, TypeScript, React Hook Form, Zod, Resend

---

## Estructura de archivos

```
app/
├── (site)/
│   ├── layout.tsx               # Layout con Nav + Footer + cursor
│   └── page.tsx                 # Homepage — importa secciones
├── studio/[[...tool]]/page.tsx  # Sanity Studio
├── api/contact/route.ts         # Endpoint formulario de contacto
├── layout.tsx                   # Root layout — fonts + providers
└── globals.css                  # Design tokens + base styles

components/
├── layout/
│   ├── Nav.tsx                  # Floating pill nav
│   ├── Footer.tsx               # Logo + copyright
│   └── CustomCursor.tsx         # Dot cursor personalizado
├── ui/
│   ├── DoubleBezelCard.tsx      # Wrapper double-bezel reutilizable
│   ├── EyebrowPill.tsx          # Tag pill con dot
│   └── PrimaryButton.tsx        # Botón shell + inner + icon
├── sections/
│   ├── Hero.tsx                 # Sección 1
│   ├── Services.tsx             # Sección 2
│   ├── Portfolio.tsx            # Sección 3 — preview 6 proyectos
│   ├── Process.tsx              # Sección 4
│   ├── About.tsx                # Sección 5
│   └── Contact.tsx             # Sección 6 + formulario
└── providers/
    └── GSAPProvider.tsx         # Registra plugins GSAP

lib/
├── sanity/
│   ├── client.ts               # createClient con config
│   ├── queries.ts              # GROQ queries
│   └── image.ts                # urlFor helper
└── animations/
    ├── splitText.ts            # Wrapper Splitting.js + GSAP
    └── useScrollReveal.ts      # Hook reutilizable para scroll reveal

sanity/
├── schemaTypes/
│   ├── project.ts
│   ├── post.ts
│   └── settings.ts
└── sanity.config.ts

types/index.ts                  # Interfaces TypeScript
styles/tokens.css               # CSS custom properties
Dockerfile                      # Multi-stage build
.env.local.example              # Template de variables
```

---

## Task 1: Scaffolding del proyecto

**Files:**
- Create: `package.json` (via npx)
- Create: `next.config.ts`
- Create: `.env.local.example`
- Create: `types/index.ts`

- [ ] **Step 1: Crear el proyecto Next.js 15**

```bash
cd "D:/Documentos/Pittuk/web/Nueva propuesta"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"
```

Cuando pregunte por Turbopack: Yes.

- [ ] **Step 2: Instalar dependencias**

```bash
npm install gsap @gsap/react splitting next-sanity @sanity/image-url sanity react-hook-form zod @hookform/resolvers resend
npm install -D @types/splitting
```

- [ ] **Step 3: Configurar next.config.ts**

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 4: Crear .env.local.example**

```bash
# .env.local.example
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
SANITY_WEBHOOK_SECRET=your_webhook_secret
RESEND_API_KEY=your_resend_key
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

- [ ] **Step 5: Crear types/index.ts**

```typescript
// types/index.ts
export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  alt?: string
}

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  category: string[]
  year: number
  client: string
  role: string
  tools: string[]
  description: any[] // Portable text
  liveUrl?: string
  featured: boolean
  order: number
  sliceImages: SanityImage[]
  coverImage: SanityImage
}

export interface Settings {
  siteTitle: string
  siteDescription: string
  email: string
  phone: string
  location: string
  socialLinks: {
    linkedin?: string
    behance?: string
    whatsapp?: string
  }
}
```

- [ ] **Step 6: Commit inicial**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 15 project with dependencies"
```

---

## Task 2: Design system — tokens y estilos base

**Files:**
- Create: `styles/tokens.css`
- Modify: `app/globals.css`

- [ ] **Step 1: Crear styles/tokens.css**

```css
/* styles/tokens.css */
:root {
  --bg: #040c0a;
  --teal: #00c2a8;
  --teal-dim: rgba(0, 194, 168, 0.08);
  --teal-mid: rgba(0, 194, 168, 0.15);
  --white: #f0ede8;
  --muted: rgba(240, 237, 232, 0.45);
  --card-surface: rgba(10, 20, 16, 0.9);
  --hairline: rgba(255, 255, 255, 0.06);
  --heading: 'Syne', sans-serif;
  --body: 'Space Grotesk', sans-serif;
}
```

- [ ] **Step 2: Reemplazar app/globals.css**

```css
/* app/globals.css */
@import "tailwindcss";
@import "../styles/tokens.css";

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  background: var(--bg);
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--white);
  font-family: var(--body);
  overflow-x: hidden;
  cursor: none; /* oculta cursor nativo — CustomCursor lo reemplaza */
}

/* En touch/mobile mostramos cursor nativo */
@media (hover: none) {
  body { cursor: auto; }
}

/* Grain overlay — fijo, no afecta scroll */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.03;
}

/* Animaciones de entrada — clase base */
.reveal-hidden {
  opacity: 0;
  transform: translateY(32px);
}
```

- [ ] **Step 3: Commit**

```bash
git add styles/ app/globals.css
git commit -m "feat: add design tokens and base styles"
```

---

## Task 3: Fuentes y root layout

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/providers/GSAPProvider.tsx`

- [ ] **Step 1: Crear GSAPProvider.tsx**

```typescript
// components/providers/GSAPProvider.tsx
'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    // Configuración global de GSAP
    gsap.defaults({ ease: 'power3.out' })
    return () => {
      // Cleanup: matar todos los ScrollTriggers al desmontar
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return <>{children}</>
}
```

- [ ] **Step 2: Actualizar app/layout.tsx**

```typescript
// app/layout.tsx
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
  title: 'Luis Cruz — Diseñador Web & Desarrollador WordPress',
  description: 'Diseñador y desarrollador web especializado en WordPress, UI/UX y e-Commerce. Talca, Chile.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${syne.variable} ${spaceGrotesk.variable}`}>
      <body>
        <GSAPProvider>
          {children}
        </GSAPProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Actualizar tokens.css para usar las variables de font**

```css
/* Añadir al final de styles/tokens.css */
:root {
  --heading: var(--font-syne), sans-serif;
  --body: var(--font-space), sans-serif;
}
```

- [ ] **Step 4: Verificar que el servidor corre sin errores**

```bash
npm run dev
```

Abrir http://localhost:3000 — debe mostrar página en blanco oscura (fondo #040c0a). Sin errores en consola.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx components/providers/
git commit -m "feat: root layout with Syne + Space Grotesk fonts and GSAP provider"
```

---

## Task 4: Sanity — schemas y configuración

**Files:**
- Create: `sanity/sanity.config.ts`
- Create: `sanity/schemaTypes/project.ts`
- Create: `sanity/schemaTypes/post.ts`
- Create: `sanity/schemaTypes/settings.ts`
- Create: `sanity/schemaTypes/index.ts`

- [ ] **Step 1: Crear cuenta Sanity y project**

```bash
npx sanity@latest init --env
```

Seguir el wizard: crear nuevo proyecto, nombre "luis-cruz-portfolio", dataset "production". Esto genera el `.env.local` con `NEXT_PUBLIC_SANITY_PROJECT_ID` y `NEXT_PUBLIC_SANITY_DATASET`.

- [ ] **Step 2: Crear sanity/schemaTypes/project.ts**

```typescript
// sanity/schemaTypes/project.ts
import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({
      name: 'category',
      title: 'Categorías',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['WordPress', 'E-Commerce', 'UI/UX', 'Diseño Gráfico'] },
    }),
    defineField({ name: 'year', title: 'Año', type: 'number' }),
    defineField({ name: 'client', title: 'Cliente', type: 'string' }),
    defineField({ name: 'role', title: 'Rol', type: 'string' }),
    defineField({ name: 'tools', title: 'Herramientas', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'description', title: 'Descripción', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'liveUrl', title: 'URL del sitio', type: 'url' }),
    defineField({ name: 'featured', title: 'Destacado', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Orden', type: 'number', initialValue: 0 }),
    defineField({ name: 'coverImage', title: 'Imagen de portada', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'sliceImages',
      title: 'Imágenes del proyecto (slices)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: r => r.min(3).max(6),
    }),
  ],
  orderings: [{ title: 'Orden manual', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', media: 'coverImage', subtitle: 'client' },
  },
})
```

- [ ] **Step 3: Crear sanity/schemaTypes/settings.ts**

```typescript
// sanity/schemaTypes/settings.ts
import { defineField, defineType } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Configuración del sitio',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', type: 'string', initialValue: 'Luis Cruz' }),
    defineField({ name: 'siteDescription', type: 'text', rows: 3 }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'location', type: 'string', initialValue: 'Talca, Chile' }),
    defineField({
      name: 'socialLinks',
      title: 'Redes sociales',
      type: 'object',
      fields: [
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
        { name: 'behance', type: 'url', title: 'Behance' },
        { name: 'whatsapp', type: 'string', title: 'WhatsApp (número con código país)' },
      ],
    }),
  ],
  preview: { select: { title: 'siteTitle' } },
})
```

- [ ] **Step 4: Crear sanity/schemaTypes/post.ts**

```typescript
// sanity/schemaTypes/post.ts
import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Artículo de Blog',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }] }),
  ],
})
```

- [ ] **Step 5: Crear sanity/schemaTypes/index.ts**

```typescript
// sanity/schemaTypes/index.ts
import { project } from './project'
import { post } from './post'
import { settings } from './settings'

export const schemaTypes = [project, post, settings]
```

- [ ] **Step 6: Crear sanity/sanity.config.ts**

```typescript
// sanity/sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'luis-cruz-portfolio',
  title: 'Luis Cruz — Portfolio CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
```

- [ ] **Step 7: Crear app/studio/[[...tool]]/page.tsx**

```typescript
// app/studio/[[...tool]]/page.tsx
'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

- [ ] **Step 8: Verificar Sanity Studio**

```bash
npm run dev
```

Abrir http://localhost:3000/studio — debe mostrar el panel Sanity. Crear 1 proyecto de prueba con datos ficticios y cover image.

- [ ] **Step 9: Commit**

```bash
git add sanity/ app/studio/
git commit -m "feat: Sanity v3 schemas (project, post, settings) and Studio route"
```

---

## Task 5: Sanity client y queries

**Files:**
- Create: `lib/sanity/client.ts`
- Create: `lib/sanity/queries.ts`
- Create: `lib/sanity/image.ts`

- [ ] **Step 1: Crear lib/sanity/client.ts**

```typescript
// lib/sanity/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})
```

- [ ] **Step 2: Crear lib/sanity/image.ts**

```typescript
// lib/sanity/image.ts
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
```

- [ ] **Step 3: Crear lib/sanity/queries.ts**

```typescript
// lib/sanity/queries.ts
import { client } from './client'
import type { Project, Settings } from '@/types'

export async function getProjects(): Promise<Project[]> {
  return client.fetch(
    `*[_type == "project"] | order(order asc) {
      _id, title, slug, category, year, client, role, tools,
      description, liveUrl, featured, order, coverImage, sliceImages
    }`
  )
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, title, slug, category, year, client, role, tools,
      description, liveUrl, coverImage, sliceImages
    }`,
    { slug }
  )
}

export async function getSettings(): Promise<Settings | null> {
  return client.fetch(`*[_type == "settings"][0]`)
}
```

- [ ] **Step 4: Verificar que el fetch funciona**

En `app/(site)/page.tsx` añadir temporalmente:

```typescript
import { getProjects } from '@/lib/sanity/queries'

export default async function Home() {
  const projects = await getProjects()
  return <pre style={{color:'white'}}>{JSON.stringify(projects, null, 2)}</pre>
}
```

Abrir http://localhost:3000 — debe mostrar el proyecto de prueba creado en Sanity. Si devuelve array vacío, el proyecto de prueba no tiene slug correcto.

- [ ] **Step 5: Commit**

```bash
git add lib/
git commit -m "feat: Sanity client, image builder, and GROQ queries"
```

---

## Task 6: Componentes UI base

**Files:**
- Create: `components/ui/DoubleBezelCard.tsx`
- Create: `components/ui/EyebrowPill.tsx`
- Create: `components/ui/PrimaryButton.tsx`

- [ ] **Step 1: Crear DoubleBezelCard.tsx**

```typescript
// components/ui/DoubleBezelCard.tsx
import { ReactNode } from 'react'

interface DoubleBezelCardProps {
  children: ReactNode
  className?: string
  innerClassName?: string
  style?: React.CSSProperties
}

export default function DoubleBezelCard({ children, className = '', innerClassName = '', style }: DoubleBezelCardProps) {
  return (
    <div
      className={className}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '24px',
        padding: '3px',
        ...style,
      }}
    >
      <div
        className={innerClassName}
        style={{
          background: 'var(--card-surface)',
          borderRadius: '22px',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)',
          height: '100%',
        }}
      >
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Crear EyebrowPill.tsx**

```typescript
// components/ui/EyebrowPill.tsx
interface EyebrowPillProps {
  children: React.ReactNode
  className?: string
}

export default function EyebrowPill({ children, className = '' }: EyebrowPillProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 w-fit ${className}`}
      style={{
        background: 'rgba(0,194,168,0.08)',
        border: '1px solid rgba(0,194,168,0.2)',
        borderRadius: '100px',
        padding: '5px 14px',
        fontSize: '9px',
        fontWeight: 600,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--teal)',
      }}
    >
      <span style={{ width: 5, height: 5, background: 'var(--teal)', borderRadius: '50%', flexShrink: 0, display: 'block' }} />
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Crear PrimaryButton.tsx**

```typescript
// components/ui/PrimaryButton.tsx
'use client'
import { ReactNode } from 'react'

interface PrimaryButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  icon?: string
}

export default function PrimaryButton({ children, onClick, href, icon = '↗' }: PrimaryButtonProps) {
  const inner = (
    <div
      style={{
        background: 'var(--teal)',
        color: 'var(--bg)',
        borderRadius: '100px',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontFamily: 'var(--body)',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'transform 0.3s cubic-bezier(0.32,0.72,0,1)',
      }}
    >
      {children}
      <span style={{
        width: 28, height: 28,
        background: 'rgba(4,12,10,0.15)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13,
      }}>
        {icon}
      </span>
    </div>
  )

  const shell = (
    <div style={{
      background: 'rgba(0,194,168,0.06)',
      border: '1px solid rgba(0,194,168,0.15)',
      borderRadius: '100px',
      padding: '5px',
      display: 'inline-block',
    }}>
      {inner}
    </div>
  )

  if (href) return <a href={href} style={{ textDecoration: 'none' }}>{shell}</a>
  return <button onClick={onClick} style={{ background: 'none', border: 'none' }}>{shell}</button>
}
```

- [ ] **Step 4: Commit**

```bash
git add components/ui/
git commit -m "feat: DoubleBezelCard, EyebrowPill, PrimaryButton UI components"
```

---

## Task 7: Nav y CustomCursor

**Files:**
- Create: `components/layout/Nav.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `components/layout/CustomCursor.tsx`
- Create: `app/(site)/layout.tsx`

- [ ] **Step 1: Crear Nav.tsx**

```typescript
// components/layout/Nav.tsx
'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Ocultar nav al scroll hacia abajo, mostrar al scroll hacia arriba
    let lastY = 0
    ScrollTrigger.create({
      onUpdate: (self) => {
        const currentY = self.scroll()
        if (currentY > lastY && currentY > 100) {
          gsap.to(navRef.current, { y: -100, duration: 0.4, ease: 'power2.in' })
        } else {
          gsap.to(navRef.current, { y: 0, duration: 0.4, ease: 'power2.out' })
        }
        lastY = currentY
      },
    })
  }, [])

  return (
    <header
      ref={navRef}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '28px 40px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}
    >
      <Link href="/" style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 15, color: 'var(--white)', textDecoration: 'none' }}>
        LC<span style={{ color: 'var(--teal)' }}>.</span>
      </Link>

      <nav style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '100px',
        padding: '10px 20px',
        display: 'flex', gap: 24, alignItems: 'center',
        backdropFilter: 'blur(12px)',
      }}>
        {[
          { href: '/#portfolio', label: 'Trabajo' },
          { href: '/#servicios', label: 'Servicios' },
          { href: '/#sobre-mi', label: 'Sobre mí' },
        ].map(({ href, label }) => (
          <Link key={href} href={href} style={{ fontSize: 11, fontWeight: 500, color: 'var(--muted)', textDecoration: 'none' }}>
            {label}
          </Link>
        ))}
        <Link
          href="/#contacto"
          style={{
            background: 'var(--teal)', color: 'var(--bg)',
            fontWeight: 700, borderRadius: '100px',
            padding: '6px 16px', fontSize: 10,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Hablemos
        </Link>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Crear Footer.tsx**

```typescript
// components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer style={{
      padding: '24px 40px',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <div style={{ fontFamily: 'var(--heading)', fontSize: 13, fontWeight: 800, color: 'var(--white)' }}>
        LC<span style={{ color: 'var(--teal)' }}>.</span>
      </div>
      <p style={{ fontSize: 10, color: 'rgba(240,237,232,0.2)', letterSpacing: '0.5px' }}>
        © {new Date().getFullYear()} Luis Cruz · Diseñado &amp; desarrollado por mí mismo
      </p>
    </footer>
  )
}
```

- [ ] **Step 3: Crear CustomCursor.tsx**

```typescript
// components/layout/CustomCursor.tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // No mostrar en touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current!
    const ring = ringRef.current!
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'none' })
    }

    // Animación del ring con lerp
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      gsap.set(ring, { x: ringX, y: ringY })
      requestAnimationFrame(animate)
    }

    // Escalar en links/botones
    const onEnterLink = () => gsap.to(ring, { scale: 2.5, duration: 0.3, ease: 'power2.out' })
    const onLeaveLink = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out' })

    document.addEventListener('mousemove', onMouseMove)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })
    animate()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      {/* Dot — sigue exacto */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99998,
          width: 6, height: 6,
          background: 'var(--teal)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />
      {/* Ring — sigue con delay */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99997,
          width: 32, height: 32,
          border: '1px solid rgba(0,194,168,0.4)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          transition: 'width 0.3s, height 0.3s',
        }}
      />
    </>
  )
}
```

- [ ] **Step 4: Crear app/(site)/layout.tsx**

```typescript
// app/(site)/layout.tsx
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/layout/CustomCursor'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 5: Verificar nav y cursor**

```bash
npm run dev
```

Abrir http://localhost:3000. Verificar: nav pill flotante en la parte superior, cursor personalizado siguiendo el mouse (solo en desktop), cursor expandiéndose sobre los links del nav.

- [ ] **Step 6: Commit**

```bash
git add components/layout/ app/'(site)'/layout.tsx
git commit -m "feat: floating pill nav, footer, and custom cursor"
```

---

## Task 8: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`
- Create: `lib/animations/splitText.ts`
- Modify: `app/(site)/page.tsx`

- [ ] **Step 1: Crear lib/animations/splitText.ts**

```typescript
// lib/animations/splitText.ts
// Wrapper para Splitting.js + GSAP
// Splitting.js añade data-splitting y divide en spans por char/word/line

export async function animateTitle(selector: string, gsap: any) {
  // Splitting.js es ESM-only, importar dinámicamente para evitar SSR errors
  const Splitting = (await import('splitting')).default
  const results = Splitting({ target: selector, by: 'chars' })

  if (!results.length) return

  const chars = results[0].chars as HTMLElement[]

  gsap.fromTo(
    chars,
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.025,
      ease: 'power4.out',
      delay: 0.2,
    }
  )
}

export async function animateTitleOnScroll(selector: string, gsap: any, ScrollTrigger: any) {
  const Splitting = (await import('splitting')).default
  const results = Splitting({ target: selector, by: 'lines' })

  if (!results.length) return

  const lines = results[0].lines as HTMLElement[][]

  lines.forEach((line, i) => {
    gsap.fromTo(
      line,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: line[0],
          start: 'top 90%',
          once: true,
        },
        delay: i * 0.1,
      }
    )
  })
}
```

- [ ] **Step 2: Crear components/sections/Hero.tsx**

```typescript
// components/sections/Hero.tsx
'use client'
import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EyebrowPill from '@/components/ui/EyebrowPill'
import PrimaryButton from '@/components/ui/PrimaryButton'
import { animateTitle } from '@/lib/animations/splitText'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const bgWordRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Título con Splitting.js
    animateTitle('.hero-title', gsap)

    // Fade-up para descriptor y CTA
    gsap.fromTo(
      [eyebrowRef.current, descRef.current, ctaRef.current],
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, delay: 0.8, ease: 'power3.out' }
    )

    // Parallax en la palabra de fondo
    gsap.to(bgWordRef.current, {
      y: -120,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }, [])

  return (
    <section
      ref={heroRef}
      id="inicio"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Bloom inferior derecho */}
      <div style={{
        position: 'absolute', bottom: -120, right: -80,
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(0,194,168,0.14) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      {/* Bloom superior izquierdo */}
      <div style={{
        position: 'absolute', top: -100, left: -100,
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(0,194,168,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      {/* Barra decorativa izquierda */}
      <div style={{
        position: 'absolute', left: 0, top: 80, bottom: 0, width: 2,
        background: 'linear-gradient(180deg, transparent, var(--teal) 40%, transparent)',
        opacity: 0.4,
      }} />

      {/* Palabra de fondo */}
      <div
        ref={bgWordRef}
        style={{
          position: 'absolute', bottom: -20, left: -10,
          fontFamily: 'var(--heading)', fontWeight: 800,
          fontSize: 'clamp(120px, 22vw, 300px)',
          color: 'rgba(0,194,168,0.025)',
          lineHeight: 1, letterSpacing: -8,
          pointerEvents: 'none', whiteSpace: 'nowrap',
          userSelect: 'none', zIndex: 1,
        }}
      >
        DISEÑADOR
      </div>

      {/* Contenido */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '120px 40px 48px',
        position: 'relative', zIndex: 2,
      }}>
        <div ref={eyebrowRef} style={{ opacity: 0 }}>
          <EyebrowPill>WordPress · UI/UX · e-Commerce · Talca, Chile</EyebrowPill>
        </div>

        <h1
          className="hero-title"
          style={{
            fontFamily: 'var(--heading)', fontWeight: 800,
            fontSize: 'clamp(72px, 12vw, 160px)',
            lineHeight: 0.9, letterSpacing: -4,
            color: 'var(--white)', marginTop: 20,
            overflow: 'hidden',
          }}
        >
          Luis<br />Cruz<span style={{ color: 'var(--teal)' }}>.</span>
        </h1>

        <div style={{ marginTop: 28, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40 }}>
          <p
            ref={descRef}
            style={{
              fontSize: 13, color: 'var(--muted)', lineHeight: 1.8,
              maxWidth: 360, fontWeight: 400, opacity: 0,
            }}
          >
            Creo sitios web que <strong style={{ color: 'var(--white)', fontWeight: 600 }}>convierten visitas en clientes reales</strong>.
            Diseño estratégico + desarrollo técnico desde hace más de 10 años.
          </p>
          <div ref={ctaRef} style={{ opacity: 0, flexShrink: 0 }}>
            <PrimaryButton href="#portfolio">Ver proyectos</PrimaryButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 40, right: 40, zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      }}>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(180deg, transparent, var(--teal))' }} />
        <span style={{
          fontSize: 8, letterSpacing: 3, textTransform: 'uppercase',
          color: 'var(--muted)', writingMode: 'vertical-lr',
        }}>scroll</span>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Actualizar app/(site)/page.tsx**

```typescript
// app/(site)/page.tsx
import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <>
      <Hero />
    </>
  )
}
```

- [ ] **Step 4: Verificar hero**

```bash
npm run dev
```

Abrir http://localhost:3000. Verificar: título animado con Splitting.js, bloom teal visible, parallax en "DISEÑADOR" al hacer scroll, eyebrow pill aparece con fade-up.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Hero.tsx lib/animations/ app/'(site)'/page.tsx
git commit -m "feat: hero section with Splitting.js title animation and GSAP parallax"
```

---

## Task 9: Services section

**Files:**
- Create: `components/sections/Services.tsx`
- Create: `lib/animations/useScrollReveal.ts`

- [ ] **Step 1: Crear lib/animations/useScrollReveal.ts**

```typescript
// lib/animations/useScrollReveal.ts
import { useEffect, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useStaggerReveal(containerRef: RefObject<HTMLElement | null>, childSelector: string) {
  useEffect(() => {
    if (!containerRef.current) return

    const children = containerRef.current.querySelectorAll(childSelector)

    gsap.fromTo(
      children,
      { opacity: 0, y: 48 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    )
  }, [containerRef, childSelector])
}
```

- [ ] **Step 2: Crear components/sections/Services.tsx**

```typescript
// components/sections/Services.tsx
'use client'
import { useRef } from 'react'
import DoubleBezelCard from '@/components/ui/DoubleBezelCard'
import { useStaggerReveal } from '@/lib/animations/useScrollReveal'

const SERVICES = [
  { num: '01', name: 'Diseño & Desarrollo WordPress', desc: 'Sitios personalizados con Elementor & Divi. Velocidad, SEO y conversión desde el primer pixel.', tags: ['Elementor', 'Divi', 'PHP'] },
  { num: '02', name: 'E-Commerce WooCommerce', desc: 'Tiendas completas, integradas con pasarelas de pago, gestión de stock y optimizadas para vender.', tags: ['WooCommerce', 'Stripe'] },
  { num: '03', name: 'UI/UX Design en Figma', desc: 'Wireframes, prototipos y sistemas de diseño centrados en la experiencia del usuario real.', tags: ['Figma', 'Prototyping'] },
  { num: '04', name: 'SEO Técnico', desc: 'Optimización on-page, velocidad de carga, Core Web Vitals y estructura para posicionar mejor.', tags: ['Core Web Vitals', 'Schema'] },
  { num: '05', name: 'Hosting & Administración', desc: 'Gestión de servidores, cPanel, emails, backups y mantenimiento mensual sin preocupaciones.', tags: ['cPanel', 'VPS', 'DNS'] },
  { num: '06', name: 'Diseño Gráfico & Branding', desc: 'Identidad visual, banners, flyers, brochures y materiales de comunicación para tu marca.', tags: ['Photoshop', 'Illustrator'] },
]

const Z_OFFSETS: Record<number, number> = { 1: 24, 2: -12, 4: 16 }

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null)
  useStaggerReveal(gridRef, '.service-card')

  return (
    <section
      id="servicios"
      style={{ padding: '120px 40px 100px', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,194,168,0.3), transparent)' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
        <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(36px,5vw,68px)', letterSpacing: -2, lineHeight: 1 }}>
          Soluciones web<br />que <span style={{ color: 'var(--teal)' }}>funcionan.</span>
        </h2>
        <span style={{ fontFamily: 'var(--heading)', fontSize: 80, fontWeight: 800, color: 'rgba(0,194,168,0.08)', letterSpacing: -3, lineHeight: 1 }}>06</span>
      </div>

      <div
        ref={gridRef}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
      >
        {SERVICES.map((svc, i) => (
          <div
            key={svc.num}
            className="service-card"
            style={{ transform: `translateY(${Z_OFFSETS[i] ?? 0}px)`, opacity: 0 }}
          >
            <DoubleBezelCard innerClassName="service-inner" style={{ height: '100%' }}>
              <div style={{ padding: '28px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', letterSpacing: 3, marginBottom: 20, opacity: 0.6 }}>{svc.num}</p>
                <h3 style={{ fontFamily: 'var(--heading)', fontSize: 18, fontWeight: 700, color: 'var(--white)', marginBottom: 10, letterSpacing: -0.3, lineHeight: 1.2 }}>{svc.name}</h3>
                <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.8, flex: 1 }}>{svc.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
                  {svc.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 8, letterSpacing: 1, color: 'rgba(0,194,168,0.7)', background: 'rgba(0,194,168,0.06)', border: '1px solid rgba(0,194,168,0.12)', borderRadius: '100px', padding: '3px 10px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </DoubleBezelCard>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Añadir Services a la homepage**

```typescript
// app/(site)/page.tsx
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
    </>
  )
}
```

- [ ] **Step 4: Verificar stagger animation**

Abrir http://localhost:3000, hacer scroll hasta Services. Cada card debe aparecer desde abajo con delay escalonado. El Z-axis offset hace las cards visualmente asimétrica.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Services.tsx lib/animations/useScrollReveal.ts
git commit -m "feat: services section with Z-axis cascade and stagger scroll reveal"
```

---

## Task 10: Portfolio section (homepage preview)

**Files:**
- Create: `components/sections/Portfolio.tsx`
- Create: `components/project/ProjectCard.tsx`

- [ ] **Step 1: Crear components/project/ProjectCard.tsx**

```typescript
// components/project/ProjectCard.tsx
'use client'
import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { urlFor } from '@/lib/sanity/image'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  style?: React.CSSProperties
}

export default function ProjectCard({ project, style }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current!
    const arrow = arrowRef.current!

    let bounds: DOMRect

    const onEnter = () => {
      bounds = card.getBoundingClientRect()
      gsap.to(arrow, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' })
    }
    const onLeave = () => {
      gsap.to(arrow, { opacity: 0, scale: 0.8, duration: 0.3 })
      gsap.to(card, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' })
    }
    const onMove = (e: MouseEvent) => {
      const x = ((e.clientX - bounds.left) / bounds.width - 0.5) * 8
      const y = ((e.clientY - bounds.top) / bounds.height - 0.5) * 8
      gsap.to(card, { x, y, duration: 0.4, ease: 'power2.out' })
    }

    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mouseleave', onLeave)
    card.addEventListener('mousemove', onMove)
    return () => {
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mouseleave', onLeave)
      card.removeEventListener('mousemove', onMove)
    }
  }, [])

  const imageUrl = project.coverImage
    ? urlFor(project.coverImage).width(800).height(500).url()
    : null

  return (
    <Link href={`/proyectos/${project.slug.current}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 20,
          overflow: 'hidden',
          height: '100%',
          minHeight: 200,
          cursor: 'none',
          ...style,
        }}
      >
        {/* Background image o placeholder */}
        {imageUrl ? (
          <Image src={imageUrl} alt={project.title} fill style={{ objectFit: 'cover' }} />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(145deg, #0a2a20, #041510)',
            backgroundImage: 'linear-gradient(rgba(0,194,168,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,168,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        )}

        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 30%, rgba(4,12,10,0.97) 100%)',
          zIndex: 1,
        }} />

        {/* Info */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, zIndex: 2 }}>
          <p style={{ fontSize: 8, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 4 }}>
            {project.category?.join(' · ')}
          </p>
          <h3 style={{ fontFamily: 'var(--heading)', fontSize: 14, fontWeight: 700, color: 'var(--white)', letterSpacing: -0.2 }}>
            {project.title}
          </h3>
        </div>

        {/* Arrow badge */}
        <div
          ref={arrowRef}
          style={{
            position: 'absolute', top: 16, right: 16, zIndex: 3,
            width: 36, height: 36,
            background: 'rgba(0,194,168,0.1)', border: '1px solid rgba(0,194,168,0.2)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, color: 'var(--teal)',
            opacity: 0, transform: 'scale(0.8)',
          }}
        >↗</div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Crear components/sections/Portfolio.tsx**

```typescript
// components/sections/Portfolio.tsx
'use client'
import { useRef } from 'react'
import Link from 'next/link'
import ProjectCard from '@/components/project/ProjectCard'
import { useStaggerReveal } from '@/lib/animations/useScrollReveal'
import type { Project } from '@/types'

interface PortfolioProps {
  projects: Project[]
}

export default function Portfolio({ projects }: PortfolioProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  useStaggerReveal(gridRef, '.bento-item')

  // Mostrar solo 6 en homepage
  const preview = projects.slice(0, 6)
  const [feat, ...rest] = preview
  const smItems = rest.slice(0, 4)
  const wide = rest[4]

  return (
    <section id="portfolio" style={{ padding: '100px 40px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,194,168,0.3), transparent)' }} />

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}>
        <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(36px,5vw,68px)', letterSpacing: -2, lineHeight: 1 }}>
          Trabajo que<br /><span style={{ color: 'var(--teal)' }}>habla solo.</span>
        </h2>
        <Link href="/proyectos" style={{ fontSize: 11, color: 'var(--teal)', letterSpacing: 1, textDecoration: 'none', borderBottom: '1px solid rgba(0,194,168,0.3)', paddingBottom: 2, marginBottom: 8, whiteSpace: 'nowrap' }}>
          Ver todos los proyectos ({projects.length}) →
        </Link>
      </div>

      {/* Bento grid — 12 cols */}
      <div
        ref={gridRef}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 12 }}
      >
        {feat && (
          <div className="bento-item" style={{ gridColumn: 'span 8', opacity: 0 }}>
            <ProjectCard project={feat} style={{ minHeight: 340 }} />
          </div>
        )}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {smItems.slice(0, 2).map(p => (
            <div key={p._id} className="bento-item" style={{ flex: 1, opacity: 0 }}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
        {smItems.slice(2, 4).map(p => (
          <div key={p._id} className="bento-item" style={{ gridColumn: 'span 4', opacity: 0 }}>
            <ProjectCard project={p} />
          </div>
        ))}
        {wide && (
          <div className="bento-item" style={{ gridColumn: 'span 8', opacity: 0 }}>
            <ProjectCard project={wide} style={{ minHeight: 160 }} />
          </div>
        )}
      </div>

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Link href="/proyectos" style={{ fontSize: 11, color: 'var(--teal)', letterSpacing: 2, textDecoration: 'none', borderBottom: '1px solid rgba(0,194,168,0.3)', padding: '2px 0', textTransform: 'uppercase' }}>
          Ver todos los proyectos →
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Pasar projects a Portfolio desde la homepage**

```typescript
// app/(site)/page.tsx
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import { getProjects } from '@/lib/sanity/queries'

export default async function Home() {
  const projects = await getProjects()

  return (
    <>
      <Hero />
      <Services />
      <Portfolio projects={projects} />
    </>
  )
}
```

- [ ] **Step 4: Verificar bento grid y magnetic effect**

Agregar al menos 6 proyectos en Sanity Studio con cover images. Verificar: grid asimétrico visible, arrow badge aparece en hover, magnetic effect (card sigue levemente al cursor).

- [ ] **Step 5: Commit**

```bash
git add components/sections/Portfolio.tsx components/project/ProjectCard.tsx
git commit -m "feat: portfolio bento grid with magnetic hover and stagger reveal"
```

---

## Task 11: Process, About y Contact

**Files:**
- Create: `components/sections/Process.tsx`
- Create: `components/sections/About.tsx`
- Create: `components/sections/Contact.tsx`
- Create: `app/api/contact/route.ts`

- [ ] **Step 1: Crear components/sections/Process.tsx**

```typescript
// components/sections/Process.tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STEPS = [
  { num: '01', name: 'Briefing', desc: 'Entiendo tu negocio, objetivos reales y el cliente que quieres atraer.' },
  { num: '02', name: 'Diseño', desc: 'Wireframes y mockups en Figma para validar la visión antes de escribir código.' },
  { num: '03', name: 'Desarrollo', desc: 'Construcción con las tecnologías adecuadas al proyecto, con foco en velocidad y SEO.' },
  { num: '04', name: 'Entrega', desc: 'Deploy, testing en dispositivos reales, capacitación y soporte post-lanzamiento.' },
]

export default function Process() {
  const lineRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Línea conectora: dibujarse de izquierda a derecha
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: stepsRef.current, start: 'top 80%', once: true },
      }
    )
    // Steps: fade-up escalonado
    const steps = stepsRef.current?.querySelectorAll('.step-item')
    if (steps) {
      gsap.fromTo(
        steps,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 80%', once: true, delay: 0.3 },
        }
      )
    }
  }, [])

  return (
    <section id="proceso" style={{ padding: '100px 40px', background: 'rgba(0,194,168,0.02)', borderTop: '1px solid rgba(0,194,168,0.08)', borderBottom: '1px solid rgba(0,194,168,0.08)' }}>
      <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(36px,5vw,68px)', letterSpacing: -2, lineHeight: 1, marginBottom: 64 }}>
        Un proceso<br /><span style={{ color: 'var(--teal)' }}>sin sorpresas.</span>
      </h2>

      <div ref={stepsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, position: 'relative' }}>
        {/* Línea conectora */}
        <div ref={lineRef} style={{ position: 'absolute', top: 5, left: '12%', right: '12%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,194,168,0.4) 20%, rgba(0,194,168,0.4) 80%, transparent)' }} />

        {STEPS.map((step, i) => (
          <div key={step.num} className="step-item" style={{ padding: '0 24px', opacity: 0, position: 'relative' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--bg)', border: '2px solid var(--teal)', marginBottom: 24, position: 'relative', zIndex: 1 }}>
              <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: 'rgba(0,194,168,0.12)' }} />
            </div>
            <span style={{ position: 'absolute', top: -24, right: 16, fontFamily: 'var(--heading)', fontSize: 72, fontWeight: 800, color: 'rgba(0,194,168,0.06)', lineHeight: 1, pointerEvents: 'none' }}>{step.num}</span>
            <h3 style={{ fontFamily: 'var(--heading)', fontSize: 16, fontWeight: 700, color: 'var(--white)', marginBottom: 8 }}>{step.name}</h3>
            <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.8 }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Crear components/sections/About.tsx**

```typescript
// components/sections/About.tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DoubleBezelCard from '@/components/ui/DoubleBezelCard'

const SKILLS = ['WordPress', 'Elementor', 'Figma', 'HTML/CSS', 'JavaScript', 'WooCommerce', 'MySQL', 'cPanel', 'Photoshop']
const STATS = [{ num: 10, suffix: '+', label: 'Años exp.' }, { num: 50, suffix: '+', label: 'Proyectos' }, { num: 100, suffix: '%', label: 'Compromiso' }]

export default function About() {
  const statsRefs = useRef<(HTMLSpanElement | null)[]>([])
  const photoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Counter-up animation — gsap.to un objeto proxy, onUpdate lee el valor
    statsRefs.current.forEach((el, i) => {
      if (!el) return
      const proxy = { val: 0 }
      const suffix = STATS[i].suffix
      const target = STATS[i].num
      gsap.to(proxy, {
        val: target,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => { el.textContent = String(Math.round(proxy.val)) + suffix },
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      })
    })
    // Foto clip-path reveal
    gsap.fromTo(
      photoRef.current,
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: photoRef.current, start: 'top 80%', once: true },
      }
    )
  }, [])

  return (
    <section id="sobre-mi" style={{ padding: '100px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
      <div>
        <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(40px,6vw,80px)', lineHeight: 0.95, letterSpacing: -3, marginBottom: 24 }}>
          Luis<br />Cruz<span style={{ color: 'var(--teal)' }}>.</span>
        </h2>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 2, marginBottom: 32 }}>
          Diseñador y desarrollador web con más de 10 años creando sitios que generan resultados reales. Mi formación en diseño gráfico + competencias técnicas en HTML, CSS, JS y WordPress me permiten construir soluciones completas, bonitas y funcionales.
        </p>
        <div style={{ display: 'flex', gap: 32, marginBottom: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {STATS.map((stat, i) => (
            <div key={stat.label}>
              <div style={{ fontFamily: 'var(--heading)', fontSize: 40, fontWeight: 800, color: 'var(--teal)', letterSpacing: -2, lineHeight: 1 }}>
                <span ref={el => { statsRefs.current[i] = el }}>0</span>
              </div>
              <p style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}>{stat.label}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SKILLS.map(skill => (
            <span key={skill} style={{ fontSize: 9, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--teal)', background: 'rgba(0,194,168,0.06)', border: '1px solid rgba(0,194,168,0.15)', borderRadius: '100px', padding: '5px 12px' }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div ref={photoRef} style={{ position: 'relative' }}>
        <DoubleBezelCard>
          <div style={{ background: 'linear-gradient(145deg, #0c2a20, #062015)', borderRadius: 22, height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,194,168,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,168,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <span style={{ fontFamily: 'var(--heading)', fontSize: 80, fontWeight: 800, color: 'rgba(0,194,168,0.15)', letterSpacing: -4, position: 'relative', zIndex: 1 }}>LC</span>
            <p style={{ position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center', fontSize: 9, color: 'rgba(0,194,168,0.3)', letterSpacing: 2, textTransform: 'uppercase' }}>Foto aquí</p>
          </div>
        </DoubleBezelCard>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Crear app/api/contact/route.ts**

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(2, 'Nombre muy corto'),
  email: z.string().email('Email inválido'),
  projectType: z.string().min(1, 'Selecciona un tipo de proyecto'),
  message: z.string().min(20, 'Mensaje muy corto'),
  honeypot: z.string().max(0), // Debe estar vacío
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = contactSchema.parse(body)

    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'pittuk@gmail.com',
      subject: `Nuevo contacto: ${data.projectType} — ${data.name}`,
      html: `
        <h2>Nuevo mensaje desde el portafolio</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Tipo de proyecto:</strong> ${data.projectType}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${data.message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
```

- [ ] **Step 4: Crear components/sections/Contact.tsx**

```typescript
// components/sections/Contact.tsx
'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import DoubleBezelCard from '@/components/ui/DoubleBezelCard'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  projectType: z.string().min(1),
  message: z.string().min(20),
  honeypot: z.string().max(0),
})
type FormData = z.infer<typeof schema>

const PROJECT_TYPES = ['Sitio WordPress', 'E-Commerce', 'UI/UX Design', 'Diseño Gráfico', 'Otro']

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { honeypot: '' },
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (res.ok) { setStatus('success'); reset() }
    else setStatus('error')
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(4,12,10,0.6)', border: 'none', outline: 'none',
    fontFamily: 'var(--body)', fontSize: 12, color: 'var(--white)', width: '100%',
    padding: '12px 16px',
  }

  return (
    <section id="contacto" style={{ padding: '100px 40px 80px', position: 'relative', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ position: 'absolute', top: -1, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,194,168,0.4), transparent)' }} />

      <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(48px,9vw,120px)', lineHeight: 0.95, letterSpacing: -4, marginBottom: 48 }}>
        ¿Tienes<br />
        <span style={{ fontWeight: 400, color: 'var(--muted)' }}>un proyecto?</span><br />
        <span style={{ color: 'var(--teal)' }}>Hablemos.</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'start' }}>
        <div>
          {[['✉', 'pittuk@gmail.com'], ['📱', '+56 990 54 85 54'], ['📍', 'Talca, Chile']].map(([icon, text]) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>
              <span style={{ color: 'var(--teal)', fontSize: 14 }}>{icon}</span>{text}
            </div>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            {['LinkedIn', 'Behance', 'WhatsApp'].map(s => (
              <div key={s} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', padding: '8px 16px', fontSize: 9, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--muted)', cursor: 'pointer' }}>
                {s}
              </div>
            ))}
          </div>
        </div>

        <DoubleBezelCard>
          <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Honeypot — oculto */}
            <input type="text" {...register('honeypot')} style={{ display: 'none' }} tabIndex={-1} />

            {[
              { field: 'name' as const, placeholder: 'Tu nombre' },
              { field: 'email' as const, placeholder: 'Tu email' },
            ].map(({ field, placeholder }) => (
              <div key={field} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${errors[field] ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 12, padding: 2 }}>
                <div style={{ background: 'rgba(4,12,10,0.6)', borderRadius: 11 }}>
                  <input placeholder={placeholder} {...register(field)} style={inputStyle} />
                </div>
              </div>
            ))}

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 2 }}>
              <div style={{ background: 'rgba(4,12,10,0.6)', borderRadius: 11 }}>
                <select {...register('projectType')} style={{ ...inputStyle, appearance: 'none' }}>
                  <option value="">Tipo de proyecto</option>
                  {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 2 }}>
              <div style={{ background: 'rgba(4,12,10,0.6)', borderRadius: 11 }}>
                <textarea placeholder="Cuéntame sobre tu proyecto..." {...register('message')} rows={4} style={{ ...inputStyle, resize: 'none' }} />
              </div>
            </div>

            <div style={{ background: 'rgba(0,194,168,0.1)', border: '1px solid rgba(0,194,168,0.2)', borderRadius: '100px', padding: 4 }}>
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{ background: 'var(--teal)', color: 'var(--bg)', borderRadius: '100px', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
              >
                {status === 'loading' ? 'Enviando...' : status === 'success' ? '¡Mensaje enviado!' : 'Enviar mensaje'}
                <span style={{ width: 28, height: 28, background: 'rgba(4,12,10,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>↗</span>
              </button>
            </div>

            {status === 'error' && (
              <p style={{ fontSize: 11, color: 'rgba(255,80,80,0.8)', textAlign: 'center' }}>Error al enviar. Intenta de nuevo.</p>
            )}
          </form>
        </DoubleBezelCard>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Completar app/(site)/page.tsx**

```typescript
// app/(site)/page.tsx
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import Process from '@/components/sections/Process'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import { getProjects } from '@/lib/sanity/queries'

export default async function Home() {
  const projects = await getProjects()
  return (
    <>
      <Hero />
      <Services />
      <Portfolio projects={projects} />
      <Process />
      <About />
      <Contact />
    </>
  )
}
```

- [ ] **Step 6: Verificar homepage completo**

```bash
npm run dev
```

Verificar en http://localhost:3000:
- Todas las 6 secciones renderizan correctamente
- Animaciones de scroll funcionan en cada sección
- Counter-up en About activa al hacer scroll
- Formulario de contacto valida en cliente (sin enviar aún — Resend necesita API key)
- Custom cursor visible y se escala sobre botones/links

- [ ] **Step 7: Commit**

```bash
git add components/sections/ app/api/
git commit -m "feat: complete homepage - all 6 sections with GSAP animations and contact form"
```

---

## Task 12: Dockerfile y verificación final

**Files:**
- Create: `Dockerfile`
- Create: `.dockerignore`

- [ ] **Step 1: Crear Dockerfile**

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables de entorno necesarias para el build
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID
ENV NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

- [ ] **Step 2: Activar output standalone en next.config.ts**

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
}

export default nextConfig
```

- [ ] **Step 3: Crear .dockerignore**

```
node_modules
.next
.env.local
.env*.local
npm-debug.log*
.git
```

- [ ] **Step 4: Build Docker localmente para verificar**

```bash
docker build \
  --build-arg NEXT_PUBLIC_SANITY_PROJECT_ID=$(grep NEXT_PUBLIC_SANITY_PROJECT_ID .env.local | cut -d= -f2) \
  --build-arg NEXT_PUBLIC_SANITY_DATASET=production \
  -t luis-cruz-portfolio .
```

Esperado: build exitoso sin errores. Si falla por SANITY_PROJECT_ID vacío, asegurarse de haber completado Task 4 Step 1.

- [ ] **Step 5: Verificar container corre correctamente**

```bash
docker run -p 3000:3000 \
  -e SANITY_API_TOKEN=tu_token \
  -e RESEND_API_KEY=tu_key \
  -e NEXT_PUBLIC_GA_ID=G-TU_ID \
  luis-cruz-portfolio
```

Abrir http://localhost:3000. El sitio debe verse idéntico a `npm run dev`.

- [ ] **Step 6: Commit final**

```bash
git add Dockerfile .dockerignore next.config.ts
git commit -m "feat: Dockerfile multi-stage build for EasyPanel deployment"
```

---

## Resumen de entregables

Al completar este plan tendrás:

1. **Homepage completo** con 6 secciones, todas las animaciones GSAP (parallax, stagger reveal, counter-up, clip-path, Splitting.js)
2. **Custom cursor** personalizado con dot + ring y efecto de escala en links
3. **Nav floating pill** que se oculta al scroll hacia abajo
4. **Sanity CMS** con Studio en `/studio` — puedes agregar proyectos inmediatamente
5. **Formulario de contacto** con validación Zod y envío via Resend
6. **Dockerfile** listo para EasyPanel
7. **12 proyectos** mostrando correctamente en el bento grid del homepage

**Siguiente plan:** Páginas de detalle de proyecto (`/proyectos/[slug]`), listing con filtros, SEO completo (Metadata API, sitemap, JSON-LD, OG images), y configuración final de EasyPanel.
