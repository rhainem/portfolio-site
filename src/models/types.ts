export type ProjectCategory =
  | 'Branding'
  | 'Editorial'
  | 'Digital'
  | 'Packaging'
  | 'Illustration'
  | 'Other'

export type Project = {
  id: string
  title: string
  year: string
  category: ProjectCategory
  tags: string[]
  summary: string
  role: string
  tools: string[]
  coverAlt: string
  links?: { label: string; href: string }[]
  highlights: string[]
  process: { label: string; content: string }[]
  images?: string[]
  media?: ProjectMediaItem[]
}

export type SortKey = 'featured' | 'newest' | 'category'

export type NavItem = {
  id: 'work' | 'about' | 'services' | 'contact'
  label: string
}

export type Profile = {
  name: string
  title: string
  location: string
  tagline: string
  email: string
  availability: string
  socials: { label: string; href: string }[]
  resumeHref: string
}

export type MediaKind = 'image' | 'video'

export type MediaGroup =
  | 'Heroes'
  | 'Web'
  | 'Socials'
  | 'Print'
  | 'Social Media Ads'
  | 'EDM'
  | 'Photography'
  | 'Preview'
  | 'Other'

export type ProjectMediaItem = {
  id: string
  kind: MediaKind
  group: MediaGroup
  src: string
  alt?: string
  aspect?: 'ultrawide' | 'banner' | 'wide' | 'square' | 'portrait' | 'auto'
}
