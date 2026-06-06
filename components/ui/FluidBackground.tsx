'use client'
import { useEffect, useRef } from 'react'

const COUNT  = 65
const SPEED  = 0.45
const RADIUS = 1.8
const LINK   = 140  // max distance to draw a line

interface Dot {
  x: number; y: number; vx: number; vy: number
}

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let dots: Dot[] = []
    let W = 0, H = 0
    let raf: number

    function init() {
      W = canvas!.offsetWidth
      H = canvas!.offsetHeight
      canvas!.width  = W
      canvas!.height = H
      dots = Array.from({ length: COUNT }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * SPEED * 2,
        vy: (Math.random() - 0.5) * SPEED * 2,
      }))
    }

    function tick() {
      ctx!.clearRect(0, 0, W, H)

      // move + bounce
      for (const d of dots) {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > W) d.vx *= -1
        if (d.y < 0 || d.y > H) d.vy *= -1
      }

      // lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx   = dots[i].x - dots[j].x
          const dy   = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK) {
            const alpha = (1 - dist / LINK) * 0.35
            ctx!.strokeStyle = `rgba(0,194,168,${alpha})`
            ctx!.lineWidth   = 0.8
            ctx!.beginPath()
            ctx!.moveTo(dots[i].x, dots[i].y)
            ctx!.lineTo(dots[j].x, dots[j].y)
            ctx!.stroke()
          }
        }
      }

      // dots
      for (const d of dots) {
        ctx!.beginPath()
        ctx!.arc(d.x, d.y, RADIUS, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(0,194,168,0.7)'
        ctx!.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    init()
    raf = requestAnimationFrame(tick)

    const ro = new ResizeObserver(init)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        display: 'block', zIndex: 0,
        opacity: 0.55,
      }}
    />
  )
}
