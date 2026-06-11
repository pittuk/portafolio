'use client'

import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  ShoppingCart,
  Palette,
  Search,
  Server,
  Brush,
  type LucideIcon,
} from 'lucide-react'
import { useMediaQuery } from '@/lib/useMediaQuery'

const SQRT_5000 = Math.sqrt(5000)

const ICONS: LucideIcon[] = [Code2, ShoppingCart, Palette, Search, Server, Brush]

export interface Service {
  num: string
  name: string
  desc: string
  tags: string[]
}

interface ServiceItem extends Service {
  tempId: number
  iconIndex: number
}

interface ServiceStaggerCardProps {
  position: number
  service: ServiceItem
  handleMove: (steps: number) => void
  cardSize: number
}

function ServiceStaggerCard({ position, service, handleMove, cardSize }: ServiceStaggerCardProps) {
  const isCenter = position === 0
  const Icon = ICONS[service.iconIndex]

  return (
    <div
      onClick={() => handleMove(position)}
      className={`service-stagger-card${isCenter ? ' is-active' : ''}`}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        cursor: 'pointer',
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.5s ease-in-out',
        zIndex: isCenter ? 10 : 1,
        background: isCenter ? 'var(--teal)' : 'var(--card-surface)',
        color: isCenter ? 'var(--bg)' : 'var(--white)',
        width: cardSize,
        height: cardSize,
        clipPath:
          'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)',
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? '0px 8px 0px 4px rgba(0,194,168,0.15)' : 'none',
      }}
    >
      <span
        style={{
          position: 'absolute',
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
          background: isCenter ? 'rgba(4,12,10,0.2)' : 'var(--hairline)',
          transform: 'rotate(45deg)',
          transformOrigin: 'top right',
          pointerEvents: 'none',
        }}
      />

      <Icon size={28} color={isCenter ? 'var(--bg)' : 'var(--orange)'} style={{ marginBottom: 16 }} />

      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 3,
          color: isCenter ? 'var(--bg)' : 'var(--orange)',
          opacity: isCenter ? 0.7 : 0.6,
          marginBottom: 16,
        }}
      >
        {service.num}
      </p>

      <h3
        style={{
          fontFamily: 'var(--heading)',
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: -0.3,
          lineHeight: 1.2,
          marginBottom: 12,
          color: isCenter ? 'var(--bg)' : 'var(--white)',
        }}
      >
        {service.name}
      </h3>

      <p
        style={{
          fontSize: 13,
          lineHeight: 1.7,
          flex: 1,
          color: isCenter ? 'rgba(4,12,10,0.75)' : 'var(--muted)',
        }}
      >
        {service.desc}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
        {service.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 8,
              letterSpacing: 1,
              borderRadius: '100px',
              padding: '3px 10px',
              color: isCenter ? 'var(--bg)' : 'rgba(0,194,168,0.7)',
              background: isCenter ? 'rgba(4,12,10,0.1)' : 'rgba(0,194,168,0.06)',
              border: `1px solid ${isCenter ? 'rgba(4,12,10,0.15)' : 'rgba(0,194,168,0.12)'}`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ServiceStaggerCards({ services }: { services: Service[] }) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const cardSize = isMobile ? 300 : 340
  const containerHeight = isMobile ? 560 : 640

  const [items, setItems] = useState<ServiceItem[]>(() =>
    services.map((service, index) => ({ ...service, tempId: index, iconIndex: index }))
  )

  const handleMove = (steps: number) => {
    const newItems = [...items]
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newItems.shift()
        if (!item) return
        newItems.push({ ...item, tempId: Math.random() })
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newItems.pop()
        if (!item) return
        newItems.unshift({ ...item, tempId: Math.random() })
      }
    }
    setItems(newItems)
  }

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', height: containerHeight }}>
      {items.map((service, index) => {
        const position = items.length % 2
          ? index - (items.length + 1) / 2
          : index - items.length / 2
        return (
          <ServiceStaggerCard
            key={service.tempId}
            service={service}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        )
      })}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
          zIndex: 20,
        }}
      >
        <button onClick={() => handleMove(-1)} className="service-stagger-nav" aria-label="Servicio anterior">
          <ChevronLeft size={24} />
        </button>
        <button onClick={() => handleMove(1)} className="service-stagger-nav" aria-label="Siguiente servicio">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}
