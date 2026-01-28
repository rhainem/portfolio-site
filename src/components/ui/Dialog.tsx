import React, { useEffect, useRef } from 'react'
import styles from './ui.module.css'

function getFocusable(root: HTMLElement) {
  const selector =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  return Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'),
  )
}

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  const lastActive = useRef<HTMLElement | null>(null)

  // lock scroll
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // close on Escape + restore focus
  useEffect(() => {
    if (!open) return

    lastActive.current = document.activeElement as HTMLElement | null

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      lastActive.current?.focus?.()
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div
      className={styles.dialogOverlay}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false)
      }}
    >
      {children}
    </div>
  )
}

export function DialogContent({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const panelRef = useRef<HTMLDivElement | null>(null)

  // initial focus + trap focus
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    const scroller =
      (panel.querySelector(`.${styles.dialogBody}`) as HTMLElement | null) ??
      panel

    requestAnimationFrame(() => {
      scroller.scrollTop = 0
      panel.scrollTop = 0

      panel.focus({ preventScroll: true })
    })

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const items = getFocusable(panel)
      if (items.length === 0) {
        e.preventDefault()
        panel.focus()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement as HTMLElement

      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    panel.addEventListener('keydown', onKeyDown)
    return () => panel.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div
      ref={panelRef}
      className={`${styles.dialogPanel} ${className}`}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      {children}
    </div>
  )
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className={styles.dialogHeader}>{children}</div>
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.dialogTitle}>{children}</h2>
}

export function DialogDescription({ children }: { children: React.ReactNode }) {
  return <p className={styles.dialogDescription}>{children}</p>
}

export function DialogBody({ children }: { children: React.ReactNode }) {
  return <div className={styles.dialogBody}>{children}</div>
}
