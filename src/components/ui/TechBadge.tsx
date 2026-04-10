import { motion } from 'framer-motion'
import { useTheme } from '@/context/useTheme'

interface TechBadgeProps {
  label: string
  size?: 'sm' | 'md'
}

export function TechBadge({ label, size = 'sm' }: TechBadgeProps) {
  const { theme } = useTheme()

  return (
    <motion.span
      className={`inline-flex items-center rounded-full border font-mono transition-colors duration-300 ${
        size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm'
      } ${
        theme === 'dark'
          ? 'border-electric-blue/30 bg-electric-blue/10 text-electric-blue'
          : 'border-electric-blue/40 bg-electric-blue/5 text-blue-700'
      }`}
      whileHover={{
        scale: 1.05,
        borderColor: 'rgba(6, 182, 212, 0.6)',
        transition: { duration: 0.2 },
      }}
    >
      {label}
    </motion.span>
  )
}
