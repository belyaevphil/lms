import { FC } from 'react'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { Formik } from 'formik'

import { Button, Input, Form } from '../../components'
import { paths } from '../../helpers/routes/paths'

import c from './style.module.scss'

export const SignInForStories: FC = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={yup.object().shape({
        username: yup.string().required('Имя пользователя должно быть заполнено'),
        password: yup
          .string()
          .required('Пароль должен быть введен')
          .min(6, 'Пароль должен содержать минимум 6 символов')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values)
          setSubmitting(false)
        }, 400)
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <h1 style={{ margin: '60px 0 20px 0' }}>Войти в аккаунт</h1>
          <Input
            name={'username'}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            error={errors.username}
            touched={touched.username}
            placeholder={'Адрес эл. почты'}
          />
          <Input
            type={'password'}
            name={'password'}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={errors.password}
            touched={touched.password}
            placeholder={'Пароль'}
          />
          <Button style={{ marginTop: '20px' }} type='submit' disabled={isSubmitting}>
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
      )}
    </Formik>
  )
}
