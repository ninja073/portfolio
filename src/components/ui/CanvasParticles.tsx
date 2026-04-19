/**
 * CanvasParticles — Hero background with GSAP particle system.
 *
 * Phases:
 *  1. IDLE   — particles float/drift freely (firefly effect)
 *  2. MORPH  — particles converge to spell glyph text (convertToPath technique)
 *  3. DWELL  — hold the text shape for 2.5s
 *  4. BURST  — particles explode back to random positions → idle
 *
 * convertToPath technique (no paid GSAP plugin):
 *  - Draw text onto a hidden offscreen canvas via fillText()
 *  - Read getImageData() pixel grid, collect lit pixel (x,y) coords
 *  - Randomly sample N points from the glyph pixel set
 *  - gsap.to() each particle toward its sampled target with stagger
 */

import { useEffect, useRef } from 'react'
import { gsap } from '@/animations/gsap'
import { useTheme } from '@/context/useTheme'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  targetX: number
  targetY: number
  color: string
  phase: 'idle' | 'morph' | 'dwell' | 'burst'
}

const PARTICLE_COUNT = 420
const GLYPH_TEXTS = ['< NITISH />', 'FRONTEND', 'ENGINEER']
const FONT_SIZE = 90
const MORPH_DURATION = 1.6
const DWELL_DURATION = 2.2
const IDLE_SPEED = 0.3

// Sample N random points from lit pixels of rendered glyph text
function sampleGlyphPoints(
  text: string,
  canvasW: number,
  canvasH: number,
  count: number
): Array<{ x: number; y: number }> {
  const offscreen = document.createElement('canvas')
  offscreen.width = canvasW
  offscreen.height = canvasH
  const ctx = offscreen.getContext('2d')!
  ctx.clearRect(0, 0, canvasW, canvasH)
  ctx.fillStyle = '#ffffff'
  ctx.font = `bold ${FONT_SIZE}px "JetBrains Mono", monospace`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvasW / 2, canvasH / 2)

  const { data, width, height } = ctx.getImageData(0, 0, canvasW, canvasH)
  const lit: Array<{ x: number; y: number }> = []

  // Sample every 3rd pixel for performance
  for (let y = 0; y < height; y += 3) {
    for (let x = 0; x < width; x += 3) {
      const alpha = data[(y * width + x) * 4 + 3]
      if (alpha > 128) lit.push({ x, y })
    }
  }

  if (lit.length === 0) return []

  // Randomly pick `count` points from the lit set
  const sampled: Array<{ x: number; y: number }> = []
  for (let i = 0; i < count; i++) {
    sampled.push(lit[Math.floor(Math.random() * lit.length)])
  }
  return sampled
}

function randomVelocity() {
  const angle = Math.random() * Math.PI * 2
  const speed = 0.1 + Math.random() * IDLE_SPEED
  return { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed }
}

export function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let W = canvas.offsetWidth
    let H = canvas.offsetHeight
    canvas.width = W
    canvas.height = H

    const blueShades = [
      '#3B82F6', '#60A5FA', '#2563EB', '#06B6D4', '#67E8F9', '#818CF8',
    ]

    // Initialise particles
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
      const { vx, vy } = randomVelocity()
      const color = blueShades[Math.floor(Math.random() * blueShades.length)]
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx,
        vy,
        radius: 1.2 + Math.random() * 1.8,
        alpha: 0.3 + Math.random() * 0.7,
        targetX: 0,
        targetY: 0,
        color,
        phase: 'idle',
      }
    })

    let glyphIndex = 0
    let animationId: number
    let morphTimeline: gsap.core.Timeline | null = null
    let cycleTimeout: ReturnType<typeof setTimeout>

    function startMorphCycle() {
      const text = GLYPH_TEXTS[glyphIndex % GLYPH_TEXTS.length]
      glyphIndex++

      const targets = sampleGlyphPoints(text, W, H, PARTICLE_COUNT)
      if (targets.length === 0) {
        cycleTimeout = setTimeout(startMorphCycle, 5000)
        return
      }

      // Kill previous timeline
      if (morphTimeline) morphTimeline.kill()
      morphTimeline = gsap.timeline()

      // Set each particle's target
      particles.forEach((p, i) => {
        const t = targets[i % targets.length]
        p.targetX = t.x
        p.targetY = t.y
        p.phase = 'morph'
      })

      // MORPH phase — particles fly to glyph positions
      morphTimeline.to(particles, {
        x: (i) => particles[i].targetX,
        y: (i) => particles[i].targetY,
        alpha: 1,
        radius: (i: number) => 1.8 + (i % 3) * 0.3,
        duration: MORPH_DURATION,
        ease: 'power3.inOut',
        stagger: { amount: 0.6, from: 'random' },
        onUpdate() {
          particles.forEach((p) => { p.phase = 'morph' })
        },
      })

      // DWELL phase
      .to({}, { duration: DWELL_DURATION })

      // BURST phase — scatter back to random positions
      .to(particles, {
        x: () => Math.random() * W,
        y: () => Math.random() * H,
        alpha: (i) => 0.3 + (i % 5) * 0.1,
        radius: (i: number) => 1.2 + (i % 3) * 0.6,
        duration: 1.2,
        ease: 'power2.in',
        stagger: { amount: 0.5, from: 'random' },
        onComplete() {
          particles.forEach((p) => {
            const { vx, vy } = randomVelocity()
            p.vx = vx
            p.vy = vy
            p.phase = 'idle'
          })
          // Schedule next morph after 3s idle
          cycleTimeout = setTimeout(startMorphCycle, 3000)
        },
      })
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      // Subtle dark/light overlay tint
      ctx.fillStyle = isDark ? 'rgba(8,8,20,0.18)' : 'rgba(240,245,255,0.12)'
      ctx.fillRect(0, 0, W, H)

      particles.forEach((p) => {
        // Idle drift
        if (p.phase === 'idle') {
          p.x += p.vx
          p.y += p.vy
          // Wrap edges
          if (p.x < 0) p.x = W
          if (p.x > W) p.x = 0
          if (p.y < 0) p.y = H
          if (p.y > H) p.y = 0
        }

        // Draw glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4)
        grd.addColorStop(0, p.color + 'cc')
        grd.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.globalAlpha = p.alpha * 0.35
        ctx.fill()

        // Draw core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      })

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(draw)
    }

    // Resize handler
    const onResize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W
      canvas.height = H
    }
    window.addEventListener('resize', onResize)

    // Start
    animationId = requestAnimationFrame(draw)
    cycleTimeout = setTimeout(startMorphCycle, 2000)

    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(cycleTimeout)
      if (morphTimeline) morphTimeline.kill()
      window.removeEventListener('resize', onResize)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
    />
  )
}
