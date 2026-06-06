'use client'
import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from '@/components/project/ProjectCard'
import type { Project } from '@/types'

interface PortfolioProps {
  projects: Project[]
}

export default function Portfolio({ projects }: PortfolioProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const getScrollDist = () =>
        Math.max(0, track.scrollWidth - window.innerWidth)

      const mainAnim = gsap.to(track, {
        x: () => -(getScrollDist()),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,
          start: 'top top',
          end: () => `+=${getScrollDist()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleX: self.progress })
            }
          },
        },
      })

      // Per-card entrance as each slides into view
      const cards = Array.from(track.querySelectorAll<HTMLElement>('.h-card'))
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: 50, rotateY: 8 },
          {
            opacity: 1, x: 0, rotateY: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: mainAnim,
              start: 'left 92%',
              end: 'left 45%',
              scrub: 0.8,
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const preview = projects.slice(0, 6)

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}
    >
      {/* Top separator */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 2,
        background: 'linear-gradient(90deg, transparent, rgba(0,194,168,0.3), transparent)',
      }} />

      {/* Header — floats above the scrolling track */}
      <div style={{
        position: 'absolute', top: 40, left: 40, right: 40,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        zIndex: 3, pointerEvents: 'none',
      }}>
        <h2 style={{
          fontFamily: 'var(--heading)', fontWeight: 800,
          fontSize: 'clamp(36px,5vw,68px)', letterSpacing: -2, lineHeight: 1,
        }}>
          Trabajo que<br /><span style={{ color: 'var(--teal)' }}>habla solo.</span>
        </h2>
        <Link href="/proyectos" style={{
          fontSize: 11, color: 'var(--teal)', letterSpacing: 1,
          textDecoration: 'none', borderBottom: '1px solid rgba(0,194,168,0.3)',
          paddingBottom: 2, pointerEvents: 'all', whiteSpace: 'nowrap',
        }}>
          Ver todos ({projects.length}) →
        </Link>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: 20,
          height: '100%',
          paddingLeft: 40,
          paddingRight: 80,
          paddingTop: 160,
          paddingBottom: 48,
          willChange: 'transform',
        }}
      >
        {preview.map(project => (
          <div
            key={project._id}
            className="h-card"
            style={{ flex: '0 0 auto', width: 'clamp(340px, 36vw, 560px)' }}
          >
            <ProjectCard project={project} style={{ height: '100%' }} />
          </div>
        ))}

        {/* CTA card */}
        <Link
          href="/proyectos"
          className="h-card"
          style={{
            flex: '0 0 auto', width: 200,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(0,194,168,0.12)',
            borderRadius: 20, textDecoration: 'none', gap: 12,
            color: 'var(--teal)', background: 'rgba(0,194,168,0.02)',
          }}
        >
          <span style={{ fontFamily: 'var(--heading)', fontSize: 40, fontWeight: 800, lineHeight: 1 }}>→</span>
          <span style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase' }}>Ver todos</span>
          <span style={{ fontSize: 9, letterSpacing: 1, opacity: 0.5 }}>{projects.length} proyectos</span>
        </Link>
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
        background: 'rgba(255,255,255,0.04)', zIndex: 2,
      }}>
        <div
          ref={progressRef}
          style={{
            height: '100%', background: 'var(--teal)',
            transformOrigin: 'left center', transform: 'scaleX(0)',
          }}
        />
      </div>
    </section>
  )
}
