'use client'
import { InteractiveImageAccordion } from '@/components/ui/interactive-image-accordion'

export default function Process() {
  return (
    <section
      id="proceso"
      style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 4vw, 40px)',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <InteractiveImageAccordion />
    </section>
  )
}
