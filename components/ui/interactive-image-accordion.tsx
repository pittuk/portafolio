'use client'
import { useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'

// Bocetos a mano alzada (viewBox 300×400). Trazo base en crema; acentos en teal (t) y naranja (o).
const BUTTON_TICKET_CLIP_PATH = 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, calc(100% - 8px) 100%, 8px 100%, 0 100%, 0 0)'

const TRANSITION_MS = 500
// Mismo corte superior derecho que las cajas del sitio (TICKET_CLIP_PATH), más chico porque
// las columnas cerradas miden 44px de ancho.
const CUT = 20
const clip = (c: number) => `polygon(0 0, calc(100% - ${c}px) 0, 100% ${c}px, 100% 100%, 0 100%)`
// El borde son dos capas recortadas: la exterior pinta el color del borde y la interior (1px
// adentro) el fondo. Su corte es CUT − (2 − √2) para que la diagonal también mida 1px.
const OUTER_CLIP = clip(CUT)
const INNER_CLIP = clip(CUT - 2 + Math.SQRT2)

const T = { stroke: 'var(--teal)' }
const O = { stroke: 'var(--orange)' }

const SKETCHES: ReactNode[] = [
  // 1 · Contacto: celular con mensajes y llamada
  <>
    <rect x="90" y="60" width="120" height="230" rx="18" />
    <path d="M135 78h30" />
    <circle cx="115" cy="120" r="8" /><path d="M130 116h40M130 125h28" />
    <circle cx="115" cy="165" r="8" /><path d="M130 161h35M130 170h25" />
    <circle cx="115" cy="210" r="8" /><path d="M130 206h40M130 215h20" />
    <g style={T}><rect x="165" y="130" width="100" height="42" rx="12" /><path d="M182 172l-6 15 18-15" /><circle cx="188" cy="151" r="9" /><path d="M204 146h46M204 157h34" /></g>
    <g style={O}><rect x="30" y="228" width="95" height="38" rx="12" /><path d="M100 266l8 13 2-13" /><path d="M42 256l10-17 10 17z" /><path d="M72 242h40M72 252h30" /></g>
    <g style={T}><circle cx="205" cy="305" r="30" /><path d="M192 293q0 14 11 24t20 6l4-7-9-6-5 4q-8-4-12-12l4-5-6-9z" /></g>
  </>,
  // 2 · Briefing: portapapeles con checklist, idea y pregunta
  <>
    <rect x="75" y="95" width="145" height="210" rx="10" />
    <rect x="117" y="82" width="60" height="25" rx="6" />
    {[135, 180, 225, 270].map((y, k) => (
      <g key={y}>
        <rect x="97" y={y} width="18" height="18" rx="3" />
        <path d={`M128 ${y + 9}h${70 - k * 8}`} />
        {k < 3 && <path style={T} d={`M100 ${y + 9}l6 6 12-15`} />}
      </g>
    ))}
    <g style={O}><circle cx="240" cy="70" r="22" /><path d="M231 92v13h18v-13M233 112h14M240 35v-12M266 50l9-7M214 50l-9-7M272 76h12" /></g>
    <path style={T} d="M30 160q0-20 18-20t18 18q0 11-15 17v11M51 200v1" />
  </>,
  // 3 · Propuesta: documento con precio, firma y lápiz
  <>
    <path d="M70 60h105l40 40v215H70z" />
    <path d="M175 60v40h40" />
    <path d="M92 125h95M92 145h100M92 165h70" />
    <g style={T}><rect x="92" y="190" width="60" height="55" rx="8" /><path d="M134 205q-5-7-13-6t-10 8 10 10 12 9-8 12-15-5M122 195v50" /></g>
    <path style={O} d="M92 285c10-22 20 22 30 0s20-16 30 4 15-10 26-5" />
    <g style={O}><path d="M232 230l35-35 14 14-35 35zM232 230l-7 21 21-7M258 204l14 14" /></g>
  </>,
  // 4 · Diseño: wireframe en el navegador y regla
  <>
    <rect x="35" y="85" width="230" height="180" rx="10" />
    <path d="M35 108h230" />
    <circle cx="51" cy="97" r="3" /><circle cx="63" cy="97" r="3" /><circle cx="75" cy="97" r="3" />
    <g style={T}><rect x="55" y="125" width="115" height="55" /><path d="M55 125l115 55M170 125L55 180" /></g>
    <path d="M182 132h62M182 146h50M182 160h56" />
    <rect x="55" y="195" width="58" height="52" /><rect x="121" y="195" width="58" height="52" /><rect x="187" y="195" width="58" height="52" />
    <g style={O}><rect x="55" y="295" width="190" height="28" rx="3" /><path d="M75 295v10M95 295v16M115 295v10M135 295v16M155 295v10M175 295v16M195 295v10M215 295v16" /></g>
  </>,
  // 5 · Desarrollo: laptop con código
  <>
    <rect x="55" y="105" width="190" height="130" rx="8" />
    <path d="M30 250h240l-18-15H48z" />
    <path d="M75 125h40M122 125h30M75 215h60" />
    <path style={T} d="M120 150l-28 22 28 22M180 150l28 22-28 22M162 142l-24 62" />
    <path style={O} d="M58 60q-12 0-12 12v8q0 7-8 7 8 0 8 7v8q0 12 12 12M100 60q12 0 12 12v8q0 7 8 7-8 0-8 7v8q0 12-12 12" />
    <path style={O} d="M210 300l14 10-14 10M232 322h22" />
  </>,
  // 6 · Testeo: dispositivos y lupa con check
  <>
    <rect x="45" y="105" width="85" height="155" rx="12" /><path d="M78 120h20" />
    <rect x="150" y="80" width="115" height="160" rx="10" /><circle cx="207" cy="228" r="4" />
    <path d="M62 145h50M62 160h40M170 105h75M170 120h60M170 135h70" />
    <g style={T}><circle cx="145" cy="265" r="40" /><path d="M128 266l12 12 22-25" /></g>
    <path style={O} d="M174 294l38 38" strokeWidth={7} />
  </>,
  // 7 · Entrega: cohete despegando
  <>
    <path d="M150 55c32 30 38 95 26 155h-52c-12-60-6-125 26-155z" />
    <circle style={T} cx="150" cy="128" r="15" />
    <path d="M124 180l-28 40 30-10M176 180l28 40-30-10M135 210v12h30v-12" />
    <path style={O} d="M138 226q12 55 12 55t12-55M146 236q4 22 4 22t4-22" />
    <path style={T} d="M60 90v14M53 97h14M240 125v14M233 132h14M75 270v12M69 276h12M232 290v12M226 296h12" />
    <path d="M120 300v28M180 300v20M150 300v40" strokeDasharray="4 7" />
  </>,
  // 8 · Soporte: salvavidas, chat y llave
  <>
    <circle cx="150" cy="150" r="72" /><circle cx="150" cy="150" r="34" />
    <path style={T} d="M174 126l27-27M126 126L99 99M126 174l-27 27M174 174l27 27" strokeWidth={7} />
    <g style={O}><rect x="90" y="255" width="120" height="55" rx="14" /><path d="M120 310l-8 16 22-16" /><path d="M150 297c-16-10-16-23-6-25 5-1 6 4 6 4s1-5 6-4c10 2 10 15-6 25z" /></g>
  </>,
]

