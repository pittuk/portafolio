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

export async function animateCinematicSlam(params: {
  wordEls: HTMLElement[]
  titleSelector: string
  eyebrowEl: HTMLElement | null
  descEl: HTMLElement | null
  ctaEl: HTMLElement | null
  scrollEl: HTMLElement | null
  gsapInstance: any
}): Promise<any> {
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
    stagger: { amount: 0.25, from: 'random' as const },
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

  return tl
}
