import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Button } from './components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card'
import { Badge } from './components/ui/Badge'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './components/ui/Dialog'
import { Input } from './components/ui/Input'
import { Separator } from './components/ui/Separator'
import {
  ArrowUpRight,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Search,
} from 'lucide-react'
import styles from './Portfolio.module.css'

type Project = {
  id: string
  title: string
  year: string
  category:
    | 'Branding'
    | 'Editorial'
    | 'Digital'
    | 'Packaging'
    | 'Illustration'
    | 'Other'
  tags: string[]
  summary: string
  role: string
  tools: string[]
  coverAlt: string
  links?: { label: string; href: string }[]
  highlights: string[]
  process: { label: string; content: string }[]
  images?: string[]
}

const PROFILE = {
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

const PROJECTS: Project[] = [
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

const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
] as const

type SortKey = 'featured' | 'newest' | 'category'

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((p) => p[0]?.toUpperCase()).join('')
}

function getCategoryOrder(cat: Project['category']) {
  const order: Record<Project['category'], number> = {
    Branding: 0,
    Digital: 1,
    Editorial: 2,
    Packaging: 3,
    Illustration: 4,
    Other: 5,
  }
  return order[cat] ?? 99
}

function projectCover(slug: string) {
  return `/images/projects/${slug}/cover.jpg`
}

function projectImages(slug: string) {
  return [
    `/images/projects/${slug}/image-1.jpg`,
    `/images/projects/${slug}/image-2.jpg`,
    `/images/projects/${slug}/image-3.jpg`,
  ]
}

