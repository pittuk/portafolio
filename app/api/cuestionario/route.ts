import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { escapeHtml as esc } from '@/lib/escapeHtml'
import { cuestionarioSchema, type CuestionarioData } from '@/lib/cuestionario/schema'

const resend = new Resend(process.env.RESEND_API_KEY)

const SECTIONS: { title: string; fields: (keyof CuestionarioData)[] }[] = [
  { title: 'Datos generales', fields: ['name', 'company', 'email', 'phone', 'industry', 'projectType'] },
  { title: 'ADN de marca', fields: ['personalityDescription', 'coreValues', 'valueProposition', 'languages'] },
  { title: 'Objetivos', fields: ['mainGoal', 'targetAudience', 'websiteObjective', 'mainCTA', 'secondaryCTA'] },
  { title: 'Estructura y funcionalidades', fields: ['pagesEstimate', 'sections', 'features', 'hasDomain', 'domainName', 'hasHosting'] },
  { title: 'Contenido', fields: ['hasLogo', 'hasCopy', 'hasImages', 'brandManualLink'] },
  { title: 'Diseño y estilo', fields: [
    'colorPalette', 'colorsToAvoid', 'tonePreference', 'fonts', 'typographyStyle', 'stylePreferences',
    'ref1Url', 'ref1Notes', 'ref2Url', 'ref2Notes', 'ref3Url', 'ref3Notes', 'dislikedSites',
    'comp1Url', 'comp1Notes', 'comp2Url', 'comp2Notes', 'comp3Url', 'comp3Notes',
  ] },
  { title: 'Técnico', fields: ['needsSEO', 'keywords', 'wantsMaintenance'] },
  { title: 'Logística', fields: ['deadline', 'decisionMaker', 'additionalNotes'] },
]

const FIELD_LABELS: Record<keyof CuestionarioData, string> = {
  name: 'Nombre', company: 'Empresa / marca', email: 'Email', phone: 'Teléfono', industry: 'Rubro',
  projectType: 'Tipo de proyecto',
  personalityDescription: 'Si la marca fuera una persona', coreValues: 'Valores principales',
  valueProposition: 'Propuesta de valor única', languages: 'Idiomas de la web',
  mainGoal: 'Objetivo principal', targetAudience: 'Cliente ideal / público objetivo',
  websiteObjective: 'Objetivo estratégico de la web', mainCTA: 'CTA principal', secondaryCTA: 'CTA secundario',
  pagesEstimate: 'Páginas/secciones estimadas', sections: 'Secciones deseadas', features: 'Funcionalidades',
  hasDomain: '¿Tiene dominio?', domainName: 'Dominio', hasHosting: '¿Tiene hosting?',
  hasLogo: 'Logo', hasCopy: 'Textos', hasImages: 'Fotos/videos', brandManualLink: 'Link a manual de marca',
  brandManualFile: 'Manual de marca adjunto',
  colorPalette: 'Paleta de colores', colorsToAvoid: 'Colores a evitar', tonePreference: 'Preferencia clara/oscura',
  fonts: 'Fuentes', typographyStyle: 'Estilo tipográfico', stylePreferences: 'Estilo deseado',
  ref1Url: 'Referencia 1 — URL', ref1Notes: 'Referencia 1 — qué le gusta',
  ref2Url: 'Referencia 2 — URL', ref2Notes: 'Referencia 2 — qué le gusta',
  ref3Url: 'Referencia 3 — URL', ref3Notes: 'Referencia 3 — qué le gusta',
  dislikedSites: 'Sitios/estilos que no le gustan',
  comp1Url: 'Competidor 1 — URL', comp1Notes: 'Competidor 1 — qué haría diferente',
  comp2Url: 'Competidor 2 — URL', comp2Notes: 'Competidor 2 — qué haría diferente',
  comp3Url: 'Competidor 3 — URL', comp3Notes: 'Competidor 3 — qué haría diferente',
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
        if (field === 'brandManualFile') return null
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
      attachments: data.brandManualFile
        ? [{ filename: data.brandManualFile.name, content: Buffer.from(data.brandManualFile.base64, 'base64') }]
        : undefined,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
