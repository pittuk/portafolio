// components/layout/CustomCursor.tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current!
    const ring = ringRef.current!
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'none' })
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      gsap.set(ring, { x: ringX, y: ringY })
      rafId = requestAnimationFrame(animate)
    }

    // Scale ring on interactive/hover-effect elements, back to default elsewhere
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element
      const isInteractive = !!target.closest('a, button, [role="button"], [data-cursor]')
      gsap.to(ring, {
        scale: isInteractive ? 2.5 : 1,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor"
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99998,
          width: 6, height: 6,
          background: 'var(--teal)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor"
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99997,
          width: 32, height: 32,
          border: '1px solid rgba(0,194,168,0.4)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
