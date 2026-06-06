// components/sections/Hero.tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EyebrowPill from '@/components/ui/EyebrowPill'
import PrimaryButton from '@/components/ui/PrimaryButton'
import { animateCinematicSlam } from '@/lib/animations/splitText'

export default function Hero() {
  const bgWordsRef = useRef<HTMLDivElement[]>([])
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    let tl: any = null

    animateCinematicSlam({
      wordEls: bgWordsRef.current.filter(Boolean),
      titleSelector: '.hero-title',
      eyebrowEl: eyebrowRef.current,
      descEl: descRef.current,
      ctaEl: ctaRef.current,
      scrollEl: scrollIndicatorRef.current,
      gsapInstance: gsap,
    }).then(t => { tl = t }).catch(console.error)

    return () => {
      tl?.kill()
    }
  }, [])

  return (
    <section
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

      {/* Palabras de fondo — apiladas en columna izquierda + WEB a la derecha */}
      <div style={{
        position: 'absolute', top: '6%', left: -20,
        display: 'flex', flexDirection: 'column', gap: '2vw',
        pointerEvents: 'none', zIndex: 1,
      }}>
        {[
          { text: 'DISEÑO',      fs: 'clamp(90px,18vw,280px)', ls: -8 },
          { text: 'DESARROLLO',  fs: 'clamp(64px,12vw,180px)', ls: -6 },
          { text: 'CREATIVIDAD', fs: 'clamp(52px,10vw,150px)', ls: -5 },
        ].map((w, i) => (
          <div
            key={w.text}
            ref={el => { if (el) bgWordsRef.current[i] = el }}
            style={{
              fontFamily: 'var(--heading)', fontWeight: 800,
              fontSize: w.fs, lineHeight: 1, letterSpacing: w.ls,
              color: 'rgba(0,194,168,0.9)',
              whiteSpace: 'nowrap', userSelect: 'none',
              opacity: 0,
            }}
          >
            {w.text}
          </div>
        ))}
      </div>
      <div
        ref={el => { if (el) bgWordsRef.current[3] = el }}
        style={{
          position: 'absolute', bottom: '5%', right: -20,
          fontFamily: 'var(--heading)', fontWeight: 800,
          fontSize: 'clamp(48px, 9vw, 140px)',
          color: 'rgba(0,194,168,0.9)',
          lineHeight: 1, letterSpacing: -8,
          pointerEvents: 'none', whiteSpace: 'nowrap',
          userSelect: 'none', zIndex: 1,
          opacity: 0,
        }}
      >
        WEB
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
            opacity: 0,
          }}
        >
          Luis<br />Cruz<span style={{ color: 'var(--orange)' }}>.</span>
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
      <div
        ref={scrollIndicatorRef}
        style={{
          position: 'absolute', bottom: 40, left: 40, zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          opacity: 0,
        }}
      >
        <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, transparent, var(--teal))', opacity: 0.8 }} />
      </div>
    </section>
  )
}
