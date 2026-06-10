// components/layout/Nav.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from '@/lib/useMediaQuery'

const LINKS = [
  { href: '/#portfolio', label: 'Trabajo' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#sobre-mi', label: 'Sobre mí' },
  { href: '/proyectos', label: 'Proyectos' },
]

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.set(navRef.current, { y: 0 })
  }, [pathname])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    let lastY = 0
    const st = ScrollTrigger.create({
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
    return () => st.kill()
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      ref={navRef}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: isMobile ? '20px 20px 0' : '28px 40px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <span style={{ position: 'relative', display: 'inline-block', width: isMobile ? 100 : 130, height: isMobile ? 27 : 34 }}>
          <Image
            src="/images/logo/logo letra blanca.png"
            alt="Luis Cruz"
            fill
            priority
            sizes="130px"
            style={{ objectFit: 'contain', objectPosition: 'left center' }}
          />
        </span>
      </Link>

      {isMobile ? (
        <>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-mobile-toggle"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: 10, cursor: 'pointer', display: 'flex',
              flexDirection: 'column', gap: 5, zIndex: 102, position: 'relative',
            }}
          >
            <span style={{ display: 'block', width: 20, height: 2, background: 'var(--white)', borderRadius: 2, transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: 20, height: 2, background: 'var(--white)', borderRadius: 2, transition: 'opacity 0.2s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 20, height: 2, background: 'var(--white)', borderRadius: 2, transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>

          {menuOpen && (
            <div
              style={{
                position: 'fixed', inset: 0, zIndex: 101,
                background: 'rgba(4,12,10,0.98)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 32,
              }}
            >
              {LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  style={{ fontSize: 20, fontWeight: 700, color: 'var(--white)', textDecoration: 'none', fontFamily: 'var(--heading)', letterSpacing: -1 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/#contacto"
                onClick={() => setMenuOpen(false)}
                style={{
                  background: 'var(--orange)', color: '#fff',
                  fontWeight: 700, borderRadius: '100px',
                  padding: '10px 28px', fontSize: 11,
                  letterSpacing: '2px', textTransform: 'uppercase',
                  textDecoration: 'none', marginTop: 16,
                }}
              >
                Hablemos
              </Link>
            </div>
          )}
        </>
      ) : (
        <nav className="nav-desktop" style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '100px',
          padding: '10px 20px',
          display: 'flex', gap: 24, alignItems: 'center',
          backdropFilter: 'blur(12px)',
        }}>
          {LINKS.map(({ href, label }) => (
            <Link key={href} href={href} style={{ fontSize: 11, fontWeight: 500, color: 'var(--muted)', textDecoration: 'none' }}>
              {label}
            </Link>
          ))}
          <Link
            href="/#contacto"
            style={{
              background: 'var(--orange)', color: '#fff',
              fontWeight: 700, borderRadius: '100px',
              padding: '6px 16px', fontSize: 10,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Hablemos
          </Link>
        </nav>
      )}
    </header>
  )
}
