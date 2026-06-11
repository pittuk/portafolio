# Services Section — Stagger Cards Carousel

**Date:** 2026-06-10
**Branch:** cambios-1
**Status:** Approved

## Objetivo

Reemplazar el grid 3×2 de tarjetas de servicios ("Soluciones web que funcionan") por un carrusel interactivo de tarjetas apiladas/rotadas, adaptado del componente "Stagger Testimonials" de 21st.dev al sistema de diseño existente del sitio (variables CSS, sin Tailwind/shadcn tokens).

## Alcance

- Se reemplaza el contenido de la sección `#servicios` (grid + `ServiceCard`), manteniendo el header existente (título "Soluciones web que funcionan" + contador decorativo "06" + línea gradiente superior).
- `ServiceCard.tsx` queda sin referencias tras el cambio y se elimina.
- No se agregan dependencias nuevas (`lucide-react` ya está instalado en `package.json`).
- No se introduce `cn`/clsx ni tokens shadcn (`bg-primary`, `border-border`, etc.) — el componente nuevo usa estilos inline + variables CSS existentes (`--teal`, `--orange`, `--card-surface`, `--hairline`, `--white`, `--muted`, `--bg`), igual que `ServiceCard.tsx` actual.

## Arquitectura de componentes

### `components/ui/ServiceStaggerCards.tsx` (nuevo, client component)

Adaptación de `stagger-testimonials.tsx`:

- Recibe `services: { num: string; name: string; desc: string; tags: string[] }[]` como prop (la data `SERVICES` se mantiene definida en `Services.tsx` y se pasa como prop, sin duplicarla).
- Mapea cada servicio a un ícono Lucide fijo por posición (índice 0–5):
  - 0 → `Code2` (Diseño & Desarrollo Web)
  - 1 → `ShoppingCart` (E-commerce WooCommerce)
  - 2 → `Palette` (UI/UX Design)
  - 3 → `Search` (SEO Técnico)
  - 4 → `Server` (Hosting & Administración)
  - 5 → `Brush` (Diseño Gráfico & Branding)
- Mantiene la lógica de `handleMove(steps)` del original: rotación del array de servicios mediante `shift`/`unshift`/`push`, regenerando `tempId` para forzar re-render/animación.
- Mantiene el cálculo de `position` por tarjeta y las transformaciones (`translateX`, `translateY`, `rotate`, `transition-all duration-500`) del original, ajustando offsets al nuevo `cardSize`.
- Click en una tarjeta no-central llama `handleMove(position)` para centrarla (igual que el original).
- Tamaño de tarjeta (`cardSize`): **340px desktop / 300px mobile**, determinado con el hook existente `useMediaQuery('(max-width: 768px)')` (no se usa el listener de `resize` del componente original).
- Altura del contenedor: ajustada para acomodar el `cardSize` mayor + offsets (~640px desktop / ~560px mobile, a verificar visualmente durante implementación).

### Forma y estilo de tarjeta

- **Forma:** "ticket" con esquinas cortadas en diagonal vía `clip-path: polygon(...)`, igual que el original (50px de corte en las 4 esquinas, escalado si el `cardSize` cambia).
- **Tarjeta default (no activa):**
  - Fondo: `var(--card-surface)`
  - Borde: `1px solid var(--hairline)`, hover → `rgba(0,194,168,0.30)` (mismo tratamiento que `ServiceCard`)
  - Texto título/desc: `var(--white)` / `var(--muted)`
- **Tarjeta activa (centro, `position === 0`):**
  - Fondo sólido: `var(--teal)`
  - Texto: `var(--bg)` (oscuro, para contraste sobre el teal)
- **Línea diagonal decorativa** (`SQRT_5000`) del original se mantiene, con color `var(--hairline)` / equivalente sobre fondo teal.

### Contenido de cada tarjeta (de arriba a abajo)

1. Ícono Lucide (tamaño ~28px), color `var(--orange)` en tarjetas default, `var(--bg)` en la activa
2. `num` (ej. "01") — label pequeño, letter-spacing amplio, `var(--orange)` / `var(--bg)` en activa, opacity 0.6 (igual criterio que `ServiceCard`)
3. `name` — título, `var(--heading)`, font-weight 700
4. `desc` — párrafo, `var(--muted)` / `var(--bg)` con opacity en activa
5. `tags` — pills al pie de la tarjeta, mismo estilo que `ServiceCard` (fondo `rgba(0,194,168,0.06)`, borde `rgba(0,194,168,0.12)`, texto teal) — en la tarjeta activa se invierten a tonos oscuros sobre teal

### Botones prev/next

- Cuadrados (mismo tamaño que el original, 56×56px aprox.)
- Fondo `var(--bg)` o transparente, borde `var(--hairline)`, hover → fondo `var(--teal)` + texto `var(--bg)`
- Iconos `ChevronLeft` / `ChevronRight` de `lucide-react`
- `aria-label="Servicio anterior"` / `aria-label="Siguiente servicio"`

## Animación de entrada

- Al entrar en viewport (ScrollTrigger, `start: 'top 75%'`, `once: true`), el contenedor completo del carrusel hace fade + slide-up (`opacity: 0 → 1`, `y: 40 → 0`, `duration: 0.8`, `ease: 'power3.out'`).
- No hay animación per-tarjeta en la entrada (a diferencia del grid actual con dos oleadas) — la única animación por-tarjeta es la transición de posición al navegar (`transition-all duration-500 ease-in-out`, ya incluida en el componente original vía clases/estilos CSS).

## Integración en `Services.tsx`

- Se elimina: `gridRef`, el `useEffect` con `gsap`/`ScrollTrigger` de las dos oleadas, el grid `<div>` con `SERVICES.map(...)` y el uso de `ServiceCard`.
- Se agrega: `<ServiceStaggerCards services={SERVICES} />` debajo del header de la sección.
- Se agrega un nuevo `useEffect`/`ref` para la animación de entrada del carrusel (fade+slide-up descrita arriba), reemplazando al `useEffect` anterior.
- El array `SERVICES` (con `num`, `name`, `desc`, `tags`) se mantiene sin cambios en `Services.tsx`.

## Limpieza

- Se elimina `components/ui/ServiceCard.tsx` (sin referencias tras el cambio).
- Los docs `2026-06-05-services-magnetic-tilt-*` quedan como histórico (no se modifican ni eliminan).

## Validación

- `npm run dev` y revisar visualmente la sección `#servicios` en desktop y mobile (viewport < 768px)
- Verificar navegación con flechas prev/next y con click en tarjetas laterales
- Verificar que no queden imports/referencias rotas a `ServiceCard`
- `npm run lint` sin errores nuevos
