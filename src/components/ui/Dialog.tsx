import React, { useEffect } from 'react'
import styles from './ui.module.css'

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  if (!open) return null

  return (
    <div className={styles.dialogOverlay} onClick={() => onOpenChange(false)}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
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

export function DialogContent({ children }: { children: React.ReactNode }) {
  return <div className={styles.dialogContent}>{children}</div>
}
