import Link from 'next/link'
import { getProjectBySlug } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { MOCK_PROJECTS } from '@/lib/mock/projects'
import Image from 'next/image'
import type { Project } from '@/types'
import type { Metadata } from 'next'

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
      description: `Proyecto de ${project.client || 'Luis Cruz'}`,
    }
  } catch {
    const mock = MOCK_PROJECTS.find(p => p.slug.current === slug)
    if (mock) return { title: `${mock.title} — Luis Cruz`, description: `Proyecto de ${mock.client || 'Luis Cruz'}` }
    return { title: 'Proyecto — Luis Cruz' }
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  let project: Project | null = null
  try {
    project = await getProjectBySlug(slug)
  } catch {
    project = MOCK_PROJECTS.find(p => p.slug.current === slug) ?? null
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

  return (
    <section style={{ padding: '140px 40px 80px', minHeight: '100vh' }}>
      <Link href="/proyectos" style={{ color: 'var(--muted)', fontSize: 11, letterSpacing: 1, textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 2, display: 'inline-block', marginBottom: 40 }}>
        ← Todos los proyectos
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
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
                <span key={tool} style={{ fontSize: 8, letterSpacing: 1, color: 'rgba(0,194,168,0.7)', background: 'rgba(0,194,168,0.06)', border: '1px solid rgba(0,194,168,0.12)', borderRadius: '100px', padding: '3px 10px' }}>
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
                borderRadius: '100px', padding: '10px 20px',
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
          {project.stackedImages ? (
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0 }}>
              {project.sliceUrls?.map((url, i) => {
                const total = project.sliceUrls!.length
                const borderRadius = i === 0
                  ? '20px 20px 0 0'
                  : i === total - 1
                    ? '0 0 20px 20px'
                    : '0 0 0 0'
                return (
                  <img
                    key={i}
                    src={url}
                    alt={`${project.title} — imagen ${i + 1}`}
                    style={{ width: '100%', display: 'block', borderRadius }}
                  />
                )
              })}
            </div>
          ) : (
            <>
              {(project.coverUrl || project.coverImage) && (
                <div style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 16, position: 'relative', aspectRatio: '16/10' }}>
                  <Image
                    src={project.coverUrl ?? urlFor(project.coverImage!).width(800).height(500).url()}
                    alt={project.title}
                    fill
                    unoptimized={!!project.coverUrl}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              {(project.sliceUrls && project.sliceUrls.length > 0) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {project.sliceUrls.map((url, i) => (
                    <div key={i} style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', aspectRatio: '16/9' }}>
                      <Image
                        src={url}
                        alt={`${project.title} — imagen ${i + 1}`}
                        fill
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
    </section>
  )
}
