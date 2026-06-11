// components/ui/DoubleBezelCard.tsx
import { ReactNode } from 'react'

interface DoubleBezelCardProps {
  children: ReactNode
  className?: string
  innerClassName?: string
  style?: React.CSSProperties
  variant?: 'rounded' | 'ticket'
}

const TICKET_CLIP_PATH = 'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)'
const SQRT_5000 = Math.sqrt(5000)

export default function DoubleBezelCard({
  children,
  className = '',
  innerClassName = '',
  style,
  variant = 'rounded'
}: DoubleBezelCardProps) {
  const isTicket = variant === 'ticket'

  return (
    <div
      className={className}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: isTicket ? '0px' : '24px',
        padding: '3px',
        position: 'relative',
        clipPath: isTicket ? TICKET_CLIP_PATH : undefined,
        ...style,
      }}
    >
      {isTicket && (
        <span
          style={{
            position: 'absolute',
            right: -2,
            top: 48,
            width: SQRT_5000,
            height: 1.5,
            background: 'rgba(255,255,255,0.08)',
            transform: 'rotate(45deg)',
            transformOrigin: 'top right',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      )}
      <div
        className={innerClassName}
        style={{
          background: 'var(--card-surface)',
          borderRadius: isTicket ? '0px' : '22px',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)',
          height: '100%',
          clipPath: isTicket ? TICKET_CLIP_PATH : undefined,
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  )
}
