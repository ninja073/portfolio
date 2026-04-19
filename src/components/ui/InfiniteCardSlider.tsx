/**
 * InfiniteCardSlider — GSAP-powered drag-enabled infinite card carousel.
 *
 * Features:
 *  - Seamless infinite loop (array duplicated × 3)
 *  - Drag with momentum via GSAP Draggable + InertiaPlugin
 *  - Auto-advance ticker via gsap.ticker
 *  - Renders GlassCard children consistent with existing grid
 *  - Filter bar narrows visible items with GSAP cross-fade
 */

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { gsap, Draggable } from '@/animations/gsap'
import { GlassCard } from '@/components/ui/GlassCard'
import { TechBadge } from '@/components/ui/TechBadge'
import { Button } from '@/components/ui/Button'
import { ProjectModal } from '@/components/ui/ProjectModal'
import { projects, projectCategories } from '@/data/projects'
import { useTheme } from '@/context/useTheme'
import type { Project } from '@/types'

const CARD_WIDTH = 360
const CARD_GAP = 24
const CARD_STEP = CARD_WIDTH + CARD_GAP
const AUTO_SPEED = 0.35 // px per frame

export function InfiniteCardSlider() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const trackRef = useRef<HTMLDivElement>(null)
  const draggableRef = useRef<Draggable[]>([])
  const xRef = useRef(0)
  const isPausedRef = useRef(false)

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((p) => p.category === activeFilter)
  }, [activeFilter])

  // Triple the array so dragging never hits an empty edge
  const loopedProjects = useMemo(
    () => [...filteredProjects, ...filteredProjects, ...filteredProjects],
    [filteredProjects]
  )

  const totalLoopWidth = filteredProjects.length * CARD_STEP

  // Reset x on filter change
  useEffect(() => {
    xRef.current = 0
    gsap.set(trackRef.current, { x: 0 })
  }, [activeFilter])

  // GSAP Draggable + auto-ticker
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Cleanup previous Draggable instance
    draggableRef.current.forEach((d) => d.kill())

    draggableRef.current = Draggable.create(track, {
      type: 'x',
      inertia: true,
      edgeResistance: 0.65,
      onDragStart() { isPausedRef.current = true },
      onDragEnd() {
        // Snap to nearest card
        const currentX = gsap.getProperty(track, 'x') as number
        const snapped = Math.round(currentX / CARD_STEP) * CARD_STEP
        gsap.to(track, { x: snapped, duration: 0.4, ease: 'power2.out' })
        xRef.current = snapped
        setTimeout(() => { isPausedRef.current = false }, 600)
      },
      onDrag() {
        // Infinite wrap
        let currentX = gsap.getProperty(track, 'x') as number
        currentX = wrapX(currentX)
        gsap.set(track, { x: currentX })
        xRef.current = currentX
      },
    })

    // Auto-advance ticker
    const ticker = gsap.ticker
    const autoAdvance = () => {
      if (isPausedRef.current) return
      xRef.current -= AUTO_SPEED
      xRef.current = wrapX(xRef.current)
      gsap.set(track, { x: xRef.current })
    }
    ticker.add(autoAdvance)

    return () => {
      ticker.remove(autoAdvance)
      draggableRef.current.forEach((d) => d.kill())
    }
  }, [filteredProjects])

  function wrapX(x: number): number {
    // Wrap so we always stay within the middle copy of the triple-loop
    const max = 0
    const min = -totalLoopWidth * 2
    if (x < min) return x + totalLoopWidth
    if (x > max) return x - totalLoopWidth
    return x
  }

  return (
    <div>
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

      {/* Slider viewport */}
      <div
        className="card-slider-viewport"
        onMouseEnter={() => { isPausedRef.current = true }}
        onMouseLeave={() => { isPausedRef.current = false }}
      >
        <div ref={trackRef} className="card-slider-track">
          <AnimatePresence mode="popLayout">
            {loopedProjects.map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                className="card-slider-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="flex h-full flex-col select-none">
                  {/* Preview area */}
                  <div
                    className="mb-4 flex h-40 items-center justify-center rounded-xl"
                    style={{
                      background: isDark
                        ? 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(6,182,212,0.06))'
                        : 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(6,182,212,0.04))',
                    }}
                  >
                    <span className="font-mono text-sm text-electric-blue/50">
                      &lt;{project.title.replace(/\s+/g, '')} /&gt;
                    </span>
                  </div>

                  {/* Category badge */}
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
        </div>

        {/* Edge fade gradients */}
        <div className={`card-slider-fade-left ${isDark ? 'from-dark-bg' : 'from-light-bg'}`} />
        <div className={`card-slider-fade-right ${isDark ? 'from-dark-bg' : 'from-light-bg'}`} />
      </div>

      {/* Drag hint */}
      <p className={`mt-4 text-center font-mono text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
        ← drag to explore →
      </p>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}
