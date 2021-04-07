import React from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'

import { Input, Button, Typography, Alert } from 'components'
import { useFormikRequest } from 'hooks/useFormikRequest'
import { API } from 'api'

export type CreateCourseFormValues = {
  courseName: string
}

export const CreateCourseForm: React.FunctionComponent = () => {
  const [response, makeRequest] = useFormikRequest(API.courses.create)

  return (
    <>
      <Typography as={'h1'} margin={'0 0 20px 0'}>
        Создать курс
      </Typography>
      {response.status && response.message && (
        <Alert type={response.status} margin={'0 0 20px 0'} onClick={response.removeMessage}>
          {response.message}
        </Alert>
      )}
      <Formik
        initialValues={{
          courseName: ''
        }}
        validationSchema={yup.object().shape({
          courseName: yup.string().required('Название курса должно быть введено')
        })}
        onSubmit={makeRequest}
      >
        {formProps => (
          <form onSubmit={formProps.handleSubmit}>
            <Input
              placeholder={'Название курса'}
              name={'courseName'}
              value={formProps.values.courseName}
              error={formProps.touched.courseName && formProps.errors.courseName}
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
            />
            <Button type={'submit'} disabled={formProps.isSubmitting} margin={'20px 0 0 0'}>
              Создать
            </Button>
          </form>
        )}
      </Formik>
    </>
  )
}
