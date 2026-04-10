import { useState, useEffect, useRef } from 'react'

function easeOutQuad(t: number): number {
  return t * (2 - t)
}

export function useCountUp(end: number, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!shouldStart) return

    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutQuad(progress)
      setCount(Math.round(eased * end))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [end, duration, shouldStart])

  return shouldStart ? count : 0
}
