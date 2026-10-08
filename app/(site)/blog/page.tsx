import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getPosts } from '@/lib/sanity/queries'
import { MOCK_POSTS } from '@/lib/mock/posts'
import { urlFor } from '@/lib/sanity/image'
import type { Post } from '@/types'

const TICKET_CLIP_PATH = 'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)'

const TITLE = 'Blog — Luis Cruz'
const DESCRIPTION = 'Artículos sobre diseño web, WordPress y WooCommerce para empresas en Chile y Latinoamérica.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/blog' },
  openGraph: {
    title: TITLE, description: DESCRIPTION, type: 'website',
    url: 'https://pittuk.net/blog',
    siteName: 'Luis Cruz', locale: 'es_CL',
    images: [{ url: 'https://pittuk.net/images/og-default.jpg', width: 1200, height: 630, alt: 'Luis Cruz — Diseño web y tiendas WooCommerce' }],
  },
  twitter: {
    card: 'summary_large_image', title: TITLE, description: DESCRIPTION,
    images: ['https://pittuk.net/images/og-default.jpg'],
  },
}

export default async function BlogPage() {
  let posts: Post[] = []
  try {
    posts = await getPosts()
  } catch {
    posts = MOCK_POSTS
  }
  if (!posts.length) posts = MOCK_POSTS
  // ponytail: mock array happens to be pre-sorted; sort explicitly so display order never depends on insertion order
  posts = [...posts].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
  // 4 destacados · 2 filas de 4 · 4 destacados invertidos · resto en filas de 4
  const blocks = [posts.slice(0, 4), posts.slice(4, 12), posts.slice(12, 16), posts.slice(16)]

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TITLE,
    description: DESCRIPTION,
    url: 'https://pittuk.net/blog',
    isPartOf: { '@id': 'https://pittuk.net/#website' },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://pittuk.net/blog/${post.slug.current}`,
        name: post.title,
      })),
    },
  }

  return (
    <section className="section-padding" style={{ padding: '100px clamp(20px, 4vw, 64px) 60px', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <h1 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(36px,10vw,96px)', letterSpacing: -3, lineHeight: 1, marginBottom: 48 }}>
        Blog<span style={{ color: 'var(--orange)' }}>.</span>
      </h1>

      {blocks.map((block, i) => !block.length ? null : i % 2 === 0 ? (
        <Featured key={i} posts={block} reverse={i === 2} priority={i === 0} />
      ) : (
        <div key={i} className="blog-grid">
          {block.map(post => <PostCard key={post._id} post={post} variant="grid" />)}
        </div>
      ))}
    </section>
  )
}

function Featured({ posts: [main, ...side], reverse, priority }: { posts: Post[]; reverse: boolean; priority: boolean }) {
  return (
    <div className={`blog-featured${reverse ? ' blog-featured--reverse' : ''}`}>
      <PostCard post={main} variant="hero" priority={priority} />
      {side.length > 0 && (
        <div className="blog-side">
          {side.map(post => <PostCard key={post._id} post={post} variant="side" />)}
        </div>
      )}
    </div>
  )
}

function PostCard({ post, variant, priority = false }: { post: Post; variant: 'hero' | 'side' | 'grid'; priority?: boolean }) {
  const imageUrl = post.coverUrl
    ?? (post.coverImage ? urlFor(post.coverImage).width(1200).height(630).url() : null)
  const date = new Date(post.publishedAt).toLocaleDateString('es-CL', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
  const Heading = variant === 'hero' ? 'h2' : 'h3'
  return (
    <Link href={`/blog/${post.slug.current}`} className={`blog-card blog-card--${variant}`}>
      {imageUrl && (
        <div className="blog-card__img" style={variant === 'hero' ? { clipPath: TICKET_CLIP_PATH } : undefined}>
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            priority={priority}
            unoptimized={post.coverUrl?.endsWith('.svg') ?? false}
            sizes={variant === 'hero' ? '(max-width: 900px) 100vw, 55vw' : variant === 'side' ? '(max-width: 900px) 40vw, 18vw' : '(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw'}
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      <div className="blog-card__body">
        <p className="blog-card__meta">Luis Cruz · {date}</p>
        <Heading className="blog-card__title">
          {post.title}
          {variant === 'hero' && <ArrowUpRight size={22} aria-hidden style={{ flexShrink: 0, color: 'var(--orange)' }} />}
        </Heading>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        {!!post.tags?.length && (
          <ul className="blog-card__tags">
            {post.tags.slice(0, variant === 'hero' ? 3 : 2).map(t => <li key={t}>{t}</li>)}
          </ul>
        )}
      </div>
    </Link>
  )
}
