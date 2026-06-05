// components/sections/Process.tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STEPS = [
  { num: '01', name: 'Briefing', desc: 'Entiendo tu negocio, objetivos reales y el cliente que quieres atraer.' },
  { num: '02', name: 'Diseño', desc: 'Wireframes y mockups en Figma para validar la visión antes de escribir código.' },
  { num: '03', name: 'Desarrollo', desc: 'Construcción con las tecnologías adecuadas al proyecto, con foco en velocidad y SEO.' },
  { num: '04', name: 'Entrega', desc: 'Deploy, testing en dispositivos reales, capacitación y soporte post-lanzamiento.' },
]

export default function Process() {
  const lineRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Línea conectora: dibujarse de izquierda a derecha
    const lineAnim = gsap.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: stepsRef.current, start: 'top 80%', once: true },
      }
    )

    // Steps: fade-up escalonado
    const steps = stepsRef.current?.querySelectorAll('.step-item')
    let stepsAnim: gsap.core.Tween | null = null
    if (steps && steps.length > 0) {
      stepsAnim = gsap.fromTo(
        steps,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 80%', once: true },
        }
      )
    }

    return () => {
      lineAnim.scrollTrigger?.kill()
      lineAnim.kill()
      if (stepsAnim) {
        stepsAnim.scrollTrigger?.kill()
        stepsAnim.kill()
      }
    }
  }, [])

  return (
    <section id="proceso" style={{ padding: '100px 40px', background: 'rgba(0,194,168,0.02)', borderTop: '1px solid rgba(0,194,168,0.08)', borderBottom: '1px solid rgba(0,194,168,0.08)' }}>
      <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(36px,5vw,68px)', letterSpacing: -2, lineHeight: 1, marginBottom: 64 }}>
        Un proceso<br /><span style={{ color: 'var(--teal)' }}>sin sorpresas.</span>
      </h2>

      <div ref={stepsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, position: 'relative' }}>
        {/* Línea conectora */}
        <div ref={lineRef} style={{ position: 'absolute', top: 5, left: '12%', right: '12%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,194,168,0.4) 20%, rgba(0,194,168,0.4) 80%, transparent)' }} />

        {STEPS.map((step) => (
          <div key={step.num} className="step-item" style={{ padding: '0 24px', opacity: 0, position: 'relative' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--bg)', border: '2px solid var(--teal)', marginBottom: 24, position: 'relative', zIndex: 1 }}>
              <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: 'rgba(0,194,168,0.12)' }} />
            </div>
            <span style={{ position: 'absolute', top: -24, right: 16, fontFamily: 'var(--heading)', fontSize: 72, fontWeight: 800, color: 'rgba(0,194,168,0.06)', lineHeight: 1, pointerEvents: 'none' }}>{step.num}</span>
            <h3 style={{ fontFamily: 'var(--heading)', fontSize: 16, fontWeight: 700, color: 'var(--white)', marginBottom: 8 }}>{step.name}</h3>
            <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.8 }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
