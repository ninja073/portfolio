/**
 * MarqueeText — Infinite horizontal rolling ticker powered by GSAP.
 *
 * Uses gsap.to() with repeat: -1 and modifiers to create a seamless
 * wrap-around loop without gaps, regardless of item count.
 *
 * Props:
 *  - items     : string[]  — text items to repeat in the marquee
 *  - speed     : number    — seconds to traverse the full strip (default 28)
 *  - direction : 'left' | 'right' (default 'left')
 *  - separator : string    — separator glyph between items (default '◆')
 *  - className : string    — extra wrapper classes
 */

import { useEffect, useRef } from 'react'
import { gsap } from '@/animations/gsap'
import { useTheme } from '@/context/useTheme'

interface MarqueeTextProps {
  items: string[]
  speed?: number
  direction?: 'left' | 'right'
  separator?: string
  className?: string
  itemClassName?: string
}

export function MarqueeText({
  items,
  speed = 28,
  direction = 'left',
  separator = '◆',
  className = '',
  itemClassName = '',
}: MarqueeTextProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Duplicate track content so we always have enough to seamlessly loop
    const halfWidth = track.scrollWidth / 2

    tweenRef.current = gsap.to(track, {
      x: direction === 'left' ? `-=${halfWidth}` : `+=${halfWidth}`,
      duration: speed,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const parsed = parseFloat(x)
          if (direction === 'left') {
            return parsed % halfWidth
          }
          // right direction: wrap to negative side
          return parsed % halfWidth
        }),
      },
    })

    return () => {
      tweenRef.current?.kill()
    }
  }, [speed, direction, items])

  // Duplicate items for seamless loop (we render × 4 to handle any width)
  const loopItems = [...items, ...items, ...items, ...items]

  return (
    <div
      className={`marquee-container ${className}`}
      aria-hidden="true"
    >
      <div ref={trackRef} className="marquee-track">
        {loopItems.map((item, i) => (
          <span key={i} className={`marquee-item ${itemClassName}`}>
            <span className="marquee-text">{item}</span>
            <span
              className="marquee-sep"
              style={{ color: isDark ? 'rgba(59,130,246,0.6)' : 'rgba(37,99,235,0.5)' }}
            >
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
