import React from 'react'
import * as yup from 'yup'
import { Formik, FormikHelpers } from 'formik'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Input, Button, Container, Typography, Alert } from 'components'
import { Box } from 'components/Box'
import { removeAuthMessage, selectAuthData, signIn } from 'store/authSlice'

export type SignInFormValues = {
  username: string
  password: string
}

export const SignIn: React.FunctionComponent = () => {
  const { message, status } = useSelector(selectAuthData)
  const dispatch = useDispatch()
  const removeMessage = () => dispatch(removeAuthMessage)

  const signInRequest = async (values: any, formikHelpers: FormikHelpers<any>) => {
    await dispatch(signIn(values))
    formikHelpers.setSubmitting(false)
  }

  return (
    <Container as={'main'} maxWidth={'960px'} padding={'80px 20px 20px'}>
      <Typography as={'h1'} margin={'0 0 20px 0'}>
        Войти в аккаунт
      </Typography>
      {message && status && (
        <Alert type={status} margin={'0 0 20px 0'} onClick={removeMessage}>
          {message}
        </Alert>
      )}
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={yup.object().shape({
          username: yup.string().required('Имя пользователя должно быть заполнено'),
          password: yup
            .string()
            .required('Пароль должен быть введен')
            .min(6, 'Пароль должен содержать минимум 6 символов')
        })}
        onSubmit={signInRequest}
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
            <Button type={'submit'} disabled={formProps.isSubmitting} margin={'20px 0 0 0'} fullWidth>
              Войти
            </Button>
            <Box styling={{ justifyContent: 'flex-start', margin: '20px 0 0 0' }}>
              <RouterLink to={'/sign-up'}>Еще нет аккаунта?</RouterLink>
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  )
}
