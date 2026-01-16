import type { Project, Profile, NavItem } from './types'

export const PROFILE: Profile = {
  name: 'Name',
  title: 'Graphic Designer',
  location: 'Auckland, NZ',
  tagline:
    'I design clear, confident brands and systems that scale across print + digital.',
  email: 'you@example.com',
  availability: 'Available for freelance • 2026',
  socials: [{ label: 'LinkedIn', href: '#' }],
  resumeHref: '#',
}

export const PROJECTS: Project[] = [
  {
    id: 'a',
    title: 'Tail',
    year: '2025',
    category: 'Other',
    tags: ['Identity', 'Packaging', 'Art Direction'],
    summary:
      'A full-stack web application that helps reunite lost pets with their owners. Users can report lost or found pets, view nearby pet sightings on an interactive map, and browse recent cases. Built with modern technologies like React, TypeScript, Node.js, and Google Maps API.',
    role: 'Git Keeper',
    tools: ['Illustrator', 'InDesign', 'Figma'],
    links: [
      { label: 'Live site', href: '#' },
      { label: 'Case study PDF', href: '#' },
    ],
    highlights: [
      'Interactive Google Map with custom styling',
      'Submit lost or found pet reports via form',
      'Filter pets by status (Lost / Found / All)',
      'View recent pet sightings in real-time',
      'Auth0 authentication (Sign in / Sign out)',
      'Beautiful responsive UI styled with TailwindCSS',
    ],
    process: [
      {
        label: 'Challenge',
        content:
          'Unify multiple product lines under one brand while keeping room for seasonal releases.',
      },
      {
        label: 'Approach',
        content:
          'Designed a modular system: core mark + variable descriptor, supported by a high-contrast palette and typographic hierarchy.',
      },
      {
        label: 'Outcome',
        content:
          'A cohesive brand kit that works across packaging, signage, and digital templates for quick rollout.',
      },
    ],
    coverAlt: 'Cobalt Roastery brand identity mockups',
    images: [
      '/images/projects/a/image-1.jpg',
      '/images/projects/a/video-1.mp4',
      '/images/projects/a/image-2.jpg',
      '/images/projects/a/image-3.jpg',
      '/images/projects/a/image-4.jpg',
      '/images/projects/a/image-5.jpg',
      '/images/projects/a/image-6.jpg',
      '/images/projects/a/image-7.jpg',
      '/images/projects/a/image-8.jpg',
    ],
  },

  {
    id: 'b',
    title: 'RS',
    year: '2025',
    category: 'Digital',
    tags: ['Identity', 'UI', 'Design System'],
    summary:
      'A digital-first identity system designed for clarity, consistency, and scale.',
    role: 'Lead Designer',
    tools: ['Figma', 'Illustrator'],
    coverAlt: 'RS digital identity cover',
    highlights: [],
    process: [],
    images: [
      '/images/projects/b/image-1.jpg',
      '/images/projects/b/image-2.jpg',
      '/images/projects/b/image-3.jpg',
      '/images/projects/b/image-4.jpg',
      '/images/projects/b/image-5.jpg',
      '/images/projects/b/image-6.jpg',
    ],
  },

  {
    id: 'c',
    title: 'BB',
    year: '2025',
    category: 'Branding',
    tags: ['Identity', 'Packaging', 'Art Direction'],
    summary:
      'A modern coffee brand built around a modular logotype and bold color system designed for high shelf impact.',
    role: 'Lead Designer',
    tools: ['Illustrator', 'InDesign', 'Figma'],
    links: [
      { label: 'Live site', href: '#' },
      { label: 'Case study PDF', href: '#' },
    ],
    highlights: [
      'Created a flexible identity system with 12 modular lockups.',
      'Reduced label SKUs by 30% through a standardized template.',
      'Improved in-store recognition with consistent shelf-blocking.',
    ],
    process: [
      {
        label: 'Challenge',
        content:
          'Unify multiple product lines under one brand while keeping room for seasonal releases.',
      },
      {
        label: 'Approach',
        content:
          'Designed a modular system: core mark + variable descriptor, supported by a high-contrast palette and typographic hierarchy.',
      },
      {
        label: 'Outcome',
        content:
          'A cohesive brand kit that works across packaging, signage, and digital templates for quick rollout.',
      },
    ],
    coverAlt: 'BB brand identity mockups',
    images: [
      '/images/projects/c/image-1.jpg',
      '/images/projects/c/image-2.jpg',
      '/images/projects/c/image-3.jpg',
      '/images/projects/c/image-4.jpg',
      '/images/projects/c/image-5.jpg',
      '/images/projects/c/image-6.jpg',
    ],
  },

  {
    id: 'd',
    title: 'Project',
    year: '2025',
    category: 'Digital',
    tags: ['Identity', 'UI', 'Design System'],
    summary:
      'A digital-first identity system designed for clarity, consistency, and scale.',
    role: 'Lead Designer',
    tools: ['Figma', 'Illustrator'],
    coverAlt: 'RS digital identity cover',
    highlights: [],
    process: [],
    images: [
      '/images/projects/d/image-1.jpg',
      '/images/projects/d/image-2.jpg',
      '/images/projects/d/image-3.jpg',
      '/images/projects/d/image-4.jpg',
      '/images/projects/d/image-5.jpg',
      '/images/projects/d/image-6.jpg',
    ],
  },
  {
    id: 'e',
    title: 'Project',
    year: '2025',
    category: 'Digital',
    tags: ['Identity', 'UI', 'Design System'],
    summary:
      'A digital-first identity system designed for clarity, consistency, and scale.',
    role: 'Lead Designer',
    tools: ['Figma', 'Illustrator'],
    coverAlt: 'RS digital identity cover',
    highlights: [],
    process: [],
    images: [
      '/images/projects/e/image-1.jpg',
      '/images/projects/e/image-2.jpg',
      '/images/projects/e/image-3.jpg',
      '/images/projects/e/image-4.jpg',
      '/images/projects/e/image-5.jpg',
      '/images/projects/e/image-6.jpg',
    ],
  },
  {
    id: 'f',
    title: 'Project',
    year: '2025',
    category: 'Digital',
    tags: ['Identity', 'UI', 'Design System'],
    summary:
      'A digital-first identity system designed for clarity, consistency, and scale.',
    role: 'Lead Designer',
    tools: ['Figma', 'Illustrator'],
    coverAlt: 'RS digital identity cover',
    highlights: [],
    process: [],
    images: [
      '/images/projects/f/image-1.jpg',
      '/images/projects/f/image-2.jpg',
      '/images/projects/f/image-3.jpg',
      '/images/projects/f/image-4.jpg',
      '/images/projects/f/image-5.jpg',
      '/images/projects/f/image-6.jpg',
    ],
  },
]

export const NAV: readonly NavItem[] = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
] as const
