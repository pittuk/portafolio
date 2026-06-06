# Hero Cinematic Slam — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar la entrada del Hero en una secuencia cinematográfica donde DISEÑO, DESARROLLO, CREATIVIDAD y WEB golpean la pantalla a alta opacidad, se dispersan en chars, y ceden el paso al ensamblado de "Luis Cruz."

**Architecture:** Nueva función `animateCinematicSlam()` en `lib/animations/splitText.ts` orquesta toda la secuencia via una GSAP timeline. `Hero.tsx` llama esta función en su `useEffect`, elimina la lógica anterior de fade/parallax en las palabras de fondo, y actualiza los estilos iniciales de los elementos.

**Tech Stack:** Next.js 16, React 19, GSAP 3.15, Splitting.js, TypeScript

---

## File Map

| Archivo | Cambio |
|---------|--------|
| `lib/animations/splitText.ts` | Agregar `animateCinematicSlam()` exportada |
| `components/sections/Hero.tsx` | Usar `animateCinematicSlam`, actualizar estilos iniciales, agregar `scrollIndicatorRef` |

---

## Task 1: Agregar `animateCinematicSlam` a `lib/animations/splitText.ts`

**Files:**
- Modify: `lib/animations/splitText.ts`

- [ ] **Step 1: Abrir el archivo existente y verificar su contenido actual**

Leer `lib/animations/splitText.ts`. Actualmente exporta `animateTitle` y `animateTitleOnScroll`. Se agregará `animateCinematicSlam` al final del archivo.

- [ ] **Step 2: Agregar la función `animateCinematicSlam`**

Agregar al final de `lib/animations/splitText.ts`:

```typescript
export async function animateCinematicSlam(params: {
  wordEls: HTMLElement[]
  titleSelector: string
  eyebrowEl: HTMLElement | null
  descEl: HTMLElement | null
  ctaEl: HTMLElement | null
  scrollEl: HTMLElement | null
  gsapInstance: any
}): Promise<void> {
  const { wordEls, titleSelector, eyebrowEl, descEl, ctaEl, scrollEl, gsapInstance: g } = params
  const Splitting = (await import('splitting')).default

  const W = window.innerWidth
  const H = window.innerHeight

  // Split each background word into chars for the dispersal phase
  const wordChars: HTMLElement[][] = wordEls.map(el => {
    const [result] = Splitting({ target: el, by: 'chars' })
    return (result?.chars ?? []) as HTMLElement[]
  })

  // Each word enters from a different direction
  const slamFrom = [
    { x: -W * 1.3, y: 0,       rotation: -6 }, // DISEÑO   ← left
    { x: 0,        y: -H * 1.3, rotation:  6 }, // DESARROLLO ↓ top
    { x:  W * 1.3, y: 0,       rotation: -6 }, // CREATIVIDAD → right
    { x: 0,        y:  H * 1.3, rotation:  6 }, // WEB       ↑ bottom
  ]
  const wordOpacities = [0.82, 0.75, 0.70, 0.78]

  // --- Set initial states (all synchronous, fires before any paint after await) ---
  wordEls.forEach((el, i) => {
    const f = slamFrom[i]
    g.set(el, { x: f.x, y: f.y, rotation: f.rotation, scale: 1.3, opacity: wordOpacities[i] })
  })
  g.set([eyebrowEl, descEl, ctaEl, scrollEl].filter(Boolean), { opacity: 0, y: 24 })

  const tl = g.timeline()

  // --- Phase 1: Slam each word in ---
  wordEls.forEach((el, i) => {
    tl.to(
      el,
      { x: 0, y: 0, rotation: 0, scale: 1, ease: 'back.out(1.7)', duration: 0.5 },
      i === 0 ? 0.1 : '>-0.05'
    )
  })

  // --- Phase 2: Teal flash on all words simultaneously ---
  tl.to(wordEls, {
    textShadow: '0 0 20px rgba(0,194,168,0.9), 0 0 40px rgba(0,194,168,0.4)',
    duration: 0.15,
    ease: 'power2.in',
  }, '+=0.15')
  tl.to(wordEls, {
    textShadow: '0 0 0px rgba(0,194,168,0)',
    duration: 0.25,
    ease: 'power2.out',
  })

  // --- Phase 3: Disperse chars outward ---
  const allChars = wordChars.flat()
  tl.to(allChars, {
    x: () => (Math.random() - 0.5) * W * 0.8,
    y: () => (Math.random() - 0.5) * H * 0.8,
    rotation: () => (Math.random() - 0.5) * 360,
    opacity: 0,
    duration: 0.6,
    stagger: { amount: 0.25, from: 'random' },
    ease: 'power2.in',
  }, '+=0.05')

  // --- Phase 4: Assemble title ---
  const titleResults = Splitting({ target: titleSelector, by: 'chars' })
  if (titleResults.length) {
    const titleEl = document.querySelector(titleSelector) as HTMLElement | null
    const titleChars = (titleResults[0].chars ?? []) as HTMLElement[]
    // Restore h1 visibility (was hidden via CSS opacity:0), then hide chars below overflow boundary
    if (titleEl) g.set(titleEl, { opacity: 1 })
    g.set(titleChars, { yPercent: 115, opacity: 0 })
    tl.to(titleChars, {
      yPercent: 0,
      opacity: 1,
      duration: 1.0,
      stagger: 0.04,
      ease: 'power4.out',
    }, '-=0.3')
  }

  // --- Phase 5: Secondary elements ---
  tl.to([eyebrowEl, descEl, ctaEl].filter(Boolean), {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
  }, '+=0.1')

  if (scrollEl) {
    tl.to(scrollEl, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '+=0.1')
  }
}
```

