# Services Section — Magnetic Tilt Cards

**Date:** 2026-06-05
**Branch:** feature/nuevos-ajustes
**Status:** Approved

## Objetivo

Transformar las 6 tarjetas de servicios de un grid estático con fade-up básico a tarjetas interactivas con tilt 3D magnético + gradient light. Representa el nivel de craft del trabajo de Luis Cruz.

---

## Layout

Grid 3×2 mantenido. Z-offsets existentes se conservan. Padding y tipografía sin cambios.

---

## Animación de Entrada (scroll)

Dos oleadas de 3 cards con perspectiva tridimensional:

- **Oleada 1** (cards 0–2): `rotateX: 8deg, y: 60px, opacity: 0` → `rotateX: 0, y: 0, opacity: 1`
  - duration: 0.8s, stagger: 0.1s, ease: `power3.out`
- **Oleada 2** (cards 3–5): misma animación, delay: +120ms respecto a oleada 1
- ScrollTrigger: `start: 'top 75%'`, `once: true`
- Requiere `perspective: 1200px` en el contenedor del grid

---

## Hover Interactivo — 4 efectos simultáneos

Todos controlados via `onMouseMove` en el componente `ServiceCard`.

### 1. Tilt 3D
- Calcular posición relativa del cursor dentro de la card: `(mouseX - cardCenterX) / (cardWidth / 2)`
- Aplicar: `rotateY: normalizedX * 10deg`, `rotateX: -normalizedY * 10deg`
- `gsap.to(cardEl, { rotateX, rotateY, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })`
- Al salir (`onMouseLeave`): `gsap.to(cardEl, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' })`

### 2. Gradient Light (linterna sobre vidrio)
- Implementado via CSS custom properties en el elemento: `--mx` y `--my` (porcentaje)
- `background: radial-gradient(200px circle at var(--mx) var(--my), rgba(0,194,168,0.10) 0%, transparent 70%)`
- Actualizar `--mx` y `--my` en cada `onMouseMove` via `el.style.setProperty`
- Al salir: fade opacity del gradient a 0

### 3. Número protagonista
- Al hover: `gsap.to(numEl, { scale: 1.3, opacity: 1, color: 'rgba(0,194,168,1)', textShadow: '0 0 12px rgba(0,194,168,0.5)', duration: 0.3 })`
- Al salir: `gsap.to(numEl, { scale: 1, opacity: 0.6, color: 'var(--teal)', textShadow: 'none', duration: 0.4 })`

### 4. Borde teal
- Controlado con state o CSS variable en el wrapper
- Al hover: `gsap.to(borderEl, { borderColor: 'rgba(0,194,168,0.3)', duration: 0.3 })`
- Al salir: `gsap.to(borderEl, { borderColor: 'rgba(255,255,255,0.06)', duration: 0.4 })`
- El `borderEl` es el wrapper externo del `DoubleBezelCard`

---

## Arquitectura de Componentes

### `components/ui/ServiceCard.tsx` (nuevo)

Props:
```typescript
interface ServiceCardProps {
  num: string
  name: string
  desc: string
  tags: string[]
  style?: React.CSSProperties
}
```

**ServiceCard NO usa `DoubleBezelCard` — reimplementa los estilos del bezel inline** para tener control total sobre el border animation. Estructura de capas:

```
<div ref={cardRef}  // tilt target — transform-style: preserve-3d, will-change: transform
  <div ref={borderRef}  // bezel externo — border animable
    <div  // inner bezel — background card-surface, borderRadius 22px
      <div ref={gradientRef}  // gradient light overlay — position: absolute, inset: 0, opacity: 0
      <div  // contenido: num, name, desc, tags
        <p ref={numRef}  // número animable
```

Responsabilidades:
- Maneja los 4 eventos hover internamente (`onMouseMove`, `onMouseLeave`, `onMouseEnter`)
- `cardRef`: target del tilt 3D (rotateX/Y)
- `borderRef`: target de la animación de borde teal
- `gradientRef`: overlay con el gradient light (opacity 0 → 1 en enter, 0 en leave; position vía CSS vars `--mx` / `--my`)
- `numRef`: target del scale + glow del número
- El `gradientRef` inicia con `opacity: 0`; en `onMouseEnter` sube a `opacity: 1`, en `onMouseLeave` baja a `opacity: 0`

### `components/sections/Services.tsx` (modificado)

- Reemplaza el bloque `<div className="service-card">` + `<DoubleBezelCard>` con `<ServiceCard>`
- Actualiza la animación de entrada: oleadas con `rotateX` en lugar del simple `y: 48`
- Agrega `perspective: 1200px` al contenedor grid
- Elimina `DoubleBezelCard` del import (ahora lo maneja `ServiceCard` internamente)

---

## Criterios de éxito

- Tilt responde suavemente al cursor, máximo ±10deg
- El gradient light se mueve sin lag visible
- Número escala y brilla sin saltos
- Al salir, todo retorna fluidamente (sin snap)
- Sin imports de librerías nuevas
- TypeScript sin errores
