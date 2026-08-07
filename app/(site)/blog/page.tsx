import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
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
    images: [{ url: 'https://pittuk.net/images/logo/icono.svg', width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary_large_image', title: TITLE, description: DESCRIPTION,
    images: ['https://pittuk.net/images/logo/icono.svg'],
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
    <section className="section-padding" style={{ padding: '100px 20px 60px', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <h1 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(36px,10vw,96px)', letterSpacing: -3, lineHeight: 1, marginBottom: 48 }}>
        Blog<span style={{ color: 'var(--orange)' }}>.</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {posts.map(post => {
          const imageUrl = post.coverUrl
            ?? (post.coverImage ? urlFor(post.coverImage).width(600).height(315).url() : null)
          return (
            <Link key={post._id} href={`/blog/${post.slug.current}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                clipPath: TICKET_CLIP_PATH,
                height: '100%',
              }}>
                {imageUrl && (
                  <div style={{ position: 'relative', aspectRatio: '1200/630', overflow: 'hidden' }}>
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      loading="lazy"
                      unoptimized={post.coverUrl?.endsWith('.svg') ?? false}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div style={{ padding: 24 }}>
                  <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 10 }}>
                    {new Date(post.publishedAt).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <h2 style={{ fontFamily: 'var(--heading)', fontSize: 20, fontWeight: 700, color: 'var(--white)', letterSpacing: -0.3, marginBottom: 10, lineHeight: 1.2 }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
