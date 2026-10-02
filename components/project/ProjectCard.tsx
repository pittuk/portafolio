// components/project/ProjectCard.tsx
'use client'
import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  style?: React.CSSProperties
}

export default function ProjectCard({ project, style }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Efecto magnético con transición CSS (sin GSAP, para no cargarlo en servicios y /proyectos).
  // La flecha aparece por CSS: .project-card:hover .project-card-arrow en globals.css
  useEffect(() => {
    const card = cardRef.current!

    let bounds: DOMRect

    const onEnter = () => {
      bounds = card.getBoundingClientRect()
    }
    const onLeave = () => {
      card.style.transform = ''
    }
    const onMove = (e: MouseEvent) => {
      if (!bounds) return
      const x = ((e.clientX - bounds.left) / bounds.width - 0.5) * 8
      const y = ((e.clientY - bounds.top) / bounds.height - 0.5) * 8
      card.style.transform = `translate(${x}px, ${y}px)`
    }

    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mouseleave', onLeave)
    card.addEventListener('mousemove', onMove)

    return () => {
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mouseleave', onLeave)
      card.removeEventListener('mousemove', onMove)
    }
  }, [])

  const imageUrl = project.coverUrl
    ?? (project.coverImage
      ? urlFor(project.coverImage).width(800).height(500).url()
      : null)

  return (
    <Link href={`/proyectos/${project.slug.current}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div
        ref={cardRef}
        className="project-card"
        style={{
          position: 'relative',
          transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          clipPath: 'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)',
          height: '100%',
          minHeight: 200,
          ...style,
        }}
      >
        {/* Background image or placeholder */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(145deg, #0a2a20, #041510)',
            backgroundImage: 'linear-gradient(rgba(0,194,168,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,168,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        )}

        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 30%, rgba(4,12,10,0.97) 100%)',
          zIndex: 1,
        }} />

        {/* Info */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, zIndex: 2 }}>
          <p style={{ fontSize: 8, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 4 }}>
            {project.category?.join(' · ')}
          </p>
          <h3 style={{ fontFamily: 'var(--heading)', fontSize: 14, fontWeight: 700, color: 'var(--white)', letterSpacing: -0.2 }}>
            {project.title}
          </h3>
        </div>

        {/* Arrow badge */}
        <div
          className="project-card-arrow"
          style={{
            position: 'absolute', top: 16, right: 16, zIndex: 3,
            width: 36, height: 36,
            background: 'rgba(0,194,168,0.1)', border: '1px solid rgba(0,194,168,0.2)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, color: 'var(--teal)',
          }}
        >↗</div>
      </div>
    </Link>
  )
}
