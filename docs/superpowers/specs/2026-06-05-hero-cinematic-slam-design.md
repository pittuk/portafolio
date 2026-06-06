# Hero — Cinematic Slam

**Date:** 2026-06-05  
**Branch:** feature/nuevos-ajustes  
**Status:** Approved

## Objetivo

Transformar el Hero de una entrada suave/ambient a una secuencia cinematográfica de impacto. Las palabras DISEÑO, DESARROLLO, CREATIVIDAD y WEB pasan de textura invisible (opacity 0.02) a protagonistas visuales que golpean la pantalla y ceden el paso al nombre "Luis Cruz."

---

## Coreografía (timeline ~2.8s)

| Tiempo | Evento |
|--------|--------|
| 0.00s | Todo oculto |
| 0.10s | DISEÑO entra desde la izquierda |
| 0.45s | DESARROLLO cae desde arriba |
| 0.75s | CREATIVIDAD golpea desde la derecha |
| 1.00s | WEB sube desde abajo |
| 1.20s | Beat — 4 palabras visibles + flash teal simultáneo |
| 1.45s | Chars se dispersan hacia los bordes |
| 1.90s | "Luis Cruz." ensambla char por char |
| 2.20s | EyebrowPill + descripción + CTA fade-up escalonado |
| 2.80s | Scroll indicator aparece |

---

## Especificaciones por fase

### Fase 1 — Slams de entrada

Cada palabra entra con:
- **Opacidad visible:** 0.78–0.85 (vs. 0.02 actual)
- **Entrada:** `xPercent/yPercent ±130` + rotación `±6deg` + escala `1.3 → 1`
- **Ease al impacto:** `back.out(1.7)` para sensación de peso físico
- **Duración:** 0.5s por palabra
- **Flash teal al impacto:** `text-shadow: 0 0 12px rgba(0,194,168,0.9)` pulse 0.3s

Direcciones:
- DISEÑO → desde izquierda (`xPercent: -130`)
- DESARROLLO → desde arriba (`yPercent: -130`)
- CREATIVIDAD → desde derecha (`xPercent: 130`)
- WEB → desde abajo (`yPercent: 130`)

### Fase 2 — Dispersión de chars

- `Splitting({ by: 'chars' })` aplicado a cada palabra al init
- Cada char vuela a posición aleatoria `±40vw / ±40vh`
- Rotación aleatoria `±180deg`, `opacity → 0`
- `duration: 0.6s`, `stagger: 0.012s`, ease `power2.in`

### Fase 3 — Ensamblado del nombre

- Chars de "Luis Cruz." desde `yPercent: 115`
- `duration: 1.0s`, `stagger: 0.04s`, `ease: power4.out`
- Delay: 1.9s desde inicio de secuencia

### Fase 4 — Elementos secundarios

- EyebrowPill, descripción, CTA: `opacity 0 → 1`, `y: 24 → 0`
- `stagger: 0.15s`, delay: 2.2s desde inicio

---

## Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `lib/animations/splitText.ts` | Nueva función `animateCinematicSlam()` |
| `components/sections/Hero.tsx` | Reescribir secuencia de animación, subir opacity de palabras |

## Dependencias nuevas

Ninguna. GSAP 3.15 + Splitting.js ya instalados.

---

## Criterios de éxito

- La secuencia completa dura ≤ 3s
- Las palabras son claramente visibles durante su entrada (opacity ≥ 0.7)
- No hay jank — todo animado con `transform` y `opacity` (GPU)
- El nombre "Luis Cruz." tiene el mayor peso visual al final
- La secuencia no se repite en scroll — solo al cargar la página
