// components/ui/PrimaryButton.tsx
'use client'
import { ReactNode } from 'react'

const BUTTON_TICKET_CLIP_PATH = 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, calc(100% - 8px) 100%, 8px 100%, 0 100%, 0 0)'

interface PrimaryButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  icon?: string
}

export default function PrimaryButton({ children, onClick, href, icon = '↗' }: PrimaryButtonProps) {
  const inner = (
    <div
      style={{
        background: 'var(--teal)',
        color: 'var(--bg)',
        borderRadius: 0,
        clipPath: BUTTON_TICKET_CLIP_PATH,
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontFamily: 'var(--body)',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'transform 0.3s cubic-bezier(0.32,0.72,0,1)',
      }}
    >
      {children}
      <span style={{
        width: 28, height: 28,
        background: 'rgba(4,12,10,0.15)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13,
      }}>
        {icon}
      </span>
    </div>
  )

  const shell = (
    <div style={{
      background: 'rgba(0,194,168,0.06)',
      border: '1px solid rgba(0,194,168,0.15)',
      borderRadius: 0,
      clipPath: BUTTON_TICKET_CLIP_PATH,
      padding: '5px',
      display: 'inline-block',
    }}>
      {inner}
    </div>
  )

  if (href) return <a href={href} style={{ textDecoration: 'none' }}>{shell}</a>
  return <button onClick={onClick} style={{ background: 'none', border: 'none' }}>{shell}</button>
}
