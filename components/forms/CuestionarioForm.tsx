'use client'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import gsap from 'gsap'
import {
  cuestionarioSchema, type CuestionarioData,
  PROJECT_TYPES, YES_NO_UNSURE, LOGO_OPTIONS, COPY_OPTIONS, IMAGES_OPTIONS, MAINTENANCE_OPTIONS,
  SECTION_OPTIONS, FEATURE_OPTIONS, STYLE_OPTIONS, WEBSITE_OBJECTIVES, TONE_PREFERENCE, TYPOGRAPHY_STYLE,
  MAX_ATTACHMENT_BYTES,
} from '@/lib/cuestionario/schema'

const STORAGE_KEY = 'cuestionario-draft'
const STEP_KEY = 'cuestionario-draft-step'
const BUTTON_TICKET_CLIP_PATH = 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, calc(100% - 8px) 100%, 8px 100%, 0 100%, 0 0)'
const MAX_ATTACHMENT_MB = MAX_ATTACHMENT_BYTES / (1024 * 1024)

const STEP_TITLES = [
  'Datos generales', 'ADN de marca', 'Objetivos', 'Estructura y funcionalidades', 'Contenido',
  'Diseño y estilo — Colores y tipografía', 'Diseño y estilo — Referencias y competencia',
  'Aspectos técnicos', 'Logística',
]

const STEP_FIELDS: (keyof CuestionarioData)[][] = [
  ['name', 'company', 'email', 'phone', 'industry', 'projectType'],
  ['personalityDescription', 'coreValues', 'valueProposition', 'languages'],
  ['mainGoal', 'targetAudience', 'websiteObjective', 'mainCTA', 'secondaryCTA'],
  ['pagesEstimate', 'sections', 'features', 'hasDomain', 'domainName', 'hasHosting'],
  ['hasLogo', 'hasCopy', 'hasImages', 'brandManualLink', 'brandManualFile'],
  ['colorPalette', 'colorsToAvoid', 'tonePreference', 'fonts', 'typographyStyle', 'stylePreferences'],
  ['ref1Url', 'ref1Notes', 'ref2Url', 'ref2Notes', 'ref3Url', 'ref3Notes', 'dislikedSites', 'comp1Url', 'comp1Notes', 'comp2Url', 'comp2Notes', 'comp3Url', 'comp3Notes'],
  ['needsSEO', 'keywords', 'wantsMaintenance'],
  ['deadline', 'decisionMaker', 'additionalNotes'],
]

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 10, fontWeight: 600, color: 'var(--muted)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }
const hintStyle: React.CSSProperties = { fontSize: 11, color: 'rgba(240,237,232,0.35)', marginTop: 6 }
const inputStyle: React.CSSProperties = {
  background: 'rgba(4,12,10,0.6)', border: 'none', outline: 'none',
  fontFamily: 'var(--body)', fontSize: 13, color: 'var(--white)', width: '100%', padding: '12px 16px',
}
const selectStyle: React.CSSProperties = { ...inputStyle, appearance: 'none' }

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve((reader.result as string).split(',')[1] ?? '')
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function FieldWrap({ error, children }: { error?: boolean; children: ReactNode }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${error ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.06)'}`, padding: 2 }}>
      <div style={{ background: 'rgba(4,12,10,0.6)' }}>{children}</div>
    </div>
  )
}

function Field({ label, required, error, hint, children }: { label: string; required?: boolean; error?: boolean; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}{required && ' *'}</label>
      <FieldWrap error={error}>{children}</FieldWrap>
      {hint && <p style={hintStyle}>{hint}</p>}
    </div>
  )
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase',
        color: active ? 'var(--bg)' : 'var(--muted)',
        background: active ? 'var(--teal)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${active ? 'var(--teal)' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: 0, padding: '8px 14px', cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}

function ChipGroup({ options, value, onChange }: { options: string[]; value: string[]; onChange: (v: string[]) => void }) {
  const toggle = (opt: string) => {
    onChange(value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt])
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map(opt => (
        <Chip key={opt} label={opt} active={value.includes(opt)} onClick={() => toggle(opt)} />
      ))}
    </div>
  )
}

