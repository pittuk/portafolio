import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SocialLinks from '@/components/ui/SocialLinks'
import { STATS } from '@/lib/stats'
import OrbitingTools, { type OrbitTool } from '@/components/ui/OrbitingTools'
import { GRAIN_SVG, GRID_BG } from '@/lib/effects'
import { Building2, Calendar, GraduationCap, type LucideIcon } from 'lucide-react'

const TITLE = 'Sobre mí — Luis Cruz'
const DESCRIPTION = 'Luis Cruz, diseñador web y desarrollador WordPress con más de 15 años de experiencia. Trayectoria, formación y forma de trabajo con empresas de Chile y Latinoamérica.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/sobre-mi' },
  openGraph: {
    title: TITLE, description: DESCRIPTION, type: 'profile',
    url: 'https://pittuk.net/sobre-mi',
    siteName: 'Luis Cruz', locale: 'es_CL',
    images: [{ url: 'https://pittuk.net/images/og-default.jpg', width: 1200, height: 630, alt: 'Luis Cruz — Diseño web y tiendas WooCommerce' }],
  },
  twitter: {
    card: 'summary_large_image', title: TITLE, description: DESCRIPTION,
    images: ['https://pittuk.net/images/og-default.jpg'],
  },
}

const JOBS = [
  { period: '2024 – hoy', company: 'AgenciaDos', role: 'Diseñador web', text: 'Diseño, actualización y mantenimiento de sitios web y tiendas e-commerce en WordPress, y administración de hosting con cPanel.', tech: ['WordPress', 'WooCommerce', 'cPanel'] },
  { period: '2021 – 2023', company: 'Rebusk2', role: 'Diseñador gráfico web', text: 'Diseño, actualización y mantenimiento de sitios web y e-commerce dinámicos y responsivos en WordPress.', tech: ['WordPress', 'WooCommerce'] },
  { period: '2014 – 2023', company: 'Servicios Publicitarios Publinsite', role: 'Diseñador de medios digitales', text: 'Sitios en WordPress, diseño y maquetación de newsletters, hosting y correo por cPanel, piezas para redes sociales, flyers, banners, brochures e impresos.', tech: ['WordPress', 'cPanel', 'Newsletters', 'Diseño para redes'] },
  { period: '2013 – 2014', company: 'CIDCITEI Internacional', role: 'Diseñador gráfico web', text: 'Diseño y gestión del sitio en WordPress, hosting y cuentas de correo, diseño editorial en InDesign y piezas impresas.', tech: ['WordPress', 'cPanel', 'InDesign'] },
  { period: '2011 – 2012', company: 'Diario El Periodiquito', role: 'Diagramador', text: 'Diagramación y maquetación del diario impreso.', tech: ['PageMaker'] },
]

const EDUCATION = [
  { period: '2023', title: 'Especialización Back-End', place: 'ONE – Oracle Next Education', text: 'Aplicaciones web en Java con Spring Boot, MySQL, JPA y APIs REST.', tech: ['Java', 'Spring Boot', 'MySQL', 'JPA', 'API REST'] },
  { period: '2022 – 2023', title: 'Programación Full Stack', place: 'Egg Cooperation', text: 'HTML5, CSS3, JavaScript y Java, desde la interfaz hasta el servidor y la base de datos.', tech: ['HTML5', 'CSS3', 'JavaScript', 'Java'] },
  { period: '2006 – 2011', title: 'Ingeniería de Sistemas', place: 'Universidad Bicentenaria de Aragua' },
  { period: '1997 – 2000', title: 'Diseñador Gráfico', place: 'Instituto de Diseño de Valencia' },
]

const DESIGN_TOOLS: OrbitTool[] = [
  { name: 'Photoshop', logo: 'adobephotoshop', color: '#31A8FF' },
  { name: 'Illustrator', logo: 'adobeillustrator', color: '#FF9A00' },
  { name: 'InDesign', logo: 'adobeindesign', color: '#FF3366' },
  { name: 'Figma', logo: 'figma', color: '#F24E1E' },
]

