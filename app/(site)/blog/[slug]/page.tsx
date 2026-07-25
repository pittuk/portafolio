import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getPostBySlug } from '@/lib/sanity/queries'
import { MOCK_POSTS } from '@/lib/mock/posts'
import { urlFor } from '@/lib/sanity/image'
import type { Post } from '@/types'

const BUTTON_TICKET_CLIP_PATH = 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, calc(100% - 8px) 100%, 8px 100%, 0 100%, 0 0)'

interface Props {
  params: Promise<{ slug: string }>
}

async function resolvePost(slug: string): Promise<Post | null> {
  try {
    const post = await getPostBySlug(slug)
    if (post) return post
  } catch {
    // fall through to mock
  }
  return MOCK_POSTS.find(p => p.slug.current === slug) ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await resolvePost(slug)
  if (!post) return { title: 'Artículo no encontrado — Luis Cruz' }
  const image = post.coverUrl ?? (post.coverImage ? urlFor(post.coverImage).width(1200).height(630).url() : null)
  const seoTitle = post.seoTitle ?? post.title
  return {
    title: `${seoTitle} — Luis Cruz`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: seoTitle, description: post.excerpt, type: 'article',
      url: `https://pittuk.net/blog/${slug}`,
      siteName: 'Luis Cruz',
      locale: 'es_CL',
      images: image ? [{ url: image, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image', title: seoTitle, description: post.excerpt,
      images: image ? [image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await resolvePost(slug)

  if (!post) {
    return (
      <section style={{ padding: '140px 40px 80px', minHeight: '100vh', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 48, color: 'var(--white)', marginBottom: 16 }}>
          Artículo no encontrado
        </h1>
        <Link href="/blog" style={{ color: 'var(--teal)', fontSize: 11, letterSpacing: 1, textDecoration: 'none', borderBottom: '1px solid rgba(0,194,168,0.3)', paddingBottom: 2 }}>
          ← Volver al blog
        </Link>
      </section>
    )
  }

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.publishedAt,
    description: post.excerpt,
    author: { '@type': 'Person', name: 'Luis Cruz' },
  }

  return (
    <article className="section-padding" style={{ padding: '100px 20px 60px', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <Link href="/blog" style={{ color: 'var(--muted)', fontSize: 11, letterSpacing: 1, textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 2, display: 'inline-block', marginBottom: 24 }}>
          ← Blog
        </Link>

        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', letterSpacing: 3, marginBottom: 12, textTransform: 'uppercase' }}>
          {new Date(post.publishedAt).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <h1 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(24px,3.2vw,36px)', letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 32 }}>
          {post.title}
        </h1>

        {(() => {
          const imageUrl = post.coverUrl
            ?? (post.coverImage ? urlFor(post.coverImage).width(1200).height(630).url() : null)
          return imageUrl ? (
            <div style={{ position: 'relative', aspectRatio: '1200/630', overflow: 'hidden', marginBottom: 40 }}>
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                priority
                unoptimized={post.coverUrl?.endsWith('.svg') ?? false}
                sizes="(max-width: 768px) 100vw, 720px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ) : null
        })()}

        {post.sections.map((section, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            {section.heading && (
              <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 700, fontSize: 22, color: 'var(--white)', letterSpacing: -0.5, marginBottom: 10 }}>
                {section.heading}
              </h2>
            )}
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.9, whiteSpace: 'pre-line' }}>
              {section.body}
            </p>
          </div>
        ))}

        <div style={{ marginTop: 60, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--white)', marginBottom: 20 }}>
            ¿Tenés un proyecto en mente?
          </p>
          <Link
            href="/#contacto"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--orange)', color: '#fff',
              borderRadius: 0, clipPath: BUTTON_TICKET_CLIP_PATH, padding: '12px 24px',
              fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Solicita una propuesta
          </Link>
        </div>
      </div>
    </article>
  )
}
