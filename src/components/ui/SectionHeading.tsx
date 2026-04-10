import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTheme } from '@/context/useTheme'

interface SectionHeadingProps {
  title: string
  subtitle: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  const { theme } = useTheme()

  return (
    <div ref={ref} className="mb-16 text-center">
      <motion.span
        className="mb-2 block font-mono text-sm tracking-wider text-cyan-accent"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {subtitle}
      </motion.span>
      <motion.h2
        className={`text-3xl font-bold md:text-4xl ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      <motion.div
        className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-electric-blue to-cyan-accent"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
    </div>
  )
}
