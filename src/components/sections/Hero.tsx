import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight, MessageSquare } from 'lucide-react'
import { useTypewriter } from '@/hooks/useTypewriter'
import { useScrollTo } from '@/hooks/useScrollTo'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { Button } from '@/components/ui/Button'
import { TechBadge } from '@/components/ui/TechBadge'
import { heroStagger, heroChild, badgeFloat } from '@/animations/variants'
import { personal, heroBadges } from '@/data/personal'
import { useTheme } from '@/context/useTheme'

export function Hero() {
  const { displayText } = useTypewriter(personal.name, 80)
  const scrollTo = useScrollTo()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
    >
      <AnimatedBackground />

      <motion.div
        className="relative z-10 text-center"
        variants={heroStagger}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <motion.p
          variants={heroChild}
          className="mb-4 font-mono text-sm tracking-wider text-cyan-accent md:text-base"
        >
          {personal.greeting}
        </motion.p>

        {/* Name with typewriter */}
        <motion.h1
          variants={heroChild}
          className="mb-4 font-mono text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl lg:text-8xl"
        >
          <span className="text-gradient">{displayText}</span>
          <motion.span
            className="inline-block w-[3px] align-middle text-electric-blue"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            style={{ height: '0.8em', backgroundColor: '#3B82F6', marginLeft: '2px' }}
          />
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={heroChild}
          className={`mb-8 text-lg md:text-xl lg:text-2xl ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {personal.title}
        </motion.p>

        {/* Tech badges */}
        <motion.div
          variants={heroChild}
          className="mb-10 flex flex-wrap justify-center gap-3"
        >
          {heroBadges.map((badge, i) => (
            <motion.div
              key={badge}
              variants={badgeFloat(i * 0.1)}
              className="animate-float"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <TechBadge label={badge} size="md" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={heroChild}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            variant="primary"
            onClick={() => scrollTo('projects')}
            icon={<ArrowRight size={18} />}
          >
            View My Work
          </Button>
          <Button
            variant="secondary"
            onClick={() => scrollTo('contact')}
            icon={<MessageSquare size={18} />}
          >
            Get in Touch
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => scrollTo('about')}
        aria-label="Scroll to About section"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  )
}
