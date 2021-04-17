import React from 'react'
import * as yup from 'yup'
import { Formik, FormikHelpers } from 'formik'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Input, Button, Container, Typography, Alert } from 'components'
import { Box } from 'components/Box'
import { removeAuthMessage, selectAuthData, signUp } from 'store/authSlice'

export type SignUpFormValues = {
  username: string
  password: string
  repeatPassword: string
  firstName: string
  lastName: string
}

export const SignUp: React.FunctionComponent = () => {
  const { message, status } = useSelector(selectAuthData)
  const dispatch = useDispatch()
  const removeMessage = () => dispatch(removeAuthMessage)

  const signUpRequest = async (values: any, formikHelpers: FormikHelpers<any>) => {
    await dispatch(signUp(values))
    formikHelpers.setSubmitting(false)
  }

  return (
    <Container as={'main'} maxWidth={'960px'} padding={'80px 20px 20px'}>
      <Typography as={'h1'} margin={'0 0 20px 0'}>
        Создать аккаунт
      </Typography>
      {message && status && (
        <Alert type={status} margin={'0 0 20px 0'} onClick={removeMessage}>
          {message}
        </Alert>
      )}
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
        onSubmit={signUpRequest}
      >
        {formProps => (
          <form onSubmit={formProps.handleSubmit}>
            <Input
              placeholder={'Имя пользователя'}
              name={'username'}
              value={formProps.values.username}
              error={formProps.touched.username && formProps.errors.username}
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
            />
            <Input
              placeholder={'Пароль'}
              name={'password'}
              type={'password'}
              autoComplete={'current-password'}
              value={formProps.values.password}
              error={formProps.touched.password && formProps.errors.password}
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
            />
            <Input
              placeholder={'Повторный пароль'}
              name={'repeatPassword'}
              type={'password'}
              autoComplete={'current-password'}
              value={formProps.values.repeatPassword}
              error={formProps.touched.repeatPassword && formProps.errors.repeatPassword}
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
            />
            <Input
              placeholder={'Имя'}
              name={'firstName'}
              value={formProps.values.firstName}
              error={formProps.touched.firstName && formProps.errors.firstName}
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
            />
            <Input
              placeholder={'Фамилия'}
              name={'lastName'}
              value={formProps.values.lastName}
              error={formProps.touched.lastName && formProps.errors.lastName}
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
            />
            <Button type={'submit'} disabled={formProps.isSubmitting} margin={'20px 0 0 0'} fullWidth>
              Создать
            </Button>
            <Box styling={{ justifyContent: 'flex-start', margin: '20px 0 0 0' }}>
              <RouterLink to={'/sign-in'}>Уже есть аккаунт?</RouterLink>
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  )
}
