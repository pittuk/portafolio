'use client'
import { Check, X } from 'lucide-react'
import DoubleBezelCard from '@/components/ui/DoubleBezelCard'
import { useMediaQuery } from '@/lib/useMediaQuery'

const ROWS = [
  { me: 'Hablas directo conmigo', agency: 'Hablas con un ejecutivo de cuenta' },
  { me: 'Yo diseño y desarrollo tu proyecto', agency: 'Equipo rotativo, distintas personas' },
  { me: 'Sin intermediarios', agency: 'Varias capas antes de llegar al que hace el trabajo' },
  { me: 'Cambios rápidos', agency: 'Cambios más lentos y burocráticos' },
]

export default function Comparison() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <section
      id="comparador"
      className="section-padding"
      style={{ padding: isMobile ? '80px 20px' : '100px 40px', position: 'relative' }}
    >
      <h2 style={{
        fontFamily: 'var(--heading)', fontWeight: 800,
        fontSize: 'clamp(32px,5vw,60px)', letterSpacing: -2, lineHeight: 1,
        marginBottom: isMobile ? 32 : 48, textAlign: 'center',
      }}>
        <span style={{ color: 'var(--teal)' }}>Conmigo</span> vs. agencia<span style={{ color: 'var(--orange)' }}>.</span>
      </h2>

      <DoubleBezelCard variant="ticket" style={{ maxWidth: 760, margin: '0 auto' }}>
        <div>
          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr 44px 44px' : '1fr 160px 160px',
            borderBottom: '1px solid var(--hairline)',
          }}>
            <div />
            <div style={{ padding: '16px 8px', textAlign: 'center', fontSize: isMobile ? 10 : 12, fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: 1 }}>Conmigo</div>
            <div style={{ padding: '16px 8px', textAlign: 'center', fontSize: isMobile ? 10 : 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>Agencia</div>
          </div>

          {ROWS.map((row, i) => (
            <div
              key={row.me}
              style={{
                display: 'grid', gridTemplateColumns: isMobile ? '1fr 44px 44px' : '1fr 160px 160px',
                borderBottom: i === ROWS.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.06)',
                alignItems: 'center',
              }}
            >
              <div style={{ padding: '18px 16px', fontSize: isMobile ? 12 : 13, color: 'var(--white)', lineHeight: 1.5 }}>
                {row.me}
                {isMobile && <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{row.agency}</div>}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Check size={18} color="var(--teal)" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <X size={18} color="var(--muted)" />
              </div>
            </div>
          ))}
        </div>
      </DoubleBezelCard>
    </section>
  )
}
