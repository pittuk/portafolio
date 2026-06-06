'use client'
import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DoubleBezelCard from '@/components/ui/DoubleBezelCard'

const SKILLS = ['WordPress', 'Elementor', 'Divi', 'HTML/CSS', 'JavaScript', 'WooCommerce', 'MySQL', 'cPanel', 'Photoshop', 'Illustrator', 'SQL']
const STATS = [{ num: 10, suffix: '+', label: 'Años exp.' }, { num: 50, suffix: '+', label: 'Proyectos' }, { num: 100, suffix: '%', label: 'Compromiso' }]

export default function About() {
  const statsRefs = useRef<(HTMLSpanElement | null)[]>([])
  const photoRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hoverRef = useRef(false)
  const rafRef = useRef(0)

  const drawNoise = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    const imageData = ctx.createImageData(w, h)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255
      data[i] = v
      data[i + 1] = v
      data[i + 2] = v
      data[i + 3] = 30 + Math.random() * 40
    }

    ctx.putImageData(imageData, 0, 0)

    if (hoverRef.current) {
      rafRef.current = requestAnimationFrame(drawNoise)
    }
  }, [])

  const startNoise = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    canvas.width = parent.offsetWidth
    canvas.height = parent.offsetHeight
    hoverRef.current = true
    rafRef.current = requestAnimationFrame(drawNoise)

    gsap.to(canvas, { opacity: 1, duration: 0.2 })
  }

  const stopNoise = () => {
    hoverRef.current = false
    cancelAnimationFrame(rafRef.current)

    gsap.to(canvasRef.current, { opacity: 0, duration: 0.3 })
  }

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
      cancelAnimationFrame(rafRef.current)
    }
  }, [drawNoise])

  return (
    <section id="sobre-mi" style={{ padding: '100px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
      <div>
        <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(40px,6vw,80px)', lineHeight: 0.95, letterSpacing: -3, marginBottom: 24 }}>
          Luis<br />Cruz<span style={{ color: 'var(--orange)' }}>.</span>
        </h2>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 2, marginBottom: 32 }}>
          Mi trayectoria comenzó como diseñador gráfico, donde adquirí una base sólida en comunicación visual y creatividad. Luego migré al mundo digital especializándome en maquetación web con HTML y CSS, hasta llegar a WordPress, donde hoy construyo sitios completos con Elementor y Divi. Combino diseño estratégico, experiencia de usuario y desarrollo técnico para crear soluciones digitales eficientes y escalables que aportan crecimiento real a cada proyecto.
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
          <div
            style={{ borderRadius: 22, height: 480, position: 'relative', overflow: 'hidden', cursor: 'none' }}
            onMouseEnter={startNoise}
            onMouseLeave={stopNoise}
          >
            <Image
              src="/images/Luis Cruz.png"
              alt="Luis Cruz"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              sizes="(max-width: 768px) 100vw, 50vw"
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
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                opacity: 0, pointerEvents: 'none',
                mixBlendMode: 'screen',
              }}
            />
          </div>
        </DoubleBezelCard>
      </div>
    </section>
  )
}
