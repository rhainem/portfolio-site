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

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      className: `${cls} ${(children as any).props?.className ?? ''}`.trim(),
    })
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
