import React, { FC, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectAuthData, signUp } from '../../store/auth'
import { paths } from '../../helpers/routes/paths'
import { handleInputChange } from '../../helpers/validation'
import { Button, Form, Input } from '../../components'

import c from './style.module.scss'

export const SignUp: FC = () => {
  const { isLoading } = useSelector(selectAuthData)
  const dispatch = useDispatch()

  const [form, setForm] = useState<{
    email: string
    password: string
    repeatPassword: string
    firstName: string
    lastName: string
    emailError: string
    passwordError: string
    repeatPasswordError: string
    firstNameError: string
    lastNameError: string
  }>({
    email: '',
    password: '',
    repeatPassword: '',
    firstName: '',
    lastName: '',
    emailError: '',
    passwordError: '',
    repeatPasswordError: '',
    firstNameError: '',
    lastNameError: ''
  })

  const handleSignUp = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    dispatch(
      signUp({
        email: form.email,
        password: form.password,
        repeatPassword: form.repeatPassword,
        firstName: form.firstName,
        lastName: form.lastName
      })
    )
  }

  const shouldRepeatPasswordBeDisabled = !(form.password && !form.passwordError)

  const shouldButtonBeDisabled = !(
    form.email &&
    form.password &&
    form.repeatPassword &&
    !form.emailError &&
    !form.passwordError &&
    !form.repeatPasswordError
  )

  return (
    <>
      <Form onSubmit={handleSignUp}>
        <h1 style={{ margin: '100px 0 20px 0' }}>Новый аккаунт</h1>
        <Input
          value={form.firstName}
          name={'firstName'}
          onChange={handleInputChange(setForm)}
          error={form.firstNameError}
          placeholder={'Имя'}
        />
        <Input
          value={form.lastName}
          name={'lastName'}
          onChange={handleInputChange(setForm)}
          error={form.lastNameError}
          placeholder={'Фамилия'}
        />
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
        <Input
          value={form.repeatPassword}
          name={'repeatPassword'}
          onChange={handleInputChange(setForm, form.password)}
          error={form.repeatPasswordError}
          placeholder={'Повторный пароль'}
          type={'password'}
          disabled={shouldRepeatPasswordBeDisabled}
        />
        <Button disabled={shouldButtonBeDisabled || isLoading} style={{ marginTop: '20px' }}>
          Создать
        </Button>
        <div className={c.linkWrapper}>
          Уже есть аккаунт?{' '}
          <Link className={c.link} to={paths.SIGN_IN}>
            Войти
          </Link>
        </div>
      </Form>
    </>
  )
}
