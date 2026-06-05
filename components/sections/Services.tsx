// components/sections/Services.tsx
'use client'
import { useRef } from 'react'
import DoubleBezelCard from '@/components/ui/DoubleBezelCard'
import { useStaggerReveal } from '@/lib/animations/useScrollReveal'

const SERVICES = [
  { num: '01', name: 'Diseño & Desarrollo WordPress', desc: 'Sitios personalizados con Elementor & Divi. Velocidad, SEO y conversión desde el primer pixel.', tags: ['Elementor', 'Divi', 'PHP'] },
  { num: '02', name: 'E-Commerce WooCommerce', desc: 'Tiendas completas, integradas con pasarelas de pago, gestión de stock y optimizadas para vender.', tags: ['WooCommerce', 'Stripe'] },
  { num: '03', name: 'UI/UX Design en Figma', desc: 'Wireframes, prototipos y sistemas de diseño centrados en la experiencia del usuario real.', tags: ['Figma', 'Prototyping'] },
  { num: '04', name: 'SEO Técnico', desc: 'Optimización on-page, velocidad de carga, Core Web Vitals y estructura para posicionar mejor.', tags: ['Core Web Vitals', 'Schema'] },
  { num: '05', name: 'Hosting & Administración', desc: 'Gestión de servidores, cPanel, emails, backups y mantenimiento mensual sin preocupaciones.', tags: ['cPanel', 'VPS', 'DNS'] },
  { num: '06', name: 'Diseño Gráfico & Branding', desc: 'Identidad visual, banners, flyers, brochures y materiales de comunicación para tu marca.', tags: ['Photoshop', 'Illustrator'] },
]

const Z_OFFSETS: Record<number, number> = { 1: 24, 2: -12, 4: 16 }

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null)
  useStaggerReveal(gridRef, '.service-card')

  return (
    <section
      id="servicios"
      style={{ padding: '120px 40px 100px', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,194,168,0.3), transparent)' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
        <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(36px,5vw,68px)', letterSpacing: -2, lineHeight: 1 }}>
          Soluciones web<br />que <span style={{ color: 'var(--teal)' }}>funcionan.</span>
        </h2>
        <span style={{ fontFamily: 'var(--heading)', fontSize: 80, fontWeight: 800, color: 'rgba(0,194,168,0.08)', letterSpacing: -3, lineHeight: 1 }}>06</span>
      </div>

      <div
        ref={gridRef}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
      >
        {SERVICES.map((svc, i) => (
          <div
            key={svc.num}
            className="service-card"
            style={{ transform: `translateY(${Z_OFFSETS[i] ?? 0}px)`, opacity: 0 }}
          >
            <DoubleBezelCard style={{ height: '100%' }}>
              <div style={{ padding: '28px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', letterSpacing: 3, marginBottom: 20, opacity: 0.6 }}>{svc.num}</p>
                <h3 style={{ fontFamily: 'var(--heading)', fontSize: 18, fontWeight: 700, color: 'var(--white)', marginBottom: 10, letterSpacing: -0.3, lineHeight: 1.2 }}>{svc.name}</h3>
                <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.8, flex: 1 }}>{svc.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
                  {svc.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 8, letterSpacing: 1, color: 'rgba(0,194,168,0.7)', background: 'rgba(0,194,168,0.06)', border: '1px solid rgba(0,194,168,0.12)', borderRadius: '100px', padding: '3px 10px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </DoubleBezelCard>
          </div>
        ))}
      </div>
    </section>
  )
}
