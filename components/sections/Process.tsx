// components/sections/Process.tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STEPS = [
  { num: '01', name: 'Briefing', desc: 'Entiendo tu negocio, objetivos reales y el cliente que quieres atraer.', tag: 'Estrategia' },
  { num: '02', name: 'Diseño', desc: 'Wireframes y mockups funcionales para validar la visión antes de escribir código.', tag: 'Crear' },
  { num: '03', name: 'Desarrollo', desc: 'Construcción con las tecnologías adecuadas al proyecto, con foco en velocidad y SEO.', tag: 'Construir' },
  { num: '04', name: 'Entrega', desc: 'Deploy, testing en dispositivos reales, capacitación y soporte post-lanzamiento.', tag: 'Lanzar' },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const cards = cardsRef.current

    cards.forEach((card, i) => {
      if (!card) return
      const direction = i % 2 === 0 ? -80 : 80
      gsap.fromTo(card,
        { opacity: 0, x: direction, y: 40 },
        {
          opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        }
      )
    })

    gsap.fromTo('.process-path', { scaleY: 0, transformOrigin: 'top center' }, {
      scaleY: 1, duration: 1.2, ease: 'power3.inOut',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', end: 'bottom 30%', scrub: 0.5 },
    })
  }, [])

  return (
    <section ref={sectionRef} id="proceso" style={{ padding: '120px 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Bloom decorativo */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(0,194,168,0.06) 0%, transparent 65%)', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

      <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(36px,5vw,68px)', letterSpacing: -2, lineHeight: 1, marginBottom: 80, textAlign: 'center' }}>
        Cómo <span style={{ color: 'var(--teal)' }}>trabajo.</span>
      </h2>

      <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
        {/* Línea vertical central */}
        <div className="process-path" style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: 'linear-gradient(180deg, transparent, rgba(0,194,168,0.3) 15%, rgba(0,194,168,0.3) 85%, transparent)', transform: 'translateX(-50%)' }} />

        {STEPS.map((step, i) => {
          const isLeft = i % 2 === 0
          return (
            <div
              key={step.num}
              ref={el => { if (el) cardsRef.current[i] = el }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 48,
                marginBottom: i < STEPS.length - 1 ? 48 : 0,
                flexDirection: isLeft ? 'row' : 'row-reverse',
                position: 'relative',
              }}
            >
              {/* Card */}
              <div style={{
                flex: 1,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(0,194,168,0.08)',
                borderRadius: 16,
                padding: '28px 32px',
                position: 'relative',
              }}>
                <span style={{
                  position: 'absolute', top: -8, left: isLeft ? -8 : 'auto', right: isLeft ? 'auto' : -8,
                  fontFamily: 'var(--heading)', fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                  color: 'var(--teal)', background: 'var(--bg)', padding: '2px 10px', borderRadius: 100,
                  border: '1px solid rgba(0,194,168,0.2)',
                }}>
                  {step.tag}
                </span>
                <span style={{
                  fontFamily: 'var(--heading)', fontSize: 48, fontWeight: 800,
                  color: 'rgba(0,194,168,0.06)', lineHeight: 1,
                  position: 'absolute', bottom: 8, right: isLeft ? 12 : 'auto', left: isLeft ? 'auto' : 12,
                  pointerEvents: 'none',
                }}>
                  {step.num}
                </span>
                <h3 style={{ fontFamily: 'var(--heading)', fontSize: 20, fontWeight: 700, color: 'var(--white)', marginBottom: 8 }}>{step.name}</h3>
                <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>{step.desc}</p>
              </div>

              {/* Círculo conector */}
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                background: 'var(--teal)',
                border: '4px solid var(--bg)',
                boxShadow: '0 0 0 2px rgba(0,194,168,0.2)',
                flexShrink: 0,
                position: 'relative',
                zIndex: 1,
              }} />

              {/* Espacio vacío del otro lado para mantener balance */}
              <div style={{ flex: 1 }} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
