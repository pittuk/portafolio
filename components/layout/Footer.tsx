// components/layout/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer-content" style={{
      padding: '24px 20px',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src="/images/logo/logo letra blanca.png" alt="Luis Cruz" style={{ display: 'block', maxWidth: 80, height: 'auto' }} />
      </Link>
      <p style={{ fontSize: 9, color: 'rgba(240,237,232,0.2)', letterSpacing: '0.5px', textAlign: 'right' }}>
        © {new Date().getFullYear()} Luis Cruz · Diseñado &amp; desarrollado por mí mismo
      </p>
    </footer>
  )
}
