'use client'
import DoubleBezelCard from '@/components/ui/DoubleBezelCard'
import { useMediaQuery } from '@/lib/useMediaQuery'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

const SKILLS = ['WordPress', 'Elementor', 'Divi', 'HTML/CSS', 'JavaScript', 'WooCommerce', 'MySQL', 'cPanel', 'Photoshop', 'Illustrator', 'SQL']
const STATS = [
  { num: 15, suffix: '+', label: 'Años exp.' },
  { num: 125, suffix: '+', label: 'Proyectos' },
  { num: 47, suffix: '+', label: 'Tiendas WooCommerce' },
  { num: 90, suffix: '%', label: 'Recomendación' },
]

export default function About() {
  const statsRefs = useRef<(HTMLSpanElement | null)[]>([])
  const photoRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tweens: gsap.core.Tween[] = []

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
    <section id="sobre-mi" className="about-grid section-padding" style={{ padding: isMobile ? '80px 20px' : '100px 40px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 60, alignItems: 'center' }}>
      <div>
        <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(40px,6vw,80px)', lineHeight: 0.95, letterSpacing: -3, marginBottom: 24 }}>
          Luis<br />Cruz<span style={{ color: 'var(--orange)' }}>.</span>
        </h2>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 2, marginBottom: 32 }}>
          Mi trayectoria comenzó como diseñador gráfico, donde adquirí una base sólida en comunicación visual y creatividad. Luego migré al mundo digital especializándome en maquetación web con HTML y CSS, hasta llegar a WordPress, donde hoy construyo sitios completos con Elementor y Divi. Combino diseño estratégico, experiencia de usuario y desarrollo técnico para crear soluciones digitales eficientes y escalables que aportan crecimiento real a cada proyecto. He trabajado con clientes en Chile, Venezuela, Estados Unidos, Argentina, Colombia y España.
        </p>
        <div style={isMobile
          ? { display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 20, columnGap: 20, marginBottom: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }
          : { display: 'flex', gap: 32, marginBottom: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {STATS.map((stat, i) => (
            <div key={stat.label}>
              <div style={{ fontFamily: 'var(--heading)', fontSize: isMobile ? 32 : 40, fontWeight: 800, color: 'var(--teal)', letterSpacing: -2, lineHeight: 1 }}>
                <span ref={el => { statsRefs.current[i] = el }}>0</span>
              </div>
              <p style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}>{stat.label}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SKILLS.map(skill => (
            <span key={skill} style={{ fontSize: 9, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--teal)', background: 'rgba(0,194,168,0.06)', border: '1px solid rgba(0,194,168,0.15)', borderRadius: 0, padding: '5px 12px' }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div ref={photoRef} style={{ position: 'relative' }}>
        <DoubleBezelCard variant="ticket">
          <div style={{ borderRadius: 0, height: isMobile ? 320 : 480, position: 'relative', overflow: 'hidden' }}>
            <Image
              src="/images/luis-cruz-hero.webp"
              alt="Luis Cruz, diseñador y desarrollador web"
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover', objectPosition: 'top' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(0,194,168,0.25) 0%, transparent 35%, rgba(4,12,10,0.6) 100%)',
              mixBlendMode: 'overlay',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(rgba(0,194,168,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,168,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
          </div>
        </DoubleBezelCard>
      </div>
    </section>
  )
}
