// components/layout/FloatingCTA.tsx
'use client'
import { useEffect, useState } from 'react'

const WHATSAPP_URL = 'https://wa.me/56967093146?text=' + encodeURIComponent('Hola Luis, quiero conversar sobre un proyecto.')

export default function FloatingCTA() {
  const [wink, setWink] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const winkTimer = setTimeout(() => {
      setWink(true)
      setShowTooltip(true)
      setTimeout(() => setWink(false), 700)
    }, 4000)
    const hideTimer = setTimeout(() => setShowTooltip(false), 11000)
    return () => { clearTimeout(winkTimer); clearTimeout(hideTimer) }
  }, [])

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 100, display: 'flex', alignItems: 'center', gap: 12 }}>
      {(showTooltip || hovered) && (
        <div
          className="animate-tooltip-in"
          style={{
            position: 'relative',
            background: '#fff', color: '#111',
            padding: '10px 14px', borderRadius: 10,
            fontSize: 12, fontWeight: 600, lineHeight: 1.4,
            maxWidth: 190,
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
        >
          ¿Tienes un proyecto? ¡Escríbeme! 👋
          <span style={{
            position: 'absolute', right: -6, bottom: 16,
            width: 0, height: 0,
            borderTop: '6px solid transparent', borderBottom: '6px solid transparent',
            borderLeft: '6px solid #fff',
          }} />
        </div>
      )}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribime por WhatsApp"
        className={wink ? 'animate-wa-wink' : ''}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
          background: '#25D366', color: '#fff',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        }}
      >
        <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden="true">
          <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.24.62 4.42 1.8 6.33L4 29l7.86-1.75A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm6.98 16.68c-.3.83-1.5 1.53-2.44 1.73-.65.14-1.5.25-4.34-.93-3.65-1.5-6-5.2-6.18-5.44-.18-.24-1.47-1.96-1.47-3.74s.92-2.65 1.25-3.02c.3-.33.66-.4.88-.4.22 0 .44.002.63.01.2.01.47-.08.74.56.3.7.98 2.4 1.06 2.58.08.18.14.4.03.64-.11.24-.17.4-.34.6-.17.2-.36.45-.51.6-.17.17-.34.35-.15.68.19.34.86 1.42 1.85 2.3 1.27 1.13 2.34 1.48 2.68 1.65.34.17.53.14.73-.08.2-.22.85-.99 1.08-1.33.23-.34.46-.28.77-.17.31.11 1.98.93 2.32 1.1.34.17.56.25.65.4.09.14.09.83-.21 1.66Z" />
        </svg>
      </a>
    </div>
  )
}
