// sanity/schemaTypes/post.ts
import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Artículo de Blog',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'excerpt', title: 'Resumen', type: 'text', rows: 3 }),
    defineField({
      name: 'sections',
      title: 'Contenido',
      type: 'array',
      of: [{
        type: 'object',
        name: 'section',
        fields: [
          defineField({ name: 'heading', title: 'Subtítulo', type: 'string' }),
          defineField({ name: 'body', title: 'Texto', type: 'text', rows: 6, validation: r => r.required() }),
        ],
      }],
    }),
    defineField({ name: 'coverImage', title: 'Imagen de portada', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'tags', title: 'Etiquetas', type: 'array', of: [{ type: 'string' }] }),
  ],
})
