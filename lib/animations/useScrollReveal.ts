// lib/animations/useScrollReveal.ts
import { useEffect, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useStaggerReveal(containerRef: RefObject<HTMLElement | null>, childSelector: string) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!containerRef.current) return

    const children = containerRef.current.querySelectorAll(childSelector)

    const anim = gsap.fromTo(
      children,
      { opacity: 0, y: 48 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    )

    return () => {
      anim.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [containerRef, childSelector])
}
