// components/sections/Contact.tsx
'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import DoubleBezelCard from '@/components/ui/DoubleBezelCard'

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
    <section id="contacto" style={{ padding: '100px 40px 80px', position: 'relative', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ position: 'absolute', top: -1, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,194,168,0.4), transparent)' }} />

      <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(48px,9vw,120px)', lineHeight: 0.95, letterSpacing: -4, marginBottom: 48 }}>
        ¿Tienes<br />
        <span style={{ fontWeight: 400, color: 'var(--muted)' }}>un proyecto?</span><br />
        <span style={{ color: 'var(--teal)' }}>Hablemos.</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'start' }}>
        <div>
          {[['✉', 'pittuk@gmail.com'], ['📱', '+56 990 54 85 54'], ['📍', 'Talca, Chile']].map(([icon, text]) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>
              <span style={{ color: 'var(--teal)', fontSize: 14 }}>{icon}</span>{text}
            </div>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            {['LinkedIn', 'Behance', 'WhatsApp'].map(s => (
              <div key={s} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', padding: '8px 16px', fontSize: 9, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--muted)', cursor: 'pointer' }}>
                {s}
              </div>
            ))}
          </div>
        </div>

        <DoubleBezelCard>
          <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Honeypot — oculto */}
            <input type="text" {...register('honeypot')} style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

            {[
              { field: 'name' as const, placeholder: 'Tu nombre' },
              { field: 'email' as const, placeholder: 'Tu email' },
            ].map(({ field, placeholder }) => (
              <div key={field} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${errors[field] ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 12, padding: 2 }}>
                <div style={{ background: 'rgba(4,12,10,0.6)', borderRadius: 11 }}>
                  <input placeholder={placeholder} {...register(field)} style={inputStyle} />
                </div>
              </div>
            ))}

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 2 }}>
              <div style={{ background: 'rgba(4,12,10,0.6)', borderRadius: 11 }}>
                <select {...register('projectType')} style={{ ...inputStyle, appearance: 'none' }}>
                  <option value="">Tipo de proyecto</option>
                  {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 2 }}>
              <div style={{ background: 'rgba(4,12,10,0.6)', borderRadius: 11 }}>
                <textarea
                  placeholder="Cuéntame sobre tu proyecto..."
                  {...register('message')}
                  rows={4}
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>
            </div>

            <div style={{ background: 'rgba(0,194,168,0.1)', border: '1px solid rgba(0,194,168,0.2)', borderRadius: '100px', padding: 4 }}>
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  background: 'var(--teal)', color: 'var(--bg)', borderRadius: '100px',
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
