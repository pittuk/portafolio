import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Página no encontrada — Luis Cruz',
  robots: { index: false, follow: true },
}

const BUTTON_TICKET_CLIP_PATH = 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, calc(100% - 8px) 100%, 8px 100%, 0 100%, 0 0)'

const LINKS = [
  { href: '/proyectos', label: 'Ver proyectos' },
  { href: '/blog', label: 'Leer el blog' },
  { href: '/#contacto', label: 'Hablemos de tu proyecto' },
]

export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <section style={{ padding: '160px 20px 120px', textAlign: 'center', minHeight: '70vh' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', letterSpacing: 3, marginBottom: 16 }}>ERROR 404</p>
          <h1 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(36px,6vw,64px)', letterSpacing: -2, lineHeight: 1, color: 'var(--white)', marginBottom: 16 }}>
            Esta página <span style={{ color: 'var(--teal)' }}>no existe</span><span style={{ color: 'var(--orange)' }}>.</span>
          </h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 480, margin: '0 auto 40px' }}>
            El sitio cambió de plataforma y este enlace quedó atrás. Puede que lo que buscabas esté en el portafolio o el blog actual.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            {LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: i === 0 ? 'var(--teal)' : 'transparent',
                  color: i === 0 ? 'var(--bg)' : 'var(--white)',
                  border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.15)',
                  clipPath: BUTTON_TICKET_CLIP_PATH,
                  padding: '12px 20px',
                  fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700,
                  letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
