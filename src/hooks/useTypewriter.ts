import { useState, useEffect, useCallback } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useTypewriter(text: string, speed = 80) {
  const prefersReducedMotion = useReducedMotion()
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const reset = useCallback(() => {
    setDisplayText('')
    setIsComplete(false)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text)
      setIsComplete(true)
      return
    }

    setDisplayText('')
    setIsComplete(false)
    let index = 0

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed, prefersReducedMotion])

  return { displayText, isComplete, reset }
}
