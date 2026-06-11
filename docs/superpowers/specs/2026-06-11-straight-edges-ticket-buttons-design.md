# Esquinas rectas + corte ticket en botones

**Date:** 2026-06-11
**Branch:** feature/ajustes-adicionales
**Status:** Approved

## Objetivo

Unificar el lenguaje visual del sitio: eliminar `border-radius` de contenedores y elementos tipo "pill" (excepto los que ya usan el corte diagonal tipo "ticket"), y extender ese corte ticket a los botones principales con un tamaño de corte más pequeño y proporcional.

## Alcance

### 1. Contenedores → `border-radius: 0`

- `components/layout/Nav.tsx`:
  - Botón hamburguesa móvil (línea ~94, `borderRadius: 12` → `0`)
  - Píldora de navegación desktop (línea ~104, `borderRadius: '100px'` → `0`)
- `components/layout/MobileDrawer.tsx`:
  - Botón cerrar (línea ~64, `borderRadius: 10` → `0`)
  - Bloque de logo/nombre (línea ~75, `borderRadius: 14` → `0`)
  - Links de navegación (línea ~108, `borderRadius: 12` → `0`)
- `app/globals.css`:
  - `.service-stagger-nav` (línea ~89, `border-radius: 12px` → `0`)
- `components/sections/Contact.tsx`:
  - Wrappers de campos del formulario (nombre, email, tipo de proyecto, mensaje): outer `borderRadius: 12` → `0`, inner `borderRadius: 11` → `0`
- `app/(site)/proyectos/[slug]/page.tsx`:
  - Contenedores de imágenes de galería en mosaico (línea ~200, `borderRadius: 16` → `0`)
  - Contenedores de imágenes de galería simple (líneas ~242, ~257, `borderRadius: 20` → `0`)

**Fuera de alcance:** la variante `rounded` de `DoubleBezelCard` (24px/22px) no se usa actualmente en ningún componente — no se modifica.

### 2. Pills/Tags → rectangulares (`border-radius: 0`)

- `components/ui/EyebrowPill.tsx`: contenedor pill (línea ~14, `borderRadius: '100px'` → `0`). El punto decorativo (línea ~23, `borderRadius: '50%'`) **no cambia**.
- `components/sections/About.tsx`: tags de habilidades (línea ~127, `borderRadius: '100px'` → `0`)
- `components/ui/ServiceStaggerCards.tsx`: tag de servicio (línea ~134, `borderRadius: '100px'` → `0`)
- `app/(site)/proyectos/[slug]/page.tsx`: tags de tecnología (línea ~144, `borderRadius: '100px'` → `0`)
- `components/project/ProjectFilter.tsx`: pills de filtro de categoría (línea ~51, `borderRadius: 100` → `0`)

### 3. Círculos → sin cambios

No se modifican (mantienen `borderRadius: '50%'`):
- `components/layout/CustomCursor.tsx`
- Punto decorativo de `EyebrowPill.tsx`
- Badge de flecha en `components/project/ProjectCard.tsx` (línea ~115)
- Círculo del ícono en `PrimaryButton.tsx` (línea ~36) y en el botón de envío de `Contact.tsx` (línea ~201)

### 4. Botones → corte ticket + borde recto

Se define un nuevo clip-path "ticket" para botones, con un corte de **8px** (proporcional al tamaño de botón, frente a los 50px usados en tarjetas grandes):

```ts
const BUTTON_TICKET_CLIP_PATH = 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, calc(100% - 8px) 100%, 8px 100%, 0 100%, 0 0)'
```

Se aplica `clipPath: BUTTON_TICKET_CLIP_PATH` y `borderRadius: 0` (reemplazando cualquier `borderRadius: '100px'` existente) a:

- `components/ui/PrimaryButton.tsx`: tanto al `shell` (línea ~49) como al `inner` (línea ~18)
- `components/layout/Nav.tsx`: link CTA "Hablemos" (línea ~118)
- `components/layout/MobileDrawer.tsx`: link CTA "Hablemos" (línea ~128)
- `components/sections/Contact.tsx`: botón de envío — tanto el `shell` (línea ~187) como el `<button>` interno (línea ~192)
- `app/(site)/proyectos/[slug]/page.tsx`: link "Visitar sitio web ↗" (línea ~165)

El círculo de ícono (28px, `borderRadius: '50%'`) dentro de `PrimaryButton` y del botón de Contact se mantiene circular y sin cambios — el corte de 8px en la esquina del botón no lo afecta visualmente porque el ícono está centrado verticalmente con padding suficiente.

La constante `BUTTON_TICKET_CLIP_PATH` se define localmente en cada archivo donde se usa (siguiendo el patrón ya existente de `TICKET_CLIP_PATH` duplicado en `DoubleBezelCard.tsx`, `ProjectCard.tsx` y `Portfolio.tsx`), evitando crear una nueva abstracción compartida no solicitada.

## Validación

- `npx tsc --noEmit` sin errores
- `npm run dev` y revisión visual:
  - Nav (desktop y mobile/drawer), formulario de contacto, galería de proyecto: esquinas rectas, sin `border-radius`
  - Tags y pills (EyebrowPill, filtros de proyecto, tags de habilidades/tecnología): rectangulares
  - Círculos (cursor, badges de flecha, íconos de botones): sin cambios
  - Botones (PrimaryButton "Ver proyectos", "Hablemos" en nav y drawer, envío de formulario, "Visitar sitio web"): corte diagonal de 8px visible en esquina superior derecha e inferior izquierda, sin distorsión del contenido
- `npm run build` sin errores

## Rollback

Revertir los cambios de estilo en los archivos listados arriba (sin migraciones de datos ni cambios de API).
