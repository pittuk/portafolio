// components/layout/Footer.tsx
import Image from 'next/image'
import Link from 'next/link'

const SERVICE_LINKS = [
  { href: '/diseno-web-wordpress', label: 'Diseño web WordPress' },
  { href: '/diseno-tiendas-woocommerce', label: 'Tiendas WooCommerce' },
  { href: '/mantenimiento-wordpress', label: 'Mantenimiento WordPress' },
  { href: '/diseno-web-empresas', label: 'Diseño web para empresas' },
]

export default function Footer() {
  return (
    <footer className="footer-content" style={{
      padding: '32px 20px 24px',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      display: 'flex', flexDirection: 'column', gap: 20,
    }}>
      <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
        {SERVICE_LINKS.map(link => (
          <Link key={link.href} href={link.href} style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: 0.5, textDecoration: 'none' }}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <span style={{ position: 'relative', display: 'inline-block', width: 80, height: 21 }}>
            <Image
              src="/images/logo/logo letra blanca.png"
              alt="Luis Cruz"
              fill
              loading="lazy"
              sizes="80px"
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
            />
          </span>
        </Link>
        <p style={{ fontSize: 9, color: 'rgba(240,237,232,0.2)', letterSpacing: '0.5px', textAlign: 'right' }}>
          © {new Date().getFullYear()} Luis Cruz · Diseñado &amp; desarrollado por mí mismo
        </p>
      </div>
    </footer>
  )
}
