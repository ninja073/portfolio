import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { TechBadge } from '@/components/ui/TechBadge'
import { modalOverlay, modalContent } from '@/animations/variants'
import { useTheme } from '@/context/useTheme'
import type { Project } from '@/types'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { theme } = useTheme()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (project) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          variants={modalOverlay}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className={`relative z-10 w-full max-w-2xl rounded-2xl border p-8 ${
              theme === 'dark'
                ? 'border-dark-border bg-dark-surface'
                : 'border-light-border bg-white'
            }`}
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-dark-card hover:text-white"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <span className="mb-2 inline-block rounded-full bg-electric-blue/10 px-3 py-1 font-mono text-xs text-electric-blue">
              {project.category}
            </span>

            <h3
              id="modal-title"
              className={`mb-4 text-2xl font-bold ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}
            >
              {project.title}
            </h3>

            <p
              className={`mb-6 leading-relaxed ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {project.longDescription}
            </p>

            <div>
              <h4 className="mb-3 font-mono text-sm text-cyan-accent">// tech stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <TechBadge key={tech} label={tech} size="md" />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
