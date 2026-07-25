// app/(site)/layout.tsx
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import FloatingCTA from '@/components/layout/FloatingCTA'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <FloatingCTA />
    </>
  )
}
