import Link from 'next/link'
import ProjectCard from '@/components/project/ProjectCard'
import Contact from '@/components/sections/Contact'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { Project } from '@/types'

const BUTTON_TICKET_CLIP_PATH = 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, calc(100% - 8px) 100%, 8px 100%, 0 100%, 0 0)'

export interface ServiceFAQ {
  q: string
  a: string
  link?: { href: string; label: string }
}

interface ServicePageTemplateProps {
  eyebrow: string
  title: React.ReactNode
  intro: string
  included: string[]
  faq: ServiceFAQ[]
  projects: Project[]
  projectsHeading?: string
}

export default function ServicePageTemplate({
  eyebrow, title, intro, included, faq, projects, projectsHeading = 'Sitios que construí',
}: ServicePageTemplateProps) {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section style={{ padding: '140px 20px 0', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>
          {eyebrow}
        </p>
        <h1 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(32px,6vw,64px)', letterSpacing: -2, lineHeight: 1.05, marginBottom: 24 }}>
          {title}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 640, marginBottom: 32 }}>
          {intro}
        </p>
        <Link
          href="/#contacto"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--orange)', color: '#fff',
            clipPath: BUTTON_TICKET_CLIP_PATH, padding: '12px 24px',
            fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Solicita una propuesta
        </Link>
      </section>

      {included.length > 0 && (
        <section style={{ padding: '80px 20px 0', maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(24px,4vw,36px)', letterSpacing: -1, marginBottom: 24 }}>
            Qué incluye
          </h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: 0, padding: 0, listStyle: 'none' }}>
            {included.map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
                <span style={{ color: 'var(--teal)', flexShrink: 0 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {projects.length > 0 && (
        <section style={{ padding: '80px 20px 0', maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(24px,4vw,36px)', letterSpacing: -1, marginBottom: 24 }}>
            {projectsHeading}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {projects.map(p => (
              <ProjectCard key={p._id} project={p} style={{ minHeight: 220 }} />
            ))}
          </div>
        </section>
      )}

      {faq.length > 0 && (
        <section style={{ padding: '80px 20px 0', maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(24px,4vw,36px)', letterSpacing: -1, marginBottom: 8 }}>
            Preguntas frecuentes
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, i) => (
              <AccordionItem key={i} value={String(i)} className="last:border-b">
                <AccordionTrigger className="text-left overflow-hidden duration-200 hover:no-underline cursor-pointer -space-y-6 data-[state=open]:space-y-0 [&>svg]:hidden">
                  <div className="flex flex-1 items-start gap-4">
                    <p className="text-xs font-bold text-[var(--orange)]">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="relative text-lg md:text-xl" style={{ fontFamily: 'var(--heading)', fontWeight: 700, color: 'var(--teal)' }}>
                      {item.q}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-base leading-snug pb-10" style={{ paddingLeft: 36 }}>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>{item.a}</p>
                  {item.link && (
                    <Link href={item.link.href} style={{ display: 'inline-block', marginTop: 8, color: 'var(--teal)', fontSize: 12, textDecoration: 'none', borderBottom: '1px solid rgba(0,194,168,0.3)' }}>
                      {item.link.label} →
                    </Link>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      <div style={{ marginTop: 80 }}>
        <Contact />
      </div>
    </>
  )
}
