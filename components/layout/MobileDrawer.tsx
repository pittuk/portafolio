// components/layout/MobileDrawer.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Briefcase, FolderKanban, User, Wrench, X, type LucideIcon } from 'lucide-react'

interface DrawerLink {
  href: string
  label: string
}

interface MobileDrawerProps {
  open: boolean
  links: DrawerLink[]
  pathname: string
  onClose: () => void
}

const ICONS: Record<string, LucideIcon> = {
  '/#portfolio': Briefcase,
  '/#servicios': Wrench,
  '/#sobre-mi': User,
  '/proyectos': FolderKanban,
}

export default function MobileDrawer({ open, links, pathname, onClose }: MobileDrawerProps) {
  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 101,
          background: 'rgba(4,12,10,0.6)',
          backdropFilter: 'blur(4px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />
      <div
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 102,
          width: 'min(300px, 82vw)',
          background: '#0a1411',
          borderRight: '1px solid var(--hairline)',
          boxShadow: '20px 0 60px rgba(0,0,0,0.4)',
          display: 'flex', flexDirection: 'column',
          padding: '24px 20px',
          gap: 8,
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s ease',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar menú"
          style={{
            position: 'absolute', top: 20, right: 16,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10, padding: 6, cursor: 'pointer',
            display: 'flex', color: 'var(--white)',
          }}
        >
          <X size={16} />
        </button>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14, marginBottom: 16, marginTop: 36,
        }}>
          <span style={{ position: 'relative', display: 'inline-block', width: 36, height: 36, flexShrink: 0 }}>
            <Image
              src="/images/logo/logo letra blanca.png"
              alt="Luis Cruz"
              fill
              sizes="36px"
              style={{ objectFit: 'contain' }}
            />
          </span>
          <div>
            <div style={{ fontFamily: 'var(--heading)', fontWeight: 700, fontSize: 13, color: 'var(--white)' }}>
              Luis Cruz
            </div>
            <div style={{ fontSize: 10, color: 'var(--muted)' }}>
              Diseñador & Dev WordPress
            </div>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map(({ href, label }) => {
            const Icon = ICONS[href]
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: 12, borderRadius: 12,
                  fontSize: 14, fontWeight: 600, textDecoration: 'none',
                  color: active ? 'var(--teal)' : 'var(--white)',
                  background: active ? 'rgba(0,194,168,0.15)' : 'transparent',
                }}
              >
                {Icon && <Icon size={18} />}
                {label}
              </Link>
            )
          })}
        </nav>

        <Link
          href="/#contacto"
          onClick={onClose}
          style={{
            marginTop: 'auto',
            background: 'var(--orange)', color: '#fff',
            fontWeight: 700, borderRadius: '100px',
            padding: '14px 28px', fontSize: 11,
            letterSpacing: '2px', textTransform: 'uppercase',
            textDecoration: 'none', textAlign: 'center',
          }}
        >
          Hablemos
        </Link>
      </div>
    </>
  )
}
