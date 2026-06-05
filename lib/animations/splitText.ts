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
