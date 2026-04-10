import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  href?: string
  onClick?: () => void
  icon?: ReactNode
  children: ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  ariaLabel?: string
}

export function Button({
  variant = 'primary',
  href,
  onClick,
  icon,
  children,
  className = '',
  type = 'button',
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-electric-blue px-6 py-3 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-electric-blue/25',
    secondary:
      'border border-electric-blue/50 px-6 py-3 text-electric-blue hover:bg-electric-blue/10 hover:border-electric-blue',
    ghost:
      'px-4 py-2 text-gray-400 hover:text-electric-blue relative after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:bg-electric-blue after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full',
  }

  const classes = `${baseClasses} ${variants[variant]} ${className}`

  const content = (
    <>
      {icon}
      {children}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: variant === 'ghost' ? 1 : 1.03 }}
        whileTap={{ scale: 0.97 }}
        aria-label={ariaLabel}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: variant === 'ghost' ? 1 : 1.03 }}
      whileTap={{ scale: 0.97 }}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </motion.button>
  )
}
