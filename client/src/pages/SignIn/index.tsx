import { FC, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectAuthData, signIn } from '../../store/auth'
import { Button, Form, Input } from '../../components'
import { paths } from '../../helpers/routes/paths'
import { handleInputChange } from '../../helpers/validation'

import c from './style.module.scss'

export const SignIn: FC = () => {
  const { isLoading } = useSelector(selectAuthData)
  const dispatch = useDispatch()

  const [form, setForm] = useState<{
    email: string
    emailError: string
    password: string
    passwordError: string
  }>({
    email: '',
    emailError: '',
    password: '',
    passwordError: ''
  })

  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(signIn({ email: form.email, password: form.password }))
  }

  const shouldButtonBeDisabled = !(
    form.email &&
    form.password &&
    !form.emailError &&
    !form.passwordError
  )

  return (
    <>
      <Form onSubmit={handleSignIn}>
        <h1 style={{ margin: '0 0 20px 0' }}>Войти в аккаунт</h1>
        <Input
          value={form.email}
          name={'email'}
          onChange={handleInputChange(setForm)}
          error={form.emailError}
          placeholder={'Адрес эл. почты'}
        />
        <Input
          value={form.password}
          name={'password'}
          onChange={handleInputChange(setForm)}
          error={form.passwordError}
          placeholder={'Пароль'}
          type={'password'}
        />
        <Button disabled={shouldButtonBeDisabled || isLoading} style={{ marginTop: '20px' }}>
          Войти
        </Button>
        <div className={c.linkWrapper}>
          Забыли пароль?{' '}
          <Link className={c.link} to={paths.FORGOT_PASSWORD}>
            Восстановить
          </Link>
        </div>
        <div className={c.linkWrapper}>
          Еще нет аккаунта?{' '}
          <Link className={c.link} to={paths.SIGN_UP}>
            Создать
          </Link>
        </div>
      </Form>
    </>
  )
}
