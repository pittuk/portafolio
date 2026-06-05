// app/(site)/page.tsx
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import { getProjects } from '@/lib/sanity/queries'

export default async function Home() {
  const projects = await getProjects()
  return (
    <>
      <Hero />
      <Services />
      <Portfolio projects={projects} />
    </>
  )
}
