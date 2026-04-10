import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code2, Layout, Database, Server, CreditCard } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { staggerContainer, fadeInUp } from '@/animations/variants'
import { skillCategories } from '@/data/skills'
import { useTheme } from '@/context/useTheme'
import type { SkillCategory } from '@/types'

const iconMap: Record<string, typeof Code2> = {
  Code2,
  Layout,
  Database,
  Server,
  CreditCard,
}

function SkillBar({ name, level, inView, delay }: { name: string; level: number; inView: boolean; delay: number }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="group">
      <div className="mb-1.5 flex items-center justify-between">
        <span className={`font-mono text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {name}
        </span>
        <span
          className={`font-mono text-xs transition-opacity ${
            isDark ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-400 group-hover:text-gray-600'
          }`}
        >
          {level}%
        </span>
      </div>
      <div className={`h-2 overflow-hidden rounded-full ${isDark ? 'bg-dark-border/50' : 'bg-gray-200'}`}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-electric-blue to-cyan-accent"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: level / 100 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: delay * 0.1, ease: 'easeOut' }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </div>
  )
}

function SkillCategoryCard({ category }: { category: SkillCategory }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const Icon = iconMap[category.icon] ?? Code2
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <GlassCard className="h-full">
      <div ref={ref}>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-blue/10">
            <Icon size={20} className="text-electric-blue" />
          </div>
          <h3 className={`font-mono text-base font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            {category.name}
          </h3>
        </div>
        <div className="space-y-3">
          {category.skills.map((skill, i) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} inView={inView} delay={i} />
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading title="Skills" subtitle="// what I know" />
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skillCategories.map((category) => (
          <motion.div key={category.name} variants={fadeInUp}>
            <SkillCategoryCard category={category} />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
