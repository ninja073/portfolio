import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollTo } from '@/hooks/useScrollTo'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { navItems } from '@/data/personal'
import { navSlideDown, mobileMenuSlide } from '@/animations/variants'
import { useTheme } from '@/context/useTheme'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrollProgress = useScrollProgress()
  const scrollToSection = useScrollTo()
  const { theme } = useTheme()

  const sectionIds = useMemo(() => navItems.map((item) => item.href), [])
  const activeSection = useActiveSection(sectionIds)

  const isScrolled = scrollProgress > 0.01
  const isDark = theme === 'dark'

  const handleNavClick = (href: string) => {
    scrollToSection(href)
    setMobileOpen(false)
  }

  return (
    <motion.nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'border-b border-dark-border/50 bg-dark-bg/80 backdrop-blur-xl'
            : 'border-b border-light-border/80 bg-light-bg/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
      variants={navSlideDown}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <motion.button
          onClick={() => handleNavClick('hero')}
          className="text-gradient font-mono text-xl font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Go to top"
        >
          {'<NJ />'}
        </motion.button>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`relative rounded-lg px-4 py-2 font-mono text-sm transition-colors ${
                activeSection === item.href
                  ? 'text-electric-blue'
                  : isDark
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.label}
              {activeSection === item.href && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-lg bg-electric-blue/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right: Theme Toggle + Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`rounded-lg p-2 md:hidden ${
              isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col p-8 md:hidden ${
                isDark
                  ? 'border-l border-dark-border bg-dark-surface'
                  : 'border-l border-light-border bg-white'
              }`}
              variants={mobileMenuSlide}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="mb-8 self-end rounded-lg p-2 text-gray-400 hover:text-white"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`rounded-lg px-4 py-3 text-left font-mono text-sm transition-colors ${
                      activeSection === item.href
                        ? 'bg-electric-blue/10 text-electric-blue'
                        : isDark
                          ? 'text-gray-400 hover:bg-dark-card hover:text-gray-200'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
