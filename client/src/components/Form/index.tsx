import { FC, FormHTMLAttributes } from 'react'

import c from './style.module.scss'

export type FormProps = FormHTMLAttributes<HTMLFormElement>

export const Form: FC<FormProps> = ({ children, ...rest }) => {
  return (
    <form {...rest} className={c.form}>
      {children}
    </form>
  )
}
