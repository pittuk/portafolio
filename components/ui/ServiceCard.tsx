'use client'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface ServiceCardProps {
  num: string
  name: string
  desc: string
  tags: string[]
  variant?: 'featured' | 'wide'
  style?: React.CSSProperties
}

export default function ServiceCard({ num, name, desc, tags, variant, style }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    return () => {
      gsap.killTweensOf([
        cardRef.current,
        borderRef.current,
        gradientRef.current,
        numRef.current,
      ])
    }
  }, [])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)

    gsap.to(card, {
      rotateY: nx * 10,
      rotateX: -ny * 10,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    const gradient = gradientRef.current
    if (gradient) {
      gradient.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
      gradient.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
    }
  }

  function handleMouseEnter() {
    gsap.to(gradientRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
    gsap.to(borderRef.current, { borderColor: 'rgba(0,194,168,0.30)', duration: 0.3, overwrite: 'auto' })
    gsap.to(numRef.current, {
      scale: 1.3,
      opacity: 1,
      textShadow: '0 0 12px rgba(0,194,168,0.5)',
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  function handleMouseLeave() {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: 'auto',
    })
    gsap.to(gradientRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
    gsap.to(borderRef.current, { borderColor: 'rgba(255,255,255,0.06)', duration: 0.4, overwrite: 'auto' })
    gsap.to(numRef.current, {
      scale: 1,
      opacity: 0.6,
      textShadow: '0 0 0px rgba(0,194,168,0)',
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  const isFeatured = variant === 'featured'
  const isWide = variant === 'wide'

  return (
    <div style={{ perspective: '800px', height: '100%', ...style }}>
      <div
        ref={cardRef}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform', height: '100%' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={borderRef}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '24px',
            padding: '3px',
            height: '100%',
          }}
        >
          <div
            style={{
              background: 'var(--card-surface)',
              borderRadius: '22px',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              ref={gradientRef}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '22px',
                opacity: 0,
                pointerEvents: 'none',
                background: 'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(0,194,168,0.10) 0%, transparent 70%)',
                zIndex: 0,
              } as React.CSSProperties}
            />

            {/* Wide layout — horizontal */}
            {isWide ? (
              <div style={{
                padding: '32px 40px',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 48,
                position: 'relative',
                zIndex: 1,
              }}>
                <div style={{ flex: '0 0 auto', minWidth: 220 }}>
                  <p
                    ref={numRef}
                    style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', letterSpacing: 3, marginBottom: 12, opacity: 0.6, transformOrigin: 'left center' }}
                  >
                    {num}
                  </p>
                  <h3 style={{ fontFamily: 'var(--heading)', fontSize: 20, fontWeight: 700, color: 'var(--white)', letterSpacing: -0.3, lineHeight: 1.2, marginBottom: 16 }}>
                    {name}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {tags.map(tag => (
                      <span key={tag} style={{ fontSize: 8, letterSpacing: 1, color: 'rgba(0,194,168,0.7)', background: 'rgba(0,194,168,0.06)', border: '1px solid rgba(0,194,168,0.12)', borderRadius: '100px', padding: '3px 10px' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(255,255,255,0.06)', margin: '8px 0' }} />
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.9, flex: 1 }}>
                  {desc}
                </p>
              </div>
            ) : (
              /* Featured & default — vertical */
              <div style={{
                padding: isFeatured ? '36px 32px' : '28px 24px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                zIndex: 1,
              }}>
                {/* Decorative background number for featured card */}
                {isFeatured && (
                  <div style={{
                    position: 'absolute', top: 16, right: 24,
                    fontFamily: 'var(--heading)', fontSize: 110, fontWeight: 800,
                    color: 'rgba(0,194,168,0.04)', lineHeight: 1, letterSpacing: -8,
                    pointerEvents: 'none', userSelect: 'none', zIndex: 0,
                  }}>
                    {num}
                  </div>
                )}
                <p
                  ref={numRef}
                  style={{
                    fontSize: isFeatured ? 12 : 11,
                    fontWeight: 700,
                    color: 'var(--teal)',
                    letterSpacing: 3,
                    marginBottom: isFeatured ? 24 : 20,
                    opacity: 0.6,
                    transformOrigin: 'left center',
                  }}
                >
                  {num}
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--heading)',
                    fontSize: isFeatured ? 28 : 18,
                    fontWeight: 700,
                    color: 'var(--white)',
                    marginBottom: isFeatured ? 16 : 10,
                    letterSpacing: isFeatured ? -0.8 : -0.3,
                    lineHeight: 1.15,
                  }}
                >
                  {name}
                </h3>
                <p style={{ fontSize: isFeatured ? 13 : 12, color: 'var(--muted)', lineHeight: 1.85, flex: 1 }}>
                  {desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
                  {tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 8, letterSpacing: 1, color: 'rgba(0,194,168,0.7)',
                        background: 'rgba(0,194,168,0.06)', border: '1px solid rgba(0,194,168,0.12)',
                        borderRadius: '100px', padding: '3px 10px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
