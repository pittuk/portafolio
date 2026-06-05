// components/sections/Hero.tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EyebrowPill from '@/components/ui/EyebrowPill'
import PrimaryButton from '@/components/ui/PrimaryButton'
import { animateTitle } from '@/lib/animations/splitText'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const bgWordRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Título con Splitting.js
    animateTitle('.hero-title', gsap).catch(console.error)

    // Fade-up para descriptor y CTA
    const fadeAnim = gsap.fromTo(
      [eyebrowRef.current, descRef.current, ctaRef.current],
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, delay: 0.8, ease: 'power3.out' }
    )

    // Parallax en la palabra de fondo
    const parallaxAnim = gsap.to(bgWordRef.current, {
      y: -120,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })

    return () => {
      fadeAnim.kill()
      parallaxAnim.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      ref={heroRef}
      id="inicio"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Bloom inferior derecho */}
      <div style={{
        position: 'absolute', bottom: -120, right: -80,
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(0,194,168,0.14) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      {/* Bloom superior izquierdo */}
      <div style={{
        position: 'absolute', top: -100, left: -100,
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(0,194,168,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      {/* Barra decorativa izquierda */}
      <div style={{
        position: 'absolute', left: 0, top: 80, bottom: 0, width: 2,
        background: 'linear-gradient(180deg, transparent, var(--teal) 40%, transparent)',
        opacity: 0.4,
      }} />

      {/* Palabra de fondo */}
      <div
        ref={bgWordRef}
        style={{
          position: 'absolute', bottom: -20, left: -10,
          fontFamily: 'var(--heading)', fontWeight: 800,
          fontSize: 'clamp(120px, 22vw, 300px)',
          color: 'rgba(0,194,168,0.025)',
          lineHeight: 1, letterSpacing: -8,
          pointerEvents: 'none', whiteSpace: 'nowrap',
          userSelect: 'none', zIndex: 1,
        }}
      >
        DISEÑADOR
      </div>

      {/* Contenido */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '120px 40px 48px',
        position: 'relative', zIndex: 2,
      }}>
        <div ref={eyebrowRef} style={{ opacity: 0 }}>
          <EyebrowPill>WordPress · UI/UX · e-Commerce · Talca, Chile</EyebrowPill>
        </div>

        <h1
          className="hero-title"
          style={{
            fontFamily: 'var(--heading)', fontWeight: 800,
            fontSize: 'clamp(72px, 12vw, 160px)',
            lineHeight: 0.9, letterSpacing: -4,
            color: 'var(--white)', marginTop: 20,
            overflow: 'hidden',
          }}
        >
          Luis<br />Cruz<span style={{ color: 'var(--teal)' }}>.</span>
        </h1>

        <div style={{ marginTop: 28, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40 }}>
          <p
            ref={descRef}
            style={{
              fontSize: 13, color: 'var(--muted)', lineHeight: 1.8,
              maxWidth: 360, fontWeight: 400, opacity: 0,
            }}
          >
            Creo sitios web que <strong style={{ color: 'var(--white)', fontWeight: 600 }}>convierten visitas en clientes reales</strong>.
            Diseño estratégico + desarrollo técnico desde hace más de 10 años.
          </p>
          <div ref={ctaRef} style={{ opacity: 0, flexShrink: 0 }}>
            <PrimaryButton href="#portfolio">Ver proyectos</PrimaryButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 40, right: 40, zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      }}>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(180deg, transparent, var(--teal))' }} />
        <span style={{
          fontSize: 8, letterSpacing: 3, textTransform: 'uppercase',
          color: 'var(--muted)', writingMode: 'vertical-lr',
        }}>scroll</span>
      </div>
    </section>
  )
}
