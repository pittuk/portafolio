// types/index.ts
export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  alt?: string
}

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  category: string[]
  year: number
  client: string
  role: string
  tools: string[]
  description: any[] // Portable text
  liveUrl?: string
  featured: boolean
  order: number
  sliceImages: SanityImage[]
  coverImage?: SanityImage
  coverUrl?: string
  sliceUrls?: string[]
  stackedImages?: boolean
  descriptionText?: string
}

export interface Settings {
  siteTitle: string
  siteDescription: string
  socialLinks: {
    linkedin?: string
    behance?: string
    whatsapp?: string
  }
}