const WEB_TOOLS: OrbitTool[] = [
  { name: 'WordPress', logo: 'wordpress', color: '#3C9AD6' },
  { name: 'WooCommerce', logo: 'woocommerce', color: '#A46497' },
  { name: 'Elementor', logo: 'elementor', color: '#E2457A' },
  { name: 'Divi', monogram: 'D', color: '#8F42EC' },
  { name: 'HTML5', logo: 'html5', color: '#E34F26' },
  { name: 'CSS3', logo: 'css3', color: '#2D8CE0' },
  { name: 'JavaScript', logo: 'javascript', color: '#F7DF1E' },
  { name: 'Bootstrap', logo: 'bootstrap', color: '#9B6FE0' },
  { name: 'MySQL', logo: 'mysql', color: '#4479A1' },
  { name: 'cPanel', logo: 'cpanel', color: '#FF6C2C' },
]

const SERVICES = [
  { href: '/diseno-web-wordpress', label: 'Diseño web en WordPress' },
  { href: '/diseno-tiendas-woocommerce', label: 'Tiendas WooCommerce' },
  { href: '/diseno-web-empresas', label: 'Diseño web para empresas' },
  { href: '/mantenimiento-wordpress', label: 'Mantenimiento WordPress' },
]

const profileLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: 'https://pittuk.net/sobre-mi',
  name: TITLE,
  mainEntity: { '@id': 'https://pittuk.net/#person' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://pittuk.net/' },
    { '@type': 'ListItem', position: 2, name: 'Sobre mí', item: 'https://pittuk.net/sobre-mi' },
  ],
}

const h2Style = { fontFamily: 'var(--heading)', fontWeight: 700, fontSize: 'clamp(22px,4vw,32px)', letterSpacing: -1, margin: '64px 0 20px' } as const
const pStyle = { fontSize: 14, color: 'var(--muted)', lineHeight: 1.9, margin: '0 0 16px' } as const
const wrapStyle = { maxWidth: 900, margin: '0 auto', padding: '0 20px' } as const
const linkStyle = { color: 'var(--teal)', textDecoration: 'none', borderBottom: '1px solid rgba(0,194,168,0.3)' } as const

type TimelineItem = { period: string, title: string, sub: string, text?: string, tech?: string[] }

const chipStyle = { fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--teal)', background: 'rgba(0,194,168,0.06)', border: '1px solid rgba(0,194,168,0.15)', padding: '5px 10px' } as const

function Timeline({ items, icon: Icon }: { items: TimelineItem[], icon: LucideIcon }) {
  return (
    <ol style={{ listStyle: 'none', margin: '0 0 0 12px', padding: 0, position: 'relative' }}>
      {/* línea vertical */}
      <span aria-hidden style={{ position: 'absolute', top: 16, bottom: 0, left: 0, borderLeft: '2px solid rgba(0,194,168,0.2)' }} />
      {items.map((it, i) => (
        <li key={it.title + it.period} style={{ position: 'relative', paddingLeft: 32, paddingBottom: i === items.length - 1 ? 0 : 48 }}>
          {/* punto */}
          <span aria-hidden style={{ position: 'absolute', top: 12, left: 1, width: 12, height: 12, transform: 'translateX(-50%)', borderRadius: '50%', border: '2px solid var(--teal)', background: 'var(--bg)', boxShadow: '0 0 0 6px var(--bg)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span aria-hidden style={{ width: 36, height: 36, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'rgba(0,194,168,0.08)', color: 'var(--teal)' }}>
              <Icon size={18} />
            </span>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--white)' }}>{it.sub}</span>
          </div>
          <h3 style={{ fontFamily: 'var(--heading)', fontWeight: 700, fontSize: 'clamp(18px, 2.4vw, 22px)', letterSpacing: -0.3, color: 'var(--white)', margin: 0 }}>{it.title}</h3>
          <p style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--orange)', margin: '8px 0 12px' }}>
            <Calendar size={15} aria-hidden /> {it.period}
          </p>
          {it.text && <p style={{ ...pStyle, margin: '0 0 12px' }}>{it.text}</p>}
          {it.tech && (
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 8, listStyle: 'none', margin: 0, padding: 0 }}>
              {it.tech.map(t => <li key={t} style={chipStyle}>{t}</li>)}
            </ul>
          )}
        </li>
      ))}
    </ol>
  )
}

