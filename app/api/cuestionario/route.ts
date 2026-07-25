import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { escapeHtml as esc } from '@/lib/escapeHtml'
import { cuestionarioSchema, type CuestionarioData } from '@/lib/cuestionario/schema'

const resend = new Resend(process.env.RESEND_API_KEY)

const SECTIONS: { title: string; fields: (keyof CuestionarioData)[] }[] = [
  { title: 'Datos generales', fields: ['name', 'company', 'email', 'phone', 'industry', 'projectType'] },
  { title: 'Objetivos', fields: ['mainGoal', 'targetAudience', 'mainCTA'] },
  { title: 'Estructura y funcionalidades', fields: ['pagesEstimate', 'sections', 'features', 'hasDomain', 'domainName', 'hasHosting'] },
  { title: 'Contenido', fields: ['hasLogo', 'hasCopy', 'hasImages'] },
  { title: 'Diseño y estilo', fields: ['colorPalette', 'fonts', 'stylePreferences', 'likedSites', 'dislikedSites', 'competitorSites'] },
  { title: 'Técnico', fields: ['needsSEO', 'keywords', 'wantsMaintenance'] },
  { title: 'Logística', fields: ['deadline', 'decisionMaker', 'additionalNotes'] },
]

const FIELD_LABELS: Record<keyof CuestionarioData, string> = {
  name: 'Nombre', company: 'Empresa / marca', email: 'Email', phone: 'Teléfono', industry: 'Rubro',
  projectType: 'Tipo de proyecto',
  mainGoal: 'Objetivo principal', targetAudience: 'Público objetivo', mainCTA: 'Acción principal esperada',
  pagesEstimate: 'Páginas/secciones estimadas', sections: 'Secciones deseadas', features: 'Funcionalidades',
  hasDomain: '¿Tiene dominio?', domainName: 'Dominio', hasHosting: '¿Tiene hosting?',
  hasLogo: 'Logo', hasCopy: 'Textos', hasImages: 'Fotos/videos',
  colorPalette: 'Paleta de colores', fonts: 'Fuentes', stylePreferences: 'Estilo deseado',
  likedSites: 'Sitios de referencia (le gustan)', dislikedSites: 'Sitios que no le gustan', competitorSites: 'Competencia',
  needsSEO: '¿Necesita SEO?', keywords: 'Palabras clave', wantsMaintenance: '¿Interesa mantenimiento?',
  deadline: 'Plazo deseado', decisionMaker: 'Quién da el visto bueno', additionalNotes: 'Notas adicionales',
  honeypot: 'honeypot',
}

function formatValue(v: unknown): string | null {
  if (Array.isArray(v)) return v.length ? esc(v.join(', ')) : null
  if (typeof v === 'string' && v.trim()) return esc(v)
  return null
}

function renderSections(data: CuestionarioData): string {
  return SECTIONS.map(({ title, fields }) => {
    const rows = fields
      .map(field => {
        const value = formatValue(data[field])
        return value ? `<p><strong>${esc(FIELD_LABELS[field])}:</strong> ${value}</p>` : null
      })
      .filter(Boolean)
      .join('')
    return rows ? `<h3>${esc(title)}</h3>${rows}` : ''
  }).join('')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = cuestionarioSchema.parse(body)

    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'pittuk@gmail.com',
      subject: `Brief de proyecto — ${esc(data.name)}`,
      html: `
        <h2>Nuevo cuestionario de brief completado</h2>
        ${renderSections(data)}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
