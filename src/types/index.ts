export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  proficiency: number; // 0-100
  yearsExp?: number;
  relatedProjects?: string[]; // Project IDs
}

export interface SkillSubCategory {
  title: string;
  skills: Skill[];
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class
  subCategories?: SkillSubCategory[];
  skills?: Skill[]; // For simpler categories
}

export interface SkillTab {
  id: string;
  label: string;
  categories: SkillCategory[];
}
