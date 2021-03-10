import { FC } from 'react'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { Formik } from 'formik'

import { paths } from '../../helpers/routes/paths'
import { Button, Form, Input } from '../../components'

import c from './style.module.scss'

export const SignUpForStories: FC = () => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        repeatPassword: '',
        firstName: '',
        lastName: ''
      }}
      validationSchema={yup.object().shape({
        username: yup.string().required('Имя пользователя должно быть заполнено'),
        password: yup
          .string()
          .required('Пароль должен быть введен')
          .min(6, 'Пароль должен содержать минимум 6 символов'),
        repeatPassword: yup
          .string()
          .required('Повторный пароль должен быть введен')
          .min(6, 'Повторный пароль должен содержать минимум 6 символов')
          .test({
            message: 'Пароли должны совпадать',
            test: function (value) {
              return this.parent.password === value
            }
          }),
        firstName: yup.string().required('Имя должно быть введено'),
        lastName: yup.string().required('Фамилия должна быть введена')
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
          <h1 style={{ margin: '60px 0 20px 0' }}>Новый аккаунт</h1>
          <Input
            name={'username'}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            error={errors.username}
            touched={touched.username}
            placeholder={'Имя пользователя'}
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
          <Input
            type={'password'}
            name={'repeatPassword'}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.repeatPassword}
            error={errors.repeatPassword}
            touched={touched.repeatPassword}
            placeholder={'Повторный пароль'}
          />
          <Input
            name={'firstName'}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            error={errors.firstName}
            touched={touched.firstName}
            placeholder={'Имя'}
          />
          <Input
            name={'lastName'}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            error={errors.lastName}
            touched={touched.lastName}
            placeholder={'Фамилия'}
          />
          <Button style={{ marginTop: '20px' }} type='submit' disabled={isSubmitting}>
            Создать
          </Button>
          <div className={c.linkWrapper}>
            Уже есть аккаунт?{' '}
            <Link className={c.link} to={paths.SIGN_IN}>
              Войти
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  )
}
