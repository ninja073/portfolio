export interface NavItem {
  label: string
  href: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface Stat {
  label: string
  value: number
  suffix?: string
}

export interface Experience {
  id: string
  role: string
  company: string
  period: string
  location: string
  description: string
  achievements: string[]
  techStack: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  techStack: string[]
  category: string
  featured: boolean
}

export interface SkillCategory {
  name: string
  icon: string
  skills: Skill[]
}

export interface Skill {
  name: string
  level: number
}
