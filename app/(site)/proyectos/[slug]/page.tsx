import Link from 'next/link'
import { getProjectBySlug, getProjects } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { MOCK_PROJECTS } from '@/lib/mock/projects'
import Image from 'next/image'
import type { Project } from '@/types'
import type { Metadata } from 'next'

const BUTTON_TICKET_CLIP_PATH = 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, calc(100% - 8px) 100%, 8px 100%, 0 100%, 0 0)'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const project = await getProjectBySlug(slug)
    if (!project) return { title: 'Proyecto no encontrado — Luis Cruz' }
    return {
      title: `${project.title} — Luis Cruz`,
      description: project.descriptionText?.slice(0, 160) || `Proyecto de ${project.client || 'Luis Cruz'}`,
      openGraph: {
        title: `${project.title} — Luis Cruz`,
        description: project.descriptionText?.slice(0, 160) || `Proyecto de diseño y desarrollo web`,
        images: project.coverUrl ? [{ url: project.coverUrl }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${project.title} — Luis Cruz`,
        description: project.descriptionText?.slice(0, 160) || `Proyecto de diseño y desarrollo web`,
        images: project.coverUrl ? [project.coverUrl] : [],
      },
    }
  } catch {
    const mock = MOCK_PROJECTS.find(p => p.slug.current === slug)
    if (mock) return {
      title: `${mock.title} — Luis Cruz`,
      description: mock.descriptionText?.slice(0, 160) || `Proyecto de ${mock.client || 'Luis Cruz'}`,
      openGraph: {
        title: `${mock.title} — Luis Cruz`,
        description: mock.descriptionText?.slice(0, 160) || `Proyecto de diseño y desarrollo web`,
        images: mock.coverUrl ? [{ url: mock.coverUrl }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${mock.title} — Luis Cruz`,
        description: mock.descriptionText?.slice(0, 160) || `Proyecto de diseño y desarrollo web`,
        images: mock.coverUrl ? [mock.coverUrl] : [],
      },
    }
    return { title: 'Proyecto — Luis Cruz' }
  }
}

