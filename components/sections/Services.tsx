'use client'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ServiceStaggerCards from '@/components/ui/ServiceStaggerCards'
import { useMediaQuery } from '@/lib/useMediaQuery'

const SERVICES = [
  { num: '01', name: 'Diseño & Desarrollo Web', desc: 'Sitios personalizados con las mejores tecnologías. Velocidad, SEO y conversión desde el primer pixel.', tags: ['WordPress', 'Elementor', 'React', 'PHP'] },
  { num: '02', name: 'E-Commerce WooCommerce', desc: 'Tiendas completas, integradas con pasarelas de pago, gestión de stock y optimizadas para vender.', tags: ['WooCommerce', 'Stripe'] },
  { num: '03', name: 'UI/UX Design', desc: 'Wireframes, prototipos interactivos y sistemas de diseño centrados en la experiencia del usuario real.', tags: ['Prototyping', 'User Research'] },
  { num: '04', name: 'SEO Técnico', desc: 'Optimización on-page, velocidad de carga, Core Web Vitals y estructura para posicionar mejor.', tags: ['Core Web Vitals', 'Schema'] },
  { num: '05', name: 'Hosting & Administración', desc: 'Gestión de servidores, cPanel, emails, backups y mantenimiento mensual sin preocupaciones.', tags: ['cPanel', 'VPS', 'DNS'] },
  { num: '06', name: 'Diseño Gráfico & Branding', desc: 'Identidad visual, banners, flyers, brochures y materiales de comunicación para tu marca.', tags: ['Photoshop', 'Illustrator'] },
]

export default function Services() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!carouselRef.current) return

    const anim = gsap.fromTo(
      carouselRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    )

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])

  return (
    <section
      id="servicios"
      className="section-padding"
      style={{ padding: isMobile ? '80px 20px 60px' : '120px 40px 100px', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,194,168,0.3), transparent)',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: isMobile ? 40 : 64 }}>
        <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(36px,5vw,68px)', letterSpacing: -2, lineHeight: 1 }}>
          Soluciones web<br />que <span style={{ color: 'var(--teal)' }}>funcionan</span><span style={{ color: 'var(--orange)' }}>.</span>
        </h2>
        {!isMobile && <span style={{ fontFamily: 'var(--heading)', fontSize: 80, fontWeight: 800, color: 'rgba(0,194,168,0.08)', letterSpacing: -3, lineHeight: 1 }}>06</span>}
      </div>

      <div ref={carouselRef}>
        <ServiceStaggerCards services={SERVICES} />
      </div>
    </section>
  )
}
