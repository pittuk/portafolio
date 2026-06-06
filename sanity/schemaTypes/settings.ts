// sanity/schemaTypes/settings.ts
import { defineField, defineType } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Configuración del sitio',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', type: 'string', initialValue: 'Luis Cruz' }),
    defineField({ name: 'siteDescription', type: 'text', rows: 3 }),
    defineField({
      name: 'socialLinks',
      title: 'Redes sociales',
      type: 'object',
      fields: [
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
        { name: 'behance', type: 'url', title: 'Behance' },
        { name: 'whatsapp', type: 'string', title: 'WhatsApp (número con código país)' },
      ],
    }),
  ],
  preview: { select: { title: 'siteTitle' } },
})
