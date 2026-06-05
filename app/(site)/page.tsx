// app/(site)/page.tsx
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import Process from '@/components/sections/Process'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import { getProjects } from '@/lib/sanity/queries'

export default async function Home() {
  const projects = await getProjects()
  return (
    <>
      <Hero />
      <Services />
      <Portfolio projects={projects} />
      <Process />
      <About />
      <Contact />
    </>
  )
}
