import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight, MessageSquare } from 'lucide-react'
import { useScrollTo } from '@/hooks/useScrollTo'
import { CanvasParticles } from '@/components/ui/CanvasParticles'
import { MarqueeText } from '@/components/ui/MarqueeText'
import { Button } from '@/components/ui/Button'
import { heroStagger, heroChild } from '@/animations/variants'
import { personal, heroBadges } from '@/data/personal'
import { useTheme } from '@/context/useTheme'

export function Hero() {
  const scrollTo = useScrollTo()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Canvas particle field replaces CSS orbs */}
      <CanvasParticles />

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

        {/* Name */}
        <motion.h1
          variants={heroChild}
          className="mb-4 font-mono text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl lg:text-8xl"
        >
          <span className="text-gradient">{personal.name}</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={heroChild}
          className={`mb-10 text-lg md:text-xl lg:text-2xl ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {personal.title}
        </motion.p>

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

      {/* Rolling tech-stack marquee ticker below CTA */}
      <motion.div
        className="relative z-10 mt-16 w-full"
        variants={heroChild}
        initial="hidden"
        animate="visible"
      >
        <MarqueeText
          items={heroBadges}
          speed={22}
          direction="left"
          separator="◆"
          className="hero-marquee"
          itemClassName={isDark ? 'text-gray-500' : 'text-gray-400'}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gray-500"
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
