// components/sections/Contact.tsx
'use client'
import { useState } from 'react'
import { useMediaQuery } from '@/lib/useMediaQuery'

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pittuk/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/PITTUK',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        {/* B */}
        <path d="M2 5.5h5.5c1 0 1.8.2 2.4.7.5.4.8 1 .8 1.8 0 .8-.3 1.4-.9 1.8.9.4 1.4 1.1 1.4 2.1 0 .9-.3 1.6-.9 2.1-.6.5-1.5.7-2.7.7H2V5.5zm2 3.5h3c.5 0 .9-.1 1.1-.3.2-.2.4-.5.4-.9s-.1-.6-.4-.8C7.9 6.8 7.5 6.7 7 6.7H4V9zm0 4.3h3.3c.5 0 .9-.1 1.2-.4.3-.2.4-.6.4-1 0-.4-.1-.8-.4-1-.3-.2-.7-.3-1.2-.3H4v2.7z"/>
        {/* top bar e */}
        <path d="M13.5 6.5h5.5v1.2h-5.5z"/>
        {/* e */}
        <path d="M16.2 10c-1.1 0-2 .4-2.6 1.1-.6.7-.9 1.7-.9 2.9 0 1.2.3 2.2.9 2.9.6.7 1.5 1.1 2.7 1.1.9 0 1.7-.2 2.3-.7.6-.4 1-.9 1.2-1.6h-1.9c-.3.6-.8.9-1.5.9-.5 0-.9-.1-1.2-.4-.3-.3-.5-.7-.6-1.3h5.4v-.5c0-1.3-.3-2.3-1-3-.6-.7-1.5-1-2.6-1v-.4zm-1.7 3c.1-.5.3-.9.6-1.2.3-.3.7-.4 1.1-.4s.8.1 1.1.4c.3.3.5.7.5 1.2h-3.3z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/p1ttuk/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/pittuk',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
      </svg>
    ),
  },
]
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import DoubleBezelCard from '@/components/ui/DoubleBezelCard'

const BUTTON_TICKET_CLIP_PATH = 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, calc(100% - 8px) 100%, 8px 100%, 0 100%, 0 0)'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  projectType: z.string().min(1),
  message: z.string().min(20),
  honeypot: z.string().max(0),
})
type FormData = z.infer<typeof schema>

const PROJECT_TYPES = ['Sitio WordPress', 'E-Commerce', 'UI/UX Design', 'Diseño Gráfico', 'Otro']

export default function Contact() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { honeypot: '' },
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(4,12,10,0.6)', border: 'none', outline: 'none',
    fontFamily: 'var(--body)', fontSize: 12, color: 'var(--white)', width: '100%',
    padding: '12px 16px',
  }

  return (
    <section id="contacto" className="section-padding" style={{ padding: isMobile ? '60px 20px' : '100px 40px 80px', position: 'relative', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ position: 'absolute', top: -1, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,194,168,0.4), transparent)' }} />

      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr', gap: isMobile ? 32 : 60, alignItems: 'start' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(36px,5vw,68px)', lineHeight: 0.95, letterSpacing: -3, marginBottom: 32 }}>
            ¿Tienes un <span style={{ color: 'var(--teal)' }}>proyecto?</span><br />
            <span style={{ fontWeight: 400, color: 'var(--muted)' }}>Hablemos<span style={{ color: 'var(--orange)' }}>.</span></span>
          </h2>

          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            {SOCIALS.map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.color = 'var(--teal)'
                  el.style.borderColor = 'rgba(0,194,168,0.35)'
                  el.style.background = 'rgba(0,194,168,0.06)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.color = 'var(--muted)'
                  el.style.borderColor = 'rgba(255,255,255,0.08)'
                  el.style.background = 'rgba(255,255,255,0.03)'
                }}
                style={{
                  width: 44, height: 44,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12,
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                  flexShrink: 0,
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <DoubleBezelCard variant="ticket">
          <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Honeypot — oculto */}
            <input type="text" {...register('honeypot')} style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

            {[
              { field: 'name' as const, placeholder: 'Tu nombre' },
              { field: 'email' as const, placeholder: 'Tu email' },
            ].map(({ field, placeholder }) => (
              <div key={field} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${errors[field] ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 0, padding: 2 }}>
                <div style={{ background: 'rgba(4,12,10,0.6)', borderRadius: 0 }}>
                  <input id={field} aria-label={placeholder} placeholder={placeholder} {...register(field)} style={inputStyle} />
                </div>
              </div>
            ))}

            <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${errors.projectType ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 0, padding: 2 }}>
              <div style={{ background: 'rgba(4,12,10,0.6)', borderRadius: 0 }}>
                <select id="projectType" aria-label="Tipo de proyecto" {...register('projectType')} style={{ ...inputStyle, appearance: 'none' }}>
                  <option value="">Tipo de proyecto</option>
                  {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${errors.message ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 0, padding: 2 }}>
              <div style={{ background: 'rgba(4,12,10,0.6)', borderRadius: 0 }}>
                <textarea
                  id="message"
                  aria-label="Cuéntame sobre tu proyecto"
                  placeholder="Cuéntame sobre tu proyecto..."
                  {...register('message')}
                  rows={4}
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>
            </div>

            <div style={{ background: 'rgba(0,194,168,0.1)', border: '1px solid rgba(0,194,168,0.2)', borderRadius: 0, clipPath: BUTTON_TICKET_CLIP_PATH, padding: 4 }}>
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  background: 'var(--teal)', color: 'var(--bg)', borderRadius: 0,
                  clipPath: BUTTON_TICKET_CLIP_PATH,
                  padding: '14px 24px', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', width: '100%',
                  fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700,
                  letterSpacing: 1.5, textTransform: 'uppercase', border: 'none', cursor: 'pointer',
                  opacity: status === 'loading' ? 0.7 : 1,
                }}
              >
                {status === 'loading' ? 'Enviando...' : status === 'success' ? '¡Mensaje enviado!' : 'Enviar mensaje'}
                <span style={{ width: 28, height: 28, background: 'rgba(4,12,10,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>↗</span>
              </button>
            </div>

            {status === 'error' && (
              <p style={{ fontSize: 11, color: 'rgba(255,80,80,0.8)', textAlign: 'center' }}>
                Error al enviar. Intenta de nuevo.
              </p>
            )}
          </form>
        </DoubleBezelCard>
      </div>
    </section>
  )
}
