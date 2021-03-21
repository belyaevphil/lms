import { FC, FormEvent, useState } from 'react'
import { useSelector } from 'react-redux'

import { handleInputChange } from '../../helpers/validation'
import { Button, Form, Input } from '../../components'
import { selectAuthData } from '../../store/auth'

export const RestorePassword: FC = () => {
  const { isLoading } = useSelector(selectAuthData)

  const [form, setForm] = useState<{
    password: string
    repeatPassword: string
    passwordError: string
    repeatPasswordError: string
  }>({
    password: '',
    passwordError: '',
    repeatPassword: '',
    repeatPasswordError: ''
  })

  const handleRestorePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log('вы успешно зарегистрировались')
  }

  const shouldRepeatPasswordBeDisabled = !(form.password && !form.passwordError)

  const shouldButtonBeDisabled = !(
    form.password &&
    form.repeatPassword &&
    !form.passwordError &&
    !form.repeatPasswordError
  )

  return (
    <>
      <Form onSubmit={handleRestorePassword}>
        <h1 style={{ margin: '0 0 20px 0' }}>Восстановление пароля</h1>
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
          Восстановить
        </Button>
      </Form>
    </>
  )
}
