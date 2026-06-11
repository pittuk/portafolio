# Portfolio Cards — Ticket Clip-Path

**Date:** 2026-06-10
**Branch:** cambios-2
**Status:** Approved

## Objetivo

Aplicar a las tarjetas de la sección "Trabajo que habla solo" (`#portfolio`) el mismo corte diagonal tipo "ticket" (clip-path) que ya usan las tarjetas de la sección "Soluciones web que funcionan" (`ServiceStaggerCards`), reemplazando las esquinas redondeadas actuales.

## Alcance

- Se reemplaza `borderRadius: 20` + `overflow: 'hidden'` por un `clipPath` de polígono con corte diagonal de 50px en la esquina superior derecha, idéntico al usado en `components/ui/ServiceStaggerCards.tsx`:

```ts
clipPath: 'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)'
```

- `clip-path` recorta también el contenido interno (imagen de fondo, overlay de gradiente) a la forma de ticket, por lo que `overflow: hidden` deja de ser necesario.
- No se modifica el borde existente, el efecto hover (tilt 3D + flecha), ni se agrega línea decorativa diagonal o cambio de color de borde en hover — solo la forma del recorte.
- No se agregan estilos nuevos a `app/globals.css`.

## Componentes afectados

### `components/project/ProjectCard.tsx`

- Reemplazar `borderRadius: 20` y `overflow: 'hidden'` (línea ~64-65) por el `clipPath` de arriba.
- Sin otros cambios — el componente se usa tanto en el carrusel horizontal (desktop) como en el grid (mobile) de `Portfolio.tsx`, por lo que un solo cambio cubre ambos contextos.

### `components/sections/Portfolio.tsx`

- Tarjeta CTA "Ver todos" (mobile, ~línea 115) y tarjeta CTA "Ver todos" (desktop, ~línea 193-203): reemplazar `borderRadius: 20` por el mismo `clipPath`.

## Validación

- `npx tsc --noEmit` sin errores
- `npm run dev` y revisar visualmente `#portfolio` en desktop (carrusel horizontal) y mobile (<768px, grid):
  - Las tarjetas de proyecto y la tarjeta CTA muestran el corte diagonal en la esquina superior derecha
  - La imagen de fondo de cada proyecto se recorta correctamente a la forma de ticket (sin desbordar)
  - El hover (tilt + flecha) sigue funcionando sin distorsión visual
- `npm run build` sin errores
