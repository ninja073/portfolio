import type { NavItem, SocialLink, Stat } from '@/types'

export const navItems: NavItem[] = [
  { label: 'Home', href: 'hero' },
  { label: 'About', href: 'about' },
  { label: 'Experience', href: 'experience' },
  { label: 'Projects', href: 'projects' },
  { label: 'Skills', href: 'skills' },
  { label: 'Contact', href: 'contact' },
]

export const personal = {
  name: 'NITISH JAISWAL',
  title: 'Senior Frontend Engineer \u00B7 SDE 3',
  greeting: "Hello, I'm",
  bio: [
    "I'm a Senior Frontend Engineer with 8+ years of experience building high-impact B2B fintech products. I specialize in crafting performant, scalable web applications using React, TypeScript, and modern frontend architectures.",
    'Currently at Rupifi, I lead frontend engineering for credit onboarding and lending platforms that serve thousands of businesses. My work spans from building real-time KYC flows with TensorFlow.js to architecting micro-frontend systems on AWS.',
    'I believe great software is invisible \u2014 users should feel empowered, not confused. I obsess over performance, accessibility, and developer experience in equal measure.',
  ],
  location: 'Bengaluru, India',
  email: 'nitishkrj@gmail.com',
  phone: '+91-78293 40831',
  resumeUrl: '#',
} as const

export const stats: Stat[] = [
  { label: 'Years Experience', value: 8, suffix: '+' },
  { label: 'Projects Delivered', value: 25, suffix: '+' },
  { label: 'Companies', value: 3 },
]

export const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/ninja073', icon: 'Github' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/nitishjaiswal-792aa2b1', icon: 'Linkedin' },
  { platform: 'Email', url: 'mailto:nitishkrj@gmail.com', icon: 'Mail' },
  { platform: 'Phone', url: 'tel:+917829340831', icon: 'Phone' },
]

export const heroBadges = [
  'React', 'React Native', 'Javascript', 'TypeScript', 'Next.js', 'AWS', 'Node.js', 'Svelte',
]
