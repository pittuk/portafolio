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

const GRAIN_SVG = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"

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
        minHeight: isMobile ? 'auto' : '100svh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Foto de fondo */}
      <Image
        src="/images/Luis Cruz.png"
        alt="Luis Cruz"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center 20%', zIndex: 0 }}
      />
      {/* Degradado de legibilidad */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: isMobile
          ? 'linear-gradient(0deg, var(--bg) 10%, rgba(4,12,10,0.75) 60%, rgba(4,12,10,0.6))'
          : 'linear-gradient(0deg, var(--bg), transparent 40%), linear-gradient(90deg, var(--bg) 0%, rgba(4,12,10,0.85) 35%, rgba(4,12,10,0.4) 70%, rgba(4,12,10,0.6))',
      }} />
      {/* Retícula */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
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
        justifyContent: 'flex-end', padding: isMobile ? '100px 20px 80px' : '120px 40px 48px',
        position: 'relative', zIndex: 2,
      }}>
        <div ref={eyebrowRef} style={{ opacity: isMobile ? 1 : 0 }}>
          <EyebrowPill>WordPress · UI/UX · e-Commerce</EyebrowPill>
        </div>

        <div
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
        </div>

        <div className="hero-desc-cta" style={{ marginTop: 28, display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', gap: 40, flexDirection: isMobile ? 'column' : 'row' }}>
          <p
            ref={descRef}
            style={{
              fontSize: isMobile ? 14 : 17, color: 'var(--muted)', lineHeight: 1.7,
              maxWidth: isMobile ? 360 : 560, fontWeight: 400, opacity: isMobile ? 1 : 0,
            }}
          >
            Diseño y desarrollo sitios web y tiendas WooCommerce para empresas en Chile y Latinoamérica que quieren <strong style={{ color: 'var(--white)', fontWeight: 600 }}>vender más sin depender solo de redes sociales</strong>.
            Estrategia, diseño y código en una sola persona — sin intermediarios.
          </p>
          <div ref={ctaRef} style={{ opacity: isMobile ? 1 : 0, flexShrink: 0 }}>
            <PrimaryButton href="#portfolio">Ver proyectos</PrimaryButton>
          </div>
        </div>
      </div>

    </section>
  )
}
