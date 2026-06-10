// components/layout/Nav.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X } from 'lucide-react'
import { useMediaQuery } from '@/lib/useMediaQuery'
import MobileDrawer from './MobileDrawer'

const LINKS = [
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

  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <>
      <header
        ref={navRef}
        aria-hidden={menuOpen}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 104,
          padding: isMobile ? '20px 20px 0' : '28px 40px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          opacity: menuOpen ? 0 : 1,
          pointerEvents: menuOpen ? 'none' : 'auto',
          transition: 'opacity 0.3s ease',
        }}
      >
        <Link href="/" tabIndex={menuOpen ? -1 : 0} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
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
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-mobile-toggle"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            tabIndex={menuOpen ? -1 : 0}
            style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: 10, cursor: 'pointer', display: 'flex',
              zIndex: 103, position: 'relative', color: 'var(--white)',
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
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

      {isMobile && (
        <MobileDrawer
          open={menuOpen}
          links={LINKS}
          pathname={pathname}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
