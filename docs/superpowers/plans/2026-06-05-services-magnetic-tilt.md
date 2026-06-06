# Services — Magnetic Tilt Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar las tarjetas estáticas de servicios con `ServiceCard` — un componente interactivo con tilt 3D magnético, gradient light siguiendo el cursor, número con glow, y borde teal animado.

**Architecture:** Nuevo componente `ServiceCard` encapsula toda la lógica de hover (tilt GSAP + CSS custom properties para gradient). `Services.tsx` usa `ServiceCard` y reemplaza `useStaggerReveal` con una animación de entrada en dos oleadas con `rotateX`. Sin librerías nuevas.

**Tech Stack:** Next.js 16, React 19, GSAP 3.15, TypeScript, inline styles

---

## File Map

| Archivo | Cambio |
|---------|--------|
| `components/ui/ServiceCard.tsx` | **Crear** — componente interactivo completo |
| `components/sections/Services.tsx` | **Modificar** — usar ServiceCard, nueva entrada por oleadas |

---

## Task 1: Crear `components/ui/ServiceCard.tsx`

**Files:**
- Create: `components/ui/ServiceCard.tsx`

- [ ] **Step 1: Crear el archivo con el componente completo**

Crear `components/ui/ServiceCard.tsx` con el siguiente contenido exacto:

```tsx
'use client'
import { useRef } from 'react'
import gsap from 'gsap'

interface ServiceCardProps {
  num: string
  name: string
  desc: string
  tags: string[]
  style?: React.CSSProperties
}

export default function ServiceCard({ num, name, desc, tags, style }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLParagraphElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)

    gsap.to(card, {
      rotateY: nx * 10,
      rotateX: -ny * 10,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    const gradient = gradientRef.current
    if (gradient) {
      gradient.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
      gradient.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
    }
  }

  function handleMouseEnter() {
    gsap.to(gradientRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(borderRef.current, { borderColor: 'rgba(0,194,168,0.30)', duration: 0.3 })
    gsap.to(numRef.current, {
      scale: 1.3,
      opacity: 1,
      textShadow: '0 0 12px rgba(0,194,168,0.5)',
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  function handleMouseLeave() {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: 'auto',
    })
    gsap.to(gradientRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' })
    gsap.to(borderRef.current, { borderColor: 'rgba(255,255,255,0.06)', duration: 0.4 })
    gsap.to(numRef.current, {
      scale: 1,
      opacity: 0.6,
      textShadow: '0 0 0px rgba(0,194,168,0)',
      duration: 0.4,
      ease: 'power3.out',
    })
  }

  return (
    /* Perspective wrapper — cada card tiene su propio contexto 3D */
    <div style={{ perspective: '800px', height: '100%', ...style }}>
      {/* Tilt target */}
      <div
        ref={cardRef}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform', height: '100%' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Bezel externo — border animable */}
        <div
          ref={borderRef}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '24px',
            padding: '3px',
            height: '100%',
          }}
        >
          {/* Inner bezel */}
          <div
            style={{
              background: 'var(--card-surface)',
              borderRadius: '22px',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Gradient light overlay */}
            <div
              ref={gradientRef}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '22px',
                opacity: 0,
                pointerEvents: 'none',
                background: 'radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), rgba(0,194,168,0.10) 0%, transparent 70%)',
                zIndex: 0,
              } as React.CSSProperties}
            />
            {/* Contenido */}
            <div
              style={{
                padding: '28px 24px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <p
                ref={numRef}
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'var(--teal)',
                  letterSpacing: 3,
                  marginBottom: 20,
                  opacity: 0.6,
                  transformOrigin: 'left center',
                }}
              >
                {num}
              </p>
              <h3
                style={{
                  fontFamily: 'var(--heading)',
                  fontSize: 18,
                  fontWeight: 700,
                  color: 'var(--white)',
                  marginBottom: 10,
                  letterSpacing: -0.3,
                  lineHeight: 1.2,
                }}
              >
                {name}
              </h3>
              <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.8, flex: 1 }}>
                {desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
                {tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 8,
                      letterSpacing: 1,
                      color: 'rgba(0,194,168,0.7)',
                      background: 'rgba(0,194,168,0.06)',
                      border: '1px solid rgba(0,194,168,0.12)',
                      borderRadius: '100px',
                      padding: '3px 10px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verificar TypeScript**

```powershell
npx tsc --noEmit
```

Esperado: cero errores. Si hay error en `} as React.CSSProperties` del gradientRef, verificar que el import de React está presente (Next.js no lo requiere explícito pero el cast sí).

- [ ] **Step 3: Commit**

```powershell
git add components/ui/ServiceCard.tsx
git commit -m "feat: add ServiceCard with magnetic tilt, gradient light, and border animation"
```

---

## Task 2: Actualizar `components/sections/Services.tsx`

**Files:**
- Modify: `components/sections/Services.tsx`

- [ ] **Step 1: Reemplazar el archivo completo**

Reemplazar `components/sections/Services.tsx` con:

```tsx
'use client'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ServiceCard from '@/components/ui/ServiceCard'

