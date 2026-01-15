import React from 'react'
import styles from './ui.module.css'

export function Input({
  className = '',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${styles.input} ${className}`} {...props} />
}
