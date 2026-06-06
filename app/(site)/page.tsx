import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import Process from '@/components/sections/Process'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
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
      <section style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0 }}>
        <h1>Luis Cruz — Diseñador Web y Desarrollador WordPress en Talca, Chile</h1>
        <p>Especialista en WordPress, WooCommerce, UI/UX design y e-commerce. Más de 5 años de experiencia creando sitios web profesionales para empresas en Chile y Latinoamérica.</p>
      </section>
      <Hero />
      <Services />
      <Portfolio projects={projects} />
      <Process />
      <About />
      <Contact />
    </>
  )
}