const SERVICES = [
  { num: '01', name: 'Diseño & Desarrollo Web', desc: 'Sitios personalizados con las mejores tecnologías. Velocidad, SEO y conversión desde el primer pixel.', tags: ['WordPress', 'Elementor', 'React', 'PHP'] },
  { num: '02', name: 'E-Commerce WooCommerce', desc: 'Tiendas completas, integradas con pasarelas de pago, gestión de stock y optimizadas para vender.', tags: ['WooCommerce', 'Stripe'] },
  { num: '03', name: 'UI/UX Design', desc: 'Wireframes, prototipos interactivos y sistemas de diseño centrados en la experiencia del usuario real.', tags: ['Prototyping', 'User Research'] },
  { num: '04', name: 'SEO Técnico', desc: 'Optimización on-page, velocidad de carga, Core Web Vitals y estructura para posicionar mejor.', tags: ['Core Web Vitals', 'Schema'] },
  { num: '05', name: 'Hosting & Administración', desc: 'Gestión de servidores, cPanel, emails, backups y mantenimiento mensual sin preocupaciones.', tags: ['cPanel', 'VPS', 'DNS'] },
  { num: '06', name: 'Diseño Gráfico & Branding', desc: 'Identidad visual, banners, flyers, brochures y materiales de comunicación para tu marca.', tags: ['Photoshop', 'Illustrator'] },
]

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!gridRef.current) return

    const cards = Array.from(gridRef.current.querySelectorAll<HTMLElement>('.service-card'))
    const wave1 = cards.slice(0, 3)
    const wave2 = cards.slice(3, 6)
    const from = { rotateX: 8, y: 60, opacity: 0 }
    const to = {
      rotateX: 0, y: 0, opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 75%',
        once: true,
      },
    }

    const anim1 = gsap.fromTo(wave1, from, to)
    const anim2 = gsap.fromTo(wave2, from, { ...to, delay: 0.12 })

    return () => {
      anim1.scrollTrigger?.kill()
      anim1.kill()
      anim2.scrollTrigger?.kill()
      anim2.kill()
    }
  }, [])

  return (
    <section
      id="servicios"
      style={{ padding: '120px 40px 100px', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,194,168,0.3), transparent)',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
        <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(36px,5vw,68px)', letterSpacing: -2, lineHeight: 1 }}>
          Soluciones web<br />que <span style={{ color: 'var(--teal)' }}>funcionan.</span>
        </h2>
        <span style={{ fontFamily: 'var(--heading)', fontSize: 80, fontWeight: 800, color: 'rgba(0,194,168,0.08)', letterSpacing: -3, lineHeight: 1 }}>06</span>
      </div>

      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          perspective: '1200px',
        }}
      >
        {SERVICES.map(svc => (
          <div
            key={svc.num}
            className="service-card"
            style={{ opacity: 0 }}
          >
            <ServiceCard
              num={svc.num}
              name={svc.name}
              desc={svc.desc}
              tags={svc.tags}
              style={{ height: '100%' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verificar TypeScript**

```powershell
npx tsc --noEmit
```

Esperado: cero errores.

- [ ] **Step 3: Commit**

```powershell
git add components/sections/Services.tsx
git commit -m "feat: services section — wave entrance animation and ServiceCard integration"
```

---

## Task 3: Verificación visual

- [ ] **Step 1: Iniciar dev server**

```powershell
npm run dev
```

- [ ] **Step 2: Abrir en el navegador**

Navegar a `http://localhost:3000` y hacer scroll hasta la sección "Soluciones web que funcionan."

Verificar la **entrada**:
1. Las cards 1–3 suben con rotación 3D y se asientan
2. Las cards 4–6 llegan 120ms después
3. No hay cards visibles antes del scroll trigger

Verificar el **hover** en cada card:
1. La card se inclina siguiendo el cursor (máximo ~10deg)
2. Una luz teal difusa aparece donde está el cursor
3. El número (`01`, `02`…) escala y brilla
4. El borde de la card se tiñe de teal
5. Al sacar el cursor todo vuelve suavemente

- [ ] **Step 3: Verificar en mobile (DevTools)**

Abrir DevTools → toggle device (iPhone 14, 390px). El grid baja a 1 columna si Tailwind/CSS lo maneja. Si no hay responsive, notar para ajuste posterior (fuera del scope de este plan).

- [ ] **Step 4: Verificar que no hay console errors**

Abrir DevTools → Console. No debe haber errores de React o GSAP.

---

## Notas de implementación

- `overwrite: 'auto'` en el tilt de `handleMouseMove` evita que se acumulen tweens al mover el mouse rápido — crítico para suavidad
- Las CSS custom properties `--mx` / `--my` se actualizan directamente en el DOM (sin re-render de React) para máxima performance del gradient light
- El `perspective: '800px'` en el wrapper de cada `ServiceCard` y el `perspective: '1200px'` en el grid son independientes — el del grid aplica para la entrada, el del wrapper para el hover
- `transformStyle: 'preserve-3d'` en `cardRef` es necesario para que los hijos puedan participar del espacio 3D del tilt
- La animación de entrada usa `rotateX` sobre el `.service-card` wrapper (no sobre `cardRef`), evitando conflicto con el tilt de hover que actúa sobre `cardRef`
