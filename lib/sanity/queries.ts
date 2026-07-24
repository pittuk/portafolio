// lib/sanity/queries.ts
import { client } from './client'
import type { Project, Post, Settings } from '@/types'

export async function getProjects(): Promise<Project[]> {
  return client.fetch(
    `*[_type == "project"] | order(order asc) {
      _id, title, slug, category, year, client, role, tools,
      description, caseStudy, liveUrl, featured, order, coverImage, sliceImages
    }`
  )
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, title, slug, category, year, client, role, tools,
      description, caseStudy, liveUrl, coverImage, sliceImages
    }`,
    { slug }
  )
}

export async function getPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, publishedAt, excerpt, sections, tags, coverImage
    }`
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, publishedAt, excerpt, sections, tags, coverImage
    }`,
    { slug }
  )
}

export async function getSettings(): Promise<Settings | null> {
  return client.fetch(`*[_type == "settings"][0]`)
}
