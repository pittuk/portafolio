// components/ui/InlineCTA.tsx
import PrimaryButton from './PrimaryButton'

interface InlineCTAProps {
  text: string
}

export default function InlineCTA({ text }: InlineCTAProps) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 20px 64px' }}>
      <p style={{
        fontFamily: 'var(--heading)', fontWeight: 700,
        fontSize: 'clamp(20px,3vw,28px)', letterSpacing: -0.5,
        color: 'var(--white)', marginBottom: 24,
      }}>
        {text}
      </p>
      <PrimaryButton href="/#contacto">Solicita una propuesta</PrimaryButton>
    </div>
  )
}
