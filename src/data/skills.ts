import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    icon: 'Code2',
    skills: [
      { name: 'TypeScript', level: 95 },
      { name: 'JavaScript', level: 95 },
      { name: 'Kotlin', level: 55 },
      { name: 'HTML5', level: 90 },
      { name: 'SCSS/CSS', level: 90 },
    ],
  },
  {
    name: 'Frontend',
    icon: 'Layout',
    skills: [
      { name: 'React 18', level: 95 },
      { name: 'React Native', level: 70 },
      { name: 'Vue.js', level: 75 },
      { name: 'Svelte 5', level: 80 },
      { name: 'Next.js', level: 85 },
      { name: 'Angular', level: 65 },
    ],
  },
  {
    name: 'State & Data',
    icon: 'Database',
    skills: [
      { name: 'Redux', level: 90 },
      { name: 'Jotai', level: 75 },
      { name: 'TanStack Query', level: 90 },
      { name: 'GraphQL', level: 65 },
    ],
  },
  {
    name: 'Backend & Tools',
    icon: 'Server',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'AWS', level: 75 },
      { name: 'Docker', level: 70 },
      { name: 'Firebase', level: 65 },
      { name: 'Sentry', level: 80 },
      { name: 'Git', level: 90 },
    ],
  },
  {
    name: 'Payments',
    icon: 'CreditCard',
    skills: [
      { name: 'Razorpay', level: 85 },
      { name: 'PayU', level: 80 },
      { name: 'PG Integration', level: 85 },
    ],
  },
]