function Slide({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', letterSpacing: 3, marginBottom: 8 }}>{`PASO ${n} DE ${STEP_TITLES.length}`}</p>
      <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(26px,4vw,38px)', letterSpacing: -1, color: 'var(--white)', marginBottom: 28 }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </div>
  )
}

export default function CuestionarioForm() {
  const searchParams = useSearchParams()
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [fileName, setFileName] = useState('')
  const [fileError, setFileError] = useState('')
  const slideRef = useRef<HTMLDivElement>(null)
  const {
    register, handleSubmit, watch, reset, setValue, getValues, trigger,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<CuestionarioData>({
    resolver: zodResolver(cuestionarioSchema),
    defaultValues: {
      sections: [], features: [], stylePreferences: [], honeypot: '',
    },
  })

  useEffect(() => {
    // STEP_KEY only ever gets written once the user clicks "Comenzar" — its
    // presence (not just STORAGE_KEY's) is what tells us a session is in
    // progress, so a fresh visit always shows the welcome screen.
    const savedStep = typeof window !== 'undefined' ? localStorage.getItem(STEP_KEY) : null
    if (savedStep !== null) {
      const draft = localStorage.getItem(STORAGE_KEY)
      if (draft) {
        try { reset(JSON.parse(draft)) } catch { /* ignore corrupt draft */ }
      }
      setStep(Number(savedStep) || 0)
      setStarted(true)
      return
    }
    const nombre = searchParams.get('nombre')
    if (nombre) setValue('name', nombre)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!started) return
    const sub = watch(values => {
      const { brandManualFile: _omit, ...rest } = values
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(rest)) } catch { /* storage full, skip */ }
    })
    return () => sub.unsubscribe()
  }, [watch, started])

  useEffect(() => {
    if (started) localStorage.setItem(STEP_KEY, String(step))
  }, [step, started])

  useEffect(() => {
    if (!slideRef.current) return
    gsap.fromTo(slideRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
  }, [step, started])

  const values = watch()

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > MAX_ATTACHMENT_BYTES) {
      setFileError(`El archivo pesa más de ${MAX_ATTACHMENT_MB}MB. Usa el link de abajo en su lugar.`)
      setFileName('')
      setValue('brandManualFile', undefined)
      e.target.value = ''
      return
    }
    setFileError('')
    const base64 = await fileToBase64(file)
    setValue('brandManualFile', { name: file.name, type: file.type, base64 })
    setFileName(file.name)
  }

  const isLastStep = step === STEP_TITLES.length - 1

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step])
    if (!valid) return
    setStep(s => Math.min(s + 1, STEP_TITLES.length - 1))
  }
  const goBack = () => setStep(s => Math.max(s - 1, 0))

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== 'Enter') return
    const target = e.target as HTMLElement
    if (target.tagName === 'TEXTAREA') return
    e.preventDefault()
    if (isLastStep) handleSubmit(onSubmit)()
    else goNext()
  }

  const onSubmit = async (data: CuestionarioData) => {
    const res = await fetch('/api/cuestionario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(STEP_KEY)
    } else {
      throw new Error('submit failed')
    }
  }

  if (isSubmitSuccessful) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(28px,4vw,40px)', color: 'var(--white)', marginBottom: 12 }}>
          ¡Gracias, {getValues('name')}!<span style={{ color: 'var(--orange)' }}>.</span>
        </h1>
        <p style={{ fontSize: 13, color: 'var(--muted)' }}>Recibí tu brief. Te voy a contactar pronto para conversar los detalles.</p>
      </div>
    )
  }

  if (!started) {
    return (
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', letterSpacing: 3, marginBottom: 12 }}>BRIEF DE PROYECTO</p>
        <h1 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(32px,6vw,56px)', letterSpacing: -2, lineHeight: 1, color: 'var(--white)', marginBottom: 20 }}>
          Cuéntame sobre tu <span style={{ color: 'var(--teal)' }}>proyecto</span><span style={{ color: 'var(--orange)' }}>.</span>
        </h1>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 32, maxWidth: 480 }}>
          Son {STEP_TITLES.length} pasos cortos — te va a tomar unos 5 a 10 minutos. No hace falta responder todo: si algo prefieres dejarlo a mi criterio, dilo y avanzamos. Tus respuestas se guardan automáticamente en este navegador, así que puedes continuar más tarde si lo necesitas.
        </p>
        <div style={{ maxWidth: 240, background: 'rgba(0,194,168,0.1)', border: '1px solid rgba(0,194,168,0.2)', clipPath: BUTTON_TICKET_CLIP_PATH, padding: 4 }}>
          <button
            type="button"
            onClick={() => setStarted(true)}
            style={{
              background: 'var(--teal)', color: 'var(--bg)', clipPath: BUTTON_TICKET_CLIP_PATH,
              padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
              fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
              border: 'none', cursor: 'pointer',
            }}
          >
            Comenzar
            <span style={{ width: 28, height: 28, background: 'rgba(4,12,10,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>↗</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px 60px' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.06)', zIndex: 50 }}>
        <div style={{ height: '100%', width: `${((step + 1) / STEP_TITLES.length) * 100}%`, background: 'var(--teal)', transition: 'width 0.3s ease' }} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} noValidate>
        <input type="text" {...register('honeypot')} style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

        <div ref={slideRef}>
          {step === 0 && (
            <Slide n={1} title="Datos generales">
              <Field label="Nombre completo" required error={!!errors.name}>
                <input {...register('name')} placeholder="Tu nombre" style={inputStyle} autoFocus />
              </Field>
              <Field label="Empresa o marca">
                <input {...register('company')} placeholder="Nombre de tu empresa (opcional)" style={inputStyle} />
              </Field>
              <Field label="Email" required error={!!errors.email}>
                <input {...register('email')} placeholder="tu@email.com" style={inputStyle} />
              </Field>
              <Field label="Teléfono / WhatsApp">
                <input {...register('phone')} placeholder="+56 9..." style={inputStyle} />
              </Field>
              <Field label="Rubro">
                <input {...register('industry')} placeholder="¿A qué se dedica tu negocio?" style={inputStyle} />
              </Field>
              <Field label="Tipo de proyecto">
                <select {...register('projectType')} style={selectStyle}>
                  <option value="">Selecciona una opción</option>
                  {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
            </Slide>
          )}

          {step === 1 && (
            <Slide n={2} title="ADN de marca">
              <Field label="Si tu marca fuera una persona, ¿cómo sería?" hint="Ej: joven y atrevida, seria y corporativa, cercana y artesanal, innovadora y tech-forward.">
                <textarea {...register('personalityDescription')} rows={2} style={{ ...inputStyle, resize: 'none' }} />
              </Field>
              <Field label="3 valores que deben percibirse al entrar a tu web" hint="Ej: confianza, innovación, rapidez, elegancia, cercanía.">
                <input {...register('coreValues')} style={inputStyle} />
              </Field>
              <Field label="¿Qué te diferencia de la competencia?">
                <textarea {...register('valueProposition')} rows={2} style={{ ...inputStyle, resize: 'none' }} />
              </Field>
              <Field label="¿En qué idioma(s) se presentará la web?">
                <input {...register('languages')} placeholder="Ej: español, o español e inglés" style={inputStyle} />
              </Field>
            </Slide>
          )}

          {step === 2 && (
            <Slide n={3} title="Objetivos">
              <Field label="¿Qué quieres lograr con este sitio?" required error={!!errors.mainGoal}>
                <textarea {...register('mainGoal')} rows={3} placeholder="Ej: vender más, mostrar mi portafolio, generar consultas..." style={{ ...inputStyle, resize: 'none' }} />
              </Field>
              <Field label="Cliente ideal / público objetivo" hint="Edad, intereses, ubicación, ocupación...">
                <input {...register('targetAudience')} placeholder="¿A quién le hablas?" style={inputStyle} />
              </Field>
              <Field label="Objetivo estratégico de la web">
                <select {...register('websiteObjective')} style={selectStyle}>
                  <option value="">Selecciona una opción</option>
                  {WEBSITE_OBJECTIVES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="CTA principal" hint="Lo más importante que debe hacer el visitante al entrar.">
                <input {...register('mainCTA')} placeholder="Ej: escribir por WhatsApp, comprar, agendar una hora" style={inputStyle} />
              </Field>
              <Field label="CTA secundario (opcional)">
                <input {...register('secondaryCTA')} style={inputStyle} />
              </Field>
            </Slide>
          )}

          {step === 3 && (
            <Slide n={4} title="Estructura y funcionalidades">
              <Field label="Páginas o secciones que imaginas">
                <input {...register('pagesEstimate')} placeholder="Ej: Inicio, Servicios, Contacto (o 'no sé, guíame')" style={inputStyle} />
              </Field>
              <div>
                <label style={labelStyle}>Secciones deseadas</label>
                <ChipGroup options={SECTION_OPTIONS} value={values.sections ?? []} onChange={v => setValue('sections', v)} />
              </div>
              <div>
                <label style={labelStyle}>Funcionalidades</label>
                <ChipGroup options={FEATURE_OPTIONS} value={values.features ?? []} onChange={v => setValue('features', v)} />
              </div>
              <Field label="¿Tienes dominio propio?">
                <select {...register('hasDomain')} style={selectStyle}>
                  <option value="">Selecciona una opción</option>
                  {YES_NO_UNSURE.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              {values.hasDomain === 'Sí' && (
                <Field label="¿Cuál es tu dominio?">
                  <input {...register('domainName')} placeholder="www.tudominio.com" style={inputStyle} />
                </Field>
              )}
              <Field label="¿Tienes hosting contratado?">
                <select {...register('hasHosting')} style={selectStyle}>
                  <option value="">Selecciona una opción</option>
                  {YES_NO_UNSURE.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
            </Slide>
          )}

          {step === 4 && (
            <Slide n={5} title="Contenido">
              <Field label="Logo">
                <select {...register('hasLogo')} style={selectStyle}>
                  <option value="">Selecciona una opción</option>
                  {LOGO_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Textos">
                <select {...register('hasCopy')} style={selectStyle}>
                  <option value="">Selecciona una opción</option>
                  {COPY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Fotos y videos">
                <select {...register('hasImages')} style={selectStyle}>
                  <option value="">Selecciona una opción</option>
                  {IMAGES_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              <div>
                <label style={labelStyle}>Manual de identidad gráfica (opcional)</label>
                <FieldWrap>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png,.svg" onChange={handleFile} style={{ ...inputStyle, padding: '10px 12px' }} />
                </FieldWrap>
                {fileName && <p style={hintStyle}>Adjuntado: {fileName}</p>}
                {fileError && <p style={{ ...hintStyle, color: 'rgba(255,80,80,0.8)' }}>{fileError}</p>}
                {!fileError && <p style={hintStyle}>Si tienes un manual de marca o de uso del logo, adjúntalo aquí (máx. {MAX_ATTACHMENT_MB}MB).</p>}
              </div>
              <Field label="O un link a tu manual de marca" hint="Si el archivo pesa más de lo permitido, comparte un link de Drive/WeTransfer.">
                <input {...register('brandManualLink')} style={inputStyle} />
              </Field>
            </Slide>
          )}

          {step === 5 && (
            <Slide n={6} title="Diseño y estilo — Colores y tipografía">
              <Field label="Paleta de colores">
                <input {...register('colorPalette')} placeholder="Colores o códigos hex, o 'a tu criterio'" style={inputStyle} />
              </Field>
              <Field label="Colores a evitar">
                <input {...register('colorsToAvoid')} style={inputStyle} />
              </Field>
              <Field label="Preferencia de tonalidad">
                <select {...register('tonePreference')} style={selectStyle}>
                  <option value="">Selecciona una opción</option>
                  {TONE_PREFERENCE.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Fuentes">
                <input {...register('fonts')} placeholder="Fuentes que te gusten, o 'a tu criterio'" style={inputStyle} />
              </Field>
              <Field label="Estilo tipográfico">
                <select {...register('typographyStyle')} style={selectStyle}>
                  <option value="">Selecciona una opción</option>
                  {TYPOGRAPHY_STYLE.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              <div>
                <label style={labelStyle}>Estilo deseado</label>
                <ChipGroup options={STYLE_OPTIONS} value={values.stylePreferences ?? []} onChange={v => setValue('stylePreferences', v)} />
              </div>
            </Slide>
          )}

          {step === 6 && (
            <Slide n={7} title="Diseño y estilo — Referencias y competencia">
              <p style={{ ...labelStyle, color: 'var(--teal)' }}>Sitios de referencia que te gustan</p>
              {([1, 2, 3] as const).map(i => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Field label={`Referencia ${i} — URL`}>
                    <input {...register(`ref${i}Url` as const)} placeholder="https://..." style={inputStyle} />
                  </Field>
                  <Field label="¿Qué te gusta de este sitio?">
                    <input {...register(`ref${i}Notes` as const)} placeholder="El menú, las animaciones, los colores, la limpieza..." style={inputStyle} />
                  </Field>
                </div>
              ))}

              <Field label="Sitios o estilos que NO te gustan">
                <textarea {...register('dislikedSites')} rows={2} style={{ ...inputStyle, resize: 'none' }} />
              </Field>

              <p style={{ ...labelStyle, marginTop: 8, color: 'var(--teal)' }}>Competencia directa</p>
              {([1, 2, 3] as const).map(i => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Field label={`Competidor ${i} — URL`}>
                    <input {...register(`comp${i}Url` as const)} placeholder="https://..." style={inputStyle} />
                  </Field>
                  <Field label="¿Qué harías diferente?">
                    <input {...register(`comp${i}Notes` as const)} style={inputStyle} />
                  </Field>
                </div>
              ))}
            </Slide>
          )}

          {step === 7 && (
            <Slide n={8} title="Aspectos técnicos">
              <Field label="¿Necesitas posicionamiento SEO?">
                <select {...register('needsSEO')} style={selectStyle}>
                  <option value="">Selecciona una opción</option>
                  {YES_NO_UNSURE.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Palabras clave importantes para tu negocio">
                <input {...register('keywords')} style={inputStyle} />
              </Field>
              <Field label="¿Te interesa un plan de mantenimiento?">
                <select {...register('wantsMaintenance')} style={selectStyle}>
                  <option value="">Selecciona una opción</option>
                  {MAINTENANCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
            </Slide>
          )}

          {step === 8 && (
            <Slide n={9} title="Logística">
              <Field label="Plazo deseado">
                <input {...register('deadline')} placeholder="Ej: en 6 semanas, para marzo..." style={inputStyle} />
              </Field>
              <Field label="¿Quién da el visto bueno final?">
                <input {...register('decisionMaker')} style={inputStyle} />
              </Field>
              <Field label="Algo más que quieras contarme">
                <textarea {...register('additionalNotes')} rows={3} style={{ ...inputStyle, resize: 'none' }} />
              </Field>
            </Slide>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32 }}>
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              style={{
                background: 'transparent', color: 'var(--muted)', border: '1px solid rgba(255,255,255,0.12)',
                padding: '12px 20px', fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700,
                letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer',
              }}
            >
              ← Atrás
            </button>
          ) : <div />}

          <div style={{ background: 'rgba(0,194,168,0.1)', border: '1px solid rgba(0,194,168,0.2)', clipPath: BUTTON_TICKET_CLIP_PATH, padding: 4 }}>
            <button
              type={isLastStep ? 'submit' : 'button'}
              onClick={isLastStep ? undefined : goNext}
              disabled={isSubmitting}
              style={{
                background: 'var(--teal)', color: 'var(--bg)', clipPath: BUTTON_TICKET_CLIP_PATH,
                padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 12,
                fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
                border: 'none', cursor: 'pointer', opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isLastStep ? (isSubmitting ? 'Enviando...' : 'Enviar cuestionario') : 'Siguiente'}
              <span style={{ width: 28, height: 28, background: 'rgba(4,12,10,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>↗</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