- [ ] **Step 3: Verificar compilación TypeScript**

```powershell
npx tsc --noEmit
```

Esperado: sin errores relacionados con `animateCinematicSlam`. Si hay errores de tipo en el `stagger: { from: 'random' }`, cambiarlo a `stagger: { amount: 0.25, from: 'random' as const }`.

- [ ] **Step 4: Commit**

```powershell
git add lib/animations/splitText.ts
git commit -m "feat: add animateCinematicSlam to splitText animations"
```

---

## Task 2: Actualizar `Hero.tsx`

**Files:**
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1: Reemplazar el import de `animateTitle` por `animateCinematicSlam`**

En `components/sections/Hero.tsx`, línea 8, cambiar:

```typescript
// ANTES
import { animateTitle } from '@/lib/animations/splitText'

// DESPUÉS
import { animateCinematicSlam } from '@/lib/animations/splitText'
```

- [ ] **Step 2: Agregar `scrollIndicatorRef`**

Dentro del componente `Hero`, después de la línea con `eyebrowRef`, agregar:

```typescript
const scrollIndicatorRef = useRef<HTMLDivElement>(null)
```

- [ ] **Step 3: Reemplazar el `useEffect` completo**

Reemplazar el `useEffect` existente (líneas 17–54) con:

```typescript
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger)

  animateCinematicSlam({
    wordEls: bgWordsRef.current.filter(Boolean),
    titleSelector: '.hero-title',
    eyebrowEl: eyebrowRef.current,
    descEl: descRef.current,
    ctaEl: ctaRef.current,
    scrollEl: scrollIndicatorRef.current,
    gsapInstance: gsap,
  }).catch(console.error)
}, [])
```

- [ ] **Step 4: Actualizar estilos de las palabras de fondo (columna izquierda)**

Reemplazar el array de palabras (líneas 95–99) cambiando el color a sólido y agregando `opacity: 0` inicial:

```tsx
{[
  { text: 'DISEÑO',      fs: 'clamp(90px,18vw,280px)', ls: -8 },
  { text: 'DESARROLLO',  fs: 'clamp(64px,12vw,180px)', ls: -6 },
  { text: 'CREATIVIDAD', fs: 'clamp(52px,10vw,150px)', ls: -5 },
].map((w, i) => (
  <div
    key={w.text}
    ref={el => { if (el) bgWordsRef.current[i] = el }}
    style={{
      fontFamily: 'var(--heading)', fontWeight: 800,
      fontSize: w.fs, lineHeight: 1, letterSpacing: w.ls,
      color: 'rgba(0,194,168,0.9)',
      whiteSpace: 'nowrap', userSelect: 'none',
      opacity: 0,
    }}
  >
    {w.text}
  </div>
))}
```

