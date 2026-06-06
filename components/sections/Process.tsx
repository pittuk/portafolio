'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FluidBackground from '@/components/ui/FluidBackground'

const STEPS = [
  { num: '01', name: 'Briefing',    desc: 'Entiendo tu negocio, objetivos reales y el cliente que quieres atraer. Sin suposiciones — empezamos con preguntas.', tag: 'Estrategia' },
  { num: '02', name: 'Diseño',      desc: 'Wireframes y mockups funcionales para validar la visión antes de escribir código. Lo que ves es lo que construimos.',  tag: 'UX / UI'    },
  { num: '03', name: 'Desarrollo',  desc: 'Construcción con las tecnologías adecuadas al proyecto: velocidad, SEO y escalabilidad desde el primer día.',          tag: 'Código'     },
  { num: '04', name: 'Entrega',     desc: 'Deploy, testing en dispositivos reales, capacitación y soporte post-lanzamiento. Entregado — y funcionando.',           tag: 'Lanzar'     },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef   = useRef<HTMLDivElement[]>([])
  const bordersRef = useRef<HTMLDivElement[]>([])
  const ringsRef   = useRef<HTMLDivElement[]>([])
  const numsRef    = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {

      // ── Title entrance ───────────────────────────────────────────────
      gsap.fromTo('.process-title',
        { opacity: 0, y: 56 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      )

      // ── Line draws with scroll ────────────────────────────────────────
      gsap.fromTo('.process-path',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%', end: 'bottom 65%',
            scrub: 1,
          },
        }
      )

      // ── Per-step activation ──────────────────────────────────────────
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        const isLeft = i % 2 === 0
        const ring   = ringsRef.current[i]
        const border = bordersRef.current[i]
        const numBg  = numsRef.current[i]

        gsap.set(card,  { opacity: 0, x: isLeft ? -110 : 110, rotateY: isLeft ? -10 : 10, scale: 0.9 })
        gsap.set(ring,  { scale: 1, opacity: 0 })
        gsap.set(numBg, { opacity: 0 })

        ScrollTrigger.create({
          trigger: card,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            const tl = gsap.timeline()

            tl.to(ring, { scale: 2.8, opacity: 0.7, duration: 0.18, ease: 'power2.in' })
            tl.to(ring, { scale: 5,   opacity: 0,   duration: 0.42, ease: 'power2.out' })

            tl.to(card, {
              opacity: 1, x: 0, rotateY: 0, scale: 1,
              duration: 0.72, ease: 'back.out(1.6)',
            }, '-=0.52')

            tl.to(border, {
              borderColor: 'rgba(0,194,168,0.28)',
              boxShadow: '0 8px 48px rgba(0,194,168,0.08)',
              duration: 0.55, ease: 'power2.out',
            }, '-=0.52')

            tl.to(numBg, { opacity: 0.09, duration: 0.55 }, '-=0.52')
          },
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="proceso"
      style={{ padding: '140px 40px', position: 'relative' }}
    >
      {/* WebGL fluid shader background */}
      <FluidBackground />

      {/* Title */}
      <h2
        className="process-title"
        style={{
          fontFamily: 'var(--heading)', fontWeight: 800,
          fontSize: 'clamp(36px,5vw,68px)', letterSpacing: -2, lineHeight: 1,
          marginBottom: 96, textAlign: 'center', opacity: 0,
          position: 'relative', zIndex: 1,
        }}
      >
        Cómo <span style={{ color: 'var(--teal)' }}>trabajo.</span>
      </h2>

      {/* Steps */}
      <div style={{
        maxWidth: 1060, margin: '0 auto', position: 'relative',
        perspective: '1200px', zIndex: 1,
      }}>

        {/* Central line */}
        <div
          className="process-path"
          style={{
            position: 'absolute', top: 0, bottom: 0, left: '50%',
            width: 2,
            background: 'linear-gradient(180deg, transparent, rgba(0,194,168,0.5) 8%, rgba(0,194,168,0.5) 92%, transparent)',
            transform: 'translateX(-50%)',
          }}
        />

        {STEPS.map((step, i) => {
          const isLeft = i % 2 === 0
          return (
            <div
              key={step.num}
              ref={el => { if (el) cardsRef.current[i] = el }}
              style={{
                display: 'flex', alignItems: 'center', gap: 48,
                marginBottom: i < STEPS.length - 1 ? 80 : 0,
                flexDirection: isLeft ? 'row' : 'row-reverse',
                position: 'relative',
              }}
            >
              {/* Card outer — no overflow:hidden so tag floats above border */}
              <div
                ref={el => { if (el) bordersRef.current[i] = el }}
                style={{
                  flex: 1, position: 'relative',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(0,194,168,0.08)',
                  borderRadius: 24,
                }}
              >
                {/* Tag pill — direct child, outside any overflow:hidden */}
                <span style={{
                  position: 'absolute', top: -13,
                  left: isLeft ? 28 : 'auto', right: isLeft ? 'auto' : 28,
                  fontFamily: 'var(--heading)', fontSize: 9, fontWeight: 700,
                  letterSpacing: 2, textTransform: 'uppercase',
                  color: 'var(--teal)', background: 'var(--bg)',
                  padding: '4px 14px', borderRadius: 100,
                  border: '1px solid rgba(0,194,168,0.25)',
                  whiteSpace: 'nowrap', zIndex: 2,
                }}>
                  {step.tag}
                </span>

                {/* Clip layer — fills card exactly, clips the bleed number at card edge */}
                <div style={{
                  position: 'absolute', inset: 0,
                  overflow: 'hidden', borderRadius: 24,
                  pointerEvents: 'none', zIndex: 0,
                }}>
                  <span
                    ref={el => { if (el) numsRef.current[i] = el }}
                    style={{
                      position: 'absolute', bottom: -36, right: -10,
                      fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 160,
                      color: 'rgba(0,194,168,1)', lineHeight: 1, letterSpacing: -12,
                      userSelect: 'none', opacity: 0,
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Content — padded, on top of clip layer */}
                <div style={{ padding: '44px 48px', position: 'relative', zIndex: 1 }}>

                  {/* Step counter line */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18,
                  }}>
                    <div style={{ width: 32, height: 2, background: 'var(--teal)', borderRadius: 2, flexShrink: 0 }} />
                    <span style={{
                      fontFamily: 'var(--heading)', fontSize: 10, fontWeight: 700,
                      color: 'rgba(0,194,168,0.6)', letterSpacing: 3,
                    }}>
                      {step.num} / 04
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--heading)', fontSize: 26, fontWeight: 700,
                    color: 'var(--white)', marginBottom: 14, letterSpacing: -0.5,
                    position: 'relative', zIndex: 1,
                  }}>
                    {step.name}
                  </h3>
                  <p style={{
                    fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, margin: 0,
                    position: 'relative', zIndex: 1, maxWidth: 340,
                  }}>
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Dot + ring */}
              <div style={{ position: 'relative', flexShrink: 0, zIndex: 2 }}>
                <div
                  ref={el => { if (el) ringsRef.current[i] = el }}
                  style={{
                    position: 'absolute', top: '50%', left: '50%',
                    width: 22, height: 22, borderRadius: '50%',
                    border: `2px solid ${i === 3 ? 'rgba(243,146,0,0.7)' : 'rgba(0,194,168,0.7)'}`,
                    transform: 'translate(-50%,-50%)',
                    opacity: 0, pointerEvents: 'none',
                  }}
                />
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: i === 3 ? 'var(--orange)' : 'var(--teal)',
                  border: '4px solid var(--bg)',
                  boxShadow: i === 3
                    ? '0 0 0 2px rgba(243,146,0,0.3), 0 0 24px rgba(243,146,0,0.4)'
                    : '0 0 0 2px rgba(0,194,168,0.3), 0 0 24px rgba(0,194,168,0.4)',
                }} />
              </div>

              {/* Balance spacer */}
              <div style={{ flex: 1 }} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
