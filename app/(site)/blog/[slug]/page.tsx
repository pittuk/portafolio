import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getPostBySlug } from '@/lib/sanity/queries'
import { MOCK_POSTS } from '@/lib/mock/posts'
import { urlFor } from '@/lib/sanity/image'
import type { Post } from '@/types'
import { SERVICES, serviceForPost, relatedPosts } from '@/lib/blogClusters'

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

  const image = post.coverUrl ?? (post.coverImage ? urlFor(post.coverImage).width(1200).height(630).url() : null)
  const words = post.sections.reduce((n, s) => n + `${s.heading} ${s.body}`.split(/\s+/).length, 0)
  const readingMinutes = Math.max(1, Math.round(words / 200))
  const service = serviceForPost(slug)
  const related = relatedPosts(slug, MOCK_POSTS)
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: image ? [image.startsWith('/') ? `https://pittuk.net${image}` : image] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://pittuk.net/blog/${slug}` },
    author: { '@id': 'https://pittuk.net/#person' },
    publisher: { '@id': 'https://pittuk.net/#organization' },
  }

  return (
    <article className="section-padding" style={{ padding: '100px 20px 60px', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <Link href="/blog" style={{ color: 'var(--muted)', fontSize: 11, letterSpacing: 1, textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 2, display: 'inline-block', marginBottom: 24 }}>
          ← Blog
        </Link>

        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', letterSpacing: 3, marginBottom: 12, textTransform: 'uppercase' }}>
          Por <a href="#autor" rel="author" style={{ color: 'inherit', textDecoration: 'none' }}>Luis Cruz</a>
          {' · '}
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
          </time>
          {' · '}{readingMinutes} min de lectura
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
            {section.table && (
              <div style={{ overflowX: 'auto', marginTop: 16 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.5 }}>
                  <thead>
                    <tr>
                      {section.table.head.map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--white)', borderBottom: '1px solid rgba(0,194,168,0.4)', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td key={c} style={{ padding: '10px 12px', color: c === 0 ? 'var(--white)' : 'var(--muted)', borderBottom: '1px solid rgba(255,255,255,0.06)', verticalAlign: 'top', minWidth: 120 }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}

        <aside style={{ marginTop: 48, padding: '20px 24px', border: '1px solid rgba(0,194,168,0.2)', background: 'rgba(0,194,168,0.04)' }}>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
            ¿Te sirvió esta guía? Conocé mi servicio de{' '}
            <Link href={`/${service}`} style={{ color: 'var(--teal)', textDecoration: 'none', borderBottom: '1px solid rgba(0,194,168,0.3)' }}>
              {SERVICES[service]}
            </Link>
            {' '}para empresas en Chile y Latinoamérica.
          </p>
        </aside>

        <section id="autor" style={{ marginTop: 40, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <Image
            src="/images/luis-cruz-autor.webp"
            alt="Luis Cruz"
            width={64}
            height={64}
            style={{ borderRadius: '50%', flexShrink: 0 }}
          />
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--white)', margin: '0 0 4px' }}>Luis Cruz</p>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 8px' }}>
              Diseñador y desarrollador web con más de 15 años de experiencia. Construye sitios en WordPress y tiendas WooCommerce para empresas de Chile, Latinoamérica, España y Estados Unidos.
            </p>
            <a href="https://www.linkedin.com/in/pittuk/" rel="author noopener" target="_blank" style={{ fontSize: 12, color: 'var(--teal)', textDecoration: 'none', borderBottom: '1px solid rgba(0,194,168,0.3)' }}>
              LinkedIn →
            </a>
          </div>
        </section>

        {related.length > 0 && (
          <nav aria-label="Artículos relacionados" style={{ marginTop: 48 }}>
            <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 700, fontSize: 18, color: 'var(--white)', marginBottom: 12 }}>
              Artículos relacionados
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {related.map(p => (
                <li key={p.slug.current}>
                  <Link href={`/blog/${p.slug.current}`} style={{ fontSize: 14, color: 'var(--teal)', textDecoration: 'none', borderBottom: '1px solid rgba(0,194,168,0.3)' }}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

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
