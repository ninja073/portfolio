import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Calendar, Code2 } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { useCountUp } from '@/hooks/useCountUp'
import { fadeInLeft, fadeInRight, staggerContainer, fadeInUp } from '@/animations/variants'
import { personal, stats } from '@/data/personal'
import { useTheme } from '@/context/useTheme'

function StatCard({ label, value, suffix, inView }: { label: string; value: number; suffix?: string; inView: boolean }) {
  const count = useCountUp(value, 2000, inView)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <GlassCard className="flex flex-col items-center p-6 text-center">
      <span className="text-gradient font-mono text-3xl font-bold md:text-4xl">
        {count}{suffix}
      </span>
      <span className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {label}
      </span>
    </GlassCard>
  )
}

export function About() {
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <SectionWrapper id="about">
      <SectionHeading title="About Me" subtitle="// who I am" />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: Avatar */}
        <motion.div
          className="flex items-center justify-center"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative">
            <div
              className="h-72 w-72 rounded-2xl md:h-80 md:w-80"
              style={{
                background: `linear-gradient(135deg, ${isDark ? '#1A1A2E' : '#E2E8F0'} 0%, ${isDark ? '#12121A' : '#F1F5F9'} 100%)`,
                border: '2px solid transparent',
                backgroundClip: 'padding-box',
              }}
            >
              {/* Gradient border ring */}
              <div className="absolute -inset-[2px] -z-10 rounded-2xl bg-gradient-to-br from-electric-blue to-cyan-accent" />
              {/* Avatar content */}
              <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl">
                <span className="text-gradient font-mono text-6xl font-bold">NJ</span>
                <span className={`mt-2 font-mono text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  &lt;developer /&gt;
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Bio */}
        <motion.div
          className="flex flex-col justify-center"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            {personal.bio.map((paragraph, i) => (
              <p
                key={i}
                className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Quick info */}
          <div className={`mt-6 flex flex-wrap gap-4 font-mono text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-electric-blue" />
              {personal.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-electric-blue" />
              8+ years experience
            </span>
            <span className="flex items-center gap-1.5">
              <Code2 size={14} className="text-electric-blue" />
              7-year GitHub streak
            </span>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        ref={statsRef}
        className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeInUp}>
            <StatCard {...stat} inView={statsInView} />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
