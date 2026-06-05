// components/ui/DoubleBezelCard.tsx
import { ReactNode } from 'react'

interface DoubleBezelCardProps {
  children: ReactNode
  className?: string
  innerClassName?: string
  style?: React.CSSProperties
}

export default function DoubleBezelCard({ children, className = '', innerClassName = '', style }: DoubleBezelCardProps) {
  return (
    <div
      className={className}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '24px',
        padding: '3px',
        ...style,
      }}
    >
      <div
        className={innerClassName}
        style={{
          background: 'var(--card-surface)',
          borderRadius: '22px',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)',
          height: '100%',
        }}
      >
        {children}
      </div>
    </div>
  )
}
