import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { InfiniteCardSlider } from '@/components/ui/InfiniteCardSlider'

export function Projects() {
  return (
    <SectionWrapper id="projects">
      <SectionHeading title="Projects" subtitle="// what I've built" />
      <InfiniteCardSlider />
    </SectionWrapper>
  )
}
