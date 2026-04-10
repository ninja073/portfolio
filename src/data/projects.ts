import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'credit-onboarding',
    title: 'Credit Onboarding Platform',
    description:
      'Real-time credit onboarding with AI-powered face verification and document validation for B2B lending.',
    longDescription:
      'A comprehensive credit onboarding platform that leverages TensorFlow.js and MediaPipe for real-time face verification and liveness detection. The platform guides business users through KYC documentation, PAN/Aadhaar verification, and credit assessment \u2014 reducing manual processing time by 60%. Built with React 18 and deployed on AWS with CloudFront for global edge delivery.',
    techStack: ['React 18', 'TypeScript', 'TensorFlow.js', 'MediaPipe', 'AWS', 'TanStack Query'],
    category: 'Fintech',
    featured: true,
  },
  {
    id: 'drawdown-portal',
    title: 'Drawdown Portal',
    description:
      'Merchant loan drawdown and repayment management portal built with Svelte 5 for blazing performance.',
    longDescription:
      'A modern loan management portal enabling merchants to view credit limits, initiate drawdowns, track repayments, and download statements. Built with Svelte 5 and SvelteKit for server-side rendering, achieving 95+ Lighthouse scores. Features include real-time balance updates, EMI calculators, and PDF statement generation.',
    techStack: ['Svelte 5', 'SvelteKit', 'TypeScript', 'Vitest', 'TailwindCSS'],
    category: 'Fintech',
    featured: true,
  },
  {
    id: 'bnpl-soa',
    title: 'BNPL SOA Portal',
    description:
      'Statement of Account portal for BNPL merchants with real-time transaction tracking and analytics.',
    longDescription:
      'A merchant-facing Statement of Account portal serving 10K+ active users. Features include transaction history with advanced filtering, downloadable PDF/CSV statements, payment due reminders, and a merchant analytics dashboard. Built with React and TanStack Query for optimistic updates and efficient cache management.',
    techStack: ['React', 'TanStack Query', 'Ant Design', 'TypeScript', 'Chart.js'],
    category: 'Fintech',
    featured: true,
  },
  {
    id: 'bnpl-ops',
    title: 'BNPL Ops Dashboard',
    description:
      'Internal operations dashboard for managing BNPL transactions, merchant onboarding, and risk assessment.',
    longDescription:
      'An internal operations dashboard handling complex async workflows for BNPL transaction processing. Features include bulk transaction management, merchant risk scoring, automated reconciliation, and real-time monitoring. Built with React and Redux-Saga for managing complex side effects and concurrent API calls.',
    techStack: ['React', 'Redux-Saga', 'Ant Design', 'AWS', 'Docker'],
    category: 'Platform',
    featured: false,
  },
  {
    id: 'b2b-checkout',
    title: 'B2B Checkout & Payment Gateway',
    description:
      'Multi-gateway checkout flow handling INR 50Cr+ monthly with Razorpay and PayU integration.',
    longDescription:
      'A B2B checkout system integrating multiple payment gateways (Razorpay, PayU) with intelligent routing based on transaction type, amount, and success rates. Features include split payments, partial refunds, webhook-based status tracking, and comprehensive transaction reporting. Built with Vue.js for its lightweight reactivity model.',
    techStack: ['Vue.js', 'Razorpay', 'PayU', 'Node.js', 'TypeScript'],
    category: 'Platform',
    featured: true,
  },
]

export const projectCategories = ['All', 'Fintech', 'Platform'] as const
