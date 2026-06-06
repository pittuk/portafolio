import { getProjects } from '@/lib/sanity/queries'
import { MOCK_PROJECTS } from '@/lib/mock/projects'
import ProjectFilter from '@/components/project/ProjectFilter'

export default async function ProyectosPage() {
  let projects: any[] = []
  try {
    projects = await getProjects()
  } catch {
    projects = MOCK_PROJECTS
  }

  return (
    <section className="section-padding" style={{ padding: '100px 20px 60px', minHeight: '100vh' }}>
      <ProjectFilter projects={projects} />
    </section>
  )
}
