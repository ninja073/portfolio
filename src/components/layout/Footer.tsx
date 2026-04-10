import { motion } from 'framer-motion'
import { Code2, ExternalLink, Mail, Phone } from 'lucide-react'
import { useTheme } from '@/context/useTheme'

const socialIcons = [
  { icon: Code2, href: 'https://github.com/ninja073', label: 'GitHub' },
  { icon: ExternalLink, href: 'https://linkedin.com/in/nitishjaiswal-792aa2b1', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:nitishkrj@gmail.com', label: 'Email' },
  { icon: Phone, href: 'tel:+917829340831', label: 'Phone' },
]

export function Footer() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <footer
      className={`border-t py-8 ${
        isDark ? 'border-dark-border/50 bg-dark-bg' : 'border-light-border bg-light-bg'
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4">
        <div className="flex gap-4">
          {socialIcons.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`rounded-lg p-2.5 transition-colors ${
                isDark
                  ? 'text-gray-500 hover:bg-dark-card hover:text-electric-blue'
                  : 'text-gray-400 hover:bg-gray-100 hover:text-electric-blue'
              }`}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </div>
        <p
          className={`font-mono text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}
        >
          Designed & Built by Nitish Jaiswal &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
