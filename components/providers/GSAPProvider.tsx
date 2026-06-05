'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    // Configuración global de GSAP
    gsap.defaults({ ease: 'power3.out' })
    return () => {
      // Cleanup: matar todos los ScrollTriggers al desmontar
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return <>{children}</>
}
