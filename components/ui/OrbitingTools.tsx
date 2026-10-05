import Image from 'next/image'

export interface OrbitTool {
  name: string
  /** slug del SVG en public/images/tools; sin logo se muestra un monograma */
  logo?: string
  monogram?: string
  /** color de marca, solo para el brillo al pasar el mouse */
  color: string
}

const R_INNER = '25cqw'
const R_OUTER = '44cqw'

// ponytail: la órbita es solo CSS (rotación del anillo y contra-rotación de cada ícono),
// sin requestAnimationFrame ni re-render de React por cuadro. Estilos en globals.css (.orbit-*).
function Track({ tools, radius, duration, reverse }: { tools: OrbitTool[], radius: string, duration: string, reverse?: boolean }) {
  return (
    <ul className={`orbit-track${reverse ? ' orbit-track--rev' : ''}`} style={{ '--dur': duration } as React.CSSProperties}>
      {tools.map((t, i) => (
        <li
          key={t.name}
          className="orbit-item"
          style={{ '--a': `${(360 / tools.length) * i}deg`, '--r': radius } as React.CSSProperties}
        >
          <span className="orbit-tile" style={{ '--c': t.color } as React.CSSProperties}>
            {t.logo
              ? <span className="orbit-icon" style={{ maskImage: `url(/images/tools/${t.logo}.svg)`, WebkitMaskImage: `url(/images/tools/${t.logo}.svg)` }} />
              : <span className="orbit-monogram">{t.monogram}</span>}
            <span className="orbit-label">{t.name}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

export default function OrbitingTools({ inner, outer }: { inner: OrbitTool[], outer: OrbitTool[] }) {
  return (
    // decorativo: la lista legible de herramientas va en el texto de al lado
    <div className="orbit-wrap" aria-hidden>
      <span className="orbit-ring" style={{ '--r': R_INNER } as React.CSSProperties} />
      <span className="orbit-ring" style={{ '--r': R_OUTER } as React.CSSProperties} />
      <span className="orbit-center">
        <Image src="/images/logo/icono.svg" alt="" width={40} height={40} style={{ width: '42%', height: 'auto' }} />
      </span>
      <Track tools={inner} radius={R_INNER} duration="30s" />
      <Track tools={outer} radius={R_OUTER} duration="60s" reverse />
    </div>
  )
}
