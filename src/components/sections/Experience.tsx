import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, ChevronDown, MapPin } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { TechBadge } from '@/components/ui/TechBadge'
import { timelineItem, staggerContainer } from '@/animations/variants'
import { experiences } from '@/data/experience'
import { useTheme } from '@/context/useTheme'

function CardContent({
  experience,
  visibleAchievements,
  expanded,
  onToggle,
  isDark,
}: {
  experience: typeof experiences[0]
  visibleAchievements: string[]
  expanded: boolean
  onToggle: () => void
  isDark: boolean
}) {
  return (
    <>
      <h3 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
        {experience.role}
      </h3>
      <p className="text-gradient mt-1 font-mono text-sm font-semibold">
        {experience.company}
      </p>
      <div className={`mt-2 flex flex-wrap gap-3 font-mono text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
        <span>{experience.period}</span>
        <span className="flex items-center gap-1">
          <MapPin size={12} />
          {experience.location}
        </span>
      </div>

      <p className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {experience.description}
      </p>

      <ul className="mt-4 space-y-2">
        <AnimatePresence mode="sync">
          {visibleAchievements.map((achievement, i) => (
            <motion.li
              key={achievement}
              className={`flex gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              initial={i >= 2 ? { opacity: 0, height: 0 } : false}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-blue" />
              <span>{achievement}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {experience.achievements.length > 2 && (
        <button
          onClick={onToggle}
          className="mt-3 flex items-center gap-1 font-mono text-xs text-electric-blue hover:text-cyan-accent"
        >
          {expanded ? 'Show less' : `Show ${experience.achievements.length - 2} more`}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={14} />
          </motion.span>
        </button>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {experience.techStack.slice(0, 6).map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>
    </>
  )
}

function TimelineCard({ experience, index }: { experience: typeof experiences[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const direction = index % 2 === 0 ? 'left' : 'right'
  const visibleAchievements = expanded ? experience.achievements : experience.achievements.slice(0, 2)
  const isEven = index % 2 === 0

  const cardProps = {
    experience,
    visibleAchievements,
    expanded,
    onToggle: () => setExpanded(!expanded),
    isDark,
  }

  return (
    <motion.div
      variants={timelineItem(direction)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Desktop: alternating timeline layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8">
        {/* Left column */}
        <div>
          {isEven && (
            <GlassCard className="h-full">
              <CardContent {...cardProps} />
            </GlassCard>
          )}
        </div>

        {/* Timeline node */}
        <div className="flex flex-col items-center">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-electric-blue ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
            <Briefcase size={16} className="text-electric-blue" />
          </div>
          <div className={`w-px flex-1 ${isDark ? 'bg-dark-border' : 'bg-light-border'}`} />
        </div>

        {/* Right column */}
        <div>
          {!isEven && (
            <GlassCard className="h-full">
              <CardContent {...cardProps} />
            </GlassCard>
          )}
        </div>
      </div>

      {/* Mobile: simple stacked layout */}
      <div className="md:hidden">
        <GlassCard>
          <CardContent {...cardProps} />
        </GlassCard>
      </div>
    </motion.div>
  )
}

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading title="Experience" subtitle="// where I've worked" />
      <motion.div
        className="space-y-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {experiences.map((exp, i) => (
          <TimelineCard key={exp.id} experience={exp} index={i} />
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