const items = [
  { id: '1', title: 'Contacto', tag: 'Diagnóstico', content: 'Primera reunión para conocer tu proyecto, entender tus necesidades y definir el alcance del trabajo.' },
  { id: '2', title: 'Briefing', tag: 'Estrategia', content: 'Entiendo tu negocio, objetivos reales y el cliente que quieres atraer. Sin suposiciones — empezamos con preguntas.' },
  { id: '3', title: 'Propuesta', tag: 'Cotización', content: 'Te envío una propuesta detallada: qué incluye, qué no, tiempos de entrega y costo. Sin sorpresas antes de empezar.' },
  { id: '4', title: 'Diseño', tag: 'UX / UI', content: 'Wireframes y mockups funcionales para validar la visión antes de escribir código. Lo que ves es lo que construimos.' },
  { id: '5', title: 'Desarrollo', tag: 'Código', content: 'Construcción con las tecnologías adecuadas al proyecto: velocidad, SEO y escalabilidad desde el primer día.' },
  { id: '6', title: 'Testeo', tag: 'QA', content: 'Pruebas exhaustivas en dispositivos reales para garantizar que todo funcione correctamente antes del lanzamiento.' },
  { id: '7', title: 'Entrega', tag: 'Lanzar', content: 'Deploy, testing final y capacitación para que puedas administrar el sitio vos mismo. Entregado — y funcionando.' },
  { id: '8', title: 'Soporte', tag: 'Post-lanzamiento', content: 'Sigo disponible para actualizaciones, seguridad y cambios menores. Un sitio no está terminado el día que se publica.' },
]

