// components/layout/FloatingCTA.tsx
import Link from 'next/link'

const BUTTON_TICKET_CLIP_PATH = 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, calc(100% - 8px) 100%, 8px 100%, 0 100%, 0 0)'

export default function FloatingCTA() {
  return (
    <Link
      href="/#contacto"
      style={{
        position: 'fixed', bottom: 20, right: 20, zIndex: 100,
        background: 'var(--orange)', color: '#fff',
        fontWeight: 700, borderRadius: 0,
        clipPath: BUTTON_TICKET_CLIP_PATH,
        padding: '14px 22px', fontSize: 11,
        letterSpacing: '1.5px', textTransform: 'uppercase',
        textDecoration: 'none',
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
      }}
    >
      Solicita una propuesta
    </Link>
  )
}
