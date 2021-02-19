import { ButtonHTMLAttributes, FC } from 'react'

import c from './style.module.scss'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = ({ children, ...rest }) => (
  <button className={c.button} {...rest}>
    {children}
  </button>
)
