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
import {
  PROFILE,
  PROJECTS,
  NAV,
  initials,
  getCategoryOrder,
  projectCover,
} from './models'
import type { SortKey, Project } from './models'
import styles from './Portfolio.module.css'
import ui from './components/ui/ui.module.css'
import type { ProjectMediaItem } from './models/types'

export default function PortfolioSite() {
  const reduceMotion = useReducedMotion()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('featured')
  const [activeCategory, setActiveCategory] = useState<
    Project['category'] | 'All'
  >('All')
  const [openId, setOpenId] = useState<string | null>(null)

  const withBase = (src: string) => {
    // allow absolute / external URLs
    if (/^(https?:)?\/\//.test(src)) return src

    // remove leading slashes so BASE_URL works correctly
    const clean = src.replace(/^\/+/, '')

    return `${import.meta.env.BASE_URL}${clean}`
  }

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
          a.title.localeCompare(b.title),
      )
    }

    return list
  }, [query, sort, activeCategory])

  const active = useMemo(
    () => PROJECTS.find((p) => p.id === openId) ?? null,
    [openId],
  )

  const media = useMemo(() => {
    if (!active) return []

    const fromMedia = active.media ?? []
    const legacy = active.images ?? []

    // Build a set of srcs already used in media (so we don't duplicate)
    const used = new Set(fromMedia.map((m) => m.src))

    const legacyAsOther = legacy
      .filter((src) => !used.has(src))
      .map((src, idx) => ({
        id: `${active.id}-legacy-${idx}`,
        kind: src.toLowerCase().endsWith('.mp4') ? 'video' : 'image',
        group: 'Other' as const,
        src,
      }))

    return [...fromMedia, ...legacyAsOther]
  }, [active])

  const grouped = useMemo(() => {
    const groups = new Map<string, typeof media>()
    for (const item of media) {
      const key = item.group
      const current = groups.get(key) ?? []
      current.push(item)
      groups.set(key, current)
    }
    return Array.from(groups.entries())
  }, [media])

  const aspectClass = (a?: ProjectMediaItem['aspect']) => {
    switch (a) {
      case 'viewport':
        return ui.aspectViewport
      case 'ultrawide':
        return ui.aspectUltrawide
      case 'banner':
        return ui.aspectBanner
      case 'wide':
        return ui.aspectWide
      case 'square':
        return ui.aspectSquare
      case 'print':
        return ui.aspectPrint
      case 'portrait':
        return ui.aspectPortrait
      default:
        return ui.aspectAuto
    }
  }

  const aspectForGroup = (group: string) => {
    switch (group) {
      case 'Heroes':
      case 'Web':
      case 'Preview':
        return 'wide'
      case 'Socials':
        return 'square'
      case 'Social Media Ads':
        return 'banner'
      case 'EDMs':
        return 'viewport'
      case 'Print':
        return 'print'
      case 'Photography':
        return 'portrait'
      default:
        return 'auto'
    }
  }

  const galleryClassForGroup = (group: string) => {
    switch (group) {
      case 'Web':
        return ui.galleryOneCol
      case 'Socials':
        return ui.galleryThreeCol
      case 'Social Media Ads':
        return ui.galleryThreeCol
      default:
        return ui.galleryTwoCol
    }
  }

  const hasTools = (active?.tools?.length ?? 0) > 0
  const hasHighlights = (active?.highlights?.length ?? 0) > 0
  const hasProcess = (active?.process?.length ?? 0) > 0

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
            {/* <Button asChild variant="secondary" className={styles.hideOnMobile}>
              <a href={PROFILE.resumeHref} aria-label="Download resume">
                <Download size={16} className={styles.iconLeft} /> Resume
              </a>
            </Button> */}
            <Button asChild>
              <a href={`mailto:${PROFILE.email_user}@${PROFILE.email_domain}`}>
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
                I’m {PROFILE.name}, a {PROFILE.title} based in Auckland. I
                support brands from concept through execution, delivering
                cohesive identity, campaigns, print production, and digital
                design across fast-moving environments.
              </p>

              <div className={styles.badgeRow}>
                <Badge>Art direction</Badge>
                <Badge>Brand systems</Badge>
                <Badge>Campaigns</Badge>
                <Badge>Print + production</Badge>
                <Badge>Web + digital</Badge>
              </div>

              <div className={styles.ctaRow}>
                <Button asChild>
                  <a href="#work" className="selected">
                    View selected work <ArrowUpRight size={16} />
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a
                    href={`mailto:${PROFILE.email_user}@${PROFILE.email_domain}`}
                  >
                    Let’s talk
                  </a>
                </Button>
              </div>
            </div>

            <Card className={styles.card}>
              <CardHeader>
                <CardTitle>At a glance</CardTitle>
              </CardHeader>
              <CardContent className={styles.stackSm}>
                <div className={styles.cardTight}>
                  <div className={styles.special}>
                    <div className={styles.smallTitle}>Specialties</div>
                    <div className={styles.muted}>
                      Art direction • Identity • EDM and paid ad campaigns •
                      Digital • Web design • UI • Print
                    </div>
                  </div>
                  <ExternalLink size={16} className={styles.mutedIcon} />
                </div>

                <div className={styles.cardTight}>
                  <div>
                    <div className={styles.smallTitle}>Approach</div>
                    <div className={styles.muted}>
                      Systems-first • Accessible • Built to scale
                    </div>
                  </div>
                  <ExternalLink size={16} className={styles.mutedIcon} />
                </div>

                {/* <Separator />

                <div className={styles.socialRow}>
                  {PROFILE.socials.map((s) => (
                    <a key={s.label} href={s.href} className={styles.chipLink}>
                      {s.label}
                    </a>
                  ))}
                </div> */}
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section id="work" className={styles.section}>
          <div className={styles.workTop}>
            <div>
              <h2 className={styles.h2}>Selected work</h2>
              <p className={styles.subtle}>
                Selected work delivered across fast-moving campaigns, print
                production, and digital channels.
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
                        src={withBase(projectCover(p.id))}
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
                I work across brand identity, campaigns, print production, and
                digital design. I have experience supporting both in-house teams
                and independent clients, delivering consistent, high-quality
                work across fast-moving environments.
                <br />
                <br />
              </p>
              <p className={styles.aboutParagraph}>
                My approach is systems-focused and detail-driven. I design with
                scalability and consistency in mind, ensuring brands translate
                clearly across channels such as social, EDMs, web, print, and
                in-store or mailed collateral. I am comfortable managing
                projects end to end, from concept through production and
                delivery.
                <br />
                <br />
              </p>
              <p className={styles.aboutParagraph}>
                I work closely with stakeholders, developers, marketers, and
                suppliers to meet deadlines, maintain brand standards, and
                deliver outcomes that support real business goals.
              </p>
            </div>

            <div className={styles.aboutCard}>
              <div className={styles.aboutCardInner}>
                <p className={styles.aboutParagraph}>
                  I build design systems that make brands feel consistent
                  wherever they show up: packaging, editorial layouts, social
                  templates, and product UI. My work balances craft and
                  constraints so teams can move fast without losing quality.
                </p>
                <div className={styles.aboutCols}>
                  <div className={styles.aboutMiniCard}>
                    <div className={styles.smallTitle}>Strengths</div>
                    <ul className={styles.list}>
                      <li>Brand rollouts and templates</li>
                      <li>Typography + hierarchy</li>
                      <li>Grid + spacing systems</li>
                    </ul>
                  </div>

                  <div className={styles.aboutMiniCard}>
                    <div className={styles.smallTitle}>Values</div>
                    <ul className={styles.list}>
                      <li>Consistency across channels</li>
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
                End-to-end design support for established, growing, and new
                brands, covering identity, campaigns, print production, and
                digital execution.
              </p>
            </div>
          </div>

          <div className={styles.servicesGrid}>
            {[
              {
                title: 'Brand identity',
                desc: 'Visual identities designed to stay consistent across print, digital, and campaigns.',
                bullets: [
                  'Logos and identity systems',
                  'Typography and colour systems',
                  'Brand guidelines',
                ],
              },
              {
                title: 'Marketing + campaigns',
                desc: 'Creative support for always-on marketing and campaign rollouts.',
                bullets: [
                  'Meta ad creative',
                  'EDM design and build',
                  'Campaign asset rollouts',
                ],
              },
              {
                title: 'Editorial + print + POS',
                desc: 'Print design built for production and real-world use.',
                bullets: [
                  'Catalogues and brochures',
                  'Signage and POS',
                  'Print-ready artwork',
                ],
              },
              {
                title: 'Web + digital design',
                desc: 'Websites and digital assets designed for clarity, performance, and growth.',
                bullets: [
                  'Website design',
                  'CMS-based builds',
                  'Ongoing updates',
                ],
              },
              {
                title: 'Photography + content',
                desc: 'Visual content to support campaigns, products, and events.',
                bullets: [
                  'Event photography',
                  'Product photography',
                  'Campaign assets',
                ],
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
                  <h2 className={styles.h2}>
                    Let’s build something that scales.
                  </h2>
                  <p className={styles.subtle}>
                    Email me a brief, timeline, and any references. I’ll reply
                    with next steps.
                  </p>
                </div>

                <div className={styles.contactActions}>
                  <Button asChild>
                    <a
                      href={`mailto:${PROFILE.email_user}@${PROFILE.email_domain}`}
                    >
                      <Mail size={16} className={styles.iconLeft} />
                      Email
                    </a>
                  </Button>
                  {/* <Button asChild variant="secondary">
                    <a href={PROFILE.resumeHref}>
                      <Download size={16} className={styles.iconLeft} />
                      Resume
                    </a>
                  </Button> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className={styles.footer}>
          © {new Date().getFullYear()} Built by {PROFILE.name}.
        </footer>
      </main>

      <Dialog
        open={!!active}
        onOpenChange={(o) => setOpenId(o ? openId : null)}
      >
        <DialogContent key={active?.id}>
          {active && (
            <>
              <div className={ui.dialogHero}>
                <img
                  src={withBase(projectCover(active.id))}
                  alt={active.coverAlt}
                  className={ui.dialogHeroImg}
                />
              </div>

              <DialogHeader>
                <DialogTitle>{active.title}</DialogTitle>
                <DialogDescription>
                  {active.category} • {active.year} • {active.role}
                </DialogDescription>
              </DialogHeader>

              <DialogBody>
                {media.length > 0 ? (
                  <>
                    {grouped.map(([group, items]) => (
                      <section key={group} className={ui.dialogSection}>
                        <div className={ui.dialogSectionTitle}>{group}</div>

                        <div
                          className={`${ui.dialogGallery} ${galleryClassForGroup(group)}`}
                        >
                          {items.map((m) => {
                            const aspect = m.aspect ?? aspectForGroup(m.group)
                            const extraClass =
                              m.kind === 'video' && m.group === 'Preview'
                                ? ui.mediaFull
                                : ''

                            if (aspect === 'viewport') {
                              return (
                                <div
                                  key={m.id}
                                  className={`${ui.aspectViewport} ${extraClass}`}
                                >
                                  {m.kind === 'video' ? (
                                    <video
                                      className={ui.viewportMedia}
                                      controls
                                      preload="metadata"
                                    >
                                      <source
                                        src={withBase(m.src)}
                                        type="video/mp4"
                                      />
                                    </video>
                                  ) : (
                                    <img
                                      src={withBase(m.src)}
                                      alt={m.alt ?? ''}
                                      className={ui.viewportMedia}
                                      loading="lazy"
                                    />
                                  )}
                                </div>
                              )
                            }

                            return m.kind === 'video' ? (
                              <video
                                key={m.id}
                                className={`${ui.dialogMedia} ${aspectClass(aspect)} ${extraClass}`}
                                controls
                                preload="metadata"
                              >
                                <source
                                  src={withBase(m.src)}
                                  type="video/mp4"
                                />
                              </video>
                            ) : (
                              <img
                                key={m.id}
                                src={withBase(m.src)}
                                alt={m.alt ?? ''}
                                className={`${ui.dialogMedia} ${aspectClass(aspect)} ${extraClass}`}
                                loading="lazy"
                              />
                            )
                          })}
                        </div>
                      </section>
                    ))}
                  </>
                ) : (
                  <div className={ui.dialogEmpty}>
                    <p className={ui.muted}>
                      No media available for this project.
                    </p>
                  </div>
                )}

                <p className={ui.dialogSummary}>{active.summary}</p>

                {hasTools && (
                  <>
                    <Separator />
                    <div className={styles.stackSm}>
                      <div className={styles.smallTitle}>Tools</div>
                      <div className={styles.badgeRow}>
                        {active.tools.map((tool) => (
                          <Badge key={tool}>{tool}</Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {hasHighlights && (
                  <>
                    <Separator />
                    <div className={styles.stackSm}>
                      <div className={styles.smallTitle}>Highlights</div>
                      <ul className={styles.list}>
                        {active.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {hasProcess && (
                  <>
                    <Separator />
                    <div className={styles.stackSm}>
                      <div className={styles.smallTitle}>Process</div>
                      <div className={styles.stackSm}>
                        {active.process.map((step) => (
                          <div
                            key={step.label}
                            className={ui.dialogProcessItem}
                          >
                            <div className={ui.dialogProcessLabel}>
                              {step.label}
                            </div>
                            <p className={ui.dialogProcessContent}>
                              {step.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className={ui.dialogActions}>
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