- [ ] **Step 5: Actualizar estilo de la palabra WEB**

Reemplazar el div de WEB (líneas 114–127) con:

```tsx
<div
  ref={el => { if (el) bgWordsRef.current[3] = el }}
  style={{
    position: 'absolute', bottom: '5%', right: -20,
    fontFamily: 'var(--heading)', fontWeight: 800,
    fontSize: 'clamp(48px, 9vw, 140px)',
    color: 'rgba(0,194,168,0.9)',
    lineHeight: 1, letterSpacing: -8,
    pointerEvents: 'none', whiteSpace: 'nowrap',
    userSelect: 'none', zIndex: 1,
    opacity: 0,
  }}
>
  WEB
</div>
```

- [ ] **Step 6: Agregar `opacity: 0` al `h1` (previene flash antes de que GSAP tome control)**

En el `<h1 className="hero-title" ...>`, agregar `opacity: 0` al style:

```tsx
<h1
  className="hero-title"
  style={{
    fontFamily: 'var(--heading)', fontWeight: 800,
    fontSize: 'clamp(72px, 12vw, 160px)',
    lineHeight: 0.9, letterSpacing: -4,
    color: 'var(--white)', marginTop: 20,
    overflow: 'hidden',
    opacity: 0,
  }}
>
  Luis<br />Cruz<span style={{ color: 'var(--teal)' }}>.</span>
</h1>
```

- [ ] **Step 7: Agregar `ref` al scroll indicator y `opacity: 0` inicial**

Reemplazar el div del scroll indicator (líneas 169–178) con:

```tsx
<div
  ref={scrollIndicatorRef}
  style={{
    position: 'absolute', bottom: 60, right: 40, zIndex: 2,
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
    opacity: 0,
  }}
>
  <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, transparent, var(--teal))', opacity: 0.8 }} />
  <span style={{
    fontSize: 8, letterSpacing: 3, textTransform: 'uppercase',
    color: 'rgba(0,194,168,0.6)', writingMode: 'vertical-lr',
  }}>scroll</span>
</div>
```

- [ ] **Step 8: Verificar compilación TypeScript**

```powershell
npx tsc --noEmit
```

Esperado: sin errores.

- [ ] **Step 9: Commit**

```powershell
git add components/sections/Hero.tsx
git commit -m "feat: hero cinematic slam — words slam in, disperse, reveal name"
```

---

## Task 3: Verificación visual

- [ ] **Step 1: Iniciar el servidor de desarrollo**

```powershell
npm run dev
```

- [ ] **Step 2: Abrir en el navegador**

Navegar a `http://localhost:3000`. Verificar la secuencia completa:

1. Pantalla vacía 0.1s
2. DISEÑO entra golpeando desde la izquierda con rebote
3. DESARROLLO cae desde arriba
4. CREATIVIDAD golpea desde la derecha
5. WEB sube desde abajo
6. Flash teal simultáneo en las 4 palabras
7. Chars se dispersan aleatoriamente
8. "Luis Cruz." se ensambla char por char desde abajo
9. EyebrowPill, descripción y CTA aparecen escalonados
10. Scroll indicator aparece al final

- [ ] **Step 3: Verificar en modo responsive (mobile)**

Abrir DevTools → toggle device toolbar → iPhone 14 (390px). La secuencia debe verse fluida, sin overflow horizontal visible durante los slams.

- [ ] **Step 4: Verificar que no hay jank**

En DevTools → Performance → grabar la animación de entrada. Confirmar que no hay frames por debajo de 30fps.

---

## Notas de implementación

- `Math.random()` en los function-based values de GSAP se evalúa una vez por elemento cuando el tween corre — cada char recibe una dirección única de dispersión
- El `stagger: { amount: 0.25, from: 'random' }` dispersa los chars en orden aleatorio durante 0.25s en total, sin importar cuántos chars haya
- El `tl.to(el, ..., '>-0.05')` en los slams crea un overlap de 50ms entre cada entrada — las palabras se solapan ligeramente para dar sensación de cascada rápida
- El `'-=0.3'` en el título lo hace comenzar a ensamblar mientras los últimos chars todavía se están dispersando — crea overlap dramático
