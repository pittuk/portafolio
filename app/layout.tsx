import type { Metadata } from 'next'
import { Syne, Space_Grotesk } from 'next/font/google'
import '@/app/globals.css'
import GSAPProvider from '@/components/providers/GSAPProvider'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Luis Cruz — Diseñador Web & Desarrollador WordPress',
  description: 'Diseñador y desarrollador web especializado en WordPress, UI/UX y e-Commerce. Talca, Chile.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${syne.variable} ${spaceGrotesk.variable}`}>
      <body>
        <GSAPProvider>
          {children}
        </GSAPProvider>
      </body>
    </html>
  )
}
