// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(2, 'Nombre muy corto'),
  email: z.string().email('Email inválido'),
  projectType: z.string().min(1, 'Selecciona un tipo de proyecto'),
  message: z.string().min(20, 'Mensaje muy corto'),
  honeypot: z.string().max(0),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = contactSchema.parse(body)

    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'pittuk@gmail.com',
      subject: `Nuevo contacto: ${data.projectType} — ${data.name}`,
      html: `
        <h2>Nuevo mensaje desde el portafolio</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Tipo de proyecto:</strong> ${data.projectType}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${data.message}</p>
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
