import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import Process from '@/components/sections/Process'
import About from '@/components/sections/About'
import Comparison from '@/components/sections/Comparison'
import Contact from '@/components/sections/Contact'
import InlineCTA from '@/components/ui/InlineCTA'
import { getProjects } from '@/lib/sanity/queries'
import { MOCK_PROJECTS } from '@/lib/mock/projects'

export default async function Home() {
  let projects: any[] = []
  try {
    projects = await getProjects()
  } catch {
    projects = MOCK_PROJECTS
  }

  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <InlineCTA text="¿Necesitas algo así para tu negocio?" />
      <Portfolio projects={projects} />
      <InlineCTA text="¿Quieres un proyecto como estos?" />
      <Comparison />
      <InlineCTA text="Hablemos directo, sin intermediarios." />
      <Process />
      <InlineCTA text="Empecemos con una reunión de 30 minutos." />
      <About />
      <Contact />
    </>
  )
}
