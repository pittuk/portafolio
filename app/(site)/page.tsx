// app/(site)/page.tsx (temporary test — will be replaced in later tasks)
import { getProjects } from '@/lib/sanity/queries'

export default async function Home() {
  const projects = await getProjects()
  return (
    <div style={{ color: 'white', padding: 40 }}>
      <p>Projects fetched: {projects.length}</p>
      <pre style={{ fontSize: 12, overflow: 'auto' }}>
        {JSON.stringify(projects.slice(0, 1), null, 2)}
      </pre>
    </div>
  )
}
