import { useState } from 'react'
import { Code2, BookOpen, Users } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TabButton } from '@/components/ui/TabButton'
import { SkillsTabContent } from '@/components/sections/SkillsTabContent'
import { skillTabs } from '@/data/skills'
import { useTheme } from '@/context/useTheme'
import type { SkillTab } from '@/types'

const tabIcons: Record<string, typeof Code2> = {
  technologies: Code2,
  methodologies: BookOpen,
  'soft-skills': Users,
}

export function Skills() {
  const [activeTab, setActiveTab] = useState<SkillTab>(skillTabs[0])
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <SectionWrapper id="skills">
      <SectionHeading title="Skills" subtitle="// what I know" />

      {/* Tab Navigation */}
      <div className="mb-8 flex justify-center">
        <div
          className={`inline-flex rounded-xl p-1 ${
            isDark ? 'bg-dark-card/50 border border-dark-border/50' : 'bg-light-card/80 border border-light-border'
          }`}
        >
          {skillTabs.map((tab) => {
            const Icon = tabIcons[tab.id] ?? Code2
            return (
              <TabButton
                key={tab.id}
                label={tab.label}
                isActive={activeTab.id === tab.id}
                onClick={() => setActiveTab(tab)}
                icon={Icon}
              />
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <SkillsTabContent activeTab={activeTab} />
    </SectionWrapper>
  )
}
