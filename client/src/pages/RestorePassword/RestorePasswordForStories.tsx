import { FC } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'

import { Button, Form, Input } from '../../components'

export const RestorePasswordForStories: FC = () => {
  return (
    <Formik
      initialValues={{
        password: '',
        repeatPassword: ''
      }}
      validationSchema={yup.object().shape({
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
          })
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
          <h1 style={{ margin: '60px 0 20px 0' }}>Восстановление пароля</h1>
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
          <Button style={{ marginTop: '20px' }} type='submit' disabled={isSubmitting}>
            Восстановить
          </Button>
        </Form>
      )}
    </Formik>
  )
}
