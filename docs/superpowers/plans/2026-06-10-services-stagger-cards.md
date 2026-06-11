# Services Stagger Cards Carousel — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static 3×2 grid of service cards in the "Soluciones web que funcionan" section with an interactive stacked/staggered carousel (adapted from the 21st.dev "Stagger Testimonials" component), styled with the project's existing design tokens.

**Architecture:** New client component `components/ui/ServiceStaggerCards.tsx` renders the carousel (ticket-shaped cards, click/arrow navigation, position-based transforms). `components/sections/Services.tsx` keeps its header but replaces the grid + GSAP wave animation with `<ServiceStaggerCards />` plus a single fade+slide-up entrance animation. `components/ui/ServiceCard.tsx` is removed (becomes unused).

**Tech Stack:** Next.js 16 / React 19 / TypeScript, GSAP + ScrollTrigger (entrance animation only), `lucide-react` (already installed, no new deps), CSS custom properties from `styles/tokens.css`, plain inline styles (no Tailwind utility classes / no `cn`).

There is no test runner in this project (no jest/vitest config). Verification is via `npm run lint`, a production-relevant TypeScript check (`npx tsc --noEmit`), and manual visual check with `npm run dev`.

---

### Task 1: Add CSS for card border states and nav buttons

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Append the new CSS rules**

Add this block to the end of `d:\Documentos\Pittuk\web\Nueva propuesta\app\globals.css`:

```css

/* Services — Stagger Cards Carousel */
.service-stagger-card {
  border: 1px solid var(--hairline);
  transition: border-color 0.3s ease;
}

.service-stagger-card:hover {
  border-color: rgba(0, 194, 168, 0.3);
}

.service-stagger-card.is-active {
  border-color: var(--teal);
}

.service-stagger-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: transparent;
  border: 1px solid var(--hairline);
  border-radius: 12px;
  color: var(--white);
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.service-stagger-nav:hover {
  background: var(--teal);
  border-color: var(--teal);
  color: var(--bg);
}

.service-stagger-nav:focus-visible {
  outline: 2px solid var(--teal);
  outline-offset: 2px;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "style: add CSS for services stagger cards carousel"
```

---

### Task 2: Create the ServiceStaggerCards component

**Files:**
- Create: `components/ui/ServiceStaggerCards.tsx`

- [ ] **Step 1: Write the component**

Create `d:\Documentos\Pittuk\web\Nueva propuesta\components\ui\ServiceStaggerCards.tsx`:

```tsx
'use client'

import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  ShoppingCart,
  Palette,
  Search,
  Server,
  Brush,
  type LucideIcon,
} from 'lucide-react'
import { useMediaQuery } from '@/lib/useMediaQuery'

const SQRT_5000 = Math.sqrt(5000)

const ICONS: LucideIcon[] = [Code2, ShoppingCart, Palette, Search, Server, Brush]

export interface Service {
  num: string
  name: string
  desc: string
  tags: string[]
}

interface ServiceItem extends Service {
  tempId: number
  iconIndex: number
}

interface ServiceStaggerCardProps {
  position: number
  service: ServiceItem
  handleMove: (steps: number) => void
  cardSize: number
}

function ServiceStaggerCard({ position, service, handleMove, cardSize }: ServiceStaggerCardProps) {
  const isCenter = position === 0
  const Icon = ICONS[service.iconIndex]

  return (
    <div
      onClick={() => handleMove(position)}
      className={`service-stagger-card${isCenter ? ' is-active' : ''}`}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        cursor: 'pointer',
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.5s ease-in-out',
        zIndex: isCenter ? 10 : 1,
        background: isCenter ? 'var(--teal)' : 'var(--card-surface)',
        color: isCenter ? 'var(--bg)' : 'var(--white)',
        width: cardSize,
        height: cardSize,
        clipPath:
          'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)',
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? '0px 8px 0px 4px rgba(0,194,168,0.15)' : 'none',
      }}
    >
      <span
        style={{
          position: 'absolute',
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
          background: isCenter ? 'rgba(4,12,10,0.2)' : 'var(--hairline)',
          transform: 'rotate(45deg)',
          transformOrigin: 'top right',
          pointerEvents: 'none',
        }}
      />

      <Icon size={28} color={isCenter ? 'var(--bg)' : 'var(--orange)'} style={{ marginBottom: 16 }} />

      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 3,
          color: isCenter ? 'var(--bg)' : 'var(--orange)',
          opacity: isCenter ? 0.7 : 0.6,
          marginBottom: 16,
        }}
      >
        {service.num}
      </p>

      <h3
        style={{
          fontFamily: 'var(--heading)',
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: -0.3,
          lineHeight: 1.2,
          marginBottom: 12,
          color: isCenter ? 'var(--bg)' : 'var(--white)',
        }}
      >
        {service.name}
      </h3>

      <p
        style={{
          fontSize: 13,
          lineHeight: 1.7,
          flex: 1,
          color: isCenter ? 'rgba(4,12,10,0.75)' : 'var(--muted)',
        }}
      >
        {service.desc}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
        {service.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 8,
              letterSpacing: 1,
              borderRadius: '100px',
              padding: '3px 10px',
              color: isCenter ? 'var(--bg)' : 'rgba(0,194,168,0.7)',
              background: isCenter ? 'rgba(4,12,10,0.1)' : 'rgba(0,194,168,0.06)',
              border: `1px solid ${isCenter ? 'rgba(4,12,10,0.15)' : 'rgba(0,194,168,0.12)'}`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ServiceStaggerCards({ services }: { services: Service[] }) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const cardSize = isMobile ? 300 : 340
  const containerHeight = isMobile ? 560 : 640

  const [items, setItems] = useState<ServiceItem[]>(() =>
    services.map((service, index) => ({ ...service, tempId: index, iconIndex: index }))
  )

  const handleMove = (steps: number) => {
    const newItems = [...items]
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newItems.shift()
        if (!item) return
        newItems.push({ ...item, tempId: Math.random() })
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newItems.pop()
        if (!item) return
        newItems.unshift({ ...item, tempId: Math.random() })
      }
    }
    setItems(newItems)
  }

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', height: containerHeight }}>
      {items.map((service, index) => {
        const position = items.length % 2
          ? index - (items.length + 1) / 2
          : index - items.length / 2
        return (
          <ServiceStaggerCard
            key={service.tempId}
            service={service}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        )
      })}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
          zIndex: 20,
        }}
      >
        <button onClick={() => handleMove(-1)} className="service-stagger-nav" aria-label="Servicio anterior">
          <ChevronLeft size={24} />
        </button>
        <button onClick={() => handleMove(1)} className="service-stagger-nav" aria-label="Siguiente servicio">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors referencing `ServiceStaggerCards.tsx`

- [ ] **Step 3: Commit**

```bash
git add components/ui/ServiceStaggerCards.tsx
git commit -m "feat: add ServiceStaggerCards carousel component"
```

---

### Task 3: Wire ServiceStaggerCards into the Services section

**Files:**
- Modify: `components/sections/Services.tsx`

- [ ] **Step 1: Replace the file contents**

Replace the entire contents of `d:\Documentos\Pittuk\web\Nueva propuesta\components\sections\Services.tsx` with:

```tsx
'use client'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ServiceStaggerCards from '@/components/ui/ServiceStaggerCards'
import { useMediaQuery } from '@/lib/useMediaQuery'

