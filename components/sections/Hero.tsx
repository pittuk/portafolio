// components/sections/Hero.tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EyebrowPill from '@/components/ui/EyebrowPill'
import PrimaryButton from '@/components/ui/PrimaryButton'
import { animateCinematicSlam } from '@/lib/animations/splitText'
import { useMediaQuery } from '@/lib/useMediaQuery'
import Image from 'next/image'
import { GRAIN_SVG, GRID_BG } from '@/lib/effects'

export default function Hero() {
  const isMobile = useMediaQuery('(max-width: 768px)')
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
    let cancelled = false
    const originalContents = new Map<HTMLElement, string>()
    const titleEl = document.querySelector('.hero-title') as HTMLElement | null
    if (titleEl) originalContents.set(titleEl, titleEl.innerHTML)

    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      animateCinematicSlam({
        wordEls: [],
        titleSelector: '.hero-title',
        eyebrowEl: eyebrowRef.current,
        descEl: descRef.current,
        ctaEl: ctaRef.current,
        scrollEl: null,
        gsapInstance: gsap,
        isCancelled: () => cancelled,
      }).then(t => { if (!cancelled) tl = t; else t?.kill() }).catch(console.error)
    }

    return () => {
      cancelled = true
      tl?.kill()
      originalContents.forEach((html, el) => { if (el.isConnected) el.innerHTML = html })
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
        // clip-path recorta también a los hijos position:fixed (overflow no lo hace),
        // así la foto fija solo se ve dentro del hero.
        clipPath: 'inset(0)',
      }}
    >
      {/* Foto de fondo fija: queda quieta mientras el contenido scrollea encima */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Image
          src="/images/luis-cruz-hero.webp"
          alt="Luis Cruz"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
        />
        {/* Video encima de la foto: aparece con fundido cuando empieza a reproducirse,
            así la foto sigue siendo el LCP y no hay pantalla negra mientras carga. */}
        <video
          src="/video/luis-cruz-hero.mp4"
          muted
          autoPlay
          loop
          playsInline
          aria-hidden="true"
          ref={v => {
            if (!v) return
            // autoPlay puede arrancar antes de la hidratación, y entonces onPlaying ya no llega
            const show = () => { v.style.opacity = '1' }
            if (!v.paused && v.readyState >= 3) show()
            else v.addEventListener('playing', show, { once: true })
          }}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 20%',
            opacity: 0, transition: 'opacity 0.8s ease',
          }}
        />
      </div>
      {/* Degradado de legibilidad */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: isMobile
          ? 'linear-gradient(0deg, var(--bg) 0%, rgba(4,12,10,0.85) 45%, rgba(4,12,10,0.15) 75%, rgba(4,12,10,0.35) 100%)'
          : 'linear-gradient(0deg, var(--bg), transparent 40%), linear-gradient(90deg, var(--bg) 0%, rgba(4,12,10,0.85) 35%, rgba(4,12,10,0.4) 70%, rgba(4,12,10,0.6))',
      }} />
      {/* Retícula */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: GRID_BG,
        backgroundSize: '48px 48px',
      }} />
      {/* Grano */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: GRAIN_SVG, opacity: 0.15, mixBlendMode: 'overlay',
      }} />
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

      {/* Contenido */}
      <div className="hero-content" style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: isMobile ? '100px 20px 40px' : '120px 40px 48px',
        position: 'relative', zIndex: 2,
      }}>
        <div ref={eyebrowRef} className="hero-anim">
          <EyebrowPill>WordPress · UI/UX · e-Commerce</EyebrowPill>
        </div>

        <h1 style={{ margin: 0 }}>
        {/* sr-only fuera de .hero-title para que la animación GSAP no lo parta en letras */}
        <span className="sr-only">Luis Cruz — Diseñador web y desarrollador WordPress en Chile</span>
        <div
          aria-hidden="true"
          className="hero-title hero-anim"
          style={{
            fontFamily: 'var(--heading)', fontWeight: 800,
            fontSize: 'clamp(72px, 12vw, 160px)',
            lineHeight: 0.9, letterSpacing: -4,
            color: 'var(--white)', marginTop: 20,
            overflow: 'hidden',
          }}
        >
          Luis<br />Cruz<span style={{ color: 'var(--orange)' }}>.</span>
        </div>
        </h1>

        <div className="hero-desc-cta" style={{ marginTop: 28, display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', gap: 40, flexDirection: isMobile ? 'column' : 'row' }}>
          <p
            ref={descRef}
            className="hero-anim"
            style={{
              fontSize: isMobile ? 14 : 17, color: 'var(--muted)', lineHeight: 1.7,
              maxWidth: isMobile ? 360 : 560, fontWeight: 400,
            }}
          >
            Diseño y desarrollo sitios web y tiendas WooCommerce para empresas en Chile y Latinoamérica que quieren <strong style={{ color: 'var(--white)', fontWeight: 600 }}>vender más sin depender solo de redes sociales</strong>.
            Estrategia, diseño y código en una sola persona — sin intermediarios.
          </p>
          <div ref={ctaRef} className="hero-anim" style={{ flexShrink: 0 }}>
            <PrimaryButton href="#portfolio">Ver proyectos</PrimaryButton>
          </div>
        </div>
      </div>

    </section>
  )
}
