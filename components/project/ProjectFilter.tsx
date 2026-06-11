'use client'
import { useState } from 'react'
import Link from 'next/link'
import ProjectCard from './ProjectCard'
import type { Project } from '@/types'
import { useMediaQuery } from '@/lib/useMediaQuery'

const CATEGORIES = [
  { key: 'all', label: 'Todos' },
  { key: 'WordPress', label: 'WordPress' },
  { key: 'E-commerce', label: 'E-commerce' },
  { key: 'Desarrollo Web', label: 'Desarrollo Web' },
  { key: 'Diseño Gráfico', label: 'Diseño Gráfico' },
  { key: 'Redes Sociales', label: 'Redes Sociales' },
  { key: 'Flyers', label: 'Flyers' },
]

interface Props {
  projects: Project[]
}

export default function ProjectFilter({ projects }: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? projects
    : projects.filter(p => p.category?.includes(active))

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: isMobile ? 24 : 48 }}>
        <h1 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(36px,10vw,96px)', letterSpacing: -3, lineHeight: 1 }}>
          Todos los<br /><span style={{ color: 'var(--teal)' }}>proyectos</span><span style={{ color: 'var(--orange)' }}>.</span>
        </h1>
        <Link href="/" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: 1, textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 2, marginBottom: 8, whiteSpace: 'nowrap' }}>
          ← Volver
        </Link>
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
        {CATEGORIES.map(c => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            style={{
              background: active === c.key ? 'var(--teal)' : 'rgba(255,255,255,0.04)',
              color: active === c.key ? 'var(--bg)' : 'var(--muted)',
              border: active === c.key ? 'none' : '1px solid rgba(255,255,255,0.06)',
              borderRadius: 0,
              padding: '8px 20px',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 1,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16 }}>
            No hay proyectos en esta categoría.
          </p>
        </div>
      ) : (
        <div className="project-filter-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))', gap: isMobile ? 12 : 16 }}>
          {filtered.map(p => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      )}
    </>
  )
}
