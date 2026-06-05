// sanity/schemaTypes/project.ts
import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({
      name: 'category',
      title: 'Categorías',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['WordPress', 'E-Commerce', 'UI/UX', 'Diseño Gráfico'] },
    }),
    defineField({ name: 'year', title: 'Año', type: 'number' }),
    defineField({ name: 'client', title: 'Cliente', type: 'string' }),
    defineField({ name: 'role', title: 'Rol', type: 'string' }),
    defineField({ name: 'tools', title: 'Herramientas', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'description', title: 'Descripción', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'liveUrl', title: 'URL del sitio', type: 'url' }),
    defineField({ name: 'featured', title: 'Destacado', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Orden', type: 'number', initialValue: 0 }),
    defineField({ name: 'coverImage', title: 'Imagen de portada', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'sliceImages',
      title: 'Imágenes del proyecto (slices)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: r => r.min(3).max(6),
    }),
  ],
  orderings: [{ title: 'Orden manual', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', media: 'coverImage', subtitle: 'client' },
  },
})