export default function SobreMiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section style={{ position: 'relative', minHeight: 'clamp(560px, 80svh, 1000px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 16px 48px', overflow: 'hidden', textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 24 }}>Sobre mí</p>
        <div style={{ position: 'relative' }}>
          <h1 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(72px, 26vw, 230px)', lineHeight: 0.85, letterSpacing: '-0.04em', textTransform: 'uppercase', color: 'var(--teal)', margin: 0 }}>
            <span className="sr-only">Luis Cruz, diseñador web y desarrollador WordPress</span>
            {['Luis', 'Cruz'].map((word, w) => (
              <span key={word} aria-hidden style={{ display: 'block', whiteSpace: 'nowrap' }}>
                {[...word].map((ch, i) => (
                  <span key={i} className="blur-letter" style={{ '--i': w * 4 + i } as React.CSSProperties}>{ch}</span>
                ))}
              </span>
            ))}
          </h1>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'clamp(64px, 12vw, 132px)', aspectRatio: '0.6', borderRadius: 9999, overflow: 'hidden', border: '2px solid var(--orange)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
            <Image
              src="/images/luis-cruz-retrato.webp"
              alt="Retrato de Luis Cruz"
              fill
              priority
              sizes="132px"
              style={{ objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
        </div>
        <p style={{ fontSize: 'clamp(15px, 2vw, 20px)', color: 'var(--muted)', marginTop: 32 }}>
          Diseñador web y desarrollador WordPress<span style={{ color: 'var(--orange)' }}>.</span>
        </p>
        <SocialLinks justify="center" />
      </section>

      <article style={{ paddingBottom: 100 }}>
        <div style={wrapStyle}>
        <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 24, padding: '32px 0', margin: '0 0 48px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {STATS.map(st => (
            <div key={st.label} style={{ display: 'flex', flexDirection: 'column-reverse' }}>
              <dt style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 14 }}>{st.label}</dt>
              <dd style={{ fontFamily: 'var(--heading)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: 'var(--teal)', letterSpacing: -2, lineHeight: 1, margin: 0 }}>{st.num}{st.suffix}</dd>
            </div>
          ))}
        </dl>

        <p style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: 'var(--white)', lineHeight: 1.7, margin: 0 }}>
          Soy diseñador gráfico de formación y diseño y desarrollo sitios en WordPress y tiendas WooCommerce desde hace más de 15 años.
          Trabajo de forma directa con cada cliente, sin intermediarios: la misma persona que diseña es la que programa.
          He trabajado con empresas de Chile, Venezuela, Estados Unidos, Argentina, Colombia y España.
        </p>

        </div>

        {/* Historia fija a la izquierda mientras la trayectoria corre a la derecha (sticky en globals.css) */}
        <div className="story-grid">
          <div className="story-sticky">
            <h2 style={{ ...h2Style, marginTop: 0 }}>De la imprenta a la web</h2>
            <p style={pStyle}>
              Empecé en el diseño gráfico impreso: estudié en el Instituto de Diseño de Valencia y mi primer trabajo formal fue como diagramador en el Diario El Periodiquito.
              Esa etapa me dejó algo que sigo usando todos los días: jerarquía, tipografía y la disciplina de entregar a tiempo.
            </p>
            <p style={pStyle}>
              En paralelo estudié Ingeniería de Sistemas, y en 2013 di el salto al diseño web con WordPress. Desde entonces pasé por agencias y equipos de marketing
              haciendo de todo: sitios corporativos, tiendas e-commerce, newsletters, administración de hosting y correo, y piezas para redes sociales.
              Hoy diseño, desarrollo y mantengo sitios en WordPress y WooCommerce, principalmente con Elementor y Divi.
            </p>
          </div>
          <div>
            <h2 style={{ ...h2Style, marginTop: 0 }}>Trayectoria</h2>
            <Timeline icon={Building2} items={JOBS.map(j => ({ period: j.period, title: j.role, sub: j.company, text: j.text, tech: j.tech }))} />
          </div>
        </div>

        <div style={wrapStyle}>
        <h2 style={h2Style}>Cómo trabajo</h2>
        <p style={pStyle}>
          Combino diseño estratégico, experiencia de usuario y desarrollo técnico. La formación en diseño gráfico me da criterio visual; HTML, CSS,
          JavaScript y SQL me permiten resolver lo que un constructor visual no alcanza. Elijo Elementor o Divi cuando el cliente necesita editar
          sus páginas por su cuenta, y código a medida cuando importan el rendimiento o una funcionalidad específica.
        </p>
        <p style={pStyle}>
          Cada proyecto empieza por entender qué tiene que lograr el sitio y termina con el cliente capacitado para mantenerlo. Podés ver el resultado en los{' '}
          <Link href="/proyectos" style={linkStyle}>proyectos</Link> y en las <Link href="/blog" style={linkStyle}>guías del blog</Link>, donde explico precios, plazos y decisiones técnicas.
        </p>

        </div>

        {/* Herramientas: sección a ancho completo con el lenguaje visual del hero de la home */}
        <section style={{ position: 'relative', overflow: 'hidden', margin: '96px 0 32px', padding: 'clamp(72px, 10vw, 120px) 20px', borderTop: '1px solid rgba(0,194,168,0.15)', borderBottom: '1px solid rgba(0,194,168,0.15)', background: 'linear-gradient(180deg, rgba(0,194,168,0.03), transparent 40%, rgba(0,194,168,0.03))' }}>
          {/* Retícula que se disuelve hacia los bordes */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: GRID_BG, backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse at 70% 50%, #000 20%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, #000 20%, transparent 75%)' }} />
          {/* Grano */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: GRAIN_SVG, opacity: 0.15, mixBlendMode: 'overlay' }} />
          {/* Brillos */}
          <div aria-hidden style={{ position: 'absolute', top: '50%', right: '8%', width: 700, height: 700, translate: '0 -50%', pointerEvents: 'none', background: 'radial-gradient(circle, rgba(0,194,168,0.14) 0%, transparent 62%)' }} />
          <div aria-hidden style={{ position: 'absolute', bottom: -160, left: -120, width: 420, height: 420, pointerEvents: 'none', background: 'radial-gradient(circle, rgba(255,140,0,0.07) 0%, transparent 60%)' }} />
          {/* Barra decorativa izquierda */}
          <div aria-hidden style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, opacity: 0.4, background: 'linear-gradient(180deg, transparent, var(--teal) 40%, transparent)' }} />
          {/* Palabra de fondo */}
          <span aria-hidden style={{ position: 'absolute', left: '50%', bottom: -24, translate: '-50% 0', fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(90px, 20vw, 300px)', lineHeight: 1, letterSpacing: '-0.04em', textTransform: 'uppercase', color: 'transparent', WebkitTextStroke: '1px rgba(0,194,168,0.12)', whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none' }}>
            Stack
          </span>

          <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center', '--orbit-max': '560px' } as React.CSSProperties}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>Oficio</p>
              <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(36px, 6vw, 64px)', letterSpacing: -2, lineHeight: 1, margin: '0 0 20px' }}>
                Herramientas<span style={{ color: 'var(--orange)' }}>.</span>
              </h2>
              <p style={{ ...pStyle, fontSize: 15, maxWidth: 440 }}>
                Dos órbitas, un mismo oficio: en el centro el diseño, alrededor la web que lo hace funcionar.
              </p>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--orange)', letterSpacing: 2, textTransform: 'uppercase', margin: '28px 0 10px' }}>Diseño</h3>
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 8, listStyle: 'none', margin: 0, padding: 0 }}>
                {DESIGN_TOOLS.map(t => <li key={t.name} style={chipStyle}>{t.name}</li>)}
              </ul>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: 'var(--orange)', letterSpacing: 2, textTransform: 'uppercase', margin: '24px 0 10px' }}>Web</h3>
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 8, listStyle: 'none', margin: 0, padding: 0 }}>
                {WEB_TOOLS.map(t => <li key={t.name} style={chipStyle}>{t.name}</li>)}
              </ul>
            </div>
            <OrbitingTools inner={DESIGN_TOOLS} outer={WEB_TOOLS} />
          </div>
        </section>

        <div style={wrapStyle}>
        <h2 style={h2Style}>Formación</h2>
        <Timeline icon={GraduationCap} items={EDUCATION.map(e => ({ period: e.period, title: e.title, sub: e.place, text: e.text, tech: e.tech }))} />

        <h2 style={h2Style}>Servicios</h2>
        <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SERVICES.map(s => (
            <li key={s.href} style={{ fontSize: 14 }}><Link href={s.href} style={linkStyle}>{s.label}</Link></li>
          ))}
        </ul>

        <SocialLinks />

        <Link
          href="/contacto"
          style={{
            display: 'inline-flex', marginTop: 24,
            background: 'var(--orange)', color: '#fff',
            clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, calc(100% - 8px) 100%, 8px 100%, 0 100%, 0 0)', padding: '12px 24px',
            fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Solicita una propuesta
        </Link>
        </div>
      </article>
    </>
  )
}