function getRelatedProjects(project: Project, all: Project[], count: number): Project[] {
  const sameCategory = all.filter(p =>
    p._id !== project._id &&
    p.category?.some(c => project.category?.includes(c))
  )
  const others = all.filter(p =>
    p._id !== project._id &&
    !sameCategory.includes(p)
  )
  const pool = [...sameCategory, ...others]
  return pool.slice(0, count)
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  let project: Project | null = null
  let allProjects: Project[] = []
  try {
    project = await getProjectBySlug(slug)
    allProjects = await getProjects()
  } catch {
    const mock = MOCK_PROJECTS.find(p => p.slug.current === slug)
    project = mock ?? null
    allProjects = MOCK_PROJECTS
  }

  if (!project) {
    return (
      <section style={{ padding: '140px 40px 80px', minHeight: '100vh', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 48, color: 'var(--white)', marginBottom: 16 }}>
          Proyecto no encontrado
        </h1>
        <Link href="/proyectos" style={{ color: 'var(--teal)', fontSize: 11, letterSpacing: 1, textDecoration: 'none', borderBottom: '1px solid rgba(0,194,168,0.3)', paddingBottom: 2 }}>
          ← Ver todos los proyectos
        </Link>
      </section>
    )
  }

  const related = getRelatedProjects(project, allProjects, 3)

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://pittuk.net/' },
      { '@type': 'ListItem', position: 2, name: 'Proyectos', item: 'https://pittuk.net/proyectos' },
      { '@type': 'ListItem', position: 3, name: project.title },
    ],
  }

  return (
    <section className="section-padding" style={{ padding: '100px 20px 60px', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Link href="/proyectos" style={{ color: 'var(--muted)', fontSize: 11, letterSpacing: 1, textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 2, display: 'inline-block', marginBottom: 24 }}>
        ← Todos los proyectos
      </Link>

      <div className="project-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', letterSpacing: 3, marginBottom: 12 }}>
            {project.category?.join(' · ')}
          </p>
          <h1 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(36px,5vw,64px)', letterSpacing: -2, lineHeight: 1, marginBottom: 8 }}>
            {project.title}
          </h1>
          {project.client && (
            <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 24 }}>
              Cliente: <strong style={{ color: 'var(--white)' }}>{project.client}</strong>
            </p>
          )}

          <div style={{ display: 'flex', gap: 32, marginBottom: 24 }}>
            {project.year && (
              <div>
                <p style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Año</p>
                <p style={{ fontSize: 13, color: 'var(--white)' }}>{project.year}</p>
              </div>
            )}
            {project.role && (
              <div>
                <p style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Rol</p>
                <p style={{ fontSize: 13, color: 'var(--white)' }}>{project.role}</p>
              </div>
            )}
          </div>

          {project.tools && project.tools.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
              {project.tools.map(tool => (
                <span key={tool} style={{ fontSize: 8, letterSpacing: 1, color: 'rgba(0,194,168,0.7)', background: 'rgba(0,194,168,0.06)', border: '1px solid rgba(0,194,168,0.12)', borderRadius: 0, padding: '3px 10px' }}>
                  {tool}
                </span>
              ))}
            </div>
          )}

          {project.descriptionText && (
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 24, whiteSpace: 'pre-line' }}>
              {project.descriptionText}
            </p>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--teal)', color: 'var(--bg)',
                borderRadius: 0, clipPath: BUTTON_TICKET_CLIP_PATH, padding: '10px 20px',
                fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700,
                letterSpacing: 1.5, textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Visitar sitio web ↗
            </a>
          )}
        </div>

        <div>
          {project.mosaicLayout ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(() => {
                const images = project.sliceUrls ?? []
                const rows: { type: 'full' | 'pair'; images: string[] }[] = []
                let idx = 0
                while (idx < images.length) {
                  if (idx < 3) {
                    rows.push({ type: 'full', images: [images[idx]] })
                    idx++
                  } else if (idx + 1 < images.length) {
                    rows.push({ type: 'pair', images: [images[idx], images[idx + 1]] })
                    idx += 2
                  } else {
                    rows.push({ type: 'full', images: [images[idx]] })
                    idx++
                  }
                }
                return rows.map((row, ri) => (
                  <div key={ri} style={{ display: 'flex', gap: 12 }}>
                    {row.images.map((url, ci) => (
                      <div key={ci} style={{
                        flex: row.type === 'full' ? '1 1 100%' : '1 1 50%',
                        borderRadius: 0, overflow: 'hidden',
                        position: 'relative',
                        aspectRatio: row.type === 'full' ? '16/9' : '4/5',
                      }}>
                        <Image
                          src={url}
                          alt={`${project.title} — pieza`}
                          fill
                          loading="lazy"
                          unoptimized
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>
                ))
              })()}
            </div>
          ) : project.stackedImages ? (
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0 }}>
              {project.sliceUrls?.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`${project.title} — imagen ${i + 1}`}
                  loading="lazy"
                  style={{ width: '100%', display: 'block', borderRadius: 0 }}
                />
              ))}
            </div>
          ) : (
            <>
              {(project.coverUrl || project.coverImage) && (
                <div style={{ borderRadius: 0, overflow: 'hidden', marginBottom: 16, position: 'relative', aspectRatio: '16/10' }}>
                  <Image
                    src={project.coverUrl ?? urlFor(project.coverImage!).width(800).height(500).url()}
                    alt={project.title}
                    fill
                    priority
                    unoptimized={!!project.coverUrl}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              {(project.sliceUrls && project.sliceUrls.length > 0) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {project.sliceUrls.map((url, i) => (
                    <div key={i} style={{ borderRadius: 0, overflow: 'hidden', position: 'relative', aspectRatio: '16/9' }}>
                      <Image
                        src={url}
                        alt={`${project.title} — imagen ${i + 1}`}
                        fill
                        loading="lazy"
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: 100, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 60 }}>
          <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', letterSpacing: -2, lineHeight: 1, marginBottom: 40 }}>
            Proyectos <span style={{ color: 'var(--teal)' }}>relacionados</span><span style={{ color: 'var(--orange)' }}>.</span>
          </h2>
          <div className="related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {related.map(r => {
              const imgUrl = r.coverUrl ?? (r.coverImage ? urlFor(r.coverImage).width(600).height(400).url() : null)
              return (
                <Link
                  key={r._id}
                  href={`/proyectos/${r.slug.current}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    clipPath: 'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)',
                    transition: 'border-color 0.3s, transform 0.3s',
                  }}>
                    {imgUrl && (
                      <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                        <Image
                          src={imgUrl}
                          alt={r.title}
                          fill
                          loading="lazy"
                          unoptimized={!!r.coverUrl}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <div style={{ padding: 16 }}>
                      <p style={{ fontSize: 8, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 4 }}>
                        {r.category?.join(' · ')}
                      </p>
                      <h3 style={{ fontFamily: 'var(--heading)', fontSize: 14, fontWeight: 700, color: 'var(--white)', letterSpacing: -0.2, margin: 0 }}>
                        {r.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <Link href="/proyectos" style={{ color: 'var(--teal)', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(0,194,168,0.3)', paddingBottom: 2 }}>
          ← Volver a todos los proyectos
        </Link>
      </div>
    </section>
  )
}
