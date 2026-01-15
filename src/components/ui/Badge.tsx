import React from 'react'
import styles from './ui.module.css'

export function Badge({
  variant = 'secondary',
  className = '',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'secondary' | 'outline'
}) {
  return (
    <span
      className={`${styles.badge} ${styles[variant]} ${className}`}
      {...props}
    />
  )
}
