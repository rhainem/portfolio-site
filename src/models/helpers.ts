import type { ProjectCategory } from './types'

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((p) => p[0]?.toUpperCase()).join('')
}

export function getCategoryOrder(cat: ProjectCategory) {
  const order: Record<ProjectCategory, number> = {
    Branding: 0,
    Digital: 1,
    Editorial: 2,
    Packaging: 3,
    Illustration: 4,
    Other: 5,
  }
  return order[cat] ?? 99
}

export function projectCover(slug: string) {
  return `/images/projects/${slug}/cover.jpg`
}
