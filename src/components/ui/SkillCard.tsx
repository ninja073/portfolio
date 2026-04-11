import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Code2,
  ArrowRight,
  Layout,
  Database,
  Server,
  CreditCard,
  Cloud,
  Brain,
  Eye,
  Wrench,
  Zap,
  Accessibility,
  Layers,
  CircleCheck,
  Shield,
  Sparkles,
  Rocket,
  Activity,
  Smartphone,
  Webhook,
  Users,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { fadeInUp } from '@/animations/variants'
import { useTheme } from '@/context/useTheme'
import type { SkillCategory } from '@/types'

const iconMap: Record<string, typeof Code2> = {
  Code2,
  Layout,
  Database,
  Server,
  CreditCard,
  Cloud,
  Brain,
  Eye,
  Wrench,
  Zap,
  Accessibility,
  Layers,
  CircleCheck,
  Shield,
  Sparkles,
  Rocket,
  Activity,
  Smartphone,
  Webhook,
  Users,
}

interface SkillCardProps {
  category: SkillCategory
}

export function SkillCard({ category }: SkillCardProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const Icon = iconMap[category.icon] ?? Code2

  const hasProjects = category.skills?.some((skill) => skill.relatedProjects && skill.relatedProjects.length > 0)

  return (
    <GlassCard className="h-full" hover={false}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="h-full"
      >
        {/* Header */}
        <div className="mb-5 flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${category.color}/10`}>
            <Icon size={20} className={category.color} />
          </div>
          <h3 className={`font-mono text-base font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            {category.title}
          </h3>
        </div>

        {/* Skills with subcategories */}
        {category.subCategories && (
          <div className="space-y-4">
            {category.subCategories.map((subCat) => (
              <div key={subCat.title}>
                <h4 className={`mb-2 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {subCat.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {subCat.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      variants={fadeInUp}
                      custom={index}
                      whileHover="hover"
                      className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                        isDark
                          ? 'border-dark-border/50 bg-dark-card/50 text-gray-300 hover:border-electric-blue/50'
                          : 'border-light-border bg-light-card/50 text-gray-700 hover:border-electric-blue/50'
                      }`}
                    >
                      {skill.name}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills without subcategories - display as badges */}
        {category.skills && !category.subCategories && category.id !== 'soft-skills-main' && (
          <div className="space-y-3">
            {category.skills.map((skill, index) => (
              <div key={skill.name} className="group">
                <div className="mb-1.5 flex items-center justify-between">
                  <motion.span
                    className={`font-mono text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    whileHover="hover"
                  >
                    {skill.name}
                  </motion.span>
                  <span
                    className={`font-mono text-xs transition-opacity ${
                      isDark ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  >
                    {skill.proficiency}%
                  </span>
                </div>
                <div className={`h-2 overflow-hidden rounded-full ${isDark ? 'bg-dark-border/50' : 'bg-gray-200'}`}>
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-electric-blue to-cyan-accent"
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: skill.proficiency / 100 } : { scaleX: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                    style={{ transformOrigin: 'left' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Soft Skills - display as simple list */}
        {category.skills && category.id === 'soft-skills-main' && (
          <div className="space-y-2">
            {category.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={fadeInUp}
                custom={index}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                  isDark ? 'bg-dark-card/50 text-gray-300' : 'bg-light-card/50 text-gray-700'
                }`}
              >
                <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-electric-blue" />
                <span className="text-sm">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        )}

        {/* View Projects Link */}
        {hasProjects && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 pt-4 border-t border-dashed border-electric-blue/20"
          >
            <button
              className={`group flex items-center gap-1 text-sm font-medium transition-colors ${
                isDark ? 'text-electric-blue hover:text-cyan-accent' : 'text-electric-blue hover:text-cyan-accent'
              }`}
            >
              View projects using these skills
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </GlassCard>
  )
}
