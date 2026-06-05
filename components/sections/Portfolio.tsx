// components/sections/Portfolio.tsx
'use client'
import { useRef } from 'react'
import Link from 'next/link'
import ProjectCard from '@/components/project/ProjectCard'
import { useStaggerReveal } from '@/lib/animations/useScrollReveal'
import type { Project } from '@/types'

interface PortfolioProps {
  projects: Project[]
}

export default function Portfolio({ projects }: PortfolioProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  useStaggerReveal(gridRef, '.bento-item')

  // Show only 6 on homepage
  const preview = projects.slice(0, 6)
  const [feat, ...rest] = preview
  const smItems = rest.slice(0, 4)
  const wide = rest[4]

  return (
    <section id="portfolio" style={{ padding: '100px 40px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,194,168,0.3), transparent)' }} />

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}>
        <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(36px,5vw,68px)', letterSpacing: -2, lineHeight: 1 }}>
          Trabajo que<br /><span style={{ color: 'var(--teal)' }}>habla solo.</span>
        </h2>
        <Link href="/proyectos" style={{ fontSize: 11, color: 'var(--teal)', letterSpacing: 1, textDecoration: 'none', borderBottom: '1px solid rgba(0,194,168,0.3)', paddingBottom: 2, marginBottom: 8, whiteSpace: 'nowrap' }}>
          Ver todos los proyectos ({projects.length}) →
        </Link>
      </div>

      {/* Bento grid — 12 cols, alternating */}
      <div
        ref={gridRef}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 12 }}
      >
        {/* Row 1: grande izquierda | 2 pequeños derecha (stacked) */}
        {feat && (
          <div className="bento-item" style={{ gridColumn: 'span 8', opacity: 0 }}>
            <ProjectCard project={feat} style={{ minHeight: 340 }} />
          </div>
        )}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {smItems.slice(0, 2).map(p => (
            <div key={p._id} className="bento-item" style={{ flex: 1, opacity: 0 }}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>

        {/* Row 2: invertido — 2 pequeños izquierda (stacked) | grande derecha */}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {smItems.slice(2, 4).map(p => (
            <div key={p._id} className="bento-item" style={{ flex: 1, opacity: 0 }}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
        {wide && (
          <div className="bento-item" style={{ gridColumn: 'span 8', opacity: 0 }}>
            <ProjectCard project={wide} style={{ minHeight: 340 }} />
          </div>
        )}
      </div>

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Link href="/proyectos" style={{ fontSize: 11, color: 'var(--teal)', letterSpacing: 2, textDecoration: 'none', borderBottom: '1px solid rgba(0,194,168,0.3)', padding: '2px 0', textTransform: 'uppercase' }}>
          Ver todos los proyectos →
        </Link>
      </div>
    </section>
  )
}
