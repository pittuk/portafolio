import type { Metadata } from 'next'
import { Suspense } from 'react'
import CuestionarioForm from '@/components/forms/CuestionarioForm'

export const metadata: Metadata = {
  title: 'Cuestionario de proyecto — Luis Cruz',
  robots: { index: false, follow: false },
}

export default function CuestionarioPage() {
  return (
    <Suspense fallback={null}>
      <CuestionarioForm />
    </Suspense>
  )
}
