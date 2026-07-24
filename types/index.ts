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
  mosaicLayout?: boolean
  descriptionText?: string
  caseStudy?: {
    problem: string
    goal: string
    whatIDid: string[]
    result: string[]
  }
}

export interface PostSection {
  heading: string
  body: string
}

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  coverImage?: SanityImage
  coverUrl?: string
  tags?: string[]
  sections: PostSection[]
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
