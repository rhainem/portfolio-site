import React from 'react'
import styles from './ui.module.css'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  asChild?: boolean
}

export function Button({
  variant = 'primary',
  asChild,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const cls = `${styles.button} ${styles[variant]} ${className}`

  if (asChild) {
    return <span className={cls}>{children}</span>
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
