// components/layout/MobileDrawer.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ChevronDown, FolderKanban, Newspaper, User, Wrench, X, type LucideIcon } from 'lucide-react'

interface DrawerLink {
  href: string
  label: string
  children?: DrawerLink[]
}

interface MobileDrawerProps {
  open: boolean
  links: DrawerLink[]
  pathname: string
  onClose: () => void
}

const ICONS: Record<string, LucideIcon> = {
  '/#servicios': Wrench,
  '/#sobre-mi': User,
  '/proyectos': FolderKanban,
  '/blog': Newspaper,
}

const BUTTON_TICKET_CLIP_PATH = 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, calc(100% - 8px) 100%, 8px 100%, 0 100%, 0 0)'

export default function MobileDrawer({ open, links, pathname, onClose }: MobileDrawerProps) {
  const [expanded, setExpanded] = useState<string | null>(null)

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
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
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
          tabIndex={open ? 0 : -1}
          style={{
            position: 'absolute', top: 20, right: 16,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 0, padding: 6, cursor: 'pointer',
            display: 'flex', color: 'var(--white)',
          }}
        >
          <X size={16} />
        </button>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 0, marginBottom: 16, marginTop: 36,
        }}>
          <span style={{ position: 'relative', display: 'inline-block', width: 36, height: 36, flexShrink: 0 }}>
            <Image
              src="/images/logo/favicon.png"
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
          {links.map(({ href, label, children }) => {
            const Icon = ICONS[href]
            const active = pathname === href
            const isExpanded = expanded === href

            if (children) {
              return (
                <div key={href}>
                  <div style={{ display: 'flex', alignItems: 'stretch' }}>
                    <Link
                      href={href}
                      onClick={onClose}
                      tabIndex={open ? 0 : -1}
                      style={{
                        flex: 1, display: 'flex', alignItems: 'center', gap: 12,
                        padding: 12, borderRadius: 0,
                        fontSize: 14, fontWeight: 600, textDecoration: 'none',
                        color: active ? 'var(--teal)' : 'var(--white)',
                        background: active ? 'rgba(0,194,168,0.15)' : 'transparent',
                      }}
                    >
                      {Icon && <Icon size={18} />}
                      {label}
                    </Link>
                    <button
                      onClick={() => setExpanded(isExpanded ? null : href)}
                      aria-label={isExpanded ? `Ocultar ${label}` : `Mostrar ${label}`}
                      aria-expanded={isExpanded}
                      tabIndex={open ? 0 : -1}
                      style={{
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        padding: '12px 14px', color: 'var(--muted)', display: 'flex', alignItems: 'center',
                      }}
                    >
                      <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'none' }} />
                    </button>
                  </div>
                  {isExpanded && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingLeft: 20, marginTop: 2, marginBottom: 4 }}>
                      {children.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          tabIndex={open && isExpanded ? 0 : -1}
                          style={{
                            padding: '10px 12px', borderRadius: 0,
                            fontSize: 12, fontWeight: 500, textDecoration: 'none',
                            color: pathname === child.href ? 'var(--teal)' : 'var(--muted)',
                            background: pathname === child.href ? 'rgba(0,194,168,0.1)' : 'transparent',
                            borderLeft: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                tabIndex={open ? 0 : -1}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: 12, borderRadius: 0,
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
          tabIndex={open ? 0 : -1}
          style={{
            marginTop: 'auto',
            background: 'var(--orange)', color: '#fff',
            fontWeight: 700, borderRadius: 0,
            clipPath: BUTTON_TICKET_CLIP_PATH,
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
