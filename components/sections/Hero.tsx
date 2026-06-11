// components/sections/Hero.tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EyebrowPill from '@/components/ui/EyebrowPill'
import PrimaryButton from '@/components/ui/PrimaryButton'
import { animateCinematicSlam } from '@/lib/animations/splitText'
import { useMediaQuery } from '@/lib/useMediaQuery'
import HeroText from '@/components/ui/hero-shutter-text'

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

      {/* Marca de agua animada con Shutter Text */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <HeroText
          words={['DISEÑO', 'DESARROLLO', 'CREATIVIDAD', 'WEB']}
          autoPlay={true}
          interval={3500}
          showControls={false}
          showGrid={false}
          showAccents={false}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
          textClassName="text-[14vw] font-black text-[rgba(0,194,168,0.04)] dark:text-[rgba(0,194,168,0.03)] tracking-tighter"
          sliceColorClassName="text-[rgba(249,115,22,0.06)] dark:text-[rgba(249,115,22,0.04)]"
        />
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
