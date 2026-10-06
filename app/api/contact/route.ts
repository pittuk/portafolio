import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { escapeHtml as esc } from '@/lib/escapeHtml'

const resend = new Resend(process.env.RESEND_API_KEY)

const PROJECT_TYPES = ['Sitio WordPress', 'E-Commerce', 'UI/UX Design', 'Diseño Gráfico', 'Otro'] as const

const contactSchema = z.object({
  name: z.string().min(2, 'Nombre muy corto'),
  email: z.string().email('Email inválido'),
  projectType: z.enum(PROJECT_TYPES),
  message: z.string().min(20, 'Mensaje muy corto'),
  honeypot: z.string().max(0),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = contactSchema.parse(body)

    await resend.emails.send({
      // ponytail: el remitente de prueba de Resend cae en spam; MAIL_FROM usa el dominio verificado (pittuk.net)
      from: process.env.MAIL_FROM ?? 'Portfolio <onboarding@resend.dev>',
      to: 'pittuk@gmail.com',
      replyTo: data.email,
      subject: `Nuevo contacto: ${data.projectType} — ${data.name}`,
      text: `Nombre: ${data.name}\nEmail: ${data.email}\nTipo de proyecto: ${data.projectType}\n\n${data.message}`,
      html: `
        <div lang="es">
        <h2>Nuevo mensaje desde el portafolio</h2>
        <p><strong>Nombre:</strong> ${esc(data.name)}</p>
        <p><strong>Email:</strong> ${esc(data.email)}</p>
        <p><strong>Tipo de proyecto:</strong> ${esc(data.projectType)}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${esc(data.message)}</p>
        </div>
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
