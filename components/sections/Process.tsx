'use client'
import { Accordion05 } from '@/components/ui/accordion-05'

export default function Process() {
  return (
    <section
      id="proceso"
      style={{
        padding: '140px 40px',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--heading)',
          fontWeight: 800,
          fontSize: 'clamp(28px,7vw,68px)',
          letterSpacing: -2,
          lineHeight: 1,
          marginBottom: 64,
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Este es mi <span style={{ color: 'var(--teal)' }}>proceso</span><span style={{ color: 'var(--orange)' }}>.</span>
      </h2>

      <Accordion05 />
    </section>
  )
}
