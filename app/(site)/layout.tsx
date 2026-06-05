// app/(site)/layout.tsx
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/layout/CustomCursor'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