const SERVICES = [
  { num: '01', name: 'Diseño & Desarrollo Web', desc: 'Sitios personalizados con las mejores tecnologías. Velocidad, SEO y conversión desde el primer pixel.', tags: ['WordPress', 'Elementor', 'React', 'PHP'] },
  { num: '02', name: 'E-Commerce WooCommerce', desc: 'Tiendas completas, integradas con pasarelas de pago, gestión de stock y optimizadas para vender.', tags: ['WooCommerce', 'Stripe'] },
  { num: '03', name: 'UI/UX Design', desc: 'Wireframes, prototipos interactivos y sistemas de diseño centrados en la experiencia del usuario real.', tags: ['Prototyping', 'User Research'] },
  { num: '04', name: 'SEO Técnico', desc: 'Optimización on-page, velocidad de carga, Core Web Vitals y estructura para posicionar mejor.', tags: ['Core Web Vitals', 'Schema'] },
  { num: '05', name: 'Hosting & Administración', desc: 'Gestión de servidores, cPanel, emails, backups y mantenimiento mensual sin preocupaciones.', tags: ['cPanel', 'VPS', 'DNS'] },
  { num: '06', name: 'Diseño Gráfico & Branding', desc: 'Identidad visual, banners, flyers, brochures y materiales de comunicación para tu marca.', tags: ['Photoshop', 'Illustrator'] },
]

export default function Services() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!carouselRef.current) return

    const anim = gsap.fromTo(
      carouselRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    )

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])

  return (
    <section
      id="servicios"
      className="section-padding"
      style={{ padding: isMobile ? '80px 20px 60px' : '120px 40px 100px', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,194,168,0.3), transparent)',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: isMobile ? 40 : 64 }}>
        <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(36px,5vw,68px)', letterSpacing: -2, lineHeight: 1 }}>
          Soluciones web<br />que <span style={{ color: 'var(--teal)' }}>funcionan</span><span style={{ color: 'var(--orange)' }}>.</span>
        </h2>
        {!isMobile && <span style={{ fontFamily: 'var(--heading)', fontSize: 80, fontWeight: 800, color: 'rgba(0,194,168,0.08)', letterSpacing: -3, lineHeight: 1 }}>06</span>}
      </div>

      <div ref={carouselRef}>
        <ServiceStaggerCards services={SERVICES} />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors referencing `Services.tsx`

- [ ] **Step 3: Commit**

```bash
git add components/sections/Services.tsx
git commit -m "feat: replace services grid with stagger cards carousel"
```

---

### Task 4: Remove the now-unused ServiceCard component

**Files:**
- Delete: `components/ui/ServiceCard.tsx`

- [ ] **Step 1: Confirm no remaining references**

Run: `grep -rn "ServiceCard" --include="*.tsx" --include="*.ts" .`
Expected: no matches outside `docs/` (the magnetic-tilt plan/spec docs are historical and not modified)

- [ ] **Step 2: Delete the file**

```bash
git rm components/ui/ServiceCard.tsx
```

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove unused ServiceCard component"
```

---

### Task 5: Visual verification

**Files:** none (manual check)

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: no new errors/warnings introduced by the changed files

- [ ] **Step 2: Run dev server and check the section**

Run: `npm run dev`
Open `http://localhost:3000` and scroll to `#servicios`. Verify:
- Header ("Soluciones web que funcionan" + "06") still renders as before
- Carousel shows ticket-shaped cards, center card has solid teal background with dark text
- Each card shows an icon, number label, title, description and tags
- Clicking a side card brings it to center; prev/next buttons cycle through all 6 services
- Resize to a mobile width (<768px) — cards shrink to the mobile size and layout doesn't overflow horizontally

- [ ] **Step 3: Stop the dev server**

No commit needed for this task (verification only).
