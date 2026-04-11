import { motion } from 'framer-motion'
import { useTheme } from '@/context/useTheme'
import type { LucideIcon } from 'lucide-react'

interface TabButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
  icon?: LucideIcon
}

export function TabButton({ label, isActive, onClick, icon: Icon }: TabButtonProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2.5 font-mono text-sm transition-colors duration-200 sm:px-6 ${
        isActive
          ? isDark
            ? 'text-white'
            : 'text-white'
          : isDark
            ? 'text-gray-400 hover:text-gray-200'
            : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon size={16} />}
        {label}
      </span>
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 rounded-lg bg-electric-blue"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  )
}
