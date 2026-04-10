import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { TechBadge } from '@/components/ui/TechBadge'
import { Button } from '@/components/ui/Button'
import { ProjectModal } from '@/components/ui/ProjectModal'
import { scaleIn, staggerContainer } from '@/animations/variants'
import { projects, projectCategories } from '@/data/projects'
import { useTheme } from '@/context/useTheme'
import type { Project } from '@/types'

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((p) => p.category === activeFilter)
  }, [activeFilter])

  return (
    <SectionWrapper id="projects">
      <SectionHeading title="Projects" subtitle="// what I've built" />

      {/* Filter bar */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {projectCategories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`rounded-xl px-5 py-2 font-mono text-sm transition-all duration-300 ${
              activeFilter === cat
                ? 'bg-electric-blue text-white shadow-lg shadow-electric-blue/25'
                : isDark
                  ? 'border border-dark-border text-gray-400 hover:border-electric-blue/50 hover:text-gray-200'
                  : 'border border-light-border text-gray-600 hover:border-electric-blue/50 hover:text-gray-900'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Project grid */}
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard className="flex h-full flex-col">
                {/* Preview area */}
                <div
                  className="mb-4 flex h-40 items-center justify-center rounded-xl"
                  style={{
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(6,182,212,0.05))'
                      : 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(6,182,212,0.04))',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                >
                  <span className="font-mono text-sm text-electric-blue/50">
                    &lt;{project.title.replace(/\s+/g, '')} /&gt;
                  </span>
                </div>

                {/* Category */}
                <span className="mb-2 inline-block w-fit rounded-full bg-electric-blue/10 px-3 py-0.5 font-mono text-xs text-electric-blue">
                  {project.category}
                </span>

                {/* Title & description */}
                <h3 className={`mb-2 text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                  {project.title}
                </h3>
                <p className={`mb-4 flex-1 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.description}
                </p>

                {/* Tech badges */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <TechBadge key={tech} label={tech} />
                  ))}
                  {project.techStack.length > 4 && (
                    <span className={`px-2 py-1 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-auto">
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedProject(project)}
                    icon={<ExternalLink size={14} />}
                    className="!px-0"
                  >
                    View Details
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </SectionWrapper>
  )
}
