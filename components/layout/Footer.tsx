// components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer style={{
      padding: '24px 40px',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <div style={{ fontFamily: 'var(--heading)', fontSize: 13, fontWeight: 800, color: 'var(--white)' }}>
        LC<span style={{ color: 'var(--teal)' }}>.</span>
      </div>
      <p style={{ fontSize: 10, color: 'rgba(240,237,232,0.2)', letterSpacing: '0.5px' }}>
        © {new Date().getFullYear()} Luis Cruz · Diseñado &amp; desarrollado por mí mismo
      </p>
    </footer>
  )
}
