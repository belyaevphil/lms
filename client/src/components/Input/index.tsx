import { FC, InputHTMLAttributes } from 'react'

import c from './style.module.scss'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
  touched?: boolean
}

export const Input: FC<InputProps> = ({ error, touched, ...rest }) => {
  const isCorrect = !error && Boolean(rest.value)

  return (
    <div className={c.inputWrapper}>
      <input
        className={`${c.input} ${error && c.inputError} ${isCorrect && c.inputCorrect}`}
        {...rest}
      />
      {error && touched && <div className={c.errorMessage}>{error}</div>}
    </div>
  )
}
