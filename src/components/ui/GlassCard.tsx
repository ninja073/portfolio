import { motion } from 'framer-motion'
import { glowHover } from '@/animations/variants'
import { useTheme } from '@/context/useTheme'
import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  const { theme } = useTheme()

  return (
    <motion.div
      className={`rounded-2xl border p-6 backdrop-blur-xl transition-colors duration-300 ${
        theme === 'dark'
          ? 'border-dark-border/50 bg-dark-card/60'
          : 'border-light-border bg-light-card/80'
      } ${className}`}
      whileHover={hover ? glowHover.hover : undefined}
    >
      {children}
    </motion.div>
  )
}
