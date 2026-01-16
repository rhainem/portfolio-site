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
import {
  PROFILE,
  PROJECTS,
  NAV,
  initials,
  getCategoryOrder,
  projectCover,
} from './models'
import type { SortKey, Project } from './models'

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
                  <div className={styles.special}>
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
