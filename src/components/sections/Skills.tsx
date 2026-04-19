import { useState } from 'react'
import { Code2, BookOpen, Users } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TabButton } from '@/components/ui/TabButton'
import { SkillsTabContent } from '@/components/sections/SkillsTabContent'
import { MarqueeText } from '@/components/ui/MarqueeText'
import { skillTabs } from '@/data/skills'
import { useTheme } from '@/context/useTheme'
import type { SkillTab } from '@/types'

const tabIcons: Record<string, typeof Code2> = {
  technologies: Code2,
  methodologies: BookOpen,
  'soft-skills': Users,
}

// Flat list of tech names for the marquee ticker
const techMarqueeItems = [
  'React 18', 'TypeScript', 'Next.js', 'Svelte 5', 'Vue.js', 'Node.js',
  'TanStack Query', 'Redux-Saga', 'AWS', 'Docker', 'Vite', 'Vitest',
  'TensorFlow.js', 'MediaPipe', 'Razorpay', 'Sentry', 'GitHub Actions',
]

export function Skills() {
  const [activeTab, setActiveTab] = useState<SkillTab>(skillTabs[0])
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <SectionWrapper id="skills">
      <SectionHeading title="Skills" subtitle="// what I know" />

      {/* Rolling tech marquee strip */}
      <div className="mb-10">
        <MarqueeText
          items={techMarqueeItems}
          speed={30}
          direction="left"
          separator="·"
          itemClassName={`font-mono text-sm font-semibold ${isDark ? 'text-electric-blue/70' : 'text-electric-blue/80'}`}
        />
        <MarqueeText
          items={[...techMarqueeItems].reverse()}
          speed={25}
          direction="right"
          separator="·"
          className="mt-2"
          itemClassName={`font-mono text-sm font-semibold ${isDark ? 'text-cyan-accent/50' : 'text-cyan-accent/60'}`}
        />
      </div>

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
