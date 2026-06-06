// components/sections/Hero.tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EyebrowPill from '@/components/ui/EyebrowPill'
import PrimaryButton from '@/components/ui/PrimaryButton'
import { animateCinematicSlam } from '@/lib/animations/splitText'
import { useMediaQuery } from '@/lib/useMediaQuery'

export default function Hero() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const bgWordsRef = useRef<HTMLDivElement[]>([])
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (isMobile) {
      // Force visibility — GSAP from a previous desktop render may have left opacity:0
      const titleEl = document.querySelector('.hero-title') as HTMLElement | null
      const els = [eyebrowRef.current, descRef.current, ctaRef.current, titleEl].filter(Boolean) as HTMLElement[]
      gsap.set(els, { opacity: 1, clearProps: 'transform' })
      return
    }

    let tl: any = null
    const wordElements = bgWordsRef.current.filter(Boolean)
    const originalContents = new Map<HTMLElement, string>()
    wordElements.forEach(el => originalContents.set(el, el.innerHTML))
    const titleEl = document.querySelector('.hero-title') as HTMLElement | null
    if (titleEl) originalContents.set(titleEl, titleEl.innerHTML)

    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      animateCinematicSlam({
        wordEls: wordElements,
        titleSelector: '.hero-title',
        eyebrowEl: eyebrowRef.current,
        descEl: descRef.current,
        ctaEl: ctaRef.current,
        scrollEl: null,
        gsapInstance: gsap,
      }).then(t => { tl = t }).catch(console.error)
    }

    return () => {
      tl?.kill()
      originalContents.forEach((html, el) => { el.innerHTML = html })
    }
  }, [isMobile])

  return (
    <section
      id="inicio"
      style={{
        minHeight: '100svh',
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
      {/* Mobile: visible como watermark estático. Desktop: animadas por GSAP desde opacity:0 */}
      <div style={{
        position: 'absolute',
        top: isMobile ? '8%' : '6%',
        left: isMobile ? 0 : -20,
        display: 'flex', flexDirection: 'column',
        gap: isMobile ? 6 : '2vw',
        pointerEvents: 'none', zIndex: 1,
      }}>
        {[
          { text: 'DISEÑO',      fs: isMobile ? '100px' : 'clamp(90px,18vw,280px)', ls: isMobile ? -4 : -8, ml: isMobile ? -100 : 0 },
          { text: 'DESARROLLO',  fs: isMobile ? '68px'  : 'clamp(64px,12vw,180px)', ls: isMobile ? -3 : -6, ml: isMobile ? -48 : 0 },
          { text: 'CREATIVIDAD', fs: isMobile ? '56px'  : 'clamp(52px,10vw,150px)', ls: isMobile ? -2 : -5, ml: isMobile ? -40 : 0 },
        ].map((w, i) => (
          <div
            key={w.text}
            ref={el => { if (el) bgWordsRef.current[i] = el }}
            style={{
              fontFamily: 'var(--heading)', fontWeight: 800,
              fontSize: w.fs, lineHeight: 1, letterSpacing: w.ls,
              color: 'rgba(0,194,168,0.9)',
              whiteSpace: 'nowrap', userSelect: 'none',
              opacity: isMobile ? 0.11 : 0,
              marginLeft: w.ml,
            }}
          >
            {w.text}
          </div>
        ))}
      </div>
      <div
        ref={el => { if (el) bgWordsRef.current[3] = el }}
        style={{
          position: 'absolute',
          bottom: isMobile ? '38%' : '5%',
          right: isMobile ? -8 : -20,
          fontFamily: 'var(--heading)', fontWeight: 800,
          fontSize: isMobile ? 'clamp(64px,16vw,80px)' : 'clamp(48px, 9vw, 140px)',
          color: 'rgba(0,194,168,0.9)',
          lineHeight: 1, letterSpacing: isMobile ? -4 : -8,
          pointerEvents: 'none', whiteSpace: 'nowrap',
          userSelect: 'none', zIndex: 1,
          opacity: isMobile ? 0.11 : 0,
        }}
      >
        WEB
      </div>

      {/* Contenido */}
      <div className="hero-content" style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: isMobile ? '100px 20px 80px' : '120px 40px 48px',
        position: 'relative', zIndex: 2,
      }}>
        <div ref={eyebrowRef} style={{ opacity: isMobile ? 1 : 0 }}>
          <EyebrowPill>WordPress · UI/UX · e-Commerce</EyebrowPill>
        </div>

        <h1
          className="hero-title"
          style={{
            fontFamily: 'var(--heading)', fontWeight: 800,
            fontSize: 'clamp(72px, 12vw, 160px)',
            lineHeight: 0.9, letterSpacing: -4,
            color: 'var(--white)', marginTop: 20,
            overflow: 'hidden',
            opacity: isMobile ? 1 : 0,
          }}
        >
          Luis<br />Cruz<span style={{ color: 'var(--orange)' }}>.</span>
        </h1>

        <div className="hero-desc-cta" style={{ marginTop: 28, display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', gap: 40, flexDirection: isMobile ? 'column' : 'row' }}>
          <p
            ref={descRef}
            style={{
              fontSize: 13, color: 'var(--muted)', lineHeight: 1.8,
              maxWidth: 360, fontWeight: 400, opacity: isMobile ? 1 : 0,
            }}
          >
            Creo sitios web que <strong style={{ color: 'var(--white)', fontWeight: 600 }}>convierten visitas en clientes reales</strong>.
            Diseño estratégico + desarrollo técnico desde hace más de 10 años.
          </p>
          <div ref={ctaRef} style={{ opacity: isMobile ? 1 : 0, flexShrink: 0 }}>
            <PrimaryButton href="#portfolio">Ver proyectos</PrimaryButton>
          </div>
        </div>
      </div>

    </section>
  )
}
