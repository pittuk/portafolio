// components/layout/Nav.tsx
'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    // Ocultar nav al scroll hacia abajo, mostrar al scroll hacia arriba
    let lastY = 0
    ScrollTrigger.create({
      onUpdate: (self) => {
        const currentY = self.scroll()
        if (currentY > lastY && currentY > 100) {
          gsap.to(navRef.current, { y: -100, duration: 0.4, ease: 'power2.in' })
        } else {
          gsap.to(navRef.current, { y: 0, duration: 0.4, ease: 'power2.out' })
        }
        lastY = currentY
      },
    })
  }, [])

  return (
    <header
      ref={navRef}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '28px 40px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src="/images/logo/logo letra blanca.png" alt="Luis Cruz" style={{ display: 'block', maxWidth: 130, height: 'auto' }} />
      </Link>

      <nav style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '100px',
        padding: '10px 20px',
        display: 'flex', gap: 24, alignItems: 'center',
        backdropFilter: 'blur(12px)',
      }}>
        {[
          { href: '/#portfolio', label: 'Trabajo' },
          { href: '/#servicios', label: 'Servicios' },
          { href: '/#sobre-mi', label: 'Sobre mí' },
        ].map(({ href, label }) => (
          <Link key={href} href={href} style={{ fontSize: 11, fontWeight: 500, color: 'var(--muted)', textDecoration: 'none' }}>
            {label}
          </Link>
        ))}
        <Link
          href="/#contacto"
          style={{
            background: 'var(--teal)', color: 'var(--bg)',
            fontWeight: 700, borderRadius: '100px',
            padding: '6px 16px', fontSize: 10,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Hablemos
        </Link>
      </nav>
    </header>
  )
}
