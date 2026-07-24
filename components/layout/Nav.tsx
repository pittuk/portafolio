// components/layout/Nav.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useMediaQuery } from '@/lib/useMediaQuery'
import MobileDrawer from './MobileDrawer'

const SERVICE_LINKS = [
  { href: '/diseno-web-wordpress', label: 'Diseño web WordPress' },
  { href: '/diseno-tiendas-woocommerce', label: 'Tiendas WooCommerce' },
  { href: '/mantenimiento-wordpress', label: 'Mantenimiento WordPress' },
  { href: '/diseno-web-empresas', label: 'Diseño web para empresas' },
]

const LINKS = [
  { href: '/#servicios', label: 'Servicios', children: SERVICE_LINKS },
  { href: '/#sobre-mi', label: 'Sobre mí' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/blog', label: 'Blog' },
]

const BUTTON_TICKET_CLIP_PATH = 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, calc(100% - 8px) 100%, 8px 100%, 0 100%, 0 0)'

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

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
    setOpenDropdown(null)
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
              borderRadius: 0, padding: 10, cursor: 'pointer', display: 'flex',
              zIndex: 103, position: 'relative', color: 'var(--white)',
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        ) : (
          <nav className="nav-desktop" style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 0,
            padding: '10px 20px',
            display: 'flex', gap: 24, alignItems: 'center',
            backdropFilter: 'blur(12px)',
          }}>
            {LINKS.map(({ href, label, children }) => (
              children ? (
                <div
                  key={href}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setOpenDropdown(href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={href}
                    onFocus={() => setOpenDropdown(href)}
                    style={{ fontSize: 11, fontWeight: 500, color: 'var(--muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    {label}
                    <ChevronDown size={12} style={{ transition: 'transform 0.2s', transform: openDropdown === href ? 'rotate(180deg)' : 'none' }} />
                  </Link>
                  {openDropdown === href && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, paddingTop: 12, minWidth: 220 }}>
                      <div style={{
                        background: 'rgba(10,20,16,0.98)', border: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(12px)', padding: 6,
                        display: 'flex', flexDirection: 'column', gap: 2,
                      }}>
                        {children.map(child => (
                          <Link
                            key={child.href}
                            href={child.href}
                            style={{
                              fontSize: 11, color: 'var(--muted)', textDecoration: 'none',
                              padding: '9px 12px', whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.color = 'var(--teal)'; e.currentTarget.style.background = 'rgba(0,194,168,0.06)' }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'transparent' }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link key={href} href={href} style={{ fontSize: 11, fontWeight: 500, color: 'var(--muted)', textDecoration: 'none' }}>
                  {label}
                </Link>
              )
            ))}
            <Link
              href="/#contacto"
              style={{
                background: 'var(--orange)', color: '#fff',
                fontWeight: 700, borderRadius: 0,
                clipPath: BUTTON_TICKET_CLIP_PATH,
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
