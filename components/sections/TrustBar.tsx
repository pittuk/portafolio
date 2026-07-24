'use client'
import Image from 'next/image'

const LOGOS = [
  { file: 'logo-cablepar.png', alt: 'Cablepar' },
  { file: 'Logo-cruiser-tech.svg', alt: 'Cruiser-Tech' },
  { file: 'logo-varitylabs.png', alt: 'Varity Labs' },
  { file: 'logo aqualife pools.svg', alt: 'Aqua Life Pool' },
  { file: 'logo-publinsite.png', alt: 'Publinsite' },
  { file: 'logo-educationusa.png', alt: 'EducationUSA' },
  { file: 'Logo-Alvarandy.png', alt: 'Alvarandy' },
  { file: 'Logo ikon edition.svg', alt: 'Ikon Edition' },
]

// Duplicated so the track can loop seamlessly: translateX(-50%) lands exactly
// back on the first copy with no visible seam or reset jump.
const TRACK = [...LOGOS, ...LOGOS]

export default function TrustBar() {
  return (
    <section style={{ padding: '48px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
      <p style={{ textAlign: 'center', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 28 }}>
        Empresas que confiaron en mi trabajo
      </p>
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <div
          className="animate-trustbar-scroll"
          style={{
            display: 'flex', alignItems: 'center', gap: 64,
            width: 'max-content',
          }}
        >
          {TRACK.map((logo, i) => (
            <div
              key={`${logo.file}-${i}`}
              style={{
                position: 'relative', width: 120, height: 40, flexShrink: 0,
                opacity: 0.55, filter: 'grayscale(1)',
                transition: 'opacity 0.2s, filter 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.filter = 'grayscale(0)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.filter = 'grayscale(1)' }}
            >
              <Image
                src={encodeURI(`/images/logo-clientes/${logo.file}`)}
                alt={logo.alt}
                fill
                loading="lazy"
                unoptimized={logo.file.endsWith('.svg')}
                sizes="120px"
                style={{ objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
