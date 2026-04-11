import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '@/context/useTheme'

interface ProgressRingProps {
  proficiency: number
  size?: number
  strokeWidth?: number
  yearsExp?: number
  showLabel?: boolean
}

export function ProgressRing({
  proficiency,
  size = 80,
  strokeWidth = 6,
  yearsExp,
  showLabel = true,
}: ProgressRingProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isHovered, setIsHovered] = useState(false)

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (proficiency / 100) * circumference

  const getColor = () => {
    if (proficiency >= 80) return isDark ? '#10b981' : '#059669' // green
    if (proficiency >= 60) return isDark ? '#fbbf24' : '#d97706' // yellow
    return isDark ? '#fb923c' : '#ea580c' // orange
  }

  const color = getColor()

  return (
    <div
      className="relative inline-flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            {proficiency}%
          </span>
        </div>
      )}
      {yearsExp && isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className={`absolute -bottom-8 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium ${
            isDark ? 'bg-dark-card border border-dark-border text-gray-300' : 'bg-white border border-light-border text-gray-700 shadow-lg'
          }`}
        >
          {yearsExp}+ years
        </motion.div>
      )}
    </div>
  )
}
