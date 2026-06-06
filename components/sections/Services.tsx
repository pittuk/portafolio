'use client'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ServiceCard from '@/components/ui/ServiceCard'

const SERVICES = [
  { num: '01', name: 'Diseño & Desarrollo Web', desc: 'Sitios personalizados con las mejores tecnologías. Velocidad, SEO y conversión desde el primer pixel.', tags: ['WordPress', 'Elementor', 'React', 'PHP'] },
  { num: '02', name: 'E-Commerce WooCommerce', desc: 'Tiendas completas, integradas con pasarelas de pago, gestión de stock y optimizadas para vender.', tags: ['WooCommerce', 'Stripe'] },
  { num: '03', name: 'UI/UX Design', desc: 'Wireframes, prototipos interactivos y sistemas de diseño centrados en la experiencia del usuario real.', tags: ['Prototyping', 'User Research'] },
  { num: '04', name: 'SEO Técnico', desc: 'Optimización on-page, velocidad de carga, Core Web Vitals y estructura para posicionar mejor.', tags: ['Core Web Vitals', 'Schema'] },
  { num: '05', name: 'Hosting & Administración', desc: 'Gestión de servidores, cPanel, emails, backups y mantenimiento mensual sin preocupaciones.', tags: ['cPanel', 'VPS', 'DNS'] },
  { num: '06', name: 'Diseño Gráfico & Branding', desc: 'Identidad visual, banners, flyers, brochures y materiales de comunicación para tu marca.', tags: ['Photoshop', 'Illustrator'] },
]

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!gridRef.current) return

    const cards = Array.from(gridRef.current.querySelectorAll<HTMLElement>('.service-card'))
    const wave1 = cards.slice(0, 3)
    const wave2 = cards.slice(3, 6)
    const from = { rotateX: 8, y: 60, opacity: 0 }

    gsap.set(cards, { opacity: 0 })

    const makeTo = (extraDelay = 0) => ({
      rotateX: 0, y: 0, opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      delay: extraDelay,
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 75%',
        once: true,
      },
    })

    const anim1 = gsap.fromTo(wave1, from, makeTo())
    const anim2 = gsap.fromTo(wave2, from, makeTo(0.12))

    return () => {
      anim1.scrollTrigger?.kill()
      anim1.kill()
      anim2.scrollTrigger?.kill()
      anim2.kill()
    }
  }, [])

  return (
    <section
      id="servicios"
      style={{ padding: '120px 40px 100px', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,194,168,0.3), transparent)',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
        <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(36px,5vw,68px)', letterSpacing: -2, lineHeight: 1 }}>
          Soluciones web<br />que <span style={{ color: 'var(--teal)' }}>funcionan.</span>
        </h2>
        <span style={{ fontFamily: 'var(--heading)', fontSize: 80, fontWeight: 800, color: 'rgba(0,194,168,0.08)', letterSpacing: -3, lineHeight: 1 }}>06</span>
      </div>

      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto auto auto',
          gap: 16,
        }}
      >
        {SERVICES.map((svc, i) => {
          const isFeatured = i === 0
          const isWide = i === 5
          return (
            <div
              key={svc.num}
              className="service-card"
              style={{
                gridColumn: isFeatured ? '1 / 3' : isWide ? '1 / 4' : undefined,
                minHeight: isWide ? 100 : 220,
              }}
            >
              <ServiceCard
                num={svc.num}
                name={svc.name}
                desc={svc.desc}
                tags={svc.tags}
                variant={isFeatured ? 'featured' : isWide ? 'wide' : undefined}
                style={{ height: '100%' }}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
