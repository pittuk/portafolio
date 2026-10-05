import { Star } from 'lucide-react'

const SOCIALS = [
  {
    label: 'Déjame una reseña en Google',
    href: 'https://g.page/r/CWGWvpGdQTQ4EAI/review',
    icon: <Star size={18} />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pittuk/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/PITTUK',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        {/* B */}
        <path d="M2 5.5h5.5c1 0 1.8.2 2.4.7.5.4.8 1 .8 1.8 0 .8-.3 1.4-.9 1.8.9.4 1.4 1.1 1.4 2.1 0 .9-.3 1.6-.9 2.1-.6.5-1.5.7-2.7.7H2V5.5zm2 3.5h3c.5 0 .9-.1 1.1-.3.2-.2.4-.5.4-.9s-.1-.6-.4-.8C7.9 6.8 7.5 6.7 7 6.7H4V9zm0 4.3h3.3c.5 0 .9-.1 1.2-.4.3-.2.4-.6.4-1 0-.4-.1-.8-.4-1-.3-.2-.7-.3-1.2-.3H4v2.7z"/>
        {/* top bar e */}
        <path d="M13.5 6.5h5.5v1.2h-5.5z"/>
        {/* e */}
        <path d="M16.2 10c-1.1 0-2 .4-2.6 1.1-.6.7-.9 1.7-.9 2.9 0 1.2.3 2.2.9 2.9.6.7 1.5 1.1 2.7 1.1.9 0 1.7-.2 2.3-.7.6-.4 1-.9 1.2-1.6h-1.9c-.3.6-.8.9-1.5.9-.5 0-.9-.1-1.2-.4-.3-.3-.5-.7-.6-1.3h5.4v-.5c0-1.3-.3-2.3-1-3-.6-.7-1.5-1-2.6-1v-.4zm-1.7 3c.1-.5.3-.9.6-1.2.3-.3.7-.4 1.1-.4s.8.1 1.1.4c.3.3.5.7.5 1.2h-3.3z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/p1ttuk/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/pittuk',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
      </svg>
    ),
  },
]

// ponytail: hover en CSS (.social-btn en globals.css) para poder usarlo también en páginas de servidor
export default function SocialLinks({ justify = 'flex-start' }: { justify?: 'flex-start' | 'center' }) {
  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: justify, flexWrap: 'wrap' }}>
      {SOCIALS.map(s => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="social-btn">
          {s.icon}
        </a>
      ))}
    </div>
  )
}
