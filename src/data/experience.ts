import type { Experience } from '@/types'

export const experiences: Experience[] = [
  {
    id: 'rupifi-sde3',
    role: 'SDE 3 / Senior Frontend Engineer',
    company: 'Rupifi',
    period: 'Apr 2022 \u2014 Present',
    location: 'Bengaluru, India',
    description:
      'Leading frontend architecture and engineering for B2B lending and credit platforms, driving innovation in real-time identity verification, payment orchestration, and operational tooling.',
    achievements: [
      'Architected and built a credit onboarding platform with real-time face verification using TensorFlow.js and MediaPipe, reducing manual KYC processing time by 60%',
      'Designed a micro-frontend architecture with Module Federation, enabling independent team deployments and reducing release cycle time by 40%',
      'Led migration from class components to React 18 with Concurrent Features, improving LCP by 35% across the lending portal',
      'Built a comprehensive drawdown portal using Svelte 5 and SvelteKit, achieving 95+ Lighthouse scores across all metrics',
      'Implemented end-to-end observability with Sentry and custom performance monitoring, reducing mean time to detect frontend errors by 70%',
    ],
    techStack: [
      'React 18', 'TypeScript', 'Svelte 5', 'SvelteKit', 'TensorFlow.js',
      'MediaPipe', 'AWS', 'TanStack Query', 'Ant Design', 'Vitest',
    ],
  },
  {
    id: 'rupifi-se',
    role: 'Software Engineer (Founding Member)',
    company: 'Rupifi',
    period: 'Apr 2020 \u2014 Mar 2022',
    location: 'Bengaluru, India',
    description:
      'Core contributor to BNPL and operations platforms, building customer-facing checkout flows and internal tooling for payment operations at scale.',
    achievements: [
      'Built the BNPL SOA (Statement of Account) portal from scratch using React and TanStack Query, serving 10K+ active merchant users',
      'Developed the BNPL Ops Dashboard with Redux-Saga for complex async workflows, enabling the ops team to process 5x more daily transactions',
      'Integrated Razorpay and PayU payment gateways into the B2B checkout flow using Vue.js, handling INR 50Cr+ monthly transactions',
      'Established component library and design system using Storybook, reducing UI development time by 30% across teams',
    ],
    techStack: [
      'React', 'Vue.js', 'Redux-Saga', 'TanStack Query', 'Ant Design',
      'Razorpay', 'PayU', 'Storybook', 'AWS', 'Docker',
    ],
  },
  {
    id: 'varadhi',
    role: 'Software Engineer (Founding Member)',
    company: 'Varadhi Smartek',
    period: 'Jun 2018 \u2014 Mar 2020',
    location: 'Hyderabad, India',
    description:
      'Full-stack development on enterprise applications, building responsive web interfaces and RESTful APIs for client projects across multiple domains.',
    achievements: [
      'Built responsive web applications using Angular and React, delivering 5+ client projects on schedule',
      'Developed RESTful APIs with Node.js and Express, supporting 100+ concurrent users with sub-200ms response times',
      'Implemented CI/CD pipelines with Jenkins and Docker, reducing deployment time from hours to minutes',
    ],
    techStack: [
      'Angular', 'React', 'Node.js', 'Express', 'MongoDB',
      'Docker', 'Jenkins', 'HTML5', 'SCSS', 'Git',
    ],
  },
]