// Márgenes y paddings van inline: el reset `* { padding: 0; margin: 0 }` de globals.css
// está fuera de @layer y pisa las utilidades de Tailwind.
export function InteractiveImageAccordion() {
  const [active, setActive] = useState(0)
  const lastPointer = useRef({ x: -1, y: -1 })
  const step = items[active]

  // Mientras las columnas cambian de ancho se desplazan bajo el cursor: cualquier movimiento
  // mínimo activaba la vecina y reiniciaba la animación en bucle. Durante la transición se
  // ignora el hover; después solo cuenta un movimiento real del puntero.
  const lockUntil = useRef(0)
  const onMove = (i: number) => (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const { x, y } = lastPointer.current
    lastPointer.current = { x: e.clientX, y: e.clientY }
    if (x === e.clientX && y === e.clientY) return
    if (i === active || performance.now() < lockUntil.current) return
    lockUntil.current = performance.now() + TRANSITION_MS
    setActive(i)
  }

  return (
    <div className="w-full max-w-6xl">
      <div className="text-center" style={{ marginBottom: 64 }}>
        <h2
          style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(28px,7vw,68px)', letterSpacing: -2, lineHeight: 1, marginBottom: 20 }}
        >
          Este es mi <span style={{ color: 'var(--teal)' }}>proceso</span><span style={{ color: 'var(--orange)' }}>.</span>
        </h2>
        <p className="max-w-md text-base text-[var(--muted)]" style={{ margin: "0 auto" }}>
          Ocho pasos, sin cajas negras: sabés en qué etapa está tu proyecto y qué viene después.
        </p>
      </div>

    <div className="grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
      {/* Columna izquierda: contenido del paso activo */}
      <div className="order-2 text-center md:order-none md:text-left">
        <div key={step.id} className="hidden animate-[fadeUp_0.5s_ease] md:block" aria-live="polite">
          <p className="text-xs font-bold uppercase tracking-widest text-white" style={{ marginBottom: 10 }}>
            {step.id.padStart(2, '0')} / 08 · {step.tag}
          </p>
          <p className="text-4xl font-bold uppercase text-[var(--teal)]" style={{ marginBottom: 14 }}>{step.title}</p>
          <p className="max-w-md text-base leading-relaxed text-white/85" style={{ marginBottom: 36, minHeight: '4.8em' }}>{step.content}</p>
        </div>

        <Link
          href="/contacto"
          className="transition-opacity hover:opacity-85"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--orange)', color: '#fff',
            clipPath: BUTTON_TICKET_CLIP_PATH, padding: '12px 24px',
            fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Empecemos tu proyecto
        </Link>
      </div>

      {/* Columna derecha: acordeón */}
      <div className="flex flex-col gap-2 md:h-[480px] md:flex-row">
        {items.map((item, i) => {
          const isActive = i === active
          return (
            <div
              key={item.id}
              onPointerMove={onMove(i)}
              style={{ clipPath: OUTER_CLIP }}
              className={`relative overflow-hidden transition-[flex,height,width,background-color] duration-500 ease-in-out has-[button:focus-visible]:bg-[var(--teal)] ${
                isActive
                  ? 'h-[420px] bg-[var(--teal)]/40 md:h-auto md:flex-[1_1_0%]'
                  : 'h-14 bg-white/10 md:h-auto md:w-11 md:flex-none'
              }`}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute transition-[background] duration-500"
                style={{
                  inset: 1,
                  clipPath: INNER_CLIP,
                  background: `linear-gradient(rgba(255,255,255,${isActive ? 0.04 : 0.02}), rgba(255,255,255,${isActive ? 0.04 : 0.02})), var(--bg)`,
                }}
              />
              <svg
                aria-hidden
                viewBox="0 0 300 400"
                preserveAspectRatio="xMidYMid meet"
                className={`absolute inset-x-0 top-0 h-[78%] w-full transition-opacity duration-500 md:h-[85%] ${isActive ? 'opacity-100' : 'opacity-0'}`}
                fill="none"
                stroke="var(--white)"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <defs>
                  <filter id={`sketch-${item.id}`}>
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={2} seed={i + 1} />
                    <feDisplacementMap in="SourceGraphic" scale={3.5} />
                  </filter>
                </defs>
                <g filter={`url(#sketch-${item.id})`}>
                  {SKETCHES[i]}
                  {/* segunda pasada desplazada: efecto de trazo repasado a lápiz */}
                  <g transform="translate(1.6 1.2)" opacity={0.35}>{SKETCHES[i]}</g>
                </g>
              </svg>

              {/* Etiqueta: vertical si está cerrada (desktop), horizontal abajo si está abierta */}
              <h3
                className={`absolute flex items-center gap-3 whitespace-nowrap text-sm font-bold uppercase tracking-widest text-white transition-all duration-500 ${
                  isActive
                    ? 'bottom-5 left-5 md:left-6 md:bottom-6'
                    : 'left-5 top-1/2 -translate-y-1/2 md:left-1/2 md:top-auto md:bottom-6 md:translate-y-0 md:-translate-x-1/2 md:[writing-mode:vertical-rl] md:rotate-180'
                }`}
              >
                <span className="text-[var(--orange)]">{item.id}</span>
                {item.title}
              </h3>

              {/* En móvil la descripción va dentro de la tarjeta abierta */}
              {isActive && (
                <p className="absolute inset-x-0 bottom-12 text-sm leading-snug text-white/80 md:hidden" style={{ padding: '0 20px' }}>
                  {item.content}
                </p>
              )}

              <button
                type="button"
                aria-expanded={isActive}
                aria-label={`Paso ${item.id}: ${item.title}`}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="absolute inset-0 z-10 cursor-pointer outline-none"
              />
            </div>
          )
        })}
      </div>
    </div>
    </div>
  )
}

export default InteractiveImageAccordion
