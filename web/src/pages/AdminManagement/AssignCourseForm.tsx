import React from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'

import { Input, Button, Typography, Alert } from 'components'
import { API } from 'api'
import { useFormikRequest } from 'hooks/useFormikRequest'

export type AssignCourseFormValues = {
  username: string
  courseName: string
}

export const AssignCourseForm: React.FunctionComponent = () => {
  const [response, makeRequest] = useFormikRequest(API.courses.assign)

  return (
    <>
      <Typography as={'h1'} margin={'20px 0 20px 0'}>
        Назначить курс
      </Typography>
      {response.status && response.message && (
        <Alert type={response.status} margin={'0 0 20px 0'} onClick={response.removeMessage}>
          {response.message}
        </Alert>
      )}
      <Formik
        initialValues={{
          username: '',
          courseName: ''
        }}
        validationSchema={yup.object().shape({
          username: yup.string().required('Имя пользователя должно быть заполнено'),
          courseName: yup.string().required('Название курса должно быть введено')
        })}
        onSubmit={makeRequest}
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
              placeholder={'Название курса'}
              name={'courseName'}
              value={formProps.values.courseName}
              error={formProps.touched.courseName && formProps.errors.courseName}
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
            />
            <Button type={'submit'} disabled={formProps.isSubmitting} margin={'20px 0 0 0'}>
              Назначить
            </Button>
          </form>
        )}
      </Formik>
    </>
  )
}
