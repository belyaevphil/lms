import React from 'react'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import { Formik } from 'formik'

import { API } from 'api'
import { Input, Button, Typography, Container, FileUploader, Alert } from 'components'
import { useFormikRequest } from 'hooks/useFormikRequest'

export type InstructorCourseAddLessonForm = {
  name: string
  description: string
  files: string
}

export const InstructorCourseAddLesson: React.FunctionComponent = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const [response, makeRequest] = useFormikRequest(API.lessons.create)

  return (
    <Container>
      <Typography as={'h1'} margin={'0 0 20px 0'}>
        Создать урок
      </Typography>
      {response.message && response.status && (
        <Alert type={response.status} margin={'0 0 20px 0'} onClick={response.removeMessage}>
          {response.message}
        </Alert>
      )}
      <Formik
        initialValues={{
          courseId,
          name: '',
          description: '',
          files: ''
        }}
        validationSchema={yup.object().shape({
          name: yup.string().required('Название урока должно быть введено'),
          description: yup.string().required('Описание урока должно быть введено')
        })}
        onSubmit={makeRequest}
      >
        {formProps => (
          <form onSubmit={formProps.handleSubmit}>
            <Input
              placeholder={'Название урока'}
              name={'name'}
              value={formProps.values.name}
              error={formProps.touched.name && formProps.errors.name}
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
            />
            <Input
              placeholder={'Описание урока'}
              name={'description'}
              value={formProps.values.description}
              error={formProps.touched.description && formProps.errors.description}
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
              multiline
              height={'240px'}
            />
            <FileUploader
              type={'file'}
              name={'files'}
              multiple
              max={3}
              onChange={e => formProps.setFieldValue('files', e.target.files)}
              margin={'20px 0 0 0'}
            />
            <Button type={'submit'} disabled={formProps.isSubmitting} margin={'20px 0 0 0'}>
              Создать
            </Button>
          </form>
        )}
      </Formik>
    </Container>
  )
}
