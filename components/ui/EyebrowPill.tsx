// components/ui/EyebrowPill.tsx
interface EyebrowPillProps {
  children: React.ReactNode
  className?: string
}

export default function EyebrowPill({ children, className = '' }: EyebrowPillProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 w-fit ${className}`}
      style={{
        background: 'rgba(0,194,168,0.08)',
        border: '1px solid rgba(0,194,168,0.2)',
        borderRadius: 0,
        padding: '5px 14px',
        fontSize: '9px',
        fontWeight: 600,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--teal)',
      }}
    >
      <span style={{ width: 5, height: 5, background: 'var(--teal)', borderRadius: '50%', flexShrink: 0, display: 'block' }} />
      {children}
    </div>
  )
}
