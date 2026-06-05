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
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }] }),
  ],
})
