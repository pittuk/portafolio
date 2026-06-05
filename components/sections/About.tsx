// components/sections/About.tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DoubleBezelCard from '@/components/ui/DoubleBezelCard'

const SKILLS = ['WordPress', 'Elementor', 'Figma', 'HTML/CSS', 'JavaScript', 'WooCommerce', 'MySQL', 'cPanel', 'Photoshop']
const STATS = [{ num: 10, suffix: '+', label: 'Años exp.' }, { num: 50, suffix: '+', label: 'Proyectos' }, { num: 100, suffix: '%', label: 'Compromiso' }]

export default function About() {
  const statsRefs = useRef<(HTMLSpanElement | null)[]>([])
  const photoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tweens: gsap.core.Tween[] = []

    // Counter-up animation — gsap.to un objeto proxy, onUpdate lee el valor
    statsRefs.current.forEach((el, i) => {
      if (!el) return
      const proxy = { val: 0 }
      const suffix = STATS[i].suffix
      const target = STATS[i].num
      const t = gsap.to(proxy, {
        val: target,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => { el.textContent = String(Math.round(proxy.val)) + suffix },
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      })
      tweens.push(t)
    })

    // Foto clip-path reveal
    const photoAnim = gsap.fromTo(
      photoRef.current,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: photoRef.current, start: 'top 80%', once: true },
      }
    )

    return () => {
      tweens.forEach(t => {
        t.scrollTrigger?.kill()
        t.kill()
      })
      photoAnim.scrollTrigger?.kill()
      photoAnim.kill()
    }
  }, [])

  return (
    <section id="sobre-mi" style={{ padding: '100px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
      <div>
        <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(40px,6vw,80px)', lineHeight: 0.95, letterSpacing: -3, marginBottom: 24 }}>
          Luis<br />Cruz<span style={{ color: 'var(--teal)' }}>.</span>
        </h2>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 2, marginBottom: 32 }}>
          Diseñador y desarrollador web con más de 10 años creando sitios que generan resultados reales. Mi formación en diseño gráfico + competencias técnicas en HTML, CSS, JS y WordPress me permiten construir soluciones completas, bonitas y funcionales.
        </p>
        <div style={{ display: 'flex', gap: 32, marginBottom: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {STATS.map((stat, i) => (
            <div key={stat.label}>
              <div style={{ fontFamily: 'var(--heading)', fontSize: 40, fontWeight: 800, color: 'var(--teal)', letterSpacing: -2, lineHeight: 1 }}>
                <span ref={el => { statsRefs.current[i] = el }}>0</span>
              </div>
              <p style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}>{stat.label}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SKILLS.map(skill => (
            <span key={skill} style={{ fontSize: 9, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--teal)', background: 'rgba(0,194,168,0.06)', border: '1px solid rgba(0,194,168,0.15)', borderRadius: '100px', padding: '5px 12px' }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div ref={photoRef} style={{ position: 'relative' }}>
        <DoubleBezelCard>
          <div style={{ background: 'linear-gradient(145deg, #0c2a20, #062015)', borderRadius: 22, height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,194,168,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,168,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <span style={{ fontFamily: 'var(--heading)', fontSize: 80, fontWeight: 800, color: 'rgba(0,194,168,0.15)', letterSpacing: -4, position: 'relative', zIndex: 1 }}>LC</span>
            <p style={{ position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center', fontSize: 9, color: 'rgba(0,194,168,0.3)', letterSpacing: 2, textTransform: 'uppercase' }}>Foto aquí</p>
          </div>
        </DoubleBezelCard>
      </div>
    </section>
  )
}
