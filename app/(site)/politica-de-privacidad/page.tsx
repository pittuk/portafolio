import type { Metadata } from 'next'
import Link from 'next/link'

const TITLE = 'Política de Privacidad — Luis Cruz'
const DESCRIPTION = 'Cómo se recopilan, usan y protegen tus datos al visitar o contactar a través de este sitio.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/politica-de-privacidad' },
}

const sectionStyle: React.CSSProperties = { marginBottom: 32 }
const headingStyle: React.CSSProperties = { fontFamily: 'var(--heading)', fontWeight: 700, fontSize: 20, color: 'var(--white)', marginBottom: 10, letterSpacing: -0.5 }
const textStyle: React.CSSProperties = { fontSize: 13, color: 'var(--muted)', lineHeight: 1.9 }

export default function PoliticaDePrivacidadPage() {
  return (
    <section className="section-padding" style={{ padding: '140px 20px 100px', maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(32px,5vw,48px)', letterSpacing: -2, marginBottom: 8, color: 'var(--white)' }}>
        Política de <span style={{ color: 'var(--teal)' }}>Privacidad</span><span style={{ color: 'var(--orange)' }}>.</span>
      </h1>
      <p style={{ fontSize: 11, color: 'rgba(240,237,232,0.4)', marginBottom: 48 }}>Última actualización: julio 2026</p>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Qué datos recopilo</h2>
        <p style={textStyle}>
          Cuando escribes a través del formulario de contacto recopilo tu nombre, correo electrónico, tipo de proyecto y el mensaje que envías. Esa información se usa exclusivamente para responder tu consulta.
          Además, este sitio usa Google Analytics para entender de forma agregada cómo se navega el sitio (páginas visitadas, dispositivo, ubicación aproximada), lo que implica el uso de cookies.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Con quién se comparte</h2>
        <p style={textStyle}>
          Los mensajes del formulario se envían mediante Resend, un proveedor de envío de correos, únicamente para hacerlos llegar a mi casilla. La navegación agregada se procesa a través de Google Analytics. No vendo ni comparto tus datos con terceros para fines publicitarios.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Cuánto tiempo se conservan</h2>
        <p style={textStyle}>
          Los mensajes de contacto se conservan mientras sea necesario para responder y dar seguimiento a tu consulta. Puedes solicitar su eliminación en cualquier momento.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Tus derechos</h2>
        <p style={textStyle}>
          Puedes solicitar acceso, corrección o eliminación de tus datos escribiendo a{' '}
          <a href="mailto:pittuk@gmail.com" style={{ color: 'var(--teal)', textDecoration: 'none', borderBottom: '1px solid rgba(0,194,168,0.3)' }}>pittuk@gmail.com</a>.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Cookies</h2>
        <p style={textStyle}>
          Google Analytics instala cookies para diferenciar visitas. Puedes bloquearlas o eliminarlas desde la configuración de tu navegador sin que eso afecte tu acceso al sitio.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Cambios a esta política</h2>
        <p style={textStyle}>
          Esta política puede actualizarse ocasionalmente para reflejar cambios en el sitio o en la normativa aplicable. La fecha de la última actualización aparece arriba.
        </p>
      </div>

      <Link href="/" style={{ color: 'var(--teal)', fontSize: 11, letterSpacing: 1, textDecoration: 'none', borderBottom: '1px solid rgba(0,194,168,0.3)', paddingBottom: 2 }}>
        ← Volver al inicio
      </Link>
    </section>
  )
}
