import { motion, AnimatePresence } from 'framer-motion'
import { SkillCard } from '@/components/ui/SkillCard'
import { tabContentTransition, staggerContainer, fadeInUp } from '@/animations/variants'
import type { SkillTab } from '@/types'

interface SkillsTabContentProps {
  activeTab: SkillTab
}

export function SkillsTabContent({ activeTab }: SkillsTabContentProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab.id}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="min-h-[400px]"
      >
        <motion.div
          variants={tabContentTransition}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {activeTab.categories.map((category) => (
            <motion.div key={category.id} variants={fadeInUp}>
              <SkillCard category={category} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