export default function PortfolioSite() {
  const reduceMotion = useReducedMotion()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('featured')
  const [activeCategory, setActiveCategory] = useState<
    Project['category'] | 'All'
  >('All')
  const [openId, setOpenId] = useState<string | null>(null)

  const categories = useMemo(() => {
    const unique = Array.from(new Set(PROJECTS.map((p) => p.category)))
    unique.sort((a, b) => getCategoryOrder(a) - getCategoryOrder(b))
    return ['All' as const, ...unique]
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = PROJECTS.filter((p) => {
      const matchesQuery =
        !q ||
        [p.title, p.summary, p.category, p.year, ...p.tags]
          .join(' ')
          .toLowerCase()
          .includes(q)
      const matchesCategory =
        activeCategory === 'All' ? true : p.category === activeCategory
      return matchesQuery && matchesCategory
    })

    if (sort === 'newest') {
      list = [...list].sort((a, b) => Number(b.year) - Number(a.year))
    } else if (sort === 'category') {
      list = [...list].sort(
        (a, b) =>
          getCategoryOrder(a.category) - getCategoryOrder(b.category) ||
          a.title.localeCompare(b.title)
      )
    }

    return list
  }, [query, sort, activeCategory])

  const active = useMemo(
    () => PROJECTS.find((p) => p.id === openId) ?? null,
    [openId]
  )

  const images = active?.images ?? []

  const container = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.35, ease: 'easeOut' },
    },
  }

  return (
    <div className={styles.page}>
      <a href="#main" className={`${styles.srOnly} ${styles.skipLink}`}>
        Skip to content
      </a>

      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <a
            href="#top"
            className={styles.brand}
            aria-label={`${PROFILE.name} — home`}
          >
            <div className={styles.brandMark}>{initials(PROFILE.name)}</div>
            <div className={styles.brandText}>
              <div className={styles.brandName}>{PROFILE.name}</div>
              <div className={styles.brandRole}>{PROFILE.title}</div>
            </div>
          </a>

          <nav aria-label="Primary" className={styles.nav}>
            {NAV.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.headerActions}>
            <Button asChild variant="secondary" className={styles.hideOnMobile}>
              <a href={PROFILE.resumeHref} aria-label="Download resume">
                <Download size={16} className={styles.iconLeft} /> Resume
              </a>
            </Button>
            <Button asChild>
              <a href={`mailto:${PROFILE.email}`}>
                <Mail size={16} className={styles.iconLeft} /> Contact
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main id="main" className={styles.container}>
        <section id="top" className={styles.section}>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={styles.heroGrid}
          >
            <div className={styles.stack}>
              <div className={styles.heroPill}>
                <MapPin size={14} />
                <span>{PROFILE.location}</span>
                <span aria-hidden>•</span>
                <span>{PROFILE.availability}</span>
              </div>

              <h1 className={styles.h1}>{PROFILE.tagline}</h1>

              <p className={styles.lead}>
                I’m {PROFILE.name} — {PROFILE.title}. I help teams and founders
                turn complex ideas into clean systems: brand identity, editorial
                design, and UI.
              </p>

              <div className={styles.badgeRow}>
                <Badge>Brand systems</Badge>
                <Badge>Print + editorial</Badge>
                <Badge>UI + design tokens</Badge>
                <Badge>Art direction</Badge>
              </div>

              <div className={styles.ctaRow}>
                <Button asChild>
                  <a href="#work" className="selected">
                    View selected work <ArrowUpRight size={16} />
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a href={`mailto:${PROFILE.email}`}>Let’s talk</a>
                </Button>
              </div>
            </div>

            <Card className={styles.card}>
              <CardHeader>
                <CardTitle>At a glance</CardTitle>
              </CardHeader>
              <CardContent className={styles.stackSm}>
                <div className={styles.cardTight}>
                  <div className="{styles.special}">
                    <div className={styles.smallTitle}>Specialties</div>
                    <div className={styles.muted}>Identity • Layout • UI</div>
                  </div>
                  <ExternalLink size={16} className={styles.mutedIcon} />
                </div>

                <div className={styles.cardTight}>
                  <div>
                    <div className={styles.smallTitle}>Approach</div>
                    <div className={styles.muted}>
                      Systems-first • Accessible
                    </div>
                  </div>
                  <ExternalLink size={16} className={styles.mutedIcon} />
                </div>

                <Separator />

                <div className={styles.socialRow}>
                  {PROFILE.socials.map((s) => (
                    <a key={s.label} href={s.href} className={styles.chipLink}>
                      {s.label}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section id="work" className={styles.section}>
          <div className={styles.workTop}>
            <div>
              <h2 className={styles.h2}>Selected work</h2>
              <p className={styles.subtle}>
                Clear previews, quick filtering, and expandable case studies.
              </p>
            </div>

            <div className={styles.controls}>
              <div className={styles.searchWrap}>
                <Search size={16} className={styles.searchIcon} />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects…"
                  className={`${styles.input} ${styles.inputPadLeft}`}
                  aria-label="Search projects"
                />
              </div>

              <div className={styles.selectRow}>
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value as any)}
                  className={styles.select}
                  aria-label="Filter by category"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className={styles.select}
                  aria-label="Sort projects"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="category">Category</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.grid}>
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                whileInView={
                  reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.2 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.35 }}
              >
                <Card className={`${styles.card} ${styles.projectCard}`}>
                  <button
                    type="button"
                    onClick={() => setOpenId(p.id)}
                    className={styles.projectButton}
                    aria-label={`Open case study: ${p.title}`}
                  >
                    <div className={styles.thumb}>
                      <img
                        src={projectCover(p.id)}
                        alt={p.coverAlt}
                        className={styles.thumbImg}
                        loading="lazy"
                      />

                      <div className={styles.thumbLabel}>
                        {p.category} • {p.year}
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle>{p.title}</CardTitle>
                      <p className={styles.mutedLineClamp}>{p.summary}</p>
                    </CardHeader>

                    <CardContent className={styles.stackSm}>
                      <div className={styles.badgeRow}>
                        {p.tags.slice(0, 3).map((t) => (
                          <Badge key={t}>{t}</Badge>
                        ))}
                      </div>

                      <div className={styles.viewRow}>
                        <span className={styles.viewStrong}>
                          View case study
                        </span>
                        <ArrowUpRight size={16} />
                      </div>
                    </CardContent>
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className={styles.section}>
          <div className={styles.workTop}>
            <div>
              <h2 className={styles.h2}>About</h2>
            </div>
          </div>

          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <p className={styles.aboutParagraph}>
                A short, scannable story. Details in case studies.
              </p>
            </div>

            <div className={styles.aboutCard}>
              <div className={styles.aboutCardInner}>
                <p className={styles.aboutParagraph}>
                  I build design systems that make brands feel consistent
                  wherever they show up — packaging, editorial layouts, social
                  templates, and product UI. My work balances craft and
                  constraints so teams can move fast without losing quality.
                </p>
                <div className={styles.aboutCols}>
                  <div className={styles.aboutMiniCard}>
                    <div className={styles.smallTitle}>Strengths</div>
                    <ul className={styles.list}>
                      <li>Typography + hierarchy</li>
                      <li>Grid + spacing systems</li>
                      <li>Identity rollouts</li>
                    </ul>
                  </div>

                  <div className={styles.aboutMiniCard}>
                    <div className={styles.smallTitle}>Values</div>
                    <ul className={styles.list}>
                      <li>Clarity over clever</li>
                      <li>Accessible by default</li>
                      <li>Systems that scale</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className={styles.section}>
          <div className={styles.workTop}>
            <div>
              <h2 className={styles.h2}>Services</h2>
              <p className={styles.subtle}>
                Simple menu, clear outcomes, and fast ways to reach you.
              </p>
            </div>
          </div>

          <div className={styles.servicesGrid}>
            {[
              {
                title: 'Brand identity',
                desc: 'Logos, typography, palettes, and templates designed as a system.',
                bullets: ['Identity kit', 'Guidelines', 'Templates'],
              },
              {
                title: 'Editorial + print',
                desc: 'Grid-driven layouts for magazines, reports, and campaigns.',
                bullets: [
                  'Layout system',
                  'Production-ready files',
                  'Style sheets',
                ],
              },
              {
                title: 'UI + design systems',
                desc: 'Components, tokens, and documentation to support product teams.',
                bullets: ['Token setup', 'Components', 'Handoff'],
              },
            ].map((s) => (
              <Card key={s.title} className={styles.serviceCard}>
                <CardHeader>
                  <CardTitle>{s.title}</CardTitle>
                  <p className={styles.muted} style={{ margin: '8px 0 0 0' }}>
                    {s.desc}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className={styles.list}>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className={styles.section}>
          <Card className={styles.contactCard}>
            <CardContent>
              <div className={styles.contactInner}>
                <div>
                  <h2 className={styles.h2}>Let’s build something clean.</h2>
                  <p className={styles.subtle}>
                    Email me a brief, timeline, and any references. I’ll reply
                    with a plan and an estimate.
                  </p>
                </div>

                <div className={styles.contactActions}>
                  <Button asChild>
                    <a href={`mailto:${PROFILE.email}`}>
                      <Mail size={16} className={styles.iconLeft} />
                      Email
                    </a>
                  </Button>
                  <Button asChild variant="secondary">
                    <a href={PROFILE.resumeHref}>
                      <Download size={16} className={styles.iconLeft} />
                      Resume
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className={styles.footer}>
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </footer>
      </main>

      <Dialog
        open={!!active}
        onOpenChange={(o) => setOpenId(o ? openId : null)}
      >
        <DialogContent>
          {active && (
            <>
              <div className={styles.dialogHero}>
                <img
                  src={projectCover(active.id)}
                  alt={active.coverAlt}
                  className={styles.dialogHeroImg}
                />
              </div>

              <DialogHeader>
                <DialogTitle>{active.title}</DialogTitle>
                <DialogDescription>
                  {active.category} • {active.year} • {active.role}
                </DialogDescription>
              </DialogHeader>

              <DialogBody>
                {images.length > 0 ? (
                  <div className={styles.dialogGallery}>
                    {images.map((src, i) => (
                      <img
                        key={src}
                        src={src}
                        alt={`${active.title} image ${i + 1}`}
                        className={styles.dialogImage}
                        loading="lazy"
                      />
                    ))}
                  </div>
                ) : (
                  <div className={styles.dialogEmpty}>
                    <p className={styles.muted}>
                      No images available for this project.
                    </p>
                  </div>
                )}

                <p className={styles.dialogSummary}>{active.summary}</p>

                <div className={styles.dialogActions}>
                  <Button onClick={() => setOpenId(null)}>Close</Button>
                </div>
              </DialogBody>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
